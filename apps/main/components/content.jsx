"use client";
import { useEffect } from "react";
import { verifyJWTToken } from "@nyx-frontend/main/utils/utils";
import { useRouter } from "next/navigation";
import classNames from "@nyx-frontend/main/utils/classNames"


export function ContentNonLogin(props) {
  return (
    <div
      className={classNames(`w-full md:w-[95%] rounded-2xl bg-colorBack m-auto pb-4 md:pb-[4rem] mb-24 mt-24 md:mt-32`, props.top)}
    >
      {props.children}
    </div>
  );
}

function Content(props) {
  const navigate = useRouter();

  useEffect(() => {
    const token =  localStorage.getItem("token");
    const data = verifyJWTToken(token)?.data;


    if (!data?.type?.length) {

      navigate.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`w-full md:w-[90%] rounded-3xl bg-colorBack m-auto pb-[4rem] mb-24 mt-40 ${props.top}`}
    >
      {props.children}
    </div>
  );
}

export default Content;
