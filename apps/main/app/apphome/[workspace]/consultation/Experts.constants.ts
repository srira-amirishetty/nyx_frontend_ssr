import { TList } from "./Experts.types";

export const sortList: Array<TList> = [
  { label: "Arrange Random", value: "random" },
  { label: "Arrange by Last Online", value: "last_online" },
  { label: "Arrange by Lower price", value: "price_desc" },
  { label: "Arrange by Higher price", value: "price_asc" },
  {
    label: "Arrange by Lower Experience",
    value: "exp_desc",
  },
  {
    label: "Arrange by Higher Experience",
    value: "exp_asc",
  },
] as const;

export const categories: Array<TList> = [
  { value: "lyrics-writer", label: "Lyrics Writer" },
  { value: "music-composer", label: "Music Composer" },
  { value: "singer", label: "Singer" },
] as const;


