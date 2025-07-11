/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { category } from "@nyx-frontend/main/utils/productConstants";
import { onboardingColourStyles } from "@nyx-frontend/main/utils/productStyle";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import Button from "@nyx-frontend/main/components/Button";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import {
  addProductPopupStyle,
  deletePopupStyle,
  popupHeader2,
} from "@nyx-frontend/main/utils/modalstyles";
import ValidateStringSpecial from "@nyx-frontend/main/components/ValidateStringSpecial";
import {
  addProductServices,
  addBrandServices,
  deleteproductbyid,
} from "@nyx-frontend/main/services/brandService";
import Modal from "react-modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getbrandServiceonbording,
  deletebrandbyid,
} from "@nyx-frontend/main/services/brandService";
import AddProductPopup from "./_components/AddProduct";
import DeleteProductPopup from "./_components/DeletingProduct";
import { useRouter } from "next/navigation";

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

  const [workspacename, setWorkspacename] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [brandNameErr, setBrandNameErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [brandCategory, setBrandCategory] = useState<string>("");

  const [brandDescription, setBrandDescription] = useState<string>("");

  const [brandExistingLogos, setBrandExistingLogos] = useState<string[]>([]);
  const [brandLogos, setBrandLogos] = useState<File[]>([]);

  const [brandProducts, setBrandProducts] = useState<ProductData[]>([]);
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [productName, setProductName] = useState<string | null>("");
  const [productDescription, setProductDescription] = useState<string | null>(
    "",
  );
  const [productNameErr, setProductNameErr] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productLogos, setProductLogos] = useState<File[]>([]);
  const [productIDS, setProductIDS] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteBrandPopup, setDeleteBrandPopup] = useState(false);
  const [deleteBrandLoading, setDeleteBrandLoading] = useState(false);

  const imageTyeps = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];

  const { data: brandDetails, refetch: brandRefetch } = useQuery({
    queryKey: ["get-brand"],
    queryFn: () => {
      const brandid = sessionStorage.getItem("brandid_admanager");

      if (brandid) {
        return getbrandServiceonbording(brandid);
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    if (brandDetails) {
      setBrandName(brandDetails?.brand_name);
      setBrandCategory(brandDetails?.cat_name);
      setBrandDescription(brandDetails?.description);
      if (brandDetails?.brand_logos?.length) {
        setBrandExistingLogos(brandDetails.brand_logos);
      }
      if (brandDetails.brand_product_v2?.length) {
        setProductIDS(brandDetails.brand_product_v2.map((obj: any) => obj.id));
      }

      setBrandProducts(brandDetails?.brand_product_v2);
    } else {
      setBrandName("");
      setBrandCategory("");
      setBrandDescription("");
      setBrandExistingLogos([]);
      setBrandExistingLogos([]);
      setBrandProducts([]);
    }
  }, [brandDetails]);

  const mutateAddProductFile = useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProductServices,
  });

  const mutateAddBrandFile = useMutation({
    mutationKey: ["add-brand"],
    mutationFn: addBrandServices,
  });

  const handleInputBrandName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrandNameErr(false);
    setBrandName(event.target.value);
  };

  const handleCategory = (selected: any) => {
    setBrandCategory(selected.value);
  };

  const handleBrandDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBrandDescription(event.target.value);
  };

  const removeBrandLogo = (
    typeOfBrandLogo: "new" | "edit",
    valueOfBrandLogo: string | File,
  ) => {
    if (typeOfBrandLogo === "new") {
      setBrandLogos((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfBrandLogo),
      );
    } else if (typeOfBrandLogo === "edit") {
      setBrandExistingLogos((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfBrandLogo),
      );
    }
  };

  /**
   *
   * @param event Brand logo change handler
   */
  const systemUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile && imageTyeps.includes(selectedFile.type)) {
      setBrandLogos((prev) => [...prev, selectedFile]);
    } else {
      displayMessagePopup(
        "handle-input-prod-logo",
        "error",
        "Error",
        "Invalid file type. Supported formats: .jpg, .jpeg, .png, .svg.",
      );
      // toast.error("Upload file is not a valid image.");
    }

    event.target.value = "";
  };

  const getImagePreview = (imageFile: File) => {
    if (!imageFile) {
      return "";
    }

    return URL.createObjectURL(imageFile);
  };

  const handleClickOnEdit = (product: ProductData) => {
    if (product.id) {
      setAddProductPopup(true);
      setEditProductId(product.id);
      setProductName(product?.product_name);
      setProductDescription(product?.description);
      if (product.product_images !== null) {
        setProductImages(product.product_images);
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

  const handleInputProductName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProductNameErr(false);
    setProductName(event.target.value);
  };

  const handleInputProductDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProductDescription(event.target.value);
  };

  const handleDeleteProductPopup = () => {
    setAddProductPopup(false);
    setDeletePopup(true);
  };

  /**
   * Product logo remove handler
   * @param typeOfBrandLogo 'new' | 'edit' value can be one of 'new' or 'edit'
   * @param valueOfBrandLogo string | File when type is new then value should have File object and if type is edit then value should have string image file name
   */
  const removeProductLogo = (
    typeOfLogo: "new" | "edit",
    valueOfLogo: string | File,
  ) => {
    if (typeOfLogo === "new") {
      setProductLogos((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfLogo),
      );
    } else if (typeOfLogo === "edit") {
      setProductImages((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfLogo),
      );
    }
  };

  /**
   * Product image change handles
   * @param event
   */
  const handleInputProductLogo = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile && imageTyeps.includes(selectedFile.type)) {
      setProductLogos((prev) => [...prev, selectedFile]);
    } else {
      displayMessagePopup(
        "handle-input-prod-logo",
        "error",
        "Error",
        "Invalid file type. Supported formats: .jpg, .jpeg, .png, .svg.",
      );
    }

    event.target.value = "";
  };

  /**
   * add/edit product submit handler
   */
  const addProductNextButton = () => {
    const brandid = sessionStorage.getItem("brandid_admanager");
    if (!productName || productName.length == 0) {
      displayMessagePopup(
        "handle-input-prod-logo",
        "error",
        "Error",
        "Please fill the required data",
      );
    } else if (productName.length > 15) {
      setProductNameErr(true);
      setErrMessage("Product name should be a maximum of 15 characters.");
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
        data.append("product_images", JSON.stringify(productImages));
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
              (product: ProductData) => product.id !== editProductId,
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
            brandProducts.filter((item, index) => item.id !== editProductId),
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

  useEffect(() => {
    const name = localStorage.getItem("workspace_name");
    if (name) {
      setWorkspacename(name);
    }
  }, []);

  /**
   * Brand submit handler
   */
  const brandNextButtonClick = () => {
    if (!brandName) {
      displayMessagePopup(
        "handle-input-prod-logo",
        "error",
        "Error",
        "Please fill the required data.",
      );
      // toast.error("Please Select * marked Section");
    } else if (brandName.length == 0) {
      displayMessagePopup(
        "handle-input-prod-logo",
        "error",
        "Error",
        "Please fill the required data.",
      );
      // toast.error("Please Select * marked Section");
    } else if (brandName.length > 15) {
      setBrandNameErr(true);
      setErrMessage("Brand Name should not more that 15 characters");
    } else if (!ValidateStringSpecial(brandName)) {
      setBrandNameErr(true);
      setErrMessage("Brand Name cannot start with special character.");
    } else {
      //setDisableBrandNext(true);
      const data = new FormData();
      const brandid = sessionStorage.getItem("brandid_admanager");
      const workspaceID = localStorage.getItem("workspace_id");

      data.append("workspace_id", String(workspaceID));
      data.append("brandName", brandName);
      data.append("category", brandCategory);
      data.append("brandDescription", brandDescription);

      if (brandLogos.length) {
        for (var x = 0; x < brandLogos.length; x++) {
          data.append("brandLogos", brandLogos[x], brandLogos[x].name);
        }
      }

      data.append("productIds", JSON.stringify(productIDS));

      if (brandid) {
        data.append("brand_id", brandid);
      }

      mutateAddBrandFile.mutate(data, {
        onSuccess: (response: any) => {
          console.log(response);
          router.back();
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  const handleDeleteBrandButtonClick = () => {
    if (brandDetails?.id) {
      setDeleteBrandLoading(true);
      deletebrandbyid(brandDetails?.id)
        .then((data) => {
          setDeleteBrandPopup(false);
          setDeleteBrandLoading(false);
          router.back();
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="bg-[#28134B] h-[77vh] overflow-hidden overflow-y-auto">
          <div className="font-medium text-[16px] bg-[#000000] h-[50px] px-12 text-white flex items-center justify-between">
            {brandDetails ? "Edit Brand Details" : "Add Brand Details"}

            {/* {brandDetails ? (
              <div
                className="cursor-pointer"
                onClick={() => setDeleteBrandPopup(true)}
                title="Delete Brand"
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
            ) : null} */}
          </div>
          <div className="py-5 px-12 flex flex-col gap-2">
            <div className="w-full flex gap-5">
              <div className="w-1/2">
                <p className="text-white font-semibold pb-1 text-sm">
                  Brand Name <span className="text-[#E26971]">*</span>
                </p>
                <input
                  type="text"
                  className={`placeholder:text-sm placeholder:italic w-full bg-transparent border border-[#8297BD] rounded-md py-1.5 px-2 font-normal text-[#FFFFFF] ${brandNameErr && "border-nyx-red"}`}
                  placeholder="Add Brand"
                  value={brandName}
                  onChange={handleInputBrandName}
                />
                {brandNameErr && (
                  <span className=" text-nyx-red text-sm">{errMessage}</span>
                )}
              </div>
              <div className="w-1/2">
                <p className="text-white font-semibold pb-1 text-sm">
                  Category
                </p>
                <Select
                  className="text-sm md:text-base"
                  options={category}
                  placeholder="Select Category"
                  instanceId={"category"}
                  styles={onboardingColourStyles}
                  value={category.find(
                    (option) => option?.value === brandCategory,
                  )}
                  onChange={handleCategory}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
            </div>

            <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
              <p className="font-semibold py-2">Brand Logos</p>
              <div className="w-full my-2 flex flex-wrap gap-5">
                {brandExistingLogos.map((item: any, index: number) => (
                  <div className="group relative" key={index}>
                    <div className="bg-black w-[120px] h-[80px] rounded-t-lg flex justify-center items-center flex-col">
                      <img
                        src={item}
                        className="h-full object-contain"
                        alt="item"
                      />
                    </div>

                    <div className="bg-[#1D1138] w-[120px] h-[40px] rounded-b-lg text-[#FFF] font-medium flex justify-center items-center text-sm">
                      Brand Logo {index + 1}
                    </div>
                    <button
                      onClick={() => removeBrandLogo("edit", item)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-6px] right-[-6px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}

                {brandLogos ? (
                  brandLogos?.map((logo, index) => (
                    <div className="group relative" key={index}>
                      <div className="bg-white w-[120px] h-[80px] rounded-t-lg flex justify-center items-center flex-col object-contain">
                        <img
                          src={getImagePreview(logo)}
                          className="h-full object-contain"
                          alt="logo"
                        />
                      </div>
                      <div className="bg-[#1D1138] w-[120px] h-[40px] rounded-b-lg text-[#FFF] font-medium flex justify-center items-center text-sm">
                        Logo Preview {index + 1}
                      </div>
                      <button
                        onClick={() => removeBrandLogo("new", logo)}
                        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-6px] right-[-6px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                ) : (
                  <></>
                )}

                <div>
                  <div className="bg-[#50387B] w-[120px] h-[80px] rounded-t-lg flex justify-center items-center flex-col">
                    <label
                      className="w-10 h-10 cursor-pointer inline-flex items-center justify-center bg-transparent border border-nyx-yellow rounded-full p-2 font-normal"
                      //onClick={handleUploadImageProcess}
                    >
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
                  <div className="bg-[#1D1138] w-[120px] h-[40px] rounded-b-lg text-[#FFF] font-medium flex justify-center items-center">
                    Add Logos
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-2">
              <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                <p className="font-semibold py-2">About your Brand</p>
                <textarea
                  className="w-full placeholder:italic h-[80px] bg-transparent border border-[#8297BD] rounded-lg p-2 font-normal"
                  placeholder="About your Brand"
                  value={brandDescription}
                  onChange={handleBrandDescription}
                  maxLength={500}
                ></textarea>
                <p
                  className={`text-right text-xs font-normal ${brandDescription.length === 500 ? "text-[#E26971]" : "text-[#FFFFFF]"}`}
                >
                  {brandDescription.length === 500
                    ? "Maximum word limit reached"
                    : ""}
                  {"                                      "}
                  {brandDescription.length}/500
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <p className="font-semibold py-2 text-[#FFFFFF] text-sm">
                Provide your product information
              </p>
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
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-4 my-[10.5px]">
          <Button
            className=" rounded-full w-32  hover:shadow-none text-nyx-yellow font-semibold"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button
            className=" rounded-full w-32 bg-nyx-yellow hover:shadow-none text-black font-semibold"
            onClick={brandNextButtonClick}
          >
            {mutateAddBrandFile.isPending ? <ButtonLoading /> : "Next"}
          </Button>
        </div>
      </div>

      <AddProductPopup
        isOpen={addProductPopup}
        style={addProductPopupStyle}
        onRequestClose={handleAddProductModal}
        handleDeleteProductPopup={handleDeleteProductPopup}
        editProductId={editProductId}
        handleAddProductModal={handleAddProductModal}
        productName={productName}
        productNameErr={productNameErr}
        handleInputProductName={handleInputProductName}
        errMessage={errMessage}
        productDescription={productDescription}
        handleInputProductDescription={handleInputProductDescription}
        productImages={productImages}
        productLogos={productLogos}
        getImagePreview={getImagePreview}
        handleInputProductLogo={handleInputProductLogo}
        removeProductLogo={removeProductLogo}
        addProductNextButton={addProductNextButton}
        mutateAddProductFile={mutateAddProductFile}
        popupHeader2={popupHeader2}
      />

      <DeleteProductPopup
        isOpen={deletePopup}
        style={deletePopupStyle}
        onRequestClose={() => setDeletePopup(false)}
        onDelete={deleteProductButtonPopup}
        isLoading={isLoading}
      />

      {deleteBrandPopup ? (
        <Modal
          isOpen={deleteBrandPopup}
          style={deletePopupStyle}
          ariaHideApp={false}
        >
          <div className="flex justify-between">
            <div className="text-2xl font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setDeleteBrandPopup(false);
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
          <div className="w-full my-5">
            <p className="w-full text-center text-[#FFFFFF] text-base font-bold">
              Are you sure you want to delete this brand ?
            </p>
          </div>

          <div className="w-full flex gap-4 mb-5 justify-center items-center">
            <Button
              className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
              onClick={() => {
                setDeleteBrandPopup(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="text-sm font-semibold text-[#FFCB54] rounded-full px-10 hover:shadow-none"
              onClick={() => handleDeleteBrandButtonClick()}
            >
              {deleteBrandLoading ? "Deleteing..." : "Delete"}
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Page;
