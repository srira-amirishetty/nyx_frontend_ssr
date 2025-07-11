/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { GetOTPService } from "@nyx-frontend/main/services/loginService";
import { useMutation } from "@tanstack/react-query";
import "./index.css";
import LeftArrow from "@nyx-frontend/main/components/Icons/LeftArrow";
import PhoneIcon from "@nyx-frontend/main/components/Icons/PhoneIcon";
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

export default function EmailPasswordForget({ RouteRenderPages }) {
  const [email, setemail] = useState("");
  const [wrongpassword, setwrongpassword] = useState(false);
  const [wrongnumber, setwrongnumber] = useState(false);
  const [userexisted, setuserexisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [googlebutton, setgooglebutton] = useState(false);
  const [workspace, setWorkspace] = useState("");
  const [googlescreen, setgooglescreen] = useState(false);
  const [googleerror, setgoogleerror] = useState(false);
  const navigate = useRouter();

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

  const mutateSendOTP = useMutation({
    mutationKey: ["OTPsend-api"],
    mutationFn: GetOTPService,
  });

  useEffect(() => {
    const emaildata = localStorage.getItem("emailidlogin");
    if (emaildata) {
      setemail(emaildata);
    }
  }, []);

  const GetOTP = (e) => {
    e.preventDefault();
    const valid = /^\S+@\S+\.\S+$/.test(email);
    if (valid) {
      localStorage.setItem("emailidlogin", email);
      setIsLoading(true);
      let data = {
        countryCode: "+91", // if channel == "sms", please provide
        phoneNumber: "", // if channel == "sms", please provide
        channel: "email", // "sms", "email"
        email: email,
        type: "forgetpassword",
      };

      mutateSendOTP.mutate(data, {
        onSuccess: (response) => {
          console.log("responce :", response);
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

  const EmailIdsubmit = (event) => {
    event.preventDefault();
    setemail(event.target.value);
    setwrongpassword(false);
    setwrongnumber(false);
    setuserexisted(false);
  };
  const SigninWithPhoneButton = () => {
    RouteRenderPages("PhonePasswordForgot");
  };
  const backButton = () => {
    RouteRenderPages("LoginEmail");
  };
  const closeGoogleLogin = () => {
    setgooglescreen(false);
    setgoogleerror(false);
  };
  return (
    <>
      {!googlescreen ? (
        <div className="w-full md:w-[350px] ">
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
                  Email Id
                </label>

                <input
                  type="email"
                  className={
                    false
                      ? `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-[4px] w-full placeholder-blue border-[#ff5a68] autofill`
                      : `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-[4px] w-full placeholder-blue border-[#8297BD] autofill`
                  }
                  placeholder="example@email.com"
                  value={email}
                  onChange={EmailIdsubmit}
                  onInput={(e) => {
                    // Ensure only up to 50 characters are accepted
                    if (e.target.value.length > 300) {
                      e.target.value = e.target.value.slice(0, 300);
                    }
                  }}
                />
                {wrongpassword ? (
                  <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                    Please enter valid email{" "}
                  </p>
                ) : (
                  <></>
                )}
                {wrongnumber ? (
                  <p className="text-[#ff4545] text-[12px] font-normal absolute  p-1">
                    Could not send an OTP via Email
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
                  <button
                    className="bg-[#C1B1CE] paranticon border-[2px] transition group ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center"
                    onClick={SigninWithPhoneButton}
                  >
                    <span>
                      <PhoneIcon className="w-6 text-[#311B3D] group-hover:[&>path]:fill-[url(#phoneIconColor)]" />
                    </span>
                  </button>
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
