// import axios from "axios";
import { apiAxios2WithToken } from "./apiHandler";


// export const addImageProductService = async (data: Object) => {
//   axios.defaults.baseURL = `${process.env
//     .NEXT_PUBLIC_IMAGE2IMAGE_URL}/image2image`;
//   console.log(process.env.NEXT_PUBLIC_IMAGE2IMAGE_URL);
//   console.log(axios.defaults);
//   const response = await axios.post(
//     `/product-create`,
//     data,
//     {
//       headers: {
//         Authorization: localStorage.getItem("token")
//       }
//     }
//   );
//   return response.data;
// }

// export const addImageProductService = async (requestObject: Object) => {
//   const responseObject = await fetch(
//     `${process.env.NEXT_PUBLIC_IMAGE2IMAGE_URL}/image2image/product-create`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("token")
//       } as HeadersInit,
//       body: JSON.stringify(requestObject)
//     }
//   );
//   return responseObject;
// }

export const image2imageBaseURL = `${process.env.NEXT_PUBLIC_IMAGE2IMAGE_URL}/image2image`;


export const driveImage=async (wId: any) => {
    const res = await apiAxios2WithToken.get(`brand/get-media/${wId}?type=images`, {
      withCredentials: true,
    });
    return res?.data;
  };
