import Button from "@nyx-frontend/main/components/Button";
import CrossIcon from "./CrossIcon";
import { deletetargetbyid } from "@nyx-frontend/main/services/brandService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    mutationKey: ["delete-target-vid", id],
    mutationFn: deletetargetbyid,
    onSuccess: () => {
      onConfirm(id);
    },
    onError: () => {
      toast.error("Error during delete, please try after sometime");
    },
  });

  const onDeleteHandler = () => {
    deleteMutate.mutate(id);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl font-bold text-white">Delete</div>
        <button className="pr-3 cursor-pointer" onClick={onCancel}>
          <CrossIcon className="w-6 h-6 text-white" />
          <span className="sr-only">Close</span>
        </button>
      </div>
      <div className="w-full my-5">
        <p className="w-full text-center text-white text-base">
          Are you sure you want to delete this target group?
        </p>
      </div>

      <div className="w-full flex gap-4 mt-6 justify-center items-center">
        <Button
          className="rounded-full w-40"
          onClick={onCancel}
          disabled={deleteMutate.isPending}
        >
          Cancel
        </Button>
        <Button
          className="rounded-full w-40"
          onClick={onDeleteHandler}
          disabled={deleteMutate.isPending}
        >
          {deleteMutate.isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </>
  );
}

export default DeleteConfirmation;
