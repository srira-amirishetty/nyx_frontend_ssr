"use client";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { BASEURL, GET_LAUNCH_REQUESTS } from "@nyx-frontend/main/utils/utils";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import { MODAL_CONFIG_FOR_LOADER } from "@nyx-frontend/main/utils/modalstyles";
function TokenRequest() {
  const { tokenRequestCache, setTokenRequestsCache } =
    useContext(UseContextData);
  const { get } = useRequests();
  const navigate = useRouter();
  const [text, setText] = useState("");
  const [launchRequests, setLaunchRequests] = useState([]);
  useEffect(() => {
    getTokenRequests();
  }, []);

  const getTokenRequests = async () => {
    if (tokenRequestCache && tokenRequestCache.length === 0) {
      const data = await get(
        BASEURL + GET_LAUNCH_REQUESTS,
        MODAL_CONFIG_FOR_LOADER,
      );
      if (data.response === "Success") {
        setText(
          "You haven't raised any share request yet. Start by uploading your creations.",
        );
        setTokenRequestsCache([...data.data.launch_requests]);
      } else {
        setText("Looks like some error occured.");
      }
    } else {
      setText("");
      setTokenRequestsCache([...tokenRequestCache]);
    }
  };

  const onSubmit = () => {
    navigate.push("/upload");
  };

  return (
    <div className="mt-10">
      {!tokenRequestCache?.length ? (
        <div className="flex mt-12 m-auto w-[96%] justify-center text-white font-light">
          {text}
        </div>
      ) : (
        tokenRequestCache?.map((launch_request) => (
          <Accordion flag={false} header={getHeader(launch_request)}>
            <div className="m-auto w-[90%] pb-10">
              <input
                placeholder="Write your message here"
                className="pl-3 font-light text-sm outline-none border rounded-md w-full bg-transparent text-white h-10"
              ></input>
              <div className="flex mt-4 justify-end">
                <div className="">
                  <button className="font-light block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2">
                    {" "}
                    Send{" "}
                  </button>
                </div>
                <div className="">
                  <button className="font-light block text-white hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2">
                    {" "}
                    Save Draft{" "}
                  </button>
                </div>
              </div>
            </div>
          </Accordion>
        ))
      )}
      <div className="mt-10 flex justify-center font-light text-sm">
        <ButtonElement
          width="w-[98%] m-auto md:w-[10rem]"
          onSubmit={onSubmit}
          name={!tokenRequestCache?.length ? "Add Shares" : "Add More Shares"}
        ></ButtonElement>
      </div>
    </div>
  );
}

const getHeader = (data) => (
  <div className="flex gap-10 m-auto w-[90%] items-center">
    <div className="hidden md:block w-[10%]">
      <p className="text-white font-light">{1}</p>
    </div>
    <div className="hidden md:block w-[30%]">
      <p className="text-white text-sm">{data.title}</p>
      <p className="text-green text-xs">{data.status}</p>
    </div>
    <div className="hidden md:block w-[40%]">
      <p className="text-blue text-sm font-light">{data.category}</p>
      <span className="text-blue text-xs font-light">
        Created{" - "}
        {new Date(data.created_at).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
      <span className="pl-8 text-blue text-xs font-light">
        Exp Launch{" - "}
        {new Date(data.expLaunchDt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    </div>

    <div className="block md:hidden">
      <p className="text-white font-light">{1}</p>
    </div>

    <div className="block md:hidden">
      <p className="text-white">{data.title}</p>
      <div className="flex gap-2">
        <p className="text-blue text-md">{data.category}</p>
        <p className="text-blue text-md">
          {format(new Date(data.expLaunchDt), "dd/MM/yyyy")}
        </p>
      </div>
      <p className="text-blue">{data.description}</p>
    </div>
  </div>
);

function Accordion(props) {
  const [active, setActive] = useState(props.active);
  return (
    <div
      className={`m-auto mb-8 bg-new border border-transparent rounded-md w-[90%]`}
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className="w-[95%] p-5">{props.header}</div>

        <div className="cursor-pointer mr-3 w-[5%] relative">
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

export default TokenRequest;
