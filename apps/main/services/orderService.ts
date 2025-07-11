import {apiAxios} from "./apiHandler";

import { PROCESS_CHECKOUT, VALIDATE_PAYMENT } from "@nyx-frontend/main/utils/utils";

export const processCheckout = async (data: Object) => {
  const res = await apiAxios.post(PROCESS_CHECKOUT, data, {
    headers: {
      
      Authorization: localStorage.getItem("token"),
    },
    withCredentials: true
  });
  return res.data;
};

export const validatePayment = async (data: Object) => {
  const res = await apiAxios.post(VALIDATE_PAYMENT, data, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return res.data;
};