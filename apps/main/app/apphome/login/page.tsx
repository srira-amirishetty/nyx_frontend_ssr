/* eslint-disable @next/next/no-img-element */
"use client";
import "./index.css";
import React, { useState, Suspense, useEffect } from "react";
import LoginPhone from "./LoginPhone";
import ForgotPassword from "./ForgotPassword";
import LoginEmail from "./LoginEmail";
import LoginAll from "./LoginAll";
import OTP from "./OTP";
import EmailPasswordForget from "./EmailPasswordForget";
import PhonePasswordForget from "./PhonePasswordForget";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import {
  getRedirectLocalStorage,
  getTokenAndWorkspace,
} from "@nyx-frontend/main/utils/userUtils";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getIPDetails } from "@nyx-frontend/main/services/workSpace";

const logo = IMAGE_URL + "/assets/logo.svg";
const appUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';

function LoginPage() {
  const [currentPage, setCurrentPage] = useState("");
  const [EmailOrPhone, setEmailOrPhone] = useState("Phone");
  const navigate = useRouter();

  useEffect(() => {
    const { token, workdata } = getTokenAndWorkspace();

    if (token) {
      if (workdata) {
        // redirect to selected workspace
        navigate.push(`/apphome/${workdata}/dashboard`);
      } else {
        const pathname = getRedirectLocalStorage();
        if (pathname) {
          navigate.push(`${pathname}`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: ipData } = useQuery({
    queryKey: ["ip-details"],
    queryFn: getIPDetails,
  });

  const RouteRenderPages = (value: any) => {
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
        return <PhonePasswordForget RouteRenderPages={RouteRenderPages} />;
      case "ForgotPassword":
        return (
          <ForgotPassword
            RouteRenderPages={RouteRenderPages}
            EmailOrPhone={EmailOrPhone}
          />
        );
      case "EmailPasswordForget":
        return <EmailPasswordForget RouteRenderPages={RouteRenderPages} />;
      case "LoginEmail":
        return (
          // <LoginEmail RouteRenderPages={RouteRenderPages} ipData={ipData} />
          <LoginAll RouteRenderPages={RouteRenderPages} ipData={ipData} />
        );
      case "LoginPhone":
        return (
          // <LoginPhone RouteRenderPages={RouteRenderPages} ipData={ipData} />
          <LoginAll RouteRenderPages={RouteRenderPages} ipData={ipData} />
        );
      default:
        return (
          // <LoginPhone RouteRenderPages={RouteRenderPages} ipData={ipData} />
          //<LoginEmail RouteRenderPages={RouteRenderPages} ipData={ipData} />
          <LoginAll RouteRenderPages={RouteRenderPages} ipData={ipData} />
        );
    }
  };

  return (
    <div className="relative lg:h-full noPosition_sec">
      <div className="  absolute inset-x-1/2 bottom-0 text-white text-[16px] ">
        <div className=" flex items-center justify-center p-2 pb-5 gap-[5px]">
          Share{" "}
          <span>
            <HeartIcon className="w-[20px] text-[#ff45af]" />
          </span>{" "}
          on{" "}
          <span className="hover:text-[#f49ef7] underline">
            <a
              href="https://twitter.com/intent/tweet?text=Unlock%20the%20future%20of%20content%20creation%20with%20AI%20at%20NYX&url=https://nyx.today/"
              target="_blank"
            >
              {" "}
              X
            </a>
          </span>{" "}
          ,{" "}
          <span className="hover:text-[#f49ef7] underline">
            <a
              href="https://www.linkedin.com/shareArticle?mini=true&url=https://nyx.today/&title=Unlock%20the%20future%20of%20content%20creation%20with%20AI%20at%20NYX&summary=Unlock%20the%20future%20of%20content%20creation%20with%20AI%20at%20NYX"
              target="_blank"
            >
              {" "}
              LinkedIn
            </a>
          </span>{" "}
          ,{" "}
          <span className="hover:text-[#f49ef7] underline">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://nyx.today/&quote=Unlock%20the%20future%20of%20content%20creation%20with%20AI%20at%20NYX"
              target="_blank"
            >
              {" "}
              Facebook
            </a>
          </span>
        </div>
      </div>
      <div className="bg-[#281B37] p-[5px] fixed w-[100%] z-1000">
        <div className=" flex items-center h-[60px] z-1000 justify-between  w-full text-white sticky top-0 md:pr-[80px] pr-[30px] mx-auto md:px-16">
          <Link href={appUrl}>
            <Image
              width={80}
              height={75}
              src={logo}
              alt="logo"
              className="icon"
            />
          </Link>
          <button className=" navbutton  px-[0.8px] py-[0.5px] rounded-full  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold">
            <Link href="/apphome/register">
              <div className="p-[1.5px]  md:h-[41px] rounded-full bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                <span className="flex w-[110px] h-full py-2 items-center justify-center rounded-full bg-[#250e35] hover:bg-[#2F2546] back ">
                  <div className="text-[14px] font-normal text-white ">
                    Sign up
                  </div>
                </span>
              </div>
            </Link>
          </button>
          {/* <button>
            <Link
              href="/apphome/register"
              className="navbutton flex justify-center w-[120px] h-[34px]  text-[14px] font-normal px-6 py-1 text-white  md:ml-[-10px] ml-[10px]  rounded-[40px] hover:bg-[#7148d74a] hover:font-semibold"
            >
              Sign up

            </Link>
          </button> */}
        </div>
      </div>
      <div className=" flex pt-10 flex-wrap items-center flex-row-reverse justify-evenly h-full pb-20 max-w-7xl mx-auto px-4 md:px-16 bodydiv">
        <div className="max-lg:[&>*]:mx-auto [&>*]:ml-auto xl:flex-1 pt-10 max-md:w-full box4">
          <Suspense>{renderPage()}</Suspense>
        </div>
        <div className="max-md:hidden px-4">
          <div className="max-lg:flex maindiv ">
            <div>
              <p className="mainp opacity-[50%] leading-tight text-white md:text-[58px] text-[34px] tracking-normal font-extrabold lg:mt-[100px]  ">
                Embrace your creativity
              </p>
              <p className="ptag opacity-[50%] max-lg:hidden text-white md:text-[58px] text-[34px] tracking-normal font-extrabold md:mt-[-20px] mt-[-7px]">
                with NYX
              </p>
              <p className="text-white md:text-[16px] text-[12px] max-lg:mt-[10px] font-light  tracking-normal basicp">
                Personalise, localise and animate your ideas.
              </p>
              <p className="text-white md:text-[16px] font-light text-[12px]   tracking-normal basicp">
                Let&apos;s reshape storytelling!
              </p>
            </div>
            <div className="imgdiv">
              <img
                src={`${IMAGE_URL}/assets/images/mask-group.png`}
                alt="image"
                className="mx-auto w-full max-w-[260px] md:max-w-[340px] md:mx-0 imgs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
