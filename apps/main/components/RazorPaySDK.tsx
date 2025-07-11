"use client";
import { useEffect } from "react";
import { IMAGE_URL } from "./constants";
import useRazorpay from "react-razorpay";



const loadScript = (src: string, id: string) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = (error) => {
      reject(error);
    };

    document.body.appendChild(script);
  });
};

export const useMakePayment = () => {
  const [Razorpay] = useRazorpay();
  const payment = async (data: { currency: string; amount: string | number; id: string | string }, user: { name: string; email: string; phone: string }, options: Object) => {
    const defaultOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      name: "Nyx Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      image: IMAGE_URL + "/assets/images/logo/NYXlogo_dark.png",
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      theme: {
        color: "#3B226F",
      },
      ...options,
    };

    // @ts-ignore
    const paymentObject = new Razorpay(defaultOptions);
    paymentObject.on("payment.failed", function (response: any) {
      console.log("error", response);
      // toast.error("Payment failed. Please try again. Contact support for help");
    });
    paymentObject.open();
  }

  return { payment }
}

export default function RazorPaySDK({ onError = () => { } }: { onError?: (res: object) => void }) {
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js", "checkout.razorpay")
      .then(() => {
        console.log("Razorpay SDK loaded successfully");
      })
      .catch((error) => {
        console.error("Razorpay SDK Failed to load");
        onError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}