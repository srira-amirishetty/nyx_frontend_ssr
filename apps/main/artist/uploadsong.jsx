/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import "../css/uploadsong.css";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
const imageBox = IMAGE_URL + "/assets/images/artists/tab.png";
const search = IMAGE_URL + "/assets/images/artists/search.png";
import Select from "react-select";
import { ADD_TOKENS, BASEURL, CAT, GENRES, LANGUAGES } from "../utils/utils";
import { CENTER_TEXT } from "@nyx-frontend/main/components/Utils/Utils";
import BasicLayout from "../layouts/BasicLayout";
import { ButtonElement } from "../shared/inputs";
import Content from "../components/content";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { UseContextData } from "../hooks/usecontext";
import { useForm } from "react-hook-form";
import useRequests from "../hooks/makeRequests";
import { MODAL_CONFIG } from "../utils/modalstyles";
import { format, parse } from "date-fns";
import { useRouter } from "next/navigation";
import TextGrid from "../components/TextGrid";
import { ONBOARD_TEXT_CARDS } from "../utils/globals";

const colorStyles = () => ({
  control: (base, state) => {
    return {
      ...base,
      backgroundColor: "transparent",
      borderColor: "#8297BD",
    };
  },
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#C4AEDF" : isSelected ? "#FFF" : undefined,
    color: "#000",
    zIndex: 1,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
});

function UploadSong() {
  const navigate = useRouter();
  const { setcontentHeight } = useContext(UseContextData);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [fileName, setFileName] = useState(imageBox);
  const [fileData, setFileData] = useState();
  const [category, setcategory] = useState({ value: "", label: "" });
  const [language, setLanguage] = useState({ value: "", label: "" });
  const [genre, setGenre] = useState({ value: "", label: "" });
  const [genreType, setGenreType] = useState("songs");
  const { post } = useRequests();
  useEffect(() => {
    setcontentHeight("pb-[4rem]");
  });

  const formatDate = (date) => {
    return format(parse(date, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
  };

  const onSubmit = async (response) => {
    const formData = new FormData();
    formData.append("category", category.label);
    formData.append("title", response.title);
    formData.append("language", language.label);
    formData.append("genre", genre.label);
    formData.append("description", response.description);
    formData.append("videoLink", response.videoLink);
    formData.append("audioLink", response.audioLink);
    formData.append("royaltyOwned", response.royaltyOwned);
    formData.append("fanRoyaltyShare", response.fanRoyaltyShare);
    formData.append("expLaunchDt", formatDate(response.expLaunchDt));
    formData.append("thumbnail", fileData);
    const data = await post(
      BASEURL + ADD_TOKENS,
      formData,
      MODAL_CONFIG("Adding Shares"),
    );
    if (data.response === "Success") {
      navigate.push("/profile/TokenRequests");
    }
  };

  const handleChangeCategory = (e) => {
    setcategory({ value: e.value, label: e.value });

    setGenre({ value: "", label: "" });

    if (
      ["Singer", "Music Composer", "Lyricist", "Composer"].includes(e.value)
    ) {
      setGenreType("songs");
    } else {
      setGenreType("videos");
    }
  };

  const handleChangeLanguage = (e) => {
    setLanguage({ value: e.value, label: e.value });
  };

  const handleChangeGenre = (e) => {
    setGenre({ value: e.value, label: e.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file ? URL.createObjectURL(file) : "");
      setFileData(file);
    }
  };
  return (
    <BasicLayout>
      <div className="px-3 md:px-0">
        <div className="absolute top-28 left:10 md:left-20 text-white text-[17px] font-600">
          Add Song/Video
        </div>
        <Content top="top-[10rem]">
          <div className="pt-10">
            {CENTER_TEXT("Upload song / video", "mr-0")}
          </div>

          <div className="m-auto w-auto md:w-[50%]">
            {/* <div className="flex gap-3 mt-14">
                        <div className="bg-card h-[5rem] w-[10rem]">

                            <p className="text-center pt-4 text-white font-light">Earn what you deserve</p>
                        </div>
                        <div className="bg-card h-[5rem] w-[10rem]">

                            <p className="text-center pt-4 text-white font-light">No more wait of years for royalty</p>
                        </div>
                        <div className="bg-card h-[5rem] w-[10rem]">

                            <p className="text-center pt-4 text-white font-light">Get your fans to distribute </p>
                        </div>

                        <div className="bg-card h-[5rem] w-[10rem]">

                            <p className="text-center pt-4 text-white font-light">Get your fans to distribute </p>
                        </div>
                    </div> */}

            <div className="grid max-w-5xl grid-cols-2 md:grid-cols-4 gap-5  py-5 md:py-8 mx-auto">
              <TextGrid data={ONBOARD_TEXT_CARDS} />
            </div>

            <div className="pt-5 md:pt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="block md:hidden w-auto md:w-[50%] m-auto ">
                  <label htmlFor="fileInput">
                    <input
                      type="file"
                      className="hidden"
                      id="fileInput"
                      onChange={handleFileChange}
                    />
                    <img
                      className="h-[15rem] w-full"
                      src={fileName}
                      alt="fileName"
                    ></img>
                    <div
                      className="flex  bg-inputbg justify-between p-2 w-full cursor-pointer"
                      htmlFor="fileInput"
                    >
                      <p className="text-blue text-sm">Upload Image</p>
                      <img className="w-[18px]" src={search} alt="search"></img>
                    </div>
                  </label>
                </div>

                <div className="flex md:w-[50%] flex-col gap-5">
                  <div className="m-auto w-[90%] md:w-full">
                    {/* <select
                      {...register("category", {
                        required: false,
                      })}
                      className={`h-11 bg-transparent text-blue border border-white rounded-md  text-sm  px-4 py-2 leading-tight focus:outline-none w-full`}
                    >
                      {SELECT_OPTION_CATEGORY2.option.map((option) => (
                        <option hidden={option.hidden}>{option.name}</option>
                      ))}
                    </select> */}
                    <label className="text-white font-light">
                      Select category
                    </label>
                    <Select
                      options={CAT}
                      onChange={handleChangeCategory}
                      value={category}
                      styles={colorStyles()}
                    ></Select>
                  </div>
                  <div className="m-auto w-[90%] md:w-full">
                    {/* <select {...register("title", {

                                        required: false
                                    })} className={`h-11 bg-transparent text-blue border border-white rounded-md  text-sm  px-4 py-2 leading-tight focus:outline-none w-full`}>
                                        {SELECT_TITLE.option.map((option) => <option hidden={option.hidden} >{option.name}</option>)}

                                    </select> */}
                    <input
                      {...register("title", {
                        required: true,
                      })}
                      placeholder="Title"
                      className="text-white font-normal pl-2 h-12 text-sm bg-transparent border rounded-md outline-none w-full"
                    ></input>
                  </div>
                  <div className="m-auto w-[90%] md:w-full">
                    <label className="text-white font-light">
                      Select Language
                    </label>
                    <Select
                      placeholder=""
                      options={LANGUAGES}
                      onChange={handleChangeLanguage}
                      value={language}
                      styles={colorStyles()}
                    ></Select>
                  </div>
                  <div className="m-auto w-[90%] md:w-full">
                    <label className="text-white font-light">
                      Select Genre
                    </label>
                    <Select
                      options={GENRES[genreType]}
                      onChange={handleChangeGenre}
                      value={genre}
                      styles={colorStyles()}
                    ></Select>
                  </div>
                </div>
                <div className="hidden md:block w-auto md:w-[50%] m-auto ">
                  <label htmlFor="fileInput">
                    <input
                      type="file"
                      className="hidden"
                      id="fileInput"
                      onChange={handleFileChange}
                    />
                    <img
                      className="h-[15rem] w-full"
                      src={fileName}
                      alt="fileName"
                    ></img>
                    <div
                      className="flex bg-input bg justify-between p-2 w-full cursor-pointer"
                      htmlFor="fileInput"
                    >
                      <p className="text-blue text-sm">Upload Image</p>
                      <img className="w-[18px]" src={search} alt="search"></img>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex mt-5 m-auto w-[90%] md:w-full">
                <textarea
                  {...register("description", {
                    required: true,
                  })}
                  className="text-white pt-3 font-normal pl-2 h-32 text-sm bg-transparent border rounded-md outline-none w-full"
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="m-auto w-[90%] md:w-full mt-7">
                <input
                  {...register("videoLink", {
                    required: true,
                  })}
                  placeholder="Add video url"
                  className="text-white font-normal pl-2 h-12 text-sm bg-transparent border rounded-md outline-none w-full"
                ></input>
              </div>
              <div className="m-auto w-[90%] md:w-full mt-7">
                <input
                  {...register("audioLink", {
                    required: false,
                  })}
                  placeholder="Add Audio url"
                  className="text-white font-normal pl-2 h-12 text-sm bg-transparent border rounded-md outline-none w-full"
                ></input>
              </div>

              <div className="m-auto w-[90%] md:w-full mt-7">
                <input
                  {...register("royaltyOwned", {
                    required: true,
                  })}
                  placeholder="How much of streaming rights do you own?"
                  className="text-white font-normal pl-2 h-12 text-sm bg-transparent border rounded-md outline-none w-full"
                ></input>
              </div>

              <div className="m-auto w-[90%] md:w-full mt-7">
                <input
                  {...register("fanRoyaltyShare", {
                    required: true,
                  })}
                  placeholder="How much streaming rights ownership do you want to sell?"
                  className="text-white font-normal pl-2 h-12 text-sm bg-transparent border rounded-md outline-none w-full"
                ></input>
              </div>

              <div className="m-auto w-[90%] md:w-full mt-7">
                <label className="text-white font-light">
                  Desired Launch Date
                </label>
                <input
                  {...register("expLaunchDt", {
                    required: true,
                  })}
                  type="date"
                  placeholder="Desired time frame to launch the share?"
                  className="text-blue font-light pl-2 h-12 text-sm bg-transparent border rounded-md outline-none w-full"
                />
              </div>
              <div className="flex justify-center mt-9 m-auto w-[90%] md:w-full">
                <ButtonElement
                  onSubmit={handleSubmit(onSubmit)}
                  name={"Submit"}
                ></ButtonElement>
              </div>
            </div>
          </div>
        </Content>
      </div>
    </BasicLayout>
  );
}

export default UploadSong;
