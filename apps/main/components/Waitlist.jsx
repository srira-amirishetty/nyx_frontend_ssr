"use client"

import { useForm } from 'react-hook-form';
import Modal from "react-modal";
import { waitListModal } from "@nyx-frontend/main/utils/modalstyles";
import CountUp from "react-countup";
import Select from "react-select";
import {
  joinWaitlistPopUpStyles,
  joinWaitlistPopUpCountryStyles,
} from "@nyx-frontend/main/utils/productStyle";
import { joinWaitlist } from "@nyx-frontend/main/services/joinWaitlist";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema } from "./WaitlistSchema";
import { toast } from "react-toastify";

const options = [
  { value: "All", label: "All" },
  { value: "Imagecraft AI", label: "Imagecraft AI" },
  { value: "VideoVista AI", label: "VideoVista AI" },
  { value: "Sonic AI", label: "Sonic AI" },
  { value: "LyricGenius AI", label: "LyricGenius AI" },
];

const Waitlist = ({ onClose, isPopupOpen }) => {
  const [select, setSelect] = useState([]);
  const [countryCode, setCountryCode] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(waitlistSchema),
  });

  // const countQuery = useQuery({
  //   queryKey: ["count-query"],
  //   queryFn: async () => {
  //     const res = await fetch("/api/counts").then((res) => res.json());
  //     console.log(res.counts);
  //     return res.counts;
  //   },
  // });

  const { data: countries, isSuccess } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=idd,cca2",
      );
      return res.data;
    },
  });

  const countriesOptions = countries?.map((country) => ({
    value: country.idd.root + country.idd.suffixes.join(""),
    label: country.cca2,
  }));

  const mutateJoinWaitlist = useMutation({
    mutationKey: ["join-waitlist"],
    mutationFn: joinWaitlist,
  });

  const onSubmit = (data) => {
    console.log("Data", countryCode);
    const dataWaitlist = {
      email: data.email,
      name: data.firstName,
      country_code: countryCode.value,
      phone: data.phone,
      products_to_explore: select.value,
    };
    mutateJoinWaitlist.mutate(dataWaitlist, {
      onSuccess: async (response) => {
        console.log("dfsdfsd", response);
        onClose(false);
      },

      onError: (errorResponse) => {
        toast.error("Repeated data not allowed");
        console.log(errorResponse);
      },
    });
  };

  const selectOnChangeHandler = (option) => {
    setSelect([...select, option]);
  };
  const countrySelectOnChangeHandler = (option) => {
    setCountryCode(option);
  };

  useEffect(() => {
    if (isSuccess) {
      setCountryCode(countriesOptions.find((option) => option.label === "IN"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      {isPopupOpen ? (
        <Modal
          isOpen={isPopupOpen}
          style={waitListModal}
          onRequestClose={onClose}
          ariaHideApp={false}
        >
          <div className="w-[320px] h-[509px] md:w-[682px] md:h-[417px] rounded-[8.96px] md:rounded-[20.74px]">
            <div className="flex items-end justify-end md:pt-[10px] mr-[30px] ">
              <button onClick={onClose}>
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
              </button>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h3 className="text-[14px] md:text-[18px] font-semibold">
                Join our Waitlist
              </h3>
              <h2 className="text-[12px] md:text-[12px] font-normal mt-1 mb-[20px] md:mt-2 md:mb-[20.74px]">
                Submit and avail exciting joining benefits
              </h2>
            </div>

            <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
              {/* first and phone start*/}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                <div className="md:mb-6 relative">
                  <label
                    htmlFor="firstName"
                    className="flex mb-[8px] md:mb-[12px] text-[12px] font-semibold"
                  >
                    Name <span className="flex ml-1 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    {...register("firstName", { required: true })}
                    className="text-[12px] w-[260px] h-[42px] md:w-[274px] md:h-[41px] border-[#FFEAEA16] rounded-lg px-4 bg-[#ECECEC16] focus:outline-none autofill"
                  />
                  {errors.firstName && (
                    <p className="text-[12px] mt-1 absolute -bottom-5 text-red-500">
                      Please fill the name.
                    </p>
                  )}
                </div>
                {/* first and last name end*/}

                {/* phone start*/}
                <div className="mb-4 md:mb-6 relative">
                  <label
                    htmlFor="phone"
                    className="flex mb-[8px] md:mb-[12px] text-[12px] font-semibold"
                  >
                    Phone Number{" "}
                    <span className="flex ml-1 text-red-500">*</span>
                  </label>
                  <div className="flex flex-row">
                    <Select
                      options={countriesOptions}
                      defaultValue={countriesOptions?.find(
                        (option) => option.label === "IN",
                      )}
                      styles={joinWaitlistPopUpCountryStyles}
                      className="text-[12px] w-[70px] h-[42px] md:w-[74px] md:h-[41px] rounded-tl-lg rounded-bl-lg  bg-[#ECECEC16] focus:outline-none"
                      onChange={countrySelectOnChangeHandler}
                    />
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Phone number"
                      {...register("phone", { required: true })}
                      className="text-[12px] flex w-[196px] h-[42px] md:w-[264px] md:h-[41px] pl-5 rounded-tr-lg rounded-br-lg bg-[#ECECEC16] focus:outline-none autofill"
                    />{" "}
                  </div>
                  {errors.phone && (
                    <p className="text-[12px] mt-1 absolute -bottom-5 text-red-500">
                      {errors.phone?.message}
                    </p>
                  )}
                </div>
                {/* phone end*/}
              </div>
              {/* first and phone end*/}

              {/* email and product start*/}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="md:mb-4 relative">
                  <label
                    htmlFor="email"
                    className="flex mb-[8px] md:mb-[12px] text-[12px] font-semibold"
                  >
                    Email <span className="flex ml-1 text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="John.smith@acme.com"
                    {...register("email", { required: true })}
                    className="text-[12px] w-[260px] h-[42px] md:w-[274px] md:h-[41px] border-[#FFEAEA16] rounded-lg px-4 bg-[#ECECEC16] focus:outline-none autofill"
                  />
                  {errors.email && (
                    <p className="text-[12px] mt-1 absolute -bottom-5 text-red-500">
                      Please fill the email.
                    </p>
                  )}
                </div>
                {/* email end*/}

                {/* products start*/}
                <div className="mb-4 ml-2 md:ml-0">
                  <label
                    htmlFor="products"
                    className="flex mb-[8px] md:mb-[12px] text-[12px] font-semibold"
                  >
                    Which product(s) would you like to explore
                  </label>

                  <Select
                    options={options}
                    styles={joinWaitlistPopUpStyles}
                    className="text-[12px] w-[260px] h-[42px] md:w-[338px] md:h-[42px] 
                    border-[#FFEAEA16] rounded-lg  bg-[#ECECEC16] focus:outline-none"
                    placeholder="Please select Product"
                    onChange={selectOnChangeHandler}
                  />
                </div>
                {/* products end*/}
              </div>

              <div className="flex flex-col items-center justify-center">
                <div
                  className="flex justify-center -ml-[80px] md:ml-0 w-full 
                mt-1 md:mt-2 mb-2 md:mb-[10px]"
                >
                  <p className="text-[11.67px] font-normal">
                    Your waitlist number is
                    <span className="text-[18px]  font-semibold ml-2">
                      <CountUp
                        start={7934}
                        // end={5534 + Number(countQuery.data)}
                        end={8244}
                        duration={3.75}
                      ></CountUp>
                    </span>
                  </p>
                </div>
                <div className="mb-6">
                  <button
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    className="mt-[10px] w-[110px] h-[32px] md:w-[196px] md:h-[52px] rounded-[62px] bg-gradient-to-r from-[#B631B1] to-[#7048D7]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Waitlist;
