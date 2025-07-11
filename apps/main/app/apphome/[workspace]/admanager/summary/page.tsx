"use client";
import React, { useState, useEffect } from "react";
import SummaryPage from "./_components/SummaryPage";
import {
  getCampaign,
  publishCampaign,
} from "@nyx-frontend/main/services/admanagerServices";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "@nyx-frontend/main/utils/classNames";
import Button from "@nyx-frontend/main/components/Button";
import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { toast } from "react-toastify";
import useStore from "../component/store";
import Steper from "../component/Steper";

type PlatformMap = {
  [key: string]: string;
};

type ObjectiveMap = {
  [key: string]: string;
};

export default function Page() {
  const search = useSearchParams();
  const router = useRouter();
  const [targetGroups, setTargetGroups] = useState([]);
  const [activeTgTab, setActiveTgTab] = useState<any>(null);
  const [workspacename, setWorkspacename] = useState<string>("");
  const { setElement } = useStore();

  useEffect(() => {
    setElement("element4", true);
    setElement("element3", true);
    setElement("element2", true);
    setElement("element1", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const platformMap: PlatformMap = {
    Google: "GG",
    Facebook: "FB",
    Instagram: "IG",
    LinkedIn: "LK",
    Snapchat: "SC",
    Twitter: "X",
    X: "X",
  };

  const objectiveMap: ObjectiveMap = {
    "Brand Awareness": "BA",
    Reach: "RE",
    Traffic: "TR",
    Engagement: "EN",
    "Video views": "VV",
    "Lead generation": "LG",
    "Website conversion": "WC",
    "Store traffic": "ST",
    "catalogue sales": "CS",
  };

  function formatTargetGroup(targetGroup: any): string {
    const country = targetGroup?.country
      ? targetGroup.country.charAt(0).toUpperCase()
      : "";
    const region = targetGroup.region
      ? targetGroup.region.charAt(0).toUpperCase()
      : "";
    const ageNumbers = targetGroup?.age_group?.match(/\d+/g)?.join("") || "";
    const gender = targetGroup?.gender?.charAt(0).toUpperCase();

    return `${country}${region}${ageNumbers}${gender}`;
  }

  function formatDateToDDMMYYYY(dateString: string): string {
    const date = new Date(dateString); // Parses the local date string

    // Extract day, month, and year in local time
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = String(date.getUTCFullYear());

    return `${day}${month}${year}`;
  }

  useEffect(() => {
    const name = localStorage.getItem("workspace_name");
    if (name) {
      setWorkspacename(name);
    }
  }, []);

  const mutatePunlishCampaign = useMutation({
    mutationKey: ["publish-campaign"],
    mutationFn: publishCampaign,
  });

  const { data: campaignDetails, isLoading: campaignDetailsLoading } = useQuery(
    {
      queryKey: ["getCampaigns-summary", Number(search.get("campaignId"))],
      queryFn: () => {
        if (Number(search.get("campaignId"))) {
          return getCampaign(Number(search.get("campaignId")));
        }

        return null;
      },
    }
  );

  useEffect(() => {
    if (campaignDetails) {
      setActiveTgTab(0);
      setTargetGroups(campaignDetails?.data?.[0]?.targetGroups);
    }
  }, [campaignDetails]);

  const publishButtonClick = () => {
    const resultArray = campaignDetails?.data?.map((campaign: any) => {
      const platformId = campaign?.platform?.id;
      const platformName = platformMap[campaign?.platform?.platformName];
      const campaignName = campaign?.campaignName.replace(/\s+/g, "");
      const objective = objectiveMap[campaign?.objective];
      const targetGroup = formatTargetGroup(campaign?.targetGroups[0]);
      const campaignStartDate = formatDateToDDMMYYYY(
        campaign?.campaignStartTime
      );
      const now = new Date();
      const seconds = now.getSeconds(); // 0-59

      // const campaignString = `${platformName}_${campaignName}_${objective}_${targetGroup}_${campaignStartDate}_${seconds}`;

      // const productId = campaign.productId || "NoProduct";
      // const adnameString = `${platformName}_${campaignName}_${objective}_${targetGroup}_${productId}_${campaignStartDate}_${seconds}`;
      // const adgroup = `${platformName}_${campaignName}_${targetGroup}_${campaignStartDate}_${seconds}`;

      const campaignString = `${platformName}_${campaignName}_${objective}_TARGET_GROUPS_${campaignStartDate}_${seconds}`;
      const productId = campaign.productId || "NoProduct";
      const adnameString = `${platformName}_${campaignName}_${objective}_TARGET_GROUPS_${productId}_${campaignStartDate}_${seconds}`;
      const adgroup = `${platformName}_${campaignName}_TARGET_GROUPS_${campaignStartDate}_${seconds}`;

      return {
        platformId,
        platformData: {
          campaign_name: campaignString,
          adgroup_name: adgroup,
          adname: adnameString,
        },
      };
    });
    const payload = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      campaign_id: Number(search.get("campaignId")),
      status: "UNDER_REVIEW",
      campaignInfo: resultArray,
    };

    console.log("final payload", payload);

    mutatePunlishCampaign.mutate(payload, {
      onSuccess: (response: any) => {
        setElement("element5", true);
        console.log(response);
        router.push(`/apphome/${workspacename}/admanager/dashboard?view=graph`);
      },
      onError: (res: any) => {
        console.log(res);

        (function () {
          const extractErrorMessage = (response: any) => {
            // Handle different error structures
            if (response?.response?.data?.error) {
              return response.response.data.error;
            } else if (response?.response?.data?.message) {
              return response.response.data.message;
            } else if (response?.message) {
              return response.message;
            }
            return "An unknown error occurred.";
          };

          const extractErrorMessageTwo = (response: any) => {
            const fullMessage =
              response?.response?.data?.error ??
              response?.response?.data?.message ??
              response?.message ??
              "An unknown error occurred.";

            // Remove specific prefixes if they exist
            return fullMessage.replace(
              /^InternalServerError: FacebookRequestError: Invalid parameter - /,
              ""
            );
          };

          const errorMessage = extractErrorMessageTwo(res);

          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate3lines mt-2">
                {errorMessage}
              </span>
            </>,
            { autoClose: 5000 }
          );
        })();
      },
    });
  };

  return (
    <div className="w-full h-full">
      <div className="relative flex items-center justify-center h-full mt-2">
        <Steper />
      </div>
      <div className=" h-[78vh] overflow-hidden overflow-y-auto">
        <SummaryPage
          brandId={Number(search.get("brandid"))}
          campaignId={Number(search.get("campaignId"))}
          productId={campaignDetails?.data[0]?.productId}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-2 my-[10.5px]">
        <Button
          className={classNames(
            "rounded-full w-[124px] font-semibold hover:shadow-none",
            mutatePunlishCampaign.isPending
              ? "bg-gray-400 text-black cursor-not-allowed border border-gray-400 hover:bg-gray-400"
              : "text-nyx-yellow"
          )}
          onClick={() =>
            router.push(
              `/apphome/${workspacename}/admanager/budget?campaignId=${Number(
                search.get("campaignId")
              )}&brandid=${Number(
                search.get("brandid")
              )}&objective=${search.get("objective")}`
            )
          }
          disabled={mutatePunlishCampaign.isPending}
        >
          Back
        </Button>

        <Button
          className={classNames(
            "rounded-full w-[124px] font-semibold hover:shadow-none",
            mutatePunlishCampaign.isPending
              ? "bg-gray-400 text-black cursor-not-allowed border border-gray-400 hover:bg-gray-400"
              : "bg-nyx-yellow text-black"
          )}
          onClick={publishButtonClick}
          disabled={mutatePunlishCampaign.isPending}
        >
          {mutatePunlishCampaign.isPending ? <ButtonLoadingGenAI /> : "Publish"}
        </Button>
      </div>
    </div>
  );
}
