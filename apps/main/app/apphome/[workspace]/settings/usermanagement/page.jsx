/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Button from "@nyx-frontend/main/components/Button";
import {
  getWorkspaceDetailsById,
  deleteUser,
  EditUserRole,
  getUser,
  inviteuserworkspace,
} from "@nyx-frontend/main/services/workSpace";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import cookie from "cookiejs";
import Modal from "react-modal";
import Select from "react-select";
import { welcomePopupStyles } from "@nyx-frontend/main/app/apphome/optionStyles";
import {
  welcomePopUpStyle,
  onetimeemailverification,
} from "@nyx-frontend/main/utils/modalstyles";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import { roles } from "@nyx-frontend/main/app/apphome/constants";
import { sendEmailVerification } from "@nyx-frontend/main/services/loginService";

const UserMangement = () => {
  const [username, setusername] = useState("");
  const [emailid, setemailid] = useState("");
  const [note, setnote] = useState("");
  const [require, setrequire] = useState(false);
  const [role, setrole] = useState("");
  const [userexist, setuserexist] = useState(false);
  const [validemail, setvalidemail] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [workspaceDelete, setworkspaceDelete] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [inviteopen, setinviteopen] = useState(false);
  const [invitesuccessopen, setinvitesuccessopen] = useState(false);
  const [inviteerroropen, setinviteerroropen] = useState(false);
  const [errormessages, seterrormessages] = useState("");
  const [emailverivication, setemailverivication] = useState("");
  const [firsttimepopup, setfirsttimepopup] = useState(false);
  const [firsttimepopup2, setfirsttimepopup2] = useState(false);
  const [validitycheck, setvaliditycheck] = useState(false);
  const [emailexisted, setemailexisted] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [alreadyemailsent, setalreadyemailsent] = useState(false);
  const [errormessage2, seterrormessage2] = useState("");
  const queryClient = useQueryClient();

  let workspaceId;
  if (typeof window !== "undefined") {
    workspaceId = localStorage.getItem("workspace_id");
  }

  const artistDetails = useQuery({
    queryKey: ["artistDetails"],
    queryFn: () => getUser(),
  });

  const id = artistDetails?.data?.artistProfile?.userId;

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["userDetails", workspaceId],
    queryFn: () => getWorkspaceDetailsById(workspaceId),
  });

  //Update User Role Function
  const mutateEditUserRole = useMutation({
    mutationKey: ["change-user-role"],
    mutationFn: EditUserRole,
  });

  const mutatemailsend = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: sendEmailVerification,
  });

  const mutateinvite = useMutation({
    mutationKey: ["sendinvite"],
    mutationFn: inviteuserworkspace,
  });

  const updatedUserRole = (data) => {
    let payload = {
      workspace_id: Number(workspaceId),
      user_id: data.user_id,
      new_role: data.new_role,
    };
    console.log("payload", payload);
    mutateEditUserRole.mutate(payload, {
      onSuccess: (response) => {
        setUserRole(data.new_role);
        console.log("response :", response);
        queryClient.invalidateQueries({
          queryKey: ["userDetails"],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  //Delete User Function
  const mutatedeleteWorkspace = useMutation({
    mutationKey: ["delete-workspace"],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userDetails"],
      });
    },
  });

  const deleteWorkspace = (workspaceId, userId, credit_limit) => {
    setworkspaceDelete(true);
    mutatedeleteWorkspace.mutate(
      {
        workspace_id: Number(workspaceId),
        user_id: userId,
        credit_limit: credit_limit,
      },
      {
        onSuccess: (response) => {
          setworkspaceDelete(false);
          console.log("response :", response);
        },
        onError: (error) => {
          setworkspaceDelete(false);
          console.error(error);
        },
      },
    );
  };

  //Date Joined Sorting
  const handleSelectedOrder = (e) => {
    setSelectedOrder(e.target.value);
  };

  const inviteUserButton = (event) => {
    const hasCookie = cookie.get("notverifieduser");
    if (hasCookie) {
      setfirsttimepopup(true);
    } else {
      setusername(event.target.value);
      setinviteopen(true);
    }
  };

  const Nextbuttonclick = () => {
    setisloading(true);
    const ID = localStorage.getItem("workspace_id");
    const num = parseInt(ID || "0", 10);

    const valid = /^\S+@\S+\.\S+$/.test(emailid);
    if (emailid != "" && role != "" && valid) {
      let data = {
        workspace_id: num,
        email: emailid,
        role: role,
      };
      setisloading(true);
      mutateinvite.mutate(data, {
        onSuccess: (response) => {
          setinviteopen(false);
          setinvitesuccessopen(true);
          setisloading(false);
        },
        onError: (error) => {
          setinviteopen(false);
          const errormsg = error.response.data.message;
          const errormsg2 = error.response.data.message;
          setisloading(false);
          if (errormsg === "User is already a member of this workspace") {
            setuserexist(true);
            seterrormessages("User is already a member of this workspace");
          }
          if (
            errormsg2 ===
            "An invitation has already been sent within the last 24 hours."
          ) {
            seterrormessages(
              "An invitation has already been sent within the last 24 hours",
            );
            setalreadyemailsent(true);
          }
          setinviteerroropen(true);
        },
      });
    } else {
      setrequire(true);
      setisloading(false);
    }
  };

  const notesubmit = (event) => {
    setnote(event.target.value);
  };

  const emailidsubmit = (event) => {
    setemailid(event.target.value);
    setrequire(false);
    setvalidemail(false);
  };
  const handleInputrole = (selected) => {
    setrole(selected.value);
    setrequire(false);
  };
  const cancelbutton = (selected) => {
    setinviteopen(false);
    setrequire(false);
  };
  const tryagainbutton = (e) => {
    e.preventDefault();
    setinviteopen(true);
    setinviteerroropen(false);
  };
  const NextButtonEmailVerification = () => {
    const valid = /^\S+@\S+\.\S+$/.test(emailverivication);
    if (valid) {
      const data = {
        email: emailverivication,
      };
      mutatemailsend.mutate(data, {
        onSuccess: (response) => {
          setfirsttimepopup(false);
          setfirsttimepopup2(true);
        },
        onError: (error) => {
          
          setemailexisted(true);
          seterrormessage2(error?.response?.data?.errors?.message)
        },
      });
    } else {
      setvaliditycheck(true);
    }
  };
  const continueToVerification = (e) => {
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
      <div className="p-4">
        <Button
          className="rounded-full w-30 hover:shadow-none text-[black] bg-[#FFC01D] disabled:cursor-not-allowed disabled:bg-nyx-gray-1 disabled:border-none"
          onClick={inviteUserButton}
          disabled={
            !(
              userDetails?.workspace?.userRole == "OWNER" ||
              userDetails?.workspace?.userRole == "ADMIN"
            )
          }
        >
          + Invite Users
        </Button>
        <div className="mt-5">
          <div className="relative overflow-x-auto">
            {isLoading ? (
              <div className="w-full h-[300px] rounded-3xl">
                <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
                  <div>
                    <Skeleton
                      animation="wave"
                      baseColor="#0000004D"
                      className="w-full h-[200px] rounded-3xl"
                    />
                  </div>
                </SkeletonTheme>
              </div>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right rounded-[10px] overflow-hidden">
                <thead className=" text-[16px] font-medium text-white bg-[#23145A]">
                  <tr className="text-[#E9BD4E] text-[14px] leading-[18px]">
                    <th scope="col" className="px-[90px] py-3">
                      Name
                    </th>
                    <th scope="col" className="px-8 py-3">
                      Email/Phone No
                    </th>
                    <th scope="col" className="px-8 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3">
                      <select
                        value={selectedOrder}
                        onChange={handleSelectedOrder}
                        className="bg-[#23145A]"
                      >
                        <option value="">Date Joined</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                      </select>
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="">
                  <>
                    {userDetails?.workspace?.workspace_user?.map(
                      (user, index) => (
                        <tr
                          key={index}
                          className={`border-b border-solid border-[#503193] bg-[#332270] text-white ${user.userId === id ? "font-bold" : "font-normal"}`}
                        >
                          {/* user name */}
                          <td className="p-4 text-start flex">
                            {/* user blank svg */}
                            {/* <Image
                              src={user.profilePic}
                              alt="profile"
                              width={50}
                              height={50}
                              className="rounded-full"
                            /> */}
                            <img
                              src={user.profilePic}
                              className="w-10 h-10 rounded-full"
                              alt="profile"
                            />
                            <span className="ml-5 mt-4">{user.first_name}</span>
                            <span className="ml-1 mt-4">{user.last_name}</span>
                          </td>

                          {/* user email */}
                          <td className="px-6 py-4">
                            {user.email ? (
                              <span>{user.email}</span>
                            ) : (
                              <span>{user.phone}</span>
                            )}
                          </td>

                          {/* user role */}

                          {user.userId === id ? (
                            <td className="px-7 py-7">{user.role}</td>
                          ) : userDetails?.workspace?.userRole === "OWNER" ? (
                            <td className="px-6 py-4">
                              <select
                                className={`flex flex-col text-white bg-[#332270] text-center`}
                                value={user.role}
                                onChange={(event) => {
                                  const newRole = event.target.value;
                                  updatedUserRole({
                                    workspace_id: Number(workspaceId),
                                    user_id: user?.userId,
                                    new_role: newRole,
                                  });
                                }}
                              >
                                <option value="ADMIN">ADMIN</option>
                                <option value="EDITOR">EDITOR</option>
                                <option value="VIEWER">VIEWER</option>
                              </select>
                            </td>
                          ) : userDetails?.workspace?.userRole === "ADMIN" ? (
                            user.role === "OWNER" ? (
                              <td className="px-7 py-7">{user.role}</td>
                            ) : (
                              <td className="px-6 py-4">
                                <select
                                  className={`flex flex-col text-white bg-[#332270] text-center`}
                                  value={user.role}
                                  onChange={(event) => {
                                    const newRole = event.target.value;
                                    if (newRole !== "OWNER") {
                                      updatedUserRole({
                                        workspace_id: Number(workspaceId),
                                        user_id: user?.userId,
                                        new_role: newRole,
                                      });
                                    } else {
                                      alert(
                                        "Admins cannot change the role to OWNER.",
                                      );
                                    }
                                  }}
                                >
                                  <option value="ADMIN">ADMIN</option>
                                  <option value="EDITOR">EDITOR</option>
                                  <option value="VIEWER">VIEWER</option>
                                </select>
                              </td>
                            )
                          ) : (
                            <td className="px-7 py-7">{user.role}</td>
                          )}

                          {/* user date joined */}
                          <td className="px-6 py-4">
                            {user?.dateJoined?.split("T")[0]}
                          </td>

                          {/* user delete */}
                          <td className="px-6 py-4">
                            <button
                              className={`font-extrabold ${user.role === "OWNER" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                              onClick={() =>
                                deleteWorkspace(
                                  Number(workspaceId),
                                  user.userId,
                                )
                              }
                              disabled={user.role === "OWNER"}
                            >
                              {/* delete svg image */}
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ),
                    )}
                  </>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {inviteopen ? (
        <Modal
          isOpen={inviteopen}
          style={welcomePopUpStyle}
          // onRequestClose={onLastClose}
        >
          <div className="w-[740px] h-[410px] p-8 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[22px] font-[600] text-[#FFF]">
                Provide member details and access
              </h2>
            </div>
            <div className="w-full h-full flex flex-col px-10 gap-5">
              <div className="w-full flex gap-3">
                <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm ">
                  <p className="font-semibold py-2">Email Address</p>
                  <input
                    type="text"
                    className={
                      require && emailid === ""
                        ? `w-[390px]  bg-transparent border border-[#ff4964] rounded-[4px] p-2 font-normal`
                        : `w-[390px] bg-transparent border border-[#8297BD] rounded-[4px] p-2 font-normal`
                    }
                    placeholder="example@gmail.com"
                    value={emailid}
                    onChange={emailidsubmit}
                  />
                </div>

                <div className="w-full">
                  <Select
                    className="text-sm md:text-base w-full bottom-[-34px] "
                    options={roles}
                    // menuPlacement={"top"}
                    placeholder="Viewer"
                    styles={welcomePopupStyles}
                    value={roles.find((option) => option?.value === role)}
                    onChange={handleInputrole}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                  {require && role === "" && (
                    <span className="absolute mt-8 text-red-500 text-[12px] ">
                      Select role please
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm mt-6 ">
                <textarea
                  className={`w-full h-[100px] bg-transparent border border-[#8297BD] rounded-[4px] p-2 font-normal`}
                  placeholder="Add a note"
                  value={note}
                  onChange={notesubmit}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-14 mb-10 mt-6">
              <Button
                className="  font-[600] hover:bg-transprent rounded-full hover:shadow-none hover:text-white text-[14px]"
                onClick={cancelbutton}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full w-[109px] hover:shadow-none font-semibold py-[6px] text-[black] bg-[#FFC01D]"
                onClick={Nextbuttonclick}
                disabled={isloading}
              >
                {isloading ? <ButtonLoading /> : "Next"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
      {invitesuccessopen ? (
        <Modal
          isOpen={invitesuccessopen}
          style={welcomePopUpStyle}
          // onRequestClose={onLastClose}
        >
          <div className="w-[740px] h-[410px] p-8 flex flex-col gap-5">
            <div className="w-full flex flex-col justify-center items-center gap-3">
              <div
                className="svg-icon mb-6 mt-10"
                dangerouslySetInnerHTML={{ __html: check }}
              ></div>
              <h2 className="text-center text-[32px] font-[600] text-[#ffffff]">
                Invitation sent successfully !
              </h2>
            </div>
            <div className="w-full h-full flex flex-col px-10 gap-5">
              <div className="flex justify-center items-center gap-14 mb-10 mt-6">
                <Button
                  className=" rounded-full w-[109px] hover:shadow-none font-semibold py-[6px] text-[black] bg-[#FFC01D]"
                  onClick={() => setinvitesuccessopen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
      {inviteerroropen ? (
        <Modal
          isOpen={inviteerroropen}
          style={welcomePopUpStyle}
          // onRequestClose={onLastClose}
        >
          <div className="w-[740px] h-[410px] p-8 flex flex-col justify-center items-center gap-5">
            <div className="w-full flex flex-col gap-3 mt-20">
              <h2 className="text-center text-[32px] font-[600] text-[#f7f7f7]">
                Invitation failed!
              </h2>
              <h2 className="text-center text-[24px] font-[600] text-[#ffffff]">
                Could not send Invite please try again
              </h2>
              {userexist === true ? (
                <h2 className="text-center text-[14px] font-[600] text-[#FFC01D]">
                  User is already a member of this workspace
                </h2>
              ) : (
                <></>
              )}
              {alreadyemailsent ? (
                <h2 className="text-center text-[14px] font-[600] text-[#FFC01D]">
                  {errormessages}
                </h2>
              ) : null}
            </div>
            <div className="w-full h-full flex flex-col px-10 gap-5">
              <div className="flex justify-center items-center gap-14 mb-10 mt-6">
                <Button
                  className="  font-[600] hover:bg-transprent rounded-full hover:shadow-none hover:text-white text-[14px]"
                  onClick={() => setinviteerroropen(false)}
                >
                  Close
                </Button>
                <Button
                  className="rounded-full w-[154px] hover:shadow-none font-semibold py-[6px] text-[black] bg-[#FFC01D]"
                  onClick={tryagainbutton}
                >
                  Invite Again
                </Button>
              </div>
            </div>
          </div>
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
                className="w-full bg-transparent border text-white border-[#8297BD] text-[14px] rounded-md p-2 font-normal "
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
                  {errormessage2}
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

export default UserMangement;

const check = `<svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_4774_10029)">
<path d="M41.06 0.00390625C18.5674 0.00390625 0.269409 18.3019 0.269409 40.7945C0.269409 63.2872 18.5674 81.5852 41.06 81.5852C63.5527 81.5852 81.8507 63.2872 81.8507 40.7945H72.6728C72.6728 58.2257 58.4912 72.4073 41.06 72.4073C23.6288 72.4073 9.4473 58.2257 9.4473 40.7945C9.4473 23.3633 23.6288 9.1818 41.06 9.1818V0.00390625ZM66.2143 8.78409L40.7031 40.6382L28.7821 30.8688L21.9768 39.1493L38.0925 52.3655C38.64 52.8171 39.2719 53.1552 39.9514 53.3601C40.631 53.5649 41.3444 53.6325 42.0503 53.5587C42.7562 53.485 43.4404 53.2715 44.0629 52.9307C44.6854 52.5898 45.2338 52.1284 45.6762 51.5735L74.5831 15.4839L66.2143 8.78409Z" fill="#FFC01D"/>
</g>
<defs>
<clipPath id="clip0_4774_10029">
<rect width="81.5813" height="81.5813" fill="white" transform="translate(0.269531)"/>
</clipPath>
</defs>
</svg>
`;
