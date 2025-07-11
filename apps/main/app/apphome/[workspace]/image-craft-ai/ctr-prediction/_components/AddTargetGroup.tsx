"use client";
import React, { useState } from "react";
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
import { TargetGroupResponse } from "./types";
import AgeRangeSlider from "@nyx-frontend/main/components/AgeRangeSlider";

type AddTargetGroupProps = {
  onCancel: () => void;
  onSuccess: (data: TargetGroupResponse) => void;
  brandDetails: { id: string };
};

function AddTargetGroup({
  onCancel,
  onSuccess,
  brandDetails,
}: AddTargetGroupProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [ageRange, setAgeRange] = useState([18, 65]);

  const mutateAddTargetgroup = useMutation({
    mutationKey: ["add-TargetGroup"],
    mutationFn: addTargetGroupServices,
    onSuccess: (res: { targetGroup: TargetGroupResponse }) => {
      onSuccess(res.targetGroup);
      reset();
    },
    onError: () => {

      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Error during to create target group, please try after sometime
          </span>
        </>,
        { autoClose: 5000 },
      );
    },
  });

  const onSubmit = (data: any) => {
    const newData = {
      name: data.targetGroupName,
      // age_group: data.ageGroup.value,
      age_group:`${ageRange[0]}-${ageRange[1]}`,
      region: data.region.value,
      gender: data.targetGroupGender,
      brand_id: brandDetails.id ? Number(brandDetails.id) : null,
      workspace_id: localStorage.getItem("workspace_id"),
    };
    mutateAddTargetgroup.mutate(newData);
  };

  const onCancelHandler = () => {
    reset();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <div className="text-base font-bold text-white">New Target Group</div>

        <div className="flex">
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
          <div className="text-white text-sm font-bold">
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
                    "bg-[#543891]  peer-checked:bg-nyx-sky peer-checked:text-nyx-yellow",
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
                className="text-sm md:text-base"
                options={ageGroup}
                menuPlacement="top"
                placeholder="Select Age"
                styles={TGColourStyles}
                {...field}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            )}
            rules={{ required: true }}
          /> */}
          {/* {errors.ageGroup && (
            <p className="text-nyx-red text-xs">
              Please Select Target Age Group
            </p>
          )} */}

          <AgeRangeSlider ageRange={ageRange} setAgeRange={setAgeRange} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="text-white text-sm font-bold">
            Region <span className="text-[#E26971]">*</span>{" "}
          </div>
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <Select
                className="text-sm md:text-base"
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
          {mutateAddTargetgroup.isPending ? "Adding..." : "Next"}
        </Button>
      </div>
    </form>
  );
}

export default AddTargetGroup;
