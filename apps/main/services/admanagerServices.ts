import {
  apiAxios,
  apiAxios2WithToken,
  apiAxiosModel,
  apiAxiosWithToken,
  apiAxios3WithToken
} from "@nyx-frontend/main/services/apiHandler";
import axios from "axios";

export const createCampaign = async (data: Object) => {
  const response = await apiAxios3WithToken.post(
    `/admanager/user_campaign`,
    data,
  );
  return response?.data;
};

export const createCampaignTg = async (data: Object) => {
  const response = await apiAxios3WithToken.post(
    `/admanager/campaign-tg-data`,
    data,
  );
  return response?.data;
};

export const updateCampaignBudget = async (data: Object) => {
  const response = await apiAxios3WithToken.put(
    `/admanager/campaign-tg-data`,
    data,
  );
  return response?.data;
};

export const updateCampaignTg = async (data: Object) => {
  const response = await apiAxios3WithToken.put(
    `/admanager/ad-previews`,
    data,
  );
  return response?.data;
};

export const deleteCampaignTg = async (data: Object) => {
  const response = await apiAxios3WithToken.post(
    `/admanager/delete/ad-previews`,
    data,
  );
  return response?.data;
};

export const getBuisnessId = async (data: Object) => {
  const response = await apiAxiosWithToken.post(`/meta/get-business`, data);

  return response?.data;
};

export const getGmc = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/admanager/get-linked-gmc`,
    data,
  );

  return response?.data;
};

export const getGmcProduct = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/admanager/gmc-products`,
    data,
  );

  return response?.data;
};

export const getGmcProductList = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `/admanager/gmc-products`,
    data,
  );

  return response?.data;
};

export const getProductCatalouge = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/meta/get-product-catalouges`,
    data,
  );

  return response?.data;
};

export const getAllBusinessidsProductCatalouge = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/meta/get-all-product-catalouges`,
    data,
  );

  return response?.data;
};

export const getAllProductofCatalouge = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/meta/get-all-products-of-catalog`,
    data,
  );

  return response?.data;
};

export const uploadLinkGoogleProductCatalouge = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `admanager/gmc-products/url-upload`,
    data,
  );

  return response?.data;
};

export const uploadFileGoogleProductCatalouge = async (data: Object) => {
  const response = await apiAxios2WithToken.post(
    `admanager/gmc-products/file-upload`,
    data,
  );

  return response?.data;
};

export const uploadLinkMetaProductCatalouge = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/meta/schedule-feed-catalog-upload`,
    data,
  );

  return response?.data;
};

export const uploadFileMetaProductCatalouge = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/meta/catalog-file-upload`,
    data,
  );

  return response?.data;
};

export const getProductSet = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/meta/get-products-sets`,
    data,
  );

  return response?.data;
};

export const getProductList = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/meta/get-products-lists`,
    data,
  );

  return response?.data;
};

export const updateCampaign = async (data: Object) => {
  const response = await apiAxios2WithToken.put(
    `/admanager/user_campaign`,
    data,
  );
  return response?.data;
};

export const updateCampaign3 = async (data: Object) => {
  const response = await apiAxios3WithToken.put(
    `/admanager/user_campaign`,
    data,
  );
  return response?.data;
};

export const getExternalCampaigns = async (data: Object) => {
  const response = await apiAxios3WithToken.post(
    `/admanager/get-external-campaigns-asset`,
    data,
  );
  return response?.data;
};

export const getPixel = async (data: any) => {
  const response = await apiAxios2WithToken.get(
    `admanager/pixels?workspace_id=${data.workspace_id}&brandId=${data.brandId}&platform=${data.platform}`,
    data,
  );
  return response?.data;
};

export const getApp = async (data: any) => {
  const response = await apiAxios2WithToken.get(
    `admanager/apps?workspaceId=${data.workspace_id}&brandId=${data.brandId}&platform=${data.platform}`,
    data,
  );
  return response?.data;
};

export const getConversionEvent = async (data: any) => {
  const response = await apiAxios2WithToken.get(
    `admanager/conversion-actions?workspace_id=${data.workspace_id}&brandId=${data.brandId}&platform=${data.platform}`,
    data,
  );
  return response?.data;
};
export const getConversionEventUrl = async (data: any) => {
  const response = await apiAxios2WithToken.get(
    `admanager/conversion-actions?workspace_id=${data.workspace_id}&brandId=${data.brandId}&platform=${data.platform}&siteURL=${data.url}`,
    data,
  );
  return response?.data;
};

export const getAllGoals = async () => {
  const response = await apiAxios2WithToken.get(`/admanager/all-goals`, {});
  return response?.data;
};

export const getAllPlatform = async () => {
  const response = await apiAxios2WithToken.get(`/admanager/all-platforms`, {});
  return response?.data;
};

export const getCampaign = async (campaignId: any) => {
  const response = await apiAxios2WithToken.get(
    `/admanager/user_campaign/${campaignId}?workspace_id=${localStorage.getItem("workspace_id")}`,
  );
  return response?.data;
};

export const getCampaignSummary = async (campaignId: any) => {
  const response = await apiAxios3WithToken.get(
    `/admanager/campaign-summary/${campaignId}`,
  );
  return response?.data;
};

export const getCampaign3 = async (campaignId: any) => {
  const response = await apiAxios3WithToken.get(
    `/admanager/user_campaign/${campaignId}`,
  );
  return response?.data;
};
export const getCampaignBudget = async (campaignId: any) => {
  const response = await apiAxios3WithToken.get(
    `/admanager/campaign-budget-data/${campaignId}`,
  );
  return response?.data;
};

export const getTg3 = async (campaignId: any, tgId: any) => {
  const response = await apiAxios3WithToken.get(
    `/admanager/tg-ads-previews/${campaignId}/${tgId}`,
  );
  return response?.data;
};

export const getAllCampaign = async (campaignID: any) => {
  const response = await apiAxios2WithToken.get(
    `/admanager/all-campaigns/${campaignID}`,
  );
  return response?.data;
};

export const getAllCampaiPagination = async (
  campaignID: any,
  params: Record<string, any> = {},
) => {
  const response = await apiAxios2WithToken.get(
    `/admanager/all-campaigns-new/${campaignID}`,
    { params }, // Correct way to pass query parameters
  );
  return response?.data;
};

export const getChildCampaigns = async (campaignId: string) => {
  const response = await apiAxios3WithToken.get(
    `/admanager/campaign-child-details/${campaignId}`
  );
  return response?.data;
}

export const publishCampaign = async (data: Object) => {
  const response = await apiAxios3WithToken.post(
    `/admanager/publish_campaign`,
    data,
  );

  return response?.data;
};

export const admanagerSystemUpload = async (data: FormData) => {
  const response = await apiAxios2WithToken.post(`/canvas/upload`, data);

  return response?.data;
};
export const recomendationCampaign = async (data: Object) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_MODEL_AI_URL}/nyx-ad-recommendation/v3/recommend/`,
    data,
  );
  return response?.data;
};

export const OnlyActiveCampaign = async (data: Object) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_MODEL_AI_URL}/nyx-ad-recommendation/getadsdata/`,
    data,
  );

  return response?.data;
};

export const AdServiceBrands = async (data: object) => {
  const res = await apiAxios2WithToken.post(
    `admanager/all-accounts-of-brand-id`,
    data,
  );
  return res.data;
};
export const CampaignStatusUpdate = async (data: object) => {
  const res = await apiAxios2WithToken.put(
    `/admanager/toggle-campaign-status`,
    data,
  );
  return res.data;
};

export const AiHeadlineSuggestion = async (data: object) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AI_SUGGESTION}/get_headline_recomm/`,
    data,
  );
  return res.data;
};

export const BudgetAiSuggestion = async (data: object) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AI_SUGGESTION}/v2/allocatebudget/`,
    data,
  );
  return res.data;
};

export const CreateNewAudience = async (data: any) => {
  const res = await apiAxiosWithToken.post(`/audience/custom_audience`, data);
  return res.data;
};

export const UploadNewAudience = async (data: FormData) => {
  const res = await apiAxiosWithToken.post(
    `/audience/custom_audience/upload`,
    data,
  );
  return res.data;
};
export const CreateLookAlikeAudience = async (data: any) => {
  const res = await apiAxiosWithToken.post(
    `/audience/lookalike_audience`,
    data,
  );
  return res.data;
};
export const DeleteLookAlikeAudience = async (data: any) => {
  const res = await apiAxiosWithToken.post(`/audience/delete`, data);
  return res.data;
};
export const GetAllAudienceCustom = async ({
  brandId,
  workspaceid,
}: {
  brandId: any;
  workspaceid: any;
}) => {
  const res = await apiAxios2WithToken.get(
    `/brand/user-brands/${brandId}?audienceType=CUSTOM`,
  );
  return res.data;
};
export const GetAllAudienceCustomgoogle = async ({
  brandId,
  workspaceid,
}: {
  brandId: any;
  workspaceid: any;
}) => {
  const res = await apiAxiosWithToken.get(`/audience/custom_audience`, {
    params: {
      workspaceId: workspaceid,
      brandId: brandId,
      platform: "GOOGLE",
    },
  });
  return res.data;
};

export const GetIntrestHobbies = async ({
  hobbies,
  workspaceid,
}: {
  hobbies: any;
  workspaceid: any;
}) => {
  const res = await apiAxiosWithToken.get(
    `/campaign-ads/google/get-interest-list?workspace_id=${workspaceid}&search=${hobbies}`,
  );
  return res.data;
};

export const GetAllAudienceLookalike = async ({
  brandId,
  workspaceid,
}: {
  brandId: any;
  workspaceid: any;
}) => {
  const res = await apiAxios2WithToken.get(
    `/brand/user-brands/${brandId}?audienceType=LOOKALIKE`,
  );
  return res.data;
};
export const GetAllAudienceLookalikegoogle = async ({
  brandid,
  workspaceid,
}: {
  brandid: any;
  workspaceid: any;
}) => {
  const res = await apiAxiosWithToken.get(`/audience/lookalike_audience`, {
    params: {
      workspaceId: workspaceid,
      brandId: brandid,
      platform: "GOOGLE",
    },
  });
  return res.data;
};

export const createRule = async (data: Object) => {
  const response = await apiAxios2WithToken.post(`/admanager-rule`, data);

  return response?.data;
};

export const updateRule = async (data: Object) => {
  const response = await apiAxios2WithToken.put(`/admanager-rule`, data);

  return response?.data;
};

export const getRuleById = async (ruleId: any, workspaceId: any) => {
  const response = await apiAxios2WithToken.get(
    `/admanager-rule/${ruleId}?workspaceId=${workspaceId}`,
  );

  return response?.data;
};

export const getAllRule = async (workspaceId: any) => {
  const response = await apiAxios2WithToken.get(
    `/admanager-rule/?workspaceId=${workspaceId}`,
  );

  return response?.data;
};

export const changeRuleStatus = async (args: any) => {
  const { workspaceId, data } = args;
  const response = await apiAxios2WithToken.post(
    `admanager-rule/rule-status-change?workspaceId=${workspaceId}`,
    data,
  );

  return response?.data;
};

export const deleteRuleById = async (ruleId: any, workspaceId: any) => {
  const response = await apiAxios2WithToken.delete(
    `admanager-rule/${ruleId}?workspaceId=${workspaceId}`,
  );

  return response?.data;
};

export const getPowerBIGraph = async (campaignId: any, workspaceId: any) => {
  const response = await apiAxiosWithToken.get(
    `power-bi/get-embed-info?campaignID=${campaignId}&workspace_id=${workspaceId}`,
  );

  return response?.data;
};

export const getPowerBIGraphWorkspaceLevel = async (workspaceId: any) => {
  const response = await apiAxiosWithToken.get(
    `power-bi/get-workspace-embed-info?workspace_id=${workspaceId}`,
  );

  return response?.data;
};

export const getRecomdationsData = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/recommendation/recommend`,
    data,
  );
  return response?.data;
};

export const updRecomdationsData = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/recommendation/recommend/update`,
    data,
  );
  return response?.data;
};

export const analyzeImageWithAI = async (category: string, signedUrl: string) => {
  const response = await apiAxiosModel.post(
    `nyx-ai-alison/v2/analyze/`,
    {},
    {
      params: {
        category,
        signed_url: signedUrl,
      },
    }
  );
  return response?.data;
};
