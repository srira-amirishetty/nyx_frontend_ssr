import axios from "axios";
import { apiAxios, apiAxiosV2, apiAxiosModel } from "./apiHandler";

export const diffusionServices = async (data: Object) => {
  const response = await apiAxiosModel.post(
    `/text-to-image-model/v1/nyx-diffusion-maharashtra`,
    data,
  );
  return response.data;
};
export const BgRemoveModelServices = async (data: FormData) => {
  const response = await apiAxiosModel.post(
    `/background-remove-model/v1/bg-remove`,
    data,
  );
  return response.data;
};
export const InPaintingModelServices = async (data: FormData) => {
  const response = await axios.post(
    `https://nyx-ai-test.nyx.today/nyx-gen-fill/v1/edit-image/`,
    data,
  );
  return response.data;
};
export const InPaintingTaskId = async (data: Object) => {
  const response = await axios.get(
    `https://nyx-ai-test.nyx.today/nyx-gen-fill/v1/task/${data}`,
    data,
  );
  return response.data;
};

export const bgRemoveServices = async (data: FormData, options: any = {}) => {
  try {
    const response = await apiAxiosModel.post(
      "/background-remove-model/v1/bg-remove",
      data,
      options
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const BgRemoveModelServices2 = async (data: Object) => {
  const response = await apiAxiosModel.get(
    `/background-remove-model/v1/bg-remove/generation-status/${data}`,
  );
  return response.data;
};

export const allmodelcards = async () => {
  const response = await apiAxiosV2.get(`/all-ai-models`);
  return response.data;
};

export const Image2imagemodelcards = async () => {
  const response = await apiAxiosV2.get(`/all-ai-models?type=IMAGE_TO_IMAGE`);
  return response.data;
};

export const Text2imagemodelcards = async () => {
  const response = await apiAxiosV2.get(`/all-ai-models?type=TEXT_TO_IMAGE`);
  return response.data;
};

export const Predictioncards = async () => {
  const response = await apiAxiosV2.get(`/all-ai-models?type=PREDICTION`);
  return response.data;
};

export const likelihoodService = async (data: FormData) => {
  const response = await apiAxiosModel.post(
    `/background-remove-model/v1/image-likelihood`,
    data,
  );
  return response.data;
};

export const getModelPlayGround = async (modelName: any) => {
  const response = await apiAxiosV2.get(`/ai-model/${modelName}`);
  return response.data;
};

export const videoLikelihoodService = async (data: FormData) => {
  const response = await apiAxiosModel.post(
    `/video-likelihood-model/v1/video-likelihood`,
    data,
  );
  return response.data;
};
