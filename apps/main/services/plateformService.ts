import {
  apiAxiosCommonWithToken,
  apiAxiosV2,
  apiAxiosWithToken,
  apiAxios2WithToken,
} from "./apiHandler";
import {
  LINKEDIN,
  GOOGLE_AD,
  META_AD,
  SHOPIFY_AD,
  CLEVERTAP_AD,
  MOENGAGE_AD,
  BRANCH_AD,
  ADS,
  DELETE,
  GETGMCACCOUNTS,
  CHECKGMC,
  MCLINKED,
  DEFAULT,
  GA_ad,
} from "./apis";

export const AdService = async (data: object) => {
  const res = await apiAxiosWithToken.get(`${ADS}${data}`);
  return res.data;
};

export const GoogleAdService = async (data: object) => {
  const res = await apiAxiosWithToken.post(GOOGLE_AD, data);
  return res.data;
};
export const LinkedInService = async (data: object) => {
  const res = await apiAxiosWithToken.post(LINKEDIN, data);
  return res.data;
};
export const MetaService = async (data: object) => {
  const res = await apiAxiosWithToken.post(META_AD, data);
  return res.data;
};
export const ShopifyService = async (data: object) => {
  const res = await apiAxiosWithToken.post(SHOPIFY_AD, data);
  return res.data;
};

export const CleverTapService = async (data: object) => {
  const res = await apiAxiosWithToken.post(CLEVERTAP_AD, data);
  return res.data;
};

export const MoengageService = async (data: object) => {
  const res = await apiAxiosWithToken.post(MOENGAGE_AD, data);
  return res.data;
};

export const BranchService = async (data: object) => {
  const res = await apiAxiosWithToken.post(BRANCH_AD, data);
  return res.data;
};


export const GAService = async (data: object) => {
  const res = await apiAxiosWithToken.post(GA_ad, data);
  return res.data;
};

export const DeleteService = async (data: object) => {
  const res = await apiAxiosWithToken.post(`${DELETE}`, data);
};

export const Brandmapping = async (data: object) => {
  const res = await apiAxios2WithToken.put(
    `admanager/account-brand-mapping`,
    data,
  );
  return res.data;
};

export const GmcAccounts = async (data: object) => {
  const res = await apiAxios2WithToken.post(GETGMCACCOUNTS, data);
  return res.data;
};

export const McLinking = async (data: object) => {
  const res = await apiAxios2WithToken.post(MCLINKED, data);
  return res.data;
};

export const CheckGmc = async (data: object) => {
  const res = await apiAxios2WithToken.post(CHECKGMC, data);
  return res.data;
};

export const Default = async (data: any) => {
  const storage = Number(localStorage.getItem("workspace_id"));
  const res = await apiAxios2WithToken.put(DEFAULT, data);
  return res.data;
};
