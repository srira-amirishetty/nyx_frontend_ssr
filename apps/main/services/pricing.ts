import { apiAxiosWithToken } from "./apiHandler";

export const createOrderServices = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/order/create-order-package`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const createOrderServicesPayU = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/order/create-package-order?paymentMethod=${process.env.NEXT_PUBLIC_PAYMENT_METHOD}`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const validateOrderServices = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/order/validate-payment-package`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const validateOrderServicesPayU = async (data: Object) => {
  const response = await apiAxiosWithToken.post(
    `/order/validate-package-payment`,
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const invoiceOrderId = async (orderId:number) => {
  const response = await apiAxiosWithToken.get(
    `invoice/getInvoicebyOrderId/${orderId}`,
    
   
  );
  return response.data;
};


