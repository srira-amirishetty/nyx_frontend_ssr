import CrossIcon from "@nyx-frontend/main/components/Icons/CrossSVGIcon";
import Button from "@nyx-frontend/main/components/Button";
import { CleverTapService } from "@nyx-frontend/main/services/plateformService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

function CleverTapPopup({ setCleverTapPopup, adRefetch }: any) {
  const mutateCleverTapAd = useMutation({
    mutationKey: ["CleverTap-Ad"],
    mutationFn: CleverTapService,
  });

  const [accountId, setAccountId] = useState<any>("");
  const [passcode, setPasscode] = useState<any>("");
  const [client, setClient] = useState<any>("");

  const handleSubmit = () => {
    let data = {
      account_id: accountId,
      account_passcode: passcode,
      workspace_id: Number(localStorage.getItem("workspace_id")),
      client_name: client,
    };
    mutateCleverTapAd.mutate(data, {
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
                CleverTap Integrated Sucessfully.
              </span>
            </>,
            { autoClose: 5000 },
          );
        };
        Success();
        adRefetch();
        setCleverTapPopup(false);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };
  return (
    <div className="w-[600px] h-auto bg-[#28134B] rounded-md p-10 text-white relative flex flex-col items-center ">
      <div
        className="absolute right-5 top-6"
        onClick={() => setCleverTapPopup(false)}
      >
        {" "}
        <CrossIcon className="w-3 h-3" />
      </div>
      <div className="text-[24px] mt-4">CleverTap Ad Integration Info</div>

      <div className="flex flex-col justify-between gap-x-3 h-auto gap-y-2 mt-8">
        <div className="">Account Id</div>
        <div className="w-[400px]  rounded-md border border-[#8297BD] bg-inherit overflow-hidden ">
          <input
            type="text"
            placeholder="12345"
            className="px-2 py-2 text-sm bg-inherit outline-none appearance-none w-[380px] "
            onChange={(e) => setAccountId(e.target.value)}
          />
        </div>
        <div className="">Account Passcode</div>
        <div className="w-[400px]  rounded-md border border-[#8297BD] bg-inherit overflow-hidden ">
          <input
            type="text"
            placeholder="Nyx-123"
            className="px-2 py-2 text-sm bg-inherit outline-none appearance-none w-[380px] "
            onChange={(e) => setPasscode(e.target.value)}
          />
        </div>
        <div className="">Client Name</div>
        <div className="w-[400px]  rounded-md border border-[#8297BD] bg-inherit overflow-hidden ">
          <input
            type="text"
            placeholder="Nyx"
            className="px-2 py-2 text-sm bg-inherit outline-none appearance-none w-[380px] "
            onChange={(e) => setClient(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-4 ">
          <Button
            className="rounded-full   hover:shadow-none"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CleverTapPopup;
