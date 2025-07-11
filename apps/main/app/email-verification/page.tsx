"use client";
import "../index.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DemoFormSuccess from "@nyx-frontend/main/components/Icons/DemoFormSuccess";
import { useMutation } from "@tanstack/react-query";
import { continueEmailVerification } from "@nyx-frontend/main/services/loginService";
import cookie from "cookiejs";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";
import MessageIcon from "@nyx-frontend/main/components/Icons/MessageIcon";
import Link from "next/link";
const FAILURE = (
  <svg
    width="104"
    height="105"
    viewBox="0 0 104 105"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="52" cy="52.5" r="52.0039" fill="#E53737" fill-opacity="0.1" />
    <circle
      cx="52.0032"
      cy="52.5013"
      r="41.8587"
      fill="#E53737"
      fill-opacity="0.3"
    />
    <rect
      x="23.3086"
      y="24.6211"
      width="58.7383"
      height="57.5736"
      rx="28.7868"
      fill="#E53737"
    />
    <path
      d="M44.1852 61.3471C44.4832 61.6256 44.8308 61.7649 45.228 61.7649C45.6253 61.7649 45.9729 61.6256 46.2708 61.3471L52.6767 55.3586L59.1323 61.3935C59.3971 61.6411 59.7364 61.7572 60.1502 61.7417C60.5641 61.7262 60.9034 61.5947 61.1682 61.3471C61.4662 61.0686 61.6151 60.7436 61.6151 60.3722C61.6151 60.0008 61.4662 59.6759 61.1682 59.3973L54.7623 53.4088L61.2179 47.3739C61.4827 47.1263 61.6069 46.8091 61.5903 46.4222C61.5738 46.0353 61.4331 45.7181 61.1682 45.4705C60.8703 45.192 60.5227 45.0527 60.1254 45.0527C59.7281 45.0527 59.3805 45.192 59.0826 45.4705L52.6767 51.4591L46.2212 45.4241C45.9563 45.1765 45.617 45.0605 45.2032 45.0759C44.7894 45.0914 44.45 45.223 44.1852 45.4705C43.8873 45.7491 43.7383 46.074 43.7383 46.4454C43.7383 46.8168 43.8873 47.1418 44.1852 47.4203L50.5911 53.4088L44.1355 59.4438C43.8707 59.6914 43.7466 60.0086 43.7631 60.3954C43.7797 60.7823 43.9204 61.0995 44.1852 61.3471Z"
      fill="white"
    />
  </svg>
);

export default function Page() {
  const router = useRouter();
  const [error, seterror] = useState<boolean>(false);
  const [success, setsuccess] = useState<boolean>(false);
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verified, setverified] = useState<boolean>(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokenParam = url.searchParams.get("token");
    const tokenEmail = url.searchParams.get("email");

    // @ts-ignore
    setToken(tokenParam);
    // @ts-ignore
    setUserEmail(tokenEmail);
  }, []);

  const mutatecontinueverification = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: continueEmailVerification,
  });

  const continueToVerification = (e: any) => {
    seterror(false);
    setsuccess(false);
    setIsLoading(true);
    const data = token;
    // @ts-ignore
    mutatecontinueverification.mutate(data, {
      onSuccess: (response: any) => {
        console.log(response);
        setsuccess(true);
        cookie.remove("notverifieduser");
        setIsLoading(false);
        setverified(true);
      },
      onError: (error: any) => {
        console.error(error);
        seterror(true);
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="bg-[#130625] h-screen flex justify-center items-center email-success">
      <div className="flex flex-col items-center justify-center">
        {!error && !success && (
          <div className=" w-full flex flex-col items-center justify-center">
            <div className="w-fit h-fit bg-[#AE8FEF] rounded-full p-6 ">
              <MessageIcon className="h-8 w-8"></MessageIcon>
            </div>
            <div className="mt-6 flex flex-col items-center text-center px-[30px] sm:px-[60px]">
              <div className="font-bold text-[24px] text-[#FFFFFF]">
                Verify your email address
              </div>
              <div className="font-normal text-[16px] text-[#C0C0C0] mt-4">
                You&apos;ve entered {userEmail ?? ""} as the email address for
                your account. Please verify this email address by clicking
                button below.
              </div>
              <button
                type="submit"
                className={`mt-4  max-md:mt-6 max-lg:mt-6 border-none rounded-full px-[46px] py-2 lg:text-[14px]
        bg-gradient-to-r from-[#B631B1] from-0%  to-[#7048D7] to-62% text-center text-[#FFFFFF]`}
                onClick={continueToVerification}
                disabled={isLoading || mutatecontinueverification.isPending}
              >
                {isLoading || mutatecontinueverification.isPending ? (
                  <ButtonLoading />
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>
        )}

        {error && (
          <>
            <div className="w-full">
              <div className="flex mt-2 justify-center items-center">
                {FAILURE}
              </div>
              <div className="flex justify-center items-center mt-6">
                <div className=" flex flex-col items-center text-center px-[30px] sm:px-[60px]">
                  <div className="font-bold text-[24px] text-[#FFFFFF]">
                    Something went wrong!
                  </div>
                  <div className="font-normal text-[16px] text-[#C0C0C0] mt-4">
                    The link you used is either expired or has already been used
                  </div>
                  <Link href="/">
                    <button
                      type="submit"
                      className={`mt-4  max-md:mt-6 max-lg:mt-6 border-none rounded-full px-[46px] py-2 lg:text-[14px]
        bg-gradient-to-r from-[#B631B1] from-0%  to-[#7048D7] to-62% text-center text-[#FFFFFF]`}
                    >
                      Go to Nyx App
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
        {success && (
          <>
            <div className="w-full">
              <div className="flex mt-2 justify-center items-center">
                <DemoFormSuccess />
              </div>
              <div className="flex justify-center items-center mt-6">
                <div className=" flex flex-col items-center text-center px-[30px] sm:px-[60px]">
                  <div className="font-bold text-[24px] text-[#FFFFFF]">
                    Email Verified
                  </div>
                  <div className="font-normal text-[16px] text-[#C0C0C0] mt-4">
                    Your have successfully verified account.
                    <br />
                    Log in now to start creating with NYX.
                  </div>
                  <Link href="/apphome/login">
                    <button
                      type="submit"
                      className={`mt-4  max-md:mt-6 max-lg:mt-6 border-none rounded-full px-[46px] py-2 lg:text-[14px]
        bg-gradient-to-r from-[#B631B1] from-0%  to-[#7048D7] to-62% text-center text-[#FFFFFF]`}
                    >
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
