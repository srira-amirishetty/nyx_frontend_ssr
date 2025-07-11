"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import TopBar from "@nyx-frontend/main/components/TopBar";
import Agent from "@nyx-frontend/agent";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="justify-start flex w-full bg-[#130828]">
        <Sidebar />
        <div className="w-full overflow-hidden overflow-y-auto h-[100vh]">
          <TopBar title="Agents" subTitle="Explore the creations by everyone in this workspace here." />

          <div className="w-full px-4 mt-16">
            <hr className="border-t border-gray-300 my-4" />
            <div className="w-full mt-8">
              <div className="justify-center w-full overflow-hidden overflow-y-auto h-[76vh]">
                <Agent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;