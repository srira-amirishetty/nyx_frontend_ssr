"use client"
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaChevronRight } from "react-icons/fa";

function Accordion({ data, length }) {
  const [faqActive, setFaqActive] = useState(-1);

  let activeFaq = (index) => {
    if (index === faqActive) {
      setFaqActive(-1);
    } else {
      setFaqActive(index);
    }
  };

  return (
    <>
      {/* <div className="md:hidden mt-8 gap-4 flex-col">
        {data?.slice(0, length).map((val, index) => (
          <div key={index} data-accordion="collapse" className="mt-4 border border-white rounded-xl">
            <h2
              id="accordion-collapse-heading-1"
              className={`${index === faqActive ? "z-10" : "z-1"}`}
            >
              <div
                onClick={() => activeFaq(index)}
                className={`${
                  index === faqActive ? "border border-white" : ""
                } hover:border-white items-center justify-between w-full p-3 font-medium text-sm text-left text-white bg-black rounded-xl focus:ring-4`}
              >
                <div className="p-2 cursor-pointer flex items-center justify-between">
                  <span>
                    Q{index + 1}. {val.question}
                  </span>

                  {index === faqActive ? (
                    <FaChevronUp className="text-stone-50" />
                  ) : (
                    <FaChevronDown className="text-stone-50" />
                  )}
                </div>
                {index === faqActive && (
                  <div className={index === faqActive ? "" : "hidden"}>
                    <div className="font-light p-5">
                      <p className="mb-2 dark:text-gray-300">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: val.answer,
                          }}
                        />
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </h2>
          </div>
        ))}
      </div> */}
      <div className="mt-8 flex flex-wrap md:flex-nowrap">
        <div className="w-full mb-4 md:mb-0 md:mr-4">
          {data?.slice(0, length).map(
            (val, index) =>
              index % 2 === 0 && (
                <div
                  key={index}
                  data-accordion="collapse"
                  className="mt-4 border border-white rounded-xl"
                >
                  <h2
                    id="accordion-collapse-heading-1"
                    className={`${index === faqActive ? "z-10" : "z-1"}`}
                  >
                    <div
                      onClick={() => activeFaq(index)}
                      className={`${
                        index === faqActive ? "border border-white" : ""
                      } hover:border-white items-center justify-between w-full p-3 font-light text-left text-white bg-black rounded-xl focus:ring-4`}
                    >
                      <div className="p-2 cursor-pointer flex items-center justify-between">
                        <span>
                          Q{index + 1}. {val.question}
                        </span>

                        {index === faqActive ? (
                          <FaChevronUp className="text-stone-50" />
                        ) : (
                          <FaChevronDown className="text-stone-50" />
                        )}
                      </div>
                      {index === faqActive && (
                        <div className={index === faqActive ? "" : "hidden"}>
                          <div className="font-light p-5">
                            <div className="mb-2 dark:text-gray-300">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.answer,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </h2>
                </div>
              )
          )}
        </div>

        <div className="w-full">
          {data?.slice(0, length).map(
            (val, index) =>
              index % 2 != 0 && (
                <div
                  key={index}
                  data-accordion="collapse"
                  className="mt-4 border border-white rounded-xl"
                >
                  <h2
                    id="accordion-collapse-heading-1"
                    className={`${index === faqActive ? "z-10" : "z-1"}`}
                  >
                    <div
                      onClick={() => activeFaq(index)}
                      className={`${
                        index === faqActive ? "border border-white" : ""
                      } hover:border-white items-center justify-between w-full p-3 font-light text-left text-white bg-black rounded-xl focus:ring-4`}
                    >
                      <div className="p-2 cursor-pointer flex items-center justify-between">
                        <span>
                          Q{index + 1}. {val.question}
                        </span>
                        {index === faqActive ? (
                          <FaChevronUp className="text-stone-50" />
                        ) : (
                          <FaChevronDown className="text-stone-50" />
                        )}
                      </div>
                      {index === faqActive && (
                        <div className={index === faqActive ? "" : "hidden"}>
                          <div className="font-light p-5">
                            <p className="mb-2 dark:text-gray-300">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: val.answer,
                                }}
                              />
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </h2>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}

export default Accordion;
