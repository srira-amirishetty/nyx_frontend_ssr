"use client"
import { useContext, useEffect } from "react";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import UserSettings from "@nyx-frontend/main/user/update_user_profile";
import UpdateProfileArtist from "@nyx-frontend/main/artist/artistSetting";
function Settings() {
  const { type } = useContext(UseContextData);

  useEffect(() => {}, [type]);
  return (
    <div className="">
      {type === "artist" ? <UpdateProfileArtist /> : <UserSettings />}
    </div>
  );
}

export default Settings;
