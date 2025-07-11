/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAnalysisService } from "@nyx-frontend/main/services/uploadService";
import { getPackagesService } from "@nyx-frontend/main/services/productService";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@nyx-frontend/main/components/Button";
import CustomLink from "@nyx-frontend/main/components/Link";
import { useRouter } from "next/navigation";
import { MODEL_CONFIDENCE_MUSIC } from "@nyx-frontend/main/utils/globals";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

type PlanType = {
  active: number;
};

function Probability() {
  const timerID = useRef<ReturnType<typeof setTimeout>>(null);
  const search = useSearchParams();
  const [workspace, setWorkspace] = useState<any>("");
  const route = useRouter();
  const [time, setTime] = useState(1000);
  const { data, refetch } = useQuery({
    queryKey: ["analysis", search.get("ref")],
    queryFn: async () =>
      search.get("ref")
        ? getAnalysisService(
            search.get("ref") || "",
            Number(localStorage.getItem("workspace_id")),
          )
        : null,
    retry: false,
  });

  const { data: plandata, isLoading: isPlanLoading } = useQuery({
    queryKey: ["plan-data"],
    queryFn: getPackagesService,
  });

  const scaleValue =
    data?.nyx_upload_token?.parameters?.original?.key?.score * 100 || 0;
  const scaleFixed = scaleValue === 0 ? -16 : `${scaleValue}%`;

  const flatArray: PlanType[] = Object.values<any>(
    plandata?.nyx_packages ?? {},
  )?.flat(1);
  const hasActivePlan: boolean = flatArray.some(
    (plan: PlanType) => plan.active === 1,
  );

  function capitalizeFirstLetter(word: string) {
    return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
  }
  useEffect(() => {
    timerID.current = setInterval(() => {
      if (data?.struct_url) {
       if(timerID.current) clearInterval(timerID.current);
      } else {
        setTime((old) => old + 500);
        // refetch();
      }
    }, time);

    return () => {
      if(timerID.current) clearInterval(timerID.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      route.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <section className="mt-10 mb-10">
        <div className="w-[95%] pb-20 mx-auto h-max rounded-3xl bg-black/50 py-6 px-3 gap-5 flex justify-center flex-col items-center">
          <div className="fles flex-row w-full">
            <h2 className="text-[#FFF] md:text-2xl sm:text-xs font-semibold">
              Discover Your Song&apos;s Future with AI-Powered Success
              Probability Analysis
            </h2>
          </div>
          <div className="w-full bg-black p-1 md:p-3 relative rounded-md z-0">
            <div className=" w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-md px-2 py-3">
              <div className="grid grid-cols-3 place-content-evenly text-[9px] md:text-sm font-[400]">
                <div className="flex justify-center items-center">
                  <p>41% of Songs</p>
                </div>
                <div className="flex justify-center items-center">
                  <p>55% of Songs</p>
                </div>
                <div className="flex justify-center items-center">
                  <p>6% of Songs</p>
                </div>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3 }}
                className="bg-[#000] p-[0.5px]"
              ></motion.div>
              <div className="grid grid-cols-3 place-content-evenly text-[9px] md:text-sm font-[600]">
                <div className="flex justify-center items-center">
                  <p>Flop</p>
                </div>
                <div className="flex justify-center items-center">
                  <p>Average</p>
                </div>
                <div className="flex justify-center items-center">
                  <p>Hit</p>
                </div>
              </div>
            </div>
            <div className="group absolute inset-0 m-auto w-[calc(100%-4rem)]">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 20 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-y-0 my-auto z-[9] w-[0.5px] bg-black -left-[9px]"
              ></motion.div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 20 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-y-0 my-auto z-[9] w-[0.5px] bg-black left-[33.33%]"
              ></motion.div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 20 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-y-0 my-auto z-[9] w-[0.5px] bg-black left-[66.66%]"
              ></motion.div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 20 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-y-0 my-auto z-[9] w-[0.5px] bg-black -right-[9px]"
              ></motion.div>
              <motion.div
                className="absolute h-[76px] bg-[#8297BD] opacity-90 w-4 rounded-full inset-y-0 my-auto z-10 transition-all"
                animate={{
                  left: scaleFixed,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <div className="w-max h-max bg-black rounded-md absolute top-[-10px] left-[15px] flex items-center justify-center text-[#FFCB54] opacity-0 group-hover:opacity-100 p-1 transition-opacity">
                  {`${scaleValue.toFixed(2)}%`}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 ">
            <Image
              src={`${IMAGE_URL}/ai.svg`}
              width={25}
              height={25}
              alt="Song"
            />
            <h6 className="text-[#FFF] text-sm md:text-lg font-[600]">
              Song Name:
            </h6>
            <div className=" flex bg-[#091234] w-[50%] md:w-auto p-1 rounded-md justify-center items-center ml-12 md:ml-0">
              <h6 className="text-[#FFCB54] text-sm md:font-[600]">
                {data?.nyx_upload_token?.songName}
              </h6>
            </div>
          </div>
          <div className="flex w-full items-center gap-3 ">
            <Image
              src={`${IMAGE_URL}/ai.svg`}
              width={25}
              height={25}
              alt="Success"
            />
            <h6 className="text-[#FFF] text-sm md:text-lg font-[600] ">
              Success Probability:
            </h6>
            <div className=" flex bg-[#091234] w-[50%] md:w-[10%] p-1 rounded-md justify-center items-center">
              <h6 className="text-[#FFCB54] font-[600]">
                {capitalizeFirstLetter(
                  data?.nyx_upload_token?.parameters?.original?.key
                    ?.predicted_popularity_class,
                )}
              </h6>
            </div>
          </div>
          <div className="flex w-full items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M11.7 18C10.1 17.9167 8.75 17.3 7.65 16.15C6.55 15 6 13.6167 6 12C6 10.3333 6.58333 8.91667 7.75 7.75C8.91667 6.58333 10.3333 6 12 6C13.6167 6 15 6.55 16.15 7.65C17.3 8.75 17.9167 10.1 18 11.7L15.9 11.075C15.6833 10.175 15.2167 9.4375 14.5 8.8625C13.7833 8.2875 12.95 8 12 8C10.9 8 9.95833 8.39167 9.175 9.175C8.39167 9.95833 8 10.9 8 12C8 12.95 8.2875 13.7833 8.8625 14.5C9.4375 15.2167 10.175 15.6833 11.075 15.9L11.7 18ZM12.9 21.95C12.75 21.9833 12.6 22 12.45 22H12C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12V12.45C22 12.6 21.9833 12.75 21.95 12.9L20 12.3V12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20H12.3L12.9 21.95ZM20.525 22.5L16.25 18.225L15 22L12 12L22 15L18.225 16.25L22.5 20.525L20.525 22.5Z"
                fill="#7C84E8"
              />
            </svg>
            <h6 className="text-[#FFF] text-sm md:text-lg font-[600]  ">
              Model Confidence:
            </h6>
            <div className=" bg-[#091234] w-[50%] md:w-[10%] p-1 rounded-md flex justify-center items-center">
              <h6 className="text-[#4CAF50] font-[600]">
                {MODEL_CONFIDENCE_MUSIC}
              </h6>
            </div>
          </div>
          {data?.nyx_upload_token === null ? (
            <div className="text-center">
              <p className="text-red-700 mb-4 text-xl">
                Oops, something went wrong. Please reupload your audio
              </p>
              <CustomLink
                className="w-[200px] inline-block"
                href={`/apphome/${workspace}/sonic-ai/predict`}
              >
                Upload
              </CustomLink>
            </div>
          ) : null}

          <p className="text-[#F5F5F5] text-sm md:text-lg font-light w-full text-center my-8">
            Unlock the full potential of your music with our premium features.
            By subscribing to our premium service, you gain access to advanced
            analytics that provide deeper insights into the success
            probabilities of your songs. Our sophisticated AI analyzes multiple
            facets of your track, from melody and harmony to rhythm and genre
            trends, giving you a competitive edge in the music industry. With
            our high-confidence success predictions, you can strategize your
            releases, tailor your marketing efforts, and increase your chances
            of producing a hit. Join the top tier of music professionals who are
            already benefiting from our premium tools and make informed
            decisions that lead to chart-topping success
          </p>

          <div className="flex justify-center items-center md:w-[50%] sm:w-[70%] bg-[#3B226F] mt-7 rounded-[20px] py-10 px-2 text-center">
            <div className="flex justify-center items-center flex-col">
              <p className="text-[#FFCB54] font-[700] text-2xl">
                Improve your song{" "}
              </p>
              <p className="text-[#FFF] font-[700] md:text-lg sm:text-base mb-4 md:mb-9">
                with our NYX Predictive & Generative AI
              </p>
              {/* {!isPlanLoading ? (
                <Button
                  // href={`/upload${
                  //   hasActivePlan ? "/reports" : "/plans"
                  // }?ref=${search.get("ref")}`}
                  onClick={() => {
                    if (hasActivePlan) {
                      sessionStorage.setItem("current_route", "upload");
                      route.push(
                        `/apphome/${workspace}/sonic-ai/reports?ref=` +
                          search.get("ref"),
                      );
                    } else {
                      sessionStorage.setItem("current_route", "upload");
                      // route.push(
                      //   `/apphome/${workspace}/sonic-ai/plans?ref=` +
                      //     search.get("ref"),
                      // );
                      route.push(`/pricing`)
                    }
                  }}
                  className="shadow-glow text-lg"
                >
                  Improve my Song
                </Button>
              ) : null} */}

              <Button
                // href={`/upload${
                //   hasActivePlan ? "/reports" : "/plans"
                // }?ref=${search.get("ref")}`}
                onClick={() => {
                  sessionStorage.setItem("current_route", "upload");
                  route.push(
                    `/apphome/${workspace}/sonic-ai/reports?ref=` +
                      search.get("ref"),
                  );
                }}
                className="shadow-glow text-lg"
              >
                Improve my Song
              </Button>
            </div>
          </div>
          <p className="text-[#FFF]  text-xl md:text-2xl font-[700] text-center">
            Still you think your song can do wonders?
          </p>
          <p className="text-[#FFF] text-lg font-[400] text-center mb-4">
            Raise a request to Monetise Your Music, Retain Your Royalties, NYX
            Handle&apos;s the Rest
          </p>
          <CustomLink
            href={
              `/apphome/${workspace}/sonic-ai/questions?processId=` +
              search.get("ref")
            }
            className="px-2 text-lg shadow-glow w-full max-w-[218px]"
          >
            List my Track
          </CustomLink>
        </div>
      </section>
    </>
  );
}

const ProbabilitySuspense = () => (
  <Suspense>
    <Probability />
  </Suspense>
);

export default ProbabilitySuspense;
