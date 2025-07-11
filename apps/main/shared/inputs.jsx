"use client";
import { useContext } from "react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import classNames from "@nyx-frontend/main/utils/classNames";
import { motion, AnimatePresence } from "framer-motion";
import { toTitleCase } from "@nyx-frontend/main/utils/textUtils";
import Link from "next/link";

export const DynamicInput = (props) => {
  const [inputs, setInputs] = useState(props.input.data);

  const handleRadioChange = (value, input_index) => {
    const newInputs = [...inputs];
    const input = newInputs[input_index];
    input.radio_selected = value;
    setInputs(newInputs);
  };

  const addMore = () => {
    inputs.push({
      value: "",
      radio_selected: "Youtube",
      options: inputs[0].options,
    });
    setInputs([...inputs]);
  };

  const setInputVal = (val, input_index) => {
    const newInputs = [...inputs];
    const input = newInputs[input_index];
    input.value = val;
    setInputs(newInputs);
  };
  const onRemoveItem = (index) => {
    inputs.splice(index, 1);
    setInputs([...inputs]);
  };
  return (
    <>
      {inputs.map((input, main_index) => (
        <div key={`inputs-${main_index}`}>
          <div className="flex gap-8 mt-4 pt-2">
            {input.options.map((option) => (
              <label className="inline-flex items-center" key={option.name}>
                <input
                  value={option.name}
                  checked={input.radio_selected === option.name}
                  onClick={(event) =>
                    handleRadioChange(event.target.value, main_index)
                  }
                  type="radio"
                  className="form-radio"
                  name={`radio-button-${main_index}-${option.name}`}
                />
                <span className="ml-2 text-blue text-sm">{option.name}</span>
              </label>
            ))}
          </div>
          <div className="flex mt-5">
            <input
              onChange={(event) => setInputVal(event.target.value, main_index)}
              className="bg-transparent border border-white outline-none pl-2 text-sm text-white h-9 rounded-sm w-[34.5rem] placeholder-blue"
              placeholder={props.input.placeholder}
            ></input>
            {/* {main_index != 0 && <svg onClick={() => onRemoveItem(main_index)} className="relative top-3 left-2 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path fill="#fff" d="M10.6,8l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L9.2,6.6L3.9,1.3C3.5,0.9,2.9,0.9,2.5,1.3s-0.4,1,0,1.4l5.3,5.3L1.3,13.1c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L10.6,8z" />
                    </svg>} */}
          </div>
        </div>
      ))}
      <div
        className="flex justify-end mr-10 pt-3 text-sm text-white cursor-pointer"
        onClick={() => addMore()}
      >
        + Add More
      </div>
    </>
  );
};

export const SelectInput = (props) => {
  return (
    <select
      {...props.params}
      className={`${props.data.background}  h-11 border border-white rounded-sm ${props.data.textColor} text-sm  px-4 py-2 leading-tight focus:outline-none w-full`}
    >
      {props.data.option.map((option) => (
        <option hidden={option.hidden} key={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export const TextArea = (props) => {
  return (
    <textarea
      className={`${props.data.background} ${props.height} border border-white rounded-sm ${props.data.textColor} text-sm  px-4 py-2 leading-tight focus:outline-none w-full`}
      placeholder={props.data.placeholder}
    ></textarea>
  );
};

export const Input = (props) => {
  return (
    <input
      placeholder={props.placeholder}
      className={`${props.width} border border-white rounded-sm focus:outline-none`}
    ></input>
  );
};

export const ButtonElement = (props) => {
  const onClick = (event) => {
    event.preventDefault();
    props.onSubmit();
  };
  return (
    <button
      disabled={props.disabled ? true : false}
      onClick={onClick}
      className={`block ${props.width} ${
        props.loader ? "text-black" : "text-white"
      } border border-amber-400 
       font-lg rounded-full px-5 py-2 md:py-2 text-center w-40
      ${
        props.disabled
          ? "bg-[#aaa] text-black border-0 cursor-not-allowed font-semibold"
          : "cursor-pointer hover:text-black hover:bg-amber-300 font-semibold"
      }`}
    >
      <div className="flex justify-center gap-2">
        <p className="">{props.name}</p>
        {props.loader && <div className="loader"></div>}
      </div>
    </button>
  );
};

export const ToggleBar = (props) => {
  return (
    <label
      className={`relative inline-flex items-center
`}
    >
      <input
        type="checkbox"
        defaultValue="off"
        className="sr-only peer"
        onChange={(e) => props.handleChange(e)}
      />
      <div className="w-10 h-6 cursor-pointer bg-[#15254d] border-[#8297BD] border-4 peer-focus:outline-none peer-checked:border-[#FFCB54] dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[8px]after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600"></div>
    </label>
  );
};

export const Tabs = (props) => {
  const [tabState, setTabState] = useState(props.profile_tab);
  const { currentRoute } = useContext(UseContextData);

  const [data] = useState(props.data);
  const navigate = useRouter();
  return (
    <div className={props.classes}>
      {data.map((tab) => (
        <div
          className="w-[50%] text-center cursor-pointer"
          onClick={() => {
            props.getTabName(tab.name);
            setTabState(tab.name);
            if (tab.route) {
              navigate.push(`/${tab.name}/${currentRoute}`);
            }
          }}
          key={tab.name}
        >
          <p
            className={
              tabState === tab.name
                ? "border-amber-400 capitalize text-white border-b-4 font-extrabold text-[13px] md:text-[14px]"
                : "border-gray-400 text-white capitalize text-[13px] md:text-[14px]"
            }
          >
            {tab.name === "ShareRequests" ? "Requests" : tab.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export const AuthTabs = (props) => {
  const [tabState, setTabState] = useState(props.profile_tab);
  const { currentRoute } = useContext(UseContextData);

  const [data] = useState(props.data);
  const navigate = useRouter();
  return (
    <div className={props.classes}>
      {data.map((tab) => (
        <div
          className="w-[50%] text-center cursor-pointer"
          key={tab.name}
          onClick={() => {
            props.getTabName(tab.name);
            setTabState(tab.name);
            if (tab.route) {
              navigate.push(`/${tab.name}/${currentRoute}`);
            }
          }}
        >
          <p
            className={
              tabState === tab.name
                ? "border-amber-400 capitalize text-amber-400 border-b-4 text-[13px] md:text-[14px]"
                : "border-gray-400 capitalize border-b-4 text-white text-[13px] md:text-[14px]"
            }
          >
            {tab.name === "ShareRequests" ? "Requests" : tab.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export const TabsMain = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className="w-32 md:w-72 text-center cursor-pointer"
          onClick={() => props.tabState(index)}
        >
          <div
            className={
              index === props.tabStatus
                ? "border-amber-400 text-white border-b-4 text-sm mt-2"
                : " mt-2 border-b-4 text-sm border-slate-700 text-gray-400"
            }
          >
            <h2 className="mb-4">{item.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ContextTabs = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className="w-32 md:w-72 text-center cursor-pointer"
          onClick={() => props.tabState(index)}
        >
          <div
            className={
              index === props.tabStatus
                ? "border-amber-400 text-white border-b-4 text-sm mt-2"
                : " mt-2 border-b-4 text-sm border-slate-700 text-gray-400"
            }
          >
            <h2 className="mb-4">{item.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export const PriceTabs = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <button
          key={index}
          className="text-center cursor-pointer w-full md:w-56 relative z-0"
          onClick={() => props.tabState(index)}
        >
          <AnimatePresence>
            {index === props.tabStatus && (
              <motion.div
                className="bg-white -z-10 rounded-full w-full h-full absolute"
                layoutId="plan-name"
              ></motion.div>
            )}
          </AnimatePresence>
          <div
            className={classNames(
              "h-[45px] lg:h-[63px] text-sm py-2 px-5 flex items-center justify-center transition duration-800 ease-in-out w-40 md:w-full",
              index === props.tabStatus ? "" : "bg-transparent",
            )}
          >
            <div
              className={classNames(
                "text-[12px] md:text-[18px] transition-colors",
                index === props.tabStatus ? "text-black" : "text-white",
              )}
            >
              <span>{item.displayName}</span>
              {item.name === "Yearly" ? (
                <span className="text-[#7048D7] font-bold pl-1.5">
                  {item.offer}
                </span>
              ) : null}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export const PriceTabsWebapp = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className="text-center cursor-pointer w-full md:w-56 relative z-0"
          onClick={() => props.tabState(index)}
        >
          <AnimatePresence>
            {index === props.tabStatus && (
              <motion.div
                className="bg-[#F1BB2E] -z-10 rounded-full w-full h-full absolute"
                layoutId="plan-name"
              ></motion.div>
            )}
          </AnimatePresence>
          <div
            className={classNames(
              "h-[45px] lg:h-[63px] text-sm py-2 px-5 flex items-center justify-center transition duration-800 ease-in-out w-40 md:w-full",
              index === props.tabStatus ? "" : "bg-transparent",
            )}
          >
            <div
              className={classNames(
                "text-[12px] md:text-[18px] transition-colors",
                index === props.tabStatus ? "text-black" : "text-white",
              )}
            >
              <span>{item.displayName}</span>
              {item.name === "Yearly" ? (
                <span className="font-bold pl-1.5">{item.offer}</span>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export const ProfileTabs = ({
  data,
  tabStatus,
  tabState,
  onTabClick,
  workspace,
}) => {
  const pathname = usePathname();
  const handleTabClick = (index) => {
    tabState(index);
    onTabClick(index);
  };

  return (
    <div
      className={`flex whitespace-nowrap md:whitespace-normal border-b-[1px] border-[#8297BD]`}
    >
      {data?.map((item, index) => (
        <Link
          href={`/apphome/${workspace}/settings${item.url}`}
          key={index}
          className=" mt-4  text-center cursor-pointer mr-20"
          onClick={() => handleTabClick(index)}
        >
          <div>
            <h2
              className={`pb-1 ${pathname.replace(/%20/g, "") === `/apphome/${workspace}/settings${item.url}`.replace(/( )+/g, "") ? " text-nyx-yellow underline decoration-4 underline-offset-[10px]" : "text-white"} text-[20px]  font-normal`}
            >
              {item.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const AssetsTabs = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className="w-32 md:w-72 text-center cursor-pointer"
          onClick={() => props.tabState(index)}
        >
          <div
            className={
              index === props.tabStatus
                ? "border-amber-400 text-amber-400 border-b-4 text-base mt-2"
                : " mt-2 border-b-4 text-base border-slate-700 text-gray-400"
            }
          >
            <h2 className="mb-4">{item.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export const BrandingHeadline = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className="w-32 md:w-72 text-center cursor-pointer"
          onClick={() => props.tabState(index)}
        >
          <div
            className={
              index === props.tabStatus
                ? "border-amber-400 text-white border-b-4 text-sm mt-2"
                : " mt-2 border-b-4 text-sm border-slate-700 text-gray-400"
            }
          >
            <h2 className="mb-4">{item.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CreativesTab = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className="w-32 md:w-72 text-center cursor-pointer"
          onClick={() => props.tabState(index)}
        >
          <div
            className={
              index == props.tabStatus
                ? "border-[#FFC01D] text-white border-b-4 text-base mt-1 font-bold"
                : " mt-1 border-b-4 text-base text-white border-slate-700 font-normal"
            }
          >
            <div className="mb-4">{item.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CreativesTabTextToImage = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className={`w-32 md:w-72 text-center ${
            index !== 1 ? "cursor-pointer" : "cursor-not-allowed opacity-50"
          }`}
          onClick={() => index !== 1 && props.tabState(index)}
        >
          <div
            className={
              index == props.tabStatus
                ? "border-[#FFC01D] text-white border-b-4 text-base mt-1 font-bold"
                : " mt-1 border-b-4 text-base text-white border-slate-700 font-normal"
            }
          >
            {/* <div className="mb-4">{item.name}</div> */}
            <div className="flex justify-center items-center">
              <div>
                {index === props.tabStatus ? null : (
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_5839_11278)">
                      <path
                        d="M8.48958 12.2096C9.22292 12.2096 9.82292 11.6096 9.82292 10.8763C9.82292 10.143 9.22292 9.54297 8.48958 9.54297C7.75625 9.54297 7.15625 10.143 7.15625 10.8763C7.15625 11.6096 7.75625 12.2096 8.48958 12.2096ZM12.4896 6.20964H11.8229V4.8763C11.8229 3.0363 10.3296 1.54297 8.48958 1.54297C6.64958 1.54297 5.15625 3.0363 5.15625 4.8763V6.20964H4.48958C3.75625 6.20964 3.15625 6.80964 3.15625 7.54297V14.2096C3.15625 14.943 3.75625 15.543 4.48958 15.543H12.4896C13.2229 15.543 13.8229 14.943 13.8229 14.2096V7.54297C13.8229 6.80964 13.2229 6.20964 12.4896 6.20964ZM6.42292 4.8763C6.42292 3.7363 7.34958 2.80964 8.48958 2.80964C9.62958 2.80964 10.5563 3.7363 10.5563 4.8763V6.20964H6.42292V4.8763ZM12.4896 14.2096H4.48958V7.54297H12.4896V14.2096Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5839_11278">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.488281 0.875)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
              <div className={`text-white text-[14px] medium`}>{item.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const PerformanceTabSetting = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className={`w-full text-center cursor-pointer`}
          onClick={() => props.tabState(item.name)}
        >
          <div
            className={
              item.name == props.tabStatus
                ? "border-[#FFC01D] text-white border-b-4 text-base mt-1 font-bold"
                : " mt-1 border-b-4 text-base text-white border-slate-700 font-normal"
            }
          >
            <div className="mb-4">{item.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ImageAnalysisTabSetting = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className={`w-32 md:w-full text-center cursor-pointer`}
          onClick={() => props.tabState(index)}
        >
          <div
            className={
              index == props.tabStatus
                ? "border-[#FFC01D] text-[#FFC01D] border-b-4 text-base mt-1 font-bold"
                : "mt-1 border-b-4 text-base text-white border-slate-700 font-normal"
            }
          >
            <div className="flex justify-center items-center mb-4">
              <div className={`text-[16px] medium`}>{item.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export const GenAITab = (props) => {
  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className={`w-32 md:w-full text-center cursor-default`}
          onClick={() => props.tabState(index)}
        >
          <div
            className={
              index == props.tabStatus
                ? "border-[#FFC01D] text-white border-b-4 text-base mt-1 font-bold"
                : " mt-1 border-b-4 text-base text-white border-slate-700 font-normal"
            }
          >
            {/* <div className="mb-4">{item.name}</div> */}
            <div className="flex justify-center items-center">
              <div className={`text-white text-[14px] medium`}>{item.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export const EmojisTab = (props) => {
  return (
    <div className={`flex`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className={`w-full cursor-pointer`}
          onClick={() => props.tabState(index)}
        >
          <div
            className={
              index == props.tabStatus
                ? "border-[#FFC01D] text-[#FFC01D] border-b-4 text-base font-bold"
                : "border-b-4 text-base text-white border-slate-700 font-normal"
            }
          >
            <div className="mb-2 flex justify-center items-center">
              {item.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const TargetGroupTab = ({ tab, activeTab, onActiveHander }) => {
  const { id, name } = tab;
  const isActive = activeTab === id;

  const onClick = () => {
    onActiveHander(id);
  };

  return (
    <button
      onClick={onClick}
      className={classNames(
        "mb-2 text-sm text-center w-full whitespace-nowrap",
        isActive ? "text-white font-bold" : "text-white font-normal",
      )}
    >
      <span className="pb-[18px] block px-2">{toTitleCase(name)}</span>
      {isActive ? (
        <motion.div className="h-1 bg-amber-400" layoutId="underline" />
      ) : null}
    </button>
  );
};

export const TargetGroupTabs = ({ tabs, tabClick }) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id);

  const onActiveHander = (id) => {
    tabClick(id);
    setActiveTab(id);
  };

  return (
    <div className={`flex whitespace-nowrap md:whitespace-normal`}>
      {tabs?.map((tab) => (
        <TargetGroupTab
          key={tab.id}
          tab={tab}
          onActiveHander={onActiveHander}
          activeTab={activeTab}
        />
      ))}
    </div>
  );
};

export const ModelPageTabs = (props) => {
  return (
    <div
      className={`flex flex-nowrap items-center justify-center md:whitespace-normal gap-5 `}
    >
      {/* {props.data?.map((item, index) => (
        <div
          key={index}
          className={`rounded-md mt-4 text-center cursor-pointer w-40 py-2 `}
          onClick={() => props.tabState(index)}
          style={{
            background:
              index === props.tabStatus
                ? "#5E32FF"
                : "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
          }}
        >
          <div>
            <h2 className={`text-white text-[18px]  font-normal`}>
              {item.name}
            </h2>
          </div>
        </div>
      ))} */}
      {props.data?.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-center rounded-[3.886px] mt-4 text-center min-w-[160px] py-3   ${
            index === 0 || index === 1 || index === 2 || index === 3
              ? "cursor-pointer"
              : "cursor-not-allowed"
          }`}
          onClick={
            index === 0 || index === 1 || index === 2 || index === 3
              ? () => props.tabState(index)
              : undefined
          }
          style={{
            background: index === props.tabStatus ? "#5E32FF" : "#1D1138",
          }}
        >
          <div className="flex justify-center items-center">
            <div>
              {index === 0 ||
              index === 1 ||
              index === 2 ||
              index === 3 ? null : (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_5839_11278)">
                    <path
                      d="M8.48958 12.2096C9.22292 12.2096 9.82292 11.6096 9.82292 10.8763C9.82292 10.143 9.22292 9.54297 8.48958 9.54297C7.75625 9.54297 7.15625 10.143 7.15625 10.8763C7.15625 11.6096 7.75625 12.2096 8.48958 12.2096ZM12.4896 6.20964H11.8229V4.8763C11.8229 3.0363 10.3296 1.54297 8.48958 1.54297C6.64958 1.54297 5.15625 3.0363 5.15625 4.8763V6.20964H4.48958C3.75625 6.20964 3.15625 6.80964 3.15625 7.54297V14.2096C3.15625 14.943 3.75625 15.543 4.48958 15.543H12.4896C13.2229 15.543 13.8229 14.943 13.8229 14.2096V7.54297C13.8229 6.80964 13.2229 6.20964 12.4896 6.20964ZM6.42292 4.8763C6.42292 3.7363 7.34958 2.80964 8.48958 2.80964C9.62958 2.80964 10.5563 3.7363 10.5563 4.8763V6.20964H6.42292V4.8763ZM12.4896 14.2096H4.48958V7.54297H12.4896V14.2096Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5839_11278">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.488281 0.875)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div className={`text-white text-[14px] md:text-[14px] font-bold`}>
              {item.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const GalleryTabs = (props) => {
  return (
    <div
      className={`flex flex-nowrap items-center justify-center whitespace-nowrap md:whitespace-normal gap-5`}
    >
      {props.data?.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-center rounded-[3.886px]  text-center w-auto md:w-[154px] px-5 md:px-0  py-4  ${
            index === 0 ||
            index === 1 ||
            index === 2 ||
            index === 3 ||
            index === 4
              ? // index === 5 ||
                // index === 6
                "cursor-pointer"
              : "cursor-not-allowed"
          }`}
          onClick={
            index === 0 ||
            index === 1 ||
            index === 2 ||
            index === 3 ||
            index === 4 ||
            index === 5 ||
            index === 6
              ? () => props.tabState(index)
              : undefined
          }
          style={{
            background:
              index === props.tabStatus
                ? "#7048D7"
                : "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
          }}
        >
          <div className="flex justify-center items-center">
            <div>
              {
                index === 0 ||
                  index === 1 ||
                  index === 2 ||
                  index === 3 ||
                  index === 4
                // index === 5 ||index === 6}
              }
            </div>
            <div className={`text-white text-[14px]  font-bold`}>
              {item.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AssetTabs = (props) => {
  return (
    <div
      className={`flex flex-nowrap items-center justify-center whitespace-nowrap md:whitespace-normal gap-5`}
    >
      {props.data?.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-center rounded-[3.886px]  text-center w-[94px]  px-5   py-4  ${
            index === 0 || index === 1 || index === 2 || index === 3
              ? // index === 5 ||
                // index === 6
                "cursor-pointer"
              : "cursor-not-allowed"
          }`}
          onClick={
            index === 0 ||
            index === 1 ||
            index === 2 ||
            index === 3 ||
            index === 4 ||
            index === 5 ||
            index === 6
              ? () => props.tabState(index)
              : undefined
          }
          style={{
            background:
              index === props.tabStatus
                ? "#7048D7"
                : "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
          }}
        >
          <div className="flex justify-center items-center">
            <div>
              {
                index === 0 || index === 1 || index === 2 || index === 3 // index === 5 ||index === 6}
              }
            </div>
            <div className={`text-white text-[14px]  `}>{item.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const StableDiffusionTabs = (props) => {
  return (
    <div
      className={`flex whitespace-nowrap md:whitespace-normal gap-2 md:gap-5`}
    >
      {/* {props.data?.map((item, index) => (
        <div
          key={index}
          className={`rounded-md mt-4 text-center cursor-pointer w-40 py-2`}
          onClick={() => props.tabState(index)}
          style={{
            background:
              index === props.tabStatus
                ? "#5E32FF"
                : "linear-gradient(180deg, #2A1B3B 100%, #FFFFFF 100%)",
          }}
        >
          <div>
            <h2 className={`text-white text-[18px]  font-normal`}>
              {item.name}
            </h2>
          </div>
        </div>
      ))} */}

      {props.data?.map((item, index) => (
        <div
          key={index}
          className={`rounded-[3.886px] mt-4 text-center w-[108px] md:w-40 py-2 pt-3  ${
            index === 0 ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          onClick={index === 0 ? () => props.tabState(index) : undefined}
          style={{
            background: index === props.tabStatus ? "#5E32FF" : "#1D1138",
          }}
        >
          <div className="flex justify-center items-center">
            <div>
              {index === props.tabStatus ? null : (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_5839_11278)">
                    <path
                      d="M8.48958 12.2096C9.22292 12.2096 9.82292 11.6096 9.82292 10.8763C9.82292 10.143 9.22292 9.54297 8.48958 9.54297C7.75625 9.54297 7.15625 10.143 7.15625 10.8763C7.15625 11.6096 7.75625 12.2096 8.48958 12.2096ZM12.4896 6.20964H11.8229V4.8763C11.8229 3.0363 10.3296 1.54297 8.48958 1.54297C6.64958 1.54297 5.15625 3.0363 5.15625 4.8763V6.20964H4.48958C3.75625 6.20964 3.15625 6.80964 3.15625 7.54297V14.2096C3.15625 14.943 3.75625 15.543 4.48958 15.543H12.4896C13.2229 15.543 13.8229 14.943 13.8229 14.2096V7.54297C13.8229 6.80964 13.2229 6.20964 12.4896 6.20964ZM6.42292 4.8763C6.42292 3.7363 7.34958 2.80964 8.48958 2.80964C9.62958 2.80964 10.5563 3.7363 10.5563 4.8763V6.20964H6.42292V4.8763ZM12.4896 14.2096H4.48958V7.54297H12.4896V14.2096Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5839_11278">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.488281 0.875)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div className={`text-white text-[14px] medium`}>{item.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
