"use client"
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { useRouter } from "next/navigation";

function Hero2(props) {
  const [path, setPath] = useState(props.path);
  const [url_path, setUrl_path] = useState("/");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useRouter();
  const { isLoggedIn, type } = useContext(UseContextData);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768 ? true : false);
    setUrl_path(window.location.pathname.replace("/", ""));
  }, []);

  const handleClickScroll = () => {
    const ele = document.getElementById("scroll-to");
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        className={`bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url(${isSmallScreen ? path.bannerM : path.banner})`,
        }}
      >
        <div className="flex h-[550px] md:h-[682px] justify-center md:justify-start items-end md:items-center md:pl-[5%]">
          <div className="flex flex-col items-center md:items-start mb-7">
            <div
              dangerouslySetInnerHTML={{
                __html: isSmallScreen ? path.titleM : path.title,
              }}
              className="text-xl md:text-3xl font-bold leading-3 text-amber-400"
            />
            <div
              className="mt-5 text-gray-300 text-base lg:text-lg w-[60%] md:w-auto ml-12 md:ml-0"
              dangerouslySetInnerHTML={{ __html: path.content }}
            />

            <div className="mt-6">
              {path.isCTA && !isLoggedIn ? (
                <button
                  className="text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-3 py-2 text-center"
                  onClick={() =>
                    url_path === "careers"
                      ? handleClickScroll()
                      : navigate.push(
                          url_path !== "artist" ? path.route : "/upload"
                        )
                  }
                >
                  {path.button_name}
                </button>
              ) : path.isCTA && type === "user" && url_path !== "artist" ? (
                <>
                  <button
                    className="text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-3 py-2 text-center"
                    onClick={() =>
                      url_path === "careers"
                        ? handleClickScroll()
                        : navigate.push(path.route)
                    }
                  >
                    {path.button_name}
                  </button>
                </>
              ) : (
                path.isCTA &&
                type === "artist" && (
                  <button
                    className="text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-3 py-2 text-center"
                    onClick={() =>
                      url_path === "careers"
                        ? handleClickScroll()
                        : navigate.push(path.route)
                    }
                  >
                    {path.button_name_login}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero2;
