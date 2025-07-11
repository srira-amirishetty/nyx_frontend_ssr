/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import { registerPopUpCountryStyles } from "./constants";
import { ProfileTabs } from "@nyx-frontend/main/shared/inputs";
import { useQuery } from "@tanstack/react-query";
import { Profile_TABS } from "@nyx-frontend/main/utils/utils";
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import { TAIL_TITLE } from "@nyx-frontend/main/components/tails";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import { useRouter } from "next/navigation";
import useRequests from "@nyx-frontend/main/hooks/makeRequests";
import { getProfileService } from "@nyx-frontend/main/services/loginService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { MODAL_CONFIG_PROCESSING } from "@nyx-frontend/main/utils/modalstyles";
import Select from "react-select";
import { BASEURL, EDIT_ARTISTS } from "@nyx-frontend/main/utils/utils";
import ButtonLoading from "@nyx-frontend/main/components/LoginLoadingButton";
import {
  UpdatePassword,
  profilePictureUpdate,
  updateProfilePicUrl,
} from "@nyx-frontend/main/services/loginService";
import { useMutation } from "@tanstack/react-query";
const brandVision = IMAGE_URL + "/assets/home/brandvision.png";
import Button from "@nyx-frontend/main/components/Button";
import Modal from "react-modal";
import UploadProfile from "@nyx-frontend/main/components/UploadProfile";
import { updatePassStyle } from "@nyx-frontend/main/utils/modalstyles";
import {
  uploadImageToVideoServices,
  generateVideoServices,
  generateImagetoVideoStatus,
} from "@nyx-frontend/main/services/imageToVideo";
import cookie from "cookiejs";
import { sendEmailVerification } from "@nyx-frontend/main/services/loginService";
import { onetimeemailverification } from "@nyx-frontend/main/utils/modalstyles";
import { VerifyOTPService, GetOTPService } from "@nyx-frontend/main/services/loginService";
import { verify } from "crypto";
import { Closeicon } from "./crossicon";
import { UpdateUserPhoneDetails } from "@nyx-frontend/main/services/loginService";

const Profile = () => {
  const [contextTab, setContextTab] = useState(0);
  const [number, setnumber] = useState("");
  const [wrongpassword, setwrongpassword] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [fname, setfname] = useState("");
  const [fonphoto, setfonphoto] = useState("");
  const [lname, setlname] = useState("");
  const [mno, setmno] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [org, setorg] = useState("");
  const [inputDisable, setInputDisable] = useState(true);
  const [updatePass, setUpdatepass] = useState(false);
  const [newpass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [previouspass, setpreviouspass] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [previouspasswordwrong, setpreviouspasswordwrong] = useState(false);
  const [PasswordNotMatched, setPasswordNotMatched] = useState(false);
  const [PasswordcriteriaNotMatched, setPasswordcriteriaNotMatched] =
    useState(false);
  const [passwordUpdated, setPassWordUpdated] = useState(false);
  const [profileUpload, setProfileUpload] = useState(false);
  const [selectedDriveImage, setSelectedDriveImage] = useState();
  const [emailverivication, setemailverivication] = useState("");
  const [firsttimepopup, setfirsttimepopup] = useState(false);
  const [firsttimepopup2, setfirsttimepopup2] = useState(false);
  const [validitycheck, setvaliditycheck] = useState(false);
  const [emailexisted, setemailexisted] = useState(false);
  const [samepasserror, setsamepasserror] = useState(false);
  const [cancelButtonLoading, setcancelButtonLoading] = useState(false);
  const [updatephonenumber, setupdatephonenumber] = useState(false);
  const [verifyphonenumber, setverifyphonenumber] = useState(false);
  const [alertfornewcred, setalertfornewcred] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [checkwrongpassword, setcheckwrongpassword] = useState(false);
  const [userexisted, setuserexisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [OTPvalue, setOTPvalue] = useState("");
  const [wrongotp, setwrongotp] = useState(false);
  const [userexistedotp, setuserexistedotp] = useState(false);
  const [notfilled, setnotfilled] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCounter, setResendCounter] = useState(0);
  const [errormessage, seterrormessage] = useState("");
  const [errormessage2, seterrormessage2] = useState("");

  const fileInputRef = useRef(null);
  const router = useRouter();
  const { post } = useRequests();

  const mutateuserdata = useMutation({
    mutationKey: ["user-details"],
    mutationFn: UpdateUserPhoneDetails,
  });

  const queryUser = useQuery({
    queryKey: ["user-details-profile-page"],
    queryFn: getProfileService,
  });
  const mutateuserdetails = useMutation({
    mutationKey: ["user-details-profile-page"],
    mutationFn: getProfileService,
  });

  const mutateSendOTP = useMutation({
    mutationKey: ["OTPsend-api"],
    mutationFn: GetOTPService,
  });

  const mutateVerifyOTP = useMutation({
    mutationKey: ["OTPverify-api"],
    mutationFn: VerifyOTPService,
  });

  const closeUploadPopUp = () => {
    setProfileUpload(false);
    setSelectedDriveImage();
  };
  const mutateSetPassword = useMutation({
    mutationKey: ["SetPassword-api"],
    mutationFn: UpdatePassword,
  });

  useEffect(() => {
    validatePassword(newpass);
  }, [newpass]);

  const { data: countries, isSuccess } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=idd,cca2",
      );
      return res.data;
    },
  });
  const countriesOptions = countries?.map((country) => ({
    value: country.idd.root + country.idd.suffixes.join(""),
    label: country.cca2,
  }));

  const onSubmitFirst = async () => {
    if (fname != "" && mno != "" && email != "") {
      setcancelButtonLoading(true);
      const updatedData = {
        first_name: fname,
        phone: mno,
        email: email,
        last_name: lname,
        organization: org,
        user_name: username,
      };
      let payload = {
        data: updatedData,
      };

      const res = await post(
        BASEURL + EDIT_ARTISTS,
        payload,
        MODAL_CONFIG_PROCESSING,
      );

      if (res.response == "Success") {
        
        toast.success(
          <>
            <span className="text-white text-[16px] leading-[20px]">
              {" "}
              Request Successfull!
            </span>
            <br />
            <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
              {" "}
              Details updated successfully
            </span>
          </>,
          { autoClose: 5000 },
        );
        setInputDisable(true);
        setcancelButtonLoading(false);
        mutateuserdetails.mutate(
          {},
          {
            onSuccess: async (response) => {
              queryUser.refetch();
              setUserDetails(response);
              setfname(response.first_name);
              setfonphoto(response.profilePic);
              setmno(response.phone);
              setemail(response.email);
              setorg(response.organization);
              setusername(response.user_name);
              setlname(response.last_name);
            },
            onError: (error) => {
              
              toast.error(
                <>
                  <span className="text-white text-[16px] leading-[20px]">
                    {" "}
                    Bad Request!
                  </span>
                  <br />
                  <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                    {" "}
                    Please refresh page to see updated data
                  </span>
                </>,
                { autoClose: 5000 },
              );
            },
          },
        );
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
              Sorry, could not update your details
            </span>
          </>,
          { autoClose: 5000 },
        );
        setcancelButtonLoading(false);
      }
    }
  };

  useEffect(() => {
    const storage = localStorage.getItem("token");
    if (storage) {
    } else {
      router.push("/apphome/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validatePassword = (password) => {
    const upperCaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    const hasUpperCase = upperCaseRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const isLengthValid = password.length > 6;

    setIsValid(hasUpperCase && hasSpecialChar && hasNumber && isLengthValid);
  };

  const CancelEdit = () => {
    setfname(userDetails.first_name);
    setfonphoto(userDetails.profilePic);
    setmno(userDetails.phone);
    setemail(userDetails.email);
    setorg(userDetails.organization);
    setusername(userDetails.user_name);
    setlname(userDetails.last_name);
    setInputDisable(true);
  };

  const updatebuttonclick = async (e) => {
    e.preventDefault();
    validatePassword(newpass);
    validatePassword(previouspass);
    validatePassword(confirmPass);
    if (newpass === confirmPass && isValid) {
      let data = {
        currentPassword: previouspass,
        newPassword: newpass,
        confirmPassword: confirmPass,
      };
      mutateSetPassword.mutate(data, {
        onSuccess: (response) => {
          // console.log("responce :" , response)
          // console.log("password set successfully ")
          setPassWordUpdated(true);
          setpreviouspass("");
          setNewPass("");
          setConfirmPass("");
        },
        onError: (error) => {
          const errormsg = error.response.data.errors.message;
          console.log(errormsg);
          if (
            errormsg ===
            "New password cannot be the same as the current password"
          ) {
            setsamepasserror(true);
          } else {
            setpreviouspasswordwrong(true);
          }
        },
      });
    } else {
      if (newpass === confirmPass) {
        setPasswordcriteriaNotMatched(true);
      } else {
        setPasswordNotMatched(true);
      }
    }
  };

  useEffect(() => {
    if (queryUser.isSuccess) {
      let data = queryUser.data;
      setUserDetails(data);
      //console.log(data, "data data");
      setfname(data.first_name);
      setfonphoto(data.profilePic);
      setmno(data.phone);
      setemail(data.email);
      setorg(data.organization);
      setusername(data.user_name);
      setlname(data.last_name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryUser.isSuccess]);

  const confirmPassChnage = (event) => {
    setConfirmPass(event.target.value);
    setPasswordNotMatched(false);
    setPasswordcriteriaNotMatched(false);
    setsamepasserror(false);
  };
  const previouspassChnage = (event) => {
    setpreviouspass(event.target.value);
    setpreviouspasswordwrong(false);
    setsamepasserror(false);
  };
  const newPassChnage = (event) => {
    setNewPass(event.target.value);
    validatePassword(newpass);
    setPasswordNotMatched(false);
    validatePassword(newpass);
    setsamepasserror(false);
  };
  const fnameupdate = (event) => {
    setfname(event.target.value);
  };
  const lnameupdate = (event) => {
    setlname(event.target.value);
  };
  const mnoupdate = (event) => {
    setmno(event.target.value);
  };
  const emailupdate = (event) => {
    setemail(event.target.value);
  };
  const orgupdate = (event) => {
    setorg(event.target.value);
  };
  const passupdate = (event) => {
    setpassword(event.target.value);
  };
  const usernameupdate = (event) => {
    setusername(event.target.value);
  };

  const openUpdatePass = () => {
    setPassWordUpdated(false);
    setUpdatepass(true);
  };

  const driveFileSelected = (newSelectedFile) => {
    setSelectedDriveImage(newSelectedFile);
  };

  const handleSystemButtonClick = () => {
    // Trigger click event on file input
    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current?.click();
    }
  };

  const systemUpload = (event) => {
    const selectedImageFile = event.target.files && event.target.files[0];

    if (selectedImageFile) {
      const uploadSystemData = new FormData();
      const profilePicUpload = new FormData();
      profilePicUpload.append("profile_image", selectedImageFile);
      uploadSystemData.append("image", selectedImageFile);
      uploadSystemData.append(
        "workspace_id",
        localStorage.getItem("workspace_id"),
      );

      mutateUploadImage.mutate(uploadSystemData, {
        onSuccess: (response) => {},
        onError: (error) => {
          console.error(error);
        },
      });

      mutateProfileUpload.mutate(profilePicUpload, {
        onSuccess: (response) => {
          setProfileUpload(false);
          setSelectedDriveImage();
          queryUser.refetch();
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  const mutateProfileUpload = useMutation({
    mutationKey: ["upload-drive-img"],
    mutationFn: profilePictureUpdate,
  });
  const mutateUploadImage = useMutation({
    mutationKey: ["upload-profile-img-drive"],
    mutationFn: uploadImageToVideoServices,
  });

  const mutationUpdateallData = useMutation({
    mutationKey: ["update-profile-via-url"],
    mutationFn: updateProfilePicUrl,
  });
  const handleDriveButtonClick = () => {
    const data = {
      data: {
        profilePic: selectedDriveImage?.file_details?.signed_image_url,
      },
    };
    mutationUpdateallData.mutate(data, {
      onSuccess: (res) => {
        setProfileUpload(false);
        setSelectedDriveImage();
        queryUser.refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const mutatemailsend = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: sendEmailVerification,
  });

  const UpdateButtonClick = () => {
    setfirsttimepopup(true);
  };
  const UpdatePhoneClick = () => {
    setupdatephonenumber(true);
  };

  const NextButtonEmailVerification = () => {
    const valid = /^\S+@\S+\.\S+$/.test(emailverivication);
    if (valid) {
      const data = {
        email: emailverivication,
      };
      mutatemailsend.mutate(data, {
        onSuccess: (response) => {
          console.log(response);
          setfirsttimepopup(false);
          setfirsttimepopup2(true);
        },
        onError: (error) => {
          setemailexisted(true);
          seterrormessage2(error?.response?.data?.errors?.message);
        },
      });
    } else {
      setvaliditycheck(true);
    }
  };
  const continueToVerification = (e) => {
    setfirsttimepopup2(false);
  };
  const emailverificationsubmit = (e) => {
    e.preventDefault();
    setemailverivication(e.target.value);
    setvaliditycheck(false);
    setemailexisted(false);
  };
  const skipverification = () => {
    setfirsttimepopup(false);
    setfirsttimepopup2(false);
    setvaliditycheck(false);
  };
  const backverification = () => {
    setfirsttimepopup(true);
    setfirsttimepopup2(false);
  };

  const GetOTP = (e) => {
    e.preventDefault();
    const hasAlphabet = /[a-zA-Z]/.test(number);
    if (number.length === 10 && !hasAlphabet) {
      localStorage.setItem("phonenumber", number);
      localStorage.setItem("countrycodesignup", countryCode.value);
      setIsLoading(true);
      let data = {
        countryCode: countryCode.value, // if channel == "sms", please provide
        phoneNumber: number, // if channel == "sms", please provide
        channel: "sms", // "sms", "email"
        email: "",
        type: "signup",
      };
      mutateSendOTP.mutate(data, {
        onSuccess: (response) => {
          console.log("responce :", response);
          // console.log("responce id:", response.verification_id);
          const verify = response.verification_id;
          localStorage.setItem("verificationID", verify);
          setIsLoading(false);
          setverifyphonenumber(true);
          setupdatephonenumber(false);
        },

        onError: async (error) => {
          console.log(error.response);
          const errormsg = error.response.data.message;
          if (errormsg === "User already exists!") {
            setuserexisted(true);
            setIsLoading(false);
          } else {
            setwrongpassword(true);
            setIsLoading(false);
          }
        },
      });
    } else {
      if (number.length === 0) {
        setcheckwrongpassword(true);
        setIsLoading(false);
      } else {
        setwrongpassword(true);
        setIsLoading(false);
      }
    }
  };

  const phonenumbersubmit = (e) => {
    e.preventDefault();
    setnumber(e.target.value);
    setwrongpassword(false);
    setcheckwrongpassword(false);
    setuserexisted(false);
  };
  useEffect(() => {
    if (isSuccess) {
      setCountryCode(countriesOptions.find((option) => option.label === "IN"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const countrySelectOnChangeHandler = (option) => {
    setCountryCode(option);
  };

  const closeupdaetphonepopup = () => {
    setupdatephonenumber(false);
    setverifyphonenumber(false);
  };

  const OTPHandelChange = (event) => {
    event.preventDefault();
    setOTPvalue(event.target.value);
    setnotfilled(false);
    setuserexistedotp(false);
    setwrongotp(false);
  };

  const VerifyOTP = (e) => {
    e.preventDefault();
    if (OTPvalue != "") {
      setIsLoading(true);
      const verificationID = localStorage.getItem("verificationID");
      let data = {
        channel: "sms",
        userEnteredOTP: OTPvalue,
        verification_id: verificationID,
      };
      console.log(data);
      mutateVerifyOTP.mutate(data, {
        onSuccess: async (response) => {
          setverifyphonenumber(false);
          setupdatephonenumber(false);
          const data = {
            countryCode: "91",
            updated_phone: number,
            otp: "111111",
            verification_key:
              "r+icv/04SMYbcMBckUXmrjRkO8pz43KWMeSHIbgKqfE2I9sUpyg6SD7smg/GkP4F9RhJWDdzmUuhKgx938e8PzBuRIR26de5NJ7O8qysCGW7dSV6+87oiwdeFHflyRnsb113TErEPwHSuvD2hY5860EUM3VmGkZbE9IMgMRPMy5bbyIl7ppWz2UDaTwVsbDknwiINj9wN+2E5ruxTD0YKjZfd41XiFMpREWhHIEMnrnJzC3i9iNoKqRX+hC/wC/u",
          };
          mutateuserdata.mutate(data, {
            onSuccess: (response) => {
              
              toast.success(
                <>
                  <span className="text-white text-[16px] leading-[20px]">
                    {" "}
                    Request Successfull!
                  </span>
                  <br />
                  <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                    {" "}
                    Details updated successfully
                  </span>
                </>,
                { autoClose: 5000 },
              );
              setInputDisable(true);
              setalertfornewcred(true);
              setcancelButtonLoading(false);
              setverifyphonenumber(false);
              mutateuserdetails.mutate(
                {},
                {
                  onSuccess: async (response) => {
                    setUserDetails(response);
                    setfname(response.first_name);
                    setfonphoto(response.profilePic);
                    setmno(response.phone);
                    setemail(response.email);
                    setorg(response.organization);
                    setusername(response.user_name);
                    setlname(response.last_name);
                  },
                  onError: (error) => {
                     toast.error(
                <>
                  <span className="text-white text-[16px] leading-[20px]">
                    {" "}
                    Bad Request!
                  </span>
                  <br />
                  <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                    {" "}
                    Please refresh page to see updated data
                  </span>
                </>,
                { autoClose: 5000 },
              );
                  },
                },
              );
            },
            onError: (error) => {
              console.error(error);
              
              toast.error(
                <>
                  <span className="text-white text-[16px] leading-[20px]">
                    {" "}
                    Bad Request!
                  </span>
                  <br />
                  <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                    {" "}
                    Unable to update new number
                  </span>
                </>,
                { autoClose: 5000 },
              );
            },
          });
        },
        onError: (error) => {
          console.error(error);
          setwrongotp(true);
          setIsLoading(false);
        },
      });
    } else {
      setnotfilled(true);
    }
  };
  const resendOTP = (e) => {
    e.preventDefault();
    setOTPvalue("");
    setnotfilled(false);
    setwrongotp(false);
    setuserexistedotp(false);
    if (resendCounter === 0) {
      setResendCounter(40);
      setResendDisabled(true);

      const phonedata = localStorage.getItem("phonenumber");
      const countrycode = localStorage.getItem("countrycodesignup");

      let data = {
        countryCode: countrycode, // if channel == "sms", please provide
        phoneNumber: phonedata, // if channel == "sms", please provide
        channel: "sms", // "sms", "email"
        email: "",
        type: "signup",
      };
      console.log(data, "otpdata");
      mutateSendOTP.mutate(data, {
        onSuccess: (response) => {
          const verify = response.verification_id;
          localStorage.setItem("verificationID", verify);
        },
        onError: (error) => {
          console.error(error);
          setResendCounter(0);
          alert("Could not send OTP via SMS");
        },
      });
    }
  };
  return (
    <>
      <div className="flex mt-8 p-8 bg-[#332270] mx-5">
        <div className="bg-[#23145A] relative w-4/12 max-h-[20em] text-center text-white rounded-lg p-4">
          {inputDisable == false && (
            <div
              className="text-sm underline font-light  absolute right-5  top-5 cursor-pointer"
              onClick={() => setProfileUpload(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M2.5 14.3731V17.4981H5.625L14.8417 8.28146L11.7167 5.15646L2.5 14.3731ZM17.2583 5.8648C17.3356 5.7877 17.3969 5.69613 17.4387 5.59532C17.4805 5.49451 17.502 5.38644 17.502 5.2773C17.502 5.16816 17.4805 5.06009 17.4387 4.95928C17.3969 4.85847 17.3356 4.76689 17.2583 4.6898L15.3083 2.7398C15.2312 2.66254 15.1397 2.60125 15.0389 2.55944C14.938 2.51762 14.83 2.49609 14.7208 2.49609C14.6117 2.49609 14.5036 2.51762 14.4028 2.55944C14.302 2.60125 14.2104 2.66254 14.1333 2.7398L12.6083 4.2648L15.7333 7.3898L17.2583 5.8648Z"
                  fill="white"
                />
              </svg>
            </div>
          )}
          <div className="flex justify-center mt-6">
            {queryUser.isSuccess ? (
              <img
                className="rounded-full w-[150px] h-[150px] mb-4 object-fit"
                src={queryUser?.data?.profilePic}
                alt="Brand Vision"
              />
            ) : (
              <div
                className="w-[150px] h-[150px] rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
                }}
              ></div>
            )}
          </div>

          {queryUser.isSuccess ? (
            <h2 className="text-[#FFC01D] font-semibold  text-[20px]">
              {fname} {lname}
            </h2>
          ) : (
            <div
              className="h-8 w-full mt-2 rounded-md"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
              }}
            ></div>
          )}
        </div>
        <div className="p-4 bg-[#332270] w-8/12 ml-4 rounded-lg">
          <div className="flex flex-col mx-auto justify-center items-center gap-5">
            <div className="flex w-[90%]">
              <div className="w-full gap-3">
                {queryUser.isSuccess ? (
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                    <p className="font-semibold py-2">First Name</p>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal focus:placeholder-transparent"
                      placeholder="Full Name"
                      value={fname}
                      onChange={fnameupdate}
                      disabled={inputDisable}
                    />
                  </div>
                ) : (
                  <>
                    <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                      <p className="font-semibold py-2">First Name</p>
                      <div
                        className="h-10 w-full  rounded-md py-2"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
                        }}
                      ></div>
                    </div>
                  </>
                )}

                {queryUser.isSuccess ? (
                  <div
                    className={
                      inputDisable
                        ? `text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4`
                        : `text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-1`
                    }
                  >
                    <p className="font-semibold py-2">Email ID</p>
                    <input
                      type="text"
                      className={`w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal focus:placeholder-transparent ${inputDisable == false ? "text-[#8297BD]" : "text-white"}`}
                      placeholder="Email ID"
                      defaultValue={email}
                      onChange={emailupdate}
                      disabled={true}
                    />
                  </div>
                ) : (
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                    <p className="font-semibold py-2">Email ID</p>
                    <div
                      className="h-10 w-full  rounded-md py-2"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
                      }}
                    ></div>
                  </div>
                )}

                {inputDisable == false && (
                  <div
                    className=" text-end text-white underline underline-offset-2 font-light  text-[12px] cursor-pointer "
                    onClick={UpdateButtonClick}
                  >
                    Update Email
                  </div>
                )}

                {queryUser.isSuccess ? (
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                    <p className="font-semibold py-2">Organisation</p>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal focus:placeholder-transparent"
                      placeholder="Organisation"
                      onChange={orgupdate}
                      value={org}
                      disabled={inputDisable}
                    />
                  </div>
                ) : (
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                    <p className="font-semibold py-2">Organisation</p>
                    <div
                      className="h-10 w-full  rounded-md py-2"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
                      }}
                    ></div>
                  </div>
                )}
              </div>

              <div className="w-full ml-4 gap-3">
                {queryUser.isSuccess ? (
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                    <p className="font-semibold py-2">Last Name</p>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal focus:placeholder-transparent"
                      placeholder="Last Name"
                      onChange={lnameupdate}
                      value={lname}
                      disabled={inputDisable}
                    />
                  </div>
                ) : (
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                    <p className="font-semibold py-2">Last Name</p>
                    <div
                      className="h-10 w-full  rounded-md py-2"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
                      }}
                    ></div>
                  </div>
                )}

                {queryUser.isSuccess ? (
                  <div
                    className={
                      inputDisable
                        ? `text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4`
                        : `text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-1`
                    }
                  >
                    <p className="font-semibold py-2">Mobile Number</p>
                    <input
                      type="text"
                      className={`w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal focus:placeholder-transparent ${inputDisable == false ? "text-[#8297BD]" : "text-white"}`}
                      placeholder="Mobile Number"
                      value={mno}
                      onChange={mnoupdate}
                      disabled={true}
                    />
                  </div>
                ) : (
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                    <p className="font-semibold py-2">Mobile Number</p>
                    <div
                      className="h-10 w-full rounded-md py-2"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
                      }}
                    ></div>
                  </div>
                )}
                {inputDisable == false && (
                  <div
                    className=" text-end text-white underline underline-offset-2 font-light  text-[12px] cursor-pointer "
                    onClick={UpdatePhoneClick}
                  >
                    Update Phone Number
                  </div>
                )}

                {queryUser.isSuccess ? (
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm ">
                    <p className="font-semibold py-2">Password</p>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal focus:placeholder-transparent"
                      placeholder="Password"
                      onChange={passupdate}
                      defaultValue="xxxxxxxx"
                      disabled={true}
                    />
                  </div>
                ) : (
                  <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                    <p className="font-semibold py-2">Password</p>
                    <div
                      className="h-10 w-full  rounded-md py-2"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%)",
                      }}
                    ></div>
                  </div>
                )}

                {inputDisable == false && (
                  <div
                    className=" text-end text-white underline underline-offset-2 font-light mt-1 text-[12px] cursor-pointer "
                    onClick={openUpdatePass}
                  >
                    Update Password
                  </div>
                )}
              </div>
            </div>
            {inputDisable ? (
              <div className="w-full flex  justify-end gap-3 mt-4 mb-4">
                {queryUser.isSuccess ? (
                  <Button
                    onClick={() => setInputDisable(false)}
                    className=" rounded-full text-nyx-yellow w-40 font-semibold mr-10"
                  >
                    Edit Profile
                  </Button>
                ) : null}
              </div>
            ) : (
              <div className="w-full flex  justify-center gap-3 mt-4 mb-4">
                <Button
                  onClick={CancelEdit}
                  className={
                    cancelButtonLoading
                      ? `rounded-full text-[#989292] border-[#727070] hover:shadow-none hover:bg-[#727070] w-40 cursor-not-allowed font-semibold`
                      : `rounded-full text-nyx-yellow w-40 font-semibold`
                  }
                  disabled={cancelButtonLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={onSubmitFirst}
                  className=" rounded-full  w-40 bg-nyx-yellow  text-black font-semibold"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {updatePass ? (
        <Modal
          isOpen={updatePass}
          style={updatePassStyle}
          onRequestClose={() => setUpdatepass(false)}
          ariaHideApp={false}
        >
          {passwordUpdated ? (
            <div className="p-8">
              <div className="flex flex-col justify-center items-center gap-5">
                <div className="text-white ">Password Updated successfully</div>
                <div>
                  <Button
                    className=" rounded-full text-black bg-nyx-yellow font-semibold"
                    onClick={() => setUpdatepass(false)}
                  >
                    Ok
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div>
                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">Current Password</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal focus:placeholder-transparent"
                    placeholder="Current password"
                    value={previouspass}
                    onChange={previouspassChnage}
                  />
                </div>
                {previouspasswordwrong && (
                  <p className="text-[10px] text-[#ff5151] mt-[-12px] absolute">
                    Invalid Current Password
                  </p>
                )}
              </div>
              <div>
                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">New Password</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal focus:placeholder-transparent"
                    placeholder="New Password"
                    value={newpass}
                    onChange={newPassChnage}
                  />
                </div>
                {!isValid && (
                  <p className="text-[10px] text-[#ff5151] ">
                    Password must contain at least one uppercase letter, one
                    special character (#, @, $, %, etc.), one number, and be at
                    least 8 characters long.
                  </p>
                )}
                {samepasserror && (
                  <p className="text-[10px] text-[#ff5151] absolute mt-[-10px]">
                    New password cannot be the same as the current password
                  </p>
                )}
              </div>
              <div>
                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">Confirm Password</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal focus:placeholder-transparent"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={confirmPassChnage}
                  />
                </div>
                {PasswordNotMatched && (
                  <p className="text-[10px] text-[#ff5151] absolute mt-[-10px]">
                    Password not matched
                  </p>
                )}
              </div>

              <div className="flex flex-row  justify-center items-center gap-2 px-4 mt-6">
                <Button
                  className="rounded-full text-nyx-yellow w-full font-semibold"
                  onClick={() => setUpdatepass(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-full text-black bg-nyx-yellow font-semibold w-full"
                  onClick={updatebuttonclick}
                >
                  Change Password
                </Button>
              </div>
            </div>
          )}
        </Modal>
      ) : null}

      {profileUpload ? (
        <UploadProfile
          onClose={closeUploadPopUp}
          onSelected={driveFileSelected}
          handleSystemButtonClick={handleSystemButtonClick}
          systemUpload={systemUpload}
          handleDriveButtonClick={handleDriveButtonClick}
          fileInputRef={fileInputRef}
          selectedDriveImage={selectedDriveImage}
        />
      ) : null}
      {firsttimepopup ? (
        <Modal
          isOpen={firsttimepopup}
          style={onetimeemailverification}
          // onRequestClose={onLastClose}
        >
          <div className="w-[550px] h-[400px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[31px] font-[600] mt-8 text-[#FFF]">
                Enter your Email
              </h2>
              <p className="text-center text-[18px] font-[400] text-[#FFF]">
                to use Nyx products and workspace
              </p>
            </div>
            <p className="text-white flex justify-center items-center text-[12px] mt-5">
              Use your organization email for extra rewards.
            </p>

            <div className="w-full h-full flex flex-col mt-1">
              <input
                type="text"
                className="w-full bg-transparent border text-white border-[#8297BD] text-[14px] rounded-md p-2 font-normal focus:placeholder-transparent"
                placeholder="email@gmail.com"
                value={emailverivication}
                onChange={emailverificationsubmit}
              />
              {validitycheck && (
                <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">
                  Please enter valid Email Address
                </p>
              )}
              {emailexisted && (
                <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">
                  {errormessage2}
                </p>
              )}
            </div>
            <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
              <button
                className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
                onClick={skipverification}
              >
                <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                  <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
                    <div className="text-[14px] font-normal text-white ">
                      Skip
                    </div>
                  </span>
                </div>
              </button>
              <button
                type="submit"
                className={
                  false
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={NextButtonEmailVerification}
              >
                Verify
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {firsttimepopup2 ? (
        <Modal
          isOpen={firsttimepopup2}
          style={onetimeemailverification}
          // onRequestClose={onLastClose}
        >
          <div className="w-[550px] h-[400px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[31px] font-[600] mt-14 mb-8 text-[#FFF]">
                Thank you
              </h2>
              <p className="font-semibold  text-[14px] text-[#FFFFFF] flex justify-center items-center">
                A verification mail has been sent to your mail box.
              </p>
              <p className="font-semibold mb-2 mt-[-5px] text-[14px] text-[#FFFFFF] flex justify-center items-center">
                Kindly click on the given link
              </p>
            </div>
            <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
              <button
                className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
                onClick={backverification}
              >
                <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                  <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
                    <div className="text-[14px] font-normal text-white ">
                      Back
                    </div>
                  </span>
                </div>
              </button>
              <button
                type="submit"
                className={
                  false
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={continueToVerification}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      {updatephonenumber ? (
        <Modal
          isOpen={updatephonenumber}
          style={onetimeemailverification}
          // onRequestClose={onLastClose}
        >
          <div className="w-[450px] h-[350px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[24px] font-[600] text-[#FFF]">
                Update Phone Number
              </h2>
            </div>
            <div
              onClick={closeupdaetphonepopup}
              className="cursor-pointer absolute right-10 "
              dangerouslySetInnerHTML={{ __html: Closeicon }}
            ></div>
            <p className="font-semibold  text-[14px] text-[#FFFFFF] mt-8 flex justify-center items-center">
              Enter your Phone number
            </p>
            <div className="flex flex-row">
              <Select
                options={countriesOptions}
                placeholder="IN"
                styles={registerPopUpCountryStyles}
                className="text-[12px] w-[100px] h-[40px] md:w-[100px] md:h-[41px] rounded-tl-lg rounded-bl-lg  bg-[#ECECEC16] focus:outline-none"
                onChange={countrySelectOnChangeHandler}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
              <input
                type="number"
                id="phone"
                placeholder="xxxxxxxxx"
                className={
                  false
                    ? ` bg-[#ECECEC16]  pt-1  pl-2 text-[14px] h-[41px] text-white  rounded-r-md  w-full placeholder-blue border-[#ff5a68]`
                    : `bg-[#ECECEC16]  pt-1 pb-1 rounded-r-md  pl-2 text-[14px] h-[41px] text-white w-full placeholder-blue border-[#8297BD]`
                }
                value={number}
                onChange={phonenumbersubmit}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>
            {checkwrongpassword ? (
              <p className="text-[#ff4545] text-[12px] font-normal p-1">
                Please enter Phone number
              </p>
            ) : (
              <></>
            )}
            {wrongpassword ? (
              <p className="text-[#ff4545] text-[12px] font-normal p-1">
                Could not send an OTP via SMS
              </p>
            ) : (
              <></>
            )}
            {userexisted && (
              <p className="text-[#ff4545] text-[12px] font-normal p-1">
                User already exists
              </p>
            )}
            <div className="flex justify-center items-center gap-6 mb-10">
              <div className="mb-6 mt-3 text-center">
                <button
                  type="submit"
                  className={
                    isLoading
                      ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                      : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                  }
                  onClick={GetOTP}
                  disabled={isLoading || mutateSendOTP.isPending}
                >
                  {isLoading || mutateSendOTP.isPending ? (
                    <ButtonLoading />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
      {verifyphonenumber ? (
        <Modal
          isOpen={verifyphonenumber}
          style={onetimeemailverification}
          // onRequestClose={onLastClose}
        >
          <div className="w-[450px] h-[350px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[24px] font-[600]  text-[#FFF]">
                Enter OTP
              </h2>
            </div>
            <div
              onClick={closeupdaetphonepopup}
              className="cursor-pointer absolute right-10 "
              dangerouslySetInnerHTML={{ __html: Closeicon }}
            ></div>
            <p
              className="cursor-pointer hover:underline hover:text-nyx-yellow  text-[14px] text-[#ffffff] mt-8 flex justify-center items-center"
              onClick={() => {
                setverifyphonenumber(false);
                setupdatephonenumber(true);
              }}
            >
              An OTP has been sent to {number.substring(0, 4)}xxxxxx ,Change?
            </p>
            <div className="mb-4">
              <input
                type="number"
                className={
                  false
                    ? `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#ff5a68]`
                    : `border pt-1 pb-1 pl-2 text-[14px] h-[40px] text-white bg-transparent rounded-md w-full placeholder-blue border-[#8297BD]`
                }
                placeholder="xxxxxx"
                value={OTPvalue}
                onChange={OTPHandelChange}
              />
              {wrongotp ? (
                <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                  The OTP you entered is incorrect
                </p>
              ) : (
                <></>
              )}
              {resendCounter > 0 && (
                <div className="text-[12px] text-[#ffc86a] font-normal absolute p-1">
                  Resend OTP in {resendCounter} seconds
                </div>
              )}
              {userexistedotp ? (
                <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                  {errormessage}
                </p>
              ) : (
                <></>
              )}
              {notfilled ? (
                <p className="text-[#ff4545] text-[12px] font-normal absolute p-1">
                  Please enter your OTP
                </p>
              ) : (
                <></>
              )}
            </div>

            <div className="flex justify-center items-center gap-6 mb-10 mt-[8px]">
              <div className="mb-6 mt-3 text-center">
                <button
                  className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
                  onClick={resendOTP}
                >
                  <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                    <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
                      <div className="text-[14px] font-normal text-white ">
                        Resend OTP
                      </div>
                    </span>
                  </div>
                </button>
              </div>
              <div className="mb-6 mt-3 text-center">
                <button
                  type="submit"
                  className={
                    isLoading
                      ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                      : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                  }
                  onClick={VerifyOTP}
                  disabled={mutateVerifyOTP.isPending}
                >
                  {mutateVerifyOTP.isPending ? <ButtonLoading /> : "Verify OTP"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
      {alertfornewcred ? (
        <Modal
          isOpen={alertfornewcred}
          style={onetimeemailverification}
          // onRequestClose={onLastClose}
        >
          <div className="w-[450px] h-[350px] p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[18px] font-[600] mt-16 text-[#FFF]">
                Please use this phone number as your login credentials from now
                on.
              </h2>
              <h2 className="text-center text-[16px] font-[600]  text-[#f7da4c]">
                {number}
              </h2>
            </div>
            <div
              onClick={() => {
                setalertfornewcred(false);
              }}
              className="cursor-pointer absolute right-10 "
              dangerouslySetInnerHTML={{ __html: Closeicon }}
            ></div>
            <div className="mb-6 mt-3 text-center">
              <button
                type="submit"
                className={
                  false
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={() => {
                  setalertfornewcred(false);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Profile;
