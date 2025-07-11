import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { AI_Lyrics_Generator } from "@nyx-frontend/main/services/uploadService";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import { AI_SETTINGSCONFIG, MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";
import { VECTORS, decodeToken } from "@nyx-frontend/main/utils/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* eslint-disable @next/next/no-img-element */
function Kickstart(props) {
  const { post } = useRequests();
  const {
    setHistory,
    setLyricsIndex,
    setHistoryIndex,
    setModalConfig,
    currentInput,
    setCurrentInput,
    setApiLoaded,
    history,
    lyricsData,
    setErrorLyrics,
    setLyricsResponse,
  } = useContext(UseContextData);
  const openSettings = () => {
    let action = { onClose: closePopUp, from: "kickstart" };
    setModalConfig(AI_SETTINGSCONFIG(action));
  };
  const mutateProcessLyrics = useMutation({
    mutationKey: ["lyrics-generator"],
    mutationFn: AI_Lyrics_Generator,
  });

  const closePopUp = (data) => {
    setModalConfig(MODAL_RESET);
    generateLyrics(data);
  };

  const generateLyrics = async (data) => {
    if (Object.keys(data.additional_settings).length != 0) {
      data.additional_settings.language = "hinglish";
    }

    // setApiLoaded(true);
    // setLyricsResponse([]);
    // setErrorLyrics(null);
    // mutateProcessLyrics.mutate(data, {
    //   onSuccess: async (response) => {
    //     console.log("got response-------------------")
    //     setApiLoaded(false)
    //     setLyricsResponse(response.output);
    //     let data = {
    //       type: "generate_lyrics",
    //       data: response.output,
    //     };
    //     history.unshift(data);
    //     setHistory([...history]);
    //     setLyricsIndex(0);
    //     setHistoryIndex(0);
    //   },
    //   onError: (errorResponse) => {
    //     console.log(errorResponse,"error response")
    //     toast.error("Error generating lyrics");
    //     setApiLoaded(false);
    //     if (
    //       errorResponse.response.status == 401 ||
    //       errorResponse.response.status == 403
    //     ) {
    //       router.push("/apphome/login");
    //       localStorage.setItem("route", "/lyrics/ai-lyrics-writer");
    //     }
    //     setErrorLyrics("Failed to generate lyrics.Please try again!!");
    //     setTimeout(() => {
    //       setErrorLyrics(null);
    //     }, 10000);
    //   },
    // });

    try {
      setApiLoaded(true);
      setLyricsResponse([]);
      setErrorLyrics(null);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AI_URL}/generate-lyrics`,
        data,
      );
      setApiLoaded(false);
      setLyricsResponse(response.data.output);
      let res = {
        type: "generate_lyrics",
        data: response.data.output,
      };
      history.unshift(res);
      setHistory([...history]);
      setLyricsIndex(0);
      setHistoryIndex(0);
    } catch (error) {
      if (error.response.status == 401 || error.response.status == 403) {
        router.push("/apphome/login");
        localStorage.setItem("route", "/lyrics/ai-lyrics-writer");
      }
      toast.error("Error generating lyrics");
      setApiLoaded(false);
      setErrorLyrics("Failed to generate lyrics.Please try again!!");
      setTimeout(() => {
        setErrorLyrics(null);
      }, 10000);
    }
  };

  return (
    <>
      <div className="flex justify-between pb-4">
        <p className="text-white font-[600] text-[20px]">Kickstart a song..</p>

        <div
          className="cursor-pointer"
          onClick={() => setModalConfig(MODAL_RESET)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector9"
              d="M0.35 13.5029C0.583333 13.721 0.855555 13.8301 1.16667 13.8301C1.47778 13.8301 1.75 13.721 1.98333 13.5029L7 8.81305L12.0556 13.5392C12.263 13.7331 12.5287 13.824 12.8528 13.8119C13.1769 13.7998 13.4426 13.6968 13.65 13.5029C13.8833 13.2847 14 13.0303 14 12.7394C14 12.4486 13.8833 12.1941 13.65 11.9759L8.63333 7.28613L13.6889 2.55995C13.8963 2.36605 13.9935 2.11763 13.9806 1.81467C13.9676 1.51171 13.8574 1.26328 13.65 1.06938C13.4167 0.851253 13.1444 0.742188 12.8333 0.742188C12.5222 0.742188 12.25 0.851253 12.0167 1.06938L7 5.75921L1.94444 1.03303C1.73704 0.839134 1.4713 0.748246 1.14722 0.760365C0.823148 0.772483 0.557407 0.87549 0.35 1.06938C0.116667 1.28752 0 1.542 0 1.83284C0 2.12369 0.116667 2.37817 0.35 2.5963L5.36667 7.28613L0.311111 12.0123C0.103703 12.2062 0.00648092 12.4546 0.0194439 12.7576C0.0324068 13.0605 0.142593 13.309 0.35 13.5029Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="relative">
        <p className="text-white font-[400]">Write few lines </p>
        <div className="mt-1">
          <input
            value={currentInput}
            placeholder="Place a line here"
            onChange={(event) => {
              setCurrentInput(event.target.value);
            }}
            type="text"
            className="w-full text-[14px] placeholder:text-nyx-gray-1 placeholder:italic bg-transparent py-2 text-white pl-2 border outline-none rounded-md font-[400]"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Place a line here")}
          />
        </div>

        <div className="absolute inset-y-[2.8rem] right-2 flex items-center pl-3 cursor-pointer">
          {/* <img onClick={() => openSettings()} src={VECTORS.i13} alt="n1"></img> */}
        </div>
      </div>
      <div className="flex justify-center mt-10 gap-2 font-semibold">
        <ButtonElement
          onSubmit={() => setModalConfig(MODAL_RESET)}
          name="Cancel"
        ></ButtonElement>
        <ButtonElement name="Submit" onSubmit={openSettings}></ButtonElement>
      </div>
    </>
  );
}

export default Kickstart;
