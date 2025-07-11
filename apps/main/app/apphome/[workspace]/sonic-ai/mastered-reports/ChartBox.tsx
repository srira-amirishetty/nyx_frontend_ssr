import React from "react";
import RadarChart from "@nyx-frontend/main/charts/RadarChart";
import BarChart from "@nyx-frontend/main/charts/BarChart";
import { radarOptions } from "@nyx-frontend/main/utils/utils";
import classNames from "@nyx-frontend/main/utils/classNames";

type ChartBoxType = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export const barOptions = {
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
      display: true,
      labels: {
        fontSize: "30",
        color: "white",
      },
    },
  },
};

export default function ChartBox({ title, children, className = "" }: ChartBoxType) {
  return (
    <div className={classNames("border border-black w-[320px] lg:w-full", className)}>
      <h3 className="text-white m-[9px]">{title}</h3>
      <div className="w-[330px] h-[300px] flex justify-center items-center ">
        {children}
      </div>
    </div>
  );
}

export const ChartBoxRadar: React.FC<{ title: string; data: Object }> = ({
  title,
  data,
}) => {
  return (
    <ChartBox title={title}>
      <RadarChart data={data} options={radarOptions} />
    </ChartBox>
  );
};

export const ChartBoxBar: React.FC<{ title: string; data: Object }> = ({
  title,
  data,
}) => {
  return (
    <ChartBox title={title}>
      <BarChart
        data={data}
        options={{
          ...barOptions,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </ChartBox>
  );
};
