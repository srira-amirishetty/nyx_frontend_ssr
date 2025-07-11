import { create } from "zustand";
import { devtools } from "zustand/middleware";

type EditorStyle = {
  activeCanvas: any;
  setActiveCanvas: (activeCanvas: any) => void;
  mainCanvas: any;
  setMainCanvas: (canvas: any) => void;
};

export const useEditorStyle = create<EditorStyle>()(
  devtools(
    (set) => ({
      activeCanvas: {},
      setActiveCanvas: (activeCanvas) => {
        set(() => ({
          activeCanvas,
        }));
      },
      mainCanvas: {},
      setMainCanvas: (mainCanvas) => {
        set(() => ({
          mainCanvas,
        }));
      }
    }),
    { enabled: process.env.NODE_ENV === "development" }
  )
);
