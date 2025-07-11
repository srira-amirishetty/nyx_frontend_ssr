"use client";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import Button from "@nyx-frontend/main/components/Button";
import { getAdminWorkSapce } from "@nyx-frontend/main/services/workSpace";
import { useQuery } from "@tanstack/react-query";
import EditWorkSpace from "./EditWorkSpace"

const WorkSpace = () => {
  const [contextTab, setContextTab] = useState(0);
  const [editWorkSpace,setEditWorkSpace]=useState(false);
  const [WorkSpaceId,setWorkSpaceId]=useState();

  const { data: workSpaceData ,refetch:workSpcaeDtaRefetch} = useQuery({
    queryKey: ["workSpaceData"],
    queryFn: () => {
      return getAdminWorkSapce();
    },
  });

const HandleEdit=(val)=>{
  setWorkSpaceId(val)
  setEditWorkSpace(true)
}  



  return (
    <>
      <div className="p-4">
        <div>
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
        </div>

        <div className="mt-10">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className=" text-[16px]  font-medium text-nyx-yellow bg-[#091234]  ">
                <tr>
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
                    <tr className="  bg-[#3B226F] text-white  font-normal">
                      <th scope="row" className="px-6 py-4  text-white">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 ">{item.name}</td>
                      <td className="px-6 py-4">
                        {item.credit_used != null ? item.credit_used : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {item.storage_used != null ? item.storage_used : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {item.credit_limit != null ? item.credit_limit : "N/A"}
                      </td>
                      <td className="px-6 py-4 font-extrabold">
                      <div className="cursor-pointer" onClick={()=>HandleEdit(item.id)} >

                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M2.5 14.3731V17.4981H5.625L14.8417 8.28146L11.7167 5.15646L2.5 14.3731ZM17.2583 5.8648C17.3356 5.7877 17.3969 5.69613 17.4387 5.59532C17.4805 5.49451 17.502 5.38644 17.502 5.2773C17.502 5.16816 17.4805 5.06009 17.4387 4.95928C17.3969 4.85847 17.3356 4.76689 17.2583 4.6898L15.3083 2.7398C15.2312 2.66254 15.1397 2.60125 15.0389 2.55944C14.938 2.51762 14.83 2.49609 14.7208 2.49609C14.6117 2.49609 14.5036 2.51762 14.4028 2.55944C14.302 2.60125 14.2104 2.66254 14.1333 2.7398L12.6083 4.2648L15.7333 7.3898L17.2583 5.8648Z" fill="white"/>
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


      {editWorkSpace ? (<EditWorkSpace  createWork={editWorkSpace} setEditWorkSpace={setEditWorkSpace} WorkSpaceId={WorkSpaceId} workSpcaeDtaRefetch={workSpcaeDtaRefetch} /> ):null}
    </>
  );
};

export default WorkSpace;
