import classNames from "@nyx-frontend/main/utils/classNames";
import { motion } from "framer-motion";
import Waitlist from "@nyx-frontend/main/components/Waitlist";
import { useState } from "react";
import { useRouter } from "next/navigation";

function HeroOverlap({
  className = "",
  url = "",
  onReplay = () => {},
  PageName,
}: {
  className?: string;
  url?: string;
  onReplay?: () => void;
  PageName?: string;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const goToLogin = () => {
    router.push("apphome/login");
  };


  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classNames(
        "absolute inset-0 size-full m-auto flex justify-center items-center bg-[rgba(28,8,57,0.85)] pt-[78px]",
        className,
      )}
    >
      <div>
        <motion.div
          className="text-center mb-6 md:mb-11"
          initial={{ y: 100, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0.5 }}
        >
          <button onClick={onReplay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 98 122"
              className="w-12 md:w-16"
            >
              <motion.path
                fill="#fff"
                d="M49 89.834c-5.104 0-9.885-.97-14.343-2.91-4.457-1.939-8.336-4.56-11.637-7.86-3.3-3.3-5.921-7.18-7.86-11.637-1.94-4.458-2.91-9.239-2.91-14.343h8.167c0 7.962 2.773 14.717 8.32 20.263 5.546 5.547 12.3 8.32 20.263 8.32 7.962 0 14.717-2.773 20.263-8.32 5.547-5.546 8.32-12.3 8.32-20.263 0-7.963-2.773-14.717-8.32-20.264-5.546-5.546-12.3-8.32-20.263-8.32h-.612l6.329 6.33L49 36.75 32.667 20.418 49 4.084l5.717 5.92-6.33 6.33H49c5.104 0 9.885.97 14.343 2.91 4.457 1.939 8.337 4.56 11.637 7.86 3.3 3.3 5.921 7.18 7.86 11.637 1.94 4.458 2.91 9.239 2.91 14.343 0 5.104-.97 9.885-2.91 14.343-1.939 4.457-4.56 8.336-7.86 11.637-3.3 3.3-7.18 5.921-11.637 7.86-4.458 1.94-9.239 2.91-14.343 2.91ZM27.04 117l-2.86-4.1c-.12.013-.3.02-.54.02h-3.16V117h-2.6v-14h5.76c1.213 0 2.267.2 3.16.6.907.4 1.6.973 2.08 1.72s.72 1.633.72 2.66c0 1.053-.26 1.96-.78 2.72-.507.76-1.24 1.327-2.2 1.7l3.22 4.6h-2.8Zm-.06-9.02c0-.893-.293-1.58-.88-2.06s-1.447-.72-2.58-.72h-3.04v5.58h3.04c1.133 0 1.993-.24 2.58-.72.587-.493.88-1.187.88-2.08Zm15.329 3.74c0 .173-.013.42-.04.74h-8.38c.147.787.527 1.413 1.14 1.88.627.453 1.4.68 2.32.68 1.173 0 2.14-.387 2.9-1.16l1.34 1.54a4.515 4.515 0 0 1-1.82 1.3c-.733.293-1.56.44-2.48.44-1.173 0-2.207-.233-3.1-.7-.893-.467-1.587-1.113-2.08-1.94-.48-.84-.72-1.787-.72-2.84 0-1.04.233-1.973.7-2.8a5.089 5.089 0 0 1 1.98-1.96c.84-.467 1.787-.7 2.84-.7 1.04 0 1.967.233 2.78.7a4.72 4.72 0 0 1 1.92 1.94c.467.827.7 1.787.7 2.88Zm-5.4-3.52c-.8 0-1.48.24-2.04.72-.547.467-.88 1.093-1 1.88h6.06c-.107-.773-.433-1.4-.98-1.88-.547-.48-1.227-.72-2.04-.72Zm13.721-2c1.04 0 1.967.227 2.78.68a4.882 4.882 0 0 1 1.94 1.92c.467.827.7 1.78.7 2.86 0 1.08-.233 2.04-.7 2.88a4.882 4.882 0 0 1-1.94 1.92c-.813.453-1.74.68-2.78.68-1.44 0-2.58-.48-3.42-1.44v5.18h-2.5v-14.56h2.38v1.4c.414-.507.92-.887 1.52-1.14a5.247 5.247 0 0 1 2.02-.38Zm-.28 8.8c.92 0 1.674-.307 2.26-.92.6-.613.9-1.42.9-2.42s-.3-1.807-.9-2.42c-.586-.613-1.34-.92-2.26-.92-.6 0-1.14.14-1.62.42-.48.267-.86.653-1.14 1.16-.28.507-.42 1.093-.42 1.76s.14 1.253.42 1.76c.28.507.66.9 1.14 1.18.48.267 1.02.4 1.62.4Zm8.071-12.84h2.5V117h-2.5v-14.84Zm9.861 4.04c1.574 0 2.774.38 3.6 1.14.84.747 1.26 1.88 1.26 3.4V117h-2.36v-1.3c-.306.467-.746.827-1.32 1.08-.56.24-1.24.36-2.04.36s-1.5-.133-2.1-.4c-.6-.28-1.066-.66-1.4-1.14a2.985 2.985 0 0 1-.48-1.66c0-.96.354-1.727 1.06-2.3.72-.587 1.847-.88 3.38-.88h2.76v-.16c0-.747-.226-1.32-.68-1.72-.44-.4-1.1-.6-1.98-.6-.6 0-1.193.093-1.78.28a4.373 4.373 0 0 0-1.46.78l-.98-1.82c.56-.427 1.234-.753 2.02-.98a8.976 8.976 0 0 1 2.5-.34Zm-.34 9.12c.627 0 1.18-.14 1.66-.42.494-.293.84-.707 1.04-1.24v-1.24h-2.58c-1.44 0-2.16.473-2.16 1.42 0 .453.18.813.54 1.08.36.267.86.4 1.5.4Zm18.214-9-5 11.54c-.467 1.16-1.034 1.973-1.7 2.44-.667.48-1.474.72-2.42.72-.534 0-1.06-.087-1.58-.26-.52-.173-.947-.413-1.28-.72l1-1.84c.24.227.52.407.84.54.333.133.666.2 1 .2.44 0 .8-.113 1.08-.34.293-.227.56-.607.8-1.14l.18-.42-4.66-10.72h2.6l3.36 7.9 3.38-7.9h2.4Z"
              />
            </svg>
            <span className="sr-only">Replay</span>
          </button>
        </motion.div>
        <motion.a
          // href={url}
          initial={{ y: 50, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0.5 }}
          transition={{ type: "tween" }}
          className="inline-flex justify-center items-center gap-3 font-semibold rounded-[30px] hover:border-none bg-gradient-to-r from-[#B631B1] to-[#7048D7]  py-3 px-5 border-solid cursor-pointer text-white hover:shadow-buttonShadow buttonShadowTransition"
          onClick={goToLogin}
        >
          Try {PageName} AI for Free
        </motion.a>
        <Waitlist onClose={closePopup} isPopupOpen={isPopupOpen} />
      </div>
    </motion.div>
  );
}

export default HeroOverlap;
