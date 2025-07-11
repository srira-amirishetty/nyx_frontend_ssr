"use client";
import { useContext, useEffect, useState } from "react";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import {
  DOUGH_DATA,
  optionsDescriptions,
  STREAMING_TRENDS_DESCRIPTION,
  TOKEN_VISITOR_SALE,
} from "@nyx-frontend/main/utils/utils";
import Content from "@nyx-frontend/main/components/content";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import { useRouter, useParams } from "next/navigation";
import { SHARE_POP_UP } from "@nyx-frontend/main/utils/modalstyles";
import LineChart from "@nyx-frontend/main/charts/LineChart2";
import { useQuery } from "@tanstack/react-query";
import { getTokenService } from "@nyx-frontend/main/services/productService";
import Resource from "./Resource";

type Token = {
  tierMinValue?: number | string;
  tokenBenefit?: string;
  tierType?: string;
}

type Description = {
  title?: string;
  nyx_token_tiers?: Array<Token>;
  listingPrice?: number;
  videoLink?: string;
  royaltyPerToken?: number;
  description?: string;
  tierType?: string;
}

const getArrayByName = (data: any, key: string) => {
  return data.filter((x: { name: string }) => x.name === key);
}

function Description() {
  const [index, setIndex] = useState(0);
  const { setcontentHeight, setModal, type } = useContext(UseContextData);
  const params = useParams();
  const [text, setText] = useState("");
  const { data, isSuccess } = useQuery({
    queryKey: ["token", params?.id],
    queryFn: async () => params?.id ? getTokenService(params?.id) : null,
  })
  const nyx_token = data?.nyx_token?.[0];
  const description = nyx_token;
  const title = description?.title;
  const doughdataset = getArrayByName(DOUGH_DATA, title);
  const userdataset = getArrayByName(STREAMING_TRENDS_DESCRIPTION, title);
  const artistdataset = getArrayByName(TOKEN_VISITOR_SALE, title);
  const navigate = useRouter();

  const onClick = () => {
    setModal(SHARE_POP_UP);
  };

  const changeType = (tier: any, idx: number) => {
    if (idx == index) {
      setIndex(0);
      //navigate.push(`?tier=Basic`);
    } else {
      setIndex(idx);
      // navigate.push(`?tier=${tier.tierType}`);
    }
  };

  const getQty = () => {
    if (index == 0) return 1;

    if ([1, 2, 3].includes(index)) {
      return Math.ceil(
        description?.nyx_token_tiers?.[index]?.tierMinValue /
        description?.listingPrice
      )
    }

    return 0;
  };

  useEffect(() => {
    if (isSuccess && nyx_token?.length === 0) {
      setText("Share not found or you don't own the token");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  return (
    <>
      <div className="px-3 md:px-0 min-h-screen">
        <Content top="top-[10rem]">
          {description && Object.keys(description).length != 0 ? (
            <div className="m-auto w-[90%] pt-10">
              <Resource url={description?.videoLink} />
              <div className="flex flex-col gap-10 md:w-[95%] m-auto">
                <div className="flex flex-wrap md:flex-nowrap m-auto gap-10">
                  <div className="w-[100%] md:w-[50%] pt-8">
                    <div className="flex justify-between items-center">
                      <p className="text-white font-base">Share Name:</p>
                      <p className="text-white font-light text-sm">
                        {description?.title}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-8">
                      <p className="text-white font-base">Price:</p>
                      <p className="text-white font-light text-sm">
                        {(description?.listingPrice * getQty()).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-8">
                      <p className="text-white font-base">Royalty Share:</p>
                      <p className="text-white font-light text-sm">
                        {(description?.royaltyPerToken * getQty()).toFixed(2) +
                          "%"}
                      </p>
                    </div>
                    <div className="pt-8">
                      <p className="text-white font-base">Share Description:</p>
                    </div>
                    <p className="text-white text-sm font-light pt-3">
                      {description?.description}
                    </p>
                  </div>
                  <div className="w-[100%] md:w-[50%] md:pt-8">
                    <div className="flex justify-center gap-1 md:gap-4 items-center pb-8 md:pb-0">
                      {description?.nyx_token_tiers
                        ?.filter(
                          (tier: any) => tier.tierType.toLowerCase() != "basic"
                        )
                        .map((tier: any, i: number) => (
                          <>
                            <div
                              key={i}
                              style={
                                tier.tierType ==
                                  description.nyx_token_tiers[index].tierType
                                  ? {
                                    border: "1px solid #FFCB54",
                                  }
                                  : {}
                              }
                              className={`${tier.tierType} relative md:w-[8rem]`}
                              onClick={() => changeType(tier, i + 1)}
                            >
                              <p
                                className={
                                  tier.tierType ==
                                    description.nyx_token_tiers?.[index].tierType
                                    ? "active"
                                    : "not-active"
                                }
                              >
                                {tier.tierType}
                              </p>
                              <div className="mt-5">
                                <p
                                  style={{ fontSize: "14px" }}
                                  className={
                                    tier.tierType ==
                                      description.nyx_token_tiers?.[index]?.tierType
                                      ? "active"
                                      : "not-active"
                                  }
                                >
                                  Min value
                                </p>
                                <p
                                  style={{ fontSize: "14px" }}
                                  className={
                                    tier.tierType ==
                                      description.nyx_token_tiers[index].tierType
                                      ? "active"
                                      : "not-active"
                                  }
                                >
                                  {tier.tierMinValue}
                                </p>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>

                    <div
                      className={
                        description?.tierType == "Basic" ? "" : "md:pt-8"
                      }
                    >
                      <p className="text-white font-base">Share Benefits</p>
                    </div>
                    <ul className="pl-6 pt-4">
                      {description?.nyx_token_tiers?.[index]?.tokenBenefit
                        .split(";")
                        .map((txt: any, i: number) => (
                          <li
                            key={i}
                            className="list-disc text-white text-sm font-light"
                          >
                            {txt}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="md:w-1/2">
                    <p className="text-white font-base pb-2">
                      {type == "artist"
                        ? "Share Page - Visitors & Sale"
                        : "Streaming Trends"}
                    </p>
                    <div
                      className="p-2 md:p-4 h-[275px] md:h-[320px] flex"
                      style={{
                        backgroundColor: "#3B236F",
                        borderRadius: "8px",
                      }}
                    >
                      {type == "artist" && artistdataset.length != 0 ? (
                        <LineChart
                          data={artistdataset[0]}
                          options={optionsDescriptions}
                        ></LineChart>
                      ) : (
                        userdataset.length != 0 && (
                          <LineChart
                            data={userdataset[0]}
                            options={optionsDescriptions}
                          ></LineChart>
                        )
                      )}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <p className="text-white font-base pb-2">
                      Streaming from Distribution
                    </p>
                    <div
                      className="p-2 md:p-4 h-[275px] md:h-[320px] flex"
                      style={{
                        backgroundColor: "#3B236F",
                        borderRadius: "8px",
                      }}
                    >
                      {/* {doughdataset.length != 0 && (
                        <DoughNut
                          options={Doughoptions}
                          data={doughdataset[0]}
                        ></DoughNut>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ButtonElement
                    onSubmit={onClick}
                    width="w-[11rem]"
                    name="Share and Earn"
                  ></ButtonElement>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white font-light pt-8 text-center">{text}</div>
          )}
        </Content>
      </div>
    </>
  );
}

export default Description;
