import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "./wordhistogram.css";

function WordHistogram() {
  const [histogramData, setHistogramData] = useState([]);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const chartRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch("https://www.terriblytinytales.com/test.txt");
    const textData = await response.text();
    const words = textData.match(/\b\w+\b/g);
    const frequency = {};
    words.forEach((word) => {
      const lowercaseWord = word.toLowerCase();
      if (frequency[lowercaseWord]) {
        frequency[lowercaseWord]++;
      } else {
        frequency[lowercaseWord] = 1;
      }
    });
    const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const top20Words = sortedFrequency.slice(0, 20);
    setHistogramData(top20Words);
    setIsChartVisible(true);
  };

  const exportData = () => {
    const csv = histogramData.map((word) => word.join(",")).join("\n");
    const a = document.createElement("a");
    const file = new Blob([csv], { type: "text/csv" });
    a.href = URL.createObjectURL(file);
    a.download = "histogram.csv";
    a.click();
  };

  useEffect(() => {
    Chart.register(...registerables);
    if (isChartVisible) {
      generateChart();
    }
  }, [isChartVisible]);

  const generateChart = () => {
    const labels = histogramData.map((word) => word[0]);
    const values = histogramData.map((word) => word[1]);
    const ctx = document.getElementById("myChart");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Word Frequency",
            data: values,
            backgroundColor: "purple",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        animation: {
          duration: 1000,
        },
      },
    });
  };

  return (
    <div >
      <h1 className="title">Terribly Tiny Tales Assignments</h1>
      {!isChartVisible && (
        <button className="fetch-button" type="submit" onClick={fetchData}>
          Submit
        </button>
      )}

      {isChartVisible && (
        <div >
           <button className="export-button" onClick={exportData}>
            Export
          </button>
          <canvas id="myChart" className="chart-canvas"></canvas>
         
        </div>
      )}
    </div>
  );
}

export default WordHistogram;