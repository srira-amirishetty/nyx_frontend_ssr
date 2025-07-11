import CrossIcon from "@nyx-frontend/main/components/Icons/CrossSVGIcon";
import Button from "@nyx-frontend/main/components/Button";
import { MoengageService, BranchService } from "@nyx-frontend/main/services/plateformService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

function BranchPopup({ setBranchPopup, adRefetch }: any) {
  const mutateBranchAd = useMutation({
    mutationKey: ["Branch-Ad"],
    mutationFn: BranchService,
  });

  const [appId, setAppId] = useState<any>("");
  const [token, setToken] = useState<any>("");
  const [client, setClient] = useState<any>("");
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateInput = e.target.value; // Input value in "YYYY-MM-DD"
    if (dateInput) {
      const date = new Date(dateInput);
      const isoDate = date.toISOString();
      const formattedDate = isoDate.split(".")[0] + "Z"; // Removes milliseconds
      setStartDate(formattedDate);
    } else {
      setStartDate("");
    }
  };

  const handleLastDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateInput = e.target.value; // Input value in "YYYY-MM-DD"
    if (dateInput) {
      const date = new Date(dateInput);
      const isoDate = date.toISOString();
      const formattedDate = isoDate.split(".")[0] + "Z"; // Removes milliseconds
      setEndDate(formattedDate);
    } else {
      setEndDate("");
    }
  };

  const handleSubmit = () => {
    let data = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      app_id: appId,
      access_token: token,
      client_name: client,
      start_date: startDate,
      end_date: endDate,
    };

    mutateBranchAd.mutate(data, {
      onSuccess: (response) => {
        const Success = () => {
          toast.success(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Request Successfull!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Branch Integrated Sucessfully.
              </span>
            </>,
            { autoClose: 5000 },
          );
        };
        Success();
        adRefetch();
        setBranchPopup(false);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
  return (
    <div className="w-[491px] h-auto bg-[#332270] rounded-[10px] text-white flex flex-col">
      <div className="flex justify-between">
        <div className="text-base font-bold text-[#FFFFFF]">
          Branch Ad Integration Info
        </div>

        <div className="flex gap-1">
          <div className="cursor-pointer" onClick={() => setBranchPopup(false)}>
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

      <div className="w-full flex flex-col gap-4 mt-3">
        <div className="w-full flex flex-col gap-1">
          <div className="text-sm font-bold">App Id</div>
          <input
            type="text"
            className={`placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF]  placeholder:italic`}
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="text-sm font-bold">Access Token</div>
          <input
            type="text"
            className={`placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF]  placeholder:italic`}
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="text-sm font-bold">Client Name</div>
          <input
            type="text"
            className={`placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF]  placeholder:italic`}
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="text-sm font-bold">Start Date</div>
          <input
            type="date"
            className={`placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF]  placeholder:italic`}
            value={startDate.split("T")[0]}
            onChange={handleStartDateChange}
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="text-sm font-bold">End Date</div>
          <input
            type="date"
            className={`placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF]  placeholder:italic`}
            value={endDate.split("T")[0]}
            onChange={handleLastDateChange}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-4 mt-2 ">
          <Button
            className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BranchPopup;
