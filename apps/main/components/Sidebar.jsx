"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import "../css/toolResponsive.css";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { newWorkSapce, getWorkSapceDetails } from "@nyx-frontend/main/services/workSpace";
import { BsChevronLeft } from "react-icons/bs";
import Link from "next/link";
import { IMAGE_URL } from "./constants";
import classNames from "@nyx-frontend/main/utils/classNames";
import NewHomeIcon from "@nyx-frontend/main/components/Icons/NewHomeIcon";
import AssetsIcon from "@nyx-frontend/main/components/Icons/AssetsIcon";
import AgentsIcon from "@nyx-frontend/main/components/Icons/AgentsIcon";
import CatalogueIcon from "@nyx-frontend/main/components/Icons/Catalogue";
import {
  IntegrationsIcon,
  HoverIntegrationIcon,
} from "@nyx-frontend/main/components/Icons/IntegrationsIcon";
import {
  getbrandService,
  getbrandWorkspaceService,
} from "@nyx-frontend/main/services/brandService";
import BrandVisionAIIcon from "@nyx-frontend/main/components/Icons/BrandVisionAIIcon";
import VideoVistaAIIcon from "@nyx-frontend/main/components/Icons/VideoVistaAIIcon";
import LyricGeniusAIIcon from "@nyx-frontend/main/components/Icons/LyricGeniusAIIcon";
import CampulseIcon from "./Icons/Campulse";
import SettingsIcon from "@nyx-frontend/main/components/Icons/SettingsIcon";
import CustomSlider from "@nyx-frontend/main/components/CustomSlider";
import cookie from "cookiejs";
import { useRouter, usePathname, useParams } from "next/navigation";
import Button from "./Button";
import { getUserProfileData } from "@nyx-frontend/main/services/uploadService";
import { useQuery, useMutation } from "@tanstack/react-query";
import Modal from "react-modal";
import {
  workSpaceMenustyle,
  createWorkSpaceStyle,
  onetimeemailverification,
} from "@nyx-frontend/main/utils/modalstyles";
import Image from "next/image";
import {
  getAvailableCredit,
  getWorkspaceDetailsById,
} from "@nyx-frontend/main/services/workSpace";
import InviteUser from "@nyx-frontend/main/app/apphome/[workspace]/settings/_components/InviteUser";
import {
  removeStorage,
  getStorageTokenWorkspace,
  saveRedirectStorage,
} from "@nyx-frontend/main/utils/userUtils";
import WorkspaceCreated from "./Icons/WorkspaceCreated";
import { sendEmailVerification } from "@nyx-frontend/main/services/loginService";
import { checkEmailExisted } from "@nyx-frontend/main/utils/userUtils";
import OnbordingIcon from "./Icons/OnbordingIcon";
import RecentProjectIcon from "./Icons/RecentProjectIcon";
import HelpIconNew from "./Icons/HelpIconNew";
import NewInvitationIcon from "./Icons/NewInvitationIcon";
import useGlobalStore from "../app/apphome/[workspace]/admanager/store/store";
const logo_small = IMAGE_URL + "/assets/sidebarLogo.svg";
const upArrow = IMAGE_URL + "/assets/images/home/workspaceUparrow.svg";
const upArrowClose = IMAGE_URL + "/assets/images/home/workspaceArrowClose.svg";

const Sidebar = ({ defaultOpened = false }) => {
  const [open, setOpen] = useState(defaultOpened);
  const [workSpaceMenu, setWorkSpaceMenu] = useState(false);
  const [createWork, setCreateWork] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [workSuccess, setWorkSuccess] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [creditError, setCreditError] = useState(false);
  const [newWorkSpaceCredit, setnewWorkSpaceCredit] = useState("");
  const [newWorkSpaceName, setNewWorkSpaceName] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [emailverivication, setemailverivication] = useState("");
  const [firsttimepopup, setfirsttimepopup] = useState(false);
  const [firsttimepopup2, setfirsttimepopup2] = useState(false);
  const [validitycheck, setvaliditycheck] = useState(false);
  const [emailexisted, setemailexisted] = useState(false);

  const [brandId, setBrandId] = useState(null);
  const {
    objective,
    goalId,
    goalData,
    subTopic,
    optionValue,
    channlesArray,
    channelIdArray,
    setObjective,
    setChannelsArray,
    setGoalId,
    setGoalData,
    setSubTopic,
    setOptionValue,
    setChannelIdArray,
  } = useGlobalStore();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const menuItemNames = {
    dashboard: "Home",
    assets: "Assets",
    "platform-integration": "Integrations",
    "app-imagecraft-ai": "ImageCraft AI",
    "app-videovista-ai": "VideoVista AI",
    "app-lyricsgenius-ai": "LyricGenius AI",
    "app-campulse-ai": "Campulse AI",
    "agents": "Agents",
    help: "Help",
    "settings/profile": "Settings",
  };

  const { data: brandDetails } = useQuery({
    queryKey: ["get-brands"],
    queryFn: async () =>
      await getbrandWorkspaceService(localStorage.getItem("workspace_id")),
  });

  useEffect(() => {
    // if (brandDetails?.length > 0) {
    //   sessionStorage.setItem("brandid", brandDetails[0]?.id);
    //   setBrandId(brandDetails[0]?.id);
    // } else if (brandDetails?.length == 0 && sessionStorage.getItem("brandid")) {
    //   sessionStorage.removeItem("brandid");
    //   setBrandId(null);
    // }
    if (brandDetails?.length > 0) {
      setBrandId(brandDetails[0]?.id);
    } else {
      setBrandId(null);
    }
  }, [brandDetails]);

  console.log(brandDetails);

  useLayoutEffect(() => {
    const hasCookie = cookie.get("ExpireLoginToken");
    if (!hasCookie) {
      localStorage.removeItem("token");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const menuItemName = Object.keys(menuItemNames).find((key) =>
      pathname.includes(key),
    );

    console.log(menuItemName);

    if (menuItemName) {
      setSelectedMenuItem(menuItemNames[menuItemName]);
    }

    console.log(selectedMenuItem);
  }, [pathname]);

  useEffect(() => {
    localStorage.removeItem("Login-Type");
    const { token, workspaceArray, workspaceArrayslug } =
      getStorageTokenWorkspace();
    const exists =
      workspaceArray?.includes(decodeURI(params.workspace)) || false;
    const existslug =
      workspaceArrayslug?.includes(decodeURI(params.workspace)) || false;

    if (!(token && (existslug || exists))) {
      removeStorage().finally(async () => {
        await saveRedirectStorage(window.location.pathname);
        router.push("/apphome/login");
      });
      console.log("You are not legal member of ths workspace");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutatenewWorkspace = useMutation({
    mutationKey: ["new-workspace"],
    mutationFn: newWorkSapce,
  });
  const mutatemailsend = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: sendEmailVerification,
  });

  const { data: userDetailsRole } = useQuery({
    queryKey: ["role-sidebar-bottom"],
    queryFn: async () => {
      const workspaceId = localStorage.getItem("workspace_id");
      if (!workspaceId) {
        return null;
      }

      const res = await getWorkspaceDetailsById(Number(workspaceId));
      return res;
    },
  });
  // console.log("fffffdddddd",userDetailsRole)
  const { data: availableCredit } = useQuery({
    queryKey: ["available-credit-sidebar"],
    queryFn: async () => {
      const workspaceId = localStorage.getItem("workspace_id");
      if (!workspaceId) {
        return null;
      }

      const res = await getAvailableCredit(Number(workspaceId));
      return res;
    },
  });

  const closeModal = () => {
    setIsChecked(false);
    setNewWorkSpaceName("");
    // setWorkspaceName("")
    setCreditError("");
    setErrorMessage("");
    setWorkSuccess(false);
    setCreateWork(false);
  };
  const resetCampaign = () => {
    setObjective(null); // Reset objective to null
    setChannelsArray([]); // Reset channelsArray to an empty array
    setGoalId(null); // Reset goalId to null
    setGoalData(null); // Reset goalData to null
    setSubTopic(null); // Reset subTopic to null
    setOptionValue({}); // Reset optionValue to an empty object
    setChannelIdArray([]); // Reset channelIdArray to an empty array
  };
  const newWorkspace = () => {
    if (newWorkSpaceName.length > 15) {
      setErrorMessage("Name should only have 15 or less character.");
    } else {
      let payload = {
        name: newWorkSpaceName,
        description: "",
        credit_limit: Number(newWorkSpaceCredit),
      };
      mutatenewWorkspace.mutate(payload, {
        onSuccess: (response) => {
          localStorage.setItem("workspace_id", response?.workspace?.id);
          localStorage.setItem(
            "workspace_name",
            response?.workspace?.workspaceSlug,
          );
          setWorkspaceName(response?.workspace?.workspaceSlug);

          const existingWorkspaces =
            JSON.parse(localStorage.getItem("WorkspaceArray")) || [];

          const newWorkspaceName = response?.workspace?.name;
          const newWorkspaceSlug = response?.workspace?.workspaceSlug;
          if (
            newWorkspaceName &&
            !existingWorkspaces.includes(newWorkspaceName)
          ) {
            existingWorkspaces.push(newWorkspaceName);
          }

          localStorage.setItem(
            "WorkspaceArray",
            JSON.stringify(existingWorkspaces),
          );

          const existingWorkspacesSlug =
            JSON.parse(localStorage.getItem("WorkspaceArrayslug")) || [];
          if (
            newWorkspaceSlug &&
            !existingWorkspacesSlug.includes(newWorkspaceSlug)
          ) {
            existingWorkspacesSlug.push(newWorkspaceSlug);
          }

          localStorage.setItem(
            "WorkspaceArrayslug",
            JSON.stringify(existingWorkspacesSlug),
          );

          // Verify that the values have been updated successfully
          const updatedWorkspaceName = localStorage.getItem("workspace_name");
          const updatedWorkspaceId = localStorage.getItem("workspace_id");

          if (
            updatedWorkspaceName == response?.workspace?.workspaceSlug &&
            updatedWorkspaceId == response?.workspace?.id
          ) {
            // Proceed to route using the updated values
            router.push(
              `/apphome/${updatedWorkspaceName}/onboarding-new?isNewWorkspace=true`,
            );
            sessionStorage.removeItem("brandid");
          }
        },
        onError: (error) => {
          console.log(error?.response?.data?.message);
          if (error?.response?.data?.message) {
            setErrorMessage(error?.response?.data?.message);
          } else {
            setErrorMessage("Some error occured.");
          }
        },
      });
    }
  };

  function handleWorkspaceClick(workspaceId, workspaceName) {
    localStorage.setItem("workspace_id", workspaceId);
    localStorage.setItem("workspace_name", workspaceName);
    setWorkspaceName(workspaceName);
  }

  useEffect(() => {
    const storedWorkspaceName = localStorage.getItem("workspace_name");
    if (storedWorkspaceName) {
      setWorkspaceName(storedWorkspaceName);
    }
  }, []);

  const toggleNav = () => {
    setOpen(!open);
  };

  const { data: workspaceDetails, refetch } = useQuery({
    queryKey: ["workspaceDetails"],
    queryFn: getWorkSapceDetails,
  });

  const queryuserinfo = useQuery({
    queryKey: ["user-details"],
    queryFn: getUserProfileData,
  });

  useEffect(() => {
    if (queryuserinfo.isSuccess) {
      if (!queryuserinfo?.data?.artistProfile?.email) {
        cookie.set("notverifieduser", "true", {
          expires: 600, // expires in 600 days
          path: "/", // available on all pages
          secure: true, // set secure flag (optional)
        });
      } else {
        cookie.remove("notverifieduser");
      }
    }
  }, [queryuserinfo.isSuccess]);

  const mutateinvite = useMutation({
    mutationKey: ["profile-email-Check"],
    mutationFn: getUserProfileData,
  });

  const setCreateWorkSpace = () => {
    const hasCookie = cookie.get("notverifieduser");
    if (hasCookie) {
      setfirsttimepopup(true);
      mutateinvite.mutate(
        {},
        {
          onSuccess: (response) => {
            if (response?.artistProfile?.email === null) {
              setfirsttimepopup(true);
            } else {
              setWorkSpaceMenu(false);
              setCreateWork(true);
              cookie.remove("notverifieduser");
            }
          },
          onError: (error) => {
            console.error(error);
          },
        },
      );
    } else {
      // checkEmailExisted();
      setWorkSpaceMenu(false);
      setCreateWork(true);
    }
  };
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleNewName = (e) => {
    const newName = e.target.value;
    setNewWorkSpaceName(newName);
    if (newName.trim() === "") {
      setErrorMessage("Workspace name cannot be empty");
      return;
    }
    const alphanumericRegex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
    if (!alphanumericRegex.test(newName) || newName === ".") {
      setErrorMessage(
        "Workspace name cannot contain special characters or be just a dot, or have leading/trailing spaces",
      );
      return;
    }
    setErrorMessage("");
  };

  const handleNewCredit = (e) => {
    if (!isNaN(e.target.value)) {
      if (e.target.value <= availableCredit?.availableCredits) {
        setCreditError(false);
        setnewWorkSpaceCredit(e.target.value);
      } else {
        setnewWorkSpaceCredit(e.target.value);
        setCreditError(true);
      }
    }
  };

  const NextButtonEmailVerification = () => {
    const valid = /^\S+@\S+\.\S+$/.test(emailverivication);
    if (valid) {
      const data = {
        email: emailverivication,
      };
      mutatemailsend.mutate(data, {
        onSuccess: (response) => {
          console.log(response);
          setfirsttimepopup(false);
          setfirsttimepopup2(true);
        },
        onError: (error) => {
          console.error(error);
          setemailexisted(true);
        },
      });
    } else {
      setvaliditycheck(true);
    }
  };
  const continueToVerification = () => {
    setfirsttimepopup2(false);
  };
  const emailverificationsubmit = (e) => {
    e.preventDefault();
    setemailverivication(e.target.value);
    setvaliditycheck(false);
    setemailexisted(false);
  };
  const skipverification = () => {
    setfirsttimepopup(false);
    setfirsttimepopup2(false);
  };
  const backverification = () => {
    setfirsttimepopup(true);
    setfirsttimepopup2(false);
  };
  return (
    <>
      <div
        className={`transition-[width] duration-500 bg-[#23145A] relative h-[100vh] sidebar_parent_container hidden md:block w-[70px] xl:w-[87px]`}
      >
        <div
          className={
            "inline-flex flex-col w-full px-5   pb-0 relative group z-10 transition-all ease-in duration-1000 items-center"
          }
        >
          <div
            className={` h-20 mb-1 cursor-pointer flex flex-row items-center text-white     `}
          >
            <Link href={`/apphome/${workspaceName}/dashboard`}>
              <div className="flex items-center">
                <img
                  src="/webapplogo.png"
                  alt="Profile"
                  loading="lazy"
                  className=" w-[33px] h-auto xl:w-[41px] "
                />
              </div>
            </Link>

            {/* <div className="flex items-center">
              {queryuserinfo.isPending || queryuserinfo.isError ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11.9969 11.6921C11.1344 11.6921 10.4021 11.3911 9.8 10.789C9.19792 10.1869 8.89688 9.45465 8.89688 8.59216C8.89688 7.72966 9.19792 6.99738 9.8 6.39531C10.4021 5.79323 11.1344 5.49219 11.9969 5.49219C12.8593 5.49219 13.5916 5.79323 14.1937 6.39531C14.7958 6.99738 15.0968 7.72966 15.0968 8.59216C15.0968 9.45465 14.7958 10.1869 14.1937 10.789C13.5916 11.3911 12.8593 11.6921 11.9969 11.6921ZM5.29688 18.5075V16.6844C5.29688 16.378 5.38822 16.0829 5.57092 15.7989C5.75361 15.5149 6.00905 15.2691 6.33725 15.0614C7.20905 14.5601 8.12527 14.1758 9.0859 13.9085C10.0465 13.6412 11.0151 13.5076 11.9916 13.5076C12.9682 13.5076 13.9385 13.6412 14.9026 13.9085C15.8667 14.1758 16.7846 14.5601 17.6564 15.0614C17.9846 15.2524 18.2401 15.4941 18.4228 15.7864C18.6055 16.0787 18.6968 16.378 18.6968 16.6844V18.5075H5.29688ZM6.59685 17.2075H17.3968V16.6844C17.3968 16.5789 17.3588 16.4797 17.2827 16.3866C17.2067 16.2936 17.1018 16.2147 16.968 16.1498C16.2398 15.7088 15.453 15.3748 14.6075 15.1479C13.7621 14.921 12.8919 14.8075 11.9969 14.8075C11.1018 14.8075 10.2316 14.921 9.38615 15.1479C8.54072 15.3748 7.7539 15.7088 7.0257 16.1498C6.89108 16.2421 6.78596 16.3305 6.71032 16.415C6.63467 16.4996 6.59685 16.5894 6.59685 16.6844V17.2075ZM12.0022 10.3922C12.4986 10.3922 12.9218 10.2154 13.2719 9.86184C13.6219 9.5083 13.7969 9.0833 13.7969 8.58684C13.7969 8.09039 13.6201 7.66716 13.2666 7.31716C12.913 6.96716 12.488 6.79216 11.9915 6.79216C11.4951 6.79216 11.0718 6.96893 10.7218 7.32246C10.3719 7.67601 10.1968 8.10101 10.1968 8.59746C10.1968 9.09393 10.3736 9.51716 10.7271 9.86716C11.0807 10.2172 11.5057 10.3922 12.0022 10.3922Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <img
                  src={queryuserinfo?.data?.artistProfile?.profilePic}
                  alt="Profile"
                  className="rounded-full w-[35px] h-[35px] object-contain border border-white/20"
                />
              )}
            </div> */}
          </div>

          {/* <div
            className={` mb-[17px] group-[.is-opened]:inline-block text-nyx-yellow  text-xs overflow-hidden ${open ? "w-auto pl-[21px] duration-500" : "w-auto pl-[0px] duration-500"}`}
          >
            <InviteUser open={open} />
          </div> */}

          <div className="relative group/button">
            <Link href={`/apphome/${workspaceName}/dashboard`}>
              <div
                onClick={() => setSelectedMenuItem("Home")}
                className={`flex flex-col xl:h-[70px] h-[49px]  w-[70px] xl:w-[87px]   justify-center  items-center cursor-pointer group/item text-white 
                 hover:text-nyx-yellow hover:bg-nyx-new-blue ${selectedMenuItem === "Home" && !pathname.includes("admanager") ? "bg-nyx-new-blue" : ""}`}
              >
                <NewHomeIcon
                  className={`xl:w-7  w-6 h-6 xl:h-7 mx-auto  text-white group-hover/item:text-nyx-yellow ${selectedMenuItem === "Home" && !pathname.includes("admanager") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
                />
                <span
                  className={`xl:text-[11px] text-[9px] leading-[8px] xl:leading-3  font-medium group-hover/item:text-nyx-yellow ${selectedMenuItem === "Home" && !pathname.includes("admanager") ? "bg-nyx-new-blue font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                >
                  Home
                </span>
              </div>
            </Link>
          </div>

          {/* <div className="relative group/button">
            <Link
              href={
                brandId
                  ? `/apphome/${workspaceName}/onboarding-new?brandid=${brandId}`
                  : `/apphome/${workspaceName}/onboarding-new`
              }
            >
              <div
                onClick={() => setSelectedMenuItem("Your Brand")}
                className={` flex flex-col  xl:h-[70px] h-[49px]  w-[70px] xl:w-[87px]  justify-center items-center cursor-pointer group/item text-white 
                 hover:text-nyx-yellow hover:bg-nyx-new-blue  ${selectedMenuItem === "Your Brand" || pathname.includes("onboarding-new") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
              >
                <OnbordingIcon
                  className={`xl:w-7  w-6 h-6 xl:h-7 mx-auto  text-white group-hover/item:text-nyx-yellow ${selectedMenuItem === "Your Brand" || pathname.includes("onboarding-new") ? "text-nyx-yellow" : ""}`}
                />
                <span
                  className={`xl:text-[11px] text-[9px] leading-[8px] xl:leading-3  font-medium group-hover/item:text-nyx-yellow ${selectedMenuItem === "Your Brand" || pathname.includes("onboarding-new") ? "font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                >
                  My Brand
                </span>
              </div>
            </Link>
          </div> */}

          {/* <div className="relative group/button">
            <Link href={`/apphome/${workspaceName}/assets`}>
              <div
                onClick={() => setSelectedMenuItem("Recent Project")}
                className={` flex flex-col  h-[70px]  w-[87px]   justify-center  items-center cursor-pointer group/item text-white 
                 hover:text-nyx-yellow hover:bg-nyx-new-blue ${open ? "pl-[41px]" : ""} ${selectedMenuItem === "Recent Project" ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
              >
                <RecentProjectIcon
                  className={`w-7 h-7 ml-[-5px]   text-white group-hover/item:text-nyx-yellow ${selectedMenuItem === "Recent Project" ? "text-nyx-yellow" : ""}`}
                />
                <span
                  className={`text-[11px] leading-3 font-medium  group-hover/item:text-nyx-yellow ${selectedMenuItem === "Recent Project" ? "font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                >
                  My Projects
                </span>
              </div>
            </Link>
          </div> */}

          <div className="relative group/button">
            <Link href={`/apphome/${workspaceName}/assets`}>
              <div
                onClick={() => setSelectedMenuItem("Assets")}
                className={` flex flex-col xl:h-[70px] h-[49px]  w-[70px] xl:w-[87px]    justify-center items-center cursor-pointer group/item text-white 
                 hover:text-nyx-yellow hover:bg-nyx-new-blue  ${selectedMenuItem === "Assets" || pathname.includes("assets") || pathname.includes("assets-files") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
              >
                <AssetsIcon
                  className={`xl:w-7  w-6 h-6 xl:h-7 ml-[1px]  text-white group-hover/item:text-nyx-yellow ${selectedMenuItem === "Assets" || pathname.includes("assets") || pathname.includes("assets-files") ? "text-nyx-yellow" : ""}`}
                />
                <span
                  className={`text-[9px] xl:text-[11px] leading-3 font-medium group-hover/item:text-nyx-yellow ${selectedMenuItem === "Assets" || pathname.includes("assets") || pathname.includes("assets-files") ? "font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                >
                  Assets
                </span>
              </div>
            </Link>
          </div>

          <div className="relative group/button">
            <Link href={`/apphome/${workspaceName}/platform-integration`}>
              <div
                onClick={() => setSelectedMenuItem("Integrations")}
                className={`  flex flex-col  xl:h-[70px] h-[49px]  w-[70px] xl:w-[87px]   justify-center items-center cursor-pointer group/item text-white 
                 hover:text-nyx-yellow hover:bg-nyx-new-blue  ${selectedMenuItem === "Integrations" || pathname.includes("platform-integration") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
              >
                <IntegrationsIcon
                  className={`xl:w-7  w-6 h-6 xl:h-7 ml-[-7px]  text-white group-hover/item:text-nyx-yellow  ${selectedMenuItem === "Integrations" || pathname.includes("platform-integration") ? "text-nyx-yellow" : ""}`}
                />
                <span
                  className={`xl:text-[11px] text-[9px] leading-[8px] xl:leading-3  font-medium  group-hover/item:text-nyx-yellow ${selectedMenuItem === "Integrations" || pathname.includes("platform-integration") ? "font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                >
                  Integrations
                </span>
              </div>
            </Link>
          </div>

          <div className="relative group/button">
            <div>
              <div
                // onClick={() => setSelectedMenuItem("ImageCraft AI")}
                className={` flex flex-col  xl:h-[70px] h-[49px]  w-[70px] xl:w-[87px]   justify-center relative items-center cursor-pointer group/item text-white 
                 hover:text-nyx-yellow hover:bg-nyx-new-blue ${selectedMenuItem === "ImageCraft AI" || pathname.includes("image-craft-ai") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
              >
                <BrandVisionAIIcon
                  className={`xl:w-7  w-6 h-6 xl:h-7 ml-[2px]  text-white group-hover/item:text-nyx-yellow  ${selectedMenuItem === "ImageCraft AI" || pathname.includes("image-craft-ai") ? "text-nyx-yellow" : ""}`}
                />
                <span
                  className={`xl:text-[11px] text-[9px] leading-[8px] xl:leading-3 font-medium group-hover/item:text-nyx-yellow ${selectedMenuItem === "ImageCraft AI" || pathname.includes("image-craft-ai") ? "font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                >
                  ImageCraft AI
                </span>
                <div
                  className={`absolute    hidden group-hover/button:block z-[99] bg-[#2A1465] py-3 rounded-[10px] ${open ? "left-[200px] top-[-20px]" : "left-[60px] top-[-30px]"}`}
                >
                  <Link
                    href={`/apphome/${workspaceName}/image-craft-ai/text-to-image`}
                  >
                    <p className="h-[43px] text-[14px] font-medium leading-4 w-[270px] bg-[#2A1465] hover:bg-[#5E32FF] flex items-center pl-4 text-white">
                      Generate Image Ads
                    </p>
                  </Link>
                  <Link
                    href={`/apphome/${workspaceName}/image-craft-ai/image-to-image`}
                  >
                    <p className="h-[43px] text-[14px] font-medium leading-4 w-[270px] bg-[#2A1465] hover:bg-[#5E32FF] flex items-center pl-4 text-white  ">
                      Generate Product Photo-shoots
                    </p>
                  </Link>{" "}
                  <Link
                    href={`/apphome/${workspaceName}/image-craft-ai/ctr-prediction`}
                  >
                    <p className="h-[43px] text-[14px] font-medium leading-4 w-[270px] bg-[#2A1465] hover:bg-[#5E32FF] flex items-center pl-4 text-white">
                      Analyse Creative&apos;s Potential
                    </p>
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="relative group/button">
            <Link href={`/apphome/${workspaceName}/app-videovista-ai`}>
              <div
                onClick={() => setSelectedMenuItem("VideoVista AI")}
                className={` relative flex -mx-5 px-5 h-[52px] items-center cursor-pointer group/item text-white 
                 hover:text-nyx-yellow hover:bg-nyx-new-blue ${open ? "pl-[41px]" : ""} ${selectedMenuItem === "VideoVista AI" || pathname.includes("video-vista-ai") || pathname.includes("brand-canvas") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
              >
                <VideoVistaAIIcon
                  className={`w-7 h-7 mx-auto group-[.is-opened]:mx-0 text-white group-hover/item:text-nyx-yellow ${selectedMenuItem === "VideoVista AI" || pathname.includes("video-vista-ai") || pathname.includes("brand-canvas") ? "text-nyx-yellow" : ""}`}
                />
                <span
                  className={`group-[.is-opened]:inline-block ml-2 overflow-hidden ${open ? "w-auto py-2 duration-500" : "w-0"} ${selectedMenuItem === "VideoVista AI" || pathname.includes("video-vista-ai") || pathname.includes("brand-canvas") ? "text-nyx-yellow" : ""}`}
                >
                  VideoVista AI
                </span>
                <div
                  className={`absolute   hidden group-hover/button:block z-[99] bg-[#2A1465] py-3 rounded-[10px] ${open ? "left-[200px] top-[-20px]" : "left-[60px] top-[-30px]"}`}
                >
                  <Link href={`/apphome/${workspaceName}/image-craft-ai/text-to-image`}>
                    <p className="h-[43px] text-[14px] font-medium leading-4 w-[210px] bg-[#2A1465] hover:bg-[#5E32FF] flex items-center pl-4 text-white">
                      Video ai Video
                    </p>
                  </Link>
                  <Link href={`/apphome/${workspaceName}/image-craft-ai/text-to-image`}>
                    <p className="h-[43px] text-[14px] font-medium leading-4 w-[210px] bg-[#2A1465] hover:bg-[#5E32FF] flex items-center pl-4 text-white  ">
                      Video ai Video
                    </p>
                  </Link>{" "}
                  <Link href={`/apphome/${workspaceName}/image-craft-ai/text-to-image`}>
                    <p className="h-[43px] text-[14px] font-medium leading-4 w-[210px] bg-[#2A1465] hover:bg-[#5E32FF] flex items-center pl-4 text-white">
                      Video ai Video
                    </p>
                  </Link>{" "}
                  <Link href={`/apphome/${workspaceName}/image-craft-ai/text-to-image`}>
                    <p className="h-[43px] text-[14px] font-medium leading-4 w-[210px] bg-[#2A1465] hover:bg-[#5E32FF] flex items-center pl-4 text-white">
                      Video ai Video
                    </p>
                  </Link>
                </div>
              </div>
            </Link>

            <div
              className={`absolute bottom-2 text-center text-[#FFFFFF] bg-black text-sm w-max py-1 px-2 rounded-md z-40 left-10 ${open ? "hidden" : "hidden group-hover/button:block"}`}
            >
              VideoVista AI
            </div>
          </div> */}

          <div className="relative group/button">
            <Link href={`/apphome/${workspaceName}/video-vista-ai/text-to-video`}>
              <div
                onClick={() => setSelectedMenuItem("Text2Video")}
                className={` flex flex-col xl:h-[70px] h-[49px]  w-[70px] xl:w-[87px]    justify-center items-center cursor-pointer group/item text-white 
                 hover:text-nyx-yellow hover:bg-nyx-new-blue  ${selectedMenuItem === "Text2Video" || pathname.includes("text-to-video") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
              >
                <VideoVistaAIIcon
                  className={`xl:w-7  w-6 h-6 xl:h-7 ml-[1px]  text-white group-hover/item:text-nyx-yellow ${selectedMenuItem === "Text2Video" || pathname.includes("text-to-video") ? "text-nyx-yellow" : ""}`}
                />
                <span
                  className={`text-[9px] xl:text-[11px] leading-3 font-medium group-hover/item:text-nyx-yellow ${selectedMenuItem === "Text2Video" || pathname.includes("text-to-video") ? "font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                >
                  VideoVista AI
                </span>
              </div>
            </Link>
          </div>

          <div className="relative group/button">
            <div>
              <div
                onClick={() => setSelectedMenuItem("Campulse AI")}
                className={`flex flex-col  xl:h-[70px] h-[49px]  w-[70px] xl:w-[87px]   justify-center items-center cursor-pointer group/item text-white 
                hover:text-nyx-yellow hover:bg-nyx-new-blue ${pathname.includes("admanager") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
              >
                <CampulseIcon
                  className={`xl:w-7  w-6 h-6 xl:h-7 mx-auto  text-white group-hover/item:text-nyx-yellow ${pathname.includes("admanager") ? "text-nyx-yellow" : ""}`}
                />

                <span
                  className={`xl:text-[11px] text-[9px] leading-[8px] xl:leading-3 font-medium  group-hover/item:text-nyx-yellow ${pathname.includes("admanager") ? "font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                >
                  CamPulse AI
                </span>
                <div
                  className={`absolute   hidden group-hover/button:block z-[99] bg-[#2A1465] py-3 rounded-[10px] ${open ? "left-[200px] top-[-40px]" : "left-[60px] top-[-40px]"}`}
                >
                  <Link
                    href={`/apphome/${workspaceName}/admanager/brand-details`}
                  >
                    <p
                      className="h-[43px] text-[14px] font-medium leading-4 w-[270px] bg-[#2A1465] hover:bg-[#5E32FF] flex items-center pl-4 text-white"
                      onClick={resetCampaign}
                    >
                      Launch Multi-Channel Campaigns
                    </p>
                  </Link>
                  <Link
                    href={`/apphome/${workspaceName}/admanager/dashboard?view=graph`}
                  >
                    <p className="h-[43px] text-[14px] font-medium leading-4 w-[270px] bg-[#2A1465] hover:bg-[#5E32FF] flex items-center pl-4 text-white  ">
                      {/* Monitor and Optimize Campaign */}
                      Launch and Optimize Campaigns
                    </p>
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* Agents  */}
          <div className="relative group/button">
            <Link href={`/apphome/${workspaceName}/agents#/ai-workflows`}>
              <div
                onClick={() => {
                  setSelectedMenuItem("Campulse AI")
                  window.open(`/apphome/${workspaceName}/agents#/ai-workflows`, "_self")
                }}
                className={` flex flex-col xl:h-[70px] h-[49px]  w-[70px] xl:w-[87px]    justify-center items-center cursor-pointer group/item text-white 
     hover:text-nyx-yellow hover:bg-nyx-new-blue  ${selectedMenuItem === "Agents" || pathname.includes("agents") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
              >
                <AgentsIcon
                  className={`xl:w-7  w-6 h-6 xl:h-7 ml-[1px]  text-white group-hover/item:text-nyx-yellow ${selectedMenuItem === "Agents" || pathname.includes("agents") ? "text-nyx-yellow" : ""}`}
                />
                <span
                  className={`text-[9px] xl:text-[11px] leading-3 font-medium group-hover/item:text-nyx-yellow ${selectedMenuItem === "Agents" || pathname.includes("agents") ? "font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                >
                  Agents
                </span>
              </div>
            </Link>

          </div>

          {process.env.NEXT_PUBLIC_ENVIRONMENT === "test" ? (
            <div className="relative group/button">
              <Link href={`/apphome/${workspaceName}/product-catalogue`}>
                <div
                  onClick={() => setSelectedMenuItem("Catalogue")}
                  className={` flex flex-col xl:h-[70px] h-[49px]  w-[70px] xl:w-[87px]    justify-center items-center cursor-pointer group/item text-white 
                 hover:text-nyx-yellow hover:bg-nyx-new-blue  ${selectedMenuItem === "Catalogue" || pathname.includes("product-catalogue") ? "bg-nyx-new-blue text-nyx-yellow" : ""}`}
                >
                  <CatalogueIcon
                    className={`xl:w-5  w-5 h-5 xl:h-5 ml-[1px]  text-white group-hover/item:text-nyx-yellow ${selectedMenuItem === "Catalogue" || pathname.includes("product-catalogue") ? "text-nyx-yellow" : ""}`}
                  />
                  <span
                    className={`text-[9px] xl:text-[11px] leading-3 font-medium group-hover/item:text-nyx-yellow ${selectedMenuItem === "Catalogue" || pathname.includes("product-catalogue") ? "font-extrabold text-nyx-yellow" : " text-[#FEFEFECC]"}`}
                  >
                    Catalogue
                  </span>
                </div>
              </Link>
            </div>
          ) : null}
        </div>
        {open ? (
          <div
            className="h-[105px] text-center px-[24px] pt-[12px]  bg-[#28134B]  w-full sidebar_bottom_element "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex justify-between  mb-4 mt-2">
              <p className="text-white text-[14px] font-medium">
                {queryuserinfo?.data?.artistProfile?.packageName}
              </p>

              {userDetailsRole?.workspace?.userRole == "OWNER" && (
                <>
                  <Link
                    href={`/apphome/${workspaceName}/settings/plans`}
                    className=""
                  >
                    <span className="font-normal flex items-center gap-[10px]">
                      <svg
                        width="9"
                        height="14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 14v-1.75h9V14H0Zm3.6-3.5V3.347L1.26 5.6 0 4.375 4.5 0 9 4.375 7.74 5.6 5.4 3.347V10.5H3.6Z"
                          fill="#FFCB54"
                        />
                      </svg>
                      <p className="text-nyx-yellow text-[12px] font-medium">
                        Upgrade
                      </p>
                    </span>
                  </Link>
                </>
              )}
            </div>
            <CustomSlider
              isHovered={isHovered}
              roles={userDetailsRole?.workspace?.userRole}
            />
          </div>
        ) : (
          <div className="h-[105px] text-center  flex items-center justify-center  bg-[#23145A]  w-full sidebar_bottom_element">
            {userDetailsRole?.workspace?.userRole == "OWNER" && (
              <>
                {/* <Link href={`/apphome/${workspaceName}/settings/plans`}>
                  <Image
                    src={upArrowClose}
                    width={32}
                    height={32}
                    alt="upArrow"
                    className="pt-[26px]"
                  />
                </Link> */}
                <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/help`}>
                  <div
                    className=" rounded-full  hover:bg-nyx-yellow  z-50"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {" "}
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 41 41"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.296 24.928C18.296 24.096 18.4347 23.3707 18.712 22.752C18.9893 22.1333 19.3307 21.5787 19.736 21.088C20.1627 20.5973 20.6213 20.1493 21.112 19.744C21.6027 19.3173 22.0613 18.9013 22.488 18.496C22.9147 18.0693 23.256 17.6213 23.512 17.152C23.7893 16.6827 23.928 16.1387 23.928 15.52C23.928 14.496 23.5227 13.664 22.712 13.024C21.9013 12.384 20.7813 12.064 19.352 12.064C18.072 12.064 16.9627 12.2773 16.024 12.704C15.0853 13.1307 14.2853 13.76 13.624 14.592L11.288 12.928C12.184 11.7973 13.3253 10.9227 14.712 10.304C16.0987 9.664 17.72 9.344 19.576 9.344C21.112 9.344 22.4453 9.57867 23.576 10.048C24.7067 10.496 25.5813 11.1467 26.2 12C26.84 12.832 27.16 13.8453 27.16 15.04C27.16 15.936 27.0213 16.704 26.744 17.344C26.4667 17.984 26.1147 18.5493 25.688 19.04C25.2613 19.5307 24.8027 19.9893 24.312 20.416C23.8427 20.8427 23.3947 21.2693 22.968 21.696C22.5413 22.1227 22.1893 22.592 21.912 23.104C21.6347 23.616 21.496 24.224 21.496 24.928H18.296ZM19.928 32.192C19.3307 32.192 18.8293 31.9893 18.424 31.584C18.04 31.1787 17.848 30.6987 17.848 30.144C17.848 29.5467 18.04 29.056 18.424 28.672C18.8293 28.288 19.3307 28.096 19.928 28.096C20.5253 28.096 21.016 28.288 21.4 28.672C21.784 29.056 21.976 29.5467 21.976 30.144C21.976 30.6987 21.784 31.1787 21.4 31.584C21.016 31.9893 20.5253 32.192 19.928 32.192Z"
                        fill={isHovered ? "black" : "white"}
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="40"
                        height="40"
                        rx="20"
                        stroke="#FFCB54"
                      />
                    </svg>
                  </div>
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {workSpaceMenu ? (
        <Modal
          isOpen={workSpaceMenu}
          style={workSpaceMenustyle}
          onRequestClose={() => setWorkSpaceMenu(false)}
          ariaHideApp={false}
        >
          <div className="p-4 ">
            <div className="text-white mb-4 ">
              {queryuserinfo?.data?.artistProfile?.email}
            </div>
            <div className="max-h-[160px] overflow-y-auto mb-2">
              {workspaceDetails?.workspaces.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center text-white gap-3 mb-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white"></div>
                  <div className="">
                    <div className="flex flex-col items-center justify-center">
                      <div
                        onClick={() =>
                          handleWorkspaceClick(
                            item.workspaceId,
                            item.workspaceSlug,
                          )
                        }
                        className={`cursor-pointer ${localStorage.getItem("workspace_id") == item.workspaceId ? "text-nyx-yellow" : "text-white"}`}
                      >
                        {/* <Link href={`/apphome/${workspaceName}/dashboard`}> */}
                        <div
                          onClick={() => {
                            router.push(
                              `/apphome/${item.workspaceSlug}/dashboard`,
                            );
                          }}
                        >
                          {item.workspaceName}
                        </div>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-2  mt-4 justify-center cursor-pointer">
              <span
                className=" text-white rounded-full text-sm  font-medium"
                onClick={setCreateWorkSpace}
              >
                <div className="flex flex-row gap-2 items-center">
                  <div>
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.031 8a.843.843 0 0 1-.844.844H8.845v5.344a.844.844 0 1 1-1.688 0V8.843H1.813a.844.844 0 0 1 0-1.688h5.343V1.813a.844.844 0 1 1 1.688 0v5.343h5.344A.844.844 0 0 1 15.03 8Z"
                        fill="#fff"
                      />
                    </svg>
                  </div>
                  <div>Add new</div>
                </div>
              </span>
            </div>
          </div>

          <hr className="mx-auto w-[85%]"></hr>

          <div className="p-4 text-white flex flex-col gap-3 ">
            <Link
              href={`/apphome/${workspaceName}/settings/usermanagement`}
              className=" cursor-pointer"
            // onClick={sendToSettings}
            >
              Your workspace
            </Link>
            <Link
              href={`/apphome/${workspaceName}/settings/plans`}
              className=" cursor-pointer"
            // onClick={sendToSettings}
            >
              Plans
            </Link>
            <Link
              href={`/apphome/${workspaceName}/settings/billing`}
              className=" cursor-pointer"
            // onClick={sendToSettings}
            >
              Billing
            </Link>
            <Link
              href={`/apphome/${workspaceName}/settings/workspaces`}
              className=" cursor-pointer"
            // onClick={sendToSettings}
            >
              Workspaces
            </Link>
          </div>
        </Modal>
      ) : null}

      {createWork ? (
        <Modal
          isOpen={createWork}
          style={createWorkSpaceStyle}
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          {workSuccess ? (
            <>
              <div className="relative h-[429px] flex flex-col items-center justify-center text-[24px] font-bold text-white">
                <div className="mb-4 absolute top-12">
                  <WorkspaceCreated />
                </div>
                <div className="text-center">
                  <p>
                    Workspace is <br /> created successfully!
                  </p>
                </div>
                <div>
                  <Button
                    className="absolute left-[360px] bottom-12 rounded-full bg-nyx-yellow text-black font-semibold"
                    onClick={closeModal}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-white p-4">
                <div className="flex flex-col justify-center items-center mb-4">
                  {/* <div className=" text-[24px] font-bold leading-[30px] mb-2 mt-4">
                    {setWorkSuccess && <p>Workspace created successfully!</p>}
                  </div> */}
                  <div className="px-4 text-center w-[400px] font-normal text-[16px]">
                    Your workspace is where you create assets, manage billing,
                    and collaborate.
                  </div>
                </div>

                <div className="px-20">
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                    <p className="font-semibold py-2">Workspace Name</p>
                    <input
                      type="text"
                      id="workspacename"
                      value={newWorkSpaceName}
                      onChange={handleNewName}
                      className={`w-full bg-transparent border focus:outline-none rounded-md p-2 font-normal"
                      placeholder="Full Name ${newWorkSpaceName.length > 15 || errorMessage != "" ? "  border-nyx-red" : "border-[#8297BD]"} `}
                    />
                    {newWorkSpaceName.length > 15 ? (
                      <p className="text-nyx-red text-sm mt-1">
                        Name should only have 15 or less characters.
                      </p>
                    ) : (
                      errorMessage && (
                        <p className="text-nyx-red text-sm mt-1">
                          {errorMessage}
                        </p>
                      )
                    )}
                  </div>

                  <div className="text-sm font-bold leading-10">
                    Credit Limit
                  </div>
                  <div className="flex flex-row gap-2 ">
                    <div
                      className={` font-light ${isChecked == false ? "text-nyx-yellow" : "text-white"}`}
                    >
                      No
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer mt-[2px]">
                        <input
                          type="checkbox"
                          id="creditlimit"
                          // value=""
                          className="sr-only peer"
                          checked={isChecked}
                          onChange={handleToggle}
                        />
                        <div className="relative w-9 h-5 bg-transparent peer-focus:outline-none peer-focus:ring-4   rounded-full peer dark:bg-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  border-[1px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[2px] after:bg-nyx-yellow  after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-nyx-yellow dark:border-nyx-yellow peer-checked:bg-nyx-yellow peer-checked:after:bg-[#3B226F] "></div>
                      </label>
                    </div>
                    <div
                      className={`font-light ${isChecked ? "text-nyx-yellow" : "text-white"}`}
                    >
                      {" "}
                      Yes
                    </div>
                  </div>

                  {isChecked && (
                    <>
                      <div className="mt-3 mb-3">
                        <p className="font-semibold py-2">Usage Limit</p>
                        <input
                          type="text"
                          id="creditlimit"
                          value={newWorkSpaceCredit}
                          onChange={handleNewCredit}
                          className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                          placeholder="xxxxx"
                        />
                        {creditError && (
                          <p className="text-sm  font-semibold text-red-500 mt-1">
                            Exceeds available{" "}
                            {availableCredit?.availableCredits} credit limit
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-row justify-center gap-3 mt-6">
                  <Button
                    className="rounded-full  text-nyx-yellow font-semibold "
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="rounded-full bg-nyx-yellow text-black font-semibold disabled:bg-nyx-gray-1  disabled:border-none disabled:cursor-not-allowed w-44 disabled:shadow-none"
                    onClick={newWorkspace}
                    disabled={
                      creditError ||
                      newWorkSpaceName.length == 0 ||
                      newWorkSpaceName.trim() == "" ||
                      errorMessage != "" ||
                      newWorkSpaceName.length > 15
                    }
                  >
                    {mutatenewWorkspace.isPending
                      ? "loading..."
                      : "Create Workspace"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Modal>
      ) : null}
      {firsttimepopup ? (
        <Modal
          isOpen={firsttimepopup}
          style={onetimeemailverification}
        // onRequestClose={onLastClose}
        >
          <div className="w-[550px] h-[400px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[31px] font-[600] mt-8 text-[#FFF]">
                Enter your Email
              </h2>
              <p className="text-center text-[18px] font-[400] text-[#FFF]">
                to use Nyx products and workspace
              </p>
            </div>
            <p className="text-white flex justify-center items-center text-[12px] mt-5">
              Use your organization email for extra rewards.
            </p>

            <div className="w-full h-full flex flex-col mt-1">
              <input
                type="text"
                className="w-full bg-transparent border text-white border-[#8297BD] text-[14px] rounded-md p-2 font-normal focus:placeholder-transparent"
                placeholder="email@gmail.com"
                value={emailverivication}
                onChange={emailverificationsubmit}
              />
              {validitycheck && (
                <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">
                  Please enter valid Email Address
                </p>
              )}
              {emailexisted && (
                <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">
                  Email Address is already in use
                </p>
              )}
            </div>
            <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
              <button
                className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
                onClick={skipverification}
              >
                <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                  <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
                    <div className="text-[14px] font-normal text-white ">
                      Skip
                    </div>
                  </span>
                </div>
              </button>
              <button
                type="submit"
                className={
                  false
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={NextButtonEmailVerification}
              >
                Verify
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {firsttimepopup2 ? (
        <Modal
          isOpen={firsttimepopup2}
          style={onetimeemailverification}
        // onRequestClose={onLastClose}
        >
          <div className="w-[550px] h-[400px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[31px] font-[600] mt-14 mb-8 text-[#FFF]">
                Thank you
              </h2>
              <p className="font-semibold  text-[14px] text-[#FFFFFF] flex justify-center items-center">
                A verification mail has been sent to your mail box.
              </p>
              <p className="font-semibold mb-2 mt-[-5px] text-[14px] text-[#FFFFFF] flex justify-center items-center">
                Kindly click on the given link
              </p>
            </div>
            <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
              <button
                className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
                onClick={backverification}
              >
                <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                  <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
                    <div className="text-[14px] font-normal text-white ">
                      Back
                    </div>
                  </span>
                </div>
              </button>
              <button
                type="submit"
                className={
                  false
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={continueToVerification}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Sidebar;