/* eslint-disable @next/next/no-img-element */
"use client";
import "./index.css";
import { useState, useEffect } from "react";
import OTP from "./OTP";
import OTPEmail from "./OTPEmail";
import PhoneSignup from "./PhoneSignup";
import EmailSignup from "./EmailSignup";
import SetPassword from "./SetPassword";
import SetPasswordEmail from "./SetPasswordEmail";
import Link from "next/link";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
const logo = IMAGE_URL + "/assets/logo.svg";
const appUrl = process.env.NEXT_PUBLIC_BASE_URL || '/';

import { HeartIcon } from "@heroicons/react/24/solid";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getIPDetails } from "@nyx-frontend/main/services/workSpace";

function LoginPage() {
  const [currentPage, setCurrentPage] = useState("PhoneSignup");
  const [EmailOrPhone, setEmailOrPhone] = useState("Phone");
  const [Phonenumber, setPhonenumber] = useState("");
  const [Emailid, setEmailid] = useState("");
  const [token, settoken] = useState<any>("");
  const navigate = useRouter();

  const { data: ipData } = useQuery({
    queryKey: ["ip-details"],
    queryFn: getIPDetails,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const tokens = localStorage.getItem("token");
    const workdata = localStorage.getItem("workspace_name");
    settoken(tokens);

    if (tokens === null) {
    } else {
      if (workdata) {
        navigate.push(`/apphome/${workdata}/dashboard`);
      } else {
        navigate.push(`/apphome/dashboard`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setphonenumber = (value: any) => {
    setPhonenumber(value);
  };
  const setemailid = (value: any) => {
    setEmailid(value);
  };

  const RouteRenderPages = (value: any) => {
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
            Phonenumber={Phonenumber}
            EmailOrPhone={EmailOrPhone}
          />
        );
      case "SetPasswordEmail":
        return (
          <SetPasswordEmail
            RouteRenderPages={RouteRenderPages}
            Phonenumber={Phonenumber}
            EmailOrPhone={EmailOrPhone}
          />
        );
      case "EmailSignup":
        return (
          <EmailSignup RouteRenderPages={RouteRenderPages} ipData={ipData} />
        );
      case "PhoneSignup":
        return (
          <PhoneSignup
            RouteRenderPages={RouteRenderPages}
            EmailOrPhone={EmailOrPhone}
            setphonenumber={setphonenumber}
            Phonenumber={Phonenumber}
            ipData={ipData}
          />
        );
      default:
        return (
          // <PhoneSignup
          //   RouteRenderPages={RouteRenderPages}
          //   EmailOrPhone={EmailOrPhone}
          //   setphonenumber={setphonenumber}
          //   Phonenumber={Phonenumber}
          //   ipData={ipData}
          // />
          <EmailSignup RouteRenderPages={RouteRenderPages} ipData={ipData} />
        );
    }
  };

  return (
    <div className="relative h-full noPosition_sec">
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
      <div className="bg-[#281B37] p-[5px] fixed w-[100%] z-100">
        <div className=" flex items-center h-[60px] justify-between  w-full text-white sticky top-0 md:pr-[80px] pr-[30px] mx-auto md:px-16">
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
            <Link href="/apphome/login">
              <div className="p-[1.5px]  md:h-[41px] rounded-full bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                <span className="flex w-[110px] h-full py-2 items-center justify-center rounded-full bg-[#250e35] hover:bg-[#2F2546] back ">
                  <div className="text-[14px] font-normal text-white ">
                    Log in
                  </div>
                </span>
              </div>
            </Link>
          </button>
          {/* <div>
            <Link
              href="/apphome/login"
              className="navbutton flex justify-center w-[120px] h-[34px]  text-[14px] font-normal px-6 py-1 md:ml-[-10px] ml-[10px] text-white  border rounded-[40px] border-[#c575fa] from-blue-500 to-purple-500 hover:bg-[#7148d74a] hover:font-semibold"
            >
              Log in
            </Link>
          </div> */}
        </div>
      </div>
      <div className=" flex pt-10 flex-wrap items-center flex-row-reverse justify-center h-full pb-20 max-w-7xl mx-auto px-4 md:px-16">
        <div className="max-lg:[&>*]:mx-auto [&>*]:ml-auto xl:flex-1 pt-10 max-md:w-full box4">
          {renderPage()}
        </div>
        <div className="max-md:hidden px-4 ">
          <div className="max-lg:flex maindiv">
            <div>
              <p className="mainp opacity-[50%] leading-tight text-white md:text-[58px] text-[34px] tracking-normal font-extrabold lg:mt-[100px]  ">
                Embrace your creativity
              </p>
              <p className="ptag opacity-[50%] max-lg:hidden text-white md:text-[58px] text-[34px] tracking-normal font-extrabold md:mt-[-20px] mt-[-7px]">
                with NYX
              </p>
              <p className="text-white md:text-[16px] font-light text-[12px] max-lg:mt-[10px] tracking-normal basicp">
                Personalise, localise and animate your ideas.
              </p>
              <p className="text-white md:text-[16px]  font-light text-[12px]  tracking-normal basicp">
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
