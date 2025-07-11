"use client";
import { useContext, useEffect } from "react";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { BASEURL, SET_USER_TYPE, verifyJWTToken } from "@nyx-frontend/main/utils/utils";
import Content from "@nyx-frontend/main/components/content";
import { CENTER_TEXT } from "@nyx-frontend/main/components/Utils/Utils";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";

function Notifications() {
  const { setcontentHeight, setNotifications, notifications } =
    useContext(UseContextData);
  const { get } = useRequests();

  useEffect(() => {
    setcontentHeight("h-[30rem]");
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotifications = async () => {
    const result = verifyJWTToken(localStorage.getItem("token"));
    if (result.data) {
      const types = SET_USER_TYPE(result.data.type);
      const data = await get(BASEURL + types + "/get-notification");
      if (data.response == "Success") {
        setNotifications([...data.data.notifications]);
      }
    }
  };

  return (
    <div>
      <>
        <div className="px-3 md:px-0 min-h-screen">
          <div className="absolute top-28 left:10 md:left-20 text-white text-[17px] font-600">
            Notifications
          </div>
          <Content top="top-[10rem]">
            {CENTER_TEXT("Notifications", "mt-4")}
            <div className="flex flex-col m-auto w-auto md:w-[70%] mt-5 px-5 md:px-0 md:mt-14">
              {notifications?.length > 0 && (
                <NotificationBox data={notifications} />
              )}
            </div>
          </Content>
        </div>
      </>
    </div>
  );
}

const NotificationBox = (props: { data: Array<any> }) => {
  return (
    <>
      {props.data.map(
        (data: { message: string; createdDate: string }, index: number) => (
          <div className="pt-5" key={index}>
            {" "}
            <div className="border rounded-md border-white">
              <p className="text-white p-3 text-sm">{data.message}</p>
            </div>
            <p className="flex justify-end text-white text-sm font-thin py-2">
              {data.createdDate}
            </p>
          </div>
        ),
      )}
    </>
  );
};

export default Notifications;
