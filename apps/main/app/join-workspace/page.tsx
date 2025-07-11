"use client";
import "../index.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DemoFormSuccess from "@nyx-frontend/main/components/Icons/DemoFormSuccess";
import { useMutation } from "@tanstack/react-query";
import { continueEmailVerification } from "@nyx-frontend/main/services/loginService";
import { inviteusertokenapi } from "@nyx-frontend/main/services/workSpace";
import cookie from "cookiejs";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";

export default function Page() {
  const router = useRouter();
  const [error, seterror] = useState<boolean>(false);
  const [success, setsuccess] = useState<boolean>(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verified, setverified] = useState<boolean>(false);
  const [ValueBeforeWith, setValueBeforeWith] = useState<boolean>(false);
  const [ValueafterWith, setValueafterWith] = useState<String>("");
  const [invitationnotfound, setinvitationnotfound] = useState<boolean>(false);

  const mutateinvitecontinue = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: inviteusertokenapi,
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokenParam = url.searchParams.get("invite_id");
    // @ts-ignore
    const localtoken = localStorage.getItem("token");
    if (localtoken) {
      //@ts-ignore
      mutateinvitecontinue.mutate(tokenParam, {
        onSuccess: (response: any) => {
          console.log(response);
          setsuccess(true);
          setverified(true);
        },
        onError: (error: any) => {
          seterror(true);
          setverified(false);
          const errormsg2 = error.response.data.errors.message;
          const getValueBeforeWith = errormsg2.substring(
            0,
            errormsg2.indexOf("with"),
          );
          const getValueAfterWith = errormsg2
            .substring(errormsg2.indexOf("with") + 5)
            .slice(0, -1);
          if (
            getValueBeforeWith === "Failed to join workspace, please login "
          ) {
            setValueafterWith(getValueAfterWith);
            setValueBeforeWith(true);
          }
          if (errormsg2 === "invitation not found") {
            setinvitationnotfound(true);
          }
        },
      });
    } else {
      //@ts-ignore
      localStorage.setItem("joinworkspace", tokenParam);
      router.push(`/apphome/login`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendToDashBoard = () => {
    const workspace = localStorage.getItem("workspace_name");
    if (workspace) {
      router.push(`/apphome/${workspace}/dashboard`);
    } else {
      router.push(`/apphome/login`);
    }
  };

  return (
    <div className="bg-[#130625] h-screen flex justify-center items-center errorpage">
      <div className="flex flex-col items-center mx-2 text-white">
        <div className="relative w-[400px] h-[409px] md:w-[682px] md:h-[417px] rounded-[8.96px] md:rounded-[20.74px]">
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            {/* <div className="flex justify-center items-center">
              <DemoFormSuccess />
            </div> */}
            <div className="flex flex-col items-center justify-center">
              {!error && !success ? (
                <h3 className="text-[18px] md:text-[24px] mb-4  font-[700]">
                  Please Wait...
                </h3>
              ) : null}

              {error && (
                <>
                  <p className="text-[14px]  md:text-[18px] font-[600] mt-1 mb-[5px] md:mt-2 md:mb-[10px] text-center text-[#ffffff]">
                    Failed to join workspace!
                  </p>
                  {ValueBeforeWith && (
                    <p className="text-[14px] text-[#ffffff] md:text-[18px] font-[600] mt-1 mb-[10px] md:mt-2 md:mb-[10px] text-center ">
                      please login with{" "}
                      <span className=" text-[#85ff97] text-[12px] md:text-[16px]">
                        {ValueafterWith}
                      </span>
                    </p>
                  )}
                </>
              )}
              {invitationnotfound && (
                <p className="text-[14px] text-[#ffffff] md:text-[18px] font-[600] mt-1 mb-[10px] md:mt-2 md:mb-[10px] text-center ">
                  Invitation not found !
                </p>
              )}
              {success && (
                <div className="flex mt-2 mb-2 justify-center items-center">
                  <DemoFormSuccess />
                </div>
              )}
              {success && (
                <div className="flex justify-center items-center">
                  <h2 className="text-[14px] md:text-[18px] font-[400] mt-1 mb-[10px] md:mt-2 md:mb-[10px] text-center text-white">
                    Successfully joined WorkSpace !
                  </h2>
                </div>
              )}

              <div className="w-full mt-3 flex justify-center items-center">
                {verified && (
                  <button
                    onClick={sendToDashBoard}
                    type="submit"
                    className={
                      isLoading
                        ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[160px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                        : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[160px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                    }
                  >
                    {isLoading ? <ButtonLoading /> : "Go To Dashboard"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
