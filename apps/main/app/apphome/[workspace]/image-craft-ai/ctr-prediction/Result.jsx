"use client";
import React from "react";
import { motion } from "framer-motion";

const Result = ({ result }) => {
  const featureSimilarityData = Object.values(
    result?.data?.feature_comparision?.recommendations?.feature_analyses || {},
  ).map((values) => values.feature_similarity);

  const featureSimilarityAverage =
    featureSimilarityData.length > 0
      ? featureSimilarityData.reduce((sum, val) => sum + val, 0) /
        featureSimilarityData.length
      : 0;

  const featureSimilarityPercentage = featureSimilarityAverage * 100;

  function formatString(str) {
    return str
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {/* This section for Success Prediction is fine */}
      <div className="w-full flex bg-[#23145A] rounded-md p-2">
        <div className="w-4/12 mx-[22px] my-[12px]">
          <p className=" text-4 font-[700] text-[#FFFFFF] ">
            Success Prediction{" "}
          </p>
          <p className="text-[#FFCB54] text-[40px] font-[400] mt-[14px]">
            {featureSimilarityPercentage.toFixed(2)} %
          </p>
        </div>
        <div className="w-full bg-[#3B236F26] relative rounded-md z-0 px-3">
          <div className=" group absolute inset-0 m-auto w-[calc(100%-4rem)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-[5px] absolute inset-y-0 my-auto"
            ></motion.div>
            <div className="w-full flex justify-between place-content-evenly text-[12px] md:text-sm font-[700] absolute inset-y-0 my-auto mt-7 ">
              <div className="flex justify-center items-center w-4/12">
                <p className="text-[#FF0707]">Low</p>
              </div>
              <div className="flex justify-center items-center w-4/12">
                <p className="text-[#FFCB54]">Medium</p>
              </div>
              <div className="flex justify-center items-center w-4/12">
                <p className="text-[#34C011]">High</p>
              </div>
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-y-0 my-auto z-[9] w-[2px] bg-[#FFFFFF] -left-[2px]"
            ></motion.div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-y-0 my-auto z-[9] w-[2px] bg-[#FFFFFF] left-[33.33%]"
            ></motion.div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-y-0 my-auto z-[9] w-[2px] bg-[#FFFFFF] left-[66.66%]"
            ></motion.div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 20 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-y-0 my-auto z-[9] w-[2px] bg-[#FFFFFF] -right-[2px]"
            ></motion.div>
            <motion.div
              className="absolute w-5 h-5 bg-[#8297BD] opacity-90 rounded-full inset-y-0 my-auto z-10 transition-all border-2 border-[#FFFFFF]"
              animate={{
                left: `${featureSimilarityPercentage}%`,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <div className="w-max h-max bg-black rounded-md absolute top-[-40px] left-0 flex items-center justify-center text-[#FFCB54] opacity-0 group-hover:opacity-100 p-1 transition-opacity">
                {`${featureSimilarityPercentage.toFixed(2)}%`}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* This Elemental Analysis container had the conflicting styles */}
      {/* I have REMOVED `h-full` and `overflow-auto` from this div */}
      <div className="w-full py-6 px-[30px] rounded-md">
        <p className="text-[16px] font-bold leading-5 text-white pb-[24px]">
          Elemental Analysis
        </p>
        <div className="w-full rounded-md">
          {/* I have REMOVED `overflow-y-auto` and `max-h-[380px]` from this div */}
          {/* This allows the table to take its full height, overflowing the PARENT in Page.jsx */}
          <div>
            <table className="w-full table-fixed border-collapse">
              <thead>
                <tr className="text-[#FFFFFF] text-sm font-[600] border-b bg-[#332270] border-[#FFFFFF66] h-8 sticky top-0 z-10">
                  <th className="text-left w-1/4 break-words">Features</th>
                  <th className="text-left w-1/4 break-words">Current Value</th>
                  <th className="text-center w-1/4 break-words">Assessment</th>
                  <th className="text-left w-1/4 break-words">Suggestion</th>
                </tr>
              </thead>
              <tbody>
                {Object?.entries(
                  result?.data?.feature_comparision?.recommendations
                    ?.feature_analyses || {},
                ).map(([key, value]) => (
                  <tr key={key} className="border-b border-[#FFFFFF33] h-12">
                    <td className="text-left w-1/4 break-words text-[#FFCB54] text-xs font-[600]">
                      {formatString(value.feature_name)}
                    </td>
                    <td className="text-left w-1/4 break-words text-[#FFFFFF] text-xs font-[400] relative group cursor-pointer">
                      {value.keyword_tags ?? "N/A"}
                      <div className="absolute top-[-20px] left-10 bg-black text-white text-xs font-bold p-2 rounded hidden group-hover:block z-10">
                        {value.current_value ?? "N/A"}
                      </div>
                    </td>
                    <td className="w-1/4">
                      <div className="w-full flex justify-center">
                        {value.feature_similarity >= 0.65 ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 6.3C14 5.9287 13.8659 5.5726 13.6272 5.31005C13.3885 5.0475 13.0648 4.9 12.7273 4.9H8.70545L9.31636 1.701C9.32909 1.631 9.33545 1.554 9.33545 1.477C9.33545 1.19 9.22727 0.924 9.05545 0.735L8.38091 0L4.19364 4.606C3.95818 4.865 3.81818 5.215 3.81818 5.6V12.6C3.81818 12.9713 3.95227 13.3274 4.19095 13.5899C4.42964 13.8525 4.75336 14 5.09091 14H10.8182C11.3464 14 11.7982 13.65 11.9891 13.146L13.9109 8.211C13.9682 8.05 14 7.882 14 7.7V6.3ZM0 14H2.54545V5.6H0V14Z"
                              fill="#34C011"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 7.7C14 8.0713 13.8659 8.4274 13.6272 8.68995C13.3885 8.9525 13.0648 9.1 12.7273 9.1H8.70545L9.31636 12.299C9.32909 12.369 9.33545 12.446 9.33545 12.523C9.33545 12.81 9.22727 13.076 9.05545 13.265L8.38091 14L4.19364 9.394C3.95818 9.135 3.81818 8.785 3.81818 8.4V1.4C3.81818 1.0287 3.95227 0.672602 4.19095 0.410051C4.42964 0.1475 4.75336 0 5.09091 0H10.8182C11.3464 0 11.7982 0.349999 11.9891 0.854L13.9109 5.789C13.9682 5.95 14 6.118 14 6.3V7.7ZM0 0H2.54545V8.4H0V0Z"
                              fill="#FF5050"
                            />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="text-left w-1/4 break-words text-[#FFFFFF] text-xs font-[400] relative group cursor-pointer">
                      {value.keyword_recommendation &&
                      value.feature_similarity >= 0.65
                        ? "N/A"
                        : value.keyword_recommendation}
                      {value.feature_similarity < 0.65 && (
                        <div className="absolute top-[-20px] left-10 bg-black text-white text-xs font-bold p-2 rounded hidden group-hover:block z-10">
                          {value.recommendation ?? "N/A"}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;