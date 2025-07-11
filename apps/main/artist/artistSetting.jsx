"use client"
import { useContext, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiPencil, HiOutlineCheckCircle } from "react-icons/hi2";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { TabsMain } from "@nyx-frontend/main/shared/inputs";
import { BASEURL, EDIT_ARTISTS, UPDATE_PHONE } from "@nyx-frontend/main/utils/utils";
import { BsCheckCircle } from "react-icons/bs";
import {
  MODAL_CONFIG_LOGIN_SENT_OTP,
  MODAL_CONFIG_LOGIN_VERIFY_OTP,
  MODAL_CONFIG_PROCESSING,
} from "@nyx-frontend/main/utils/modalstyles";

function UpdateProfileArtist() {
  const { type, userDetails } = useContext(UseContextData);
  const [phoneTab, setPhoneTab] = useState(0);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    trigger,
    clearErrors,
    setError,
  } = useForm();
  const { post } = useRequests();
  const [verificationCode, setVerificationCode] = useState("");
  const [isOTP, setOtp] = useState(false);
  const [showMobileChecked, setShowMobileChecked] = useState(false);

  const checkMobileLength = (val) => {
    if (val.length === 10) {
      setShowMobileChecked(true);
      clearErrors("phone");
    } else {
      setShowMobileChecked(false);
    }
  };

  const onSubmit = async (data) => {
    if (isOTP) {
      let payload = {
        countryCode: "91",
        updated_phone: data.phone,
        otp: data.OTP,
        verification_key: verificationCode,
      };
      let logged_type = type === "user" ? "/users" : "/artists";
      const response = await post(
        BASEURL + logged_type + "/update-phone",
        payload,
        MODAL_CONFIG_LOGIN_VERIFY_OTP
      );
      if (response.data.status === "Success") {
        localStorage.setItem("token", response.data.token);
        toast.success("Updated Phone Number Successfully");
        setShowPhoneModal(false);
      } else {
        if (response.response == "Failed") {
          setError("serverErrorOTP");
        }
      }
    }
  };

  const sendOTP = async (updateType) => {
    let isError = false;
    if (updateType === "phoneupdate") {
      if (getValues("phone").length != 10) {
        trigger("phone");
        isError = true;
      }
    } else {
      if (getValues("password").length < 8) {
        trigger("password");
        isError = true;
      } else if (getValues("password") !== getValues("confirm_password")) {
        trigger("confirm_password");
        isError = true;
      }
    }

    if (!isError) {
      let payload_for_otp = {
        countryCode: "91",
        phone: userDetails.phone,
        type: updateType,
        userType: type.toUpperCase(),
      };
      const response = await post(
        BASEURL + "/otp/get-otp",
        payload_for_otp,
        MODAL_CONFIG_LOGIN_SENT_OTP
      );
      if (response.data.message === "Otp sent to phone") {
        setOtp(true);
        setVerificationCode(response.data.verification_key);
        toast.success("OTP sent to your number");
        setPhoneTab(1);
      }
    }
  };

  const handlePasswordChange = (type) => {
    if (type === "OTP") {
      clearErrors("serverErrorOTP");
    }
    clearErrors(type);
  };

  const closeModal = () => {
    setShowPhoneModal(false);
    setPhoneTab(0);
  };

  const updateEmail = async () => {
    if (getValues("email").length === 0) {
      trigger("email");
    } else {
      userDetails.email = getValues("email");

      let payload = {
        data: userDetails,
      };

      const response = await post(
        BASEURL + EDIT_ARTISTS,
        payload,
        MODAL_CONFIG_PROCESSING
      );

      if (response.response === "Success") {
        toast.success("Email id updated");
      } else {
        toast.error("Error updating email id");
      }
    }
  };

  return (
    <>
      <div className="py-8 min-h-screen">
        <div className="flex-1 mb-6 md:mb-0 md:flex mx-3 md:mx-16 py-3 text-white gap-5">
          <div className="flex justify-between md:justify-start w-auto md:w-1/2 border border-gray-400 rounded-md py-5 gap-8 px-8">
            <p className="text-gray-400">Phone Number : </p>
            <h4>{userDetails.phone}</h4>
          </div>
          <div className="flex float-right px-0 md:px-12 gap-8 mt-2 md:mt-0">
            <h4 className="flex text-green-500 items-center gap-2">
              <FaRegCheckCircle className="text-xl" /> Verified
            </h4>
            <h4
              onClick={() => setShowPhoneModal(true)}
              className="cursor-pointer flex text-gray-400 items-center gap-2 hover:text-white"
            >
              <HiPencil className="text-lg" /> Update
            </h4>
          </div>

          {showPhoneModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto w-auto md:w-1/3">
                  <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-[#3B226F] outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-3 rounded-t">
                      <button
                        className="p-1 ml-auto bg-transparent border-0 float-right text-white text-md leading-none font-semibold"
                        onClick={() => closeModal()}
                      >
                        X
                      </button>
                    </div>
                    <div className="relative p-10 flex-auto py-2">
                      <div className="max-w-2xl mx-auto">
                        <TabsMain
                          data={UPDATE_PHONE}
                          tabState={phoneTab === 0 ? "" : setPhoneTab}
                          tabStatus={phoneTab}
                        />
                      </div>

                      {phoneTab === 0 ? (
                        <>
                          <div className="w-full mt-4">
                            <p className="text-white font-light py-3">
                              Registered Phone
                            </p>
                            <p className="md:h-12 bg-blue bg-opacity-50  border border-blue cursor-not-allowed h-10 px-2 py-3 rounded-md text-white w-full">
                              {userDetails.phone}
                            </p>
                          </div>
                          <div className="w-full mt-4">
                            <p className="text-white font-light py-3">
                              New Phone
                            </p>
                            <div className="relative">
                              <input
                                onKeyUp={(e) =>
                                  checkMobileLength(e.target.value)
                                }
                                {...register("phone", {
                                  required: true,
                                  pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Invalid mobile number",
                                  },
                                })}
                                id="new_phone"
                                className="w-full bg-transparent py-6 px-2 text-white border border-blue h-10 rounded"
                                type="number"
                                autoComplete="off"
                              />
                              {showMobileChecked && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                  <BsCheckCircle className="text-xl text-[#00D8D8]" />
                                </span>
                              )}
                            </div>
                            {errors.phone && (
                              <p className="text-[12px] text-red-400 py-2 float-right">
                                Enter valid mobile number
                              </p>
                            )}
                          </div>
                          <div
                            className={`flex justify-center ${
                              errors.phone ? "mt-10" : ""
                            }`}
                          >
                            <button
                              onClick={() => sendOTP("phoneupdate")}
                              className={`my-12 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2`}
                            >
                              Update Phone Number
                            </button>
                          </div>{" "}
                        </>
                      ) : (
                        <>
                          <div className="w-full">
                            <p className="text-white font-light py-3">
                              Enter OTP
                            </p>
                            <input
                              onInput={(e) => handlePasswordChange("OTP")}
                              {...register("OTP", {
                                required: true,
                                pattern: {
                                  value: /^[0-9]\d{5}$/,
                                  message: "Invalid OTP",
                                },
                              })}
                              type="number"
                              autoComplete="off"
                              className="w-full bg-transparent py-6 px-2 text-white border border-blue h-10 rounded"
                            />
                            {errors.OTP && (
                              <p className="text-[12px] text-red-400 py-2 float-right">
                                Enter valid OTP
                              </p>
                            )}

                            {errors.serverErrorOTP && (
                              <div className="flex justify-end mr-5">
                                <p className="text-[12px] text-red-400 py-2 float-right">
                                  Invalid OTP
                                </p>
                              </div>
                            )}
                          </div>
                          <p
                            onClick={() => sendOTP("phoneupdate")}
                            className="cursor-pointer text-white font-light py-3 underline"
                          >
                            Resend OTP
                          </p>
                          <div className="flex justify-center">
                            <button
                              onClick={handleSubmit(onSubmit)}
                              className="mb-10 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
                            >
                              Verify OTP
                            </button>
                          </div>{" "}
                        </>
                      )}
                      {/* {phoneTab === 0 ? (
                        <>
                          <div className="w-full mt-4">
                            <p className="text-white font-light py-3">
                              New Phone
                            </p>
                            <div className="relative">
                              <input
                                onKeyUp={(e) =>
                                  checkMobileLength(e.target.value)
                                }
                                {...register("phone", {
                                  required: true,
                                  pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Invalid mobile number",
                                  },
                                })}
                                id="new_phone"
                                className="w-full bg-transparent py-6 px-2 text-white border border-blue h-10 rounded"
                                type="number"
                              />
                              {showMobileChecked && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                  <BsCheckCircle className="text-xl text-[#00D8D8]" />
                                </span>
                              )}
                            </div>
                            {errors.phone && (
                              <p className="text-[12px] text-red-400 py-2 float-right">
                                Enter valid mobile number
                              </p>
                            )}
                          </div>
                          <div
                            className={`flex justify-center ${
                              errors.phone ? "mt-10" : ""
                            }`}
                          >
                            <button
                              onClick={() => sendOTP("phoneupdate")}
                              className={`my-12 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2`}
                            >
                              Update Phone Number
                            </button>
                          </div>{" "}
                        </>
                      ) : (
                        <>
                          <div className="w-full mt-4">
                            <p className="text-white font-light py-3">
                              Registered Phone
                            </p>
                            <p className="md:h-12 bg-transparent border border-blue cursor-not-allowed h-10 px-2 py-3 rounded-md text-white w-full">
                              {userDetails.phone}
                            </p>
                          </div>
                          <div className="w-full">
                            <p className="text-white font-light py-3">
                              Enter OTP
                            </p>
                            <input
                              {...register("OTP", {
                                required: true,
                                value: "",
                              })}
                              type="number"
                              className="w-full bg-transparent py-6 px-2 text-white border border-blue h-10 rounded"
                            />
                          </div>
                          <p
                            onClick={() => sendOTP("phoneupdate")}
                            className="cursor-pointer text-white font-light py-3 underline"
                          >
                            Resend OTP
                          </p>
                          <div className="flex justify-center">
                            <button
                              onClick={handleSubmit(onSubmit)}
                              className="my-12 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
                            >
                              Verify OTP
                            </button>
                          </div>{" "}
                        </>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>

        <div className="flex-1 mb-6 md:mb-0 md:flex mx-3 md:mx-16 py-3 text-white gap-5">
          <div className="flex justify-between md:justify-start w-auto md:w-1/2 border border-gray-400 rounded-md py-5 gap-8 px-8">
            <p className="text-gray-400 ">Email ID : </p>
            <input
              onChange={(e) => e.target.value}
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                  message: "Invalid email id",
                },
              })}
              className={`bg-transparent border ${
                errors.email ? "border-red-500" : "border-blue"
              } pl-2 text-sm text-white rounded-md w-[80%] placeholder-blue`}
              placeholder="XXXX"
              defaultValue={userDetails.email}
            />
          </div>
          <div className="flex float-right px-0 md:px-12 gap-10 mt-2 md:mt-0">
            <h4 className="flex text-gray-400 items-center gap-2">
              <FaRegCheckCircle className="text-xl" /> Verify
            </h4>
            <h4
              className="flex text-gray-400 items-center gap-2 hover:text-white cursor-pointer"
              onClick={() => updateEmail()}
            >
              <HiPencil className="text-lg" /> Update
            </h4>
          </div>
        </div>

        {/* <div className="flex-1 mb-6 md:mb-0 md:flex mx-3 md:mx-16 py-3 text-white">
          <div className="flex justify-between md:justify-start w-auto md:w-1/2 border border-gray-400 rounded-md py-5 gap-8 px-8">
            <p className="text-gray-400">Password : </p>
            <h4>XXXXXXXXXXX</h4>
          </div> 
           <div className="flex float-right px-0 md:px-12 gap-12 mt-2 md:mt-0">
            <h4 className="flex text-gray-400 items-center gap-2">
              <FaRegCheckCircle className="text-xl" /> Verify
            </h4>
            <h4 className="flex text-gray-400 items-center gap-2">
              <HiPencil className="text-lg" /> Update
            </h4>
          </div> 
        </div> */}

        <div className="flex flex-col md:flex-row mt-20 gap-5 items-center text-white justify-center">
          <h4>KYC verification Done?</h4>
          <button className="block font-light text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2">
            {" "}
            Initiate KYC{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateProfileArtist;
