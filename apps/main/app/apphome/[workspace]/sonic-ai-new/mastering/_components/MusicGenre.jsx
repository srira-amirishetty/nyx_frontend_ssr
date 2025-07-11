"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import { SONIC_AI_TABS } from "@nyx-frontend/main/utils/productConstants";

const MusicGenre = ({ tab, setTab, selectedGenre, setSelectedGenre }) => {
  const OpenGenre = () => {
    if (tab === SONIC_AI_TABS.MUSICGENRE) {
      setTab("");
    } else {
      setTab(SONIC_AI_TABS.MUSICGENRE);
    }
  };

  const GenreType = [
    {
      id: 1,
      type: "Pop",
    },
    {
      id: 2,
      type: "Melancholic",
    },
    {
      id: 3,
      type: "Jazz",
    },
    {
      id: 4,
      type: "Classical",
    },
    {
      id: 5,
      type: "Bollywood",
    },
    {
      id: 6,
      type: "Folk Song",
    },
    {
      id: 7,
      type: "Electrical Music",
    },
    {
      id: 8,
      type: "Dance Music",
    },
    {
      id: 9,
      type: "Rock",
    },
  ];

  return (
    <>
      <div className="bg-nyx-blue-4 rounded-lg">
        <h2 className="mb-0">
          <div
            className={`${
              tab === SONIC_AI_TABS.MUSICGENRE
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-nyx-blue-4 text-white rounded-lg`}
            onClick={() => OpenGenre()}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === SONIC_AI_TABS.MUSICGENRE
                    ? "text-nyx-yellow  text-lg"
                    : "text-white text-base"
                }`}
              >
                Music Genre
              </div>
            </div>

            <span
              className={`${
                tab === SONIC_AI_TABS.MUSICGENRE
                  ? `rotate-[-180deg] -mr-1`
                  : `dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: tab === SONIC_AI_TABS.MUSICGENRE ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={classNames(
            `bg-nyx-blue-4 w-full overflow-hidden rounded-lg`,
          )}
        >
          <div className="w-full flex flex-wrap py-2 px-4 gap-2 justify-center">
            {GenreType?.map((item) => (
              <button
                onClick={() => {
                  setSelectedGenre(item.type);
                  setTab(SONIC_AI_TABS.MUSICUPLOAD);
                }}
                key={item.id}
                className={`flex items-center justify-center mt-3 w-[40%] h-[37px]  gap-2 rounded ${
                  selectedGenre === item.type
                    ? "bg-[#5E32FF] text-white"
                    : "bg-[#1D1138] text-white"
                } disabled:opacity-50  disabled:cursor-not-allowed`}
                disabled={item.disabled}
              >
                <div className="w-full text-sm text-center">{item.type}</div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MusicGenre;
