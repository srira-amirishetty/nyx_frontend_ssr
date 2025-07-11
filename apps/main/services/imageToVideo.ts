import { apiAxios2WithToken } from "./apiHandler";

export const uploadImageToVideoServices = async (data: FormData) => {
  const res = await apiAxios2WithToken.post(`/image_video/upload-image`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const generateVideoServices = async (data: Object) => {
  const res = await apiAxios2WithToken.post(
    `/image_video/generate-video`,
    data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const generateImagetoVideoStatus = async (taskId: any) => {
  const res = await apiAxios2WithToken.get(
    `/image_video/generation-status/${taskId}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const reactionServices = async (data: Object) => {
  const res = await apiAxios2WithToken.post(
    `/image_video/video-generate-reaction`,
    data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const getDriveImageServiceImageToVideo = async (wId: any) => {
  const res = await apiAxios2WithToken.get(`/image_video/drive-images/${wId}`, {
    withCredentials: true,
  });
  return res?.data;
};


export const getUploadProfileService = async (wId: any) => {
  const res = await apiAxios2WithToken.get(`/brand/get-media/${wId}?type=images`, {
    withCredentials: true,
  });
  return res?.data;
};
