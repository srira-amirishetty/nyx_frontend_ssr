/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { BsChevronLeft } from "react-icons/bs";
import Select from "react-select";
import {
  category,
  ageGroup,
  region,
} from "@nyx-frontend/main/utils/productConstants";
import { onboardingColourStyles } from "@nyx-frontend/main/utils/productStyle";
import Button from "@nyx-frontend/main/components/Button";
import Modal from "react-modal";
import {
  addTagetGroupPopupStyle,
  deletePopupStyle,
  popupHeader2,
} from "@nyx-frontend/main/utils/modalstyles";
import {
  addBrandServices,
  addTargetGroupServices,
  deletetargetbyid,
  deletebrandbyid,
} from "@nyx-frontend/main/services/brandService";
import { getbrandServiceonbording } from "@nyx-frontend/main/services/brandService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import { useRouter } from "next/navigation";
import ValidateStringSpecial from "@nyx-frontend/main/components/ValidateStringSpecial";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AgeRangeSlider from "@nyx-frontend/main/components/AgeRangeSlider";

interface TargetGroupData {
  id: number | null;
  name: string | null;
  age_group: string | null;
  region: string | null;
  gender: string | null;
  brand_id: number | null;
  target_group_id: number | null;
}

const FirstPage = ({ renderComponent, apiResponse }: any) => {
  const { displayMessagePopup } = useContext(MessagePopupContext);

  const router = useRouter();
  const search = useSearchParams();
  const [brandName, setBrandName] = useState<string>("");
  const [brandCategory, setBrandCategory] = useState<string>("");
  const [brandDescription, setBrandDescription] = useState<string>("");
  const [brandTargetGroups, setBrandTargetGroups] = useState<TargetGroupData[]>(
    []
  );
  const [deleteBrandPopup, setDeleteBrandPopup] = useState(false);
  const [deleteBrandLoading, setDeleteBrandLoading] = useState(false);

  const [targetGroupPopup, setTargetGroupPopup] = useState(false);
  const [editTargetGroupId, setEditTargetGroupId] = useState<number | null>(
    null
  );
  const [targetGroupIDS, setTargetGroupIDS] = useState<any>([]);
  const [targetGroupName, setTargetGroupName] = useState<string>("");
  const [targetGroupGender, setTargetGroupGender] = useState<string>("");
  const [targetGroupPage, setTargetGroupPage] = useState<string>("");
  const [targetGroupRegion, setTargetGroupRegion] = useState<string>("");
  const [deleteTargetPopup, setDeleteTargetPopup] = useState(false);
  const [targetNameErr, setTargetNameErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [disableBrandNext, setDisableBrandNext] = useState(false);
  const [brandNameErr, setBrandNameErr] = useState(false);

  const [ageRange, setAgeRange] = useState([18, 65]);

  const { data: brandDetails, refetch: brandRefetch } = useQuery({
    queryKey: ["get-brand"],
    queryFn: () => {
      const brandid =
        sessionStorage.getItem("brandid") ?? search.get("brandid");

      if (brandid) {
        return getbrandServiceonbording(brandid);
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    if (brandDetails) {
      setBrandName(brandDetails?.brand_name);
      setBrandCategory(brandDetails?.cat_name);

      setBrandDescription(brandDetails?.description);

      if (brandDetails.brand_target_group_v2?.length) {
        setTargetGroupIDS(
          brandDetails.brand_target_group_v2.map((obj: any) => obj.id)
        );
      }
      setBrandTargetGroups(brandDetails?.brand_target_group_v2);
    } else {
      setBrandName("");
      setBrandCategory("");
      setTargetGroupIDS([]);
      setBrandDescription("");
      setBrandTargetGroups([]);
    }
  }, [brandDetails]);

  const mutateAddBrandFile = useMutation({
    mutationKey: ["add-brand"],
    mutationFn: addBrandServices,
  });

  const mutateAddTargetgroup = useMutation({
    mutationKey: ["add-TargetGroup"],
    mutationFn: addTargetGroupServices,
  });

  const handleInputBrandName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrandNameErr(false);
    setBrandName(event.target.value);
  };
  const handleCategory = (selected: any) => {
    setBrandCategory(selected.value);
  };

  const handleBrandDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBrandDescription(event.target.value);
  };

  /**
   * Target group edit button handler
   * @param targetGroup TargetGroupData
   */
  const handleClickOnTargetGroupEdit = (targetGroup: TargetGroupData) => {
    if (targetGroup) {
      setTargetGroupPopup(true);
      setEditTargetGroupId(targetGroup.id);
      setTargetGroupName(String(targetGroup.name));
      setTargetGroupGender(String(targetGroup.gender));
      setTargetGroupPage(String(targetGroup.age_group));
      const parsedAgeRange = String(targetGroup.age_group)
        .split("-")
        .map(Number);
      setAgeRange(parsedAgeRange);
      setTargetGroupRegion(String(targetGroup.region));
    }
  };

  const settargetgroupnage1 = (selected: any) => {
    setTargetGroupPage(selected.label);
  };

  const settargetgroupnregion1 = (selected: any) => {
    setTargetGroupRegion(selected.value);
  };

  const handleTargetGroupModal = () => {
    setTargetGroupPopup(false);
    setEditTargetGroupId(null);
    setTargetGroupName("");
    setTargetGroupGender("");
    setTargetGroupPage("");
    setAgeRange([18, 65]);
    setTargetGroupRegion("");
  };

  const handleDeleteTargetPopup = () => {
    setDeleteTargetPopup(true);
    setTargetGroupPopup(false);
  };

  const handleInputtargetName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTargetGroupName(event.target.value);
    setTargetNameErr(false);
  };

  /**
   * Target group submit handler
   */
  const addTargetClickHandler = () => {
    if (
      targetGroupName.length == 0 ||
      // targetGroupPage.length == 0 ||
      targetGroupRegion.length == 0 ||
      targetGroupGender.length == 0
    ) {
      // setTargetNameErr(true);
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
                Please fill required data.
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        error(); // Invoke the Warning function immediately
      })();
      return false;
    } else if (targetGroupName.length > 15) {
      setTargetNameErr(true);
      setErrMessage("Target Group name should be a maximum of 15 characters.");
    } else if (targetGroupName.trim() === "") {
      setTargetNameErr(true);
      setErrMessage("Target group name cannot contain only spaces.");
    } else if (!ValidateStringSpecial(targetGroupName)) {
      setTargetNameErr(true);
      setErrMessage(
        "Target group name doesnt conatian first special character."
      );
    } else {
      const brandid =
        sessionStorage.getItem("brandid") ?? search.get("brandid");

      const targetGroupData: any = editTargetGroupId
        ? {
            id: editTargetGroupId,
            name: targetGroupName,
            // age_group: targetGroupPage,
            age_group: `${ageRange[0]}-${ageRange[1]}`,
            region: targetGroupRegion,
            gender: targetGroupGender,
            brand_id: null,
            target_group_id: Number(editTargetGroupId),
            workspace_id: localStorage.getItem("workspace_id"),
          }
        : {
            name: targetGroupName,
            // age_group: targetGroupPage,
            age_group: `${ageRange[0]}-${ageRange[1]}`,
            region: targetGroupRegion,
            gender: targetGroupGender,
            workspace_id: localStorage.getItem("workspace_id"),
          };

      if (brandid) {
        // @ts-ignore
        targetGroupData.brand_id = Number(brandid);
      }

      mutateAddTargetgroup.mutate(targetGroupData, {
        onSuccess: (response: any) => {
          if (editTargetGroupId !== null) {
            let targetGroups = brandTargetGroups.filter(
              (targetGroup: TargetGroupData) =>
                targetGroup.id !== editTargetGroupId
            );

            setBrandTargetGroups([...targetGroups, response.targetGroup]);
          } else {
            let targetGroup: TargetGroupData = response.targetGroup;

            if (brandTargetGroups && brandTargetGroups.length) {
              setBrandTargetGroups((prev) => [...prev, targetGroup]);
            } else {
              setBrandTargetGroups([targetGroup]);
            }
          }

          setTargetGroupIDS([...targetGroupIDS, response.targetGroup.id]);
          handleTargetGroupModal();
        },
        onError: (res: any) => {
          console.log(res);
        },
      });
    }
  };

  /**
   * Target group delete submit
   */
  const handleDeleteTargetButtonClick = () => {
    if (editTargetGroupId) {
      setIsLoading(true);
      deletetargetbyid(editTargetGroupId)
        .then((data) => {
          setBrandTargetGroups(
            brandTargetGroups.filter(
              (targetGroup) => targetGroup.id !== editTargetGroupId
            )
          );
          setDeleteTargetPopup(false);
          handleTargetGroupModal();
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteBrandButtonClick = () => {
    if (brandDetails?.id) {
      setDeleteBrandLoading(true);
      deletebrandbyid(brandDetails?.id)
        .then((data) => {
          setDeleteBrandPopup(false);
          setDeleteBrandLoading(false);
          router.back();
        })
        .catch((error) => console.log(error));
    }
  };

  /**
   * Brand submit handler
   */
  const brandNextButtonClick = () => {
    if (!brandName) {
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
                Brand name is required
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    } else if (brandName.length == 0) {
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
                Brand name is required
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    } else if (targetGroupIDS.length < 1) {
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
                Target group is required. Please add one or more target group.
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    } else if (!(targetGroupIDS.length < 1) && brandName.length > 50) {
      setBrandNameErr(true);
      setErrMessage("Brand Name should not more that 50 characters");
    } else if (brandName.trim() === "") {
      setBrandNameErr(true);
      setErrMessage("Brand Name cannot contain only spaces.");
    } else if (!ValidateStringSpecial(brandName)) {
      setBrandNameErr(true);
      setErrMessage("Brand Name cannot start with special character.");
    } else {
      setDisableBrandNext(true);
      const data = new FormData();
      const brandid =
        sessionStorage.getItem("brandid") ?? search.get("brandid");
      const workspaceID = localStorage.getItem("workspace_id");

      data.append("brandName", brandName);
      data.append("category", brandCategory);
      data.append("brandDescription", brandDescription);
      data.append("targetGroupIds", JSON.stringify(targetGroupIDS));
      data.append("workspace_id", String(workspaceID));

      if (brandid) {
        data.append("brand_id", brandid);
      }

      mutateAddBrandFile.mutate(data, {
        onSuccess: (response: any) => {
          apiResponse(response);
          // sessionStorage.setItem("brandid", response.brand.id);
          renderComponent("second");
        },
        onError: (error) => {
          setDisableBrandNext(false);
        },
      });
    }
  };

  const handle = () => {
    if (
      search.has("isNewWorkspace") &&
      search.get("isNewWorkspace") == "true"
    ) {
      router.push(
        `/apphome/${localStorage.getItem("workspace_name")}/dashboard`
      );
    } else {
      router.back();
    }
  };

  return (
    <>
      <div className="w-full ">
        <div className="w-[950px] mx-auto pt-2 px-20 flex flex-col">
          <div className="w-full bg-black p-3.5 flex gap-2 rounded-t-lg">
            <BsChevronLeft
              className="text-[#FFF] text-xl cursor-pointer"
              onClick={handle}
            />
            <p className="text-[#FFFFFF]">
              {brandDetails ? "Edit Brand Info" : "Add Brand Info"}
            </p>
          </div>

          <div className="w-full min-h-[650px] bg-[#332270] px-10 py-5 flex flex-col rounded-b-md">
            <div className="w-full flex justify-between">
              <div>
                <p className="text-xl text-[#FFFFFF]">
                  Let&apos;s onboard your brand
                </p>
                <div className="w-64 p-0.5 bg-[#FFC01D] mb-4 mt-1"></div>
              </div>
              {/* delete brand */}
              {/* {brandDetails ? (
              <div
                className="pr-3 cursor-pointer"
                onClick={() => setDeleteBrandPopup(true)}
                title="Delete Brand"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : null} */}
            </div>

            <div className="w-full my-5 flex flex-col gap-y-5">
              <div className="flex w-full gap-2">
                <div className="w-1/2">
                  <p className="text-white font-semibold pb-1 text-sm">
                    Brand Name <span className="text-[#E26971]">*</span>
                  </p>
                  <input
                    type="text"
                    className={`placeholder:text-sm placeholder:italic w-full bg-transparent border border-[#8297BD] rounded-md py-1.5 px-2 font-normal text-[#FFFFFF] ${
                      brandNameErr && "border-nyx-red"
                    }`}
                    placeholder="Add Brand"
                    value={brandName}
                    onChange={handleInputBrandName}
                  />
                  {brandNameErr && (
                    <span className=" text-nyx-red text-sm">{errMessage}</span>
                  )}
                </div>
                <div className="w-1/2">
                  <p className="text-white font-semibold pb-1 text-sm">
                    Category
                  </p>
                  <Select
                    className="text-sm md:text-base"
                    options={category}
                    placeholder="Select Category"
                    instanceId={"category"}
                    styles={onboardingColourStyles}
                    value={category.find(
                      (option) => option?.value === brandCategory
                    )}
                    onChange={handleCategory}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex gap-3 pb-3">
                <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                  <p className="font-semibold py-2">About your Brand</p>
                  <textarea
                    className="w-full placeholder:italic h-[80px] bg-transparent border border-[#8297BD] rounded-lg p-2 font-normal"
                    placeholder="About your Brand"
                    value={brandDescription}
                    onChange={handleBrandDescription}
                    maxLength={500}
                  ></textarea>
                  <p
                    className={`text-right text-xs font-normal ${
                      brandDescription.length === 500
                        ? "text-[#E26971]"
                        : "text-[#FFFFFF]"
                    }`}
                  >
                    {brandDescription.length === 500
                      ? "Maximum word limit reached"
                      : ""}
                    {"                                      "}
                    {brandDescription.length}/500
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 pb-2 ">
                <p className="text-xl text-[#FFFFFF]">
                  Set your target groups
                  <span className="pl-2 text-[#E26971]">*</span>
                </p>
                <div className="w-[230px] p-0.5 bg-[#FFC01D]"></div>
                <div className="w-full flex gap-2 my-2">
                  <div className="w-full flex flex-wrap gap-5">
                    {brandTargetGroups?.map((targetGroup: any, index: any) => (
                      <div key={index}>
                        <div
                          className="relative cursor-pointer bg-[#452A80] w-[136px] h-[50px] rounded-t-lg text-[#FFF] p-2 flex items-center justify-between group"
                          title={targetGroup?.name}
                        >
                          <div className="font-medium truncate text-sm">
                            {targetGroup?.name}
                          </div>
                          <div
                            onClick={() => {
                              handleClickOnTargetGroupEdit(targetGroup);
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                          >
                            <svg
                              width="13"
                              height="18"
                              viewBox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="bg-[#6653B4] w-[136px] h-[86px] rounded-b-lg flex justify-center items-center p-2">
                          <div className="w-full flex flex-col gap-1">
                            <div className="flex w-full gap-1">
                              <div className="w-[10%] mr-1">
                                <svg
                                  width="19"
                                  height="19"
                                  viewBox="0 0 19 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.49125 11.5609C7.23114 11.5609 7.01129 11.4711 6.83169 11.2915C6.65209 11.1119 6.56229 10.892 6.56229 10.6319C6.56229 10.3718 6.65209 10.1519 6.83169 9.97233C7.01129 9.79273 7.23114 9.70293 7.49125 9.70293C7.75136 9.70293 7.97121 9.79273 8.15081 9.97233C8.33041 10.1519 8.42021 10.3718 8.42021 10.6319C8.42021 10.892 8.33041 11.1119 8.15081 11.2915C7.97121 11.4711 7.75136 11.5609 7.49125 11.5609ZM11.9503 11.5609C11.6902 11.5609 11.4703 11.4711 11.2907 11.2915C11.1111 11.1119 11.0213 10.892 11.0213 10.6319C11.0213 10.3718 11.1111 10.1519 11.2907 9.97233C11.4703 9.79273 11.6902 9.70293 11.9503 9.70293C12.2104 9.70293 12.4302 9.79273 12.6098 9.97233C12.7894 10.1519 12.8792 10.3718 12.8792 10.6319C12.8792 10.892 12.7894 11.1119 12.6098 11.2915C12.4302 11.4711 12.2104 11.5609 11.9503 11.5609ZM9.72076 15.8341C11.3805 15.8341 12.7863 15.2581 13.9382 14.1062C15.0902 12.9543 15.6661 11.5485 15.6661 9.88873C15.6661 9.59146 15.6475 9.30348 15.6104 9.02479C15.5732 8.7461 15.5051 8.4767 15.406 8.21659C15.1459 8.27853 14.8858 8.32497 14.6257 8.35594C14.3656 8.3869 14.0931 8.40239 13.8082 8.40239C12.681 8.40239 11.6158 8.16086 10.6126 7.6778C9.60928 7.19474 8.75464 6.51969 8.04863 5.65266C7.65227 6.61878 7.0856 7.45794 6.34863 8.17015C5.61165 8.88235 4.75391 9.41805 3.7754 9.77725V9.88873C3.7754 11.5485 4.35136 12.9543 5.50327 14.1062C6.65518 15.2581 8.06101 15.8341 9.72076 15.8341ZM9.72076 17.3204C8.69271 17.3204 7.72659 17.1253 6.8224 16.7352C5.91821 16.345 5.13169 15.8155 4.46283 15.1467C3.79398 14.4778 3.26447 13.6913 2.87431 12.7871C2.48414 11.8829 2.28906 10.9168 2.28906 9.88873C2.28906 8.86067 2.48414 7.89455 2.87431 6.99037C3.26447 6.08618 3.79398 5.29965 4.46283 4.6308C5.13169 3.96195 5.91821 3.43244 6.8224 3.04228C7.72659 2.65211 8.69271 2.45703 9.72076 2.45703C10.7488 2.45703 11.7149 2.65211 12.6191 3.04228C13.5233 3.43244 14.3098 3.96195 14.9787 4.6308C15.6475 5.29965 16.177 6.08618 16.5672 6.99037C16.9574 7.89455 17.1525 8.86067 17.1525 9.88873C17.1525 10.9168 16.9574 11.8829 16.5672 12.7871C16.177 13.6913 15.6475 14.4778 14.9787 15.1467C14.3098 15.8155 13.5233 16.345 12.6191 16.7352C11.7149 17.1253 10.7488 17.3204 9.72076 17.3204ZM8.71748 4.03627C9.2377 4.9033 9.94371 5.60002 10.8355 6.12643C11.7273 6.65284 12.7182 6.91605 13.8082 6.91605C13.9816 6.91605 14.1488 6.90676 14.3098 6.88818C14.4708 6.8696 14.6381 6.84792 14.8115 6.82315C14.2912 5.95612 13.5852 5.2594 12.6934 4.73299C11.8016 4.20658 10.8107 3.94337 9.72076 3.94337C9.54735 3.94337 9.38014 3.95266 9.21912 3.97124C9.0581 3.98982 8.89088 4.01149 8.71748 4.03627ZM4.09125 8.01222C4.72294 7.65302 5.27413 7.18854 5.7448 6.61878C6.21547 6.04902 6.56848 5.41113 6.80382 4.70512C6.17212 5.06432 5.62094 5.5288 5.15026 6.09856C4.67959 6.66832 4.32659 7.30621 4.09125 8.01222Z"
                                    fill="white"
                                    fillOpacity="0.5"
                                  />
                                </svg>
                              </div>

                              <p className="text-[#FFFFFF80] text-sm truncate">
                                {targetGroup?.age_group}
                              </p>
                            </div>
                            <div className="flex w-full gap-1">
                              <div className="w-[10%] mr-1">
                                <svg
                                  width="19"
                                  height="19"
                                  viewBox="0 0 19 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.896 16.7306V11.1568H3.78125V7.06937C3.78125 6.66063 3.92679 6.31072 4.21786 6.01965C4.50894 5.72857 4.85885 5.58303 5.26759 5.58303H7.4971C7.90584 5.58303 8.25575 5.72857 8.54682 6.01965C8.8379 6.31072 8.98344 6.66063 8.98344 7.06937V11.1568H7.86868V16.7306H4.896ZM6.38234 4.83987C5.9736 4.83987 5.62369 4.69433 5.33262 4.40325C5.04154 4.11218 4.896 3.76227 4.896 3.35353C4.896 2.94478 5.04154 2.59487 5.33262 2.3038C5.62369 2.01272 5.9736 1.86719 6.38234 1.86719C6.79109 1.86719 7.141 2.01272 7.43207 2.3038C7.72314 2.59487 7.86868 2.94478 7.86868 3.35353C7.86868 3.76227 7.72314 4.11218 7.43207 4.40325C7.141 4.69433 6.79109 4.83987 6.38234 4.83987ZM11.9561 16.7306V12.2716H9.72661L11.6217 6.58631C11.7208 6.26427 11.9035 6.01655 12.1698 5.84314C12.4361 5.66974 12.7364 5.58303 13.0709 5.58303C13.4053 5.58303 13.7057 5.66974 13.972 5.84314C14.2383 6.01655 14.421 6.26427 14.52 6.58631L16.4151 12.2716H14.1856V16.7306H11.9561ZM13.0709 4.83987C12.6621 4.83987 12.3122 4.69433 12.0211 4.40325C11.7301 4.11218 11.5845 3.76227 11.5845 3.35353C11.5845 2.94478 11.7301 2.59487 12.0211 2.3038C12.3122 2.01272 12.6621 1.86719 13.0709 1.86719C13.4796 1.86719 13.8295 2.01272 14.1206 2.3038C14.4117 2.59487 14.5572 2.94478 14.5572 3.35353C14.5572 3.76227 14.4117 4.11218 14.1206 4.40325C13.8295 4.69433 13.4796 4.83987 13.0709 4.83987Z"
                                    fill="white"
                                    fillOpacity="0.5"
                                  />
                                </svg>
                              </div>

                              <p className="text-[#FFFFFF80] text-sm">
                                {targetGroup?.gender}
                              </p>
                            </div>
                            <div className="flex w-full gap-1">
                              <div className="w-[10%] mr-1">
                                <svg
                                  width="19"
                                  height="19"
                                  viewBox="0 0 19 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.72661 9.70513C10.1353 9.70513 10.4853 9.5596 10.7763 9.26852C11.0674 8.97745 11.2129 8.62754 11.2129 8.21879C11.2129 7.81005 11.0674 7.46014 10.7763 7.16907C10.4853 6.87799 10.1353 6.73245 9.72661 6.73245C9.31786 6.73245 8.96795 6.87799 8.67688 7.16907C8.3858 7.46014 8.24027 7.81005 8.24027 8.21879C8.24027 8.62754 8.3858 8.97745 8.67688 9.26852C8.96795 9.5596 9.31786 9.70513 9.72661 9.70513ZM9.72661 15.1674C11.2377 13.7802 12.3587 12.5199 13.0894 11.3866C13.8202 10.2532 14.1856 9.24684 14.1856 8.36743C14.1856 7.01734 13.7552 5.91187 12.8944 5.05103C12.0335 4.1902 10.9776 3.75978 9.72661 3.75978C8.4756 3.75978 7.41968 4.1902 6.55885 5.05103C5.69801 5.91187 5.26759 7.01734 5.26759 8.36743C5.26759 9.24684 5.63298 10.2532 6.36376 11.3866C7.09455 12.5199 8.21549 13.7802 9.72661 15.1674ZM9.72661 17.1368C7.73243 15.4399 6.243 13.8638 5.2583 12.4084C4.2736 10.953 3.78125 9.60604 3.78125 8.36743C3.78125 6.5095 4.37888 5.02936 5.57415 3.92699C6.76941 2.82462 8.15356 2.27344 9.72661 2.27344C11.2996 2.27344 12.6838 2.82462 13.8791 3.92699C15.0743 5.02936 15.672 6.5095 15.672 8.36743C15.672 9.60604 15.1796 10.953 14.1949 12.4084C13.2102 13.8638 11.7208 15.4399 9.72661 17.1368Z"
                                    fill="white"
                                    fillOpacity="0.5"
                                  />
                                </svg>
                              </div>

                              <p className="text-[#FFFFFF80] text-sm">
                                {targetGroup?.region}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div>
                      <div className="relative bg-[#452A80] w-[136px] h-[50px] rounded-t-lg text-[#FFF] p-2 flex items-center justify-between group font-medium">
                        <div className="text-sm">Add Target Group</div>
                      </div>
                      <div className="bg-[#6653B4] w-[136px] h-[86px] rounded-b-lg flex justify-center items-center">
                        <button
                          className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                          onClick={() => {
                            setTargetGroupPopup(true);
                          }}
                        >
                          <svg
                            viewBox="0 0 17 17"
                            className="w-4 h-4 fill-current text-nyx-yellow"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex gap-4 justify-center items-center">
                <Button
                  className="rounded-full w-32 hover:shadow-none font-semibold py-2"
                  onClick={handle}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-full w-32 hover:shadow-none font-semibold py-2"
                  onClick={brandNextButtonClick}
                  disabled={disableBrandNext}
                >
                  {mutateAddBrandFile.isPending ? "Loading..." : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {targetGroupPopup ? (
        <Modal
          isOpen={targetGroupPopup}
          style={addTagetGroupPopupStyle}
          onRequestClose={handleTargetGroupModal}
          ariaHideApp={false}
        >
          <div className="flex justify-between">
            <div className="text-base font-bold text-[#FFFFFF]">
              {editTargetGroupId ? "Edit Target Group" : "New Target Group"}
            </div>

            <div className="flex gap-1">
              {editTargetGroupId ? (
                <div
                  className="cursor-pointer"
                  onClick={() => handleDeleteTargetPopup()}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                      fill="white"
                    />
                  </svg>
                </div>
              ) : null}

              <div className="cursor-pointer" onClick={handleTargetGroupModal}>
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
          </div>

          <div className="w-full flex flex-col gap-3 mt-3">
            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-[14px] font-[700]">
                Target Name <span className="text-[#E26971]">*</span>
              </div>
              <input
                type="text"
                className={`h-[40px] px-2 placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md font-lighter text-[#FFFFFF] ${
                  targetNameErr && "border-nyx-red"
                }`}
                placeholder="Suggest Target Group Name"
                value={targetGroupName}
                onChange={handleInputtargetName}
              />
              {targetNameErr && (
                <span className="text-nyx-red text-xs">{errMessage}</span>
              )}
            </div>

            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-[14px] font-[700]">
                Gender <span className="text-[#E26971]">*</span>
              </div>
              <div className="w-full flex gap-3">
                <button
                  className={`bg-[#543891] transition-colors text-sm font-normal border border-transparent hover:border-[#FFFFFF] active:bg-nyx-sky rounded cursor-pointer w-1/3 h-[40px] text-center outline-none ${
                    targetGroupGender == "Male"
                      ? "bg-nyx-sky text-nyx-yellow"
                      : "text-white"
                  }`}
                  onClick={() => {
                    setTargetGroupGender("Male");
                  }}
                >
                  Male
                </button>
                <button
                  className={`bg-[#543891] transition-colors text-sm font-normal border border-transparent hover:border-[#FFFFFF] rounded active:bg-nyx-sky cursor-pointer w-1/3 text-center h-[40px] ${
                    targetGroupGender == "Female"
                      ? "bg-nyx-sky text-nyx-yellow"
                      : "text-white"
                  }`}
                  onClick={() => {
                    setTargetGroupGender("Female");
                  }}
                >
                  Female
                </button>
                <button
                  className={`bg-[#543891] transition-colors text-sm font-normal border border-transparent hover:border-[#FFFFFF] rounded active:bg-nyx-sky cursor-pointer w-1/3 text-center h-[40px] ${
                    targetGroupGender == "All"
                      ? "bg-nyx-sky text-nyx-yellow"
                      : "text-white"
                  }`}
                  onClick={() => {
                    setTargetGroupGender("All");
                  }}
                >
                  All
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-[14px] font-[700]">
                Age Group <span className="text-[#E26971]">*</span>
              </div>
              {/* <Select
                className="text-sm h-[40px]"
                options={ageGroup}
                placeholder="Select Age"
                instanceId={"age-group"}
                styles={onboardingColourStyles}
                onChange={settargetgroupnage1}
                value={ageGroup.find(
                  (option) => option?.value === targetGroupPage,
                )}
                // onChange={handleInputAgeGroup}
                components={{
                  IndicatorSeparator: () => null,
                }}
              /> */}
              <AgeRangeSlider ageRange={ageRange} setAgeRange={setAgeRange} />
            </div>
            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-[14px] font-[700]">
                Region <span className="text-[#E26971]">*</span>
              </div>
              <Select
                className="text-sm h-[40px]"
                options={region}
                menuPlacement="top"
                placeholder="Select Region"
                instanceId={"region"}
                styles={onboardingColourStyles}
                onChange={settargetgroupnregion1}
                value={region.find(
                  (option) => option?.value === targetGroupRegion
                )}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>

            <div className="w-full flex justify-center gap-3">
              <Button
                className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={handleTargetGroupModal}
              >
                Cancel
              </Button>
              <Button
                className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={addTargetClickHandler}
              >
                {mutateAddTargetgroup.isPending ? "Loading.." : "Next"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      {deleteTargetPopup ? (
        <Modal
          isOpen={deleteTargetPopup}
          style={deletePopupStyle}
          onRequestClose={handleTargetGroupModal}
          ariaHideApp={false}
        >
          <div className="flex justify-between">
            <div className="text-base font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="cursor-pointer"
              onClick={() => {
                setDeleteTargetPopup(false);
              }}
            >
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
          <div className="w-full flex flex-col gap-6 mt-4">
            <div className="w-full text-center text-[#FFFFFF] text-sm font-[600]">
              Are you sure you want to delete this target group?
            </div>
            <div className="w-full flex gap-4 justify-center items-center">
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={() => {
                  setDeleteTargetPopup(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={() => handleDeleteTargetButtonClick()}
              >
                {isLoading ? "Deleteing.." : "Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      {deleteBrandPopup ? (
        <Modal
          isOpen={deleteBrandPopup}
          style={deletePopupStyle}
          ariaHideApp={false}
        >
          <div className="flex justify-between">
            <div className="text-2xl font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setDeleteBrandPopup(false);
              }}
            >
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
          <div className="w-full my-5">
            <p className="w-full text-center text-[#FFFFFF] text-base font-bold">
              Are you sure you want to delete this brand ?
            </p>
          </div>

          <div className="w-full flex gap-4 mb-5 justify-center items-center">
            <Button
              className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
              onClick={() => {
                setDeleteBrandPopup(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
              onClick={() => handleDeleteBrandButtonClick()}
            >
              {deleteBrandLoading ? "Deleteing..." : "Delete"}
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default FirstPage;
