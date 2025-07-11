/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import "../custom.css";

const GoogleDisplay = ({
  headlines,
  descriptions,
  captions,
  googleDisplayChecked,
  setGoogleDisplayChecked,
  campaingSiteUrl,
  driveClickedArray,
  driveVideoClickedArray,
  campainObjective,
  brandName,
  previewUrl,
  mixedArray,
  brandLogos,
}) => {
  const handleCheckboxChange = (event) => {
    setGoogleDisplayChecked(event.target.checked);
  };

  return (
    <>
      {/* Horizontal */}
      <div className="bg-white w-[364px] h-auto mt-5 mx-auto relative  ">
        <div className="flex items-center gap-[3px] px-[7px] bg-[#ECECEC] h-[46px]">
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.522 10.37h5.78c.064.378.096.739.096 1.083 0 1.225-.241 2.318-.725 3.28a5.424 5.424 0 0 1-2.07 2.255c-.895.542-1.922.813-3.081.813a5.72 5.72 0 0 1-2.384-.512 6.112 6.112 0 0 1-1.954-1.384 6.54 6.54 0 0 1-1.303-2.074 6.73 6.73 0 0 1-.483-2.53c0-.886.161-1.73.483-2.53a6.54 6.54 0 0 1 1.303-2.074 6.113 6.113 0 0 1 1.954-1.384 5.72 5.72 0 0 1 2.384-.512c1.595 0 2.963.567 4.106 1.7l-1.666 1.702c-.654-.671-1.467-1.007-2.44-1.007-.686 0-1.32.183-1.902.55A3.95 3.95 0 0 0 9.237 9.24a4.264 4.264 0 0 0-.51 2.06c0 .746.17 1.432.51 2.062a3.95 3.95 0 0 0 1.383 1.493 3.5 3.5 0 0 0 1.902.55 3.85 3.85 0 0 0 1.276-.202 3.15 3.15 0 0 0 .957-.508 3.58 3.58 0 0 0 .653-.694 3.26 3.26 0 0 0 .411-.737c.088-.231.147-.451.18-.66h-3.477V10.37Z"
              fill="#000"
            />
          </svg>
          <div>
            <p className="text-[#969696] font-semibold text-[8px] leading-[10.26px]">
              Google
            </p>
            <p className="text-[#000000] font-bold text-[8px] leading-[10.26px]">
              Image ads
            </p>
          </div>
        </div>
        <div className="flex gap-[14px]">
          <div className="absolute top-3.5 right-3 flex gap-3">
            <p className="text-[12px]">Select all</p>

            <div className="">
              <input
                type="checkbox"
                id="googleDisplayChecked"
                checked={googleDisplayChecked}
                onChange={handleCheckboxChange}
                className="custom-checkbox"
              />
              <label for="googleDisplayChecked"></label>
            </div>
          </div>
          <div className="w-[115px] h-[122px]">
            {previewUrl?.type == "images" ? (
              <img
                src={previewUrl.url}
                alt="previewImage"
                className="w-full h-full object-cover"
              />
            ) : mixedArray &&
              mixedArray.length > 0 &&
              driveClickedArray &&
              driveClickedArray.length > 0 ? (
              <img
                src={driveClickedArray[0]?.signed_image_url}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div className="w-[60%]  h-auto">
            <h2 className="text-[#5B5B63] text-[14px] leading-[17px] mb-1 pt-[6px] pr-2">
              {headlines[0]}
            </h2>
            <p className="text-[#4D5156] text-[12px] leading-[14px] mb-1 ">
              {captions[0]}
            </p>
            <div className="flex items-center gap-2">
              <div>
                <svg
                  width="14"
                  height="10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="#3BD074" d="M.5.5h13v9H.5z" />
                  <path stroke="#4DCA7F" d="M.5.5h13v9H.5z" />
                  <path
                    d="M5.074 3.612 3.662 7.5h-.577l1.626-4.266h.372l-.009.378ZM6.258 7.5 4.843 3.612l-.009-.378h.372L6.838 7.5h-.58Zm-.073-1.58v.464H3.788V5.92h2.397Zm3.14.965V3h.545v4.5h-.498l-.047-.615ZM7.192 5.95v-.06c0-.243.03-.462.088-.66.06-.199.146-.37.255-.512a1.125 1.125 0 0 1 .911-.445c.2 0 .373.035.522.105.15.068.277.169.38.302.106.13.19.289.25.474.06.186.102.396.126.63v.27a2.76 2.76 0 0 1-.126.627 1.48 1.48 0 0 1-.25.474c-.103.131-.23.232-.38.302-.15.068-.326.103-.528.103a1.09 1.09 0 0 1-.51-.12 1.203 1.203 0 0 1-.395-.337 1.642 1.642 0 0 1-.255-.51 2.245 2.245 0 0 1-.088-.642Zm.545-.061v.061c0 .158.016.307.047.446.033.138.084.26.153.366a.756.756 0 0 0 .26.249.767.767 0 0 0 .378.088c.18 0 .327-.038.443-.115a.852.852 0 0 0 .28-.301 1.71 1.71 0 0 0 .165-.408V5.57a1.565 1.565 0 0 0-.103-.31.956.956 0 0 0-.17-.27.735.735 0 0 0-.254-.19.826.826 0 0 0-.355-.07.75.75 0 0 0-.384.093.748.748 0 0 0-.26.252c-.069.106-.12.229-.153.37a2.022 2.022 0 0 0-.047.445Z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <p className="text-[6px] text-[#807D84] leading-[7.31px] font-semibold">
                {campaingSiteUrl}
              </p>
            </div>
            <div className="mt-[13px] mb-[2px]">
              <svg
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" rx="6" fill="#0067FF" />
                <path
                  d="m8.347 15 5-5-5-5-1.175 1.175L10.989 10l-3.817 3.825L8.347 15Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[364px] justify-center mx-auto">
        {/* Portrait */}

        <div className="bg-white w-[239px] h-auto mt-5 mx-auto relative  ">
          <div className="w-[239px] h-[118px]">
            {previewUrl?.type == "images" ? (
              <img
                src={previewUrl.url}
                alt="previewImage"
                className="w-full h-full object-cover"
              />
            ) : mixedArray &&
              mixedArray.length > 0 &&
              driveClickedArray &&
              driveClickedArray.length > 0 ? (
              <img
                src={driveClickedArray[0]?.signed_image_url}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div className="w-full h-auto p-[5px]">
            <h2 className="text-[#5B5B63] text-[14px] leading-[17px] mb-2 pt-[9px]">
              {headlines[0]}
            </h2>
            <p className="text-[#4D5156] text-[12px] leading-[14px] mb-[9px] ">
              {captions[0]}
            </p>
            <div className="flex items-center  justify-between pb-[10px]">
              <div className="flex items-center  gap-2">
                <div>
                  <svg
                    width="14"
                    height="10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="#3BD074" d="M.5.5h13v9H.5z" />
                    <path stroke="#4DCA7F" d="M.5.5h13v9H.5z" />
                    <path
                      d="M5.074 3.612 3.662 7.5h-.577l1.626-4.266h.372l-.009.378ZM6.258 7.5 4.843 3.612l-.009-.378h.372L6.838 7.5h-.58Zm-.073-1.58v.464H3.788V5.92h2.397Zm3.14.965V3h.545v4.5h-.498l-.047-.615ZM7.192 5.95v-.06c0-.243.03-.462.088-.66.06-.199.146-.37.255-.512a1.125 1.125 0 0 1 .911-.445c.2 0 .373.035.522.105.15.068.277.169.38.302.106.13.19.289.25.474.06.186.102.396.126.63v.27a2.76 2.76 0 0 1-.126.627 1.48 1.48 0 0 1-.25.474c-.103.131-.23.232-.38.302-.15.068-.326.103-.528.103a1.09 1.09 0 0 1-.51-.12 1.203 1.203 0 0 1-.395-.337 1.642 1.642 0 0 1-.255-.51 2.245 2.245 0 0 1-.088-.642Zm.545-.061v.061c0 .158.016.307.047.446.033.138.084.26.153.366a.756.756 0 0 0 .26.249.767.767 0 0 0 .378.088c.18 0 .327-.038.443-.115a.852.852 0 0 0 .28-.301 1.71 1.71 0 0 0 .165-.408V5.57a1.565 1.565 0 0 0-.103-.31.956.956 0 0 0-.17-.27.735.735 0 0 0-.254-.19.826.826 0 0 0-.355-.07.75.75 0 0 0-.384.093.748.748 0 0 0-.26.252c-.069.106-.12.229-.153.37a2.022 2.022 0 0 0-.047.445Z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <p className="text-[6px] text-[#807D84] leading-[7.31px] font-semibold">
                  {campaingSiteUrl}
                </p>
              </div>
              <div className="">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" rx="6" fill="#0067FF" />
                  <path
                    d="m8.347 15 5-5-5-5-1.175 1.175L10.989 10l-3.817 3.825L8.347 15Z"
                    fill="#fff"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical */}

        <div className="bg-white w-[102px] h-auto mt-5 mx-auto relative  ">
          <div className="w-[102px] h-[171px]">
            {previewUrl?.type == "images" ? (
              <img
                src={previewUrl.url}
                alt="previewImage"
                className="w-full h-full object-cover"
              />
            ) : mixedArray &&
              mixedArray.length > 0 &&
              driveClickedArray &&
              driveClickedArray.length > 0 ? (
              <img
                src={driveClickedArray[0]?.signed_image_url}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
          <div className="w-full h-auto p-[5px]">
            <h2 className="text-[#5B5B63] text-[14px] leading-[17px] mb-2 pt-[9px]">
              {headlines[0]}
            </h2>
            <p className="text-[#4D5156] text-[12px] leading-[14px] mb-[9px] ">
              {captions[0]}
            </p>
            <div className="flex justify-center mb-[10px]">
              <svg
                width="20"
                height="20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="20" height="20" rx="6" fill="#0067FF" />
                <path
                  d="m8.347 15 5-5-5-5-1.175 1.175L10.989 10l-3.817 3.825L8.347 15Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div className="flex items-center  justify-between pb-[10px]">
              <div className="flex items-center  gap-2">
                <div>
                  <svg
                    width="14"
                    height="10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="#3BD074" d="M.5.5h13v9H.5z" />
                    <path stroke="#4DCA7F" d="M.5.5h13v9H.5z" />
                    <path
                      d="M5.074 3.612 3.662 7.5h-.577l1.626-4.266h.372l-.009.378ZM6.258 7.5 4.843 3.612l-.009-.378h.372L6.838 7.5h-.58Zm-.073-1.58v.464H3.788V5.92h2.397Zm3.14.965V3h.545v4.5h-.498l-.047-.615ZM7.192 5.95v-.06c0-.243.03-.462.088-.66.06-.199.146-.37.255-.512a1.125 1.125 0 0 1 .911-.445c.2 0 .373.035.522.105.15.068.277.169.38.302.106.13.19.289.25.474.06.186.102.396.126.63v.27a2.76 2.76 0 0 1-.126.627 1.48 1.48 0 0 1-.25.474c-.103.131-.23.232-.38.302-.15.068-.326.103-.528.103a1.09 1.09 0 0 1-.51-.12 1.203 1.203 0 0 1-.395-.337 1.642 1.642 0 0 1-.255-.51 2.245 2.245 0 0 1-.088-.642Zm.545-.061v.061c0 .158.016.307.047.446.033.138.084.26.153.366a.756.756 0 0 0 .26.249.767.767 0 0 0 .378.088c.18 0 .327-.038.443-.115a.852.852 0 0 0 .28-.301 1.71 1.71 0 0 0 .165-.408V5.57a1.565 1.565 0 0 0-.103-.31.956.956 0 0 0-.17-.27.735.735 0 0 0-.254-.19.826.826 0 0 0-.355-.07.75.75 0 0 0-.384.093.748.748 0 0 0-.26.252c-.069.106-.12.229-.153.37a2.022 2.022 0 0 0-.047.445Z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <p className="text-[6px] text-[#807D84] leading-[7.31px] font-semibold">
                  {campaingSiteUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleDisplay;
