import { apiAxios2WithToken } from "./apiHandler";

export const addBrandServices = async (data: FormData) => {
  const response = await apiAxios2WithToken.post(`/brand/add-brand`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const addProductServices = async (data: FormData) => {
  const response = await apiAxios2WithToken.post(`/brand/add-product`, data, {
    withCredentials: true,
  });
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
  try {
    const response = await apiAxios2WithToken.get(`/brand/user-brands`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getbrandWorkspaceService = async (workspace_id: any) => {
  try {
    const response = await apiAxios2WithToken.get(
      `/brand/workspace-brands/${workspace_id}`,
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getbrandServiceonbording = async (brandid: any) => {
  const response = await apiAxios2WithToken.get(
    `/brand/user-brands/${brandid}`,
  );
  return response?.data;
};

export const addCampaignService = async (data: Object) => {
  try {
    const response = await apiAxios2WithToken.post(
      `/brand/add-brand-campaign`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletebrandbyid = async (brabdid: any) => {
  const response = await apiAxios2WithToken.delete(
    `/brand/delete-brand/${brabdid}`,
  );
  return response?.data;
};

export const deleteproductbyid = async (productid: any) => {
  const response = await apiAxios2WithToken.delete(
    `/brand/delete-product/${productid}`,
  );
  return response?.data;
};
export const deletetargetbyid = async (targetid: any) => {
  const response = await apiAxios2WithToken.delete(
    `/brand/delete-target-group/${targetid}`,
  );
  return response?.data;
};

export const getpromtandimageService = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/generate-image-v2`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const imageLikeDisLikeService = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/update-generation-reaction`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const getFolderService = async (workSpace_id: any) => {
  const response = await apiAxios2WithToken.get(
    `/brand/get-folders?workspace_id=${workSpace_id}`,
  );
  return response?.data;
};

export const changeImageFolderService = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/change-image-folder`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const createFolderService = async (data: Object) => {
  const response = await apiAxios2WithToken.post(`/brand/create-folder`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const getAssetServices = async (workspaceID: any) => {
  const res = await apiAxios2WithToken.get(
    `/brand/assets-fetch/${workspaceID}`,
  );
  return res.data;
};

export const uploadAssetServices = async (data: FormData) => {
  const response = await apiAxios2WithToken.post(`/brand/asset-upload`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const changeImageFolderServiceImageToImage = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/image2image/change-image-folder`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};
