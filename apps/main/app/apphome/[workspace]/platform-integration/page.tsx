/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import classNames from "@nyx-frontend/main/utils/classNames";
import Profileicon from "@nyx-frontend/main/components/Profileicon";
import Sidebar from "@nyx-frontend/main/components/Sidebar";
import TopBar from "@nyx-frontend/main/components/TopBar";
import { useRouter } from "next/navigation";
import { getbrandWorkspaceService } from "@nyx-frontend/main/services/brandService";
import {
  GoogleAdService,
  LinkedInService,
  MetaService,
  AdService,
  ShopifyService,
  DeleteService,
  GmcAccounts,
  CheckGmc,
  Default,
  GAService,
} from "@nyx-frontend/main/services/plateformService";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  login_popup_Style,
  shopify_pop_up,
} from "@nyx-frontend/main/utils/modalstyles";
import Modal from "react-modal";
import CrossIcon from "@nyx-frontend/main/components/Icons/CrossSVGIcon";
import Button from "@nyx-frontend/main/components/Button";
import AdLoading from "./components/AdLoading";
import BranchPopup from "./components/BranchPopup";
import CleverTapPopup from "./components/CleverTapPopup";
import "react-toastify/dist/ReactToastify.css";
import GmcFlow from "./components/GmcFlow";
import MoengagePopup from "./components/MoengagePopup";

const tabs = [
  {
    name: "GOOGLE",
    svg: (
      <svg
        width="22"
        height="20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.228.009a3.612 3.612 0 0 0-2.076.489 3.649 3.649 0 0 0-1.347 4.99l7.326 12.676c1.008 1.756 3.243 2.335 5 1.337 1.746-.998 2.325-3.244 1.327-4.99L14.153 1.835A3.694 3.694 0 0 0 11.227.01Zm-5.42 5.28L.5 14.51A3.663 3.663 0 0 0 0 16.337 3.663 3.663 0 0 0 3.663 20a3.663 3.663 0 0 0 3.164-1.836v.01l3.154-5.47c-1.348-2.295-2.725-4.58-3.963-6.946a2.76 2.76 0 0 1-.2-.47h-.01Z"
          fill="#fff"
        />
      </svg>
    ),
    content: (
      <div className="">
        <button className="w-[190px] h-[37px] flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D] border-[#FFC01D] hover:bg-[#FFC01D] border-solid cursor-pointer hover:text-black">
          Add Account
        </button>
      </div>
    ),
  },
  {
    name: "LINKEDIN",
    svg: (
      <svg
        width="20"
        height="20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.778 0A2.222 2.222 0 0 1 20 2.222v15.556A2.222 2.222 0 0 1 17.778 20H2.222A2.222 2.222 0 0 1 0 17.778V2.222A2.222 2.222 0 0 1 2.222 0h15.556Zm-.556 17.222v-5.889A3.622 3.622 0 0 0 13.6 7.711c-.944 0-2.044.578-2.578 1.445V7.922h-3.1v9.3h3.1v-5.478a1.55 1.55 0 0 1 1.545-1.555 1.556 1.556 0 0 1 1.555 1.555v5.478h3.1ZM4.312 6.178A1.867 1.867 0 0 0 6.177 4.31 1.873 1.873 0 0 0 4.31 2.433a1.878 1.878 0 0 0-1.878 1.878c0 1.033.845 1.867 1.878 1.867Zm1.544 11.044v-9.3H2.778v9.3h3.078Z"
          fill="#fff"
        />
      </svg>
    ),
    content: (
      <div className="">
        <button className="w-[190px] h-[37px] flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D] border-[#FFC01D] hover:bg-[#FFC01D] border-solid cursor-pointer hover:text-black">
          Add Account
        </button>
      </div>
    ),
  },
  {
    name: "META",
    svg: (
      <svg
        width="22"
        height="15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.476 5.522C13.345 2.507 14.985 1 16.396 1c2.116 0 3.452 2.398 4.232 5.651.745 3.11.53 7.349-2.116 7.349-1.18 0-2.802-1.696-4.391-3.956a30.088 30.088 0 0 1-2.645-4.522Zm0 0C9.42 2.507 7.616 1 6.066 1c-2.33 0-3.799 2.398-4.658 5.651C.59 9.761.828 14 3.738 14c1.297 0 3.083-1.696 4.829-3.956 1.163-1.508 2.133-3.016 2.91-4.522Z"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    content: (
      <div className="">
        <button className="w-[190px] h-[37px] flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D] border-[#FFC01D] hover:bg-[#FFC01D] border-solid cursor-pointer hover:text-black">
          Add Account
        </button>
      </div>
    ),
  },
  {
    name: "SHOPIFY",
    svg: (
      <svg
        width="18"
        height="20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.131 2.334s-.224.066-.604.189a4.252 4.252 0 0 0-.29-.7C10.812 1.012 10.186.589 9.425.578c-.056 0-.1 0-.156.011-.023-.022-.045-.055-.067-.077C8.877.156 8.452-.011 7.949 0 6.977.034 6.004.734 5.21 1.978c-.559.878-.973 1.978-1.096 2.822-1.118.345-1.9.59-1.923.59-.57.177-.581.2-.66.721C1.477 6.511 0 17.89 0 17.89L12.276 20V2.312a.499.499 0 0 0-.145.022Zm-2.84.878c-.648.2-1.364.422-2.068.633.201-.767.581-1.522 1.05-2.022.18-.19.414-.39.705-.511.268.566.324 1.355.313 1.9ZM7.961.645c.223 0 .425.044.592.155-.268.134-.514.334-.76.59-.615.655-1.096 1.688-1.286 2.677-.592.178-1.163.356-1.7.522C5.144 3.023 6.463.69 7.962.645ZM6.06 9.522c.067 1.034 2.817 1.267 2.974 3.7.123 1.912-1.017 3.223-2.672 3.322-1.968.123-3.064-1.033-3.064-1.033l.414-1.766s1.096.822 1.968.766c.57-.033.771-.5.76-.822-.09-1.355-2.326-1.278-2.46-3.5-.123-1.878 1.118-3.766 3.846-3.944 1.063-.067 1.6.2 1.6.2l-.627 2.322s-.693-.311-1.52-.267c-1.208.078-1.23.834-1.22 1.022Zm3.88-6.51c-.012-.49-.067-1.178-.302-1.767.738.144 1.107.967 1.263 1.467l-.961.3Zm2.739 16.944 5.098-1.256S15.586 3.967 15.575 3.867c-.011-.1-.1-.155-.18-.167-.077-.01-1.509-.033-1.509-.033L12.68 2.5v17.456Z"
          fill="#fff"
        />
      </svg>
    ),
    content: (
      <div className="">
        <button className="w-[190px] h-[37px] flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D] border-[#FFC01D] hover:bg-[#FFC01D] border-solid cursor-pointer hover:text-black">
          Add Account
        </button>
      </div>
    ),
  },
  {
    name: "CLEVERTAP",
    svg: (
      <svg
        width="21"
        height="21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="a" fill="#fff">
          <path d="M16.195 18.327c.267.367.187.882-.199 1.12a10.502 10.502 0 0 1-14.152-3.004 10.5 10.5 0 0 1 2.28-14.286c.36-.275.87-.164 1.117.216.246.38.134.886-.222 1.166a8.86 8.86 0 0 0 10.009 14.576c.39-.231.9-.154 1.167.212Z" />
        </mask>
        <path
          d="M16.195 18.327c.267.367.187.882-.199 1.12a10.502 10.502 0 0 1-14.152-3.004 10.5 10.5 0 0 1 2.28-14.286c.36-.275.87-.164 1.117.216.246.38.134.886-.222 1.166a8.86 8.86 0 0 0 10.009 14.576c.39-.231.9-.154 1.167.212Z"
          stroke="#fff"
          strokeWidth="2"
          mask="url(#a)"
        />
        <circle cx="18" cy="17" r="1" fill="#fff" />
      </svg>
    ),
    content: (
      <div className="">
        <button className="w-[190px] h-[37px] flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D] border-[#FFC01D] hover:bg-[#FFC01D] border-solid cursor-pointer hover:text-black">
          Add Account
        </button>
      </div>
    ),
  },
  {
    name: "MOENGAGE",
    svg: (
      <svg
        width="19"
        height="19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9.5" cy="9.5" r="9.5" fill="#fff" />
        <path
          d="M14 8.967c0 2.75-2.015 4.978-4.5 4.978S5 11.716 5 8.967c0-2.75 2-5.022 4.5-5.022 3 0 4.5 2.272 4.5 5.022Z"
          fill="#3B226F"
        />
        <path
          d="M2.771 16.624s3.167-3.167 6.73-3.167c3.562 0 7.125 2.77 7.125 2.77"
          stroke="#3B226F"
          strokeWidth="2"
        />
      </svg>
    ),
    content: (
      <div className="">
        <button className="w-[190px] h-[37px] flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D] border-[#FFC01D] hover:bg-[#FFC01D] border-solid cursor-pointer hover:text-black">
          Add Account
        </button>
      </div>
    ),
  },
  {
    name: "GOOGLE_ANALYTICS",
    svg: (
      <svg
        width="18"
        height="20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 2.39v15c0 1.67 1.14 2.61 2.39 2.61 1.14 0 2.39-.79 2.39-2.61V2.5c0-1.54-1.14-2.5-2.39-2.5-1.25 0-2.39 1.06-2.39 2.39ZM6.25 10v7.39c0 1.68 1.16 2.61 2.39 2.61 1.14 0 2.39-.79 2.39-2.61v-7.28c0-1.54-1.14-2.5-2.39-2.5-1.25 0-2.39 1.06-2.39 2.39Zm-3.86 5.23c1.32 0 2.39 1.07 2.39 2.38a2.39 2.39 0 1 1-4.78 0c0-1.31 1.07-2.38 2.39-2.38Z"
          fill="#fff"
        />
      </svg>
    ),
    content: (
      <div className="">
        <button className="w-[190px] h-[37px] flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D] border-[#FFC01D] hover:bg-[#FFC01D] border-solid cursor-pointer hover:text-black">
          Add Account
        </button>
      </div>
    ),
  },
  {
    name: "BRANCH",
    svg: (
      <svg
        width="23"
        height="23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23 11.5C23 5.157 17.841 0 11.5 0 5.16 0 0 5.157 0 11.5c0 5.992 4.607 10.927 10.464 11.452h.028c.096.008.193.016.29.022l.055.003c.088.005.176.01.266.012h.07c.11 0 .218.005.328.005.11 0 .208 0 .311-.005h.044c.091-.002.182-.006.273-.01h.018c.204-.012.407-.029.608-.051C18.507 22.304 23 17.417 23 11.5ZM12.716 21.834l-.11-3.181 2.777-1.704a2.094 2.094 0 0 0 3.277-1.788 2.119 2.119 0 0 0-2.032-2.031 2.081 2.081 0 0 0-2.127 2.424l-1.96 1.213-.143-4.008 2.734-1.672a2.464 2.464 0 1 0-.918-1.382l-1.881 1.168-.112-3.198a2.24 2.24 0 1 0-1.614 0l-.203 6.626-2.048-1.305a2.436 2.436 0 0 0-.184-1.662c-.41-.851-1.236-1.456-2.177-1.515a2.596 2.596 0 1 0 1.495 4.583l2.855 1.806-.172 5.613c-5.112-.652-9.082-5.032-9.082-10.321.004-5.737 4.672-10.406 10.41-10.406 5.737 0 10.405 4.667 10.405 10.405 0 5.327-4.024 9.73-9.19 10.335Z"
          fill="#fff"
        />
      </svg>
    ),
    content: (
      <div className="">
        <button className="w-[190px] h-[37px] flex justify-center items-center gap-3 font-semibold rounded-[30px] border-2 text-[#FFC01D] border-[#FFC01D] hover:bg-[#FFC01D] border-solid cursor-pointer hover:text-black">
          Add Account
        </button>
      </div>
    ),
  },
];
const DELETE_ICON = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
      fill="white"
    />
      
  </svg>
);

const Page = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Ad Platforms");
  const [allAds, setAllAds] = useState([]);
  const [workspacename, setWorkspacename] = useState<any>("");
  const [brandId, setBrandId] = useState<any>(null);
  const [expandHandler, setExpandHandler] = useState<any>(null);
  const [missing, setMissing] = useState<any>([]);
  const [shopifyPopup, setShopifyPopup] = useState<boolean>(false);
  const [cleverTapPopup, setCleverTapPopup] = useState<boolean>(false);
  const [moengagePopup, setMoengagePopup] = useState<boolean>(false);
  const [storeURL, setStoreURL] = useState<string>("");
  const [onboardPopup, setOnboardPopup] = useState<boolean>(false);
  const [gmcLinked, setGmcLinked] = useState<boolean>(false);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [deleteAd, setDeleteAd] = useState<any>();
  const [branchPopup, setBranchPopup] = useState<boolean>(false);

  const { data: brandDetails, isPending: brandPending } = useQuery({
    queryKey: ["get-brands"],
    queryFn: async () => {
      const res = await getbrandWorkspaceService(
        localStorage.getItem("workspace_id")
      );
      return res;
    },
  });

  useEffect(() => {
    if (brandDetails?.length > 0) {
      setBrandId(brandDetails[0]?.id);
    } else {
      setBrandId(null);
    }
  }, [brandDetails]);

  useEffect(() => {
    const work = localStorage.getItem("workspace_name");
    setWorkspacename(work);
  }, []);

  const {
    data,
    refetch: adRefetch,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["All adds"],
    queryFn: async () => {
      const storage = localStorage.getItem("workspace_id");
      //@ts-ignore
      const res = await AdService(storage);
      return res;
    },
  });

  const {
    data: gmcdata,
    isPending: gmcPending,
    isError: gmcError,
    isSuccess: gmcSuccess,
  } = useQuery({
    queryKey: [`Gmc-Accounts${brandId}`],
    queryFn: async () => {
      const storage = Number(localStorage.getItem("workspace_id"));
      const res = await CheckGmc({
        workspace_id: storage,
        brand_id: brandId,
      });
      setGmcLinked(true);
      return res;
    },
    enabled: !!brandId,
  });

  const filterAdsByPlatform = (data: any, selectedTab: string) => {
    const platforms =
      selectedTab === "Ad Platforms"
        ? ["GOOGLE", "LINKEDIN", "META"]
        : ["SHOPIFY", "CLEVERTAP", "MOENGAGE", "GOOGLE_ANALYTICS", "BRANCH"];
    return data.filter((item: { ad_platform: string }) =>
      platforms.includes(item.ad_platform)
    );
  };

  useEffect(() => {
    if (isSuccess) {
      const filteredAds = filterAdsByPlatform(data, selectedTab);
      setAllAds(filteredAds);

      const platformsForTab =
        selectedTab === "Ad Platforms"
          ? ["GOOGLE", "LINKEDIN", "META"]
          : ["SHOPIFY", "CLEVERTAP", "MOENGAGE", "GOOGLE_ANALYTICS", "BRANCH"];

      setMissing(
        tabs
          .filter(
            (tab) =>
              platformsForTab.includes(tab.name) &&
              !data.some((ad: any) => ad.ad_platform === tab.name)
          )
          .map((tab) => ({
            name: tab.name,
            svg: tab.svg,
            content: tab.content,
          }))
      );
    }
  }, [isSuccess, data, tabs, selectedTab]);

  useEffect(() => {
    if (isSuccess) {
      const filteredAds = filterAdsByPlatform(data, selectedTab);
      setAllAds(filteredAds);

      // Update missing for the current selected tab, including SVG
      const platformsForTab =
        selectedTab === "Ad Platforms"
          ? ["GOOGLE", "LINKEDIN", "META"]
          : ["SHOPIFY", "CLEVERTAP", "MOENGAGE", "GOOGLE_ANALYTICS", "BRANCH"];

      setMissing(
        tabs
          .filter(
            (tab) =>
              platformsForTab.includes(tab.name) &&
              !data.some((ad: any) => ad.ad_platform === tab.name)
          )
          .map((tab) => ({
            name: tab.name,
            svg: tab.svg,
            content: tab.content,
          }))
      );
    }
  }, [isSuccess, data, selectedTab, tabs]);

  const mutateDefault = useMutation({
    mutationKey: ["Default-Ad"],
    mutationFn: Default,
  });

  const mutateGoogleaAd = useMutation({
    mutationKey: ["Google-Ad"],
    mutationFn: GoogleAdService,
  });
  const mutateLinkedInAD = useMutation({
    mutationKey: ["Linkedin-Ad"],
    mutationFn: LinkedInService,
  });
  const mutateMetaAd = useMutation({
    mutationKey: ["Meta-Ad"],
    mutationFn: MetaService,
  });
  const mutateShopifyAd = useMutation({
    mutationKey: ["Shopify-Ad"],
    mutationFn: ShopifyService,
  });
  const mutateGAAd = useMutation({
    mutationKey: ["GA-Ad"],
    mutationFn: GAService,
  });

  const mutateDelete = useMutation({
    mutationKey: ["Delete-Ad"],
    mutationFn: DeleteService,
  });

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setSelectedTab(tabName);
  };

  const AddAccountClick = (platform: string) => {
    if (!brandId) {
      setOnboardPopup(true);
      return;
    }

    const work = localStorage.getItem("workspace_id");
    const WorkSpace = work ? parseInt(work, 10) : work;

    const data = {
      workspace_id: WorkSpace,
      brand_id: brandId,
    };

    const openPopup = (authUrl: string) => {
      window.open(
        authUrl,
        "_blank",
        "popup,width=900,height=600,left=200,top=100"
      );
    };

    const handleMutation = (mutateFn: any) => {
      mutateFn.mutate(data, {
        onSuccess: (response: any) => {
          console.log("response:", response.authUrl);
          openPopup(response.authUrl);
        },
        onError: (error: any) => {
          console.error(error);
        },
      });
    };

    switch (platform) {
      case "GOOGLE":
        handleMutation(mutateGoogleaAd);
        break;
      case "LINKEDIN":
        handleMutation(mutateLinkedInAD);
        break;
      case "META":
        handleMutation(mutateMetaAd);
        break;
      case "GOOGLE_ANALYTICS":
        handleMutation(mutateGAAd);
        break;
      case "SHOPIFY":
        setShopifyPopup(true);
        break;
      case "CLEVERTAP":
        setCleverTapPopup(true);
        break;
      case "MOENGAGE":
        setMoengagePopup(true);
        break;
      case "BRANCH":
        setBranchPopup(true);
        break;
      default:
        console.error("Invalid platform:", platform);
    }
  };

  const DeleteIconClick = () => {
    const platforms = [
      "META",
      "GOOGLE",
      "LINKEDIN",
      "SHOPIFY",
      "MOENGAGE",
      "CLEVERTAP",
      "GOOGLE_ANALYTICS",
      "BRANCH",
    ];

    if (platforms.includes(deleteAd.ad_platform)) {
      const work = localStorage.getItem("workspace_id");
      const WorkSpace = work ? parseInt(work, 10) : work;
      const data = {
        workspace_id: WorkSpace,
        tokenRecord_id: deleteAd.id,
      };

      console.log(data);

      mutateDelete.mutate(data, {
        onSuccess: (response: any) => {
          //@ts-ignore
          setAllAds(response);
          setDeletePopup(false);
          adRefetch();
        },
        onError: (error: any) => {
          console.error(error);
        },
      });
    } else {
      console.error("Invalid platform:", deleteAd.ad_platform);
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

  function formatDate(isoString: any) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(isoString);
    //@ts-ignore
    return date.toLocaleDateString(undefined, options);
  }

  const handleExpand = (item: any) => {
    if (expandHandler !== item) setExpandHandler(item);
    else setExpandHandler("");
  };

  const handleClickShopify = () => {
    const work = localStorage.getItem("workspace_id");
    const WorkSpace = work ? parseInt(work, 10) : work;
    let data = {
      workspace_id: WorkSpace,
      storeName: storeURL,
    };

    mutateShopifyAd.mutate(data, {
      onSuccess: (response) => {
        console.log("response shopify:", response.authUrl);
        window.open(
          response.authUrl,
          "_blank",
          "popup,width=900,height=600,left=200,top=100"
        );
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleDefault = (userRecordId: any, accountRecordId: any) => {
    const storage = Number(localStorage.getItem("workspace_id"));
    const accountId = Number(accountRecordId);
    const payload = {
      userRecordId,
      accountRecordId: accountId,
      brandId,
      workspaceId: storage,
    };
    mutateDefault.mutate(payload, {
      onSuccess: (response) => {
        console.log("succes");

        adRefetch();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const handleOnboarding = () => {
    router.push(
      `/apphome/${localStorage.getItem("workspace_name")}/onboarding-new`
    );
  };

  function toPascalCase(str: string) {
    // Handle the special case for "linkedin"
    if (str.toLowerCase() === "linkedin") {
      return "LinkedIn";
    }

    // General transformation logic
    return str
      .split(/[\s_-]/) // Split the string by spaces, underscores, or hyphens
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter of each word
      )
      .join(" "); // Join the words back together
  }

  return (
    <>
     <div className="justify-start flex w-full bg-[#130828]">
        <Sidebar />
        <div className="w-full overflow-hidden overflow-y-auto h-[100vh]">
          <TopBar title="Social Media Ad Platform Integration" subTitle="Link your external accounts here for streamlined sharing of your creations on these platforms or to gather insightful data for optimization purposes." />

          <div className="w-full px-4 mt-16">
            <hr className="border-t border-gray-300 my-4" />
            <div className="flex gap-4 w-fit border-b-[2px] border-[#FFFFFF] border-opacity-20 pr-2 ">
              <div
                key={tabs[0].name}
                className={`relative  pb-2 cursor-pointer text-center transition-all ${{
                  "text-[#3B226F] font-semibold":
                    selectedTab === "Ad Platforms",
                  "text-gray-500": selectedTab !== "Ad Platforms",
                }}`}
                onClick={() => handleTabClick("Ad Platforms")}
              >
                <span
                  className={` ${
                    selectedTab == "Ad Platforms"
                      ? " text-[#FFC01D] text-base font-bold"
                      : "text-white text-base"
                  } `}
                >
                  Ad Platforms
                </span>
                {selectedTab === "Ad Platforms" && (
                  <div className="absolute bottom-[-3px] left-0 w-[calc(100%+10px)] rounded-sm h-[5px] bg-[#FFD700]"></div>
                )}
              </div>

              <div
                key={tabs[1].name}
                className={`relative  pb-2 cursor-pointer text-center transition-all ${{
                  "text-[#3B226F] font-semibold": selectedTab === "Analytics",
                  "text-gray-500": selectedTab !== "Analytics",
                }}`}
                onClick={() => handleTabClick("Analytics")}
              >
                <span
                  className={` ${
                    selectedTab == "Analytics"
                      ? " text-[#FFC01D] text-base font-bold"
                      : "text-white"
                  } `}
                >
                  Analytics Platform
                </span>
                {selectedTab === "Analytics" && (
                  <div className="absolute bottom-[-3px] left-[-10px] w-[calc(100%+20px)] rounded-sm h-[5px] bg-[#FFD700]"></div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-y-2 mt-3">
              {!isLoading &&
                missing.map((item: any, index: number) => {
                  return (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center  w-full h-auto  gap-4 mt-4 rounded-xl "
                    >
                      <div className="bg-[#332270] flex  p-6 gap-4 rounded-xl w-full">
                        <div className="text-white mt-[5px] ">{item.svg}</div>
                        <div className="">
                          <div className="text-white text-[20px]  font-bold mb-3">
                            {toPascalCase(item.name)}
                          </div>
                          <div onClick={() => AddAccountClick(item.name)}>
                            {item.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {tabs?.map((tab, index) => (
                <>
                  {allAds?.map(
                    (item: any, index: number) =>
                      item.ad_platform === tab.name && (
                        <div
                          className="flex flex-col gap-y-4 w-full mt-4"
                          key={`${tab.name}-${item.id}`}
                        >
                          <div className="relative flex text-white bg-[#332270] gap-4  p-6  rounded-xl">
                            <div className=" flex text-white mt-[10px]">
                              {tab.svg}
                            </div>
                            <div
                              className="absolute cursor-pointer  top-4 right-4"
                              onClick={() => {
                                setDeletePopup(true);
                                setDeleteAd(item);
                              }}
                            >
                              {DELETE_ICON}
                            </div>
                            <div className="flex flex-col gap-y-1 w-full">
                              <div className="text-[#FFC01D] text-[20px] my-1 font-bold ">
                                {item.ad_login_userinfo.given_name}{" "}
                                {item.ad_login_userinfo.family_name}
                                {item.ad_login_userinfo.firstName}{" "}
                                {item.ad_login_userinfo.lastName}
                                {item.ad_login_userinfo?.userInfo?.name}
                                {selectedTab === "Analytics" &&
                                  toPascalCase(item.ad_platform)}
                              </div>
                              <div className="flex text-[14px] my-1">
                                <div className="w-[356px] text-white flex flex-col gap-1  ">
                                  <div className="font-semibold">
                                    Account Id :{" "}
                                    <span className="font-normal">
                                      {item.ad_login_userinfo.id || item.email}
                                    </span>
                                  </div>
                                  <div className="font-semibold">
                                    Added By :{" "}
                                    <span className="font-normal">
                                      {item.user.name}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-[250px] text-white flex flex-col gap-1">
                                  <div className="font-semibold">
                                    Date :{" "}
                                    <span className="font-normal">
                                      {formatDate(item.updated_at)}
                                    </span>
                                  </div>
                                  <div className="flex gap-x-2 items-center font-medium ">
                                    Data Integration Status :{" "}
                                    {!item.status ? (
                                      <div className="flex items-center gap-x-1">
                                        <div className="">
                                          <svg
                                            width="15"
                                            height="15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="m5.063 9.88 4.875-4.843m-3.25-2.422.377-.433A4.076 4.076 0 0 1 9.937 1c1.078 0 2.111.425 2.873 1.183A4.024 4.024 0 0 1 14 5.037c0 1.07-.428 2.098-1.19 2.855l-.434.374m-4.063 4.037-.322.431a4.133 4.133 0 0 1-2.896 1.182A4.133 4.133 0 0 1 2.2 12.734 4.012 4.012 0 0 1 1 9.88a3.99 3.99 0 0 1 1.2-2.855l.426-.373"
                                              stroke="#FF5A5A"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              d="m2.531 3.191 10 10"
                                              stroke="#FF5A5A"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                        </div>
                                        <div className="text-[#FF5A5A] font-normal">
                                          Inactive
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-x-1">
                                        <div className="">
                                          <svg
                                            width="15"
                                            height="15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="m5.063 9.88 4.875-4.843m-3.25-2.422.377-.433A4.076 4.076 0 0 1 9.937 1c1.078 0 2.111.425 2.873 1.183A4.024 4.024 0 0 1 14 5.037c0 1.07-.428 2.098-1.19 2.855l-.434.374m-4.063 4.037-.322.431a4.133 4.133 0 0 1-2.896 1.182A4.133 4.133 0 0 1 2.2 12.734 4.012 4.012 0 0 1 1 9.88a3.99 3.99 0 0 1 1.2-2.855l.426-.373"
                                              stroke="#53D73D"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </div>
                                        <div className="text-green-400 font-normal">
                                          Active
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  {item.ad_platform === "GOOGLE" && (
                                    <div className="flex gap-x-2 items-center font-medium">
                                      GMC Linking Status :{" "}
                                      {gmcSuccess &&
                                      gmcdata.gmcAccounts.length !== 0 ? (
                                        <div className="flex items-center gap-x-1">
                                          <div className="">
                                            <svg
                                              width="15"
                                              height="15"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="m5.063 9.88 4.875-4.843m-3.25-2.422.377-.433A4.076 4.076 0 0 1 9.937 1c1.078 0 2.111.425 2.873 1.183A4.024 4.024 0 0 1 14 5.037c0 1.07-.428 2.098-1.19 2.855l-.434.374m-4.063 4.037-.322.431a4.133 4.133 0 0 1-2.896 1.182A4.133 4.133 0 0 1 2.2 12.734 4.012 4.012 0 0 1 1 9.88a3.99 3.99 0 0 1 1.2-2.855l.426-.373"
                                                stroke="#53D73D"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                            </svg>
                                          </div>
                                          <div className="text-green-400 font-normal">
                                            Linked
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-x-1">
                                          <div className="">
                                            <svg
                                              width="15"
                                              height="15"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="m5.063 9.88 4.875-4.843m-3.25-2.422.377-.433A4.076 4.076 0 0 1 9.937 1c1.078 0 2.111.425 2.873 1.183A4.024 4.024 0 0 1 14 5.037c0 1.07-.428 2.098-1.19 2.855l-.434.374m-4.063 4.037-.322.431a4.133 4.133 0 0 1-2.896 1.182A4.133 4.133 0 0 1 2.2 12.734 4.012 4.012 0 0 1 1 9.88a3.99 3.99 0 0 1 1.2-2.855l.426-.373"
                                                stroke="#FF5A5A"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                d="m2.531 3.191 10 10"
                                                stroke="#FF5A5A"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                              />
                                            </svg>
                                          </div>
                                          <div className="text-red-400 font-normal">
                                            Unlinked
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {!item.status && (
                                <div className="mt-2">
                                  <button className="w-[190px] h-[37px] my-1 flex justify-center items-center gap-3 rounded-[30px] border-2 text-[#ffffff] text-[14px] border-[#FFC01D] hover:bg-[#FFC01D] border-solid cursor-pointer hover:text-black">
                                    Reconnect Account
                                  </button>
                                </div>
                              )}
                              <div className="border-b border-[1px] border-[#8297BD54] my-5 w-full"></div>
                              <div className="flex justify-between w-full text-[14px]">
                                {selectedTab !== "Analytics" && (
                                  <div className="font-normal text-[14px]">
                                    {item?.ads_account.length === 0 ? (
                                      <div className="font-normal text-[14px] text-[#FFC01D]">
                                        It seems there are no ad ids associated
                                        with the {tab.name} ad account, Please
                                        create one
                                      </div>
                                    ) : (
                                      <div>
                                        Map your advertising Id within your
                                        account to your brands here
                                      </div>
                                    )}
                                  </div>
                                )}

                                {item?.ads_account.length !== 0 && (
                                  <div
                                    onClick={() => {
                                      handleExpand(item.id);
                                    }}
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                  >
                                    <svg
                                      width="16"
                                      height="9"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className={classNames(
                                        "ml-auto h-5 w-5 shrink-0 transition-transform  duration-200 ease-in-out motion-reduce:transition-none cursor-pointer",
                                        expandHandler === item.id
                                          ? `rotate-180 mr-1 `
                                          : ""
                                      )}
                                      style={{ transformOrigin: "center" }}
                                    >
                                      <path
                                        d="M15.656.333A1.195 1.195 0 0 0 14.825 0c-.312 0-.611.12-.832.333L8.173 5.97 2.355.333a1.196 1.196 0 0 0-.827-.32 1.195 1.195 0 0 0-.82.334 1.121 1.121 0 0 0-.345.795 1.12 1.12 0 0 0 .33.801l6.65 6.442c.221.214.52.334.832.334.312 0 .61-.12.831-.334l6.65-6.442A1.12 1.12 0 0 0 16 1.138a1.12 1.12 0 0 0-.344-.805Z"
                                        fill="#fff"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <motion.div
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                animate={{
                                  height:
                                    expandHandler === item.id ? "auto" : 0,
                                  opacity: 1,
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                }}
                                className="bg-nyx-blue-4 w-full overflow-hidden rounded-lg"
                              >
                                <div>
                                  <div className="flex flex-col gap-y-3 my-5">
                                    <>
                                      {item?.ads_account.map((item2: any) => (
                                        <>
                                          {mutateDefault.isPending ? (
                                            <div className="h-[50px]">
                                              <SkeletonTheme highlightColor="rgba(108,91,130,0.5)">
                                                <div>
                                                  <Skeleton
                                                    //@ts-ignore
                                                    animation="wave"
                                                    baseColor="rgba(255, 255, 255, 0.09)"
                                                    className="w-full h-[50px]  rounded-xl "
                                                  />
                                                </div>
                                              </SkeletonTheme>
                                            </div>
                                          ) : (
                                            <div className="w-full h-[50px] bg-[#23145A] rounded-md flex justify-between items-center px-4">
                                              {/* Left side - Account Info */}
                                              <div className="flex flex-row gap-5 justify-center items-center">
                                                <div className="flex items-center">
                                                  <div className="text-[12px] w-[300px]">
                                                    {item2.account_name && (
                                                      <div>
                                                        {item2.account_name} :
                                                      </div>
                                                    )}
                                                  </div>
                                                  <div className="text-[14px] ml-1">
                                                    {item2.account_id}
                                                  </div>
                                                </div>
                                              </div>

                                              {/* Right side - GMC and Default Status */}

                                              <div className="flex flex-row justify-between w-[250px]">
                                                <div className="flex items-center">
                                                  {item2.brand_ids != null &&
                                                  item2.brand_ids.length !==
                                                    0 ? (
                                                    <>
                                                      {item.ad_platform ===
                                                        "GOOGLE" && (
                                                        <div>
                                                          <GmcFlow
                                                            brandId={
                                                              item2.brand_ids[0]
                                                                .id
                                                            }
                                                          />
                                                        </div>
                                                      )}
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                </div>

                                                <div className="flex flex-row  ">
                                                  {item2.brand_ids != null &&
                                                  item2.brand_ids.length !==
                                                    0 ? (
                                                    <div className="p-2 w-auto rounded text-[12px] flex items-center gap-x-2 cursor-default">
                                                      <div className="h-5 w-5 border-[1px] border-nyx-yellow rounded-full flex items-center justify-center">
                                                        <div className="h-3 w-3  bg-nyx-yellow rounded-full"></div>
                                                      </div>
                                                      Default
                                                    </div>
                                                  ) : (
                                                    <div
                                                      className="p-2 w-auto rounded text-[12px] flex items-center gap-x-2 cursor-pointer"
                                                      onClick={() =>
                                                        handleDefault(
                                                          item.id,
                                                          item2.id
                                                        )
                                                      }
                                                    >
                                                      <div className="h-5 w-5 border-[1px] border-nyx-yellow rounded-full"></div>
                                                      Set As Default
                                                    </div>
                                                  )}
                                                </div>
                                              </div>

                                              {/* {item2.brand_ids != null &&
                                              item2.brand_ids.length !== 0 ? (
                                                <div className="flex gap-x-4 items-center justify-start">
                                                  <div className="p-2 w-auto rounded text-[12px] flex items-center gap-x-2 cursor-default">
                                                  <div className="h-5 w-5 border-[1px] border-nyx-yellow rounded-full flex items-center justify-center">
                                                    <div className="h-3 w-3  bg-nyx-yellow rounded-full"></div>
                                                  </div>
                                                    Default
                                                  </div>
                                                  {item.ad_platform ===
                                                    "GOOGLE" && (
                                                    <div>
                                                      <GmcFlow
                                                        brandId={
                                                          item2.brand_ids[0].id
                                                        }
                                                      />
                                                    </div>
                                                  )}
                                                </div>
                                              ) : (
                                                <div
                                                  className="p-2 w-auto rounded text-[12px] flex items-center gap-x-2 cursor-pointer"
                                                  onClick={() =>
                                                    handleDefault(
                                                      item.id,
                                                      item2.id,
                                                    )
                                                  }
                                                >
                                                  <div className="h-5 w-5 border-[1px] border-nyx-yellow rounded-full"></div>
                                                  Set As Default
                                                </div>
                                              )} */}
                                            </div>
                                          )}
                                        </>
                                      ))}
                                    </>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      )
                  )}

                  {isLoading && (
                    <div className="bg-inherit flex flex-col gap-4 mt-4">
                      <AdLoading />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      {shopifyPopup && (
        <Modal
          isOpen={shopifyPopup}
          style={shopify_pop_up}
          onRequestClose={() => setShopifyPopup(false)}
        >
          <div className="w-[600px] h-[350px] bg-[#28134B] rounded-md p-10 text-white relative flex flex-col items-center ">
            <div
              className="absolute right-5 top-6"
              onClick={() => setShopifyPopup(false)}
            >
              {" "}
              <CrossIcon className="w-3 h-3" />
            </div>
            <div className="text-[24px] mt-4">
              What&apos;s your shopify address?
            </div>
            <div className="text-[14px] mt-8 ">
              Please enter your Shopify site URL without HTTPS:
            </div>
            <div className="text-[14px]">
              For example nyx-business.shopify.com
            </div>
            <div className="flex flex-col justify-between gap-x-3 h-[140px] mt-8">
              <div className="w-[400px]  rounded-md border border-[#8297BD] bg-inherit overflow-hidden ">
                <input
                  type="text"
                  placeholder="myshop.shopify.com"
                  className="px-2 py-2 text-sm bg-inherit outline-none appearance-none w-[380px] "
                  onChange={(e) => setStoreURL(e.target.value)}
                />
              </div>

              <div className="flex flex-row items-center justify-center gap-4 ">
                <Button
                  className="rounded-full   hover:shadow-none"
                  onClick={handleClickShopify}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {cleverTapPopup && (
        <Modal
          isOpen={cleverTapPopup}
          style={shopify_pop_up}
          onRequestClose={() => setCleverTapPopup(false)}
        >
          <CleverTapPopup
            setCleverTapPopup={setCleverTapPopup}
            adRefetch={adRefetch}
          />
        </Modal>
      )}
      {moengagePopup && (
        <Modal
          isOpen={moengagePopup}
          style={shopify_pop_up}
          onRequestClose={() => setMoengagePopup(false)}
        >
          <MoengagePopup
            setMoengagePopup={setMoengagePopup}
            adRefetch={adRefetch}
          />
        </Modal>
      )}
      {branchPopup && (
        <Modal
          isOpen={branchPopup}
          style={shopify_pop_up}
          onRequestClose={() => setBranchPopup(false)}
        >
          <BranchPopup setBranchPopup={setBranchPopup} adRefetch={adRefetch} />
        </Modal>
      )}
      {onboardPopup && (
        <Modal
          isOpen={onboardPopup}
          style={login_popup_Style}
          onRequestClose={() => setOnboardPopup(false)}
        >
          <div className="w-full flex justify-end">
            <div
              className="cursor-pointer"
              onClick={() => setOnboardPopup(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6 mt-6">
            <div className="w-full text-center text-[#FFFFFF] text-sm font-[600]">
              You need to onboard a brand in order to integrate platforms at
              NYX.
            </div>

            <div className="w-full flex gap-4 justify-center items-center">
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-1/2 px-2 h-[36px] hover:shadow-none"
                onClick={() => setOnboardPopup(false)}
              >
                Cancel
              </Button>
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-1/2 px-2 h-[36px] hover:shadow-none"
                onClick={handleOnboarding}
              >
                Onboard a Brand Now
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {deletePopup && (
        <Modal
          isOpen={deletePopup}
          style={login_popup_Style}
          onRequestClose={() => setDeletePopup(false)}
        >
          <div className="flex justify-between">
            <div className="text-base font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="cursor-pointer"
              onClick={() => setDeletePopup(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#FFFFFF"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.39-.39.39-1.02 0-1.4z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6 mt-4">
            <div className="w-full text-center text-[#FFFFFF] text-sm font-[600]">
              Are you sure you want to delete this Ad Account?
            </div>

            <div className="w-full flex gap-4 justify-center items-center">
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={() => setDeletePopup(false)}
              >
                Cancel
              </Button>
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={DeleteIconClick}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Page;

// DeleteIconClick(item.id, item.ad_platform);
