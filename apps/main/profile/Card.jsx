"use client"
import React, { useContext } from "react";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { useRouter } from "next/navigation";
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Card() {
  const { portfolio } = useContext(UseContextData);
  const navigate = useRouter();
  let data = [1, 2, 3];
  return (
    portfolio &&
    portfolio.length != 0 && (
      <>
        {portfolio.map((item, key) => (
          <div className="mt-4 relative rounded-md border bg-[#022140] shadow-sm space-x-3" key={item.title}>
            <div className="flex px-3 md:px-6 py-3 items-center space-x-3">
              <div
                className="flex"
                onClick={() => navigate.push(`/description/${item.tokenId}`)}
              >
                <LazyLoadImage
                  className="w-16 rounded-full"
                  alt="profile"
                  src={item.thumbnail}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p
                    className="text-sm md:text-base font-medium text-white truncate ..."
                    onClick={() => navigate.push(`/description/${item.tokenId}`)}
                  >
                    {item.title}
                  </p>
                </div>
                <p className="text-xs md:text-md cursor-pointer text-white truncate">
                  {item.quantity}
                  {item.quantity > 1 ? " tokens" : " token"}
                </p>
              </div>
              <div className="flex">
                <span onClick={() => navigate.push("/distribute")}>
                  <FaShareAlt className="text-white text-xl cursor-pointer" />
                </span>
              </div>
            </div>
            <div className="flex justify-between px-3 gap-5 py-3">
              <div>
                <p className="text-blue">Invested</p>
                <p className="text-sm md:text-base text-white">
                  {item.total_price}
                </p>
              </div>
              <div>
                <p className="text-blue">Current</p>
                <p className="text-sm md:text-base text-white">
                  {item.total_price + 100}
                </p>
              </div>
              <div>
                <p className="text-blue">Gain</p>
                <p className="text-sm md:text-base text-[#31C7C8]">10%</p>
              </div>
            </div>

            <div className="flex justify-between px-3 gap-3 py-3">
              <div>
                <button className="w-20 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-1 md:px-3 py-2 text-center">
                  {" "}
                  Buy{" "}
                </button>
              </div>
              <div>
                <button className="w-20 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-1 md:px-3 py-2 text-center">
                  {" "}
                  Sell{" "}
                </button>
              </div>
              <div>
                <button className="w-20 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-1 md:px-3 py-2 text-center">
                  {" "}
                  Claim{" "}
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  );
}

export default Card;
