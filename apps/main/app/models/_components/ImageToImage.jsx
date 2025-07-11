"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Image2imagemodelcards } from "@nyx-frontend/main/services/model";
import Loading from "./Loading";

const Page = ({ chooseModal }) => {
  const { data: models, isLoading } = useQuery({
    queryKey: ["modeldataDataImage2Image"],
    queryFn: () => {
      return Image2imagemodelcards();
    },
  });

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
