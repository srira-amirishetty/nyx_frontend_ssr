"use client";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useQuery , useMutation} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getBillingHis, getUser } from "@nyx-frontend/main/services/workSpace";
import Link from "next/link";
import Slider from "../_components/Slider";
import Button from "@nyx-frontend/main/components/Button";
import { addTopPopup, chooseModelpopup } from "@nyx-frontend/main/utils/modalstyles";
import Modal from "react-modal";
import Image from "next/image";
import {invoiceOrderId} from "@nyx-frontend/main/services/pricing"

const Billings = () => {
  const [contextTab, setContextTab] = useState(0);
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: billHistory } = useQuery({
    queryKey: ["getBill"],
    queryFn: () => {
      return getBillingHis();
    },
  });

  const downloadInvoice=(id)=>{
    mutateInvoice.mutate(id,{
      onSuccess: (response) => {
        console.log(response)
      },
      onError: (res) => {
        console.log(res);
      }
    })
  }

  const mutateInvoice = useMutation({
    mutationKey: ["invoice-download"],
    mutationFn: invoiceOrderId,
  });

  const billingHistory = useQuery({
    queryKey: ["billingHistory"],
    queryFn: () => getUser(),
  });

  const workspaceId = billingHistory?.data?.artistProfile?.workspaceId;
  const planName = billingHistory?.data?.artistProfile?.packageName;
  const billingCycle = billingHistory?.data?.artistProfile?.packageType;
  const planCost = billingHistory?.data?.artistProfile?.packageCost;
  const workspaceName = billingHistory?.data?.artistProfile?.workspaceSlug;

  return (
    <>
      <div className="mt-4 pt-4 mx-5">
        <div className="flex gap-4">
          {/* Current Plan Summary */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between w-[475px] h-[47px] bg-[#23145A] rounded-t-md">
              <p className="text-white text-[14px] font-bold px-4">
                Current Plan Summary
              </p>
              <Link href={`/apphome/${workspaceName}/settings/plans`}>
                <button className="w-[85px] h-[29px] bg-nyx-yellow text-black rounded-[20px] text-[10px] font-extrabold mr-4">
                  Upgrade
                </button>
              </Link>
            </div>
            <div className="bg-[#332270] w-[475px] h-fit rounded-b-md ">
              <div className="flex justify-between items-center px-8 mt-[24px]">
                <div className="">
                  <p className="text-white font-medium text-[8px] uppercase">
                    Plan Name
                  </p>
                  <p className="text-white font-semibold text-[14px] mt-[3px]">
                    {planName}
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium text-[8px] uppercase">
                    Billing Cycle
                  </p>
                  <p className="text-white font-semibold text-[14px] mt-[3px]">
                    {billingCycle}
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium text-[8px] uppercase">
                    Plan Cost
                  </p>
                  <p className="text-white font-semibold text-[14px] mt-[3px]">
                    INR {planCost}
                  </p>
                </div>
              </div>
              <div className="px-8 py-5">
                <p className="text-white font-medium text-[8px] uppercase mb-[3px]">
                  Usage
                </p>
                <Slider workspaceId={workspaceId} />
              </div>
              <div className="text-[12px] font-normal w-full pb-[22px] text-white flex justify-end">
                <div className="self-end mr-9 underline hover:text-[#F1BB2E] underline-offset-1 cursor-pointer hidden" onClick={()=>setPopUp(true)}>Cancel Subscription</div></div>
            </div>
          </div>

          {/* Payment Method */}
          {/* <div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between w-[475px] h-[47px] bg-[#091234] rounded-t-md">
                <p className="text-white text-[14px] font-bold px-4">
                  Payment Method
                </p>
              </div>
              <div className="flex items-center justify-center bg-[#3B226F] w-[475px] h-[154px] rounded-b-md">
                <div className="flex w-[450px] h-[88px] border border-[#5741A6] items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src="/images/visa.png"
                      alt="brand"
                      className="w-[50px] h-[50px] ml-4"
                      width={50}
                      height={50}
                    />
                    <div className="text-white font-medium ml-4">
                      <p className="text-[12px]">Master Card</p>
                      <p className="text-[12px]">**** **** **** 4002</p>
                      <p className="text-[10px]">Expiry on 20/2024</p>
                      <p className="text-[10px]">email@email.com</p>
                    </div>
                  </div>
                  <div className="mr-4 -mt-8">
                    <button className="text-white rounded-full py-2 px-3 text-[12px] font-medium border border-nyx-yellow">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="text-white font-semibold text-[18px] mt-10">
          Billing History
        </div>

        <div className="mt-4">
          {/* { ? (
            <div className=" text-white flex flex-col justify-center items-center opacity-80">
              <div className="w-[400px] h-[200px] bg-nyx-gray-2 text-center p-4  font-semibold text-[24px] rounded-lg flex justify-center items-center">
                <div>No billing history Found!</div>
              </div>
            </div>
          ) : ( */}
          <>
            <div className="relative overflow-x-auto h-[100vh] ">
              <table className="w-full text-sm text-left rtl:text-right rounded-[10px] overflow-hidden">
                <thead className=" text-[16px]  divide-y font-normal text-white bg-[#23145A] sticky top-0  ">
                  <tr className="text-[#E9BD4E] text-[14px] leading-[18px]">
                    {/* <th scope="col" className="px-6 py-3">
                      Sr. No.
                    </th> */}
                    <th scope="col" className="px-6 py-3">
                      Trans ID
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Amount Paid (INR)
                    </th> */}
                    <th scope="col" className="px-6 py-3">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Invoice
                    </th> */}
                    {/* <th scope="col" className="px-6 py-3">
                      Reciept
                    </th> */}
                  </tr>
                </thead>

                {billHistory?.billingHistory?.length == 0 ? (
                  <tbody>
                    <tr className="bg-[#332270] text-white font-normal border-b border-solid border-[#503193]">
                      <td
                        colSpan="7"
                        className="px-6 py-6 text-[18px] text-center"
                      >
                        No billing history found!
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="divide-y">
                    {billHistory?.billingHistory?.map((item, key) => (
                      <Fragment key={`billing-history-${key}`}>
                        <tr className="  bg-[#332270] text-white  font-normal border-b border-solid border-[#503193]">
                          {/* <th
                            scope="row"
                            className="px-6 py-4  text-white text-[14px] "
                          >
                            {item.srNo}
                          </th> */}
                          <td className="px-6 py-5 text-[14px]">
                            {item.transactionNo}
                          </td>
                          {/* <td className="px-6 py-5 text-[14px]">
                            {item.subscriptionType}
                          </td> */}
                          <td className="px-6 py-5 text-[14px]">
                            {item.plan_type}-{item.subscriptionType}
                          </td>
                          <td className=" px-6 py-5 text-[14px] ">
                            {item.transactionDate
                              .split("-")
                              .reverse()
                              .join("/")}
                          </td>
                          <td className="px-6 py-5 text-[14px]">
                            {item.amountPaid.toFixed(2)}
                          </td>
                          <td className=" px-6 py-5 text-[14px]">
                            {item.status}
                          </td>
                          {/* <td className="px-10 py-5 text-[14px]">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z"
                                fill="white"
                              />
                            </svg>
                          </td> */}
                          {/* <td className="flex px-8 py-5 text-[14px] gap-4 "> */}
                            {/* <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.9987 13.333C11.0404 13.333 11.9258 12.9684 12.6549 12.2393C13.3841 11.5101 13.7487 10.6247 13.7487 9.58301C13.7487 8.54134 13.3841 7.65592 12.6549 6.92676C11.9258 6.19759 11.0404 5.83301 9.9987 5.83301C8.95703 5.83301 8.07161 6.19759 7.34245 6.92676C6.61328 7.65592 6.2487 8.54134 6.2487 9.58301C6.2487 10.6247 6.61328 11.5101 7.34245 12.2393C8.07161 12.9684 8.95703 13.333 9.9987 13.333ZM9.9987 11.833C9.3737 11.833 8.84245 11.6143 8.40495 11.1768C7.96745 10.7393 7.7487 10.208 7.7487 9.58301C7.7487 8.95801 7.96745 8.42676 8.40495 7.98926C8.84245 7.55176 9.3737 7.33301 9.9987 7.33301C10.6237 7.33301 11.1549 7.55176 11.5924 7.98926C12.0299 8.42676 12.2487 8.95801 12.2487 9.58301C12.2487 10.208 12.0299 10.7393 11.5924 11.1768C11.1549 11.6143 10.6237 11.833 9.9987 11.833ZM9.9987 15.833C7.97092 15.833 6.1237 15.267 4.45703 14.1351C2.79036 13.0031 1.58203 11.4858 0.832031 9.58301C1.58203 7.68023 2.79036 6.16287 4.45703 5.03092C6.1237 3.89898 7.97092 3.33301 9.9987 3.33301C12.0265 3.33301 13.8737 3.89898 15.5404 5.03092C17.207 6.16287 18.4154 7.68023 19.1654 9.58301C18.4154 11.4858 17.207 13.0031 15.5404 14.1351C13.8737 15.267 12.0265 15.833 9.9987 15.833ZM9.9987 14.1663C11.5681 14.1663 13.0091 13.7531 14.3216 12.9268C15.6341 12.1004 16.6376 10.9858 17.332 9.58301C16.6376 8.18023 15.6341 7.06565 14.3216 6.23926C13.0091 5.41287 11.5681 4.99967 9.9987 4.99967C8.42925 4.99967 6.98828 5.41287 5.67578 6.23926C4.36328 7.06565 3.35981 8.18023 2.66536 9.58301C3.35981 10.9858 4.36328 12.1004 5.67578 12.9268C6.98828 13.7531 8.42925 14.1663 9.9987 14.1663Z"
                                fill="white"
                              />
                            </svg> */}
                            {/* <div className=" cursor-pointer" onClick={()=>downloadInvoice(770)}>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z"
                                fill="white"
                              />
                            </svg>
                            </div> */}
                          {/* </td> */}
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </>
          {/* )} */}
        </div>
      </div>
      {popUp && (
        <Modal
          isOpen={popUp}
          className=""
          style={addTopPopup}
          onRequestClose={() => setPopUp(false)}
          ariaHideApp={false}
        >
          <div>
            {" "}
            <div className="flex justify-between mt-5">
              <div className="text-xl font-bold text-[#FFFFFF]">Cancel Subscription</div>

              <div
                className="pr-3 cursor-pointer"
                onClick={() => {
                  setPopUp(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#FFFFFF"
                    d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full my-5">
              <p className="w-full text-center text-[#FFFFFF] text-base">
                Are you sure you want to cancel the subscription?
              </p>
            </div>
            <div className="w-full flex gap-4 mb-5 justify-center items-center">
              <Button
                className="rounded-full w-40"
                onClick={() => {
                  setPopUp(false);
                }}
              >
                No
              </Button>
              <Button
                className="rounded-full w-40"
                onClick={() => {
                  
                  window.location.href = `/cancel-subscription`
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Billings;
