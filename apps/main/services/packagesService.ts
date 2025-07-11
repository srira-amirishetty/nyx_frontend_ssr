import {apiAxios} from "./apiHandler";

export const getPackagesService = async () => {
    const res = await apiAxios.get(`/artists/get-packages`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    return res?.data;
}

export const getToeknService = async (id: string | string[]) => {
  const res = await apiAxios.get(`/tokens/get-tokens/${id}`, {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  });
  return res.data;
}