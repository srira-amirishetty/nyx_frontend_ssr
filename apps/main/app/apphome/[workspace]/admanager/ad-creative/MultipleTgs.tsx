/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Previews from "./Previews";
import {
    deleteCampaignTg
} from "@nyx-frontend/main/services/admanagerServices";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const MultipleTgs = forwardRef(
    (
        {
            targetGroups,
            activeTgTab,
            setActiveTgTab,
            tgDetails,
            campaignDetails,
            brandId,
            campaignId
        }: any,
        ref
    ) => {
        const childRefs = useRef({});
        const [activeAd, setActiveAd] = useState<any>(null)
        const [platforms, setPlatforms] = useState<any>({})
        const [ads, setAds] = useState<any>({})

        console.log("tgDetails",tgDetails)

        useEffect(() => {
            if (tgDetails) {
                let adsObj = {}
                let platforms = {}
                for (let key in tgDetails) {
                    let platform = tgDetails[key]
                    let platformName = platform.platform.platformName
                    platforms[platformName] = { add: {} }
                    if (platform.admanager_user_campaign_targeting.length && platform.admanager_user_campaign_targeting[0].admanager_user_campaign_ad.length) {
                        let campaignAds = platform.admanager_user_campaign_targeting[0].admanager_user_campaign_ad
                        for (let item of campaignAds) {
                            if (item.unique_adbatch_id in adsObj == false) {
                                adsObj[item.unique_adbatch_id] = { isExit: true, adRecordId: item.id, platforms: { [platformName]: { ads: item } } }
                            } else {
                                if (platformName in adsObj[item.unique_adbatch_id].platforms == false) {
                                    adsObj[item.unique_adbatch_id].platforms[platformName] = { ads: item }
                                }
                            }
                        }
                    } else {
                        const id = Math.random().toString(36);
                        adsObj[id] = { isExit: false, platforms }
                    }
                    setPlatforms(platforms)
                }
                setAds(adsObj)
                setActiveAd(Object.keys(adsObj)[0])
            }

        }, [tgDetails])

        const addNewAd = () => {
            const id = Math.random().toString(36);
            setAds({ ...ads, [id]: { isExit: false, platforms } })
        }

        const mutateDeleteTg = useMutation({
            mutationKey: ["delete-campaign"],
            mutationFn: deleteCampaignTg,
        });

        const removeAd = () => {
            if (Object.keys(ads).length > 1) {

                let selAds = ads[activeAd]
                let newAds = JSON.parse(JSON.stringify(ads))
                if (selAds && selAds.isNew) {
                    delete newAds[activeAd]
                    setAds(newAds)
                    setActiveAd(Object.keys(newAds)[0])
                } else {
                    let payload = {
                        "workspace_id": Number(localStorage.getItem("workspace_id")),
                        "unique_adbatch_ids": [activeAd],
                    }
                    mutateDeleteTg.mutate(payload, {
                        onSuccess: (response: any) => {
                            delete newAds[activeAd]
                            setAds(newAds)
                            setActiveAd(Object.keys(newAds)[0])
                        },
                        onError: (res: any) => {
                            toast.error(
                                <>
                                    <span className="text-white text-[16px] leading-[20px]">
                                        {" "}
                                        Request Failed!
                                    </span>
                                    <br />
                                    <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                                        {" "}
                                        Please try again
                                    </span>
                                </>,
                                { autoClose: 5000 }
                            );
                        },
                    });
                }
            }
        }

        useImperativeHandle(ref, () => ({
            getData: () => updateTgTab(),
        }));

        const updateTgTab = () => {
            let isValide = true
            let data: any = []
            for (let unique_id in ads) {
                let updData = childRefs.current[unique_id].getData()
                if (updData) {
                    for (let key in updData.platforms) {
                        const admanager_lists = tgDetails?.find((tg) => tg.platform.platformName.toUpperCase() == key)
                        const campaign_targetings = admanager_lists?.admanager_user_campaign_targeting[0].admanager_user_campaign_ad ?? []
                        const targetings = campaign_targetings.find((campaign) => campaign.unique_adbatch_id == updData.platforms[key].unique_adbatch_id)
                        if (targetings) {
                            updData.platforms[key]['adRecordId'] = targetings.id
                        }
                    }
                    data.push(updData)
                } else {
                    isValide = false
                }
            }
            if (isValide) {
                return data
            } else {
                return false
            }
        }

        return (
            <div className="w-full h-full">
                <div className=" h-[80vh] overflow-hidden">
                    {Object.keys(ads).map((unique_id: any, key: any) =>
                        <div
                            key={unique_id}
                            className={
                                activeAd === unique_id
                                    ? "w-full h-full "
                                    : "w-full h-full hidden"
                            }>
                            <Previews
                                ref={(el: any) => (childRefs.current[unique_id] = el)}
                                targetGroups={targetGroups}
                                activeTgTab={activeTgTab}
                                setActiveTgTab={setActiveTgTab}
                                ads={ads}
                                activeAd={activeAd}
                                setActiveAd={setActiveAd}
                                addNewAd={addNewAd}
                                removeAd={removeAd}
                                campaignDetails={campaignDetails}
                                campaignId={campaignId}
                                brandId={brandId}
                                tgDetails={ads[unique_id]}
                                unique_adbatch_id={unique_id}
                            /></div>)}
                </div>
            </div>
        );
    }
);

export default MultipleTgs;
