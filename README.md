# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

WordHistogram
The WordHistogram is a React component that fetches text data from an API endpoint, generates a histogram of the word frequencies, and displays it using Chart.js. The histogram shows the top 20 most frequent words in the fetched text data.

Getting Started
To use the WordHistogram component, follow these steps:

Clone the repository or copy the WordHistogram component code into your React project.

Install the required dependencies by running the following command:
npm install chart.js
3.Import the WordHistogram component into your React application.
import WordHistogram from './WordHistogram';
4.Add the WordHistogram component to your React component hierarchy.
```
import './App.css';
import WordHistogram from './histogram';
function App() {
  return (
    <div className="App">
      <WordHistogram />
    </div>
  );
}
export default App;
```
5.Customize the WordHistogram component as needed, such as modifying the button styles or chart options.
6.Start your React application and view the WordHistogram component in your browser.
npm start
Functionality
The WordHistogram component provides the following functionality:

Fetching Text Data: When the "Submit" button is clicked, the component fetches text data from the specified API endpoint (https://www.terriblytinytales.com/test.txt).
```
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
```
Word Frequency Calculation: The fetched text data is processed to calculate the frequency of each word using regular expressions. The frequencies are then sorted in descending order.
```
const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
```
Histogram Generation: The top 20 most frequent words and their frequencies are used to generate a bar chart using Chart.js. The chart is displayed in the component once it's visible.
```
const top20Words = sortedFrequency.slice(0, 20);
    setHistogramData(top20Words);
    setIsChartVisible(true);
 ```

Exporting Data: After the chart is visible, you can click the "Export" button to export the histogram data as a CSV file. The data is downloaded with the filename "histogram.csv".
```
const exportData = () => {
    const csv = histogramData.map((word) => word.join(",")).join("\n");
    const a = document.createElement("a");
    const file = new Blob([csv], { type: "text/csv" });
    a.href = URL.createObjectURL(file);
    a.download = "histogram.csv";
    a.click();
  };
  ```
Dependencies
The WordHistogram component depends on the following libraries:
React: A JavaScript library for building user interfaces.
Chart.js: A charting library that provides an easy way to visualize data using various chart types.
```
import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "./WordHistogram.css";
```
File Structure
The WordHistogram component consists of the following files:
WordHistogram.js: The main component file that contains the WordHistogram component code.
```
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
  ```
WordHistogram.css: The CSS file that provides styles for the WordHistogram component.
```
.chart-canvas {
  margin-top: 20px;
}
.fetch-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: navy;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.title {
  font-size: 30px;
}
.export-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: olivedrab;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}
```
Customization
You can customize the WordHistogram component by modifying the CSS styles in the WordHistogram.css file. Additionally, you can adjust the chart options and appearance by modifying the generateChart function in the component code.
Contributing
Contributions to the WordHistogram component are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request to the GitHub repository.

