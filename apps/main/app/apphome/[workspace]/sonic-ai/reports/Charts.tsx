"use client";
import BarChart from "@nyx-frontend/main/charts/BarChart";
import RadarChart from "@nyx-frontend/main/charts/RadarChart";
import { radarOptions } from "@nyx-frontend/main/utils/utils";

const barOptions = {
  scales: {
    y: {
      ticks: { color: "white" },
    },
    x: {
      ticks: { color: "white" },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export function BarChartBox({ title, data }: { title: string; data: any }) {
  return (
    <div className="w-[330px] h-[330px] inline-block border	border-black p-2">
      <h6 className="text-white pb-2">{title}</h6>
      <div className="w-full h-[calc(100%-30px)]">
        <BarChart data={data} options={barOptions} />
      </div>
    </div>
  );
}

export function RadarChartBox({ title, data }: { title: string; data: any }) {
  return (
    <div className="w-[350px] h-[300px] inline-block border border-black border-r-0 p-1">
      <h6 className="text-white">{title}</h6>
      <div className="w-full h-[calc(100%-40px)] inline-flex justify-center items-center">
        <RadarChart data={data} options={radarOptions} />
      </div>
    </div>
  );
}
