"use client";
import React, { useContext } from "react";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import SubscribeModal from "@nyx-frontend/main/modals/Subscribe";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CTA({ data }) {
  const { showSubscribe, setShowSubscribe } = useContext(UseContextData);
  const navigate = useRouter();

  const handleSubscribe = () => {
    setShowSubscribe(true);
  };

  return (
    <div className="px-4 relative">
      {showSubscribe && <SubscribeModal></SubscribeModal>}
      <div
        style={{
          background: data.bg_style,
          borderRadius: "12px",
        }}
        className="md:w-[95%] m-auto text-white py-5"
      >
        {data.isCTA === false ? (
          <div className="flex justify-between w-[90%] m-auto">
            <div className="w-[65%]">
              <h2
                className="text-sm md:text-xl font-bold leading-2"
                style={{ color: "rgba(1, 49, 99, 1)" }}
              >
                {data.title}
              </h2>
              <p className="mt-2 text-xs md:text-sm text-black">
                {data.content}
              </p>
            </div>
            <button>
              {data.isCTA === false ? (
                <div
                  className="text-black hover:text-white border border-black hover:bg-black  font-normal rounded-md text-xs md:text-sm px-1 md:px-5 py-2.5 text-center md:mb-2"
                  onClick={() => {
                    handleSubscribe();
                  }}
                >
                  Subscribe
                </div>
              ) : (
                <Link
                  href={data.path}
                  className="text-black hover:text-black border border-black hover:bg-amber-300 font-normal rounded-md text-xs md:text-sm px-1 md:px-5 py-2.5 text-center md:mb-2"
                >
                  {data.btn_name ? data.btn_name : "Signup Now"}
                </Link>
              )}
            </button>
          </div>
        ) : (
          <div className="flex justify-between w-[95%] m-auto">
            <div className="w-[65%]">
              <h2 className="text-sm md:text-xl font-bold leading-2 text-amber-400">
                {data.title}
              </h2>
              <p className="mt-2 text-xs md:text-sm text-gray-300">
                {data.content}
              </p>
            </div>
            <button>
              {data.isCTA === false ? (
                <Link
                  className="text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-normal rounded-md text-xs md:text-sm px-1 md:px-5 py-2.5 text-center md:mb-2"
                  onClick={() => {
                    handleSubscribe();
                  }}
                >
                  Subscribe
                </Link>
              ) : (
                <Link
                  className="text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-normal rounded-md md:text-sm text-xs px-1 md:px-5 py-2.5 text-center md:mb-2"
                  onClick={() => navigate.push(data.path)}
                >
                  {data.btn_name ? data.btn_name : "Signup Now"}
                </Link>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
