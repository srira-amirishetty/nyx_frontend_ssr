/* eslint-disable @next/next/no-img-element */
"use client";
import Footer from "@nyx-frontend/main/components/Footer";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import ModalMain from "@nyx-frontend/main/components/Modal";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { useContext } from "react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { triggerModal } = useContext(UseContextData);
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

      {triggerModal.isOpen && <ModalMain></ModalMain>}
      <div className="justify-start flex w-full">
        <Sidebar />
        <section className="h-full w-[95%] overflow-y-auto flex">
          {children}
        </section>
      </div>
    </>
  );
}
