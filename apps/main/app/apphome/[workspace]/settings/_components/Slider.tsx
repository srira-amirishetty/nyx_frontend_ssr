"use client";
import {useQuery} from "@tanstack/react-query";
import {
  getWorkspaceDetailsById,
  getAvailableCredit,
} from "@nyx-frontend/main/services/workSpace";


const Slider = ({workspaceId}: {workspaceId: string | null}) => {
//   let workspaceId: string | null = null;
//   if (typeof window !== "undefined") {
//     workspaceId = localStorage.getItem("workspace_id");
//   }

  const { data: availableCreds} = useQuery({
    queryKey: ["creds-plan"],
    queryFn: () => {
      return getAvailableCredit(workspaceId);
    },
  });

//   const { data: userDetailsRole } = useQuery({
//     queryKey: ["userDetailsRole-sidebar-bottom"],
//     queryFn: () =>
//       getWorkspaceDetailsById(Number(localStorage.getItem("workspace_id"))),
//   });

  const totalCredits = availableCreds?.totalCredits || 0;
  const availableCredits = availableCreds?.availableCredits || 0;

  let widthPercentage = 0;
  if (availableCredits !== 0) {
    if ((availableCredits / totalCredits) * 100 <= 100) {
      widthPercentage = (availableCredits / totalCredits) * 100;
    }
  }

  return (
    <div>
      <div>
        <p className="text-white font-medium text-[10px] mb-2">
        {availableCredits} out of {totalCredits} credits remaining
        </p>
      </div>
      <div className="w-[405px] h-[12px] mb-4 bg-white rounded-full overflow-hidden">
        <div
          style={{ width: `${widthPercentage}%` }}
          className="h-[12px] bg-nyx-yellow"
        ></div>
      </div>
    </div>
  );
};

export default Slider;
