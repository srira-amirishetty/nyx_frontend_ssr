import Modal from "react-modal";
import { text2videoSave } from "@nyx-frontend/main/utils/modalstyles";
import Button from "@nyx-frontend/main/components/Button";

const SavePopUp = ({ onClose, isPopupOpen, saveFromPopUp }) => {
  return (
    <>
      <Modal
        isOpen={isPopupOpen}
        style={text2videoSave}
        onRequestClose={onClose}
        ariaHideApp={false}
      >
        <div className="flex flex-col justify-between">
          <p className="text-white font-semibold text-center items-center mb-4 mt-4">
            The previously AI generated script will be lost after this!
          </p>

          <div className="flex flex-row items-center justify-center gap-4">
            <Button onClick={onClose} className="rounded-full">
              Cancel
            </Button>

            <Button className="rounded-full" onClick={saveFromPopUp}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SavePopUp;
