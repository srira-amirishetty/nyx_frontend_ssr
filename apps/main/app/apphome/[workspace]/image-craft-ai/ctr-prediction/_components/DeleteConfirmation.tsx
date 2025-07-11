import Button from "@nyx-frontend/main/components/Button";
import CrossIcon from "./CrossIcon";
import { deletetargetbyid } from "@nyx-frontend/main/services/brandService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

type DeleteConfirmationProps = {
  onCancel: () => void;
  onConfirm: (id: string) => void;
  id: string;
};

function DeleteConfirmation({
  onCancel,
  onConfirm,
  id,
}: DeleteConfirmationProps) {
  const deleteMutate = useMutation({
    mutationKey: ["delete-target", id],
    mutationFn: deletetargetbyid,
    onSuccess: () => {
      onConfirm(id);
    },
    onError: () => {
      
      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Error during delete, please try after sometime
          </span>
        </>,
        { autoClose: 5000 },
      );
    },

  });

  const onDeleteHandler = () => {
    deleteMutate.mutate(id);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="text-base font-bold text-white">Delete</div>
        <button className="cursor-pointer" onClick={onCancel}>
          <CrossIcon className="w-6 h-6 text-white" />
          <span className="sr-only">Close</span>
        </button>
      </div>

      <div className="w-full flex flex-col gap-6 mt-4">
        <div className="w-full text-center text-[#FFFFFF] text-sm font-[600]">
          Are you sure you want to delete this target group?
        </div>

        <div className="w-full flex gap-4 justify-center items-center">
          <Button
            className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
            onClick={onCancel}
            disabled={deleteMutate.isPending}
          >
            Cancel
          </Button>
          <Button
            className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
            onClick={onDeleteHandler}
            disabled={deleteMutate.isPending}
          >
            {deleteMutate.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmation;
