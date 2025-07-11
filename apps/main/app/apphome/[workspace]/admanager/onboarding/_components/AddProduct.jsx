/* eslint-disable @next/next/no-img-element */
import React from "react";
import Modal from "react-modal";
import Button from "@nyx-frontend/main/components/Button";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";

const AddProductPopup = ({
  isOpen,
  style,
  onRequestClose,
  handleDeleteProductPopup,
  editProductId,
  handleAddProductModal,
  productName,
  productNameErr,
  handleInputProductName,
  errMessage,
  productDescription,
  handleInputProductDescription,
  productImages,
  productLogos,
  getImagePreview,
  handleInputProductLogo,
  removeProductLogo,
  addProductNextButton,
  mutateAddProductFile,
  popupHeader2,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={style}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <div className="flex justify-between mt-5">
        <div className="text-2xl font-bold text-[#FFFFFF]">
          {editProductId ? "Edit Product" : "Add Product"}
        </div>
        <div className="flex flex-1 justify-end mt-1">
          {editProductId && (
            <div
              className="pr-3 cursor-pointer"
              onClick={handleDeleteProductPopup}
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
          )}
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
      <div className="w-full my-5 flex flex-col gap-5">
        {/* Product Name Input */}
        <div className="w-full flex flex-col">
          <div style={popupHeader2}>
            Product Name <span className="text-[#E26971]">*</span>
          </div>
          <input
            type="text"
            className={`placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md py-2 px-5 font-lighter text-[#FFFFFF] ${
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
        {/* Product Description Input */}
        <div className="w-full flex flex-col">
          <div style={popupHeader2}>Product Description</div>
          <input
            type="text"
            className="placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md py-2 px-5 font-lighter text-[#FFFFFF]"
            placeholder="Product Description"
            value={productDescription ?? undefined}
            onChange={handleInputProductDescription}
          />
        </div>
        {/* Product Logos */}
        {/* <div className="w-full flex flex-col">
          <div className="mb-[-10px]" style={popupHeader2}>
            Product Logos
          </div>
          <div className="flex gap-x-3 flex-wrap">
            {editProductId &&
              productImages?.map((pimage, index) => (
                <div key={index} className="mt-3 group relative">
                  <div className="bg-black w-[120px]  h-[80px] rounded-t-lg flex justify-center items-center flex-col">
                    <img
                      src={pimage}
                      className="h-full object-contain"
                      alt="pimage"
                    />
                  </div>
                  <div className="bg-[#6F559A] w-[120px] h-[40px] rounded-b-lg text-[#FFF] font-medium text-sm flex justify-center items-center">
                    Product Logo {index + 1}
                  </div>
                  <button
                    onClick={() => removeProductLogo("edit", pimage)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-6px] right-[-6px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            {productLogos?.map((logo, index) => (
              <div
                key={index + productImages.length}
                className="mt-3 group relative"
              >
                <div className="bg-white w-[120px]  h-[80px] rounded-t-lg flex justify-center items-center flex-col">
                  <img
                    src={getImagePreview(logo)}
                    className="h-full object-contain"
                    alt="logo"
                  />
                </div>
                <div className="bg-[#6F559A] w-[120px] h-[40px] rounded-b-lg text-[#FFF] font-medium text-sm flex justify-center items-center">
                  Logo Preview {index + productImages.length + 1}
                </div>
                <button
                  onClick={() => removeProductLogo("new", logo)}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-6px] right-[-6px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
            <div className="mt-3">
              <div className="bg-[#50387B] w-[120px] h-[80px] rounded-t-lg flex justify-center items-center flex-col">
                <label className="w-10 h-10 cursor-pointer inline-flex items-center justify-center bg-transparent border border-nyx-yellow rounded-full p-2 font-normal">
                  <input
                    type="file"
                    className="hidden border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                    placeholder="Product Logo"
                    accept=".jpg , .jpeg, .png, .svg"
                    onChange={handleInputProductLogo}
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
              <div className="bg-[#6F559A] w-[120px] h-[40px] rounded-b-lg text-[#FFF] px-2 py-4 font-normal text-sm flex justify-center items-center">
                Add Logo
              </div>
            </div>
          </div>
        </div> */}
        {/* Buttons */}
        <div className="w-full flex my-2 gap-4 justify-center items-center">
          <Button
            className="text-md text-[#FFFFFF] font-bold rounded-full w-40 hover:shadow-none"
            onClick={handleAddProductModal}
          >
            Cancel
          </Button>
          <Button
            className="text-md text-[#FFFFFF] font-bold rounded-full w-40 hover:shadow-none"
            onClick={addProductNextButton}
          >
            {mutateAddProductFile.isPending ? <ButtonLoading/> : "Next"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductPopup;
