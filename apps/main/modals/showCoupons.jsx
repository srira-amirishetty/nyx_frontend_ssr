"use client";
import { useContext, useState, useEffect } from "react";
import { ButtonElement } from "../shared/inputs";
import { UseContextData } from "../hooks/usecontext";
import {
  MODAL_CONFIG_PROCESSING,
  AddtoWalletStyle,
  MODAL_CONFIG_FOR_LOADER,
} from "../utils/modalstyles";
import Modal from "react-modal";
import {
  BASEURL,
  ADD_TO_WALLET,
  ADD_MONEY_PAYMENT_INTENT,
  GET_COUPON_CODES,
} from "../utils/utils";
import useRequests from "../hooks/makeRequests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShowCouponForm(props) {
  const {
    setShowCoupons,
    walletDetails,
    setWalletDetails,
    userDetails,
    setUserDetails,
    coupons,
    setCoupons,
  } = useContext(UseContextData);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [processing, setProcessing] = useState(false);
  const [formErrorCoupon, setFormErrorCoupon] = useState("");
  const [formErrorCard, setFormErrorCard] = useState("");
  const [viewCouponDetail, setViewCouponDetail] = useState({});
  const [text, setText] = useState("");
  const { get, post } = useRequests();

  const getCoupons = async () => {
    const data = await get(BASEURL + GET_COUPON_CODES, MODAL_CONFIG_FOR_LOADER);
    if (data?.data?.coupon_codes?.length != 0) {
      setCoupons(data.data.coupon_codes);
    } else {
      setCoupons([]);
      setText("Sorry no coupon codes available");
    }
  };

  useEffect(() => {
    if (!coupons.length) getCoupons();
  }, []);

  const validateForm = () => {
    let valid = true;
    if (!appliedCoupon) {
      valid = false;
      setFormErrorCoupon("Please enter valid coupon");
    }
    return valid;
  };

  const getCouponDiscount = async (code) => {
    let idx = coupons.findIndex((x) => x.code === code);

    if (idx != -1) {
      let coupon = coupons[idx];

      if (coupon.discountType.toUpperCase() == "BOTH") {
        let discount =
          (props.finalTotal - coupon.discountFixed) *
          (coupon.discountPercentage / 100);
        discount = (discount + coupon.discountFixed).toFixed(2);
        props.onCouponApplied(
          Math.min(discount, coupon.maxRedemption),
          coupon.code,
        );
      } else if (coupon.discountType.toUpperCase() == "PERCENTAGE") {
        let discount = (
          props.finalTotal *
          (coupon.discountPercentage / 100)
        ).toFixed(2);
        props.onCouponApplied(
          Math.min(discount, coupon.maxRedemption),
          coupon.code,
        );
      } else if (coupon.discountType.toUpperCase() == "FIXED") {
        props.onCouponApplied(coupon.discountFixed, coupon.code);
      }
      props.onClose();
    } else {
      setFormErrorCoupon("Invalid coupon");
      props.onCouponApplied(0);
    }
  };

  const applyCoupon = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!validateForm()) {
      setProcessing(false);
      return;
    }
    getCouponDiscount(appliedCoupon);
  };

  const applyExistingCoupon = async (code) => {
    setAppliedCoupon(code);
    getCouponDiscount(code);
  };

  function handleInput(event) {
    const regex = /^[a-zA-Z0-9]*$/; // regex to allow only text and numbers
    const inputValue = event.target.value;
    if (!regex.test(inputValue)) {
      event.target.value = inputValue.replace(/[^a-zA-Z0-9]/g, ""); // remove any non-text or non-number characters
    }
  }

  return (
    <form onSubmit={applyCoupon}>
      <div
        className={
          "flex justify-between bg-transparent outline-none w-full border border-blue py-3 pl-2 text-sm text-white rounded-md placeholder-blue"
        }
      >
        <input
          className={`bg-transparent outline-none pl-2 text-sm py-2 md:py-1
                text-white rounded-md placeholder-blue ${
                  formErrorCoupon ? "border-[#E26971]" : ""
                }`}
          placeholder="Enter Coupon Code"
          type="text"
          value={appliedCoupon}
          onInput={handleInput}
          onChange={(event) => {
            setFormErrorCoupon("");
            setAppliedCoupon(event.target.value.toUpperCase());
          }}
        />
        <button
          className={
            " w-full md:w-[50%] block text-white cursor-pointer hover:text-black hover:bg-amber-300 border border-amber-400  font-lg rounded-md md:py-2 text-center mr-2"
          }
        >
          Apply
        </button>
      </div>
      {formErrorCoupon && (
        <div className="absolute mt-2 right-[8%] text-[#E26971] text-xs font-light text-end">
          {formErrorCoupon}
        </div>
      )}
      <>
        {coupons?.length != 0 ? (
          <>
            {coupons?.map((item, index) => (
              <div
                key={index}
                className="mt-8 rounded-md p-4"
                style={{ backgroundColor: "rgba(33, 25, 76, 1)" }}
              >
                <div className="">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white text-sm">{item.code}</p>
                      {!viewCouponDetail[item.couponId] && (
                        <p
                          className="text-blue mt-2 text-xs font-light cursor-pointer underline"
                          onClick={() =>
                            setViewCouponDetail({ [item.couponId]: true })
                          }
                        >
                          View Details
                        </p>
                      )}
                    </div>
                    <div
                      onClick={() => applyExistingCoupon(item.code)}
                      className={
                        "h-fit p-2 pr-5 pl-5 block text-white cursor-pointer hover:text-black hover:bg-amber-300 border border-amber-400  text-sm rounded-md md:py-2 text-center mr-2"
                      }
                    >
                      <div>Apply</div>
                    </div>
                  </div>
                  <div>
                    {viewCouponDetail[item.couponId] && (
                      <div>
                        <p className="text-white text-xs font-light mt-2">
                          {item.description}
                        </p>
                        <p
                          className="text-blue mt-2 text-xs font-light cursor-pointer underline"
                          onClick={() =>
                            setViewCouponDetail({ [item.couponId]: false })
                          }
                        >
                          Hide Details
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="mt-16 ml-8 text-white text-sm">{text}</div>
        )}
      </>
    </form>
  );
}

const ShowCouponModal = ({ finalTotal, onCouponApplied, onClose }) => {
  return (
    <>
      <div className="right-5 top-4 absolute"></div>
      <div className="p-5">
        <div className="flex justify-end">
          <div className="pr-3 cursor-pointer" onClick={onClose}>
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
        <div className="m-auto w-[96%] mt-3">
          <ShowCouponForm
            finalTotal={finalTotal}
            onCouponApplied={onCouponApplied}
            onClose={onClose}
          />
        </div>
      </div>
    </>
  );
};

export default ShowCouponModal;
