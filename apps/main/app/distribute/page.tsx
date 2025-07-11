/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
const v1 = IMAGE_URL + "/assets/images/artists/v1.png";
const v2 = IMAGE_URL + "/assets/images/artists/v2.png";
const v3 = IMAGE_URL + "/assets/images/artists/v3.png";
const l1 = IMAGE_URL + "/assets/images/artists/l1.png";
const l2 = IMAGE_URL + "/assets/images/artists/l2.png";
import {
  TABLE_LEADER_BOARD,
} from "@nyx-frontend/main/utils/utils";

import { CENTER_TEXT } from "@nyx-frontend/main/components/Utils/Utils";

import Content from "@nyx-frontend/main/components/content";
import { DISTRIBUTE_HIW } from "@nyx-frontend/main/utils/globals";
import LogoGrid from "@nyx-frontend/main/components/LogoGrid";
import TableSeparateRow from "@nyx-frontend/main/components/TableSeparateRow";

function Distribute() {
  const dist_header = [
    "",
    "Share Name",
    "Total Streamers",
    "Streaming target for 1.5x return",
    "Total Shares",
    "Steams Earned",
    "Incentives Earned",
    "",
  ];
  const dist_data = [
    {
      img_src: v2,
      token_name: "Obsessed",
      artist_name: "ram",
      total_streamers: 10,
      target_return: 1500,
      total_share: 5,
      streams_earned: 20,
      incentive_earned: 500,
    },
    {
      img_src: v1,
      token_name: "Obsessed",
      artist_name: "sam",
      total_streamers: 10,
      target_return: 1500,
      total_share: 5,
      streams_earned: 20,
      incentive_earned: 500,
    },
    {
      img_src: v2,
      token_name: "Obsessed",
      artist_name: "john",
      total_streamers: 10,
      target_return: 1500,
      total_share: 5,
      streams_earned: 20,
      incentive_earned: 500,
    },
  ];

  return (
    <>
      <div className="px-3 md:px-0 min-h-screen">
        <div className="absolute top-28 left:10 md:left-20 text-white text-[17px] font-600">
          Distribute
        </div>
        <Content top="top-[10rem]">
          {/* <div className="pt-10">
            {CENTER_TEXT("How it Works", "")}
        </div> */}

          {/* <div className='flex m-auto w-[80%] justify-between mt-20'>
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <img className="w-[9rem] h-[5rem]" src={l1}></img>
                </div>
                <div className="mt-10">
                    <p className="text-center text-white font-bold">Share the token</p>
                    <p className="text-center text-white font-light text-sm">with your friends </p>
                    <p className="text-center text-white font-light text-sm">to get higher streams.</p>
                </div>

            </div>

            <div className="flex flex-col">
                <div className="flex justify-center text-white">
                    <img className="w-[5rem] h-[5rem]" src={l2}></img>
                </div>
                <div className="mt-14">
                    <p className="text-center text-white font-bold">Get More Streams</p>
                    <p className="text-center text-white font-light text-sm">Your friend streams the song/</p>
                    <p className="text-center text-white font-light text-sm"> video increasing the number </p>
                    <p className="text-center text-white font-light text-sm">  of streams & royalty earnings. </p>
                   
                </div>

            </div>



            <div className="flex flex-col">
                <div className="flex justify-center text-white">
                    <img className="w-[5rem] h-[5rem]" src={v3}></img>
                </div>
                <div className="mt-10">
                    <p className="text-center text-white font-bold">Earn Higher</p>
                    <p className="text-center text-white font-light text-sm">You earn x% higher royalties </p>
                    <p className="text-center text-white font-light text-sm"> for the streams earned </p>
                    <p className="text-center text-white font-light text-sm"> through your distribution.</p>
                </div>

            </div>
        </div> */}

          <div className="text-white">
            <div className="hidden md:block w-[90%] mx-auto py-4 md:py-16 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                {/* <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight ">
                Our Core values
                </h2> */}
                {CENTER_TEXT("How it Works", "")}
              </div>
              <LogoGrid data={DISTRIBUTE_HIW} />
            </div>

            <div className="block md:hidden w-[90%] mx-auto py-4 md:py-16 px-1.5">
              <div className="text-center">
                {/* <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight ">
                Our Core values
                </h2> */}
                {CENTER_TEXT("How it Works", "")}
              </div>

              <div className={`mt-14 mx-auto flex justify-between`}>
                <div className="w-1/3 text-center sm:text-left lg:block lg:text-center">
                  <div className="flow-root">
                    <img
                      className="w-16 md:w-auto h-12 md:h-auto mx-auto"
                      // @ts-ignore
                      src={DISTRIBUTE_HIW[0].icon}
                      alt="DISTRIBUTE_HIW"
                    />
                  </div>
                  <div className="mt-3 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm md:text-xl font-bold ">
                      Share the <br /> token
                    </h3>
                    <p className="mt-2 text-[12px] md:text-base text-gray-300">
                      {DISTRIBUTE_HIW[0].content}
                    </p>
                  </div>
                </div>

                <div className="w-2/5 text-center sm:text-left lg:block lg:text-center">
                  <div className="flow-root">
                    <img
                      className="w-12 md:w-auto h-12 md:h-auto mx-auto"
                      // @ts-ignore
                      src={DISTRIBUTE_HIW[1].icon}
                      alt="DISTRIBUTE_HIW1"
                    />
                  </div>
                  <div className="mt-3 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm md:text-xl font-bold ">
                      Get More <br /> Streams
                    </h3>
                    <p className="mt-2 text-[12px] md:text-base text-gray-300">
                      {DISTRIBUTE_HIW[1].content}
                    </p>
                  </div>
                </div>

                <div className="w-1/3 text-center sm:text-left lg:block lg:text-center">
                  <div className="flow-root">
                    <img
                      className="w-12 md:w-auto h-12 md:h-auto mx-auto"
                      // @ts-ignore
                      src={DISTRIBUTE_HIW[2].icon}
                      alt="DISTRIBUTE_HIW2"
                    />
                  </div>
                  <div className="mt-3 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm md:text-xl font-bold ">
                      Earn <br />
                      Higher
                    </h3>
                    <p className="mt-2 text-[12px] md:text-base text-gray-300">
                      {DISTRIBUTE_HIW[2].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-24">
            {CENTER_TEXT("Distribution LeaderBoard", "")}
            <div className="mt-14">
                <TableComponent ></TableComponent>
            </div>
        </div> */}

          <div className="max-w-6xl mx-auto px-3 md:px-0">
            <div className="text-center">
              <div className="flex justify-center text-xl md:text-2xl font-extrabold tracking-tight py-5">
                <p className="border-yellow-500 text-white border-b-4 text-center">
                  Distribution Stats
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <TableSeparateRow header={dist_header} data={dist_data} />
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-3 md:px-0">
            <div className="text-center">
              <div className="flex justify-center text-xl md:text-2xl font-extrabold tracking-tight py-5">
                <p className="border-yellow-500 text-white border-b-4 text-center">
                  Distribution Leaderboard
                </p>
              </div>
              <div className="mb-8 relative overflow-x-auto rounded-md border-blue border">
                <table className="w-full text-sm text-white">
                  <thead className="border-blue border-b text-xs text-white bg-new">
                    <tr>
                      {TABLE_LEADER_BOARD.header?.map((item, index) => (
                        <td key={index} className="px-6 py-3">
                          {item}
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_LEADER_BOARD.data?.map((item, index) => (
                      <tr className="bg-transparent" key={index + "table"}>
                        <td className="px-6 py-4">{item.user_name}</td>
                        <td className="px-6 py-4">{item.coins}</td>
                        <td className="px-6 py-4">{item.user_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <ReferralTable></ReferralTable> */}
        </Content>
      </div>
    </>
  );
}

export default Distribute;
