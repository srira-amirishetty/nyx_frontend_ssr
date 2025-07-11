/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, Suspense, useEffect } from "react";
import LoginPhone from "./login/LoginPhone";
import ForgotPassword from "./login/ForgotPassword";
import LoginEmail from "./login/LoginEmail";
import OTP from "./login/OTP";
import EmailPasswordForget from "./login/EmailPasswordForget";
import PhonePasswordForget from "./login/PhonePasswordForget";

const LoginPopupModel = ({ LoginSignupSwitch, CloseAllPopup}) => {
  const [currentPage, setCurrentPage] = useState("");
  const [EmailOrPhone, setEmailOrPhone] = useState("Phone");



  const RouteRenderPages = (value) => {
    setCurrentPage(value);
    if (
      currentPage === "LoginPhone" ||
      currentPage === "LoginEmail" ||
      currentPage === "EmailPasswordForget" ||
      currentPage === "PhonePasswordForgot"
    ) {
      if (
        currentPage === "LoginEmail" ||
        currentPage === "EmailPasswordForget"
      ) {
        setEmailOrPhone("Email");
      } else {
        setEmailOrPhone("Phone");
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
          />
        );
      case "PhonePasswordForgot":
        return (
          <PhonePasswordForget
            RouteRenderPages={RouteRenderPages}
            CloseAllPopup={CloseAllPopup}
          />
        );
      case "ForgotPassword":
        return (
          <ForgotPassword
            RouteRenderPages={RouteRenderPages}
            EmailOrPhone={EmailOrPhone}
          />
        );
      case "EmailPasswordForget":
        return (
          <EmailPasswordForget
            RouteRenderPages={RouteRenderPages}
            CloseAllPopup={CloseAllPopup}
          />
        );
      case "LoginEmail":
        return (
          <LoginEmail
            RouteRenderPages={RouteRenderPages}
            LoginSignupSwitch={LoginSignupSwitch}
            CloseAllPopup={CloseAllPopup}
          />
        );
      case "LoginPhone":
        return (
          <LoginPhone
            RouteRenderPages={RouteRenderPages}
            LoginSignupSwitch={LoginSignupSwitch}
            CloseAllPopup={CloseAllPopup}
          />
        );
      default:
        return (
          <LoginPhone
            RouteRenderPages={RouteRenderPages}
            LoginSignupSwitch={LoginSignupSwitch}
            CloseAllPopup={CloseAllPopup}
          />
        );
    }
  };

  return (
    <div className="max-lg:[&>*]:mx-auto [&>*]:ml-auto xl:flex-1 pt-10 max-md:w-full box4">
      <Suspense>{renderPage()}</Suspense>
    </div>
  );
};

export default LoginPopupModel;
