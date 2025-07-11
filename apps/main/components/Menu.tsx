/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { observer } from "mobx-react";
import {
  MdVideoLibrary,
  MdImage,
  MdTransform,
  MdTitle,
  MdAudiotrack,
  MdMovieFilter,
} from "react-icons/md";
import { Store } from "@nyx-frontend/main/store/Store";
import { motion } from "framer-motion";
import { VideoResourcesPanel } from "./panels/VideoResourcesPanel";
import { AudioResourcesPanel } from "./panels/AudioResourcesPanel";
import { ImageResourcesPanel } from "./panels/ImageResourcesPanel";
import { TextResourcesPanel } from "./panels/TextResourcesPanel";
import { AnimationsPanel } from "./panels/AnimationsPanel";
import { EffectsPanel } from "./panels/EffectsPanel";
import { Emojis } from "./panels/Emojis";
import { GenAI } from "./panels/GenAI";
import LockSVGIcon from "@nyx-frontend/main/components/Icons/LockSVGIcon";

export const Menu = observer(({ item }: any) => {
  const store = React.useContext(StoreContext);

  const [selectedAccordion, setSelectedAccordion] = useState<number | null>(
    null,
  );

  const handleAccordionClick = (index: any, visibility: String) => {
    if (visibility != "Hide") {
      setSelectedAccordion(selectedAccordion === index ? null : index);
    }
  };

  useEffect(() => {
    if (item === "image") {
      setSelectedAccordion(2);
    } else if (item === "video") {
      setSelectedAccordion(0);
    }
  }, []);

  return (
    <>
      {MENU_OPTIONS.map((option, index) => (
        <div className="bg-nyx-blue-4 rounded-lg" key={option.name}>
          <h2 className="mb-0">
            <div
              onClick={() => {
                option.action(store);
                handleAccordionClick(index, option.visibility);
              }}
              className={
                option.visibility === "Hide"
                  ? `group relative flex w-full items-center border-0 px-5 py-4 text-left text-base  bg-nyx-blue-4 cursor-not-allowed text-white rounded-lg`
                  : `group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-nyx-blue-4 text-white rounded-lg`
              }
              aria-expanded={selectedAccordion === index}
              aria-controls={`collapse_${index}`}
            >
              <div className="flex w-full justify-between items-center">
                <div
                  className={`w-[50%] md:w-full font-semibold flex text-base text-[1.20rem] ${selectedAccordion === index ? "text-nyx-yellow" : "text-white"}`}
                >
                  {option.name}
                </div>
              </div>

              <span
                className={`${
                  selectedAccordion === index
                    ? "rotate-[-180deg] -mr-1"
                    : "fill-white"
                } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
              >
                {option.visibility === "Hide" ? (
                  <LockSVGIcon className="h-5 w-5" />
                ) : (
                  <>
                    {" "}
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
                  </>
                )}
              </span>
            </div>
          </h2>
          <motion.div
            id={`collapse_${index}`}
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: selectedAccordion === index ? "auto" : 0,
              opacity: selectedAccordion === index ? 1 : 0,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="bg-nyx-blue-4 w-full overflow-hidden rounded-lg"
          >
            <div className="p-5">
              <option.resoure />
            </div>
          </motion.div>
        </div>
      ))}
    </>
  );
});

const MENU_OPTIONS = [
  {
    name: "Videos",
    visibility: "Open",
    icon: MdVideoLibrary,
    action: (store: Store) => {
      store.setSelectedMenuOption("Video");
    },
    resoure: VideoResourcesPanel,
  },
  {
    name: "Audios",
    visibility: "Open",
    icon: MdAudiotrack,
    action: (store: Store) => {
      store.setSelectedMenuOption("Audio");
    },
    resoure: AudioResourcesPanel,
  },
  {
    name: "Images",
    visibility: "Open",
    icon: MdImage,
    action: (store: Store) => {
      store.setSelectedMenuOption("Image");
    },
    resoure: ImageResourcesPanel,
  },
  {
    name: "Text",
    visibility: "Open",
    icon: MdTitle,
    action: (store: Store) => {
      store.setSelectedMenuOption("Text");
    },
    resoure: TextResourcesPanel,
  },
  {
    name: "Animations",
    visibility: "Open",
    icon: MdTransform,
    action: (store: Store) => {
      store.setSelectedMenuOption("Animation");
    },
    resoure: AnimationsPanel,
  },
  {
    name: "Filters",
    visibility: "Open",
    icon: MdMovieFilter,
    action: (store: Store) => {
      store.setSelectedMenuOption("Effect");
    },
    resoure: EffectsPanel,
  },
  {
    name: "Elements",
    visibility: "Open",
    icon: MdMovieFilter,
    action: (store: Store) => {
      store.setSelectedMenuOption("Emojis");
    },
    resoure: Emojis,
  },
  {
    name: "Gen AI Editing",
    visibility: "Open",
    icon: MdMovieFilter,
    action: (store: Store) => {
      store.setSelectedMenuOption("GenAI");
    },
    resoure: GenAI,
  },
  // {
  //   name: "Fill",
  //   icon: MdOutlineFormatColorFill,
  //   action: (store: Store) => {
  //     store.setSelectedMenuOption("Fill");
  //   },
  //   resoure: FillPanel,
  // },
  // {
  //   name: "Export",
  //   icon: MdDownload,
  //   action: (store: Store) => {
  //     store.setSelectedMenuOption("Export");
  //   },
  //   resoure: ExportVideoPanel,
  // },
];
