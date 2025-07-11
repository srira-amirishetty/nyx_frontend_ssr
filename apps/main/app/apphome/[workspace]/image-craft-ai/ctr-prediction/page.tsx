/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useState, useEffect } from "react";

import SelectBrand from "./SelectBrand";

import CreateCampaign from "./CreateCampaign";

import UploadMedia from "./UploadMedia";

import Sidebar from "@nyx-frontend/main/components/Sidebar";

import TopBar from "@nyx-frontend/main/components/TopBar";

import Steper from "./Steper";

import Result from "./Result";

import Button from "@nyx-frontend/main/components/Button";

import { useRouter } from "next/navigation";

import { getbrandServiceonbording } from "@nyx-frontend/main/services/brandService";

import {

    analysisCampaignService,

    analysisResultService,

} from "@nyx-frontend/main/services/ctrServices";

import { useQuery, useMutation } from "@tanstack/react-query";

import { CTR_PREDICTION } from "@nyx-frontend/main/utils/productConstants";

import "../../../../../css/toolResponsive.css";

import LandscapePopup from "../../../LandscapePopUp";

import { toast } from "react-toastify";

import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

import "react-toastify/dist/ReactToastify.css";

import Loading from "./_components/Loading";

import Profileicon from "@nyx-frontend/main/components/Profileicon";



const Page = () => {

    const [brandId, setBrandId] = useState<any>();

    const [campignapidata, setcampignapidata] = useState<any>();

    const [campaignLoading, setCampaignLoading] = useState<boolean>(false);

    const [tab, setTab] = useState<any>(CTR_PREDICTION.BRANDING);

    const [imageUploaded, setImageUploaded] = useState<boolean>(false);

    const [campaignID, setCampaignID] = useState<any>(null);

    const [result, setResult] = useState<any>();

    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const { data: brandDetails, refetch: getProductRefetch } = useQuery({

        queryKey: ["getProduct", brandId],

        queryFn: () => {

            if (brandId) {

                return getbrandServiceonbording(brandId);

            }



            return null;

        },

    });



    const mutateCreateAnalysisCampaign = useMutation({

        mutationKey: ["create-campaign"],

        mutationFn: analysisCampaignService,

    });



    const mutateAnalysisResult = useMutation({

        mutationKey: ["result"],

        mutationFn: analysisResultService,

    });



    useEffect(() => {

        const storage = localStorage.getItem("token");

        if (storage) {

        } else {

            router.push("/apphome/login");

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, []);



    const callapifromCampaign = (data: any) => {

        setCampaignLoading(true);

        mutateCreateAnalysisCampaign.mutate(data, {

            onSuccess: (response: any) => {

                setcampignapidata(response);

                setCampaignID(response.data.id);

                setTab(CTR_PREDICTION.UPLOAD);

                setCampaignLoading(false);

            },

            onError: (response: any) => {

                setCampaignLoading(false);

                (function () {

                    const error = () => {



                        toast.error(

                            <>

                                <span className="text-white text-[16px] leading-[20px]">

                                    {" "}

                                    Bad Request!

                                </span>

                                <br />

                                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">

                                    {" "}

                                    {response?.message}

                                </span>

                            </>,

                            { autoClose: 5000 },

                        );

                    };



                    error(); // Invoke the Warning function immediately

                })();

            },

        });

    };



    // console.log("campignapidata", campignapidata);



    const selectedBrandFromBranding = (id: any) => {

        setBrandId(id);

    };



    const analysImageClick = (campaignID: any) => {

        // Reset previous values and show loading immediately

        setResult(null);

        setLoading(true);


        const payload = {

            workspace_id: Number(localStorage.getItem("workspace_id")),

            campaign_id: campaignID,

        };



        mutateAnalysisResult.mutate(payload, {

            onSuccess: (response: any) => {

                setTimeout(() => {

                    setResult(response);

                    setLoading(false); // Turn off the loading state after 1 second

                }, 1000);

            },

            onError: (response: any) => {

                setLoading(false); // Turn off loading on error

                (function () {

                    const error = () => {

                        toast.error(

                            <>

                                <span className="text-white text-[16px] leading-[20px]">

                                    {" "}

                                    Bad Request!

                                </span>

                                <br />

                                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">

                                    {" "}

                                    Some error occured

                                </span>

                            </>,

                            { autoClose: 5000 },

                        );

                    };



                    error(); // Invoke the Warning function immediately

                })();

            },

        });

    };



    // const brandSubmitClick = () => {

    // setBrandSubmitStatus(true);

    // };



    // const campaignSubmitClick = () => {

    // setCampaignSubmitStatus(true);

    // setCampaignLoading(true);

    // };



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

            <div className="justify-start flex w-full bg-[#130828]">

                <Sidebar />

                <div className="w-full overflow-hidden overflow-y-auto h-[100vh]">

                    <TopBar title="Analyse Creative's Potential" />

                    <div className="w-full py-2 px-2">

                        <div className="flex w-full gap-2 justify-center right_side_tool">

                            <div className="tool-left-panel w-full flex flex-col justify-between px-2 overflow-hidden overflow-y-auto rounded-lg">

                                <div className="flex flex-col gap-2">

                                    <SelectBrand

                                        tab={tab}

                                        setTab={setTab}

                                        selectedBrandFromBranding={selectedBrandFromBranding}

                                    />

                                    <CreateCampaign

                                        tab={tab}

                                        setTab={setTab}

                                        callcampignapi={callapifromCampaign}

                                        brandDetails={brandDetails}

                                        getProductRefetch={getProductRefetch}

                                        campaignLoading={campaignLoading}

                                        setImageUploaded={setImageUploaded}

                                    />

                                    <UploadMedia

                                        tab={tab}

                                        setTab={setTab}

                                        campignapidata={campignapidata}

                                        setImageUploaded={setImageUploaded}

                                        setCampaignID={setCampaignID}

                                        analysImageClick={analysImageClick}
                                        mutateAnalysisResult={mutateAnalysisResult}

                                    />


                                    <div>

                                        {/* <div className="w-[217px] mx-auto">

<Button

className="px-20 bg-nyx-yellow text-black text-sm font-semibold rounded-full my-4 hover:shadow-none"

onClick={analysImageClick}

>

{mutateAnalysisResult.isPending ? (

<svg

width="24"

height="25"

className="inline text-gray-200 text-center animate-spin dark:text-transparent"

viewBox="0 0 24 25"

fill="black"

xmlns="http://www.w3.org/2000/svg"

>

<path d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z" />

</svg>

) : (

"Analyze"

)}

</Button>

</div> */}

                                    </div>

                                </div>

                            </div>



                            <div className="w-[65%] bg-[#332270] rounded-lg overflow-hidden overflow-y-auto">

                                {loading ? (

                                    <div className="h-[650px] flex flex-col gap-3 p-4">

                                        <Loading height={250} /> <Loading height={500} />{" "}

                                    </div>

                                ) : (

                                    <>

                                        {result ? (

                                            <div className="w-full">

                                                <Result result={result} />

                                            </div>

                                        ) : (

                                            <div className="w-full px-4 py-10">

                                                <p className="text-white text-[24px] font-bold">

                                                    Steps for Image Analysis

                                                </p>

                                                <Steper tab={tab} imageUploaded={imageUploaded} />

                                            </div>

                                        )}

                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>



            <LandscapePopup />

        </>

    );

};



export default Page;