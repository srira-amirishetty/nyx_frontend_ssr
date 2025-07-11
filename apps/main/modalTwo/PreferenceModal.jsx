"use client";
import { useContext, useEffect, useState } from "react";
import { TabsMain } from "@nyx-frontend/main/shared/inputs";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
const sell = IMAGE_URL + "/assets/images/artists/sell.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
function PreferenceModal({
  setEnableSubmitBtn,
  data,
  setSelected,
  selectedValues,
  titles,
  showModal,
  setModal,
  setTab,
  Tab,
}) {
  const unSelect = (item) => {
    setSelected((old) => {
      return old.filter((value, i) => value !== item);
    });
    setEnableSubmitBtn(true);
  };

  const updateSelectValues = (item) => {
    setSelected((old) => [...old, item]);
    setEnableSubmitBtn(true);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto md:w-1/3">
              <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-[#3B226F] outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-white text-md leading-none font-semibold"
                    onClick={() => setModal(false)}
                  >
                    X
                  </button>
                </div>
                <div className="relative p-10 flex-auto py-2 pb-8">
                  <div className="max-w-2xl mx-auto">
                    <TabsMain data={titles} tabState={setTab} tabStatus={Tab} />
                  </div>

                  {Tab === 0 ? (
                    <>
                      <div className="overflow-y-auto w-full mt-6">
                        <ul className="h-[20rem] mx-3">
                          {data?.map((item, index) => (
                            <li key={index} className="pb-3 sm:pb-4">
                              <div className="border rounded-md p-2 flex justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="flex-shrink-0">
                                    <img
                                      className="w-8 h-8 rounded-full"
                                      src={sell}
                                      alt="sell"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-300 truncate dark:text-white">
                                      {item}
                                    </p>
                                  </div>
                                </div>

                                {selectedValues.includes(item) ? (
                                  <button
                                    onClick={() => unSelect(item)}
                                    className="text-black text-sm bg-yellow-400 border border-blue rounded-md px-3 py-0.5 text-center"
                                  >
                                    Selected
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => updateSelectValues(item)}
                                    className="text-black text-sm bg-blue border border-blue rounded-md px-5 py-0.5 text-center"
                                  >
                                    Select
                                  </button>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="overflow-y-auto w-full mt-6">
                        <ul className="h-[20rem] mx-3">
                          {data?.map((item, index) => (
                            <li key={index} className="pb-3 sm:pb-4">
                              <div className="border rounded-md p-2 flex justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="flex-shrink-0">
                                    <img
                                      className="w-8 h-8 rounded-full"
                                      src={sell}
                                      alt="sell"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-300 truncate dark:text-white">
                                      {item}
                                    </p>
                                  </div>
                                </div>

                                {selectedValues.includes(item) ? (
                                  <button
                                    onClick={() => unSelect(item)}
                                    className="text-black text-sm bg-yellow-400 border border-blue rounded-md px-3 py-0.5 text-center"
                                  >
                                    Selected
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => updateSelectValues(item)}
                                    className="text-black text-sm bg-blue border border-blue rounded-md px-5 py-0.5 text-center"
                                  >
                                    Select
                                  </button>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default PreferenceModal;
