"use client";
import { useContext, useState, useEffect } from "react";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import {
  BASEURL,
  GET_SHOPPING_CART,
  verifyJWTToken,
  LOGIN_OTP,
  LOGIN_TABS,
  LOGIN_USER,
  REGISTERWITHOTP,
  SET_TOAST,
  SET_USER_TYPE,
  TABSCLASSAUTH,
  Types,
  USER_PROFILE,
  VERIFY_OTP,
  WALLETS,
  _USER_SIGNUP_PHONE,
  GUEST_LOGIN,
  ORDER_PAYMENT_INTENT,
} from "@nyx-frontend/main/utils/utils";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@nyx-frontend/main/css/main.css";

import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  MODAL_CONFIG_FOR_LOADER,
  MODAL_CONFIG_LOGIN,
  MODAL_CONFIG_LOGIN_SENT_OTP,
  MODAL_CONFIG_LOGIN_VERIFY_OTP,
  MODAL_CONFIG_REGISTER_VERIFY_OTP,
  MODAL_CONFIG,
  MODAL_CONFIG_PROCESSING,
} from "@nyx-frontend/main/utils/modalstyles";
import { BsCheckCircle } from "react-icons/bs";
import { ImInfo } from "react-icons/im";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import Link from "next/link";

export const PreLoginModalForm = ({ updateCartDetails, onClose, userType }) => {
  const { setIsLoggedIn, setUserDetails, cartDetails, setType, showError } =
    useContext(UseContextData);
  const [showOtpInput, setOtpInput] = useState(false);
  const [showMobileChecked, setShowMobileChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const { post, get } = useRequests();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    trigger,
  } = useForm();
  const navigate = useRouter();
  const [params, setParams] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const searchParams = useSearchParams();
  const [showReferral, setShowReferral] = useState(false);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const checkMobileLength = (val) => {
    if (val.length === 10) {
      setShowMobileChecked(true);
      errors.number = null;
    } else {
      setShowMobileChecked(false);
    }
  };

  useEffect(() => {
    setValue("referral", searchParams.get("code"));
  }, [searchParams]);

  const checkAuth = async () => {
    const result = verifyJWTToken(localStorage.getItem("token"));
    setIsLoggedIn(result.data != null);
    if (result.data != null) {
      setType(result.data.type);

      getUserProfile(result.data.type);
    }
  };

  const getUserProfile = async (type) => {
    const user_details = verifyJWTToken(localStorage.getItem("token"));
    let logged_type = userType === "artists" ? "/artists" : "/users";
    let logged_profile_type =
      user_details.data.type == "artist" ? "artistProfile" : "userProfile";
    const res = await get(
      BASEURL + logged_type + USER_PROFILE,
      //MODAL_CONFIG_FOR_LOADER
    );
    if (res.response === "Success") {
      let userData = res.data[logged_profile_type];
      setUserDetails({ ...userData });
      cartDetails.inr_balance = userData.inr_balance;
      cartDetails.coin_balance = userData.coin_balance;
      updateCartDetails(cartDetails);
      SET_USER_TYPE(type);
    } else {
      navigate.push("/cart");
      onClose();
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeLeft(59);
    let payload = {
      countryCode: "+91",
      phone: data.number,
      password: data.password,
      ...Types["login_guest_user"],
    };

    let logged_type = userType === "artists" ? "/artists" : "/users";

    const response = await post(
      BASEURL + logged_type + LOGIN_USER,
      payload,
      MODAL_CONFIG_LOGIN,
    );
    setLoading(false);
    if (response.response === "Success") {
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(verifyJWTToken(response.data.token).data != null);
      checkAuth();
      setType(verifyJWTToken(response.data.token).data.type);
      onClose();
    }
  };

  const sendOTP = async () => {
    if (getValues("number").length === 0) {
      trigger("number");
    } else {
      let payload = {
        countryCode: "91",
        phone: getValues("number"),
        ...Types["login_guest_user"],
      };

      setOtpInput(true);

      const response = await post(
        REGISTERWITHOTP,
        payload,
        MODAL_CONFIG_LOGIN_SENT_OTP,
      );

      if (response.data.message === "Otp sent to phone") {
        setTimeLeft(59);
        setVerificationCode(response.data.verification_key);
        toast.success("OTP sent to your number");
      } else {
        setTimeLeft(59);
      }
    }
  };

  const LoginWithOTP = async () => {
    if (getValues("number").length === 0) {
      trigger("number");
    } else if (getValues("password").length === 0) {
      trigger("password");
    } else {
      let payload = {
        countryCode: "91",
        phone: getValues("number"),
        otp: parseInt(getValues("password")),
        referralCode: getValues("referral"),
        verification_key: verificationCode,
        ...Types["login_guest_user"],
      };
      let logged_type = "/users";

      const response = await post(
        BASEURL + logged_type + GUEST_LOGIN,
        payload,
        MODAL_CONFIG_LOGIN_VERIFY_OTP,
      );
      if (response.response === "Success") {
        // setOtpInput(true);
        localStorage.setItem("token", response.data.token);
        setType(verifyJWTToken(response.data.token).data.type);
        setIsLoggedIn(verifyJWTToken(response.data.token).data != null);
        checkAuth();

        document.cookie = "gCartQty=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        onClose();

        // // continue the purchase
        // let payload = {
        //   couponId: null,
        //   coinsUsed: null,
        //   walletInrUsed: null,
        //   couponDiscount: null,
        // };
        // const payment = await post(
        //   BASEURL + ORDER_PAYMENT_INTENT,
        //   payload,
        //   MODAL_CONFIG_PROCESSING
        // );
        // window.open(payment.data.url, "_self");
      } else {
        errors.password = response.error;
      }
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    errors.password = null;
    setValues({ ...values, [prop]: event.target.value });
  };

  return !params ? (
    <>
      <p className="text-white text-center m-4 ">
        {!params && "Login as Guest"}
      </p>
      <div className="relative top-8">
        <div className="m-auto w-[90%] mt-4">
          <input
            type="number"
            onKeyUp={(e) => checkMobileLength(e.target.value)}
            {...register("number", {
              required: true,
              pattern: {
                value: /\d{10}$/,
                message: "Invalid mobile number",
              },
            })}
            className="bg-transparent border border-blue py-3 pl-2 text-sm text-white rounded-md w-full placeholder-blue"
            placeholder="Mobile Number *"
          ></input>
          {showMobileChecked && (
            <span className="absolute right-0 pt-4 pr-8">
              <BsCheckCircle className="text-xl text-[#00D8D8]" />
            </span>
          )}
          {errors.number && (
            <p className="text-right text-[12px] text-red-400 pt-1">
              Enter valid mobile number
            </p>
          )}
        </div>
        <div className={`m-auto w-[90%] mt-${errors.number ? "1" : "2"}`}>
          {/* {showOtpInput && (
            <>
              <input
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                {...register("password", { required: true })}
                className="bg-transparent border border-blue py-3 pl-2 text-sm text-white rounded-md w-full placeholder-blue"
                placeholder="OTP"
                autoComplete="new-password"
              />
              <span
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                className="absolute right-0 pt-4 pr-8"
              >
                {values.showPassword ? (
                  <AiFillEye className="cursor-pointer text-lg text-blue" />
                ) : (
                  <AiTwotoneEyeInvisible className="cursor-pointer text-lg text-blue" />
                )}
              </span>{" "}
            </>
          )}
          {errors.password && (
            <p className="absolute right-0 mr-6 mt-1 text-[12px] text-red-400 pt-1">
              {showOtpInput ? "Invalid OTP" : "Enter Password"}
            </p>
          )} */}
        </div>

        {/* {showOtpInput ? (
          <>
            <div className="flex flex-col justify-between">
              {timeLeft === 0 && (
                <span
                  className="text-[13px] pt-2 ml-5 text-blue cursor-pointer"
                  onClick={() => sendOTP()}
                >
                  Resend OTP?{" "}
                </span>
              )}
              {timeLeft > 0 && (
                <span className="text-[13px] pt-2 ml-5 text-blue">
                  Resend OTP in {timeLeft} seconds
                </span>
              )}
            </div>
            {!showReferral && (
              <div className={`m-auto w-[90%] `}>
                <p
                  onClick={() => setShowReferral(!showReferral)}
                  className="text-[13px] w-[40%] justify-start py-2 text-blue cursor-pointer"
                >
                  Have Referral code?
                </p>
              </div>
            )}
            {showReferral && (
              <div
                className={`m-auto w-[90%] mt-${errors.confirm ? "1" : "2"}`}
              >
                <input
                  defaultValue={getValues("referral")}
                  {...register("referral", { required: false })}
                  className="bg-transparent border border-blue py-3 pl-2 text-sm text-white rounded-md w-full"
                  placeholder="Enter Referral code"
                ></input>
              </div>
            )}
          </>
        ) : (
          <></>
        )} */}

        {/* {!showOtpInput ? (
          <div
            className="border rounded-md  text-white hover:text-black border-amber-400 hover:bg-amber-300 p-2 w-40 text-sm m-auto mt-4 text-center cursor-pointer"
            onClick={() => sendOTP()}
          >
            SEND OTP
          </div>
        ) : (
          <div
            className="border rounded-md  font-light p-2 w-[35%] text-sm m-auto mt-4 text-center text-white cursor-pointer"
            onClick={() => LoginWithOTP()}
          >
            VERIFY OTP
          </div>
        )} */}
      </div>

      <p className="text-center text-[12px] text-blue m-auto w-[95%] pt-16">
        By signing in you agree to the{" "}
        <Link
          href="/terms-and-conditions"
          className="cursor-pointer underline hover:text-white"
        >
          terms of service
        </Link>
        ,{" "}
        <Link
          href="/privacy-policy"
          className="cursor-pointer underline hover:text-white"
        >
          privacy policy
        </Link>{" "}
        and{" "}
        <Link
          href="/risk-disclosure"
          className="cursor-pointer underline hover:text-white"
        >
          risk disclosure
        </Link>
      </p>
      <p
        className="text-center text-[12px] text-blue m-auto w-[95%] pt-7 cursor-pointer pb-10"
        onClick={() => {
          setParams(true);
        }}
      >
        Already have an account?<b> Login </b>
      </p>
    </>
  ) : (
    <>
      <p className="text-white text-center m-1 ">{params && "Login"}</p>
      <div className="relative top-8">
        <div className="m-auto w-[90%] mt-4">
          <input
            onKeyUp={(e) => checkMobileLength(e.target.value)}
            type="number"
            {...register("number", {
              required: true,
              pattern: {
                value: /\d{10}$/,
                message: "Invalid mobile number",
              },
            })}
            className={`bg-transparent border ${
              errors.number ? "border-red-500" : "border-blue"
            } py-3 pl-2 text-sm text-white rounded-md w-full placeholder-blue`}
            placeholder="Mobile Number *"
          ></input>
          {showMobileChecked && (
            <span className="absolute right-0 pt-4 pr-8">
              <BsCheckCircle className="text-xl text-[#00D8D8]" />
            </span>
          )}
          {errors.number && (
            <p className="text-[12px] text-red-400 py-2 float-right">
              Enter valid mobile number
            </p>
          )}
        </div>
        <div className={`m-auto w-[90%] mt-${errors.number ? "1" : "2"}`}>
          <>
            <input
              type={values.showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              {...register("password", { required: true })}
              className={`bg-transparent border ${
                errors.password ? "border-red-500" : "border-blue"
              } py-3 outline-none pl-2 text-sm text-white rounded-md w-full placeholder-blue`}
              placeholder="Password"
            ></input>
            <span
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              className="absolute right-0 pt-4 pr-8"
            >
              {values.showPassword ? (
                <AiFillEye className="cursor-pointer text-lg text-blue" />
              ) : (
                <AiTwotoneEyeInvisible className="cursor-pointer text-lg text-blue" />
              )}
            </span>{" "}
          </>
          {errors.password && (
            <p className="text-[12px] text-red-400 py-2 float-right">
              {showOtpInput ? "Enter valid OTP" : "Enter Password"}
            </p>
          )}
        </div>

        <div
          className="border w-40 rounded-md  text-white hover:text-black border-amber-400 hover:bg-amber-300 p-2 m-auto mt-8 text-center cursor-pointer"
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? "Login..." : "Login"}
        </div>
        {/* <div className='flex justify-center'>
                <button onClick={handleSubmit(onSubmit)} className="mt-14 block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"> Login </button>
            </div> */}
      </div>

      <p className="text-center text-[12px] text-blue m-auto w-[95%] pt-12">
        By signing in you agree to the{" "}
        <Link
          href="/terms-and-conditions"
          className="cursor-pointer underline hover:text-white"
        >
          terms of service
        </Link>
        ,{" "}
        <Link
          href="/privacy-policy"
          className="cursor-pointer underline hover:text-white"
        >
          privacy policy
        </Link>{" "}
        and{" "}
        <Link
          href="/risk-disclosure"
          className="cursor-pointer underline hover:text-white"
        >
          risk disclosure
        </Link>
      </p>
      <p
        className="text-center text-[12px] text-blue m-auto w-[95%] pt-7 cursor-pointer pb-10"
        onClick={() => {
          setParams(false);
        }}
      >
        Not Registered yet?<b> Login as guest </b>
      </p>
    </>
  );
};

const PreLoginModal = ({ updateCartDetails, onClose, userType }) => {
  return (
    <>
      <div className="right-5 top-4 absolute"></div>
      <div className="p-5">
        <div className="flex justify-end">
          <div className="pr-3 cursor-pointer" onClick={onClose}>
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

        <div className="m-auto w-[96%]">
          <PreLoginModalForm
            updateCartDetails={updateCartDetails}
            onClose={onClose}
            userType={userType}
          />
        </div>
      </div>
    </>
  );
};

export default PreLoginModal;
