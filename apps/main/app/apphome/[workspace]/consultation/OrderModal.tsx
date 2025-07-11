import { TOrderModalProps } from "./Experts.types";
import Button from "@nyx-frontend/main/components/Button";

export default function OrderModal({
  onClose,
  onSuccess,
}: TOrderModalProps) {
  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col gap-2 bg-transparent outline-none pl-2 text-sm py-2 md:py-1 text-white rounded-md placeholder-blue">
        <p className="font-bold text-nyx-yellow">
          Thank you for purchasing the expert advice.
        </p>
        <p className="mt-2">Your expert advice will start reflecting in your profile shortly</p>
      </div>
      <div className="flex justify-between gap-4 mt-4 items-center">
        <Button onClick={onSuccess} className="w-1/2 text-xs sm:text-base">
          Book Calendar
        </Button>
        <Button onClick={onClose} className="w-1/2 text-xs sm:text-base">
          Close
        </Button>
      </div>
    </div>
  );
}
