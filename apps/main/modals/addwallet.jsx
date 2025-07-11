import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import RazorPaySDK, { useMakePayment } from "@nyx-frontend/main/components/RazorPaySDK";
import { useContext, useState } from "react";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { useMutation } from "@tanstack/react-query";
import { processCheckout, processWallet } from "@nyx-frontend/main/services/orderService";
function AddtoWallet() {
  const { payment } = useMakePayment();
  const { userDetails } = useContext(UseContextData);
  const [amount, setAmount] = useState(0);
  const mutateProcessWallet = useMutation({
    mutationKey: ["process-wallet"],
    mutationFn: processWallet,
  });
  const addMoney = async () => {
    // payment()

    let payload={
      "amount": amount
  }
    mutateProcessWallet.mutate(payload, {
      onSuccess: async (response) => {
        await payment(response, userDetails, {
          handler: async function (handlerResponse) {
            console.log(handlerResponse);
          },
        });
      },
      onError: (response) => {},
    });
  };
  return (
    <>
      <RazorPaySDK onError={() => toast.error("Razorpay SDK Failed to load")} />
      <p className="text-white text-center">Add Money</p>
      <div className="pt-3">
        <input
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter recharge amount"
          className="w-full outline-none border text-[14px] placeholder:text-[#8297BD] placeholder:italic  pl-2 h-9 text-white  rounded bg-transparent"
        ></input>
        <ButtonElement
          onSubmit={addMoney}
          width="mt-10 w-full"
          name="Proceed to pay"
        ></ButtonElement>
      </div>
    </>
  );
}

export default AddtoWallet;
