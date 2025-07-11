import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Button from "@nyx-frontend/main/components/Button";
import { BRAND_TABS_Two} from "@nyx-frontend/main/utils/productConstants";

const ProductName = ({ tab, setBrandTab, next,productNameErr,setProductNameErr,errorMessage }) => {
  const [productName, setProductName] = useState("");

  const productOnchange=(e)=>{
    setProductNameErr(false)
    setProductName(e.target.value)
  }

  return (
    <>
      <div className={`${tab === BRAND_TABS_Two.PRODUCTNAME?  "bg-[#332270]":"bg-[#23145A]"} rounded-lg`}>
        <div
          className={`${
            tab === BRAND_TABS_Two.PRODUCTNAME
          } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-[#FFFFFF] rounded-lg`}
          onClick={() =>
            setBrandTab((prevBrandTab) => {
              return prevBrandTab !== BRAND_TABS_Two.PRODUCTNAME
                ? BRAND_TABS_Two.PRODUCTNAME
                : "";
            })
          }
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <div className="flex w-full justify-between items-center">
            <div
              className={`w-[50%] md:w-full font-semibold flex ${
                tab === BRAND_TABS_Two.PRODUCTNAME
                  ? "text-nyx-yellow text-xl "
                    : "text-white text-sm"
              }`}
            >
              Product Name{" "} {tab === BRAND_TABS_Two.PRODUCTNAME ? <span className="  text-[#E26971] ml-1">*</span>:""} 
            </div>
          </div>

          <span
            className={`${
              tab === BRAND_TABS_Two.PRODUCTNAME
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
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: tab === BRAND_TABS_Two.PRODUCTNAME ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(` w-full overflow-hidden rounded-lg`)}
        >
          <div className="py-2 md:px-5 sm:px-4">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 w-full">
                <div className="w-full flex flex-col ">
                  <input
                    type="text"
                    value={productName}
                    onChange={productOnchange}
                    className={`w-full bg-transparent border  rounded-md p-2 font-normal placeholder:text-sm text-[#FFFFFF]  placeholder:italic  focus:placeholder-transparent ${productNameErr?"border-[#E26971]":"border-[#8297BD]"}`} 
                    placeholder="Light Basketball Shoes"
                  />
                  {/* {productNameErr ? <span className="text-xs text-[#E26971]  mt-1 ml-1 ">{errorMessage}</span>:<span></span>} */}
                </div>
                <div className="w-full flex justify-center items-center">
                  <Button
                    className={clsx({
                      ["rounded-full font-semibold w-32 mb-4 mt-4 hover:shadow-none text-nyx-yellow "]: true,
                      [" text-nyx-yellow hover:shadow-none  focus:shadow-glow "]: productName !== "",
                      
                    })}
                    onClick={async () => {
                      await next(productName);
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProductName;
