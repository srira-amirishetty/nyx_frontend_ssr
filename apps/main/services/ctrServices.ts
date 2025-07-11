import { apiAxios2WithToken } from "@nyx-frontend/main/services/apiHandler";

export const analysisCampaignService = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/add-image-analysis`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const analysisResultService = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/get-image-analysis`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const generateAnalysisService = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/get-generated-image-analysis`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const generateEnhancedImageServices = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/brand/generate-image-analysis-v2`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};
