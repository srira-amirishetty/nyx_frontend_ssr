/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState, useLayoutEffect } from "react";
import { IMAGE_URL } from "./constants";
import { TAIL_BUTTON } from "./tails";
import "./header.css";
import { useRouter } from "next/navigation";
import cookie from "cookiejs";

const logo = IMAGE_URL + "/assets/logo.svg";
const arrow = IMAGE_URL + "/assets/arrow.svg";

export default function Header() {
  const [stickyNav, setStickyNav] = useState(false);
  const navigate = useRouter();
  useLayoutEffect(() => {
    const hasCookie = cookie.get("ExpireLoginToken");
    if (!hasCookie) {
      navigate.push("/logout");
    }
    document.body.style.backgroundColor = "#f0f0f0";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      setStickyNav(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);
  return (
    <>
      <nav
        className={`text-white px-2 sm:px-4 pb-4 w-full z-20 top-0 left-0 fixed bg-[#041414]`}
      >
        <div className="md:flex hidden m-auto w-[95%]">
          <div className="w-[15%] mt-5">
            <Link
              href="/"
              className="cursor-pointer flex items-center md:w-max"
            >
              <img className="w-[65%]" src={logo} alt="logo"></img>
            </Link>
          </div>
          <div className="w-[70%] hidden md:block">
            <div className="flex mt-8 gap-10">
              <li id="invest_dropdown">
                <div className="relative inline-block text-left">
                  <div className="flex gap-3">
                    <p className="hover:text-[#FFC01D] font-[300] cursor-pointer">
                      Products
                    </p>
                    <span className="relative top-2.5">
                      <img src={arrow} alt="image"></img>
                    </span>
                  </div>

                  <div
                    id="invest_dropdown_items"
                    className=" cursor-pointer absolute  z-10 w-44 origin-top-right rounded-md bg-[#091234] text-white"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <span
                        onClick={() => navigate.push("/brandvision-ai")}
                        className="cursor-pointer text-white block px-4 py-2 text-sm md:hover:text-amber-500 hover:bg-[#192F73]"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                      >
                        BrandVision AI
                      </span>
                    </div>
                    <div className="py-1" role="none">
                      <span
                        onClick={() => navigate.push("/sonic-ai")}
                        className="cursor-pointer text-white block px-4 py-2 text-sm md:hover:text-amber-500 hover:bg-[#192F73]"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                      >
                        Sonic AI
                      </span>
                    </div>
                    <div className="py-1" role="none">
                      <span
                        onClick={() => navigate.push("/lyrics-genius-ai")}
                        className="cursor-pointer text-white block px-4 py-2 text-sm md:hover:text-amber-500 hover:bg-[#192F73]"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                      >
                        LyricGenius AI
                      </span>
                    </div>
                  </div>
                </div>
              </li>

              <p className="hover:text-[#FFC01D] font-[300] cursor-pointer">
                Pricing
              </p>
              <p className="hover:text-[#FFC01D] font-[300] cursor-pointer">
                About Us
              </p>
            </div>
          </div>
          <div className="w-[20%] lg:w-[35%] xl:w-[25%] md:w-[35%] hidden md:block mt-5">
            <div className="flex gap-8">
              <TAIL_BUTTON style="w-full" disable={true}>
                Get a Demo
              </TAIL_BUTTON>
              <div
                className="w-full"
                onClick={() => navigate.push("/apphome/login")}
              >
                <TAIL_BUTTON style="w-full hover:font-semibold" disable={false}>
                  Log in
                </TAIL_BUTTON>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden flex pt-4">
          <div className="w-[40%] pt-1">
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.25 24.0827H29.75M4.25 16.9993H29.75M4.25 9.91602H29.75"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex gap-2 w-full">
            <TAIL_BUTTON style="w-full" disable={true}>
              Get a Demo
            </TAIL_BUTTON>
            <TAIL_BUTTON style="w-full hover:font-semibold" disable={false}>
              Log in
            </TAIL_BUTTON>
          </div>
        </div>
      </nav>
    </>
  );
}
