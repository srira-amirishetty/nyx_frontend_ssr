/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getUserProfileData } from "@nyx-frontend/main/services/uploadService";
import { useQuery, useMutation } from "@tanstack/react-query";
import SettingTwoIcon from "@nyx-frontend/main/components/Icons/SettingTwoIcon";
import LogOutNewIcon from "@nyx-frontend/main/components/Icons/LogOutNewIcon";
import PlansIcon from "@nyx-frontend/main/components/Icons/PlansIcon";
import BillingIcon from "@nyx-frontend/main/components/Icons/BillingIcon";
import EditIcon from "@nyx-frontend/main/components/Icons/EditIcon";
import CustomSlider from "@nyx-frontend/main/components/CustomSlider";
import useWorkspace from "@nyx-frontend/main/hooks/useWorkspace";
import { getWorkspaceDetailsById } from "@nyx-frontend/main/services/workSpace";
import Modal from "react-modal";
import {
  workSpaceMenustyle,
  createWorkSpaceStyle,
  onetimeemailverification,
} from "@nyx-frontend/main/utils/modalstyles";
import {
  newWorkSapce,
  getWorkSapceDetails,
  getAvailableCredit,
} from "@nyx-frontend/main/services/workSpace";
import cookie from "cookiejs";
import { useRouter, usePathname, useParams } from "next/navigation";
import WorkspaceCreated from "./Icons/WorkspaceCreated";
import Button from "./Button";
import { sendEmailVerification } from "@nyx-frontend/main/services/loginService";
import InviteUser from "@nyx-frontend/main/app/apphome/[workspace]/settings/_components/InviteUser";

const Profileicon = ({ position = 'absolute' }) => {
  const { workspace: workspacename } = useWorkspace();
  const [workSpaceMenu, setWorkSpaceMenu] = useState(false);

  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

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

  const mutatenewWorkspace = useMutation({
    mutationKey: ["new-workspace"],
    mutationFn: newWorkSapce,
  });
  const mutatemailsend = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: sendEmailVerification,
  });

  const queryuserinfo = useQuery({
    queryKey: ["user-details"],
    queryFn: getUserProfileData,
  });

  const { data: availableCredit } = useQuery({
    queryKey: ["available-credit"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
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

  const { data: workspaceDetails, refetch } = useQuery({
    queryKey: ["workspaceDetails"],
    queryFn: getWorkSapceDetails,
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
        }
      );
    } else {
      // checkEmailExisted();
      setWorkSpaceMenu(false);
      setCreateWork(true);
    }
  };

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
            response?.workspace?.workspaceSlug
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
            JSON.stringify(existingWorkspaces)
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
            JSON.stringify(existingWorkspacesSlug)
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
              `/apphome/${updatedWorkspaceName}/onboarding-new?isNewWorkspace=true`
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
        "Workspace name cannot contain special characters or be just a dot, or have leading/trailing spaces"
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

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className={`flex items-center justify-end ${position === 'absolute' ? 'absolute top-3 right-3' : ''}`}>
        <div className="relative group flex items-center justify-center  cursor-pointer">
          {queryuserinfo.isPending || queryuserinfo.isError ? (
            <div className="rounded-[50%] w-[41px] h-[41px]">
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
            </div>
          ) : (
            <img
              src={queryuserinfo?.data?.artistProfile?.profilePic}
              alt="Profile"
              className="rounded-[50%] w-[41px] h-[41px] "
            />
          )}

          <div className="hidden group-hover:block bg-[#23145A] h-auto w-[320px] absolute top-[40px] right-0 rounded-[10px] z-[9999]">
            {" "}
            {queryuserinfo.isPending || queryuserinfo.isError ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="py-3 px-5"
              >
                <path
                  d="M11.9969 11.6921C11.1344 11.6921 10.4021 11.3911 9.8 10.789C9.19792 10.1869 8.89688 9.45465 8.89688 8.59216C8.89688 7.72966 9.19792 6.99738 9.8 6.39531C10.4021 5.79323 11.1344 5.49219 11.9969 5.49219C12.8593 5.49219 13.5916 5.79323 14.1937 6.39531C14.7958 6.99738 15.0968 7.72966 15.0968 8.59216C15.0968 9.45465 14.7958 10.1869 14.1937 10.789C13.5916 11.3911 12.8593 11.6921 11.9969 11.6921ZM5.29688 18.5075V16.6844C5.29688 16.378 5.38822 16.0829 5.57092 15.7989C5.75361 15.5149 6.00905 15.2691 6.33725 15.0614C7.20905 14.5601 8.12527 14.1758 9.0859 13.9085C10.0465 13.6412 11.0151 13.5076 11.9916 13.5076C12.9682 13.5076 13.9385 13.6412 14.9026 13.9085C15.8667 14.1758 16.7846 14.5601 17.6564 15.0614C17.9846 15.2524 18.2401 15.4941 18.4228 15.7864C18.6055 16.0787 18.6968 16.378 18.6968 16.6844V18.5075H5.29688ZM6.59685 17.2075H17.3968V16.6844C17.3968 16.5789 17.3588 16.4797 17.2827 16.3866C17.2067 16.2936 17.1018 16.2147 16.968 16.1498C16.2398 15.7088 15.453 15.3748 14.6075 15.1479C13.7621 14.921 12.8919 14.8075 11.9969 14.8075C11.1018 14.8075 10.2316 14.921 9.38615 15.1479C8.54072 15.3748 7.7539 15.7088 7.0257 16.1498C6.89108 16.2421 6.78596 16.3305 6.71032 16.415C6.63467 16.4996 6.59685 16.5894 6.59685 16.6844V17.2075ZM12.0022 10.3922C12.4986 10.3922 12.9218 10.2154 13.2719 9.86184C13.6219 9.5083 13.7969 9.0833 13.7969 8.58684C13.7969 8.09039 13.6201 7.66716 13.2666 7.31716C12.913 6.96716 12.488 6.79216 11.9915 6.79216C11.4951 6.79216 11.0718 6.96893 10.7218 7.32246C10.3719 7.67601 10.1968 8.10101 10.1968 8.59746C10.1968 9.09393 10.3736 9.51716 10.7271 9.86716C11.0807 10.2172 11.5057 10.3922 12.0022 10.3922Z"
                  fill="white"
                />
              </svg>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between flex-row-reverse px-4 pt-4">
                  <img
                    src={queryuserinfo?.data?.artistProfile?.profilePic}
                    alt="Profile"
                    className="rounded-full w-[41px] h-[41px]"
                  />
                  <div>
                    <h3 className="text-white text-[20px] font-[500]">
                      {queryuserinfo?.data?.artistProfile?.first_name}{" "}
                      {queryuserinfo?.data?.artistProfile?.last_name}{" "}
                    </h3>
                    <p className="text-white text-[14px] font-[400] w-[24ch] truncate cursor-default">
                      {queryuserinfo?.data?.artistProfile?.email}
                    </p>
                  </div>
                </div>
                <ul>
                  <Link href={`/apphome/${workspacename}/settings/profile`}>
                    <li className="hover:bg-[#5E32FF] px-4 h-[35px] flex items-center text-white hover:text-nyx-yellow">
                      <div className="flex flex-start gap-3 items-center">
                        <SettingTwoIcon className="w-[16px] h-[16px]" />
                        <p className="font-[500] text-[14px] cursor-pointer ">
                          Settings
                        </p>
                      </div>
                    </li>
                  </Link>
                  <Link href={`/apphome/${workspacename}/settings/plans`}>
                    <li className="hover:bg-[#5E32FF] px-4 h-[35px] flex items-center text-white hover:text-nyx-yellow">
                      <div className="flex flex-start gap-3 items-center">
                        <PlansIcon className="w-[16px] h-[16px]" />
                        <p className="font-[500] text-[14px] cursor-pointer ">
                          Plans
                        </p>
                      </div>
                    </li>
                  </Link>
                  <Link href={`/apphome/${workspacename}/settings/billing`}>
                    <li className="hover:bg-[#5E32FF] px-4 h-[35px] flex items-center text-white hover:text-nyx-yellow">
                      <div className="flex flex-start gap-3 items-center">
                        <BillingIcon className="w-[16px] h-[16px]" />
                        <p className="font-[500] text-[14px] cursor-pointer ">
                          Billing
                        </p>
                      </div>
                    </li>
                  </Link>
                  <Link href="/logout">
                    <li className="hover:bg-[#5E32FF] px-4 h-[35px] flex items-center text-white hover:text-nyx-yellow cursor-pointer">
                      <div className="flex flex-start gap-3 items-center">
                        <LogOutNewIcon className="w-[16px] h-[16px]" />
                        <p className="font-[500] text-[14px] cursor-pointer ">
                          Logout
                        </p>
                      </div>
                    </li>
                  </Link>
                </ul>
                <div className="w-full flex flex-col gap-2 bg-[#332270] rounded-b-[10px] p-4">
                  <div className="w-full flex">
                    <div className="w-full flex gap-3 items-center">
                      <div className="w-[26px] h-[26px] rounded-full bg-nyx-yellow text-black text-[10px] font-[500] flex justify-center items-center">
                        {(userDetailsRole?.workspace?.name ?? "")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div className="text-[15px] font-[500] text-[#FFFFFF]">
                        {userDetailsRole?.workspace?.name}
                      </div>
                      {/* <EditIcon className="w-[14px] h-[14px] text-white hover:text-nyx-yellow" /> */}
                      <Link
                        href={`/apphome/${workspacename}/settings/usermanagement`}
                      >
                        <EditIcon className="w-[14px] h-[14px] text-white " />
                      </Link>
                    </div>

                    <div className="flex gap-3 items-center">
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setWorkSpaceMenu(true)}
                      >
                        <path
                          d="M4 8.94118H18.6743L13.7829 4M19 13.0588H4.32569L9.21713 18"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <InviteUser open={open} />
                    </div>
                  </div>

                  <div className="w-full">
                    <CustomSlider
                      isHovered={true}
                      roles={userDetailsRole?.workspace?.userRole}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {workSpaceMenu ? (
        <Modal
          isOpen={workSpaceMenu}
          style={workSpaceMenustyle}
          onRequestClose={() => setWorkSpaceMenu(false)}
          ariaHideApp={false}
        >
          <div className="w-full">
            <div className="flex justify-between">
              <div className="text-base font-bold text-[#FFFFFF]">
                Switch Workspace
              </div>

              <div
                className="cursor-pointer"
                onClick={() => {
                  setWorkSpaceMenu(false);
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

            <div className="w-full h-[250px] flex flex-col gap-3 overflow-hidden overflow-y-auto my-2">
              {workspaceDetails?.workspaces && (workspaceDetails?.workspaces.sort((a, b) => a.workspaceName.localeCompare(b.workspaceName))).map((item, index) => (
                <div
                  key={index}
                  className="w-full flex items-center text-white hover:text-nyx-yellow gap-3 bg-[#2A1465] hover:bg-[#5E32FF] px-4 py-2 rounded-[10px]"
                  onClick={() =>
                    handleWorkspaceClick(item.workspaceId, item.workspaceSlug)
                  }
                >
                  <div className="w-9 h-9 rounded-full bg-nyx-yellow flex justify-center items-center text-black text-[12px] font-[500]">
                    {(item.workspaceName ?? "").slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div
                      onClick={() =>
                        handleWorkspaceClick(
                          item.workspaceId,
                          item.workspaceSlug
                        )
                      }
                      className={`cursor-pointer ${localStorage.getItem("workspace_id") == item.workspaceId
                        ? "text-nyx-yellow"
                        : ""
                        }`}
                    >
                      <div
                        onClick={() => {
                          router.push(
                            `/apphome/${item.workspaceSlug}/dashboard`
                          );
                        }}
                      >
                        {item.workspaceName}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full px-4 py-2 bg-[#2A1465] justify-center cursor-pointer rounded-[10px]">
              <span
                className=" text-white rounded-full text-sm  font-medium"
                onClick={setCreateWorkSpace}
              >
                <div className="flex flex-row gap-3 items-center">
                  <div className="w-9 h-9 rounded-full border-2 border-nyx-yellow flex justify-center items-center">
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.031 8a.843.843 0 0 1-.844.844H8.845v5.344a.844.844 0 1 1-1.688 0V8.843H1.813a.844.844 0 0 1 0-1.688h5.343V1.813a.844.844 0 1 1 1.688 0v5.343h5.344A.844.844 0 0 1 15.03 8Z"
                        fill="#f1bb2e"
                      />
                    </svg>
                  </div>
                  <div>Add new</div>
                </div>
              </span>
            </div>
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
              <div className="w-full text-white">
                <div className="w-full text-base font-[700] text-center">
                  Your workspace is where you create assets, manage billing, and
                  collaborate.
                </div>

                <div className="w-full mt-5">
                  <div className="w-full text-[#FFFFFF] text-sm font-[500]">
                    <p className="font-semibold py-2">Workspace Name</p>
                    <input
                      type="text"
                      id="workspacename"
                      value={newWorkSpaceName}
                      onChange={handleNewName}
                      className={`w-full bg-transparent border focus:outline-none rounded-md p-2 font-normal"
                      placeholder="Full Name ${newWorkSpaceName.length > 15 || errorMessage != ""
                          ? "  border-nyx-red"
                          : "border-[#8297BD]"
                        } `}
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
                      className={` font-light ${isChecked == false ? "text-nyx-yellow" : "text-white"
                        }`}
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
                      className={`font-light ${isChecked ? "text-nyx-yellow" : "text-white"
                        }`}
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

                <div className="flex gap-3 justify-center mt-5">
                  <Button
                    className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="text-sm font-semibold rounded-full bg-nyx-yellow text-black disabled:bg-nyx-gray-1 disabled:border-none disabled:cursor-not-allowed w-[197px] h-[36px] disabled:shadow-none"
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

export default Profileicon;
