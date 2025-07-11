/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { ProfileTabs } from "@nyx-frontend/main/shared/inputs";
import { useQuery } from "@tanstack/react-query";
import { Profile_TABS } from "@nyx-frontend/main/utils/utils";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { TAIL_TITLE } from "@nyx-frontend/main/components/tails";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import { useRouter } from "next/navigation";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { getProfileService } from "@nyx-frontend/main/services/loginService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { MODAL_CONFIG_PROCESSING } from "@nyx-frontend/main/utils/modalstyles";
import { BASEURL, EDIT_ARTISTS } from "@nyx-frontend/main/utils/utils";
import { UpdatePassword } from "@nyx-frontend/main/services/loginService";
import { useMutation } from "@tanstack/react-query";
const brandVision = IMAGE_URL + "/assets/home/brandvision.png";
import Button from "@nyx-frontend/main/components/Button";
import Modal from "react-modal";
import { updatePassStyle } from "@nyx-frontend/main/utils/modalstyles";

const Profile = () => {
  const [contextTab, setContextTab] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [fname, setfname] = useState("");
  const [fonphoto, setfonphoto] = useState("");
  const [lname, setlname] = useState("");
  const [mno, setmno] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [org, setorg] = useState("");
  const [inputDisable, setInputDisable] = useState(true);
  const [updatePass, setUpdatepass] = useState(false);
  const [newpass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [previouspass, setpreviouspass] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [previouspasswordwrong, setpreviouspasswordwrong] = useState(false);
  const [PasswordNotMatched, setPasswordNotMatched] = useState(false);
  const [PasswordcriteriaNotMatched, setPasswordcriteriaNotMatched] =
    useState(false);
  const [passwordUpdated, setPassWordUpdated] = useState(false);

  const { post } = useRequests();

  const onSubmitFirst = async () => {
    if (fname != "" && mno != "" && email != "") {
      const updatedData = {
        first_name: fname,
        phone: mno,
        email: email,
        last_name: lname,
        organization: org,
        user_name: username,
      };
      let payload = {
        data: updatedData,
      };

      const res = await post(
        BASEURL + EDIT_ARTISTS,
        payload,
        MODAL_CONFIG_PROCESSING,
      );

      if (res.response == "Success") {
        
        toast.success(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Request Successfull!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Details updated successfully
                </span>
              </>,
              { autoClose: 5000 },
            );
        setInputDisable(true);
      } else {
       
        toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Bad Request!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Sorry, could not update your details
                </span>
              </>,
              { autoClose: 5000 },
            );
      }
    }
  };
  const mutateSetPassword = useMutation({
    mutationKey: ["SetPassword-api"],
    mutationFn: UpdatePassword,
  });

  // const validatePassword = (password) => {
  //   const upperCaseRegex = /[A-Z]/;
  //   const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  //   const numberRegex = /[0-9]/;

  //   const hasUpperCase = upperCaseRegex.test(password);
  //   const hasSpecialChar = specialCharRegex.test(password);
  //   const hasNumber = numberRegex.test(password);
  //   const isLengthValid = password.length >6;

  //   setIsValid(hasUpperCase && hasSpecialChar && hasNumber && isLengthValid);
  // };

  useEffect(() => {
    const upperCaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    const hasUpperCase = upperCaseRegex.test(newpass);
    const hasSpecialChar = specialCharRegex.test(newpass);
    const hasNumber = numberRegex.test(newpass);
    const isLengthValid = newpass.length > 6;

    setIsValid(hasUpperCase && hasSpecialChar && hasNumber && isLengthValid);
  }, [newpass]);

  const updatebuttonclick = async (e) => {
    e.preventDefault();
    if (newpass === confirmPass && isValid) {
      let data = {
        currentPassword: previouspass,
        newPassword: newpass,
        confirmPassword: confirmPass,
      };
      mutateSetPassword.mutate(data, {
        onSuccess: (response) => {
          // console.log("responce :" , response)
          // console.log("password set successfully ")
          setPassWordUpdated(true);
          setpreviouspass("");
          setNewPass("");
          setConfirmPass("");
        },
        onError: (error) => {
          console.error(error);
          setpreviouspasswordwrong(true);
        },
      });
    } else {
      if (newpass === confirmPass) {
        setPasswordcriteriaNotMatched(true);
      } else {
        setPasswordNotMatched(true);
      }
    }
  };

  const queryUser = useQuery({
    queryKey: ["user-details1"],
    queryFn: getProfileService,
  });

  useEffect(() => {
    if (queryUser.isSuccess) {
      let data = queryUser.data;
      setUserDetails(data);
      setfname(data.first_name);
      setfonphoto(data.profilePic);
      setmno(data.phone);
      setemail(data.email);
      setorg(data.organization);
      setusername(data.user_name);
      setlname(data.last_name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryUser.isSuccess]);

  const confirmPassChnage = (event) => {
    setConfirmPass(event.target.value);
    setPasswordNotMatched(false);
    setPasswordcriteriaNotMatched(false);
  };
  const previouspassChnage = (event) => {
    setpreviouspass(event.target.value);
    setpreviouspasswordwrong(false);
  };
  const newPassChnage = (event) => {
    setNewPass(event.target.value);
    // validatePassword(newpass);
    setPasswordNotMatched(false);
    //validatePassword(newpass);
  };
  const fnameupdate = (event) => {
    setfname(event.target.value);
  };
  const lnameupdate = (event) => {
    setlname(event.target.value);
  };
  const mnoupdate = (event) => {
    setmno(event.target.value);
  };
  const emailupdate = (event) => {
    setemail(event.target.value);
  };
  const orgupdate = (event) => {
    setorg(event.target.value);
  };
  const passupdate = (event) => {
    setpassword(event.target.value);
  };
  const usernameupdate = (event) => {
    setusername(event.target.value);
  };

  const openUpdatePass = () => {
    setPassWordUpdated(false);
    setUpdatepass(true);
  };

  return (
    <>
      <div className="flex mt-8 p-8">
        <div className="bg-[#3B226F] w-4/12 max-h-[20em] text-center text-white rounded-lg p-4">
          <div className="flex justify-center mt-4">
            <img
              className="rounded-full w-[150px] h-[150px] mb-4"
              src={fonphoto}
              alt="Brand Vision"
            />
          </div>
          <h2 className="text-[#FFC01D] font-semibold  text-[20px]">{fname}</h2>

          <p className="text-[14px]">sub Name</p>
        </div>
        <div className="p-4 bg-[#3B226F] w-8/12 ml-4 rounded-lg">
          <div className="flex flex-col mx-auto justify-center items-center gap-5">
            <div className="flex w-[90%]">
              <div className="w-full  gap-3">
                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">First Name</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="Full Name"
                    value={fname}
                    onChange={fnameupdate}
                    disabled={inputDisable}
                  />
                </div>

                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">Email ID</p>
                  <input
                    type="text"
                    className={`w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal  ${inputDisable == false ? "text-[#8297BD]" : "text-white"}`}
                    placeholder="Email ID"
                    defaultValue={email}
                    onChange={emailupdate}
                    disabled={true}
                  />
                </div>

                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">Username</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="Username"
                    onChange={usernameupdate}
                    defaultValue={username}
                    disabled={inputDisable}
                  />
                </div>

                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                  <p className="font-semibold py-2">Organisation</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="Organisation"
                    onChange={orgupdate}
                    defaultValue={org}
                    disabled={inputDisable}
                  />
                </div>
              </div>

              <div className="w-full ml-4 gap-3">
                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">Last Name</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="Last Name"
                    onChange={lnameupdate}
                    defaultValue={lname}
                    disabled={inputDisable}
                  />
                </div>

                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">Mobile Number</p>
                  <input
                    type="text"
                    className={`w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal  ${inputDisable == false ? "text-[#8297BD]" : "text-white"}`}
                    placeholder="Mobile Number"
                    defaultValue={mno}
                    onChange={mnoupdate}
                    disabled={true}
                  />
                </div>

                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm ">
                  <p className="font-semibold py-2">Password</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="Password"
                    onChange={passupdate}
                    defaultValue="xxxxxxxx"
                    disabled={true}
                  />
                </div>
                {inputDisable == false && (
                  <div
                    className=" text-end text-white underline underline-offset-2 font-light mt-1 text-[12px] cursor-pointer "
                    onClick={openUpdatePass}
                  >
                    Update Password
                  </div>
                )}
              </div>
            </div>
            {inputDisable ? (
              <div className="w-full flex  justify-center gap-3 mt-4 mb-4">
                <Button
                  onClick={() => setInputDisable(false)}
                  className=" rounded-full text-nyx-yellow w-40 font-semibold"
                >
                  Edit Profile
                </Button>
              </div>
            ) : (
              <div className="w-full flex  justify-center gap-3 mt-4 mb-4">
                <Button
                  onClick={() => setInputDisable(true)}
                  className=" rounded-full text-nyx-yellow w-40 font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onSubmitFirst}
                  className=" rounded-full  w-40 bg-nyx-yellow  text-black font-semibold"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {updatePass ? (
        <Modal
          isOpen={updatePass}
          style={updatePassStyle}
          onRequestClose={() => setUpdatepass(false)}
          ariaHideApp={false}
        >
          {passwordUpdated ? (
            <div className="p-8">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="text-white ">Password Updated successfully</div>
                <div>
                  <Button
                    className=" rounded-full text-black bg-nyx-yellow font-semibold"
                    onClick={() => setUpdatepass(false)}
                  >
                    Ok
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div>
                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">Current Password</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="Current password"
                    value={previouspass}
                    onChange={previouspassChnage}
                  />
                </div>
                {previouspasswordwrong && (
                  <p className="text-[10px] text-[#ff5151] mt-[-12px] absolute">
                    Wrong Current Password
                  </p>
                )}
              </div>
              <div>
                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">New Password</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="New Password"
                    value={newpass}
                    onChange={newPassChnage}
                  />
                </div>
                {!isValid && (
                  <p className="text-[10px] text-[#ff5151] ">
                    Password must contain at least one uppercase letter, one
                    special character (#, @, $, %, etc.), one number, and be at
                    least 8 characters long.
                  </p>
                )}
              </div>
              <div>
                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">Confirm Password</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={confirmPassChnage}
                  />
                </div>
                {PasswordNotMatched && (
                  <p className="text-[10px] text-[#ff5151] absolute mt-[-10px]">
                    Password not matched
                  </p>
                )}
              </div>

              <div className="flex flex-row  justify-center items-center gap-2 px-4 mt-6">
                <Button
                  className="rounded-full text-nyx-yellow w-full font-semibold"
                  onClick={() => setUpdatepass(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-full text-black bg-nyx-yellow font-semibold w-full"
                  onClick={updatebuttonclick}
                >
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </Modal>
      ) : null}
    </>
  );
};

export default Profile;
