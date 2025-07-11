/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Modal from "react-modal";
import { getPackagesService } from "@nyx-frontend/main/services/productService";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { processCheckout, validatePayment } from "@nyx-frontend/main/services/orderService";
import RazorPaySDK, { useMakePayment } from "@nyx-frontend/main/components/RazorPaySDK";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import OrderModal from "./OrderModal";
import PreLoginModal from "@nyx-frontend/main/modals/PreLogin";
import ShowCouponModal from "@nyx-frontend/main/modals/showCoupons";

type Props = {
  item: any;
  setThankyouModal: (status: boolean) => void;
};
import {
  AddtoWalletStyle,
  MODAL_CONFIG,
  MODAL_CONFIG_FOR_LOADER,
  MODAL_CONFIG_PROCESSING,
  OrderPaymentStyle,
  preLoginStyle,
} from "@nyx-frontend/main/utils/modalstyles";
import { useRouter } from "next/navigation";

export default function Card({ item, setThankyouModal }: Props) {
  const [show, setShow] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreLogin, setShowPreLogin] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isCoin, setIsCoin] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  const [orderStatus, setOrderStatus] = useState(false);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [usableBalance, setUsableBalance] = useState(0);
  const [usableCoins, setUsableCoins] = useState(0);
  const [showCoupons, setShowCoupons] = useState(false);
  const [total, setTotal] = useState(0);
  const [tierDiscount, setTierDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [showOrderPayment, setShowOrderPayment] = useState(false);
  const planData = useQuery({
    queryKey: ["plandata"],
    queryFn: getPackagesService,
    enabled: apiCall,
  });
  const {
    userDetails,
    setUserDetails,
    cartDetails,
    setCartDetails,
    isLoggedIn,
    setPortfolio,
    type,
  } = useContext(UseContextData);
  const router = useRouter();
  const { payment } = useMakePayment();
  const [cart_data, set_cart_data] = useState({});
  const toggleShow = () => {
    setShow(!show);
  };

  const scheduleCall = () => {
    setApiCall(true);
    setThankyouModal(true);
  };

  const mutateProcessCheckout = useMutation({
    mutationKey: ["payment-checkout"],
    mutationFn: processCheckout,
  });
  const mutateValidatePayment = useMutation({
    mutationKey: ["validate-payment"],
    mutationFn: validatePayment,
  });

  const proceedtoPay = async (e: any) => {
    if (isLoggedIn === false) {
      setShowPreLogin(true);
    } else {
      setLoading(true);
      let payload = {
        couponCode: couponCode,
        isCoinsUsed: isCoin,
        isWalletUsed: isWallet,
      };

      mutateProcessCheckout.mutate(payload, {
        onSuccess: async (response) => {
          console.log(response);
          if (response.amount > 0) {
            await payment(response, userDetails, {
              handler: async function (handlerResponse: any) {
                const payload = {
                  orderCreationId: response.id,
                  razorpayPaymentId: handlerResponse.razorpay_payment_id,
                  razorpayOrderId: handlerResponse.razorpay_order_id,
                  razorpaySignature: handlerResponse.razorpay_signature,
                };

                mutateValidatePayment.mutate(payload, {
                  onSuccess: async (successResponse) => {
                    console.log(successResponse);
                    completeOrderProcess();
                  },
                  onError: (errorResponse) => {
                    console.log(errorResponse);
                    setOrderStatus(false);
                    setShowOrderStatus(true);
                    
                    toast.error(
                      <>
                        <span className="text-white text-[16px] leading-[20px]">
                          {" "}
                          Bad Request!
                        </span>
                        <br />
                        <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                          {" "}
                          Error during checkout, please try after sometime
                        </span>
                      </>,
                      { autoClose: 5000 },
                    );
                  },
                });
              },
            });
            // await makePayment(response);
            setLoading(false);
            /* 
              this is for stripe checkout
              const isAnyItemNotAvailable = payment.data.shopping_cart.some(
                (item) => item.isAvailable === false
              );
    
              if (isAnyItemNotAvailable) {
                console.log("isAnyItemNotAvailable", isAnyItemNotAvailable);
                toast.error(
                  "One or more items not available, please remove from cart"
                );
              } else {
                setShowOrderPayment(true);
              } 
              */
          } else {
            completeOrderProcess();
            // toast.success("Order successful");
          }
        },
        onError: (response) => {
          setLoading(false);
          console.log(response);
          
          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Error during checkout, please try after sometime
              </span>
            </>,
            { autoClose: 5000 },
          );
        },
      });
    }
  };

  const completeOrderProcess = () => {
    set_cart_data({});
    setCartDetails({});
    setUserDetails({
      ...userDetails,
      cartqty: 0,
      inr_balance: userDetails.inr_balance - (isWallet ? usableBalance : 0),
      coin_balance: userDetails.coin_balance - (isCoin ? usableCoins : 0),
    });
    setPortfolio([]);
    setOrderStatus(true);
    setShowOrderStatus(true);
    // navigate.push("/profile/Tokens");
  };
  const handleCloseOrderStatus = () => {
    setShowOrderStatus(false);
  };
  const handleClosePreLogin = () => {
    setShowPreLogin(false);
  };
  const handleCloseCoupon = () => {
    setShowCoupons(false);
  };
  const handleCloseOrderPayment = () => {
    setShowOrderPayment(false);
  };

  const handleSuccessOrderStatus = () => {
    router.push("/calendar");
  };

  const applyCouponDiscount = (discount: any, code: any) => {
    setCouponCode(code);
    setCouponDiscount(discount);

    let usable_coin;
    let remaining;
    let usable_balance;

    if (isCoin) usable_coin = usableCoins;
    else usable_coin = 0;

    if (isWallet) {
      remaining = total - usable_coin - discount - tierDiscount;
      if (cartDetails.inr_balance > remaining) usable_balance = remaining;
      else usable_balance = cartDetails.inr_balance;
      setUsableBalance(usable_balance);
    }
  };
  const getFinalTotal = () => {
    let finalTot =
      total - usableBalance - usableCoins - couponDiscount - tierDiscount;
    return parseFloat(finalTot.toFixed(2));
  };

  return (
    <div>
      <RazorPaySDK onError={() => toast.error("Razorpay SDK Failed to load")} />
      <Modal
        isOpen={showOrderStatus}
        style={{
          ...OrderPaymentStyle,
          content: {
            ...OrderPaymentStyle.content,
            height: "100%",
            maxHeight: "11rem",
            width: "100%",
            maxWidth: "25rem",
            padding: 0,
          },
        }}
        ariaHideApp={false}
        contentLabel=""
        onRequestClose={handleCloseOrderStatus}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        {showOrderStatus ? (
          <OrderModal
            onClose={handleCloseOrderStatus}
            onSuccess={handleSuccessOrderStatus}
          />
        ) : null}
      </Modal>
      <Modal
        isOpen={showPreLogin}
        ariaHideApp={false}
        style={preLoginStyle}
        onRequestClose={handleClosePreLogin}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        {!isLoggedIn && showPreLogin && (
          <PreLoginModal
            onClose={handleClosePreLogin}
            updateCartDetails={() => {}}
            userType="users"
          />
        )}
      </Modal>
      <Modal
        isOpen={showCoupons}
        style={AddtoWalletStyle}
        ariaHideApp={false}
        onRequestClose={handleCloseCoupon}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        {showCoupons && (
          <ShowCouponModal
            finalTotal={total - tierDiscount}
            onCouponApplied={applyCouponDiscount}
            onClose={handleCloseCoupon}
          />
        )}
      </Modal>
      <Modal
        isOpen={showOrderPayment}
        style={OrderPaymentStyle}
        ariaHideApp={false}
        contentLabel=""
        onRequestClose={handleCloseOrderPayment}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        
      </Modal>
      <div className="relative flex flex-col text-white bg-nyx-blue-2 py-2 shadow-md xs:h-full md:h-100 lg:rounded-xl rounded-lg bg-clip-border mt-4">
        <div className="relative h-100 mx-2 overflow-hidden text-white shadow-lg rounded-md lg:rounded-lg bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <img
            src={item.profileImage}
            alt="img-blur-shadow"
            className="h-[220px] w-full object-cover object-top"
          />
        </div>
        <div className="p-2 md:p-4">
          <h5 className="block mb-2 font-Montserrat text-3xl xs:text-sm md:text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-500">
            {item.name}
          </h5>
          <p className=" md:hidden xs:flex xs:text-[9px] md:text-base font-Montserrat">
            {item.profession} {item.experience}
          </p>

          <div className="hidden md:flex justify-between mt-3 text-sm xs:text-xs relative">
            <p className="xs:text-[9px] md:text-base font-Montserrat">
              {item.profession} {item.experience}
            </p>
            <p
              className="underline font-Montserrat pointer xs:text-[8px] sm:text-sm mt-1 md:absolute right-0  xs:absolute top-[-5px] xs:right-0  cursor-pointer"
              onClick={toggleShow}
            >
              {show ? "See less" : "See more"}
            </p>
          </div>

          {show ? (
            <>
              <div className="flex space-x-2 items-center">
                <p className="pt-2 md:text-sm xs:text-[10px] font-Montserrat font-medium">
                  Genres:
                </p>
                <p className="xs:text-[10px] pt-2 xs:pl-8 md:pl-[55px] md:text-sm font-Montserrat font-light md:mt-[4px] xs:mt-[2px]  overflow-auto">
                  {item.genres?.toString()}
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <p className="md:text-sm xs:text-[10px] pt-2 font-Montserrat font-medium">
                  Instruments:
                </p>
                <p className="xs:pl-[4px] md:pl-4 xs:text-[10px] md:text-sm pt-2 font-Montserrat font-light md:mt-[2px] xs:mt-[2px] overflow-auto">
                  {item.instruments?.toString()}
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <p className="md:text-sm xs:text-[10px] pt-2 font-Montserrat font-medium">
                  Occupations:
                </p>
                <p className="xs:pl-[2px] md:pl-4 xs:text-[10px] md:text-sm font-Montserrat break-words font-light md:mt-[10px] xs:mt-[8px] font-Montserrat overflow-auto">
                  {item.occupations?.toString()}
                </p>
              </div>
            </>
          ) : null}

          <div className="flex flex-wrap justify-between md:mt-5 xs:mt-1">
            <p>
              <span className="md:text-2xl xs:text-[12px] font-Montserrat font-light leading-4 ">
                ₹ {item.fee}
              </span>
              <br />
              <span className="md:text-base xs:text-[10px] font-Montserrat font-light leading-4">
                per hour / session
              </span>
            </p>
            <div className="mt-4 md:mt-0 text-sm w-full md:w-auto">
              <ButtonElement
                disabled={loading}
                onSubmit={proceedtoPay}
                width="w-44"
                name={loading ? "Processing" : "Schedule Call"}
              ></ButtonElement>
            </div>
          </div>
          <div className="flex md:hidden xs:block">
            <div className="flex gap-2 ">
              <div className="xs:flex-right text-[12px]">
                <p
                  className="underline font-Montserrat pointer text-right xs:text-[10px] sm:text-sm mt-2 cursor-pointer"
                  onClick={toggleShow}
                >
                  {show ? "See less" : "See more"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
