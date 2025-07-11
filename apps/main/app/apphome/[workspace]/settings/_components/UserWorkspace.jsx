/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Button from "@nyx-frontend/main/components/Button";
import {
  getAdminWorkSapce,
  getUserWorkSapce,
  getWorkSapceDetails,
  getWorkspaceDetailsById,
  deleteUser,
} from "@nyx-frontend/main/services/workSpace";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { EditUserRole } from "@nyx-frontend/main/services/workSpace";
const brandVision = IMAGE_URL + "/assets/home/brandvision.png";

const UserworkSpace = (props) => {
  const { id, name, description, created_at, workspace_user } = props;
  const [workspaceDetails, setWorkspaceDetails] = useState([]);
  const [userRole, setUserRole] = useState("");

  const { data: workSpaceData, isSuccess } = useQuery({
    queryKey: ["workSpaceData"],
    queryFn: async () => {
      const res = await getWorkspaceDetailsById(id);
      return res;
    },
  });

  const { data: workSpaceDataIds, mutate } = useMutation({
    mutationKey: ["workSpaceData-list"],
    mutationFn: async (ids) => {
      const maps = ids.map(async (id) => {
        return await getWorkspaceDetailsById(id);
      });

      const res = await Promise.allSettled(maps);
      return res.map((r) => r.value.workspace);
    },
  });

  console.log("workSpaceDataIds====>", workSpaceDataIds);

  const mutateEditUserRole = useMutation({
    mutationKey: ["change-user-role"],
    mutationFn: EditUserRole,
  });

  const updatedUserRole = (data) => {
    let payload = {
      workspace_id: data.workspace_id,
      user_id: data.user_id,
      new_role: data.new_role,
    };
    console.log("payload", payload);
    mutateEditUserRole.mutate(payload, {
      onSuccess: (response) => {
        setUserRole(data.new_role);
        console.log("response :", response);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  useEffect(() => {
    if (isSuccess && workSpaceData?.workspaces) {
      const ids = workSpaceData.workspaces.map(
        (workspace) => workspace.id,
      );
      mutate(ids);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const mutatedeleteWorkspace = useMutation({
    mutationKey: ["delete-workspace"],
    mutationFn: deleteUser
  });

  const deleteWorkspace = (data) => {
    let payload = {
      workspace_id: data.workspace_id,
      user_id: data.user_id,
      credit_limit: data.credit_limit,
    };
    console.log("payload", payload);
    mutatedeleteWorkspace.mutate(payload, {
      onSuccess: (response) => {
        setUserRole(data.credit_limit);
        console.log("response :", response);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleDelete = () => {
    deleteWorkspace({
      workspace_id: id,
      user_id: workspace_user[0]?.userId,
      credit_limit: "0",
    });
  };

  return (
    <>
      <div className="p-4">
        <div className="mt-10">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className=" text-[16px] font-medium text-nyx-yellow bg-[#091234]  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date Joined
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {workSpaceDataIds?.map((workspace, index) => (
                  <tr
                    key={index}
                    className="bg-[#3B226F] text-white font-normal"
                  >
                    <td className="p-4 text-start flex">
                      <svg
                        width="56"
                        height="55"
                        viewBox="0 0 56 55"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="28" cy="27.5" r="27.5" fill="#D9D9D9" />
                      </svg>
                      <span className="ml-5 mt-4">{workspace.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      {workspace.workspace_user?.[0]?.email}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        className="flex flex-col text-white bg-[#3B226F] p-2 text-center gap-6 mb-4"
                        value={workspace.workspace_user[0]?.role}
                        onChange={(event) => {
                          const newRole = event.target.value;
                          updatedUserRole({
                            workspace_id: workspace.id,
                            user_id: workspace.workspace_user[0]?.userId,
                            new_role: newRole,
                          });
                        }}
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="VIEWER">VIEWER</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      {workspace.workspace_user[0]?.dateJoined.split("T")[0]}
                    </td>
                    <td className="px-6 py-4 font-extrabold cursor-pointer"
                    onClick={() => handleDelete()}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19Z"
                          fill="white"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserworkSpace;