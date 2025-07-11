/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { FaChevronDown, FaBars, FaChevronRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import "./header.css";
import { ARTIST_MENU, verifyJWTToken, USER_MENU } from "@nyx-frontend/main/utils/utils";
import { IoCartOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getProfileService } from "@nyx-frontend/main/services/loginService";
import Link from "next/link";
import { getCartService } from "@nyx-frontend/main/services/cartService";

const vector = IMAGE_URL + "/assets/images/artists/Vector.png";
const iconBox = IMAGE_URL + "/assets/images/artists/Subtract.png";
const logo = IMAGE_URL + "/assets/images/logo/NYXlogo.png";
const logo1 = IMAGE_URL + "/assets/images/logo/NYXlogoWeb.png";
const logoPremium = IMAGE_URL + "/assets/premium.png";

function readCookie(name: string) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

function Header({ header_bg = "" }: { header_bg?: string }) {
  const navigate = useRouter();
  const [stickyNav, setStickyNav] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMenuSm, setShowMenuSm] = useState(false);
  const [showMenuSmInvest, setShowMenuSmInvest] = useState(false);
  const [path, setPath] = useState("");
  const [showProfileMenuSm, setShowProfileMenuSm] = useState(false);
  const [count, setCount]: any = useState(0);
  const url_path = usePathname();
  const {
    userDetails,
    isLoggedIn,
    setIsLoggedIn,
    type,
    reset,
    cartDetails,
    setCartCount,
    cartCount,
    setUserDetails,
    setType,
  } = useContext(UseContextData);
  const queryUser = useQuery({
    queryKey: ["user-details"],
    queryFn: getProfileService,
    retry: false,
  });

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: getCartService,
  });

  useEffect(() => {
    setPath(url_path);
  }, [url_path]);

  //commenting code for setting cart count from api

  // useEffect(() => {

  //   if (userDetails && Object.keys(userDetails)) {
  //     setCount(userDetails.cartqty);
  //   }
  // }, [userDetails]);

  /*useEffect(() => {
    if (!type && cartDetails?.shopping_cart) {
      setCount(cartDetails.shopping_cart.length || 0);
    } else if (!type) {
      // @ts-ignore
      setCount(parseInt(readCookie("gCartQty")) || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartDetails]);

  useEffect(() => {
    setCount(cartQuery.data?.total_cart_items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartQuery.isSuccess]);*/

  useEffect(() => {
    if (queryUser.isSuccess && !userDetails?.cartqty) {
      setUserDetails(queryUser.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryUser]);

  useEffect(() => {
    setCartCount(cartQuery.data?.total_cart_items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartQuery.isSuccess]);

  useEffect(() => {
    setCartCount(cartCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartCount]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    const token = verifyJWTToken(localStorage.getItem("token"));
    setIsLoggedIn(token?.data !== null);
    if (token?.data?.type) {
      setType(token.data.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      setStickyNav(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

  const handleChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const showSmMenu = (val: any) => {
    setShowMenuSm(val);
    setShowProfileMenuSm(false);
  };

  const showProfileSmMenu = (val: any) => {
    setShowProfileMenuSm(val);
    setShowMenuSm(false);
  };

  return (
    <>
      <nav
        className={`text-white px-2 sm:px-4 pb-4 w-full z-20 top-0 left-0 fixed ${stickyNav
            ? "header_bg_sticky"
            : header_bg
              ? "bg-transparent"
              : "header_bg"
          }`}
      >
        <div className="mx-auto flex items-center justify-between w-full md:w-auto">
          <div className="flex-col ml-17 hidden md:block container-fluid lg:w-[90px] md:w-[60px] ml-10">
            <Link
              href="/"
              className="cursor-pointer flex items-center md:w-max"
            >
              <img
                src={logo1}
                className="md:h-20 generic"
                alt="logo1"
                loading="lazy"
                decoding="async"
              />
              <img
                src={logoPremium}
                className="md:h-20 premium hidden"
                alt="logoPremium"
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>

          <div className="flex">
            <button
              type="button"
              className="cursor-pointer inline-flex items-center mx-0 md:mx-3 text-sm text-gray-500 rounded-md md:hidden"
            >
              <FaBars
                className="w-8 h-6 text-white"
                onClick={() => {
                  showSmMenu(!showMenuSm);
                }}
              />
            </button>

            <div className="md:hidden block container-fluid">
              <span
                onClick={() => navigate.push("/")}
                className="cursor-pointer flex items-center"
              >
                <img
                  src={logo}
                  className="w-20 md:w-20 generic"
                  alt="logo"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={logoPremium}
                  className="w-20 md:w-20 premium hidden"
                  alt="logoPremium"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </div>
          </div>

          {isLoggedIn ? (
            <ProfileItems
              setProfileMenu={showProfileSmMenu}
              profileMenu={showProfileMenuSm}
            />
          ) : (
            <div
              onClick={() => navigate.push("/apphome/login")}
              className="cursor-pointer block md:hidden text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-3 md:px-5 py-1 md:py-2 text-center mr-5"
            >
              Login
            </div>
          )}
          {/* <div className="flex-col ml-17 hidden md:block container-fluid lg:w-[90px] md:w-[60px]">
            <div
              onClick={() => navigate.push("/")}
              className="cursor-pointer flex items-center md:w-max"
            >
              <img src={logo1} className="md:h-20" alt="" loading="lazy" decoding="async"/>
            </div>
          </div> */}

          <div className="hidden md:block w-full md:w-auto" id="mobile-menu">
            <ul className="flex-col items-center md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium mr-5">
              <li id="invest_dropdown">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="cursor-pointer inline-flex items-center text-white w-full justify-center bg-transparent text-sm font-medium"
                    >
                      <div
                        // onMouseOver={() => setDropdownOpen(true)}
                        // onMouseOut={() => setDropdownOpen(false)}
                        className="flex items-center hover:text-amber-500"
                      >
                        <p className="text-md">Invest</p>
                        <FaChevronDown className="mt-0 h-3" />
                      </div>
                    </button>
                  </div>
                  {/* {dropdownOpen && ( */}
                  <div
                    // onMouseOut={() => setDropdownOpen(false)}
                    // onMouseOver={() => setDropdownOpen(true)}
                    id="invest_dropdown_items"
                    className=" cursor-pointer absolute  z-10 w-44 origin-top-right rounded-md bg-[#091234] text-white"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <span
                        onClick={() => navigate.push("/music")}
                        className="cursor-pointer text-white block px-4 py-2 text-sm md:hover:text-amber-500 hover:bg-[#192F73]"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                      >
                        Music
                      </span>
                      <span
                        onClick={() => navigate.push("/video")}
                        className="cursor-pointer text-white block px-4 py-2 text-sm md:hover:text-amber-500 hover:bg-[#192F73]"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-1"
                      >
                        Videos
                      </span>
                      <span
                        onClick={() => navigate.push("/event")}
                        className=" cursor-pointer text-white block px-4 py-2 text-sm md:hover:text-amber-500 hover:bg-[#192F73]"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-2"
                      >
                        Events
                      </span>
                      <span
                        onClick={() => navigate.push("/collectibles")}
                        className="cursor-pointer text-white block px-4 py-2 text-sm md:hover:text-amber-500 hover:bg-[#192F73]"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-2"
                      >
                        Collectibles
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/artist"
                  className={`block ${path === "artist" ? "text-amber-500" : ""
                    } cursor-pointer dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 rounded w-[80px]`}
                >
                  For Artists
                </Link>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate.push("/marketplace");
                  }}
                  className="cursor-pointer block dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pr-3 py-2 rounded"
                >
                  Marketplace
                </a>
              </li>
              {/* <li>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultValue="off"
                    className="sr-only peer"
                    onChange={(e) => handleChange(e)}
                  />
                  <div
                    className={`
            w-10 h-5 bg-gray-200 peer-focus:outline-none peer-checked:ring-4 
            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
            peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
            after:top-[0.2px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full 
            after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 ${
              isChecked ? "bg-black " : ""
            }`}
                  />
                </label>
              </li> */}

              <li>
                <Link
                  href={"/cart"}
                  className="flex items-center gap-1 cursor-pointer dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-2 py-2 rounded md:w-auto"
                >
                  <IoCartOutline className="text-xl font-semibold " />
                  Cart({cartCount})
                </Link>
              </li>
              <li>
                {isLoggedIn === false ? (
                  <Link
                    href="/apphome/login"
                    className="w-max block cursor-pointer text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center"
                  >
                    Login /Signup
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 md:w-max">
                    <Link
                      href="/profile/Wallet"
                      className="cursor-pointer border border-colorY rounded"
                    >
                      <div className="flex pt-1 pb-1.5 pl-2 pr-2 gap-2">
                        <div>
                          <img
                            className="pt-2 w-[1rem]"
                            alt="icon"
                            src={iconBox}
                          ></img>
                        </div>
                        <div>
                          <p className="pt-1 text-sm md:text-base">
                            ₹ {userDetails?.inr_balance?.toFixed(2)}
                          </p>
                        </div>
                        <div className="relative top-2">
                          <img src={vector} alt="icon"></img>
                        </div>
                        <p className="pt-1 text-sm md:text-base">
                          {userDetails?.coin_balance}
                        </p>
                      </div>
                    </Link>
                    {/* {type === "user" &&
                    <div onClick={()=>navigate('/cart')} className="flex justify-center items-center cursor-pointer">
                      <div className="relative">
                        <div className="mt-[-0.6rem] absolute left-4">
                          <p className="cursor-pointer flex h-2 w-2 items-center justify-center rounded-full p-2 bg-red-500 text-xs text-white">{count}</p>
                        </div>
                        <FaShoppingCart className='w-8' />
                      </div>
                    </div> } */}

                    <div className="pt-1">
                      <div className="dropdownmenu">
                        <button className="profile-icon">
                          <img
                            src={userDetails?.profilePic}
                            width={32}
                            height={32}
                            alt="Profile Pic"
                          />
                        </button>
                        <div className="dropdown-content">
                          {[...(type === "user" ? USER_MENU : ARTIST_MENU)].map(
                            (menu) => (
                              <Link
                                href={menu.route}
                                className="cursor-pointer"
                                onClick={() => {
                                  if (
                                    menu.route.toLocaleUpperCase() === "logout"
                                  ) {
                                    reset();
                                  }
                                }}
                                key={menu.route}
                              >
                                {menu.name}
                              </Link>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        {showMenuSm && (
          <div
            onMouseOver={() => setDropdownOpen(true)}
            className="bg-black justify-between items-center w-full md:hidden lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <div
                  className="flex items-center"
                  onClick={() => setShowMenuSmInvest(!showMenuSmInvest)}
                >
                  <a
                    className={`cursor-pointer block dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2`}
                  >
                    Invest
                  </a>
                  {showMenuSmInvest ? (
                    <FaChevronRight className="mt-0 h-3" />
                  ) : (
                    <FaChevronDown className="mt-0 h-3" />
                  )}
                </div>
              </li>
              {showMenuSmInvest && (
                <>
                  <li>
                    {" "}
                    <span
                      onClick={() => navigate.push("/music")}
                      className={`cursor-pointer block dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-8 pr-4 py-2`}
                    >
                      {" "}
                      Music{" "}
                    </span>{" "}
                  </li>
                  <li>
                    {" "}
                    <span
                      onClick={() => navigate.push("/video")}
                      className={` cursor-pointer block dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-8 pr-4 py-2`}
                    >
                      {" "}
                      Videos{" "}
                    </span>{" "}
                  </li>
                  <li>
                    {" "}
                    <span
                      onClick={() => navigate.push("/event")}
                      className={`cursor-pointer block dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-8 pr-4 py-2`}
                    >
                      {" "}
                      Events{" "}
                    </span>{" "}
                  </li>
                  <li>
                    {" "}
                    <span
                      onClick={() => navigate.push("/collectibles")}
                      className={`cursor-pointer block dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-8 pr-4 py-2`}
                    >
                      {" "}
                      Collectibles{" "}
                    </span>{" "}
                  </li>
                </>
              )}
              {/* {!isLoggedIn && (
                <li>
                  <span
                    onClick={() => navigate("/brand")}
                    className={`block ${
                      path === "brand" ? "text-amber-500" : ""
                    } cursor-pointer dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2`}
                  >
                    For Brands
                  </span>
                </li>
              )} */}

              <li>
                <Link
                  href="/artist"
                  className={`block ${path === "artist" ? "text-amber-500 cursor-pointer" : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2`}
                >
                  For Artists
                </Link>
              </li>
              <li>
                <Link
                  href="/marketplace"
                  className="cursor-pointer block dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2"
                >
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>
        )}

        {showProfileMenuSm && (
          <div
            className="bg-black justify-between items-center w-full md:hidden lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <span
                  onClick={() => navigate.push("/profile/Portfolio")}
                  className={`block ${path === "profile/Portfolio"
                      ? "text-amber-500 cursor-pointer "
                      : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 cursor-pointer`}
                >
                  Profile
                </span>
              </li>

              <li>
                <span
                  onClick={() => navigate.push("/profile/Settings")}
                  className={`block ${path === "profile/Settings"
                      ? "text-amber-500 cursor-pointer "
                      : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 cursor-pointer`}
                >
                  Settings
                </span>
              </li>

              <li>
                <span
                  onClick={() => navigate.push("/distribute")}
                  className={`block ${path === "distribute" ? "text-amber-500 cursor-pointer" : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 cursor-pointer`}
                >
                  Distribute
                </span>
              </li>

              <li>
                <span
                  onClick={() => navigate.push("/refer")}
                  className={`block ${path === "refer" ? "text-amber-500 cursor-pointer" : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 cursor-pointer`}
                >
                  Refer & Earn
                </span>
              </li>

              <li>
                <span
                  onClick={() => navigate.push("/notifications")}
                  className={`block ${path === "notifications"
                      ? "text-amber-500 cursor-pointer"
                      : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 cursor-pointer`}
                >
                  Notifications
                </span>
              </li>

              <li>
                <span
                  onClick={() => navigate.push("/support")}
                  className={`block ${path === "support" ? "text-amber-500 cursor-pointer" : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 cursor-pointer`}
                >
                  Support
                </span>
              </li>

              <li>
                <span
                  onClick={() => navigate.push("/cart")}
                  className={`block ${path === "cart" ? "text-amber-500 cursor-pointer" : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 cursor-pointer`}
                >
                  Cart
                </span>
              </li>

              <li>
                <Link
                  href="/experts"
                  className={`block ${path === "experts" ? "text-amber-500 cursor-pointer" : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 cursor-pointer`}
                >
                  Experts
                </Link>
              </li>

              <li>
                <button
                  onClick={() => {
                    reset();
                    navigate.push(process.env.NEXT_PUBLIC_APP_URL as string);
                  }}
                  className={`block ${path === "apphome/login" ? "text-amber-500 cursor-pointer" : ""
                    } dark:hover:text-white md:hover:text-amber-500 text-md md:p-0 pl-3 pr-4 py-2 cursor-pointer`}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

// @ts-ignore
function ProfileItems({ setProfileMenu, profileMenu }) {
  const { userDetails } = useContext(UseContextData);
  const navigate = useRouter();
  // return <div className='block md:hidden' onClick={() => navigate("/profile")}>
  return (
    <div className="block md:hidden">
      <div className="flex gap-3 items-center">
        <div
          className="border border-colorY rounded"
          onClick={() => navigate.push("/profile/Wallet")}
        >
          <div className="flex items-center py-2 pl-2 pr-2 gap-2 text-xs md:text-base">
            <div>
              <img
                className="w-4"
                alt="icon"
                src={iconBox}
                loading="lazy"
                decoding="async"
              ></img>
            </div>
            <div>
              <p className="">₹ {userDetails?.inr_balance?.toFixed(2)}</p>
            </div>
            <div className="relative">
              <img src={vector} alt="icon"></img>
            </div>
            <p className="">{userDetails?.coin_balance}</p>
          </div>
        </div>
        <div className="">
          <img
            onClick={() => setProfileMenu(!profileMenu)}
            src={userDetails?.profilePic}
            width={32}
            height={32}
            alt="icon"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Header;
