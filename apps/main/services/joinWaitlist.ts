import axios from "axios";
import { apiAxiosV2 } from "./apiHandler";

export const joinWaitlist = async (data: Object) => {
  const response = await apiAxiosV2.post(
    `/notification/subscribe`,
    data,
  );
  return response.data;
};

export const demoServices = async (data: Object) => {
  const response = await apiAxiosV2.post(
    `/request-demo`,
    data,
  );
  return response.data;
};

export const feedbackServices = async (data: Object) => {
  const response = await apiAxiosV2.post(
    `/feedback/submit`,
    data,
  );
  return response.data;
};

export const ContactUsServices = async (data: object) => {
  const res = await apiAxiosV2.post(`/support/contact-us`,
    data,
  );
  return res.data;
};