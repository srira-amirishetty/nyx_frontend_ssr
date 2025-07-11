import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import type { Metadata } from "next";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
/* eslint-disable @next/next/no-img-element */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body{
          background: linear-gradient(52.6deg, #650B92 0.83%, #1D5C9C 100.51%);
        }
      `}</style>
      {children}
    </>
  );
}
