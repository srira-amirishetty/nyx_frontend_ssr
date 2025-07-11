import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { nanoid } from "nanoid";

type TextToImageType = {
  id: string;
  image: string | null;
  other: any;
  like: number;
  downloadClicked: boolean;
  saveClicked: boolean;
  isLoading: boolean;
  isError: boolean;
};

type TextToImagesType = Array<TextToImageType>;

type ImageUrls = {
  imageUrl: {
    [key: string]: Array<TextToImagesType>;
  };
  resetImageUrl: () => void;
  setImageUrl: (attr: {
    tabId: string;
    index: number;
    subIndex: number;
    image: string;
    other: any;
    isLoading: boolean;
    isError: boolean;
  }) => void;
  setLoading: (attr: {
    tabId: string;
    index: number;
    subIndex: number;
    isLoading: boolean;
    isError: boolean;
  }) => void;
  setError: (attr: {
    tabId: string;
    index: number;
    subIndex: number;
    isLoading: boolean;
    isError: boolean;
  }) => void;
  // Single Handler
  setDisLike: (attr: {
    tabId: string;
    index: number;
    subIndex: number;
  }) => void;
  setLike: (attr: { tabId: string; index: number; subIndex: number }) => void;
  setDownload: (attr: {
    tabId: string;
    index: number;
    subIndex: number;
    downloadClicked: boolean;
  }) => void;
  setSaved: (attr: {
    tabId: string;
    index: number;
    subIndex: number;
    saveClicked: boolean;
  }) => void;
};

export const useImageUrls = create<ImageUrls>()(
  devtools((set) => ({
    imageUrl: {},
    resetImageUrl: () => {
      set({ imageUrl: {} });
    },
    setImageUrl: (attr) => {
      set((state: any) => {
        const activeTabArray = state.imageUrl[`${attr.tabId}`] || [];

        const defaultValue:any = {
          id: nanoid(),
          image: null,
          other: {},
          like: 0,
          downloadClicked: false,
          saveClicked: false,
          isError: false,
          isLoading: false,
        }

        if (!activeTabArray?.[attr.index]) {
          activeTabArray[attr.index] = [];
        }

        if (!activeTabArray?.[attr.index]?.[attr.subIndex]) {
          activeTabArray[attr.index][attr.subIndex] = defaultValue
        }

        activeTabArray[attr.index][attr.subIndex] = {
          ...activeTabArray[attr.index][attr.subIndex],
          image: attr.image,
          isError: attr.isError,
          isLoading: attr.isLoading,
          other: attr.other,
        };

        return {
          ...state,
          imageUrl: {
            ...state.imageUrl,
            [`${attr.tabId}`]: activeTabArray,
          },
        };
      });
    },
    setLoading: (attr) => {
      set((state: any) => {
        const activeTabArray = state.imageUrl[`${attr.tabId}`] || [];

        const defaultValue:any = {
          id: nanoid(),
          image: null,
          other: {},
          like: 0,
          downloadClicked: false,
          saveClicked: false,
          isError: attr.isError,
          isLoading: attr.isLoading,
        }

        if (!activeTabArray?.[attr.index]) {
          activeTabArray[attr.index] = [];
        }

        if (!activeTabArray?.[attr.index]?.[attr.subIndex]) {
          activeTabArray[attr.index][attr.subIndex] = defaultValue
        }

        activeTabArray[attr.index][attr.subIndex] = {
          ...activeTabArray[attr.index][attr.subIndex],
          isError: attr.isError,
          isLoading: attr.isLoading,
        };

        return {
          ...state,
          imageUrl: {
            ...state.imageUrl,
            [`${attr.tabId}`]: activeTabArray,
          },
        };
      });
    },
    setError: (attr) => {
      set((state: any) => {
        const activeTabArray = state.imageUrl[`${attr.tabId}`] || [];

        const defaultValue:any = {
          id: nanoid(),
          image: null,
          other: {},
          like: 0,
          downloadClicked: false,
          saveClicked: false,
          isError: attr.isError,
          isLoading: attr.isLoading,
        }

        if (!activeTabArray?.[attr.index]) {
          activeTabArray[attr.index] = [];
        }

        if (!activeTabArray?.[attr.index]?.[attr.subIndex]) {
          activeTabArray[attr.index][attr.subIndex] = defaultValue
        }

        activeTabArray[attr.index][attr.subIndex] = {
          ...activeTabArray[attr.index][attr.subIndex],
          isError: attr.isError,
          isLoading: attr.isLoading,
        };

        return {
          ...state,
          imageUrl: {
            ...state.imageUrl,
            [`${attr.tabId}`]: activeTabArray,
          },
        };
      });
    },
    setDisLike: (attr) => {
      set((state: any) => {
        const activeTabArray = state.imageUrl[`${attr.tabId}`];

        activeTabArray[attr.index][attr.subIndex] = {
          ...activeTabArray[attr.index][attr.subIndex],
          isError: false,
          isLoading: false,
          like: 2,
        };

        return {
          ...state,
          imageUrl: {
            ...state.imageUrl,
            [`${attr.tabId}`]: activeTabArray,
          },
        };
      });
    },
    setLike: (attr) => {
      set((state: any) => {
        const activeTabArray = state.imageUrl[`${attr.tabId}`];

        activeTabArray[attr.index][attr.subIndex] = {
          ...activeTabArray[attr.index][attr.subIndex],
          isError: false,
          isLoading: false,
          like: 1,
        };

        return {
          ...state,
          imageUrl: {
            ...state.imageUrl,
            [`${attr.tabId}`]: activeTabArray,
          },
        };
      });
    },
    setDownload: (attr) => {
      set((state: any) => {
        const activeTabArray = state.imageUrl[`${attr.tabId}`];

        activeTabArray[attr.index][attr.subIndex] = {
          ...activeTabArray[attr.index][attr.subIndex],
          isError: false,
          isLoading: false,
          downloadClicked: attr.downloadClicked,
        };

        return {
          ...state,
          imageUrl: {
            ...state.imageUrl,
            [`${attr.tabId}`]: activeTabArray,
          },
        };
      });
    },
    setSaved: (attr) => {
      set((state: any) => {
        const activeTabArray = state.imageUrl[`${attr.tabId}`];

        activeTabArray[attr.index][attr.subIndex] = {
          ...activeTabArray[attr.index][attr.subIndex],
          isError: false,
          isLoading: false,
          saveClicked: attr.saveClicked,
        };

        return {
          ...state,
          imageUrl: {
            ...state.imageUrl,
            [`${attr.tabId}`]: activeTabArray,
          },
        };
      });
    },
  })),
);

type ImageActive = {
  imageActive: number;
  setImageActive: (index: number) => void;
};

export const useImageActive = create<ImageActive>((set) => ({
  imageActive: -1,
  setImageActive: (index) => set(() => ({ imageActive: index })),
}));

type ImageTabActive = {
  imageTabActive: string;
  setImageTabActive: (id: string) => void;
};

export const useImageTabActive = create<ImageTabActive>((set) => ({
  imageTabActive: "",
  setImageTabActive: (id) => set(() => ({ imageTabActive: id })),
}));
