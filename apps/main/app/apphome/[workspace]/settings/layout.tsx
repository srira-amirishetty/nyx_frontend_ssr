"use client";
import { useRouter } from "next/navigation";
import { ProfileTabs } from "@nyx-frontend/main/shared/inputs";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { Profile_TABS } from "@nyx-frontend/main/utils/utils";
import { useEffect, useState } from "react";
import { TAIL_TITLE } from "@nyx-frontend/main/components/tails2";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [contextTab, setContextTab] = useState(0);

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let workspaceName;
  if (typeof window !== "undefined") {
    workspaceName = localStorage.getItem("workspace_name");
  }

  const handleTabClick = (tabIndex: number) => {
    setContextTab(tabIndex);
  };

  return (
    <>
      <div
        className="flex w-full"
        // style={{
        //   background:
        //     "linear-gradient(52.6deg, #650B92 0.83%, #1D5C9C 100.51%)",
        // }}
      >
        <Sidebar />
        <div className="w-full p-2 pt-5 max-h-[100vh] overflow-hidden overflow-y-auto bg-[#130828]">
          <Profileicon hide={""}/>

          <div className=" w-full flex gap-5 p-2 px-5">
            <TAIL_TITLE
              title="Settings"
              style="text-white flex text-2xl font-bold "
            ></TAIL_TITLE>
          </div>
          <div className="w-[100%] mt-2 px-5">
            <Suspense>
              <ProfileTabs
                data={Profile_TABS}
                tabState={setContextTab}
                tabStatus={contextTab}
                onTabClick={handleTabClick}
                workspace={workspaceName}
              />
            </Suspense>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
export default Layout;
