/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@nyx-frontend/main/components/Button";
import { BRAND_TABS } from "@nyx-frontend/main/utils/productConstants";
import Modal from "react-modal";
import ArrowIcon from "./_components/ArrowIcon";
import classNames from "@nyx-frontend/main/utils/classNames";
import { deleteproductbyid, addProductServices } from "@nyx-frontend/main/services/brandService";
import {
  addTagetGroupPopupStyle,
  addProductPopupStyle,
  deletePopupStyle,
  popupHeader2,
  showTGPopupStyle
} from "@nyx-frontend/main/utils/modalstyles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BrandImageGenerationContext } from "@nyx-frontend/main/hooks/BrandImageGenerationContext";
import { MessagePopupContext } from "@nyx-frontend/main/hooks/MessagePopupContext";
import ProductChip from "./_components/ProductChip";
import { Group, GroupBody, GroupHead } from "./_components/Group";
import DisabledButton from "./_components/DisbaledButton";
import DeleteConfirmation from "./_components/DeleteConfirmation";
import AddTargetGroup from "./_components/AddTargetGroup";
import EditTargetGroup from "./_components/EditTargetGroup";
import ButtonLoading from "@nyx-frontend/main/components/ButtonLoading";
import "@nyx-frontend/main/app/_components/toastifyTest/toastify.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { admanagerSystemUpload } from "@nyx-frontend/main/services/admanagerServices";
import Select, { components } from "react-select";
import { onboardingColourStyles } from "../../../../../utils/productStyle";


const imageTypes = ["image/jpeg", "image/png", "image/jpg"];

const Campaign = ({
  brandDetails,
  callcampignapi,
  campaignSubmitClick,
  getProductRefetch,
  campaignLoading,
  setFinalSubmitStatus,
}) => {
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deletetargetPopup, setdeletetargetPopup] = useState(false);
  const [campingname, setcampingname] = useState("");
  const [objective, setobjective] = useState("");
  const [productErrMessage, setProductErrMessage] = useState("");
  const [productid, setproductid] = useState(null);
  const [productedit, setproductedit] = useState(false);
  const [editproductid, seteditproductid] = useState(null);
  const [productname, setproductname] = useState("");
  const [productdiscrption, setproductdiscrption] = useState("");
  const [productImages, setProductImages] = useState([]); // To hold existing logos
  const [productLogos, setProductLogos] = useState([]); // To hold new logos
  const [brandProducts, setBrandProducts] = useState([]); // To hold all products
  const [productError, setProductError] = useState(false);
  const [groupid, setgroupid] = useState([]);
  /**
   * Open/Close Popup
   */
  const [targetGroupPopup, setTargetGroupPopup] = useState(false);
  const [targegpid, settargegptid] = useState(null);
  const [brandTargetGroups, setBrandTargetGroups] = useState([]);
  const [targetGroupIDS, setTargetGroupIDS] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAll,setShowAll] = useState(false);
  const [showTargetGroupPopup,setShowTargetGroupPopup]= useState(false)
  const [enteredTgGroup,setEnteredTgGroup] = useState("");
  const [showNameFilter,setShowNameFilter] = useState(false);
  const [nameorder,setNameOrder] = useState("")
  const [visibleGroups,setVisibleGroups] = useState([])
  const [showGenderFilter,setShowGenderFilter] = useState(false)
  const [gender,setGender] = useState("")
  const [showAgeGroupFilter,setShowAgeGroupFilter] = useState("");
  const [ageGroup,setageGroup] = useState("");
  const [showRegionFilter,setShowRegionFilter] = useState("");
  const [region,setRegion] = useState("");

  // console.log(showTargetGroupPopup)
  // console.log("enteredtggroup",enteredTgGroup)

  // console.log(brandTargetGroups)

  useEffect(() => {
    setVisibleGroups(brandTargetGroups)
  },[brandTargetGroups])

  // console.log("visibleGroups1",visibleGroups)

  // console.log(brandTargetGroups)

  let visibleGroupss

  useEffect(()=>{

    if(!brandTargetGroups || brandTargetGroups.length === 0) {console.log("stopped here at sorting by showall"); return;}

    visibleGroupss = [];

    if (showAll) {
    visibleGroupss = brandTargetGroups;
  } else {
     const selectedGroups = brandTargetGroups.filter((item) => groupid?.includes(item.id));
    const nonSelectedInitials = brandTargetGroups.filter((item) => !groupid?.includes(item.id));
    const remainingSlots = 5 - selectedGroups.length;
    const additionalItems = nonSelectedInitials.slice(0, Math.max(remainingSlots, 0));

    visibleGroupss = [...selectedGroups, ...additionalItems];
  }
    // console.log("visibleGroups1",visibleGroupss)
    setVisibleGroups(visibleGroupss)
  },[showAll,brandTargetGroups,groupid])


  const handleShowTargetGroupModal = () => {
    setShowTargetGroupPopup(true);
    setShowAll(true)

    // setVisibleGroups(visibleGroupss)
  };

  const handleNameSelect = (name) => {
    setShowNameFilter(false);
    setNameOrder(name)
  }

  const handleGenderSelect = (gender) => {
    setShowGenderFilter(false);
    setGender(gender)
  }

  const handleAgeGroupSelect = (agegroup) => {
    setShowAgeGroupFilter(false);
    setageGroup(agegroup)
  }

  const handleRegionSelect = (region) => {
    setShowRegionFilter(false);
    setRegion(region)
  }

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
}, [enteredTgGroup, gender, nameorder,ageGroup, region]);



  const handleCloseTgModel = () =>{
    setShowTargetGroupPopup(false)
    setShowAll(false)
  }

  const handleShowNameFilter = () => {
    setShowNameFilter(!showNameFilter)
    setShowGenderFilter(false)
    setShowAgeGroupFilter(false)
    setShowRegionFilter(false)
  }

  const handleShowGenderFilter = () => {
    setShowNameFilter(false)
    setShowGenderFilter(!showGenderFilter)
    setShowAgeGroupFilter(false)
    setShowRegionFilter(false)
  }

  const handleShowAgeGroupFilter = () => {
    setShowNameFilter(false)
    setShowGenderFilter(false)
    setShowAgeGroupFilter(!showAgeGroupFilter)
    setShowRegionFilter(false)
  }

  const handleShowRegionFilter = () => {
    setShowNameFilter(false)
    setShowGenderFilter(false)
    setShowAgeGroupFilter(false)
    setShowRegionFilter(!showRegionFilter)
  }

  // console.log("showAll",showAll)

  /**
   * Use Context
   */
  const { tab, setBrandTab } = useContext(BrandImageGenerationContext);
  const { displayMessagePopup } = useContext(MessagePopupContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    setBrandProducts(brandDetails?.brand_product_v2 ?? []);
    setBrandTargetGroups(brandDetails?.brand_target_group_v2 ?? []);
    setproductid(null);
    setgroupid([]);
    setcampingname("");
    setobjective("");
    setFinalSubmitStatus(false);
  }, [brandDetails?.id]);

  const nextFromCampaignToMediaChannel = () => {
    setShowAll(false)
    setShowTargetGroupPopup(false)
    const groupid2 = [...new Set(groupid)];
    const data = {
      name: campingname,
      objective: objective,
      target_group_ids: groupid2,
      brand_id: brandDetails.id,
      workspace_id: Number(localStorage.getItem("workspace_id")),
    };

    if (productid) {
      data.product_ids = [productid];
    }

    if (campingname.length == 0 || groupid2.length === 0) {
      (function () {
        const error = () => {

          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please Select * marked Section
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    } else {
      campaignSubmitClick();
      callcampignapi(data);
    }
  };

  const clickonproduct = (id, index) => {
    setproductid((pid) => (pid !== null && pid === id ? null : id));
  };

  const clickontargetgroup = (id, index, groupIds) => {
    let newGroupIds = [];
    if (groupIds.includes(id)) {
      newGroupIds = groupIds.filter((gId) => gId !== id);
    } else {
      newGroupIds = [...groupIds, id];
    }

    if (newGroupIds.length > 5) {
      // displayMessagePopup(
      //   "handle-input-prod-logo",
      //   "error",
      //   "Error",
      //   "You have selected maximum target group.",
      // );
      (function () {
        const error = () => {


          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                You have selected maximum target group.
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        error(); // Invoke the Warning function immediately
      })();
      return;
    }

    setgroupid(newGroupIds);
  };

  const handleTargetGroupModal = () => {
    setTargetGroupPopup(false);
    settargegptid(null);
  };
  const handleAddProductModal = () => {
    setAddProductPopup(false);
    setProductError(false);
  };

  const handleDeletetargetPopup = () => {
    setdeletetargetPopup(true);
    setTargetGroupPopup(false);
  };
  const onDeleteTargetGroupHandler = (id) => {
    // hide popup
    setdeletetargetPopup(false);
    // remove deleted Target Group
    const newBrandTargetGroups = brandTargetGroups.filter(
      (brandTargetGroup) => brandTargetGroup.id !== id,
    );
    setBrandTargetGroups(newBrandTargetGroups);
    settargegptid(null);
    // refetch after delete
    queryClient.invalidateQueries({ queryKey: ["getProduct"] });
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
        brandProducts.filter((item, index) => item.id !== editproductid),
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
            { autoClose: 5000 },
          );
        };

        error(); // Invoke the error function immediately
      })();
      // Handle error, show error message to the user, etc.
    }
  }

  const clickontargetedit = (targetGroup) => {
    if (targetGroup) {
      setTargetGroupPopup(true);
      settargegptid(targetGroup.id);
    }
  };

  const onAddNewTargetHandler = (data) => {
    setBrandTargetGroups([...brandTargetGroups, data]);
    setTargetGroupIDS([...targetGroupIDS, data.id]);
    setTargetGroupPopup(false);
    settargegptid(null);
    // refetch after add
    queryClient.invalidateQueries({ queryKey: ["getProduct"] });
  };

  const onCancelTargetGroup = () => {
    setTargetGroupPopup(false);
    settargegptid(null);
  };

  const onEditTargetGroupHandler = (data) => {
    const newTargetGroup = brandTargetGroups.filter(
      (targetGroup) => targetGroup.id !== data.id,
    );
    setBrandTargetGroups([...newTargetGroup, data]);
    // updates ids
    const newIds = new Set([...targetGroupIDS, data.id]);
    setTargetGroupIDS(Array.from(newIds));
    setTargetGroupPopup(false);
    settargegptid(null);
    // refetch after edit
    queryClient.invalidateQueries({ queryKey: ["getProduct"] });
  };

  /**
   * Product edit click handler
   * @param {*} id
   */
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

  /**
   *
   */
  function onClickToAddProductHandler() {
    setAddProductPopup(true);
    setproductedit(false);
    setproductname("");
    setproductdiscrption("");
    seteditproductid(null);
  }

  /**
   * Product image change handles
   * @param event
   */

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
            { autoClose: 5000 },
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

  /**
   * Product logo remove handler
   * @param typeOfBrandLogo 'new' | 'edit' value can be one of 'new' or 'edit'
   * @param valueOfBrandLogo string | File when type is new then value should have File object and if type is edit then value should have string image file name
   */
  const removeProductLogo = (typeOfLogo, valueOfLogo) => {
    if (typeOfLogo === "new") {
      setProductLogos((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfLogo),
      );
    } else if (typeOfLogo === "edit") {
      setProductImages((brandLogos) =>
        brandLogos.filter((logo) => logo !== valueOfLogo),
      );
    }
  };

  /**
   * Product submit handler
   */
  const editproductnext = () => {
    if (!productname || productname.length == 0) {
      setProductError(true);
      setProductErrMessage("Product name is required");
      (function () {
        const error = () => {
          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please fill required data.
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    } else if (productname.length > 15) {
      setProductError(true);
      setProductErrMessage(
        "Product name should be a maximum of 15 characters.",
      );
    } else if (productname.trim() === "") {
      setProductError(true);
      setProductErrMessage("Product name cannot contain only spaces.");
    } else {
      setProductError(false);
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
              (product) => product.id !== editproductid,
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
        onError: (error) => {
          console.log("ERROR !", error);
        },
      });
    }
  };

  // return a preview for the image file object
  const getImagePreview = (imageFile) => {
    if (!imageFile) {
      return "";
    }

    // return URL.createObjectURL(imageFile);
    return imageFile;
  };

  const isActiveTab = tab === BRAND_TABS.CAMPAIGN;

  const onExpandHandler = () => {
    if (brandDetails) {
      if (tab !== BRAND_TABS.CAMPAIGN) {
        setBrandTab(BRAND_TABS.CAMPAIGN);
      } else {
        setBrandTab("");
      }
    } else {
      (function () {
        const error = () => {


          toast.warn(
            <>
              <span className="text-white text-[16px] leading-[20px]">
                {" "}
                Bad Request!
              </span>
              <br />
              <span className="text-white text-[12px] leading-[18px] truncate2lines mt-2">
                {" "}
                Please choose a brand and click next.
              </span>
            </>,
            { autoClose: 5000 },
          );
        };

        error(); // Invoke the Warning function immediately
      })();
    }
  };

  const onCampaignNameHandler = (e) => {
    setcampingname(e.target.value);
  };

  const onObjectiveHandler = (e) => {
    setobjective(e.target.value);
  };

  const onBackHandler = () => {
    setBrandTab(BRAND_TABS.BRANDING);
  };

  return (
    <>
      <div className={classNames(`rounded-lg`,isActiveTab?"bg-[#332270]":"bg-[#23145A]")}>
        <h2 className="mb-0">
          <div
            className={classNames(
              `group relative flex w-full items-center border-0 px-5 py-4 text-left text-base cursor-pointer text-white rounded-lg`,
            )}
            onClick={() => onExpandHandler()}
            aria-expanded={"true"}
            aria-controls="collapseOne"
          >
            <div className="flex w-full justify-between items-center">
              <div
                className={classNames(
                  `w-[50%] md:w-full flex font-bold`,
                  isActiveTab
                    ? "text-nyx-yellow text-xl "
                    : "text-white text-sm",
                )}
              >
                Campaign Overview
              </div>
            </div>

            <span
              className={classNames(
                "ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none",
                isActiveTab ? `rotate-[-180deg] -mr-1` : `dark:fill-white`,
              )}
            >
              <ArrowIcon className="h-6 w-6" />
            </span>
          </div>
        </h2>
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: isActiveTab ? "auto" : 0,
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          className=" w-full overflow-hidden rounded-lg"
        >
          <div className="md:px-5 sm:px-4">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5 w-full">
                <div className="w-full flex flex-col">
                  <div style={popupHeader2}>
                    Campaign Name <span className="text-[#D13946]">*</span>
                  </div>
                  {brandDetails ? (
                    <input
                      type="text"
                      value={campingname}
                      className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 text-sm font-normal placeholder:text-sm text-[#FFFFFF] placeholder:italic"
                      placeholder="Eg - Super Sale"
                      onChange={onCampaignNameHandler}
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "Eg - Super Sale")}
                    />
                  ) : (
                    <div className="w-full h-8 bg-[#8297BD] rounded-md p-2 animate-pulse"></div>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  <div style={popupHeader2}>Objective</div>
                  {brandDetails ? (
                    <input
                      type="text"
                      value={objective}
                      className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 text-sm font-normal placeholder:text-sm text-[#FFFFFF]  placeholder:italic"
                      placeholder="Eg - Campaign for Diwali"
                      onChange={onObjectiveHandler}
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) =>
                        (e.target.placeholder = "Eg - Campaign for Diwali")
                      }
                    />
                  ) : (
                    <div className="w-full h-8 bg-[#8297BD] rounded-md p-2 animate-pulse"></div>
                  )}
                </div>

                <div className="w-full flex flex-col">
                  <div style={popupHeader2}>Choose Product</div>

                  <div className="w-full flex flex-wrap gap-2">
                    {brandProducts?.map((product, index) => (
                      <ProductChip
                        key={`product-${product.id}`}
                        selectedId={productid}
                        product={product}
                        index={index}
                        onClick={clickonproduct}
                        onEdit={onclickonedit}
                      />
                    ))}
                    <button
                      className="bg-[#1D1138] hover:shadow-gray-800 shadow-none hover:shadow-md h-max w-max text-[#FFFFFF] rounded-md text-lg py-1 px-3 active:bg-[#5E32FF] active:text-white"
                      onClick={onClickToAddProductHandler}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="w-full flex flex-col relative">
                  <div style={popupHeader2}>
                    Choose Your Target Group{" "}
                    <span className="text-[#D13946]">*</span>
                  </div>

                  <div className="w-full flex flex-wrap justify-around gap-2 max-h-[700px] overflow-y-scroll">
                    <div className="hover:shadow-gray-800 shadow-none hover:shadow-md">
                      <div className="relative bg-[#452A80] w-[131px] h-[36px] rounded-t-lg text-[#FFF] p-2 flex items-center justify-between group font-medium border border-transparent">
                        <div className="text-xs font-semibold">
                          Add Target Group
                        </div>
                      </div>
                      <div className="bg-[#6653B4] w-[131px] h-[100px] rounded-b-lg flex justify-center items-center">
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
                    {visibleGroups?.map((targetGroup) => (
                      <Group
                        key={`brandTargetGroups-${targetGroup?.id}`}
                        onClick={clickontargetgroup}
                        groupIds={groupid}
                        targetGroup={targetGroup}
                      >
                        <GroupHead
                          targetGroup={targetGroup}
                          onEdit={clickontargetedit}
                        >
                          {targetGroup?.name}
                        </GroupHead>
                        <GroupBody
                          ageGroup={targetGroup?.age_group}
                          gender={targetGroup?.gender}
                          region={targetGroup?.region}
                        />
                      </Group>
                    ))}
                    
                  </div>
                  {brandTargetGroups?.length > 6 && (
                  <div className="relative">
                  <div onClick={handleShowTargetGroupModal} className="absolute right-0 text-nyx-yellow underline underline-offset-2 bottom-0 -mb-6 mr-3 overflow-visible seeMore hover:brightness-75 cursor-pointer">
                    See More
                  </div>
                  </div>)}

                  <div className="w-full flex justify-center items-center gap-3 mt-10 mb-5">
                    {/* {campingname.length > 0 && groupid.length > 0 ? (
                      <Button
                        className="rounded-full w-[109px] hover:shadow-none font-semibold py-1.5"
                        onClick={nextFromCampaignToMediaChannel}
                      >
                        {campaignLoading ? <ButtonLoading /> : "Next"}
                      </Button>
                    ) : (
                      <DisabledButton>Next</DisabledButton>
                    )} */}

                    <Button
                      className="rounded-full w-[109px] hover:shadow-none font-semibold py-1.5 text-nyx-yellow"
                      onClick={nextFromCampaignToMediaChannel}
                    >
                      {campaignLoading ? <ButtonLoading /> : "Next"}
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
          <div className="flex justify-between">
            <div className="text-base font-bold text-[#FFFFFF]">
              {productedit ? "Edit Product" : "Add Product"}
            </div>

            <div className="flex gap-1">
              {productedit ? (
                <div
                  className="cursor-pointer flex"
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

              <div className="cursor-pointer" onClick={handleAddProductModal}>
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
          <div className="w-full flex flex-col mt-3">
            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-sm font-bold">
                Product Name <span className="text-[#D13946]">*</span>
              </div>
              <input
                type="text"
                className={`placeholder:text-sm w-full bg-transparent border ${productError ? "border-nyx-red" : "border-[#8297BD]"} rounded-md p-2 font-normal text-[#FFFFFF]  placeholder:italic`}
                placeholder="Add Product Name"
                value={productname}
                onChange={(e) => setproductname(e.target.value)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Add Product Name")}
              />

              {productError ? (
                <p className="text-nyx-red text-xs">{productErrMessage}</p>
              ) : null}
            </div>

            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-sm font-bold">
                Product Description
              </div>

              <textarea
                className="placeholder:text-sm placeholder:italic placeholder:text-[#8297BD] w-full bg-transparent border border-[#8297BD] rounded-md h-[80px] p-2 font-lighter text-[#FFFFFF]"
                placeholder="Product Description"
                //@ts-ignore
                value={productdiscrption}
                onChange={(e) => setproductdiscrption(e.target.value)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "Add Product Description")
                }
                maxLength={500}
              ></textarea>
              <p
                className={`text-right text-xs font-normal ${productdiscrption.length === 500 ? "text-[#E26971]" : "text-[#FFFFFF]"}`}
              >
                {productdiscrption.length === 500
                  ? "Maximum word limit reached"
                  : ""}
                {"                                      "}
                {productdiscrption.length}/500
              </p>
            </div>
            <div className="w-full flex flex-col">
              <div style={popupHeader2} className="text-sm font-bold">
                Product Logos
              </div>

              <div className="flex flex-wrap gap-3">
                {productImages?.map((pimage, index) => (
                  <div key={index} className="group relative">
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
                    className="group relative"
                  >
                    <div className="bg-[#452A80] w-[150px] h-[55px] rounded-t-lg text-[#FFF] px-2 py-4 font-medium">
                      Logo Preview {index + productImages.length + 1}
                    </div>
                    <div className="bg-[#6653B4] w-[150px]  h-[99px] rounded-b-lg flex justify-center items-center flex-col">
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

                <div className="">
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
                className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={handleAddProductModal}
              >
                Cancel
              </Button>
              <Button
                className="text-sm text-nyx-yellow font-[600] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={editproductnext}
              >
                {mutateAddProductFile.isPending ? "Loading.." : "Next"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      {deletePopup ? (
        <Modal
          isOpen={deletePopup}
          style={deletePopupStyle}
          onRequestClose={handleTargetGroupModal}
        >
          <div className="flex justify-between">
            <div className="text-base font-bold text-[#FFFFFF]">Delete</div>

            <div
              className="cursor-pointer"
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
          <div className="w-full flex flex-col gap-6">
            <div className="w-full text-center text-[#FFFFFF] text-sm font-[600]">
              Are you sure you want to delete this Product?
            </div>

            <div className="w-full flex gap-4 justify-center items-center">
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={() => {
                  setDeletePopup(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="text-sm font-semibold text-[#FFCB54] rounded-full w-[97px] px-2 h-[36px] hover:shadow-none"
                onClick={() => deletebuttonpopup()}
              >
                {isLoading ? "Deleteing.." : "Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      {/* Add New Target Group */}
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
                (brandTargetGroup) => brandTargetGroup.id === targegpid,
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
              
              <div className="cursor-pointer" onClick={ () => handleCloseTgModel()}>
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
              <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 14L11.6667 11.6667M13.3333 7.66667C13.3333 10.7963 10.7963 13.3333 7.66667 13.3333C4.53705 13.3333 2 10.7963 2 7.66667C2 4.53705 4.53705 2 7.66667 2C10.7963 2 13.3333 4.53705 13.3333 7.66667Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </div>

            <input type="text" placeholder="Search your Target Group" onChange={e=>setEnteredTgGroup(e.target.value)} value={enteredTgGroup}
            className="placeholder-[#8297BD] text-white bg-[#332270] w-full focus:outline-none focus:ring-0 focus:border-transparent
            " />

            </div>

          <div className=" overflow-auto h-[60vh] mt-[14px] scrollable-container">
            <table className="w-full bg-[#23145A] overflow-hidden pb-4">
              <thead className="bg-[#091234] h-[44px] sticky top-0 z-10">
                <tr className="text-[#E9BD4E] bg-[#091234] text-[14px] leading-[18px]">
                  <th className="px-2 text-left pl-4"></th>
                  <th className="px-5 text-left">
                    <div className="flex gap-1 justify-start relative text-left">{"Target Group"} 

                  <div onClick={() => setShowNameFilter(handleShowNameFilter)} >
                  <svg className={`transition-transform duration-200 ${showNameFilter ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z" fill="#E8EAED"/>
                  </svg>
                  </div>

                  {showNameFilter && 
                  <div className="absolute z-[1000] ml-28 mt-6 w-18 rounded-md text-[12px] shadow-lg bg-[#332270] text-white">
                    <div
                      className={`px-3 py-2 cursor-pointer rounded-t-md hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${nameorder === "A-Z" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleNameSelect("A-Z")}
                    >
                      A-Z
                    </div>
                    <div
                      className={`px-3 py-2 rounded-b-md cursor-pointer hover:bg-nyx-yellow hover:text-black ${nameorder === "Z-A" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleNameSelect("Z-A")}
                    >
                      Z-A
                    </div>
                  </div>
                  }

                  </div>
                  </th>
                  <th  className="px-5 text-left">
    
                  <div className="flex gap-1 justify-start relative text-left">{"Gender"} 
                  <div onClick={() => setShowGenderFilter(handleShowGenderFilter)} >
                  <svg className={`transition-transform duration-200 ${showGenderFilter ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z" fill="#E8EAED"/>
                  </svg>
                  </div>

                  {showGenderFilter && 
                  <div className="z-[1000] absolute ml-16 mt-6 w-18 text-[12px] rounded-md shadow-lg bg-[#332270] text-white">
                    <div
                      className={`px-3 py-2 cursor-pointer rounded-t-md hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${gender === "Male" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleGenderSelect("Male")}
                    >
                      Male
                    </div>
                    <div
                      className={`px-4 py-2  cursor-pointer hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${gender === "Female" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleGenderSelect("Female")}
                    >
                      Female
                    </div>
                    <div
                      className={`px-4 py-2 cursor-pointer hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${gender === "All" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleGenderSelect("all")}
                    >
                      All
                    </div>
                    <div
                      className={`px-4 py-2 rounded-b-md cursor-pointer hover:bg-nyx-yellow hover:text-black ${gender === "Reset" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleGenderSelect("Reset")}
                    >
                      Reset
                    </div>
                  </div>
                  }

                  </div>
                  
                  </th>
                  {/* age group header */}
                  
                  <th className="px-5 text-left">

                  <div className="flex gap-1 justify-start relative text-left ">{"Age Group"} 
                  <div onClick={() => setShowAgeGroupFilter(handleShowAgeGroupFilter)} >
                  <svg className={`transition-transform duration-200 ${showAgeGroupFilter ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z" fill="#E8EAED"/>
                  </svg>
                  </div>

                  {showAgeGroupFilter && 
                  <div className="z-[1000] absolute ml-24 mt-6 text-[12px] rounded-md shadow-lg bg-[#332270] text-white ">
                    <div
                      className={`px-3 py-2 cursor-pointer rounded-t-md whitespace-nowrap inline-block hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${ageGroup === "Male" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleAgeGroupSelect("High to Low")}
                    >
                      High to Low
                    </div>
                    <div
                      className={`px-3 py-2 rounded-b-md cursor-pointer whitespace-nowrap inline-block hover:bg-nyx-yellow hover:text-black ${ageGroup === "Female" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleAgeGroupSelect("Low to High")}
                    >
                      Low to High
                    </div>
                  </div>
                  }
                  </div>

                  </th>
                  
                  <th className="px-5 text-left">
                    
                  <div className="flex gap-1 justify-start relative text-left">{"Region"} 
                  <div onClick={() => setShowRegionFilter(handleShowRegionFilter)} >
                  <svg className={`transition-transform duration-200 ${showRegionFilter ? 'rotate-180' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 6L9 13.5L1.5 6L2.83125 4.66875L9 10.8375L15.1688 4.66875L16.5 6Z" fill="#E8EAED"/>
                  </svg>
                  </div>

                  {showRegionFilter && 
                  <div className="z-[1000] absolute ml-16 mt-6 w-18 text-[12px] rounded-md shadow-lg bg-[#332270] text-white ">
                    <div
                      className={`px-3 py-2 cursor-pointer rounded-t-md hover:bg-nyx-yellow hover:text-black border-b border-[#23145A] border-1 ${region === "A-Z" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleRegionSelect("A-Z")}
                    >
                      A-Z
                    </div>
                    <div
                      className={`px-3 py-2 rounded-b-md cursor-pointer hover:bg-nyx-yellow hover:text-black ${ageGroup === "Female" ? "bg-yellow-500 text-black" : ""}`}
                      onClick={() => handleRegionSelect("Z-A")}
                    >
                      Z-A
                    </div>
                  </div>
                  }
                  </div>
                  </th>
                  <th className="px-5 text-left">Language</th>
                  <th className="px-5 text-left">Interests</th>
                </tr>
              </thead>
              <tbody>
                {visibleGroups?.length > 0 ? (
                      <>
                        {visibleGroups?.map((item,rowIndex) => {
                          // const isExpanded = expandedRows[item.id || rowIndex];
                          return (
                            <tr onClick={() => clickontargetgroup(item.id,"brandTargetGroups"-item?.id, groupid)} className={classNames("border-b border-solid border-[#503193] text-white font-normal text-sm hover:bg-[#5E33FF]",
                              groupid?.includes(item?.id)
                              ? "bg-[#5E32FF] border border-[#5E32FF] text-nyx-yellow"
                              : "bg-[#23145A] text-white",
                            )} key={`brandTargetGroups-${item?.id}` || rowIndex}
                            //  onClick={clickontargetgroup(item?.id,index)} 
                             >
                              <td className="px-2 py-4 pl-4">
                                <div className="relative group cursor-pointer">
                                  
                                  <div className="max-w-[200px] truncate font-semibold">
                                  {groupid?.includes(item?.id)?
                                  
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M7.71667 12.85L14.1792 6.3875L12.8958 5.10417L7.71667 10.2833L5.10417 7.67083L3.82083 8.95417L7.71667 12.85ZM2.58333 17.25C2.07917 17.25 1.64757 17.0705 1.28854 16.7115C0.929514 16.3524 0.75 15.9208 0.75 15.4167V2.58333C0.75 2.07917 0.929514 1.64757 1.28854 1.28854C1.64757 0.929514 2.07917 0.75 2.58333 0.75H15.4167C15.9208 0.75 16.3524 0.929514 16.7115 1.28854C17.0705 1.64757 17.25 2.07917 17.25 2.58333V15.4167C17.25 15.9208 17.0705 16.3524 16.7115 16.7115C16.3524 17.0705 15.9208 17.25 15.4167 17.25H2.58333ZM2.58333 15.4167H15.4167V2.58333H2.58333V15.4167Z" fill="#F1BB2E"/>
                                  </svg>
                                  :
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.58333 17.25C2.07917 17.25 1.64757 17.0705 1.28854 16.7115C0.929514 16.3524 0.75 15.9208 0.75 15.4167V2.58333C0.75 2.07917 0.929514 1.64757 1.28854 1.28854C1.64757 0.929514 2.07917 0.75 2.58333 0.75H15.4167C15.9208 0.75 16.3524 0.929514 16.7115 1.28854C17.0705 1.64757 17.25 2.07917 17.25 2.58333V15.4167C17.25 15.9208 17.0705 16.3524 16.7115 16.7115C16.3524 17.0705 15.9208 17.25 15.4167 17.25H2.58333ZM2.58333 15.4167H15.4167V2.58333H2.58333V15.4167Z" fill="#E8EAED"/>
                                  </svg>
                                  }

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
                                   {item?.age_group ? item.age_group.split(',')[0].trim() : "-"}
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
                                    {item.interests ? item?.interests :"-"}
                                  </p>
                                  <div className="max-w-[200px] truncate font-semibold">
                                  {item.interests ? item?.interests :"-"}
                                  </div>
                                </div>
                              </td>

                            </tr>
  
                          )
                        })}
                      </>
                    ) : (
                      <>
                        <tr className="bg-nyx-blue-4 text-white font-normal border-b-[1px] border-[#8297BD]">
                          <td colSpan={6} className="px-6 py-6 text-[18px] text-center">
                            No Rule Data Found!
                          </td>
                        </tr>
                      </>
                    )}
              </tbody>
            </table>
          </div>

          <div className="mx-auto text-center gap-5 flex justify-center pt-5">
            <div onClick={handleCloseTgModel} className="text-white border-2 px-5 py-2 rounded-full border-white w-[100px] hover:bg-nyx-yellow hover:text-black hover:font-bold hover:border-nyx-yellow">
              Save
            </div>
            {/* <div onClick={nextFromCampaignToMediaChannel} className="text-nyx-yellow border-2 px-5 py-2 rounded-full border-nyx-yellow w-[100px] hover:bg-nyx-yellow hover:text-black hover:font-bold">
              Next
            </div> */}
          </div>
          </div>
        </Modal>
      ) : null}

    </>
  );
};

export default Campaign;
