/* eslint-disable @next/next/no-img-element */
"use client";
import { VECTORS, decodeToken } from "@nyx-frontend/main/utils/utils";
import { ElementRef, useContext, useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import useScreenSize from "@nyx-frontend/main/hooks/useSceensize";
import { useMutation, useQuery } from "@tanstack/react-query";
import Select from "react-select";
import Modal from "react-modal";
import { sentimentStyle } from "@nyx-frontend/main/utils/modalstyles";
import {
  LineOptions,
  SectionOptions,
  WriteOptions,
  rhymesOptions,
} from "@nyx-frontend/main/utils/productConstants";
import { colourStyles2 } from "@nyx-frontend/main/utils/productStyle";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { AI_SETTINGSCONFIG, KICKSTART, MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AI_Lyrics_Generator,
  getNotepads,
  relatedWords,
  saveNotePad,
  sentimentalAnalysesService,
} from "@nyx-frontend/main/services/uploadService";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Button from "@nyx-frontend/main/components/Button";
import TextInfo from "@nyx-frontend/main/components/lyrics/TextInfo";
import { Tooltip, TooltipTrigger, TooltipContent } from "@nyx-frontend/main/components/Tooltip";
import copy from "copy-to-clipboard";
import GetResponseWriter from "@nyx-frontend/main/components/lyrics/GetResponseWriter";
import { motion } from "framer-motion";
import Image from "next/image";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
// import "../../../../../css/toolResonsive.css";
import LandscapePopup from "../../../LandscapePopUp";
import { textreserve, textsectionreserve } from "@nyx-frontend/main/hooks/usersStore";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

//Root File
function Rhymes() {
  const { notepadFile, setNotepadFile, historyIndex, setHistoryIndex } =
    useContext(UseContextData);
  const screenSize = useScreenSize();
  const router = useRouter();
  const {
    setModalConfig,
    lyricsData,
    errorLyrics,
    setLyricsData,
    setHistory,
    history,
    setLyricsResponse,
    lyricsIndex,
    lyricsResponse,
    relatedWordError,
    setRelatedIndex,
    setLyricsIndex,
    setErrorLyrics,
    relatedWordResponse,
    setApiLoaded,
    apiLoaded,
    hoverFileMenu,
    setHoveredFileMenu,
  } = useContext(UseContextData);
  useEffect(() => {
    setToggle(false);
  }, [screenSize]);

  const [title, setTitle] = useState("file");
  const [tabs, setTabs] = useState([
    { name: "AI Tools", click: true, active: false },
    { name: "|", click: false, active: false },
    { name: "Analyze", click: true, active: false },
  ]);
  const [selectedTab, setSelectedTab] = useState<string>("AI Tools");
  const [toggle, setToggle] = useState(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const mutateProcessLyrics = useMutation({
    mutationKey: ["lyrics-generator"],
    mutationFn: AI_Lyrics_Generator,
  });
  const [currentAcc, setCurrentAcc] = useState("Find a related word");

  const selectTab = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const [api, setApi] = useState(true);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const mutateProcessNotePad = useMutation({
    mutationKey: ["save-notepad"],
    mutationFn: saveNotePad,
  });

  const { data, status } = useQuery({
    queryKey: ["notepad"],
    queryFn: getNotepads,
    enabled: api,
  });

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setHistory([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status == "success") {
      if (data.nyx_user_notepad.length == 0) {
        let data = [
          {
            padId: 0,
            title: "file1",
            content: "",
            formatting: {},
          },
        ];
        let payload = {
          operation: "SAVE_FILE",
          title: "file1",
          content: " ",
          formatting: {},
        };
        mutateProcessNotePad.mutate(payload, {
          onSuccess: async (response: any) => {
            setNotepadFile([...data]);
          },
          onError: (errorResponse: any) => {},
        });
      } else {
        setNotepadFile([...data.nyx_user_notepad]);
      }
    }
    if (status == "error") {
      // router.push("/apphome/login");
      // localStorage.setItem("route", "/lyrics/ai-lyrics-writer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    setTitle("file");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getCurrentAccordion = (acc: any) => {
    setLyricsResponse([]);
    setApiLoaded(false);
    let current = acc?.find((a: any) => a.toggle == true);
    setCurrentAcc(current ? current?.name : "default");
    lyricsData.user_input.input = "";
    lyricsData.user_input.base_instruction = "";
    lyricsData.user_input.additional_inputs = "";
    setLyricsData({ ...lyricsData });
  };

  const [selectedText, setSelectedText] = useState("");

  const copyHandler = () => {
    setIsCopied(true);
    const selection = document.getSelection();
    const text = selection?.toString() || "";
    const refineText =
      text?.length > 0 ? text : history[historyIndex]?.data[lyricsIndex];
    setSelectedText(refineText);
    copy(refineText);
    toast.success("copied to clipboard!!", { toastId: "copy-clip" });

    const timeClear = setTimeout(() => {
      setIsCopied(false);
      clearTimeout(timeClear);
    }, 5000);
  };

  const onAction = async () => {
    const data = await getNotepads();
    if (data.nyx_user_notepad.length == 0) {
      let data = [
        {
          padId: 0,
          title: "file1",
          content: "",
          formatting: {},
        },
      ];
      let payload = {
        operation: "SAVE_FILE",
        title: "file1",
        content: " ",
        formatting: {},
      };
      mutateProcessNotePad.mutate(payload, {
        onSuccess: async (response: any) => {
          setNotepadFile([...data]);
        },
        onError: (errorResponse: any) => {
          if (
            errorResponse.response.status == 401 ||
            errorResponse.response.status == 403
          ) {
            router.push("/apphome/login");
            localStorage.setItem("route", "/lyrics/ai-lyrics-writer");
          }
        },
      });
    } else {
      setNotepadFile([...data.nyx_user_notepad]);
    }
  };

  const openSettings = () => {
    let action = { onClose: closePopUp, from: "kickstart" };
    setModalConfig(KICKSTART(action));
  };

  const closePopUp = (data: any) => {
    setModalConfig(MODAL_RESET);
    generateLyrics(data);
  };

  const generateLyrics = (data: any) => {
    setApiLoaded(true);
    setErrorLyrics(null);
    setLyricsResponse([]);
    mutateProcessLyrics.mutate(data, {
      onSuccess: async (response: any) => {
        let data = {
          type: "generate_lyrics",
          data: response.output,
        };
        history.unshift(data);
        setHistory([...history]);
        setLyricsIndex(0);
        setApiLoaded(false);
        setHistoryIndex(0);
        setApiLoaded(false);
      },
      onError: (errorResponse: any) => {
        setApiLoaded(false);
        toast.error("Error generating lyrics");
        if (
          errorResponse.response.status == 401 ||
          errorResponse.response.status == 403
        ) {
          router.push("/apphome/login");
          localStorage.setItem("route", "/lyrics/ai-lyrics-writer");
        }
        setErrorLyrics("Failed to generate lyrics.Please try again!!");
        setTimeout(() => {
          setErrorLyrics(null);
        }, 10000);
      },
    });
  };

  const onCopy = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  const accLists = ["Lines and Songs", "Sections", "Rewrite"];
  const setNext = (button: any) => {
    if (button == 0) {
      if (historyIndex > 0) {
        setLyricsIndex(0);
        setHistoryIndex(historyIndex - 1);
      }
    } else {
      if (historyIndex < history.length - 1) {
        setLyricsIndex(0);
        setHistoryIndex(historyIndex + 1);
      }
    }
  };

  return (
    <>
      <div className="min-h-sceen mb-32 w-full" id="trackedDiv">
        <div className="relative">
          <p className="text-[#8297BD] text-[20px] md:text-[24px] font-bold text-center mt-[36px] mb-8">
            LyricGenius Generate
          </p>

          <div className="m-auto w-[90%] mt-4 ">
            <div className="flex flex-col md:flex-col lg:flex-row xl-flex-col gap-6 lg:gap-1">
              <div className="w-[100%] xl:w-[70%] lg:w-[100%] md:w-[100%]">
                <div className="flex h-[39rem]">
                  <div
                    className={
                      !toggle
                        ? "w-[40%] md:w-[98%] xl:w-[45%] lg:w-[42%]  hidden md:block lg:block bg-nyx-blue-1 pb-10"
                        : "absolute mt-[3rem] w-full left-0 bg-black min-h-[40vh] pb-10 z-10"
                    }
                  >
                    <TabMenu
                      getCurrentAccordion={getCurrentAccordion}
                      tabs={tabs}
                      selectTab={selectTab}
                      selectedTab={selectedTab}
                    ></TabMenu>
                  </div>

                  <div className="lg:w-[59%] w-full  bg-[#3B236F] rounded-tr-lg rounded-br-lg">
                    <div className=" bg-black  h-12 pr-3 rounded-tr-lg ">
                      <div className="md:flex justify-end hidden">
                        {history.length > 1 && (
                          <>
                            <div className="flex pt-4">
                              <button onClick={() => setNext(0)}>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_6383_11769)">
                                    <path
                                      d="M5.83333 12.8346L0 7.0013L5.83333 1.16797L6.86875 2.20339L2.07083 7.0013L6.86875 11.7992L5.83333 12.8346Z"
                                      fill="white"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_6383_11769">
                                      <rect
                                        width="14"
                                        height="14"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>

                              <button onClick={() => setNext(1)}>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.68385 12.8346L3.64844 11.7992L8.44635 7.0013L3.64844 2.20339L4.68385 1.16797L10.5172 7.0013L4.68385 12.8346Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex  gap-3 pl-3 pt-3 justify-between md:hidden sm:flex">
                        <div className="flex gap-2 truncate">
                          <p className="text-white ">AI Lyrics generator</p>

                          <Image
                            src={VECTORS.n2}
                            width={22}
                            height={22}
                            alt="n2"
                          />
                        </div>
                        <p className="text-white">Eng</p>

                        <Image
                          src={`${toggle ? VECTORS.i5 : VECTORS.i6}`}
                          width={22}
                          height={22}
                          alt="n2"
                          onClick={onToggle}
                          className="w-[30px] relative bottom-1"
                        />
                      </div>
                    </div>
                    {!apiLoaded ? (
                      <div className="h-[26rem] relative">
                        {history.length == 0 ? (
                          <div className="h-[20rem] xs:h-[20rem] sm:h-[20rem] lg:h-[30rem] xl:h-[30rem] md:h-[25rem]">
                            <p className=" italic text-nyx-gray-1 font-[300] pl-3 pt-3">
                              AI Song generator,
                              <br />
                              Your output generate here
                            </p>
                          </div>
                        ) : history[historyIndex].type == "words" ? (
                          <div className="h-[25rem] md:h-[25rem]">
                            <div className="md:h-full p-4 overflow-y-scroll">
                              <div className="flex gap-2 flex-wrap p-5 w-full">
                                {history[historyIndex]?.data
                                  ?.split(",")
                                  .map((res: any, index: any) => (
                                    <button
                                      onClick={() => onCopy(res)}
                                      className="hover:bg-nyx-sky transition-colors text-sm font-normal border border-nyx-sky rounded text-white cursor-pointer hover:text-black min-w-[10%] text-center py-2 px-4"
                                      key={index}
                                    >
                                      {res}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="h-[24rem] md:h-[30rem] w-[94%]">
                              <GetResponseWriter
                                className="py-4 pl-4 pr-8 text-white font-[300]"
                                text={history[historyIndex]?.data[lyricsIndex]}
                              />
                            </div>

                            {/* 
                          <div className="h-[24rem] md:h-[24rem] overflow-y-scroll">
                        
                            <div className="py-4 pl-4 pr-8 text-white font-[300] w-[90%]" dangerouslySetInnerHTML={{__html:history[historyIndex]?.data[lyricsIndex] }}></div>
                          </div> */}
                            {/* 
                          <div className="h-[24rem] md:h-[24rem] overflow-y-scroll">
                        
                            <div className="py-4 pl-4 pr-8 text-white font-[300] w-[90%]" dangerouslySetInnerHTML={{__html:history[historyIndex]?.data[lyricsIndex] }}></div>
                          </div> */}

                            <Tooltip>
                              <TooltipTrigger
                                onClick={copyHandler}
                                className="absolute top-2.5 right-2.5 bg-white p-2 rounded"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="img"
                                  viewBox="0 0 16 16"
                                  className="w-4 fill-current text-nyx-purple"
                                >
                                  <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                                  <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                                </svg>
                              </TooltipTrigger>
                              <TooltipContent className="bg-white text-nyx-purple text-xs rounded p-1">
                                {isCopied ? "Copied" : "Copy Song or Selected"}
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
                        <div className="w-[96%] m-auto">
                          <Button
                            className={`w-full mt-5 text:white hover:bg-nyx-yellow border-2 opacity-3 rounded-full ${
                              apiLoaded && "pointer-events-none"
                            }`}
                            onClick={() => {
                              openSettings();
                            }}
                          >
                            Kickstart a song
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className=" italic text-nyx-gray-1 font-[300] pl-3 pt-3 animate-pulse">
                          Generating{" "}
                          {currentAcc == "Find a related word"
                            ? "words"
                            : "lyrics"}{" "}
                          ...
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-[#3B236F] w-full lg:w-[30%] rounded-lg">
                {notepadFile.length > 0 && (
                  <Editor
                    onAction={onAction}
                    title={title}
                    data={notepadFile}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandscapePopup />
    </>
  );
}

export default Rhymes;
//main tab
function Tabs(props: any) {
  const {
    tab: { click, name },
  } = props;

  return (
    <div className="">
      {click ? (
        <div
          onClick={() => {
            props.selectTab(name);
          }}
          className={`text-center cursor-pointer ${
            name == props.selectedTab ? "text-nyx-yellow" : "text-white"
          }`}
          key={name}
        >
          <p
            className={`text-center text-lg p-5 leading-5 ${
              name == props.selectedTab ? "font-bold" : ""
            } `}
          >
            {name}
          </p>
        </div>
      ) : (
        <p className="text-nyx-gray-1 text-xl font-light">{name}</p>
      )}
    </div>
  );
}

//accordion component
function Accordion(props: any) {
  const { data, onToggle } = props;

  const { setModalConfig } = useContext(UseContextData);
  const [isOpen, setIsOpen] = useState(data.toggle);

  useEffect(() => {
    setIsOpen(data.toggle);
  }, [data.toggle]);

  const onClick = () => {
    onToggle(data);
    setIsOpen(!isOpen);
  };
  const openSettings = (name: any) => {
    let action = { onClose: closePopUp, from: name };
    setModalConfig(AI_SETTINGSCONFIG(action));
  };

  const closePopUp = () => {
    setModalConfig(MODAL_RESET);
  };

  return (
    <div className="bg-nyx-blue-4 rounded-lg my-3">
      <h2 className="mb-0">
        <div
          onClick={onClick}
          className="group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-nyx-blue-4 text-white rounded-lg"
          aria-expanded={isOpen}
          aria-controls={`collapse_${data.name}`}
        >
          <div className="flex w-full justify-between items-center">
            <div
              className={`w-[50%] md:w-full font-semibold flex text-[1.20rem] ${isOpen ? "text-nyx-yellow text-lg" : "text-white text-base"}`}
            >
              {data.name}
              {data.toggle && (
                <div className="mx-2">
                  {data.name !== "Find a related word" && (
                    <button
                      title="Additional Settings"
                      onClick={() => {
                        openSettings(data.name);
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 21V15H13V17H21V19H13V21H11ZM3 19V17H9V19H3ZM7 15V13H3V11H7V9H9V15H7ZM11 13V11H21V13H11ZM15 9V3H17V5H21V7H17V9H15ZM3 7V5H13V7H3Z"
                          fill="#FFF"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <span
            className={`${
              isOpen ? "rotate-[-180deg] -mr-1" : "fill-white"
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
        id={`collapse_${data.name}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-nyx-blue-4 w-full overflow-hidden rounded-lg"
      >
        <div className="p-4">
          {isOpen ? <div className="">{data.component}</div> : null}
        </div>
      </motion.div>
    </div>
  );
}

// accordion list menu
function TabMenu(props: any) {
  const [wordStressPopUp, setWordStressPopUp] = useState<boolean>(false);
  const [sentimentPopUp, setSentimentPopUp] = useState<boolean>(false);
  const [syllablePopUp, setSyllablePopUp] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>("");
  const [syllableOutput, setSyllableOutput] = useState<string>("");
  const [wordStressOutput, setWordStressOutput] = useState<string>("");
  const { history } = useContext(UseContextData);
  const [showError, setShowError] = useState<boolean>(false);
  const [finding, setFinding] = useState(false);
  const [selectedbtn, setselectedbtn] = useState("");
  const [accordionList, setAccordionList] = useState<any>([
    {
      name: "Find a related word",
      component: <RelatedWords />,
      toggle: false,
    },
    {
      name: "Lines and Songs",
      component: <LinesAndSongs />,
      toggle: false,
    },
    { name: "Sections", component: <Sections />, toggle: false },
    { name: "Rewrite", component: <Rewrite />, toggle: false },
  ]);
  const mutateSentimentAnalysis = useMutation({
    mutationKey: ["sentiment-analysis"],
    mutationFn: sentimentalAnalysesService,
  });
  const onToggle = (acc: any) => {
    setAccordionList((prevList: any) =>
      prevList.map((accordion: any) => ({
        ...accordion,
        toggle: accordion.name === acc.name ? !accordion.toggle : false,
      })),
    );
  };

  useEffect(() => {
    props.getCurrentAccordion(accordionList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accordionList]);

  const wordStressButtonClick = () => {
    setWordStressPopUp(false);
    setselectedbtn("wordStress");
    setFinding(true);
    // if (history.length === 0) {
    //   setShowError(true);
    // } else if (
    //   history[history.length - 1].type === "generate_lyrics" &&
    //   history.length > 0
    // ) {
    //   let payload = {
    //     task: "Word Stress",
    //     user_id: decodeToken(localStorage.getItem("token")).data.userId,
    //     lyrics: history[0].data[0],
    //   };
    //   mutateSentimentAnalysis.mutate(payload, {
    //     onSuccess: async (response) => {
    //       setShowError(false);
    //       setWordStressOutput(response?.output);
    //       setWordStressPopUp(true);
    //     },
    //     onError: (errorResponse) => {
    //       console.log(errorResponse);
    //     },
    //   });
    // }

    if (history.length > 0) {
      let payload = {
        task: "Word Stress",
        user_id: decodeToken(localStorage.getItem("token")).data.userId,
        lyrics: history[0].data[0],
      };
      mutateSentimentAnalysis.mutate(payload, {
        onSuccess: async (response) => {
          setShowError(false);
          setWordStressOutput(response?.output);
          setWordStressPopUp(true);
          setFinding(false);
        },
        onError: (errorResponse) => {
          console.log(errorResponse);
          setFinding(false);
        },
      });
    } else {
      toast.error("Try some lyrics...");
    }
  };

  const syllableButtonClick = () => {
    setSyllablePopUp(false);
    setselectedbtn("syllable");
    setFinding(true);
    // if (history.length === 0) {
    //   setShowError(true);
    // } else if (
    //   history[history.length - 1].type === "generate_lyrics" &&
    //   history.length > 0
    // ) {
    //   let payload = {
    //     task: "Syllable count",
    //     user_id: decodeToken(localStorage.getItem("token")).data.userId,
    //     lyrics: history[0].data[0],
    //   };
    //   mutateSentimentAnalysis.mutate(payload, {
    //     onSuccess: async (response) => {
    //       setShowError(false);
    //       setSyllableOutput(response?.output);
    //       setSyllablePopUp(true);
    //     },
    //     onError: (errorResponse) => {
    //       console.log(errorResponse);
    //     },
    //   });
    // }

    if (history.length > 0) {
      let payload = {
        task: "Syllable count",
        user_id: decodeToken(localStorage.getItem("token")).data.userId,
        lyrics: history[0].data[0],
      };
      mutateSentimentAnalysis.mutate(payload, {
        onSuccess: async (response) => {
          setShowError(false);
          setSyllableOutput(response?.output);
          setSyllablePopUp(true);
          setFinding(false);
        },
        onError: (errorResponse) => {
          console.log(errorResponse);
          setFinding(false);
        },
      });
    } else {
      toast.error("Try some lyrics...");
    }
  };

  const sentimentButtonClick = () => {
    // console.log("here")
    setSentimentPopUp(false);
    setselectedbtn("sentiMent");
    setFinding(true);
    // if (history.length === 0) {
    //   setShowError(true);

    // } else if (
    //   history[history.length - 1].type === "generate_lyrics" &&
    //   history.length > 0
    // ) {
    //   let payload = {
    //     task: "Sentiment",
    //     user_id: decodeToken(localStorage.getItem("token")).data.userId,
    //     lyrics: history[0].data[0],
    //   };

    // }
    if (history.length > 0) {
      let payload = {
        task: "Sentiment",
        user_id: decodeToken(localStorage.getItem("token")).data.userId,
        lyrics: history[0].data[0],
      };
      mutateSentimentAnalysis.mutate(payload, {
        onSuccess: async (response) => {
          setShowError(false);
          setFinding(false);
          setExplanation(response?.output);
          setSentimentPopUp(true);
        },
        onError: (errorResponse) => {
          console.log(errorResponse);
          setFinding(false);
        },
      });
    } else {
      toast.error("Try some lyrics...");
    }
  };
  const handleModal = () => {
    setSentimentPopUp(false);
    setSyllablePopUp(false);
    setWordStressPopUp(false);
  };

  const copyHandler = (name: any) => {
    copy(
      name == "sentiment"
        ? explanation
        : name == "syllable"
          ? syllableOutput
          : wordStressOutput,
    );
    toast.success("copied to clipboard!!");
  };

  const format = (data: any) => {
    let outputString = data.replace(/\\n/g, "<br>");
    outputString = outputString.replace(
      /\*\*([^\s]*)\*\*/g,
      '<b style="color:white">$1</b>',
    );

    return outputString;
  };

  const textFormat = (data: any) => {
    let outputString = data.replace(/\\n/g, "<br>");
    console.log(outputString);
    return outputString;
  };

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = "Changes you made may not be saved."; //Required for Chrome to show the dialog
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <div className={``}>
        <div className="hidden md:flex bg-black  justify-between p-3  rounded-tl-lg">
          <div className="flex gap-2">
            <p className="text-white font-[600]">AI Lyrics generator</p>

            {/* <Image src={VECTORS.n2} width={22} height={22} alt="n2" /> */}
          </div>
          <div className="text-white font-normal">
            <p>Hindi</p>
          </div>
        </div>
        <div className="w-full m-auto px-4 pt-2">
          <div className="border-b border-nyx-gray-1 flex justify-center items-center">
            {props.tabs.map((tab: any, i: number) => (
              <Tabs
                selectTab={props.selectTab}
                key={i}
                tab={tab}
                selectedTab={props.selectedTab}
              ></Tabs>
            ))}
          </div>
        </div>
        {props.selectedTab == "AI Tools" && (
          <div className="px-4 h-[500px] overflow-hidden overflow-y-auto">
            {accordionList.map((acc: any, index: any) => (
              <Accordion
                key={`acrod-${index}`}
                data={acc}
                onToggle={onToggle}
              />
            ))}
          </div>
        )}
        {props.selectedTab == "Analyze" && (
          <div>
            <div className="flex  justify-between pt-4 w-[92%] m-auto border-b-[.1px] border-nyx-gray-1 pb-2">
              <p className="text-white font-[400]">Word Stress</p>
              <Button
                className="rounded-full w-32 font-[600] group"
                onClick={wordStressButtonClick}
              >
                {" "}
                {finding && selectedbtn == "wordStress" ? (
                  <ButtonLoading />
                ) : (
                  "View"
                )}{" "}
              </Button>
            </div>
            <div className="flex  justify-between pt-4 w-[92%] m-auto border-b-[.1px] border-nyx-gray-1 pb-2">
              <p className="text-white font-[400]">Syllable Count</p>
              <Button
                className="rounded-full w-32 font-[600]"
                onClick={syllableButtonClick}
              >
                {finding && selectedbtn == "syllable" ? (
                  <ButtonLoading />
                ) : (
                  "View"
                )}
              </Button>
            </div>
            <div className="flex  justify-between pt-4 w-[92%] m-auto border-b-[.1px] border-nyx-gray-1 pb-2">
              <p className="text-white font-[400]">Sentiment</p>
              <Button
                className="rounded-full w-32 font-[600]"
                onClick={sentimentButtonClick}
              >
                {finding && selectedbtn == "sentiMent" ? (
                  <ButtonLoading />
                ) : (
                  "View"
                )}
              </Button>
            </div>
            {showError ? (
              <p className="w-full px-3 text-red-600 text-sm my-2">
                Please Write Song
              </p>
            ) : null}
          </div>
        )}
      </div>
      {sentimentPopUp == true ? (
        <Modal
          isOpen={sentimentPopUp}
          style={sentimentStyle}
          onRequestClose={handleModal}
        >
          <div className="relative top-[4rem]">
            <Tooltip>
              <TooltipTrigger
                onClick={() => copyHandler("sentiment")}
                className="absolute top-2.5 right-2.5 bg-white p-2 rounded"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  viewBox="0 0 16 16"
                  className="w-4 fill-current text-nyx-purple"
                >
                  <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                  <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                </svg>
              </TooltipTrigger>
            </Tooltip>
          </div>

          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">
              Sentiment Analysis
            </div>
            <div className="pr-3 cursor-pointer" onClick={handleModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full h-[65%] my-5 border border-[#8297BD] rounded-md p-3 overflow-hidden overflow-y-auto text-[#8297BD]">
            {explanation ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: textFormat(explanation).replace(/\n/g, "<br>"),
                }}
                className="w-[95%]"
              ></div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <Button onClick={handleModal}>OK</Button>
          </div>
        </Modal>
      ) : null}

      {syllablePopUp == true ? (
        <Modal
          isOpen={syllablePopUp}
          style={sentimentStyle}
          onRequestClose={handleModal}
        >
          <div className="relative top-[4rem]">
            <Tooltip>
              <TooltipTrigger
                onClick={() => copyHandler("syllable")}
                className="absolute top-2.5 right-2.5 bg-white p-2 rounded"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  viewBox="0 0 16 16"
                  className="w-4 fill-current text-nyx-purple"
                >
                  <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                  <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                </svg>
              </TooltipTrigger>
            </Tooltip>
          </div>

          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">
              Syllable Count
            </div>
            <div className="pr-3 cursor-pointer" onClick={handleModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full h-[65%] my-5 border border-[#8297BD] rounded-md p-3 overflow-hidden overflow-y-auto text-[#8297BD]">
            {syllableOutput ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: textFormat(syllableOutput).replace(/\n/g, "<br>"),
                }}
                className="w-[95%]"
              ></div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <Button onClick={handleModal}>OK</Button>
          </div>
        </Modal>
      ) : null}

      {wordStressPopUp == true ? (
        <Modal
          isOpen={wordStressPopUp}
          style={sentimentStyle}
          onRequestClose={handleModal}
        >
          <div className="relative top-[4rem]">
            <Tooltip>
              <TooltipTrigger
                onClick={() => copyHandler("word")}
                className="absolute top-2.5 right-2.5 bg-white p-2 rounded"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  viewBox="0 0 16 16"
                  className="w-4 fill-current text-nyx-purple"
                >
                  <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                  <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
                </svg>
              </TooltipTrigger>
            </Tooltip>
          </div>

          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">Word Stress</div>
            <div className="pr-3 cursor-pointer" onClick={handleModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full min-h-[20%] my-5 border border-[#8297BD] rounded-md p-3 overflow-hidden overflow-y-auto text-[#8297BD]">
            {wordStressOutput ? (
              <div
                className="w-[90%]"
                dangerouslySetInnerHTML={{ __html: format(wordStressOutput) }}
              ></div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <Button onClick={handleModal}>OK</Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

//ACCORDION1
function RelatedWords() {
  const router = useRouter();
  const [selectedTrack, setSelectedTrack] = useState("RHYME");
  const [word, setWord] = useState("");
  const {
    relatedWordResponse,
    setRelatedWordResponse,
    setRelatedWordError,
    setRelatedIndex,
    relatedIndex,
    apiLoaded,
    setApiLoaded,
    history,
    setHistoryIndex,
    setHistory,
  } = useContext(UseContextData);
  const mutateProcessRelatedWords = useMutation({
    mutationKey: ["related-words"],
    mutationFn: relatedWords,
  });
  const trackHandleChange = (ev: any) => {
    setSelectedTrack(ev.value);
  };

  const findRelatedWords = () => {
    console.log("here");
    setApiLoaded(true);
    let payload = {
      type: selectedTrack, // RHYME, CONSONANT, SYNONYM, ANTONYM
      word: word,
      workspace_id: Number(localStorage.getItem("workspace_id")),
    };
    mutateProcessRelatedWords.mutate(payload, {
      onSuccess: async (response: any) => {
        if (response.output.length != 0) {
          setHistoryIndex(0);
          setApiLoaded(false);
          let data = {
            type: "words",
            data: response.output,
          };
          history.unshift(data);
          setHistory([...history]);
          setRelatedIndex(0);
        } else {
          toast.error("no words found");
          setRelatedWordError("No Related words found!");
        }
      },
      onError: (errorResponse: any) => {
        toast.error("Error generating words");
        setApiLoaded(false);
        if (
          errorResponse.response.status == 401 ||
          errorResponse.response.status == 403
        ) {
          router.push("/apphome/login");
          localStorage.setItem("route", "/lyrics/ai-lyrics-writer");
        } else {
          setRelatedWordError("No Related words found!");
        }
      },
    });
  };
  return (
    <div className="pt-1 h-auto">
      <div className="m-auto w-[99%]">
        <div className="flex flex-col md:flex-row gap-2">
          <label className="w-full md:w-1/2">
            <input
              onChange={(e) => setWord(e.target.value)}
              placeholder="Type a word"
              className="w-full border-[1.5px] h-full text-sm focus:outline-nyx-gray-1 border-nyx-gray-1 placeholder:text-nyx-gray-1 placeholder:italic  pl-2 text-white  rounded bg-transparent"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Type a word")}
            />
          </label>
          <div className="w-full md:w-1/2">
            <Select
              options={rhymesOptions}
              defaultValue={rhymesOptions[0]}
              styles={colourStyles2}
              onChange={trackHandleChange}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-8 mb-10">
          {word.length === 0 ? (
            <button className="shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 rounded-full w-36 hover:shadow-none font-semibold py-1.5 cursor-not-allowed">
              Generate
            </button>
          ) : (
            <Button
              onClick={findRelatedWords}
              className={`rounded-full w-36 hover:shadow-none font-semibold py-1.5 ${
                apiLoaded
                  ? "bg-nyx-yellow opacity-3 text-black "
                  : "backdrop-blur-md"
              }`}
            >
              {apiLoaded ? <ButtonLoading /> : "Generate"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ACCORDION 2
type LineTab = {
  name: string;
  value: string;
};

const lineTab: LineTab[] = [
  { name: "Write line", value: "line" },
  { name: "Write verse", value: "verse" },
  { name: "Write song", value: "song" },
];
function LinesAndSongs() {
  const textvalue = textreserve((state) => state.textvalue);
  const settextvalue = textreserve((state) => state.settextvalue);
  const mutateProcessLyrics = useMutation({
    mutationKey: ["lyrics-generator"],
    mutationFn: AI_Lyrics_Generator,
  });
  const router = useRouter();
  const {
    setModalConfig,
    lyricsData,
    setLyricsData,
    setLyricsResponse,
    setLyricsIndex,
    history,
    setHistory,
    setErrorLyrics,
    lyricsIndex,
    historyIndex,
    setHistoryIndex,
    apiLoaded,
    setApiLoaded,
    currentInputLine,
    setCurrentInputLine,
  } = useContext(UseContextData);
  const [index, setIndex] = useState<any>();
  const [selectedButton, setSelectedButton] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState(lineTab[0]);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [buttons, setButtons] = useState<any>([
    { no: 1, active: false, label: "one" },
    { no: 2, active: false, label: "two" },
    { no: 3, active: false, label: "three" },
  ]);

  const trackHandleChange = (no: any, track: any) => {
    buttons.map((button: any) => {
      button.active = false;
    });
    buttons[track].active = !buttons[track].active;
    setSelectedButton(no + " " + selectedTab.value);
    lyricsData.user_input.base_instruction = no + " " + selectedTab.value;
    setButtons([...buttons]);
    setLyricsData({ ...lyricsData });
  };

  const [inputVal, setInputVal] = useState("");

  const generateLyrics = (data: any) => {
    let payload: any;

    let updatedAdditionalSettings: any = {};

    if (Object.keys(data.additional_settings.persona).length !== 0)
      updatedAdditionalSettings["persona"] =
        data.additional_settings.persona.value;

    if (Object.keys(data.additional_settings.exemplar).length !== 0)
      updatedAdditionalSettings["exemplar"] =
        data.additional_settings.exemplar.value;

    if (data.additional_settings.task.length !== 0)
      updatedAdditionalSettings["task"] = data.additional_settings.task;

    if (Object.keys(data.additional_settings.format).length !== 0)
      updatedAdditionalSettings["format"] =
        data.additional_settings.format.value;

    if (Object.keys(data.additional_settings.tone).length !== 0)
      updatedAdditionalSettings["tone"] = data.additional_settings.tone.value;

    if (data.additional_settings.context.length !== 0)
      updatedAdditionalSettings["context"] = data.additional_settings.context;

    if (Object.keys(data.additional_settings.theme).length !== 0)
      updatedAdditionalSettings["theme"] = data.additional_settings.theme.value;

    if (Object.keys(data.additional_settings.Target_Listeners).length !== 0)
      updatedAdditionalSettings["Target_Listeners"] =
        data.additional_settings.Target_Listeners.value;

    payload = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      generateType: "LINES_SONGS",
      user_id: decodeToken(localStorage.getItem("token")).data.userId,
      additional_settings: updatedAdditionalSettings,
      user_input: {
        input: data.user_input.input,
        base_instruction: data.user_input.base_instruction,
        additional_inputs: "",
        new_input:
          currentInputLine.length == 0
            ? "yes"
            : textareaRef.current?.value == currentInputLine
              ? "no"
              : "yes",
      },

      generateId: "",
      prev_response:
        currentInputLine.length == 0
          ? ""
          : currentInputLine == textareaRef.current?.value
            ? history[historyIndex]?.data[lyricsIndex]
            : "",
    };

    setApiLoaded(true);
    setLyricsResponse([]);
    setErrorLyrics(null);
    mutateProcessLyrics.mutate(payload, {
      onSuccess: async (response: any) => {
        setApiLoaded(false);
        if (response.output != null) {
          setLyricsResponse(response.output);
          setCurrentInputLine(payload.user_input.input);
          let data = {
            type: "generate_lyrics",
            data: response.output,
          };
          history.unshift(data);
          setHistory([...history]);
          setLyricsIndex(0);
          setHistoryIndex(0);
        } else {
          toast.error(response.error);
        }
      },
      onError: (errorResponse: any) => {
        toast.error("Error generating lyrics");
        setApiLoaded(false);
        if (
          errorResponse.response.status == 401 ||
          errorResponse.response.status == 403
        ) {
          router.push("/apphome/login");
          localStorage.setItem("route", "/lyrics/ai-lyrics-writer");
        }
        setErrorLyrics("Failed to generate lyrics.Please try again!!");
        setTimeout(() => {
          setErrorLyrics(null);
        }, 10000);
      },
    });
  };
  useEffect(() => {
    setTextareaValue(textvalue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    settextvalue(textareaValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textareaValue]);

  return (
    <div className="pt-1 h-auto">
      <div className="w-full mx-auto rounded-md shadow-md">
        <div className="relative">
          <textarea
            ref={textareaRef}
            style={{ minHeight: "6rem", maxHeight: "30px", resize: "vertical" }}
            placeholder="Enter some lines or lyrics that you have in your mind. E.g.
            Beqarar karke humein yoon na jaiye
            Aapko humari kasam laut aaiye"
            rows={1}
            onChange={(event) => {
              setTextareaValue(event.target.value);
              lyricsData.user_input.input = event.target.value;
              setLyricsData({ ...lyricsData });
              setInputVal(event.target.value);
            }}
            value={textareaValue}
            className="border-[1.5px] border-[#8297BD] w-full text-[14px] overflow-hidden  placeholder:text-nyx-gray-1 placeholder:italic bg-transparent py-2 text-white pl-2 rounded-md font-[400]"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder =
                "Enter some lines or lyrics that you have in your mind. E.g.Beqarar karke humein yoon na jaiye Aapko humari kasam laut aaiye")
            }
          />
        </div>
        <TextInfo counts={textareaValue.length} className="text-xs" />
      </div>

      <>
        <div className="flex justify-between m-auto w-full pt-1 gap-2">
          {lineTab.map((tabs, i: number) => (
            <button
              onClick={() => {
                setSelectedTab(lineTab[i]);
                buttons.map((button: any) => {
                  button.active = false;
                });
                if (tabs.name == "Write song") {
                  buttons[0].active = true;
                }

                setButtons([...buttons]);
                lyricsData.user_input.base_instruction =
                  tabs.name == "Write song" ? "complete song" : "";
                setLyricsData({ ...lyricsData });
                setSelectedButton(
                  tabs.name == "Write song" ? "complete song" : null,
                );
                setIndex(i);
              }}
              className={`text-sm mt-2 w-1/3 border-2 hover:border-[#8297BD] hover:bg-[#5e32ff] hover:text-white ${
                i == index
                  ? "bg-[#5e32ff] p-2 border-[#8297BD] rounded-lg  text-center text-white"
                  : "bg-transparent border-nyx-gray-1 text-white p-2 rounded-lg text-center"
              }`}
              key={i}
            >
              {tabs.name}
            </button>
          ))}
        </div>
        {index != null && index != 2 && (
          <div className="flex mt-2 gap-2 w-full">
            {buttons.map((btn: any, track: any) => (
              <button
                key={`buttons-${track}`}
                onClick={() => trackHandleChange(btn.label, track)}
                className={`w-full ${
                  btn.active ? "bg-[#5e32ff]" : "bg-transparent"
                } hover:text-white hover:bg-[#5e32ff] rounded-lg border-2 border-[#8297BD] text-[#8297BD] text-xl font-semibold p-1`}
              >
                {btn.no}
              </button>
            ))}
          </div>
        )}

        <div className="w-full flex justify-center items-center mt-8 mb-10">
          {textareaValue.length === 0 ? (
            <button className="shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 rounded-full w-[165px] hover:shadow-none font-semibold py-1.5 cursor-not-allowed">
              {`Suggest ${selectedTab.value}`}
            </button>
          ) : (
            <Button
              disabled={
                apiLoaded ||
                buttons.filter((btn: any) => btn.active).length === 0 ||
                inputVal.length === 0
              }
              className={`w-[165px] font-semibold rounded-full ${apiLoaded && "pointer-events-none"} ${
                apiLoaded
                  ? "bg-nyx-yellow opacity-3 text-black "
                  : "backdrop-blur-md"
              }`}
              onClick={() => {
                generateLyrics(lyricsData);
              }}
            >
              {apiLoaded ? <ButtonLoading /> : `Suggest ${selectedTab.value}`}
            </Button>
          )}
        </div>
      </>
    </div>
  );
}

//ACCORDION3
function Sections(props: any) {
  const [selectedData, setSelectedData] = useState<string>("");
  const router = useRouter();
  const {
    setLyricsData,
    lyricsData,
    apiLoaded,
    setLyricsIndex,
    setLyricsResponse,
    history,
    setHistory,
    setHistoryIndex,
    setErrorLyrics,
    setApiLoaded,
  } = useContext(UseContextData);
  const textsectionvalue = textsectionreserve(
    (state) => state.textsectionvalue,
  );
  const settextsectionvalue = textsectionreserve(
    (state) => state.settextsectionvalue,
  );
  useEffect(() => {
    lyricsData.generateType = "SECTIONS";
    lyricsData.user_input.base_instruction = "Complete Song";
    setLyricsData({ ...lyricsData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trackHandleChange = (data: any) => {
    setSelectedData(data.value);
    lyricsData.user_input.base_instruction = data.value;
    setLyricsData({ ...lyricsData });
  };
  const mutateProcessLyrics = useMutation({
    mutationKey: ["lyrics-generator"],
    mutationFn: AI_Lyrics_Generator,
  });

  const onGenerateLyrics = () => {
    lyricsData.generateType = "SECTIONS";
    setApiLoaded(true);
    setErrorLyrics(null);
    setLyricsResponse([]);

    let updatedAdditionalSettings: any = {};

    if (Object.keys(lyricsData.additional_settings.persona).length !== 0)
      updatedAdditionalSettings["persona"] =
        lyricsData.additional_settings.persona.value;

    if (Object.keys(lyricsData.additional_settings.exemplar).length !== 0)
      updatedAdditionalSettings["exemplar"] =
        lyricsData.additional_settings.exemplar.value;

    if (lyricsData.additional_settings.task.length !== 0)
      updatedAdditionalSettings["task"] = lyricsData.additional_settings.task;

    if (Object.keys(lyricsData.additional_settings.format).length !== 0)
      updatedAdditionalSettings["format"] =
        lyricsData.additional_settings.format.value;

    if (Object.keys(lyricsData.additional_settings.tone).length !== 0)
      updatedAdditionalSettings["tone"] =
        lyricsData.additional_settings.tone.value;

    if (lyricsData.additional_settings.context.length !== 0)
      updatedAdditionalSettings["context"] =
        lyricsData.additional_settings.context;

    if (Object.keys(lyricsData.additional_settings.theme).length !== 0)
      updatedAdditionalSettings["theme"] =
        lyricsData.additional_settings.theme.value;

    if (
      Object.keys(lyricsData.additional_settings.Target_Listeners).length !== 0
    )
      updatedAdditionalSettings["Target_Listeners"] =
        lyricsData.additional_settings.Target_Listeners.value;

    const newPayload: any = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      user_id: decodeToken(localStorage.getItem("token")).data.userId,
      generateType: lyricsData.generateType,
      user_input: {
        input: lyricsData.user_input.input,
        base_instruction: lyricsData.user_input.base_instruction,
        additional_inputs: lyricsData.user_input.additional_inputs,
        new_input: "",
      },
      generateId: "",
      prev_response: "",
      additional_settings: updatedAdditionalSettings,
    };
    mutateProcessLyrics.mutate(newPayload, {
      onSuccess: async (response: any) => {
        let data = {
          type: "generate_lyrics",
          data: response.output,
        };
        history.unshift(data);
        setHistory([...history]);
        setLyricsIndex(0);
        setHistoryIndex(0);
        setApiLoaded(false);
      },
      onError: (errorResponse: any) => {
        setApiLoaded(false);
        toast.error("Error generating lyrics");
        if (
          errorResponse.response.status == 401 ||
          errorResponse.response.status == 403
        ) {
          router.push("/apphome/login");
          localStorage.setItem("route", "/lyrics/ai-lyrics-writer");
        }

        setErrorLyrics("Failed to generate lyrics.Please try again!!");

        setTimeout(() => {
          setErrorLyrics(null);
        }, 10000);
      },
    });
  };

  // useEffect(()=>{
  //   setTextareaValue(textvalue)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])
  // useEffect(()=>{
  //   settextvalue(textareaValue)
  //   console.log(textvalue)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[textareaValue])

  return (
    <>
      <div className="pt-1 h-auto">
        <div className="m-auto w-[97%]">
          <Select
            options={SectionOptions}
            defaultValue={SectionOptions[0]}
            styles={colourStyles2}
            onChange={trackHandleChange}
            components={{
              IndicatorSeparator: () => null,
            }}
          />

          <textarea
            style={{ minHeight: "6rem", maxHeight: "50px", resize: "vertical" }}
            placeholder="Enter some lines or lyrics that you have in your mind. E.g.
          Beqarar karke humein yoon na jaiye
          Aapko humari kasam laut aaiye"
            value={lyricsData.user_input.input}
            onChange={(e: any) => {
              const re = /^[A-Za-z]/;

              if (e.target.value === "" || re.test(e.target.value)) {
                lyricsData.user_input.input = e.target.value;
                setLyricsData({ ...lyricsData });
              }
            }}
            className="border border-[#8297BD] w-full mt-2 text-[14px] placeholder:italic pl-2 h-9 font-[400] text-white placeholder:text-nyx-gray-1 rounded bg-transparent"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder =
                "Enter some lines or lyrics that you have in your mind. E.g.Beqarar karke humein yoon na jaiye Aapko humari kasam laut aaiye")
            }
          ></textarea>

          <div className="w-full flex justify-center items-center mt-8 mb-10">
            {lyricsData.user_input.input ? (
              <Button
                className={`w-[240px] font-semibold rounded-full ${
                  lyricsData.user_input.input.length == 0 &&
                  "pointer-events-none"
                } ${
                  apiLoaded
                    ? "bg-nyx-yellow opacity-3 text-black "
                    : `backdrop-blur-md`
                }`}
                onClick={onGenerateLyrics}
                disabled={apiLoaded || lyricsData.user_input.input.length == 0}
              >
                {apiLoaded ? (
                  <ButtonLoading />
                ) : selectedData ? (
                  `Write ${selectedData}`
                ) : (
                  "Write Song"
                )}
              </Button>
            ) : (
              <button className="shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 rounded-full w-[240px] hover:shadow-none font-semibold py-1.5 cursor-not-allowed">
                {`Write ${selectedData}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
//ACCORDION4
function Rewrite() {
  const {
    setLyricsData,
    lyricsData,
    apiLoaded,
    setLyricsIndex,
    setLyricsResponse,
    setErrorLyrics,
    setApiLoaded,
    setHistoryIndex,
    history,
    setHistory,
  } = useContext(UseContextData);

  const mutateProcessLyrics = useMutation({
    mutationKey: ["lyrics-generator"],
    mutationFn: AI_Lyrics_Generator,
  });

  const onGenerateLyrics = () => {
    setApiLoaded(true);
    setErrorLyrics(null);
    setLyricsResponse([]);

    lyricsData.generateType = "REWRITE";

    let updatedAdditionalSettings: any = {};

    if (Object.keys(lyricsData.additional_settings.persona).length !== 0)
      updatedAdditionalSettings["persona"] =
        lyricsData.additional_settings.persona.value;

    if (Object.keys(lyricsData.additional_settings.exemplar).length !== 0)
      updatedAdditionalSettings["exemplar"] =
        lyricsData.additional_settings.exemplar.value;

    if (lyricsData.additional_settings.task.length !== 0)
      updatedAdditionalSettings["task"] = lyricsData.additional_settings.task;

    if (Object.keys(lyricsData.additional_settings.format).length !== 0)
      updatedAdditionalSettings["format"] =
        lyricsData.additional_settings.format.value;

    if (Object.keys(lyricsData.additional_settings.tone).length !== 0)
      updatedAdditionalSettings["tone"] =
        lyricsData.additional_settings.tone.value;

    if (lyricsData.additional_settings.context.length !== 0)
      updatedAdditionalSettings["context"] =
        lyricsData.additional_settings.context;

    if (Object.keys(lyricsData.additional_settings.theme).length !== 0)
      updatedAdditionalSettings["theme"] =
        lyricsData.additional_settings.theme.value;

    if (
      Object.keys(lyricsData.additional_settings.Target_Listeners).length !== 0
    )
      updatedAdditionalSettings["Target_Listeners"] =
        lyricsData.additional_settings.Target_Listeners.value;

    const newPayload: any = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      user_id: decodeToken(localStorage.getItem("token")).data.userId,
      generateType: lyricsData.generateType,
      user_input: {
        input: lyricsData.user_input.input,
        base_instruction: "",
        additional_inputs: lyricsData.user_input.additional_inputs,
        new_input: "",
      },
      generateId: "",
      prev_response: "",
      additional_settings: updatedAdditionalSettings,
    };
    mutateProcessLyrics.mutate(newPayload, {
      onSuccess: async (response: any) => {
        setLyricsResponse(response.output);
        let data = {
          type: "generate_lyrics",
          data: response.output,
        };
        history.unshift(data);
        setHistory([...history]);
        setHistoryIndex(0);
        setLyricsIndex(0);
        setApiLoaded(false);
      },
      onError: (errorResponse: any) => {
        toast.error("Error generating lyrics");
        setApiLoaded(false);
        setErrorLyrics("Failed to generate lyrics.Please try again!!");
        setTimeout(() => {
          setErrorLyrics(null);
        }, 10000);
      },
    });
  };

  useEffect(() => {
    lyricsData.generateType = "REWRITE";
    setLyricsData({ ...lyricsData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="pt-1 h-auto">
        <div className="">
          <textarea
            style={{
              minHeight: "6rem",
              maxHeight: "150px",
              resize: "vertical",
            }}
            value={lyricsData.user_input.input}
            onChange={(e: any) => {
              const re = /^[A-Za-z]/;
              if (e.target.value === "" || re.test(e.target.value)) {
                lyricsData.user_input.input = e.target.value;
                setLyricsData({ ...lyricsData });
              }
            }}
            placeholder="Enter the lines or lyrics that you want to rewrite. . E.g.
          Beqarar karke humein yoon na jaiye
          Aapko humari kasam laut aaiye"
            className="border border-[#8297BD] w-full mt-4 text-[14px] placeholder:text-nyx-gray-1 placeholder:italic pl-2 h-9 text-white  rounded bg-transparent"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder =
                "Enter the lines or lyrics that you want to rewrite. . E.g. Beqarar karke humein yoon na jaiye Aapko humari kasam laut aaiye")
            }
          ></textarea>

          <div className="w-full flex justify-center items-center mt-8 mb-10">
            {lyricsData.user_input.input ? (
              <Button
                className={`w-36 mt-5 font-semibold rounded-full ${
                  lyricsData.user_input.input.length == 0 &&
                  "pointer-events-none"
                } ${
                  apiLoaded
                    ? "bg-nyx-yellow opacity-3 text-black"
                    : "backdrop-blur-md"
                }`}
                onClick={onGenerateLyrics}
                disabled={apiLoaded}
              >
                {apiLoaded ? <ButtonLoading /> : "Rewrite"}
              </Button>
            ) : (
              <button className="shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 rounded-full w-36 hover:shadow-none font-semibold py-1.5 cursor-not-allowed">
                Rewrite
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
