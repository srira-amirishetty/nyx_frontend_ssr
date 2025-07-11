"use client";
import { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { genereOptions, trackOptions } from "../constant";
import { colourStyles2 } from "../optionsStyle";
import Details from "../Details";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { AUTHMODAL, LOGINMODAL, MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { postLyrics } from "@nyx-frontend/main/services/uploadService";
import LyricsAnalysisLoading from "@nyx-frontend/main/components/LyricsAnalysisLoading";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";

export default function Lyrics() {
  const [selectedTrack, setSelectedTrack] = useState(trackOptions[0].value);
  const [selectedGenre, setSelectedGenre] = useState("");
  const { isLoggedIn, setModalConfig, setApiLoaded } =
    useContext(UseContextData);
  const [refId, setRefId] = useState<string>("");
  const [showAnalysisModal, setshowAnalysisModal] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const mutateLyrics = useMutation({
    mutationKey: ["payment-checkout"],
    mutationFn: postLyrics,
  });

  const [lyrics, setLyrics] = useState("");

  const genereHandleChange = (selected: any) => {
    setSelectedGenre(selected.value);
  };

  const trackHandleChange = (selected: any) => {
    setSelectedTrack(selected.value);
  };

  const onUploadAnalysisClose = () => {
    // setModalConfig(MODAL_RESET)
    // setshowAnalysisModal(true)
  };
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = () => {
    const valid_data = selectedGenre.length != 0 && lyrics.length != 0;
    setError(!valid_data);
    if (valid_data) {
      let payload: any = {
        trackType: selectedTrack,
        genre: selectedGenre,
        lyrics: lyrics,
      };
      setModalConfig(AUTHMODAL);
      setApiLoaded(false);
      mutateLyrics.mutate(payload, {
        onSuccess: (response) => {
          // setModalConfig(MODAL_RESET)
          setApiLoaded(true);
          setRefId(response.id);
          if (isLoggedIn) {
            setshowAnalysisModal(true);
          } else {
            let action = {
              handleClose: handleClosePreLogin,
            };
            setModalConfig(LOGINMODAL(action));
          }
        },
        onError: (errorResponse) => {
          setModalConfig(MODAL_RESET);
        },
      });
    }
  };

  const handleClosePreLogin = () => {
    setModalConfig(MODAL_RESET);
    if (localStorage.getItem("token") != null) {
      setshowAnalysisModal(true);
    }
  };

  const onProgressComplete = () => {};

  return (
    <div className="min-h-screen mb-32 w-full" id="trackedDiv">
      <div className="relative ">
        <p className="text-[#8297BD] text-[20px] md:text-[24px] font-bold text-center mt-[36px] mb-8">
          LyricGenius Predict
        </p>
        <div className="px-3 md:px-0 min-h-screen">
          {showAnalysisModal ? (
            <LyricsAnalysisLoading
              onClose={onUploadAnalysisClose}
              onProgressComplete={() =>
                router.push(
                  "/apphome/workspace10/lyrics-genius-ai/probability?ref=" +
                    refId,
                )
              }
              file={null}
              refId={refId}
            />
          ) : null}
          <div className="w-full md:w-[90%] rounded-3xl bg-colorBack m-auto pb-[4rem] mb-24 mt-10 top-10">
            <div className="pt-10">
              <h3 className="text-white text-xl font-bold text-center mb-5">
                Turn Your Tunes into Predictive Hits with NYX AI
              </h3>
              <div className="w-44 bg-nyx-yellow h-1 mx-auto mb-5"></div>
              <p className="text-white opacity-90 font-light text-base text-center mb-1">
                Unlock the Future of Your Music with AI Success Projections
              </p>
              <p className="text-nyx-light-blue m-0 font-bold text-base text-center mb-20">
                Analyse success probabilities | Enhance song quality | Monetise
                future royalties
              </p>
            </div>
            <div className="flex w-full max-w-lg mx-auto justify-center items-center gap-4 mt-5">
              <div className="w-1/2">
                <label className="text-white text-xl font-normal mb-2 block">
                  Track Type
                </label>
                <Select
                  options={trackOptions}
                  defaultValue={trackOptions[0]}
                  styles={colourStyles2}
                  onChange={trackHandleChange}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <div className="w-1/2">
                <label className="text-white text-xl font-normal mb-2 block">
                  Select Genre
                </label>
                <Select
                  options={genereOptions}
                  placeholder="Select Category"
                  styles={colourStyles2}
                  onChange={genereHandleChange}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
            </div>

            <div className="flex w-full max-w-lg mx-auto justify-center items-center gap-4 mt-5">
              <div className="w-1/2"></div>
              <div className="w-1/2">
                {error && selectedGenre.length == 0 && (
                  <p className="relative bottom-4 left-1 text-red-500">
                    Select Genre
                  </p>
                )}
              </div>
            </div>

            <div className="bg-black p-8 rounded-lg m-auto  w-[90%] mt-7">
              <textarea
                onChange={(event) => {
                  setLyrics(event.target.value);
                  setError(false);
                }}
                className="w-full outline-none h-48 bg-black text-white p-4 rounded-md resize-none"
                placeholder="Enter lyrics here..."
              ></textarea>
            </div>
            {error && lyrics.length == 0 && (
              <p className="m-auto w-[89%] relative top-2 text-red-500">
                Enter lyrics
              </p>
            )}

            {/* <div className="rounded-lg m-auto  w-[90%] mt-7">
                <Editor
                    value={lyrics}
                    onChange={(v: any) => 
                        setLyrics(v)
                    }
                />
            </div> */}

            <div className="md:w-[15%] w-[90%] m-auto relative top-5">
              <ButtonElement
                onSubmit={checkAuth}
                name="Check Success"
              ></ButtonElement>
            </div>

            <div className="flex flex-col w-full justify-center items-center my-7">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-5 mt-5">
                <Details />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
