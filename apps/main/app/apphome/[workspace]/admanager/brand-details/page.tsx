/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useContext } from "react";
import Button from "@nyx-frontend/main/components/Button";
import BrandingChip from "./_components/BrandingChip";
import ProductChip from "./_components/ProductChip";
import { useSearchParams } from "next/navigation";
import ButtonLoadingGenAI from "@nyx-frontend/main/components/ButtonLoadingGenAI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getbrandWorkspaceService,
  getbrandServiceonbording,
} from "@nyx-frontend/main/services/brandService";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import {
  addTagetGroupPopupStyle,
  addProductPopupStyle,
  deletePopupStyle,
  popupHeader2,
} from "@nyx-frontend/main/utils/modalstyles";
import {
  getAllPlatform,
  getAllGoals,
  getPixel,
} from "@nyx-frontend/main/services/admanagerServices";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import {
  deleteproductbyid,
  addProductServices,
} from "@nyx-frontend/main/services/brandService";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import useStore from "../component/store";
import Steper from "../component/Steper";
import {
  getCampaign,
  updateCampaign,
} from "@nyx-frontend/main/services/admanagerServices";
import Objectives from "../campaign-creation/_components/Objectives";
import useGlobalStore from "../store/store";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const imageTypes = ["image/jpeg", "image/png", "image/jpg"];

interface ProductData {
  id: number | null;
  product_name: string | null;
  product_images: string[];
  description: string | null;
  product_Id: number | null;
  brandId: number | null;
  brand_id: number | null | unknown;
  workspace_id: number | null;
}

const Page = () => {
  const { displayMessagePopup } = useContext(MessagePopupContext);
  const router = useRouter();
  const [selectbrandid, setselectbrandid] = useState<any>(null);
  const [userBrandClick, setUserBrandClick] = useState(false);
  const [userBrandClickIndex, setuserBrandClickIndex] = useState(null);
  const [brandProducts, setBrandProducts] = useState<ProductData[]>([]);
  const [selectproductid, setselectproductid] = useState<any>(null);
  const [workspacename, setWorkspacename] = useState<string>("");
  const [productErrMessage, setProductErrMessage] = useState("");
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [productError, setProductError] = useState(false);
  const [productedit, setproductedit] = useState(false);
  const [editproductid, seteditproductid] = useState<number | null>(null);
  const [productname, setproductname] = useState<string>("");
  const [productdiscrption, setproductdiscrption] = useState<string>("");
  const [productImages, setProductImages] = useState<string[]>([]); // To hold existing logos
  const [productLogos, setProductLogos] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Firststeper, setFirststeper] = useState(false);
  const { setElement } = useStore();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const search = useSearchParams();
  const {
    objective,
    goalId,
    goalData,
    subTopic,
    optionValue,
    channlesArray,
    channelIdArray,
    setObjective,
    setChannelsArray,
    setGoalId,
    setGoalData,
    setSubTopic,
    setOptionValue,
    setChannelIdArray,
  } = useGlobalStore();

  useEffect(() => {
    setElement("element4", false);
    setElement("element3", false);
    setElement("element2", false);
    setElement("element1", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mutateAddProductFile = useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProductServices,
  });

  const {
    data: campaignDetails,
    isLoading: getCampaignLoading,
    isFetching: dataFetching,
    isPending: dataPending,
  } = useQuery({
    queryKey: ["getCampaign-campaign", Number(search.get("campaignId"))],
    queryFn: () => {
      if (Number(search.get("campaignId"))) {
        return getCampaign(Number(search.get("campaignId")));
      }

      return null;
    },
    enabled: !!Number(search.get("campaignId")),
  });

  const {
    data: allGoals,
    isLoading: allGoalsLoading,
    isFetching: allGoalsFetching,
    isPending: allGoalsPending,
  } = useQuery({
    queryKey: ["Goalls-All-brand"],
    queryFn: () => {
      return getAllGoals();
    },
  });

  useEffect(() => {
    if (campaignDetails && allGoals) {
      setObjective(campaignDetails?.data[0]?.objective);
      setGoalId(campaignDetails?.data[0]?.goalId);
      if (campaignDetails?.data[0]?.objectiveInfo) {
        if (campaignDetails?.data[0]?.objectiveInfo?.subtopic) {
          setSubTopic(campaignDetails?.data[0]?.objectiveInfo?.subtopic);
          setOptionValue({
            objective: campaignDetails?.data[0]?.objective,
            option: campaignDetails?.data[0]?.objectiveInfo?.subtopic,
          });
        }
      }
      setGoalData(
        allGoals?.find(
          (goal: any) => goal.goalName === campaignDetails.data[0].objective
        )
      ); // Set the matching goal data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignDetails, allGoals]);

  useEffect(() => {
    if (search.has("brandid") && Number(search.get("brandid")) != 0) {
      setselectbrandid(Number(search.get("brandid")));
      setUserBrandClick(true);
    }
    if (
      search.get("productid") != null &&
      search.get("productid") != undefined &&
      Number(search.get("productid")) != 0
    ) {
      setselectproductid(Number(search.get("productid")));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data: brandDetails, isPending: brandPending } = useQuery({
    queryKey: ["get-brands"],
    queryFn: async () =>
      await getbrandWorkspaceService(localStorage.getItem("workspace_id")),
  });

  useEffect(() => {
    if (brandDetails) {
      setselectbrandid(brandDetails[0]?.id);
      setUserBrandClick(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandDetails]);

  const {
    data: productDetails,
    isLoading: productPending,
    refetch: getProductRefetch,
  } = useQuery({
    queryKey: ["get-product", selectbrandid],
    queryFn: () => {
      if (selectbrandid) {
        return getbrandServiceonbording(selectbrandid);
      }

      return null;
    },
  });

  useEffect(() => {
    const name = localStorage.getItem("workspace_name");
    if (name) {
      setWorkspacename(name);
    }
  }, []);

  useEffect(() => {
    setBrandProducts(productDetails?.brand_product_v2 ?? []);
  }, [productDetails, getProductRefetch]);

  const userSelectedBrand = (id: any, index: any) => {
    setselectbrandid(id);
    setUserBrandClick(true);
    setuserBrandClickIndex(index);
  };

  const clickoneditbrand = (id: any) => {
    router.push(
      `/apphome/${localStorage.getItem(
        "workspace_name"
      )}/onboarding-new?brandid=${id}`
    );
    sessionStorage.setItem("brandid_admanager", id);
  };

  const onAddNewBrand = () => {
    router.push(
      `/apphome/${localStorage.getItem("workspace_name")}/onboarding-new`
    );
    sessionStorage.removeItem("brandid_admanager");
  };

  const userSelectedProduct = (id: any) => {
    setselectproductid((pid: any) => (pid !== null && pid === id ? null : id));
  };

  /**
   * Product edit click handler
   * @param {*} id
   */
  function onclickoneditproduct(product: ProductData) {
    if (product.id) {
      setAddProductPopup(true);
      setproductedit(true);
      seteditproductid(product.id);
      //@ts-ignore
      setproductname(product.product_name);
      setproductdiscrption(product.description ?? "");
      if (product.product_images !== null) {
        setProductImages(product.product_images);
      }
    }
  }

  /**
   *
   */
  function onClickToAddProductHandler() {
    setAddProductPopup(true);
    setproductedit(false);
    setproductname("");
    setproductdiscrption("");
    seteditproductid(null);
  }

  const handleAddProductModal = () => {
    setAddProductPopup(false);
    setProductError(false);
  };

  const handleDeleteproductPopup = () => {
    setAddProductPopup(false);
    setDeletePopup(true);
  };

  /**
   * Product logo remove handler
   * @param typeOfBrandLogo 'new' | 'edit' value can be one of 'new' or 'edit'
   * @param valueOfBrandLogo string | File when type is new then value should have File object and if type is edit then value should have string image file name
   */
  const removeProductLogo = (typeOfLogo: any, valueOfLogo: any) => {
    if (typeOfLogo === "new") {
      setProductLogos((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfLogo)
      );
    } else if (typeOfLogo === "edit") {
      setProductImages((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfLogo)
      );
    }
  };

  // return a preview for the image file object
  const getImagePreview = (imageFile: any) => {
    if (!imageFile) {
      return "";
    }

    return URL.createObjectURL(imageFile);
  };

  /**
   * Product image change handles
   * @param event
   */
  const handleInputProductLogo = (event: any) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile && imageTypes.includes(selectedFile.type)) {
      setProductLogos((prev) => [...prev, selectedFile]);
    } else {
      displayMessagePopup(
        "handle-input-prod-logo",
        "error",
        "Error",
        "Upload file is not a valid image."
      );
    }

    event.target.value = "";
  };

  /**
   * Product submit handler
   */
  const editproductnext = () => {
    if (!productname || productname.length == 0) {
      setProductError(true);
      setProductErrMessage("Product name is required");
      (function () {
        const error = () => {
          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please fill required data.
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    } else if (productname.length > 15) {
      setProductError(true);
      setProductErrMessage(
        "Product name should be a maximum of 15 characters."
      );
    } else if (productname.trim() === "") {
      setProductError(true);
      setProductErrMessage("Product name cannot contain only spaces.");
    } else {
      setProductError(false);
      const data = new FormData();
      const workspaceID = localStorage.getItem("workspace_id");

      data.append("productName", productname);
      data.append("description", productdiscrption ?? "");

      data.append("workspace_id", String(workspaceID));

      data.append("brandId", String(selectbrandid));

      if (editproductid) {
        data.append("product_Id", String(editproductid));
        data.append("product_images", JSON.stringify(productImages));
      }

      // Add the new image files added by the user
      if (productLogos.length) {
        for (var x = 0; x < productLogos.length; x++) {
          data.append("productImages", productLogos[x], productLogos[x].name);
        }
      }

      mutateAddProductFile.mutate(data, {
        onSuccess: (response) => {
          if (editproductid !== null) {
            let products = brandProducts.filter(
              (product: ProductData) => product.id !== editproductid
            );
            setBrandProducts([...products, response.product]);
          } else {
            let product: ProductData = response.product;

            if (brandProducts && brandProducts.length) {
              setBrandProducts((prev) => [...prev, product]);
            } else {
              setBrandProducts([product]);
            }
          }

          setproductname("");
          setproductdiscrption("");
          setProductLogos([]);
          setProductImages([]);
          setAddProductPopup(false);
        },
        onError: () => {
          console.log("ERROR !");
        },
      });
    }
  };

  async function deletebuttonpopup() {
    setIsLoading(true);
    try {
      await deleteproductbyid(editproductid);
      setIsLoading(false);
      setDeletePopup(false);
      getProductRefetch();
      console.log("Product deleted successfully");

      setBrandProducts(
        brandProducts.filter((item, index) => item.id !== editproductid)
      );
      // You can add further logic here if needed
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, show error message to the user, etc.
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="relative flex items-center justify-center h-full mt-2">
        <Steper />
      </div>
      <div className="w-full h-full">
        <div
        // className="bg-[#3B226F] h-[71vh] overflow-hidden overflow-y-auto rounded-t-lg"
        >

          <div className="p-6 flex flex-col gap-5">
            <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-[14px] xl:text-[16px]">
              <p className="font-semibold pb-2 border-b-[0.5px] border-opacity-60 border-[#FFFFFF99]">
                Choose Brand<span className="text-[#E26971] ml-1">*</span>
              </p>
              <div className="w-full flex flex-wrap gap-2 pt-2">
                {brandPending ? (
                  <svg
                    width="25"
                    height="25"
                    className="inline text-gray-200 text-center animate-spin dark:text-transparent"
                    viewBox="0 0 25 25"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z" />
                  </svg>
                ) : (
                  brandDetails?.map((brand: any, index: any) => (
                    <BrandingChip
                      key={`brand-chip-${index}`}
                      index={index}
                      brand={brand}
                      isActive={userBrandClick && selectbrandid === brand.id}
                      onClick={userSelectedBrand}
                      onEdit={clickoneditbrand}
                    />
                  ))
                )}

                {brandDetails?.length == 0 ? (
                  <button
                    className="bg-[#332270] w-auto p-2 text-nyx-yellow rounded-md flex gap-2 text-sm font-medium hover:shadow-gray-800 shadow-none hover:shadow-md"
                    onClick={onAddNewBrand}
                  >
                    <div className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-1">
                      <svg
                        viewBox="0 0 17 17"
                        className="w-2 h-2 fill-current text-nyx-yellow"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                      </svg>
                    </div>
                    Add New Brand
                  </button>
                ) : null}
              </div>
            </div>

            {selectbrandid ? (
              <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-[14px] xl:text-[16px]">
                <p className="font-semibold py-2 border-b-[0.5px] border-opacity-60 border-[#FFFFFF99]">Choose Product</p>
                <div className="w-full flex flex-wrap gap-2 pt-2">
                  {productPending ? (
                    <svg
                      width="25"
                      height="25"
                      className="inline text-gray-200 text-center animate-spin dark:text-transparent"
                      viewBox="0 0 25 25"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z" />
                    </svg>
                  ) : (
                    brandProducts?.map((product: ProductData, index: any) => (
                      <ProductChip
                        key={`product-${product.id}`}
                        //@ts-ignore
                        selectedId={selectproductid}
                        //@ts-ignore
                        product={product}
                        index={index}
                        onClick={userSelectedProduct}
                        //@ts-ignore
                        onEdit={onclickoneditproduct}
                      />
                    ))
                  )}

                  <button
                    className="bg-[#332270] w-auto p-2 text-nyx-yellow rounded-md text-xs xl:text-sm font-medium hover:shadow-gray-800 shadow-none hover:shadow-md flex gap-2"
                    onClick={onClickToAddProductHandler}
                  >
                    <div className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-1">
                      <svg
                        viewBox="0 0 17 17"
                        className="w-2 h-2 fill-current text-nyx-yellow"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                      </svg>
                    </div>
                    Add New Product
                  </button>
                </div>
              </div>
            ) : null}

            {allGoals && (
              <Objectives
                objective={objective}
                setObjective={setObjective}
                goalId={goalId}
                setGoalId={setGoalId}
                setChannelsArray={setChannelsArray}
                // setName={setName}
                // name={name}
                // url={url}
                // setUrl={setUrl}
                // campaignDetails={campaignDetails}
                allGoals={allGoals}
                goalData={goalData}
                setGoalData={setGoalData}
                setSubTopic={setSubTopic}
                optionValue={optionValue}
                setChannelIdArray={setChannelIdArray}
                setOptionValue={setOptionValue}
              />
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center my-[10.5px]">
          {selectbrandid && objective ? (
            <Button
              className=" rounded-full w-32 bg-nyx-yellow hover:shadow-none text-black font-semibold"
              onClick={() => {
                setIsButtonLoading(true);
                router.push(
                  `/apphome/${workspacename}/admanager/campaign-creation?brandid=${selectbrandid}&productid=${selectproductid}${search.has("campaignId")
                    ? `&campaignId=${Number(search.get("campaignId"))}`
                    : ""
                  } `
                );
                setElement("element1", true);
              }}
            >
              {isButtonLoading ? <ButtonLoadingGenAI /> : "Next"}
            </Button>
          ) : (
            <button className="shadow-gray-600 bg-gray-600 border-gray-600 text-black hover:bg-gray-600 rounded-full w-32 hover:shadow-none font-semibold py-2 cursor-not-allowed">
              Next
            </button>
          )}
        </div>
      </div>

      {addProductPopup ? (
        <Modal
          isOpen={addProductPopup}
          style={addProductPopupStyle}
          onRequestClose={handleAddProductModal}
        >
          <div className="flex justify-between">
            <div className="text-[16px] font-bold text-[#FFFFFF]">
              {productedit ? "Edit Product" : "Add Product"}
            </div>

            <div className="flex gap-1">
              {productedit ? (
                <div
                  className="cursor-pointer flex"
                  onClick={() => handleDeleteproductPopup()}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                      fill="white"
                    />
                  </svg>
                </div>
              ) : null}

              <div className="cursor-pointer" onClick={handleAddProductModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#FFFFFF"
                    d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 mt-3">
            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-[14px] font-[700]">
                Product Name <span className="text-[#D13946]">*</span>
              </div>
              <input
                type="text"
                className={`placeholder:text-sm w-full h-[40px] bg-transparent border ${productError ? "border-nyx-red" : "border-[#8297BD]"
                  } rounded-md p-2 font-normal text-[#FFFFFF]  placeholder:italic`}
                placeholder="Add Product Name"
                value={productname}
                onChange={(e) => setproductname(e.target.value)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Add Product Name")}
              />

              {productError ? (
                <p className="text-nyx-red text-xs">{productErrMessage}</p>
              ) : null}
            </div>

            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-[14px] font-[700]">
                Product Description
              </div>

              <textarea
                className="placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md h-[80px] p-2 font-lighter text-[#FFFFFF]"
                placeholder="Product Description"
                //@ts-ignore
                value={productdiscrption}
                onChange={(e) => setproductdiscrption(e.target.value)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "Add Product Description")
                }
                maxLength={500}
              ></textarea>
              <p
                className={`text-right text-xs font-normal ${productdiscrption.length === 500
                    ? "text-[#E26971]"
                    : "text-[#FFFFFF]"
                  }`}
              >
                {productdiscrption.length === 500
                  ? "Maximum word limit reached"
                  : ""}
                {"                                      "}
                {productdiscrption.length}/500
              </p>
            </div>

            <div className="w-full flex gap-4 mt-6 justify-center items-center">
              <Button
                className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={handleAddProductModal}
              >
                Cancel
              </Button>
              <Button
                className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={editproductnext}
              >
                {mutateAddProductFile.isPending ? "Loading.." : "Next"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      {deletePopup ? (
        <Modal
          isOpen={deletePopup}
          style={deletePopupStyle}
        //onRequestClose={handleTargetGroupModal}
        >
          <div className="flex justify-between">
            <div className="text-base font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="cursor-pointer"
              onClick={() => {
                setDeletePopup(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6 mt-4">
            <div className="w-full text-center text-[#FFFFFF] text-sm font-[600]">
              Are you sure you want to delete this Product?
            </div>

            <div className="w-full flex gap-4 justify-center items-center">
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={() => {
                  setDeletePopup(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={() => deletebuttonpopup()}
              >
                {isLoading ? "Deleteing.." : "Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Page;
