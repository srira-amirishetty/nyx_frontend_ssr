"use client";
import React, { useState, useEffect } from "react";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import Card from "./Card";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import TopBar from "@nyx-frontend/main/components/TopBar";
import { getFolderForAsset } from "@nyx-frontend/main/services/asset";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const Page = () => {
  const [assetfolders, setAssetfolders] = useState();
  const [workspace, setworkspace] = useState<any>();
  const [workspacename, setWorkspacename] = useState<any>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const work = localStorage.getItem("workspace_id");
    setworkspace(work);
  }, []);

  const queryGetfolder = useQuery({
    queryKey: ["getFolders", workspace],
    queryFn: () => {
      if (workspace) {
        return getFolderForAsset(workspace);
      }
    },
  });

  useEffect(() => {
    if (queryGetfolder.isSuccess) {
      const datas = queryGetfolder.data;
      if (datas) {
        setAssetfolders(datas);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetfolder.isSuccess, workspace]);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspacename(work);
  }, []);

  return (
    <>
      <div className="justify-start flex w-full bg-[#130828]">
        <Sidebar />
        <div className="w-full overflow-hidden overflow-y-auto h-[100vh]">
          <TopBar title="Assets" subTitle="Explore the creations by everyone in this workspace here." />

          <div className="w-full px-4 mt-16">
            <hr className="border-t border-gray-300 my-4" />
            <div className="w-full mt-8">
              {queryGetfolder.isPending ? (
                <div className="w-full flex gap-5 flex-wrap">
                  <Loading />
                  <Loading />
                  <Loading />
                </div>
              ) : (
                <div className="w-full flex gap-5 flex-wrap">
                  <Card assetfolders={assetfolders} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
