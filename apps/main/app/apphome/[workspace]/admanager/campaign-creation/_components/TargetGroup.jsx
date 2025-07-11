"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useState, useContext } from "react";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import Modal from "react-modal";
import Button from "@nyx-frontend/main/components/Button";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import { loginPopUpCountryStyles2 } from "@nyx-frontend/main/app/apphome/login/constants";
import {
  addTagetGroupPopupStyle,
  addTagetGroupPopupStyleADmanager,
  deletePopupStyle,
  CreatNewAudiencepopup,
  popupHeader2,
  Audience,
  lookalikeStyle,
} from "@nyx-frontend/main/utils/modalstyles";
import Select, { components } from "react-select";
import {
  ageGroup_ADmanager,
  TGLanguage,
  gender_ADmanager,
  ageArray_ADmanager,
} from "@nyx-frontend/main/utils/productConstants";
import { onboardingColourStyles } from "@nyx-frontend/main/utils/productStyle";
import ValidateStringSpecial from "@nyx-frontend/main/components/ValidateStringSpecial";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addTargetGroupServices,
  deletetargetbyid,
} from "@nyx-frontend/main/services/brandService";
import {
  GetAllAudienceCustom,
  GetAllAudienceLookalike,
  CreateLookAlikeAudience,
  GetAllAudienceCustomgoogle,
  DeleteLookAlikeAudience,
  GetIntrestHobbies,
} from "@nyx-frontend/main/services/admanagerServices";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Slider as RangeSlider } from "rsuite";
import "rsuite/Slider/styles/index.css";
import "rsuite/RangeSlider/styles/index.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Card } from "./Card";

import AudienceLocalise, {
  Confirmation,
  Creatnew,
  Mapiteams,
} from "./Audience";
import { ImInfo } from "react-icons/im";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AgeRangeSlider from "@nyx-frontend/main/components/AgeRangeSlider";

const TargetGroup = ({
  targetGrps,
  setTargetGrps,
  brandDetails,
  brandId,
  campaignDetails,
  brandDetailsRefetch,
  campaignId,
}) => {
  const { displayMessagePopup } = useContext(MessagePopupContext);
  const [brandTargetGroups, setBrandTargetGroups] = useState([]);
  const [targetGroupPopup, setTargetGroupPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editTargetGroupId, setEditTargetGroupId] = useState(null);
  const [targetGroupIDS, setTargetGroupIDS] = useState([]);
  const [targetGroupName, setTargetGroupName] = useState("");
  const [workspaceid, setworkspaceid] = useState();
  const [targetGroupGender, setTargetGroupGender] = useState("");
  const [targetGroupPage, setTargetGroupPage] = useState("");
  const [targetGroupLanguage, setTargetGroupLanguage] =
    useState("Not Applicable");
  const [deleteTargetPopup, setDeleteTargetPopup] = useState(false);
  const [deleteTargetlookalikePopup, setDeleteTargetlookalikePopup] =
    useState(false);
  const [targetNameErr, setTargetNameErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [location, setLocation] = useState("India");
  const [hobbies, setHobbies] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [Audiencesetpopup, setAudiencesetpopup] = useState(false);
  const [isLoadingCustom, setisLoadingCustom] = useState(false);
  const [createnewone, setcreatenewone] = useState(false);
  const [confirmationAudience, setconfirmationAudience] = useState(false);
  const [MapIteams, setMapIteams] = useState(false);
  const [lookAlike, setLookAlike] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [csvfilename, setCsvfilename] = useState("");
  const [RangeSliderValue, setRangeSliderValue] = useState(1);
  const [brandid, setbrandid] = useState();
  const [options, setOptions] = useState([]);
  const [optionsintrest, setOptionsIntrest] = useState([]);
  const [optionsgoogle, setOptionsgoogle] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState();
  const [selectedOption, setSelectedOption] = useState("META");
  const [debouncedHobbies, setDebouncedHobbies] = useState("");
  const [selectedOptionLookalike, setSelectedOptionLookalike] =
    useState("META");
  const [selectedOptionDirectUpload, setSelectedOptionDirectUpload] =
    useState("META");
  const [countryCode, setCountryCode] = useState("IN");
  const [laViewPopup, setLaViewPopup] = useState(false);
  const [audiencesize, setAudienceSize] = useState(-1);
  const [deletelookalikedata, setdeletelookalikedata] = useState();
  const [tab, setTab] = useState("Generic");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedInterestsvalues, setSelectedInterestsvalues] = useState([]);
  const [allInterests, setAllInterests] = useState([]);

  const [ageRange, setAgeRange] = useState([18, 65]);

  const [isHovered, setIsHovered] = useState(false);

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (brandDetails) {
      setbrandid(brandDetails?.id);
      setBrandTargetGroups(brandDetails?.brand_target_group_v2);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandDetails]);

  const mutateAddTargetgroup = useMutation({
    mutationKey: ["add-TargetGroup"],
    mutationFn: addTargetGroupServices,
  });
  const mutateCreateLookAlike = useMutation({
    mutationKey: ["add-TargetGroup"],
    mutationFn: CreateLookAlikeAudience,
  });
  const mutateDeleteLookAlike = useMutation({
    mutationKey: ["add-TargetGroup"],
    mutationFn: DeleteLookAlikeAudience,
  });

  useEffect(() => {
    const id = localStorage.getItem("workspace_id");
    setworkspaceid(id);
  }, []);

  useEffect(() => {
    if (campaignDetails) {
      setTargetGrps(campaignDetails.data[0].targetGroupIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignDetails]);

  /**
   * Target group edit button handler
   * @param targetGroup TargetGroupData
   */
  const { data: CustomList, refetch: customMetaListRefetch } = useQuery({
    queryKey: ["custom"],
    queryFn: () => {
      return GetAllAudienceCustom({ brandId, workspaceid });
    },
  });
  const { data: CustomGoogleList, refetch: customGoogleListRefetch } = useQuery(
    {
      queryKey: ["custom"],
      queryFn: () => {
        return GetAllAudienceCustomgoogle({ brandId, workspaceid });
      },
    }
  );
  const { data: LookalikeList, refetch: customLookalikeListRefetch } = useQuery(
    {
      queryKey: ["lookalike"],
      queryFn: () => {
        return GetAllAudienceLookalike({ brandId, workspaceid });
      },
    }
  );

  const {
    data: IntrestHobbies,
    refetch: intresthobbyRefetch,
    isLoading: hobbiesLoading,
  } = useQuery({
    queryKey: ["custom-google"],
    queryFn: () => {
      if (hobbies) {
        return GetIntrestHobbies({ hobbies, workspaceid });
      }
    },
    enabled: !!workspaceid,
  });

  useEffect(() => {
    if (IntrestHobbies) {
      setAllInterests(IntrestHobbies?.data);
    }
  }, [IntrestHobbies]);

  useEffect(() => {
    const handleOptions = () => {
      const result =
        IntrestHobbies?.data?.map((item) => ({
          label: item.name,
          value: item.resource_name,
        })) || [];
      setOptionsIntrest(result);
    };
    if (IntrestHobbies?.data) {
      handleOptions();
    }
  }, [IntrestHobbies]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedHobbies(hobbies);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [hobbies]);

  useEffect(() => {
    if (debouncedHobbies) {
      intresthobbyRefetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedHobbies]);

  const handleIntrest = (selectedOption) => {
    setSelectedInterests((prev) => [...prev, selectedOption]);
    setSelectedInterestsvalues((prev) => [...prev, selectedOption.label]);
  };

  const CreatAudienceLookAlike = () => {
    const data = {
      customAudienceId: selectedOptionId?.toString(),
      name: targetGroupPage,
      country: countryCode,
      ratio: RangeSliderValue / 100,
      workspaceId: workspaceid,
      brandId: brandid?.toString(),
      platform: selectedOptionLookalike,
    };

    setisLoadingCustom(true);
    mutateCreateLookAlike.mutate(data, {
      onSuccess: (response) => {
        setisLoadingCustom(false);

        const Success = () => {
          toast.success(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Request Successfull!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                LookAlike Audience created successfully
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        Success();
        brandDetailsRefetch();
      },
      onError: (errors) => {
        setisLoadingCustom(false);

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
                {errors?.response?.data?.error}
              </span>
            </>,
            { autoClose: 5000 }
          );
        };
        error(); // Invoke the error function immediately
      },
    });
  };

  const DeleteLookAlike = () => {
    const data = {
      audienceId:
        deletelookalikedata.advanced.customAudienceId ||
        deletelookalikedata.advanced.lookalikeAudienceId,
      brandId: brandid.toString(),
      platform: deletelookalikedata.advanced.platform,
      workspaceId: workspaceid,
    };
    setIsLoading(true);
    mutateDeleteLookAlike.mutate(data, {
      onSuccess: (response) => {
        setIsLoading(false);
        setDeleteTargetlookalikePopup(false);
        const Success = () => {
          toast.success(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Request Successfull!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Audience deleted successfully
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        Success();
        brandDetailsRefetch();
      },
      onError: (errors) => {
        const error = () => {
          setIsLoading(false);
          setDeleteTargetlookalikePopup(false);

          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                {errors?.response?.data?.error}
              </span>
            </>,
            { autoClose: 5000 }
          );
        };
        error(); // Invoke the error function immediately
      },
    });
  };

  const handleClickOnTargetGroupEdit = (targetGroup, laPopup) => {
    if (campaignId) return; // Prevent editing if campaignId exists
    setdeletelookalikedata(targetGroup);
    if (laPopup) {
      setLaViewPopup(true);
      if (targetGroup.advanced.data.approximate_count_lower_bound)
        setAudienceSize(
          targetGroup.advanced.data.approximate_count_lower_bound -
            targetGroup.advanced.data.approximate_count_upper_bound
        );
      else setAudienceSize(100000);
      setEditTargetGroupId(targetGroup.id);
      setTargetGroupName(
        String(
          targetGroup.name.includes("META LA") ||
            targetGroup.name.includes("GOOGLE LA") ||
            targetGroup.name.includes("GOOGLE CA") ||
            targetGroup.name.includes("META CA")
            ? targetGroup.advanced.data.name.split("-")[0]
            : targetGroup.name
        )
      );
      setTargetGroupGender(String(targetGroup.gender));
      setTargetGroupPage(String(targetGroup.age_group));

      const parsedAgeRange = targetGroup.age_group.split("-").map(Number);
      setAgeRange(parsedAgeRange);

      if (targetGroup.location) {
        setLocation(String(targetGroup.location));
        setPlaces(targetGroup.location);
      }
      if (targetGroup.interests != null) {
        setHobbies(String(targetGroup.interests));
      }
    } else {
      setLaViewPopup(false);
      setTargetGroupPopup(true);
      setEditTargetGroupId(targetGroup.id);
      setTargetGroupName(String(targetGroup.name));
      setTargetGroupGender(String(targetGroup.gender));
      setTargetGroupPage(String(targetGroup.age_group));
      const parsedAgeRange = targetGroup.age_group.split("-").map(Number);
      setAgeRange(parsedAgeRange);
      setTargetGroupLanguage(String(targetGroup?.advanced?.languages?.[0]));
      if (targetGroup.location) {
        setLocation(String(targetGroup.location));
        setPlaces(targetGroup.location);
      }
      if (targetGroup.interests != null) {
        const array = JSON.parse(targetGroup.interests);
        const getLabels = (array) => array?.map((item) => item?.label);
        const labels = getLabels(array);
        setSelectedInterests(JSON.parse(targetGroup.interests));
        setSelectedInterestsvalues(labels);
      }
    }
  };

  const handleTargetGroupModal = () => {
    setTargetGroupPopup(false);
    setEditTargetGroupId(null);
    setTargetGroupName("");
    setTargetGroupGender("");
    setTargetGroupPage("");
    setAgeRange([18, 65]);
    setTargetGroupLanguage("");
    setHobbies("");
    setSelectedInterests("");
    setSelectedInterestsvalues("");
    setPlaces([]);
  };

  const handleDeleteTargetPopup = () => {
    setDeleteTargetPopup(true);
    setTargetGroupPopup(false);
  };

  const handleInputtargetName = (event) => {
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
      // targetGroupRegion.length == 0 ||
      targetGroupGender.length == 0 ||
      places.length == 0
    ) {
      displayMessagePopup(
        "handle-input-prod-logo",
        "error",
        "Error",
        "Please fill the required data."
      );
      // toast.error("Please select * marked section");
      return false;
    } else if (targetGroupName.length > 15) {
      setTargetNameErr(true);
      setErrMessage("Target Group name should be a maximum of 15 characters.");
    } else if (!ValidateStringSpecial(targetGroupName)) {
      setTargetNameErr(true);
      setErrMessage(
        "Target group name doesnt conatian first special character."
      );
    } else {
      const brandid = sessionStorage.getItem("brandid");

      const targetGroupData = editTargetGroupId
        ? {
            id: editTargetGroupId,
            name: targetGroupName,
            // age_group: targetGroupPage,
            // region: targetGroupRegion,
            age_group: `${ageRange[0]}-${ageRange[1]}`,
            gender: targetGroupGender,
            brand_id: brandId,
            location: places,
            interests: JSON.stringify(selectedInterests),
            target_group_id: Number(editTargetGroupId),
            language: targetGroupLanguage,
            workspace_id: localStorage.getItem("workspace_id"),
          }
        : {
            name: targetGroupName,
            //age_group: targetGroupPage,
            // region: targetGroupRegion,
            age_group: `${ageRange[0]}-${ageRange[1]}`,
            gender: targetGroupGender,
            brand_id: brandId,
            location: places,
            interests: JSON.stringify(selectedInterests),
            language: targetGroupLanguage,
            workspace_id: localStorage.getItem("workspace_id"),
          };

      // if (brandid) {
      //   // @ts-ignore
      //   targetGroupData.brand_id = Number(brandid);
      // }

      mutateAddTargetgroup.mutate(targetGroupData, {
        onSuccess: (response) => {
          if (editTargetGroupId !== null) {
            let targetGroups = brandTargetGroups.filter(
              (targetGroup) => targetGroup.id !== editTargetGroupId
            );

            setBrandTargetGroups([...targetGroups, response.targetGroup]);
          } else {
            let targetGroup = response.targetGroup;

            if (brandTargetGroups && brandTargetGroups.length) {
              setBrandTargetGroups((prev) => [...prev, targetGroup]);
            } else {
              setBrandTargetGroups([targetGroup]);
            }
          }
          brandDetailsRefetch();
          setTargetGroupIDS([...targetGroupIDS, response.targetGroup.id]);
          handleTargetGroupModal();
        },
        onError: (res) => {
          // console.log(res);
        },
      });
    }
  };
  const settargetgroupnage1 = (selected) => {
    setTargetGroupPage(selected.label);
    setSelectedOptionId(selected.id);
  };

  const settargetgroupGender = (selected) => {
    setTargetGroupGender(selected.value);
  };

  const handleLanguage = (selected) => {
    setTargetGroupLanguage(selected.value);
  };
  /**
   * Target group delete submit
   */
  const handleDeleteTargetButtonClick = () => {
    if (campaignId) return; // Prevent deletion if campaignId exists
    if (editTargetGroupId) {
      setIsLoading(true);
      deletetargetbyid(editTargetGroupId)
        .then((data) => {
          setBrandTargetGroups(
            brandTargetGroups.filter(
              (targetGroup) => targetGroup.id !== editTargetGroupId
            )
          );
          brandDetailsRefetch();
          setDeleteTargetPopup(false);
          handleTargetGroupModal();
          setIsLoading(false);
        })
        .catch((error) => console.log("error"));
    }
  };

  const handleClick = (id) => {
  if (campaignId) return; // Prevent selection if campaignId exists

  setTargetGrps((prev) => {
    const isAlreadySelected = prev.includes(id);
    const newSelection = isAlreadySelected
      ? prev.filter((item) => item !== id)
      : [...prev, id];

    // Check the limit BEFORE updating state
    if (newSelection.length > 5) {
      toast.warn(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            You have selected maximum target group.
          </span>
        </>,
        { autoClose: 5000 }
      );
      return prev; // Do not update state
    }

    return newSelection;
  });
};


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API,
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      autocompleteInstance.addListener("place_changed", handlePlaceChanged);
      setAutocomplete(autocompleteInstance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const handlePlaceChanged = () => {
    if (autocomplete && inputRef.current) {
      const place = autocomplete.getPlace();
      const formattedAddress =
        place.formatted_address || "No address available";

      setPlaces((prevPlaces = []) => [...prevPlaces, formattedAddress]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };
  const removeItem = (indexToRemove) => {
    const newArray = places.filter((_, index) => index !== indexToRemove);
    setPlaces(newArray);
  };
  const removeIntrest = (indexToRemove) => {
    const newArray = selectedInterests.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedInterests(newArray);
    const oldarray = selectedInterestsvalues.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedInterestsvalues(oldarray);
  };

  const removeFromAllInterest = (indexToRemove) => {
    const newArray = allInterests.filter((_, index) => index !== indexToRemove);
    setAllInterests(newArray);
  };

  const handleOptions = () => {
    const result = CustomList?.brand_target_group_v2?.map((item) => {
      return {
        label: item?.advanced?.data?.name || item?.name,
        value: item?.advanced?.data?.name || item?.name,
        id: item?.advanced?.data?.id || item?.id,
      };
    });
    setOptions(result);
  };

  const handleOptionsgooglecustom = useCallback(() => {
    const result = CustomListGoogle?.map((item) => {
      return {
        label: item.user_list.name,
        value: item.user_list.name,
        id: item.user_list.id,
      };
    });

    setOptionsgoogle(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CustomList]);

  const { data: countries, isSuccess } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=idd,cca2"
      );
      return res.data;
    },
  });

  // Create options from country data
  const countriesOptions = countries?.map((country) => ({
    label: country.cca2,
  }));

  // Handler for selecting country
  const countrySelectOnChangeHandler = (option) => {
    setCountryCode(option?.label);
  };

  // useEffect to set the initial value based on success
  useEffect(() => {
    if (isSuccess && countriesOptions?.length > 0) {
      const indiaOption = countriesOptions.find(
        (option) => option.label === "IN"
      );
      if (indiaOption) {
        setCountryCode(indiaOption.label); // Set default to 'IN' (India)
      }
    }
  }, [isSuccess, countriesOptions]);

  useEffect(() => {
    if (selectedOptionLookalike === "META") customMetaListRefetch();
    else customGoogleListRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionLookalike]);

  useEffect(() => {
    if (tab === "Custom") {
      setBrandTargetGroups(CustomList?.brand_target_group_v2);
    } else if (tab === "Generic") {
      setBrandTargetGroups(brandDetails?.brand_target_group_v2);
    } else if (tab === "Lookalike") {
      setBrandTargetGroups(LookalikeList?.brand_target_group_v2);
      handleOptions();
    }
  }, [tab]);

  const handleTab = (test) => {
    setTab(test);
  };

  return (
    <>
      <div className={`w-full flex flex-col gap-2 mt-4 ${campaignId ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="flex justify-between">
          <div className="text-[#FFFFFF] text-sm xl:text-base font-semibold cursor-default">
            Set your target groups
            <span className=" text-nyx-red">*</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 my-2  bg-[#332270] p-6 h-fit rounded-xl">
          <div className="flex justify-between xl:border-b-[1px] border-[#8297BD80] pt-[9px] ">
            <div className="flex gap-x-6 text-sm xl:text-[16px] text-white font-normal">
              <div
                onClick={() => !campaignId && handleTab("Generic")}
                className={`${
                  tab === "Generic"
                    ? "text-[#FFC01D]  border-b-[4px] border-nyx-yellow hover:cursor-pointer"
                    : "hover:cursor-pointer"
                } pb-[9px] px-2 ${campaignId ? 'cursor-not-allowed' : ''}`}
              >
                Generic
              </div>
              <div
                onClick={() => !campaignId && handleTab("Custom")}
                className={`${
                  tab === "Custom"
                    ? "text-[#FFC01D] border-b-[4px] border-nyx-yellow hover:cursor-pointer"
                    : "hover:cursor-pointer"
                } pb-[9px] px-2 ${campaignId ? 'cursor-not-allowed' : ''}`}
              >
                Custom
              </div>
              <div
                onClick={() => !campaignId && handleTab("Lookalike")}
                className={`${
                  tab === "Lookalike"
                    ? "text-[#FFC01D] border-b-[4px] border-nyx-yellow hover:cursor-pointer"
                    : "hover:cursor-pointer"
                } pb-[9px] px-2 ${campaignId ? 'cursor-not-allowed' : ''}`}
              >
                Lookalike
              </div>
            </div>
          </div>
          <div className="w-full h-auto   gap-5 my-6">
            {tab === "Generic" && (
              <Card
                tab={tab}
                setTargetGroupPopup={setTargetGroupPopup}
                setAudiencesetpopup={setAudiencesetpopup}
                setLookAlike={setLookAlike}
                list={brandDetails}
                handleClick={handleClick}
                handleClickOnTargetGroupEdit={handleClickOnTargetGroupEdit}
                targetGrps={targetGrps}
              />
            )}
            {tab === "Custom" && (
              <Card
                tab={tab}
                setTargetGroupPopup={setTargetGroupPopup}
                setAudiencesetpopup={setAudiencesetpopup}
                setLookAlike={setLookAlike}
                list={CustomList}
                handleClick={handleClick}
                handleClickOnTargetGroupEdit={handleClickOnTargetGroupEdit}
                targetGrps={targetGrps}
              />
            )}
            {tab === "Lookalike" && (
              <Card
                tab={tab}
                setTargetGroupPopup={setTargetGroupPopup}
                setAudiencesetpopup={setAudiencesetpopup}
                setLookAlike={setLookAlike}
                list={LookalikeList}
                handleClick={handleClick}
                handleClickOnTargetGroupEdit={handleClickOnTargetGroupEdit}
                targetGrps={targetGrps}
              />
            )}
          </div>
        </div>
      </div>
      {targetGroupPopup ? (
        <Modal
          isOpen={targetGroupPopup}
          style={addTagetGroupPopupStyleADmanager}
          onRequestClose={handleTargetGroupModal}
          ariaHideApp={false}
        >
          <div className="flex justify-between">
            <div className="text-base font-bold text-[#FFFFFF]">
              {editTargetGroupId ? "Edit Target Group" : "New Target Group"}
            </div>

            <div className="flex justify-end gap-1">
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
                className={`placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md h-[40px] px-2 font-lighter text-[#FFFFFF] ${
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
                Location <span className="text-[#E26971]">*</span>
              </div>

              {isLoaded && (
                <div>
                  <Autocomplete
                    onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                    onPlaceChanged={handlePlaceChanged}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      className={`placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md h-[40px] px-2 font-lighter text-[#FFFFFF] ${
                        targetNameErr && "border-nyx-red"
                      }`}
                      placeholder="Enter a location"
                    />
                  </Autocomplete>
                  <div className="flex flex-wrap mt-2 gap-3">
                    {Array.isArray(places) &&
                      places.map((item, index) => (
                        <>
                          <div className="w-[140px] rounded-md flex justify-center items-center bg-nyx-sky text-white">
                            <div class="relative group">
                              <div class="tooltip-container">
                                <p class="tooltips text-white  font-normal w-[140px] z-[9] text-[14px] absolute bg-black p-1 rounded-[10px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  {item}
                                </p>
                              </div>
                              <p class="w-[110px] truncate cursor-pointer z-[7] tooltip-trigger text-[14px]">
                                {item}
                              </p>
                            </div>
                            <div
                              className="text-[#FFFFFF] hover:text-nyx-yellow cursor-pointer text-[14px]"
                              onClick={() => removeItem(index)}
                            >
                              x
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-[14px] font-[700]">
                Age Group <span className="text-[#E26971]">*</span>
              </div>
              <div className="w-full flex gap-3">
                <AgeRangeSlider ageRange={ageRange} setAgeRange={setAgeRange} />
              </div>
            </div>

            <div className="w-full flex gap-3">
              <div className="w-full flex flex-col">
                <div style={popupHeader2} className="text-[14px] font-[700]">
                  Gender <span className="text-[#E26971]">*</span>
                </div>
                <Select
                  className="text-sm"
                  options={gender_ADmanager}
                  placeholder="Select Gender"
                  instanceId={"gender"}
                  styles={onboardingColourStyles}
                  onChange={settargetgroupGender}
                  value={gender_ADmanager.find(
                    (option) => option?.value === targetGroupGender
                  )}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
              <div className="w-full flex flex-col">
                <div style={popupHeader2} className="text-[14px] font-[700]">
                  Language
                </div>
                <Select
                  className="text-sm"
                  options={TGLanguage}
                  menuPlacement="top"
                  placeholder="Select Language"
                  instanceId={"region"}
                  styles={onboardingColourStyles}
                  onChange={handleLanguage}
                  value={TGLanguage.find(
                    (option) => option?.value === targetGroupLanguage
                  )}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
            </div>
            <div className="w-full group">
              <div className="w-full flex flex-col relative">
                <div className="absolute bottom-3 left-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.3182 12.2903C12.5064 12.1035 12.7611 11.9991 13.0263 12C13.2914 12.0009 13.5454 12.1072 13.7322 12.2953L17.7072 16.2953C17.8889 16.4844 17.9891 16.7373 17.9861 16.9995C17.9831 17.2618 17.8772 17.5123 17.6912 17.6972C17.5053 17.8822 17.2541 17.9866 16.9919 17.9881C16.7296 17.9896 16.4773 17.8881 16.2892 17.7053L12.3142 13.7053C12.1273 13.5172 12.0227 13.2626 12.0234 12.9975C12.0242 12.7323 12.1302 12.4783 12.3182 12.2913V12.2903Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div style={popupHeader2} className="text-[14px] font-[700]">
                  Interests & hobby
                </div>
                <input
                  type="text"
                  className={`placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md h-[38px] px-2 pl-8 font-lighter text-[#FFFFFF] ${
                    targetNameErr && "border-nyx-red"
                  }`}
                  placeholder="Search interests & hobbies"
                  value={hobbies}
                  onChange={(e) => {
                    setHobbies(e.target.value);
                  }}
                />
              </div>

              <div className="hidden group-hover:flex pt-1">
                <div className=" w-full flex flex-col h-[100px] overflow-hidden overflow-y-auto bg-[#2A1465] rounded-md">
                  {hobbiesLoading ? (
                    <div className="w-full h-full flex justify-center items-center text-white text-xs">
                      Loading...
                    </div>
                  ) : optionsintrest && optionsintrest.length > 0 ? (
                    optionsintrest.map((item, index) => (
                      <button
                        key={index}
                        className="w-full text-xs p-2 text-white hover:text-nyx-yellow cursor-pointer bg-transparent hover:bg-[#5e32ff] text-left"
                        onClick={() => handleIntrest(item)}
                      >
                        {item?.label}
                      </button>
                    ))
                  ) : (
                    <div className="w-full h-full flex justify-center items-center text-white text-xs">
                      No data found
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 ">
              {Array.isArray(selectedInterests) &&
                selectedInterests?.length > 0 &&
                selectedInterests?.map((item, index) => (
                  <>
                    <div className="w-[140px] rounded-md flex justify-center items-center bg-nyx-sky text-white">
                      <div class="relative group">
                        <div class="tooltip-container">
                          <p className="tooltips text-white  font-normal w-[140px] z-[9] text-[14px] absolute bg-black p-1 rounded-[10px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                            {selectedInterestsvalues[index]}
                          </p>
                        </div>
                        <p className="w-[110px] truncate cursor-pointer z-[7] tooltip-trigger text-[14px]">
                          {selectedInterestsvalues[index]}
                        </p>
                      </div>
                      <div
                        className="text-[#FFFFFF] hover:text-nyx-yellow cursor-pointer text-[14px]"
                        onClick={() => removeIntrest(index)}
                      >
                        x
                      </div>
                    </div>
                  </>
                ))}
            </div>

            <div className="w-full flex gap-4 justify-center items-center">
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
                {mutateAddTargetgroup.isPending ? "Adding..." : "Next"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      {lookAlike ? (
        <Modal
          isOpen={lookAlike}
          style={lookalikeStyle}
          ariaHideApp={false}
        >
          <div className=" p-[14px] h-full w-[562px] overflow-hidden text-white">
            <div className="flex justify-between  items-start cursor-pointer">
              <p className="font-bold text-[16px] leading-6">
                Advance TG -Lookalike Audience
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                onClick={() => {
                  setLookAlike(false);
                }}
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
            <div className="flex justify-between max-w-[70%] mx-auto items-center border-b-[1px] border-[#8297BD80] pt-[26px]  mb-[26px]">
              <div className="flex mx-auto gap-x-6 items-center justify-between text-[14px] text-white font-normal">
                <div
                  onClick={() => {
                    setSelectedOptionLookalike("META");
                  }}
                  className={`${
                    selectedOptionLookalike === "META"
                      ? "text-[#FFC01D]  border-b-[2px] border-nyx-yellow hover:cursor-pointer"
                      : "hover:cursor-pointer"
                  } pb-[6px] px-1`}
                >
                  Audience for Meta
                </div>
                <div
                  onClick={() => {
                    setSelectedOptionLookalike("GOOGLE");
                  }}
                  className={`${
                    selectedOptionLookalike === "GOOGLE"
                      ? "text-[#FFC01D] border-b-[2px] border-nyx-yellow hover:cursor-pointer"
                      : "hover:cursor-pointer"
                  } pb-[6px] px-2`}
                >
                  Audience for Google
                </div>
              </div>
            </div>
            <div className="mt-[24px] flex flex-col gap-y-4">
              <div className="z-10">
                <div className="text-white text-[14px]">
                  Selected Audience group
                </div>
                <div className="mt-[12px]">
                  {selectedOptionLookalike === "META" && (
                    <Select
                      className="text-sm md:text-base"
                      options={options}
                      placeholder="Select or type Audience"
                      instanceId={"age-group"}
                      styles={onboardingColourStyles}
                      onChange={settargetgroupnage1}
                      value={ageGroup_ADmanager.find(
                        (option) => option?.value === targetGroupPage
                      )}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                    />
                  )}
                  {selectedOptionLookalike === "GOOGLE" && (
                    <Select
                      className="text-sm md:text-base"
                      options={optionsgoogle}
                      placeholder="Select or type Audience"
                      instanceId={"age-group"}
                      styles={onboardingColourStyles}
                      onChange={settargetgroupnage1}
                      value={ageGroup_ADmanager.find(
                        (option) => option?.value === targetGroupPage
                      )}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="">
                <div className="text-white text-[14px]">
                  Selected Audience Location
                </div>
                <div className="mt-2 w-full">
                  <Select
                    options={countriesOptions}
                    placeholder="IN"
                    styles={onboardingColourStyles}
                    className="text-sm md:text-base"
                    onChange={countrySelectOnChangeHandler}
                    components={{
                      IndicatorSeparator: () => null,
                      Input: (props) => (
                        <components.Input
                          {...props}
                          aria-activedescendant={undefined}
                        />
                      ),
                    }}
                    instanceId={"countryId"}
                  />
                </div>
              </div>
              <div className=" flex gap-3 ">
                <div className="text-white text-[14px]">
                  Selected Audience size
                </div>
                <div className="text-white flex items-center group relative price_package">
                  <ImInfo className="cursor-pointer" />
                  <div className="absolute top-[10px] z-10 left-[-140px] text-[16px] bg-[#0d0718] text-white p-3 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto w-[400px] rounded-2xl price_package_hover">
                    Adjust the slider to set your lookalike audience size. A
                    lower percentage (1%) means a smaller, more similar
                    audience, while a higher percentage (up to 10%) means a
                    larger, more diverse audience.
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col mt-2 ">
                <RangeSlider
                  defaultValue={1}
                  progress
                  min={0}
                  max={10}
                  value={RangeSliderValue}
                  className="sliderStyle"
                  onChange={(value) => {
                    setRangeSliderValue(value);
                  }}
                />
                <div className="w-full flex justify-between text-[14px] text-white">
                  <div>0</div>
                  <div>&apos;</div>
                  <div>2</div>
                  <div>&apos;</div>
                  <div>4</div>
                  <div>&apos;</div>
                  <div>6</div>
                  <div>&apos;</div>
                  <div>8</div>
                  <div>&apos;</div>
                  <div>10</div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <Button
                  className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
                  onClick={CreatAudienceLookAlike}
                >
                  {isLoadingCustom ? <ButtonLoading /> : "Create Audience"}
                </Button>
              </div>
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
            <div className="text-2xl font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="pr-3 cursor-pointer"
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
          <div className="w-full my-5">
            <p className="w-full text-center text-[#FFFFFF] text-base font-bold">
              Are you sure you want to delete this target group?
            </p>
          </div>

          <div className="w-full flex mb-5 gap-4 justify-center items-center">
            <Button
              className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
              onClick={() => {
                setDeleteTargetPopup(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
              onClick={() => handleDeleteTargetButtonClick()}
            >
              {isLoading ? "Deleteing..." : "Delete"}
            </Button>
          </div>
        </Modal>
      ) : null}
      {Audiencesetpopup ? (
        <Modal
          isOpen={Audiencesetpopup}
          style={Audience}
          onRequestClose={() => {
            setAudiencesetpopup(false);
          }}
          ariaHideApp={false}
        >
          <AudienceLocalise
            setMapIteams={setMapIteams}
            setconfirmationAudience={setconfirmationAudience}
            setcreatenewone={setcreatenewone}
            setAudiencesetpopup={setAudiencesetpopup}
            brandid={brandid}
            workspaceid={workspaceid}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            setSelectedOptionDirectUpload={setSelectedOptionDirectUpload}
            selectedOptionDirectUpload={selectedOptionDirectUpload}
            handleOptions={customMetaListRefetch}
            handleOptionsgooglecustom={customGoogleListRefetch}
            brandDetailsRefetch={brandDetailsRefetch}
          />
        </Modal>
      ) : null}
      {createnewone ? (
        <Modal
          isOpen={createnewone}
          style={CreatNewAudiencepopup}
          ariaHideApp={false}
        >
          <Creatnew
            setMapIteams={setMapIteams}
            setconfirmationAudience={setconfirmationAudience}
            setcreatenewone={setcreatenewone}
            setAudiencesetpopup={setAudiencesetpopup}
            setCsvData={setCsvData}
            csvData={csvData}
            setCsvfilename={setCsvfilename}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
        </Modal>
      ) : null}
      {confirmationAudience ? (
        <Modal
          isOpen={confirmationAudience}
          style={CreatNewAudiencepopup}
          ariaHideApp={false}
        >
          <Confirmation
            setMapIteams={setMapIteams}
            setconfirmationAudience={setconfirmationAudience}
            setcreatenewone={setcreatenewone}
            setAudiencesetpopup={setAudiencesetpopup}
            csvfilename={csvfilename}
            csvData={csvData}
          />
        </Modal>
      ) : null}
      {MapIteams ? (
        <Modal
          isOpen={MapIteams}
          style={CreatNewAudiencepopup}
          ariaHideApp={false}
        >
          <Mapiteams
            setMapIteams={setMapIteams}
            csvDatas={csvData}
            setconfirmationAudience={setconfirmationAudience}
            setcreatenewone={setcreatenewone}
            setAudiencesetpopup={setAudiencesetpopup}
            csvfilename={csvfilename}
            brandid={brandid}
            workspaceid={workspaceid}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            handleOptions={customMetaListRefetch}
            handleOptionsgooglecustom={customGoogleListRefetch}
            brandDetailsRefetch={brandDetailsRefetch}
          />
        </Modal>
      ) : null}
      {laViewPopup ? (
        <Modal
          isOpen={laViewPopup}
          style={lookalikeStyle}
          ariaHideApp={false}
        >
          <div className="px-[10px] py-[10px] h-[291px] w-[562px] ">
            <div className="h-full flex flex-col ">
              <div className="flex justify-end mt-[0px] mr-[6px] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  onClick={() => {
                    setTargetGroupName("");
                    setLaViewPopup(false);
                  }}
                >
                  <path
                    fill="#FFFFFF"
                    d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                  />
                </svg>
              </div>
              <div className=" flex justify-between mt-6">
                <div className=" w-full text-white text-[18px] font-semibold">
                  Advance TG -{" "}
                  {targetGroupName.includes("LA")
                    ? "Lookalike Audience"
                    : "Custom Audience"}
                </div>
                <div
                  className="pr-3 cursor-pointer"
                  onClick={() => {
                    setDeleteTargetlookalikePopup(true);
                    setLaViewPopup(false);
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-[-6px]"
                  >
                    <path
                      d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {targetGroupName.includes("LA") ? (
                <div className="flex flex-col mt-6 gap-y-4">
                  <div className="bg-[#543891] w-full h-[40px] px-2 rounded-lg flex items-center justify-between text-white text-[14px]">
                    <div>Selected Audience group:</div>
                    <div className="text-nyx-yellow font-semibold italic">
                      {targetGroupName}
                    </div>
                  </div>
                  <div className="bg-[#3B236F] w-full h-[40px] px-2 rounded-lg flex items-center justify-between text-white text-[14px]">
                    <div>Selected Audience Location:</div>
                    <div className="text-nyx-yellow font-semibold italic">
                      {location}
                    </div>
                  </div>
                  <div className="bg-[#3B236F] w-full h-[40px] px-2 rounded-lg flex items-center justify-between text-white text-[14px]">
                    <div>Audience Size </div>
                    <div className="text-nyx-yellow font-semibold italic">
                      {audiencesize}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#543891] w-full h-[40px] mt-6 px-2 rounded-lg flex items-center justify-between text-white text-[14px]">
                  <div>Selected Audience group:</div>
                  <div className="text-nyx-yellow font-semibold italic">
                    {targetGroupName}
                  </div>
                </div>
              )}

              <div className="mt-10 flex justify-center">
                <Button
                  className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
                  onClick={() => {
                    setLaViewPopup(false);
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
      {deleteTargetlookalikePopup ? (
        <Modal
          isOpen={deleteTargetlookalikePopup}
          style={deletePopupStyle}
          onRequestClose={handleTargetGroupModal}
          ariaHideApp={false}
        >
          <div className="flex justify-between">
            <div className="text-2xl font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setDeleteTargetlookalikePopup(false);
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
              Are you sure you want to delete this{" "}
              {targetGroupName.includes("LA")
                ? "Lookalike Audience"
                : "Custom Audience"}{" "}
              ?
            </p>
          </div>

          <div className="w-full flex mb-5 gap-4 justify-center items-center">
            <Button
              className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
              onClick={() => {
                setDeleteTargetlookalikePopup(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
              onClick={() => DeleteLookAlike()}
            >
              {isLoading ? "Deleteing..." : "Delete"}
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default TargetGroup;
