import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({data, options = {}, className = "", ...other }) {
  const optionsMarged = {
    responsiv: true,
    maintainAspectRatio: false,
    ...options,
  };
  return (
    <>
      <Bar data={data} options={optionsMarged} className={className} {...other}></Bar>
    </>
  );
}

export default BarChart;
