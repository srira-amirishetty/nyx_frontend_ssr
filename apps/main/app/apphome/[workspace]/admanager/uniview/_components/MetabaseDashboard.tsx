// "use client";

// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import Script from "next/script";
// import { useState } from "react";

// // const embedURL =
// //   "https://app.powerbi.com/view?r=eyJrIjoiMmFiM2JjMzAtOGIxNS00NzZlLTkyY2UtOTVmODE4N2MzYjUzIiwidCI6IjEyMDdkNDdkLTUzNzQtNGQzZS1hNzY1LTUxNTgzNDI2ZmE0OSJ9";

// const embedURL =
//   "https://app.powerbi.com/view?r=eyJrIjoiN2E2NzNkNDMtMGI2NS00YjIwLTk1ZTAtODkzNGVlZWFhNTg4IiwidCI6IjEyMDdkNDdkLTUzNzQtNGQzZS1hNzY1LTUxNTgzNDI2ZmE0OSJ9";

// const MetabaseDashboard = () => {
//   const [active, setActive] = useState(false);
//   const mutateToken = useMutation({
//     mutationKey: ["token"],
//     mutationFn: async () => {
//       const res = await axios.get(`/api/powerbi-token/${new Date()}`);
//       return res.data;
//     },
//     onSuccess: (res) => {
//       loadPowerBIReport(res.access_token);
//     },
//   });

//   const loadPowerBIReport = (access_token: string) => {
//     // @ts-ignore
//     const models = window["powerbi-client"].models;

//     const basicFilter = {
//       $schema: "http://powerbi.com/product/schema#basic",
//       target: {
//         table: "Baise-Jun-1-2024-to-Aug-14-2024",
//         column: "Campaign name",
//       },
//       operator: "In",
//       values: ["GR-002_Ind_MOF_Conversion_CustomPixel_181023"],
//       filterType: models.FilterType.Basic,
//     };

//     // Replace with your actual values
//     const embedConfig = {
//       type: "report",
//       id: "b25ad361-d0d7-49a0-8640-e5352fa7f3b8",
//       embedUrl: embedURL,
//       accessToken: access_token,
//       tokenType: models.TokenType.Embed,
//       filters: [basicFilter],
//       settings: {
//         background: models.BackgroundType.Transparent,
//       },
//     };

//     const reportContainer = document.getElementById("reportContainer");
//     // @ts-ignore
//     const report = window.powerbi.embed(reportContainer, embedConfig);
//     setActive(true);
//     console.log("report", report);
//     report.on("error", (error: unknown) => {
//       console.log("Error---", error);
//     });
//   };

//   return (
//     <div className="w-full h-[100vh] relative">
//       <Script
//         src="https://cdn.jsdelivr.net/npm/powerbi-client@2.23.1/dist/powerbi.min.js"
//         strategy="afterInteractive"
//         onLoad={mutateToken.mutate}
//       ></Script>

//       <div id="reportContainer" className="w-full h-[100vh]"></div>
//       {active && (
//         <div className="w-full h-[60px] bg-[#3B236F] absolute inset-x-0 bottom-0"></div>
//       )}
//     </div>
//   );
// };

// export default MetabaseDashboard;

"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Script from "next/script";
import { useState } from "react";

const embedURL =
  "https://app.powerbi.com/view?r=eyJrIjoiN2E2NzNkNDMtMGI2NS00YjIwLTk1ZTAtODkzNGVlZWFhNTg4IiwidCI6IjEyMDdkNDdkLTUzNzQtNGQzZS1hNzY1LTUxNTgzNDI2ZmE0OSJ9";

const MetabaseDashboard = () => {
  const [active, setActive] = useState(false);
  const mutateToken = useMutation({
    mutationKey: ["token"],
    mutationFn: async () => {
      const res = await axios.get(`/api/powerbi-token/${new Date()}`);
      return res.data;
    },
    onSuccess: (res) => {
      loadPowerBIReport(res.access_token);
    },
  });

  const loadPowerBIReport = (access_token: string) => {
    // @ts-ignore
    const models = window["powerbi-client"].models;

    const embedConfig = {
      type: "report",
      id: "b25ad361-d0d7-49a0-8640-e5352fa7f3b8",
      embedUrl: embedURL,
      accessToken: access_token,
      tokenType: models.TokenType.Embed,
      settings: {
        background: models.BackgroundType.Transparent,
      },
      effectiveIdentity: [
        {
          username: "GR-004", // This should match the role name in Power BI
          roles: ["GR-004"],
          datasets: ["9cbe9e60-629a-43b8-92f6-fa8115bf3689"], // Replace with your actual dataset ID
        },
      ],
    };

    const reportContainer = document.getElementById("reportContainer");
    // @ts-ignore
    const report = window.powerbi.embed(reportContainer, embedConfig);
    setActive(true);
    console.log("report", report);
    report.on("error", (error: unknown) => {
      console.log("Error---", error);
    });
  };

  return (
    <div className="w-full h-[100vh] relative">
      <Script
        src="https://cdn.jsdelivr.net/npm/powerbi-client@2.23.1/dist/powerbi.min.js"
        strategy="afterInteractive"
        onLoad={mutateToken.mutate}
      ></Script>

      <div id="reportContainer" className="w-full h-[100vh]"></div>
      {active && (
        <div className="w-full h-[60px] bg-[#3B236F] absolute inset-x-0 bottom-0"></div>
      )}
    </div>
  );
};

export default MetabaseDashboard;
