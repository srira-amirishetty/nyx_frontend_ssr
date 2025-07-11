"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Button from "@nyx-frontend/main/components/Button";
import { useMutation } from "@tanstack/react-query";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";

import {
  inviteuserworkspace,
  getWorkspaceDetailsById,
} from "@nyx-frontend/main/services/workSpace";
import Modal from "react-modal";
import Select from "react-select";
import {
  welcomePopUpStyle,
  onetimeemailverification,
} from "@nyx-frontend/main/utils/modalstyles";
import { roles } from "@nyx-frontend/main/app/apphome/constants";
import { welcomePopupStyles } from "@nyx-frontend/main/app/apphome/optionStyles";
import { useQuery } from "@tanstack/react-query";
import cookie from "cookiejs";
import { sendEmailVerification } from "@nyx-frontend/main/services/loginService";
import { checkEmailExisted } from "@nyx-frontend/main/utils/userUtils";

const InviteUser = ({ open }: any) => {
  const [inviteopen, setinviteopen] = useState<boolean>(false);
  const [emailid, setemailid] = useState<string>("");
  const [role, setrole] = useState<string>("");
  const [note, setnote] = useState<string>("");
  const [invitesuccessopen, setinvitesuccessopen] = useState<boolean>(false);
  const [errormessages, seterrormessages] = useState<any>("");
  const [userexist, setuserexist] = useState<boolean>(false);
  const [inviteerroropen, setinviteerroropen] = useState<boolean>(false);
  const [require, setrequire] = useState<boolean>(false);
  const [emailverivication, setemailverivication] = useState<any>("");
  const [errormessage, seterrormessage] = useState<any>("");
  const [firsttimepopup, setfirsttimepopup] = useState<boolean>(false);
  const [firsttimepopup2, setfirsttimepopup2] = useState<boolean>(false);
  const [validitycheck, setvaliditycheck] = useState<boolean>(false);
  const [emailexisted, setemailexisted] = useState<boolean>(false);
  const [isloading, setisloading] = useState<boolean>(false);

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

  const mutateinvite = useMutation({
    mutationKey: ["sendinvite"],
    mutationFn: inviteuserworkspace,
  });

  const mutatemailsend = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: sendEmailVerification,
  });

  const Nextbuttonclick = () => {
    const ID = localStorage.getItem("workspace_id");
    const num: number = parseInt(ID || "0", 10);
    const valid = /^\S+@\S+\.\S+$/.test(emailid);
    if (emailid != "" && role != "" && valid) {
      console.log(ID);
      let data = {
        workspace_id: num,
        email: emailid,
        role: role,
        note: note,
      };
      setisloading(true);
      mutateinvite.mutate(data, {
        onSuccess: (response: any) => {
          setinviteopen(false);
          setinvitesuccessopen(true);
          setisloading(false);
        },
        onError: (error: any) => {
          setinviteopen(false);
          setisloading(false);
          const errormsg = error?.response?.data?.message;
          if (errormsg === "User is already a member of this workspace. ") {
            seterrormessages("User is already a member of this workspace");
            setuserexist(true);
          }
          setinviteerroropen(true);
        },
      });
    } else {
      setrequire(true);
      setisloading(false);
    }
  };

  const inviteUserButton = () => {
    const hasCookie = cookie.get("notverifieduser");
    if (hasCookie) {
      setfirsttimepopup(true);
      //checkEmailExisted();
    } else {
      setinviteopen(true);
    }
  };
  const notesubmit = (event: any) => {
    setnote(event.target.value);
  };
  const emailidsubmit = (event: any) => {
    setemailid(event.target.value);
    setrequire(false);
  };
  const handleInputrole = (selected: any) => {
    setrole(selected.value);
    setrequire(false);
  };
  const cancelbutton = () => {
    setinviteopen(false);
    setrequire(false);
  };
  const tryagainbutton = (e: any) => {
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
        onError: (error: any) => {
          console.log(error.response.data.message);
          setemailexisted(true);
          seterrormessage(error?.response?.data?.errors?.message);
        },
      });
    } else {
      setvaliditycheck(true);
    }
  };
  const continueToVerification = (e: any) => {
    setfirsttimepopup2(false);
  };
  const emailverificationsubmit = (e: any) => {
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
    <div>
      {open ? (
        // <Button
        //   className="rounded-full w-[170px] hover:shadow-none text-[#FFC01D] font-regular disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 disabled:cursor-not-allowed disabled:hover:bg-nyx-gray-1 disabled:text-black"
        //   onClick={inviteUserButton}
        //   disabled={
        //     !(
        //       userDetailsRole?.workspace?.userRole == "OWNER" ||
        //       userDetailsRole?.workspace?.userRole == "ADMIN"
        //     )
        //   }
        // >
        //   <span className="text-lg">+</span> Invite Users
        // </Button>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={inviteUserButton}
        >
          <path
            d="M6.05621 6.44444C6.41369 6.44444 6.76768 6.37403 7.09796 6.23723C7.42823 6.10042 7.72833 5.89991 7.98111 5.64712C8.23389 5.39434 8.43441 5.09425 8.57121 4.76397C8.70802 4.4337 8.77843 4.07971 8.77843 3.72222C8.77843 3.36473 8.70802 3.01075 8.57121 2.68047C8.43441 2.3502 8.23389 2.0501 7.98111 1.79732C7.72833 1.54454 7.42823 1.34402 7.09796 1.20722C6.76768 1.07041 6.41369 1 6.05621 1C5.33423 1 4.64182 1.2868 4.1313 1.79732C3.62079 2.30784 3.33398 3.00024 3.33398 3.72222C3.33398 4.4442 3.62079 5.13661 4.1313 5.64712C4.64182 6.15764 5.33423 6.44444 6.05621 6.44444Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12.6667 9.94358V14.6102M10.3333 12.2769H15M9.16667 9.55469H5.97778C4.23556 9.55469 3.36444 9.55469 2.69867 9.8938C2.1133 10.1921 1.63738 10.668 1.33911 11.2534C1 11.9191 1 12.7902 1 14.5325V14.9991H9.16667"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // <button
        //   className={"cursor-pointer disabled:cursor-not-allowed "}
        //   onClick={inviteUserButton}
        //   disabled={
        //     !(
        //       userDetailsRole?.workspace?.userRole == "OWNER" ||
        //       userDetailsRole?.workspace?.userRole == "ADMIN"
        //     )
        //   }
        // >
        //   <svg
        //     width="28"
        //     height="28"
        //     viewBox="0 0 28 28"
        //     fill={
        //       !(
        //         userDetailsRole?.workspace?.userRole == "OWNER" ||
        //         userDetailsRole?.workspace?.userRole == "ADMIN"
        //       )
        //         ? `#8297bd`
        //         : `none`
        //     }
        //     xmlns="http://www.w3.org/2000/svg"
        //     className={
        //       !(
        //         userDetailsRole?.workspace?.userRole == "OWNER" ||
        //         userDetailsRole?.workspace?.userRole == "ADMIN"
        //       )
        //         ? `cursor-not-allowed `
        //         : `cursor-pointer `
        //     }
        //   >
        //     <rect
        //       x="0.5"
        //       y="0.5"
        //       width="27"
        //       height="27"
        //       rx="13.5"
        //       stroke={
        //         !(
        //           userDetailsRole?.workspace?.userRole == "OWNER" ||
        //           userDetailsRole?.workspace?.userRole == "ADMIN"
        //         )
        //           ? `black`
        //           : `#FFCB54`
        //       }
        //     />
        //     <path
        //       d="M19.4688 14C19.4688 14.174 19.3996 14.341 19.2765 14.464C19.1535 14.5871 18.9865 14.6562 18.8125 14.6562H14.6562V18.8125C14.6562 18.9865 14.5871 19.1535 14.464 19.2765C14.341 19.3996 14.174 19.4688 14 19.4688C13.826 19.4688 13.659 19.3996 13.536 19.2765C13.4129 19.1535 13.3438 18.9865 13.3438 18.8125V14.6562H9.1875C9.01345 14.6562 8.84653 14.5871 8.72346 14.464C8.60039 14.341 8.53125 14.174 8.53125 14C8.53125 13.826 8.60039 13.659 8.72346 13.536C8.84653 13.4129 9.01345 13.3438 9.1875 13.3438H13.3438V9.1875C13.3438 9.01345 13.4129 8.84653 13.536 8.72346C13.659 8.60039 13.826 8.53125 14 8.53125C14.174 8.53125 14.341 8.60039 14.464 8.72346C14.5871 8.84653 14.6562 9.01345 14.6562 9.1875V13.3438H18.8125C18.9865 13.3438 19.1535 13.4129 19.2765 13.536C19.3996 13.659 19.4688 13.826 19.4688 14Z"
        //       // fill="#FFCB54"
        //       fill={
        //         !(
        //           userDetailsRole?.workspace?.userRole == "OWNER" ||
        //           userDetailsRole?.workspace?.userRole == "ADMIN"
        //         )
        //           ? `black`
        //           : `#FFCB54`
        //       }
        //     />
        //   </svg>
        // </button>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={inviteUserButton}
        >
          <path
            d="M6.05621 6.44444C6.41369 6.44444 6.76768 6.37403 7.09796 6.23723C7.42823 6.10042 7.72833 5.89991 7.98111 5.64712C8.23389 5.39434 8.43441 5.09425 8.57121 4.76397C8.70802 4.4337 8.77843 4.07971 8.77843 3.72222C8.77843 3.36473 8.70802 3.01075 8.57121 2.68047C8.43441 2.3502 8.23389 2.0501 7.98111 1.79732C7.72833 1.54454 7.42823 1.34402 7.09796 1.20722C6.76768 1.07041 6.41369 1 6.05621 1C5.33423 1 4.64182 1.2868 4.1313 1.79732C3.62079 2.30784 3.33398 3.00024 3.33398 3.72222C3.33398 4.4442 3.62079 5.13661 4.1313 5.64712C4.64182 6.15764 5.33423 6.44444 6.05621 6.44444Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12.6667 9.94358V14.6102M10.3333 12.2769H15M9.16667 9.55469H5.97778C4.23556 9.55469 3.36444 9.55469 2.69867 9.8938C2.1133 10.1921 1.63738 10.668 1.33911 11.2534C1 11.9191 1 12.7902 1 14.5325V14.9991H9.16667"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {/* <Button
        className="rounded-full w-[170px] hover:shadow-none text-[#FFC01D] font-regular disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 disabled:cursor-not-allowed disabled:hover:bg-nyx-gray-1 disabled:text-black"
        onClick={inviteUserButton}
        disabled={
          !(
            userDetailsRole?.workspace?.userRole == "OWNER" ||
            userDetailsRole?.workspace?.userRole == "ADMIN"
          )
        }
      >
        <span className="text-lg">+</span> Invite Users
      </Button> */}
      {inviteopen ? (
        <Modal isOpen={inviteopen} style={welcomePopUpStyle}>
          <div className="w-[491px] h-auto flex flex-col gap-5">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[16px] font-[700] text-[#FFFFFF]">
                Provide member details and access
              </h2>
            </div>
            <div className="w-full h-full flex flex-col gap-5">
              <div className="w-full flex gap-3">
                <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm ">
                  <p className="font-semibold py-2">Email Address</p>
                  <input
                    type="text"
                    className={
                      require && emailid === ""
                        ? `w-[390px]  bg-transparent border border-[#ff4964] rounded-[4px] p-2 font-normal `
                        : `w-[390px] bg-transparent border border-[#8297BD] rounded-[4px] p-2 font-normal `
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
            <div className="flex justify-center items-center gap-5">
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={cancelbutton}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full w-[97px] hover:shadow-none font-semibold px-2 h-[36px] text-[black] bg-[#FFC01D] text-sm"
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
        <Modal isOpen={invitesuccessopen} style={welcomePopUpStyle}>
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
        <Modal isOpen={inviteerroropen} style={welcomePopUpStyle}>
          <div className="w-[740px] h-[410px] p-8 flex flex-col justify-center items-center gap-5">
            <div className="w-full flex flex-col gap-3 mt-20">
              <h2 className="text-center text-[32px] font-[600] text-[#f7f7f7]">
                Invitation failed!
              </h2>
              <h2 className="text-center text-[24px] font-[600] text-[#ffffff]">
                Could not send Invite please try again
              </h2>
              {userexist && (
                <h2 className="text-center text-[22px] font-[600] text-[#ff5d5d]">
                  {errormessages}
                </h2>
              )}
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
        <Modal isOpen={firsttimepopup} style={onetimeemailverification}>
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
                className="w-full bg-transparent border text-white border-[#8297BD] text-[14px] rounded-md p-2 font-normal focus:placeholder-transparent "
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
                  {errormessage}
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
    </div>
  );
};

export default InviteUser;

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
