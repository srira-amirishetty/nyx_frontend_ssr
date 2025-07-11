/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { BsChevronLeft } from "react-icons/bs";
import BgColorButton from "@nyx-frontend/main/components/_components/BgColorButton";
import { BrandImageGenerationContext } from "@nyx-frontend/main/hooks/BrandImageGenerationContext";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import { nanoid } from "nanoid";
import Button from "@nyx-frontend/main/components/Button";
import Modal from "react-modal";
import {
  addProductPopupStyle,
  deletePopupStyle,
  popupHeader2,
} from "@nyx-frontend/main/utils/modalstyles";
import {
  addProductServices,
  addBrandServices,
  addTargetGroupServices,
  deleteproductbyid,
  deletetargetbyid,
} from "@nyx-frontend/main/services/brandService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getbrandServiceonbording } from "@nyx-frontend/main/services/brandService";
import ValidateStringSpecial from "@nyx-frontend/main/components/ValidateStringSpecial";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { admanagerSystemUpload } from "@nyx-frontend/main/services/admanagerServices";

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

const SecondPage = ({ renderComponent, firstPageResponse }: any) => {
  const {
    onChangeBackgroundColor,
    deleteColor,
    selectbackgroundColor,
    selectedColors,
    setSelectedColors,
    selectedColorButtonClick,
    setSelectBackgroundColor,
  } = useContext(BrandImageGenerationContext);

  const router = useRouter();
  const search = useSearchParams();
  const { displayMessagePopup } = useContext(MessagePopupContext);

  const [brandExistingLogos, setBrandExistingLogos] = useState<string[]>([]);
  const [brandLogos, setBrandLogos] = useState<File[]>([]);
  const [uploadImageProcess, setUploadImageProcess] = useState(false);
  const [brandProducts, setBrandProducts] = useState<ProductData[]>([]);
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [productEdit, setProductEdit] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [productName, setProductName] = useState<string | null>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productLogos, setProductLogos] = useState<File[]>([]);
  const [productIDS, setProductIDS] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productNameErr, setProductNameErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const imageTyeps = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];

  const [brandLogoArray, setBrandLogoArray] = useState<string[]>([]);

  const [productLogoArray, setProductLogoArray] = useState<string[]>([]);

  const { data: brandDetails, refetch: brandRefetch } = useQuery({
    queryKey: ["get-brand"],
    queryFn: () => {
      const brandid = firstPageResponse?.brand?.id;

      if (brandid) {
        return getbrandServiceonbording(brandid);
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    if (brandDetails) {
      setSelectBackgroundColor(brandDetails?.colors || []);

      if (brandDetails?.brand_logos?.length) {
        setBrandLogoArray(brandDetails.brand_logos);
      }

      if (brandDetails.brand_product_v2?.length) {
        setProductIDS(brandDetails.brand_product_v2.map((obj: any) => obj.id));
      }

      setBrandProducts(brandDetails?.brand_product_v2);
    }
  }, [brandDetails, setSelectBackgroundColor]);

  const mutateAddProductFile = useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProductServices,
  });

  const mutateAddBrandFile = useMutation({
    mutationKey: ["add-brand"],
    mutationFn: addBrandServices,
  });

  const removeBrandLogo = (index: number) => {
    setBrandLogoArray((prev) => prev.filter((_, i) => i !== index));
  };

  const removeBrandLogoProduct = (index: number) => {
    setProductLogoArray((prev) => prev.filter((_, i) => i !== index));
  };

  const mutateUploadfromSyetem = useMutation({
    mutationKey: ["upload-system"],
    mutationFn: admanagerSystemUpload,
  });

  const mutateUploadfromSyetemProduct = useMutation({
    mutationKey: ["upload-system-product"],
    mutationFn: admanagerSystemUpload,
  });

  const systemUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mediaFile = event.target.files?.[0];

    if (!mediaFile) {
      console.error("No file selected.");
      return;
    }

    const workspaceId = localStorage.getItem("workspace_id");
    if (!workspaceId) {
      console.error("Workspace ID not found.");
      return;
    }

    const formData = new FormData();
    formData.append("type", "logo");
    formData.append("workspace_id", workspaceId);
    formData.append("file", mediaFile);

    mutateUploadfromSyetem.mutate(formData, {
      onSuccess: (response: any) => {
        setBrandLogoArray((prev) => [
          ...prev,
          response?.data?.signed_image_url,
        ]);
      },
      onError: (res: any) => {
        console.log(res);
      },
    });
  };

  const systemUploadProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mediaFile = event.target.files?.[0];

    if (!mediaFile) {
      console.error("No file selected.");
      return;
    }

    const workspaceId = localStorage.getItem("workspace_id");
    if (!workspaceId) {
      console.error("Workspace ID not found.");
      return;
    }

    const formData = new FormData();
    formData.append("type", "logo");
    formData.append("workspace_id", workspaceId);
    formData.append("file", mediaFile);

    mutateUploadfromSyetemProduct.mutate(formData, {
      onSuccess: (response: any) => {
        setProductLogoArray((prev) => [
          ...prev,
          response?.data?.signed_image_url,
        ]);
      },
      onError: (res: any) => {
        console.log(res);
      },
    });
  };

  // return a preview for the image file object
  const getImagePreview = (imageFile: File) => {
    if (!imageFile) {
      return "";
    }

    return URL.createObjectURL(imageFile);
  };

  /**
   * Edit product button icon
   * @param product ProductData
   */
  const handleClickOnEdit = (product: ProductData) => {
    if (product.id) {
      setAddProductPopup(true);
      setProductEdit(true);
      setEditProductId(product.id);
      setProductName(product?.product_name);
      setProductDescription(product?.description ?? "");

      if (product.product_images !== null) {
        setProductLogoArray(product.product_images);
      }
    }
  };

  const handleAddProductModal = () => {
    setAddProductPopup(false);
    setEditProductId(null);
    setProductName("");
    setProductDescription("");
    setProductLogos([]);
  };

  const handleDeleteProductPopup = () => {
    setAddProductPopup(false);
    setDeletePopup(true);
  };

  const handleInputProductName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductNameErr(false);
    setProductName(event.target.value);
  };

  const handleInputProductDescription = (event: any) => {
    setProductDescription(event.target.value);
  };

  /**
   * Product logo remove handler
   * @param typeOfBrandLogo 'new' | 'edit' value can be one of 'new' or 'edit'
   * @param valueOfBrandLogo string | File when type is new then value should have File object and if type is edit then value should have string image file name
   */
  const removeProductLogo = (
    typeOfLogo: "new" | "edit",
    valueOfLogo: string | File
  ) => {
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

  /**
   * Product image change handles
   * @param event
   */
  const handleInputProductLogo = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile && imageTyeps.includes(selectedFile.type)) {
      setProductLogos((prev) => [...prev, selectedFile]);
    } else {
      displayMessagePopup(
        "handle-input-prod-logo",
        "error",
        "Error",
        "Invalid file type. Supported formats: .jpg, .jpeg, .png, .svg."
      );
    }

    event.target.value = "";
  };

  /**
   * add/edit product submit handler
   */
  const addProductNextButton = () => {
    const brandid = firstPageResponse?.brand?.id;
    if (!productName || productName.length == 0) {
      // setProductNameErr(true);
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
                Please fill required data.
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    } else if (productName.length > 15) {
      setProductNameErr(true);
      setErrMessage("Product name should be a maximum of 15 characters.");
    } else if (productName.trim() === "") {
      setProductNameErr(true);
      setErrMessage("Product name cannot contain only spaces.");
    } else if (!ValidateStringSpecial(productName)) {
      setProductNameErr(true);
      setErrMessage("Product name cannot start with a special character.");
    } else {
      // Save the data using api to get the product id
      const data = new FormData();

      const workspaceID = localStorage.getItem("workspace_id");

      data.append("productName", productName);
      data.append("description", productDescription ?? "");
      data.append("workspace_id", String(workspaceID));

      if (brandid) {
        data.append("brandId", brandid);
      }

      if (editProductId) {
        data.append("product_Id", String(editProductId));
        data.append("product_images", JSON.stringify(productLogoArray));
      }

      // Add the new image files added by the user
      if (productLogos.length) {
        for (var x = 0; x < productLogos.length; x++) {
          data.append("productImages", productLogos[x], productLogos[x].name);
        }
      }

      mutateAddProductFile.mutate(data, {
        onSuccess: (response: any) => {
          if (productIDS) {
            setProductIDS([...productIDS, response.product.id]);
          }

          if (editProductId !== null) {
            let products = brandProducts.filter(
              (product: ProductData) => product.id !== editProductId
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

          setProductName("");
          setProductDescription("");
          setProductLogos([]);
          setProductImages([]);
          setAddProductPopup(false);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  /**
   * Product delete handler
   */
  function deleteProductButtonPopup() {
    if (editProductId) {
      setIsLoading(true);
      deleteproductbyid(editProductId)
        .then((data) => {
          setBrandProducts(
            brandProducts.filter((item, index) => item.id !== editProductId)
          );
          setDeletePopup(false);
          handleAddProductModal();
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const brandNextButtonClick = () => {
    const data = new FormData();
    const brandid = firstPageResponse?.brand?.id;
    const workspaceID = localStorage.getItem("workspace_id");

    data.append("brandName", firstPageResponse?.brand?.brand_name);

    data.append("productIds", JSON.stringify(productIDS));
    data.append(
      "colors",
      JSON.stringify(selectbackgroundColor.map((color: string) => color))
    );

    if (brandid) {
      data.append("brand_id", brandid);
      data.append("brand_logos", JSON.stringify(brandLogoArray));
    }
    data.append("workspace_id", String(workspaceID));

    mutateAddBrandFile.mutate(data, {
      onSuccess: (response: any) => {
        console.log(response);

        if (
          search.has("isNewWorkspace") &&
          search.get("isNewWorkspace") == "true"
        ) {
          router.push(
            `/apphome/${localStorage.getItem("workspace_name")}/dashboard`
          );
        } else {
          router.back();
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handle = () => {
    renderComponent("first");
  };

  return (
    <>
      <div className="w-full">
        <div className="w-[950px] mx-auto pt-10 px-20 flex flex-col">
          <div className="w-full bg-black p-3.5 flex gap-2 rounded-t-lg justify-between">
            <div className="flex gap-3">
              <BsChevronLeft
                className="text-[#FFF] text-xl cursor-pointer"
                onClick={handle}
              />
              <p className="text-[#FFFFFF]">Edit Brand Info</p>
            </div>

            <div
              className="text-[#FFFFFF] cursor-pointer underline"
              onClick={() => router.back()}
            >
              skip
            </div>
          </div>

          <div className="w-full min-h-[650px] bg-[#3B236F] px-10 py-5 flex flex-col rounded-b-md">
            <p className="text-xl text-[#FFFFFF]">Add Brand logos and colors</p>
            <div className="w-[280px] p-0.5 bg-[#FFC01D] mb-4 mt-1"></div>

            <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
              <p className="font-semibold py-2">Brand Colors</p>

              <div className="w-full my-2 flex flex-wrap gap-5">
                <BgColorButton onChange={onChangeBackgroundColor} />

                {selectbackgroundColor.map((bg: any) => (
                  <div key={nanoid()} className="group relative inline-block">
                    <button
                      className={`group w-[70px] h-[70px] rounded-xl overflow-hidden hover:bg-nyx-sky ${
                        selectedColors.has(bg)
                          ? "bg-nyx-sky text-[#FFFFFF]"
                          : "bg-[#6F559A] text-[#FFFFFF]"
                      }`}
                      onClick={() => selectedColorButtonClick(bg)}
                    >
                      <div
                        className="w-full h-[50px] mx-auto mt-[-8px]"
                        style={{ backgroundColor: bg }}
                      ></div>
                      <p className="text-[10px] mt-1.5 uppercase text-center">
                        {bg.replace(/#/g, "")}
                      </p>
                    </button>
                    <button
                      onClick={() => deleteColor(bg)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-8px] right-[-8px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
              <p className="font-semibold py-2">Brand Logos</p>
              <div className="w-full my-2 flex flex-wrap gap-5">
                {brandLogoArray.map((item: any, index: number) => (
                  <div className="group relative" key={index}>
                    {" "}
                    {/* Add key here */}
                    <div className="bg-[#1D1138] w-[136px] h-[50px] rounded-t-lg text-[#FFF] px-2 py-4 font-medium">
                      Brand Logo {index + 1}
                    </div>
                    <div className="bg-black w-[136px] h-[86px] rounded-b-lg flex justify-center items-center flex-col">
                      <img
                        src={item}
                        className="h-full object-contain"
                        alt="item"
                      />
                    </div>
                    <button
                      onClick={() => removeBrandLogo(index)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-6px] right-[-6px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}

                {mutateUploadfromSyetem.isPending && <div>Loading...</div>}

                <div className="">
                  <div className="bg-[#1D1138] w-[136px] h-[50px] rounded-t-lg text-[#FFF] px-2 py-4 font-medium">
                    Add Logos
                  </div>
                  <div className="bg-[#50387B] w-[136px] h-[86px] rounded-b-lg flex justify-center items-center flex-col">
                    <label className="w-10 h-10 cursor-pointer inline-flex items-center justify-center bg-transparent border border-nyx-yellow rounded-full p-2 font-normal">
                      <input
                        type="file"
                        className="hidden border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                        placeholder="Brand Logo"
                        accept=".jpg , .jpeg, .png, .svg"
                        onChange={systemUpload}
                      />

                      <svg
                        viewBox="0 0 17 17"
                        className="w-4 h-4 fill-current text-nyx-yellow"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 mt-10">
              <p className="text-xl text-[#FFFFFF]">
                Provide your product information
              </p>
              <div className="w-[345px] p-0.5 bg-[#FFC01D] mb-2"></div>
              <div className="w-full flex flex-wrap gap-5">
                {brandProducts?.map((product: ProductData, index: number) => (
                  <div
                    key={index}
                    className="group relative bg-[#1D1138] w-max h-max p-2 rounded-md flex gap-2"
                  >
                    <div className="text-[#FFFFFF] text-sm w-full font-medium truncate">
                      {product?.product_name}
                    </div>
                    <div
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      onClick={() => {
                        handleClickOnEdit(product);
                      }}
                    >
                      <svg
                        width="12"
                        height="14"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
                <button
                  className="group relative bg-[#1D1138] w-max h-max p-2 rounded-md flex gap-2 text-[#FFFFFF] text-sm font-medium"
                  onClick={() => {
                    setAddProductPopup(true);
                  }}
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
            <div className="w-full flex gap-4 justify-center items-center mt-10">
              <Button
                className="rounded-full w-32 hover:shadow-none font-semibold py-2"
                onClick={() => renderComponent("first")}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full w-32 hover:shadow-none font-semibold py-2"
                onClick={brandNextButtonClick}
              >
                {mutateAddBrandFile.isPending ? "Loading..." : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {addProductPopup ? (
        <Modal
          isOpen={addProductPopup}
          style={addProductPopupStyle}
          onRequestClose={handleAddProductModal}
          ariaHideApp={false}
        >
          <div className="flex justify-between">
            <div className="text-base font-bold text-[#FFFFFF]">
              {editProductId ? "Edit Product" : "Add Product"}
            </div>

            <div className="flex gap-1">
              {editProductId ? (
                <div
                  className="cursor-pointer"
                  onClick={() => handleDeleteProductPopup()}
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
                Product Namee <span className="text-[#E26971]">*</span>
              </div>
              <input
                type="text"
                className={`placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md h-[40px] px-2 font-lighter text-[#FFFFFF] ${
                  productNameErr && " border-nyx-red"
                }`}
                placeholder="Add Product Name"
                value={productName ?? undefined}
                onChange={handleInputProductName}
              />
              {productNameErr && (
                <span className="text-nyx-red text-xs">{errMessage}</span>
              )}
            </div>
            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-[14px] font-[700]">
                Product Description
              </div>

              <textarea
                className="placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md h-[80px] p-2 font-lighter text-[#FFFFFF] text-sm"
                placeholder="Product Description"
                value={productDescription ?? undefined}
                onChange={handleInputProductDescription}
                maxLength={500}
              ></textarea>
              <p
                className={`text-right text-xs font-normal ${
                  productDescription.length === 500
                    ? "text-[#E26971]"
                    : "text-[#FFFFFF]"
                }`}
              >
                {productDescription.length === 500
                  ? "Maximum word limit reached"
                  : ""}
                {"                                      "}
                {productDescription.length}/500
              </p>
            </div>

            <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
              <p className="font-semibold py-2">Product Logos</p>
              <div className="w-full my-2 flex flex-wrap gap-5">
                {productLogoArray.map((item: any, index: number) => (
                  <div className="group relative" key={index}>
                    {" "}
                    {/* Add key here */}
                    <div className="bg-[#1D1138] w-[136px] h-[50px] rounded-t-lg text-[#FFF] px-2 py-4 font-medium">
                      Product Logo {index + 1}
                    </div>
                    <div className="bg-black w-[136px] h-[86px] rounded-b-lg flex justify-center items-center flex-col">
                      <img
                        src={item}
                        className="h-full object-contain"
                        alt="item"
                      />
                    </div>
                    <button
                      onClick={() => removeBrandLogoProduct(index)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-6px] right-[-6px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}

                {mutateUploadfromSyetemProduct.isPending && (
                  <div>Loading...</div>
                )}

                <div className="">
                  <div className="bg-[#1D1138] w-[136px] h-[50px] rounded-t-lg text-[#FFF] px-2 py-4 font-medium">
                    Add Logos
                  </div>
                  <div className="bg-[#50387B] w-[136px] h-[86px] rounded-b-lg flex justify-center items-center flex-col">
                    <label className="w-10 h-10 cursor-pointer inline-flex items-center justify-center bg-transparent border border-nyx-yellow rounded-full p-2 font-normal">
                      <input
                        type="file"
                        className="hidden border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                        placeholder="Product Logo"
                        accept=".jpg , .jpeg, .png, .svg"
                        onChange={systemUploadProduct}
                      />

                      <svg
                        viewBox="0 0 17 17"
                        className="w-4 h-4 fill-current text-nyx-yellow"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-3 justify-center">
              <Button
                className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={handleAddProductModal}
              >
                Cancel
              </Button>
              <Button
                className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={addProductNextButton}
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
          // onRequestClose={handleTargetGroupModal}
          ariaHideApp={false}
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
              Are you sure you want to delete this product?
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
                onClick={() => deleteProductButtonPopup()}
              >
                {isLoading ? "Deleting.." : "Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default SecondPage;
