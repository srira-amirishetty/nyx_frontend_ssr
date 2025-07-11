"use client";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import Button from "@nyx-frontend/main/components/Button";
import { getAdminWorkSapce, getAvailableCredit } from "@nyx-frontend/main/services/workSpace";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EditWorkSpace from "../_components/EditWorkSpace";
import { useRouter } from "next/navigation";

const WorkSpace = () => {
  const [contextTab, setContextTab] = useState(0);
  const [editWorkSpace, setEditWorkSpace] = useState(false);
  const [WorkSpaceId, setWorkSpaceId] = useState();

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: workSpaceData, refetch: workSpcaeDtaRefetch } = useQuery({
    queryKey: ["workSpaceData"],
    queryFn: () => {
      return getAdminWorkSapce();
    },
  });

  const { data: availableCredit } = useQuery({
    queryKey: ["available-credit"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")));
    },
  });

  const HandleEdit = (val) => {
    setWorkSpaceId(val);
    setEditWorkSpace(true);
  };

  return (
    <>
      <div className="p-4">
        {/* <div>
          <div className=" font-bold text-[14px]  leading-4 text-white mt-6 mb-4">
            Drive Usage
          </div>
          <div className="w-[318px] ">
            <span
              className={"block relative w-full rounded-full h-2 bg-[#8297BD]"}
            >
              <span className="absolute h-full top-0 left-0 bg-transparent rounded-full w-full "></span>
              <span
                className="absolute h-full top-0 left-0 bg-nyx-yellow rounded-full"
                style={{ width: `50%` }}
              ></span>
              <span className="absolute"></span>
            </span>
            <span className="text-white  font-normal text-[12px] leading-3 ml-1">
              500 Mb used of 1 GB
            </span>
          </div>
        </div> */}

        <div className="mt-5">
          <div className="relative overflow-x-auto h-[70vh]">
            <table className=" table-fixed w-full text-sm text-left rtl:text-right rounded-[10px] overflow-hidden ">
              <thead className=" text-[16px]  font-medium text-white bg-[#23145A] sticky top-0">
                <tr className="text-[#E9BD4E] text-[14px] leading-[18px]">
                  <th scope="col" className="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Workspace Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Credits Used
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Storage Used
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Credit Limit
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {workSpaceData?.workspaces?.map((item, index) => (
                  <Fragment key={`work-space-${index}`}>
                    <tr className="bg-[#332270] text-white  font-normal border-b border-solid border-[#503193]">
                      <th scope="row" className="px-6 py-4  text-white">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4  truncate ">{item.name}</td>
                      <td className="px-6 py-4">
                        {item.credit_used != null ? item.credit_used : 0}
                      </td>
                      <td className="px-6 py-4">
                        {item.storage_used != null ? item.storage_used : 0}
                      </td>
                      <td className="px-6 py-4">
                        {item.credit_limit != null && item.credit_limit != ""
                          ? item.credit_limit
                          : 0}
                      </td>
                      <td className="px-6 py-4 font-extrabold">
                        <div
                          className="cursor-pointer"
                          onClick={() => HandleEdit(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M2.5 14.3731V17.4981H5.625L14.8417 8.28146L11.7167 5.15646L2.5 14.3731ZM17.2583 5.8648C17.3356 5.7877 17.3969 5.69613 17.4387 5.59532C17.4805 5.49451 17.502 5.38644 17.502 5.2773C17.502 5.16816 17.4805 5.06009 17.4387 4.95928C17.3969 4.85847 17.3356 4.76689 17.2583 4.6898L15.3083 2.7398C15.2312 2.66254 15.1397 2.60125 15.0389 2.55944C14.938 2.51762 14.83 2.49609 14.7208 2.49609C14.6117 2.49609 14.5036 2.51762 14.4028 2.55944C14.302 2.60125 14.2104 2.66254 14.1333 2.7398L12.6083 4.2648L15.7333 7.3898L17.2583 5.8648Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editWorkSpace ? (
        <EditWorkSpace
          createWork={editWorkSpace}
          setEditWorkSpace={setEditWorkSpace}
          WorkSpaceId={WorkSpaceId}
          workSpcaeDtaRefetch={workSpcaeDtaRefetch}
          availableCredit={availableCredit?.availableCredits}
        />
      ) : null}
    </>
  );
};

export default WorkSpace;
