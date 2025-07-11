/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { getNewLoginGoogle, getNewLogin } from "@nyx-frontend/main/services/loginService";

import { verifyJWTToken, _USER_SIGNUP_PHONE } from "@nyx-frontend/main/utils/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import Select, { components } from "react-select";
import { loginPopUpCountryStyles } from "./constants";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getUserProfileData } from "@nyx-frontend/main/services/uploadService";
import { useGoogleLogin } from "@react-oauth/google";
import { getWorkSapceDetails } from "@nyx-frontend/main/services/workSpace";
import "./index.css";
import EmailSVGIcon from "../../../components/Icons/EmailSVGIcon";
import EmailSVGIconColor from "../../../components/Icons/EmailSVGIconColor";
import GoogleSVGIcon from "../../../components/Icons/GoogleSVGIcon";
import GoogleSVGIconColor from "../../../components/Icons/GoogleSVGIconColor";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";
import cookie from "cookiejs";
import { CountryData } from "@nyx-frontend/main/components/CountryCodePlugin";

export default function LoginPhone({ RouteRenderPages, ipData }) {
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [wrongpassword, setwrongpassword] = useState(false);
  const [checkpassword, setcheckpassword] = useState(false);
  const [wrongnumber, setwrongnumber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();
  const [countryCode, setCountryCode] = useState("+91");
  const [workspace, setWorkspace] = useState("");
  const [usernotexisted, setusernotexisted] = useState(false);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [googlebutton, setgooglebutton] = useState(false);
  const [googlescreen, setgooglescreen] = useState(false);
  const [googleerror, setgoogleerror] = useState(false);
  const [ValidNumberLength, setValidNumberLength] = useState(10);

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

  const mutateLogin = useMutation({
    mutationKey: ["Login-api"],
    mutationFn: getNewLogin,
  });

  const LoginUser = (e) => {
    e.preventDefault();
    setusernotexisted(false);
    setwrongpassword(false);
    const expression = /^\d{10,15}$/;
    const isNotAllSame = !/^(\d)\1{9}$/.test(Number(number));
    const check = expression.test(Number(number));

    const hasAlphabet = /[a-zA-Z]/.test(number);
    if (check && !hasAlphabet && password.length != "" && isNotAllSame) {
      localStorage.setItem("phonenumberlogin", number);
      setIsLoading(true);
      let data = {
        phoneNumber: number,
        password: password,
        countryCode: countryCode.value,
        ip_info: ipData,
      };

      mutateLogin.mutate(data, {
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
                const id = response.artistProfile.workspaceId;
                localStorage.setItem("workspace_id", id);
                localStorage.setItem("workspace_name", workdata);
                await workSpaceDetails();
                setWorkspace(workdata);
                const packageId = searchParams.get("packageid");
                cookie.set("ExpireLoginToken", "true", {
                  expires: 0.5, // expires in 12 hrs
                  path: "/",
                  secure: true,
                });
                if (packageId !== null) {
                  navigate.push("/pricing?packageid=" + packageId);
                } else {
                  if (workdata === null) {
                    navigate.push(`/apphome/dashboard`);
                  } else {
                    if (localStorage.getItem("Login-Type") === "campulse") {
                      navigate.push(
                        `/apphome/${response?.artistProfile?.workspaceSlug}/app-campulse-ai`,
                      );
                    } else {
                      navigate.push(
                        `/apphome/${response?.artistProfile?.workspaceSlug}/dashboard`,
                      );
                    }
                  }
                }
              },
              onError: (error) => {
                localStorage.removeItem("token");
                // console.error("error", error);
                setIsLoading(false);
              },
            },
          );
        },
        onError: (error) => {
          const errormsg = error.response.data.message;
          if (
            errormsg === "Not Found: Phone number doesn't exist in our records"
          ) {
            setusernotexisted(true);
            setIsLoading(false);
          } else {
            setwrongpassword(true);
            setIsLoading(false);
          }
        },
      });
    } else {
      if (!check) {
        setwrongnumber(true);
      } else {
        setwrongpassword(true);
      }
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
        ip_info: ipData,
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
                    navigate.push(
                      `/apphome/${response?.artistProfile?.workspaceSlug}/app-campulse-ai`,
                    );
                  } else {
                    navigate.push(
                      `/apphome/${response?.artistProfile?.workspaceSlug}/dashboard`,
                    );
                  }
                }
              },
              onError: (error) => {
                // console.error(error);
                setgoogleerror(true);
                localStorage.removeItem("token");
                setgooglebutton(false);
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

  const phonenumbersubmit = (event) => {
    event.preventDefault();
    setnumber(event.target.value);
    setwrongpassword(false);
    setwrongnumber(false);
    setcheckpassword(false);
    setcheckpassword(false);
    setusernotexisted(false);
  };
  const paswordsubmit = (event) => {
    event.preventDefault();
    setpassword(event.target.value);
    setwrongpassword(false);
    setwrongnumber(false);
    setcheckpassword(false);
    setcheckpassword(false);
    setusernotexisted(false);
  };
  const ForgotpaswordButton = (event) => {
    event.preventDefault();
    RouteRenderPages("PhonePasswordForgot");
  };

  const SigninWithEmailButton = () => {
    RouteRenderPages("LoginEmail");
  };
  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (isSuccess) {
      setCountryCode(countriesOptions.find((option) => option.label === "IN"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const countrySelectOnChangeHandler = (option) => {
    setCountryCode(option);
  };

  useEffect(() => {
    const country = CountryData?.find(
      (entry) => entry.country_code === countryCode.value,
    );
    setValidNumberLength(country?.phone_length);
    setnumber("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);

  const closeGoogleLogin = () => {
    setgooglescreen(false);
    setgoogleerror(false);
  };

  return (
    <>
      {!googlescreen ? (
        <div className="w-full sm:w-[350px]" id="loginPhone">
          <div className="bg-[#281b37] shadow-md rounded-[30px] p-8 h-[480px]">
            <h3 className=" text-center text-[20px] font-semibold font-montserrat mb-4">
              LogIn
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-white text-[14px]  mb-1">
                  Phone number
                </label>

                {/* <input
                  type="tel"
                  className={wrongpassword ? `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#ff5a68]` : `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-[4px] w-full placeholder-blue border-[#8297BD]`}
                  placeholder="+91 xxxxxxxxx"
                  value={number}
                  onChange={phonenumbersubmit}
                /> */}

                <div className="flex flex-row mb-6">
                  <Select
                    options={countriesOptions}
                    placeholder="IN"
                    styles={loginPopUpCountryStyles}
                    className="text-[12px] w-[100px] h-[40px] md:w-[100px] md:h-[41px] rounded-tl-lg rounded-bl-lg  bg-[#ECECEC16] focus:outline-none"
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
                  <input
                    type="text"
                    id="phone"
                    placeholder="xxxxxxxxx"
                    className={
                      false
                        ? `bg-[#ECECEC16]  py-3 pl-2 text-[14px] h-[41px] text-white  rounded-r-md w-full placeholder-blue border-[#ff5a68]  autofill`
                        : `bg-[#ECECEC16]  py-3 pl-2 text-[14px] h-[41px] text-white rounded-r-md w-full placeholder-blue border-[#8297BD]  autofill`
                          ? `bg-[#ECECEC16]  py-3 pl-2 text-[14px] h-[41px] text-white  rounded-r-md w-full placeholder-blue border-[#ff5a68] autofill `
                          : `bg-[#ECECEC16]  py-3 pl-2 text-[14px] h-[41px] text-white rounded-r-md w-full placeholder-blue border-[#8297BD] autofill `
                    }
                    //className={`border py-3 pl-2 mb-2 text-[14px] h-[40px] text-white bg-transparent rounded-r-md w-full placeholder-blue border-[#8297BD] autofill`}
                    value={number}
                    onChange={phonenumbersubmit}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      if (e.target.value.length > ValidNumberLength) {
                        e.target.value = e.target.value.slice(
                          0,
                          ValidNumberLength,
                        );
                      }
                    }}
                  />
                </div>
                {/* {wrongnumber ? (
                <p className="text-[#ff4545] text-[12px] font-normal absolute  mt-[-20px]">
                  Please enter valid Phone number
                </p>
              ) : (
                <></>
              )} */}
                {/* {wrongpassword ? (
                <p className="text-[#ff4545] text-[10.5px] font-normal absolute mt-[-20px]">
                  Phone number and Password combination do not match
                </p>
              ) : (
                <></>
              )} */}
                {/* {checkpassword ? (
                <p className="text-[#ff4545] text-[12px] font-normal absolute mt-[-20px]">
                  Please enter password
                </p>
              ) : (
                <></>
              )} */}
                {/* {checkpassword ? (
                <p className="text-[#ff4545] text-[12px] font-normal absolute mt-[-20px]">
                  Please enter password
                </p>
              ) : (
                <></>
              )} */}
              </div>

              <div className="mb-1">
                <label className="block text-white text-[14px] mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={
                    false
                      ? `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#ff5a68]  autofill`
                      : `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-[4px] w-full placeholder-blue border-[#8297BD]  autofill`
                  }
                  placeholder="xxxxxxxx"
                  value={password}
                  onChange={paswordsubmit}
                  autoComplete="current-password webauthn"
                />
                <span
                  onClick={handleClickShowPassword}
                  className="absolute ml-[-24px] mt-[10px] "
                >
                  {showPassword ? (
                    <AiFillEye className="cursor-pointer text-lg text-blue" />
                  ) : (
                    <AiTwotoneEyeInvisible className="cursor-pointer text-lg text-blue" />
                  )}
                </span>
              </div>
              <div className="flex justify-end mb-6">
                <p
                  className="text-white text-[12px] cursor-pointer  font-light"
                  onClick={ForgotpaswordButton}
                >
                  Forgot Password?
                </p>
              </div>
              {wrongpassword || wrongnumber || checkpassword ? (
                <p className="text-[#ff4545] text-[10px] font-normal absolute mt-[-18px] mr-[4px]">
                  Phone number and Password combination do not match
                </p>
              ) : (
                <></>
              )}
              {usernotexisted && (
                <p className="text-[#ff4545] text-[11px] font-normal absolute mt-[-18px] mr-[4px]">
                  User doesn&apos;t exist in our records
                </p>
              )}
              <div className="mb-4 text-center">
                <button
                  type="submit"
                  className={
                    isLoading
                      ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                      : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                  }
                  onClick={LoginUser}
                  disabled={
                    isLoading ||
                    mutatequeryuserinfo.isPending ||
                    mutateLogin.isPending ||
                    mutateworkspacedetails.isPending ||
                    mutateGoogleLogin.isPending
                  }
                >
                  {isLoading ||
                  mutatequeryuserinfo.isPending ||
                  mutateLogin.isPending ||
                  mutateworkspacedetails.isPending ||
                  mutateGoogleLogin.isPending ? (
                    <ButtonLoading />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              <div className="text-center text-white ">
                <div className=" flex items-center justify-center p-4 m-3">
                  <div className="w-full h-[1px] bg-white"></div>

                  <div className="text-white  text-[14px] mx-2">OR</div>

                  <div className="w-full h-[1px] bg-white"></div>
                </div>

                <div className=" flex justify-center gap-x-5 items-center">
                  <button
                    className="bg-[rgb(193,177,206)] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center"
                    onClick={SigninWithEmailButton}
                  >
                    <span>
                      {" "}
                      <EmailSVGIcon className="group-hover:hidden" />
                      <EmailSVGIconColor className="hidden group-hover:block" />
                    </span>
                  </button>
                  <div
                    className={
                      googlebutton
                        ? `bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] w-[45px] h-[45px] cursor-not-allowed flex justify-center items-center`
                        : `bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center`
                    }
                    onClick={!googlebutton ? login : undefined}
                    disabled={googlebutton}
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
