"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getBillingHis } from "@nyx-frontend/main/services/workSpace";

const Billings = () => {
  const [contextTab, setContextTab] = useState(0);

  const { data: billHistory } = useQuery({
    queryKey: ["getBill"],
    queryFn: () => {
      return getBillingHis();
    },
  });

  return (
    <>
      <div className="mt-4 pt-4">
        <div className="text-white  font-semibold text-[18px]">
          Billing History
        </div>

        <div className="mt-10">
          {billHistory?.billingHistory?.length == 0 ? (
            <div className=" text-white flex flex-col justify-center items-center opacity-80">
              <div className="w-[400px] h-[200px] bg-nyx-gray-2 text-center p-4  font-semibold text-[24px] rounded-lg flex justify-center items-center">
                <div>No billing history Found!</div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative overflow-x-auto h-[60vh] ">
                <table className="w-full text-sm text-left rtl:text-right ">
                  <thead className=" text-[16px]  divide-y font-medium text-nyx-yellow bg-[#091234]  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Sr. No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Transaction No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount Paid (INR)
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Subscription Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Plan
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Transaction Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {billHistory?.billingHistory?.map((item) => (
                      <>
                        <tr className="  bg-[#3B226F] text-white  font-normal border-b-[1px] border-[#8297BD] ">
                          <th
                            scope="row"
                            className="px-6 py-4  text-white text-[14px] "
                          >
                            {item.srNo}
                          </th>
                          <td className="px-6 py-5 text-[14px]">
                            {item.transactionNo}
                          </td>
                          <td className="px-6 py-5 text-[14px]">
                            {item.amountPaid.toFixed(2)}
                          </td>
                          <td className="px-6 py-5 text-[14px]">
                            {item.subscriptionType}
                          </td>
                          <td className="px-6 py-5 text-[14px]">
                            {item.plan_type}
                          </td>
                          <td className=" px-6 py-5 text-[14px] ">
                            {item.transactionDate
                              .split("-")
                              .reverse()
                              .join("/")}
                          </td>
                          <td className=" px-6 py-5 text-[14px]">
                            {item.status}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Billings;
