"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  ARTIST_ONBOARDING_TABS,
  BASEURL,
  CAT,
  EDIT_ARTISTS,
  GENDER,
  GENRES,
  IND_EXP,
  JOINING,
  LANGUAGES,
} from "@nyx-frontend/main/utils/utils";
import { MODAL_CONFIG_PROCESSING } from "@nyx-frontend/main/utils/modalstyles";
import { TabsMain } from "@nyx-frontend/main/shared/inputs";
import { useForm } from "react-hook-form";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { ONBOARD_TEXT_CARDS } from "@nyx-frontend/main/utils/globals";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { colourStylesOnboarding } from "@nyx-frontend/main/utils/productStyle";
import { useRouter } from "next/navigation";

import Content from "@nyx-frontend/main/components/content";
import TextGrid from "@nyx-frontend/main/components/TextGrid";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ArtistOnboardingNew() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [artistTab, setArtistTab] = useState(0);
  const { post } = useRequests();
  const { userDetails } = useContext(UseContextData);
  const [gender, setGender] = useState({ value: "", label: "" });
  const [category, setcategory] = useState({ value: "", label: "" });
  const [language, setLanguage] = useState<Array<{ value: string } | null>>([]);
  const [genre, setGenre] = useState<Array<{ value: string } | null>>([]);
  const [genreType, setGenreType] = useState<"songs" | "videos">("songs");
  const navigate = useRouter();
  const [indExp, setIndexExp] = useState({ value: "", label: "" });
  const [Joining, setJoining] = useState({ value: "", label: "" });
  const [prevVal, setPrevVal] = useState();
  const nextOnbordSection = () => {
    setArtistTab(1);
  };

  useEffect(() => {
    if (userDetails) {
      if (userDetails.gender != null) {
        setGender({ value: userDetails.gender, label: userDetails.gender });
      }
      if (userDetails.category != null) {
        setcategory({
          value: userDetails.category,
          label: userDetails.category,
        });
        if (
          ["Singer", "Music Composer", "Lyricist", "Composer"].includes(
            userDetails.category,
          )
        ) {
          setGenreType("songs");
        } else {
          setGenreType("videos");
        }
      }
      if (userDetails.industryExp != null) {
        setIndexExp({
          value: userDetails.industryExp,
          label: userDetails.industryExp,
        });
      }
      if (userDetails.joiningPurpose != null) {
        setJoining({
          value: userDetails.joiningPurpose,
          label: userDetails.joiningPurpose,
        });
      }

      setGenre(userDetails.genre == null ? [] : userDetails.genre);
      setLanguage(userDetails.language == null ? [] : userDetails.language);

      // prevVal.name=userDetails.name
      // prevVal.email=userDetails.email
      // prevVal.bio=userDetails.bio
      // prevVal.youtubeLink=userDetails.youtubeLink
      // prevVal.spotifyLink=userDetails.spotifyLink
      // prevVal.facebookLink=userDetails.facebookLink
      // prevVal.gender=userDetails.gender
      // prevVal.genre=userDetails.genre
      // prevVal.industryExp=userDetails.industryExp
      // prevVal.instagramLink=userDetails.instagramLink
      // prevVal.joiningPurpose=userDetails.joiningPurpose
      // prevVal.language=userDetails.language
      // prevVal.shortHighlight=userDetails.shortHighlight
      // prevVal.category=userDetails.category

      // setPrevVal(JSON.stringify(prevVal))
    }
  }, [userDetails]);

  const prevOnbordSection = () => {
    setArtistTab(0);
  };

  const onSubmitFirst = async (data: any) => {
    for (let [key, value] of Object.entries(data)) {
      if (value === "") {
        data[key] = null;
      }
    }

    data.gender = gender.value;
    data.category = category.value;
    data.language = language;
    data.industryExp = indExp.value;
    data.joiningPurpose = Joining.value;
    data.genre = genre;

    let payload = {
      data: data,
    };

    const res = await post(
      BASEURL + EDIT_ARTISTS,
      payload,
      MODAL_CONFIG_PROCESSING,
    );

    if (res.response == "Success") {
      toast.success("Details updated successfully");
      navigate.push("/profile/Settings");
    } else {
      toast.error(`Sorry, could not update your details`, {
        toastId: "maximum",
      });
    }
  };

  const onSubmitFinal = async (data: any) => {};

  const handleChangeGender = (event: any) => {
    setGender({ value: event.value, label: event.value });
  };

  const handleIndExp = (event: any) => {
    setIndexExp({ value: event.value, label: event.value });
  };

  const HanldlejoiningPurpose = (event: any) => {
    setJoining({ value: event.value, label: event.value });
  };

  const handleChangeCategory = (e: any) => {
    setcategory({ value: e.value, label: e.value });

    if (
      ["Singer", "Music Composer", "Lyricist", "Composer"].includes(e.value)
    ) {
      setGenreType("songs");
    } else {
      setGenreType("videos");
    }
  };

  const handleChangeLanguage = (e: any) => {
    setLanguage(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleChangeGenre = (e: any) => {
    setGenre(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  return (
    <>
      <div className="px-3 md:px-0 min-h-screen">
        <div className="absolute top-28 left:10 md:left-20 text-white text-[17px] font-600">
          Profile Details
        </div>
        <div className="absolute top-28 right-10 md:right-20">
          {/* <h3 className="text-white">Artist Details</h3> */}
          <div className="flex gap-5">
            <div>
              <div className="mb-1 text-sm text-white">
                {" "}
                {userDetails?.profileCompletion}% Complete
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                <div
                  className="h-1.5 rounded-full bg-orange-300"
                  style={{
                    width: `${userDetails?.profileCompletion}%`,
                  }}
                />
              </div>
            </div>
            <p
              className="text-gray-300 cursor-pointer font-light text-sm"
              onClick={() => navigate.push("/profile/Settings")}
            >
              (Skip)
            </p>
          </div>
        </div>
        <Content top="top-[10rem]">
          {Object.keys(userDetails).length != 0 && (
            <div className="w-[90%] mx-auto">
              <div className="">
                <div className="max-w-2xl mx-auto">
                  <TabsMain
                    data={ARTIST_ONBOARDING_TABS}
                    tabState={setArtistTab}
                    tabStatus={artistTab}
                  />
                </div>

                <div className="grid max-w-5xl grid-cols-2 md:grid-cols-4 gap-5 px-5 md:px-24 py-5 md:py-8 mx-auto">
                  <TextGrid data={ONBOARD_TEXT_CARDS} />
                </div>

                <div className=" font-light max-w-5xl px-5 md:px-24 py-5 md:py-8 mx-auto">
                  {artistTab === 0 && (
                    <>
                      <div className="flex-1 md:flex gap-5">
                        <div className="w-full md:w-1/2 mb-8">
                          <label className="block mb-2 text-sm font-medium text-slate-300">
                            Name
                          </label>
                          <input
                            defaultValue={userDetails.name}
                            {...register("name", {
                              required: false,
                            })}
                            type="text"
                            className="text-white w-full pl-5 pr-3 py-2.5 bg-transparent border-slate-700 rounded-md border-2"
                            placeholder="Full Name"
                          />
                          {errors.name && (
                            <p className="text-[12px] text-red-500 pt-1">
                              {" "}
                              Enter Name
                            </p>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 mb-8">
                          <label className="block mb-2 text-sm font-medium text-slate-300">
                            Email Id
                          </label>
                          <input
                            {...register("email", {
                              required: false,
                            })}
                            defaultValue={userDetails.email}
                            type="text"
                            className="text-white w-full pl-5 pr-3 py-2.5 bg-transparent border-slate-700 rounded-md border-2"
                            placeholder="Email Id"
                          />
                        </div>
                      </div>

                      <div className="flex-1 md:flex gap-5">
                        <div className="w-full md:w-1/2 mb-8">
                          <label className="block mb-2 text-sm font-medium text-slate-300">
                            Gender
                          </label>

                          <Select
                            options={GENDER}
                            onChange={handleChangeGender}
                            value={gender}
                            styles={colourStylesOnboarding}
                          ></Select>
                          {/* <select
                      defaultValue={userDetails?.gender}
                      {...register("gender", {
                        required: false,
                      })}
                      className="w-full pl-5 pr-3 py-2.5 bg-transparent border-slate-700 text-white rounded-md border-2"
                    >
                    
                      <option selected={userDetails?.gender=="Male"&& "selected"}>Male</option>
                      <option selected={userDetails?.gender=="Female"&& "selected"}>Female </option>
                      <option selected={userDetails?.gender=="Others"&& "Others"}>Others</option>
                    </select>
                    {errors.gender && (
                      <p className="text-[12px] text-red-500 pt-1">
                        {" "}
                        Enter Gender
                      </p>
                    )} */}
                        </div>
                        <div className="w-full md:w-1/2 mb-8">
                          <label className="block mb-2 text-sm font-medium text-slate-300">
                            Category
                          </label>
                          <Select
                            options={CAT}
                            onChange={handleChangeCategory}
                            value={category}
                            styles={colourStylesOnboarding}
                          ></Select>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="w-full mb-8">
                          <label className="block mb-2 text-sm font-medium text-slate-300">
                            Language
                          </label>
                          <Select
                            value={LANGUAGES.filter((obj: any) =>
                              language.includes(obj.value),
                            )}
                            options={LANGUAGES}
                            onChange={handleChangeLanguage}
                            isMulti
                            styles={colourStylesOnboarding}
                          ></Select>
                        </div>
                      </div>

                      <div className="flex-1 md:flex gap-5">
                        <div className="w-full md:w-1/2 mb-8">
                          <label className="block mb-2 text-sm font-medium text-slate-300">
                            Industry Experience
                          </label>
                          <Select
                            value={indExp}
                            options={IND_EXP}
                            onChange={handleIndExp}
                            styles={colourStylesOnboarding}
                          ></Select>
                        </div>
                        <div className="w-full md:w-1/2 mb-8">
                          <label className="block mb-2 text-sm font-medium text-slate-300">
                            Purpose of Joining
                          </label>
                          <Select
                            value={Joining}
                            options={JOINING}
                            onChange={HanldlejoiningPurpose}
                            styles={colourStylesOnboarding}
                          ></Select>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="w-full mb-8">
                          <label className="block mb-2 text-sm font-medium text-slate-300">
                            Genre
                          </label>

                          <Select
                            value={GENRES[`${genreType}`]?.filter((obj: any) =>
                              genre.includes(obj.value),
                            )}
                            options={GENRES[genreType]}
                            onChange={handleChangeGenre}
                            isMulti
                            styles={colourStylesOnboarding}
                          ></Select>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="w-full mb-8">
                          <label className="block mb-2 text-sm font-medium text-slate-300">
                            Bio
                          </label>
                          <textarea
                            {...register("bio", {
                              required: false,
                            })}
                            defaultValue={userDetails?.bio}
                            placeholder="Bio"
                            className="w-full h-52 pl-5 pr-3 py-2.5 bg-transparent border-slate-700 text-white rounded-md border-2"
                          />
                        </div>
                        {errors.bio && (
                          <p className="text-[12px] text-red-500 pt-1">
                            {" "}
                            Enter Bio
                          </p>
                        )}
                      </div>

                      <div className="flex gap-5 justify-center">
                        <button
                          onClick={() => {
                            nextOnbordSection();
                          }}
                          className="block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
                        >
                          {" "}
                          Next{" "}
                        </button>
                      </div>
                    </>
                  )}

                  {artistTab === 1 && (
                    <>
                      <div className="mb-10 gap-5">
                        <div className="flex flex-col md:flex-row mb-4">
                          <div className="items-center mr-4">
                            <label className="ml-2 text-sm mr-5 font-medium text-white">
                              {" "}
                              Add video streaming platform URL (Eg. youtube){" "}
                            </label>
                          </div>
                        </div>

                        <div className="w-full mb-8">
                          <input
                            {...register("youtubeLink", {
                              required: false,
                            })}
                            defaultValue={userDetails?.youtubeLink}
                            type="text"
                            className="text-white w-full pl-5 pr-3 py-2.5 accent-orange-300 bg-transparent border-slate-700 rounded-md border-2"
                            placeholder="Add video streaming platform URL"
                          />
                          {/* <p className="text-gray-500 float-right mt-4">+ Add More</p> */}
                        </div>
                      </div>

                      <div className="mb-10 gap-5">
                        <div className="flex flex-col md:flex-row mb-4">
                          <div className="items-center mr-4">
                            <label className="ml-2 text-sm mr-5 font-medium text-white">
                              {" "}
                              Add audio streaming platform URL (Eg. spotify){" "}
                            </label>
                          </div>
                        </div>

                        <div className="w-full mb-8">
                          <input
                            {...register("spotifyLink", {
                              required: false,
                            })}
                            defaultValue={userDetails?.spotifyLink}
                            type="text"
                            className="text-white w-full pl-5 pr-3 py-2.5 accent-orange-300 bg-transparent border-slate-700 rounded-md border-2"
                            placeholder="Add audio streaming platform URL"
                          />
                        </div>
                      </div>

                      <div className="mb-10 gap-5">
                        <div className="flex flex-col md:flex-row mb-4">
                          <div className="items-center mr-4">
                            <label className="ml-2 text-sm mr-5 font-medium text-white">
                              {" "}
                              Add Facebook profile URL{" "}
                            </label>
                          </div>
                        </div>

                        <div className="w-full mb-8">
                          <input
                            defaultValue={userDetails?.facebookLink}
                            type="text"
                            {...register("facebookLink", {
                              required: false,
                            })}
                            className="text-white w-full pl-5 pr-3 py-2.5 accent-orange-300 bg-transparent border-slate-700 rounded-md border-2"
                            placeholder="Add Facebook profile URL"
                          />
                        </div>
                      </div>

                      <div className="mb-10 gap-5">
                        <div className="flex flex-col md:flex-row mb-4">
                          <div className="items-center mr-4">
                            <label className="ml-2 text-sm mr-5 font-medium text-white">
                              {" "}
                              Add Instagram profile URL{" "}
                            </label>
                          </div>
                        </div>

                        <div className="w-full mb-8">
                          <input
                            {...register("instagramLink", {
                              required: false,
                            })}
                            defaultValue={userDetails?.instagramLink}
                            type="text"
                            className="text-white w-full pl-5 pr-3 py-2.5 accent-orange-300 bg-transparent border-slate-700 rounded-md border-2"
                            placeholder="Add Instagram profile URL"
                          />
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <div className="w-full mb-8">
                          <input
                            {...register("shortHighlight", {
                              required: false,
                            })}
                            defaultValue={userDetails?.shortHighlight}
                            type="text"
                            className="text-white w-full pl-5 pr-3 py-2.5 accent-orange-300 bg-transparent border-slate-700 rounded-md border-2"
                            placeholder="Add Work Sample URL"
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
                          onClick={handleSubmit(onSubmitFirst)}
                          className="block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2"
                        >
                          {" "}
                          Submit{" "}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </Content>
      </div>
    </>
  );
}

export default ArtistOnboardingNew;
