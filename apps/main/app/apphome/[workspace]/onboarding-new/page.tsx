/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import First from "./FirstPage";
import Second from "./SecondPage";
import Profileicon from "@nyx-frontend/main/components/Profileicon";

const Page = () => {
  const [current, setCurrent] = useState<string>("first");
  const [firstPageResponse, setFirstPageResponse] = useState<any>();

  function apiResponse(data: any) {
    setFirstPageResponse(data);
  }

  const renderComponent = (value: string) => {
    setCurrent(value);
  };
  const render = () => {
    switch (current) {
      case "first":
        return (
          <First renderComponent={renderComponent} apiResponse={apiResponse} />
        );
      case "second":
        return (
          <Second
            renderComponent={renderComponent}
            firstPageResponse={firstPageResponse}
          />
        );
      default:
        return (
          <First renderComponent={renderComponent} apiResponse={apiResponse} />
        );
    }
  };
  return (
    <>
      <div className=" flex ">
        <Sidebar />

        <div className="w-full flex flex-col h-[100vh] overflow-hidden overflow-y-auto bg-[#130828]">
          <div className="w-full p-5 ml-7">
            <Profileicon hide={""} />
          </div>
          {render()}
        </div>
      </div>
    </>
  );
};

export default Page;
