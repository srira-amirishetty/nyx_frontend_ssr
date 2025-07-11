/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: " LyricGenius Generate",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
