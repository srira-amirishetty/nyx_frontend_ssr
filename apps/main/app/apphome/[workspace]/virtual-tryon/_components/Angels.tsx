import React, { useState } from "react";
import angel1 from "@nyx-frontend/main/components/Icons/VirtualTryonAngel1";
import angel2 from "@nyx-frontend/main/components/Icons/VirtualTryonAngel2";
import angel3 from "@nyx-frontend/main/components/Icons/VirtualTryonAngel3";
import angel4 from "@nyx-frontend/main/components/Icons/VirtualTryonAngel4";
import angel5 from "@nyx-frontend/main/components/Icons/VirtualTryonAngel5";

const angels = [
  // {
  //   angel: angel1,
  //   name: "Close-up Front",
  // },
  {
    angel: angel2,
    name: "full_body_front",
    name2:"Full Body Front"
  },
  {
    angel: angel5,
    name: "file_full_body_45",
    name2:"Full Body 45"
  },
  // {
  //   angel: angel3,
  //   name: "Full body-side",
  // },
  {
    angel: angel4,
    name: "file_full_body_back",
     name2:"Full Body Back"
  },
  
];

type AnglesProps = {
  setStepperPro: any;
  selectTop: any;
  selectBottom: any;
  selectOnePiece: any;
  selectModel: any;
  steperpro: any;
  setSelectAngle: (angels: string[]) => void;
  uploadedAngels: string[];
};

function Angels({
  setStepperPro,
  selectTop,
  selectBottom,
  selectOnePiece,
  selectModel,
  steperpro,
  setSelectAngle,
  uploadedAngels = [],
}: AnglesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAngels, setSelectedAngels] = useState<string[]>([]);

  // console.log("uploadedAngels:", uploadedAngels);
  const filteredAngels = angels.filter((angel) =>
    uploadedAngels.includes(angel.name),
  );
  // console.log("filteredAngels:", filteredAngels);

  const handleAngelClick = (angel: string) => {
    setSelectedAngels((prevSelectedAngels) => {
      let newSelectedAngels;
      if (prevSelectedAngels.includes(angel)) {
        newSelectedAngels = prevSelectedAngels.filter((a) => a !== angel);
      } else {
        newSelectedAngels = [...prevSelectedAngels, angel];
      }
      setSelectAngle(newSelectedAngels);
      console.log(newSelectedAngels);
      const hasRequiredSelection =
        (selectTop && selectBottom && selectModel) ||
        (selectOnePiece && selectModel);

      // Set stepper based on selections and clicked angel
      setStepperPro(
        hasRequiredSelection && newSelectedAngels.length > 0
          ? 3 // Step 3 if required selection and angles selected
          : hasRequiredSelection
            ? 2
            : steperpro, // Step 2 if required selection but no angles, Step 0 otherwise
      );
      return newSelectedAngels;
    });
  };

  return (
    <div className="relative flex items-center gap-3 mt-4">
      {angels.map((angel, index) => {
        const isEnabled = filteredAngels.some(filteredAngel => filteredAngel.name === angel.name);
        return (
          <div
            key={index}
            className={`w-[94px] h-[162px] rounded-lg ${selectedAngels.includes(angel.name) ? "bg-[#5E32FF]" : "bg-black"} ${index >= activeIndex && index < activeIndex + 4 ? "block" : "hidden"} ${isEnabled ? "cursor-pointer" : "cursor-not-allowed"}`}
            onClick={() => handleAngelClick(angel.name)}
            style={{ pointerEvents: isEnabled ? 'auto' : 'none', opacity: isEnabled ? 1 : 0.5 }}
          >
            <div className="flex items-center justify-center bg-white w-[94px] h-[132px] rounded-t-lg">
              <angel.angel />
            </div>
            <p className="text-center text-[11px] font-normal mt-1">
              {angel.name2}
            </p>
          </div>
        );
      })}
    </div>
  );

  // const goNext = () => {
  //   setActiveIndex((prevIndex) =>
  //     prevIndex < filteredAngels.length - 4 ? prevIndex + 1 : prevIndex,
  //   );
  // };

  // const goPrev = () => {
  //   setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  // };

  // return (
  //   <div className="relative flex items-center gap-3 mt-4">
  //     <div className="absolute -left-4">
  //       <button
  //         onClick={goPrev}
  //         className="bg-black hover:bg-[#4F4F4F] text-white w-[37px] h-[37px] flex items-center justify-center rounded-full"
  //       >
  //         <svg
  //           width="10"
  //           height="18"
  //           viewBox="0 0 10 18"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M9.20418 17.013C9.41509 16.7793 9.53357 16.4623 9.53357 16.1318C9.53357 15.8013 9.41509 15.4843 9.20418 15.2506L3.63543 9.08091L9.20418 2.91122C9.40911 2.67615 9.5225 2.36131 9.51994 2.0345C9.51738 1.7077 9.39906 1.39509 9.19048 1.164C8.98189 0.932904 8.69973 0.801821 8.40476 0.798983C8.10979 0.796143 7.82561 0.921773 7.61343 1.14881L1.24931 8.1997C1.0384 8.43344 0.919923 8.75041 0.919923 9.08091C0.919922 9.41141 1.0384 9.72838 1.24931 9.96211L7.61343 17.013C7.8244 17.2467 8.1105 17.3779 8.40881 17.3779C8.70712 17.3779 8.99321 17.2467 9.20418 17.013Z"
  //             fill="white"
  //           />
  //         </svg>
  //       </button>
  //     </div>
  //     {filteredAngels.map((angel, index) => (
  //       <div
  //         key={index}
  //         className={`w-[94px] h-[162px] rounded-lg cursor-pointer ${selectedAngels.includes(angel.name) ? "bg-[#5E32FF]" : "bg-black"} ${index >= activeIndex && index < activeIndex + 4 ? "block" : "hidden"}`}
  //         onClick={() => handleAngelClick(angel.name)}
  //       >
  //         <div
  //           className={`flex items-center justify-center bg-white w-[94px] h-[132px] rounded-t-lg`}
  //         >
  //           <angel.angel />
  //         </div>

  //         <p className="text-center text-[11px] font-normal mt-1">
  //           {angel.name2}
  //         </p>
  //       </div>
  //     ))}
  //     <div className="absolute right-0">
  //       <button
  //         onClick={goNext}
  //         className="bg-black hover:bg-[#4F4F4F] text-white w-[37px] h-[37px] flex items-center justify-center rounded-full"
  //       >
  //         <svg
  //           width="10"
  //           height="18"
  //           viewBox="0 0 10 18"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M1.06144 1.14716C0.850539 1.38089 0.73206 1.69786 0.73206 2.02836C0.73206 2.35886 0.85054 2.67583 1.06144 2.90957L6.6302 9.07925L1.06145 15.2489C0.85652 15.484 0.743126 15.7989 0.745689 16.1257C0.748253 16.4525 0.866568 16.7651 1.07515 16.9962C1.28374 17.2273 1.5659 17.3583 1.86087 17.3612C2.15584 17.364 2.44002 17.2384 2.6522 17.0113L9.01632 9.96045C9.22723 9.72672 9.3457 9.40975 9.3457 9.07925C9.3457 8.74875 9.22722 8.43178 9.01632 8.19804L2.65219 1.14716C2.44123 0.913493 2.15513 0.782228 1.85682 0.782228C1.55851 0.782228 1.27241 0.913493 1.06144 1.14716Z"
  //             fill="white"
  //           />
  //         </svg>
  //       </button>
  //     </div>
  //   </div>
  // );
}

export default Angels;
