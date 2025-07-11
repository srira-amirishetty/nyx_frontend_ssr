/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetOTPService } from "@nyx-frontend/main/services/loginService";
import Select from "react-select";
import { loginPopUpCountryStyles } from "./constants";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import "./index.css";
import LeftArrow from "@nyx-frontend/main/components/Icons/LeftArrow";
import EmailSVGIcon from "../../../components/Icons/EmailSVGIcon";
import EmailSVGIconColor from "../../../components/Icons/EmailSVGIconColor";
import GoogleSVGIcon from "../../../components/Icons/GoogleSVGIcon";
import GoogleSVGIconColor from "../../../components/Icons/GoogleSVGIconColor";
import AppleSVGIcon from "../../../components/Icons/AppleSVGIcon";
import AppleSVGIconColor from "../../../components/Icons/AppleSVGIconColor";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";
import { useGoogleLogin } from "@react-oauth/google";
import { getWorkSapceDetails } from "@nyx-frontend/main/services/workSpace";
import { getNewLoginGoogle } from "@nyx-frontend/main/services/loginService";
import { getUserProfileData } from "@nyx-frontend/main/services/uploadService";
import { verifyJWTToken } from "@nyx-frontend/main/utils/utils";
import { useRouter } from "next/navigation";
import cookie from "cookiejs";
import {CountryData} from "@nyx-frontend/main/components/CountryCodePlugin"

export default function PhonePasswordForget({ RouteRenderPages }) {
  const [number, setnumber] = useState("");
  const [wrongpassword, setwrongpassword] = useState(false);
  const [wrongnumber, setwrongnumber] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [userexisted, setuserexisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [googlebutton, setgooglebutton] = useState(false);
  const [workspace, setWorkspace] = useState("");
  const [googlescreen, setgooglescreen] = useState(false);
  const [googleerror, setgoogleerror] = useState(false);
  const [ValidNumberLength, setValidNumberLength] = useState(10);
  const navigate = useRouter();

  const icon = `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.51423 7.48047H18.2051C18.4265 7.48047 18.6387 7.58793 18.7953 7.77922C18.9518 7.97051 19.0397 8.22995 19.0397 8.50047C19.0397 8.77099 18.9518 9.03043 18.7953 9.22172C18.6387 9.41301 18.4265 9.52047 18.2051 9.52047H1.51423C1.2929 9.52047 1.08063 9.41301 0.92412 9.22172C0.767613 9.03043 0.679688 8.77099 0.679688 8.50047C0.679688 8.22995 0.767613 7.97051 0.92412 7.77922C1.08063 7.58793 1.2929 7.48047 1.51423 7.48047Z" fill="white"/>
  <path d="M1.94088 8.5L8.60439 15.5473C8.75525 15.7069 8.84 15.9233 8.84 16.149C8.84 16.3747 8.75525 16.5912 8.60439 16.7508C8.45353 16.9103 8.24892 17 8.03557 17C7.82222 17 7.61761 16.9103 7.46675 16.7508L0.236033 9.10172C0.161214 9.02278 0.101853 8.92899 0.0613508 8.82574C0.0208484 8.72248 0 8.61179 0 8.5C0 8.38821 0.0208484 8.27752 0.0613508 8.17426C0.101853 8.07101 0.161214 7.97722 0.236033 7.89828L7.46675 0.249242C7.61761 0.0896549 7.82222 0 8.03557 0C8.24892 0 8.45353 0.0896549 8.60439 0.249242C8.75525 0.408829 8.84 0.625276 8.84 0.850966C8.84 1.07666 8.75525 1.2931 8.60439 1.45269L1.94088 8.5Z" fill="white"/>
  </svg>
  `;
  const mutatequeryuserinfo = useMutation({
    mutationKey: ["user-details"],
    mutationFn: getUserProfileData,
  });

  const mutateGoogleLogin = useMutation({
    mutationKey: ["Login-api"],
    mutationFn: getNewLoginGoogle,
  });

  const mutateworkspacedetails = useMutation({
    mutationKey: ["workspace-details"],
    mutationFn: getWorkSapceDetails,
  });

  const { data: countries, isSuccess } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=idd,cca2",
      );
      return res.data;
    },
  });

  const countriesOptions = countries
    ?.map((country) => ({
      value: country.idd.root + country.idd.suffixes.join(""),
      label: country.cca2,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const mutateSendOTP = useMutation({
    mutationKey: ["OTPsend-api"],
    mutationFn: GetOTPService,
  });

  useEffect(() => {
    const data = localStorage.getItem("phonenumberlogin");
    if (data) {
      setnumber(data);
    }
  }, []);

  const GetOTP = (e) => {
    e.preventDefault();
    const expression = /^\d{10,15}$/;
    const check = expression.test(Number(number));
    const hasAlphabet = /[a-zA-Z]/.test(number);
    const isNotAllSame = !/^(\d)\1{9}$/.test(Number(number));
    if (check && !hasAlphabet && isNotAllSame) {
      localStorage.setItem("phonenumberlogin", number);
      localStorage.setItem("phonecountrycodelogin", countryCode.value);
      setIsLoading(true);
      let data = {
        countryCode: countryCode.value, // if channel == "sms", please provide
        phoneNumber: number, // if channel == "sms", please provide
        channel: "sms", // "sms", "email"
        email: "",
        type: "forgetpassword",
      };
      console.log(data, "data");
      mutateSendOTP.mutate(data, {
        onSuccess: (response) => {
          const verify = response.verification_id;
          localStorage.setItem("verificationID", verify);
          RouteRenderPages("OTP");
        },
        onError: (error) => {
          setIsLoading(false);
          const errormsg = error.response.data.error;
          console.log(errormsg);
          if (errormsg === "Bad Request: User doesn't exist") {
            setuserexisted(true);
          } else {
            setwrongnumber(true);
          }
        },
      });
    } else {
      setwrongpassword(true);
    }
  };

  const workSpaceDetails = () => {
    return new Promise((resolve, reject) => {
      mutateworkspacedetails.mutate(
        {},
        {
          onSuccess: (response) => {
            const responseData = response;
            const workspaceNames = responseData.workspaces.map(
              (workspace) => workspace.workspaceSlug,
            );
            localStorage.setItem(
              "WorkspaceArray",
              JSON.stringify(workspaceNames),
            );
            const workspaceslug = responseData.workspaces.map(
              (workspace) => workspace.workspaceName,
            );
            localStorage.setItem(
              "WorkspaceArrayslug",
              JSON.stringify(workspaceslug),
            );
            resolve();
          },
          onError: (error) => {
            // console.error(error);
            setIsLoading(false);
            setgoogleerror(true);
            localStorage.removeItem("token");
            reject(error);
            setgooglebutton(false);
          },
        },
      );
    });
  };

  useEffect(() => {
    if (user) {
      setgooglebutton(true);
      setgooglescreen(true);
      const accessToken = user.access_token;
      const authuser = user.authuser;
      const expires_in = user.expires_in;
      const prompt = user.prompt;
      const scope = user.scope;
      const token_type = user.token_type;
      let data = {
        access_token: accessToken,
        authuser: authuser,
        expires_in: expires_in,
        prompt: prompt,
        scope: scope,
        token_type: token_type,
      };
      setIsLoading(true);
      mutateGoogleLogin.mutate(data, {
        onSuccess: (response) => {
          localStorage.setItem("token", response.token);
          const result = verifyJWTToken(response.token);
          if (result.data != null) {
            sessionStorage.setItem("logintype", "artist");
          }
          mutatequeryuserinfo.mutate(
            {},
            {
              onSuccess: async (response) => {
                const workdata = response?.artistProfile?.workspaceSlug;
                localStorage.setItem("workspace_name", workdata);
                const id = response?.artistProfile?.workspaceId;
                localStorage.setItem("workspace_id", id);
                await workSpaceDetails();
                cookie.set("ExpireLoginToken", "true", {
                  expires: 0.5, // expires in 12 hrs
                  path: "/",
                  secure: true,
                });
                setWorkspace(workdata);
                if (workdata === null) {
                  navigate.push(`/apphome/dashboard`);
                } else {
                  if (localStorage.getItem("Login-Type") === "campulse") {
                    navigate.push(`/apphome/${response?.artistProfile?.workspaceSlug}/app-campulse-ai`);
                  } else {
                    navigate.push(`/apphome/${response?.artistProfile?.workspaceSlug}/dashboard`);
                  }
                }
              },
              onError: (error) => {
                // console.error(error);
                localStorage.removeItem("token");
                setgooglebutton(false);
                setgoogleerror(true);
              },
            },
          );
        },
        onError: (error) => {
          console.error("google login error", error);
          setgooglebutton(false);
          setIsLoading(false);
          setgoogleerror(true);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const phonenumbersubmit = (event) => {
    event.preventDefault();
    setnumber(event.target.value);
    setwrongpassword(false);
    setwrongnumber(false);
    setuserexisted(false);
  };
  const SigninWithEmailButton = () => {
    RouteRenderPages("EmailPasswordForget");
  };
  const backButton = () => {
    RouteRenderPages("LoginPhone");
  };

  useEffect(() => {
    if (isSuccess) {
      setCountryCode(countriesOptions.find((option) => option.label === "IN"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const countrySelectOnChangeHandler = (option) => {
    setCountryCode(option);
  };

  useEffect(()=>{
    const country = CountryData?.find(entry => entry.country_code === countryCode.value);
     setValidNumberLength(country?.phone_length)
     setnumber("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[countryCode])

  const closeGoogleLogin = () => {
    setgooglescreen(false);
    setgoogleerror(false);
  };

  return (
    <>
      {!googlescreen ? (
        <div className="sm:w-[350px] w-full">
          <div className="bg-[#281B37] shadow-md rounded-[30px] h-[480px] p-8">
            <div>
              <span>
                <button
                  onClick={backButton}
                  className="svg-icon ml-[-14px] mt-[-2px]"
                >
                  <LeftArrow className="text-white w-5" />
                </button>
              </span>
              <h3 className=" text-center text-[20px] font-semibold font-montserrat mt-[-26px] mb-6">
                Reset Password
              </h3>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-white text-[14px]  mb-1">
                  Phone Number
                </label>
                {/* <input
                type="tel"
                className={`border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#8297BD]`}
                placeholder="+91 xxxxxxxxx"
                value={number}
                onChange={phonenumbersubmit}
              /> */}
                <div className="flex flex-row">
                  <Select
                    options={countriesOptions}
                    placeholder="IN"
                    styles={loginPopUpCountryStyles}
                    className="text-[12px] w-[100px] h-[42px]  md:w-[100px] md:h-[41px] rounded-tl-lg rounded-bl-lg  bg-[#ECECEC16] focus:outline-none"
                    onChange={countrySelectOnChangeHandler}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                  <input
                    type="number"
                    id="phone"
                    placeholder="xxxxxxxxx"
                    // className={
                    //   wrongpassword
                    //     ? `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-r-md w-full placeholder-blue border-[#ff5a68] autofill`
                    //     : `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-r-md w-full placeholder-blue border-[#8297BD] autofill`
                    // }
                    className={
                      false
                        ? `bg-[#ECECEC16] border py-3 pl-2 text-[14px] h-[41px] text-white  rounded-r-md w-full placeholder-blue border-[#ff5a68] autofill`
                        : `bg-[#ECECEC16]  py-3 pl-2 text-[14px] h-[41px] text-white  rounded-r-md w-full placeholder-blue  autofill`
                    }
                    value={number}
                    onChange={phonenumbersubmit}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      if (e.target.value.length > ValidNumberLength) {
                        e.target.value = e.target.value.slice(0, ValidNumberLength);
                      }
                    }}
                  />
                </div>
                {wrongpassword ? (
                  <p className="text-[#ff4545] text-[12px] font-normal absolute  p-1">
                    Please enter valid Phone number
                  </p>
                ) : (
                  <></>
                )}
                {wrongnumber ? (
                  <p className="text-[#ff4545] text-[12px] font-normal absolute  p-1">
                    Could not send an OTP via SMS
                  </p>
                ) : (
                  <></>
                )}
                {userexisted ? (
                  <p className="text-[#ff4545] text-[12px] font-normal absolute  p-1">
                    User doesn&apos;t exist
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-6 mt-7 text-center">
                <button
                  type="submit"
                  className={
                    isLoading
                      ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                      : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                  }
                  onClick={GetOTP}
                  disabled={
                    isLoading ||
                    mutateSendOTP.isPending ||
                    mutateworkspacedetails.isPending ||
                    mutateGoogleLogin.isPending ||
                    mutatequeryuserinfo.isPending
                  }
                >
                  {isLoading ||
                  mutateSendOTP.isPending ||
                  mutateworkspacedetails.isPending ||
                  mutateGoogleLogin.isPending ||
                  mutatequeryuserinfo.isPending ? (
                    <ButtonLoading />
                  ) : (
                    "Get OTP"
                  )}
                </button>
              </div>

              <div className="text-center text-white mt-6">
                <div className=" flex items-center justify-center p-4">
                  <div className="w-full h-[1px] bg-white"></div>

                  <div className="text-white  text-[14px] mx-2">OR</div>

                  <div className="w-full h-[1px] bg-white"></div>
                </div>

                <div className="mt-5 flex justify-center gap-x-5 items-center">
                  <div
                    className="bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center"
                    onClick={SigninWithEmailButton}
                  >
                    <span>
                      {" "}
                      <EmailSVGIcon className="group-hover:hidden" />
                      <EmailSVGIconColor className="hidden group-hover:block" />
                    </span>
                  </div>
                  <div
                    className={
                      googlebutton
                        ? `bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] w-[45px] h-[45px] cursor-not-allowed flex justify-center items-center`
                        : `bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center`
                    }
                    onClick={!googlebutton ? login : undefined}
                  >
                    <span>
                      {" "}
                      <GoogleSVGIcon className="group-hover:hidden" />
                      <GoogleSVGIconColor className="hidden group-hover:block" />
                    </span>
                  </div>
                  {/* <div className="bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center">
                  <span>
                    {" "}
                    <AppleSVGIcon className="group-hover:hidden" />
                    <AppleSVGIconColor className="hidden group-hover:block" />
                  </span>
                </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full sm:w-[350px]" id="loginPhone">
          <div className="bg-[#281b37] shadow-md rounded-[30px] p-8 h-[480px] ">
            <div className="mt-[120px]">
              {googleerror ? (
                <h3 className=" text-center text-[#dddcdc] text-[16px] font-semibold font-montserrat mb-4">
                  Oops! Your Google login didn&apos;t work. Please verify your
                  details and try again.
                </h3>
              ) : (
                <h3 className=" text-center text-[20px] font-semibold font-montserrat mb-4">
                  Logging in with Google
                </h3>
              )}
              <div
                className={
                  googleerror
                    ? `flex items-center justify-center mt-4 mb-4`
                    : `flex items-center justify-center mt-8 mb-8`
                }
              >
                {!googleerror && <ButtonLoading />}
              </div>
              <div className="flex items-center justify-center">
                <button
                  className={
                    !googleerror
                      ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                      : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                  }
                  onClick={closeGoogleLogin}
                  disabled={!googleerror}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
