"use client";
import React, { useContext, useEffect, useState } from "react";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { FILTER_HEADERS } from "@nyx-frontend/main/utils/utils";
import { Range } from "react-range";

function CardFilters({ data }) {
  const { sort, filters, setFilters, filterParam, setFilterParam } =
    useContext(UseContextData);

  const [showDropDown, setShowDropDown] = useState("");
  const [values, setValues] = useState([1, 5000]);
  const [finalValues, setFinalValues] = useState([]);

  useEffect(() => {
    if (filterParam === "?" || filterParam === "") {
      let obj = {};
      FILTER_HEADERS.map((header) => {
        obj[header] = [];
      });
      obj.pricefrom = "";
      obj.priceto = "";
      obj.sort = "";
      setFilters({ ...obj });
    } else {
      setFilters({ ...filters });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sort && sort.length != 0) {
      filters.sort = sort;
      setFilters({ ...filters });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    if (finalValues && finalValues.length != 0) {
      filters.pricefrom = finalValues[0];
      filters.priceto = finalValues[1];
      setFilters({ ...filters });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalValues]);

  useEffect(() => {
    let params = "?";

    if (filters && Object.keys(filters).length != 0) {
      if (filters.category.length) {
        if (params != "?") params += "&";
        params += `${filters.category
          .map((category) => `category=${encodeURIComponent(category)}`)
          .join("&")}`;
      }
      if (filters.language.length) {
        if (params != "?") params += "&";
        params += `${filters.language
          .map((language) => `language=${encodeURIComponent(language)}`)
          .join("&")}`;
      }
      if (filters.type.length) {
        if (params != "?") params += "&";
        params += `${filters.type
          .map((type) => `type=${encodeURIComponent(type)}`)
          .join("&")}`;
      }
      if (filters.availability.length) {
        if (params != "?") params += "&";
        params += `${filters.availability
          .map(
            (availability) => `availability=${encodeURIComponent(availability)}`
          )
          .join("&")}`;
      }
      if (filters.artist.length) {
        if (params != "?") params += "&";
        params += `${filters.artist
          .map((artist) => `artist=${encodeURIComponent(artist)}`)
          .join("&")}`;
      }
      if (filters.genre.length) {
        if (params != "?") params += "&";
        params += `${filters.genre
          .map((genre) => `genre=${encodeURIComponent(genre)}`)
          .join("&")}`;
      }
      if (filters.pricefrom) {
        if (params != "?") params += "&";
        params += `pricefrom=${filters.pricefrom}&priceto=${filters.priceto}`;
      }
      if (filters.sort) {
        if (params != "?") params += "&";
        params += `sort=${filters.sort}`;
      }

      // if (params === "?") params = "";
    }

    setFilterParam(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleChange = (value) => {
    setValues(value);
  };

  const handleFinalChange = (value) => {
    setFinalValues(value);
  };

  const constructUrl = (items, header, event) => {
    if (event.target.checked) {
      filters[header].push(items);
    } else {
      filters[header] = filters[header].filter((x) => x != items);
    }

    setFilters({ ...filters });
  };

  return (
    <>
      <div className="flex my-1 flex-col text-white overflow-y-auto md:overflow-y-visible h-96 md:h-auto lg:block ">
        {FILTER_HEADERS.map((header, index) => {
          return (
            data &&
            data.length != 0 && (
              // <div className='mt-7 border-b border-gray-400'>
              //   <p className='ml-4'>{header}</p>
              //   {Object.values(data[header]).map((val) => <div className='flex gap-1 p-3 justify-start'>

              //     <>
              //       <input onChange={(event) => constructUrl(val, header, event)} type="checkbox" id={header} name={header} value={val} />
              //       <p className='font-light'>{val}</p>
              //     </>
              //   </div>)}
              // </div>

              <div className="mt-7 mr-5">
                <div>
                  <div
                    onClick={() =>
                      setShowDropDown(index === showDropDown ? "" : index)
                    }
                    className={`capitalize w-64 p-4 border rounded-md border-blue bg-transparent text-sm font-medium leading-none 
                    text-white flex items-center justify-between cursor-pointer ${
                      showDropDown === index
                        ? "rounded-bl-none rounded-br-none border-b-0"
                        : ""
                    }`}
                  >
                    {header}
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
                          data[
                            Object.keys(data).find(
                              (key) =>
                                key.toLowerCase() === header.toLowerCase()
                            )
                          ]
                        ).map((val) => (
                          <div
                            key={val}
                            className="cb-row hover:text-black hover:font-medium hover:bg-[#8297BD] font-light p-2 pl-4 flex items-center"
                          >
                            <div className="rounded-md bg-transparent flex flex-shrink-0 justify-center items-center relative">
                              <input
                                className="w-[15px] h-[15px]"
                                onChange={(event) =>
                                  constructUrl(val, header, event)
                                }
                                type="checkbox"
                                id={val}
                                name={header}
                                value={val}
                                checked={filters[header]?.includes(val)}
                              />
                            </div>
                            <label
                              htmlFor={val}
                              className="w-60 cursor-pointer text-sm leading-normal ml-2"
                            >
                              {val}
                            </label>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          );
        })}
        <div>
          <div className="mt-8 text-[14px] flex justify-between">
            <div className="text-left">Price</div>
            <div className="text-right mr-6">
              {values[0]} - {values[1]}
            </div>
          </div>

          <div className="mt-6 w-[92%]">
            <Range
              step={10}
              min={1}
              max={5000}
              values={values}
              onChange={handleChange}
              onFinalChange={handleFinalChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "11px",
                    width: "100%",
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
    </>
  );
}

export default CardFilters;
