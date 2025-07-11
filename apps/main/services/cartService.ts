import { apiAxios } from "./apiHandler";

import { ADD_TO_CART, GET_SHOPPING_CART } from "@nyx-frontend/main/utils/utils";

export const addToCartService = async (data: Object) => {
  const res = await apiAxios.post(ADD_TO_CART, data, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    withCredentials: true,
  });
  return res.data;
};

export const getCartService = async () => {
  const res = await apiAxios.get(GET_SHOPPING_CART, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    withCredentials: true,
  });
  return res.data;
};
