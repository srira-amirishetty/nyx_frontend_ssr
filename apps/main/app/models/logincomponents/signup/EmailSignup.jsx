/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import "@nyx-frontend/main/css/main.css";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { GetOTPService } from "../../../../services/loginService";
import "./index.css";
import PhoneIcon from "@nyx-frontend/main/components/Icons/PhoneIcon";
import GoogleSVGIcon from "../../../../components/Icons/GoogleSVGIcon";
import GoogleSVGIconColor from "../../../../components/Icons/GoogleSVGIconColor";
import AppleSVGIcon from "../../../../components/Icons/AppleSVGIcon";
import AppleSVGIconColor from "../../../../components/Icons/AppleSVGIconColor";
import ButtonLoading from "../../../../components/LoginLoadingButton";
import { useGoogleLogin } from "@react-oauth/google";
import { getWorkSapceDetails } from "../../../../services/workSpace";
import { getNewLoginGoogle } from "../../../../services/loginService";
import { getUserProfileData } from "../../../../services/uploadService";
import { verifyJWTToken } from "../../../../utils/utils";
import { useRouter } from "next/navigation";
import { Closeicon } from "../Closeicon";
import { useUserStore } from "@nyx-frontend/main/hooks/usersStore";
import cookie from "cookiejs";

export default function EmailSignup({
  RouteRenderPages,
  LoginSignupSwitch,
  CloseAllPopup,
}) {
  const [Email, setEmail] = useState("");
  const [wrongpassword, setwrongpassword] = useState(false);
  const [checkwrongpassword, setcheckwrongpassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [googlebutton, setgooglebutton] = useState(false);
  const [workspace, setWorkspace] = useState("");
  const [googlescreen, setgooglescreen] = useState(false);
  const [googleerror, setgoogleerror] = useState(false);
  const [userexisted, setuserexisted] = useState(false);

  const router = useRouter();
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);

  const mutateSendOTP = useMutation({
    mutationKey: ["OTPsend-api"],
    mutationFn: GetOTPService,
  });

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

  const GetOTP = (e) => {
    e.preventDefault();
    const valid = /^\S+@\S+\.\S+$/.test(Email);
    if (Email.length > 0 && valid) {
      setIsLoading(true);
      localStorage.setItem("emailid", Email);

      let data = {
        countryCode: "", // if channel == "sms", please provide
        phoneNumber: "", // if channel == "sms", please provide
        channel: "email", // "sms", "email"
        email: Email,
        type: "signup",
      };
      console.log(data, "data");
      mutateSendOTP.mutate(data, {
        onSuccess: (response) => {
          // console.log("responce :" , response)
          const verify = response.verification_id;
          localStorage.setItem("verificationID", verify);
          RouteRenderPages("OTPEmail");
        },
        onError: (error) => {
          const errormsg = error.response.data.message;
          if (errormsg === "User already exists!") {
            setuserexisted(true);
            setIsLoading(false);
          } else {
            setwrongpassword(true);
            setIsLoading(false);
          }
        },
      });
    } else {
      setcheckwrongpassword(true);
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
                setIsLoggedIn(true);
                setWorkspace(workdata);
                CloseAllPopup()
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

  const Emailsubmit = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    setwrongpassword(false);
    setcheckwrongpassword(false);
    setuserexisted(false)
  };

  const clickonemail = (event) => {
    event.preventDefault();
    RouteRenderPages("PhoneSignup");
  };

  const closeGoogleLogin = () => {
    setgooglescreen(false);
    setgoogleerror(false);
  };
  const Gotologin = () => {
    LoginSignupSwitch("Login");
  };
  const Close = () => {
    CloseAllPopup();
  };

  return (
    <>
      {!googlescreen ? (
        <div id="form-container-email">
          <div className="bg-[#281b37] shadow-md rounded-[30px] p-8 px-[20px] w-[350px] h-[500px] sm:w-[350px] sm:h-[500px]">
            <div
              onClick={Close}
              className="cursor-pointer absolute right-10 "
              dangerouslySetInnerHTML={{ __html: Closeicon }}
            ></div>
            <h3 className=" text-center text-[20px] font-semibold font-montserrat mb-4">
              Register on NYX
            </h3>
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
                  placeholder="example@gmail.com"
                  value={Email}
                  onChange={Emailsubmit}
                  onInput={(e) => {
                    // Ensure only up to 50 characters are accepted
                    if (e.target.value.length > 300) {
                      e.target.value = e.target.value.slice(0, 300);
                    }
                  }}
                />
                {wrongpassword ? (
                  <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                    Could not send an OTP via Email
                  </p>
                ) : (
                  <></>
                )}
                {checkwrongpassword ? (
                  <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                    Please enter valid Email Address
                  </p>
                ) : (
                  <></>
                )}
                 {userexisted && (
                  <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                    User already exists
                  </p>
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
                    "Send OTP"
                  )}
                </button>
              </div>
              <p className="text-white flex justify-center items-center text-[12px]">Use your organization email for extra rewards</p>

              <div className="text-center text-white">
                <div className=" flex items-center justify-center p-4">
                  <div className="w-full h-[1px] bg-white"></div>

                  <div className="text-white  text-[14px] mx-2">OR</div>

                  <div className="w-full h-[1px] bg-white"></div>
                </div>

                <div className="mt-5 flex justify-center gap-x-5 items-center">
                  <button
                    className="bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center"
                    onClick={clickonemail}
                  >
                    <span>
                      {" "}
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
                <p className="text-[14px] font-light mt-4">
                  Already have an account?{" "}
                  <span
                    className="underline cursor-pointer "
                    onClick={Gotologin}
                  >
                    Login
                  </span>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div id="form-container-email">
          <div className="bg-[#281b37] shadow-md rounded-[30px] p-8 px-[20px] w-[350px] h-[500px] sm:w-[350px] sm:h-[500px]">
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
