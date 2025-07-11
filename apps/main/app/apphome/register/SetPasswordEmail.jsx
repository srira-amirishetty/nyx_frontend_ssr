/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import { IMAGE_URL, MOBILE_NUMBER_THRESHOLD } from "@nyx-frontend/main/components/constants";
import {
  BASEURL,
  verifyJWTToken,
  LOGIN_OTP,
  _USER_SIGNUP_PHONE,
} from "@nyx-frontend/main/utils/utils";
import "@nyx-frontend/main/css/main.css";
import { toast } from "react-toastify";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import {
  SetPasswordService,
  getNewLogin,
  getNewLoginEmail,
} from "@nyx-frontend/main/services/loginService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserProfileData } from "@nyx-frontend/main/services/uploadService";
import { getWorkSapceDetails } from "@nyx-frontend/main/services/workSpace";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";
import cookie from "cookiejs";

export default function SetPasswordEmail({
  RouteRenderPages,
  Phonenumber,
  EmailOrPhone,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);
  const [PasswordNotMatched, setPasswordNotMatched] = useState(false);
  const [PasswordcriteriaNotMatched, setPasswordcriteriaNotMatched] =
    useState(false);
  const [isValid, setIsValid] = useState(true);
  const [workspace, setWorkspace] = useState("");
  const [signingstate, setsigningstate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const queryuserinfo = useQuery({
  //   queryKey: ["user-details"],
  //   queryFn: getUserProfileData,
  // });
  const mutateworkspacedetails = useMutation({
    mutationKey: ["workspace-details"],
    mutationFn: getWorkSapceDetails,
  });

  useEffect(() => {
    const upperCaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    const hasUpperCase = upperCaseRegex.test(NewPassword);
    const hasSpecialChar = specialCharRegex.test(NewPassword);
    const hasNumber = numberRegex.test(NewPassword);
    const isLengthValid = NewPassword.length > 7;

    setIsValid(hasUpperCase && hasSpecialChar && hasNumber && isLengthValid);
  }, [NewPassword]);

  const mutatequeryuserinfo = useMutation({
    mutationKey: ["user-details"],
    mutationFn: getUserProfileData,
  });

  // useEffect(() => {
  //   if (queryuserinfo.isSuccess) {
  //     const { defaultWorkspaceName } = queryuserinfo.data.artistProfile;
  //     console.log("responce", queryuserinfo.data);
  //     // setuserCredits(queryuserinfo?.data?.artistProfile?.coin_balance);
  //     setWorkspace(defaultWorkspaceName ? `${defaultWorkspaceName}` : "");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [queryuserinfo.isSuccess])

  const navigate = useRouter();

  const icon = `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.51423 7.48047H18.2051C18.4265 7.48047 18.6387 7.58793 18.7953 7.77922C18.9518 7.97051 19.0397 8.22995 19.0397 8.50047C19.0397 8.77099 18.9518 9.03043 18.7953 9.22172C18.6387 9.41301 18.4265 9.52047 18.2051 9.52047H1.51423C1.2929 9.52047 1.08063 9.41301 0.92412 9.22172C0.767613 9.03043 0.679688 8.77099 0.679688 8.50047C0.679688 8.22995 0.767613 7.97051 0.92412 7.77922C1.08063 7.58793 1.2929 7.48047 1.51423 7.48047Z" fill="white"/>
<path d="M1.94088 8.5L8.60439 15.5473C8.75525 15.7069 8.84 15.9233 8.84 16.149C8.84 16.3747 8.75525 16.5912 8.60439 16.7508C8.45353 16.9103 8.24892 17 8.03557 17C7.82222 17 7.61761 16.9103 7.46675 16.7508L0.236033 9.10172C0.161214 9.02278 0.101853 8.92899 0.0613508 8.82574C0.0208484 8.72248 0 8.61179 0 8.5C0 8.38821 0.0208484 8.27752 0.0613508 8.17426C0.101853 8.07101 0.161214 7.97722 0.236033 7.89828L7.46675 0.249242C7.61761 0.0896549 7.82222 0 8.03557 0C8.24892 0 8.45353 0.0896549 8.60439 0.249242C8.75525 0.408829 8.84 0.625276 8.84 0.850966C8.84 1.07666 8.75525 1.2931 8.60439 1.45269L1.94088 8.5Z" fill="white"/>
</svg>
`;
  const mutateSetPassword = useMutation({
    mutationKey: ["SetPassword-api"],
    mutationFn: SetPasswordService,
  });

  const mutateLoginPhone = useMutation({
    mutationKey: ["Login-api"],
    mutationFn: getNewLogin,
  });
  const mutateLoginEmail = useMutation({
    mutationKey: ["Loginemail-api"],
    mutationFn: getNewLoginEmail,
  });

  const updatebuttonclick = async (e) => {
    e.preventDefault();
    if (NewPassword === ConfirmPassword && isValid) {
      setsigningstate(true);
      setIsLoading(true);
      const verification = localStorage.getItem("verificationID");
      let data = {
        new_password: NewPassword,
        confirm_password: ConfirmPassword,
        verification_id: verification,
      };
      mutateSetPassword.mutate(data, {
        onSuccess: (response) => {
          // console.log("responce :" , response)
          // console.log("password set successfully ")
          logincall(); //user will instentely loged in  after  password set
        },
        onError: (error) => {
          console.error(error);
          setIsLoading(false);
        },
      });
    } else {
      setIsLoading(false);
      if (NewPassword === ConfirmPassword) {
        setPasswordcriteriaNotMatched(true);
      } else {
        setPasswordNotMatched(true);
      }
    }
  };
  const logincall = () => {
    const emaildata = localStorage.getItem("emailid");
    let data = {
      email: emaildata,
      password: NewPassword,
    };

    mutateLoginEmail.mutate(data, {
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
              const id = response.artistProfile.workspaceId;
              localStorage.setItem("workspace_id", id);
              await workSpaceDetails();
              cookie.set("ExpireLoginToken", "true", {
                expires: 0.5, // expires in 12 hrs
                path: "/",
                secure: true,
              });
              setWorkspace(workdata);
              setsigningstate(false);
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
              console.error(error);
              setIsLoading(false);
              localStorage.removeItem("token");
            },
          },
        );
      },
      onError: (error) => {
        console.error(error);
        navigate.push("/apphome/login");
      },
    });
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
            console.error(error);
            reject(error);
            setIsLoading(false);
            localStorage.removeItem("token");
          },
        },
      );
    });
  };

  const backButton = (e) => {
    e.preventDefault();
    RouteRenderPages("EnterDetails");
  };

  const NewPasswordChange = (event) => {
    event.preventDefault();
    // validatePassword(NewPassword);
    setNewPassword(event.target.value);
    setPasswordNotMatched(false);
    //validatePassword(NewPassword);
  };
  const ConfirmPasswordChange = (event) => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
    setPasswordNotMatched(false);
    setPasswordcriteriaNotMatched(false);
  };

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword2 = (event) => {
    event.preventDefault();
    setShowPassword2(!showPassword2);
  };

  return (
    <>
      <div className="sm:w-[350px] w-full " id="form-container-password">
        <div className="bg-[#281B37] shadow-md rounded-[30px] h-[480px]  p-8">
          {/* <div
            onClick={backButton}
            className="svg-icon ml-[-12px] cursor-pointer absolute"
            dangerouslySetInnerHTML={{ __html: icon }}
          ></div> */}
          <h3 className=" text-center text-[20px] font-semibold font-montserrat mb-4 mt-[-5px]">
            Set New Password
          </h3>
          <form>
            <div className="mb-4">
              <label className="block text-white text-[14px]  mb-2">
                New Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                className={
                  PasswordNotMatched
                    ? `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#ff5757]`
                    : `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#8297BD]`
                }
                placeholder="xxxxxxxxx"
                value={NewPassword}
                onChange={NewPasswordChange}
                onInput={(e) => {
                  if (e.target.value.length > 20) {
                    e.target.value = e.target.value.slice(0, 20);
                  }
                }}
                
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
            <div>
              {!isValid && (
                <p className="text-[10px] text-[#ff5151] mb-6">
                  Password must contain at least one uppercase letter, one
                  special character (#, @, $, %, etc.), one number, and be at
                  least 8 characters long.
                </p>
              )}
            </div>

            <div className="mb-1">
              <label className="block text-white text-[14px] mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword2 ? "text" : "password"}
                className={
                  PasswordNotMatched
                    ? `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#ff5757]`
                    : `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#8297BD]`
                }
                placeholder="xxxxxxxxx"
                value={ConfirmPassword}
                onChange={ConfirmPasswordChange}
                onPaste={(e) => e.preventDefault()}
              />
              {PasswordNotMatched ? (
                <p className="text-[#ff4545] text-[10px] font-normal absolute p-1">
                  Password did not matched
                </p>
              ) : (
                <></>
              )}
              <span
                onClick={handleClickShowPassword2}
                className="absolute ml-[-24px] mt-[10px] "
              >
                {showPassword2 ? (
                  <AiFillEye className="cursor-pointer text-lg text-blue" />
                ) : (
                  <AiTwotoneEyeInvisible className="cursor-pointer text-lg text-blue" />
                )}
              </span>
            </div>
            <div className="flex justify-center flex-col items-center text-[12px] mt-6 text-[#ffffff74]">
              <p>By signing up you agree to our </p>
              <p>
                {" "}
                <span className="underline">terms of service</span> and{" "}
                <span className="underline">privacy policy</span>
              </p>
            </div>
            <div className="mb-6 mt-6 text-center">
              <button
                type="submit"
                className={
                  isLoading
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={updatebuttonclick}
                disabled={
                  isLoading ||
                  mutatequeryuserinfo.isPending ||
                  mutateworkspacedetails.isPending ||
                  mutateSetPassword.isPending ||
                  mutateLoginEmail.isPending
                }
              >
                {isLoading ||
                mutatequeryuserinfo.isPending ||
                mutateworkspacedetails.isPending ||
                mutateSetPassword.isPending ||
                mutateLoginEmail.isPending ? (
                  <ButtonLoading />
                ) : (
                  "Signup"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
