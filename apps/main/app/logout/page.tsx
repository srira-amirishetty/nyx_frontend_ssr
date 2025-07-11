"use client";
import { useEffect } from "react";
import cookie from "cookiejs";

export default function Logout() {
  const removeCookie=(name:any)=> {
    cookie.set(name, "", {
      expires: -1, // Set expiration to a past date
      path: "/", 
      secure: true, 
    });
  }
  const logoutinsidebar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("workspace_id");
    localStorage.removeItem("WorkspaceArray");
    localStorage.removeItem("WorkspaceArrayslug");
    localStorage.removeItem("route");
    localStorage.removeItem("verificationID");
    localStorage.removeItem("emailidlogin");
    localStorage.removeItem("workspace_id");
    localStorage.removeItem("workspace_name");
    localStorage.removeItem("phonenumberlogin");
    localStorage.removeItem("phonecountrycodelogin");
    localStorage.removeItem("emailid");
    localStorage.removeItem("phonenumber");
    localStorage.removeItem("phonenumbersignup");
    localStorage.removeItem("countrycodesignup");
    localStorage.removeItem("emailnumbersignup");
    localStorage.removeItem("id");
    sessionStorage.removeItem("logintype");
    removeCookie("ExpireLoginToken");
    window.location.href = process.env.NEXT_PUBLIC_BASE_URL as string;
  }

  useEffect(() => {
    logoutinsidebar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-[100vh] pt-16 px-4 text-white flex justify-center items-center text-[20px] font-semibold">
      Logout.....
    </div>
  )
}