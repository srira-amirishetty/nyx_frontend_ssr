/* eslint-disable @next/next/no-img-element */
import Footer from "@nyx-frontend/main/components/footer_home_new";
import Header from "@nyx-frontend/main/components/header_home_new";
import "./index.css";
import Image from "next/image";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";

export default function Error() {
  return (
    <>
      <Header />
      {/* #130625 #5227BB */}
      <div className=" h-screen flex justify-center items-center errorpage">
        <div className="flex flex-col items-center mx-2 text-white">
          <div className="">
            <Image
              src={`${IMAGE_URL}/assets/images/home/404nyx.svg`}
              width={159}
              height={159}
              alt="404"
            />
          </div>
          <div className="text-[42px] max-md:text-[32px] text-center font-bold max-md:block  flex justify-center mt-4 md:mt-10">
            <div>404 </div>
            <div className="max-md:hidden mx-2"> -</div>
            <div> PAGE NOT FOUND</div>
          </div>
          <div className="w-full sm:w-11/12 md:w-9/12 lg:w-1/2 font-thin text-center mt-4">
            The page you are looking for might have been removed, had its name
            changed or temporarily unavailable.{" "}
            <span className="max-xl:hidden">
              You didn&apos;t break the internet, but we can&apos;t find what
              you are looking for
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
