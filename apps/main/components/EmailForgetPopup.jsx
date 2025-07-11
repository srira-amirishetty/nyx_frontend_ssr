import React from "react";
import Modal from "react-modal";
import { login_popup_Style } from "@nyx-frontend/main/utils/modalstyles";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import EmailSVGIcon from "@nyx-frontend/main/components/Icons/EmailSVGIcon";
import EmailSVGIconColor from "@nyx-frontend/main/components/Icons/EmailSVGIconColor";
import GoogleSVGIcon from "@nyx-frontend/main/components/Icons/GoogleSVGIcon";
import GoogleSVGIconColor from "@nyx-frontend/main/components/Icons/GoogleSVGIconColor";
import AppleSVGIcon from "@nyx-frontend/main/components/Icons/AppleSVGIcon";
import AppleSVGIconColor from "@nyx-frontend/main/components/Icons/AppleSVGIconColor";
import PhoneIcon from "@nyx-frontend/main/components/Icons/PhoneIcon";
import LeftArrow from "@nyx-frontend/main/components/Icons/LeftArrow";
import { loginPopUpCountryStyles } from "../utils/productStyle";

const EmailForgetPopup = ({
  emailForgetPopUp,
  closePopUp,
  wrongpasswordFrogetEmail,
  emailFrogetEmail,
  EmailIdsubmitForgetEmail,
  wrongnumberFrogetEmail,
  GetOTPEmail,
  SigninWithPhoneButtonForgot,
  previousFrogetEmail,
  closeFrogetEmail,
}) => {
  return (
    <>
      {emailForgetPopUp ? (
        <Modal
          isOpen={emailForgetPopUp}
          style={login_popup_Style}
          onRequestClose={closePopUp}
        >
          <div className="bg-[#281b37] shadow-md rounded-[30px] p-8 px-[20px] w-[350px] h-[500px] sm:w-[350px] sm:h-[500px]">
            <div
              onClick={previousFrogetEmail}
              className="svg-icon ml-[16px] mt-[-3px] cursor-pointer absolute p-1"
              dangerouslySetInnerHTML={{ __html: icon }}
            ></div>
            <div
              onClick={closeFrogetEmail}
              className="cursor-pointer absolute right-8 top-6"
              dangerouslySetInnerHTML={{ __html: close }}
            ></div>
            <h3 className=" text-center text-[20px] font-semibold font-montserrat mt-[-8px] mb-6">
              Reset Password
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-white text-[14px]  mb-1">
                  Email Id
                </label>

                <input
                  type="email"
                  className={
                    wrongpasswordFrogetEmail
                      ? `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-[4px] w-full placeholder-blue border-[#ff5a68] autofill`
                      : `border py-3 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-[4px] w-full placeholder-blue border-[#8297BD] autofill`
                  }
                  placeholder="example@email.com"
                  value={emailFrogetEmail}
                  onChange={EmailIdsubmitForgetEmail}
                />
                {wrongpasswordFrogetEmail ? (
                  <p className="text-[#ff4545] text-[10px] font-normal absolute p-1">
                    Please enter velid email{" "}
                  </p>
                ) : (
                  <></>
                )}
                {wrongnumberFrogetEmail ? (
                  <p className="text-[#ff4545] text-[10px] font-normal absolute  p-1">
                    We couldn&apos;t find an account with this email address
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-6 mt-7 text-center">
                <button
                  type="submit"
                  className="cursor-pointer  bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white"
                  onClick={GetOTPEmail}
                >
                  Get OTP
                </button>
              </div>

              <div className="text-center text-white mt-6">
                <div className=" flex items-center justify-center p-4">
                  <div className="w-full h-[1px] bg-white"></div>

                  <div className="text-white  text-[14px] mx-2">OR</div>

                  <div className="w-full h-[1px] bg-white"></div>
                </div>

                <div className="mt-5 flex justify-center gap-x-5 items-center">
                  <div
                    onClick={SigninWithPhoneButtonForgot}
                    className="bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center"
                  >
                    <span>
                      {" "}
                      <PhoneIcon className="w-6 text-[#311B3D] group-hover:[&>path]:fill-[url(#phoneIconColor)]" />
                    </span>
                  </div>
                  <div className="bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center">
                    <span>
                      {" "}
                      <GoogleSVGIcon className="group-hover:hidden" />
                      <GoogleSVGIconColor className="hidden group-hover:block" />
                    </span>
                  </div>
                  {/* <div className="bg-[#C1B1CE] group border-[2px] transition ease-in duration-200  border-[#8D7E9E] rounded-[12px] hover:border-white hover:bg-white w-[45px] h-[45px] cursor-pointer flex justify-center items-center">
                  <span>
                    {" "}
                    <AppleSVGIcon className="group-hover:hidden" />
                    <AppleSVGIconColor className="hidden group-hover:block" />
                  </span>
                </div> */}
                </div>
              </div>
            </form>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default EmailForgetPopup;

const icon = `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.51423 7.48047H18.2051C18.4265 7.48047 18.6387 7.58793 18.7953 7.77922C18.9518 7.97051 19.0397 8.22995 19.0397 8.50047C19.0397 8.77099 18.9518 9.03043 18.7953 9.22172C18.6387 9.41301 18.4265 9.52047 18.2051 9.52047H1.51423C1.2929 9.52047 1.08063 9.41301 0.92412 9.22172C0.767613 9.03043 0.679688 8.77099 0.679688 8.50047C0.679688 8.22995 0.767613 7.97051 0.92412 7.77922C1.08063 7.58793 1.2929 7.48047 1.51423 7.48047Z" fill="white"/>
  <path d="M1.94088 8.5L8.60439 15.5473C8.75525 15.7069 8.84 15.9233 8.84 16.149C8.84 16.3747 8.75525 16.5912 8.60439 16.7508C8.45353 16.9103 8.24892 17 8.03557 17C7.82222 17 7.61761 16.9103 7.46675 16.7508L0.236033 9.10172C0.161214 9.02278 0.101853 8.92899 0.0613508 8.82574C0.0208484 8.72248 0 8.61179 0 8.5C0 8.38821 0.0208484 8.27752 0.0613508 8.17426C0.101853 8.07101 0.161214 7.97722 0.236033 7.89828L7.46675 0.249242C7.61761 0.0896549 7.82222 0 8.03557 0C8.24892 0 8.45353 0.0896549 8.60439 0.249242C8.75525 0.408829 8.84 0.625276 8.84 0.850966C8.84 1.07666 8.75525 1.2931 8.60439 1.45269L1.94088 8.5Z" fill="white"/>
  </svg>
  `;

const close = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.35 13.0009C0.583333 13.219 0.855555 13.3281 1.16667 13.3281C1.47778 13.3281 1.75 13.219 1.98333 13.0009L7 8.31109L12.0556 13.0373C12.263 13.2312 12.5287 13.3221 12.8528 13.3099C13.1769 13.2978 13.4426 13.1948 13.65 13.0009C13.8833 12.7828 14 12.5283 14 12.2375C14 11.9466 13.8833 11.6921 13.65 11.474L8.63333 6.78417L13.6889 2.058C13.8963 1.8641 13.9935 1.61567 13.9806 1.31271C13.9676 1.00975 13.8574 0.761326 13.65 0.567431C13.4167 0.3493 13.1444 0.240234 12.8333 0.240234C12.5222 0.240234 12.25 0.3493 12.0167 0.567431L7 5.25726L1.94444 0.531076C1.73704 0.337181 1.4713 0.246293 1.14722 0.258411C0.823148 0.27053 0.557407 0.373537 0.35 0.567431C0.116667 0.785563 0 1.04005 0 1.33089C0 1.62173 0.116667 1.87622 0.35 2.09435L5.36667 6.78417L0.311111 11.5104C0.103703 11.7042 0.00648092 11.9527 0.0194439 12.2556C0.0324068 12.5586 0.142593 12.807 0.35 13.0009Z" fill="white"/>
</svg>
`;
