"use client";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";
import { useContext } from "react";
import Modal from "react-modal";

export default function ModalMain() {
  const { triggerModal, setModalConfig } = useContext(UseContextData);

  const closeModal = () => {
    setModalConfig(MODAL_RESET);
  };

  return (
    <div>
      <Modal
        isOpen={triggerModal?.isOpen}
        style={triggerModal?.style}
        className={triggerModal?.className}
        ariaHideApp={false}
        contentLabel=""
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        {triggerModal?.component}
      </Modal>
    </div>
  );
}
