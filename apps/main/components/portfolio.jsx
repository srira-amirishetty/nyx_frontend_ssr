/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import { ListBox } from "@nyx-frontend/main/components/Listings";
import { useContext, useEffect, useState } from "react";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { useRouter } from "next/navigation";
import { BASEURL, TOKEN_VALUE_USER } from "@nyx-frontend/main/utils/utils";
import Card from "@nyx-frontend/main/profile/Card";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";

const Share = IMAGE_URL + "/assets/images/artists/share.png";

function Portfolio() {
  const [userdataset, setUserDataset] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { setcontentHeight, setPortfolio, portfolio, userDetails } =
    useContext(UseContextData);
  const { get } = useRequests();
  useEffect(() => {
    setcontentHeight("pb-[4rem]");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (portfolio.length === 0) {
      getPortfolio();
    } else {
      let sum = 0;
      portfolio.map((token) => {
        sum += token.total_price;
      });
      setPortfolio([...portfolio]);
      setTotal(sum);
      setLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [total, setTotal] = useState(0);
  const getPortfolio = async () => {
    const data = await get(BASEURL + "/users/get-portfolio");
    if (data.response === "Success") {
      let sum = 0;
      data.data.portfolio.map((token) => {
        sum += token.total_price;
      });

      setTotal(sum);
      setPortfolio([...data.data.portfolio]);
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (portfolio && portfolio.length != 0) {
      setUserDataset(
        TOKEN_VALUE_USER.filter((x) => x.name == userDetails.name),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio]);

  return (
    <div className="">
      <div className="m-auto w-[90%] pt-10">
        <div className="md:flex md:gap-10 items-center">
          <div className="w-[100%] md:w-[50%]">
            <ListBox data="Amount Invested" value={total}></ListBox>
            <ListBox data="Current Value" value={total + total * 0.1}></ListBox>
            <ListBox data="Total Returns" value="10%"></ListBox>
          </div>
          <div className="md:w-[50%] pt-8 md:pt-0">
            <div
              className="p-2 md:p-4 h-[275px]"
              style={{
                backgroundColor: "#3B236F",
                borderRadius: "8px",
              }}
            >
              {/* {userdataset.length != 0 && (
                <LineChart
                  data={userdataset[0]}
                  options={optionsDescriptions}
                ></LineChart>
              )} */}
            </div>
          </div>
        </div>

        {/* <div className="mt-10"> */}
        {/* <DataColumn></DataColumn> */}
        {/* <div className="mt-5 relative overflow-x-auto"> */}
        {/* <Table header={HEADER_TABLE} data={HEADER_TABLE_DATA} /> */}
        {/* <Card  /> */}
        {/* </div> */}
        {/* </div> */}

        <div className="hidden md:block mt-16 relative overflow-x-auto">
          {loaded && <DataColumn />}
        </div>

        <div className="block md:hidden mt-5 relative overflow-x-auto">
          <Card />
        </div>
      </div>
    </div>
  );
}

function DataColumn() {
  const navigate = useRouter();
  const { portfolio } = useContext(UseContextData);

  const onSell = () => {
    navigate.push("/sell");
  };

  return (
    <>
      {portfolio && portfolio.length != 0 && (
        <>
          <div className="bg-new h-22 w-full rounded-md border p-3">
            <div className="flex gap-6 items-center m-auto py-3 text-white font-light ">
              <div className="flex w-[25%] justify-center">
                <p className="">
                  Share
                  <br /> Name
                </p>
              </div>
              <div className="flex justify-center w-[10%]">
                <p className="">
                  Amount
                  <br /> Invested
                </p>
              </div>
              <div className="flex justify-center w-[10%]">
                <p className="">
                  Current
                  <br /> Value
                </p>
              </div>
              <div className="flex justify-start w-[55%]">
                <p className="">
                  Total
                  <br /> Returns
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {!portfolio?.length ? (
        <div className="flex mt-10 justify-center text-white font-light">
          You haven&apos;t purchased any shares yet. Start Buying now to earn
          royalties.
        </div>
      ) : (
        portfolio?.map((info) => (
          <div className="border border-white mt-3 rounded " key={info.title}>
            <div className="flex gap-6 h-[5rem] items-center ">
              <div className="w-[5%] ml-3">
                <img
                  onClick={() => navigate.push(`/description/${info.tokenId}`)}
                  className="w-[3rem] cursor-pointer"
                  src={info.thumbnail}
                  alt="thumb"
                ></img>
              </div>
              <div className="w-[20%]">
                <div className="flex gap-3 mt-2">
                  <div className="">
                    <p
                      onClick={() =>
                        navigate.push(`/description/${info.tokenId}`)
                      }
                      className="text-white cursor-pointer truncate ..."
                    >
                      {info.title}
                    </p>
                    {
                      <p className="text-white text-sm font-light truncate ...">
                        {info.artist}
                      </p>
                    }
                  </div>
                </div>
              </div>
              <div className="w-[10%]">
                <p className="text-white text-center  text-sm font-light">
                  {info.total_price}
                </p>
              </div>
              <div className="w-[10%]">
                <p className="text-white text-center text-sm font-light">
                  {info.total_price + info.total_price * 0.1}
                </p>
              </div>
              <div className="w-[10%]">
                <p className=" text-start  text-sm font-light text-tabletext">
                  10%
                </p>
              </div>
              <div className="w-[40%] font-light">
                <div className="flex gap-2">
                  <ButtonElement
                    width="w-[10rem]"
                    name="Buy More"
                    onSubmit={async () =>
                      navigate.push(`/listing/${info.listingId}`)
                    }
                  ></ButtonElement>
                  <ButtonElement
                    onSubmit={onSell}
                    width="w-[10rem]"
                    name="Sell"
                  ></ButtonElement>
                </div>
              </div>
              <div className="w-[5%]">
                <span onClick={() => navigate.push("/distribute")}>
                  <img
                    className="cursor-pointer"
                    src={Share}
                    loading="lazy"
                    decoding="async"
                    alt="distribute"
                  ></img>
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Portfolio;
