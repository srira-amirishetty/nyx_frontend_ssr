import React from "react";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import Sidebar from "@nyx-frontend/main/components/Sidebar";

import Card from "./Card";

const Page = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { id?: string };
}) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full px-10 py-5">
          <Profileicon hide={""}/>
          <div className="text-[#FFFFFF] text-xl font-bold mt-5">
            Assets &gt; Images
          </div>
          <button className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full group-[.is-opened]:w-full group-[.is-opened]:max-w-36 flex items-center p-3 mb-3 absolute right-16 w-24 h-10">
            <svg
              viewBox="0 0 17 17"
              className="w-4 h-4 fill-current text-nyx-yellow"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
            </svg>
            <span className="inline-block text-nyx-yellow ml-2.5 text-xs">
              Add
            </span>
          </button>
          <div className="w-full mt-10">
            <Card id={Number(searchParams.id)}  />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
