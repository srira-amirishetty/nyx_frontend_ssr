/* eslint-disable react/jsx-key */
"use client";
import { useContext, useEffect, useState } from "react";
import {
  ARTIST_ONBOARDING_TABS,
  BASEURL,
  EDIT_ARTISTS,
  LANGUAGE,
  SELECT_GENRE,
  SELECT_OPTION_CATEGORY,
} from "../utils/utils";
import { MODAL_CONFIG } from "../utils/modalstyles";
import { TabsMain } from "@nyx-frontend/main/shared/inputs";
import { useForm } from "react-hook-form";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";

import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { useRouter } from "next/navigation";
function ArtistOnboarding() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [artistTab, setArtistTab] = useState(0);
  const { post } = useRequests();
  const { type, setToastConfig } = useContext(UseContextData);
  const navigate = useRouter();
  useEffect(() => {
    document.body.classList.add("bg_auto_auth");

    return () => {
      document.body.classList.remove("bg_auto_auth");
    };
  }, []);

  const nextOnbordSection = () => {
    setArtistTab(1);
  };

  const prevOnbordSection = () => {
    setArtistTab(0);
  };

  const onSubmitFirst = async (data) => {
    const fieldsToValidate = [
      { name: "gender", label: "Gender" },
      { name: "language", label: "Language" },
      { name: "category", label: "Category" },
      { name: "genre", label: "Genre" },
      { name: "joiningPurpose", label: "Purpose of Joining" },
      { name: "industryExp", label: "Industry Experience" },
    ];
    const errors = [];
    // let valid=true;
    // for (let field of fieldsToValidate) {
    //     if (data[field.name] === field.label) {
    //         errors.push("error")
    //         setError(field.name, { type: 'custom', message: 'custom message' });
    //         valid=false
    //     }
    // }

    // if (errors.length ===0 && valid===true) {
    //     nextOnbordSection();
    // }
    nextOnbordSection();
  };

  const onSubmitFinal = async (data) => {
    for (let [key, value] of Object.entries(data)) {
      if (value === "") {
        data[key] = null;
      }
    }
    data.industryExp = parseInt(data.industryExp);
    let payload = {
      data: data,
    };

    const info = await post(
      BASEURL + EDIT_ARTISTS,
      payload,
      MODAL_CONFIG("loading"),
    );
    if (info.response === "Success") {
      navigate.push("/");
    }
  };

  return (
    <>
      <div className="w-[90%] mx-auto py-24">
        <div className="flex px-5 justify-between">
          <h3 className="text-white">Onboarding Form</h3>
          <p
            className="text-gray-300 cursor-pointer"
            onClick={() => navigate.push("/")}
          >
            Skip
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-16">
          <TabsMain
            data={ARTIST_ONBOARDING_TABS}
            tabState={setArtistTab}
            tabStatus={artistTab}
          />
        </div>

        <div className="max-w-5xl px-5 md:px-24 py-5 md:py-12 mx-auto">
          {artistTab === 0 && (
            <>
              <div className="flex gap-5">
                <div className="w-1/2 mb-8">
                  <input
                    {...register("name", {
                      required: true,
                    })}
                    type="text"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 rounded-md border-2"
                    placeholder="First Name*"
                  />
                  {errors.name && (
                    <p className="text-[12px] text-red-500 pt-1"> Enter Name</p>
                  )}
                </div>
                <div className="w-1/2 mb-8">
                  <input
                    type="text"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 rounded-md border-2"
                    placeholder="Last Name*"
                  />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-1/2 mb-8">
                  <select
                    {...register("gender", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 text-white rounded-md border-2"
                  >
                    <option hidden>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-[12px] text-red-500 pt-1">
                      {" "}
                      Enter gender
                    </p>
                  )}
                </div>

                <div className="w-1/2 mb-8">
                  <select
                    {...register("language", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 text-white rounded-md border-2"
                  >
                    {LANGUAGE.option.map((option) => (
                      <option hidden={option.hidden}>{option.name}</option>
                    ))}
                  </select>
                  {errors.language && (
                    <p className="text-[12px] text-red-500 pt-1">
                      {" "}
                      Enter Language
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-full mb-8">
                  <input
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      },
                      required: true,
                    })}
                    type="email"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 rounded-md border-2"
                    placeholder="Email*"
                  />
                  {errors.email && (
                    <p className="text-[12px] text-red-500 pt-1">
                      {" "}
                      Enter Email
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-full mb-8">
                  <select
                    {...register("category", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 text-white rounded-md border-2"
                  >
                    {SELECT_OPTION_CATEGORY.option.map((option) => (
                      <option hidden={option.hidden}>{option.name}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-[12px] text-red-500 pt-1">
                      {" "}
                      Enter Category
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-full mb-8">
                  <select
                    {...register("genre", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 text-white rounded-md border-2"
                  >
                    {SELECT_GENRE.option.map((option) => (
                      <option hidden={option.hidden}>{option.name}</option>
                    ))}
                  </select>
                  {errors.genre && (
                    <p className="text-[12px] text-red-500 pt-1">
                      {" "}
                      Select genre
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-1/2 mb-8">
                  <select
                    {...register("joiningPurpose", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 text-white rounded-md border-2"
                  >
                    <option hidden>Purpose of Joining</option>
                    <option>
                      Already have a song/share that i want to shareize
                    </option>
                    <option>
                      Looking for collaberation for content creation
                    </option>
                  </select>
                  {errors.joiningPurpose && (
                    <p className="text-[12px] text-red-500 pt-1">
                      {" "}
                      Select Joining purposes
                    </p>
                  )}
                </div>

                <div className="w-1/2 mb-8">
                  <select
                    {...register("industryExp", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 text-white rounded-md border-2"
                  >
                    <option>Industry Experience</option>
                    <option>{"< 1 yr"}</option>
                    <option>1-5 yrs</option>
                    <option>5 to 10 yrs</option>
                    <option>10 yrs ++ </option>
                  </select>
                  {errors.industryExp && (
                    <p className="text-[12px] text-red-500 pt-1">
                      {" "}
                      Select Industry Experience
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-full mb-8">
                  <textarea
                    {...register("bio", {
                      required: false,
                    })}
                    placeholder="Bio"
                    className="w-full h-52 pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 text-white rounded-md border-2"
                  />
                </div>
                {errors.bio && (
                  <p className="text-[12px] text-red-500 pt-1"> Enter Bio</p>
                )}
              </div>

              <div className="flex gap-5 justify-center">
                <button
                  onClick={handleSubmit(onSubmitFirst)}
                  className="block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
                >
                  {" "}
                  Next{" "}
                </button>
              </div>
            </>
          )}

          {artistTab === 1 && (
            <form>
              <div className="gap-5">
                <div className="w-full mb-8">
                  <input
                    {...register("youtubeLink", {
                      required: false,
                    })}
                    type="url"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 rounded-md border-2"
                    placeholder="Add Youtube Link"
                  />
                </div>

                <div className="w-full mb-8">
                  <input
                    defaultValue=""
                    {...register("jioSaavnLink", {
                      required: false,
                    })}
                    type="url"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 rounded-md border-2"
                    placeholder="Add Jio Saavn Link"
                  />
                </div>

                <div className="w-full mb-8">
                  <input
                    {...register("spotifyLink", {
                      required: false,
                    })}
                    type="url"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 rounded-md border-2"
                    placeholder="Add Spotify Link"
                  />
                </div>
              </div>

              <div className="gap-5">
                <div className="w-full mb-8">
                  <input
                    {...register("facebookLink", {
                      required: false,
                    })}
                    type="url"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 rounded-md border-2"
                    placeholder="Add Facebook Link"
                  />
                </div>
                <div className="w-full mb-8">
                  <input
                    {...register("instagramLink", {
                      required: false,
                    })}
                    type="url"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 rounded-md border-2"
                    placeholder="Add Instagram Link"
                  />
                </div>
                <div className="w-full mb-8">
                  <input
                    {...register("twitterLink", {
                      required: false,
                    })}
                    type="url"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-slate-700 border-slate-700 rounded-md border-2"
                    placeholder="Add Twitter Link"
                  />
                </div>
              </div>

              <div className="flex py-8 gap-5 justify-center">
                <button
                  onClick={() => prevOnbordSection()}
                  className="block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
                >
                  {" "}
                  Back{" "}
                </button>
                <button
                  onClick={handleSubmit(onSubmitFinal)}
                  className="block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
                >
                  {" "}
                  Submit{" "}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default ArtistOnboarding;
