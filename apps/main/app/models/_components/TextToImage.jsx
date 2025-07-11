/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Text2imagemodelcards } from "@nyx-frontend/main/services/model";
import Image from "next/image";
import Loading from "./Loading";
import Link from "next/link";

const Page = ({ chooseModal }) => {
  const { data: models, isLoading } = useQuery({
    queryKey: ["modeldataDataText2Image"],
    queryFn: () => {
      return Text2imagemodelcards();
    },
  });

  // const queryuserinfo = useQuery({
  //   queryKey: ["AllModels-details"],
  //   queryFn: Text2imagemodelcards,
  // });

  // useEffect(() => {
  //   if (queryuserinfo.isSuccess) {
  //     //console.log("response of all model", queryuserinfo.data);
  //     const data=queryuserinfo.data
  //     setmodeldata(data)
  //     console.log("data",data)
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [queryuserinfo.isSuccess]);

  return (
    <>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-5">
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          models.map((data, index) => (
            <button
              key={index}
              className="flex mt-11 cursor-pointer"
              onClick={() => chooseModal(data.slug)}
            >
              <div
                style={{
                  background: `url(${data.img_url})`,
                  backgroundSize: "cover",
                }}
                className="model-card border border-none rounded-md"
              >
                <div className="model-content">
                  <div className="text-md font-bold mb-1">
                    {data.model_name}
                  </div>
                  <div className="text-xs">{data.description}</div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </>
  );
};

export default Page;
