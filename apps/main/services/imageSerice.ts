import { apiAxiosWithToken } from "./apiHandler";

export const addBrandServices = async (data: FormData) => {
  const res = await apiAxiosWithToken.post("/brand/add-brand", data, {
    withCredentials: true,
  });
  return res.data;
};

export const addProductServices = async (data: FormData) => {
  const res = await apiAxiosWithToken.post("/brand/add-product", data, {
    withCredentials: true,
  });
  return res.data;
};

export const getbrandService = async () => {
  const res = await apiAxiosWithToken.get(`/brand/user-brands`, {});
  return res?.data;
};
export const getProductServices = async (brandId: any) => {
  const res = await apiAxiosWithToken.get(
    `brand/products-by-brand/${brandId}`,
    {},
  );
  return res?.data;
};

export const uploadImageFromSystemServices = async (data: FormData) => {
  const res = await apiAxiosWithToken.post("/brand/upload-banner-cloud", data, {
    withCredentials: true,
  });
  return res.data;
};

export const getDriveImageService = async () => {
  const res = await apiAxiosWithToken.get(`/brand/get-banners-cloud`, {});
  return res?.data;
};

export const uploadImageFromProfileServices = async (data: Object) => {
  const res = await apiAxiosWithToken.post(
    `/brand/upload-banner-profile`,
    data,
    {
      withCredentials: true,
    },
  );

  return res.data;
};

export const generateImageServices = async (data: Object) => {
  const res = await apiAxiosWithToken.post(`/brand/generate-images`, data, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    withCredentials: true,
  });

  return res.data;
};

export const getProductBrandServices = async (brandId: any, productId: any) => {
  const res = await apiAxiosWithToken.get(
    `brand/products-by-brand/${brandId}/product/${productId}`,
  );
  return res?.data;
};

export const generatepromptServices = async (data: Object, callback?: any) => {
  const res = await apiAxiosWithToken.post(`/brand/prompt-suggestions`, data, {
    withCredentials: true,
  });

  return res.data;
};
