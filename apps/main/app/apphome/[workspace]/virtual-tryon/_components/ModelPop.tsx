import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CrossIcon from "../../image-craft-ai/text-to-image/_components/CrossIcon";
import { Button } from "rsuite";
import { MODELS_POPUP_TRYON } from "@nyx-frontend/main/utils/utils";
import Select from "react-select";
import {
  city,
  gender,
  ageGroup,
  size_category,
  indiaRegion,
} from "@nyx-frontend/main/app/apphome/constants";
import { welcomePopUpStyle } from "@nyx-frontend/main/utils/modalstyles";
import UploadButton from "./UploadButton";
import TopFrontSVG from "./TopFrontSVG";
import TopBackSVG from "./TopBackSVG";
import OnePieceFrontSVG from "./OnePieceFrontSVG";
import { welcomePopupStyles } from "@nyx-frontend/main/app/apphome/optionStyles";
import Image from "next/image";
import Toggle from "./Toggle";
import OwnModelBtn from "./OwnModelBtn";
import { addModel, deleteModel } from "@nyx-frontend/main/services/virtual-tryon";
import { useMutation } from "@tanstack/react-query";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";

type AddApparel = {
  onCancel: () => void;
  disabled: boolean;
  fashionKitId?: any;
  modelsRefetch: any;
  mode: "add" | "edit";
  modelData?: any;
  setModelsArray?: any;
};

function ModelPop({
  onCancel,
  disabled,
  fashionKitId,
  modelsRefetch,
  mode,
  modelData,
  setModelsArray,
}: AddApparel) {
  const [upFront, setupFront] = useState<any>(null);
  const [bodyFront, setBodyFront] = useState<any>(null);
  const [bodySide, setBodySide] = useState<any>(null);
  const [body45, setBody45] = useState<any>(null);
  const [bodyBack, setBodyBack] = useState<any>(null);
  const [Front, setFront] = useState(null);
  const [Back, setBack] = useState(null);
  const [creativeTabState, setCreativeTabState] = useState(2);
  const [gender, setGender] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("Fashion Model");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [modelDelete, setmodelDelete] = useState(false);
  const[modelName,setModelName]=useState("")
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (mode === "edit" && modelData) {
      setModelName(modelData.name)
      const file_full_body_45 = modelData.photos.find(
        (photo: { file_full_body_45?: string }) => photo.file_full_body_45,
      );
      if (file_full_body_45) {
        setBody45(file_full_body_45.file_full_body_45);
      }

      // Find the photo URL for topFront
      // const file_close_up_front = modelData.photos.find(
      //   (photo: { file_close_up_front?: string }) => photo.file_close_up_front,
      // );
      // if (file_close_up_front) {
      //   setupFront(file_close_up_front.file_close_up_front);
      // }

      const file_full_body_back = modelData.photos.find(
        (photo: { file_full_body_back?: string }) => photo.file_full_body_back,
      );
      if (file_full_body_back) {
        setBodyBack(file_full_body_back.file_full_body_back);
      }

      // const file_full_body_side = modelData.photos.find(
      //   (photo: { file_full_body_side?: string }) => photo.file_full_body_side,
      // );
      // if (file_full_body_side) {
      //   setBodySide(file_full_body_side.file_full_body_side);
      // }

      const full_body_front = modelData.photos.find(
        (photo: { full_body_front?: string }) => photo.full_body_front,
      );
      if (full_body_front) {
        setBodyFront(full_body_front.full_body_front);
      }
    }
  }, [mode, modelData]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onCancelHandler = () => {
    reset();
    onCancel();
  };

  const ModelSave = (editsave: any) => {
    if (creativeTabState == 2) {
      const data = new FormData();
      const photos: { [key: string]: string }[] = [];
      data.append("name", modelName);
      data.append("model_type", "USER");
      data.append("fashion_kit_id", fashionKitId ? fashionKitId : "");
      // console.log("fashionKitId", fashionKitId);
      const workspaceId = localStorage.getItem("workspace_id");
      if (workspaceId) {
        data.append("workspace_id", workspaceId);
      }
      if (editsave === "edit") {
        data.append("model_id", modelData.id);
      }

      const appendFileOrPhoto = (key: string, file: any, photoKey: string) => {
        if (file instanceof Object) {
          data.append(key, file);
        } else {
          const photoEntry: { [key: string]: string } = {};
          photoEntry[photoKey] = file;
          photos.push(photoEntry);
        }
      };

      appendFileOrPhoto("full_body_front", bodyFront, "full_body_front");
      appendFileOrPhoto("file_full_body_back", bodyBack, "file_full_body_back");
      appendFileOrPhoto("file_full_body_45", body45, "file_full_body_45");
      // appendFileOrPhoto("file_close_up_front", upFront, "file_close_up_front");
      // appendFileOrPhoto("file_full_body_side", bodySide, "file_full_body_side");
      if (photos.length > 0) {
        data.append("photos", JSON.stringify(photos));
      }

      mutateAddModel.mutate(data, {
        onSuccess: (response) => {
          console.log(response);
          modelsRefetch();
          onCancel();
          if(setModelsArray){

            setModelsArray((currentModels:any) => [...currentModels, response]);
          }
        },
        onError: (res) => {
          console.log(res);
        },
      });
    } else if (creativeTabState == 1) {
      console.log("in 1");
    } else {
      console.log("in 0");
    }
  };

  const ModelEdit = () => {
    if (creativeTabState == 2) {
      const data = new FormData();
      const photos: { [key: string]: string }[] = [];
      data.append("name", modelName);
      data.append("model_type", "USER");
      data.append("fashion_kit_id", fashionKitId);
      data.append("model_id", modelData.id);
      // console.log("fashionKitId", fashionKitId);
      const workspaceId = localStorage.getItem("workspace_id");
      if (workspaceId) {
        data.append("workspace_id", workspaceId);
      }

      const appendFileOrPhoto = (key: string, file: any, photoKey: string) => {
        if (file instanceof Object) {
          data.append(key, file);
        } else {
          const photoEntry: { [key: string]: string } = {};
          photoEntry[photoKey] = file;
          photos.push(photoEntry);
        }
      };

      appendFileOrPhoto("full_body_front", bodyFront, "full_body_front");
      appendFileOrPhoto("file_full_body_back", bodyBack, "file_full_body_back");
      appendFileOrPhoto("file_full_body_45", body45, "file_full_body_45");
      // appendFileOrPhoto("file_close_up_front", upFront, "file_close_up_front");
      // appendFileOrPhoto("file_full_body_side", bodySide, "file_full_body_side");
      if (photos.length > 0) {
        data.append("photos", JSON.stringify(photos));
      }

      mutateAddModel.mutate(data, {
        onSuccess: (response) => {
          console.log(response);
          modelsRefetch();
          onCancel();
        },
        onError: (res) => {
          console.log(res);
        },
      });
    } else if (creativeTabState == 1) {
      console.log("in 1");
    } else {
      console.log("in 0");
    }
  };

  const onOptionChange = (e: any) => {
    setGender(e.target.value);
  };

  const handleToggleChange2 = (value: any) => {
    setSelectedValue2(value);
    console.log(value);
  };

  const mutateAddModel = useMutation({
    mutationKey: ["upload-top"],
    mutationFn: addModel,
  });

  const mutatedeleteModel = useMutation({
    mutationKey: ["delete-vton-model"],
    mutationFn: deleteModel,
  });

  const deleteModelEdit = () => {
    setmodelDelete(true);
    const data = new FormData();
    data.append("fashion_kit_id", modelData.fashion_kit_id);
    data.append("workspace_id", modelData.workspace_id);
    data.append("model_id", modelData.id);

    mutatedeleteModel.mutate(data, {
      onSuccess: (response) => {
        setmodelDelete(false);
        console.log("response :", response);
        modelsRefetch();
        onCancel();
        if(setModelsArray){

          setModelsArray((prevArray:any) => prevArray.filter((item:any) => item.id !== modelData.id));
        }
      },
      onError: (error) => {
        setmodelDelete(false);
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className=" font-bold text-white text-[24px] ">
            Browse Models
          </div>
          <div className="flex items-end justify-end mb-1">
            {mode === "edit" && (
              <button className="pr-3 cursor-pointer" onClick={deleteModelEdit}>
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
              </button>
            )}
            <button className="cursor-pointer" onClick={onCancelHandler}>
              <CrossIcon className="w-6 h-6 text-white" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        <div className="w-full mt-4">
          <CreativesTab
            data={MODELS_POPUP_TRYON}
            tabState={setCreativeTabState}
            tabStatus={creativeTabState}
          />
        </div>

        {creativeTabState === 0 && (
          <div>
            <div className="flex flex-row gap-4">
              <div className="w-full">
                <Select
                  className="text-sm md:text-base "
                  options={ageGroup}
                  // menuPlacement={"top"}
                  placeholder="Age group"
                  styles={welcomePopupStyles}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <div className="w-full">
                <Select
                  className="text-sm md:text-base"
                  options={size_category}
                  // menuPlacement={"top"}
                  placeholder="Size Category"
                  styles={welcomePopupStyles}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <div className="w-full">
                <Select
                  className="text-sm md:text-base"
                  options={indiaRegion}
                  // menuPlacement={"top"}
                  placeholder="Region of India"
                  styles={welcomePopupStyles}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <p className="font-semibold py-2 text-white">Gender </p>
              <div className="flex flex-row gap-4">
                <div className="flex items-center mb-4 ">
                  <input
                    id="default-1"
                    type="radio"
                    value="Male"
                    name="default-radio"
                    onChange={onOptionChange}
                    checked={gender === "Male"}
                    className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-white rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                  />
                  <label
                    htmlFor="default-1"
                    className="cursor-pointer ms-2 text-sm  text-white font-light"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="default-2"
                    type="radio"
                    value="Female"
                    onChange={onOptionChange}
                    name="default-radio"
                    checked={gender === "Female"}
                    className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-white rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                  />
                  <label
                    htmlFor="default-2"
                    className="cursor-pointer ms-2 text-sm  text-white font-light"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center mb-4  ">
                  <input
                    id="default-3"
                    type="radio"
                    value="All"
                    name="default-radio"
                    onChange={onOptionChange}
                    checked={gender === "All"}
                    className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-white rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                  />
                  <label
                    htmlFor="default-3"
                    className="cursor-pointer ms-2 text-sm font-light text-white"
                  >
                    All
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 h-[35vh] mt-12">
              <div
                className=" w-2/3 rounded-2xl p-2"
                style={{
                  background:
                    "linear-gradient(108.46deg, rgba(255, 255, 255, 0.264) 0%, rgba(255, 255, 255, 0.066) 100%)",
                }}
              >
                <div className="grid grid-cols-4 gap-4 overflow-y-scroll h-full">
                  <div>
                    <Image
                      src="https://storage.googleapis.com/nyxassets-new/assets/images/home/VideoVista.png"
                      alt="VideoVista AI"
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/3 ">
                <div
                  className="  h-full rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(108.46deg, rgba(255, 255, 255, 0.264) 0%, rgba(255, 255, 255, 0.066) 100%)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
        {creativeTabState === 1 && (
          <div>
            <div className="flex flex-row gap-4">
              <div className="w-full">
                <Select
                  className="text-sm md:text-base "
                  options={ageGroup}
                  // menuPlacement={"top"}
                  placeholder="Age group"
                  styles={welcomePopupStyles}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <div className="w-full">
                <Select
                  className="text-sm md:text-base"
                  options={size_category}
                  // menuPlacement={"top"}
                  placeholder="Size Category"
                  styles={welcomePopupStyles}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <div className="w-full">
                <Select
                  className="text-sm md:text-base"
                  options={indiaRegion}
                  // menuPlacement={"top"}
                  placeholder="Region of India"
                  styles={welcomePopupStyles}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
            </div>

            <div className="mt-3">
              <p className="font-semibold py-2 text-white">Gender </p>
              <div className="flex flex-row gap-4">
                <div className="flex items-center mb-4 ">
                  <input
                    id="default-1"
                    type="radio"
                    value="Male"
                    name="default-radio"
                    onChange={onOptionChange}
                    checked={gender === "Male"}
                    className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-white rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                  />
                  <label
                    htmlFor="default-1"
                    className="cursor-pointer ms-2 text-sm  text-white font-light"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="default-2"
                    type="radio"
                    value="Female"
                    onChange={onOptionChange}
                    name="default-radio"
                    checked={gender === "Female"}
                    className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-white rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                  />
                  <label
                    htmlFor="default-2"
                    className="cursor-pointer ms-2 text-sm  text-white font-light"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center mb-4  ">
                  <input
                    id="default-3"
                    type="radio"
                    value="All"
                    name="default-radio"
                    onChange={onOptionChange}
                    checked={gender === "All"}
                    className="cursor-pointer  appearance-none bg-transparent w-4 h-4 border-2 border-white rounded-full checked:bg-nyx-yellow checked:border-nyx-white-1 focus:outline-nyx-white-1 checked:border-4 placeholder:italic"
                  />
                  <label
                    htmlFor="default-3"
                    className="cursor-pointer ms-2 text-sm font-light text-white"
                  >
                    All
                  </label>
                </div>
              </div>
            </div>

            <div className="text-white mb-4">
              <Toggle
                id={2}
                value={selectedValue2}
                onChange={handleToggleChange2}
                option1="Fashion Model"
                option2="Innerwear Model"
              />
            </div>

            <div className="flex flex-row gap-2 h-[35vh]">
              <div
                className=" w-2/3 rounded-2xl p-2"
                style={{
                  background:
                    "linear-gradient(108.46deg, rgba(255, 255, 255, 0.264) 0%, rgba(255, 255, 255, 0.066) 100%)",
                }}
              >
                <div className="grid grid-cols-4 gap-4 overflow-y-scroll h-full">
                  <div>
                    <Image
                      src="https://storage.googleapis.com/nyxassets-new/assets/images/home/VideoVista.png"
                      alt="VideoVista AI"
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/3 ">
                <div
                  className="h-full rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(108.46deg, rgba(255, 255, 255, 0.264) 0%, rgba(255, 255, 255, 0.066) 100%)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {creativeTabState === 2 && (
          <>
           <div className="w-full relative">
          <label
            htmlFor="model_name"
            className="flex mb-[8px] text-[14px] lg:text-[14px] font-bold w-full text-white"
          >
             Name
            {errors.name && (
              <span className="text-[12px] mt-1 text-[#FF0000]">*</span>
            )}
          </label>
          <input
            type="text"
            id="model_name"
            placeholder="Model 1"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            className="text-[12px] text-white lg:text-[14px] w-full h-[40px] border border-[#8297BD] rounded-[4px] px-4 bg-[#ECECEC16] focus:outline-none autofill active:text-[#FFFFFF]"
          />
        </div>
          <div className="flex h-[350px] gap-4 ">
            {/* <div className=" w-2/5 "> */}
              {/* <div className="h-full">
                <OwnModelBtn
                  id={1}
                  uploadedFile={upFront}
                  setUploadedFile={setupFront}
                  height={420}
                  text={"Close up-front"}
                />
              </div> */}
            {/* </div> */}
            <div className="flex items-center justify-center w-full gap-3">
              <div className="w-[250px]">
                <OwnModelBtn
                  id={1}
                  uploadedFile={bodyFront}
                  setUploadedFile={setBodyFront}
                  height={300}
                  text={"Full body-front"}
                />
              </div>
              {/* <div className="">
                <OwnModelBtn
                  id={3}
                  uploadedFile={bodySide}
                  setUploadedFile={setBodySide}
                  height={200}
                  text={"Full body-side"}
                />
              </div> */}
              <div className="w-[250px]">
                <OwnModelBtn
                  id={2}
                  uploadedFile={body45}
                  setUploadedFile={setBody45}
                  height={300}
                  text={"Full body-45"}
                />
              </div>
              <div className="w-[250px]">
                <OwnModelBtn
                  id={3}
                  uploadedFile={bodyBack}
                  setUploadedFile={setBodyBack}
                  height={300}
                  text={"Full body-back"}
                />
              </div>
            </div>
          </div>
          </>
        )}

        <div className="w-full flex justify-center items-center gap-3 mt-3">
          <Button
            className="rounded-full border border-nyx-yellow text-nyx-yellow hover:shadow-none font-semibold h-[37px] w-32"
            onClick={onCancelHandler}
          >
            Cancel
          </Button>

          {mode === "edit" ? (
            <Button
              className={`font-semibold h-[37px] w-32 ${
                (creativeTabState === 2) && (modelName!=="") && 
                (body45 ||
                bodyBack ||
                bodyFront ||
                bodySide ||
                upFront)
                  ? `rounded-full hover:shadow-none focus:shadow-glow text-black bg-nyx-yellow cursor-pointer`
                  : `bg-[#8297BD] text-black rounded-full cursor-not-allowed hover:bg-[#8297BD] hover:shadow-transparent border-none`
              }`}
              disabled={
                (!body45 && !bodyBack && !bodyFront && !bodySide && !upFront) ||
                mutateAddModel.isPending || modelName=="" 
              }
              onClick={ModelEdit}
            >
              {mutateAddModel.isPending ? <ButtonLoading /> : "Edit"}
            </Button>
          ) : (
            <Button
              className={`font-semibold h-[37px] w-32 ${
                (creativeTabState === 2) && (modelName!=="") && 
               ( body45 ||
                bodyBack ||
                bodyFront ||
                bodySide ||
                upFront)
                  ? `rounded-full hover:shadow-none focus:shadow-glow text-black bg-nyx-yellow cursor-pointer`
                  : `bg-[#8297BD] text-black rounded-full cursor-not-allowed hover:bg-[#8297BD] hover:shadow-transparent border-none`
              }`}
              disabled={
                (!body45 && !bodyBack && !bodyFront && !bodySide && !upFront) ||
                mutateAddModel.isPending || modelName==""
              }
              onClick={() => ModelSave("save")}
            >
              {mutateAddModel.isPending ? <ButtonLoading /> : "Save"}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

export const CreativesTab = (props: any) => {
  return (
    <>
      <div
        className={`flex justify-center items-center whitespace-nowrap md:whitespace-normal`}
      >
        {props.data?.map((item: any, index: any) => (
          <div
            key={index}
            className="w-40  text-center cursor-pointer"
            onClick={() => {
              if (index !== 0 && index !== 1) {
                //locked AI generated and Profressinal
                props.tabState(index);
              }
            }}
          >
            <div>
              <h2
                className={`mb-[4px]  text-white ${index === props.tabStatus ? "  text-nyx-yellow underline decoration-4 underline-offset-8 decoration-nyx-yellow font-semibold" : "text-white font-light"} ${(index == 0 || index == 1) && "text-nyx-gray-1 opacity-50 cursor-not-allowed"}`}
              >
                {item.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <hr className="mb-8 bg-[#999999] h-[1px] border-0"></hr>
    </>
  );
};

export default ModelPop;
