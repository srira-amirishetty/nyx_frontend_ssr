"use client"
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { BASEURL, EDIT_USERS, UPDATE_PREFERENCE } from "@nyx-frontend/main/utils/utils";
import {
  MODAL_CONFIG_LOGIN,
  MODAL_CONFIG_PROFILE_EDIT,
} from "@nyx-frontend/main/utils/modalstyles";
import { ButtonElement, ToggleBar } from "@nyx-frontend/main/shared/inputs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tabs, TabsMain } from "@nyx-frontend/main/shared/inputs";
import PreferenceModal from "@nyx-frontend/main/modalTwo/PreferenceModal";

function UserSettings(props) {
  const { type, userDetails, setUserDetails, setToastConfig } =
    useContext(UseContextData);
  const [isChecked, setIsChecked] = useState(false);
  const { post } = useRequests();
  const g_options = [
    { value: "POP", label: "Rock " },
    { value: "Funk", label: "Funk" },
    { value: "Soul music", label: "Soul music" },
  ];

  const a_options = [
    { value: "Yesudas", label: "Yesudas " },
    { value: "Shreya", label: "Shreya" },
    { value: "Arjith", label: "Arjith" },
  ];

  const l_options = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Kannada", label: "Kannada" },
    { value: "Bengali", label: "Bengali" },
    { value: "Telugu", label: "Telugu" },
    { value: "Tamil", label: "Tamil" },
    { value: "Malayalam", label: "Malayalam" },
  ];

  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showArtistModal, setShowArtistModal] = useState(false);
  const [genreTab, setGenreTab] = useState(0);
  const [artistTab, setArtistTab] = useState(0);
  const [enableSubmitBtn, setEnableSubmitBtn] = useState(false);

  const [prefGenre, setPrefGenre] = useState([
    "Classical",
    "Rock",
    "Contemporary",
    "Jazz",
    "Romantic",
    "Soulful",
  ]);
  const [prefArtist, setPrefArtist] = useState([
    "Arijit Singh",
    "Sonu Nigam",
    "Coldplay",
    "Mohit Chauhan",
    "KK",
    "Enrique",
  ]);

  const [prefGenreSelected, setPrefGenreSelected] = useState([]);
  const [prefArtistSelected, setPrefArtistSelected] = useState([]);
  const [selectedLangValue, setSelectedLangValue] = useState([]);

  useEffect(() => {
    setPrefGenreSelected(userDetails.genre);
    setPrefGenreSelected(userDetails?.genre);
    setPrefArtistSelected(userDetails?.favArtist);
    setSelectedLangValue(userDetails?.language);
  }, [userDetails]);

  const onChangeValue = (key, value) => {
    userDetails[key] = value;
    setEnableSubmitBtn(true);
  };

  const handleLangChange = (e) => {
    setSelectedLangValue(Array.isArray(e) ? e.map((x) => x.value) : []);
    setEnableSubmitBtn(true);
  };

  const UpdateProfile = async () => {
    for (let [key, value] of Object.entries(userDetails)) {
      if (value === "") {
        userDetails[key] = null;
      }
    }

    userDetails["language"] = selectedLangValue;
    userDetails["genre"] = prefGenreSelected;
    userDetails["favArtist"] = prefArtistSelected;

    let payload = {
      data: userDetails,
    };

    const info = await post(
      BASEURL + EDIT_USERS,
      payload,
      MODAL_CONFIG_PROFILE_EDIT
    );
    if (info.response === "Success") {
      // setToastConfig({
      //   message: "Update Profile Success",
      //   color: "bg-green-500",
      //   flag: true,
      // });
      toast.success("Profile updated successfully");
      setUserDetails({ ...userDetails });
    }
  };

  const PersonalInfo = () => {
    return (
      <div className="flex flex-col gap-4">
        {" "}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[50%]">
            <p className="text-white font-light">Name</p>
            <input
              // onChange={(event) => {
              //   userDetails.name = event.target.value;
              // }}
              onChange={(e) => onChangeValue("name", e.target.value)}
              defaultValue={userDetails.name}
              className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"
            ></input>
          </div>
          <div className="w-full md:w-[50%]">
            <p className="text-white font-light ">Phone</p>
            <input
              disabled
              onChange={(event) => {
                userDetails.phone = event.target.value;
              }}
              defaultValue={userDetails.phone}
              className="cursor-not-allowed bg-blue bg-opacity-50 w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"
            ></input>
          </div>
        </div>
        <div className="">
          <p className="text-white font-light">Bio</p>
          <input
            onChange={(e) => onChangeValue("bio", e.target.value)}
            defaultValue={userDetails.bio}
            className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"
          ></input>
        </div>
      </div>
    );
  };

  const Preferences = () => {
    return (
      <div>
        <div>
          <p className="text-white font-light py-3">Preferred Languages</p>
          <Select
            value={l_options.filter((obj) =>
              selectedLangValue?.includes(obj.value)
            )}
            onChange={handleLangChange}
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: "transparent",
                borderColor: "#8297BD",
              }),
              option: (styles, { isFocused, isSelected }) => ({
                ...styles,
                background: isFocused
                  ? "#C4AEDF"
                  : isSelected
                  ? "#FFF"
                  : undefined,
                color: "#000",
                zIndex: 1,
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#FFF",
              }),
            }}
            isMulti
            options={l_options}
          ></Select>
        </div>

        <div>
          <p className="text-white font-light py-3">Preferred Genres</p>
          <div className="relative">
            <input
              defaultValue={`${prefGenreSelected?.length} Selected`}
              className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"
            />
            <span className="cursor-pointer absolute right-0 pt-1.5 pr-4">
              <p
                onClick={() => setShowGenreModal(true)}
                className="bg-[#8297BD] px-5 py-0.5 rounded"
              >
                Add
              </p>
            </span>
          </div>

          <PreferenceModal
            setEnableSubmitBtn={setEnableSubmitBtn}
            data={prefGenre}
            setSelected={setPrefGenreSelected}
            selectedValues={prefGenreSelected}
            titles={UPDATE_PREFERENCE}
            showModal={showGenreModal}
            setModal={setShowGenreModal}
            setTab={setGenreTab}
            Tab={genreTab}
          />
        </div>

        <div>
          <p className="text-white font-light py-3">Favorite Artists</p>
          <div className="relative">
            <input
              defaultValue={`${prefArtistSelected?.length} Selected`}
              className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"
            />
            <span className="cursor-pointer absolute right-0 pt-1.5 pr-4">
              <p
                onClick={() => setShowArtistModal(true)}
                className="bg-[#8297BD] px-5 py-0.5 rounded"
              >
                Add
              </p>
            </span>
          </div>
          <PreferenceModal
            setEnableSubmitBtn={setEnableSubmitBtn}
            data={prefArtist}
            setSelected={setPrefArtistSelected}
            selectedValues={prefArtistSelected}
            titles={UPDATE_PREFERENCE}
            showModal={showArtistModal}
            setModal={setShowArtistModal}
            setTab={setArtistTab}
            Tab={artistTab}
          />
        </div>
      </div>
    );
  };

  const SocialMedia = () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="">
          <p className="text-white font-light">Facebook</p>
          <input
            onChange={(e) => onChangeValue("facebookLink", e.target.value)}
            defaultValue={userDetails.facebookLink}
            className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"
          ></input>
        </div>
        <div className="">
          <p className="text-white font-light">Instagram</p>
          <input
            onChange={(e) => onChangeValue("instagramLink", e.target.value)}
            defaultValue={userDetails.instagramLink}
            className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"
          ></input>
        </div>
        <div className="">
          <p className="text-white font-light">Youtube</p>
          <input
            onChange={(e) => onChangeValue("jioSaavnLink", e.target.value)}
            defaultValue={userDetails.jioSaavnLink}
            className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"
          ></input>
        </div>
      </div>
    );
  };

  const Password = () => {
    return (
      <div className="flex flex-col gap-12">
        {" "}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[50%]">
            <p className="text-white font-light">Current Password</p>
            <InputWithIcon></InputWithIcon>
          </div>
          <div className="w-full md:w-[50%]">
            <p className="text-white font-light">New Password</p>
            <InputWithIcon></InputWithIcon>
          </div>
        </div>
      </div>
    );
  };

  const Address = () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="">
          <p className="text-white font-light">House No/Area</p>
          <input className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"></input>
        </div>
        <div className="">
          {" "}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[50%]">
              <p className="text-white font-light">State</p>
              <input className="w-full bg-transparent pl-4 text-white  border border-[#8297BD] h-10 rounded"></input>
            </div>
            <div className="w-full md:w-[50%]">
              <p className="text-white font-light">Country</p>
              <input className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded"></input>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      {userDetails && (
        <div>
          {" "}
          <Accordion active={false} name="Personal Information">
            <PersonalInfo></PersonalInfo>
          </Accordion>
          <Accordion active={false} name="Preferences">
            <Preferences></Preferences>
          </Accordion>
          <Accordion active={false} name="Add social media accounts">
            <SocialMedia></SocialMedia>
          </Accordion>
          <Accordion active={false} name="Address">
            <Address></Address>
          </Accordion>
          {/* <Accordion active={false} name="Password">
          <Password></Password>
        </Accordion> */}
          <div className="flex items-center mt-10 m-auto w-[90%] justify-between">
            <p className="text-white font-bold">Make your profile private</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultValue="off"
                className="sr-only peer"
                onChange={(e) => handleChange(e)}
              />
            <ToggleBar handleChange={handleChange}></ToggleBar>
            </label>
          </div>
          <div className="flex justify-center md:justify-end mt-8 mr-0 md:mr-10">
            {enableSubmitBtn ? (
              <ButtonElement
                name="Apply Changes"
                onSubmit={UpdateProfile}
              ></ButtonElement>
            ) : (
              <button
                disabled
                className="disabled:opacity-70  bg-blue bg-opacity-50 text-white text-base cursor-not-allowed pointer-events-none border border-blue rounded-md px-5 py-2 text-center"
              >
                Apply Changes
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserSettings;

function Accordion(props) {
  const [active, setActive] = useState(props.active);
  return (
    <div className="m-auto w-[90%]">
      <div
        className="flex justify-between mt-10 cursor-pointer"
        onClick={() => {
          setActive(!active);
        }}
      >
        <p className="text-white font-bold">{props.name}</p>
        <div className="cursor-pointer">
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

function InputWithIcon() {
  const [isHidden, setIsHidden] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type={isHidden ? "password" : "text"}
        value={inputValue}
        onChange={handleInputChange}
        className="w-full bg-transparent pl-4 text-white border border-[#8297BD] h-10 rounded-md font-light"
        placeholder="Enter Password"
      />
      <button
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 hover:text-gray-700"
      >
        {isHidden ? (
          <svg
            width="26"
            height="19"
            viewBox="0 0 26 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0037 14.3763C14.382 14.3763 15.5523 13.8939 16.5148 12.9291C17.4773 11.9643 17.9586 10.7928 17.9586 9.41453C17.9586 8.03627 17.4762 6.86589 16.5114 5.90339C15.5466 4.94089 14.3751 4.45964 12.9968 4.45964C11.6186 4.45964 10.4482 4.94203 9.48568 5.90683C8.52318 6.8716 8.04193 8.04313 8.04193 9.42141C8.04193 10.7997 8.52432 11.9701 9.48912 12.9326C10.4539 13.8951 11.6254 14.3763 13.0037 14.3763ZM12.9934 12.6846C12.0841 12.6846 11.3135 12.3664 10.6815 11.7299C10.0496 11.0933 9.73359 10.3204 9.73359 9.41111C9.73359 8.5018 10.0519 7.73116 10.6884 7.09922C11.3249 6.46727 12.0978 6.1513 13.0071 6.1513C13.9164 6.1513 14.6871 6.46956 15.319 7.10607C15.951 7.74261 16.2669 8.51552 16.2669 9.42482C16.2669 10.3341 15.9487 11.1048 15.3122 11.7367C14.6756 12.3687 13.9027 12.6846 12.9934 12.6846ZM13.0003 18.168C10.3169 18.168 7.87179 17.4388 5.66484 15.9805C3.4579 14.5221 1.75306 12.5964 0.550323 10.2032C0.48917 10.1075 0.44401 9.98989 0.414844 9.85039C0.385677 9.7109 0.371094 9.56676 0.371094 9.41797C0.371094 9.26918 0.385677 9.12504 0.414844 8.98554C0.44401 8.84605 0.48917 8.72844 0.550323 8.63272C1.75306 6.23955 3.4579 4.3138 5.66484 2.85547C7.87179 1.39714 10.3169 0.667969 13.0003 0.667969C15.6836 0.667969 18.1287 1.39714 20.3357 2.85547C22.5426 4.3138 24.2475 6.23955 25.4502 8.63272C25.5114 8.72844 25.5565 8.84605 25.5857 8.98554C25.6148 9.12504 25.6294 9.26918 25.6294 9.41797C25.6294 9.56676 25.6148 9.7109 25.5857 9.85039C25.5565 9.98989 25.5114 10.1075 25.4502 10.2032C24.2475 12.5964 22.5426 14.5221 20.3357 15.9805C18.1287 17.4388 15.6836 18.168 13.0003 18.168ZM12.9953 16.418C15.3514 16.418 17.5162 15.7812 19.4898 14.5076C21.4635 13.2339 22.9655 11.5374 23.9961 9.41797C22.9655 7.29852 21.4651 5.602 19.4948 4.32839C17.5244 3.05477 15.3612 2.41797 13.0052 2.41797C10.6491 2.41797 8.48429 3.05477 6.51068 4.32839C4.53707 5.602 3.02526 7.29852 1.97526 9.41797C3.02526 11.5374 4.53542 13.2339 6.50575 14.5076C8.47609 15.7812 10.6393 16.418 12.9953 16.418Z"
              fill="#8297BD"
            />
          </svg>
        ) : (
          <svg
            width="26"
            height="19"
            viewBox="0 0 26 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0037 14.3763C14.382 14.3763 15.5523 13.8939 16.5148 12.9291C17.4773 11.9643 17.9586 10.7928 17.9586 9.41453C17.9586 8.03627 17.4762 6.86589 16.5114 5.90339C15.5466 4.94089 14.3751 4.45964 12.9968 4.45964C11.6186 4.45964 10.4482 4.94203 9.48568 5.90683C8.52318 6.8716 8.04193 8.04313 8.04193 9.42141C8.04193 10.7997 8.52432 11.9701 9.48912 12.9326C10.4539 13.8951 11.6254 14.3763 13.0037 14.3763ZM12.9934 12.6846C12.0841 12.6846 11.3135 12.3664 10.6815 11.7299C10.0496 11.0933 9.73359 10.3204 9.73359 9.41111C9.73359 8.5018 10.0519 7.73116 10.6884 7.09922C11.3249 6.46727 12.0978 6.1513 13.0071 6.1513C13.9164 6.1513 14.6871 6.46956 15.319 7.10607C15.951 7.74261 16.2669 8.51552 16.2669 9.42482C16.2669 10.3341 15.9487 11.1048 15.3122 11.7367C14.6756 12.3687 13.9027 12.6846 12.9934 12.6846ZM13.0003 18.168C10.3169 18.168 7.87179 17.4388 5.66484 15.9805C3.4579 14.5221 1.75306 12.5964 0.550323 10.2032C0.48917 10.1075 0.44401 9.98989 0.414844 9.85039C0.385677 9.7109 0.371094 9.56676 0.371094 9.41797C0.371094 9.26918 0.385677 9.12504 0.414844 8.98554C0.44401 8.84605 0.48917 8.72844 0.550323 8.63272C1.75306 6.23955 3.4579 4.3138 5.66484 2.85547C7.87179 1.39714 10.3169 0.667969 13.0003 0.667969C15.6836 0.667969 18.1287 1.39714 20.3357 2.85547C22.5426 4.3138 24.2475 6.23955 25.4502 8.63272C25.5114 8.72844 25.5565 8.84605 25.5857 8.98554C25.6148 9.12504 25.6294 9.26918 25.6294 9.41797C25.6294 9.56676 25.6148 9.7109 25.5857 9.85039C25.5565 9.98989 25.5114 10.1075 25.4502 10.2032C24.2475 12.5964 22.5426 14.5221 20.3357 15.9805C18.1287 17.4388 15.6836 18.168 13.0003 18.168ZM12.9953 16.418C15.3514 16.418 17.5162 15.7812 19.4898 14.5076C21.4635 13.2339 22.9655 11.5374 23.9961 9.41797C22.9655 7.29852 21.4651 5.602 19.4948 4.32839C17.5244 3.05477 15.3612 2.41797 13.0052 2.41797C10.6491 2.41797 8.48429 3.05477 6.51068 4.32839C4.53707 5.602 3.02526 7.29852 1.97526 9.41797C3.02526 11.5374 4.53542 13.2339 6.50575 14.5076C8.47609 15.7812 10.6393 16.418 12.9953 16.418Z"
              fill="#8297BD"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
