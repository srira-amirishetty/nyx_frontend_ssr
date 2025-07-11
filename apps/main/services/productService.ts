import {apiAxios} from "./apiHandler";

export const getPackagesService = async () => {
    const res = await apiAxios.get(`/artists/get-packages`);
    return res?.data;
}

export const getPackagesServiceSSR = async () => {
  const res = await apiAxios.get(`/artists/get-packages`);
  return res?.data?.nyx_packages;
}

export const getTokenService = async (id: string | string[]) => {
  const res = await apiAxios.get(`/tokens/get-tokens/${id}`, {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  });
  return res.data;
}