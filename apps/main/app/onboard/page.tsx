"use client";
import { useContext, useEffect, useState } from "react";
import {
  ARTIST_ONBOARDING_TABS,
  BASEURL,
  EDIT_ARTISTS,
  LANGUAGE,
  SELECT_GENRE,
  SELECT_OPTION_CATEGORY,
} from "@nyx-frontend/main/utils/utils";
import { MODAL_CONFIG } from "@nyx-frontend/main/utils/modalstyles";
import { TabsMain } from "@nyx-frontend/main/shared/inputs";
import { useForm } from "react-hook-form";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import Select from "react-select";
import { colourStylesOnboarding } from "@nyx-frontend/main/utils/productStyle";
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
  // useEffect(() => {
  //   document.body.classList.add("bg_auto_auth");

  //   return () => {
  //     document.body.classList.remove("bg_auto_auth");
  //   };
  // }, []);

  const nextOnbordSection = () => {
    setArtistTab(1);
  };

  const prevOnbordSection = () => {
    setArtistTab(0);
  };

  const onSubmitFirst = async () => {
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

  const onSubmitFinal = async (data: any) => {
    for (const [key, value] of Object.entries(data)) {
      if (value === "") {
        data[key] = null;
      }
    }
    data.industryExp = parseInt(data.industryExp);
    const payload = {
      data: data,
    };

    const info = await post(
      BASEURL + EDIT_ARTISTS,
      payload,
      MODAL_CONFIG("loading")
    );
    if (info.response === "Success") {
      navigate.push("/");
    }
  };
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const languageOptions = LANGUAGE.option.map((options, index) => ({
    value: options.name, // Replace someValue with the actual property from your API data
    label: options.name, // Replace someLabel with the actual property from your API data
  }));

  const categoryOptions = SELECT_OPTION_CATEGORY.option.map(
    (options, index) => ({
      value: options.name,
      label: options.name,
    })
  );

  const genreOptions = SELECT_GENRE.option.map((genre, index) => ({
    value: genre.name,
    label: genre.name,
  }));
  const purposeJoining = [
    {
      value: "Already have a song/share that i want to shareize",
      label: "Already have a song/share that i want to shareize",
    },
    {
      value: "Looking for collaberation for content creation",
      label: "Looking for collaberation for content creation",
    },
  ];

  const industryExperience = [
    { value: "< 1", label: "< 1" },
    { value: "1-5 yrs", label: "1-5 yrs" },
    { value: "5-10 yrs", label: "5-10 yrs" },
    { value: "10 ++ yrs", label: "10 ++ yrs" },
  ];
  return (
    <>
      <div className="w-[90%] mx-auto mt-[8rem]">
        <div className="flex px-5 justify-between">
          <p
            className="text-[#FFFFFF] cursor-pointer"
            onClick={() => navigate.push("/")}
          >
            Skip
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-16 flex justify-center">
          <TabsMain
            data={ARTIST_ONBOARDING_TABS}
            tabState={setArtistTab}
            tabStatus={artistTab}
          />
        </div>

        <div className="max-w-5xl px-5 md:px-24 py-5 md:py-12 mx-auto bg-[#00000080] rounded-3xl">
          {artistTab === 0 && (
            <>
              <div className="flex gap-5">
                <div className="w-1/2 mb-8">
                  <input
                    {...register("name", {
                      required: true,
                    })}
                    type="text"
                    className="text-[#8297BD] w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] rounded-md border"
                    placeholder="First Name*"
                  />
                  {errors.name && (
                    <p className="text-[12px] text-red-500 pt-1"> Enter Name</p>
                  )}
                </div>
                <div className="w-1/2 mb-8">
                  <input
                    type="text"
                    className="text-[#8297BD] w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] rounded-md border"
                    placeholder="Last Name*"
                  />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-1/2 mb-8">
                  {/* <select
                    {...register("gender", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] text-white rounded-md border"
                  >
                    <option hidden>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select> */}
                  <Select
                    // {...register("gender", {
                    //   required: false,
                    // })}
                    className="text-sm md:text-base"
                    options={genderOptions}
                    placeholder="Gender"
                    instanceId={"category"}
                    styles={colourStylesOnboarding}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                  {errors.gender && (
                    <p className="text-[12px] text-red-500 pt-1">
                      {" "}
                      Enter gender
                    </p>
                  )}
                </div>

                <div className="w-1/2 mb-8">
                  {/* <select
                    {...register("language", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] text-white rounded-md border"
                  >
                    {LANGUAGE.option.map((option) => (
                      <option hidden={option.hidden} key={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    // {...register("gender", {
                    //   required: false,
                    // })}
                    className="text-sm md:text-base"
                    options={languageOptions}
                    placeholder="Language"
                    instanceId={"category"}
                    styles={colourStylesOnboarding}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
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
                      required: true,
                    })}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    type="email"
                    className="text-[#8297BD] w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] rounded-md border"
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
                  {/* <select
                    {...register("category", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] text-white rounded-md border"
                  >
                    {SELECT_OPTION_CATEGORY.option.map((option) => (
                      <option hidden={option.hidden} key={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    // {...register("gender", {
                    //   required: false,
                    // })}
                    className="text-sm md:text-base"
                    options={categoryOptions}
                    placeholder="Category"
                    instanceId={"category"}
                    styles={colourStylesOnboarding}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
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
                  {/* <select
                    {...register("genre", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] text-white rounded-md border"
                  >
                    {SELECT_GENRE.option.map((option) => (
                      <option hidden={option.hidden} key={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select> */}
                  <Select
                    // {...register("gender", {
                    //   required: false,
                    // })}
                    className="text-sm md:text-base"
                    options={genreOptions}
                    placeholder="Genre"
                    instanceId={"category"}
                    styles={colourStylesOnboarding}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
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
                  {/* <select
                    {...register("joiningPurpose", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] text-white rounded-md border"
                  >
                    <option hidden>Purpose of Joining</option>
                    <option>
                      Already have a song/share that i want to shareize
                    </option>
                    <option>
                      Looking for collaberation for content creation
                    </option>
                  </select> */}
                  <Select
                    // {...register("gender", {
                    //   required: false,
                    // })}
                    className="text-sm md:text-base"
                    options={purposeJoining}
                    placeholder="Purpose of Joining"
                    instanceId={"category"}
                    styles={colourStylesOnboarding}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                  {errors.joiningPurpose && (
                    <p className="text-[12px] text-red-500 pt-1">
                      {" "}
                      Select Joining purposes
                    </p>
                  )}
                </div>

                <div className="w-1/2 mb-8">
                  {/* <select
                    {...register("industryExp", {
                      required: false,
                    })}
                    className="w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] text-white rounded-md border"
                  >
                    <option>Industry Experience</option>
                    <option>{"< 1 yr"}</option>
                    <option>1-5 yrs</option>
                    <option>5 to 10 yrs</option>
                    <option>10 yrs ++ </option>
                  </select> */}
                  <Select
                    // {...register("gender", {
                    //   required: false,
                    // })}
                    className="text-sm md:text-base"
                    options={industryExperience}
                    placeholder="Industry Experience"
                    instanceId={"category"}
                    styles={colourStylesOnboarding}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
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
                    className="w-full h-52 pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] text-[#8297BD] rounded-md border"
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
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] rounded-md border"
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
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] rounded-md border"
                    placeholder="Add Jio Saavn Link"
                  />
                </div>

                <div className="w-full mb-8">
                  <input
                    {...register("spotifyLink", {
                      required: false,
                    })}
                    type="url"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] rounded-md border"
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
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] rounded-md border"
                    placeholder="Add Facebook Link"
                  />
                </div>
                <div className="w-full mb-8">
                  <input
                    {...register("instagramLink", {
                      required: false,
                    })}
                    type="url"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] rounded-md border"
                    placeholder="Add Instagram Link"
                  />
                </div>
                <div className="w-full mb-8">
                  <input
                    {...register("twitterLink", {
                      required: false,
                    })}
                    type="url"
                    className="text-white w-full pl-5 pr-3 py-2.5 bg-transparent border-[#8297BD] rounded-md border"
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
