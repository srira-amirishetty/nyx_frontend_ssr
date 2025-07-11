/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, Suspense } from "react";
import { apiAxios } from "@nyx-frontend/main/services/apiHandler";
import { useQuery } from "@tanstack/react-query";
import {
  useSearchParams,
  useRouter,
  redirect,
  usePathname,
} from "next/navigation";
import { hasToken } from "@nyx-frontend/main/utils/auth";
import Modal from "react-modal";
import { defaultStyle } from "@nyx-frontend/main/utils/modalstyles";
import { sortList } from "./Experts.constants";
import useSearchQuery from "@nyx-frontend/main/hooks/useSearchQuery";
// import { , useSearchParams, usePathname } from "next/navigation";
import Card from "./Card";
import { Range } from "react-range";
import { categories } from "./Experts.constants";

function Experts() {
  const [thankyouModal, setThankyouModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [tabState, setTabState] = useState("filter");
  const [values, setValues] = useState([1, 15000]);
  const { updateSearchArray } = useSearchQuery();
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(search);

  const { data, isLoading } = useQuery({
    queryKey: [
      "get-expert-details",
      search.get("sort"),
      search.getAll("categories"),
      search.get("pricefrom"),
      search.get("priceto"),
    ],
    queryFn: async () => {
      const newSearch = new URLSearchParams();
      const sortBy = search.get("sort");
      if (sortBy) {
        newSearch.append("sort", sortBy);
      }

      const filterBy = search.getAll("categories");
      filterBy.forEach((v) => {
        newSearch.append("categories", v);
      });

      const pricefrom = search.get("pricefrom");
      const priceto = search.get("priceto");

      if (pricefrom && priceto) {
        newSearch.append("priceto", search.get("priceto"));
        newSearch.append("pricefrom", search.get("pricefrom"));
      }

      const query = `?${newSearch.toString()}`;
      const res = await apiAxios.get(`artists/get-expert-details${query}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      return res.data;
    },
    select: (data) => data.nyx_experts,
  });

  // useEffect(() => {
  //   if (!hasToken()) {
  //     redirect("/apphome/login");
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterheaders = ["category", "arrangeBy"];

  const filterHeaders = {
    category: {
      list: categories,
      displayTitle: "Category",
      queryParamsKey: "categories",
    },
    arrangeBy: {
      list: sortList,
      displayTitle: "Arrange By",
      queryParamsKey: "sort",
    },
  };

  const onLastClose = () => {
    setThankyouModal(false);
  };

  const onSelectSort = (val, type) => {
    updateSearchArray(
      type,
      val.map((v) => v.value),
    );
  };

  const filterDropdowns = {
    category: categories,
    arrangeBy: sortList,
  };
  const SortList = ({ data }) => {
    const { updateSearch } = useSearchQuery();

    const onClick = () => {
      updateSearch("sort", data.value);
    };

    return (
      <li
        onClick={onClick}
        className="flex w-full p-2 text-sm cursor-pointer text-white hover:bg-[#192f73] hover:text-nyx-yellow"
      >
        <span>{data.label}</span>
      </li>
    );
  };

  const constructUrl = (filterType, selectedValues) => {
    const filterLabel = filterHeaders[filterType]["list"].filter(
      (item, index) => {
        if (selectedValues.includes(item.label)) {
          return item;
        }
      },
    );

    onSelectSort(filterLabel, filterHeaders[filterType]["queryParamsKey"]);
  };

  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedSortVal, setSelectedSortVal] = useState("");

  useEffect(() => {
    let searchSort = search.get("sort");
    let categoriesParams = search.getAll("categories");
    let priceto = search.get("priceto");
    let pricefrom = search.get("pricefrom");
    if (searchSort) {
      filterDropdowns.arrangeBy.map((item, index) => {
        if (searchSort === item.value) {
          setSelectedSortVal(item.label);
        }
      });
    }
    let categoryArr = [];
    if (categoriesParams && categoriesParams.length) {
      filterDropdowns.category.map((item, index) => {
        if (categoriesParams.includes(item.value)) {
          categoryArr.push(item.label);
        }
      });
      setSelectedValues([...categoryArr]);
    }

    if (priceto && pricefrom) {
      setValues([pricefrom, priceto]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (filterType, val) => {
    let updatedValues = [];
    if (filterType === "category") {
      const ifvalExist = selectedValues.includes(val);
      updatedValues = ifvalExist
        ? selectedValues.filter((value) => value !== val)
        : [...selectedValues, val];
      setSelectedValues(updatedValues);
    } else {
      setSelectedSortVal(val);
      updatedValues.push(val);
    }

    constructUrl(filterType, updatedValues);
  };

  const handleChange = (value) => {
    setValues(value);
    params.set("pricefrom", value[0]);
    params.set("priceto", value[1]);
    router.push(pathname + "?" + params);
  };

  return (
    <>
      <div className="min-h-screen mb-32 w-full" id="trackedDiv">
        <div className="relative ">
          <p className="text-[#8297BD] text-[20px] md:text-[24px] font-bold text-center mt-[36px] mb-8">
            LyricGenius Consultation
          </p>

          <div className="mx-auto mt-0 md:mt-10 mb-28 w-auto md:w-[95%] justify-between text-white">
            <div
              onClick={() => setShowModal((prev) => !prev)}
              className="flex mt-24 text-white justify-end hover:text-black md:hidden font-lg px-5 py-1 text-center mr-2"
            >
              {" "}
              <div className="flex hover:bg-amber-300 hover:rounded-md p-1 justify-end">
                <span>Sort & Filter </span>

                <div className="pl-2 flex border-white justify-center items-center hover:border-black">
                  <svg
                    width="18"
                    height="8"
                    viewBox="0 0 22 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.6389 2.15156L11.3056 10.5766C11.1944 10.6766 11.0741 10.7472 10.9444 10.7886C10.8148 10.8306 10.6759 10.8516 10.5278 10.8516C10.3796 10.8516 10.2407 10.8306 10.1111 10.7886C9.98148 10.7472 9.86111 10.6766 9.75 10.5766L0.388888 2.15156C0.129629 1.91823 -4.48042e-07 1.62656 -4.65041e-07 1.27656C-4.8204e-07 0.926562 0.138888 0.626563 0.416666 0.376563C0.694444 0.126563 1.01852 0.00156303 1.38889 0.00156302C1.75926 0.001563 2.08333 0.126563 2.36111 0.376563L10.5278 7.72656L18.6944 0.376562C18.9537 0.143229 19.273 0.0265619 19.6522 0.0265619C20.0322 0.0265619 20.3611 0.151562 20.6389 0.401562C20.9167 0.651562 21.0556 0.943229 21.0556 1.27656C21.0556 1.60989 20.9167 1.90156 20.6389 2.15156Z"
                      fill="#8297BD"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {showModal ? (
              <>
                <div className="mt-10 fixed z-50 outline-none focus:outline-none w-full">
                  <div className="w-auto mx-5">
                    <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-[#3B226F] outline-none focus:outline-none">
                      <div className="flex items-start justify-end mt-5 mr-8">
                        <p
                          className="text-white"
                          onClick={() => setShowModal((prev) => !prev)}
                        >
                          {" "}
                          X{" "}
                        </p>
                      </div>
                      <div id="filter">
                        <div className="flex justify-center pt-0 m-auto w-[90%]">
                          <div
                            className="w-[50%] text-center cursor-pointer"
                            onClick={() => setTabState("filter")}
                          >
                            Filter
                            <p
                              className={
                                tabState === "filter"
                                  ? "border-amber-400 capitalize text-amber-400 border-b-4 text-[13px] md:text-[14px]"
                                  : "border-gray-400 border-b-4 text-white capitalize text-[13px] md:text-[14px]"
                              }
                            ></p>
                          </div>
                        </div>

                        <div className="relative flex-auto">
                          {/* <div className="flex mx-10 h-60 md:h-auto mb-4 gap-0 md:gap-0 justify-between"> */}
                          <div
                            className={
                              tabState === "filter"
                                ? "flex-column mx-10 mb-4 gap-0 md:gap-0 justify-between"
                                : "flex mx-10 h-60 mb-4 gap-0 md:gap-0 justify-between"
                            }
                          >
                            {tabState === "filter" ? (
                              filterheaders.map((filterType, index) => {
                                return (
                                  <div
                                    className="mt-7 mr-5"
                                    key={"filtertop" + index}
                                  >
                                    <div>
                                      <div
                                        onClick={() =>
                                          setShowDropDown(
                                            index === showDropDown ? "" : index,
                                          )
                                        }
                                        className={`capitalize w-64 p-4 border rounded-md border-blue bg-transparent text-sm font-medium leading-none 
                                              text-white flex items-center justify-between cursor-pointer ${
                                                showDropDown === index
                                                  ? "rounded-bl-none rounded-br-none border-b-0"
                                                  : ""
                                              }`}
                                      >
                                        {
                                          filterHeaders[filterType][
                                            "displayTitle"
                                          ]
                                        }
                                        <div>
                                          {showDropDown === index ? (
                                            <div>
                                              <svg
                                                width="8"
                                                height="14"
                                                viewBox="0 0 11 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M2.14961 1.36111L10.5746 10.6944C10.6746 10.8056 10.7453 10.9259 10.7866 11.0556C10.8286 11.1852 10.8496 11.3241 10.8496 11.4722C10.8496 11.6204 10.8286 11.7593 10.7866 11.8889C10.7453 12.0185 10.6746 12.1389 10.5746 12.25L2.14961 21.6111C1.91628 21.8704 1.62461 22 1.27461 22C0.924609 22 0.62461 21.8611 0.37461 21.5833C0.12461 21.3056 -0.000390137 20.9815 -0.000390168 20.6111C-0.000390199 20.2407 0.12461 19.9167 0.37461 19.6389L7.72461 11.4722L0.374608 3.30555C0.141275 3.0463 0.024608 2.72704 0.0246079 2.34778C0.0246079 1.96778 0.149608 1.63889 0.399608 1.36111C0.649608 1.08333 0.941275 0.944444 1.27461 0.944444C1.60794 0.944444 1.89961 1.08333 2.14961 1.36111Z"
                                                  fill="#8297BD"
                                                />
                                              </svg>
                                            </div>
                                          ) : (
                                            <div>
                                              <svg
                                                width="14"
                                                height="8"
                                                viewBox="0 0 22 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M20.6389 2.15156L11.3056 10.5766C11.1944 10.6766 11.0741 10.7472 10.9444 10.7886C10.8148 10.8306 10.6759 10.8516 10.5278 10.8516C10.3796 10.8516 10.2407 10.8306 10.1111 10.7886C9.98148 10.7472 9.86111 10.6766 9.75 10.5766L0.388888 2.15156C0.129629 1.91823 -4.48042e-07 1.62656 -4.65041e-07 1.27656C-4.8204e-07 0.926562 0.138888 0.626563 0.416666 0.376563C0.694444 0.126563 1.01852 0.00156303 1.38889 0.00156302C1.75926 0.001563 2.08333 0.126563 2.36111 0.376563L10.5278 7.72656L18.6944 0.376562C18.9537 0.143229 19.273 0.0265619 19.6522 0.0265619C20.0322 0.0265619 20.3611 0.151562 20.6389 0.401562C20.9167 0.651562 21.0556 0.943229 21.0556 1.27656C21.0556 1.60989 20.9167 1.90156 20.6389 2.15156Z"
                                                  fill="#8297BD"
                                                />
                                              </svg>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      {showDropDown === index && (
                                        <>
                                          <div className="w-64 bg-transparent border-r border-b border-l rounded-bl rounded-br border-blue">
                                            {Object.values(
                                              filterDropdowns[
                                                Object.keys(
                                                  filterDropdowns,
                                                ).find((key) => {
                                                  return (
                                                    key.toLowerCase() ===
                                                    filterType.toLowerCase()
                                                  );
                                                })
                                              ],
                                            ).map((val) => {
                                              return (
                                                <>
                                                  {filterType === "category" ? (
                                                    <div
                                                      key={val.label}
                                                      className={`cb-row ${
                                                        selectedValues.includes(
                                                          val.label,
                                                        )
                                                          ? "bg-[#5E32FF] text-nyx-yellow"
                                                          : "text-white"
                                                      } hover:font-medium p-2 pl-4 flex items-center`}
                                                    >
                                                      <div className="rounded-md bg-transparent flex flex-shrink-0 justify-center items-center relative">
                                                        <input
                                                          className="w-[15px] h-[15px] accent-yellow-500 border-2"
                                                          type="checkbox"
                                                          onChange={() =>
                                                            handleCheckboxChange(
                                                              filterType,
                                                              val.label,
                                                            )
                                                          }
                                                          id={val.label}
                                                          name={filterType}
                                                          value={val.label}
                                                          checked={selectedValues.includes(
                                                            val.label,
                                                          )}
                                                        />
                                                      </div>
                                                      <label
                                                        htmlFor={val.label}
                                                        className="w-60 cursor-pointer text-sm leading-normal ml-2"
                                                      >
                                                        {val.label}
                                                      </label>
                                                    </div>
                                                  ) : (
                                                    <>
                                                      <ul className="">
                                                        <span
                                                          onClick={() =>
                                                            handleCheckboxChange(
                                                              filterType,
                                                              val.label,
                                                            )
                                                          }
                                                          // className={`cursor-pointer pl-4 text-white block hover:bg-[#5E32FF] hover:font-bold md:hover:text-nyx-yellow text-sm pr-4 py-2`}
                                                          className={`cursor-pointer pl-4 ${
                                                            selectedSortVal ===
                                                            val.label
                                                              ? "bg-[#5E32FF] text-nyx-yellow"
                                                              : "text-white"
                                                          } text-sm  block hover:bg-[#5E32FF]  md:hover:text-nyx-yellow pr-4 py-2`}
                                                        >
                                                          {" "}
                                                          {val.label}
                                                        </span>{" "}
                                                      </ul>
                                                    </>
                                                  )}
                                                </>
                                              );
                                            })}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="flex w-64 ml-5 pt-8 pb-4">
                                <div className="font-light justify-center items-center">
                                  {/* <div className="group-hover:block absolute z-10 w-60 right-0 ml-2 bg-[#091234]"> */}
                                  <ul>
                                    {sortList.map((list, index) => (
                                      <SortList
                                        key={`look` + index + list.value}
                                        data={list}
                                      />
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
              </>
            ) : null}
            <section className="bg-nyx-blue-3 p-5 text-white rounded-lg justify-center pb-5 mt-2">
              {/* <div className="flex items-center justify-between">
      </div> */}
              <div className="flex gap-7">
                <div className="hidden md:flex gap-0 md:gap-0 justify-between">
                  <div className="flex my-1 flex-col text-white overflow-y-auto md:overflow-y-visible h-96 md:h-auto lg:block">
                    <p className="hidden md:block mt-4 text-[15px] justify-end">
                      FILTERS
                    </p>
                    {filterheaders.map((filterType, index) => {
                      return (
                        <div className="mt-7 mr-5" key={"filter" + index}>
                          <div>
                            <div
                              onClick={() =>
                                setShowDropDown(
                                  index === showDropDown ? "" : index,
                                )
                              }
                              className={`capitalize w-64 p-4 border rounded-md border-blue bg-transparent text-sm font-medium leading-none 
                    text-white flex items-center justify-between cursor-pointer ${
                      showDropDown === index
                        ? "rounded-bl-none rounded-br-none border-b-0"
                        : ""
                    }`}
                            >
                              {filterHeaders[filterType]["displayTitle"]}
                              <div>
                                {showDropDown === index ? (
                                  <div>
                                    <svg
                                      width="8"
                                      height="14"
                                      viewBox="0 0 11 22"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2.14961 1.36111L10.5746 10.6944C10.6746 10.8056 10.7453 10.9259 10.7866 11.0556C10.8286 11.1852 10.8496 11.3241 10.8496 11.4722C10.8496 11.6204 10.8286 11.7593 10.7866 11.8889C10.7453 12.0185 10.6746 12.1389 10.5746 12.25L2.14961 21.6111C1.91628 21.8704 1.62461 22 1.27461 22C0.924609 22 0.62461 21.8611 0.37461 21.5833C0.12461 21.3056 -0.000390137 20.9815 -0.000390168 20.6111C-0.000390199 20.2407 0.12461 19.9167 0.37461 19.6389L7.72461 11.4722L0.374608 3.30555C0.141275 3.0463 0.024608 2.72704 0.0246079 2.34778C0.0246079 1.96778 0.149608 1.63889 0.399608 1.36111C0.649608 1.08333 0.941275 0.944444 1.27461 0.944444C1.60794 0.944444 1.89961 1.08333 2.14961 1.36111Z"
                                        fill="#8297BD"
                                      />
                                    </svg>
                                  </div>
                                ) : (
                                  <div>
                                    <svg
                                      width="14"
                                      height="8"
                                      viewBox="0 0 22 11"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.6389 2.15156L11.3056 10.5766C11.1944 10.6766 11.0741 10.7472 10.9444 10.7886C10.8148 10.8306 10.6759 10.8516 10.5278 10.8516C10.3796 10.8516 10.2407 10.8306 10.1111 10.7886C9.98148 10.7472 9.86111 10.6766 9.75 10.5766L0.388888 2.15156C0.129629 1.91823 -4.48042e-07 1.62656 -4.65041e-07 1.27656C-4.8204e-07 0.926562 0.138888 0.626563 0.416666 0.376563C0.694444 0.126563 1.01852 0.00156303 1.38889 0.00156302C1.75926 0.001563 2.08333 0.126563 2.36111 0.376563L10.5278 7.72656L18.6944 0.376562C18.9537 0.143229 19.273 0.0265619 19.6522 0.0265619C20.0322 0.0265619 20.3611 0.151562 20.6389 0.401562C20.9167 0.651562 21.0556 0.943229 21.0556 1.27656C21.0556 1.60989 20.9167 1.90156 20.6389 2.15156Z"
                                        fill="#8297BD"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </div>
                            {showDropDown === index && (
                              <>
                                <div className="w-64 bg-transparent border-r border-b border-l rounded-bl rounded-br border-blue">
                                  {Object.values(
                                    filterDropdowns[
                                      Object.keys(filterDropdowns).find(
                                        (key) => {
                                          return (
                                            key.toLowerCase() ===
                                            filterType.toLowerCase()
                                          );
                                        },
                                      )
                                    ],
                                  ).map((val) => {
                                    return (
                                      <>
                                        {filterType === "category" ? (
                                          <div
                                            key={val.label}
                                            className={`cb-row ${
                                              selectedValues.includes(val.label)
                                                ? "bg-[#5E32FF] text-nyx-yellow"
                                                : "text-white"
                                            } hover:font-medium p-2 pl-4 flex items-center`}
                                          >
                                            <div className="rounded-md bg-transparent flex flex-shrink-0 justify-center items-center relative">
                                              <input
                                                className="w-[15px] h-[15px] accent-yellow-500 border-2"
                                                type="checkbox"
                                                onChange={() =>
                                                  handleCheckboxChange(
                                                    filterType,
                                                    val.label,
                                                  )
                                                }
                                                id={val.label}
                                                name={filterType}
                                                value={val.label}
                                                checked={selectedValues.includes(
                                                  val.label,
                                                )}
                                              />
                                            </div>
                                            <label
                                              htmlFor={val.label}
                                              className="w-60 cursor-pointer text-sm leading-normal ml-2"
                                            >
                                              {val.label}
                                            </label>
                                          </div>
                                        ) : (
                                          <>
                                            <ul className="">
                                              <span
                                                onClick={() =>
                                                  handleCheckboxChange(
                                                    filterType,
                                                    val.label,
                                                  )
                                                }
                                                // className={`cursor-pointer pl-4 text-white block hover:bg-[#5E32FF] hover:font-bold md:hover:text-nyx-yellow text-sm pr-4 py-2`}
                                                className={`cursor-pointer pl-4 ${
                                                  selectedSortVal === val.label
                                                    ? "bg-[#5E32FF] text-nyx-yellow"
                                                    : "text-white"
                                                } text-sm  block hover:bg-[#5E32FF]  md:hover:text-nyx-yellow pr-4 py-2`}
                                              >
                                                {" "}
                                                {val.label}
                                              </span>{" "}
                                            </ul>
                                          </>
                                        )}
                                      </>
                                    );
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex justify-center flex-col items-center">
                      <div className="mt-8 text-[14px] mb-2 flex w-full justify-between">
                        <div className="text-left">Price</div>
                        <div className="text-right mr-6">
                          {values[0]} - {values[1]}
                        </div>
                      </div>
                      <Range
                        step={100}
                        min={1}
                        max={15000}
                        values={values}
                        onChange={handleChange}
                        renderTrack={({ props, children }) => (
                          <div
                            {...props}
                            style={{
                              ...props.style,
                              height: "11px",
                              width: "95%",
                              borderRadius: "2px",
                              backgroundColor: "#8297BD",
                            }}
                          >
                            {children}
                          </div>
                        )}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            style={{
                              ...props.style,
                              height: "20px",
                              width: "20px",
                              borderRadius: "2px",
                              backgroundColor: "#FFCB54",
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:px-0 h-[100%]">
                  <div className="flex w-full items-center justify-between">
                    <h2 className="text-center py-2 text-3xl font-bold">
                      Unlock Your Music&apos;s Potential with Expertise
                    </h2>
                    {/* <Sort /> */}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-2 mb-10 max-w-7xl mx-auto">
                    {data?.map((item) => (
                      <Card
                        item={item}
                        setThankyouModal={setThankyouModal}
                        key={item.name}
                      />
                    ))}

                    {!data?.length && !isLoading ? (
                      <p className="m-8">There is no expert.</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
            {thankyouModal ? (
              <Modal
                isOpen={thankyouModal}
                style={defaultStyle}
                ariaHideApp={false}
                contentLabel=""
                onRequestClose={onLastClose}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
              >
                <button
                  className="px-2 py-1 absolute top-2 right-2"
                  onClick={onLastClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M0.35 13.65C0.583333 13.8833 0.855555 14 1.16667 14C1.47778 14 1.75 13.8833 1.98333 13.65L7 8.63333L12.0556 13.6889C12.263 13.8963 12.5287 13.9935 12.8528 13.9806C13.1769 13.9676 13.4426 13.8574 13.65 13.65C13.8833 13.4167 14 13.1444 14 12.8333C14 12.5222 13.8833 12.25 13.65 12.0167L8.63333 7L13.6889 1.94444C13.8963 1.73704 13.9935 1.4713 13.9806 1.14722C13.9676 0.823148 13.8574 0.557407 13.65 0.35C13.4167 0.116667 13.1444 0 12.8333 0C12.5222 0 12.25 0.116667 12.0167 0.35L7 5.36667L1.94444 0.311111C1.73704 0.103703 1.4713 0.00648092 1.14722 0.0194439C0.823148 0.0324068 0.557407 0.142593 0.35 0.35C0.116667 0.583333 0 0.855555 0 1.16667C0 1.47778 0.116667 1.75 0.35 1.98333L5.36667 7L0.311111 12.0556C0.103703 12.263 0.00648092 12.5287 0.0194439 12.8528C0.0324068 13.1769 0.142593 13.4426 0.35 13.65Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <p className="text-white flex justify-center items-center h-full text-center">
                  Your request has been submitted. Thank you for Schedule a call
                  .Someone from the team will reach out to you shortly.
                </p>
              </Modal>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

const ExpertSuspense = () => (
  <Suspense>
    <Experts />
  </Suspense>
);

export default ExpertSuspense;
