import React, { useEffect, useState } from "react";
import GmcIcon from "./GmcIcon";
import Modal from "react-modal";
import {
  login_popup_Style,
  gmcLink,
} from "@nyx-frontend/main/utils/modalstyles";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  GmcAccounts,
  McLinking,
} from "@nyx-frontend/main/services/plateformService";
import Button from "@nyx-frontend/main/components/Button";
import CrossIcon from "@nyx-frontend/main/components/Icons/CrossSVGIcon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";

function GmcFlow({ brandId }: any) {
  const [accountsPopup, setAccountsPopup] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: [`Gmc-Accounts${brandId}`],
    queryFn: async () => {
      const storage = Number(localStorage.getItem("workspace_id"));
      const res = await GmcAccounts({
        workspace_id: storage,
        brand_id: brandId,
      });
      setShouldFetch(false);
      return res;
    },
    enabled: shouldFetch,
  });

  console.log(data);

  const mutateMCLinking = useMutation({
    mutationKey: ["Merchant-Linking"],
    mutationFn: McLinking,
  });

  const merchantLink = (mcId: any) => {
    const storage = Number(localStorage.getItem("workspace_id"));
    const payload = {
      merchant_center_id: `${mcId}`,
      workspace_id: storage,
      brand_id: brandId,
    };
    mutateMCLinking.mutate(payload, {
      onSuccess: async (response) => {
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
                Gmc account Linked succesfully
              </span>
            </>,
            { autoClose: 5000 }
          );
        };
        const error = () =>
          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Merchant Linking Error!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                {response.msg}
              </span>
            </>,
            { autoClose: 5000 }
          );

        if (response.result) Success();
        else error();
        setAccountsPopup(false);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const closePopUp = () => {
    setAccountsPopup(false);
  };

  const handleLinkGmc = () => {
    setShouldFetch(true);
    setAccountsPopup(true);
  };

  return (
    <div className="text-white text-[12px] hover:text-[#FFCB54] underline underline-offset-1 w-fit cursor-pointer flex gap-x-1 items-center">
      <div className="flex items-center gap-x-1 " onClick={handleLinkGmc}>
        <GmcIcon className="h-3 w-3" /> Link Gmc
      </div>
      {accountsPopup && (
        <Modal
          isOpen={accountsPopup}
          style={gmcLink}
          onRequestClose={closePopUp}
        >
          <div className="h-[400px]  rounded-md py-10 text-white relative">
            {/* Fixed header section */}
            <div className="absolute top-5 left-1 w-full  flex justify-between items-center  z-10">
              <div className="text-[16px] font-bold">
                Link your GMC Account with Merchant Center
              </div>

              <div className="cursor-pointer" onClick={closePopUp}>
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

            {isSuccess && data.gmcAccounts.length === 0 && (
              <div className="mt-[25px] text-[18px]">
                No Gmc account with this Brand
              </div>
            )}
            <div className="mt-[25px] h-[300px] flex gap-2 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-[#503193] scrollbar-track-[#3B226F]">
              {isSuccess &&
                data.gmcAccounts?.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="w-full flex items-center justify-center  my-1"
                  >
                    <div className="w-full  bg-[#503193] rounded-md flex justify-between h-[80px] items-center px-4">
                      <div className="flex flex-row gap-5 justify-center items-center">
                        <div className="text-[14px]">{item.id}</div>
                        <div className="">{item.name || "Item Name"}</div>
                      </div>
                      {item.linked == false ? (
                        <Button
                          className="text-[14px] rounded-full flex items-center justify-center p-5 w-fit cursor-pointer h-[30px] font-semibold "
                          onClick={() => merchantLink(item.id)}
                        >
                          Link Account
                        </Button>
                      ) : (
                        <div className="text-[14px] rounded-full flex items-center justify-center p-5 w-fit cursor-not-allowed h-[30px] font-semibold border border-nyx-gray-1 bg-nyx-gray-1 text-black">
                          Account Linked
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default GmcFlow;
