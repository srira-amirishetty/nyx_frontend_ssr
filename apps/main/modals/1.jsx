"use client"
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";

function Stream() {
  return (
    <>
      <div className="flex justify-center mt-32 ">
        <p className="text-center font-light w-[32%] text-white">
          Get more streams by sharing with your friends and family and earn
          higher
        </p>
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex gap-4">
          <div className="mt-2">
            <input className="w-[18rem] border border-white rounded-md h-10 text-white outline-none bg-transparent"></input>
          </div>
          <div className="mt-2">
            <div
              className={`block bg-amber-300 text-black cursor-pointer hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2`}
            >
              Copy Link
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stream;
