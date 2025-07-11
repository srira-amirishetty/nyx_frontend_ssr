/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { getCampaignSummary } from "@nyx-frontend/main/services/admanagerServices";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SummaryLoading from "./SummaryLoading";

type PlatformSvgMaName = {
  [key: string]: React.ReactNode;
};

function formatDate(isoString: any) {
  const date = new Date(isoString);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate
}

const SummaryPage = ({ brandId, productId, campaignId }) => {
  const search = useSearchParams();
  const router = useRouter();
  const workspacename = localStorage.getItem("workspace_name");

  const { data: campaigns, isLoading: campaignsLoading } = useQuery(
    {
      queryKey: ["campaigns-summary", campaignId],
      enabled: !!campaignId,
      queryFn: () => getCampaignSummary(campaignId)
    }
  );

  const platFormSvgName: PlatformSvgMaName = {
    instagram: (
      <svg
        width="25"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.375 3c-2.757 0-5 2.243-5 5v8c0 2.757 2.243 5 5 5h8c2.757 0 5-2.243 5-5V8c0-2.757-2.243-5-5-5h-8Zm0 2h8c1.654 0 3 1.346 3 3v8c0 1.654-1.346 3-3 3h-8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3Zm9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-5 1c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3Z"
          fill="#fff"
        />
      </svg>
    ),
    facebook: (
      <svg
        width="24"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)">
          <path
            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"
            fill="#fff"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    google: (
      <svg
        width="21"
        height="19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.579.001A4.13 4.13 0 0 0 8.394.56c-.656.382-1.11.949-1.465 1.57l-.061-.038L.572 12.651l.028.016c-.361.661-.6 1.374-.6 2.11 0 1.026.334 2.067 1.051 2.879C1.768 18.466 2.886 19 4.197 19c1.312 0 2.429-.533 3.146-1.345.203-.23.308-.508.45-.769l.03.017 2.67-4.477 2.66 4.462.004.006c1.154 2.005 3.735 2.7 5.73 1.541 1.997-1.16 2.691-3.76 1.537-5.77l-.006-.008-6.29-10.55c0-.002-.002-.004-.004-.006A4.203 4.203 0 0 0 10.58 0Zm.063 2.106a2.093 2.093 0 0 1 1.668 1.056l.005.008.004.006 6.287 10.544a2.103 2.103 0 0 1-.768 2.885 2.076 2.076 0 0 1-2.867-.774l-.004-.008-6.292-10.55a2.103 2.103 0 0 1 .769-2.885 2.09 2.09 0 0 1 1.198-.282Zm-3.81 4.147c.014.024.011.052.025.076l.006.008 2.406 4.036-1.422 2.386c-.152-.296-.277-.605-.504-.862-.704-.797-1.8-1.314-3.082-1.332l2.572-4.312Zm-2.635 6.411c.787 0 1.244.259 1.576.635.333.376.523.92.523 1.477s-.19 1.1-.523 1.476c-.332.376-.789.635-1.576.635s-1.243-.259-1.576-.635c-.332-.376-.522-.92-.522-1.476 0-.543.192-1.063.508-1.438l.026-.043c.332-.371.783-.631 1.564-.631Z"
          fill="#fff"
        />
      </svg>
    ),
    linkedin: (
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 3.54102C19.5304 3.54102 20.0391 3.75173 20.4142 4.1268C20.7893 4.50187 21 5.01058 21 5.54102V19.541C21 20.0714 20.7893 20.5802 20.4142 20.9552C20.0391 21.3303 19.5304 21.541 19 21.541H5C4.46957 21.541 3.96086 21.3303 3.58579 20.9552C3.21071 20.5802 3 20.0714 3 19.541V5.54102C3 5.01058 3.21071 4.50187 3.58579 4.1268C3.96086 3.75173 4.46957 3.54102 5 3.54102H19ZM18.5 19.041V13.741C18.5 12.8764 18.1565 12.0472 17.5452 11.4358C16.9338 10.8245 16.1046 10.481 15.24 10.481C14.39 10.481 13.4 11.001 12.92 11.781V10.671H10.13V19.041H12.92V14.111C12.92 13.341 13.54 12.711 14.31 12.711C14.6813 12.711 15.0374 12.8585 15.2999 13.1211C15.5625 13.3836 15.71 13.7397 15.71 14.111V19.041H18.5ZM6.88 9.10102C7.32556 9.10102 7.75288 8.92402 8.06794 8.60896C8.383 8.29389 8.56 7.86658 8.56 7.42102C8.56 6.49102 7.81 5.73102 6.88 5.73102C6.43178 5.73102 6.00193 5.90907 5.68499 6.22601C5.36805 6.54294 5.19 6.9728 5.19 7.42102C5.19 8.35102 5.95 9.10102 6.88 9.10102ZM8.27 19.041V10.671H5.5V19.041H8.27Z"
          fill="white"
        />
      </svg>
    ),
    meta: (
      <svg
        width="25"
        height="25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#a)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.193 5.841c-1.595-.11-2.865.816-3.753 1.98-.893 1.17-1.522 2.72-1.87 4.267-.346 1.547-.433 3.19-.154 4.564.272 1.336.964 2.71 2.42 3.145 1.389.415 2.635-.175 3.587-.976.954-.802 1.78-1.946 2.446-3.05.522-.868.968-1.75 1.318-2.505.35.753.796 1.637 1.317 2.504.666 1.105 1.492 2.25 2.446 3.051.952.801 2.198 1.391 3.587.976 1.456-.435 2.148-1.809 2.42-3.145.28-1.375.192-3.017-.154-4.564-.348-1.548-.977-3.099-1.87-4.268-.887-1.163-2.157-2.09-3.752-1.979-1.734.12-2.97 1.47-3.687 2.488-.106.152-.209.307-.307.465a10.405 10.405 0 0 0-.308-.465c-.717-1.02-1.952-2.367-3.686-2.488Zm2.85 5.025c-.283.715-.97 2.348-1.888 3.873-.621 1.032-1.313 1.958-2.02 2.552-.707.595-1.262.728-1.725.59-.396-.118-.817-.56-1.034-1.627-.208-1.027-.157-2.375.146-3.728.304-1.353.838-2.614 1.508-3.493.675-.885 1.369-1.242 2.024-1.196.766.053 1.53.705 2.188 1.642.368.523.643 1.052.8 1.386l.001.001Zm2.288 0c.282.715.97 2.348 1.887 3.873.622 1.032 1.314 1.958 2.02 2.552.708.595 1.262.728 1.726.59.395-.118.816-.56 1.033-1.627.209-1.027.158-2.375-.146-3.728-.304-1.353-.837-2.614-1.508-3.493-.675-.885-1.368-1.242-2.024-1.196-.766.053-1.53.705-2.188 1.642a9.593 9.593 0 0 0-.8 1.386v.001Z"
            fill="#fff"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path
              fill="#fff"
              transform="translate(.125 .84)"
              d="M0 0h24v24H0z"
            />
          </clipPath>
        </defs>
      </svg>
    ),
    twitter: (
      <svg
        width="25"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m3.242 3 7.096 10.14L3.615 21h2.64l5.265-6.17L15.835 21h6.91l-7.422-10.625L21.615 3h-2.6l-4.869 5.688L10.175 3H3.242Zm3.84 2h2.049l9.777 14h-2.031L7.082 5Z"
          fill="#fff"
        />
      </svg>
    ),
    snapchat: (
      <svg
        width="25"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.879 2a6 6 0 0 0-6 6v1.875l-.9-.675a1 1 0 1 0-1.2 1.6l1.865 1.4c-.444 1.168-1.527 2.39-3.28 3.443a1.01 1.01 0 0 0-.318 1.412C4.164 18.732 5.938 20 7.878 20c1.784 0 3.008 2 5 2 2.011 0 3.21-2 5-2 1.94 0 3.715-1.268 4.832-2.945a1.011 1.011 0 0 0-.318-1.412c-1.752-1.053-2.835-2.275-3.28-3.443l1.867-1.4a1 1 0 1 0-1.2-1.6l-.9.675V8a6 6 0 0 0-6-6Z"
          fill="#fff"
        />
      </svg>
    ),
  };

  return (
    <>
      {campaignsLoading ? (
        <div className="p-3 flex flex-col gap-6">
          {[1, 2, 3].map((item, index) => (
            <SummaryLoading key={index} />
          ))}
        </div>
      ) : (
        <div className="p-3 flex flex-col gap-3">
          <div className={"w-full h-full"}>
            <div className="w-full h-full">
              <div className="flex flex-col gap-3">

                <div className="w-full h-auto p-2 flex flex-col gap-[14px]">
                  <div className="w-full flex justify-between">
                    <div className="text-[14px] xl:text-[16px] text-[#FFC01D] font-[600]">
                      Brand Details & Setup Campaign
                    </div>
                    <button
                      className="text-[12px] text-[#FFFFFF] hover:text-[#FFC01D] font-[400] underline"
                      onClick={() =>
                        router.push(
                          `/apphome/${workspacename}/admanager/campaign-creation?campaignId=${Number(
                            search.get("campaignId")
                          )}&brandid=${brandId}&productid=${productId
                          }&edit=${true}`
                        )
                      }
                    >
                      Edit
                    </button>
                  </div>

                  <div className="bg-[#FFFFFF99] h-[0.5px]"></div>
                  <div className="w-full flex">
                    <div className="w-1/4 flex flex-col gap-[14px]">
                      <div className="text-[12px] xl:text-[14px] font-[600] text-[#FFFFFF] underline">
                        Campaign Name
                      </div>
                      <div className="text-[12px] xl:text-[14px] font-[400] text-[#FFFFFF]">
                        {campaigns?.data?.campaignName}
                      </div>
                    </div>

                    <div className="w-1/4 flex flex-col gap-[14px]">
                      <div className="text-[12px] xl:text-[14px] font-[600] text-[#FFFFFF] underline">
                        Campaign Objective
                      </div>
                      <div className="text-[12px] xl:text-[14px] font-[400] text-[#FFFFFF]">
                        {campaigns?.data?.objective}
                      </div>
                    </div>

                    <div className="w-1/4 flex flex-col gap-[14px]">
                      <div className="text-[12px] xl:text-[14px] font-[600] text-[#FFFFFF] underline">
                        Target Groups
                      </div>
                      <div className="text-[12px] xl:text-[14px] font-normal text-white pr-4 max-w-[300px]">
                        {campaigns?.data?.targetGroups && campaigns?.data?.targetGroups?.map((item: any) => item.tg_name).join(", ")}
                      </div>
                    </div>

                    <div className="w-1/4 flex flex-col gap-[14px]">
                      <div className="text-[12px] xl:text-[14px] font-[600] text-[#FFFFFF] underline">
                        Platforms
                      </div>
                      <div className="flex gap-2 items-center">
                        {campaigns?.data?.platforms && campaigns?.data?.platforms.map((item: any) => (
                          <div key={item}>{platFormSvgName[(item.platformName).toLowerCase()]}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto p-2 flex flex-col gap-[14px]">
                  <div className="w-full flex justify-between">
                    <div className="text-[14px] xl:text-[16px] text-[#FFC01D] font-[600]">
                      Ad Creative Upload
                    </div>
                    <button
                      className="text-[12px] text-[#FFFFFF] hover:text-[#FFC01D] font-[400] underline"
                      onClick={() =>
                        router.push(
                          `/apphome/${workspacename}/admanager/ad-creative?campaignId=${Number(
                            search.get("campaignId")
                          )}&brandid=${brandId}&productid=${productId
                          }&edit=${true}`
                        )
                      }
                    >
                      Edit
                    </button>
                  </div>

                  <div className="bg-[#FFFFFF99] h-[0.5px]"></div>
                  {campaigns?.data?.targetGroups && campaigns?.data?.targetGroups?.map((item: any, key: any) => {
                    return <div key={key}>
                      <div className="flex items-center gap-2">

                        <div className="w-1/4 flex flex-col gap-[14px]">
                          <div className="text-[12px] xl:text-[14px] font-[600] text-[#FFFFFF]">
                            {item?.tg_name}
                          </div>
                          <p className="text-[12px] xl:text-[12px] font-[400] text-[#FFFFFF]">{formatDate(item?.start_date)}{item?.end_date ? ` - ${formatDate(item.end_date)}` : ''}</p>
                        </div>
                      </div>

                      {item?.ads.map((ad, key) => <div>
                        <div className="flex justify-between flex-start">

                          <div className="w-1/4 flex flex-col gap-[14px]">
                            <div className="text-[12px] xl:text-[14px] font-[600] text-[#FFFFFF]">
                              {`AddSet${key + 1}`}
                              <ul className=" flex">{ad?.media && ad.media.map((item) => <li className="bg-[#23145A] p-[8px] items-center rounded-[5px]">
                                <img src={item.signed_image_url} className="w-[50px]" />
                              </li>)}</ul>
                            </div>
                          </div>

                          <div className="w-1/4 flex mt-1 flex-col gap-[14px]">
                            <div
                              className="w-auto flex justify-between rounded-[10px] py-[8px] pr-3 items-center"
                            >
                              <div className="items-center gap-2">
                                <div className="text-[12px] xl:text-[14px] font-[400] text-[#FFFFFF] underline">
                                  Headlines
                                </div>
                                <ol className="list-decimal list-inside">{ad.heading.map((item) => <li className="text-[#FFFFFF] text-[12px]">{item}</li>)}</ol>
                              </div>

                            </div>

                          </div>

                          <div className="w-1/4 flex mt-1 flex-col gap-[14px]">
                            <div
                              className="w-auto flex justify-between rounded-[10px] py-[8px] pr-3 items-center"
                            >
                              <div className="items-center gap-2">
                                <div className="text-[12px] xl:text-[14px] font-[400] text-[#FFFFFF] underline">
                                  Ad Description
                                </div>
                                <ol className="list-decimal list-inside">{ad.description.map((item) => <li className="text-[#FFFFFF] text-[12px] max-w-[300px]">{item}</li>)}</ol>
                              </div>
                            </div>
                          </div>


                          <div className="w-1/4 flex mt-1 flex-col gap-[14px]">
                            <div
                              className="w-auto flex justify-between rounded-[10px] py-[8px] pr-3 items-center"
                            >
                              <div className="items-center gap-2">
                                <div className="text-[12px] xl:text-[14px] font-[400] text-[#FFFFFF] underline">
                                  Caption
                                </div>
                                <ol className="list-decimal list-inside">{ad.caption.map((item) => <li className="text-[#FFFFFF] text-[12px] max-w-[300px]">{item}</li>)}</ol>
                              </div>
                            </div>
                          </div>

                        </div>
                        {/* <div className="bg-[#FFFFFF99] h-[0.5px]"></div> */}
                      </div>)}

                      <div className="flex items-center gap-2 mt-2 mb-2">

                        {item?.platformDetails?.map((platform: any, k: any) => {
                          return <div key={k} className="w-1/4 flex flex-col gap-[5px]">
                            <div
                              className="w-auto bg-[#23145A] flex justify-between rounded-[10px] p-[8px] items-center"
                            >
                              <div className="flex items-center gap-2">
                                <div>{platFormSvgName[(platform.platformName).toLowerCase()]}</div>
                                <div className="text-[12px] xl:text-[14px] font-[400] text-[#FFFFFF]">
                                  {platform.platformName}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-[12px] xl:text-[14px] font-[400] text-[#FFFFFF] bg-[#332270] rounded-[4px] p-2">
                                  ₹{platform?.budget}
                                </div>
                              </div>
                            </div>
                          </div>
                        })}

                      </div>

                      <div className="bg-[#FFFFFF99] h-[0.5px]"></div>
                    </div>
                  })}
                </div>


              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
};

export default SummaryPage;
