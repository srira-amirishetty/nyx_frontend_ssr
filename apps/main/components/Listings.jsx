"use client";
import { useContext, useEffect, useState } from "react";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { MODAL_CONFIG } from "@nyx-frontend/main/utils/modalstyles";
import { useRouter } from "next/navigation";
import {
  ARTIST_GET_LISTINGS,
  BASEURL,
  HEADER_TABLE,
  TOKEN_VALUE_ARTIST,
} from "@nyx-frontend/main/utils/utils";
import Table from "@nyx-frontend/main/components/Table";

function Listings() {
  const navigate = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [artistdataset, setArtistDataset] = useState([]);
  const {
    setcontentHeight,
    type,
    listing_cache,
    setListingsCache,
    userDetails,
  } = useContext(UseContextData);
  const { get } = useRequests();
  useEffect(() => {
    setcontentHeight("h-[42rem]");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type && type.length != 0) {
      getListings(type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const getListings = async (type) => {
    if (Object.keys(listing_cache).length === 0) {
      let logged_type = type === "user" ? "/users" : "/artists";
      const data = await get(
        BASEURL + logged_type + ARTIST_GET_LISTINGS,
        MODAL_CONFIG("Loading..")
      );
      if (data.response === "Success") {
        setListingsCache({ ...data.data.listing_portfolio });
        setLoaded(true);
      }
    } else {
      setListingsCache({ ...listing_cache });
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (listing_cache && Object.keys(listing_cache).length != 0) {
      setArtistDataset(
        TOKEN_VALUE_ARTIST.filter((x) => x.name == userDetails.name)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing_cache]);

  return (
    <div className="m-auto w-[90%] relative top-5">
      {loaded && !listing_cache?.listings?.length ? (
        <div className="flex mt-12 justify-center text-white font-light">
          You don&apos;t have any active / approved share requests. Add your
          song / video to start listing your shares.
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-[100%] md:w-[50%]">
            <ListBox
              data="Listing Amount"
              value={listing_cache?.total_listings}
            ></ListBox>
            <ListBox
              data="Current Value"
              value={
                listing_cache?.sale_amount + listing_cache?.sale_amount * 0.1
              }
            ></ListBox>
            <ListBox data="Returns" value="10%"></ListBox>
            <ListBox data="Sold" value={listing_cache?.total_sold}></ListBox>
            <ListBox
              data="Sale Amount"
              value={listing_cache?.sale_amount}
            ></ListBox>
          </div>
          <div className="w-[100%] md:w-[50%] md:pt-4">
            <div
              className="p-2 md:p-4 h-[275px] md:h-[360px]"
              style={{
                backgroundColor: "#3B236F",
                borderRadius: "8px",
              }}
            >
              {/* {artistdataset.length != 0 && (
                <LineChart
                  data={artistdataset[0]}
                  options={optionsDescriptions}
                ></LineChart>
              )} */}
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 md:mt-16 mb-5 text-center text-white">
        {/* <Table header={HEADER_TABLE} data={HEADER_TABLE_DATA} width={85}></Table> */}
        {/* <h4>Table Heading</h4> */}
      </div>

      {listing_cache?.listings?.length ? (
        <div className="mb-8 relative overflow-x-auto rounded-md border-blue border">
          <Table header={HEADER_TABLE} data={listing_cache?.listings} />
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-col md:flex-row  gap-5 items-center text-white justify-center">
        <h4>Want to earn more Revenue?</h4>
        <button
          className="block font-light text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
          onClick={() => {
            navigate.push("/upload");
          }}
        >
          {!listing_cache?.listings?.length ? "Add Shares" : "Add More Shares"}
        </button>
      </div>
    </div>
  );
}

export const ListBox = (props) => {
  return (
    <div className="h-14 flex items-center row-re rounded-[5px] w-[100%] mt-5 bg-transparent border border-white">
      <div className="w-[70%] md:w-[50%]">
        <p className="text-white ml-10 text-sm font-light">{props?.data}</p>
      </div>
      <div className="w-[50%]">
        <p className="text-sm text-white text-center font-light">
          {props?.value}
        </p>
      </div>
    </div>
  );
};

export const ListBox2 = (props) => {
  return (
    <div className="h-14 flex justify-between rounded-[5px] w-[100%] mt-5  items-center bg-transparent border border-white">
      <div className="">
        <p className="ml-4 md:ml-10 text-white font-light">{props?.value}</p>
      </div>

      <div className="items-center">
        <p className="text-white  mr-20 font-light">{props?.data}</p>
      </div>
    </div>
  );
};
export const ListBox3 = (props) => {
  const [val, setVal] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal(parseInt(value));
  };

  function decrement() {
    if (parseInt(val) > 1) setVal(parseInt(val) - 1);
  }

  function increment() {
    setVal(parseInt(val) + 1);
  }

  return (
    <div className="h-14 flex justify-between rounded-[5px] w-[100%] mt-5 items-center  bg-transparent border border-white">
      <div className="">
        <p className="ml-4 md:ml-10 text-white font-light">{props?.value}</p>
      </div>

      <div className="items-center font-light">
        <div className="mr-2 md:mr-6 flex flex-row gap-2 h-10 w-44 md:w-32 rounded-md relative bg-transparent">
          <button
            onClick={() => decrement()}
            className="hover:bg-[#3B236F] text-white h-full w-20 rounded-md cursor-pointer outline-none"
          >
            <span className="m-auto font-thin">−</span>
          </button>
          <input
            value={val}
            type="number"
            className="appearance-none outline-none rounded-md text-center w-full flex items-center bg-[#3B236F] text-white"
            pattern="[1-9][0-9]*"
            onChange={handleChange}
          />
          <button
            onClick={() => increment()}
            className="hover:bg-[#3B236F] text-white h-full w-20 rounded-md cursor-pointer"
          >
            <span className="m-auto font-thin">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Listings;
