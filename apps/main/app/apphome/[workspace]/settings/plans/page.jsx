"use client";
import "../index.css";
import React, { useState, useContext } from "react";
import { getPackagesService } from "@nyx-frontend/main/services/productService";
import { PriceTabsWebapp } from "@nyx-frontend/main/shared/inputs";
import { PLAN_TABS } from "@nyx-frontend/main/utils/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import RazorPaySDK, { useMakePayment } from "@nyx-frontend/main/components/RazorPaySDK";
import Modal from "react-modal";
import OrderModal from "@nyx-frontend/main/modals/Order";
import { OrderPaymentStyle } from "@nyx-frontend/main/utils/modalstyles";
import {
  createOrderServices,
  validateOrderServices,
  createOrderServicesPayU,
} from "@nyx-frontend/main/services/pricing";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { paymentWarningStyle } from "@nyx-frontend/main/utils/modalstyles";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import cookie from "cookiejs";
import { sendEmailVerification } from "@nyx-frontend/main/services/loginService";
import { onetimeemailverification } from "@nyx-frontend/main/utils/modalstyles";

const Plans = () => {
  const router = useRouter();
  const [planTab, setPlanTab] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const { payment } = useMakePayment();
  const [orderStatus, setOrderStatus] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [warning, setWarning] = useState(false);
  const [validateFailed, setValidateFailed] = useState(false);
  const [createOrderFailed, setCreateOrderFailed] = useState(false);
  const [emailverivication, setemailverivication] = useState("");
  const [firsttimepopup, setfirsttimepopup] = useState(false);
  const [firsttimepopup2, setfirsttimepopup2] = useState(false);
  const [validitycheck, setvaliditycheck] = useState(false);
  const [emailexisted, setemailexisted] = useState(false);
  const { userDetails } = useContext(UseContextData);

  const { data: plandata, isLoading } = useQuery({
    queryKey: ["plan-data"],
    queryFn: getPackagesService,
  });

  const mutateCreateOrderProcess = useMutation({
    mutationKey: ["create-order"],
    mutationFn: createOrderServicesPayU,
  });

  const mutateValidateOrderProcess = useMutation({
    mutationKey: ["validate-order"],
    mutationFn: validateOrderServices,
  });

  const completeOrderProcess = () => {
    setOrderStatus(true);
    setShowOrderStatus(true);
  };

  const startPaymetProcess = (id) => {
    const hasCookie = cookie.get("notverifieduser");

    if (hasCookie) {
      setfirsttimepopup(true);
    } else {
      setSelectedId(id);
      let payload = {
        packageId: id,
      };

      mutateCreateOrderProcess.mutate(payload, {
        onSuccess: (response) => {
          //const paymentData = response.data.subscriptionData;
          const paymentData = response.subscriptionData;

          console.log("paymentData", paymentData);

          if (paymentData.url) {
            return (window.location.href = paymentData.url);
          }

          // Create a form and submit it
          const form = document.createElement("form");
          form.setAttribute("method", "post");
          form.setAttribute("action", process.env.NEXT_PUBLIC_PAYU_URL); // Use 'https://secure.payu.in/_payment' for production

          for (const key in paymentData) {
            if (paymentData.hasOwnProperty(key)) {
              const hiddenField = document.createElement("input");
              hiddenField.setAttribute("type", "hidden");
              hiddenField.setAttribute("name", key);
              hiddenField.setAttribute("value", paymentData[key]);
              form.appendChild(hiddenField);
            }
          }

          document.body.appendChild(form);
          form.submit();
        },
        onError: () => {
          setCreateOrderFailed(true);
        },
      });
    }
  };

  const handleCloseOrderStatus = () => {
    setShowOrderStatus(false);
  };

  const mutatemailsend = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: sendEmailVerification,
  });

  const NextButtonEmailVerification = () => {
    const valid = /^\S+@\S+\.\S+$/.test(emailverivication);
    if (valid) {
      const data = {
        email: emailverivication,
      };
      mutatemailsend.mutate(data, {
        onSuccess: (response) => {
          console.log(response);
          setfirsttimepopup(false);
          setfirsttimepopup2(true);
        },
        onError: (error) => {
          console.error(error);
          setemailexisted(true);
        },
      });
    } else {
      setvaliditycheck(true);
    }
  };
  const continueToVerification = (e) => {
    setfirsttimepopup2(false);
  };
  const emailverificationsubmit = (e) => {
    e.preventDefault();
    setemailverivication(e.target.value);
    setvaliditycheck(false);
    setemailexisted(false);
  };
  const skipverification = () => {
    setfirsttimepopup(false);
    setfirsttimepopup2(false);
  };
  const backverification = () => {
    setfirsttimepopup(true);
    setfirsttimepopup2(false);
  };

  return (
    // <div>
    //   <div className="px-3 pt-[42px] md:pt-[72px] pb-20 md:py-[200px] md:px-[20px]">
    //     <div className="w-full flex justify-center items-center pb-[49px] md:pb-[58px]">
    //       <div
    //         className="flex justify-center items-center h-[43px] lg:h-[63px] w-max rounded-full bg-[#7048D7]"
    //         // style={{
    //         //   background:
    //         //     "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
    //         // }}
    //       >
    //         <PriceTabsWebapp
    //           data={PLAN_TABS}
    //           tabState={setPlanTab}
    //           tabStatus={planTab}
    //         />
    //       </div>
    //     </div>

    //     {isLoading ? (
    //       <div className="w-full flex flex-col md:flex-row gap-5 justify-center">
    //         <h2>Loading...</h2>
    //       </div>
    //     ) : (
    //       <>
    //         {planTab === 0 && (
    //           <div className="xl:overflow-hidden xl:overflow-x-auto xl:max-w-[950px] xl:mx-auto">
    //             <div className="w-full flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-5 justify-center xl:justify-start lg_responsive">
    //               {plandata?.nyx_packages["Pre-defined"]
    //                 .filter(
    //                   (value) =>
    //                     // value.packageType === "Free" ||
    //                     value.packageType === "Monthly",
    //                 )
    //                 .map((item, index) => (
    //                   <div
    //                     key={index}
    //                     className="w-full md:w-[301px] xl:min-w-[301px] h-auto rounded-2xl px-[16px] py-[42px] flex flex-row md:flex-col bg-[#3B226F] border-2 border-[#F1BB2E]"
    //                   >
    //                     <div className="w-full h-[43%] md:h-[36%] xl:h-[43%] flex flex-col pricing_upperPart">
    //                       <div className="w-full flex flex-col md:flex-row justify-between">
    //                         <div className="text-[#FFFFFF] text-[18px] md:text-[31px] font-[500]">
    //                           {item?.packageName}
    //                         </div>
    //                         {item?.packageName === "Pro" && (
    //                           <div className="bg-[#7048D7] flex items-center justify-center mb-2 md:mb-0 rounded-full w-[67px] h-[25px] md:w-[91px] md:h-[33px] text-white text-[11px] md:text-[14px]">
    //                             Popular
    //                           </div>
    //                         )}
    //                       </div>

    //                       <div className="text-[#CACACA] text-[11px] md:text-[14px] font-[400] price_plan_description">
    //                         {item?.description?.title}
    //                       </div>
    //                       {item?.packageName === "Enterprise" ? (
    //                         <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
    //                           Custom
    //                         </div>
    //                       ) : item?.packageName === "Starter" ? (
    //                         <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
    //                           Free
    //                         </div>
    //                       ) : (
    //                         <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
    //                           {item?.currency == "INR" ? "₹" : "$"}
    //                           {item?.packagePrice}
    //                           <span className="text-[12px] font-[600]">
    //                             /Month
    //                           </span>
    //                         </div>
    //                       )}
    //                       <div
    //                         className="text-[#FFFFFF] text-[11px] md:text-[14px] font-[600]"
    //                         style={{ minHeight: "20px" }}
    //                       >
    //                         {item?.description?.credits}
    //                       </div>

    //                       <div className=" w-full p-[0.5px] bg-[#424242] my-5"></div>

    //                       {item?.description?.button === "Contact Us" ? (
    //                         <button
    //                           onClick={() => router.push("/demo")}
    //                           className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
    //                         >
    //                           <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
    //                             <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                               Get a demo
    //                             </div>
    //                           </div>
    //                         </button>
    //                       ) : item?.description?.button === "Get Started" ? (
    //                         <button
    //                           //onClick={getStartedButtonClicked}
    //                           className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
    //                         >
    //                           <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
    //                             <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                               Get Started
    //                             </div>
    //                           </div>
    //                         </button>
    //                       ) : item?.subscribed === true ? (
    //                         <div
    //                           className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0 text-center cursor-not-allowed"
    //                           title="Package Already Subscribed"
    //                         >
    //                           <div className="text-[#F1BB2E] px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent border-2 border-[#F1BB2E]">
    //                             <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                               Subscribed
    //                             </div>
    //                           </div>
    //                         </div>
    //                       ) : (
    //                         <>
    //                           {item?.currency == "INR" ? (
    //                             <button
    //                               onClick={() =>
    //                                 startPaymetProcess(item?.packageId)
    //                               }
    //                               className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
    //                             >
    //                               <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
    //                                 <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                                   {mutateCreateOrderProcess.isPending &&
    //                                   selectedId === item?.packageId ? (
    //                                     <ButtonLoading />
    //                                   ) : (
    //                                     "Subscribe"
    //                                   )}
    //                                 </div>
    //                               </div>
    //                             </button>
    //                           ) : (
    //                             <button
    //                               onClick={() => router.push("/demo")}
    //                               className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
    //                             >
    //                               <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
    //                                 <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                                   Contact Us
    //                                 </div>
    //                               </div>
    //                             </button>
    //                           )}
    //                         </>
    //                       )}
    //                     </div>
    //                     <div className="w-full relative h-[54%] flex flex-col md:mt-6 lg:mt-4 xl:mt-0 ml-4">
    //                       <div className="w-full flex">
    //                         <ol className="price_data">
    //                           {item.description.features.map((item, index) => (
    //                             <li key={index} className="flex w-full gap-2">
    //                               <div className="w-4 h-4 md:w-5 md:h-5 mt-[1px] md:mt-[8px] mr-1 flex justify-center items-start">
    //                                 <svg
    //                                   viewBox="0 0 20 21"
    //                                   fill="none"
    //                                   xmlns="http://www.w3.org/2000/svg"
    //                                 >
    //                                   <circle
    //                                     cx="10.0358"
    //                                     cy="10.7116"
    //                                     r="8.29753"
    //                                     fill="white"
    //                                     fill-opacity="0.15"
    //                                   />
    //                                   <path
    //                                     d="M10.0013 2.41406C5.4088 2.41406 1.66797 6.15489 1.66797 10.7474C1.66797 15.3399 5.4088 19.0807 10.0013 19.0807C14.5938 19.0807 18.3346 15.3399 18.3346 10.7474C18.3346 6.15489 14.5938 2.41406 10.0013 2.41406ZM10.0013 4.08073C13.6931 4.08073 16.668 7.05563 16.668 10.7474C16.668 14.4392 13.6931 17.4141 10.0013 17.4141C6.30953 17.4141 3.33464 14.4392 3.33464 10.7474C3.33464 7.05563 6.30953 4.08073 10.0013 4.08073ZM13.5788 7.6582L8.33464 12.9023L6.42383 10.9915L5.24544 12.1699L8.33464 15.2591L14.7572 8.83659L13.5788 7.6582Z"
    //                                     fill="#CACACA"
    //                                   />
    //                                 </svg>
    //                               </div>
    //                               <div
    //                                 className="w-[85%] text-[#CACACA] text-[11px] md:text-[14px] font-[400] leading-[12px] md:leading-[18px] my-[4px] md:my-[10px]"
    //                                 dangerouslySetInnerHTML={{ __html: item }}
    //                               ></div>
    //                             </li>
    //                           ))}
    //                         </ol>
    //                       </div>
    //                       {item?.packagePrice === 0 && (
    //                         <div className="ml-2 md:absolute md:-bottom-6 flex justify-start text-[#CACACA] text-[11px] md:text-[14px] font-[400]">
    //                           <span className="text-red-800">*</span>(removed
    //                           after 90 days since subscription)
    //                         </div>
    //                       )}
    //                     </div>
    //                   </div>
    //                 ))}
    //             </div>
    //           </div>
    //         )}

    //         {planTab === 1 && (
    //           <div className="xl:overflow-hidden xl:overflow-x-auto xl:max-w-[950px] xl:mx-auto">
    //             <div className="w-full flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-5 justify-center xl:justify-start lg_responsive">
    //               {plandata?.nyx_packages["Pre-defined"]
    //                 .filter(
    //                   (value) =>
    //                     // value.packageType === "Free" ||
    //                     value.packageType === "Yearly",
    //                 )
    //                 .map((item, index) => (
    //                   <div
    //                     key={index}
    //                     className="w-full md:w-[301px] xl:min-w-[301px] h-auto rounded-2xl px-[16px] py-[42px] flex flex-row md:flex-col bg-[#3B226F] border-2 border-[#F1BB2E]"
    //                   >
    //                     <div className="w-full h-[43%] md:h-[36%] xl:h-[43%] flex flex-col pricing_upperPart">
    //                       <div className="w-full flex flex-col md:flex-row justify-between">
    //                         <div className="text-[#FFFFFF] text-[18px] md:text-[31px] font-[500]">
    //                           {item?.packageName}
    //                         </div>
    //                         {item?.packageName === "Pro" && (
    //                           <div className="bg-[#7048D7] flex items-center justify-center mb-2 md:mb-0 rounded-full w-[67px] h-[25px] md:w-[91px] md:h-[33px] text-white text-[11px] md:text-[14px]">
    //                             Popular
    //                           </div>
    //                         )}
    //                       </div>

    //                       <div className="text-[#CACACA] text-[11px] md:text-[14px] font-[400] price_plan_description_yearly">
    //                         {item?.description?.title}
    //                       </div>
    //                       {item?.packageName === "Enterprise" ? (
    //                         <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
    //                           Custom
    //                         </div>
    //                       ) : item?.packageName === "Starter" ? (
    //                         <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
    //                           Free
    //                         </div>
    //                       ) : (
    //                         <div className="flex gap-2 flex-col md:flex-row md:items-center">
    //                           <div className="text-[#FFFFFF] text-[24px] md:text-[41px] font-[500]">
    //                             {item?.currency == "INR" ? "₹" : "$"}
    //                             {item?.packagePrice}
    //                           </div>
    //                           <div className=" md:mt-3 xl:mt-3 text-[#FFFFFF] text-[11px] md:text-[12px] font-normal">
    //                             per month billed annually as{" "}
    //                             {item?.currency == "INR" ? "₹" : "$"}
    //                             {item?.packagePrice * 12}
    //                           </div>
    //                         </div>
    //                       )}

    //                       <div
    //                         className="text-[#FFFFFF] text-[11px] md:text-[14px] font-[600]"
    //                         style={{ minHeight: "20px" }}
    //                       >
    //                         {item?.description?.credits}
    //                         {(item?.packageName === "Pro" ||
    //                           item?.packageName === "Premium") &&
    //                           "/month"}
    //                         {item?.packageName === "Free" ? "" : null}
    //                         {item?.packageName === "Enterprise" ? "" : null}
    //                       </div>

    //                       <div className=" w-full p-[0.5px] bg-[#424242] my-5"></div>

    //                       {item?.description?.button === "Contact Us" ? (
    //                         <button
    //                           onClick={() => router.push("/demo")}
    //                           className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
    //                         >
    //                           <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
    //                             <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                               Get a demo
    //                             </div>
    //                           </div>
    //                         </button>
    //                       ) : item?.description?.button === "Get Started" ? (
    //                         <button
    //                           //onClick={getStartedButtonClicked}
    //                           className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
    //                         >
    //                           <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
    //                             <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                               Get Started
    //                             </div>
    //                           </div>
    //                         </button>
    //                       ) : item?.subscribed === true ? (
    //                         <div
    //                           className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0 text-center cursor-not-allowed"
    //                           title="Package Already Subscribed"
    //                         >
    //                           <div className="text-[#F1BB2E] px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent border-2 border-[#F1BB2E]">
    //                             <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                               Subscribed
    //                             </div>
    //                           </div>
    //                         </div>
    //                       ) : (
    //                         <>
    //                           {item?.currency == "INR" ? (
    //                             <button
    //                               onClick={() =>
    //                                 startPaymetProcess(item?.packageId)
    //                               }
    //                               className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
    //                             >
    //                               <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
    //                                 <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                                   {mutateCreateOrderProcess.isPending &&
    //                                   selectedId === item?.packageId ? (
    //                                     <ButtonLoading />
    //                                   ) : (
    //                                     "Subscribe"
    //                                   )}
    //                                 </div>
    //                               </div>
    //                             </button>
    //                           ) : (
    //                             <button
    //                               onClick={() => router.push("/demo")}
    //                               className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
    //                             >
    //                               <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
    //                                 <div className="w-full  text-[12px] md:text-[16px] font-semibold">
    //                                   Contact Us
    //                                 </div>
    //                               </div>
    //                             </button>
    //                           )}
    //                         </>
    //                       )}
    //                     </div>
    //                     <div className="w-full relative h-[54%] flex flex-col md:mt-6 lg:mt-4 xl:mt-0 ml-4">
    //                       <div className="w-full flex">
    //                         <ol className="price_data">
    //                           {item.description.features.map((item, index) => (
    //                             <li key={index} className="flex w-full gap-2">
    //                               <div className="w-4 h-4 md:w-5 md:h-5 mt-[1px] md:mt-[8px] mr-1 flex justify-center items-start">
    //                                 <svg
    //                                   viewBox="0 0 20 21"
    //                                   fill="none"
    //                                   xmlns="http://www.w3.org/2000/svg"
    //                                 >
    //                                   <circle
    //                                     cx="10.0358"
    //                                     cy="10.7116"
    //                                     r="8.29753"
    //                                     fill="white"
    //                                     fill-opacity="0.15"
    //                                   />
    //                                   <path
    //                                     d="M10.0013 2.41406C5.4088 2.41406 1.66797 6.15489 1.66797 10.7474C1.66797 15.3399 5.4088 19.0807 10.0013 19.0807C14.5938 19.0807 18.3346 15.3399 18.3346 10.7474C18.3346 6.15489 14.5938 2.41406 10.0013 2.41406ZM10.0013 4.08073C13.6931 4.08073 16.668 7.05563 16.668 10.7474C16.668 14.4392 13.6931 17.4141 10.0013 17.4141C6.30953 17.4141 3.33464 14.4392 3.33464 10.7474C3.33464 7.05563 6.30953 4.08073 10.0013 4.08073ZM13.5788 7.6582L8.33464 12.9023L6.42383 10.9915L5.24544 12.1699L8.33464 15.2591L14.7572 8.83659L13.5788 7.6582Z"
    //                                     fill="#CACACA"
    //                                   />
    //                                 </svg>
    //                               </div>
    //                               <div
    //                                 className="w-[85%] text-[#CACACA] text-[11px] md:text-[14px] font-[400] leading-[12px] md:leading-[18px] my-[4px] md:my-[10px]"
    //                                 dangerouslySetInnerHTML={{ __html: item }}
    //                               ></div>
    //                             </li>
    //                           ))}
    //                         </ol>
    //                       </div>
    //                       {item?.packagePrice === 0 && (
    //                         <div className="ml-2 md:absolute md:-bottom-6 flex justify-start text-[#CACACA] text-[11px] md:text-[14px] font-[400]">
    //                           <span className="text-red-800">*</span>(removed
    //                           after 90 days since subscription)
    //                         </div>
    //                       )}
    //                     </div>
    //                   </div>
    //                 ))}
    //             </div>
    //           </div>
    //         )}
    //       </>
    //     )}
    //   </div>

    //   {warning ? (
    //     <Modal isOpen={warning} style={paymentWarningStyle}>
    //       <div className="w-full text-[#FFCB54] flex flex-col text-lg font-semibold mt-10 gap-3 text-center">
    //         Don&apos;t close the window, transaction in progress.
    //         <div className="w-full flex justify-center items-center">
    //           <ButtonLoading />
    //         </div>
    //       </div>
    //     </Modal>
    //   ) : null}

    //   {validateFailed ? (
    //     <Modal isOpen={validateFailed} style={paymentWarningStyle}>
    //       <div className="w-full text-[#FFCB54] flex flex-col text-lg font-semibold mt-5 gap-3 text-center">
    //         Transaction Failed !
    //       </div>
    //       <div className="w-full text-[#FFFFFF] flex flex-col text-sm font-semibold text-center mb-5">
    //         If money is deducted from your account, it will be refunded.
    //       </div>
    //       <div className="flex w-full justify-center items-center">
    //         <button
    //           className={
    //             "w-full md:w-[40%] block text-white cursor-pointer hover:text-black hover:bg-amber-300 border border-amber-400 font-bold rounded-full md:py-2 text-center mr-2"
    //           }
    //           onClick={() => setValidateFailed(false)}
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </Modal>
    //   ) : null}

    //   {createOrderFailed ? (
    //     <Modal isOpen={createOrderFailed} style={paymentWarningStyle}>
    //       <div className="w-full text-[#FFCB54] flex flex-col text-lg font-semibold my-5 gap-3 text-center">
    //         Error while creating order, please try again later.
    //       </div>
    //       <div className="flex w-full justify-center items-center">
    //         <button
    //           className={
    //             "w-full md:w-[40%] block text-white cursor-pointer hover:text-black hover:bg-amber-300 border border-amber-400 font-bold rounded-full md:py-2 text-center mr-2"
    //           }
    //           onClick={() => setCreateOrderFailed(false)}
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </Modal>
    //   ) : null}

    //   {firsttimepopup ? (
    //     <Modal
    //       isOpen={firsttimepopup}
    //       style={onetimeemailverification}
    //       // onRequestClose={onLastClose}
    //     >
    //       <div className="w-[550px] h-[400px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
    //         <div className="w-full flex flex-col gap-3">
    //           <h2 className="text-center text-[31px] font-[600] mt-8 text-[#FFF]">
    //             Enter your Email
    //           </h2>
    //           <p className="text-center text-[18px] font-[400] text-[#FFF]">
    //             to use Nyx products and workspace
    //           </p>
    //         </div>
    //         <p className="text-white flex justify-center items-center text-[12px] mt-5">
    //           Use your organization email for extra rewards.
    //         </p>

    //         <div className="w-full h-full flex flex-col mt-1">
    //           <input
    //             type="text"
    //             className="w-full bg-transparent border text-white border-[#8297BD] text-[14px] rounded-md p-2 font-normal  focus:placeholder-transparent"
    //             placeholder="email@gmail.com"
    //             value={emailverivication}
    //             onChange={emailverificationsubmit}
    //           />
    //           {validitycheck && (
    //             <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">
    //               Please enter valid Email Address
    //             </p>
    //           )}
    //           {emailexisted && (
    //             <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">
    //               Email Address is already in use
    //             </p>
    //           )}
    //         </div>
    //         <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
    //           <button
    //             className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
    //             onClick={skipverification}
    //           >
    //             <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
    //               <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
    //                 <div className="text-[14px] font-normal text-white ">
    //                   Skip
    //                 </div>
    //               </span>
    //             </div>
    //           </button>
    //           <button
    //             type="submit"
    //             className={
    //               false
    //                 ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
    //                 : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
    //             }
    //             onClick={NextButtonEmailVerification}
    //           >
    //             Verify
    //           </button>
    //         </div>
    //       </div>
    //     </Modal>
    //   ) : null}
    //   {firsttimepopup2 ? (
    //     <Modal
    //       isOpen={firsttimepopup2}
    //       style={onetimeemailverification}
    //       // onRequestClose={onLastClose}
    //     >
    //       <div className="w-[550px] h-[400px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
    //         <div className="w-full flex flex-col gap-3">
    //           <h2 className="text-center text-[31px] font-[600] mt-14 mb-8 text-[#FFF]">
    //             Thank you
    //           </h2>
    //           <p className="font-semibold  text-[14px] text-[#FFFFFF] flex justify-center items-center">
    //             A verification mail has been sent to your mail box.
    //           </p>
    //           <p className="font-semibold mb-2 mt-[-5px] text-[14px] text-[#FFFFFF] flex justify-center items-center">
    //             Kindly click on the given link
    //           </p>
    //         </div>
    //         <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
    //           <button
    //             className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
    //             onClick={backverification}
    //           >
    //             <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
    //               <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
    //                 <div className="text-[14px] font-normal text-white ">
    //                   Back
    //                 </div>
    //               </span>
    //             </div>
    //           </button>
    //           <button
    //             type="submit"
    //             className={
    //               false
    //                 ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
    //                 : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
    //             }
    //             onClick={continueToVerification}
    //           >
    //             Continue
    //           </button>
    //         </div>
    //       </div>
    //     </Modal>
    //   ) : null}
    // </div>

    <div>
      <div className="px-3 pt-[22px] md:pt-[35px] pb-20 md:py-[200px] md:px-[20px]">
        {isLoading ? (
          <div className="w-full flex flex-col md:flex-row gap-5 justify-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-5 justify-center lg_responsive">
              {plandata?.nyx_packages["Pre-defined"]
                .filter((value) => value.packageType === "Monthly")
                .map((item, index) => (
                  <div
                    key={index}
                    className="w-full md:w-[340px] xl:min-w-[340px] h-auto rounded-2xl px-[16px] py-[32px] flex flex-row md:flex-col bg-[#332270] border-2 border-[#F1BB2E]"
                  >
                    <div className="w-full flex flex-col">
                      <div className="w-full flex flex-col md:flex-row justify-between">
                        <div className="text-[#FFFFFF] text-[18px] md:text-[31px] font-[500]">
                          {item?.packageName}
                        </div>
                      </div>

                      <div className="text-[#FFFFFF] text-[12px] md:text-[16px] font-[400] my-2">
                        {item?.description?.pricing}
                      </div>

                      <div
                        className="text-[#FFFFFF] text-[12px] font-[400]"
                        style={{ minHeight: "20px" }}
                      >
                        {item?.description?.credits}
                      </div>

                      <div className=" w-full p-[0.5px] bg-[#424242] my-5"></div>

                      <button
                        onClick={() => router.push("/demo")}
                        className="px-[0.9px] py-[0.9px] rounded-full md:mb-12 lg:mb-0"
                      >
                        <div className="text-[#F1BB2E] hover:text-black px-4 py-2 md:px-6 md:py-2 flex items-center justify-center h-[36px] md:h-[52px] rounded-full bg-transparent hover:bg-[#F1BB2E] border-2 border-[#F1BB2E]">
                          <div className="w-full  text-[12px] md:text-[16px] font-semibold">
                            {item?.description?.button}
                          </div>
                        </div>
                      </button>
                      <div className=" w-full mt-5"></div>
                    </div>
                    <div className="w-full relative flex flex-col">
                      <div className="w-full flex">
                        <ol className="price_data">
                          {item.description.features.map((item, index) => (
                            <li key={index} className="flex w-full gap-2">
                              <div className="w-4 h-4 md:w-5 md:h-5 mt-[1px] md:mt-[8px] mr-1 flex justify-center items-start">
                                <svg
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="10.0358"
                                    cy="10.7116"
                                    r="8.29753"
                                    fill="white"
                                    fill-opacity="0.15"
                                  />
                                  <path
                                    d="M10.0013 2.41406C5.4088 2.41406 1.66797 6.15489 1.66797 10.7474C1.66797 15.3399 5.4088 19.0807 10.0013 19.0807C14.5938 19.0807 18.3346 15.3399 18.3346 10.7474C18.3346 6.15489 14.5938 2.41406 10.0013 2.41406ZM10.0013 4.08073C13.6931 4.08073 16.668 7.05563 16.668 10.7474C16.668 14.4392 13.6931 17.4141 10.0013 17.4141C6.30953 17.4141 3.33464 14.4392 3.33464 10.7474C3.33464 7.05563 6.30953 4.08073 10.0013 4.08073ZM13.5788 7.6582L8.33464 12.9023L6.42383 10.9915L5.24544 12.1699L8.33464 15.2591L14.7572 8.83659L13.5788 7.6582Z"
                                    fill="#CACACA"
                                  />
                                </svg>
                              </div>
                              <div
                                className="w-[85%] text-[#CACACA] text-[11px] md:text-[14px] font-[400] leading-[12px] md:leading-[18px] my-[4px] md:my-[10px]"
                                dangerouslySetInnerHTML={{ __html: item }}
                              ></div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      {warning ? (
        <Modal isOpen={warning} style={paymentWarningStyle}>
          <div className="w-full text-[#FFCB54] flex flex-col text-lg font-semibold mt-10 gap-3 text-center">
            Don&apos;t close the window, transaction in progress.
            <div className="w-full flex justify-center items-center">
              <ButtonLoading />
            </div>
          </div>
        </Modal>
      ) : null}

      {validateFailed ? (
        <Modal isOpen={validateFailed} style={paymentWarningStyle}>
          <div className="w-full text-[#FFCB54] flex flex-col text-lg font-semibold mt-5 gap-3 text-center">
            Transaction Failed !
          </div>
          <div className="w-full text-[#FFFFFF] flex flex-col text-sm font-semibold text-center mb-5">
            If money is deducted from your account, it will be refunded.
          </div>
          <div className="flex w-full justify-center items-center">
            <button
              className={
                "w-full md:w-[40%] block text-white cursor-pointer hover:text-black hover:bg-amber-300 border border-amber-400 font-bold rounded-full md:py-2 text-center mr-2"
              }
              onClick={() => setValidateFailed(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      ) : null}

      {createOrderFailed ? (
        <Modal isOpen={createOrderFailed} style={paymentWarningStyle}>
          <div className="w-full text-[#FFCB54] flex flex-col text-lg font-semibold my-5 gap-3 text-center">
            Error while creating order, please try again later.
          </div>
          <div className="flex w-full justify-center items-center">
            <button
              className={
                "w-full md:w-[40%] block text-white cursor-pointer hover:text-black hover:bg-amber-300 border border-amber-400 font-bold rounded-full md:py-2 text-center mr-2"
              }
              onClick={() => setCreateOrderFailed(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      ) : null}

      {firsttimepopup ? (
        <Modal
          isOpen={firsttimepopup}
          style={onetimeemailverification}
          // onRequestClose={onLastClose}
        >
          <div className="w-[550px] h-[400px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[31px] font-[600] mt-8 text-[#FFF]">
                Enter your Email
              </h2>
              <p className="text-center text-[18px] font-[400] text-[#FFF]">
                to use Nyx products and workspace
              </p>
            </div>
            <p className="text-white flex justify-center items-center text-[12px] mt-5">
              Use your organization email for extra rewards.
            </p>

            <div className="w-full h-full flex flex-col mt-1">
              <input
                type="text"
                className="w-full bg-transparent border text-white border-[#8297BD] text-[14px] rounded-md p-2 font-normal  focus:placeholder-transparent"
                placeholder="email@gmail.com"
                value={emailverivication}
                onChange={emailverificationsubmit}
              />
              {validitycheck && (
                <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">
                  Please enter valid Email Address
                </p>
              )}
              {emailexisted && (
                <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">
                  Email Address is already in use
                </p>
              )}
            </div>
            <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
              <button
                className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
                onClick={skipverification}
              >
                <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                  <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
                    <div className="text-[14px] font-normal text-white ">
                      Skip
                    </div>
                  </span>
                </div>
              </button>
              <button
                type="submit"
                className={
                  false
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={NextButtonEmailVerification}
              >
                Verify
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {firsttimepopup2 ? (
        <Modal
          isOpen={firsttimepopup2}
          style={onetimeemailverification}
          // onRequestClose={onLastClose}
        >
          <div className="w-[550px] h-[400px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[31px] font-[600] mt-14 mb-8 text-[#FFF]">
                Thank you
              </h2>
              <p className="font-semibold  text-[14px] text-[#FFFFFF] flex justify-center items-center">
                A verification mail has been sent to your mail box.
              </p>
              <p className="font-semibold mb-2 mt-[-5px] text-[14px] text-[#FFFFFF] flex justify-center items-center">
                Kindly click on the given link
              </p>
            </div>
            <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
              <button
                className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
                onClick={backverification}
              >
                <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                  <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
                    <div className="text-[14px] font-normal text-white ">
                      Back
                    </div>
                  </span>
                </div>
              </button>
              <button
                type="submit"
                className={
                  false
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={continueToVerification}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Plans;
