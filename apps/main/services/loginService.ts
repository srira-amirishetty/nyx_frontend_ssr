import { verifyJWTToken } from "@nyx-frontend/main/utils/utils";
import { apiAxios,apiAxiosV2,apiAxiosWithToken,apiAxios2WithToken , apiAxiosCommon,apiAxiosCommonWithToken} from "./apiHandler";
import { SIGNIN_USER,SIGNIN_PHONE,SIGNIN_EMAIL ,SEND_OTP,VERIFY_OTP,RESET_PASSWORD,SIGNUP,GOOGLE_LOGIN,EDIT_PROFILE,EDIT_PHONE,FEEDBACK,UPDATE_PASSWORD,EDIT_PROFILE_PICTURE,SEND_EMAIL_FOR_VERIFICATION} from "./apis";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_APT_URL_V2;

if (url === undefined) {
  throw Error("error environment variable not defined");
}


export const VerifyOTP = async (data: any) => {
  const res = await axios.post("/artists/signin-phone-password", data);
  return res.data;
};

export const loginService = async (url: string, data: object) => {
  const res = await apiAxios.post(url, data);
  return res.data;
};

export const getProfileService = async () => {
  const token = localStorage.getItem("token");
  const details = verifyJWTToken(token);
  const isUser = details.data.type === "user";
  const type = isUser ? "/users" : "/artists";
  const key = isUser ? "userProfile" : "artistProfile";
  const res = await apiAxios.get(`${type}/get-profile`, {
    headers: {
      Authorization: token,
    },
  });

  return res.data[key];
};

export const GetOTPService = async (data: Object) => {
  const res = await apiAxiosV2.post(SEND_OTP,data,
    { withCredentials: true },
  );
  return res.data;
};

export const SetPasswordService = async (data: Object) => {
  const res = await apiAxiosV2.post(RESET_PASSWORD,
    data,
    { withCredentials: true },
  );
  return res.data;
};

export const VerifyOTPService = async (data: Object) => {
  const res = await apiAxiosV2.post(VERIFY_OTP,data,
    { withCredentials: true },
  );
  return res.data;
};

export const Recordsignup = async (data: Object) => {
  const res = await apiAxiosV2.post(SIGNUP,data,
    { withCredentials: true },
  );
  return res.data;
};

export const getNewLogin = async (data: Object) => {
  const res = await apiAxiosV2.post(SIGNIN_PHONE,data,
    { withCredentials: true },
  );
  return res.data;
};

export const getNewLoginEmail = async (data: Object) => {
  const res = await apiAxiosV2.post(SIGNIN_EMAIL,data
  );
  return res.data;
};

export const getNewLoginUser = async (data: Object) => {
  const res = await apiAxiosV2.post(SIGNIN_USER,data
  );
  return res.data;
};

export const getNewLoginGoogle = async (data: object) => {
  const res = await apiAxiosV2.post(GOOGLE_LOGIN, data,{
    withCredentials: true,
  });
  return res.data;
};
export const sendEmailVerification = async (data: object) => {
  const res = await apiAxios2WithToken.post(`/auth/send-verification-email`, data,{
    withCredentials: true,
  });
  return res.data;
};
export const continueEmailVerification = async (data:any) => {
  const res = await apiAxios2WithToken.get(`/auth/verify-email?token=${data}`,{
    withCredentials: true,
  });
  return res.data;
};

export const UpdateUserProfileDetails = async (data: object) => {
  const res = await apiAxiosWithToken.post(EDIT_PROFILE,data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
export const UpdateUserPhoneDetails = async (data: object) => {
  const res = await apiAxiosWithToken.post(EDIT_PHONE,data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
export const UpdatePassword = async (data: object) => {
  const res = await apiAxios2WithToken.put(UPDATE_PASSWORD,data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
export const feedback = async (data: object) => {
  const res = await apiAxios2WithToken.post(FEEDBACK,data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const profilePictureUpdate = async (data: FormData) => {
  const response = await apiAxiosWithToken.post(EDIT_PROFILE_PICTURE,data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const updateProfilePicUrl = async (data: Object) => {
  const response = await apiAxiosWithToken.post(EDIT_PROFILE,data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};
