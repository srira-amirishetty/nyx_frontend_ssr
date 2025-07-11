"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import CrossIcon from "./CrossIcon";
import Button from "@nyx-frontend/main/components/Button";
import { TARGRTGROUP_GENDER } from "@nyx-frontend/main/utils/productConstants";
import classNames from "@nyx-frontend/main/utils/classNames";
import { ageGroup, region } from "@nyx-frontend/main/utils/productConstants";
import { TGColourStyles } from "@nyx-frontend/main/utils/productStyle";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addTargetGroupServices } from "@nyx-frontend/main/services/brandService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { TargetGroupResponse } from "./types";
import AgeRangeSlider from "@nyx-frontend/main/components/AgeRangeSlider";

type EditTargetGroupProps = {
  onCancel: () => void;
  onSuccess: (data: TargetGroupResponse) => void;
  onDelete: () => void;
  selectedData: TargetGroupResponse;
  id: string;
  brandDetails: { id: string };
};

function EditTargetGroup({
  onCancel,
  onSuccess,
  onDelete,
  selectedData,
  id,
  brandDetails,
}: EditTargetGroupProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      targetGroupName: selectedData.name,
      targetGroupGender: selectedData.gender,
      //ageGroup: ageGroup.find((age) => age.value === selectedData.age_group),
      region: region.find((r) => r.value === selectedData.region),
    },
  });

  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);

  useEffect(() => {
    if (selectedData?.age_group) {
      const parsedAgeRange = selectedData.age_group.split("-").map(Number);
      if (parsedAgeRange.length === 2) {
        setAgeRange(parsedAgeRange as [number, number]);
      }
    }
  }, [selectedData]);

  const mutateAddTargetgroup = useMutation({
    mutationKey: ["edit-TargetGroup", selectedData.id],
    mutationFn: addTargetGroupServices,
    onSuccess: (res: { targetGroup: TargetGroupResponse }) => {
      onSuccess(res.targetGroup);
      reset();
    },
    onError: (error: any) => {
      console.log(error);

      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Error during to update target group, please try after sometime
          </span>
        </>,
        { autoClose: 5000 }
      );
    },
  });

  const onSubmit = (data: any) => {
    const newData = {
      id: id,
      name: data.targetGroupName,
      // age_group: data.ageGroup.value,
      age_group: `${ageRange[0]}-${ageRange[1]}`,
      region: data.region.value,
      gender: data.targetGroupGender,
      brand_id: brandDetails.id ? Number(brandDetails.id) : null,
      target_group_id: Number(id),
      workspace_id: localStorage.getItem("workspace_id"),
    };
    mutateAddTargetgroup.mutate(newData);
  };

  const onCancelHandler = () => {
    reset();
    onCancel();
  };

  const onDeleteHandler = () => {
    onDelete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <div className="text-base font-bold text-white">Edit Target Group</div>

        <div className="flex gap-1">
          <div className="cursor-pointer" onClick={onDeleteHandler}>
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
          <button className="cursor-pointer" onClick={onCancelHandler}>
            <CrossIcon className="w-6 h-6 text-white" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 mt-3">
        <div className="w-full flex flex-col gap-2">
          <div className="text-white text-sm font-bold">
            Target Name <span className="text-[#E26971]">*</span>
          </div>
          <input
            type="text"
            className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-white placeholder:text-sm"
            placeholder="Suggest Target Group Name"
            {...register("targetGroupName", { required: true })}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Suggest Target Group Name")}
          />
          {errors.targetGroupName && (
            <p className="text-nyx-red text-xs">
              Please Enter Target Group Name
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-white peer-checked:bg-nyx-sky">
            Gender <span className="text-[#E26971]">*</span>
          </div>
          <div className="w-full grid grid-cols-3 gap-3">
            {TARGRTGROUP_GENDER?.map((item) => (
              <div key={`target-group-gender-${item?.name}`} className="w-full">
                <input
                  type="radio"
                  value={item?.name}
                  {...register("targetGroupGender", { required: true })}
                  className="hidden peer"
                  id={`target-group-gender-${item?.name}`}
                />
                <label
                  htmlFor={`target-group-gender-${item?.name}`}
                  className={classNames(
                    " text-white transition-colors text-sm font-normal block border border-transparent hover:border-[#FFFFFF] rounded cursor-pointer text-center py-2 px-4",
                    "border-white text-white peer-checked:bg-nyx-sky peer-checked:text-nyx-yellow"
                  )}
                >
                  {item?.name}
                </label>
              </div>
            ))}
          </div>
          {errors.targetGroupGender && (
            <p className="text-nyx-red text-xs">
              Please Select Target Group Gender
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-white text-sm font-bold">
            Age Group <span className="text-[#E26971]">*</span>
          </div>
          {/* <Controller
            name="ageGroup"
            control={control}
            render={({ field }) => (
              <Select
                className="text-sm"
                options={ageGroup}
                placeholder="Select Age"
                menuPlacement="top"
                styles={TGColourStyles}
                {...field}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            )}
            rules={{ required: true }}
          /> */}

          <AgeRangeSlider ageRange={ageRange} setAgeRange={setAgeRange} />

          {/* {errors.ageGroup && (
            <p className="text-nyx-red text-xs">
              Please Select Target Age Group
            </p>
          )} */}
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-white text-sm font-bold">
            Region <span className="text-[#E26971]">*</span>
          </div>
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <Select
                className="text-sm "
                options={region}
                menuPlacement="top"
                placeholder="Select Region"
                styles={TGColourStyles}
                {...field}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            )}
            rules={{ required: true }}
          />
          {errors.region && (
            <p className="text-nyx-red text-xs">Please Select Region</p>
          )}
        </div>
      </div>

      <div className="w-full flex gap-4 mt-6 justify-center items-center">
        <Button
          className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
          onClick={onCancelHandler}
        >
          Cancel
        </Button>
        <Button className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none">
          {mutateAddTargetgroup.isPending ? "Updating..." : "Next"}
        </Button>
      </div>
    </form>
  );
}

export default EditTargetGroup;
