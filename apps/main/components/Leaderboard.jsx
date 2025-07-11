"use client";
import { useContext, useEffect, useState } from "react";
import { IMAGE_URL } from "./constants";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { BASEURL } from "@nyx-frontend/main/utils/utils";

const P1 = IMAGE_URL + "/assets/images/artists/p1.png";

function LeaderBoard() {
  const { setcontentHeight } = useContext(UseContextData);

  useEffect(() => {
    setcontentHeight("pb-[4rem]");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-10">
      <LeaderTabs></LeaderTabs>
    </div>
  );
}

function LeaderTabs() {
  const { get } = useRequests();
  const { leaderBoardCache, setLeaderBoardCache } = useContext(UseContextData);

  const getLeaderBoard = async () => {
    if (!leaderBoardCache?.investment?.length) {
      const data = await get(
        BASEURL + "/users" + "/get-investment-leaderboard",
      );
      leaderBoardCache.investment = data.data.leaderboard;
      setLeaderBoardCache({ ...leaderBoardCache });
    } else {
      setLeaderBoardCache({ ...leaderBoardCache });
    }
  };
  const [tabs, setTabs] = useState(["Investment", "|", "Distribution"]);
  const [active, setActive] = useState("Investment");
  const [headers, setHeaders] = useState([
    "User Name",
    "Shares",
    "Earned Streams",
  ]);
  const [headers1, setHeaders1] = useState([
    "User Name",
    "No of Shares",
    "Amount",
  ]);
  const [data, setData] = useState([
    { user_name: "Shibili", image: P1, t1: 50, t2: 100 },
    { user_name: "Shibili", image: P1, t1: 50, t2: 100 },
    { user_name: "Shibili", image: P1, t1: 50, t2: 100 },
  ]);
  useEffect(() => {
    if (active === "Investment") {
      getLeaderBoard(active);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
  return (
    <>
      <div className="flex justify-center gap-2">
        {tabs.map((tab) => (
          <div
            onClick={() => {
              if (tab != "|") {
                setActive(tab);
              }
            }}
            key={tab}
          >
            <p
              className={
                tab === active
                  ? "text-white font-semibold"
                  : "text-blue cursor-pointer"
              }
            >
              {tab}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Table
          data={
            active === "Investment"
              ? leaderBoardCache.investment
              : leaderBoardCache.distribution
          }
          header={active === "Investment" ? headers1 : headers}
        ></Table>
      </div>
    </>
  );
}

function Table(props) {
  return (
    <>
      {/* <ul className="overflow-x-auto md:w-auto mx-3">
          <li className="py-2 text-center bg-new border border-blue rounded">
            <div className="flex items-center space-x-4">
            {props.header.map((item,index)=>(
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">
                  {item}
                </p>
              </div>
            ))}
            </div>
          </li>
  
        {props.data.map((item,index)=>(
            <li className="py-2 my-4 text-center border border-blue rounded">
            <div className="flex items-center space-x-4">

                <div className="flex-1 min-w-0">
                    <p className="text-base text-white">
                        {item.username}
                    </p>
                </div>
                
                <div className="flex-1 min-w-0">
                    <p className="text-base text-white">
                        {item.total_quantity}
                    </p>
                </div>
                
                <div className="flex-1 min-w-0">
                    <p className="text-base text-white">
                        {item.total_investment}
                    </p>
                </div>
                
            </div>
            </li>
            ))}
            </ul> */}
      <div className="bg-new h-22  rounded-md border p-3 m-auto w-[90%]">
        <div className="flex text-center">
          {/* <div className="w-[6%]"></div> */}
          <div className="w-[30%]">
            <p className="text-white  text-sm font-light ">{props.header[0]}</p>
          </div>
          <div className="w-[40%]">
            <p className="text-white text-sm text-center font-light">
              {props.header[1]}
            </p>
          </div>
          <div className="w-[30%]">
            <p className="text-white  text-sm text-center font-light">
              {props.header[2]}
            </p>
          </div>
        </div>
      </div>
      {props?.data?.map((info) => (
        <div
          className="bg-transparent h-22  rounded-md border p-3 m-auto w-[90%] mt-4"
          key={info.user_name}
        >
          <div className="flex text-center">
            {/* <div className="w-[6%]">
                    <img className="w-[3rem]" src={info.P1}></img>
                </div> */}
            <div className="w-[30%]">
              <p className="text-white break-words text-sm font-semibold pt-2 truncate ... ">
                {info.username}
              </p>
            </div>
            <div className="w-[40%]">
              <p className="text-white break-words text-sm text-center font-light pt-2">
                {info.total_quantity}
              </p>
            </div>
            <div className="w-[30%]">
              <p className="text-white break-words  text-sm text-center font-light pt-2">
                {info.total_investment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default LeaderBoard;
