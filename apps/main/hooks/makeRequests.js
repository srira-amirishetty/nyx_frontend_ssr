"use client"
import { useState, useContext } from "react";
import axios from "axios";
import { UseContextData } from "./usecontext";
import { MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";
import "react-toastify/dist/ReactToastify.css";

function useRequests() {
  const { setModal, setToastConfig, setShowError } = useContext(UseContextData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosRequest = async (method, url, data, loaderconfig, params) => {
    setIsLoading(true);
    setError(null);
    setModal({ ...loaderconfig });
    try {
      let headers = {
        Authorization: localStorage.getItem("token"),
      };
      const result = await axios({
        method,
        url,
        params,
        data,
        headers: headers,
        withCredentials: true,
      });

      return {
        response: "Success",
        status: result.status,
        error: null,
        data: result.data,
      };
    } catch (error) {
      // setToastConfig({
      //   message: error.message.includes("Network")
      //     ? error.message
      //     : error.response.data.errors.message,
      //   color: "bg-red-500",
      //   flag: true,
      // });
      let message = error?.message.includes("Network")
        ? error?.message
        : error?.response?.data?.errors?.message
        ? error.response.data.errors.message
        : error.response.data.message;
      setShowError(`${message}`)
      return {
        response: "Failed",
        status: error.response?.status,
        error: message,
        data: error.response?.data,
      };
    } finally {
      setIsLoading(false);
      setModal(MODAL_RESET);
    }
  };
  const get = (url, loaderconfig) =>
    axiosRequest("get", url, null, loaderconfig);
  const getWithParams = (url, loaderconfig, params) =>
    axiosRequest("get", url, null, loaderconfig, params);
  const post = (url, data, loaderconfig) =>
    axiosRequest("post", url, data, loaderconfig, null);
  const put = (url, data, loaderconfig) =>
    axiosRequest("put", url, data, loaderconfig, null);
  const del = (url, data, loaderconfig) =>
    axiosRequest("delete", url, data, loaderconfig, null);

  return { get, post, put, del, getWithParams, error, isLoading };
}

export default useRequests;
