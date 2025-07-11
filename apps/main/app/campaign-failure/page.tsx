"use client";
import "../index.css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const msg = window.location.href.split('=')[1]
    setMessage(msg.replaceAll('%20', ' '));
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const workspace = localStorage.getItem("workspace_name");
      if (workspace) {
        router.push(`${process.env.NEXT_PUBLIC_APP_URL}/apphome/${workspace}/platform-integration`);
      } else {
        console.error("Workspace name not found in localStorage");
      }

      if (window.opener) {
        window.opener.location.reload();
      }
      window.close();
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="bg-[#130625] h-screen flex justify-center items-center errorpage">
      <div className="flex flex-col items-center mx-2 text-white">
        <div className="relative w-[400px] h-[409px] md:w-[682px] md:h-[417px] rounded-[8.96px] md:rounded-[20.74px]">
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-[18px] md:text-[24px] font-[700]">Failed!</h3>
              <h2 className="text-[14px] md:text-[18px] font-[400] mt-1 mb-[20px] md:mt-2 md:mb-[20.74px] text-center text-white">
                Integration Failure
              </h2>
              <small className="text-gray-400 text-center">{message}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
