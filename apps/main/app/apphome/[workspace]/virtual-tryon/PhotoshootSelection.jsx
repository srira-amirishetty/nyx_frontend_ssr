/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { Fragment, useEffect, useState } from "react";
import Toggle from "./_components/Toggle";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { VIRTUAL_TRYON_TABS } from "@nyx-frontend/main/utils/productConstants";
import ArrowIcon from "@nyx-frontend/main/components/Icons/ArrowIcon";
import classNames from "@nyx-frontend/main/utils/classNames";
import AddTop from "./_components/AddTop";
import AddBottom from "./_components/AddBottom";
import { addTopPopup, chooseModelpopup } from "@nyx-frontend/main/utils/modalstyles";
import AddApparel from "./_components/AddApparel";
import ModelPop from "./_components/ModelPop";
import {
  getApparel,
  getModels,
  generateVTONModel,
  vtonmodelstatus,
  savefashionkit,
} from "@nyx-frontend/main/services/virtual-tryon";
import { useQuery, useMutation } from "@tanstack/react-query";
import Angels from "./_components/Angels";
import Button from "@nyx-frontend/main/components/Button";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";

function PhotoshootSelection({
  tab,
  setBrandTab,
  fashionKitId,
  setStepperPro,
  steperpro,
  setVtonResponse,
  setIsLoading,
  isLoading,
  setIsError,
  setRefetchfromPhoto,
  refetchfromPhotoShoot,
  setVtonResponse2,
  setSelectedTab,
  setIsError2
  // onSelectedAnglesChange,
}) {
  const [selectedValue, setSelectedValue] = useState("one piece");
  const [isOpen, setIsOpen] = useState(false);
  const [topPopup, setTopPopup] = useState(false);
  const [bottomPopup, setBottomPopup] = useState(false);
  const [ApparelPopup, setApparel] = useState(false);
  const [modelPop, setModel] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [topData, setTopData] = useState(null);
  const [editModeBottom, setEditModeBottom] = useState(false);
  const [bottomData, setBottomData] = useState(null);
  const [editModeOnePiece, setEditModeOnePiece] = useState(false);
  const [onePieceData, setOnePieceData] = useState(null);
  const [editModeModel, setEditModel] = useState(false);
  const [modelData, setmodelData] = useState(null);
  const [selectTop, setSelectTop] = useState(null);
  const [selectBottom, setSelectBottom] = useState(null);
  const [selectOnePiece, setSelectOnePiece] = useState(null);
  const [selectModel, setSelectModel] = useState(null);
  const [selectedAngels, setSelectedAngels] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [taskId2, setTaskId2] = useState(null);
  // const [onePieceKitName, setOnePieceKitName] = useState("");
  // const [twoPieceKitNmae, setTwoPieceKitName] = useState("");
  const[kitName,setKitName]=useState("")
  // const [isLoading, setIsLoading] = useState(false);
  // const [vtonResponse, setVtonResponse] = useState(null);

  // useEffect(() => {
  //   onSelectedAnglesChange(selectedAngels);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedAngels]);

  // useEffect(() => {
  //   if (fashionKitId) {
  //     refetch();
  //     modelsRefetch();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[fashionKitId]);

  const handleToggleChange = (value) => {
    setSelectedValue(value);
  };

  const OpenAnimation = () => {
    if (tab === VIRTUAL_TRYON_TABS.PHOTOSHOOT) {
      setBrandTab("");
    } else {
      setBrandTab(VIRTUAL_TRYON_TABS.PHOTOSHOOT);
    }
  };

  const topClick = (data) => {
    if (data === selectTop) {
      setSelectTop(null);
     
      // Reset stepper if deselecting top and bottom not selected
      setStepperPro(!selectBottom && 0); // Set to 0 only if both are not selected
    } else {
      setSelectTop(data);
      // Log the clicked data
      // Retrieve the image URLs
      // const frontImageUrl = data.photos[0].file_top_front;
      // const backImageUrl = data.photos[1].file_top_back;

      // console.log("Front Image URL=", frontImageUrl);
      // console.log("Back Image URL=", backImageUrl);
      // Increase stepper to 2 only if both top and bottom are selected
      setStepperPro(selectBottom ? 1 : 0);
    }
  };

  const bottomClick = (data) => {
    if (data === selectBottom) {
      setSelectBottom(null);
     
      // Reset stepper if deselecting bottom and top not selected
      setStepperPro(!selectTop && 0); // Set to 0 only if both are not selected
    } else {
      setSelectBottom(data);
     
      // Increase stepper to 2 only if both top and bottom are selected
      setStepperPro(selectTop ? 1 : 0);
    }
  };

  const onePieceClick = (data) => {
    if (data == selectOnePiece) {
      setSelectOnePiece(null);
      setStepperPro(0);
    } else {
      setSelectOnePiece(data);
      // console.log("Selected One Piece=", data);
      setStepperPro(1);
    }
  };
  // console.log("Selected One Piece=", selectOnePiece.photos);

  const modelClick = (data) => {
    if (data === selectModel) {
      setSelectModel(null);
    
      // Reset stepper to 1 if deselecting model and either top or bottom is selected
      setStepperPro(selectTop || selectBottom || selectOnePiece ? 1 : 0);
    } else {
      setSelectModel(data);
   
      setStepperPro(
        ((selectTop && selectBottom) || selectOnePiece) && data != selectModel
          ? 2
          : steperpro, // Maintain or adjust stepper based on other selections
      );
    }
  };

  const uploadedAngels = selectModel
    ? selectModel.photos
        .map((photo) =>
          Object.entries(photo)
            .filter(([key, value]) => value !== null)
            .map(([key]) => key),
        )
        .flat()
    : [];
  // console.log("Selected model=", selectModel?.photos);
  // console.log("Selected top=", selectTop?.photos);
  // console.log("Selected bottom=", selectBottom?.photos);

  const onCancelTopPopup = () => {
    setTopPopup(false);
  };

  const handleTopEdit = (data) => {
    setTopPopup(true);
    setEditMode(true);
    setTopData(data);
 
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
    // console.log("Model data=", data);
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

  const saveFashionKit = () => {
    const data = {
      workspace_id: localStorage.getItem("workspace_id"),
      is_save: "true",
      fashionkit_id: fashionKitId,
      fashionkit_name:kitName,
    };
    saveFashioKit.mutate(data, {
      onSuccess: (response) => {
        setRefetchfromPhoto(refetchfromPhotoShoot == 1 ? 0 : 1);
        console.log("Success:", response);
      },
      onError: (error) => {
        console.error("Error occurred:", error);
      },
    });
  };

  const { data: apparels, refetch } = useQuery({
    queryKey: ["get-apparel", fashionKitId],
    queryFn: async () => {
      const data = new FormData();
      const workspaceId = localStorage.getItem("workspace_id");
      data.append("workspace_id", workspaceId);
      data.append("fashion_kit_id", fashionKitId);
      const res = await getApparel(data);
      return res;
    },
    enabled: !!fashionKitId,
  });

  const { data: models, refetch: modelsRefetch } = useQuery({
    queryKey: ["get-models-virtual", fashionKitId],
    queryFn: async () => {
      const data = new FormData();
      const workspaceId = localStorage.getItem("workspace_id");
      data.append("workspace_id", workspaceId);
      data.append("fashion_kit_id", fashionKitId);
      data.append("model_type", "USER");

      const res = await getModels(data);
      return res;
    },
    enabled: !!fashionKitId,
  });

  const mutateVTONModel = useMutation({
    mutationKey: ["generate-vton-model-front45"],
    mutationFn: generateVTONModel,
  });

  const mutateVTONModel2 = useMutation({
    mutationKey: ["generate-vton-model-fullback"],
    mutationFn: generateVTONModel,
  });

  const saveFashioKit = useMutation({
    mutationKey: ["save-in-photoshoot"],
    mutationFn: savefashionkit,
  });

  // console.log("========="+selectedAngels)
  // console.log(selectedAngels.includes("file_full_body_back"))

  const genVTONModel = () => {
    setIsLoading(true);
    const VTONData = new FormData();
    VTONData.append("workspace_id", localStorage.getItem("workspace_id"));
    VTONData.append("fashion_kit_id", fashionKitId);
    VTONData.append("model_id", selectModel?.id);
    // VTONData.append("model_photos", selectModel?.photos?.file_full_body_side);
    if (selectModel?.photos) {
      const photosArray = selectModel.photos
        .filter((photo) => {
          const [key, value] = Object.entries(photo)[0];
          // Check if the angle is selected
          return value !== null && selectedAngels.includes(key);
        })
        .map((photo) => {
          const [key, value] = Object.entries(photo)[0];
          return { [key]: value };
        });
      VTONData.append("model_photos", JSON.stringify(photosArray));
    }
    if (selectedValue === "two piece") {
      if (selectTop?.photos) {
        const photosArray = selectTop?.photos?.map((photo) => {
          const [key, value] = Object.entries(photo)[0];
          return { [key]: value };
        });
        VTONData.append("apparel_top_photos", JSON.stringify(photosArray));
      }
      if (selectBottom?.photos) {
        const photosArray = selectBottom?.photos?.map((photo) => {
          const [key, value] = Object.entries(photo)[0];
          return { [key]: value };
        });
        VTONData.append("apparel_bottom_photos", JSON.stringify(photosArray));
      }
      VTONData.append("apparel_top_id", selectTop?.id);
      VTONData.append("apparel_bottom_id", selectBottom?.id);
      VTONData.append("category_id", 3);
    } else {
      if (selectOnePiece?.photos) {
        const photosArray = selectOnePiece?.photos?.map((photo) => {
          const [key, value] = Object.entries(photo)[0];
          return { [key]: value };
        });
        VTONData.append("apparel_top_photos", JSON.stringify(photosArray));
      }

      VTONData.append("apparel_top_id", selectOnePiece?.id);
      VTONData.append("category_id", 2);
      VTONData.append("apparel_bottom_id", 0);
    }

    mutateVTONModel.mutate(VTONData, {
      onSuccess: (response) => {
        console.log("response :", response);
        setTaskId(response?.task_id);
        mutateVTONModelStatus.mutate(response?.task_id);
       
        // setVtonResponse(response);
        // refetch();
      },
      onError: (error) => {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
      },
    });
  };

  const generation = () => {
    if (
      (selectedAngels.includes("file_full_body_back") &&
        selectedAngels.includes("file_full_body_45") &&
        selectedAngels.includes("full_body_front")) ||
      (selectedAngels.includes("file_full_body_back") &&
        selectedAngels.includes("file_full_body_45")) ||
      (selectedAngels.includes("file_full_body_back") &&
        selectedAngels.includes("full_body_front"))
    ) {
      
      frontand45();
      fullBack();

      if(selectedAngels.includes("full_body_front")){
        setSelectedTab("full_body_front")
      }else {
        setSelectedTab("full_body_45")
      }
    }

    if (
      selectedAngels.includes("file_full_body_back") &&
      !selectedAngels.includes("file_full_body_45") &&
      !selectedAngels.includes("full_body_front")
    ) {

      setSelectedTab("full_body_back")
      fullBack();
    }

    if (
      (selectedAngels.includes("file_full_body_45") ||
        selectedAngels.includes("full_body_front")) &&
      !selectedAngels.includes("file_full_body_back")
    ) {
      frontand45();
      if(selectedAngels.includes("full_body_front")){
        setSelectedTab("full_body_front")
      }else {
        setSelectedTab("full_body_45")
      }
    }
  };

  const frontand45 = () => {
    setIsLoading(true);
    setIsError(false)
    setIsError2(false)
    const VTONData = new FormData();
    VTONData.append("workspace_id", localStorage.getItem("workspace_id"));
    VTONData.append("fashion_kit_id", fashionKitId);
    VTONData.append("model_id", selectModel?.id);
    VTONData.append("apparel_type","Front")
    // VTONData.append("model_photos", selectModel?.photos?.file_full_body_side);
    if (selectModel?.photos) {
      const photosArray = selectModel.photos
        .filter((photo) => {
          const [key, value] = Object.entries(photo)[0];
          // Check if the angle is selected and is either file_full_body_45 or full_body_front
          return (
            value !== null &&
            selectedAngels.includes(key) &&
            (key === "file_full_body_45" || key === "full_body_front")
          );
        })
        .map((photo) => {
          const [key, value] = Object.entries(photo)[0];
          return { [key]: value };
        });

      VTONData.append("model_photos", JSON.stringify(photosArray));
    }

    if (selectedValue === "two piece") {
      if (selectTop?.photos) {
        let selectedPhoto = null;

        // Check if both file_top_front and file_top_back are present
        const hasFront = selectTop?.photos?.some((photo) =>
          photo.hasOwnProperty("file_top_front"),
        );
        const hasBack = selectTop?.photos?.some((photo) =>
          photo.hasOwnProperty("file_top_back"),
        );

        if (hasFront) {
          // If file_top_front is present, select it
          selectedPhoto = selectTop?.photos?.find((photo) =>
            photo.hasOwnProperty("file_top_front"),
          );
        } else if (hasBack) {
          // If file_top_front is not present but file_top_back is, select it
          selectedPhoto = selectTop?.photos?.find((photo) =>
            photo.hasOwnProperty("file_top_back"),
          );
        }

        if (selectedPhoto) {
          const [key, value] = Object.entries(selectedPhoto)[0];
          VTONData.append(
            "apparel_top_photos",
            JSON.stringify([{ [key]: value }]),
          );
        }
      }

      if (selectBottom?.photos) {
        let selectedPhoto = null;

        // Check if both file_top_front and file_top_back are present
        const hasFront = selectBottom?.photos?.some((photo) =>
          photo.hasOwnProperty("file_bottom_front"),
        );
        const hasBack = selectBottom?.photos?.some((photo) =>
          photo.hasOwnProperty("file_bottom_back"),
        );

        if (hasFront) {
          // If file_top_front is present, select it
          selectedPhoto = selectBottom?.photos?.find((photo) =>
            photo.hasOwnProperty("file_bottom_front"),
          );
        } else if (hasBack) {
          // If file_top_front is not present but file_top_back is, select it
          selectedPhoto = selectBottom?.photos?.find((photo) =>
            photo.hasOwnProperty("file_bottom_back"),
          );
        }

        if (selectedPhoto) {
          const [key, value] = Object.entries(selectedPhoto)[0];
          VTONData.append(
            "apparel_bottom_photos",
            JSON.stringify([{ [key]: value }]),
          );
        }
      }

      VTONData.append("apparel_top_id", selectTop?.id);
      VTONData.append("apparel_bottom_id", selectBottom?.id);
      VTONData.append("category_id", 3);
    } else {
      if (selectOnePiece?.photos) {
        let selectedPhoto = null;

        // Check if both file_top_front and file_top_back are present
        const hasFront = selectOnePiece?.photos?.some((photo) =>
          photo.hasOwnProperty("file_top_front"),
        );
        const hasBack = selectOnePiece?.photos?.some((photo) =>
          photo.hasOwnProperty("file_top_back"),
        );

        if (hasFront) {
          // If file_top_front is present, select it
          selectedPhoto = selectOnePiece?.photos?.find((photo) =>
            photo.hasOwnProperty("file_top_front"),
          );
        } else if (hasBack) {
          // If file_top_front is not present but file_top_back is, select it
          selectedPhoto = selectOnePiece?.photos?.find((photo) =>
            photo.hasOwnProperty("file_top_back"),
          );
        }

        if (selectedPhoto) {
          const [key, value] = Object.entries(selectedPhoto)[0];
          VTONData.append(
            "apparel_top_photos",
            JSON.stringify([{ [key]: value }]),
          );
        }
      }

      VTONData.append("apparel_top_id", selectOnePiece?.id);
      VTONData.append("category_id", 2);
      VTONData.append("apparel_bottom_id", 0);
    }
    setVtonResponse(null)
    setVtonResponse2(null)

    mutateVTONModel.mutate(VTONData, {
      onSuccess: (response) => {
        console.log("response :", response);
        setTaskId(response?.data?.task_id);
        mutateVTONModelStatus.mutate(response?.data?.task_id);
        
        // setVtonResponse(response);
        // refetch();
      },
      onError: (error) => {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
      },
    });
  };

  const fullBack = () => {
    setIsLoading(true);
    setIsError(false)
    setIsError2(false)
    const VTONData = new FormData();
    VTONData.append("workspace_id", localStorage.getItem("workspace_id"));
    VTONData.append("fashion_kit_id", fashionKitId);
    VTONData.append("model_id", selectModel?.id);
    VTONData.append("apparel_type","Back")
    // VTONData.append("model_photos", selectModel?.photos?.file_full_body_side);
    if (selectModel?.photos) {
      const photosArray = selectModel.photos
        .filter((photo) => {
          const [key, value] = Object.entries(photo)[0];
          // Check if the angle is selected and is either file_full_body_45 or full_body_front
          return (
            value !== null &&
            selectedAngels.includes(key) &&
            key === "file_full_body_back"
          );
        })
        .map((photo) => {
          const [key, value] = Object.entries(photo)[0];
          return { [key]: value };
        });

      VTONData.append("model_photos", JSON.stringify(photosArray));
    }

    if (selectedValue === "two piece") {
      if (selectTop?.photos) {
        let selectedPhoto = null;

        // Check if both file_top_front and file_top_back are present
        const hasFront = selectTop?.photos?.some((photo) =>
          photo.hasOwnProperty("file_top_front"),
        );
        const hasBack = selectTop?.photos?.some((photo) =>
          photo.hasOwnProperty("file_top_back"),
        );

        if (hasBack) {
          // If file_top_front is present, select it
          selectedPhoto = selectTop?.photos?.find((photo) =>
            photo.hasOwnProperty("file_top_back"),
          );
        } else if (hasFront) {
          // If file_top_front is not present but file_top_back is, select it
          selectedPhoto = selectTop?.photos?.find((photo) =>
            photo.hasOwnProperty("file_top_front"),
          );
        }

        if (selectedPhoto) {
          const [key, value] = Object.entries(selectedPhoto)[0];
          VTONData.append(
            "apparel_top_photos",
            JSON.stringify([{ [key]: value }]),
          );
        }
      }

      if (selectBottom?.photos) {
        let selectedPhoto = null;

        // Check if both file_top_front and file_top_back are present
        const hasFront = selectBottom?.photos?.some((photo) =>
          photo.hasOwnProperty("file_bottom_front"),
        );
        const hasBack = selectBottom?.photos?.some((photo) =>
          photo.hasOwnProperty("file_bottom_back"),
        );

        if (hasBack) {
          // If file_top_front is present, select it
          selectedPhoto = selectBottom?.photos?.find((photo) =>
            photo.hasOwnProperty("file_bottom_back"),
          );
        } else if (hasFront) {
          // If file_top_front is not present but file_top_back is, select it
          selectedPhoto = selectBottom?.photos?.find((photo) =>
            photo.hasOwnProperty("file_bottom_front"),
          );
        }

        if (selectedPhoto) {
          const [key, value] = Object.entries(selectedPhoto)[0];
          VTONData.append(
            "apparel_bottom_photos",
            JSON.stringify([{ [key]: value }]),
          );
        }
      }

      VTONData.append("apparel_top_id", selectTop?.id);
      VTONData.append("apparel_bottom_id", selectBottom?.id);
      VTONData.append("category_id", 3);
    } else {
      if (selectOnePiece?.photos) {
        let selectedPhoto = null;

        // Check if both file_top_front and file_top_back are present
        const hasFront = selectOnePiece?.photos?.some((photo) =>
          photo.hasOwnProperty("file_top_front"),
        );
        const hasBack = selectOnePiece?.photos?.some((photo) =>
          photo.hasOwnProperty("file_top_back"),
        );

        if (hasBack) {
          // If file_top_front is present, select it
          selectedPhoto = selectOnePiece?.photos?.find((photo) =>
            photo.hasOwnProperty("file_top_back"),
          );
        } else if (hasFront) {
          // If file_top_front is not present but file_top_back is, select it
          selectedPhoto = selectOnePiece?.photos?.find((photo) =>
            photo.hasOwnProperty("file_top_front"),
          );
        }

        if (selectedPhoto) {
          const [key, value] = Object.entries(selectedPhoto)[0];
          VTONData.append(
            "apparel_top_photos",
            JSON.stringify([{ [key]: value }]),
          );
        }
      }

      VTONData.append("apparel_top_id", selectOnePiece?.id);
      VTONData.append("category_id", 2);
      VTONData.append("apparel_bottom_id", 0);
    }

    setVtonResponse(null)
    setVtonResponse2(null)

    mutateVTONModel2.mutate(VTONData, {
      onSuccess: (response) => {
        console.log("response :", response);
        setTaskId2(response?.data?.task_id);
        mutateVTONModelStatus2.mutate(response?.data?.task_id);

        // setVtonResponse(response);
        // refetch();
      },
      onError: (error) => {
        console.error(error);
        setIsLoading(false);
        setIsError2(true)
      },
    });
  };

  const mutateVTONModelStatus = useMutation({
    mutationKey: ["generate-vton-model-status"],
    mutationFn: vtonmodelstatus,

    onSuccess: (res) => {
      if (res.status === "in_progress") {
        setTimeout(() => {
          mutateVTONModelStatus.mutate(taskId);
        }, 30000);
      } else if (res?.status === "completed") {
        setVtonResponse(res);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    },
    onError: (res) => {
      setIsLoading(false);
      setIsError(true);
    },
  });

  const mutateVTONModelStatus2 = useMutation({
    mutationKey: ["generate-vton-model-status-two"],
    mutationFn: vtonmodelstatus,

    onSuccess: (res) => {
      if (res.status === "in_progress") {
        setTimeout(() => {
          mutateVTONModelStatus2.mutate(taskId2);
        }, 30000);
      } else if (res?.status === "completed") {
        setVtonResponse2(res);
        setIsLoading(false);
        console.log(res);
        setIsError2(false);
      } else {
        setIsLoading(false);
        setIsError2(true);
      }
    },
    onError: (res) => {
      setIsLoading(false);
      setIsError2(true);
    },
  });

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (newCheckedState) {
      saveFashionKit();
    }
  };

  const isDisabled =
    !selectTop ||
    !selectBottom ||
    !selectModel ||
    selectedAngels.length === 0 ||
    isLoading;
  const isDisabledOne =
    !selectOnePiece || !selectModel || selectedAngels.length === 0 || isLoading;

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
              tab === VIRTUAL_TRYON_TABS.PHOTOSHOOT ? "true" : "false"
            }
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={classNames(
                  `w-[50%] md:w-full flex font-bold`,
                  tab === VIRTUAL_TRYON_TABS.PHOTOSHOOT
                    ? "text-nyx-yellow text-xl "
                    : "text-white text-sm",
                )}
              >
                Photoshoot Selection
              </div>
            </div>

            <span
              className={classNames(
                "ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none",
                tab === VIRTUAL_TRYON_TABS.PHOTOSHOOT
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
            height: tab === VIRTUAL_TRYON_TABS.PHOTOSHOOT ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className="bg-[#3B226F] w-full overflow-hidden rounded-lg px-4"
        >
          <div className="flex flex-col text-white">
            <Toggle
              id={1}
              value={selectedValue}
              onChange={handleToggleChange}
              option1="one piece"
              option2="two piece"
            />

            {/* ADD TOP */}
            {selectedValue === "two piece" ? (
              <>
                <div className="w-full mt-6">
                  <p>Add Top</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                  <div className="  flex flex-wrap gap-2 ">
                    <div className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4">
                      <div className="flex flex-col justify-center items-center w-[100px] h-[110px]">
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

                    {apparels?.map((item, index) => {
                      if (
                        item.apparel_position === "TOP" &&
                        item.apparel_type === "TWO_PIECE"
                      ) {
                        return (
                          <Fragment key={index}>
                            {item?.photos.map((photo, photoIndex) => {
                              if (photo.file_top_front) {
                                return (
                                  <div
                                    key={photoIndex}
                                    className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group shadow-xl "
                                    onClick={() => topClick(item)}
                                  >
                                    <img
                                      src={photo.file_top_front}
                                      alt="Top Front"
                                      className=" rounded-t-lg w-[100px] h-[110px] object-fill"
                                    />
                                    <div
                                      className={`bg-[#1E1239] text-center p-2 rounded-b-lg  group-hover:bg-nyx-new-blue flex flex-row justify-between items-center ${selectTop == item && " bg-nyx-new-blue"}`}
                                    >
                                      <p className="truncate">{item?.name}</p>
                                      <button
                                        className=" hidden group-hover:block"
                                        onClick={() => handleTopEdit(item)}
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
                {/* ADD BOTTOM */}
                <div className="w-full mt-[80px]">
                  <p>Add Bottom</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                  <div className="  flex flex-wrap gap-2 ">
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
                    {apparels?.map((item, index) => {
                      if (item.apparel_position === "BOTTOM") {
                        return (
                          <Fragment key={index}>
                            {item?.photos.map((photo, photoIndex) => {
                              if (photo.file_bottom_front) {
                                return (
                                  <div
                                    key={photoIndex}
                                    className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group"
                                    onClick={() => bottomClick(item)}
                                  >
                                    <img
                                      src={photo.file_bottom_front}
                                      alt="Bottom Front"
                                      className=" rounded-t-lg w-[100px] h-[110px] object-fill"
                                    />

                                    <div
                                      className={`bg-[#1E1239] text-center p-2 rounded-b-lg  group-hover:bg-nyx-new-blue flex flex-row justify-between items-center ${selectBottom == item && " bg-nyx-new-blue"}`}
                                    >
                                      <p className="truncate">{item?.name}</p>
                                      <button
                                        className=" hidden group-hover:block"
                                        onClick={() => haddleBottomEdit(item)}
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
                <div className="w-full mt-[80px]">
                  <p>Choose Model</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                  <div className="  flex flex-wrap gap-2 ">
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
                    {models?.map((item, index) => {
                      // Filter the photos that match the criteria
                      const validPhotos = item.photos.filter((photo) => {
                        const photoKey = Object.keys(photo)[0];
                        return (
                          [
                            "full_body_front",
                            "file_full_body_45",
                            "file_full_body_back",
                          ].includes(photoKey) && photo[photoKey]
                        );
                      });

                      // If there are valid photos, use the first one
                      if (validPhotos.length > 0) {
                        const photo = validPhotos[0];
                        const photoKey = Object.keys(photo)[0];

                        return (
                          <div
                            key={index}
                            className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group"
                            onClick={() => modelClick(item)}
                          >
                            <img
                              src={photo[photoKey]}
                              alt="Model"
                              className="rounded-t-lg w-[100px] h-[110px] object-fill"
                            />
                            <div
                              className={`bg-[#1E1239] text-center p-2 rounded-b-lg group-hover:bg-nyx-new-blue flex flex-row justify-between items-center ${selectModel == item && " bg-nyx-new-blue"}`}
                            >
                              <p>
                                {item?.name }
                                
                              </p>
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

                {/* ANGLES */}
                <div className="w-full mt-[80px]">
                  <p>Choose the angles you want the output in</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                  <Angels
                    setStepperPro={setStepperPro}
                    selectTop={selectTop}
                    selectBottom={selectBottom}
                    selectOnePiece={selectOnePiece}
                    selectModel={selectModel}
                    steperpro={steperpro}
                    setSelectAngle={setSelectedAngels}
                    uploadedAngels={uploadedAngels}
                  />
                </div>

                <div className="flex items-center justify-center mt-12 mb-2 gap-4">
                  {/* <ButtonElement name="Save Fashion Kit"></ButtonElement> */}
                  {/* <ButtonElement
                    name="Next"
                    disabled={
                      !selectTop ||
                      !selectBottom ||
                      !selectModel ||
                      selectedAngels.length === 0
                    }
                    onSubmit={genVTONModel}
                  ></ButtonElement> */}
                  <Button
                    className={`rounded-full w-32 shadow-none  transition-all  hover:shadow-none font-semibold${
                      isDisabled
                        ? " bg-nyx-gray-1 hover:shadow-none hover:bg-nyx-gray-1  text-black cursor-not-allowed border-nyx-gray-1"
                        : " text-nyx-yellow cursor-pointer"
                    }`}
                    disabled={isDisabled || isLoading}
                    onClick={generation}
                  >
                    {mutateVTONModel.isPending ||
                    mutateVTONModelStatus.isPending ||
                    isLoading ? (
                      <ButtonLoading />
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>

                {/* SAVE FASHION KIT */}
                {/* <div className="mb-10"> */}

                <>
                      {/* <div className="flex flex-col mt-6">
                        <span className="text-white font-medium mb-2">
                          Fashion kit&apos;s Name
                        </span>
                        <input
                          id="TwoPieceName"
                          type="text"
                          placeholder="White Frock"
                          value={twoPieceKitNmae}
                          className="appearance-none bg-[#3B236F] border border-[#8297BD] p-2 rounded-md"
                          onChange={(e) => setTwoPieceKitName(e.target.value)}
                        />
                      </div> */}
                      {/* <div className="flex items-center justify-center mt-4">
                        <Button
                          className=" w-24 rounded-full hover:shadow-none font-semibold text-nyx-yellow disabled:cursor-not-allowed disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 disabled:hover:shadow-none disabled:text-black"
                          onClick={saveFashionKit}
                          disabled={
                            (apparels?.length <= 0 &&
                              models?.length <= 0 &&
                              twoPieceKitNmae != "") ||
                            onePieceKitName != ""
                          }
                        >
                          {saveFashioKit.isPending ? <ButtonLoading /> : "Save"}
                        </Button>
                      </div> */}
                    </>
                  
                        {/* <div className={`flex items-center mt-2  `}>
                    <label className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          disabled={(apparels?.length <= 0 &&
                              models?.length <= 0 &&
                              twoPieceKitNmae != "" || onePieceKitName!="") }
                        />
                        <div
                          className={`w-[18px] h-[18px] border ${twoPieceKitNmae.length==0 ?" border-nyx-gray-1":" border-nyx-yellow"} rounded-sm ${isChecked ? "bg-nyx-yellow" : ""} flex items-center justify-center`}
                        >
                          {isChecked && (
                            <span className="text-[#3B236F] text-lg font-bold rotate-[15deg]">
                              ✓
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`${twoPieceKitNmae.length==0?" text-nyx-gray-1":" text-nyx-yellow"} font-semibold`}>
                        Save fashion kit
                      </span>
                    </label>
                  </div> */}
                     
                 

                  
                   
                  
                {/* </div> */}
              </>
            ) : (
              <>
                <div className="w-full mt-6">
                  <p>Add Apparel</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                  <div className="  flex flex-wrap gap-2 ">
                    <div className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4">
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
                    {apparels?.map((item, index) => {
                      if (item.apparel_type === "ONE_PIECE") {
                        return (
                          <Fragment key={index}>
                            {item?.photos.map((photo, photoIndex) => {
                              if (photo.file_top_front) {
                                return (
                                  <div
                                    key={photoIndex}
                                    className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group"
                                    onClick={() => onePieceClick(item)}
                                  >
                                    <img
                                      src={photo.file_top_front}
                                      alt="Top Front"
                                      className=" rounded-t-lg w-[100px] h-[110px] object-fill"
                                    />

                                    <div
                                      className={`bg-[#1E1239] text-center p-2 rounded-b-lg  group-hover:bg-nyx-new-blue flex flex-row justify-between items-center ${selectOnePiece == item && " bg-nyx-new-blue"}`}
                                    >
                                      <p className="truncate ">{item?.name}</p>
                                      <button
                                        className=" hidden group-hover:block"
                                        onClick={() => handleOnePieceEdit(item)}
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
                <div className="w-full mt-[80px]">
                  <p>Choose Model</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                  <div className="  flex flex-wrap gap-2 ">
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
                    {models?.map((item, index) => {
                      // Filter the photos that match the criteria
                      const validPhotos = item.photos.filter((photo) => {
                        const photoKey = Object.keys(photo)[0];
                        return (
                          [
                            "full_body_front",
                            "file_full_body_45",
                            "file_full_body_back",
                          ].includes(photoKey) && photo[photoKey]
                        );
                      });

                      // If there are valid photos, use the first one
                      if (validPhotos.length > 0) {
                        const photo = validPhotos[0];
                        const photoKey = Object.keys(photo)[0];

                        return (
                          <div
                            key={index}
                            className="bg-[#50387B] w-[100px] h-[110px] rounded-t-lg mt-4 mb-6 hover:cursor-pointer group"
                            onClick={() => modelClick(item)}
                          >
                            <img
                              src={photo[photoKey]}
                              alt="Model"
                              className="rounded-t-lg w-[100px] h-[110px] object-fill"
                            />
                            <div
                              className={`bg-[#1E1239] text-center p-2 rounded-b-lg group-hover:bg-nyx-new-blue flex flex-row justify-between items-center ${selectModel == item && " bg-nyx-new-blue"}`}
                            >
                              <p>
                                {item?.name }
                                
                              </p>
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

                {/* ANGLES */}
                <div className="w-full mt-[80px]">
                  <p>Choose the angles you want the output in</p>
                  <hr className="flex flex-col items-center justify-center w-full border-t border-gray-300 my-1" />
                  <Angels
                    setStepperPro={setStepperPro}
                    selectTop={selectTop}
                    selectBottom={selectBottom}
                    selectOnePiece={selectOnePiece}
                    selectModel={selectModel}
                    steperpro={steperpro}
                    setSelectAngle={setSelectedAngels}
                    uploadedAngels={uploadedAngels}
                  />
                </div>

                <div className="flex items-center justify-center mt-12 mb-2 gap-4">
                  {/* <ButtonElement name="Save Fashion Kit"></ButtonElement> */}
                  <Button
                    className={`rounded-full w-32 shadow-none font-semibold transition-all hover:shadow-none${
                      isDisabledOne
                        ? " bg-nyx-gray-1 hover:shadow-none hover:bg-nyx-gray-1  text-black cursor-not-allowed border-nyx-gray-1"
                        : " text-nyx-yellow cursor-pointer"
                    }`}
                    disabled={isDisabledOne || isLoading}
                    onClick={generation}
                  >
                    {mutateVTONModel.isPending ||
                    mutateVTONModelStatus.isPending ||
                    isLoading ? (
                      <ButtonLoading />
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
                {/* SAVE FASHION KIT */}
                {/* <div className="mb-10"> */}

                <>
                      {/* <div className="flex flex-col mt-6">
                        <span className="text-white font-medium mb-2">
                          Fashion kit&apos;s Name
                        </span>
                        <input
                          id="OnePieceName"
                          type="text"
                          placeholder="White Frock"
                          value={onePieceKitName}
                          className="appearance-none bg-[#3B236F] border border-[#8297BD] p-2 rounded-md"
                          onChange={(e) => setOnePieceKitName(e.target.value)}
                        />
                      </div> */}

                      {/* <div className="flex items-center justify-center mt-4">
                        <Button
                          className=" w-24 rounded-full hover:shadow-none font-semibold text-nyx-yellow disabled:cursor-not-allowed disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 disabled:hover:shadow-none disabled:text-black"
                          onClick={saveFashionKit}
                          disabled={
                            (apparels?.length <= 0 &&
                              models?.length <= 0 &&
                              twoPieceKitNmae == "") ||
                            onePieceKitName == ""
                          }
                        >
                          {saveFashioKit.isPending ? <ButtonLoading /> : "Save"}
                        </Button>
                      </div> */}
                    </>
                  {/* <div className="flex items-center mt-2">
                    <label className="flex items-center space-x-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          disabled={(apparels?.length <= 0 &&
                              models?.length <= 0 &&
                              twoPieceKitNmae != "" || onePieceKitName!="")}
                        />
                        <div
                          className={`w-[18px] h-[18px] border ${onePieceKitName.length==0 ?" border-nyx-gray-1":" border-nyx-yellow"} rounded-sm ${isChecked ? "bg-nyx-yellow" : ""} flex items-center justify-center`}
                        >
                          {isChecked && (
                            <span className="text-[#3B236F] text-lg font-bold rotate-[15deg]">
                              ✓
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`${onePieceKitName.length==0?" text-nyx-gray-1":" text-nyx-yellow"} font-semibold`}>
                        Save fashion kit
                      </span>
                    </label>
                  </div> */}
                  
                   
                
                {/* </div> */}
              </>
            )}


            <div className="mb-10">

<>
      <div className="flex flex-col mt-6">
        <span className="text-white font-medium mb-2">
          Fashion kit&apos;s Name
        </span>
        <input
          id="TwoPieceName"
          type="text"
          placeholder="White Frock"
          value={kitName}
          className="appearance-none bg-[#3B236F] border border-[#8297BD] p-2 rounded-md"
          onChange={(e) => setKitName(e.target.value)}
        />
      </div>
      {/* <div className="flex items-center justify-center mt-4">
        <Button
          className=" w-24 rounded-full hover:shadow-none font-semibold text-nyx-yellow disabled:cursor-not-allowed disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 disabled:hover:shadow-none disabled:text-black"
          onClick={saveFashionKit}
          disabled={
            (apparels?.length <= 0 &&
              models?.length <= 0 &&
              twoPieceKitNmae != "") ||
            onePieceKitName != ""
          }
        >
          {saveFashioKit.isPending ? <ButtonLoading /> : "Save"}
        </Button>
      </div> */}
    </>
  
        <div className={`flex items-center mt-2  `}>
    <label className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={(apparels?.length === 0 ||
              models?.length === 0 ||
              kitName==="") }
        />
        <div
          className={`w-[18px] h-[18px] border ${apparels?.length === 0 ||
              models?.length === 0 || kitName.length===0  ?" border-nyx-gray-1":" border-nyx-yellow"} rounded-sm ${isChecked ? "bg-nyx-yellow" : ""} flex items-center justify-center`}
        >
          {isChecked && (
            <span className="text-[#3B236F] text-lg font-bold rotate-[15deg]">
              ✓
            </span>
          )}
        </div>
      </div>
      
      <span className={`${apparels?.length === 0 ||
              models?.length === 0 || kitName.length===0?" text-nyx-gray-1":" text-nyx-yellow"} font-semibold`}>
        Save fashion kit
      </span>
    </label>
  </div>
     
 

  
   
  
</div>
            
          </div>
        </motion.div>
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
              fashionKitId={fashionKitId}
              refetch={refetch}
              mode={editMode ? "edit" : "add"}
              topData={topData}
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
              fashionKitId={fashionKitId}
              refetch={refetch}
              mode={editModeBottom ? "edit" : "add"}
              bottomData={bottomData}
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
              fashionKitId={fashionKitId}
              refetch={refetch}
              mode={editModeOnePiece ? "edit" : "add"}
              onePieceData={onePieceData}
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
              fashionKitId={fashionKitId}
              modelsRefetch={modelsRefetch}
              mode={editModeModel ? "edit" : "add"}
              modelData={modelData}
            />
          </Modal>
        ) : null}
      </div>
    </>
  );
}

export default PhotoshootSelection;
