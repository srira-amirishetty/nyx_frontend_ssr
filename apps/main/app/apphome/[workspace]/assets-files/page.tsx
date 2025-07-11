/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import TopBar from "@nyx-frontend/main/components/TopBar";
import Card from "./components/Card";
import Link from "next/link";
import { useState, useEffect } from "react";

const Page = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { id?: string; type?: string };
}) => {
  // const [assetfolders, setAssetfolders] = useState([]);
  const [workspace, setworkspace] = useState<any>();

  // const [test, setTest] = useState(0);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setworkspace(work);
  }, []);

  // const queryGetfolder = useQuery({
  //   queryKey: ["getFolders", workspace],
  //   queryFn: () => {
  //     if (workspace) {
  //       return getFolderForAsset(workspace);
  //     }
  //   },
  // });

  // useEffect(() => {
  //   if (queryGetfolder.isSuccess) {
  //     const datas = queryGetfolder.data;
  //     if (datas) {
  //       setAssetfolders(datas);
  //       setTest(datas[0].folder_id)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [queryGetfolder.isSuccess, workspace]);
  return (
    <>
      <div className="justify-start flex w-full bg-[#130828]">
        <Sidebar />
        <div className="w-full overflow-hidden overflow-y-auto h-[100vh]">
          <TopBar title="" subTitle=" " />
          <div className="w-full mt-4">
            <Card id={searchParams.id} type={searchParams.type} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
