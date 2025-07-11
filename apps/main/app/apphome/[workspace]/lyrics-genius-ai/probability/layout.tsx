import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import Image from "next/image";
/* eslint-disable @next/next/no-img-element */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body{
          background: linear-gradient(52.6deg, #650B92 0.83%, #1D5C9C 100.51%);
        }
      `}</style>

      <Image
        src={`${IMAGE_URL}/assets/nyx_background.png`}
        width={100}
        height={100}
        sizes="(width: full) (height: full)"
        className="object-cover fixed -z-10 inset-0 w-full h-full"
        alt="bg_auto"
      />
      {children}
    </>
  );
}
