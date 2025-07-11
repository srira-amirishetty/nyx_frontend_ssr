/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { IMAGE_URL, MOBILE_NUMBER_THRESHOLD } from "@nyx-frontend/main/components/constants";
import {
  BASEURL,
  verifyJWTToken,
  LOGIN_OTP,
  LOGIN_TABS,
  LOGIN_USER,
  REGISTERWITHOTP,
  SET_USER_TYPE,
  TABSCLASSAUTH,
  Types,
  _USER_SIGNUP_PHONE,
} from "../utils/utils";
import "../css/main.css";
const logo = IMAGE_URL + "/assets/images/logo/NYXlogo.png";
import { useContext } from "react";
import { UseContextData } from "../hooks/usecontext";
import useRequests from "../hooks/makeRequests";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthTabs } from "../shared/inputs";
import {
  MODAL_CONFIG_LOGIN_SENT_OTP,
  MODAL_CONFIG_LOGIN_VERIFY_OTP,
  MODAL_CONFIG_REGISTER_VERIFY_OTP,
} from "../utils/modalstyles";
import { BsCheckCircle } from "react-icons/bs";
import { ImInfo } from "react-icons/im";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@nyx-frontend/main/services/loginService";
import { AuthLoginFooter, AuthRegisterFooter } from "./AuthFooter";
import { getUserType } from "@nyx-frontend/main/utils/helper";
import NProgress from "nprogress";

function Auth(props) {
  const { currentRoute, setTabName, setUserDetails, showError, reset } =
    useContext(UseContextData);
  const { ptab } = useParams();
  const navigate = useRouter();
  const getTabName = (tabName) => {
    setTabName(tabName);
  };

  const data = () => {
    navigate.push("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  useEffect(() => {
    reset();
    setTabName(LOGIN_TABS[0].name);
    localStorage.removeItem("token");
    document.body.classList.add("bg_auto");
    setUserDetails([]);
    return () => {
      document.body.classList.remove("bg_auto");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="hidden md:block">
        <img
          src={logo}
          className="w-20 fixed left-4 top-0 cursor-pointer"
          alt="logo"
          onClick={data}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between md:mt-40">
        <div className="p-4 m-2 md:pr-20 lg:pr-60 md:order-2">
          <div className="login_section md:w-[23rem]">
            <div className="p-6">
              <img
                onClick={data}
                src={logo}
                className="w-16 mx-auto mb-4 cursor-pointer"
                alt="logo"
                loading="lazy"
                decoding="async"
              />
            </div>
            <AuthTabs
              profile_tab={ptab}
              classes={TABSCLASSAUTH}
              data={LOGIN_TABS}
              getTabName={getTabName}
            />
            {props.children}
          </div>
        </div>
        <div className="p-4 m-2 md:pl-40 lg:pl-72 md:order-1">
          <div className="m-auto">
            <p className="text-blue text-6xl tracking-normal font-extrabold ">
              Invest
            </p>
            <p className="text-blue text-6xl tracking-normal font-extrabold">
              Distribute
            </p>
            <p className="text-blue text-6xl font-extrabold tracking-normal">
              & Earn
            </p>
            <p className="text-white text-base break-words  tracking-normal font-medium mt-3">
              Be a part of the Revolution.
            </p>
            <p className="text-white text-base break-words tracking-normal font-medium">
              {currentRoute === "login" ? "Login" : "Signup"} now to start
              investing in{" "}
            </p>
            <p className="text-white text-base break-words tracking-normal font-medium">
              NYX shares.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const Register = () => {
  const searchParams = useSearchParams();
  const [verificationCode, setVerificationCode] = useState("");
  const [showReferral, setRefferal] = useState(false);
  const [showOtpInput, setOtpInput] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [serverError, setServerError] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const { setIsLoggedIn, setCurrentRoute, setType, reset } =
    useContext(UseContextData);
  const { post } = useRequests();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useRouter();
  const { ptab } = useParams();

  useEffect(() => {
    if (searchParams.get("code")) {
      setRefferal(true);
      setValue("referral", searchParams.get("code"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onSubmit = async (data) => {
    setTimeLeft(59);
    const payload = {
      countryCode: "91",
      phone: data.number,
      password: data.password,
      otp: data.OTP,
      referralCode: data.referral,
      verification_key: verificationCode,
      ...Types[ptab === "user" ? "register_user" : "register_artist"],
    };

    const logged_type = ptab === "user" ? "/users" : "/artists";
    const response = await post(
      BASEURL + logged_type + _USER_SIGNUP_PHONE,
      payload,
      MODAL_CONFIG_REGISTER_VERIFY_OTP,
    );

    if (response.response === "Success") {
      localStorage.setItem("token", response.data.token);
      setType(verifyJWTToken(response.data.token).data.type);
      sessionStorage.setItem(
        "logintype",
        verifyJWTToken(response.data.token).data.type,
      );
      setIsLoggedIn(verifyJWTToken(response.data.token).data != null);
      if (verifyJWTToken(response.data.token).data.type === "artist") {
        navigate.push("/onboard");
      } else {
        navigate.push("/");
      }
    } else {
      setServerError(response.error);
      if (response.response == "Failed") {
        setError("RegErrOTP");
      }
    }
    // } else {
    //   sendOTP();
    // }
  };

  useEffect(() => {
    reset();
    setCurrentRoute("register");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendOTP = async () => {
    setTimeLeft(59);
    let payload = {
      countryCode: "91",
      phone: getValues("number"),
      ...Types[ptab === "user" ? "register_user" : "register_artist"],
    };

    const response = await post(
      REGISTERWITHOTP,
      payload,
      MODAL_CONFIG_LOGIN_SENT_OTP,
    );
    if (response.data.message === "Otp sent to phone") {
      setOtpInput(true);
      setVerificationCode(response.data.verification_key);
      toast.success("OTP sent to your number");
    } else {
      if (response.response == "Failed") {
        setError("phoneExists");
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
    clearErrors("confirm");
    clearErrors("password");
    clearErrors("phone");
    clearErrors("phoneExists");
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeOTP = (event) => {
    clearErrors("RegErrOTP");
  };

  const inputLength = watch("number");

  return (
    <>
      <form>
        <div className="relative top-8">
          <div className={`m-auto w-[90%] mt-2`}>
            <div className="relative">
              <input
                type="number"
                {...register("number", {
                  pattern: {
                    value: /\d{10}$/,
                    message: "Invalid mobile number",
                  },
                  required: true,
                })}
                className={`border ${
                  errors.number ? "border-red-500" : "border-blue"
                } py-3 pl-2 text-sm text-white bg-transparent rounded-md w-full placeholder-blue`}
                placeholder="Mobile Number *"
              ></input>
              {inputLength?.length === MOBILE_NUMBER_THRESHOLD && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <BsCheckCircle className="text-xl text-[#00D8D8]" />
                </span>
              )}
            </div>
            {errors.number && (
              <p className="text-[12px] text-red-400 py-2 float-right">
                Enter valid mobile number
              </p>
            )}
          </div>
          <div className={`m-auto w-[90%] mt-${errors.number ? "1" : "2"}`}>
            <div className="relative">
              <input
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                  },
                })}
                className={`bg-transparent border ${
                  errors.password ? "border-red-500" : "border-blue"
                } py-3 pl-2 text-sm text-white rounded-md w-full placeholder-blue`}
                placeholder="Password"
              ></input>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 group">
                <ImInfo
                  className={`text-lg text-blue ${errors.number ? "mt-8" : ""}`}
                />
                <div className="absolute bottom-6 right-8  w-[15rem] rounded-md bg-black p-2 scale-0 text-xs text-white group-hover:scale-100">
                  <ul className="list-disc ml-3">
                    <li>Min 8 characters, combination of upper & lower case</li>
                    <li>
                      Should have atleast 1 numeric & 1 special character like
                      @,_&-!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {errors.password && (
              <p className="text-[12px] text-red-400 py-2 float-right">
                Enter valid password
              </p>
            )}
          </div>
          <div className={`m-auto w-[90%] mt-${errors.password ? "1" : "2"}`}>
            <input
              type={values.showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              {...register("confirm", {
                required: true,
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                },
                validate: (val) => {
                  if (getValues("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              className={`bg-transparent border ${
                errors.confirm ? "border-red-500" : "border-blue"
              } py-3 pl-2 text-sm text-white rounded-md w-full placeholder-blue`}
              placeholder="Confirm Password"
            ></input>
            <span
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              className="absolute right-0 pt-4 pr-8 "
            >
              {values.showPassword ? (
                <AiFillEye className="cursor-pointer text-lg text-blue" />
              ) : (
                <AiTwotoneEyeInvisible className="cursor-pointer text-lg text-blue" />
              )}
            </span>{" "}
            {errors.confirm && (
              <p className="text-[12px] text-red-400 py-2 float-right">
                Password does not match
              </p>
            )}
            {/* <span className="text-[9px] py-2 float-right text-red-500">
              {showError}
            </span> */}
            {errors.phoneExists && (
              <p className="text-[12px] text-red-400 py-2 float-right">
                phone number exists
              </p>
            )}
          </div>
          {!showReferral && (
            <div className={`m-auto w-[90%] `}>
              <p
                onClick={() => setRefferal(!showReferral)}
                className="text-[13px] w-[40%] justify-start py-2 text-blue cursor-pointer hover:text-white"
              >
                Have Referral code?
              </p>
            </div>
          )}
          {showReferral && (
            <div className={`m-auto w-[90%] mt-${errors.confirm ? "1" : "2"}`}>
              <input
                defaultValue={getValues("referral")}
                {...register("referral", { required: false })}
                className="bg-transparent border border-blue py-3 pl-2 text-sm text-white rounded-md w-full"
                placeholder="Enter Referral code"
              ></input>
            </div>
          )}

          {showOtpInput && (
            <div className={`m-auto w-[90%] mt-${errors.OTP ? "2" : "2"}`}>
              <input
                type="text"
                {...register("OTP", { required: true, value: "" })}
                onInput={(e) => handleChangeOTP(e)}
                className="bg-transparent border border-blue py-3 pl-2 text-sm text-white rounded-md w-full"
                placeholder="Enter OTP"
                autoComplete="new-password"
              />
              {/* {checkOtp && <p className='text-[12px] text-red-400 pt-1'>OTP is not Entered</p>} */}
            </div>
          )}

          <div className="flex justify-between">
            {showOtpInput && timeLeft === 0 && (
              <p
                className="text-[13px] pt-2 ml-5  text-blue cursor-pointer"
                onClick={() => sendOTP()}
              >
                Resend OTP?{" "}
              </p>
            )}

            {showOtpInput && timeLeft > 0 && (
              <p className="text-[13px] pt-2 ml-5  text-blue">
                Resend OTP in {timeLeft} seconds
              </p>
            )}

            {errors.OTP && (
              <p
                className={`text-[12px] text-red-400 py-2 float-right ${
                  !errors.RegErrOTP ? "ml-20" : ""
                }`}
              >
                Enter valid OTP
              </p>
            )}

            <div className="flex justify-end ml-4">
              {errors.RegErrOTP && (
                <p className="text-[12px] text-red-400 py-2 mr-5 float-right">
                  {serverError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* {!showOtpInput ? <div onClick={handleSubmit(onSubmit)} className='border rounded-md  font-light p-2 w-[23%] text-sm m-auto mt-14 text-center text-white cursor-pointer' >Signup</div> : <div onClick={handleSubmit(onSubmit)} className='cursor-pointer border rounded-md  font-light p-2 w-[35%] text-sm m-auto mt-14 text-center text-white'>Verify OTP</div>} */}
        <div className="flex justify-center">
          {!showOtpInput ? (
            <button
              onClick={handleSubmit(onSubmit)}
              className={`mt-${
                errors.OTP ? "2" : ""
              } mt-10 w-[45%] block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2`}
            >
              {" "}
              Signup{" "}
            </button>
          ) : (
            <button
              onClick={handleSubmit(onSubmit)}
              className="mt-10 w-[45%] block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
            >
              {" "}
              Verify OTP{" "}
            </button>
          )}
        </div>
      </form>
      <AuthRegisterFooter userType={ptab} />
    </>
  );
};

export const LoginForm = () => {
  const { ptab } = useParams();

  const { setCurrentRoute, setIsLoggedIn, setType, reset } =
    useContext(UseContextData);
  const [showOtpInput, setOtpInput] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const { post, get } = useRequests();
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
    trigger,
    setError,
    watch,
  } = useForm();
  const navigate = useRouter();
  const [params, setParams] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const mutationLogin = useMutation({
    mutationKey: ["login-user-artist"],
    mutationFn: async (data) => {
      const userTypeObject = getUserType(ptab);
      const url = userTypeObject.type + LOGIN_USER;
      return loginService(url, data);
    },
    onSuccess: (response) => {
      NProgress.start();
      reset();
      localStorage.setItem("token", response.token);
      const result = verifyJWTToken(response.token);
      setIsLoggedIn(result.data != null);
      if (result.data != null) {
        setType(result.data.type);
        sessionStorage.setItem("logintype", result.data.type);
      }
      // /appname/[workspace]/image-to-image
      if (ptab === "user") {
        navigate.push("/marketplace");
      } else {
        const localRoute = localStorage.getItem("route");
        if (localRoute) {
          navigate.push(localRoute);
        } else {
          navigate.push("/");
        }
      }

      setType(verifyJWTToken(response.token).data.type);
      sessionStorage.setItem(
        "logintype",
        verifyJWTToken(response.token).data.type,
      );
    },
    onError: (res) => {
      setError("serverErrorPassword");
    },
  });

  useEffect(() => {
    reset();
    setCurrentRoute("login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    setTimeLeft(59);
    const userType = getUserType(ptab);
    mutationLogin.mutate({
      countryCode: "+91",
      phone: data.number,
      password: data.password,
      ...Types[userType.base],
    });
  };

  const sendOTP = async () => {
    if (getValues("number").length === 0) {
      trigger("number");
    } else {
      const userType = getUserType(ptab);
      const payload = {
        countryCode: "91",
        phone: getValues("number"),
        type: "signin",
        ...Types[userType.base],
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
    reset();
    if (getValues("otp").length === 0 && getValues("number").length === 0) {
      trigger("otp");
      trigger("number");
    } else if (getValues("otp").length === 0) {
      trigger("otp");
    } else {
      const userType = getUserType(ptab);
      const payload = {
        countryCode: "91",
        phone: getValues("number"),
        otp: parseInt(getValues("otp")),
        verification_key: verificationCode,
        ...Types[userType.base],
      };

      const response = await post(
        BASEURL + userType.type + LOGIN_OTP,
        payload,
        MODAL_CONFIG_LOGIN_VERIFY_OTP,
      );
      if (response.response === "Success") {
        setOtpInput(true);
        localStorage.setItem("token", response.data.token);
        setType(verifyJWTToken(response.data.token).data.type);
        setIsLoggedIn(verifyJWTToken(response.data.token).data != null);
        navigate.push("/");
      } else {
        if (response.response == "Failed") {
          setError("serverErrorOTP");
        }
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
    clearErrors("otp");
    clearErrors("serverErrorOTP");
    clearErrors("serverErrorPassword");
    clearErrors("password");
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleKeyPress = (event) => {
    clearErrors("serverErrorPassword");
  };

  const updateSetParams = (value, type = "") => {
    clearErrors(type);
    setParams(value);
  };

  const inputLength = watch("number");

  if (params) {
    return (
      <>
        <div className="relative top-8">
          <div className="m-auto w-[90%] mt-4">
            <input
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
            {inputLength?.length === MOBILE_NUMBER_THRESHOLD && (
              <span className="absolute right-0 pt-4 pr-8">
                <BsCheckCircle className="text-xl text-[#00D8D8]" />
              </span>
            )}
            {errors.number && (
              <p className="text-[12px] text-red-400 pt-1 float-right">
                Enter valid mobile number
              </p>
            )}
          </div>
          <div className={`m-auto w-[90%] mt-${errors.number ? "1" : "2"}`}>
            {showOtpInput && (
              <>
                <input
                  {...register("otp", {
                    required: true,
                    pattern: {
                      value: /^[0-9]\d{5}$/,
                      message: "Invalid OTP",
                    },
                  })}
                  type={showOtpInput ? "text" : "password"}
                  onChange={handlePasswordChange("otp")}
                  className="bg-transparent border border-blue py-3 pl-2 text-sm text-white rounded-md w-full placeholder-blue"
                  placeholder="OTP"
                  autoComplete="off"
                />
                {/* <span
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                className="absolute right-0 pt-4 pr-8"
              >
                {values.showPassword ? (
                  <AiFillEye className="cursor-pointer text-lg text-blue" />
                ) : (
                  <AiTwotoneEyeInvisible className="cursor-pointer text-lg text-blue" />
                )}
              </span>{" "} */}
              </>
            )}
            {errors.otp && (
              <p className="text-[12px] text-red-400 pt-1 float-right">
                Enter valid OTP
              </p>
            )}

            {errors.serverErrorOTP && (
              <p className="text-[12px] text-red-400 py-2 float-right">
                Invalid OTP
              </p>
            )}
          </div>
          <div className="flex justify-end mr-5">
            {/* <span className="text-[12px] text-red-400 pt-1 float-right">
                {showError}
          </span> */}
          </div>
          {showOtpInput ? (
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
              <button
                className="text-[13px] pt-2 mr-5 mx-5 text-blue cursor-pointer hover:text-white"
                onClick={() => updateSetParams(false, "serverErrorOTP")}
              >
                Login via Password?
              </button>
            </div>
          ) : (
            <button
              className="text-[13px] pt-2 px-5 pr-5 text-blue cursor-pointer hover:text-white"
              onClick={() => {
                updateSetParams(false, "serverErrorOTP");
              }}
            >
              Login via Password{" "}
            </button>
          )}

          {/* {!showOtpInput ? (
          <div
            className="border rounded-md  text-white hover:text-black border-amber-400 hover:bg-amber-300 p-2 w-[45%] text-sm m-auto mt-5 text-center cursor-pointer"
            onClick={() => sendOTP()}
          >
            SEND OTP
          </div>
        ) : (
          <div
            className="border rounded-md  font-light p-2 w-[45%] text-sm m-auto mt-8 text-center text-white cursor-pointer"
            onClick={() => LoginWithOTP()}
          >
            VERIFY OTP
          </div>
        )} */}
        </div>

        <AuthLoginFooter userType={ptab} />
      </>
    );
  }

  return (
    <>
      <div className="relative top-8">
        <div className="m-auto w-[90%] mt-4">
          <input
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
          />
          {inputLength?.length === MOBILE_NUMBER_THRESHOLD && (
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
        <div className={`m-auto w-[90%] ${errors.number ? "mt-1" : "mt-2"}`}>
          <>
            <input
              type={values.showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              onKeyDown={handleKeyPress}
              {...register("password", { required: true })}
              className={`bg-transparent border ${
                errors.password ? "border-red-500" : "border-blue"
              } py-3 outline-none pl-2 text-sm text-white rounded-md w-full placeholder-blue`}
              placeholder="Password"
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
          {/* {errors.password && (
            <p className="text-[12px] text-red-400 py-2 float-right">
              {showOtpInput ? "Enter valid OTP" : "Enter Password"}
            </p>
          )} */}
        </div>

        <div>
          {/* <span
            className="text-[13px] pt-2 mr-5 mx-5 text-blue cursor-pointer hover:text-white"
            onClick={() => updateSetParams(true, "serverErrorPassword")}
          >
            Login via OTP{" "}
          </span> */}
          {/* <span className="text-[13px] pt-2 mr-5 mx-5 text-red-500 cursor-pointer">
            {showError}
          </span> */}
          {errors.serverErrorPassword && (
            <span className="mr-6 px-4 text-[12px] text-red-400 w-full block py-1 text-right">
              Invalid number or password
            </span>
          )}
        </div>

        <button
          className="border rounded-md mx-auto block text-white hover:text-black border-amber-400 hover:bg-amber-300 p-2 w-[45%] m-auto mt-4 text-center cursor-pointer"
          onClick={handleSubmit(onSubmit)}
        >
          {mutationLogin.isPending ? "Login...." : "Login"}
        </button>
      </div>

      <AuthLoginFooter userType={ptab} />
    </>
  );
};

export default Auth;
