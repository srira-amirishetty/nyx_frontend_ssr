/* eslint-disable @next/next/no-img-element */
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import Footer from "@nyx-frontend/main/components/Footer";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
          body{
            background: linear-gradient(52.6deg, #650B92 0.83%, #1D5C9C 100.51%);
          }
        `}</style>
      <img
        src={`${IMAGE_URL}/assets/nyx_background.png`}
        alt="bg_auto"
        className="object-cover fixed -z-10 inset-0 w-full h-full"
      />
      <div className="justify-start flex w-full">
        <Sidebar />
        <section className="h-full overflow-y-auto flex-1">
          {children}
          <Footer />
        </section>
      </div>
    </>
  );
}
