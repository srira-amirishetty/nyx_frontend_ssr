"use client";
import classNames from "@nyx-frontend/main/utils/classNames";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCredit } from "@nyx-frontend/main/services/workSpace";
import { motion } from "framer-motion";

interface CustomSliderProps {
  isHovered: boolean;
  roles: any;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ isHovered, roles }) => {
  const { data: avaialbleCreds } = useQuery({
    queryKey: ["available-creds-plan"],
    queryFn: async () => {
      const workspaceId = localStorage.getItem("workspace_id");
      if (!workspaceId) {
        return null;
      }

      const res = await getAvailableCredit(Number(workspaceId));
      return res;
    },
  });

  const totalCredits = avaialbleCreds?.totalCredits || 0;
  const availableCredits = avaialbleCreds?.availableCredits || 0;

  const widthPercentage =
    totalCredits > 0
      ? Math.min((availableCredits / totalCredits) * 100, 100)
      : 0;

  return (
    <div>
      <span
        className={classNames(
          "block relative w-full rounded-full h-[6px] bg-transparent",
        )}
      >
        <span className="absolute h-full top-0 left-0 bg-transparent rounded-full w-full border border-white"></span>
        {/* Bar representing remaining credits */}
        <motion.span
          className="absolute h-full top-0 left-0 bg-nyx-yellow rounded-full"
          animate={{ width: `${widthPercentage}%` }}
        ></motion.span>
        {/* Marker for current credit limit */}
        <motion.span
          className="absolute"
          animate={{ left: `${widthPercentage}%` }}
        >
          <span className="bg-nyx-yellow w-4 h-4 absolute -top-[5px] border border-black rounded-full origin-center -left-[6px]"></span>
        </motion.span>
      </span>
      {
        <div className="flex items-center justify-between text-white text-[12px] mt-4 px-2">
          <p className="-ml-2 flex items-start justify-start gap-1">
            <span>{roles === "OWNER" ? "Owner" : "Shared"} credits : </span>
            {availableCredits}
          </p>
          <p className="-mr-2 flex items-end justify-end">{totalCredits} </p>
        </div>
      }
    </div>
  );
};

export default CustomSlider;
