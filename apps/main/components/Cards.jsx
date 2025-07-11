/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "react-loading-skeleton/dist/skeleton.css";

const checkSaleTime = (dt1, dt2) => {
  let difference = dt1 - dt2;
  let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  let minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  let secondsDifference = Math.floor(difference / 1000);

  let diff =
    Math.abs(daysDifference) +
    " day/s " +
    hoursDifference +
    ":" +
    minutesDifference +
    ":" +
    secondsDifference;

  return diff;
};

export default function Cards({ cartqty, data, setTier }) {
  // const[isLoading,setIsLoading]=useState(true);

  const navigate = useRouter();
  const detailsPage = (id) => {
    navigate.push("/listing/" + id);
  };

  let silverClassName =
    "px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-full";
  let goldClassName =
    "px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-full";
  let platinumClassName =
    "px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-full";

  const changeType = (tier_index, data, index) => {
    setTier(tier_index, data, index);
  };

  return (
    <>
      <div className="gap-4 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-8">
        {data?.map((items) => (
          <div
            onClick={() => detailsPage(items.listingId)}
            className=""
            key={items.title}
          >
            <div className=" h-auto w-auto flex-col justify-between items-center cursor-pointer bg-[#2A104B] text-white p-1 overflow-hidden shadow-lg mx-auto md:mx-auto px-4 py-6 rounded-lg transform transition duration-500 hover:scale-90">
              <div className="m-[1rem]">
                <img
                  alt={items.title}
                  className="relative rounded-md  w-full md:block"
                  src={items?.thumbnail}
                  loading="lazy"
                  decoding="async"
                />

                {/* <button type="button" className="absolute bg-colorBack border border-amber-400 inline-flex items-center mt-[-1.5em] px-4 py-1 rounded-md text-base text-center text-white w-auto"> */}
                {/* <FaClock className="w-4 h-4 mr-2 -ml-1"/> */}
                {/* Sale Starts in 08:27:12 endDt isActive*/}
                {/* {items.startDt} */}
                {/* {
               (new Date().getTime()) < (Date.parse(items.startDt)) ?
                'Sale Starts in '+checkSaleTime(new Date().getTime(),Date.parse(items.startDt))
               :
                'Sale Ends in '+checkSaleTime(Date.parse(items.endDt,new Date().getTime()))
              } */}
                {/* </button> */}

                <div className="p-2 mt-2 flex justify-between h-auto">
                  <div className="overflow-hidden">
                    <h4 className="text-sm truncate">{items.title}</h4>
                    <p className="font-light text-sm truncate ">
                      {items.name === null ? "N/A" : items.name}
                    </p>
                  </div>
                  {/* <div className="flex flex-col">
                    <p className="font-light text-right">
                    Total Qty : {items.totalQuantity}
                  </p> */}
                  {/* <h4 className="text-md font-light">
                    Remaining Qty : {items.remainingQuantity}{" "}
                  </h4>
                  </div> */}
                </div>

                {/* <div className="flex justify-start gap-2 items-center m-auto w-[90%]">
                {items.tiers.map((tier, i) => (
                  <>
                    <div onClick={() => changeType(i, data, index)}>
                      {tier.tierType === items?.tier_selected.tierType ? <div className='bg-yellow-500 p-2 rounded-md cursor-pointer font-bold'>{tier.tierType}</div> : <div className='p-2 rounded-md cursor-pointer font-light'>{tier.tierType}</div>}
                    </div>
                  </>
                ))}

              </div> */}

                <div className="flex 2xl:flex-row xl:flex-col lg:flex-col md:flex-col justify-between items-center p-2 mt-2">
                  {/* <h4 className='text-md font-light'>Remaining  {`${items.tier_selected.remainingTierQuantity}/${items.tier_selected.tierQuantity}`}</h4> */}
                  {/* <h4 className='text-md font-light'>Remaining  {items.remainingQuantity} </h4> */}
                  {/* <button
                  onClick={() => detailsPage(items.listingId)}
                  className="block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-10 py-1 md:py-2 text-center mr-2 font-light"
                >
                  {" "}
                  Buy{" "}
                </button> */}
                  <p className="flex font-light text-center pb-2">
                    ₹ {items.listedPrice}
                  </p>
                  <button
                    onClick={() => detailsPage(items.listingId)}
                    className=" text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-10 py-1 md:py-2 text-center font-light"
                  >
                    {" "}
                    {cartqty ? "Add" : "Buy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
