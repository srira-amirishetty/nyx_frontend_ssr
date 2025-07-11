/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  getAssetMedia,
  editBrandCanvasAssets,
  favouriteAsset,
} from "@nyx-frontend/main/services/asset";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Button from "@nyx-frontend/main/components/Button";
import DeleteIcon from "@nyx-frontend/main/components/Icons/DeleteIcon";
import DownloadIcon from "@nyx-frontend/main/components/Icons/DownloadSVGIcon";
import CrossIcon from "@nyx-frontend/main/components/Icons/CrossSVGIcon";
import ArrowIcon from "@nyx-frontend/main/components/ArrowIcon";
import CardAssetIcon from "@nyx-frontend/main/components/Icons/CardAssetIcon";
import ListAssetIcon from "@nyx-frontend/main/components/Icons/ListAssetIcon";
import EditSVGIcon from "@nyx-frontend/main/components/Icons/EditSVGIcon";
import LikeIcon from "@nyx-frontend/main/components/Icons/LikeIcon";
import Unlike from "@nyx-frontend/main/components/Icons/UnlikeIcon";
import { assetPopup, deletePopupStyle } from "@nyx-frontend/main/utils/modalstyles";
import { assetSortOptions, assetFilterOptions } from "@nyx-frontend/main/utils/productConstants";
import { assetSortStyle } from "@nyx-frontend/main/utils/productStyle";
import { AudioCard } from "./AudioCard";
import { RWebShare } from "react-web-share";
import Modal from "react-modal";
import EditPopUp from "./EditPopUp";
import { TableRow, CardSkele } from "./TableRow";
import { useMutation } from "@tanstack/react-query";
import { handleDownload } from "./download";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import BackToTopButton from "@nyx-frontend/main/components/BackToTopButton";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { SearchBar } from "./Searchbar";
import { useSearch, useExpand } from "../store/store";

const Card = ({ id, type }) => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const {
    data,
    refetch: assetRefetch,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["getFiles", id],
    queryFn: async () => {
      const res = await getAssetMedia(
        id,
        localStorage.getItem("workspace_id"),
        page,
      );
      return res;
    },
    keepPreviousData: true,
  });
  useEffect(() => {
    assetRefetch();
  }, [page]);
  const mutateAsset = useMutation({
    mutationKey: ["Edit-Asset"],
    mutationFn: editBrandCanvasAssets,
  });
  const mutateFavourite = useMutation({
    mutationKey: ["Favourite-Asset"],
    mutationFn: favouriteAsset,
  });

  const [workspace, setWorkspace] = useState("");
  const [card, setCard] = useState("");
  const [selectedValue, setSelectedValue] = useState(true);
  const [options, setOptions] = useState(false);
  const [optionsName, setOptionsName] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [select, setSelect] = useState(false);
  const [isfavourite, setIsFavourite] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [showTextArea, setShowTextArea] = useState(false);
  const [newName, setNewName] = useState();
  const [viewDetails, setViewDetails] = useState(false);
  const [viewDetailsItem, setViewDetailsItem] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [openWith, setOpenWith] = useState(false);
  const [multiSelect, setMultiselect] = useState(false);
  const [multiDel, setMultiDel] = useState(false);
  const inputRef = useRef(null);
  const [popUp, setPopUp] = useState(false);
  const search = useSearch((state) => state.search)
  const expand = useExpand((state) => state.expand);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspace(work);
  }, []);

  useEffect(() => {
    if (data) {
      setFilterData(data.data);
      setAllData((prev) => {
        const newItems = data.data.filter(
          (item) => !prev.some((prevItem) => prevItem.file_id === item.file_id),
        );
        return [...prev, ...newItems];
      });
      if (isfavourite) {
        setFilterData(data.data.filter((item) => item.is_favourite));
      } else {
        setFilterData(data.data);
      }
    }
  }, [data, isfavourite]);




  function handlePopUp(item) {
    setPopUp(true);
    setCard(item);
  }
  function formatDate(isoString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, options);
  }

  const handleDelete = (item) => {
    let data = {
      file_id: item.file_id,
      type: "delete",
      new_name: "",
    };
    mutateAsset.mutate(data, {
      onSuccess: (response) => {
        //@ts-ignore
        setOptions(false);
        const Success = () => {
          toast.success(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Request Successfull!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Asset Deleted Succesfully
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        Success();
        assetRefetch();
        setSelectedImages([]);
        setMultipleFiles([]);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleSelectCheckBox = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (newCheckedState) {
      setSelectedImages(filterData.map((item) => item.file_id));
      setMultipleFiles(filterData);
    } else {
      setMultipleFiles([]);
      setSelectedImages([]);
    }
  };

  function onSelection(selectedOption) {
    const sortDirection = selectedOption.id;
    const copyArray = [...filterData];

    if (selectedOption.id === "-1") {
      // Reset to original data
      const spread = data.data;
      setFilterData([...spread]);
      return;
    }
    copyArray.sort((a, b) => {
      const sizeA = parseFloat(a.size.replace(/[^0-9.]/g, ""));
      const sizeB = parseFloat(b.size.replace(/[^0-9.]/g, ""));

      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (isNaN(sizeA) || isNaN(sizeB)) {
        console.warn(
          "Encountered non-numeric size values. Sorting by filename instead.",
        );
        return sortDirection === "0"
          ? a.filename.localeCompare(b.filename)
          : b.filename.localeCompare(a.filename);
      }
      switch (sortDirection) {
        case "0":
          return nameA.localeCompare(nameB);
          break;
        case "1":
          return dateA - dateB;
          break;
        case "2":
          return sizeA - sizeB;
          break;
      }
    });
    setFilterData(copyArray); //re-render
  }

  const onFilterSelection = (selectedOption) => {
    if (selectedOption.id === "-1") {
      // Reset to original data
      const spread = data.data;
      setFilterData([...spread]);
      setIsFavourite(false);
      return;
    }
    setIsFavourite(true);
    setFilterData((prev) => prev.filter((item) => item.is_favourite));
  };

  const onPlay = (e) => {
    // @ts-ignore
    e.target?.play();
  };

  const onPause = (e) => {
    // @ts-ignore
    e.target?.pause();
  };

  const handleOptions = (e) => {
    setOptions((prev) => !prev);
    setOptionsName(e);
  };

  const handleSelect = (item) => {
    setIsChecked(false);
    setSelect(true);

    if (!selectedImages.includes(item.file_id)) {
      setSelectedImages((prev) => [...prev, item.file_id]);
      setMultipleFiles((prev) => [...prev, item]);
    } else
      setSelectedImages((prev) =>
        prev.filter((item2) => item2 !== item.file_id),
      );
    setMultiselect(true);
  };

  const handleCheckboxChange = (index, item) => {
    if (selectedImages.includes(index)) {
      setSelectedImages((prev) => prev.filter((item) => item !== index));
      setMultipleFiles((prev) =>
        prev.filter((item) => item.file_details !== index),
      );
    } else {
      setSelectedImages((prev) => [...prev, index]);
      setMultipleFiles((prev) => [...prev, item]);
    }
  };

  const handleMultipleDownload = () => {
    for (let i = 0; i < multipleFiles.length; i++) {
      handleDownload(multipleFiles[i], multipleFiles[i].type);
    }
  };

  const handleMultipleDelete = () => {
    for (let i = 0; i < multipleFiles.length; i++) {
      let data = {
        file_id: multipleFiles[i].file_id,
        type: "delete",
        new_name: "",
      };
      mutateAsset.mutate(data, {
        onSuccess: (response) => {
          //@ts-ignore
          setMultiDel(false);
          setOptions(false);
          assetRefetch();
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
    const Success = () => {

      toast.success(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Request Successfull!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Assets Deleted Succesfully
          </span>
        </>,
        { autoClose: 5000 },
      );
    };
    Success();
    setSelect(false);
    setSelectedImages([]);
    setMultipleFiles([]);
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleSave = (item) => {
    let data = {
      file_id: item.file_id,
      type: "rename",
      new_name: newName,
    };
    setShowTextArea(false);
    mutateAsset.mutate(data, {
      onSuccess: (response) => {
        setAllData((prev) =>
          prev.map((prevItem) =>
            prevItem.file_id === item.file_id
              ? { ...prevItem, name: newName }
              : prevItem,
          ),
        );
        assetRefetch();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleBrandCanvas = (item) => {
    setOpenWith(false);
    if (item.type === "Images") {
      const imageID = nanoid();
      localStorage.setItem(imageID, item.file_details.signed_image_url);
      window.open(
        `/apphome/${workspace}/brand-canvas?imageID=${imageID}&platform=text-to-image`,
      );
    }
    if (item.type === "Videos") {
      const videoID = nanoid();
      localStorage.setItem(videoID, item.file_details.signed_video_url);
      window.open(
        `/apphome/${workspace}/brand-canvas?videoID=${videoID}&platform=image-to-video`,
      );
    }
  };

  const handleCancel = () => {
    setIsChecked(false);
    setSelect((prev) => !prev);
    setMultipleFiles([]);
    setSelectedImages([]);
    setMultiselect(false);
  };

  const newHandleFav = (item) => {
    let data = {
      file_id: item.file_id,
      is_favourite: !item.is_favourite,
    };
    mutateFavourite.mutate(data, {
      onSuccess: async (response) => {
        assetRefetch();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const highlightText = (text, search) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-nyx-yellow">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      ),
    );
  };

  useEffect(() => {
    if (showTextArea && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTextArea]);

  if (data?.data.length === 0 && page === 1) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-[#FFCB54] font-semibold text-[24px] mt-16">
          There are no asset of this type. Generate some now with our tools
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-[#FFCB54] font-bold text-[24px] mt-16">
          Something Went Wrong!
        </p>
        <p className="text-[#FFCB54] text-[16px] mt-4">
          Failed to load your asset . Please try again later
        </p>
      </div>
    );
  }
  return (
    <div
      className="relative mx-4"
      onClick={() => {
        if (options) {
          setOptions(false);
        }
      }}
    >
      <div className="flex text-white text-[14px] font-normal justify-between  items-center w-full border-b-[1px] pb-[12px] border-[#8297BD]">
        <div>
          <div className="text-[#FFFFFF] text-xl font-bold">
            <Link href={`/apphome/${workspace}/assets`}>Assets</Link> &gt;{" "}
            {type}
          </div>
        </div>
        {!select && (
          <div className="flex gap-x-2">
            <Select
              className="text-sm md:text-base z-99 w-40 text-white bg-inherit text-[14px]"
              options={assetFilterOptions}
              menuPlacement="bottom"
              placeholder="Filter"
              onChange={onFilterSelection}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                borderColor: "white",
              })}
              styles={assetSortStyle}
              isSearchable={false}
            />

            <Select
              className="text-sm md:text-base z-99 w-40 text-white text-[14px]"
              options={assetSortOptions}
              menuPlacement="bottom"
              placeholder="Sort By"
              onChange={onSelection}
              styles={assetSortStyle}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                borderColor: "white",
                colors: {
                  ...theme.colors,
                  primary25: "#8297BD",
                  primary: "#20133D",
                },
              })}
              isSearchable={false}
            />

            <SearchBar allData={allData} data={data} setFilterData={setFilterData} />
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4 ">
        <div className=""> </div>

        <div className="flex">
          <div
            className={`${selectedValue ? "bg-[#1D1138]" : "bg-[#5E32FF]"} px-[14px] py-[9px] rounded h-fit`}
            onClick={() => setSelectedValue(false)}
          >
            <ListAssetIcon className="h-[19px] w-[18px] cursor-pointer" />
          </div>
          <div
            className={`${selectedValue ? "bg-[#5E32FF]" : "bg-[#1D1138]"} px-[14px] py-[9px] rounded h-fit`}
            onClick={() => setSelectedValue(true)}
          >
            <CardAssetIcon className="h-[20px] w-[20px] cursor-pointer" />
          </div>
        </div>
      </div>
      {selectedValue ? (
        <div className="w-full flex flex-col items-center justify-center mt-4 relative">
          {selectedImages.length > 0 ? (
            <div className="flex w-full max-w-[1100px] justify-center ">
              <div className="w-full  h-auto flex justify-between   text-white  ">
                <div className="flex gap-x-4">
                  <label className="flex items-center space-x-2">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked}
                        onChange={handleSelectCheckBox}
                      />
                      <div
                        className={`w-[18px] h-[18px] border  flex items-center justify-center`}
                      >
                        {isChecked && (
                          <span className="text-white text-lg font-bold rotate-[15deg]">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>

                    <span>Select All</span>
                  </label>
                  <div
                    onClick={() => setMultiDel(true)} //handleMultipleDelete
                    className="flex items-center gap-x-1 cursor-default"
                  >
                    <DeleteIcon className="h-3 w-3" />
                    <div>Delete</div>
                  </div>
                  <div
                    onClick={handleCancel}
                    className="flex items-center gap-x-1 cursor-default"
                  >
                    <div className="border-[0.5px] rounded-full p-1">
                      <CrossIcon className="h-2 w-2" />
                    </div>

                    <div>Cancel</div>
                  </div>
                  <div
                    onClick={handleMultipleDownload}
                    className="flex items-center gap-x-1 cursor-default"
                  >
                    <DownloadIcon className="h-3 w-3" />
                    <div>Download</div>
                  </div>
                </div>
                <div>
                  {selectedImages.length}/{data.data.length} Selected
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full max-w-[1100px] justify-center h-[24px]"></div>
          )}
          {!isLoading ? (
            <div className="w-12/12 max-w-[1260px] h-auto flex justify-center gap-x-4 gap-y-10 flex-wrap mt-8">
              {filterData?.map((item, index) => (
                <div
                  key={index}
                  className={`w-[258px] h-[320px] bg-[#332270] flex flex-col justify-center items-center rounded-lg text-white px-[8px] py-[10px] relative card ${selectedImages.includes(item.file_id) ? "border-[1px] border-[#F1BB2E]" : ""} `}
                >
                  {" "}
                  {select ? (
                    <input
                      type="checkbox"
                      className="image-checkbox absolute bg-[#F1BB2E] top-4 left-4 z-20"
                      checked={selectedImages.includes(item.file_id)}
                      onChange={() => handleCheckboxChange(item.file_id, item)}
                    />
                  ) : (
                    <></>
                  )}
                  {item.type === "Images" && (
                    <img
                      className="rounded-lg w-[242px] h-[242px] cursor-pointer object-contain bg-black absolute top-2"
                      width={242}
                      height={242}
                      alt=""
                      onClick={() => {
                        if (!multiSelect) handlePopUp(item);
                      }}
                      src={item.file_details.signed_image_url}
                    ></img>
                  )}
                  {item.type === "Videos" && (
                    <video
                      src={item.file_details.signed_video_url}
                      className="rounded-lg w-[242px] h-[242px]   object-contain bg-black absolute top-2"
                      controls={false}
                      onClick={() => handlePopUp(item)}
                      onMouseOver={onPlay}
                      onMouseOut={onPause}
                      muted
                    />
                  )}
                  {item.type === "Music" && (
                    <>
                      <AudioCard item={item} handlePopUp={handlePopUp} />
                    </>
                  )}
                  {viewDetailsItem !== item.file_id ? (
                    <div className="w-11/12 absolute bottom-3">
                      <div className="flex justify-between mt-1 z-10 ">
                        {optionsName === item.name && showTextArea ? (
                          <>
                            <input
                              type="text"
                              value={newName}
                              maxLength="32"
                              className={`w-9/12 rounded-lg bg-transparent outline-none text-white pl-1 border border-nyx-yellow `}
                              ref={inputRef}
                              onChange={handleNewName}
                            />
                            <Button
                              className="flex-1 w-fit shadow-sm shadow-nyx-yellow  text-xs mx-1"
                              onClick={() => handleSave(item)}
                            >
                              save
                            </Button>
                          </>
                        ) : item.name.length > 17 ? (
                          <div className="">
                            {highlightText(
                              item.name.substring(0, 15) + "...",
                              search,
                            )}
                          </div>
                        ) : (
                          <div className="">
                            {highlightText(item.name, search)}
                          </div>
                        )}
                        <div className="text-[14px] mt-2"></div>
                        <div className="cursor-pointer">
                          <div className="flex gap-x-1 items-center">
                            <div
                              onClick={() => {
                                // favouriteClick(item);
                                newHandleFav(item);
                              }}
                            >
                              {item.is_favourite ? (
                                <LikeIcon className="h-6 w-6" />
                              ) : (
                                <Unlike className="h-6 w-6" />
                              )}
                            </div>
                            <div
                              onClick={() => {
                                handleOptions(item.name);
                                setShowTextArea(false);
                              }}
                              className="w-4"
                            >
                              {options && item.name === optionsName
                                ? "x"
                                : "..."}
                            </div>
                          </div>
                        </div>
                        {options && item.name === optionsName && (
                          <div className="absolute  bg-[#20133D] text-[12px] w-[118px] z-30 -right-24 rounded-md -bottom-48">
                            <div
                              className="py-[6px] px-[8px] cursor-pointer hover:bg-[#5E32FF]"
                              onClick={() => handlePopUp(item)}
                            >
                              Open
                            </div>
                            <div
                              className="py-[6px] px-[8px] cursor-pointer hover:bg-[#5E32FF] relative"
                              onMouseOver={() => setOpenWith(true)}
                              onMouseOut={() => setOpenWith(false)}
                            >
                              Open with
                              <div
                                className={`absolute -right-28 top-0  bg-[#20133D] rounded-md w-[120px] ${openWith ? "" : "hidden"}`}
                              >
                                <div
                                  className=" py-[6px] px-[8px] cursor-pointer  hover:bg-[#5E32FF]  "
                                  onClick={() => handleBrandCanvas(item)}
                                >
                                  BrandCanvas
                                </div>
                              </div>
                            </div>
                            <div
                              className="py-[6px] px-[8px] cursor-pointer hover:bg-[#5E32FF]"
                              onClick={() => {
                                setShowTextArea(true);
                                setOptions(false);
                              }}
                            >
                              Rename
                            </div>
                            <div
                              className="py-[6px] px-[8px] cursor-pointer hover:bg-[#5E32FF]"
                              onClick={() => handleDelete(item, item.type)}
                            >
                              Delete
                            </div>
                            <div
                              className="py-[6px] px-[8px] cursor-pointer hover:bg-[#5E32FF]"
                              onClick={() => handleDownload(item, item.type)}
                            >
                              Download
                            </div>
                            <div
                              className="py-[6px] px-[8px] cursor-pointer hover:bg-[#5E32FF]"
                              onClick={() => {
                                handleSelect(item);
                                setOptions(false);
                              }}
                            >
                              Select
                            </div>
                            <div className="py-[6px] px-[8px] cursor-pointer hover:bg-[#5E32FF]">
                              <RWebShare
                                data={{
                                  url: item.file_details.signed_image_url,
                                }}
                              >
                                <div>Share</div>
                              </RWebShare>
                            </div>
                          </div>
                        )}
                      </div>
                      <p
                        className="text-[12px] font-normal mt-1 underline underline-offset-1 cursor-pointer details"
                        onClick={() => {
                          setViewDetails(true);
                          setViewDetailsItem(item.file_id);
                        }}
                      >
                        View Details
                      </p>
                    </div>
                  ) : (
                    viewDetailsItem === item.file_id &&
                    viewDetails && (
                      <div className="w-full absolute bottom-0 bg-[#332270]">
                        <div className="text-[14px] py-[4px] px-[6px] flex justify-between mt-2">
                          <div>Details</div>
                          <div
                            onClick={() => {
                              setViewDetails(false);
                              setViewDetailsItem("");
                            }}
                          >
                            <ArrowIcon className="h-5 w-5 " />
                          </div>
                        </div>
                        <div className=" text-[12px] py-[4px] px-[6px] mb-2">
                          <div>Created by : {item.created_by}</div>
                          <div>Size : {item.size}</div>
                          <div>Created at: {formatDate(item.created_at)}</div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-12/12 max-w-[1200px] h-auto flex justify-center gap-x-4 gap-y-10 flex-wrap mt-8 ">
              <CardSkele />
              <CardSkele />
              <CardSkele />
              <CardSkele />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-5">
          {data?.length != 0 ? (
            <table className="min-w-full bg-[#332270] rounded-[10px] overflow-hidden dashboardTableStyle pb-2 ">
              <thead className=" text-[16px] font-medium text-nyx-yellow bg-[#23145A] sticky top-0">
                <tr className="text-left">
                  <th scope="col" className="px-6 py-3">
                    Sr. No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Created By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Date Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Size
                  </th>

                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
                    <TableRow></TableRow>
                    <TableRow></TableRow>
                    <TableRow></TableRow>
                    <TableRow></TableRow>
                  </>
                ) : (
                  <>
                    {filterData?.map((item, index) => {
                      return (
                        <Fragment key={item.file_id}>
                          <tr className="border-b border-solid border-[#503193] text-white">
                            <th scope="row" className="px-6 py-4 text-white">
                              {index + 1}
                            </th>
                            <td className="px-6 py-4 flex gap-3">
                              {item.type === "Images" ? (
                                <Image
                                  className="rounded-lg w-[30px] h-[30px] cursor-pointer"
                                  src={item.file_details.signed_image_url}
                                  alt="Brand Vision"
                                  width={55}
                                  height={55}
                                  onClick={() =>
                                    window.open(
                                      item.file_details.signed_image_url,
                                      "_blank",
                                      "noopener,noreferrer",
                                    )
                                  }
                                />
                              ) : (
                                <video
                                  src={item.file_details.signed_video_url}
                                  className="rounded-lg w-[30px] h-[30px] cursor-pointer"
                                  controls={false}
                                  onClick={() =>
                                    window.open(
                                      item.file_details.signed_video_url,
                                      "_blank",
                                      "noopener,noreferrer",
                                    )
                                  }
                                />
                              )}
                              <span>{item.name}</span>
                            </td>
                            <td className="px-6 py-4">{item.created_by}</td>
                            <td className="px-6 py-4">
                              {formatDate(item.created_at)}
                            </td>
                            <td className="px-6 py-4">{item.size}</td>
                            <td className="px-6 py-4 font-extrabold">
                              <div
                                className="cursor-pointer"
                                onClick={() => handlePopUp(item)}
                              >
                                <EditSVGIcon className="w-5 h-5"></EditSVGIcon>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          ) : (
            <>
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className=" text-[16px]  font-medium text-nyx-yellow bg-[#091234] sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sr. No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date Created
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Size
                    </th>

                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
              </table>
              <div className="flex justify-center items-center">
                <p className="text-[#FFCB54] font-bold text-[24px] mt-16">
                  There are no asset of this type, generate some now!
                </p>
              </div>
            </>
          )}
        </div>
      )}
      {popUp && (
        <Modal
          isOpen={popUp}
          className=""
          style={assetPopup}
          onRequestClose={() => setPopUp(false)}
          ariaHideApp={false}
        >
          <EditPopUp
            onCancel={() => setPopUp(false)}
            card={card}
            assetRefetch={assetRefetch}
          />
        </Modal>
      )}
      {multiDel && (
        <Modal
          isOpen={multiDel}
          style={deletePopupStyle}
          onRequestClose={() => setMultiDel(false)}
        >
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setMultiDel(false);
              }}
            >
              <CrossIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="w-full my-5">
            <p className="w-full text-center text-[#FFFFFF] text-base">
              Are you sure you want to delete these Assets?
            </p>
          </div>

          <div className="w-full flex gap-4 mb-5 justify-center items-center">
            <Button
              className="rounded-full w-40"
              onClick={() => {
                setMultiDel(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="rounded-full w-40"
              onClick={handleMultipleDelete}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
      <div className="absolute top-[-150px] right-10 z-50">
        <BackToTopButton />
      </div>
      {!isLoading &&
        filterData?.length === 0 &&
        ((page === 1 && search.length === 0 && !expand) || expand ? (
          <div className="w-full text-center text-[#FFCB54] text-[20px]">
            There are no assets of this type. Generate some now with our tools.
          </div>
        ) : null)}

      <div className="w-full flex justify-center gap-x-4 mt-4">
        <div onClick={() => setPage((prev) => prev - 1)}>
          <Button className={`${page === 1 ? "hidden" : ""} rounded-full p-2`}>
            {" "}
            <BsChevronLeft />
          </Button>
        </div>
        <div onClick={() => setPage((prev) => prev + 1)}>
          <Button
            className={`${!data?.hasNextPage ? "hidden" : ""} rounded-full p-2`}
          >
            <BsChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
