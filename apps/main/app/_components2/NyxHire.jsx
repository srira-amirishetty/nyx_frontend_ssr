// "use client";
// import React, { useState } from "react";
// import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
// import Image from "next/image";
// import Rive from "./Rive";
// import Rive2 from "./Rive2";
// import Rive3 from "./Rive3";
// import "./style.css";

// const NyxHire = () => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="relative NYXHireSEC"
//       onMouseEnter={() => setIsHovered(true)} // Trigger hover effect
//       onMouseLeave={() => setIsHovered(false)} // Reset hover effect
//     >
//       <div className="absolute left-[-20%] top-[-25%]">
//         <Image
//           src={`${IMAGE_URL}/assets/images/home/NyxHireBgLight.png`}
//           width={800}
//           height={769}
//           alt=""
//         />
//       </div>
//       <div className="bg-[#15072A] px-[25px] md:px-[79px]">
//         <h3 className="py-[61px] font-bold text-[18px] leading-[24px] md:text-[40px] md:leading-[58px] text-center text-white">
//           Hire NYX AI agent to achieve the best ROI
//         </h3>
//         <div className="pb-[97px] flex flex-wrap  max-md:flex-col items-center justify-center">
//           <Rive isHovered={isHovered} />
//           <span className="max-md:hidden">
//             <svg
//               width="47"
//               height="37"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
//                 fill="#000"
//               />
//               <path
//                 d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
//                 fill="url(#a)"
//               />
//               <defs>
//                 <linearGradient
//                   id="a"
//                   x1="21.544"
//                   y1="0"
//                   x2="11.648"
//                   y2="35.342"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#B631B1" />
//                   <stop offset=".695" stop-color="#7048D7" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </span>
//           <span className="md:hidden">
//             <svg
//               width="32"
//               height="33"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
//                 fill="#000"
//               />
//               <path
//                 d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
//                 fill="url(#gradient)"
//               />
//               <defs>
//                 <linearGradient
//                   id="gradient"
//                   x1="27.513"
//                   y1="15.236"
//                   x2="5.111"
//                   y2="8.957"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#B631B1" />
//                   <stop offset=".695" stop-color="#7048D7" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </span>
//           <Rive2 isHovered={isHovered} />
//           <span className="max-md:hidden">
//             <svg
//               width="47"
//               height="37"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
//                 fill="#000"
//               />
//               <path
//                 d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
//                 fill="url(#a)"
//               />
//               <defs>
//                 <linearGradient
//                   id="a"
//                   x1="21.544"
//                   y1="0"
//                   x2="11.648"
//                   y2="35.342"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#B631B1" />
//                   <stop offset=".695" stop-color="#7048D7" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </span>
//           <span className="md:hidden">
//             <svg
//               width="32"
//               height="33"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
//                 fill="#000"
//               />
//               <path
//                 d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
//                 fill="url(#gradient)"
//               />
//               <defs>
//                 <linearGradient
//                   id="gradient"
//                   x1="27.513"
//                   y1="15.236"
//                   x2="5.111"
//                   y2="8.957"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#B631B1" />
//                   <stop offset=".695" stop-color="#7048D7" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </span>
//           <Rive3 isHovered={isHovered} />
//         </div>
//         <h3 className="pt-[51px] pb-[61px] font-bold text-[18px] leading-[30px] md:text-[40px] md:leading-[58px] text-center text-white">
//           NYX Can Help You with
//         </h3>
//         <div className="flex items-center justify-center gap-[19px] pb-[146px] flex-wrap">
//           <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
//             <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
//               <Image
//                 src={`${IMAGE_URL}/assets/images/home/h1.png`}
//                 width={58}
//                 height={58}
//                 alt=""
//                 className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
//               />
//             </div>
//             <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
//               High <br /> Converting Ad Creatives
//             </p>
//           </div>
//           <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
//             <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
//               <Image
//                 src={`${IMAGE_URL}/assets/images/home/h2.png`}
//                 width={58}
//                 height={58}
//                 alt=""
//                 className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
//               />
//             </div>
//             <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
//               Streaming <br /> Marketing <br /> Operations
//             </p>
//           </div>
//           <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
//             <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
//               <Image
//                 src={`${IMAGE_URL}/assets/images/home/h3.png`}
//                 width={58}
//                 height={58}
//                 alt=""
//                 className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
//               />
//             </div>
//             <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
//               Detailed <br /> Campaign <br /> Insights
//             </p>
//           </div>
//           <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
//             <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
//               <Image
//                 src={`${IMAGE_URL}/assets/images/home/h4.png`}
//                 width={58}
//                 height={58}
//                 alt=""
//                 className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
//               />
//             </div>
//             <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
//               High Impact <br /> Campaign <br /> Optimisation
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NyxHire;

// "use client";
// import React, { useState } from "react";
// import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
// import Image from "next/image";
// import Rive from "./Rive";
// import "./style.css";

// const NyxHire = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [hasHovered, setHasHovered] = useState(false);

//   const handleMouseEnter = () => {
//     if (!hasHovered) {
//       setIsHovered(true);
//       setHasHovered(true);
//     }
//   };

//   const handleMobileClick = () => {
//     // Toggle hover effect for mobile devices
//     if (!hasHovered) {
//       setIsHovered(true);
//       setHasHovered(true);
//     } else {
//       setIsHovered(!isHovered);
//     }
//   };

//   return (
//     <div
//       className="relative NYXHireSEC"
//       onMouseEnter={handleMouseEnter} // Desktop hover
//       onMouseLeave={() => setIsHovered(false)} // Reset hover for desktop
//       onClick={handleMobileClick} // Mobile tap
//     >
//       <div className="absolute left-[-20%] top-[-25%]">
//         <Image
//           src={`${IMAGE_URL}/assets/images/home/NyxHireBgLight.png`}
//           width={800}
//           height={769}
//           alt=""
//         />
//       </div>
//       <div className="bg-[#15072A] px-[25px] md:px-[79px]">
//         <h3 className="py-[61px] font-bold text-[18px] leading-[24px] md:text-[40px] md:leading-[58px] text-center text-white">
//           Hire NYX AI-Agents For Effortless Campaigns
//         </h3>
//         <div className="pb-[0px] md:pb-[97px] flex flex-wrap max-md:flex-col items-center justify-center">
//           <Rive
//             src={`${IMAGE_URL}/assets/images/home/1manager.riv`}
//             isHovered={isHovered}
//             delay={500}
//           />

//           <span className="max-md:hidden">
//             <svg
//               width="47"
//               height="37"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
//                 fill="#000"
//               />
//               <path
//                 d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
//                 fill="url(#a)"
//               />
//               <defs>
//                 <linearGradient
//                   id="a"
//                   x1="21.544"
//                   y1="0"
//                   x2="11.648"
//                   y2="35.342"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#B631B1" />
//                   <stop offset=".695" stop-color="#7048D7" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </span>
//           <span className="md:hidden">
//             <svg
//               width="32"
//               height="33"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
//                 fill="#000"
//               />
//               <path
//                 d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
//                 fill="url(#gradient)"
//               />
//               <defs>
//                 <linearGradient
//                   id="gradient"
//                   x1="27.513"
//                   y1="15.236"
//                   x2="5.111"
//                   y2="8.957"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#B631B1" />
//                   <stop offset=".695" stop-color="#7048D7" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </span>
//           <Rive
//             src={`${IMAGE_URL}/assets/images/home/1designer.riv`}
//             isHovered={isHovered}
//             delay={1500}
//           />

//           <span className="max-md:hidden">
//             <svg
//               width="47"
//               height="37"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
//                 fill="#000"
//               />
//               <path
//                 d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
//                 fill="url(#a)"
//               />
//               <defs>
//                 <linearGradient
//                   id="a"
//                   x1="21.544"
//                   y1="0"
//                   x2="11.648"
//                   y2="35.342"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#B631B1" />
//                   <stop offset=".695" stop-color="#7048D7" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </span>
//           <span className="md:hidden">
//             <svg
//               width="32"
//               height="33"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
//                 fill="#000"
//               />
//               <path
//                 d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
//                 fill="url(#gradient)"
//               />
//               <defs>
//                 <linearGradient
//                   id="gradient"
//                   x1="27.513"
//                   y1="15.236"
//                   x2="5.111"
//                   y2="8.957"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#B631B1" />
//                   <stop offset=".695" stop-color="#7048D7" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </span>
//           <Rive
//             src={`${IMAGE_URL}/assets/images/home/1analyst.riv`}
//             isHovered={isHovered}
//             delay={2500}
//           />
//         </div>
//         <h3 className="pt-[40px] pb-[34px] md:pt-[51px] md:pb-[61px] font-bold text-[18px] leading-[30px] md:text-[40px] md:leading-[58px] text-center text-white">
//           Use NYX AI For
//         </h3>
//         <div className="flex items-center justify-center gap-[px] pb-[48px] md:pb-[146px] flex-wrap">
//           <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
//             <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
//               <Image
//                 src={`${IMAGE_URL}/assets/images/home/h1.png`}
//                 width={58}
//                 height={58}
//                 alt=""
//                 className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
//               />
//             </div>
//             <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
//               High <br /> Converting Ad Creatives
//             </p>
//           </div>
//           <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
//             <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
//               <Image
//                 src={`${IMAGE_URL}/assets/images/home/h2.png`}
//                 width={58}
//                 height={58}
//                 alt=""
//                 className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
//               />
//             </div>
//             <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
//               Streamlining <br /> Marketing <br /> Operations
//             </p>
//           </div>
//           <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
//             <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
//               <Image
//                 src={`${IMAGE_URL}/assets/images/home/h3.png`}
//                 width={58}
//                 height={58}
//                 alt=""
//                 className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
//               />
//             </div>
//             <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
//               Detailed <br /> Campaign <br /> Insights
//             </p>
//           </div>
//           <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
//             <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
//               <Image
//                 src={`${IMAGE_URL}/assets/images/home/h4.png`}
//                 width={58}
//                 height={58}
//                 alt=""
//                 className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
//               />
//             </div>
//             <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
//               High Impact <br /> Campaign <br /> Optimisation
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NyxHire;

"use client";
import React, { useEffect, useState, useRef } from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import Rive from "./Rive";
import "./style.css";

const NyxHire = () => {
  const [hasPlayed, setHasPlayed] = useState(false); // Track if the animations have already played
  const [activeAnimation, setActiveAnimation] = useState(0); // Track the currently active animation
  const nyxHireRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setHasPlayed(true); // Mark animations as played
        }
      },
      {
        root: null, // Default is viewport
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the component is visible
      },
    );

    if (nyxHireRef.current) {
      observer.observe(nyxHireRef.current);
    }

    return () => {
      if (nyxHireRef.current) {
        observer.unobserve(nyxHireRef.current);
      }
    };
  }, [hasPlayed]);

  useEffect(() => {
    if (hasPlayed) {
      const delays = [500, 1000, 1500]; // Set delays for sequential animations
      delays.forEach((delay, index) => {
        setTimeout(() => {
          setActiveAnimation(index + 1);
        }, delay);
      });
    }
  }, [hasPlayed]);

  return (
    <div className="relative NYXHireSEC" ref={nyxHireRef}>
      <div className="absolute left-[-20%] top-[-25%]">
        <Image
          src={`${IMAGE_URL}/assets/images/home/NyxHireBgLight.png`}
          width={800}
          height={769}
          alt=""
        />
      </div>
      <div className="bg-[#15072A] px-[25px] md:px-[79px]">
        <h3 className="py-[61px] font-bold text-[20px] leading-[24px] md:text-[40px] md:leading-[58px] text-center text-white">
          Hire NYX AI-Agents For Effortless Campaigns
        </h3>
        <div className="pb-[0px] md:pb-[97px] flex flex-wrap max-md:flex-col items-center justify-center">
          {/* Sequential Animations */}
          <Rive
            src={`${IMAGE_URL}/assets/images/home/3manager.riv`}
            isHovered={activeAnimation === 1} // Play first animation
            delay={300}
          />

          {/* Arrows */}
          <span className="max-md:hidden">
            <svg
              width="47"
              height="37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
                fill="#000"
              />
              <path
                d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
                fill="url(#a)"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1="21.544"
                  y1="0"
                  x2="11.648"
                  y2="35.342"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#B631B1" />
                  <stop offset=".695" stop-color="#7048D7" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="md:hidden">
            <svg
              width="32"
              height="33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
                fill="#000"
              />
              <path
                d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="27.513"
                  y1="15.236"
                  x2="5.111"
                  y2="8.957"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#B631B1" />
                  <stop offset=".695" stop-color="#7048D7" />
                </linearGradient>
              </defs>
            </svg>
          </span>

          <Rive
            src={`${IMAGE_URL}/assets/images/home/3designer.riv`}
            isHovered={activeAnimation === 2} // Play second animation
            delay={1000}
          />

          {/* Arrows */}
          <span className="max-md:hidden">
            <svg
              width="47"
              height="37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
                fill="#000"
              />
              <path
                d="M25.977.976a3.333 3.333 0 0 1 4.713 0l15 15a3.333 3.333 0 0 1 0 4.713l-15 15a3.333 3.333 0 0 1-4.713-4.713L35 21.666H3.333a3.333 3.333 0 1 1 0-6.667H35l-9.023-9.31a3.333 3.333 0 0 1 0-4.713Z"
                fill="url(#a)"
              />
              <defs>
                <linearGradient
                  id="a"
                  x1="21.544"
                  y1="0"
                  x2="11.648"
                  y2="35.342"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#B631B1" />
                  <stop offset=".695" stop-color="#7048D7" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="md:hidden">
            <svg
              width="32"
              height="33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
                fill="#000"
              />
              <path
                d="M26.894 18.043a2.11 2.11 0 0 1 0 2.985l-9.51 9.501a2.114 2.114 0 0 1-2.988 0l-9.509-9.5A2.11 2.11 0 0 1 6.39 17.45a2.114 2.114 0 0 1 1.486.593l5.902 5.715V3.701a2.11 2.11 0 0 1 2.114-2.111 2.114 2.114 0 0 1 2.112 2.11v20.057l5.902-5.715a2.114 2.114 0 0 1 2.988 0Z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="27.513"
                  y1="15.236"
                  x2="5.111"
                  y2="8.957"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#B631B1" />
                  <stop offset=".695" stop-color="#7048D7" />
                </linearGradient>
              </defs>
            </svg>
          </span>

          <Rive
            src={`${IMAGE_URL}/assets/images/home/3analyst.riv`}
            isHovered={activeAnimation === 3} // Play third animation
            delay={1500}
          />
        </div>
        <h3 className="pt-[40px] pb-[34px] md:pt-[51px] md:pb-[61px] font-bold text-[20px] leading-[30px] md:text-[40px] md:leading-[58px] text-center text-white">
          Use NYX AI For
        </h3>
        <div className="flex items-center justify-center gap-[8px] md:gap-[19px] pb-[48px] md:pb-[146px] flex-wrap">
          <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
            <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
              <Image
                src={`${IMAGE_URL}/assets/images/home/h1.png`}
                width={58}
                height={58}
                alt=""
                className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
              />
            </div>
            <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
              High <br /> Converting Ad Creatives
            </p>
          </div>
          <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
            <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
              <Image
                src={`${IMAGE_URL}/assets/images/home/h2.png`}
                width={58}
                height={58}
                alt=""
                className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
              />
            </div>
            <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
              Streamlining <br /> Marketing <br /> Operations
            </p>
          </div>
          <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
            <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
              <Image
                src={`${IMAGE_URL}/assets/images/home/h3.png`}
                width={58}
                height={58}
                alt=""
                className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
              />
            </div>
            <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
              Detailed <br /> Campaign <br /> Insights
            </p>
          </div>
          <div className="bg-[#281B3B80] w-[141px] h-[132px] md:w-[296px] md:h-[291px] rounded-[15px] flex flex-col items-center justify-center">
            <div className="w-[45px] h-[45px] md:w-[111px] md:h-[111px] rounded-[50%] bg-[#3B236F] flex items-center justify-center">
              <Image
                src={`${IMAGE_URL}/assets/images/home/h4.png`}
                width={58}
                height={58}
                alt=""
                className="w-[23px] h-[23px] md:w-[58px] md:h-[58px]"
              />
            </div>
            <p className="text-[#F4F4F4] text-[12px] leading-[14px]  md:text-[24px] md:leading-[29px] text-center pt-[18px] px-[26px]">
              High Impact <br /> Campaign <br /> Optimisation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NyxHire;
