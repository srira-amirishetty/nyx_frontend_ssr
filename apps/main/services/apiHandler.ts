import axios from "axios";
import { useRouter } from "next/navigation";

const baseURL = "https://api.nyx.today";

export const get = (endpoint: string) => {
  return axios.get(baseURL + endpoint);
};

export const post = (endpoint: string, data: Object) => {
  return axios.post(baseURL + endpoint, data);
};

/**
 * BASE URL for APIs
 * @example
 * https://api.nyx.today
 *
 * @type {string}
 * @returns String of PATH
 */
export const BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL || "https://api.nyx.today";

export const BASE_URL_V2: string = process.env.NEXT_PUBLIC_APT_URL_V2 as string;
export const BASE_URL_COMMON: string = process.env.NEXT_PUBLIC_API_URL_COMMON as string;

export const BASE_URL_V3: string = process.env.NEXT_PUBLIC_APT_URL_V3 as string;
export const BASE_URL_V4: string = process.env.NEXT_PUBLIC_TEXT2VIDEO_URL_NEW as string;
export const BASE_URL_MODEL: string = process.env
  .NEXT_PUBLIC_MODEL_AI_URL as string;

/**
 * Axios Instance for Whole application
 *
 * @type {Function}
 * @returns {Promise} Axios Instance as Promise Function
 */
export const apiAxios = axios.create({
  baseURL: BASE_URL,
});
export const apiAxiosCommon = axios.create({
  baseURL: BASE_URL_COMMON,
});

export const apiAxiosModel = axios.create({
  baseURL: BASE_URL_MODEL,
});

/**
 * Axios Instance for Whole application with Token
 * - Client Side Only
 * - BASE: `process.env.NEXT_PUBLIC_API_URL`
 *
 * @type {Function}
 * @returns {Promise} Axios Instance as Promise Function
 */
export const apiAxiosWithToken = axios.create({
  baseURL: BASE_URL,
});
export const apiAxiosCommonWithToken = axios.create({
  baseURL: BASE_URL_COMMON,
});

apiAxiosWithToken.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

apiAxiosCommonWithToken.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

/**
 * Axios Instance for Whole application with Token for
 * - Client Side Only
 * - BASE: `process.env.NEXT_PUBLIC_APT_URL_V2`
 *
 * @type {Function}
 * @returns {Promise} Axios Instance as Promise Function
 */
export const apiAxiosV2 = axios.create({
  baseURL: BASE_URL_V2,
});

export const apiAxios2WithToken = axios.create({
  baseURL: BASE_URL_V2,
});

apiAxios2WithToken.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export const apiAxiosV3 = axios.create({
  baseURL: BASE_URL_V3,
});

export const apiAxios3WithToken = axios.create({
  baseURL: BASE_URL_V3,
});

apiAxios3WithToken.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

apiAxiosWithToken.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);
apiAxiosCommonWithToken.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

apiAxios2WithToken.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);

apiAxios3WithToken.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);