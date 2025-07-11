/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { MODAL_CONFIG_FOR_LOADER } from "@nyx-frontend/main/utils/modalstyles";
import {
  BASEURL,
  GET_SUPPORTS,
  QUERY_TYPES,
  SUPPORT_TABS,
} from "@nyx-frontend/main/utils/utils";
import Content from "@nyx-frontend/main/components/content";
import { TabsMain } from "@nyx-frontend/main/shared/inputs";
import Select, { components } from "react-select";
import Link from "next/link";

const colourStyles = {
  // @ts-ignore
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#8297BD" : "#8297BD",
    "&:hover": {
      color: "#8297BD",
    },
  }),
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    background: "transparent",
    borderRadius: 4,
    border: `1px solid ${state.isFocused ? "#8297BD" : "#8297BD"}`,
    "&:hover": {
      borderColor: "#8297BD",
    },
  }),
  // @ts-ignore
  singleValue: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#FFF",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#C4AEDF" : isSelected ? "#FFF" : undefined,
    color: "#000",
    zIndex: 1,
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 5,
  }),
};

const styles = {
  // @ts-ignore
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#8297BD" : "#8297BD",
    "&:hover": {
      color: "#8297BD",
    },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #fff",
    borderRadius: 0,
    boxShadow: "none",
    fontWeight: "normal",
    padding: 0,
    "&:hover": {
      borderBottom: `1px solid ${
        state.isFocused || state.isSelected ? "#fff" : "#fff"
      }`,
    },
    fontSize: "13px",
  }),
  // @ts-ignore
  singleValue: (provided) => ({
    ...provided,
    color: "#FFF",
  }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#FFF",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#C4AEDF" : isSelected ? "#FFF" : undefined,
    color: "#000",
    fontSize: "13px",
    zIndex: 1,
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};
// @ts-ignore
const CheckboxOption = (props) => (
  <components.Option {...props}>
    <input
      className="mr-2"
      type="checkbox"
      checked={props.isSelected}
      onChange={() => props.selectOption(props.data)}
    />
    {props.label}
  </components.Option>
);

function Support() {
  const { setcontentHeight } = useContext(UseContextData);
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");
  const [saveDraft, setSaveDraft] = useState(false);
  const [sendComment, setSendComment] = useState(false);
  const [visible, setVisible] = useState(3);

  const loadingMore = () => {
    setVisible((previous) => previous + 1);
  };
  const loadingLess = () => {
    setVisible(3);
  };
  useEffect(() => {
    setVisible(3);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { post, get, getWithParams } = useRequests();
  const [Tab, setTab] = useState(0);
  const [supportInput, setSupportInput] = useState("");
  const [options, setOptions] = useState([
    { value: "progress", label: "In Progress", isChecked: true },
    { value: "hold", label: "On Hold", isChecked: true },
    { value: "closed", label: "Closed", isChecked: true },
  ]);
  const [Query, setquery] = useState({ label: "", value: "" });
  useEffect(() => {
    setcontentHeight("h-[48rem] mb-[20rem]");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // @ts-ignore
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    // Here you can add your upload logic to send the file to your server
  };
  // @ts-ignore
  const handleChangeQuery = (event) => {
    setquery({ value: event.value, label: event.value });
  };
  // @ts-ignore
  const onSubmit = async (data) => {
    if (Query.label === "") {
      
      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Enter query type
          </span>
        </>,
        { autoClose: 5000 },
      );
    } else {
      data.attachment = null;
      data.category = Query.label;
      setTab(1);

      // reset();
    }
  };

  useEffect(() => {
    if (Tab === 1) {
      getSupport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Tab]);

  useEffect(() => {
    const checkedOptions = options
      .filter((item) => item.isChecked)
      .map((option) => option.value);
    if (checkedOptions.length < 3) {
      const params = new URLSearchParams();
      checkedOptions.map((option) => params.append("status", option));
      getFilteredSupport(params);
    } else {
      getSupport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);
  // @ts-ignore
  const getFilteredSupport = async (params) => {
    const data = await getWithParams(
      BASEURL + GET_SUPPORTS,
      MODAL_CONFIG_FOR_LOADER,
      params,
    );
    if (data.response === "Success") {
      if (!data.data.support_tickets.length)
        setText("You haven't raised any support queries on selected options.");
      // @ts-ignore
      setTickets([...data.data.support_tickets]);
    } else {
      setText("Error while getting data from server.");
    }
  };

  const [tickets, setTickets] = useState([]);
  const getSupport = async () => {
    const data = await get(BASEURL + GET_SUPPORTS, MODAL_CONFIG_FOR_LOADER);
    if (data.response === "Success") {
      if (!data.data.support_tickets.length)
        setText("You haven't raised any support queries yet.");
      // @ts-ignore
      setTickets([...data.data.support_tickets]);
    } else {
      setText("Error while getting data from server.");
    }
  };
  // @ts-ignore
  const getHeader = (ticket) => (
    <div className="flex items-center gap-2 md:gap-16 m-auto w-[90%]">
      <div className="">
        <p className="text-white font-light">{ticket.ticketId}</p>
      </div>
      <div className="">
        <p className="text-sm md:text-base text-white truncate ...">
          {ticket.subject}
        </p>
      </div>
      <div className="flex flex-col px-2 md:px-10">
        <div className="text-blue text-sm font-light truncate ...">
          {ticket.description}
        </div>
        <div className="flex">
          <div className="pt-2">
            <p className="text-green text-xs">{ticket.status}</p>
          </div>
          <div className="pt-2 ml-4">
            <p className="text-blue font-thin text-xs">
              {new Date(ticket.creationDt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  // @ts-ignore
  const sendSupportTicket = async (ticket) => {
    setSendComment(true);

    const payload = { comments: supportInput || ticket.draftComment };
    const data = await post(
      BASEURL + "/support/update-ticket/" + ticket.ticketId,
      payload,
    );
    if (data.response === "Success") {
      // setToastConfig({
      //   message: "Sent Support Ticket Message",
      //   color: "bg-green-500",
      //   flag: true,
      // });
      
      toast.success(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Request Successfull!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Ticket updated
          </span>
        </>,
        { autoClose: 5000 },
      );
      getSupport();
    } else {
     
      toast.error(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Bad Request!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Error while sending comment
          </span>
        </>,
        { autoClose: 5000 },
      );
    }
    setSendComment(false);
  };
  // @ts-ignore
  const sendSupportTicketDraft = async (ticket) => {
    setSaveDraft(true);
    const payload = { comments: supportInput };
    const data = await post(
      BASEURL + "/support/ticket-draft/" + ticket.ticketId,
      payload,
    );
    if (data.response === "Success") {
      // setToastConfig({
      //   message: "Saved Support Ticket to Draft",
      //   color: "bg-green-500",
      //   flag: true,
      // });
      
      toast.success(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Request Successfull!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Draft saved
          </span>
        </>,
        { autoClose: 5000 },
      );
      getSupport();
    } else {
     
      toast.success(
        <>
          <span className="text-white text-[16px] leading-[20px]">
            {" "}
            Request Successfull!
          </span>
          <br />
          <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
            {" "}
            Error saving draft
          </span>
        </>,
        { autoClose: 5000 },
      );
    }
    setSaveDraft(false);
  };
  // @ts-ignore
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "all") {
      const options_data = options.map((val) => {
        return { ...val, isChecked: checked };
      });
      setOptions(options_data);
    } else {
      const options_data = options.map((val) =>
        val.value === name ? { ...val, isChecked: checked } : val,
      );
      setOptions(options_data);
    }
  };
  // @ts-ignore

  return (
    <div>
      <>
        <div className="px-3 md:px-0 min-h-screen">
          <div className="mx-auto mt-40">
            {Tab === 1 && (
              <>
                <div className="hidden md:block absolute right-20 top-28">
                  {/* <h3 className='text-white'>Onboarding Form</h3> */}
                  <div className="flex gap-5">
                    <div className="flex items-center mr-4">
                      <input
                        type="checkbox"
                        onChange={(e) => handleChange(e)}
                        name="all"
                        checked={
                          !options.some((option) => option?.isChecked !== true)
                        }
                        className="w-4 h-4 accent-orange-300 bg-transparent border-gray-300 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm font-light text-white">
                        ALL
                      </label>
                    </div>

                    {options.map((option) => (
                      <>
                        <div className="flex items-center mr-4">
                          <input
                            type="checkbox"
                            name={option.value}
                            defaultChecked={true}
                            checked={option?.isChecked || false}
                            onChange={(e) => handleChange(e)}
                            className="w-4 h-4 accent-orange-300 bg-transparent border-gray-300 focus:ring-blue-500"
                          />
                          <label className="ml-2 text-sm font-light text-white">
                            {option.label}
                          </label>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="absolute md:hidden top-28 right-4">
                  <Select
                    className="font-light w-44 text-white bg-transparent"
                    components={{ Option: CheckboxOption }}
                    placeholder="Status"
                    options={options}
                    styles={styles}
                    onChange={(selectedOptions) => console.log(selectedOptions)}
                  />
                </div>
              </>
            )}
            <div className="">
              <Content height="h-[10rem]">
                <div className="flex justify-center mx-auto">
                  <TabsMain
                    data={SUPPORT_TABS}
                    tabState={setTab}
                    tabStatus={Tab}
                  />
                </div>
                {Tab === 0 && (
                  <>
                    <div>
                      <div className="text-sm flex flex-col justify-center gap-8 pt-10">
                        <div className=" m-auto w-[80%]">
                          <input
                            {...register("Phone", {
                              required: true,
                            })}
                            placeholder="Phone"
                            className={`border border-[#8297BD] rounded-md focus:outline-none m-auto pl-5 text-white w-full bg-transparent h-[2.5rem]`}
                          ></input>
                          {errors.phone && (
                            <p className="text-[12px] text-red-500 pt-1">
                              Add Phone
                            </p>
                          )}
                        </div>

                        <div className=" m-auto w-[80%]">
                          <label className="text-white font-light">
                            Query type
                          </label>
                          <Select
                            options={QUERY_TYPES}
                            onChange={handleChangeQuery}
                            value={Query}
                            className="mt-2"
                            styles={colourStyles}
                          ></Select>
                        </div>

                        <div className=" m-auto w-[80%]">
                          <input
                            {...register("subject", {
                              required: true,
                            })}
                            placeholder="Subject"
                            className={`border border-[#8297BD] rounded-md focus:outline-none m-auto pl-5 text-white w-full bg-transparent h-[2.5rem]`}
                          ></input>
                          {errors.subject && (
                            <p className="text-[12px] text-red-500 pt-1">
                              Add Subject
                            </p>
                          )}
                        </div>

                        <div className=" m-auto w-[80%]">
                          <textarea
                            {...register("description", {
                              required: true,
                            })}
                            placeholder="Description"
                            className={`border border-[#8297BD] h-32 bg-transparent rounded-md text-white text-sm  px-4 py-2 leading-tight focus:outline-none w-full`}
                          ></textarea>
                          {errors.description && (
                            <p className="text-[12px] text-red-500 pt-1">
                              Add Description
                            </p>
                          )}
                        </div>

                        <div className="flex items-center  m-auto w-[80%]   border border-[#8297BD] rounded-md  px-4 py-2">
                          <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                          />
                          <input
                            type="text"
                            className="w-full focus:outline-none bg-transparent text-white"
                            placeholder="Attach a file"
                            value={fileName}
                            readOnly
                          />
                          <label htmlFor="fileInput">
                            <svg
                              width="18"
                              height="26"
                              viewBox="0 0 18 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.71186 26C4.86102 26 3.27966 25.3229 1.9678 23.9688C0.655932 22.6146 0 20.9517 0 18.98V5.005C0 3.62862 0.463027 2.45036 1.38908 1.4702C2.31514 0.490067 3.42838 0 4.72881 0C6.05085 0 7.16949 0.4875 8.08475 1.4625C9 2.4375 9.45763 3.62917 9.45763 5.0375V15.8925H8.23729V5.005C8.23729 3.9676 7.89876 3.09075 7.22169 2.37445C6.54465 1.65815 5.71583 1.3 4.73525 1.3C3.75469 1.3 2.92373 1.65815 2.24237 2.37445C1.56102 3.09075 1.22034 3.9676 1.22034 5.005V19.045C1.22034 20.6267 1.75805 21.9646 2.83347 23.0587C3.9089 24.1529 5.20169 24.7 6.71186 24.7C7.48601 24.7 8.21344 24.5429 8.89417 24.2287C9.57489 23.9146 10.1695 23.4867 10.678 22.945V24.635C10.1085 25.0683 9.49322 25.4042 8.8322 25.6425C8.17119 25.8808 7.46441 26 6.71186 26ZM12.5085 24.375V20.475H8.84746V18.525H12.5085V14.625H14.339V18.525H18V20.475H14.339V24.375H12.5085ZM6.71186 19.5V20.8C5.93898 20.8 5.28814 20.4912 4.75932 19.8737C4.23051 19.2562 3.9661 18.525 3.9661 17.68V4.94H5.18644V17.7775C5.18644 18.2542 5.33263 18.6604 5.625 18.9963C5.91737 19.3321 6.27966 19.5 6.71186 19.5ZM12.2034 11.7975V4.94H13.4237V11.7975H12.2034Z"
                                fill="#8297BD"
                              />
                            </svg>
                          </label>
                        </div>

                        <div className="flex justify-center mt-9">
                          <div
                            onClick={handleSubmit(onSubmit)}
                            className={`block cursor-pointer text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2`}
                          >
                            Submit
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex mt-20 justify-center">
                      <div className="flex flex-col md:flex-row justify-center gap-3">
                        <p className="text-center font-light text-white">
                          Or please send your query to
                        </p>
                        <div className="flex gap-2 items-center text-center mx-auto">
                          <svg
                            width="30"
                            height="24"
                            viewBox="0 0 30 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.25 24C1.65 24 1.125 23.775 0.675 23.325C0.225 22.875 0 22.35 0 21.75V2.25C0 1.65 0.225 1.125 0.675 0.675C1.125 0.225 1.65 0 2.25 0H27.75C28.35 0 28.875 0.225 29.325 0.675C29.775 1.125 30 1.65 30 2.25V21.75C30 22.35 29.775 22.875 29.325 23.325C28.875 23.775 28.35 24 27.75 24H2.25ZM15 12.675L2.25 4.3125V21.75H27.75V4.3125L15 12.675ZM15 10.425L27.6 2.25H2.4375L15 10.425ZM2.25 4.3125V2.25V21.75V4.3125Z"
                              fill="white"
                            />
                          </svg>
                          <p className="text-blue underline">
                            <Link
                              href="mailto:support@nyx.com"
                              rel="noreferrer noopener"
                            >
                              support@nyx.com
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {Tab === 1 && (
                  <div>
                    {tickets?.length ? (
                      tickets.map((ticket, index) => (
                        <Accordion
                          header={getHeader(ticket)}
                          flag={false}
                          bg_color={"bg-new"}
                          key={"ticket" + index}
                        >
                          <div className="m-auto w-[90%] pb-10">
                            <input
                              placeholder="Write your message here"
                              // @ts-ignore
                              defaultValue={ticket.draftComment}
                              onChange={(e) => {
                                // @ts-ignore
                                const comment = ticket.draftComment;
                                setSupportInput(e.target.value ?? comment);
                              }}
                              value={supportInput}
                              className="pl-3 font-light text-sm outline-none border w-full bg-transparent text-white h-10 rounded"
                            ></input>
                            <div className="flex mt-4 justify-end">
                              <button
                                disabled={saveDraft}
                                type="button"
                                onClick={() => {
                                  sendSupportTicketDraft(ticket);
                                  setSupportInput("");
                                }}
                                className={`mt-8 w-32 block text-white 
                                    ${
                                      saveDraft
                                        ? "text-black bg-gray-300"
                                        : "cursor-pointer hover:text-black hover:bg-amber-300 border-amber-400 "
                                    }  border font-lg rounded-md px-5 py-2 md:py-2 text-center mr-2`}
                              >
                                {saveDraft ? "Saving" : "Save Draft"}
                              </button>

                              <button
                                disabled={sendComment}
                                type="button"
                                onClick={() => {
                                  sendSupportTicket(ticket);
                                  setSupportInput("");
                                }}
                                className={`mt-8 w-32 block text-white 
                                    ${
                                      sendComment
                                        ? "text-black bg-gray-300"
                                        : "cursor-pointer hover:text-black hover:bg-amber-300 border-amber-400 "
                                    }  border font-lg rounded-md px-5 py-2 md:py-2 text-center mr-2`}
                              >
                                {sendComment ? "Sending" : "Send"}
                              </button>
                            </div>

                            <div className="flex flex-col text-white py-4">
                              {// @ts-ignore
                              ticket?.updates
                                ?.slice(0, visible)
                                // @ts-ignore
                                .map((val, index) => (
                                  <div
                                    className="flex py-3 md:py-4 gap-6"
                                    key={val.name + index}
                                  >
                                    <div className="">
                                      <img
                                        src={val.profilePic}
                                        className="w-8 h-8 rounded"
                                        alt="profilePic"
                                      />
                                    </div>

                                    <div className="w-[93%]">
                                      <div className="flex space-around text-blue font-thin text-sm">
                                        <p>{val.name}</p>
                                        <p className="m-auto mr-0">
                                          {new Date(
                                            val.created_at,
                                          ).toLocaleDateString(undefined, {
                                            day: "numeric",
                                            month: "numeric",
                                            year: "numeric",
                                          })}
                                        </p>
                                      </div>

                                      <div className="text-sm font-light">
                                        <p>{val.comments}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              {visible > 7 ? (
                                <button onClick={loadingLess}>
                                  Show Less..
                                </button>
                              ) : (
                                <button onClick={loadingMore}>
                                  Show More..
                                </button>
                              )}
                            </div>
                          </div>
                        </Accordion>
                      ))
                    ) : (
                      <div className="flex mt-12 justify-center text-white font-light">
                        {text}
                      </div>
                    )}
                  </div>
                )}
              </Content>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
// @ts-ignore
function Accordion(props) {
  const [active, setActive] = useState(props.active);
  return (
    <div className={`m-auto bg-new w-[95%]`}>
      <div
        className="flex items-center mt-10 cursor-pointer"
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className="flex items-center w-[95%] h-16">{props.header}</div>

        <div className="cursor-pointer w-auto mr-2 md:mr-0 md:w-[5%] relative ">
          {active === true ? (
            <svg
              width="22"
              height="13"
              viewBox="0 0 22 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.3225 2.68667L11.9891 12.1236C11.878 12.2356 11.7577 12.3148 11.628 12.3611C11.4984 12.4081 11.3595 12.4316 11.2114 12.4316C11.0632 12.4316 10.9243 12.4081 10.7947 12.3611C10.6651 12.3148 10.5447 12.2356 10.4336 12.1236L1.07248 2.68667C0.813223 2.42531 0.683593 2.09861 0.683593 1.70657C0.683593 1.31453 0.822482 0.978499 1.10026 0.698471C1.37804 0.418444 1.70211 0.278429 2.07248 0.278429C2.44285 0.278429 2.76693 0.418444 3.0447 0.698471L11.2114 8.93129L19.378 0.69847C19.6373 0.437111 19.9566 0.306431 20.3358 0.306431C20.7158 0.306431 21.0447 0.446444 21.3225 0.726473C21.6003 1.0065 21.7392 1.3332 21.7392 1.70657C21.7392 2.07994 21.6003 2.40664 21.3225 2.68667Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="14"
              height="22"
              viewBox="0 0 14 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.36831 1.36111L12.8052 10.6944C12.9173 10.8056 12.9964 10.9259 13.0427 11.0556C13.0898 11.1852 13.1133 11.3241 13.1133 11.4722C13.1133 11.6204 13.0898 11.7593 13.0427 11.8889C12.9964 12.0185 12.9173 12.1389 12.8052 12.25L3.36831 21.6111C3.10695 21.8704 2.78025 22 2.38821 22C1.99617 22 1.66014 21.8611 1.38011 21.5833C1.10008 21.3056 0.96007 20.9815 0.96007 20.6111C0.960069 20.2407 1.10008 19.9167 1.38011 19.6389L9.61293 11.4722L1.38011 3.30555C1.11875 3.0463 0.988071 2.72704 0.988071 2.34778C0.988071 1.96778 1.12808 1.63889 1.40811 1.36111C1.68814 1.08333 2.01484 0.944444 2.38821 0.944444C2.76158 0.944444 3.08828 1.08333 3.36831 1.36111Z"
                fill="white"
              />
            </svg>
          )}
        </div>
      </div>
      {active && <div className="mt-3">{props.children}</div>}
    </div>
  );
}

export default Support;
