import "../index.css";
import React from "react";
import Link from "next/link";

const Fail = ({ params, searchParams }: { params: any; searchParams: any }) => {
  return (
    <div className="bg-[#130625] errorpage ">
      <div className=" h-screen flex flex-col justify-center items-center">
        <h3 className="text-3xl mb-6 font-bold text-red-600">
          Payment Failed !
        </h3>
        <div>
          <div className="text-white mb-5 px-5">
            <span className="mr-3 font-bold">Transaction ID :</span>
            {searchParams?.["transaction_id"]}
          </div>
          <div className="text-white mb-5 px-5 flex justify-center items-center">
            {searchParams?.["error"]}
          </div>
        </div>
        <Link
          className={`mt-6 inline-flex justify-center items-center gap-3 p-2 cursor-pointer text-[14px] px-[14px] py-[10px] font-medium rounded-full text-white bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition`}
          href="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Fail;
