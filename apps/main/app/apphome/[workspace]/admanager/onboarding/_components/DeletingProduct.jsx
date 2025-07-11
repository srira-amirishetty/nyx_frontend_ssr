import React from "react";
import Modal from "react-modal";
import Button from "@nyx-frontend/main/components/Button";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";

const DeletePopup = ({
  isOpen,
  style,
  onRequestClose,
  onDelete,
  isLoading,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      style={style}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <div className="flex justify-between">
        <div className="text-xl font-bold text-[#FFFFFF]">Delete</div>
        <div className="pr-3 cursor-pointer" onClick={onRequestClose}>
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
      <div className="w-full">
        <p className="w-full text-center text-[#FFFFFF] text-base font-medium">
          Are you sure you want to delete this Product?
        </p>
      </div>
      <div className="w-full flex gap-4 justify-center items-center my-5">
        <Button
          className="text-md text-[#FFFFFF] font-bold rounded-full w-40 hover:shadow-none"
          onClick={onRequestClose}
        >
          Cancel
        </Button>
        <Button
          className="text-md text-[#FFFFFF] font-bold rounded-full w-40 hover:shadow-none"
          onClick={onDelete}
        >
          {isLoading ? <ButtonLoading /> : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeletePopup;
