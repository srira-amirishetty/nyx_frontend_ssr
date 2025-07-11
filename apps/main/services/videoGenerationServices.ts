import { apiAxios2WithToken } from "./apiHandler";
import { apiAxios3WithToken } from "./apiHandler";
import { apiAxiosModel } from "./apiHandler";
import axios from "axios";

export const addBrandServices = async (data: FormData) => {
  const response = await apiAxios2WithToken.post(`/brand/add-brand`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const createCampaign = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/brandTextVideoCampaign/`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const getCampaignWithId = async (campaignId: any) => {
  const response = await apiAxios2WithToken.get(
    `/brand/brandTextVideoCampaign/${campaignId}`,
    {
      withCredentials: true,
    },
  );
  return response?.data;
};

export const videoGeneration = async (data: Object) => {
  const response = await apiAxios3WithToken.post(
    `/brand/generate-video`,
    data,
    {
      withCredentials: true,
      timeout: 0,
    },
  );
  return response.data;
};

export const scriptGeneration = async (data: Object) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_TEXT2VIDEO_URL}/generate-script
  `,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    },
  );
  return response.data;
};

export const generateStatus = async (taskId: any) => {
  const response = await apiAxios3WithToken.get(
    `/brand/generation-status/${taskId}`,
    {
      withCredentials: true,
    },
  );
  return response?.data;
};

export const likeDislike = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/update-generation-reaction`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const addProductServices = async (data: FormData) => {
  const response = await apiAxios2WithToken.post(`/brand/add-product`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateTextToVideo = async (args: any) => {
  const { campaignId, data } = args;
  const response = await apiAxios2WithToken.put(
    `/brand/brandTextVideoCampaign/${campaignId}`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const addTargetGroupServices = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/add-target-group`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const getbrandService = async () => {
  const response = await apiAxios2WithToken.get(`/brand/user-brands`, {});
  return response?.data;
};

export const getbrandServiceonbording = async (brandid: any) => {
  const response = await apiAxios2WithToken.get(
    `/brand/user-brands/${brandid}`,
    {
      withCredentials: true,
    },
  );
  return response?.data;
};

export const addCampaignService = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/add-brand-campaign`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const deleteproductbyid = async (productid: any) => {
  const response = await apiAxios2WithToken.delete(
    `/brand/delete-product/${productid}`,
    {
      withCredentials: true,
    },
  );
  return response?.data;
};
export const deletetargetbyid = async (targetid: any) => {
  const response = await apiAxios2WithToken.delete(
    `/brand/delete-target-group/${targetid}`,
    {
      withCredentials: true,
    },
  );
  return response?.data;
};

export const imageLikeDisLikeService = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/update-prompt-reaction`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const updateTextToVideoChat = async (data: any) => {
  const response = await apiAxios3WithToken.post(
    `/brand/chat`,
    data,
    {
      withCredentials: true,
      timeout: 0,
    },
  );
  return response.data;
};

export const updateTextToVideoUpdate = async (data: any) => {
  const response = await apiAxios3WithToken.post(
    `/brand/update-video`,
    data,
    {
      withCredentials: true,
      timeout: 0,
    },
  );
  return response.data;
};


export const generateUpdateStatus = async (taskId: any) => {
  const response = await apiAxios3WithToken.get(
    `/brand/generation-status-update-video/${taskId}`,
    {
      withCredentials: true,
      timeout: 0,
    },
  );
  return response.data;
};