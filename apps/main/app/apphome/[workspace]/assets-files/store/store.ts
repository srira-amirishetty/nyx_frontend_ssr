import { create } from "zustand";

type Search = {
  search: string;
  setSearch: (item: string) => void;
};

type Expand = {
  expand: boolean;
  setExpand: (item: boolean) => void;
};

export const useSearch = create<Search>((set) => ({
  search: "",
  setSearch: (item) => set(() => ({ search: item })),
}));

export const useExpand = create<Expand>((set) => ({
  expand: false,
  setExpand: (item) => set(() => ({ expand: !item })),
}));
