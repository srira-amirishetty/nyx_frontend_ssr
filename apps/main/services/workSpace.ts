import axios from "axios";
import { apiAxios2WithToken } from "@nyx-frontend/main/services/apiHandler";
import { apiAxiosWithToken } from "./apiHandler";

export const getBillingHis = async () => {
  const response = await apiAxiosWithToken.get(`/order/billing-history`);
  return response?.data;
};

export const getAdminWorkSapce = async () => {
  const response = await apiAxios2WithToken.get(`/workspace/owner-workspaces`);
  return response?.data;
};

// export const getWorkSpace = async () => {
//   const response = await axios.post(
//     ${process.env.NEXT_PUBLIC_APT_URL_V2}/workspace/user-workspaces,
//     {
//       headers: {
//         "Authorization": localStorage.getItem("token")
//       }
//     });
//   return response?.data;
// };

export const newWorkSapce = async (data: FormData) => {
  const response = await apiAxios2WithToken.post(
    `/workspace/add-workspace`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const getUserWorkSapce = async () => {
  const response = await apiAxios2WithToken.get(`/workspace/user-workspaces`);
  return response?.data;
};

export const getWorkSapceDetails = async () => {
  const response = await apiAxios2WithToken.get(`/workspace/workspace-details`);
  return response?.data;
};

export const getIPDetails = async () => {
  const response = await axios.get(`https://ipapi.co/json/`);
  return response?.data;
};

export const getWorkspaceDetailsById = async (workspaceId: number) => {
  const response = await apiAxios2WithToken.get(
    `/workspace/workspace-details/${workspaceId}`,
  );
  return response?.data;
};

export const getUser = async () => {
  const response = await apiAxiosWithToken.get(`/artists/get-profile`);
  return response?.data;
};

export const EditUserRole = async (data: Object) => {
  const response = await apiAxios2WithToken.put(
    `/workspace/change-user-role`,
    data,
  );
  return response?.data;
};

export async function deleteUser(data: Object) {
  const response = await apiAxios2WithToken.delete(
    `/workspace/remove-workspace-user`,
    {
      data: data,
    },
  );
  return response?.data;
}

export const inviteuserworkspace = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/workspace/invite-workspace-user`,
    data,
  );
  return response?.data;
};
export const inviteusertokenapi = async (data: Object) => {
  const response = await apiAxios2WithToken.get(
    `/workspace/join-workspace?invite_id=${data}`,
  );
  return response?.data;
};

export const creditHistory = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/workspace/workspace-credit-history`,
    data,
  );

  return response?.data;
};

export const EditWorkSpaceData = async (id: number) => {
  const response = await apiAxios2WithToken.get(
    `/workspace/workspace-details/${id}`,
  );

  return response?.data;
};

export const EditNameAndCredit = async (data: Object) => {
  const response = await apiAxios2WithToken.put(
    `/workspace/update-credit-limit`,
    data,
  );

  return response?.data;
};

export const getAvailableCredit = async (workspace_id: any) => {
  const response = await apiAxios2WithToken.get(
    `/workspace/available-credits/${workspace_id}`,
  );

  return response?.data;
};
