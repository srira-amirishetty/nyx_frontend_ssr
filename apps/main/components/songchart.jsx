"use client";

import "chart.js/auto";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const Graph = () => {
  const [data, setData] = useState({
    labels: [
      "Verse 1",
      "Bridge",
      "Intro",
      "Verse 2",
      "Chorus 1",
      "Verse 3",
      "Chorus 2",
      "Bridge",
      "Outro",
    ],
    datasets: [
      {
        label: "Frequency",
        data: [0.32, 0.59, 1.19, 1.31, 2.32, 2.51, 3.43, 4.21, 5.01, 5.5],
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  });

  // Hardcode the RMS values for the ranges
  const rmsValues = {
    "Verse 1": 0.7,
    Bridge: 0.9,
    Intro: 0.5,
    "Verse 2": 0.7,
    "Chorus 1": 1.1,
    "Verse 3": 0.7,
    "Chorus 2": 1.1,
    Bridge: 0.9,
    Outro: 0.5,
  };

  // Update the `data` object to include the RMS values
  data.datasets[0].data = data.labels.map((label) => rmsValues[label]);

  return (
    <Line
      data={data}
      options={{
        title: {
          display: true,
          text: "Frequency of Sounds",
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "seconds",
                min: 0,
                max: 300,
                display: true,
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
              ticks: {
                display: true,
                autoSkip: false,
                labelOffset: 10,
                minor: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 1.2,
              },
            },
          ],
        },
      }}
    />
  );
};

export default Graph;
