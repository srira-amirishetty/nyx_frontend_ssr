/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPackagesService } from "@nyx-frontend/main/services/productService";
import { useSearchParams, useRouter } from "next/navigation";
import PlanSkeleton from "@nyx-frontend/main/components/PlanSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

import { addToCartService, getCartService } from "@nyx-frontend/main/services/cartService";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import clsx from "clsx";
import { hasToken } from "@nyx-frontend/main/utils/auth";

const Plans = () => {
  const search = useSearchParams();
  const { isLoggedIn } = useContext(UseContextData);
  const [showPreLogin, setShowPreLogin] = useState(false);
  const [processing, setProcessing] = useState<Record<number, boolean>>({});
  const [isCart, setIsCart] = useState<Record<number, boolean>>({});
  const [isSubscription, setIsSubscription] = useState<Record<string, boolean>>(
    {},
  );
  const [activeElement, setActiveElement] = useState<number>(0);
  const router = useRouter();
  const [prevPath, setPrevPath] = useState<string | null>(null);

  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartService,
  });

  const { data: plandata, isLoading } = useQuery({
    queryKey: ["plan-data"],
    queryFn: getPackagesService,
  });

  const mutateAddToCart = useMutation({
    mutationKey: ["add-to-cart"],
    mutationFn: addToCartService,
  });

  const goToCart = async () => {
    router.push(`/cart?page=reports&ref=${search.get("ref")}`);
  };

  const addToCart = async (itemId: number) => {
    if (isLoggedIn === false) {
      setShowPreLogin(true);
    } else {
      setProcessing({ [itemId]: true });
      mutateAddToCart.mutate(
        {
          itemId: itemId,
          itemType: "SUBSCRIPTION",
          quantity: 1,
        },
        {
          onSuccess: () => {
            setProcessing({});
            setIsCart((prevIsCart) => {
              return { ...prevIsCart, [itemId]: true };
            });
            router.push(`/cart?page=reports&ref=${search.get("ref")}`);
          },
        },
      );
    }
  };

  const handleClick = (value: number) => {
    setActiveElement(value);
  };

  useEffect(() => {
    let cart_items: Record<number, boolean> = {};
    let isSubs: Record<string, boolean> = {};

    setIsCart(cart_items);
    setIsSubscription(isSubs);

    if (cart && cart.shopping_cart.subscriptions?.length) {
      cart.shopping_cart.subscriptions.map((item: any) => {
        cart_items[item.itemId] = true;
        isSubs[item.subscriptionType] = true;
      });
      setIsCart(cart_items);
      setIsSubscription(isSubs);
    }
  }, [cart]);

  useEffect(() => {
    if (search.get("subscriptionType")) {
      setActiveElement(Number(search.get("subscriptionType")) || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.get("subscriptionType")]);

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getPrevPath = globalThis?.sessionStorage.getItem("current_route");
    setPrevPath(getPrevPath);
    if (getPrevPath === "lyrics") {
      setActiveElement(1);
    } else {
      setActiveElement(0);
    }
  }, []);

  return (
    <>
      <div className="mt-10 px-4">
        <div className="relative max-w-7xl hidden md:block">
          <button className="underline text-white absolute right-0 text-sm -top-6 underline-offset-2">
            <Link
              href={
                prevPath === "upload"
                  ? "/upload/probability?ref=" + search.get("ref")
                  : "/lyrics/probability?ref=" + search.get("ref")
              }
              className="text-[#FFF] font-[200] inline-block px-2 text-lg "
            >
              Skip for now
            </Link>
          </button>
        </div>

        <div className="md:w-[35%] sm:[70%] text-center mx-auto">
          <p className="text-[#FFF] font-semibold md:text-2xl sm:text-xl">
            Get Detailed reports of your song to improve its chances for
            popularity
          </p>
        </div>
        <div className="my-5 mx-auto">
          <p className=" text-[#FFF] font-li md:text-lg sm:text-base text-center">
            Our NYX AI can predict your song popularity based on past data
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center gap-5 my-2">
            <PlanSkeleton />
            <PlanSkeleton />
            <PlanSkeleton />
            <PlanSkeleton />
            <PlanSkeleton />
          </div>
        ) : (
          <div className="flex w-full justify-center items-center">
            <div className=" w-[90%] flex flex-col gap-5 my-2">
              {Object.keys(plandata?.nyx_packages || {}).map(
                (key: any, index: number) => (
                  <div key={`plans-${index}`} className="">
                    <div className="bg-[#301862]">
                      <h2 className="mb-0" id="headingOne">
                        <div
                          className={`${
                            activeElement === index
                          } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer bg-[#301862] text-nyx-yellow`}
                          onClick={() => handleClick(index)}
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <div className="flex w-full justify-between items-center">
                            <div className="flex flex-col">
                              <div className="w-[50%] md:w-full text-lg font-bold">
                                {key}
                              </div>
                              {key === "Premium Top up" ? (
                                <div className="text-[#FFF] text-sm mr-5 font-light">
                                  For talking to experts
                                </div>
                              ) : null}{" "}
                            </div>
                            <span className="text-[#FFF] text-sm mr-5 font-light w-[60%] flex flex-row-reverse">
                              {`Starting from ${plandata.nyx_packages[key][0].packagePrice}`}
                            </span>
                          </div>

                          <span
                            className={`${
                              activeElement === index
                                ? `rotate-[-180deg] -mr-1`
                                : `dark:fill-white`
                            } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </span>
                        </div>
                      </h2>
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: activeElement === index ? "auto" : 0,
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        className={clsx(`bg-[#3B226F] w-full overflow-hidden`)}
                      >
                        <div className="py-5 md:px-7 sm:px-4">
                          <div className="flex md:flex-row flex-col gap-5 mx-auto">
                            {plandata?.nyx_packages &&
                              plandata.nyx_packages[key].map(
                                (data: any, index: number) => (
                                  <>
                                    <div
                                      key={index}
                                      className="md:w-1/2 sm:w-full h-auto rounded-md bg-[#301862]"
                                    >
                                      <div className="w-full h-auto bg-[#301862] text-center flex justify-between items-center p-10">
                                        <h3 className="text-[#FFF]  font-semibold text-xl">
                                          {data.packageName}
                                        </h3>
                                        <p className="text-[#FFF] font-medium text-2xl">
                                          &#x20B9; {data.packagePrice}
                                        </p>
                                      </div>
                                      <div className="flex flex-col flex-start mx-10 text-[#FFF] leading-7">
                                        <h3 className="text-[#FFF] text-lg font-medium">
                                          What&apos;s Included
                                        </h3>

                                        <ol className="text-[#FFF] text-base font-light leading-7">
                                          {data.description
                                            .split(";")
                                            .map((item: any, index: any) => (
                                              <li key={index}>
                                                {index + 1}. {item}
                                              </li>
                                            ))}
                                        </ol>
                                      </div>
                                      <div className="flex m-10 justify-center">
                                        <ButtonElement
                                          disabled={
                                            Object.keys(processing).length >
                                              0 ||
                                            (isSubscription[
                                              data.subscriptionType
                                            ] &&
                                              !isCart[data.packageId]) ||
                                            (data.packageName.toLowerCase() ==
                                              "topup" &&
                                              Object.keys(isCart).length ==
                                                0) ||
                                            data.active
                                          }
                                          onSubmit={() => {
                                            isCart[data.packageId]
                                              ? goToCart()
                                              : addToCart(data.packageId);
                                          }}
                                          name={
                                            processing[data.packageId]
                                              ? "Adding..."
                                              : isCart[data.packageId]
                                                ? "Go To Cart"
                                                : data.active
                                                  ? "Already Subscribed"
                                                  : "Buy Now"
                                          }
                                          width={
                                            data.packageName.toLowerCase() ==
                                            "topup"
                                              ? "w-[50%]"
                                              : "w-full"
                                          }
                                        ></ButtonElement>
                                      </div>
                                    </div>
                                  </>
                                ),
                              )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const PlansSuspense = () => (
  <Suspense>
    <Plans />
  </Suspense>
);

export default PlansSuspense;
