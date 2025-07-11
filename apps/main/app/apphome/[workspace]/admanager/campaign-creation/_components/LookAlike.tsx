// import Modal from "react-modal";
// import { lookalikeStyle } from "@nyx-frontend/main/utils/modalstyles";
// import Select, { components } from "react-select";
// import { onboardingColourStyles } from "@nyx-frontend/main/utils/productStyle";

// export const LookAlike = ({ lookAlike,setLookAlike ,selectedOptionLookalike,setSelectedOptionLookalike}:any) => {
//   return (
//     <Modal
//       isOpen={lookAlike}
//       style={lookalikeStyle}
//       // onRequestClose={handleTargetGroupModal}
//       ariaHideApp={false}
//     >
//       <div className="px-[40px] py-[34px] h-[500px] ">
//         <div className="flex justify-end cursor-pointer">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             width="24"
//             height="24"
//             onClick={() => {
//               setLookAlike(false);
//             }}
//           >
//             <path
//               fill="#FFFFFF"
//               d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
//             />
//           </svg>
//         </div>
//         <div className=" w-full text-white text-[18px] font-semibold">
//           Advance TG -Lookalike Audience
//         </div>
//         <div className="flex flex-col mt-3">
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               name="radioOption"
//               value="META"
//               checked={selectedOptionLookalike === "META"}
//               onChange={(e) => setSelectedOptionLookalike(e.target.value)}
//               className="cursor-pointer  appearance-none bg-transparent w-3 h-3 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[2px]"
//             />
//             <span className="ml-2 text-[14px] font-medium leading-5 text-[#edf4ff]">
//               Audience for Meta
//             </span>
//           </label>
//           <label className="inline-flex items-center">
//             <input
//               type="radio"
//               name="radioOption"
//               value="GOOGLE"
//               checked={selectedOptionLookalike === "GOOGLE"}
//               onChange={(e) => setSelectedOptionLookalike(e.target.value)}
//               className="cursor-pointer  appearance-none bg-transparent w-3 h-3 border-[2px] border-nyx-white-1 rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-[2px]"
//             />
//             <span className="ml-2 text-[14px] font-medium leading-5 text-[#edf4ff]">
//               Audience for Google
//             </span>
//           </label>
//         </div>
//         <div className="mt-[24px] flex flex-col gap-y-4">
//           <div className="">
//             <div className="text-white text-[14px]">
//               Selected Audience group
//             </div>
//             <div className="mt-[12px]">
//               {selectedOptionLookalike === "META" && (
//                 <Select
//                   className="text-sm md:text-base"
//                   options={options}
//                   placeholder="Select or type Audience"
//                   instanceId={"age-group"}
//                   styles={onboardingColourStyles}
//                   onChange={settargetgroupnage1}
//                   value={ageGroup_ADmanager.find(
//                     (option) => option?.value === targetGroupPage,
//                   )}
//                   // onChange={handleInputAgeGroup}
//                   components={{
//                     IndicatorSeparator: () => null,
//                   }}
//                 />
//               )}
//               {selectedOptionLookalike === "GOOGLE" && (
//                 <Select
//                   className="text-sm md:text-base"
//                   options={optionsgoogle}
//                   placeholder="Select or type Audience"
//                   instanceId={"age-group"}
//                   styles={onboardingColourStyles}
//                   onChange={settargetgroupnage1}
//                   value={ageGroup_ADmanager.find(
//                     (option) => option?.value === targetGroupPage,
//                   )}
//                   // onChange={handleInputAgeGroup}
//                   components={{
//                     IndicatorSeparator: () => null,
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//           <div className="">
//             <div className="text-white text-[14px]">
//               Selected Audience Location
//             </div>
//             <div className="mt-2">
//               <Select
//                 options={countriesOptions}
//                 placeholder="IN"
//                 styles={loginPopUpCountryStyles2}
//                 className="text-[12px] w-[200px] h-[40px] md:w-[200px] md:h-[41px] rounded-tl-lg rounded-lg  bg-[#ECECEC16] focus:outline-none"
//                 onChange={countrySelectOnChangeHandler}
//                 components={{
//                   IndicatorSeparator: () => null,
//                   Input: (props) => (
//                     <components.Input
//                       {...props}
//                       aria-activedescendant={undefined}
//                     />
//                   ),
//                 }}
//                 instanceId={"countryId"}
//               />
//             </div>
//           </div>
//           <div className=" flex gap-3">
//             <div className="text-white text-[14px]">Selected Audience size</div>
//             <div className="text-white flex items-center group relative price_package">
//               <ImInfo className="cursor-pointer" />
//               <div className="absolute top-[35px] left-[-60px] text-[16px] bg-[#0d0718] text-white p-4 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto w-[400px] rounded-2xl z-10 price_package_hover">
//                 Adjust the slider to set your lookalike audience size. A lower
//                 percentage (1%) means a smaller, more similar audience, while a
//                 higher percentage (up to 10%) means a larger, more diverse
//                 audience.
//               </div>
//             </div>

//             {/* <div className="text-[#8297BD] text-[14px]">
//                 Number of lookalike audience:
//               </div> */}
//           </div>
//           <div className="w-full flex flex-col mt-4 ">
//             <Slider
//               defaultValue={1}
//               progress
//               min={0}
//               max={10}
//               value={RangeSliderValue}
//               className="sliderStyle"
//               onChange={(value) => {
//                 setRangeSliderValue(value);
//               }}
//             />
//             <div className="w-full flex justify-between text-[14px] text-white">
//               <div>0</div>
//               <div>&apos;</div>
//               <div>2</div>
//               <div>&apos;</div>
//               <div>4</div>
//               <div>&apos;</div>
//               <div>6</div>
//               <div>&apos;</div>
//               <div>8</div>
//               <div>&apos;</div>
//               <div>10</div>
//             </div>
//           </div>
//           {/* <div className="text-white text-[14px]">
//               Estimated Audience : 12,000
//             </div> */}
//           <div className="w-full flex justify-center">
//             <Button
//               className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
//               onClick={CreatAudienceLookAlike}
//             >
//               {isLoadingCustom ? <ButtonLoading /> : "Create Audience"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };
