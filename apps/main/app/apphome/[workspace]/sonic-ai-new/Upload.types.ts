export type TData = File | null;
export type TActive = "ORIGINAL" | "REFERENCE" | null;
export type TActive2 = "ORIGINAL" | "REFERENCE" | "REFERENCE_TWO" | "REFERENCE_THREE" | "REFERENCE_FOUR" |null;

export type TUpload = {
  active: TActive;
  ORIGINAL: {
    uploaded: boolean;
    data: TData;
    isLoading: boolean;
    filename: string | null;
  };
  REFERENCE: {
    uploaded: boolean;
    data: TData;
    isLoading: boolean;
    filename: string | null;
  };
};

export type TUpload2 = {
  active: TActive2;
  ORIGINAL: {
    uploaded: boolean;
    data: TData;
    isLoading: boolean;
    filename: string | null;
  };
  REFERENCE: {
    uploaded: boolean;
    data: TData;
    isLoading: boolean;
    filename: string | null;
  };
  REFERENCE_TWO: {
    uploaded: boolean;
    data: TData;
    isLoading: boolean;
    filename: string | null;
  };
  REFERENCE_THREE: {
    uploaded: boolean;
    data: TData;
    isLoading: boolean;
    filename: string | null;
  };
  REFERENCE_FOUR: {
    uploaded: boolean;
    data: TData;
    isLoading: boolean;
    filename: string | null;
  };
};