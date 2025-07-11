/* eslint-disable @next/next/no-img-element */
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getNewLoginUser,
  getNewLoginEmail,
  getNewLoginGoogle,
} from "@nyx-frontend/main/services/loginService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { verifyJWTToken, _USER_SIGNUP_PHONE } from "@nyx-frontend/main/utils/utils";
import { getUserProfileData } from "@nyx-frontend/main/services/uploadService";
import { getWorkSapceDetails } from "@nyx-frontend/main/services/workSpace";
import "./index.css";
import PhoneIcon from "@nyx-frontend/main/components/Icons/PhoneIcon";
import GoogleSVGIcon from "../../../components/Icons/GoogleSVGIcon";
import GoogleSVGIconColor from "../../../components/Icons/GoogleSVGIconColor";
import AppleSVGIcon from "../../../components/Icons/AppleSVGIcon";
import AppleSVGIconColor from "../../../components/Icons/AppleSVGIconColor";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";
import cookie from "cookiejs";

export default function LoginEmail({ RouteRenderPages, ipData }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [wrongpassword, setwrongpassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();
  const [checkpassword, setcheckpassword] = useState(false);
  const [workspace, setWorkspace] = useState("");
  const [wrongnumber, setwrongnumber] = useState(false);
  const [FBContext, setFBContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [googlebutton, setgooglebutton] = useState(false);
  const [googlescreen, setgooglescreen] = useState(false);
  const [googleerror, setgoogleerror] = useState(false);
  const [usernotexisted, setusernotexisted] = useState(false);

  const mutatequeryuserinfo = useMutation({
    mutationKey: ["user-details"],
    mutationFn: getUserProfileData,
  });
  const mutateworkspacedetails = useMutation({
    mutationKey: ["workspace-details"],
    mutationFn: getWorkSapceDetails,
  });

  const mutateLogin = useMutation({
    mutationKey: ["Login-api"],
    //mutationFn: getNewLoginEmail,
    mutationFn: getNewLoginUser,
  });
  const mutateGoogleLogin = useMutation({
    mutationKey: ["Login-api"],
    mutationFn: getNewLoginGoogle,
  });

  const LoginUser = (e) => {
    e.preventDefault();
    setusernotexisted(false);
    setwrongpassword(false);
    // console.log("click...");
    //const valid = /^\S+@\S+\.\S+$/.test(email);
    // if (valid && password.length != "") {
    if (password.length != "") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (emailRegex.test(email)) {
        localStorage.removeItem("phonenumberlogin");
        localStorage.setItem("emailidlogin", email);
        console.log("email");
      } else if (phoneRegex.test(email)) {
        localStorage.removeItem("emailidlogin");
        localStorage.setItem("phonenumberlogin", email);
      }

      let data = {
        user: email,
        password: password,
        ip_info: ipData,
      };
      setIsLoading(true);
      mutateLogin.mutate(data, {
        onSuccess: (response) => {
          localStorage.setItem("token", response.token);
          const result = verifyJWTToken(response.token);
          if (result.data != null) {
            sessionStorage.setItem("userId", result?.data?.userId);
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

                setWorkspace(workdata);
                cookie.set("ExpireLoginToken", "true", {
                  expires: 0.5, // expires in 12 hrs
                  path: "/",
                  secure: true,
                });
                if (workdata === null) {
                  navigate.push(`/apphome/dashboard`);
                } else {
                  if (localStorage.getItem("Login-Type") === "campulse") {
                    navigate.push(
                      `/apphome/${response?.artistProfile?.workspaceSlug}/admanager/dashboard?view=graph`,
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
                setIsLoading(false);
              },
            },
          );
        },
        onError: (error) => {
          const errormsg = error.response.data.message;
          if (errormsg === "Email doesn't exist in our records") {
            setusernotexisted(true);
            setIsLoading(false);
          } else {
            setwrongpassword(true);
            setIsLoading(false);
          }
        },
      });
    } else {
      if (!valid) {
        setwrongpassword(true);
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
            setgoogleerror(true);
            localStorage.removeItem("token");
            reject(error);
            setIsLoading(false);
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

  const emailidsubmit = (event) => {
    event.preventDefault();
    event.preventDefault();
    setemail(event.target.value);
    setwrongpassword(false);
    setwrongnumber(false);
    setcheckpassword(false);
    setusernotexisted(false);
  };
  const paswordsubmit = (event) => {
    event.preventDefault();
    event.preventDefault();
    setpassword(event.target.value);
    setwrongpassword(false);
    setcheckpassword(false);
    setusernotexisted(false);
  };
  const ForgotpaswordButton = () => {
    RouteRenderPages("EmailPasswordForget");
  };

  const SigninWithPhoneButton = () => {
    RouteRenderPages("LoginPhone");
  };

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const closeGoogleLogin = () => {
    setgooglescreen(false);
    setgoogleerror(false);
  };
  return (
    <>
      {!googlescreen ? (
        <div className="w-full md:w-[350px] ">
          <div className="bg-[#281B37] shadow-md rounded-[30px] h-[480px] p-8">
            <h3 className=" text-center text-[20px] font-semibold font-montserrat mb-4">
              LogIn
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-white text-[14px]  mb-1">
                  Email Id / Phone No.
                </label>

                <input
                  type="text"
                  className={
                    wrongpassword || wrongnumber || checkpassword
                      ? `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#ff5a68] autofill `
                      : `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-[4px] w-full placeholder-blue border-[#8297BD] autofill `
                  }
                  placeholder="example@gmail.com / xxxxxxxxxx"
                  value={email}
                  onChange={emailidsubmit}
                  onInput={(e) => {
                    // Ensure only up to 50 characters are accepted
                    if (e.target.value.length > 300) {
                      e.target.value = e.target.value.slice(0, 300);
                    }
                  }}
                />
                {/* {wrongpassword ? (
                <p className="text-[#ff4545] text-[10px] font-normal absolute p-1">
                  Email and Password combination do not match
                </p>
              ) : (
                <></>
              )} */}
                {/* {checkpassword ? (
                <p className="text-[#ff4545] text-[10px] font-normal absolute p-1">
                  Please enter Password
                </p>
              ) : (
                <></>
              )} */}

                {/* {wrongnumber ? (
                <p className="text-[#ff4545] text-[10px] font-normal absolute p-1">
                  Please enter valid Email Address
                </p>
              ) : (
                <></>
              )} */}
              </div>

              <div className="mb-1 mt-6">
                <label className="block text-white text-[14px] mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={
                    wrongpassword || checkpassword || wrongnumber
                      ? `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#ff5a68] autofill`
                      : `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-[4px] w-full placeholder-blue border-[#8297BD] autofill`
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
                  className="text-white text-[12px] cursor-pointer font-light"
                  onClick={ForgotpaswordButton}
                >
                  Forgot Password?
                </p>
              </div>
              {wrongpassword || wrongnumber || checkpassword ? (
                <p className="text-[#ff4545] text-[10px] font-normal absolute mt-[-20px] mr-[4px]">
                  Email and Password combination do not match
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
              <div className="text-center text-white">
                <div className=" flex items-center justify-center p-4 mb-3">
                  <div className="w-full h-[1px] bg-white"></div>

                  <div className="text-white  text-[14px] mx-2">OR</div>

                  <div className="w-full h-[1px] bg-white"></div>
                </div>

                <div className=" flex justify-center gap-x-5 items-center">
                  {/* <div
                    className="bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center"
                    onClick={SigninWithPhoneButton}
                  >
                    <span>
                      {" "}
                      <PhoneIcon className="w-6 text-[#311B3D] group-hover:[&>path]:fill-[url(#phoneIconColor)]" />
                    </span>
                  </div> */}
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
