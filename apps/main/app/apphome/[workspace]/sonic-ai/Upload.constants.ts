import { TUpload,TUpload2 } from "./Upload.types";

export const defaultUploadState: TUpload = {
  active: null,
  ORIGINAL: {
    uploaded: false,
    data: null,
    isLoading: false,
    filename: null,
  },
  REFERENCE: {
    uploaded: false,
    data: null,
    isLoading: false,
    filename: null,
  },
};

export const defaultUploadState2: TUpload2 = {
  active: null,
  ORIGINAL: {
    uploaded: false,
    data: null,
    isLoading: false,
    filename: null,
  },
  REFERENCE: {
    uploaded: false,
    data: null,
    isLoading: false,
    filename: null,
  },
  REFERENCE_TWO: {
    uploaded: false,
    data: null,
    isLoading: false,
    filename: null,
  },
  REFERENCE_THREE: {
    uploaded: false,
    data: null,
    isLoading: false,
    filename: null,
  },
};