import { create } from "zustand";

type CounterState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

export const useUserStore = create<CounterState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (val) => set({ isLoggedIn: val }),
}));
type TextvalueReserve = {
  textvalue: string;
  settextvalue: (val: string) => void;
};

export const textreserve = create<TextvalueReserve>((set) => ({
  textvalue: "",
  settextvalue: (val) => set({ textvalue: val }),
}));
type TextvalueSectionReserve = {
  textsectionvalue: string;
  settextsectionvalue: (val: string) => void;
};

export const textsectionreserve = create<TextvalueSectionReserve>((set) => ({
  textsectionvalue: "",
  settextsectionvalue: (val) => set({ textsectionvalue: val }),
}));
