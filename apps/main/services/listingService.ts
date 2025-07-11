import { apiAxios, apiAxiosV2 } from "./apiHandler";

export const getListingService = async (id: string) => {
  const res = await apiAxios.get(`/tokens/get-primary-listing/${id}`);
  return res.data?.primary_listings;
};

export const researchPaperService = async () => {
  const response = await apiAxiosV2.get(`/research-paper`);
  return response?.data;
};

export const galleryService = async (data:any) => {
  const response = await apiAxiosV2.get(`/all-gallery?page=${data}&&limit=12`);
  return response?.data;
};

export const text2imageGalleryService = async () => {
  const response = await apiAxiosV2.get(`/all-gallery?type=TEXT_TO_IMAGE`);
  return response?.data;
};

export const image2imageGalleryService = async () => {
  const response = await apiAxiosV2.get(`/all-gallery?type=IMAGE_TO_IMAGE`);
  return response?.data;
};

export const script2videoGalleryService = async () => {
  const response = await apiAxiosV2.get(`/all-gallery?type=SCRIPT_TO_VIDEO`);
  return response?.data;
};

export const image2videoGalleryService = async () => {
  const response = await apiAxiosV2.get(`/all-gallery?type=IMAGE_TO_VIDEO`);
  return response?.data;
};
