/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import OTP from "./signup/OTP";
import OTPEmail from "./signup/OTPEmail";
import PhoneSignup from "./signup/PhoneSignup";
import EmailSignup from "./signup/EmailSignup";
import SetPassword from "./signup/SetPassword";
import SetPasswordEmail from "./signup/SetPasswordEmail";

function LoginPage({ LoginSignupSwitch, CloseAllPopup }) {
  const [currentPage, setCurrentPage] = useState("");
  const [EmailOrPhone, setEmailOrPhone] = useState("Phone");
  const [Phonenumber, setPhonenumber] = useState("");
  const [Emailid, setEmailid] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const setphonenumber = (value) => {
    setPhonenumber(value);
  };
  const setemailid = (value) => {
    setEmailid(value);
  };

  const RouteRenderPages = (value) => {
    setCurrentPage(value);
    if (currentPage === "PhoneSignup" || currentPage === "EmailSignup") {
      if (currentPage === "PhoneSignup") {
        setEmailOrPhone("Phone");
      } else {
        setEmailOrPhone("Email");
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "OTP":
        return (
          <OTP
            RouteRenderPages={RouteRenderPages}
            EmailOrPhone={EmailOrPhone}
            Phonenumber={Phonenumber}
          />
        );
      case "OTPEmail":
        return (
          <OTPEmail
            RouteRenderPages={RouteRenderPages}
            EmailOrPhone={EmailOrPhone}
            Phonenumber={Phonenumber}
          />
        );
      // case "PersonalDetails":
      //   return <PersonalDetails RouteRenderPages={RouteRenderPages} />;
      // case "EnterDetails":
      //   return <EnterDetails RouteRenderPages={RouteRenderPages}
      //   EmailOrPhone={EmailOrPhone}
      //   />;
      case "SetPassword":
        return (
          <SetPassword
            RouteRenderPages={RouteRenderPages}
            CloseAllPopup={CloseAllPopup}
          />
        );
      case "SetPasswordEmail":
        return (
          <SetPasswordEmail
            RouteRenderPages={RouteRenderPages}
            CloseAllPopup={CloseAllPopup}
          />
        );
      case "EmailSignup":
        return (
          <EmailSignup
            RouteRenderPages={RouteRenderPages}
            LoginSignupSwitch={LoginSignupSwitch}
            CloseAllPopup={CloseAllPopup}
          />
        );
      case "PhoneSignup":
        return (
          <PhoneSignup
            RouteRenderPages={RouteRenderPages}
            setphonenumber={setphonenumber}
            LoginSignupSwitch={LoginSignupSwitch}
            CloseAllPopup={CloseAllPopup}
          />
        );
      default:
        return (
          <PhoneSignup
            RouteRenderPages={RouteRenderPages}
            setphonenumber={setphonenumber}
            LoginSignupSwitch={LoginSignupSwitch}
            CloseAllPopup={CloseAllPopup}
          />
        );
    }
  };

  return (
    <div className="max-lg:[&>*]:mx-auto [&>*]:ml-auto xl:flex-1 pt-10 max-md:w-full box4">
      {renderPage()}
    </div>
  );
}

export default LoginPage;
