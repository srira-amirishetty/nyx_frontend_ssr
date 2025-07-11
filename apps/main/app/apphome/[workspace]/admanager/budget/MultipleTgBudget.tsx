/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState, useEffect } from "react";
import { Slider } from "rsuite";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import "./index.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TgSlider from "./TgSlider";

type PlatformSvgMaName = {
  [key: string]: React.ReactNode;
};

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
      width="25"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#a)">
        <path
          d="M22.375 12c0-5.52-4.48-10-10-10s-10 4.48-10 10c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5c0-1.93 1.57-3.5 3.5-3.5h2.5v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" transform="translate(.375)" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  google: (
    <svg
      width="27"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.291 1.715a4.223 4.223 0 0 0-2.427.572A4.265 4.265 0 0 0 10.29 8.12l8.564 14.817c1.178 2.053 3.791 2.73 5.845 1.563 2.041-1.166 2.718-3.791 1.551-5.833L17.71 3.85a4.31 4.31 0 0 0-3.418-2.135ZM7.956 7.887l-6.207 10.78a4.282 4.282 0 0 0-.583 2.135 4.282 4.282 0 0 0 4.282 4.282 4.281 4.281 0 0 0 3.698-2.147v.012l3.687-6.394c-1.575-2.683-3.185-5.354-4.632-8.12a3.226 3.226 0 0 1-.233-.548h-.012Z"
        fill="#FFFFFF"
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

const MultipleTgBudget = ({ minimunBudget, platforms, targetGroups, budget, setBudgets }) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (budget?.baseBudget) {
      setData(budget?.budget)
    }
  }, [budget])


  // Change Locked
  const handleLocked = (value: any) => {
    const updatedData = JSON.parse(JSON.stringify(data));
    updatedData[value].isLocked = !updatedData[value].isLocked
    setData(updatedData)
    setBudgets({ ...budget, budget: updatedData })
  };

  const commonHandler = (name: any, value: number) => {
    
    // Ensure the new value doesn't go below the minimum for the platform and is an integer
    const newValue = Math.max((minimunBudget[name] * targetGroups?.length),
      Math.floor(value)
    );

    const updatedData = JSON.parse(JSON.stringify(data));
    const originalBudget = data[name].total_budget;

    // Calculate budget difference
    const diff = newValue - originalBudget;

    // Prepare list of other unlocked
    const otherUnlocked = Object.keys(updatedData).filter(
      (key) => key !== name && !updatedData[key].isLocked
    );

    if (otherUnlocked.length == 0) return

    const perPlatformAdjustment = diff / otherUnlocked.length;

    //  Apply the new budget and redistribute
    updatedData[name].total_budget = newValue;
    otherUnlocked.forEach((key) => {
      let minvalue = ((minimunBudget[key] * targetGroups?.length))
      let newValue = updatedData[key].total_budget - perPlatformAdjustment
      let adjustment = newValue < minvalue ? [(updatedData[key].total_budget - minvalue), perPlatformAdjustment - (updatedData[key].total_budget - minvalue)] : [perPlatformAdjustment, 0]
      updatedData[key].total_budget -= adjustment[0]
      updatedData[name].total_budget -= adjustment[1];
    });

    //  Apply the new budget for lable 3
    Object.keys(updatedData).forEach((key: any) => {
      let totalBudget = updatedData[key].total_budget
      let data = updatedData[key].data
      const unlockedCount = data.filter(item => item.isLocked === false).length;
      data.forEach((item) => {
        if (!item.isLocked) {
          item['budget'] = totalBudget / unlockedCount
        }
      })
    })

    // Recalculate percentages for all platforms
    Object.keys(updatedData).forEach((key: any) => {
      updatedData[key].percentage = (updatedData[key].total_budget / budget.baseBudget) * 100;
    });

    setData(updatedData)
    setBudgets({ ...budget, budget: updatedData })
  };

  return (
    <div className="flex items-start gap-8 flex-wrap ">
      {platforms?.map((item: any, index: any) => {
        const platform = data[item.name]
        if (platform) {
          return (
            platform?.total_budget !== null && (
              <div
                key={index}
                className="w-[374px] height-[93px] py-3 px-4 bg-[#23145A] rounded-[8px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      {platFormSvgName[item.name.toLowerCase()]}
                    </div>
                    <p className="text-[16px] font-semibold leading-[19px] text-white">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-[16px] font-semibold leading-[19px] select-none text-white">
                    {(platform.percentage).toFixed(1) + "%"}
                  </p>
                </div>

                <div className="flex gap-[12px] items-center">
                  <div className="w-full">
                    <Slider
                      tooltip={false}
                      progress
                      min={0}
                      max={Number(budget.baseBudget)}
                      value={Number(platform?.total_budget)}
                      disabled={platform?.isLocked}
                      onChange={(value) => {
                        if (!platform?.isLocked) {
                          const newValue = value < 100 ? 100 : value;
                          commonHandler(item.name, newValue);
                        }
                      }}
                      className="mt-5 sliderStyle"
                    />
                    <div className="flex justify-between items-baseline">
                      <div className="w-fit  rounded-[4px] text-[white] text-[16px] font-semibold flex items-center justify-center pt-1 mb-[12px]">
                        ₹{Number(platform?.total_budget).toFixed(1)}
                      </div>

                      <div
                        className="cursor-pointer "
                        onClick={() => handleLocked(item.name)}
                      >
                        {platform?.isLocked ? (
                          <>
                            <svg
                              width="10"
                              height="13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2 5V4a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v1"
                                stroke="#fff"
                                strokeLinecap="round"
                              />
                              <path
                                d="M8 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
                                fill="#fff"
                              />
                              <path
                                d="M3.788 8.208c.077-.275.258-.514.51-.673.252-.159.557-.226.859-.19.301.035.579.172.78.385.201.213.312.486.313.77 0 .204-.058.404-.168.58-.11.177-.267.324-.457.425v1.328h-1.25V9.505a1.191 1.191 0 0 1-.528-.556 1.089 1.089 0 0 1-.059-.741Z"
                                fill="#1E1E1E"
                              />
                            </svg>
                          </>
                        ) : (
                          <>
                            <svg
                              width="14"
                              height="13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 5a.5.5 0 0 1-1 0h1Zm5 0V4h1v1h-1Zm-5-1v1h-1V4h1ZM4 1.5A2.5 2.5 0 0 0 1.5 4h-1A3.5 3.5 0 0 1 4 .5v1ZM6.5 4A2.5 2.5 0 0 0 4 1.5v-1A3.5 3.5 0 0 1 7.5 4h-1ZM12 5H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
                                fill="#fff"
                              />
                              <path
                                d="M7.788 8.208c.077-.275.258-.514.51-.673.252-.159.557-.226.859-.19.301.035.579.172.78.385.201.213.313.486.313.77 0 .204-.058.404-.168.58-.11.177-.267.324-.457.425v1.328h-1.25V9.505a1.191 1.191 0 0 1-.528-.556 1.089 1.089 0 0 1-.059-.741Z"
                                fill="#1E1E1E"
                              />
                            </svg>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex justify-between ">
                      <div
                        className={`w-fit rounded-[4px] text-sm font-normal ${(platform?.total_budget < (minimunBudget[item.name] * targetGroups.length))
                          ? "text-nyx-red"
                          : "text-white"
                          }`}
                      >
                        {`Min budget : ₹${(minimunBudget[item.name] * targetGroups.length)}`}
                      </div>
                      {platform?.total_budget <=
                        (minimunBudget[item.name] * targetGroups.length) && (
                          <div className="text-xs text-nyx-red ">
                            Minimum budget allocated
                          </div>
                        )}
                    </div>

                  </div>
                </div>
                <TgSlider minimunBudget={minimunBudget} platform={item.name} budget={budget} setBudgets={setBudgets} />
              </div>
            )
          );
        }
      })}
    </div>
  );
};

export default MultipleTgBudget;