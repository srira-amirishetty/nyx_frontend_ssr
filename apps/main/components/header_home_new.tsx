/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { IMAGE_URL } from "./constants";
import { TAIL_BUTTON, TAIL_BUTTON2 } from "./tails2";
import "./header.css";
import { useRouter } from "next/navigation";
import Waitlist from "./Waitlist";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import Image from "next/image";
import { useUserStore } from "@nyx-frontend/main/hooks/usersStore";
import { getUserProfileData } from "@nyx-frontend/main/services/uploadService";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@nyx-frontend/main/utils/loginHelper";
import cookie from "cookiejs";
import Profileicon from "@nyx-frontend/main/components/Profileicon";

const logo = IMAGE_URL + "/assets/logo.svg";

export default function Header({ header_bg = "" }: { header_bg?: string }) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
  const [workspace, setWorkspace] = useState<any>();
  const [scrollY, setScrollY] = useState(0);
  const [stickyNav, setStickyNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const [investDropdownItems, setInvestDropdownItems] = useState(true);

  const [isPopupOpen, setIsPopupOpen] = useState<any>(false);

  const sendToDashBoard = () => {
    if (workspace) {
      navigate.push(`/apphome/${workspace}/dashboard`);
    }
  };

  useLayoutEffect(() => {
    const hasCookie = cookie.get("ExpireLoginToken");
    if (!hasCookie) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, [sendToDashBoard]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && menuRef.current.contains(event.target as Node)) {
      return;
    }

    if (
      desktopRef.current &&
      desktopRef.current.contains(event.target as Node)
    ) {
      return;
    }

    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMobileMenuOpen(false);
    }

    if (
      desktopRef.current &&
      !desktopRef.current.contains(event.target as Node)
    ) {
      setInvestDropdownItems(true);
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      setStickyNav(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, setMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navbarStyle = {
    backgroundColor:
      //@ts-ignore
      scrollY > 0 ? "#250e35" : "" || mobileMenuOpen ? "#250e35" : "",
    transition: "all ease 500ms",
  };

  const toggleNavDropdown = () => {
    setInvestDropdownItems(!investDropdownItems);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const onCloseMenuHandler = () => {
    setTimeout(() => {
      setInvestDropdownItems(true);
    }, 200);
    setMobileMenuOpen(false);
  };

  const queryuserinfo = useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return null;

      const res = await getUserProfileData();
      return res;
    },
  });

  return (
    <>
      <nav
        style={navbarStyle}
        className={`text-white px-2 sm:px-4 h-[60px] md:h-[70px] w-full z-40 top-0 left-0 fixed bg-tranparent `}
      >
        <div className="lg:flex hidden m-auto w-[97%]">
          <div className="w-[15%] mt-1">
            <Link
              href={process.env.NEXT_PUBLIC_BASE_URL as string}
              className="cursor-pointer flex items-center lg:w-max"
            >
              <Image width={94} height={65} src={logo} alt="logo" />
            </Link>
          </div>
          <div className="w-[70%] hidden lg:block">
            <div className="flex items-baseline mt-5 gap-5">
              <div id="invest_dropdown" ref={desktopRef}>
                <div className="relative inline-block text-left">
                  <div
                    className="group flex gap-3 bg-white hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-text text-transparent cursor-pointer "
                    onClick={toggleNavDropdown}
                  >
                    <p className="">Products</p>
                    <span className="relative top-2.5">
                      <svg
                        width="14"
                        height="8"
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classNames(
                          "transform transition-all origin-center",
                          investDropdownItems ? "" : "rotate-180",
                        )}
                      >
                        <path
                          className="group fill-[#FFFFFF] transition duration-100 ease-in-out group-hover:fill-[#A886FF]"
                          d="M1.47268 0.218749L0.292675 1.39875L6.89268 7.99875L13.4927 1.39875L12.3127 0.21875L6.89268 5.63875L1.47268 0.218749Z"
                        />
                      </svg>
                    </span>
                  </div>

                  <div style={{ height: "18px" }}>
                    <div
                      id="invest_dropdown_items"
                      className={classNames(
                        "cursor-pointer absolute z-10 w-[243px] origin-top-right rounded-md bg-[#2A1465] text-white mt-4",
                        investDropdownItems ? "hidden" : "!block",
                      )}
                      role="menu"
                      aria-orientation="vertical"
                      // aria-labelledby="menu-button"
                      tabIndex={-1}
                    >
                      {/* imagecraft menu */}
                      <Link
                        href="/image-craft-ai"
                        className="flex items-center  hover:bg-[#7048D7] hover:rounded-t-md h-[58px] "
                        role="none"
                        onClick={onCloseMenuHandler}
                      >
                        <div className="absolute left-4 ">
                          <svg
                            width="22"
                            height="21"
                            viewBox="0 0 22 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              id="Vector3"
                              d="M21.6333 12.4236L20.5574 13.4996L18.4055 11.3477L19.4815 10.2718C19.5891 10.1642 19.6966 10.0566 19.9118 10.0566C20.0194 10.0566 20.2346 10.1642 20.3422 10.2718L21.7409 11.6705C21.8485 11.8857 21.8485 12.2085 21.6333 12.4236ZM11.222 18.4244C11.2059 18.44 11.1968 18.4615 11.1968 18.4839V20.6255C11.1968 20.6712 11.2339 20.7083 11.2796 20.7083H13.422C13.4439 20.7083 13.465 20.6996 13.4805 20.6841L20.0194 14.1451L17.8676 11.9933L11.222 18.4244ZM19.8042 2.41749C19.8042 1.23396 18.8359 0.265625 17.6524 0.265625H2.58936C1.40584 0.265625 0.4375 1.23396 0.4375 2.41749V17.4805C0.4375 18.664 1.40584 19.6324 2.58936 19.6324H9.04494V17.5881L10.2285 16.4046H2.75861C2.68973 16.4046 2.65098 16.3254 2.69327 16.271L6.292 11.644C6.32443 11.6023 6.38711 11.6013 6.42093 11.6419L8.97913 14.7117C9.01295 14.7523 9.07562 14.7512 9.10806 14.7095L12.7447 10.0339C12.778 9.991 12.8429 9.99132 12.8759 10.0345L14.4742 12.1323C14.5048 12.1725 14.5638 12.1761 14.5992 12.1401L19.8042 6.8288V2.41749Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        {/* <Link
                          href="/image-craft-ai"
                          className="cursor-pointer text-white block px-4 py-2 ml-8 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-0"
                        > */}
                        <p className="cursor-pointer text-white block px-4 py-2 ml-8 text-sm ">
                          {" "}
                          ImageCraft AI
                        </p>

                        {/* </Link> */}
                      </Link>
                      {/* videovista menu */}
                      {/* <Link
                        href="/video-vista-ai"
                        className="flex items-center   hover:bg-[#7048D7] h-[58px]"
                        role="none"
                        onClick={onCloseMenuHandler}
                      >
                        <div className="absolute left-3.5 ">
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="material-symbols:music-note">
                              <path
                                id="Vector1"
                                d="M12.5625 1.18945C6.25763 1.18945 1.14062 6.30645 1.14062 12.6113C1.14062 18.9162 6.25763 24.0332 12.5625 24.0332C18.8674 24.0332 23.9844 18.9162 23.9844 12.6113C23.9844 6.30645 18.8674 1.18945 12.5625 1.18945ZM11.3575 16.9416C10.9128 17.2752 10.2781 16.9579 10.2781 16.4019V8.82071C10.2781 8.2648 10.9128 7.94747 11.3575 8.28102L16.4117 12.0716C16.7715 12.3415 16.7715 12.8812 16.4117 13.151L11.3575 16.9416Z"
                                fill="white"
                              />
                            </g>
                          </svg>
                        </div>
                        
                        <p className="cursor-pointer text-white block px-4 py-2 ml-8 text-sm">
                          VideoVista AI
                        </p>
                        
                      </Link> */}

                      <Link
                        href="/campulse-ai"
                        className="flex items-center  hover:bg-[#7048D7] h-[58px] hover:rounded-b-md"
                        role="none"
                        onClick={onCloseMenuHandler}
                      >
                        <div className="absolute left-3 ">
                          <svg
                            width="24"
                            height="20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="m21.328 2.864-1.774 1.43a1.184 1.184 0 1 1-1.487-1.843l1.774-1.43a1.184 1.184 0 1 1 1.487 1.843Zm1.454 5.879h-2.094a1.217 1.217 0 1 0 0 2.434h2.094a1.217 1.217 0 0 0 0-2.434Zm-4.715 8.725L19.84 18.9a1.184 1.184 0 1 0 1.487-1.844l-1.774-1.43a1.184 1.184 0 0 0-1.487 1.843Zm-14.142.784c0 .547.443.99.99.99h.636a.99.99 0 0 0 .99-.99v-3.315a.99.99 0 0 1 .99-.99h.041a.99.99 0 0 1 .514.144l4.8 2.914a.99.99 0 0 0 1.505-.846V3.793a.99.99 0 0 0-1.504-.846l-4.8 2.914a.99.99 0 0 1-.515.144H2.616c-.718 0-1.334.26-1.847.778A2.561 2.561 0 0 0 0 8.653V11.3c0 .729.257 1.352.77 1.87a2.504 2.504 0 0 0 1.846.777h.319a.99.99 0 0 1 .99.99v3.315Zm11.774-6.059c0 .857.946 1.226 1.334.463.03-.06.06-.12.088-.18.36-.763.54-1.596.54-2.5a5.754 5.754 0 0 0-.626-2.675c-.388-.764-1.336-.394-1.336.463v4.43Z"
                              fill="#fff"
                            />
                          </svg>
                        </div>

                        <p className="cursor-pointer text-white block px-4 py-2 ml-8 text-sm">
                          CamPulse AI
                        </p>
                      </Link>
                      {/* lyricgenuis menu */}
                      {/* <Link
                        href="/lyrics-genius-ai"
                        className="flex items-center hover:bg-[#7048D7] h-[58px]"
                        role="none"
                        onClick={onCloseMenuHandler}
                      >
                        <div className="absolute left-4 ">
                          <svg
                            width="23"
                            height="21"
                            viewBox="0 0 23 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.697 0.644531V11.6506C6.08149 11.2959 5.3721 11.0768 4.61054 11.0768C2.305 11.0768 0.437622 12.9442 0.437622 15.2497C0.437622 17.5553 2.305 19.4227 4.61054 19.4227C6.91607 19.4227 8.78345 17.5553 8.78345 15.2497V4.81745H12.4096C12.7116 4.81745 12.9564 4.57264 12.9564 4.27065V1.19133C12.9564 0.889342 12.7116 0.644531 12.4096 0.644531H6.697Z"
                              fill="white"
                            />
                            <rect
                              x="14.5624"
                              y="6.11328"
                              width="7.4478"
                              height="1.54603"
                              rx="0.773017"
                              fill="white"
                            />
                            <rect
                              x="11.9214"
                              y="9.69336"
                              width="10.0888"
                              height="1.54618"
                              rx="0.773092"
                              fill="white"
                            />
                            <rect
                              x="11.0988"
                              y="13.2715"
                              width="10.9115"
                              height="1.54618"
                              rx="0.773092"
                              fill="white"
                            />
                          </svg>
                        </div>

                        <p className="cursor-pointer text-white block px-4 py-2 ml-8 text-sm">
                          {" "}
                          LyricGenius AI
                        </p>
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex mt-1 gap-5">
                <Link href="/pricing">
                  <p className="bg-white hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-text text-transparent font-normal cursor-pointer">
                    Pricing
                  </p>
                </Link>
                {/* <Link href="/models">
                  <p className="bg-white hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-text text-transparent font-normal cursor-pointer">
                    Models
                  </p>
                </Link> */}

                <Link href="/research">
                  <p className="bg-white hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-text text-transparent font-normal cursor-pointer">
                    Research
                  </p>
                </Link>

                {/* <p
                  className="bg-white hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-text text-transparent font-normal cursor-pointer"
                  onClick={openPopup}
                >
                  Models
                </p> */}
                {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
              </div>
            </div>
          </div>
          <div className="w-[20%] lg:w-[35%] xl:w-[25%] hidden lg:block mt-4">
            {isLoggedIn ? (
              <div>
                <div className="flex gap-4 justify-end items-center ">
                  <div className="w-[128px] mr-8 " onClick={sendToDashBoard}>
                    <TAIL_BUTTON2 style="w-full" disable={false}>
                      Nyx App
                    </TAIL_BUTTON2>
                  </div>

                  <Profileicon hide={""} />

                  {/* <div className="relative group cursor-pointer">
                    <div className="after_login_user_style">
                      {queryuserinfo.isPending || queryuserinfo.isError ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M12.3875 11.6921C11.525 11.6921 10.7927 11.3911 10.1906 10.789C9.58854 10.1869 9.2875 9.45465 9.2875 8.59216C9.2875 7.72966 9.58854 6.99738 10.1906 6.39531C10.7927 5.79323 11.525 5.49219 12.3875 5.49219C13.25 5.49219 13.9822 5.79323 14.5843 6.39531C15.1864 6.99738 15.4875 7.72966 15.4875 8.59216C15.4875 9.45465 15.1864 10.1869 14.5843 10.789C13.9822 11.3911 13.25 11.6921 12.3875 11.6921ZM5.6875 18.5075V16.6844C5.6875 16.378 5.77885 16.0829 5.96155 15.7989C6.14423 15.5149 6.39967 15.2691 6.72787 15.0614C7.59967 14.5601 8.51589 14.1758 9.47653 13.9085C10.4372 13.6412 11.4057 13.5076 12.3823 13.5076C13.3588 13.5076 14.3291 13.6412 15.2932 13.9085C16.2573 14.1758 17.1753 14.5601 18.0471 15.0614C18.3753 15.2524 18.6307 15.4941 18.8134 15.7864C18.9961 16.0787 19.0875 16.378 19.0875 16.6844V18.5075H5.6875ZM6.98747 17.2075H17.7875V16.6844C17.7875 16.5789 17.7494 16.4797 17.6734 16.3866C17.5973 16.2936 17.4924 16.2147 17.3586 16.1498C16.6304 15.7088 15.8436 15.3748 14.9982 15.1479C14.1527 14.921 13.2825 14.8075 12.3875 14.8075C11.4924 14.8075 10.6222 14.921 9.77677 15.1479C8.93134 15.3748 8.14452 15.7088 7.41632 16.1498C7.28171 16.2421 7.17658 16.3305 7.10095 16.415C7.0253 16.4996 6.98747 16.5894 6.98747 16.6844V17.2075ZM12.3928 10.3922C12.8892 10.3922 13.3125 10.2154 13.6625 9.86184C14.0125 9.5083 14.1875 9.0833 14.1875 8.58684C14.1875 8.09039 14.0107 7.66716 13.6572 7.31716C13.3036 6.96716 12.8786 6.79216 12.3822 6.79216C11.8857 6.79216 11.4625 6.96893 11.1125 7.32246C10.7625 7.67601 10.5875 8.10101 10.5875 8.59746C10.5875 9.09393 10.7642 9.51716 11.1178 9.86716C11.4713 10.2172 11.8963 10.3922 12.3928 10.3922Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <img
                          src={queryuserinfo?.data?.artistProfile?.profilePic}
                          alt="Profile"
                          className="rounded-full"
                        />
                      )}

                      <div className=" absolute left-[-130px] bottom-[-100px] hidden group-hover:block">
                        <div className="flex flex-col p-1   ">
                          <Link href={`/apphome/${workspace}/settings/profile`}>
                            <p className="bg-[#2A1465] w-[150px] h-[46px] font-bold text-[14px] pl-[10px] flex item-center pt-[10px] pb-[10px] cursor-pointer hover:bg-[#7048D7]">
                              Update Profile
                            </p>
                          </Link>
                          <Link href={`/apphome/${workspace}/settings/profile`}>
                            <p className="bg-[#2A1465] w-[150px] h-[46px] font-bold text-[14px] pl-[10px] flex item-center pt-[10px] pb-[10px] cursor-pointer hover:bg-[#7048D7]">
                              Setting
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-4">
                  <div
                    className="w-full "
                    onClick={() => navigate.push(`${process.env.NEXT_PUBLIC_APP_URL}/demo`)}
                  >
                    <TAIL_BUTTON2 style="w-full" disable={false}>
                      Book a Demo
                    </TAIL_BUTTON2>
                  </div>
                  {/* {process.env.NEXT_PUBLIC_ENVIRONMENT === "test" ? ( */}
                  <Link href={process.env.NEXT_PUBLIC_APP_URL + '/apphome/login'} className="w-full">
                    <TAIL_BUTTON
                      style="w-full"
                      disable={false}
                    //onClick={handleLogin}
                    >
                      Login
                    </TAIL_BUTTON>
                  </Link>
                  {/* ) : (
                    <div className="w-full" onClick={openPopup}>
                      <TAIL_BUTTON style="w-full" disable={false}>
                        Join Waitlist
                      </TAIL_BUTTON>
                    </div>
                  )} */}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="relative lg:hidden flex flex-row px-6">
          <button
            className="flex flex-row gap-4 absolute top-4 md:top-6"
            onClick={toggleMobileMenu}
          >
            <AnimatePresence>
              {mobileMenuOpen ? (
                // close
                <motion.div ref={menuRef}>
                  <span className="mt-[4px]">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.82973 12.9286L0.0560303 11.1549L4.61697 6.59398L0.0560303 2.06471L1.82973 0.291016L6.39067 4.85195L10.9199 0.291016L12.6936 2.06471L8.13269 6.59398L12.6936 11.1549L10.9199 12.9286L6.39067 8.36768L1.82973 12.9286Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </motion.div>
              ) : (
                // open
                <motion.div>
                  <svg
                    width="24"
                    height="24"
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
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          {/* Buttons for mobile */}
          <div className="absolute top-1 md:top-3 lg:top-5 left-[65px]">
            <Link href="/">
              <Image
                src={logo}
                width={70}
                height={70}
                alt="logo"
                className="w-[70px] h-auto"
              />
            </Link>
          </div>
          {isLoggedIn ? (
            <div
              className="flex absolute top-3 md:top-5 right-5 w-[115px] h-[36px] md:h-[40px]"
              onClick={sendToDashBoard}
            >
              <TAIL_BUTTON2 style="w-full" disable={false}>
                Nyx App
              </TAIL_BUTTON2>
            </div>
          ) : (
            <div>
              {/* {process.env.NEXT_PUBLIC_ENVIRONMENT === "test" ? ( */}
              <div
                className="flex absolute top-3 md:top-5 right-5 w-[115px] h-[36px] md:h-[40px]"
                onClick={() => navigate.push("/apphome/login")}
              >
                <TAIL_BUTTON style="w-full" disable={false}>
                  Login
                </TAIL_BUTTON>
              </div>
              {/* ) : (
                <div
                  className="flex absolute top-3 md:top-5 right-5 w-[115px] h-[36px] md:h-[40px]  "
                  onClick={openPopup}
                >
                  <TAIL_BUTTON style="w-full" disable={false}>
                    Join Waitlist
                  </TAIL_BUTTON>
                </div>
              )} */}
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <motion.div
          ref={menuRef}
          initial={{ x: "-100%" }}
          animate={{ x: mobileMenuOpen ? 0 : "-100%" }}
          transition={{
            x: { ease: "linear" },
          }}
          exit={{ x: "-100%" }}
          className="mobile_nav_bar lg:hidden fixed top-[60px] left-0 bg-[#261746] z-[9999] w-[185px] h-[calc(100vh-60px)] flex flex-col items-center"
        >
          <div className="flex flex-col mb-[300px] bg-[#261746] w-full text-[14px] font-semibold">
            <div className="mt-4 mb-2 ml-4">
              <p className="text-[14px] font-bold">Products</p>
            </div>
            <Link
              href="/image-craft-ai"
              className="flex flex-row items-center justify-center hover:bg-[#7048D7]  focus:bg-[#7048D7] active:bg-[#7048D7] focus:font-bold"
              onClick={onCloseMenuHandler}
            >
              <div className="absolute left-4">
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector4"
                    d="M21.6333 12.4236L20.5574 13.4996L18.4055 11.3477L19.4815 10.2718C19.5891 10.1642 19.6966 10.0566 19.9118 10.0566C20.0194 10.0566 20.2346 10.1642 20.3422 10.2718L21.7409 11.6705C21.8485 11.8857 21.8485 12.2085 21.6333 12.4236ZM11.222 18.4244C11.2059 18.44 11.1968 18.4615 11.1968 18.4839V20.6255C11.1968 20.6712 11.2339 20.7083 11.2796 20.7083H13.422C13.4439 20.7083 13.465 20.6996 13.4805 20.6841L20.0194 14.1451L17.8676 11.9933L11.222 18.4244ZM19.8042 2.41749C19.8042 1.23396 18.8359 0.265625 17.6524 0.265625H2.58936C1.40584 0.265625 0.4375 1.23396 0.4375 2.41749V17.4805C0.4375 18.664 1.40584 19.6324 2.58936 19.6324H9.04494V17.5881L10.2285 16.4046H2.75861C2.68973 16.4046 2.65098 16.3254 2.69327 16.271L6.292 11.644C6.32443 11.6023 6.38711 11.6013 6.42093 11.6419L8.97913 14.7117C9.01295 14.7523 9.07562 14.7512 9.10806 14.7095L12.7447 10.0339C12.778 9.991 12.8429 9.99132 12.8759 10.0345L14.4742 12.1323C14.5048 12.1725 14.5638 12.1761 14.5992 12.1401L19.8042 6.8288V2.41749Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <p className="text-white my-4 cursor-pointer font-normal  active:font-black focus:text-[16px] focus:font-black">
                  ImageCraft AI
                </p>
              </div>
            </Link>

            {/* <Link
              href="/video-vista-ai"
              className="flex flex-row items-center justify-center hover:bg-[#7048D7]  focus:bg-[#7048D7] active:bg-[#7048D7] focus:font-bold"
              onClick={onCloseMenuHandler}
            >
              <div className="absolute left-4">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="material-symbols:music-note1">
                    <path
                      id="Vector5"
                      d="M12.5625 1.18945C6.25763 1.18945 1.14062 6.30645 1.14062 12.6113C1.14062 18.9162 6.25763 24.0332 12.5625 24.0332C18.8674 24.0332 23.9844 18.9162 23.9844 12.6113C23.9844 6.30645 18.8674 1.18945 12.5625 1.18945ZM11.3575 16.9416C10.9128 17.2752 10.2781 16.9579 10.2781 16.4019V8.82071C10.2781 8.2648 10.9128 7.94747 11.3575 8.28102L16.4117 12.0716C16.7715 12.3415 16.7715 12.8812 16.4117 13.151L11.3575 16.9416Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <div className="ml-2">
                <p className="text-white my-4 cursor-pointer font-normal  active:font-black focus:text-[16px] focus:font-black">
                  Videovista AI
                </p>
              </div>
            </Link> */}
            <Link
              href="/campulse-ai"
              className="flex flex-row items-center justify-center hover:bg-[#7048D7] focus:bg-[#7048D7] active:bg-[#7048D7] focus:font-bold"
              onClick={onCloseMenuHandler}
            >
              <div className="absolute left-4">
                <svg
                  width="24"
                  height="20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="m21.328 2.864-1.774 1.43a1.184 1.184 0 1 1-1.487-1.843l1.774-1.43a1.184 1.184 0 1 1 1.487 1.843Zm1.454 5.879h-2.094a1.217 1.217 0 1 0 0 2.434h2.094a1.217 1.217 0 0 0 0-2.434Zm-4.715 8.725L19.84 18.9a1.184 1.184 0 1 0 1.487-1.844l-1.774-1.43a1.184 1.184 0 0 0-1.487 1.843Zm-14.142.784c0 .547.443.99.99.99h.636a.99.99 0 0 0 .99-.99v-3.315a.99.99 0 0 1 .99-.99h.041a.99.99 0 0 1 .514.144l4.8 2.914a.99.99 0 0 0 1.505-.846V3.793a.99.99 0 0 0-1.504-.846l-4.8 2.914a.99.99 0 0 1-.515.144H2.616c-.718 0-1.334.26-1.847.778A2.561 2.561 0 0 0 0 8.653V11.3c0 .729.257 1.352.77 1.87a2.504 2.504 0 0 0 1.846.777h.319a.99.99 0 0 1 .99.99v3.315Zm11.774-6.059c0 .857.946 1.226 1.334.463.03-.06.06-.12.088-.18.36-.763.54-1.596.54-2.5a5.754 5.754 0 0 0-.626-2.675c-.388-.764-1.336-.394-1.336.463v4.43Z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <p className="text-white my-4 cursor-pointer font-normal  active:font-black focus:text-[16px] focus:font-black">
                  CamPulse AI
                </p>
              </div>
            </Link>
            {/* <Link
              href="/lyrics-genius-ai"
              className="flex flex-row items-center justify-center hover:bg-[#7048D7]  focus:bg-[#7048D7] active:bg-[#7048D7] focus:font-bold"
              onClick={onCloseMenuHandler}
            >
              <div className="absolute left-4">
                <svg
                  width="23"
                  height="21"
                  viewBox="0 0 23 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.697 0.644531V11.6506C6.08149 11.2959 5.3721 11.0768 4.61054 11.0768C2.305 11.0768 0.437622 12.9442 0.437622 15.2497C0.437622 17.5553 2.305 19.4227 4.61054 19.4227C6.91607 19.4227 8.78345 17.5553 8.78345 15.2497V4.81745H12.4096C12.7116 4.81745 12.9564 4.57264 12.9564 4.27065V1.19133C12.9564 0.889342 12.7116 0.644531 12.4096 0.644531H6.697Z"
                    fill="white"
                  />
                  <rect
                    x="14.5624"
                    y="6.11328"
                    width="7.4478"
                    height="1.54603"
                    rx="0.773017"
                    fill="white"
                  />
                  <rect
                    x="11.9214"
                    y="9.69336"
                    width="10.0888"
                    height="1.54618"
                    rx="0.773092"
                    fill="white"
                  />
                  <rect
                    x="11.0988"
                    y="13.2715"
                    width="10.9115"
                    height="1.54618"
                    rx="0.773092"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-white my-4 cursor-pointer font-normal  active:font-black focus:text-[16px] focus:font-black ">
                  LyricsGenius AI
                </p>
              </div>
            </Link> */}

            <Link href="/" className=" hover:bg-[#7048D7] w-full">
              <div className="mt-4 mb-2 ml-4">
                {<Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />}
              </div>
            </Link>
            <Link href="/pricing" className="hover:bg-[#7048D7]">
              <div className="mt-4 mb-4 ml-4">
                <p className="text-[14px] font-bold">Pricing</p>
              </div>
            </Link>
            {/* <Link href="/models" className="hover:bg-[#7048D7]">
              <div className="mt-4 mb-4 ml-4">
                <p className="text-[14px] font-bold">Models</p>
              </div>
            </Link> */}
            <Link href="/research" className="hover:bg-[#7048D7]">
              <div className="mt-4 mb-4 ml-4">
                <p className="text-[14px] font-bold">Research</p>
              </div>
            </Link>
          </div>
          <div className="absolute bottom-20 left-8 flex demo_button_mobile">
            <button
              className="px-[1px] py-[1px] rounded-full bg-gradient-to-r from-[#B631B1] to-[#7048D7] p-1 border-bg-gradient-to-r "
              onClick={() => navigate.push(process.env.NEXT_PUBLIC_APP_URL + "/demo")}
            >
              <span className="flex px-[16px] py-[8px] w-full h-full items-center justify-center rounded-full bg-[#261936] hover:bg-gradient-to-r from-[#B631B1] to-[#7048D7] back">
                <span className="text-[14px] font-normal text-white ">
                  Book a Demo
                </span>
              </span>
            </button>
          </div>
          {/* Add more menu items here */}
        </motion.div>
      </nav>
    </>
  );
}
