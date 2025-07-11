"use client";
import React, { Suspense, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { useQuery } from "@tanstack/react-query";
import { getUploadedQuestionsServiceLyrics } from "@nyx-frontend/main/services/uploadService";
import { useRouter, useSearchParams } from "next/navigation";
import Slides from "./Slides";
import Link from "next/link";
import Modal from "react-modal";
import { defaultStyle } from "@nyx-frontend/main/utils/modalstyles";
import type { SlideType } from "./types";
import Skeleton from "./Skeleton";
import { getPackagesService } from "@nyx-frontend/main/services/productService";
type PlanType = {
  active: number;
  subscriptionType: string;
};

function Question() {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const search = useSearchParams();
  const { data, isPending } = useQuery({
    queryKey: ["upload-questions", search.get("processId")],
    queryFn: async () =>
      search.get("processId")
        ? getUploadedQuestionsServiceLyrics(search.get("processId"))
        : null,
    retry: false,
  });

  const toggleLastModel = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: plandata, isLoading: isPlanLoading } = useQuery({
    queryKey: ["plan-data"],
    queryFn: getPackagesService,
  });

  const flatArray: PlanType[] = Object.values<any>(
    plandata?.nyx_packages ?? {},
  )?.flat(1);
  const hasActivePlan: boolean = flatArray.some(
    (plan: PlanType) =>
      plan.subscriptionType === "Lyrics Subscription" && plan.active === 1,
  );

  const onLastClose = () => {
    setModal(false);
    {
      hasActivePlan
        ? router.push(
            "/apphome/workspace10/lyrics-genius-ai/ai-lyrics-writer?ref=" +
              search.get("processId"),
          )
        : router.push("/pricing?ref=" + search.get("processId"));
    }
  };

  return (
    <section className="my-10">
      <div className="mx-auto w-[90%]  h-full md:h-[80%] rounded-3xl bg-[#14264e] py-2 px-4">
        <div className="flex w-full justify-end ">
          <Link
            href={`/apphome/workspace10/lyrics-genius-ai/probability?ref=${search.get("processId")}`}
            className="px-2 py-1 top-4 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M0.35 13.65C0.583333 13.8833 0.855555 14 1.16667 14C1.47778 14 1.75 13.8833 1.98333 13.65L7 8.63333L12.0556 13.6889C12.263 13.8963 12.5287 13.9935 12.8528 13.9806C13.1769 13.9676 13.4426 13.8574 13.65 13.65C13.8833 13.4167 14 13.1444 14 12.8333C14 12.5222 13.8833 12.25 13.65 12.0167L8.63333 7L13.6889 1.94444C13.8963 1.73704 13.9935 1.4713 13.9806 1.14722C13.9676 0.823148 13.8574 0.557407 13.65 0.35C13.4167 0.116667 13.1444 0 12.8333 0C12.5222 0 12.25 0.116667 12.0167 0.35L7 5.36667L1.94444 0.311111C1.73704 0.103703 1.4713 0.00648092 1.14722 0.0194439C0.823148 0.0324068 0.557407 0.142593 0.35 0.35C0.116667 0.583333 0 0.855555 0 1.16667C0 1.47778 0.116667 1.75 0.35 1.98333L5.36667 7L0.311111 12.0556C0.103703 12.263 0.00648092 12.5287 0.0194439 12.8528C0.0324068 13.1769 0.142593 13.4426 0.35 13.65Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>
        <div className="h-[calc(100%-50px)]">
          {isPending ? (
            <Skeleton />
          ) : (
            <Swiper
              spaceBetween={50}
              modules={[Pagination]}
              slidesPerView={1}
              pagination={{ clickable: false }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              draggable={false}
              simulateTouch={false}
            >
              {data?.nyx_master_questions?.map(
                (slide: SlideType, index: number) => (
                  <SwiperSlide key={slide.question}>
                    <Slides
                      data={slide}
                      index={index}
                      total={data?.nyx_master_questions.length - 1}
                      event={toggleLastModel}
                    />
                  </SwiperSlide>
                ),
              )}
            </Swiper>
          )}
        </div>
        <div className="text-white text-lg font-light px-6 text-center md:text-left">
          <Link href="/faq" className="mr-1">
            FAQ
          </Link>{" "}
          |
          <Link href="/need-assistance" className="ml-1">
            Need Assistance
          </Link>
        </div>
      </div>
      <Modal
        isOpen={modal}
        style={defaultStyle}
        ariaHideApp={false}
        contentLabel=""
        onRequestClose={onLastClose}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <button
          className="px-2 py-1 absolute top-2 right-2"
          onClick={onLastClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M0.35 13.65C0.583333 13.8833 0.855555 14 1.16667 14C1.47778 14 1.75 13.8833 1.98333 13.65L7 8.63333L12.0556 13.6889C12.263 13.8963 12.5287 13.9935 12.8528 13.9806C13.1769 13.9676 13.4426 13.8574 13.65 13.65C13.8833 13.4167 14 13.1444 14 12.8333C14 12.5222 13.8833 12.25 13.65 12.0167L8.63333 7L13.6889 1.94444C13.8963 1.73704 13.9935 1.4713 13.9806 1.14722C13.9676 0.823148 13.8574 0.557407 13.65 0.35C13.4167 0.116667 13.1444 0 12.8333 0C12.5222 0 12.25 0.116667 12.0167 0.35L7 5.36667L1.94444 0.311111C1.73704 0.103703 1.4713 0.00648092 1.14722 0.0194439C0.823148 0.0324068 0.557407 0.142593 0.35 0.35C0.116667 0.583333 0 0.855555 0 1.16667C0 1.47778 0.116667 1.75 0.35 1.98333L5.36667 7L0.311111 12.0556C0.103703 12.263 0.00648092 12.5287 0.0194439 12.8528C0.0324068 13.1769 0.142593 13.4426 0.35 13.65Z"
              fill="white"
            />
          </svg>
        </button>
        <p className="text-white flex justify-center items-center h-full text-center">
          Your request has been submitted. Someone from the team will reach out
          to you shortly.
        </p>
      </Modal>
    </section>
  );
}

const QuestionSuspense = () => (
  <Suspense>
    <Question />
  </Suspense>
);

export default QuestionSuspense;
