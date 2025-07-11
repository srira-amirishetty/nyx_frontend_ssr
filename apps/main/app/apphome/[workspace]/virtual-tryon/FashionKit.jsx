/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, Fragment, useEffect } from "react";
import Toggle from "./_components/Toggle";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { VIRTUAL_TRYON_TABS } from "@nyx-frontend/main/utils/productConstants";
import ArrowIcon from "@nyx-frontend/main/components/Icons/ArrowIcon";
import classNames from "@nyx-frontend/main/utils/classNames";
import AddTop from "./_components/AddTop";
import AddBottom from "./_components/AddBottom";
import {
  addTopPopup,
  fashionKitPop,
  chooseModelpopup,
} from "@nyx-frontend/main/utils/modalstyles";
import KitPopUp from "./_components/KitPopUp";
import AddButtonVTON from "@nyx-frontend/main/components/Icons/AddButtonVTON";
import ChevronVTON from "@nyx-frontend/main/components/Icons/ChevronVTON";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import AddApparel from "./_components/AddApparel";
import ModelPop from "./_components/ModelPop";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getApparel,
  getModels,
  savefashionkit,
  getSavedFashionKits,
  onboardingFashionKit,
} from "@nyx-frontend/main/services/virtual-tryon";
import { da } from "date-fns/locale";

const Tab = ({ name, currentTab, setCurrentTab }) => {
  return (
    <div className="relative mt-4">
      <button
        className={`text-sm transition-all duration-500 ease-in-out ${
          currentTab === name ? "font-semibold" : "font-normal"
        }`}
        onClick={() => setCurrentTab(name)}
      >
        {name}
      </button>
      <hr
        className={`absolute top-[22px] flex flex-col ${
          currentTab === name ? "border-t-4 border-nyx-yellow w-full my-1" : ""
        }`}
      />
    </div>
  );
};

function FashionKit({
  tab,
  setBrandTab,
  fashionKitId,
  setStepperPro,
  selectFashionKit,
  refetchfromPhotoShoot,
}) {
  const [selectKit, setSelectKit] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("one piece");
  const [topPopup, setTopPopup] = useState(false);
  const [bottomPopup, setBottomPopup] = useState(false);
  const [ApparelPopup, setApparel] = useState(false);
  const [modelPop, setModel] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [topData, setTopData] = useState(null);
  const [editModeBottom, setEditModeBottom] = useState(false);
  const [bottomData, setBottomData] = useState(null);
  const [editModeOnePiece, setEditModeOnePiece] = useState(false);
  const [onePieceData, setOnePieceData] = useState(null);
  const [editModeModel, setEditModel] = useState(false);
  const [modelData, setmodelData] = useState(null);
  // const [selectTop, setSelectTop] = useState(null);
  // const [selectBottom, setSelectBottom] = useState(null);
  // const [selectOnePiece, setSelectOnePiece] = useState(null);
  // const [selectModel, setSelectModel] = useState(null);
  const [currentTab, setCurrentTab] = useState("Add Top");
  const [success, setSuccess] = useState(false);
  const [fashionKitName, setFashionKitName] = useState("");
  const [apparelsArray, setApparelsArray] = useState([]);
  const [modelsArray, setModelsArray] = useState([]);


  useEffect(() => {
    userKitRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchfromPhotoShoot]);

  const handleToggleChange = (value) => {
    setSelectedValue(value);
    console.log(value);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const OpenAnimation = () => {
    if (tab === VIRTUAL_TRYON_TABS.FASHION) {
      setBrandTab("");
      setStepperPro(0);
    } else {
      setBrandTab(VIRTUAL_TRYON_TABS.FASHION);
      setStepperPro(0);
    }
  };

  const onCancelTopPopup = () => {
    setTopPopup(false);
  };

  const onCancelFashionKit = () => {
    setFashionKitName(" ");
      setApparelsArray([])
      setModelsArray([])
    setIsVisible(false);
  };

  const handleTopEdit = (data) => {
    setTopPopup(true);
    setEditMode(true);
    setTopData(data);
    console.log("Top=", data);
  };
  const haddleBottomEdit = (data) => {
    setBottomPopup(true);
    setEditModeBottom(true);
    setBottomData(data);
  };

  const handleOnePieceEdit = (data) => {
    setOnePieceData(data);
    setApparel(true);
    setEditModeOnePiece(true);
  };

  const handleModelEdit = (data) => {
    setModel(true);
    setmodelData(data);
    setEditModel(true);
  };

  const addNewModel = () => {
    setModel(true);
    setmodelData(null);
    setEditModel(false);
  };

  const addNewTop = () => {
    setTopPopup(true);
    setEditMode(false);
    setTopData(null);
  };

  const addNewBottom = () => {
    setBottomPopup(true);
    setEditModeBottom(false);
    setBottomData(null);
  };

  const addNewOnePiece = () => {
    setApparel(true);
    setEditModeOnePiece(false);
    setOnePieceData(null);
  };

  // const topClick = (data) => {
  //   if (data === selectTop) {
  //     setSelectTop(null);
  //     console.log("Top deselected");
  //     // setStepperPro(!selectBottom && 0);
  //   } else {
  //     setSelectTop(data);
  //     console.log("Selected Top=", data);
  //     // setStepperPro(selectBottom ? 1 : 0);
  //   }
  // };

  // const bottomClick = (data) => {
  //   if (data === selectBottom) {
  //     setSelectBottom(null);
  //     console.log("Bottom deselected");
  //     // setStepperPro(!selectTop && 0);
  //   } else {
  //     setSelectBottom(data);
  //   }
  // };

  // const onePieceClick = (data) => {
  //   if (data == selectOnePiece) {
  //     setSelectOnePiece(null);
  //     setStepperPro(0);
  //   } else {
  //     setSelectOnePiece(data);
  //   }
  // };

  // const modelClick = (data) => {
  //   if (data === selectModel) {
  //     setSelectModel(null);
  //     console.log("Model deselected");
  //   } else {
  //     setSelectModel(data);
  //     console.log("Selected Model=", data);
  //   }
  // };

  const { data: apparels, refetch } = useQuery({
    queryKey: ["getapparel"],
    queryFn: async () => {
      const data = new FormData();
      const workspaceId = localStorage.getItem("workspace_id");
      data.append("workspace_id", workspaceId);
      data.append("fashion_kit_id", fashionKitId || null);

      const res = await getApparel(data);
      return res;
    },
    enabled: !!fashionKitId,
  });


  const { data: models, refetch: modelsRefetch } = useQuery({
    queryKey: ["getmodelsvirtual"],
    queryFn: async () => {
      const data = new FormData();
      const workspaceId = localStorage.getItem("workspace_id");
      data.append("workspace_id", workspaceId);
      data.append("fashion_kit_id", fashionKitId || null);
      data.append("model_type", "USER");
      const res = await getModels(data);
      return res;
    },
    enabled: !!fashionKitId,
  });



  const fashionKitClick = (data) => {
    console.log(data);
    if (data === selectKit) {
      setSelectKit(null);
      selectFashionKit(null);
    } else {
      setSelectKit(data);
      selectFashionKit(data);
    }
  };

  const handleInputChange = (event) => {
    setFashionKitName(event.target.value);
  };

  const {
    data: userFashionKits,
    isLoading,
    refetch: userKitRefetch,
  } = useQuery({
    queryKey: ["userFashionKits"],
    queryFn: () => getSavedFashionKits(localStorage.getItem("workspace_id")),
  });

  // console.log("Fashion Kits=", userFashionKits);

  const mutateFashionKit = useMutation({
    mutationKey: ["save_kit"],
    mutationFn: savefashionkit,
  });

  const mutateOnboardingFashionKit = useMutation({
    mutationKey: ["onboarding_kit"],
    mutationFn: onboardingFashionKit,
  });

  const saveOnboardingFashionKit = () => {
    const apparelIds = apparelsArray.map((item) => item.id);
    const modelsIds= modelsArray.map((item)=>item.id)
    // const data = new FormData();
    // data.append("workspace_id", localStorage.getItem("workspace_id"));
    // data.append("fashionkit_name", fashionKitName);
    // data.append("apparel_id", apparelIds);
    // data.append("model_id", modelsIds);
    let data = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      fashionkit_name: fashionKitName,
      apperal_ids: apparelIds,
      model_ids: modelsIds,
    };
    mutateOnboardingFashionKit.mutate(data, {
      onSuccess: (response) => {
        setSuccess(true);
        setFashionKitName("");
        userKitRefetch();
        setApparelsArray([]);
        setModelsArray([])
        setIsVisible(false);
        console.log("Success:", response);
      },
      onError: (error) => {
        console.error("Error occurred:", error);
      },
    });
  };

  const saveFashionKit = (data) => {
    let payload = {
      workspace_id: localStorage.getItem("workspace_id"),
      fashionkit_id: fashionKitId,
      fashionkit_name: data.name,
      is_save: "true",
    };
    // console.log("Payload=", payload);
    mutateFashionKit.mutate(payload, {
      onSuccess: (response) => {
        setSuccess(true);
        setFashionKitName("");
        userKitRefetch();
        setIsVisible(false);
        // queryClient.invalidateQueries({
        //   queryKey: ["userFashionKits"],
        // });
        console.log("Success:", response);
      },
      onError: (error) => {
        console.error("Error occurred:", error);
      },
    });
  };

  const handleSaveClick = () => {
    const data = {
      name: fashionKitName,
    };
    saveOnboardingFashionKit(data);
    // setFashionKitName("");
  };

  const fashionKitClickNext = () => {
    setBrandTab(VIRTUAL_TRYON_TABS.PHOTOSHOOT);
  };

  const disableNext = !selectKit;

  const isDisabledOne = !(
    (fashionKitName?.length ?? 0) > 0 &&
    // (onePieceData?.length ?? 0) > 0 ||
    ((apparelsArray?.length ?? 0) > 0 || (modelsArray?.length ?? 0) > 0)
  );

  return (
    <>
      <div className="bg-[#3B226F] rounded-lg">
        <h2 className="mb-0">
          <div
            className={classNames(
              `group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-nyx-blue-4 text-white rounded-lg`,
            )}
            onClick={() => OpenAnimation()}
            aria-expanded={
              tab === VIRTUAL_TRYON_TABS.FASHION ? "true" : "false"
            }
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={classNames(
                  `w-[50%] md:w-full flex font-bold`,
                  tab === VIRTUAL_TRYON_TABS.FASHION
                    ? "text-nyx-yellow text-xl "
                    : "text-white text-sm",
                )}
              >
                Use Fashion Kit
              </div>
            </div>

            <span
              className={classNames(
                "ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none",
                tab === VIRTUAL_TRYON_TABS.FASHION
                  ? `rotate-[-180deg] -mr-1`
                  : `dark:fill-white`,
              )}
            >
              <ArrowIcon className="h-6 w-6" />
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: tab === VIRTUAL_TRYON_TABS.FASHION ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className="bg-[#3B226F] w-full overflow-hidden rounded-lg px-4"
        >
          <div>
            <div className="flex flex-wrap gap-2 mb-4 ml-1  max-h-[200px] overflow-auto">
              {isLoading ? (
                <>
                  <div
                    className={`text-white p-4 px-4 rounded-sm cursor-pointer`}
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
                    }}
                  >
                    Loading...
                  </div>
                </>
              ) : (
                <>
                {userFashionKits?.data
        .slice() // Make a shallow copy of the data array to avoid mutating the original array
        .sort((a, b) => b.id - a.id) // Sort the array in descending order based on id
        .map((item, index) => (
          <div
            key={index}
            className={`text-white bg-[#1D1138] p-2 px-4 rounded-sm cursor-pointer ${selectKit === item.id ? "bg-[#5E32FF]" : ""}`}
            onClick={() => fashionKitClick(item.id)}
          >
            {item.name}
          </div>
        ))}
                </>
              )}
            </div>
            <div>
              <div className="mb-4 px-1">
                <div
                  className={`flex items-center gap-2 p-2 text-sm font-bold text-white bg-[#42267B] cursor-pointer ${isVisible ? "rounded-t-lg" : "rounded-lg"}`}
                  onClick={toggleVisibility}
                >
                  <AddButtonVTON className="w-[25px] h-[25px]" />
                  Add New Fashion Kit
                  <ChevronVTON
                    className={`w-[15px] h-[8.14px] ${isVisible ? "transition duration-500 rotate-180" : "transition duration-500"}`}
                  />
                </div>
                {isVisible && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 1,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className="bg-[#42267B] w-full rounded-b-lg px-4 py-2"
                  >
                    <div className="flex flex-col mt-6 text-white">
                      <label htmlFor="name" className="font-medium mb-2">
                        Fashion Kit Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={fashionKitName}
                        onChange={handleInputChange}
                        placeholder="Van heusen"
                        className="appearance-none bg-[#3B236F] border border-[#8297BD] p-2 rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col text-white">
                      <Toggle
                        id={2}
                        value={selectedValue}
                        onChange={handleToggleChange}
                        option1="one piece"
                        option2="two piece"
                      />

                      {/* ADD TOP */}
                      {selectedValue === "two piece" ? (
                        <>
                          <div className="flex items-center justify-center gap-8">
                            <Tab
                              name="Add Top"
                              currentTab={currentTab}
                              setCurrentTab={setCurrentTab}
                            />
                            <Tab
                              name="Add Bottom"
                              currentTab={currentTab}
                              setCurrentTab={setCurrentTab}
                            />
                          </div>
                          <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                          {currentTab === "Add Top" && (
                            <div className="w-full mt-6 mb-6">
                              <div className="flex flex-wrap gap-2">
                                <div className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4">
                                  <div className="flex flex-col justify-center items-center w-[100px] h-[110px] gap-2">
                                    <button
                                      className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                                      onClick={addNewTop}
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
                                  <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                                    <p>Add New</p>
                                  </div>
                                </div>

                                {apparelsArray?.map((item, index) => {
                                  if (
                                    item.apparel_position === "TOP" &&
                                    item.apparel_type === "TWO_PIECE"
                                  ) {
                                    return (
                                      <Fragment key={index}>
                                        {item?.photos.map(
                                          (photo, photoIndex) => {
                                            if (photo.file_top_front) {
                                              return (
                                                <div
                                                  key={photoIndex}
                                                  className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group shadow-xl"
                                                  // onClick={() => topClick(item)}
                                                >
                                                  <img
                                                    src={photo.file_top_front}
                                                    alt="Top Front"
                                                    className=" rounded-t-lg w-[100px] h-[110px] object-fill"
                                                  />
                                                  <div
                                                    className={`bg-[#1E1239] text-center p-2 rounded-b-lg  group-hover:bg-nyx-new-blue flex flex-row justify-between items-center `}
                                                  >
                                                    <p>{item?.name}</p>
                                                    <button
                                                      className=" hidden group-hover:block"
                                                      onClick={() =>
                                                        handleTopEdit(item)
                                                      }
                                                    >
                                                      <svg
                                                        width="12"
                                                        height="14"
                                                        viewBox="0 0 11 11"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                                                          fill="white"
                                                        />
                                                      </svg>
                                                    </button>
                                                  </div>
                                                </div>
                                              );
                                            }
                                            return null;
                                          },
                                        )}
                                      </Fragment>
                                    );
                                  }
                                  return null;
                                })}
                              </div>
                            </div>
                          )}

                          {/* ADD BOTTOM */}
                          {currentTab === "Add Bottom" && (
                            <div className="w-full mt-6 mb-6">
                              <div className="  flex flex-wrap gap-2">
                                <div className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4">
                                  <div className="flex flex-col justify-center items-center w-[100px] h-[110px]">
                                    <button
                                      className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                                      onClick={addNewBottom}
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
                                  <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                                    <p>Add New</p>
                                  </div>
                                </div>
                                {apparelsArray?.map((item, index) => {
                                  if (item.apparel_position === "BOTTOM") {
                                    return (
                                      <Fragment key={index}>
                                        {item?.photos.map(
                                          (photo, photoIndex) => {
                                            if (photo.file_bottom_front) {
                                              return (
                                                <div
                                                  key={photoIndex}
                                                  className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group"
                                                  // onClick={() =>
                                                  //   bottomClick(item)
                                                  // }
                                                >
                                                  <img
                                                    src={
                                                      photo.file_bottom_front
                                                    }
                                                    alt="Bottom Front"
                                                    className=" rounded-t-lg w-[100px] h-[110px] object-fill"
                                                  />

                                                  <div
                                                    className={`bg-[#1E1239] text-center p-2 rounded-b-lg  group-hover:bg-nyx-new-blue flex flex-row justify-between items-center `}
                                                  >
                                                    <p>{item?.name}</p>
                                                    <button
                                                      className=" hidden group-hover:block"
                                                      onClick={() =>
                                                        haddleBottomEdit(item)
                                                      }
                                                    >
                                                      <svg
                                                        width="12"
                                                        height="14"
                                                        viewBox="0 0 11 11"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                                                          fill="white"
                                                        />
                                                      </svg>
                                                    </button>
                                                  </div>
                                                </div>
                                              );
                                            }
                                            return null;
                                          },
                                        )}
                                      </Fragment>
                                    );
                                  }
                                  return null;
                                })}
                              </div>
                            </div>
                          )}

                          {/* CHOOSE MODEL */}
                          <div className="w-full mt-6 mb-10">
                            <p>Choose Model</p>
                            <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                            <div className="  flex flex-wrap gap-2">
                              <div className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4">
                                <div className="flex flex-col justify-center items-center w-[100px] h-[110px]">
                                  <button
                                    className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                                    onClick={addNewModel}
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
                                <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                                  <p>Add New</p>
                                </div>
                              </div>
                              {modelsArray?.map((item, index) => {
                                const validPhotos = item.photos.filter(
                                  (photo) => {
                                    const photoKey = Object.keys(photo)[0];
                                    return (
                                      [
                                        "full_body_front",
                                        "file_full_body_45",
                                        "file_full_body_back",
                                      ].includes(photoKey) && photo[photoKey]
                                    );
                                  },
                                );
                                if (validPhotos.length > 0) {
                                  const photo = validPhotos[0];
                                  const photoKey = Object.keys(photo)[0];

                                  return (
                                    <div
                                      key={index}
                                      className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group"
                                      // onClick={() => modelClick(item)}
                                    >
                                      <img
                                        src={photo[photoKey]}
                                        alt="Model"
                                        className="rounded-t-lg w-[100px] h-[110px] object-fill"
                                      />
                                      <div
                                        className={`bg-[#1E1239] text-center p-2 rounded-b-lg group-hover:bg-nyx-new-blue flex flex-row justify-between items-center `}
                                      >
                                        <p>{item?.name}</p>
                                        <button
                                          className=" hidden group-hover:block"
                                          onClick={() => handleModelEdit(item)}
                                        >
                                          <svg
                                            width="12"
                                            height="14"
                                            viewBox="0 0 11 11"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>
                          {/* <div className="flex items-center justify-center mt-12 mb-10 gap-4">
                            <button
                              className={`rounded-full py-2 px-6 transition-all ${
                                isDisabled
                                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                  : "bg-nyx-yellow text-black cursor-pointer"
                              }`}
                              disabled={isDisabled}
                              onClick={genVTONModel}
                            >
                              {mutateVTONModel.isPending ? (
                                <ButtonLoading />
                              ) : (
                                "Generate"
                              )}
                            </button>
                          </div> */}
                        </>
                      ) : (
                        <>
                          <div className="w-full mt-6 mb-6">
                            <p>Add Apparel</p>
                            <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                            <div className="flex flex-wrap gap-2">
                              <div className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6">
                                <div className="flex flex-col justify-center items-center w-[100px] h-[110px]">
                                  <button
                                    className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                                    onClick={addNewOnePiece}
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
                                <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                                  <p>Add New</p>
                                </div>
                              </div>
                              {apparelsArray?.map((item, index) => {
                                if (item.apparel_type === "ONE_PIECE") {
                                  return (
                                    <Fragment key={index}>
                                      {item?.photos.map((photo, photoIndex) => {
                                        if (photo.file_top_front) {
                                          return (
                                            <div
                                              key={photoIndex}
                                              className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group"
                                              // onClick={() =>
                                              //   onePieceClick(item)
                                              // }
                                            >
                                              <img
                                                src={photo.file_top_front}
                                                alt="Top Front"
                                                className=" rounded-t-lg w-[100px] h-[110px] object-fill"
                                              />

                                              <div
                                                className={`bg-[#1E1239] text-center p-2 rounded-b-lg  group-hover:bg-nyx-new-blue flex flex-row justify-between items-center `}
                                              >
                                                <p>{item?.name}</p>
                                                <button
                                                  className=" hidden group-hover:block"
                                                  onClick={() =>
                                                    handleOnePieceEdit(item)
                                                  }
                                                >
                                                  <svg
                                                    width="12"
                                                    height="14"
                                                    viewBox="0 0 11 11"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </button>
                                              </div>
                                            </div>
                                          );
                                        }
                                        return null;
                                      })}
                                    </Fragment>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          </div>

                          {/* CHOOSE MODEL */}
                          <div className="w-full mt-6 mb-10">
                            <p>Choose Model</p>
                            <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                            <div className="flex flex-wrap gap-2">
                              <div className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4">
                                <div className="flex flex-col justify-center items-center w-[100px] h-[110px]">
                                  <button
                                    className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                                    onClick={addNewModel}
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
                                <div className="bg-[#1E1239] text-center p-2 rounded-b-lg">
                                  <p>Add New</p>
                                </div>
                              </div>
                              {modelsArray?.map((item, index) => {
                                // Filter the photos that match the criteria
                                const validPhotos = item.photos.filter(
                                  (photo) => {
                                    const photoKey = Object.keys(photo)[0];
                                    return (
                                      [
                                        "full_body_front",
                                        "file_full_body_45",
                                        "file_full_body_back",
                                      ].includes(photoKey) && photo[photoKey]
                                    );
                                  },
                                );

                                // If there are valid photos, use the first one
                                if (validPhotos.length > 0) {
                                  const photo = validPhotos[0];
                                  const photoKey = Object.keys(photo)[0];

                                  return (
                                    <div
                                      key={index}
                                      className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group"
                                      // onClick={() => modelClick(item)}
                                    >
                                      <img
                                        src={photo[photoKey]}
                                        alt="Model"
                                        className="rounded-t-lg w-[100px] h-[110px] object-fill"
                                      />
                                      <div
                                        className={`bg-[#1E1239] text-center p-2 rounded-b-lg group-hover:bg-nyx-new-blue flex flex-row justify-between items-center `}
                                      >
                                        <p>{item?.name}</p>
                                        <button
                                          className=" hidden group-hover:block"
                                          onClick={() => handleModelEdit(item)}
                                        >
                                          <svg
                                            width="12"
                                            height="14"
                                            viewBox="0 0 11 11"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                                              fill="white"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-center mt-6 mb-10 gap-4">
                      <button
                        onClick={onCancelFashionKit}
                        className="w-[124px] h-[37px] border border-nyx-yellow text-nyx-yellow rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        className={`w-[124px] h-[37px] rounded-full text-black font-semibold 
                          ${
                            isDisabledOne
                              ? "bg-[#8297BD] cursor-not-allowed"
                              : "bg-nyx-yellow cursor-pointer"
                          }`}
                        disabled={isDisabledOne}
                        onClick={handleSaveClick}
                      >
                        {mutateOnboardingFashionKit.isPending ? (
                          <ButtonLoading />
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center m-4">
            <button
              onClick={fashionKitClickNext}
              disabled={disableNext}
              className={`w-[124px] h-[37px] rounded-full text-black font-semibold ${
                disableNext
                  ? "bg-[#8297BD] cursor-not-allowed"
                  : "bg-nyx-yellow cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
      {topPopup ? (
        <Modal
          isOpen={topPopup}
          className=""
          style={addTopPopup}
          onRequestClose={onCancelTopPopup}
          ariaHideApp={false}
        >
          <AddTop
            onCancel={onCancelTopPopup}
            disabled={false}
            // fashionKitId={fashionKitId}
            refetch={refetch}
            mode={editMode ? "edit" : "add"}
            topData={topData}
            setApparelsArray={setApparelsArray}
          />
        </Modal>
      ) : null}

      {bottomPopup ? (
        <Modal
          isOpen={bottomPopup}
          className=""
          style={addTopPopup}
          onRequestClose={() => setBottomPopup(false)}
          ariaHideApp={false}
        >
          <AddBottom
            onCancel={() => setBottomPopup(false)}
            disabled={false}
            // fashionKitId={fashionKitId}
            refetch={refetch}
            mode={editModeBottom ? "edit" : "add"}
            bottomData={bottomData}
            setApparelsArray={setApparelsArray}
          />
        </Modal>
      ) : null}

      {ApparelPopup ? (
        <Modal
          isOpen={ApparelPopup}
          className=""
          style={addTopPopup}
          onRequestClose={() => setApparel(false)}
          ariaHideApp={false}
        >
          <AddApparel
            onCancel={() => setApparel(false)}
            disabled={false}
            // fashionKitId={fashionKitId}
            refetch={refetch}
            mode={editModeOnePiece ? "edit" : "add"}
            onePieceData={onePieceData}
            setApparelsArray={setApparelsArray}
          />
        </Modal>
      ) : null}

      {modelPop ? (
        <Modal
          isOpen={modelPop}
          className=""
          style={chooseModelpopup}
          onRequestClose={() => setModel(false)}
          ariaHideApp={false}
        >
          <ModelPop
            onCancel={() => setModel(false)}
            disabled={false}
            // fashionKitId={fashionKitId}
            modelsRefetch={modelsRefetch}
            mode={editModeModel ? "edit" : "add"}
            modelData={modelData}
            setModelsArray={setModelsArray}
          />
        </Modal>
      ) : null}
    </>
  );
}

export default FashionKit;
