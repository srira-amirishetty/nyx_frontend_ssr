import { apiAxiosWithToken } from "./apiHandler";
import axios from "axios";

export const getUploadedQuestionsService = async (processId: string | null) => {
  const res = await apiAxiosWithToken.get(
    `/artists/get-launch-questions?formId=1&processId=${processId}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const getUploadedQuestionsServiceLyrics = async (
  processId: string | null,
) => {
  const res = await apiAxiosWithToken.get(
    `/artists/get-launch-questions?formId=2&processId=${processId}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
export const getUserProfileData = async () => {
  const res = await apiAxiosWithToken.get(`/artists/get-profile`, {
    withCredentials: true,
  });
  return res.data;
};

export const postQuestionSelectService = async (data: Object) => {
  const res = await apiAxiosWithToken.post(
    `/artists/answer-launch-questions`,
    data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const postUploadFileService = async (data: FormData, callback?: any) => {
  const res = await apiAxiosWithToken.post("/artists/upload-token", data, {
    withCredentials: true,
  });
  return res.data;
};

export const postUploadDriveFileService = async (
  data: Object,
  callback?: any,
) => {
  const res = await apiAxiosWithToken.post(
    "/artists/upload-token-profile",
    data,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const postLyrics = async (data: FormData, callback?: any) => {
  const response = await apiAxiosWithToken.post(
    "/artists/upload-lyrics",
    data,
    {
      withCredentials: true,
    },
  );

  // Handle the response data as needed
  return response.data;
};

export const AI_Lyrics_Generator = async (data: FormData, callback?: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_AI_URL}/generate-lyrics`,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    },
  );

  // Handle the response data as needed
  return response.data;
};

export const masteringService = async (data: Object, callback?: any) => {
  const res = await apiAxiosWithToken.post(`/artists/token-mastering`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const saveReport = async (data: Object, callback?: any) => {
  const response = await apiAxiosWithToken.post(
    "/artists/token-report-operations",
    data,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const saveNotePad = async (data: Object, callback?: any) => {
  const res = await apiAxiosWithToken.post(`/artists/notepad-handler`, data, {
    withCredentials: true,
  });

  return res.data;
};

export const songStructure = async (data: Object, callback?: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AI_URL}/song-struct`,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    },
  );
  return res.data;
};

export const relatedWords = async (data: Object, callback?: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_AI_URL}/related-words`,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    },
  );

  // Handle the response data as needed
  return response.data;
};

export const getClosestSong = async (data: Object, callback?: any) => {
  const res = await apiAxiosWithToken.post(`/artists/compare-lyrics`, data, {
    withCredentials: true,
  });

  return res.data;
};

export interface SaveReportPayload {
  type: string;
  uploadId: number;
  reportName: string;
}

export interface SaveReportResponse {
  message: string;
}

export const saveReport2 = async (
  payload: SaveReportPayload,
): Promise<SaveReportResponse> => {
  const response = await fetch("/artists/save-notepad", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Save failed");
  }

  return response.json();
};

export const getAnalysisService = async (id: string, workspace_id: any) => {
  const res = await apiAxiosWithToken.get(
    "artists/get-upload-token-status?id=" +
      id +
      "&workspace_id=" +
      workspace_id,
    {},
  );
  return res.data;
};

export const getAnalysisCompareService = async (
  id: string,
  workspace_id: any,
) => {
  const res = await apiAxiosWithToken.get(
    "artists/get-analyze-token-status?id=" +
      id +
      "&workspace_id=" +
      workspace_id,
    {},
  );
  return res.data;
};

export const getLyricsAnalysisService = async (id: string) => {
  const res = await apiAxiosWithToken.get(
    "artists/get-upload-lyrics-status?id=" + id,
    {},
  );
  return res.data;
};

export const getNotepads = async () => {
  const res = await apiAxiosWithToken.get("/artists/get-notepads", {});
  return res.data;
};

export const driveUploadService = async (workspace_id: any) => {
  const res = await apiAxiosWithToken.get(
    `/artists/fetch-files/${workspace_id}`,
    {},
  );
  return res?.data;
};

export const sentimentalAnalysesService = async (
  data: Object,
  callback?: any,
) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AI_URL}/sentiment-analyze`,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    },
  );

  return res.data;
};

export const customeMasteringServices = async (data: Object) => {
  const res = await apiAxiosWithToken.post(`/artists/custom-mastering`, data, {
    withCredentials: true,
  });
  return res.data;
};
