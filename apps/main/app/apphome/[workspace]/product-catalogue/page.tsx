/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import Select from "react-select";
import { campaignSortStyle } from "@nyx-frontend/main/utils/productStyle";
import { campaignStatusSort } from "@nyx-frontend/main/utils/productConstants";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getBuisnessId,
  getAllBusinessidsProductCatalouge,
  getAllProductofCatalouge,
  uploadLinkGoogleProductCatalouge,
  uploadFileGoogleProductCatalouge,
  uploadLinkMetaProductCatalouge,
  uploadFileMetaProductCatalouge,
  getGmc,
  getGmcProduct,
} from "@nyx-frontend/main/services/admanagerServices";
import { getbrandWorkspaceService } from "@nyx-frontend/main/services/brandService";
import MetaUploadModal from "./_components/MetaUploadModal";
import GoogleUploadModal from "./_components/GoogleUploadModal";
import AllProductModal from "./_components/AllProductModal";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const tabs = [
  {
    name: "Google Ads",
  },
  {
    name: "Meta Links",
  },
];

const page = () => {
  const [selectedTab, setSelectedTab] = useState("Google Ads");
  const [search, setSearch] = useState("");
  const [metaUploadPopup, setMetaUploadPopup] = useState(false);
  const [googleUploadPopup, setGoogleUploadPopup] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [allProductResults, setAllProductsResults] = useState();
  const [buinessOption, setBuisnessOption] = useState([]);
  const [gmcOption, setGmcOption] = useState([]);
  const [buisnessId, setBuisnessId] = useState<any>();
  const [gmcId, setGmcId] = useState<any>();
  const [gmcIds, setGmcIds] = useState([]);
  const [activeGMCTab, setActiveGMCTab] = useState(null);

  const [metaLinkLoading,setMetaLinkLoding] = useState(false);
  const [metaFileLoading, setMetaFileLoading] = useState(false);

  const [googleLinkLoading,setGoogleLinkLoding] = useState(false);
  const [googleFileLoading, setGoogleFileLoading] = useState(false);

  const mutateAllProductsofCatalog = useMutation({
    mutationKey: ["products-of-catalog"],
    mutationFn: getAllProductofCatalouge,
  });

  const mutateuploadLinkMetaProductCatalog = useMutation({
    mutationKey: ["uploadlink"],
    mutationFn: uploadLinkMetaProductCatalouge,
  });

  const mutateuploadFileGoogleProductCatalogue = useMutation({
    mutationKey: ["uploadfile-google"],
    mutationFn: uploadFileGoogleProductCatalouge,
  });

  const mutateuploadLinkGoogleProductCatalogue = useMutation({
    mutationKey: ["uploadlink-google"],
    mutationFn: uploadLinkGoogleProductCatalouge,
  });

  const mutateuploadFileMetaProductCatalog = useMutation({
    mutationKey: ["uploadfile"],
    mutationFn: uploadFileMetaProductCatalouge,
  });

  const { data: brandDetails } = useQuery({
    queryKey: ["get-brands"],
    queryFn: async () =>
      await getbrandWorkspaceService(localStorage.getItem("workspace_id")),
  });

  const { data: gmcIdDetails } = useQuery({
    queryKey: ["gmc-ids", brandDetails],
    queryFn: () => {
      const data = {
        workspace_id: Number(localStorage.getItem("workspace_id")),
        brand_id: brandDetails?.[0]?.id,
      };

      if (brandDetails) {
        return getGmc(data);
      }

      return null;
    },
  });

  useEffect(() => {
    if (gmcIdDetails) {
      setGmcIds(gmcIdDetails?.gmcAccounts);
      setActiveGMCTab(gmcIdDetails?.gmcAccounts?.[0]?.id);

      const transformedOptions = gmcIdDetails?.gmcAccounts?.map(
        (item: any) => ({
          value: item.id,
          label: item.name,
        }),
      );

      setGmcOption(transformedOptions);
    }
  }, [gmcIdDetails]);

  const { data: businessIdDetails } = useQuery({
    queryKey: ["buisness-ids", brandDetails],
    queryFn: () => {
      const data = {
        workspace_id: Number(localStorage.getItem("workspace_id")),
        brand_id: brandDetails?.[0]?.id,
      };

      if (brandDetails) {
        return getBuisnessId(data);
      }

      return null;
    },
  });

  useEffect(() => {
    if (businessIdDetails) {
      const transformedOptions = businessIdDetails?.data?.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));

      setBuisnessOption(transformedOptions);
    }
  }, [businessIdDetails]);

  const { data: gmcProductDetails, refetch: googleProcuctRefetch } = useQuery({
    queryKey: ["gmc--product-details", activeGMCTab],
    queryFn: () => {
      const data = {
        workspace_id: Number(localStorage.getItem("workspace_id")),
        brand_id: brandDetails?.[0]?.id,
        merchant_center_id: String(activeGMCTab),
      };

      if (activeGMCTab) {
        return getGmcProduct(data);
      }

      return null;
    },
  });

  const { data: catalogDetails, refetch: catalogRefetch } = useQuery({
    queryKey: ["catalog-details", businessIdDetails],
    queryFn: () => {
      const data = {
        businessDetails: businessIdDetails?.data,
        brand_id: brandDetails?.[0]?.id,
        workspace_id: Number(localStorage.getItem("workspace_id")),
      };
      if (businessIdDetails) {
        return getAllBusinessidsProductCatalouge(data);
      }

      return null;
    },
  });

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setSelectedTab(tabName);
  };

  const onFilterStatus = () => {};

  const handledViewClicked = (catalogId: any) => {
    let payload = {
      catalog_id: catalogId,
      brand_id: brandDetails?.[0]?.id,
      workspace_id: Number(localStorage.getItem("workspace_id")),
    };

    mutateAllProductsofCatalog.mutate(payload, {
      onSuccess: (response) => {
        setAllProductsResults(response);
        setShowProductPopup(true);
      },
      onError: (error) => {
        (function () {
          const error = () => {
            toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Bad Request!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Try again
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
    });
  };

  const onSubmitLink = (link: string) => {
    setMetaLinkLoding(true);
    let payload = {
      business_id: buisnessId,
      brand_id: brandDetails?.[0]?.id,
      workspace_id: Number(localStorage.getItem("workspace_id")),
      feed_url: link,
    };

    mutateuploadLinkMetaProductCatalog.mutate(payload, {
      onSuccess: (response) => {
        setMetaLinkLoding(false);
        setMetaUploadPopup(false);
        catalogRefetch();
        (function () {
          const error = () => {
            toast.success(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Upload Successful!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Your product is under review by Google/Meta, max 5 days.
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
      onError: (error) => {
        setMetaLinkLoding(false);
        setMetaUploadPopup(false);
        (function () {
          const error = () => {
            toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Bad Request!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Try again
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
    });
  };

  const onSubmitFile = (file: File) => {
    setMetaFileLoading(true);
    const formData = new FormData();

    formData.append("business_id", buisnessId);
    formData.append("brand_id", brandDetails?.[0]?.id.toString());
    formData.append("workspace_id", localStorage.getItem("workspace_id") || "");
    formData.append("file", file);

    mutateuploadFileMetaProductCatalog.mutate(formData, {
      onSuccess: (response) => {
        setMetaFileLoading(false);
        setMetaUploadPopup(false);
        catalogRefetch();
        (function () {
          const error = () => {
            toast.success(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Upload Successful!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Your product is under review by Google/Meta, max 5 days.
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
      onError: (error) => {
        setMetaFileLoading(false);
        setMetaUploadPopup(false);
        (function () {
          const error = () => {
            toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Bad Request!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Try again
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
    });
  };

  const onSubmitLinkGoogle = (link: string) => {
    setGoogleLinkLoding(true);
    let payload = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      brand_id: brandDetails?.[0]?.id,
      merchant_center_id: gmcId,
      url: link,
    };

    mutateuploadLinkGoogleProductCatalogue.mutate(payload, {
      onSuccess: (response) => {
        setGoogleLinkLoding(false);
        setGoogleUploadPopup(false);
        googleProcuctRefetch();
        (function () {
          const error = () => {
            toast.success(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Upload Successful!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Your product is under review by Google/Meta, max 5 days.
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
      onError: (error) => {
        setGoogleLinkLoding(false);
        setGoogleUploadPopup(false);
        (function () {
          const error = () => {
            toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Bad Request!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Try again
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
    });
  };

  const onSubmitFileGoogle = (file: File) => {
    setGoogleFileLoading(true);
    const formData = new FormData();

    formData.append("merchant_center_id", gmcId);
    formData.append("brand_id", brandDetails?.[0]?.id.toString());
    formData.append("workspace_id", localStorage.getItem("workspace_id") || "");
    formData.append("file", file);

    mutateuploadFileGoogleProductCatalogue.mutate(formData, {
      onSuccess: (response) => {
        setGoogleFileLoading(false);
        setGoogleUploadPopup(false);
        googleProcuctRefetch();
        (function () {
          const error = () => {
            toast.success(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Upload Successful!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Your product is under review by Google/Meta, max 5 days.
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
      onError: (error) => {
        setGoogleFileLoading(false);
        setGoogleUploadPopup(false);
        (function () {
          const error = () => {
            toast.error(
              <>
                <span className="text-white text-[16px] leading-[20px]">
                  {" "}
                  Bad Request!
                </span>
                <br />
                <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                  {" "}
                  Try again
                </span>
              </>,
              { autoClose: 5000 },
            );
          };

          error(); // Invoke the Warning function immediately
        })();
      },
    });
  };

  const handleGMCTabClick = (id: any) => {
    setActiveGMCTab(id);
  };

  return (
    <>
      <div className="flex overflow-x-hidden">
        <Sidebar />
        <div className="w-full p-5 py-4 overflow-hidden overflow-y-auto h-[100vh]">
          <div className="w-full px-2">
            <Profileicon hide={""} />
          </div>

          <div className="p-5">
            <div className="text-[#FFFFFF] text-2xl font-bold mt-5">
              Product Catalogue
            </div>
            <div className="text-[#FFFFFF] text-sm font-light mt-2">
              Upload catalogue here
            </div>
            <hr className="border-t border-gray-300 my-5" />

            <div className="flex gap-4 w-fit border-b-[2px] border-[#FFFFFF] border-opacity-20 pr-2">
              {tabs.map((tab) => (
                <div
                  key={tab.name}
                  className={`relative pb-2 cursor-pointer text-center transition-all ${
                    selectedTab === tab.name
                      ? "text-[#3B226F]"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick(tab.name)}
                >
                  <span
                    className={`${
                      selectedTab === tab.name
                        ? "text-[#FFC01D] text-base font-bold"
                        : "text-white text-base font-bold"
                    }`}
                  >
                    {tab.name}
                  </span>
                  {selectedTab === tab.name && (
                    <div className="absolute bottom-[-3px] left-[-10px] w-[calc(100%+20px)] rounded-sm h-[5px] bg-[#FFD700]"></div>
                  )}
                </div>
              ))}
            </div>

            {selectedTab == "Google Ads" && (
              <div className="w-full">
                {/* <div className="w-full my-5 flex justify-between">
                  <input
                    type="text"
                    value={search}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "Search your Product")
                    }
                    placeholder="Search your Product"
                    className="text-[14px] font-normal text-white rounded border-[1px] px-[18px] py-[10px] border-[#8297BD] bg-inherit w-[236px] outline-none appearance-none"
                  />

                  <div className="flex gap-3">
                    <Select
                      className="text-sm md:text-base z-99 w-[236px] text-white bg-inherit text-[14px]"
                      options={campaignStatusSort}
                      onChange={onFilterStatus}
                      menuPlacement="bottom"
                      placeholder="Filter"
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 4,
                        borderColor: "white",
                      })}
                      styles={campaignSortStyle}
                      isSearchable={false}
                    />
                    <button
                      className={`w-[175px] h-[37px] bg-[#FFCB54] font-normal rounded-[72px] text-[14px] leading-[17px] flex gap-1 justify-center items-center
                       `}
                    >
                      Upload Items
                    </button>
                  </div>
                </div> */}
                <div className="w-full flex justify-end my-5">
                  <button
                    className={`w-[175px] h-[37px] bg-[#FFCB54] font-normal rounded-[72px] text-[14px] leading-[17px] flex gap-1 justify-center items-center`}
                    onClick={() => setGoogleUploadPopup(true)}
                  >
                    Upload Items
                  </button>
                </div>

                <div className="flex whitespace-nowrap md:whitespace-normal">
                  {gmcIds?.map((item: any) => (
                    <div
                      key={item?.id}
                      className="w-32 md:w-72 text-center cursor-pointer"
                      onClick={() => handleGMCTabClick(item?.id)}
                    >
                      <div
                        className={
                          item.id === activeGMCTab
                            ? "border-[#FFC01D] text-white border-b-4 text-base mt-1 font-bold"
                            : "mt-1 border-b-4 text-base text-white border-slate-700 font-normal"
                        }
                      >
                        <div className="mb-4">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <table className="min-w-full bg-[#301959] rounded-[10px]  dashboardTableStyle pb-2  my-5">
                  <thead className="bg-[#28134B] rounded-[10px]  h-[44px] mt-[12px] sticky top-0 z-[1] ">
                    <tr className="text-[#E9BD4E] text-[14px] leading-[18px]">
                      <th className="w-1/5 text-left rounded-tl-[10px] px-[20px]">
                        Title
                      </th>
                      <th className="w-1/5 text-left px-[20px]">Type</th>
                      <th className="w-1/5 text-left px-[20px]">Price</th>
                      <th className="w-1/5 text-left px-[20px]">Channel</th>
                      <th className="w-1/5 text-left rounded-tr-[10px] px-[20px]">
                        Availability
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {gmcProductDetails?.length > 0 ? (
                      gmcProductDetails?.map((item: any, index: any) => (
                        <tr
                          key={index}
                          className="text-[14px] leading-[18px] font-[400]"
                          style={{
                            borderBottom:
                              index === gmcProductDetails?.length - 1
                                ? "none"
                                : "1px solid #8297BD",
                          }}
                        >
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            {item?.title}
                          </td>
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            {item?.productTypes}
                          </td>
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            {item?.price?.value} {item?.price?.currency}
                          </td>
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            {item?.channel}
                          </td>
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            {item?.availability}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-[20px] py-[15px] text-[#FFFFFF] text-center"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {selectedTab == "Meta Links" && (
              <div className="w-full">
                {/* <div className="w-full my-5 flex justify-between">
                  <input
                    type="text"
                    value={search}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "Search your Product")
                    }
                    placeholder="Search your Product"
                    className="text-[14px] font-normal text-white rounded border-[1px] px-[18px] py-[10px] border-[#8297BD] bg-inherit w-[236px] outline-none appearance-none"
                  />

                  <div className="flex gap-3">
                    <Select
                      className="text-sm md:text-base z-99 w-[236px] text-white bg-inherit text-[14px]"
                      options={campaignStatusSort}
                      onChange={onFilterStatus}
                      menuPlacement="bottom"
                      placeholder="Filter"
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 4,
                        borderColor: "white",
                      })}
                      styles={campaignSortStyle}
                      isSearchable={false}
                    />
                    <button
                      className={`w-[175px] h-[37px] bg-[#FFCB54] font-normal rounded-[72px] text-[14px] leading-[17px] flex gap-1 justify-center items-center
                         `}
                      onClick={() => setMetaUploadPopup(true)}
                    >
                      Upload Items
                    </button>
                  </div>
                </div> */}
                <div className="w-full flex justify-end my-5">
                  <button
                    className={`w-[175px] h-[37px] bg-[#FFCB54] font-normal rounded-[72px] text-[14px] leading-[17px] flex gap-1 justify-center items-center
                         `}
                    onClick={() => setMetaUploadPopup(true)}
                  >
                    Upload Items
                  </button>
                </div>
                <table className="min-w-full bg-[#301959] rounded-[10px]  dashboardTableStyle pb-2 ">
                  <thead className="bg-[#28134B] rounded-[10px]  h-[44px] mt-[12px] sticky top-0 z-[1] ">
                    <tr className="text-[#E9BD4E] text-[14px] leading-[18px]">
                      <th className="w-1/5 text-left rounded-tl-[10px] px-[20px]">
                        Catalog Name
                      </th>
                      <th className="w-1/5 text-left px-[20px]">
                        Catalog Size
                      </th>
                      <th className="w-1/5 text-left px-[20px]">Business ID</th>
                      <th className="w-1/5 text-left px-[20px]">Catalog ID</th>
                      <th className="w-1/5 text-left rounded-tr-[10px] px-[20px]"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {catalogDetails?.data?.length > 0 ? (
                      catalogDetails?.data?.map((item: any, index: any) => (
                        <tr
                          key={index}
                          className="text-[14px] leading-[18px] font-[400]"
                          style={{
                            borderBottom:
                              index === catalogDetails?.data?.length - 1
                                ? "none"
                                : "1px solid #8297BD",
                          }}
                        >
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            {item?.name}
                          </td>
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            {item?.product_count}
                          </td>
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            {item?.business_id}
                          </td>
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            {item?.id}
                          </td>
                          <td className="px-[20px] py-[15px] text-[#FFFFFF]">
                            <button
                              className="underline"
                              onClick={() => handledViewClicked(item?.id)}
                            >
                              View More
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-[20px] py-[15px] text-[#FFFFFF] text-center"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {metaUploadPopup ? (
        <MetaUploadModal
          isOpen={metaUploadPopup}
          onClose={() => {
            setMetaUploadPopup(false);
            setBuisnessId(null);
          }}
          onSubmitLink={onSubmitLink}
          onSubmitFile={onSubmitFile}
          buinessOption={buinessOption}
          buisnessId={buisnessId}
          setBuisnessId={setBuisnessId}
          metaLinkLoading={metaLinkLoading}
          metaFileLoading={metaFileLoading}
        />
      ) : null}

      {googleUploadPopup ? (
        <GoogleUploadModal
          isOpen={googleUploadPopup}
          onClose={() => {
            setGoogleUploadPopup(false);
            // setBuisnessId(null);
          }}
          onSubmitLink={onSubmitLinkGoogle}
          onSubmitFile={onSubmitFileGoogle}
          gmcOption={gmcOption}
          gmcId={gmcId}
          setGmcId={setGmcId}
          googleLinkLoading={googleLinkLoading}
          googleFileLoading={googleFileLoading}
        />
      ) : null}

      {showProductPopup ? (
        <AllProductModal
          isOpen={showProductPopup}
          onClose={() => setShowProductPopup(false)}
          allProductResults={allProductResults}
        />
      ) : null}
    </>
  );
};

export default page;
