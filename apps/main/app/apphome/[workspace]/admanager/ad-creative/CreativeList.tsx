/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, useEffect } from "react";
import Button from "@nyx-frontend/main/components/Button";
import MultipleTgs from "./MultipleTgs";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Loading from "./_components/Loading";
import {
  getCampaign3,
  getTg3,
  createCampaignTg,
  updateCampaignTg,
} from "@nyx-frontend/main/services/admanagerServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import Steper from "../component/Steper";

import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import classNames from "@nyx-frontend/main/utils/classNames";
import { toast } from "react-toastify";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

interface CreativeListType {
  brandId: number;
  campaignId: number;
  objective: string | null;
}

const CreativeList = ({ brandId, campaignId, objective }: CreativeListType) => {
  const router = useRouter();
  const search = useSearchParams();

  const workspacename = localStorage.getItem("workspace_name");
  const [targetGroups, setTargetGroups] = useState([]);
  const [activeTgTab, setActiveTgTab] = useState<any>(null);

  const [mixedArrays, setMixedArrays] = useState<any>({ 0: false });
  const childRefs = useRef({});

  const { data: campaignDetails, isLoading: campaignFeatching } = useQuery({
    queryKey: ["adcreative-campaign-fertchin", Number(campaignId)],
    enabled: !!campaignId,
    queryFn: () => getCampaign3(campaignId)
  });

  const { data: tgDetails, isLoading: tgFeatching } = useQuery({
    queryKey: ["adcreative-campaign-fertchin", Number(campaignId), Number(activeTgTab)],
    enabled: !!campaignId && !!activeTgTab,
    queryFn: () => getTg3(campaignId, activeTgTab)
  });

  const mutateCreateCampaignTg = useMutation({
    mutationKey: ["add-campign-tg"],
    mutationFn: createCampaignTg,
  });

  const mutateUpdateCampaignTg = useMutation({
    mutationKey: ["add-campign-tg"],
    mutationFn: updateCampaignTg,
  });


  useEffect(() => {
    if (campaignDetails) {
      setActiveTgTab(campaignDetails?.data?.[0]?.targetGroups[0].id);
      setTargetGroups(campaignDetails?.data?.[0]?.targetGroups);
      const mixedArrays = (campaignDetails?.data?.[0]?.targetGroups).reduce(
        (acc, _, index) => {
          acc[index] = false;
          return acc;
        },
        {}
      );
      setMixedArrays(mixedArrays);
    }
  }, [campaignDetails]);


  const updateTgTab = async (tab: any) => {
    let data: any = childRefs.current[activeTgTab].getData()
    if (data) {
      let payload = {
        "workspace_id": Number(localStorage.getItem("workspace_id")),
        "campaignId": campaignId,
        "tgId": activeTgTab,
      }
      let platformsNew = {}
      let platformsUpdate = {}
      for (let item of tgDetails?.data) {
        let platformName = (item.platform.platformName).toUpperCase()
        platformsNew[platformName] = {
          campTgRecordId: item?.admanager_user_campaign_targeting[0]?.id,
          ads: []
        }
        platformsUpdate[platformName] = {
          campTgRecordId: item?.admanager_user_campaign_targeting[0]?.id,
          ads: []
        }
      }

      for (let item of data) {
        for (let key in item.platforms) {
          if (item.platforms[key]?.isExit) {
            platformsUpdate[key].ads.push(item.platforms[key])
          } else {
            platformsNew[key].ads.push(item.platforms[key])
          }
        }
      }

      mutateUpdateCampaignTg.mutate({ ...payload, platforms: platformsUpdate })

      mutateCreateCampaignTg.mutate({ ...payload, platforms: platformsNew }, {
        onSuccess: (response: any) => {
          let index = targetGroups.findIndex((item: any) => item.id == activeTgTab)
          if (tab == 'save' || tab == 'save-update') {
            if (index + 1 === targetGroups?.length) {
              if (tab == 'save-update') {
                router.push(
                  `/apphome/${workspacename}/admanager/summary?campaignId=${campaignId}&brandid=${brandId}&objective=${objective}`
                );
              }
              if (tab == 'save') {
                router.push(
                  `/apphome/${workspacename}/admanager/budget?campaignId=${campaignId}&brandid=${brandId}&objective=${objective}`
                );
              }
            } else {
              let nextTab: any = targetGroups[index + 1]
              setActiveTgTab(nextTab?.id)
            }
          } else {
            setActiveTgTab(tab)
          }
        },
        onError: (error: any) => {
          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Something Went Wrong!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                {error.response.data.error}
              </span>
            </>,
            { autoClose: 5000 }
          );
        },
      });
    }
  }

  return (
    <>
      {campaignFeatching ? (
        <div className="w-full h-[400px] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full">
          <div className="relative flex items-center justify-center h-full mt-2">
            <Steper />
          </div>
          {targetGroups?.map((item: any, index) => (
            <div
              key={index}
              className={
                activeTgTab === item.id
                  ? "w-full h-full "
                  : "w-full h-full hidden"
              }
            >
              <MultipleTgs
                ref={(el: any) => (childRefs.current[item.id] = el)}
                targetGroups={targetGroups}
                activeTgTab={activeTgTab}
                setActiveTgTab={updateTgTab}
                campaignDetails={campaignDetails?.data}
                campaignId={campaignId}
                brandId={brandId}
                tgDetails={tgDetails?.data}
              />
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex justify-center items-center py-4 gap-[20px]">
        <Button
          className={classNames(
            "rounded-full w-[124px] font-semibold hover:shadow-none",
            mutateCreateCampaignTg.isPending || mutateUpdateCampaignTg.isPending
              ? "bg-gray-400 text-black cursor-not-allowed border border-gray-400 hover:bg-gray-400"
              : "text-nyx-yellow"
          )}
          onClick={() =>
            router.push(
              `/apphome/${workspacename}/admanager/campaign-creation?campaignId=${campaignId}&brandid=${campaignDetails?.data[0].brandId}&productid=${campaignDetails?.data[0].productId}`
            )
          }
          disabled={
            mutateCreateCampaignTg.isPending || mutateUpdateCampaignTg.isPending
          }
        >
          Back
        </Button>
        <Button
          className={classNames(
            "rounded-full w-[124px] font-semibold text-black",
            mutateCreateCampaignTg.isPending || mutateUpdateCampaignTg.isPending
              ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
              : "bg-nyx-yellow hover:shadow-none"
          )}
          onClick={() => updateTgTab('save')}
          disabled={mutateCreateCampaignTg.isPending || mutateUpdateCampaignTg.isPending}
        >
          {mutateCreateCampaignTg.isPending ? <ButtonLoadingGenAI /> : "Next"}
        </Button>
        {search.has("edit") && search.get("edit") == "true" && (
          <Button
            className={classNames(
              "rounded-full w-44 font-semibold text-black",
              mutateCreateCampaignTg.isPending || mutateUpdateCampaignTg.isPending
                ? "bg-gray-400 cursor-not-allowed border border-gray-400 hover:bg-gray-400 hover:shadow-none"
                : "text-nyx-yellow hover:shadow-none"
            )}
            onClick={() => updateTgTab('save-update')}
            disabled={mutateCreateCampaignTg.isPending || mutateUpdateCampaignTg.isPending}
          >
            {mutateCreateCampaignTg.isPending ? (
              <ButtonLoadingGenAI />
            ) : (
              "Save & Update"
            )}
          </Button>
        )}
      </div>
    </>
  );
};

export default CreativeList;
