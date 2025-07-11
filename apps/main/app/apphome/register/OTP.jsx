/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { _USER_SIGNUP_PHONE } from "@nyx-frontend/main/utils/utils";
import "@nyx-frontend/main/css/main.css";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import {
  VerifyOTPService,
  Recordsignup,
  GetOTPService,
} from "@nyx-frontend/main/services/loginService";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";


export default function OTP({ RouteRenderPages, EmailOrPhone, Phonenumber }) {
  const [OTPvalue, setOTPvalue] = useState("");
  const [wrongpassword, setwrongpassword] = useState(false);
  const [userexisted, setuserexisted] = useState(false);
  const [notfilled, setnotfilled] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCounter, setResendCounter] = useState(0);
  const [errormessage, seterrormessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mutateVerifyOTP = useMutation({
    mutationKey: ["OTPverify-api"],
    mutationFn: VerifyOTPService,
  });
  const mutaterecorduser = useMutation({
    mutationKey: ["recordsignup-api"],
    mutationFn: Recordsignup,
  });

  const mutateSendOTP = useMutation({
    mutationKey: ["OTPsend-api"],
    mutationFn: GetOTPService,
  });

  const icon = `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.51423 7.48047H18.2051C18.4265 7.48047 18.6387 7.58793 18.7953 7.77922C18.9518 7.97051 19.0397 8.22995 19.0397 8.50047C19.0397 8.77099 18.9518 9.03043 18.7953 9.22172C18.6387 9.41301 18.4265 9.52047 18.2051 9.52047H1.51423C1.2929 9.52047 1.08063 9.41301 0.92412 9.22172C0.767613 9.03043 0.679688 8.77099 0.679688 8.50047C0.679688 8.22995 0.767613 7.97051 0.92412 7.77922C1.08063 7.58793 1.2929 7.48047 1.51423 7.48047Z" fill="white"/>
  <path d="M1.94088 8.5L8.60439 15.5473C8.75525 15.7069 8.84 15.9233 8.84 16.149C8.84 16.3747 8.75525 16.5912 8.60439 16.7508C8.45353 16.9103 8.24892 17 8.03557 17C7.82222 17 7.61761 16.9103 7.46675 16.7508L0.236033 9.10172C0.161214 9.02278 0.101853 8.92899 0.0613508 8.82574C0.0208484 8.72248 0 8.61179 0 8.5C0 8.38821 0.0208484 8.27752 0.0613508 8.17426C0.101853 8.07101 0.161214 7.97722 0.236033 7.89828L7.46675 0.249242C7.61761 0.0896549 7.82222 0 8.03557 0C8.24892 0 8.45353 0.0896549 8.60439 0.249242C8.75525 0.408829 8.84 0.625276 8.84 0.850966C8.84 1.07666 8.75525 1.2931 8.60439 1.45269L1.94088 8.5Z" fill="white"/>
  </svg>
  `;

  useEffect(() => {
    if (resendCounter > 0) {
      const timer = setTimeout(() => {
        setResendCounter(resendCounter - 1);

        setResendDisabled(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resendCounter]);

  const VerifyOTP = (e) => {
    e.preventDefault();
    if (OTPvalue != "") {
      setIsLoading(true);
      const verificationID = localStorage.getItem("verificationID");
      let data = {
        channel: "sms",
        userEnteredOTP: OTPvalue,
        verification_id: verificationID,
      };
      console.log(data);
      mutateVerifyOTP.mutate(data, {
        onSuccess: (response) => {
          signupfunction(); // remove this line if you want to run signup function after OTP confirmation
        },
        onError: (error) => {
          console.error(error);
          setwrongpassword(true);
          setIsLoading(false);
        },
      });
    } else {
      setnotfilled(true);
    }
  };
  const signupfunction = () => {
    const verification = localStorage.getItem("verificationID");
    let data = {
      verification_id: verification,
      type: "signup",
    };
    mutaterecorduser.mutate(data, {
      onSuccess: (response) => {
        console.log("responce otp :", response);
        RouteRenderPages("SetPassword");
        console.log("responce otp :", response);
        RouteRenderPages("SetPassword");
      },
      onError: (error) => {
        setIsLoading(false);
        const errormsg = error.response.data.error;
        if (errormsg === "Bad Request: User already exists") {
          seterrormessage("User already exists");
          setuserexisted(true);
        } else {
          seterrormessage("Could not create a new user, Please try again !");
          setuserexisted(true);
        }
      },
    });
  };

  const OTPHandelChange = (event) => {
    event.preventDefault();
    setOTPvalue(event.target.value);
    setnotfilled(false);
    setuserexisted(false);
    setwrongpassword(false);
  };
  const backButton = () => {
    if (EmailOrPhone === "Email") {
      RouteRenderPages("EmailSignup");
      setuserexisted(false);
    } else {
      RouteRenderPages("PhoneSignup");
      setuserexisted(false);
    }
  };

  const resendOTP = (e) => {
    e.preventDefault();
    setOTPvalue("")
    setnotfilled(false);
    setwrongpassword(false);
    setuserexisted(false);
    if (resendCounter === 0) {
      setResendCounter(40);
      setResendDisabled(true);

      const phonedata = localStorage.getItem("phonenumber");
      const countrycode = localStorage.getItem("countrycodesignup");

      let data = {
        countryCode: countrycode, // if channel == "sms", please provide
        phoneNumber: phonedata, // if channel == "sms", please provide
        channel: "sms", // "sms", "email"
        email: "",
        type:"signup",
      };
      console.log(data, "otpdata");
      mutateSendOTP.mutate(data, {
        onSuccess: (response) => {
          const verify = response.verification_id;
          localStorage.setItem("verificationID", verify);
        },
        onError: (error) => {
          console.error(error);
          alert("Could not send OTP via SMS");
        },
      });
    }
  };

  return (
    <div className="sm:w-[350px] w-full" id="form-container-otp">
      <div className="bg-[rgb(40,27,55)] shadow-md rounded-[30px] h-[480px] p-8 ">
        <div
          onClick={backButton}
          className="svg-icon ml-[-14px] cursor-pointer absolute"
          dangerouslySetInnerHTML={{ __html: icon }}
        ></div>
        <h3 className=" text-center text-[20px] font-semibold font-montserrat mb-4">
          Enter OTP
        </h3>

        <form>
          <div className="mb-4">
            <label className="block text-white text-[14px]  mb-1">OTP</label>

            <input
              type="number"
              className={
                false
                  ? `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#ff5a68]`
                  : `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#8297BD]`
              }
              placeholder="xxxxxx"
              value={OTPvalue}
              onChange={OTPHandelChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                if (e.target.value.length > 6) {
                  e.target.value = e.target.value.slice(0, 6);
                }
              }}
            />
            {wrongpassword ? (
              <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                The OTP you entered is incorrect
              </p>
            ) : (
              <></>
            )}
            {resendCounter > 0 && (
              <div className="text-[12px] text-[#ffc86a] font-normal absolute p-1">
                Resend OTP in {resendCounter} seconds
              </div>
            )}
            {userexisted ? (
              <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                {errormessage}
              </p>
            ) : (
              <></>
            )}
            {notfilled ? (
              <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                Please enter your OTP
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-6 flex justify-between text-center mt-8">
            <div>
              <p
                className={`text-[14px] underline  cursor-pointer ${resendCounter > 0 ? "text-[#9f9f9f]" : "text-[#fff]"} `}
                onClick={resendOTP}
              >
                Resend OTP
              </p>
            </div>
            <div>
              <button
                type="submit"
                className={
                  isLoading
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={VerifyOTP}
                disabled={
                  isLoading ||
                  mutateVerifyOTP.isPending ||
                  mutaterecorduser.isPending
                }
              >
                {isLoading ||
                mutateVerifyOTP.isPending ||
                mutaterecorduser.isPending ? (
                  <ButtonLoading />
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
