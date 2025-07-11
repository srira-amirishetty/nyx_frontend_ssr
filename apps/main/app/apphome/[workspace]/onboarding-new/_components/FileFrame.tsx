/* eslint-disable @next/next/no-img-element */
import { manipulateFileName } from "@nyx-frontend/main/utils/textUtils";

export default function FileFrame({ file }: { file: File }) {
  return (
    <div>
      <div className="bg-[#452A80] w-[150px] h-[55px] rounded-t-lg text-[#FFF] p-2">
        {manipulateFileName(file?.name, 15)}
      </div>
      <div className="bg-[#6653B4] relative w-[150px] h-[99px] rounded-b-lg flex justify-center items-center flex-col">
        <img
          src={URL.createObjectURL(file)}
          alt={file?.name}
          className="block absolute h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
