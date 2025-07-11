/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Button from "@nyx-frontend/main/components/Button";
import { BRAND_TABS_Three } from "@nyx-frontend/main/utils/productConstants";
import Modal from "react-modal";
import Select from "react-select";
import {
  deleteproductbyid,
  addProductServices,
  addTargetGroupServices,
  deletetargetbyid,
  createCampaign,
} from "@nyx-frontend/main/services/videoGenerationServices";
import {
  addTagetGroupPopupStyle,
  addProductPopupStyle,
  deletePopupStyle,
  popupHeader2,
  showTGPopupStyle,
} from "@nyx-frontend/main/utils/modalstyles";
import { ageGroup, region } from "@nyx-frontend/main/utils/productConstants";
import { TARGRTGROUP_GENDER } from "@nyx-frontend/main/utils/productConstants";
import { aiImageColourStyles } from "@nyx-frontend/main/utils/productStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SavePopUp from "@nyx-frontend/main/components/SavePopUp";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import ButtonLoading from "./ButtonLoading";
import AddTargetGroup from "../../image-craft-ai/text-to-image/_components/AddTargetGroup";
import EditTargetGroup from "./_components/EditTargetGroup";
import DeleteConfirmation from "./_components/DeleteConfirmation";
import "react-toastify/dist/ReactToastify.css";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import { ToastContainer, toast } from "react-toastify";
import { admanagerSystemUpload } from "@nyx-frontend/main/services/admanagerServices";
import classNames from "../../../../../utils/classNames";
const imageTypes = ["image/jpeg", "image/png", "image/jpg"];

const Campaign = ({
  tab,
  setBrandTab,
  brandDetails,
  callcampignapi,
  targetGrp,
  selectCampaignId,
  brandDone,
  settingCampaignDone,
  settingTarget,
  longScript,
  settingProductName,
  settingProductDis,
  settingLongScript,
}) => {
  const [targetGroupPopup, setTargetGroupPopup] = useState(false);
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deletetargetPopup, setdeletetargetPopup] = useState(false);
  const [productLogo, setProductLogo] = useState(null);
  const [campingname, setcampingname] = useState("");
  const [objective, setobjective] = useState("");
  const [productid, setproductid] = useState();
  const [groupid, setgroupid] = useState();
  const [productedit, setproductedit] = useState(false);
  const [editproductid, seteditproductid] = useState(null);
  const [productLogos, setProductLogos] = useState([]);
  // const [deleteproductid, setdeleteproductid] = useState(false);
  const [productname, setproductname] = useState("");
  const [productdiscrption, setproductdiscrption] = useState("");
  const [targetgroupname, settargetgroupname] = useState("");
  const [targetgroupgender, settargetgroupgender] = useState("");
  const [targetgroupage, settargetgroupage] = useState("");
  const [targetgroupregion, settargetgroupregion] = useState("");
  const [targegpid, settargegptid] = useState(null);
  const [targetGroupGenderClick, setTargetGroupGenderClick] = useState(false);
  const [targetGroupGenderIndex, setTargetGroupGenderIndex] = useState(null);
  const imageTyeps = ["image/jpeg", "image/png", "image/jpg"];
  const [targetGroupClick, settargetGroupClick] = useState(false);
  const [targetGroupClickIndex, settargetGroupClickIndex] = useState(null);
  const [targetGroupIDS, setTargetGroupIDS] = useState([]);
  const [productClick, setproductClick] = useState(false);
  const [productClickIndex, setproductClickIndex] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]); // To hold all products
  const [brandTargetGroups, setBrandTargetGroups] = useState([]);
  const [ppid, setppid] = useState();
  const [popUp, setPopUp] = useState(false);
  const [productSendName, setproductSendName] = useState("");
  const [productSendDiscription, setProductSendDiscription] = useState("");
  const [productError, setProductError] = useState(false);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [showAll, setShowAll] = useState(false);
  const [showTargetGroupPopup, setShowTargetGroupPopup] = useState(false);
  const [enteredTgGroup, setEnteredTgGroup] = useState("");
  const [showNameFilter, setShowNameFilter] = useState(false);
  const [nameorder, setNameOrder] = useState("");
  const [visibleGroups, setVisibleGroups] = useState([]);
  const [showGenderFilter, setShowGenderFilter] = useState(false);
  const [gender, setGender] = useState("");
  const [showAgeGroupFilter, setShowAgeGroupFilter] = useState("");
  const [ageGroup, setageGroup] = useState("");
  const [showRegionFilter, setShowRegionFilter] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    setVisibleGroups(brandTargetGroups);
  }, [brandTargetGroups]);

  // console.log(visibleGroups)

  let visibleGroupss;

  useEffect(() => {
    if (!brandTargetGroups || brandTargetGroups.length === 0) {
      console.log("stopped here at sorting by showall");
      return;
    }

    visibleGroupss = [];

    if (showAll) {
      visibleGroupss = brandTargetGroups;
    } else {
      const initialSlice = brandTargetGroups.slice(0, 5);
      const selectedGroups = brandTargetGroups.filter(
        (item) =>
          groupid == item.id && !initialSlice.some((g) => g.id === item.id)
      );
      visibleGroupss = [...selectedGroups, ...initialSlice].slice(0, 5);
    }
    // console.log("visibleGroups1",visibleGroupss)
    setVisibleGroups(visibleGroupss);
  }, [showAll, brandTargetGroups, groupid]);

  const handleShowTargetGroupModal = () => {
    setShowTargetGroupPopup(true);
    setShowAll(true);

    // setVisibleGroups(visibleGroupss)
  };

  const handleNameSelect = (name) => {
    setShowNameFilter(false);
    setNameOrder(name);
  };

  const handleGenderSelect = (gender) => {
    setShowGenderFilter(false);
    setGender(gender);
  };

  const handleAgeGroupSelect = (agegroup) => {
    setShowAgeGroupFilter(false);
    setageGroup(agegroup);
  };

  const handleRegionSelect = (region) => {
    setShowRegionFilter(false);
    setRegion(region);
  };

  useEffect(() => {
    if (!brandTargetGroups || brandTargetGroups.length === 0) return;

    let result = [...brandTargetGroups];

    //  Filter by entered name
    if (enteredTgGroup && enteredTgGroup.trim() !== "") {
      result = result.filter((item) =>
        item?.name?.toLowerCase().includes(enteredTgGroup.toLowerCase())
      );
    }

    //  Filter by gender
    if (gender && gender !== "Reset") {
      result = result.filter(
        (item) => item?.gender?.toLowerCase() === gender.toLowerCase()
      );
    }

    //  Sort by name
    if (nameorder === "A-Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (nameorder === "Z-A") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    //  Sort by age group (first number of the first range)
    if (ageGroup === "Low to High" || ageGroup === "High to Low") {
      result.sort((a, b) => {
        const extractAgeStart = (str) => {
          const firstAgeRange = str?.split(",")[0]?.trim();
          const match = firstAgeRange?.match(/^(\d+)/); // matches the starting number
          return match ? parseInt(match[1]) : Number.MAX_SAFE_INTEGER;
        };

        const ageA = extractAgeStart(a.age_group);
        const ageB = extractAgeStart(b.age_group);

        return ageGroup === "Low to High" ? ageA - ageB : ageB - ageA;
      });
    }

    // Sort by region (first item in location array)
    if (region === "A-Z" || region === "Z-A") {
      result.sort((a, b) => {
        const regionA = a?.location?.[0]?.toLowerCase() || "";
        const regionB = b?.location?.[0]?.toLowerCase() || "";

        return region === "A-Z"
          ? regionA.localeCompare(regionB)
          : regionB.localeCompare(regionA);
      });
    }

    setVisibleGroups(result);
  }, [enteredTgGroup, gender, nameorder, ageGroup, region]);

  const handleCloseTgModel = () => {
    setShowTargetGroupPopup(false);
    setShowAll(false);
  };

  const handleShowNameFilter = () => {
    setShowNameFilter(!showNameFilter);
    setShowGenderFilter(false);
    setShowAgeGroupFilter(false);
    setShowRegionFilter(false);
  };

  const handleShowGenderFilter = () => {
    setShowNameFilter(false);
    setShowGenderFilter(!showGenderFilter);
    setShowAgeGroupFilter(false);
    setShowRegionFilter(false);
  };

  const handleShowAgeGroupFilter = () => {
    setShowNameFilter(false);
    setShowGenderFilter(false);
    setShowAgeGroupFilter(!showAgeGroupFilter);
    setShowRegionFilter(false);
  };

  const handleShowRegionFilter = () => {
    setShowNameFilter(false);
    setShowGenderFilter(false);
    setShowAgeGroupFilter(false);
    setShowRegionFilter(!showRegionFilter);
  };

  useEffect(() => {
    setBrandProducts(brandDetails?.brand_product_v2 ?? []);
    setBrandTargetGroups(brandDetails?.brand_target_group_v2 ?? []);
  }, [brandDetails]);

  useEffect(() => {
    // setcampingname("");
    // setobjective("");
    setgroupid();
    setproductid();
  }, [brandDetails]);

  const onAddNewTargetHandler = (data) => {
    setBrandTargetGroups([...brandTargetGroups, data]);
    setTargetGroupIDS([...targetGroupIDS, data.id]);
    setTargetGroupPopup(false);
    settargegptid(null);
    // refetch after add
    queryClient.invalidateQueries({ queryKey: ["getProduct-vid3"] });
  };

  const onEditTargetGroupHandler = (data) => {
    const newTargetGroup = brandTargetGroups.filter(
      (targetGroup) => targetGroup.id !== data.id
    );
    setBrandTargetGroups([...newTargetGroup, data]);
    // updates ids
    const newIds = new Set([...targetGroupIDS, data.id]);
    setTargetGroupIDS(Array.from(newIds));
    setTargetGroupPopup(false);
    settargegptid(null);
    // refetch after edit
    queryClient.invalidateQueries({ queryKey: ["getProduct-vid"] });
  };

  const onDeleteTargetGroupHandler = (id) => {
    // hide popup
    setdeletetargetPopup(false);
    // remove deleted Target Group
    const newBrandTargetGroups = brandTargetGroups.filter(
      (brandTargetGroup) => brandTargetGroup.id !== id
    );
    setBrandTargetGroups(newBrandTargetGroups);
    settargegptid(null);
    // refetch after delete
    queryClient.invalidateQueries({ queryKey: ["getProduct-vid2"] });
  };

  const nextfromcampign = () => {
    setShowAll(false);
    setShowTargetGroupPopup(false);
    settingProductName(productSendName);
    settingProductDis(productSendDiscription);
    if (campingname && groupid) {
      let groupid2 = [groupid];
      console.log(groupid, groupid2.length);

      if (!longScript) {
        const data1 = {
          brand_id: brandDetails.id,
          campaign: {
            name: campingname,
            objective: objective,
            product_id: productid,
            target_group_ids: groupid2,
          },
          workspace_id: Number(localStorage.getItem("workspace_id")),
        };

        mutateCreateCampaign.mutate(data1, {
          onSuccess: (response) => {
            console.log(response);
            setBrandTab(BRAND_TABS_Three.CREATIVE);
            selectCampaignId(response.id);
            settingCampaignDone(true);
            setppid(productid);
          },
          onError: (res) => {
            (function () {
              const error = () => {
                // Store the toastId to control this specific toast later
                const toastId = toast.error(
                  <>
                    <span className="text-white text-[20px]">Bad Request</span>
                    <br />
                    <span className="text-white text-[16px]">
                      {res?.response?.data?.message}
                    </span>
                    <br />
                  </>,
                  { autoClose: 5000 }
                );
              };

              error(); // Invoke the error function immediately
            })();

            console.log(res);
          },
        });
      } else {
        setPopUp(true);
      }
    }
  };

  const saveFromPopUp = () => {
    setPopUp(false);
    let groupid2 = [groupid];
    const data1 = {
      brand_id: brandDetails.id,
      campaign: {
        name: campingname,
        objective: objective,
        product_id: productid,
        target_group_ids: groupid2,
      },
      workspace_id: Number(localStorage.getItem("workspace_id")),
    };

    mutateCreateCampaign.mutate(data1, {
      onSuccess: (response) => {
        setBrandTab(BRAND_TABS_Three.CREATIVE);
        selectCampaignId(response.id);
        settingCampaignDone(true);
        setppid(productid);
        settingLongScript();
      },
      onError: (res) => {
        (function () {
          const error = () => {
            // Store the toastId to control this specific toast later
            const toastId = toast.error(
              <>
                <span className="text-white text-[20px]">Bad Request</span>
                <br />
                <span className="text-white text-[16px]">
                  {res?.response?.data?.message}
                </span>
                <br />
              </>,
              { autoClose: 5000 }
            );
          };

          error(); // Invoke the error function immediately
        })();
      },
    });
  };

  const backToBranDetails = () => {
    setBrandTab(BRAND_TABS_Three.BRANDING);
  };

  const onCancelTargetGroup = () => {
    setTargetGroupPopup(false);
    settargegptid(null);
  };

  const clickonproduct = (product, index) => {
    setproductid((pid) =>
      pid !== null && pid === product.id ? null : product.id
    );
    setproductSendName((pname) =>
      pname !== null && pname === product.product_name
        ? null
        : product.product_name
    );
    setProductSendDiscription((pdesc) =>
      pdesc !== null && pdesc === product.description
        ? null
        : product.description
    );
  };

  const clickontargetgroup = (id, index, targetGroup) => {
    setgroupid((tids) => (tids !== null && tids == id ? null : id));
    settingTarget((tg) =>
      tg !== null && tg == targetGroup ? null : [targetGroup]
    );
  };
  const handleTargetGroupModal = () => {
    setTargetGroupPopup(false);
  };
  const handleAddProductModal = () => {
    setAddProductPopup(false);
    setProductError(false);
  };

  const handleDeletetargetPopup = () => {
    setdeletetargetPopup(true);
    setTargetGroupPopup(false);
  };
  const deletetargetbuttonpopup = () => {
    deletetargetbyid(targegpid);
    setdeletetargetPopup(false);
  };

  const handleDeleteproductPopup = () => {
    setAddProductPopup(false);
    setDeletePopup(true);
  };

  async function deletebuttonpopup() {
    setIsLoading(true);
    try {
      await deleteproductbyid(editproductid);
      setIsLoading(false);
      setDeletePopup(false);
      getProductRefetch();
      setBrandProducts(
        brandProducts.filter((item, index) => item.id !== editproductid)
      );
    } catch (error) {
      setIsLoading(false);
      (function () {
        const error = () => {
          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Error deleting product
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Product ID is not defined
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        error(); // Invoke the error function immediately
      })();
      // Handle error, show error message to the user, etc.
    }
  }

  const mutateCreateCampaign = useMutation({
    mutationKey: ["Create-campaign2"],
    mutationFn: createCampaign,
  });

  const mutateAddTargetgroup = useMutation({
    mutationKey: ["add-TargetGroup"],
    mutationFn: addTargetGroupServices,
  });

  const clickontargetedit = (targetGroup) => {
    if (targetGroup) {
      // settingTarget(targetGroup)
      setTargetGroupPopup(true);
      settargegptid(targetGroup.id);
      settargetgroupname(targetGroup.name);
      settargetgroupgender(targetGroup.gender);
      settargetgroupage(targetGroup.age_group);
      settargetgroupregion(targetGroup.region);
    }
  };

  const addtargetclick = () => {
    if (
      targetgroupname.length == 0 ||
      targetgroupage.length == 0 ||
      targetgroupregion.length == 0 ||
      targetgroupgender.length == 0
    ) {
      displayMessagePopup(
        "handle-input-prod-logo",
        "error",
        "Error",
        "Please select * marked options"
      );
    } else {
      const targetGroupData = targegpid
        ? {
            id: targegpid,
            name: targetgroupname,
            age_group: targetgroupage,
            region: targetgroupregion,
            gender: targetgroupgender,
            brand_id: null,
            target_group_id: Number(targegpid),
          }
        : {
            name: targetgroupname,
            age_group: targetgroupage,
            region: targetgroupregion,
            gender: targetgroupgender,
          };

      if (brandDetails.id) {
        targetGroupData.brand_id = Number(brandDetails.id);
      }

      mutateAddTargetgroup.mutate(targetGroupData, {
        onSuccess: (response) => {
          if (targegpid !== null) {
            let targetGroups = brandTargetGroups.filter(
              (targetGroup) => targetGroup.id !== targegpid
            );

            setBrandTargetGroups([...targetGroups, response.targetGroup]);
          } else {
            let targetGroup = response.targetGroup;

            if (brandTargetGroups && brandTargetGroups.length) {
              setBrandTargetGroups((prev) => [...prev, targetGroup]);
            } else {
              setBrandTargetGroups([targetGroup]);
            }
          }
          setTargetGroupIDS([...targetGroupIDS, response.targetGroup.id]);
          setTargetGroupPopup(false);
          settargegptid(null);
          settargetgroupname("");
          settargetgroupgender("");
          settargetgroupage("");
          settargetgroupregion("");
        },
        onError: (res) => {
          console.log(res);
        },
      });
    }
  };

  function onclickonedit(product) {
    if (product.id) {
      setAddProductPopup(true);
      setproductedit(true);
      seteditproductid(product.id);
      setproductname(product.product_name);
      setproductdiscrption(product.description);

      if (product.product_images !== null) {
        setProductLogos(product.product_images);
      }
    }
  }
  function onclickonadd() {
    setAddProductPopup(true);
    setproductedit(false);
    setproductname("");
    setproductdiscrption("");
    seteditproductid(null);
  }

  const mutateUploadfromSyetem = useMutation({
    mutationKey: ["upload-system"],
    mutationFn: admanagerSystemUpload,
  });

  const handleInputProductLogo = (event) => {
    const selectedFile = event.target.files[0];
    const workspaceId = localStorage.getItem("workspace_id");

    const formData = new FormData();
    formData.append("type", "logo");
    formData.append("workspace_id", workspaceId);
    formData.append("file", selectedFile);

    if (selectedFile && imageTypes.includes(selectedFile.type)) {
      // setProductLogos((prev) => [...prev, selectedFile]);

      mutateUploadfromSyetem.mutate(formData, {
        onSuccess: (response) => {
          setProductLogos((prev) => [
            ...prev,
            response?.data?.signed_image_url,
          ]);
        },
        onError: (res) => {
          console.log(res);
        },
      });
    } else {
      (function () {
        const error = () => {
          toast.error(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Upload file is not a valid image.
              </span>
            </>,
            { autoClose: 5000 }
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    }

    event.target.value = "";
  };

  const mutateAddProductFile = useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProductServices,
  });

  const removeProductLogo = (typeOfLogo, valueOfLogo) => {
    if (typeOfLogo === "new") {
      setProductLogos((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfLogo)
      );
    } else if (typeOfLogo === "edit") {
      setProductImages((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfLogo)
      );
    }
  };

  const editproductnext = () => {
    setProductError(true);
    if (!productname || productname.length == 0) {
      // displayMessagePopup(
      //   "handle-input-prod-logo",
      //   "error",
      //   "Error",
      //   "Please Select * marked Section",
      // );
    } else {
      const data = new FormData();
      const workspaceID = localStorage.getItem("workspace_id");

      data.append("productName", productname);
      data.append("description", productdiscrption);
      data.append("workspace_id", String(workspaceID));

      if (brandDetails.id) {
        data.append("brandId", brandDetails.id);
      }

      if (editproductid) {
        data.append("product_Id", editproductid);
        data.append("product_images", JSON.stringify(productLogos));
      }

      // Add the new image files added by the user
      if (productLogos.length) {
        for (var x = 0; x < productLogos.length; x++) {
          data.append("productImages", productLogos[x]);
        }
      }

      mutateAddProductFile.mutate(data, {
        onSuccess: (response) => {
          if (editproductid !== null) {
            let products = brandProducts.filter(
              (product) => product.id !== editproductid
            );
            setBrandProducts([...products, response.product]);
          } else {
            let product = response.product;

            if (brandProducts && brandProducts.length) {
              setBrandProducts((prev) => [...prev, product]);
            } else {
              setBrandProducts([product]);
            }
          }

          setproductname("");
          setproductdiscrption("");
          setProductLogos([]);
          setProductImages([]);
          setAddProductPopup(false);
        },
        onError: () => {
          console.log("ERROR !");
        },
      });
    }
  };

  const handleInputRegion = (selected) => {
    settargetgroupregion(selected.value);
  };
  const handleInputAgeGroup = (selected) => {
    settargetgroupage(selected.value);
  };
  const handletargetGroupGender = (data, index) => {
    settargetgroupgender(data);
    setTargetGroupGenderClick(true);
    setTargetGroupGenderIndex(index);
  };

  const openTab = () => {
    if (brandDone) {
      if (tab !== BRAND_TABS_Three.CAMPAIGN) {
        setBrandTab(BRAND_TABS_Three.CAMPAIGN);
      } else {
        setBrandTab("");
      }
    } else {
      toast.warn(
        <>
          <span className="text-white text-[20px]"> Brand Missing!</span>
          <br />
          <span className="text-white text-[16px]">
            {" "}
            Please choose a brand and click save.
          </span>
        </>,
        { autoClose: 5000 }
      );
    }
  };

  const getImagePreview = (imageFile) => {
    if (!imageFile) {
      return "";
    }

    return imageFile;
  };

  const closePopup = () => {
    setPopUp(false);
  };

  const { displayMessagePopup } = useContext(MessagePopupContext);

  return (
    <>
      <SavePopUp
        onClose={closePopup}
        isPopupOpen={popUp}
        saveFromPopUp={saveFromPopUp}
      />

      <div
        className={`${
          tab === BRAND_TABS_Three.CAMPAIGN ? "bg-[#332270]" : "bg-[#23145A]"
        } rounded-lg`}
      >
        <h2 className="mb-0">
          <div
            className={`${
              tab === BRAND_TABS_Three.CAMPAIGN
            } group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-[#FFFFFF] rounded-lg`}
            onClick={openTab}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={`w-[50%] md:w-full font-semibold flex ${
                  tab === BRAND_TABS_Three.CAMPAIGN
                    ? "text-[#FFCB54] text-lg"
                    : "text-[#FFFFFF] text-sm"
                }`}
              >
                Campaign Overview{" "}
              </div>
            </div>

            <span
              className={`${
                tab === BRAND_TABS_Three.CAMPAIGN
                  ? `rotate-[-180deg] -mr-1`
                  : `dark:fill-white`
              } ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: tab === BRAND_TABS_Three.CAMPAIGN ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className={clsx(` w-full overflow-hidden rounded-lg`)}
        >
          <div className="py-2 md:px-7 sm:px-4">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 w-full">
                <div className="w-full flex flex-col gap-2 mb-3">
                  <div className="text-[#FFFFFF] text-sm  font-semibold">
                    Campaign Name <span className="text-[#D13946]">*</span>
                  </div>
                  <input
                    type="text"
                    value={campingname}
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal placeholder:text-sm text-[#FFFFFF] placeholder:italic"
                    placeholder="Eg - Super Sale"
                    onChange={(e) => setcampingname(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col gap-2 mb-3">
                  <div className="text-[#FFFFFF] text-sm font-semibold">
                    Campaign Objective
                  </div>
                  <input
                    type="text"
                    value={objective}
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal placeholder:text-sm text-[#FFFFFF] placeholder:italic"
                    placeholder="Eg - Campaign for Diwali"
                    onChange={(e) => setobjective(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="text-[#FFFFFF] text-sm font-semibold">
                    Choose Product
                  </div>

                  <div className="w-full flex flex-wrap gap-2 mb-3">
                    {brandProducts?.map((product, index) => (
                      <button
                        key={index}
                        className={` text-center transition-colors group relative w-max p-2 rounded-md flex gap-2  cursor-pointer hover:shadow-gray-800 shadow-none hover:shadow-md ${
                          productid === product.id
                            ? "bg-[#5E32FF] text-white"
                            : "bg-[#1D1138] text-[#FFFFFF]"
                        }`}
                        onClick={() => clickonproduct(product, index)}
                      >
                        <span className="text-sm font-medium w-full">
                          {product?.product_name}
                        </span>
                        <span
                          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer pt-0.5"
                          onClick={() => {
                            onclickonedit(product);
                          }}
                        >
                          <svg
                            width="12"
                            height="14"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </button>
                    ))}
                    <button
                      className="bg-[#1D1138] hover:shadow-gray-800 shadow-none hover:shadow-md h-max w-max text-[#FFFFFF] rounded-md text-lg py-1 px-3 active:bg-[#5E32FF] active:text-white"
                      onClick={() => {
                        onclickonadd();
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="text-[#FFFFFF] font-semibold text-sm">
                    Choose Your Target Group
                    <span className="text-[#D13946]">*</span>
                  </div>

                  <div className="w-full flex flex-wrap gap-2 justify-around max-h-[700px] overflow-y-scroll at1919:gap-3 ">
                    <div className="hover:shadow-gray-800 shadow-none hover:shadow-md">
                      <div className="relative bg-[#452A80] w-[126px] h-[36px] rounded-t-lg text-[#FFF] p-2 flex items-center justify-between group  border border-transparent">
                        <div className="font-semibold text-xs  leading-3">
                          Add Target Group
                        </div>
                      </div>
                      <div className="bg-[#6653B4] w-[126px] h-[100px] rounded-b-lg flex justify-center items-center">
                        <button
                          className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                          onClick={() => {
                            setTargetGroupPopup(true);
                          }}
                        >
                          <svg
                            viewBox="0 0 17 17"
                            className="w-4 h-4 fill-current text-nyx-yellow"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {visibleGroups?.map((targetGroup, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          clickontargetgroup(targetGroup.id, index, targetGroup)
                        }
                        className={`hover:shadow-gray-800  shadow-none hover:shadow-md transition-colors rounded-lg ${
                          groupid === targetGroup.id
                            ? "bg-[#5E32FF] text-white border border-[#5E32FF]"
                            : "bg-[#452A80] text-[#FFFFFF]"
                        }`}
                      >
                        <div className="relative w-[126px] h-[36px] rounded-t-lg p-2 flex items-center justify-between group cursor-pointer">
                          <div className=" text-xs font-semibold">
                            {targetGroup?.name?.length > 14
                              ? targetGroup.name.slice(0, 14) + "..."
                              : targetGroup?.name}
                          </div>
                          <div
                            onClick={() => clickontargetedit(targetGroup)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                          >
                            <svg
                              width="13"
                              height="18"
                              viewBox="0 0 11 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.22222 9.77778H2.09306L8.06667 3.80417L7.19583 2.93333L1.22222 8.90694V9.77778ZM0 11V8.40278L8.06667 0.351389C8.18889 0.239352 8.32384 0.152778 8.47153 0.0916667C8.61921 0.0305556 8.77454 0 8.9375 0C9.10046 0 9.25833 0.0305556 9.41111 0.0916667C9.56389 0.152778 9.6963 0.244444 9.80833 0.366667L10.6486 1.22222C10.7708 1.33426 10.86 1.46667 10.916 1.61944C10.972 1.77222 11 1.925 11 2.07778C11 2.24074 10.972 2.39606 10.916 2.54375C10.86 2.69144 10.7708 2.82639 10.6486 2.94861L2.59722 11H0ZM7.62361 3.37639L7.19583 2.93333L8.06667 3.80417L7.62361 3.37639Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="bg-[#6653B4] w-[126px] h-[100px] rounded-b-lg flex justify-center items-center p-2">
                          <div className="w-full flex flex-col gap-1">
                            <div className="flex w-full gap-1 px-2">
                              <div>
                                <svg
                                  width="19"
                                  height="19"
                                  viewBox="0 0 19 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.49125 11.5609C7.23114 11.5609 7.01129 11.4711 6.83169 11.2915C6.65209 11.1119 6.56229 10.892 6.56229 10.6319C6.56229 10.3718 6.65209 10.1519 6.83169 9.97233C7.01129 9.79273 7.23114 9.70293 7.49125 9.70293C7.75136 9.70293 7.97121 9.79273 8.15081 9.97233C8.33041 10.1519 8.42021 10.3718 8.42021 10.6319C8.42021 10.892 8.33041 11.1119 8.15081 11.2915C7.97121 11.4711 7.75136 11.5609 7.49125 11.5609ZM11.9503 11.5609C11.6902 11.5609 11.4703 11.4711 11.2907 11.2915C11.1111 11.1119 11.0213 10.892 11.0213 10.6319C11.0213 10.3718 11.1111 10.1519 11.2907 9.97233C11.4703 9.79273 11.6902 9.70293 11.9503 9.70293C12.2104 9.70293 12.4302 9.79273 12.6098 9.97233C12.7894 10.1519 12.8792 10.3718 12.8792 10.6319C12.8792 10.892 12.7894 11.1119 12.6098 11.2915C12.4302 11.4711 12.2104 11.5609 11.9503 11.5609ZM9.72076 15.8341C11.3805 15.8341 12.7863 15.2581 13.9382 14.1062C15.0902 12.9543 15.6661 11.5485 15.6661 9.88873C15.6661 9.59146 15.6475 9.30348 15.6104 9.02479C15.5732 8.7461 15.5051 8.4767 15.406 8.21659C15.1459 8.27853 14.8858 8.32497 14.6257 8.35594C14.3656 8.3869 14.0931 8.40239 13.8082 8.40239C12.681 8.40239 11.6158 8.16086 10.6126 7.6778C9.60928 7.19474 8.75464 6.51969 8.04863 5.65266C7.65227 6.61878 7.0856 7.45794 6.34863 8.17015C5.61165 8.88235 4.75391 9.41805 3.7754 9.77725V9.88873C3.7754 11.5485 4.35136 12.9543 5.50327 14.1062C6.65518 15.2581 8.06101 15.8341 9.72076 15.8341ZM9.72076 17.3204C8.69271 17.3204 7.72659 17.1253 6.8224 16.7352C5.91821 16.345 5.13169 15.8155 4.46283 15.1467C3.79398 14.4778 3.26447 13.6913 2.87431 12.7871C2.48414 11.8829 2.28906 10.9168 2.28906 9.88873C2.28906 8.86067 2.48414 7.89455 2.87431 6.99037C3.26447 6.08618 3.79398 5.29965 4.46283 4.6308C5.13169 3.96195 5.91821 3.43244 6.8224 3.04228C7.72659 2.65211 8.69271 2.45703 9.72076 2.45703C10.7488 2.45703 11.7149 2.65211 12.6191 3.04228C13.5233 3.43244 14.3098 3.96195 14.9787 4.6308C15.6475 5.29965 16.177 6.08618 16.5672 6.99037C16.9574 7.89455 17.1525 8.86067 17.1525 9.88873C17.1525 10.9168 16.9574 11.8829 16.5672 12.7871C16.177 13.6913 15.6475 14.4778 14.9787 15.1467C14.3098 15.8155 13.5233 16.345 12.6191 16.7352C11.7149 17.1253 10.7488 17.3204 9.72076 17.3204ZM8.71748 4.03627C9.2377 4.9033 9.94371 5.60002 10.8355 6.12643C11.7273 6.65284 12.7182 6.91605 13.8082 6.91605C13.9816 6.91605 14.1488 6.90676 14.3098 6.88818C14.4708 6.8696 14.6381 6.84792 14.8115 6.82315C14.2912 5.95612 13.5852 5.2594 12.6934 4.73299C11.8016 4.20658 10.8107 3.94337 9.72076 3.94337C9.54735 3.94337 9.38014 3.95266 9.21912 3.97124C9.0581 3.98982 8.89088 4.01149 8.71748 4.03627ZM4.09125 8.01222C4.72294 7.65302 5.27413 7.18854 5.7448 6.61878C6.21547 6.04902 6.56848 5.41113 6.80382 4.70512C6.17212 5.06432 5.62094 5.5288 5.15026 6.09856C4.67959 6.66832 4.32659 7.30621 4.09125 8.01222Z"
                                    fill="white"
                                    fillOpacity="0.5"
                                  />
                                </svg>
                              </div>
                              <p className="text-[#FFFFFF80] text-xs">
                                {targetGroup?.age_group
                                  ?.split(",")?.[0]
                                  ?.trim()}
                              </p>
                            </div>
                            <div className="flex w-full gap-1 px-2">
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.896 16.7306V11.1568H3.78125V7.06937C3.78125 6.66063 3.92679 6.31072 4.21786 6.01965C4.50894 5.72857 4.85885 5.58303 5.26759 5.58303H7.4971C7.90584 5.58303 8.25575 5.72857 8.54682 6.01965C8.8379 6.31072 8.98344 6.66063 8.98344 7.06937V11.1568H7.86868V16.7306H4.896ZM6.38234 4.83987C5.9736 4.83987 5.62369 4.69433 5.33262 4.40325C5.04154 4.11218 4.896 3.76227 4.896 3.35353C4.896 2.94478 5.04154 2.59487 5.33262 2.3038C5.62369 2.01272 5.9736 1.86719 6.38234 1.86719C6.79109 1.86719 7.141 2.01272 7.43207 2.3038C7.72314 2.59487 7.86868 2.94478 7.86868 3.35353C7.86868 3.76227 7.72314 4.11218 7.43207 4.40325C7.141 4.69433 6.79109 4.83987 6.38234 4.83987ZM11.9561 16.7306V12.2716H9.72661L11.6217 6.58631C11.7208 6.26427 11.9035 6.01655 12.1698 5.84314C12.4361 5.66974 12.7364 5.58303 13.0709 5.58303C13.4053 5.58303 13.7057 5.66974 13.972 5.84314C14.2383 6.01655 14.421 6.26427 14.52 6.58631L16.4151 12.2716H14.1856V16.7306H11.9561ZM13.0709 4.83987C12.6621 4.83987 12.3122 4.69433 12.0211 4.40325C11.7301 4.11218 11.5845 3.76227 11.5845 3.35353C11.5845 2.94478 11.7301 2.59487 12.0211 2.3038C12.3122 2.01272 12.6621 1.86719 13.0709 1.86719C13.4796 1.86719 13.8295 2.01272 14.1206 2.3038C14.4117 2.59487 14.5572 2.94478 14.5572 3.35353C14.5572 3.76227 14.4117 4.11218 14.1206 4.40325C13.8295 4.69433 13.4796 4.83987 13.0709 4.83987Z"
                                  fill="white"
                                  fillOpacity="0.5"
                                />
                              </svg>

                              <p className="text-[#FFFFFF80] text-xs">
                                {targetGroup?.gender}
                              </p>
                            </div>
                            <div className="flex w-full gap-1 px-2">
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.72661 9.70513C10.1353 9.70513 10.4853 9.5596 10.7763 9.26852C11.0674 8.97745 11.2129 8.62754 11.2129 8.21879C11.2129 7.81005 11.0674 7.46014 10.7763 7.16907C10.4853 6.87799 10.1353 6.73245 9.72661 6.73245C9.31786 6.73245 8.96795 6.87799 8.67688 7.16907C8.3858 7.46014 8.24027 7.81005 8.24027 8.21879C8.24027 8.62754 8.3858 8.97745 8.67688 9.26852C8.96795 9.5596 9.31786 9.70513 9.72661 9.70513ZM9.72661 15.1674C11.2377 13.7802 12.3587 12.5199 13.0894 11.3866C13.8202 10.2532 14.1856 9.24684 14.1856 8.36743C14.1856 7.01734 13.7552 5.91187 12.8944 5.05103C12.0335 4.1902 10.9776 3.75978 9.72661 3.75978C8.4756 3.75978 7.41968 4.1902 6.55885 5.05103C5.69801 5.91187 5.26759 7.01734 5.26759 8.36743C5.26759 9.24684 5.63298 10.2532 6.36376 11.3866C7.09455 12.5199 8.21549 13.7802 9.72661 15.1674ZM9.72661 17.1368C7.73243 15.4399 6.243 13.8638 5.2583 12.4084C4.2736 10.953 3.78125 9.60604 3.78125 8.36743C3.78125 6.5095 4.37888 5.02936 5.57415 3.92699C6.76941 2.82462 8.15356 2.27344 9.72661 2.27344C11.2996 2.27344 12.6838 2.82462 13.8791 3.92699C15.0743 5.02936 15.672 6.5095 15.672 8.36743C15.672 9.60604 15.1796 10.953 14.1949 12.4084C13.2102 13.8638 11.7208 15.4399 9.72661 17.1368Z"
                                  fill="white"
                                  fillOpacity="0.5"
                                />
                              </svg>

                              <p className="text-[#FFFFFF80] text-xs">
                                {targetGroup?.region}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {brandTargetGroups?.length > 6 && (
                    <div className="relative">
                      <div
                        onClick={handleShowTargetGroupModal}
                        className="absolute right-0 text-nyx-yellow underline underline-offset-2 cursor-pointer bottom-0 -mb-6 mr-3 overflow-visible at1919:mr-20 hover:brightness-75"
                      >
                        See More
                      </div>
                    </div>
                  )}

                  <div className="w-full flex justify-center items-center gap-3 my-2">
                    <Button
                      className={`font-semibold mt-6 mb-2 disabled:hover:cursor-not-allowed disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 ${
                        campingname && groupid
                          ? "rounded-full w-32 hover:shadow-none text-nyx-yellow hover:bg-nyx-yellow focus:shadow-glow focus:bg-nyx-yellow focus:text-black"
                          : " rounded-full w-32  hover:shadow-none  hover:bg-nyx-gray-1 hover:text-black  text-black  bg-nyx-gray-1 border-none"
                      } `}
                      onClick={() => nextfromcampign()}
                      disabled={
                        !(campingname && groupid) ||
                        mutateCreateCampaign.isPending
                      }
                    >
                      {mutateCreateCampaign.isPending ? (
                        <ButtonLoading />
                      ) : (
                        "Next"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {addProductPopup ? (
        <Modal
          isOpen={addProductPopup}
          style={addProductPopupStyle}
          onRequestClose={handleAddProductModal}
        >
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">
              {productedit ? "Edit Product" : "Add Product"}
            </div>

            <div className="flex">
              {productedit ? (
                <div
                  className="pr-3 cursor-pointer flex"
                  onClick={() => handleDeleteproductPopup()}
                >
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
                </div>
              ) : null}

              <div
                className="pr-3 cursor-pointer"
                onClick={handleAddProductModal}
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
          </div>
          <div className="w-full my-5 flex flex-col gap-3">
            <div className="w-full flex flex-col">
              <div style={popupHeader2}>
                Product Name <span className="text-[#D13946]">*</span>
              </div>
              <input
                type="text"
                className={`placeholder:text-sm w-full bg-transparent border ${
                  productError && productname.length == 0
                    ? "border-nyx-red"
                    : "border-[#8297BD]"
                } rounded-md p-2 font-normal text-[#FFFFFF]  placeholder:italic`}
                placeholder="Add Product Name"
                value={productname}
                onChange={(e) => setproductname(e.target.value)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Add Product Name")}
              />
              {productError && productname.length == 0 ? (
                <p className="text-nyx-red text-xs">
                  Please Enter Product Name.
                </p>
              ) : null}
            </div>

            <div className="w-full flex flex-col">
              <div style={popupHeader2}>Product Description</div>
              <input
                type="text"
                className="placeholder:text-sm w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal text-[#FFFFFF]  placeholder:italic"
                placeholder="Add Product Description"
                value={productdiscrption}
                onChange={(e) => setproductdiscrption(e.target.value)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "Add Product Description")
                }
              />
            </div>
            <div className="w-full flex flex-col">
              <div style={popupHeader2}>Product Logos</div>

              <div className="flex flex-wrap gap-3">
                {productImages?.map((pimage, index) => (
                  <div key={index} className="mt-3 group relative">
                    <div className="bg-[#6F559A] w-[150px] h-[55px] rounded-t-lg text-[#FFF] px-2 py-4 font-medium">
                      Product Logo {index + 1}
                    </div>
                    <div className="bg-[#50387B] w-[150px]  h-[99px] rounded-b-lg flex justify-center items-center flex-col">
                      <img
                        src={pimage}
                        alt="Product Logo"
                        className="h-full w-full rounded-b-lg"
                      />
                    </div>
                    <button
                      onClick={() => removeProductLogo("edit", pimage)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-6px] right-[-6px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}

                {productLogos?.map((logo, index) => (
                  <div
                    key={index + productImages.length}
                    className="mt-3 group relative"
                  >
                    <div className="bg-[#6F559A] w-[150px] h-[55px] rounded-t-lg text-[#FFF] px-2 py-4 font-medium">
                      Logo Preview {index + productImages.length + 1}
                    </div>
                    <div className="bg-[#50387B] w-[150px]  h-[99px] rounded-b-lg flex justify-center items-center flex-col">
                      <img
                        src={getImagePreview(logo)}
                        alt="preview"
                        className="h-full w-full rounded-b-lg"
                      />
                    </div>
                    <button
                      onClick={() => removeProductLogo("new", logo)}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-[-6px] right-[-6px] bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}

                <div className="mt-3">
                  <div className="bg-[#452A80] w-[150px] h-[55px] rounded-t-lg text-[#FFF] p-2">
                    Add Logo
                  </div>

                  <div className="bg-[#6653B4] w-[150px] h-[99px] rounded-b-lg flex justify-center items-center flex-col">
                    <label className="w-10 h-10 cursor-pointer inline-flex items-center justify-center bg-transparent border border-nyx-yellow rounded-full p-2 font-normal">
                      <input
                        type="file"
                        className="hidden border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3  placeholder:italic"
                        placeholder="Product Logo"
                        onChange={handleInputProductLogo}
                      />
                      <svg
                        viewBox="0 0 17 17"
                        className="w-4 h-4 fill-current text-nyx-yellow"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.14 8.5a.797.797 0 0 1-.796.797H9.297v5.047a.797.797 0 0 1-1.594 0V9.297H2.656a.797.797 0 0 1 0-1.594h5.047V2.656a.797.797 0 0 1 1.594 0v5.047h5.047a.797.797 0 0 1 .797.797Z" />
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-4 mt-6 justify-center items-center">
              <Button
                className="rounded-full w-40"
                onClick={handleAddProductModal}
              >
                Cancel
              </Button>
              <Button className="rounded-full w-40" onClick={editproductnext}>
                Next
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
      {targetGroupPopup ? (
        <Modal
          isOpen={targetGroupPopup}
          style={addTagetGroupPopupStyle}
          onRequestClose={onCancelTargetGroup}
          ariaHideApp={false}
        >
          {targegpid ? (
            <EditTargetGroup
              id={targegpid}
              selectedData={brandTargetGroups.find(
                (brandTargetGroup) => brandTargetGroup.id === targegpid
              )}
              brandDetails={brandDetails}
              onCancel={onCancelTargetGroup}
              onSuccess={onEditTargetGroupHandler}
              onDelete={handleDeletetargetPopup}
            />
          ) : (
            <AddTargetGroup
              brandDetails={brandDetails}
              onCancel={onCancelTargetGroup}
              onSuccess={onAddNewTargetHandler}
            />
          )}
        </Modal>
      ) : null}
      {deletePopup ? (
        <Modal
          isOpen={deletePopup}
          style={deletePopupStyle}
          onRequestClose={handleTargetGroupModal}
        >
          <div className="flex justify-between mt-5">
            <div className="text-xl font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="pr-3 cursor-pointer"
              onClick={() => {
                setDeletePopup(false);
              }}
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
          <div className="w-full my-5">
            <p className="w-full text-center text-[#FFFFFF] text-base">
              Are you sure you want to delete this Product?
            </p>
          </div>

          <div className="w-full flex gap-4 mt-6 justify-center items-center">
            <Button
              className="rounded-full w-40"
              onClick={() => {
                setDeletePopup(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="rounded-full w-40"
              onClick={() => deletebuttonpopup()}
            >
              {isLoading ? "Deleteing.." : "Delete"}
            </Button>
          </div>
        </Modal>
      ) : null}
      {deletetargetPopup ? (
        <Modal
          isOpen={deletetargetPopup}
          style={deletePopupStyle}
          onRequestClose={handleTargetGroupModal}
          ariaHideApp={false}
        >
          <DeleteConfirmation
            onCancel={() => {
              setdeletetargetPopup(false);
            }}
            onConfirm={onDeleteTargetGroupHandler}
            id={targegpid}
          />
        </Modal>
      ) : null}

      {showTargetGroupPopup ? (
        <Modal
          isOpen={showTargetGroupPopup}
          style={showTGPopupStyle}
          onRequestClose={() => handleCloseTgModel()}
        >
          <div className="!w-[75vw]">
            <div className="flex justify-between">
              <div className="text-base font-bold text-[#FFFFFF]">
                {"Choose your Target Group"}
              </div>

              <div className="flex gap-1">
                <div
                  className="cursor-pointer"
                  onClick={() => handleCloseTgModel()}
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
            </div>
            <div className="border-[1px] border-[#8297BD] rounded-md w-[20vw] mt-2 pl-1 p-2 flex gap-5 justify-center items-center">
              <div className="pl-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z"
                    stroke="white"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Search your Target Group"
                onChange={(e) => setEnteredTgGroup(e.target.value)}
                value={enteredTgGroup}
                className="placeholder-[#8297BD] text-white bg-[#332270] w-full focus:outline-none focus:ring-0 focus:border-transparent
                  "
              />
            </div>

            <div className=" overflow-auto h-[60vh] mt-[14px] scrollable-container">
              <table className="w-full bg-[#23145A] overflow-hidden pb-4">
                <thead className="bg-[#091234] h-[44px] sticky top-0 z-10">
                  <tr className="text-[#E9BD4E] bg-[#091234] text-[14px] leading-[18px]">
                    <th className="px-2 text-left pl-4"></th>
                    <th className="px-5 text-left">
                      <div className="flex gap-1 justify-start relative text-left">
                        {"Target Group"}

                        <div
                          onClick={() =>
                            setShowNameFilter(handleShowNameFilter)
                          }
                        >
                          <svg
                            className={`transition-transform duration-200 ${
                              showNameFilter ? "rotate-180" : ""
                            }`}
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z"
                              fill="#E8EAED"
                            />
                          </svg>
                        </div>

                        {showNameFilter && (
                          <div className="absolute z-[1000] ml-28 mt-6 w-18 rounded-md text-[12px] shadow-lg bg-[#332270] text-white">
                            <div
                              className={`px-3 py-2 cursor-pointer rounded-t-md hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${
                                nameorder === "A-Z"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() => handleNameSelect("A-Z")}
                            >
                              A-Z
                            </div>
                            <div
                              className={`px-3 py-2 rounded-b-md cursor-pointer hover:bg-nyx-yellow hover:text-black ${
                                nameorder === "Z-A"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() => handleNameSelect("Z-A")}
                            >
                              Z-A
                            </div>
                          </div>
                        )}
                      </div>
                    </th>
                    <th className="px-5 text-left">
                      <div className="flex gap-1 justify-start relative text-left">
                        {"Gender"}
                        <div
                          onClick={() =>
                            setShowGenderFilter(handleShowGenderFilter)
                          }
                        >
                          <svg
                            className={`transition-transform duration-200 ${
                              showGenderFilter ? "rotate-180" : ""
                            }`}
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z"
                              fill="#E8EAED"
                            />
                          </svg>
                        </div>

                        {showGenderFilter && (
                          <div className="z-[1000] absolute ml-16 mt-6 w-18 text-[12px] rounded-md shadow-lg bg-[#332270] text-white">
                            <div
                              className={`px-3 py-2 cursor-pointer rounded-t-md hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${
                                gender === "Male"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() => handleGenderSelect("Male")}
                            >
                              Male
                            </div>
                            <div
                              className={`px-4 py-2  cursor-pointer hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${
                                gender === "Female"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() => handleGenderSelect("Female")}
                            >
                              Female
                            </div>
                            <div
                              className={`px-4 py-2 cursor-pointer hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${
                                gender === "All"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() => handleGenderSelect("all")}
                            >
                              All
                            </div>
                            <div
                              className={`px-4 py-2 rounded-b-md cursor-pointer hover:bg-nyx-yellow hover:text-black ${
                                gender === "Reset"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() => handleGenderSelect("Reset")}
                            >
                              Reset
                            </div>
                          </div>
                        )}
                      </div>
                    </th>
                    {/* age group header */}

                    <th className="px-5 text-left">
                      <div className="flex gap-1 justify-start relative text-left ">
                        {"Age Group"}
                        <div
                          onClick={() =>
                            setShowAgeGroupFilter(handleShowAgeGroupFilter)
                          }
                        >
                          <svg
                            className={`transition-transform duration-200 ${
                              showAgeGroupFilter ? "rotate-180" : ""
                            }`}
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z"
                              fill="#E8EAED"
                            />
                          </svg>
                        </div>

                        {showAgeGroupFilter && (
                          <div className="z-[1000] absolute ml-24 mt-6 text-[12px] rounded-md shadow-lg bg-[#332270] text-white ">
                            <div
                              className={`px-3 py-2 cursor-pointer rounded-t-md whitespace-nowrap inline-block hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${
                                ageGroup === "Male"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() =>
                                handleAgeGroupSelect("High to Low")
                              }
                            >
                              High to Low
                            </div>
                            <div
                              className={`px-3 py-2 rounded-b-md cursor-pointer whitespace-nowrap inline-block hover:bg-nyx-yellow hover:text-black ${
                                ageGroup === "Female"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() =>
                                handleAgeGroupSelect("Low to High")
                              }
                            >
                              Low to High
                            </div>
                          </div>
                        )}
                      </div>
                    </th>

                    <th className="px-5 text-left">
                      <div className="flex gap-1 justify-start relative text-left">
                        {"Region"}
                        <div
                          onClick={() =>
                            setShowRegionFilter(handleShowRegionFilter)
                          }
                        >
                          <svg
                            className={`transition-transform duration-200 ${
                              showRegionFilter ? "rotate-180" : ""
                            }`}
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z"
                              fill="#E8EAED"
                            />
                          </svg>
                        </div>

                        {showRegionFilter && (
                          <div className="z-[1000] absolute ml-16 mt-6 w-18 text-[12px] rounded-md shadow-lg bg-[#332270] text-white ">
                            <div
                              className={`px-3 py-2 cursor-pointer rounded-t-md hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${
                                region === "A-Z"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() => handleRegionSelect("A-Z")}
                            >
                              A-Z
                            </div>
                            <div
                              className={`px-3 py-2 rounded-b-md cursor-pointer hover:bg-nyx-yellow hover:text-black ${
                                ageGroup === "Female"
                                  ? "bg-yellow-500 text-black"
                                  : ""
                              }`}
                              onClick={() => handleRegionSelect("Z-A")}
                            >
                              Z-A
                            </div>
                          </div>
                        )}
                      </div>
                    </th>
                    <th className="px-5 text-left">Language</th>
                    <th className="px-5 text-left">Interests</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleGroups?.length > 0 ? (
                    <>
                      {visibleGroups?.map((item, rowIndex) => {
                        // const isExpanded = expandedRows[item.id || rowIndex];
                        return (
                          <tr
                            onClick={() =>
                              clickontargetgroup(
                                item.id,
                                "brandTargetGroups" - item?.id,
                                groupid
                              )
                            }
                            className={classNames(
                              "border-b border-solid border-[#503193] text-white font-normal text-sm hover:bg-[#5E33FF]",
                              groupid == item?.id
                                ? "bg-[#5E32FF] border border-[#5E32FF] text-nyx-yellow"
                                : "bg-[#23145A] text-white"
                            )}
                            key={`brandTargetGroups-${item?.id}` || rowIndex}
                            //  onClick={clickontargetgroup(item?.id,index)}
                          >
                            <td className="px-2 py-4 pl-4">
                              <div className="relative group cursor-pointer">
                                <div className="max-w-[200px] truncate font-semibold">
                                  {groupid == item?.id ? (
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M10 14.5833C11.2681 14.5833 12.349 14.1364 13.2427 13.2426C14.1365 12.3489 14.5834 11.268 14.5834 9.99992C14.5834 8.73186 14.1365 7.65096 13.2427 6.75721C12.349 5.86346 11.2681 5.41659 10 5.41659C8.73199 5.41659 7.65108 5.86346 6.75733 6.75721C5.86358 7.65096 5.41671 8.73186 5.41671 9.99992C5.41671 11.268 5.86358 12.3489 6.75733 13.2426C7.65108 14.1364 8.73199 14.5833 10 14.5833ZM10 19.1666C8.73199 19.1666 7.54032 18.926 6.42504 18.4447C5.30976 17.9635 4.33962 17.3103 3.51462 16.4853C2.68962 15.6603 2.0365 14.6902 1.55525 13.5749C1.074 12.4596 0.833374 11.268 0.833374 9.99992C0.833374 8.73186 1.074 7.5402 1.55525 6.42492C2.0365 5.30964 2.68962 4.3395 3.51462 3.5145C4.33962 2.6895 5.30976 2.03638 6.42504 1.55513C7.54032 1.07388 8.73199 0.833252 10 0.833252C11.2681 0.833252 12.4598 1.07388 13.575 1.55513C14.6903 2.03638 15.6605 2.6895 16.4855 3.5145C17.3105 4.3395 17.9636 5.30964 18.4448 6.42492C18.9261 7.5402 19.1667 8.73186 19.1667 9.99992C19.1667 11.268 18.9261 12.4596 18.4448 13.5749C17.9636 14.6902 17.3105 15.6603 16.4855 16.4853C15.6605 17.3103 14.6903 17.9635 13.575 18.4447C12.4598 18.926 11.2681 19.1666 10 19.1666ZM10 17.3333C12.0473 17.3333 13.7813 16.6228 15.2021 15.202C16.623 13.7812 17.3334 12.0471 17.3334 9.99992C17.3334 7.9527 16.623 6.21867 15.2021 4.79784C13.7813 3.377 12.0473 2.66659 10 2.66659C7.95282 2.66659 6.21879 3.377 4.79796 4.79784C3.37712 6.21867 2.66671 7.9527 2.66671 9.99992C2.66671 12.0471 3.37712 13.7812 4.79796 15.202C6.21879 16.6228 7.95282 17.3333 10 17.3333Z"
                                        fill="#F1BB2E"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 14 14"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M7.00004 13.4166C5.22782 13.4166 3.71532 12.7902 2.46254 11.5374C1.20976 10.2846 0.583374 8.77214 0.583374 6.99992C0.583374 5.2277 1.20976 3.7152 2.46254 2.46242C3.71532 1.20964 5.22782 0.583252 7.00004 0.583252C8.77226 0.583252 10.2848 1.20964 11.5375 2.46242C12.7903 3.7152 13.4167 5.2277 13.4167 6.99992C13.4167 8.77214 12.7903 10.2846 11.5375 11.5374C10.2848 12.7902 8.77226 13.4166 7.00004 13.4166ZM7.00004 11.5833C8.2681 11.5833 9.349 11.1364 10.2427 10.2426C11.1365 9.34888 11.5834 8.26797 11.5834 6.99992C11.5834 5.73186 11.1365 4.65096 10.2427 3.75721C9.349 2.86346 8.2681 2.41659 7.00004 2.41659C5.73199 2.41659 4.65108 2.86346 3.75733 3.75721C2.86358 4.65096 2.41671 5.73186 2.41671 6.99992C2.41671 8.26797 2.86358 9.34888 3.75733 10.2426C4.65108 11.1364 5.73199 11.5833 7.00004 11.5833Z"
                                        fill="#E8EAED"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="relative group cursor-pointer">
                                <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                  {item?.name}
                                </p>
                                <div className="max-w-[200px] truncate font-semibold">
                                  {item?.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="relative group cursor-pointer">
                                <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                  {item?.gender}
                                </p>
                                <div className="max-w-[200px] truncate font-semibold">
                                  {item?.gender}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="relative group cursor-pointer">
                                <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                  {item?.age_group}
                                </p>
                                <div className="max-w-[200px] truncate font-semibold">
                                  {item?.age_group
                                    ? item.age_group.split(",")[0].trim()
                                    : "-"}
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <div className="relative group cursor-pointer">
                                <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                  {item?.location}
                                </p>
                                <div className="max-w-[200px] truncate font-semibold">
                                  {item?.location?.[0] || "-"}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="relative group cursor-pointer">
                                <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                  {"-"}
                                </p>
                                <div className="max-w-[200px] truncate font-semibold">
                                  {"-"}
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="relative group cursor-pointer">
                                <p className="text-white font-normal text-[14px] absolute bg-[#1E1239] mt-[-25px] p-1 rounded-[10px] leading-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-fit">
                                  {item.interests ? item?.interests : "-"}
                                </p>
                                <div className="max-w-[200px] truncate font-semibold">
                                  {item.interests ? item?.interests : "-"}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <tr className="bg-nyx-blue-4 text-white font-normal border-b-[1px] border-[#8297BD]">
                        <td
                          colSpan={6}
                          className="px-6 py-6 text-[18px] text-center"
                        >
                          No Rule Data Found!
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mx-auto text-center gap-5 flex justify-center pt-5">
              <div
                onClick={handleCloseTgModel}
                className="text-white border-2 px-5 py-2 rounded-full border-white w-[100px] hover:bg-nyx-yellow hover:text-black hover:font-bold hover:border-nyx-yellow"
              >
                Save
              </div>
              {/* <Button
                      className={`font-semibold mt-6 mb-2 disabled:hover:cursor-not-allowed disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 ${campingname && groupid ? "rounded-full w-32 hover:shadow-none text-nyx-yellow hover:bg-nyx-yellow focus:shadow-glow focus:bg-nyx-yellow focus:text-black" : " rounded-full w-32  hover:shadow-none  hover:bg-nyx-gray-1 hover:text-black  text-black  bg-nyx-gray-1 border-none"} `}
                      onClick={() => nextfromcampign()}
                      disabled={(!(campingname && groupid) || mutateCreateCampaign.isPending)}
                    >
                      {mutateCreateCampaign.isPending ? <ButtonLoading /> : "Next"}
                    </Button> */}
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Campaign;
