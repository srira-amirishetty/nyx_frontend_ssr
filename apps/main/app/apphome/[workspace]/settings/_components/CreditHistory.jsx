"use client";
import React, { Fragment, useMemo, useState } from "react";
import { useEffect } from "react";
import Button from "@nyx-frontend/main/components/Button";
import { creditHistory } from "@nyx-frontend/main/services/workSpace";
import { useQuery, useMutation } from "@tanstack/react-query";
import BarChart from "../../../../../charts/BarChart";
import {
  barOptions,
  ChartBoxBar,
  ChartBoxRadar,
} from "../../sonic-ai/mastered-reports/ChartBox";
import { optionsCreditHistoryChart } from "./contant";
import { formatDate } from "../utils/dates";

const CreditHistory = () => {
  const [contextTab, setContextTab] = useState(0);

  const { data: creditHistoryData } = useQuery({
    queryKey: ["creditHistory"],
    queryFn: async () => {
      const res = await creditHistory({
        workspace_id: Number(localStorage.getItem("workspace_id")),
      });
      return res;
    },
  });

  const data = useMemo(() => {
    /**
     * @example
     *  ['2024-12-02', '2024-11-02']
     */
    const labels = [
      ...new Set(creditHistoryData?.creditHistory.map((d) => d.date)),
    ];
    /**
     * @example
     *  [3, 7]
     */
    const datasets = labels.map((label) =>
      creditHistoryData?.creditHistory
        /* create array based on same label */
        .filter((d) => d.date === label)
        /* create sum of creditsSpent of same label */
        .reduce((acc, d) => acc + d.creditsSpent, 0),
    );

    return {
      labels: labels,
      datasets: [
        {
          label: "Credit history",
          data: datasets,
          backgroundColor: "rgba(241, 187, 46, 1)",
        },
      ],
    };
  }, [creditHistoryData]);

  return (
    <>
      <div className=" p-4">
        <div className="w-full h-[40vh] bg-nyx-blue-4 flex  justify-center items-center">
          <div className="w-[55vw] h-full">
            <BarChart data={data} options={optionsCreditHistoryChart} />
          </div>
        </div>

        <div className="flex flex-row mt-4 text-white gap-8">
          <div>Storage Used: 1GB</div>
          <div>Credit Limit: 10000 credits</div>
        </div>

        <div className="mt-4">
          <div className="relative overflow-x-auto h-[30vh] ">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className=" text-[16px]  divide-y font-medium text-nyx-yellow bg-[#091234]  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Credits Spent
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tool Used
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {creditHistoryData?.creditHistory?.map((item, key) => (
                  <Fragment key={`credit-history-${key}`}>
                    <tr className="  bg-[#3B226F] text-white  font-normal border-b-[1px] border-[#8297BD] ">
                      <th
                        scope="row"
                        className="px-6 py-4  text-white text-[14px] "
                      >
                        {key + 1}
                      </th>
                      <td className="px-6 py-5 text-[14px]">
                        {item.creditsSpent}
                      </td>
                      <td className="px-6 py-5 text-[14px]">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-6 py-5 text-[14px]">
                        {item.usageType}
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditHistory;
