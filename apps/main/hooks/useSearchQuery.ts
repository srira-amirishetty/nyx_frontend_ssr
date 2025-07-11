"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function useSearchQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const createQueryArrayString = useCallback(
    (name: string, value: Array<string>) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);
      value.forEach(v => {
        params.append(name, v);
      })
      return params.toString();
    },
    [searchParams]
  );

  const updateSearch = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value));
  };

  const updateSearchArray = (name: string, value: Array<string>) => {
    router.push(pathname + "?" + createQueryArrayString(name, value));
  };

  return { updateSearch, updateSearchArray };
}
