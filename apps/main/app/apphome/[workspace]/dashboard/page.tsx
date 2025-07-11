/* eslint-disable react-hooks/exhaustive-deps */ /* eslint-disable jsx-a11y/alt-text */ /* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState, useRef } from "react"
import { sendEmailVerification, continueEmailVerification } from "@nyx-frontend/main/services/loginService"
import cookie from "cookiejs"
import "./index.css"
import { TAIL_TITLE } from "@nyx-frontend/main/components/tails"
import Sidebar from "@nyx-frontend/main/components/Sidebar"
import TopBar from "@nyx-frontend/main/components/TopBar"
import { useRouter } from "next/navigation"
import { IMAGE_URL } from "@nyx-frontend/main/components/constants"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getUserProfileData } from "@nyx-frontend/main/services/uploadService"
import Modal from "react-modal"
import {
  welcomePopUpStyle,
  onetimeemailverification,
  onetimeemailverification2,
} from "@nyx-frontend/main/utils/modalstyles"
import Button from "@nyx-frontend/main/components/Button"
import Select from "react-select"
import { welcomePopupStyles } from "@nyx-frontend/main/app/apphome/optionStyles"
import { gender } from "@nyx-frontend/main/app/apphome/constants"
import axios from "axios"
import Image from "next/image"
import { UpdateUserProfileDetails } from "@nyx-frontend/main/services/loginService"
import Link from "next/link"
import LandscapePopup from "../../LandscapePopUp"
import { inviteusertokenapi } from "@nyx-frontend/main/services/workSpace"
import DemoFormSuccess from "@nyx-frontend/main/components/Icons/DemoFormSuccess"
import { getAvailableCredit, getWorkspaceDetailsById } from "@nyx-frontend/main/services/workSpace"
import { TAIL_BUTTON2 } from "@nyx-frontend/main/components/tails2"
import useGlobalStore from "../admanager/store/store"
import { useJsApiLoader } from "@react-google-maps/api"

const brandVision = IMAGE_URL + "/assets/images/home/ImageCraft.png"
const sonic = IMAGE_URL + "/assets/images/home/SonicAI.png"
const campulse = IMAGE_URL + "/assets/images/home/CampulseAI.png"
const lyricsGenius = IMAGE_URL + "/assets/images/home/LyricGeniusAI.png"
const videoVista = IMAGE_URL + "/assets/images/home/VideoVista.png"
const logo = IMAGE_URL + "/assets/logo.svg"
const webappIcon = IMAGE_URL + "/assets/mwebappicon.png"

const BrandVisionAI = () => {
  const router = useRouter()
  const [welcome, setWelcome] = useState<boolean>(false)
  const [personalisePopUp, setPersonalisePopUp] = useState<boolean>(false)
  const [workspacePopUp, setWorkspacePopUp] = useState<boolean>(false)
  const [tabLandscapePopUp, setTabLandscapePopUp] = useState<boolean>(false)
  const [countryCode, setCountryCode] = useState("+91")
  const [firstname, setfirstname] = useState("")
  const [checkfirstname, setcheckfirstname] = useState(false)
  const [checkdescription, setcheckdescription] = useState(false)
  const [lastname, setlastname] = useState("")
  const [checklastname, setchecklastname] = useState(false)
  const [organiation, setorganiation] = useState()
  const [checkorganiation, setcheckorganiation] = useState(false)
  const [email, setemail] = useState()
  const [checkemail, setcheckemail] = useState(false)
  const [age, setage] = useState()
  const [cities, setcities] = useState()
  const [riquired, setriquired] = useState(false)
  const [adminGender, setAdminGender] = useState<string>("")
  const [selectedOption, setSelectedOption] = useState("")
  const [description, setdescription] = useState()
  const [selectedRole, setSelectedRole] = useState("")
  const [workspace, setWorkspace] = useState("")
  const [workspacename, setWorkspacename] = useState<any>("")
  const [emailverivication, setemailverivication] = useState<any>("")
  const [firsttimepopup, setfirsttimepopup] = useState<boolean>(false)
  const [firsttimepopup2, setfirsttimepopup2] = useState<boolean>(false)
  const [validitycheck, setvaliditycheck] = useState<boolean>(false)
  const [emailexisted, setemailexisted] = useState<boolean>(false)
  const [errorjoinworkspace, seterrorjoinworkspace] = useState<boolean>(false)
  const [successjoinworkspace, setsuccessjoinworkspace] = useState<boolean>(false)
  const [ValueBeforeWith, setValueBeforeWith] = useState<boolean>(false)
  const [invitationnotfound, setinvitationnotfound] = useState<boolean>(false)
  const [ValueafterWith, setValueafterWith] = useState<string>("")
  const [autocomplete, setAutocomplete] = useState(null)
  const inputRef = useRef(null)
  const [places, setPlaces] = useState([])

  const {
    objective,
    goalId,
    goalData,
    subTopic,
    optionValue,
    channlesArray,
    channelIdArray,
    setObjective,
    setChannelsArray,
    setGoalId,
    setGoalData,
    setSubTopic,
    setOptionValue,
    setChannelIdArray,
  } = useGlobalStore()

  const resetCampaign = () => {
    setObjective(null) // Reset objective to null
    setChannelsArray([]) // Reset channelsArray to an empty array
    setGoalId(null) // Reset goalId to null
    setGoalData(null) // Reset goalData to null
    setSubTopic(null) // Reset subTopic to null
    setOptionValue({}) // Reset optionValue to an empty object
    setChannelIdArray([]) // Reset channelIdArray to an empty array
  }

  const roles = [
    {
      title: "Business Owner",
      icon: "https://assets.nyx.today/assets/home/ExpertiseAdministrator.svg",
    },
    {
      title: "Youtuber/Influencer",
      icon: "https://assets.nyx.today/assets/home/ExpertiseYoutuber.svg",
    },
    {
      title: "Student",
      icon: "https://assets.nyx.today/assets/home/ExpertiseStudent.svg",
    },
    {
      title: "Researcher",
      icon: "https://assets.nyx.today/assets/home/ExpertiseResearcher.svg",
    },
    {
      title: "Agency Professional",
      icon: "https://assets.nyx.today/assets/home/ExpertiseAgencyProfessional.svg",
    },
    {
      title: "Marketing Professional",
      icon: "https://assets.nyx.today/assets/home/ExpertiseMarketingProfessional.svg",
    },
    {
      title: "Educator",
      icon: "https://assets.nyx.today/assets/home/ExpertiseEducator.svg",
    },
    {
      title: "Professional Editor",
      icon: "https://assets.nyx.today/assets/home/ExpertiseProfessionalEditor.svg",
    },
    {
      title: "Filmmaker",
      icon: "https://assets.nyx.today/assets/home/ExpertiseFilmmaker.svg",
    },
    {
      title: "Administrator",
      icon: "https://assets.nyx.today/assets/home/ExpertiseAdministrator.svg",
    },
  ]

  const NYX_PRODUCTS = [
    {
      name: "Launch Multi-Channel Campaigns",
      image: "agents.png",
      hoverTitle: "Agentic AI",
      text_first: "Launch Agentic",
      text_second: "Campaigns",
      redirection: "agents",
    },
    {
      name: "Generate Image Ads ",
      image: "toolimage1.png",
      hoverTitle: "ImageCraft AI",
      text_first: "Generate",
      text_second: "Image Ads",
      redirection: "image-craft-ai/text-to-image",
    },
    {
      name: "Generate Product Photo-Shoots",
      image: "toolimage2.png",
      hoverTitle: "ImageCraft AI",
      text_first: "Generate Product",
      text_second: "Photo-Shoots",
      redirection: "image-craft-ai/image-to-image",
    },
    {
      name: "Monitor and Optimize Campaign",
      image: "toolimage6.png",
      hoverTitle: "Campulse AI",
      text_first: "Launch and",
      text_second: "Optimize Campaigns",
      redirection: "admanager/dashboard?view=graph",
    },
    {
      name: "Analyse Creative's Potential",
      image: "toolimage4.png",
      hoverTitle: "ImageCraft AI",
      text_first: "Analyse",
      text_second: "Creative's Potential",
      redirection: "image-craft-ai/ctr-prediction",
    },
    {
      name: "Creative Editing",
      image: "toolimagedog.png",
      hoverTitle: "VideoVista AI",
      text_first: "Generate",
      text_second: "Video Ads",
      redirection: "video-vista-ai/text-to-video",
    },
  ]

  const mutatejoinworkspace = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: inviteusertokenapi,
  })

  const mutatesingleworkspace = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: getWorkspaceDetailsById,
  })

  useEffect(() => {
    const data = localStorage.getItem("joinworkspace")
    if (data) {
      //@ts-ignore
      mutatejoinworkspace.mutate(data, {
        onSuccess: (response: any) => {
          localStorage.removeItem("joinworkspace")
          setsuccessjoinworkspace(true)
        },
        onError: (error: any) => {
          localStorage.removeItem("joinworkspace")
          seterrorjoinworkspace(true)
          const errormsg2 = error.response.data.errors.message
          const getValueBeforeWith = errormsg2.substring(0, errormsg2.indexOf("with"))
          const getValueAfterWith = errormsg2.substring(errormsg2.indexOf("with") + 5).slice(0, -1)
          if (getValueBeforeWith === "Failed to join workspace, please login ") {
            setValueafterWith(getValueAfterWith)
            setValueBeforeWith(true)
          }
          if (errormsg2 === "invitation not found") {
            setinvitationnotfound(true)
          }
        },
      })
    }
  }, [])

  useEffect(() => {
    const data = localStorage.getItem("workspace_id")
    if (data) {
      //@ts-ignore
      mutatesingleworkspace.mutate(data, {
        onSuccess: (response: any) => {
          console.log(response)
        },
        onError: (error: any) => { },
      })
    }
  }, [])

  useEffect(() => {
    const work = localStorage.getItem("workspace_name")
    setWorkspacename(work)
  }, [])

  const queryuserdata = useQuery({
    queryKey: ["user-details"],
    queryFn: getUserProfileData,
  })

  useEffect(() => {
    if (queryuserdata.isSuccess) {
      const { defaultWorkspaceName } = queryuserinfo.data.artistProfile
      setWorkspace(defaultWorkspaceName ? `${defaultWorkspaceName}` : "")
    }
  }, [queryuserdata.isSuccess])

  useEffect(() => {
    if (queryuserdata.isSuccess) {
      setemail(queryuserinfo?.data?.artistProfile?.email)
      if (queryuserinfo?.data?.artistProfile?.email) {
        setcheckemail(true)
      }
      if (queryuserinfo?.data?.artistProfile?.first_name) {
        setcheckfirstname(true)
      }
      if (queryuserinfo?.data?.artistProfile?.first_name) {
        setchecklastname(true)
      }
      if (queryuserinfo?.data?.artistProfile?.organization) {
        setcheckorganiation(true)
      }
      setfirstname(queryuserinfo?.data?.artistProfile?.first_name)
      setlastname(queryuserinfo?.data?.artistProfile?.last_name)
      if (queryuserinfo?.data?.artistProfile?.gender) {
        setAdminGender(queryuserinfo?.data?.artistProfile?.gender)
      }
      if (queryuserinfo?.data?.artistProfile?.organization) {
        setorganiation(queryuserinfo?.data?.artistProfile?.organization)
      }
      if (queryuserinfo?.data?.artistProfile?.age) {
        setage(queryuserinfo?.data?.artistProfile?.age)
      }
      if (queryuserinfo?.data?.artistProfile?.city) {
        setcities(queryuserinfo?.data?.artistProfile?.city)
      }
      if (queryuserinfo?.data?.artistProfile?.description) {
        setdescription(queryuserinfo?.data?.artistProfile?.description)
        setcheckdescription(true)
      }
      if (!queryuserinfo?.data?.artistProfile?.email) {
        cookie.set("notverifieduser", "true", {
          expires: 600, // expires in 600 days
          path: "/", // available on all pages
          secure: true, // set secure flag (optional)
        })
      } else {
        cookie.remove("notverifieduser")
      }
      const hasCookie = cookie.get("viewedWelcomeMessage")
      if (hasCookie) {
        if (queryuserinfo?.data?.artistProfile?.last_name && queryuserinfo?.data?.artistProfile?.first_name) {
          setWelcome(false)
        } else {
          const hasCookiepopup = cookie.get("lastPopupTime")
          if (hasCookiepopup) {
            setWelcome(false)
          } else {
            if (queryuserinfo?.data?.artistProfile?.last_name && queryuserinfo?.data?.artistProfile?.first_name) {
              setWelcome(false)
            } else {
              setWelcome(true)
              cookie.set("lastPopupTime", "true", {
                expires: 1, // expires in 24 hrs
                path: "/", // available on all pages
                secure: true, // set secure flag (optional)
              })
            }
          }
        }
      } else {
        if (!queryuserinfo?.data?.artistProfile?.email) {
          setfirsttimepopup(true)
          cookie.set("viewedWelcomeMessage", "true", {
            expires: 365, // expires in 1 year
            path: "/", // available on all pages
            secure: true, // set secure flag (optional)
          })
        } else {
          const hasCookiepopup = cookie.get("lastPopupTime")
          if (hasCookiepopup) {
            setWelcome(false)
          } else {
            if (
              queryuserinfo?.data?.artistProfile?.last_name &&
              queryuserinfo?.data?.artistProfile?.first_name &&
              queryuserinfo?.data?.artistProfile?.email
            ) {
              setWelcome(false)
            } else {
              setWelcome(true)
              cookie.set("lastPopupTime", "true", {
                expires: 1, // expires in 24 hrs
                path: "/", // available on all pages
                secure: true, // set secure flag (optional)
              })
            }
          }
        }
        const maxAge = 60 * 60 * 24 * 365 // 1 year in seconds
      }
    }
  }, [queryuserdata.isSuccess])

  const mutateuserdata = useMutation({
    mutationKey: ["user-details"],
    mutationFn: UpdateUserProfileDetails,
  })

  const mutatemailsend = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: sendEmailVerification,
  })

  const mutatecontinueverification = useMutation({
    mutationKey: ["emailsend-verification"],
    mutationFn: continueEmailVerification,
  })

  const firstnamesubmit = (e: any) => {
    e.preventDefault()
    setfirstname(e.target.value)
    setriquired(false)
  }

  const lastnamesubmit = (e: any) => {
    e.preventDefault()
    setlastname(e.target.value)
    setriquired(false)
  }

  const agesubmit = (e: any) => {
    e.preventDefault()
    setage(e.target.value)
  }

  const organiationsubmit = (e: any) => {
    e.preventDefault()
    setorganiation(e.target.value)
  }

  const citysubmit = (selected: any) => {
    setcities(selected.value)
  }

  const emailsubmit = (e: any) => {
    e.preventDefault()
    setemail(e.target.value)
    setriquired(false)
  }

  const emailverificationsubmit = (e: any) => {
    e.preventDefault()
    setemailverivication(e.target.value)
    setriquired(false)
    setvaliditycheck(false)
    setemailexisted(false)
  }

  const Nextbuttonclick = (e: any) => {
    e.preventDefault()
    if (
      firstname != "" &&
      lastname != "" &&
      // email != "" &&
      firstname != undefined &&
      lastname != undefined &&
      // email != undefined &&
      firstname != null &&
      lastname != null
      // email != null &&
    ) {
      const datas = {
        data: {
          first_name: firstname,
          last_name: lastname,
          organization: organiation,
          gender: adminGender,
          // city: places,
          //age: age,
          // email: email,
        },
      }
      //console.log("datas", datas);
      mutateuserdata.mutate(datas, {
        onSuccess: (response) => {
          if (checkdescription) {
            setWelcome(false)
          } else {
            setWelcome(false)
            setPersonalisePopUp(true)
          }
        },
        onError: (error: any) => {
          console.error(error)
        },
      })
    } else {
      setriquired(true)
    }
  }

  const continuebuttonclick = (e: any) => {
    e.preventDefault()
    if (selectedOption != "" || selectedOption != null || selectedOption != undefined) {
      const datas = {
        data: {
          description: selectedRole,
        },
      }
      mutateuserdata.mutate(datas, {
        onSuccess: (response) => {
          setPersonalisePopUp(false)
        },
        onError: (error: any) => {
          console.error(error)
        },
      })
    } else {
      setriquired(true)
    }
  }

  const NextButtonEmailVerification = () => {
    const valid = /^\S+@\S+\.\S+$/.test(emailverivication)
    if (valid) {
      const data = {
        email: emailverivication,
      }
      mutatemailsend.mutate(data, {
        onSuccess: (response) => {
          setfirsttimepopup(false)
          setfirsttimepopup2(true)
        },
        onError: (error: any) => {
          console.error(error)
          setemailexisted(true)
        },
      })
    } else {
      setvaliditycheck(true)
    }
  }

  const continueToVerification = (e: any) => {
    setfirsttimepopup2(false)
  }

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is less than a certain threshold
      if (window.innerWidth < 600) {
        // Example threshold: 768px (common for mobile)
        setWelcome(false)
      } else {
        //setWelcome(true);
      }
    }
    // Call handleResize initially to set welcome state based on screen size
    handleResize()
    // Add event listener for window resize
    window.addEventListener("resize", handleResize)
    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    const storage = localStorage.getItem("token")
    if (storage) {
    } else {
      router.push("/apphome/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const queryuserinfo = useQuery({
    queryKey: ["user-details"],
    queryFn: getUserProfileData,
  })

  const { data: countries, isSuccess } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axios.get("https://restcountries.com/v3.1/all?fields=idd,cca2")
      return res.data
    },
  })

  const countriesOptions = countries?.map((country: any) => ({
    value: country.idd.root + country.idd.suffixes.join(""),
    label: country.cca2,
  }))

  useEffect(() => {
    if (isSuccess) {
      setCountryCode(countriesOptions.find((option: any) => option.label === "IN"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const countrySelectOnChangeHandler = (option: any) => {
    setCountryCode(option)
  }

  const handleInputGender = (selected: any) => {
    setAdminGender(selected.value)
  }

  const skipverification = () => {
    setfirsttimepopup(false)
    setfirsttimepopup2(false)
  }

  const backverification = () => {
    setfirsttimepopup(true)
    setfirsttimepopup2(false)
  }

  const closejoinworkspace = () => {
    seterrorjoinworkspace(false)
    setsuccessjoinworkspace(false)
    localStorage.removeItem("joinworkspace")
  }

  const { data: availableCredit } = useQuery({
    queryKey: ["dashboard-credit-change"],
    queryFn: () => {
      return getAvailableCredit(Number(localStorage.getItem("workspace_id")))
    },
  })

  useEffect(() => {
    if (availableCredit) {
      // Transform the data to the desired structure
      const transformedData = availableCredit.servicesRate.reduce((acc: any, service: any) => {
        acc[service.usageType] = {
          credits_generation: service.credits_generation,
          unit: service.unit,
        }
        return acc
      }, {})
      // Save to local storage
      localStorage.setItem("structuredCreditData", JSON.stringify(transformedData))
    }
  }, [availableCredit])

  const { isLoaded } = useJsApiLoader({
    //@ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API,
    libraries: ["places"],
  })

  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current)
      autocompleteInstance.addListener("place_changed", handlePlaceChanged)
      //@ts-ignore
      setAutocomplete(autocompleteInstance)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  const handlePlaceChanged = () => {
    if (autocomplete && inputRef.current) {
      //@ts-ignore
      const place = autocomplete.getPlace()
      const formattedAddress = place.formatted_address || "No address available"
      //@ts-ignore
      setPlaces((prevPlaces = []) => [...prevPlaces, formattedAddress])
      if (inputRef.current) {
        //@ts-ignore
        inputRef.current.value = ""
      }
    }
  }

  const removeItem = (indexToRemove: any) => {
    const newArray = places.filter((_, index) => index !== indexToRemove)
    setPlaces(newArray)
  }

  return (
    <>
      <div className="hidden md:block appHomeDesktop">
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-full bg-[#130828] flex flex-col relative">
            <TopBar title="" subTitle="" />

            {/* Fixed Banner Section */}
            <div className="sticky top-0 z-10 bg-[#130828] border-b border-[#23145A]">
              <div className="flex justify-between items-center w-full px-6 py-4 -mt-[50px]">
                <div className="w-full text-[#8297BD] text-[20px] md:text-[24px] font-bold text-center ml-52">
                  <div className="text-white flex justify-center text-2xl font-[700]">
                    {queryuserinfo.data?.artistProfile?.first_name
                      ? `Welcome to NYX, ${queryuserinfo.data?.artistProfile?.first_name}.`
                      : `Welcome to NYX.`}
                  </div>
                  <div className="text-white flex justify-center text-base font-[500] mt-3">
                    Let&apos;s start a new project to...
                  </div>
                </div>
                <div className={`flex items-center justify-end mr-[90px] mt-[-20px]`}>
                  <Link href={process.env.NEXT_PUBLIC_BASE_URL as string}>
                    <div className="w-[128px]">
                      <TAIL_BUTTON2 style="w-full" disable={false}>
                        Nyx.today
                      </TAIL_BUTTON2>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Scrollable Content Section */}
            <div className="flex-1 overflow-y-auto">
              <div className="w-full flex flex-wrap gap-3 justify-center mt-6 px-6">
                {NYX_PRODUCTS.map((item, index) => (
                  <Link
                    key={`product-${index + 1}`}
                    href={`/apphome/${workspacename}/${item.redirection}`}
                    className="relative w-[395px] custom-3xl-width  h-[230px] rounded-[10px] group bg-[#23145A] block overflow-hidden flex justify-center pt-[25px] card text-white"
                    {...(item.name === "Launch Multi-channel Campaigns" && {
                      onClick: resetCampaign,
                    })}
                    onClick={() => {
                      if (item.redirection == "agents") {
                        window.open(`/apphome/${workspacename}/agents#/ai-workflows`, "_self")
                      } else {
                        resetCampaign()
                      }
                    }}
                  >
                    <div className="bg-[#23145A] absolute right-5 top-5 w-[114px] h-[30px] text-[12px] flex items-center justify-center rounded chip">
                      {item.hoverTitle}
                    </div>
                    <div className="image">
                      <Image
                        src={`${IMAGE_URL}/assets/images/home/${item.image}`}
                        alt=""
                        height={184}
                        width={321}
                        className="product custom-image"
                      />
                      <div className="fade"></div>
                      <div className="text-[18px] font-medium  absolute top-[142px] leading-tight">
                        <div>{item.text_first}</div> {item.text_second}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-[50px] text-white hidden">
                <div className="w-full text-center text-[32px] font-bold">Your Recent Projects</div>
                <div className="mt-10 flex-wrap gap-x-[14px] w-full flex justify-center">
                  <div className="w-[292px] h-[187px] bg-[#3B226F] rounded-lg"></div>
                </div>
              </div>

              <div className="w-full mt-8 flex flex-col justify-center px-10 pb-10">
                <TAIL_TITLE
                  title={`Whats New at NYX?`}
                  style="text-white flex justify-center text-2xl font-[700]"
                ></TAIL_TITLE>
                <div className="w-full flex bg-[#23145A] rounded-[7px] mt-10">
                  <div className="w-1/2">
                    <img
                      src="\nyxdashboard.jpg"
                      alt="dashboardgradient"
                      className="w-full h-[347px] object-cover rounded-[7px]"
                    />
                  </div>
                  <div className="w-1/2 p-[55px] flex flex-col gap-4">
                    <div className="text-3xl font-[600] text-[#FFFFFF]">NYX Photorealism</div>
                    <div className="text-base font-[500] text-[#FFFFFF] leading-6 w-[85%]">
                      A state of the Art versatile GenAI pipeline that allows you to generate localized photorealistic
                      images in an instant.
                    </div>
                    <div className="w-full flex gap-2 mt-5">
                      <Link
                        href={`/apphome/${workspacename}/image-craft-ai/text-to-image`}
                        className="rounded-full w-[155px] font-semibold hover:bg-nyx-yellow hover:text-black text-nyx-yellow border-2 border-nyx-yellow text-center py-2"
                      >
                        Try it now
                      </Link>
                      {/* <Button className="rounded-full w-[155px] font-semibold text-black bg-nyx-yellow hover:shadow-none">
                        More Details
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden mobile_design px-[28px]  box_container">
        <div className="flex items-center justify-between pt-[16px] ">
          <div>
            <Image
              src={logo || "/placeholder.svg"}
              width={80}
              height={40}
              alt="NYX Logo"
              className="mx-auto"
              onClick={() => router.push(process.env.NEXT_PUBLIC_BASE_URL as string)}
            />
          </div>
          <span className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
            <Image
              src={queryuserdata?.data?.artistProfile?.profilePic || ""}
              alt="profile"
              width={60}
              height={60}
              className="rounded-full object-cover h-full w-full"
            />
          </span>
        </div>
        <div className="flex flex-col items-center justify-center w-[80%] mx-auto h-[208px] mt-[25.53px] bg-[#3B226F] rounded-[10px] ">
          <Image src={webappIcon || "/placeholder.svg"} width={73} height={58} alt="icon" className="mt-[20px]" />
          <p className="px-[14px] text-white text-center  leading-[22px] text-[14px] pt-[10px]">
            <strong>For the best experience,</strong> view our app on a larger screen.
          </p>
          <button
            onClick={() => router.push(process.env.NEXT_PUBLIC_BASE_URL as string)}
            className="py-[10px] px-[12px] text-sm font-normal text-white text-center underline"
          >
            Back to home
          </button>
        </div>
        <div className="my-10 text-2xl font-semibold flex flex-col justify-center text-center items-center text-white">
          <h3>Welcome to NYX,</h3>
          <h3>{firstname}</h3>
          <span className="text-lg mt-2 font-medium">Let&apos;s start a new project with...</span>
        </div>
        <div className="w-full flex flex-wrap gap-3 justify-center mt-6">
          {NYX_PRODUCTS.map((item, index) => (
            <figure
              key={index}
              className="relative w-[300px] h-[200px] rounded-xl group bg-[#23145A] flex overflow-hidden justify-center items-center text-white"
            >
              <div className="flex justify-center items-center">
                <Image
                  src={`${IMAGE_URL}/assets/images/home/${item.image}`}
                  alt=""
                  height={184}
                  width={321}
                  className="w-[72%] mb-12"
                />
                <div className="fade"></div>
                <div className="text-base font-medium  absolute bottom-4 leading-tight w-full px-4 ">
                  <div>{item.text_first}</div> {item.text_second}
                </div>
              </div>
            </figure>
          ))}
        </div>
        <br />
        <br />
      </div>

      {welcome ? (
        <Modal
          isOpen={welcome}
          style={welcomePopUpStyle}
        // onRequestClose={onLastClose}
        >
          <div className="w-[900px] h-auto p-6 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[31px] font-[600] text-[#FFF]">Welcome to NYX!</h2>
              <p className="text-center text-[18px] font-[400] text-[#FFF]">
                Yay! You&apos;ve successfully registered on NYX. Let&apos;s get started.
              </p>
            </div>
            <div className="w-full h-full flex flex-col px-10 gap-3">
              <div className="w-full flex gap-3">
                <div className="w-[90%] text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                  <p className="font-semibold py-2">
                    First Name <span className="text-nyx-red">*</span>
                  </p>
                  <input
                    type="text"
                    className={
                      riquired && (firstname === "" || firstname === undefined || firstname === null)
                        ? `w-full bg-transparent border border-[#ff4964] rounded-md p-2 font-normal`
                        : `w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal`
                    }
                    placeholder="John"
                    value={firstname}
                    onChange={firstnamesubmit}
                  />
                  {riquired && (firstname === "" || firstname === undefined || firstname === null) ? (
                    <p className="absolute text-[10px] text-[#ff4964] font-normal">Please fill Firstname</p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-[90%] text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                  <p className="font-semibold py-2">
                    Last Name <span className="text-nyx-red">*</span>
                  </p>
                  <input
                    type="text"
                    className={
                      riquired && (lastname === "" || lastname === undefined || lastname === null)
                        ? `w-full bg-transparent border border-[#ff4964] rounded-md p-2 font-normal`
                        : `w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal`
                    }
                    placeholder="Deo"
                    value={lastname}
                    onChange={lastnamesubmit}
                  />
                  {riquired && (lastname === "" || lastname === undefined || lastname === null) ? (
                    <p className="absolute text-[10px] text-[#ff4964] font-normal">Please fill Lastname</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="w-full flex gap-3">
                {/* <div className="w-[90%] text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                  <p className="font-semibold py-2">Email Address *</p>
                  <input
                    type="text"
                    className={
                      false
                        ? `w-full bg-transparent border border-[#ff4964] rounded-md p-2 font-normal`
                        : `w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal`
                    }
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={emailsubmit}
                    disabled={true}
                  />
                  {riquired && email === "" ? (
                    <p className="absolute text-[10px] text-[#ff4964] font-normal">
                      Please fill Email
                    </p>
                  ) : (
                    <></>
                  )}
                </div> */}
                <div className="w-full text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                  <p className="font-semibold py-2">Organisation</p>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="NYX"
                    value={organiation}
                    onChange={organiationsubmit}
                  />
                </div>
              </div>
              <div className="w-full flex gap-3">
                <div className="w-full text-left text-[#FFFFFF] font-semibold text-sm flex gap-3">
                  {/* <div className="w-full">
                    <p className="font-semibold py-2">Age</p>
                    <input
                      type="text"
                      className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                      placeholder="age"
                      value={age}
                      onChange={agesubmit}
                    />
                  </div> */}
                  <div className="w-full">
                    <p className="font-semibold py-2">Gender </p>
                    <Select
                      className="text-sm md:text-base"
                      options={gender}
                      // menuPlacement={"top"}
                      placeholder="Select"
                      styles={welcomePopupStyles}
                      value={gender.find((option) => option?.value === adminGender)}
                      onChange={handleInputGender}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </div>
                </div>
                {/* <div className="w-[90%] text-left text-[#FFFFFF] font-semibold gap-2 text-sm">
                  <p className="font-semibold py-2">City</p>
                  <Select
                    className="text-sm md:text-base"
                    options={city}
                    placeholder="Select Region"
                    styles={welcomePopupStyles}
                    value={city.find((option) => option?.value === cities)}
                    onChange={citysubmit}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                  {isLoaded && (
                    <div>
                      <Autocomplete
                        //@ts-ignore
                        onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                        onPlaceChanged={handlePlaceChanged}
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          className={`placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF]`}
                          placeholder="Enter a location"
                        />
                      </Autocomplete>
                      <div className="flex flex-wrap mt-2 gap-3">
                        {Array.isArray(places) &&
                          places.map((item, index) => (
                            <>
                              <div className="w-[140px] rounded-md flex justify-center items-center bg-nyx-sky text-white">
                                <div className="relative group">
                                  <div className="tooltip-container">
                                    <p className="tooltips text-white  font-normal w-[140px] z-[9] text-[14px] absolute bg-black p-1 rounded-[10px]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      {item}
                                    </p>
                                  </div>
                                  <p className="w-[110px] truncate cursor-pointer z-[7] tooltip-trigger text-[14px]">
                                    {item}
                                  </p>
                                </div>
                                <div
                                  className="text-[#FFFFFF] hover:text-nyx-yellow cursor-pointer text-[14px]"
                                  onClick={() => removeItem(index)}
                                >
                                  x
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
            <div className="flex justify-center items-center gap-14 mt-10">
              <button
                className="text-[#FFFFFF] hover:text-nyx-yellow underline font-[400] text-[14px]"
                onClick={() => {
                  setWelcome(false)
                }}
              >
                I will fill later
              </button>
              <Button
                className="rounded-full w-[150px] hover:shadow-none font-semibold py-[6px]"
                onClick={Nextbuttonclick}
              >
                Next
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      {/* Expertise/What describes you best popup screen starts*/}
      {personalisePopUp ? (
        <Modal
          isOpen={personalisePopUp}
          style={welcomePopUpStyle}
        // onRequestClose={onLastClose}
        >
          <div className="w-[900px] h-auto p-6 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-left text-[31px] font-[600] text-[#FFF]">
                Tell us about yourself, and we&apos;ll personalise your experience.
              </h2>
              <p className="text-left text-[18px] font-[400] text-[#FFF]">What describes you best?</p>
            </div>
            <div className="w-full h-full">
              <div className="flex flex-wrap gap-5 justify-center">
                {roles.map((role, index) => {
                  const rowIndex = Math.floor(index / 5)
                  return (
                    <div key={index} className="flex flex-col items-center ">
                      <div
                        className={`flex w-[75px] h-[75px] justify-center items-center ${selectedRole === role.title
                            ? "w-[75px] h-[75px] border rounded-[6px] m-3 bg-[#FFC01D] border-[#FFC01D] cursor-pointer"
                            : "w-[75px] h-[75px] border border-white rounded-[6px] m-3 cursor-pointer"
                          }`}
                        onClick={() => setSelectedRole(role.title)}
                      >
                        <div
                          className={`svg-icon ${selectedRole === role.title ? "filter invert" : ""}`}
                          style={{
                            fill: selectedRole === role.title ? "black" : "black",
                          }}
                        >
                          <Image src={role.icon || "/placeholder.svg"} alt={role.title} width={50} height={50} />
                        </div>
                      </div>
                      <p
                        className={` ${selectedRole === role.title ? "text-[12px] text-[#FFC01D] absolute mt-[95px]" : "text-[12px] font-light text-white absolute mt-[95px]"}`}
                      >
                        {role.title}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-center items-center gap-14 mt-10">
              <button
                className="text-[#FFFFFF] hover:text-nyx-yellow underline font-[400] text-[14px]"
                onClick={() => {
                  setPersonalisePopUp(false)
                }}
              >
                skip
              </button>
              <Button
                className="rounded-full w-[150px] hover:shadow-none font-semibold py-[6px]"
                onClick={continuebuttonclick}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
      {/* Expertise/What describes you best popup screen ends*/}

      {workspacePopUp ? (
        <Modal
          isOpen={workspacePopUp}
          style={welcomePopUpStyle}
        // onRequestClose={onLastClose}
        >
          <div className="w-[900px] h-[596px] p-10 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-left text-[31px] font-[600] text-[#FFF]">
                Your first workspace is created. What would you like to call it??
              </h2>
            </div>
            <div className="w-full h-full flex flex-col">
              <p className="font-semibold py-2 text-[#FFFFFF]">Workspace Name</p>
              <input
                type="text"
                className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                placeholder="Workspace 1"
              //value={brandName}
              //onChange={handleInputBrandName}
              />
            </div>
            <div className="flex justify-center items-center gap-14 mb-10">
              <button
                className="text-[#FFFFFF] underline font-[400] text-[14px]"
                onClick={() => setWorkspacePopUp(false)}
              >
                Skip
              </button>
              <Button
                className="rounded-full w-[259px] hover:shadow-none font-semibold py-[6px]"
                onClick={() => setWorkspacePopUp(false)}
              >
                Create Workspace
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      {/* notification for Landscape Pop up */}
      <LandscapePopup />

      {firsttimepopup ? (
        <Modal
          isOpen={firsttimepopup}
          style={onetimeemailverification}
        // onRequestClose={onLastClose}
        >
          <div className="w-[550px] h-auto p-6 flex flex-col gap-5 rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[31px] font-[600] text-[#FFF]">Welcome to NYX!</h2>
              <p className="text-center text-[14px] font-[400] text-[#FFF]">
                Yay! You&apos;ve successfully registered on NYX. Let&apos;s get started.
              </p>
            </div>
            <div className="w-full h-full flex flex-col mt-3">
              <p className="text-white flex justify-center items-center text-[12px]">
                Use your organization email for extra rewards.
              </p>
              <p className="font-semibold py-2 mb-1 text-[14px] text-[#FFFFFF] flex justify-center items-center">
                Please enter your email Id
              </p>
              <input
                type="text"
                className="w-full bg-transparent border text-white border-[#8297BD] text-[14px] rounded-md p-2 font-normal "
                placeholder="email@gmail.com"
                value={emailverivication}
                onChange={emailverificationsubmit}
              />
              {validitycheck && (
                <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">Please enter valid Email Address</p>
              )}
              {emailexisted && (
                <p className="text-[10px] mb-[-14px] mt-[6px] text-[#e24545] ">Email Address is already in use</p>
              )}
            </div>
            <p className="font-thin text-[14px] text-[#FFFFFF] flex justify-center items-center">
              Email Verification is mandatory for using
            </p>
            <p className="font-thin text-[14px] mt-[-16px] text-[#FFFFFF] flex justify-center items-center">
              NYX products and accessing Workspace
            </p>
            <div className="flex justify-center items-center gap-6">
              {/* <button
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
              </button> */}
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={skipverification}
              >
                Skip
              </Button>
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={NextButtonEmailVerification}
              >
                Verify
              </Button>
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
          <div className="w-[550px] h-auto p-6 flex flex-col gap-5 rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[31px] font-[600] mt-14 mb-8 text-[#FFF]">Thank you</h2>
              <p className="font-semibold  text-[14px] text-[#FFFFFF] flex justify-center items-center">
                A verification mail has been sent to your mail box.
              </p>
              <p className="font-semibold mb-2 mt-[-5px] text-[14px] text-[#FFFFFF] flex justify-center items-center">
                Kindly click on the given link
              </p>
            </div>
            <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
              {/* <button
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
              </button> */}
              {/* <button
                type="submit"
                className={
                  false
                    ? `cursor-not-allowed bg-gradient-to-r from-[#B631B1] to-[#7048D7] text-white w-[110px] h-[34px] text-[14px] rounded-[30px] shadow-none hover:shadow-none `
                    : ` cursor-pointer bg-gradient-to-r from-[#B631B1] to-[#7048D7] shadow shadow-blue-500/40 hover:shadow-buttonShadow buttonShadowTransition text-white w-[110px] h-[34px] text-[14px] rounded-[30px]  hover:shadow-color-purple focus:outline-white`
                }
                onClick={continueToVerification}
              >
                Continue
              </button> */}
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={backverification}
              >
                Back
              </Button>
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={continueToVerification}
              >
                Continue
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      {successjoinworkspace ? (
        <Modal
          isOpen={successjoinworkspace}
          style={onetimeemailverification2}
        // onRequestClose={onLastClose}
        >
          <div className="w-[300px] sm:w-[550px] h-[400px] p-3 sm:p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[24px] font-[600] mt-8 mb-4 text-[#FFF]">
                You have successfully joined the WorkSpace !
              </h2>
              <div className="flex mt-1 mb-1 justify-center items-center">
                <DemoFormSuccess />
              </div>
            </div>
            <div className="flex justify-center items-center gap-6 mb-10 mt-[8px]">
              <button
                className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
                onClick={closejoinworkspace}
              >
                <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                  <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
                    <div className="text-[14px] font-normal text-white ">Continue</div>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </Modal>
      ) : null}

      {errorjoinworkspace ? (
        <Modal
          isOpen={errorjoinworkspace}
          style={onetimeemailverification2}
        // onRequestClose={onLastClose}
        >
          <div className="w-[300px] sm:w-[500px] h-[400px] p-3 sm:p-10 flex flex-col gap-5 bg-[#281B37] rounded-[15px]">
            <div className="w-full flex flex-col gap-3">
              <h2 className="text-center text-[24px] font-[600] mt-14 mb-8 text-[#fff]">Failed to join WorkSpace</h2>
              <p className="font-thin text-[14px] mt-[-16px] text-[#FFFFFF] flex justify-center items-center">
                Please Try Again
              </p>
            </div>
            {ValueBeforeWith && (
              <p className="text-[14px] text-[#ffffff] md:text-[18px] font-[600] mt-1 mb-[10px] md:mt-2 md:mb-[10px] text-center ">
                please login with <span className=" text-[#85ff97] text-[12px] md:text-[16px]">{ValueafterWith}</span>
              </p>
            )}
            {invitationnotfound && (
              <p className="text-[14px] text-[#ffffff] md:text-[18px] font-[600] mt-1 mb-[10px] md:mt-2 md:mb-[10px] text-center ">
                Invitation not found !
              </p>
            )}
            <div className="flex justify-center items-center gap-6 mb-10 mt-[16px]">
              <button
                className=" navbutton  px-[0.8px] py-[0.5px] rounded-full h-[34px]  bg-gradient-to-r from-[#B631B1] to-[#7048D7] bg-clip-border hover:font-semibold"
                onClick={closejoinworkspace}
              >
                <div className="p-[1.5px]  md:h-[38px] rounded-full bg-gradient-to-r h-[38px] from-[#B631B1] to-[#7048D7] bg-clip-border w-full ">
                  <span className="flex w-[110px] h-[34px] py-2 items-center justify-center rounded-full bg-[#281B37] hover:bg-[#2F2546] back ">
                    <div className="text-[14px] font-normal text-white ">Continue</div>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  )
}

export default BrandVisionAI
