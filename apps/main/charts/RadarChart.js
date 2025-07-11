import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
function RadarChart({ data, options, className = "", ...other }) {
  return (
    <>
      <Radar
        data={data}
        options={options}
        className={className}
        {...other}
      ></Radar>
    </>
  );
}

export default RadarChart;
