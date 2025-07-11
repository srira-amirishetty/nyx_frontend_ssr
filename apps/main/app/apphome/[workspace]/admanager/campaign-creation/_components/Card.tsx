import React, { useEffect, useState } from "react";
import "./index.css";
import FileSVGIcon from "@nyx-frontend/main/components/Icons/FileSVGIcon";
import LocationSVGIcon from "@nyx-frontend/main/components/Icons/LocationSVGIcon";
import PeopleSVGIcon from "@nyx-frontend/main/components/Icons/PeopleSVGIcon";
import Modal from "react-modal";
import { showTGPopupStyle } from "../../../../../../utils/modalstyles";
import classNames from "../../../../../../utils/classNames";


export const Card = ({
  tab,
  setTargetGroupPopup,
  setAudiencesetpopup,
  setLookAlike,
  list,
  handleClick,
  handleClickOnTargetGroupEdit,
  targetGrps,
}: any) => {

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

    



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Ensure list exists and is an array
  const targetGroups = list?.brand_target_group_v2 || [];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = targetGroups.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
        setVisibleGroups(targetGroups)
      },[targetGroups])

  let visibleGroupss
  
    useEffect(()=>{
  
      if(!targetGroups || targetGroups.length === 0) {console.log("stopped here at sorting by showall"); return;}
  
      visibleGroupss = [];
  
      if (showAll) {
      visibleGroupss = targetGroups;
    } else {
    const selectedGroups = targetGroups.filter((item) =>
      targetGrps?.includes(item.id)
    );

    const nonSelectedInitials = targetGroups.filter(
      (item) => !targetGrps?.includes(item.id)
    );

    const remainingSlots = 7 - selectedGroups.length;
    const additionalItems = nonSelectedInitials.slice(0, Math.max(remainingSlots, 0));

    visibleGroupss = [...selectedGroups, ...additionalItems];

    }
      // console.log("visibleGroups1",visibleGroupss)
      setVisibleGroups(visibleGroupss)
    },[showAll,targetGroups,targetGrps])

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
      if (!targetGroups || targetGroups.length === 0) return;

       const isAnyFilterApplied =
    (enteredTgGroup && enteredTgGroup.trim() !== "") ||
    (gender && gender !== "Reset") ||
    (nameorder && nameorder !== "") ||
    (ageGroup && ageGroup !== "") ||
    (region && region !== "");

  if (!isAnyFilterApplied) return; //  don't run on first render unless user has filtered
    
      let result = [...targetGroups];
    
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



  // Calculate total pages
  const totalPages = Math.ceil(targetGroups.length / itemsPerPage);

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Gender Lable 
  function getGenderLabel(value: string): string {
    const lower = value.toLowerCase();
    if (lower.includes('all')) return 'All';
    if (lower.includes('male') && lower.includes('female')) return 'All';
    return value;
  }

  return (
    <>
      <div className="block xl:hidden">
        <div className=" w-full text-white  relative flex flex-wrap gap-y-2">
          <div className="px-2 mt-1">
            <div className="bg-[#6653B4] w-[67px] h-[69px] rounded-lg flex flex-col justify-between items-center text-[#FFF] font-medium relative overflow-hidden hover:border-[0.5px] border-white">
              <div className="flex-grow flex justify-center items-center">
                <button
                  className=""
                  onClick={() => {
                    if (tab === "Generic") setTargetGroupPopup(true);
                    if (tab === "Custom") setAudiencesetpopup(true);
                    if (tab === "Lookalike") setLookAlike(true);
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.637 9.064C16.637 13.5291 13.0173 17.1487 8.55228 17.1487C4.08721 17.1487 0.467564 13.5291 0.467564 9.064V8.55335C0.467564 4.08829 4.08721 0.468643 8.55228 0.468643C13.0173 0.468643 16.637 4.08829 16.637 8.55336V9.064Z"
                      stroke="#FFCB54"
                      strokeWidth="0.936954"
                    />
                    <path
                      d="M11.4212 8.81282C11.4212 8.90682 11.385 8.99696 11.3204 9.06343C11.2559 9.12989 11.1684 9.16723 11.0771 9.16723H8.89753V11.4119C8.89753 11.5058 8.86127 11.596 8.79673 11.6625C8.73219 11.7289 8.64466 11.7663 8.55338 11.7663C8.46211 11.7663 8.37458 11.7289 8.31004 11.6625C8.2455 11.596 8.20924 11.5058 8.20924 11.4119V9.16723H6.02969C5.93842 9.16723 5.85088 9.12989 5.78634 9.06343C5.7218 8.99696 5.68555 8.90682 5.68555 8.81282C5.68555 8.71882 5.7218 8.62868 5.78634 8.56221C5.85088 8.49575 5.93842 8.45841 6.02969 8.45841H8.20924V6.21379C8.20924 6.11979 8.2455 6.02965 8.31004 5.96318C8.37458 5.89671 8.46211 5.85938 8.55338 5.85938C8.64466 5.85938 8.73219 5.89671 8.79673 5.96318C8.86127 6.02965 8.89753 6.11979 8.89753 6.21379V8.45841H11.0771C11.1684 8.45841 11.2559 8.49575 11.3204 8.56221C11.385 8.62868 11.4212 8.71882 11.4212 8.81282Z"
                      fill="#FFCB54"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full bg-[#1D1138] h-[23px] flex justify-center items-center text-[8px] font-normal rounded-b-lg">
                Add {tab === "Generic" && <span> Target</span>}
                {tab === "Custom" && <span> Custom</span>}
                {tab === "Lookalike" && <span> Lookalike</span>}
              </div>
            </div>
          </div>
          {currentItems.map((targetGroup: any, index: number) => (
            <div
              key={index}
              className=" cursor-pointer px-2 mt-1"
              onClick={() => handleClick(targetGroup.id)}
            >
              <div
                className={`hite rounded-lg flex flex-col justify-between items-center ${
                  // targetGrps == targetGroup.id
                  Array.isArray(targetGrps) &&
                    targetGrps?.includes(targetGroup.id)
                    ? "border border-[#5E32FF]"
                    : "border border-transparent"
                  }`}
              >
                {!targetGroup.name.includes("META LA") &&
                  !targetGroup.name.includes("GOOGLE LA") &&
                  !targetGroup.name.includes("META CA") &&
                  !targetGroup.name.includes("GOOGLE CA") ? (
                  <div className="w-full flex flex-col  ">
                    <div
                      className="flex w-full gap-1"
                      title={targetGroup?.age_group}
                    >
                      <svg
                        width="7"
                        height="9"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20%]"
                      >
                        <path
                          d="M7.49125 11.5609C7.23114 11.5609 7.01129 11.4711 6.83169 11.2915C6.65209 11.1119 6.56229 10.892 6.56229 10.6319C6.56229 10.3718 6.65209 10.1519 6.83169 9.97233C7.01129 9.79273 7.23114 9.70293 7.49125 9.70293C7.75136 9.70293 7.97121 9.79273 8.15081 9.97233C8.33041 10.1519 8.42021 10.3718 8.42021 10.6319C8.42021 10.892 8.33041 11.1119 8.15081 11.2915C7.97121 11.4711 7.75136 11.5609 7.49125 11.5609ZM11.9503 11.5609C11.6902 11.5609 11.4703 11.4711 11.2907 11.2915C11.1111 11.1119 11.0213 10.892 11.0213 10.6319C11.0213 10.3718 11.1111 10.1519 11.2907 9.97233C11.4703 9.79273 11.6902 9.70293 11.9503 9.70293C12.2104 9.70293 12.4302 9.79273 12.6098 9.97233C12.7894 10.1519 12.8792 10.3718 12.8792 10.6319C12.8792 10.892 12.7894 11.1119 12.6098 11.2915C12.4302 11.4711 12.2104 11.5609 11.9503 11.5609ZM9.72076 15.8341C11.3805 15.8341 12.7863 15.2581 13.9382 14.1062C15.0902 12.9543 15.6661 11.5485 15.6661 9.88873C15.6661 9.59146 15.6475 9.30348 15.6104 9.02479C15.5732 8.7461 15.5051 8.4767 15.406 8.21659C15.1459 8.27853 14.8858 8.32497 14.6257 8.35594C14.3656 8.3869 14.0931 8.40239 13.8082 8.40239C12.681 8.40239 11.6158 8.16086 10.6126 7.6778C9.60928 7.19474 8.75464 6.51969 8.04863 5.65266C7.65227 6.61878 7.0856 7.45794 6.34863 8.17015C5.61165 8.88235 4.75391 9.41805 3.7754 9.77725V9.88873C3.7754 11.5485 4.35136 12.9543 5.50327 14.1062C6.65518 15.2581 8.06101 15.8341 9.72076 15.8341ZM9.72076 17.3204C8.69271 17.3204 7.72659 17.1253 6.8224 16.7352C5.91821 16.345 5.13169 15.8155 4.46283 15.1467C3.79398 14.4778 3.26447 13.6913 2.87431 12.7871C2.48414 11.8829 2.28906 10.9168 2.28906 9.88873C2.28906 8.86067 2.48414 7.89455 2.87431 6.99037C3.26447 6.08618 3.79398 5.29965 4.46283 4.6308C5.13169 3.96195 5.91821 3.43244 6.8224 3.04228C7.72659 2.65211 8.69271 2.45703 9.72076 2.45703C10.7488 2.45703 11.7149 2.65211 12.6191 3.04228C13.5233 3.43244 14.3098 3.96195 14.9787 4.6308C15.6475 5.29965 16.177 6.08618 16.5672 6.99037C16.9574 7.89455 17.1525 8.86067 17.1525 9.88873C17.1525 10.9168 16.9574 11.8829 16.5672 12.7871C16.177 13.6913 15.6475 14.4778 14.9787 15.1467C14.3098 15.8155 13.5233 16.345 12.6191 16.7352C11.7149 17.1253 10.7488 17.3204 9.72076 17.3204ZM8.71748 4.03627C9.2377 4.9033 9.94371 5.60002 10.8355 6.12643C11.7273 6.65284 12.7182 6.91605 13.8082 6.91605C13.9816 6.91605 14.1488 6.90676 14.3098 6.88818C14.4708 6.8696 14.6381 6.84792 14.8115 6.82315C14.2912 5.95612 13.5852 5.2594 12.6934 4.73299C11.8016 4.20658 10.8107 3.94337 9.72076 3.94337C9.54735 3.94337 9.38014 3.95266 9.21912 3.97124C9.0581 3.98982 8.89088 4.01149 8.71748 4.03627ZM4.09125 8.01222C4.72294 7.65302 5.27413 7.18854 5.7448 6.61878C6.21547 6.04902 6.56848 5.41113 6.80382 4.70512C6.17212 5.06432 5.62094 5.5288 5.15026 6.09856C4.67959 6.66832 4.32659 7.30621 4.09125 8.01222Z"
                          fill="#ffffff84"
                          fillOpacity="0.5"
                        />
                      </svg>
                      <p className="w-[80%] text-[#FFFFFF80] text-[8px]  font-normal truncate">
                        {targetGroup?.age_group}
                      </p>
                    </div>
                    <div
                      className="flex w-full gap-1"
                      title={targetGroup?.gender}
                    >
                      <svg
                        width="7"
                        height="9"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20%]"
                      >
                        <path
                          d="M4.896 16.7306V11.1568H3.78125V7.06937C3.78125 6.66063 3.92679 6.31072 4.21786 6.01965C4.50894 5.72857 4.85885 5.58303 5.26759 5.58303H7.4971C7.90584 5.58303 8.25575 5.72857 8.54682 6.01965C8.8379 6.31072 8.98344 6.66063 8.98344 7.06937V11.1568H7.86868V16.7306H4.896ZM6.38234 4.83987C5.9736 4.83987 5.62369 4.69433 5.33262 4.40325C5.04154 4.11218 4.896 3.76227 4.896 3.35353C4.896 2.94478 5.04154 2.59487 5.33262 2.3038C5.62369 2.01272 5.9736 1.86719 6.38234 1.86719C6.79109 1.86719 7.141 2.01272 7.43207 2.3038C7.72314 2.59487 7.86868 2.94478 7.86868 3.35353C7.86868 3.76227 7.72314 4.11218 7.43207 4.40325C7.141 4.69433 6.79109 4.83987 6.38234 4.83987ZM11.9561 16.7306V12.2716H9.72661L11.6217 6.58631C11.7208 6.26427 11.9035 6.01655 12.1698 5.84314C12.4361 5.66974 12.7364 5.58303 13.0709 5.58303C13.4053 5.58303 13.7057 5.66974 13.972 5.84314C14.2383 6.01655 14.421 6.26427 14.52 6.58631L16.4151 12.2716H14.1856V16.7306H11.9561ZM13.0709 4.83987C12.6621 4.83987 12.3122 4.69433 12.0211 4.40325C11.7301 4.11218 11.5845 3.76227 11.5845 3.35353C11.5845 2.94478 11.7301 2.59487 12.0211 2.3038C12.3122 2.01272 12.6621 1.86719 13.0709 1.86719C13.4796 1.86719 13.8295 2.01272 14.1206 2.3038C14.4117 2.59487 14.5572 2.94478 14.5572 3.35353C14.5572 3.76227 14.4117 4.11218 14.1206 4.40325C13.8295 4.69433 13.4796 4.83987 13.0709 4.83987Z"
                          fill="#ffffff84"
                          fillOpacity="0.5"
                        />
                      </svg>

                      <p className="w-[80%] text-[#FFFFFF80] text-[8px] font-normal">
                        {targetGroup?.gender}
                      </p>
                    </div>
                    <div
                      className="flex w-full gap-1"
                      title={targetGroup?.location}
                    >
                      <svg
                        width="7"
                        height="9"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20%]"
                      >
                        <path
                          d="M9.72661 9.70513C10.1353 9.70513 10.4853 9.5596 10.7763 9.26852C11.0674 8.97745 11.2129 8.62754 11.2129 8.21879C11.2129 7.81005 11.0674 7.46014 10.7763 7.16907C10.4853 6.87799 10.1353 6.73245 9.72661 6.73245C9.31786 6.73245 8.96795 6.87799 8.67688 7.16907C8.3858 7.46014 8.24027 7.81005 8.24027 8.21879C8.24027 8.62754 8.3858 8.97745 8.67688 9.26852C8.96795 9.5596 9.31786 9.70513 9.72661 9.70513ZM9.72661 15.1674C11.2377 13.7802 12.3587 12.5199 13.0894 11.3866C13.8202 10.2532 14.1856 9.24684 14.1856 8.36743C14.1856 7.01734 13.7552 5.91187 12.8944 5.05103C12.0335 4.1902 10.9776 3.75978 9.72661 3.75978C8.4756 3.75978 7.41968 4.1902 6.55885 5.05103C5.69801 5.91187 5.26759 7.01734 5.26759 8.36743C5.26759 9.24684 5.63298 10.2532 6.36376 11.3866C7.09455 12.5199 8.21549 13.7802 9.72661 15.1674ZM9.72661 17.1368C7.73243 15.4399 6.243 13.8638 5.2583 12.4084C4.2736 10.953 3.78125 9.60604 3.78125 8.36743C3.78125 6.5095 4.37888 5.02936 5.57415 3.92699C6.76941 2.82462 8.15356 2.27344 9.72661 2.27344C11.2996 2.27344 12.6838 2.82462 13.8791 3.92699C15.0743 5.02936 15.672 6.5095 15.672 8.36743C15.672 9.60604 15.1796 10.953 14.1949 12.4084C13.2102 13.8638 11.7208 15.4399 9.72661 17.1368Z"
                          fill="#ffffff84"
                          fillOpacity="0.5"
                        />
                      </svg>

                      <p className="w-[80%] text-[#FFFFFF80] text-[8px] font-normal truncate">
                        {targetGroup?.location}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-[#ffffff84] text-[8px] w-full  flex flex-col  ">
                    <div className="flex gap-1">
                      <div>
                        <FileSVGIcon className="w-[7px] h-[9px]" />
                      </div>
                      <div className="truncate">
                        {targetGroup?.name.includes("META CA") ||
                          targetGroup?.name.includes("GOOGLE CA")
                          ? targetGroup?.advanced?.data?.name
                          : targetGroup?.name}
                      </div>
                    </div>
                    <div className="flex gap-x-1">
                      <div>
                        <PeopleSVGIcon className="w-[7px] h-[9px]" />
                      </div>
                      <div>
                        {targetGroup.advanced.data.approximate_count_lower_bound
                          ? targetGroup.advanced.data
                            .approximate_count_lower_bound -
                          targetGroup.advanced.data
                            .approximate_count_upper_bound
                          : 100000}
                      </div>
                    </div>
                    <div className="flex gap-x-1">
                      <div>
                        <LocationSVGIcon className="w-[7px] h-[9px]" />
                      </div>
                      <div>{targetGroup.location || "India"}</div>
                    </div>
                  </div>
                )}
                <div
                  className={`absolute top-[50px] cursor-pointer  w-[65px] h-[22px]  rounded-b-lg text-[#FFF] px-2 flex items-center justify-between group ${
                    // targetGrps == targetGroup.id
                    Array.isArray(targetGrps) &&
                      targetGrps?.includes(targetGroup.id)
                      ? "bg-[#5E32FF]"
                      : "bg-[#1D1138]"
                    } `}
                  title={targetGroup?.name}
                >
                  <div
                    className={`first-letter:uppercase lowercase font-semibold w-[14ch] truncate text-[8px] ${
                      // targetGrps == targetGroup.id
                      Array.isArray(targetGrps) &&
                        targetGrps?.includes(targetGroup.id)
                        ? "text-nyx-yellow"
                        : "text-white"
                      }`}
                  >
                    {targetGroup.name.includes("META LA") ||
                      targetGroup.name.includes("GOOGLE LA") ||
                      targetGroup.name.includes("GOOGLE CA") ||
                      targetGroup.name.includes("META CA")
                      ? targetGroup.advanced.data.name
                      : targetGroup.name}
                  </div>
                  <div
                    onClick={() => {
                      if (
                        targetGroup.name.includes("META LA") ||
                        targetGroup.name.includes("GOOGLE LA") ||
                        targetGroup.name.includes("META CA") ||
                        targetGroup.name.includes("GOOGLE CA")
                      )
                        handleClickOnTargetGroupEdit(targetGroup, true);
                      else handleClickOnTargetGroupEdit(targetGroup, false);
                    }}
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
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-[100%] overflow-x-scroll flex justify-center items-center mt-5 space-x-2 pb-2 scrollbar-thin">
          {pageNumbers.length > 1 && (
            <>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={` w-5 h-5 text-[8px] flex items-center justify-center rounded
              ${currentPage === number
                      ? "bg-[#5E32FF] text-white"
                      : "bg-[#50387B] text-white"
                    }`}
                >
                  {number}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="hidden xl:block">
        <div className=" w-full text-white  relative flex flex-wrap gap-y-2  ">
          <div className="px-3 mt-1">
            <div className="bg-[#6653B4] w-[136px] h-[140px] rounded-lg flex flex-col justify-between items-center text-[#FFF] font-medium relative overflow-hidden hover:border-[0.5px] border-white">
              <div className="flex-grow flex justify-center items-center">
                <button
                  className="border border-nyx-yellow text-nyx-yellow transition-all rounded-full p-3"
                  onClick={() => {
                    if (tab === "Generic") setTargetGroupPopup(true);
                    if (tab === "Custom") setAudiencesetpopup(true);
                    if (tab === "Lookalike") setLookAlike(true);
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
              <div className="w-full bg-[#23145A] h-[40px] flex justify-center items-center text-xs font-semibold rounded-b-lg">
                Add {tab === "Generic" && <span>Target</span>}
                {tab === "Custom" && <span>Custom</span>}
                {tab === "Lookalike" && <span>Lookalike</span>}
              </div>
            </div>
          </div>
          {visibleGroups.map((targetGroup: any, index: number) => (
            <div
              key={index}
              className=" cursor-pointer px-[13.7px] mt-1"
              onClick={() => handleClick(targetGroup.id)}
            >
              <div
                className={`bg-[#6653B4] w-[136px] h-[140px] hover:border-[0.5px] hover:border-white rounded-lg flex flex-col justify-between items-center ${
                  // targetGrps == targetGroup.id
                  Array.isArray(targetGrps) &&
                  targetGrps?.includes(targetGroup.id)
                    ? "border border-[#6653B4]"
                    : "border border-transparent"
                  }`}
              >
                {!targetGroup.name.includes("META LA") &&
                  !targetGroup.name.includes("GOOGLE LA") &&
                  !targetGroup.name.includes("META CA") &&
                  !targetGroup.name.includes("GOOGLE CA") ? (
                  <div className="w-full flex flex-col gap-1 p-2">
                    <div
                      className="flex w-full gap-1 px-3"
                      title={targetGroup?.age_group}
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20%]"
                      >
                        <path
                          d="M7.49125 11.5609C7.23114 11.5609 7.01129 11.4711 6.83169 11.2915C6.65209 11.1119 6.56229 10.892 6.56229 10.6319C6.56229 10.3718 6.65209 10.1519 6.83169 9.97233C7.01129 9.79273 7.23114 9.70293 7.49125 9.70293C7.75136 9.70293 7.97121 9.79273 8.15081 9.97233C8.33041 10.1519 8.42021 10.3718 8.42021 10.6319C8.42021 10.892 8.33041 11.1119 8.15081 11.2915C7.97121 11.4711 7.75136 11.5609 7.49125 11.5609ZM11.9503 11.5609C11.6902 11.5609 11.4703 11.4711 11.2907 11.2915C11.1111 11.1119 11.0213 10.892 11.0213 10.6319C11.0213 10.3718 11.1111 10.1519 11.2907 9.97233C11.4703 9.79273 11.6902 9.70293 11.9503 9.70293C12.2104 9.70293 12.4302 9.79273 12.6098 9.97233C12.7894 10.1519 12.8792 10.3718 12.8792 10.6319C12.8792 10.892 12.7894 11.1119 12.6098 11.2915C12.4302 11.4711 12.2104 11.5609 11.9503 11.5609ZM9.72076 15.8341C11.3805 15.8341 12.7863 15.2581 13.9382 14.1062C15.0902 12.9543 15.6661 11.5485 15.6661 9.88873C15.6661 9.59146 15.6475 9.30348 15.6104 9.02479C15.5732 8.7461 15.5051 8.4767 15.406 8.21659C15.1459 8.27853 14.8858 8.32497 14.6257 8.35594C14.3656 8.3869 14.0931 8.40239 13.8082 8.40239C12.681 8.40239 11.6158 8.16086 10.6126 7.6778C9.60928 7.19474 8.75464 6.51969 8.04863 5.65266C7.65227 6.61878 7.0856 7.45794 6.34863 8.17015C5.61165 8.88235 4.75391 9.41805 3.7754 9.77725V9.88873C3.7754 11.5485 4.35136 12.9543 5.50327 14.1062C6.65518 15.2581 8.06101 15.8341 9.72076 15.8341ZM9.72076 17.3204C8.69271 17.3204 7.72659 17.1253 6.8224 16.7352C5.91821 16.345 5.13169 15.8155 4.46283 15.1467C3.79398 14.4778 3.26447 13.6913 2.87431 12.7871C2.48414 11.8829 2.28906 10.9168 2.28906 9.88873C2.28906 8.86067 2.48414 7.89455 2.87431 6.99037C3.26447 6.08618 3.79398 5.29965 4.46283 4.6308C5.13169 3.96195 5.91821 3.43244 6.8224 3.04228C7.72659 2.65211 8.69271 2.45703 9.72076 2.45703C10.7488 2.45703 11.7149 2.65211 12.6191 3.04228C13.5233 3.43244 14.3098 3.96195 14.9787 4.6308C15.6475 5.29965 16.177 6.08618 16.5672 6.99037C16.9574 7.89455 17.1525 8.86067 17.1525 9.88873C17.1525 10.9168 16.9574 11.8829 16.5672 12.7871C16.177 13.6913 15.6475 14.4778 14.9787 15.1467C14.3098 15.8155 13.5233 16.345 12.6191 16.7352C11.7149 17.1253 10.7488 17.3204 9.72076 17.3204ZM8.71748 4.03627C9.2377 4.9033 9.94371 5.60002 10.8355 6.12643C11.7273 6.65284 12.7182 6.91605 13.8082 6.91605C13.9816 6.91605 14.1488 6.90676 14.3098 6.88818C14.4708 6.8696 14.6381 6.84792 14.8115 6.82315C14.2912 5.95612 13.5852 5.2594 12.6934 4.73299C11.8016 4.20658 10.8107 3.94337 9.72076 3.94337C9.54735 3.94337 9.38014 3.95266 9.21912 3.97124C9.0581 3.98982 8.89088 4.01149 8.71748 4.03627ZM4.09125 8.01222C4.72294 7.65302 5.27413 7.18854 5.7448 6.61878C6.21547 6.04902 6.56848 5.41113 6.80382 4.70512C6.17212 5.06432 5.62094 5.5288 5.15026 6.09856C4.67959 6.66832 4.32659 7.30621 4.09125 8.01222Z"
                          fill="white"
                          fillOpacity="0.5"
                        />
                      </svg>
                      <p className="w-[80%] text-[#FFFFFF80] text-[12px]  font-normal truncate">
                        {targetGroup?.age_group}
                      </p>
                    </div>
                    <div
                      className="flex w-full gap-1 px-3"
                      title={targetGroup?.gender}
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20%]"
                      >
                        <path
                          d="M4.896 16.7306V11.1568H3.78125V7.06937C3.78125 6.66063 3.92679 6.31072 4.21786 6.01965C4.50894 5.72857 4.85885 5.58303 5.26759 5.58303H7.4971C7.90584 5.58303 8.25575 5.72857 8.54682 6.01965C8.8379 6.31072 8.98344 6.66063 8.98344 7.06937V11.1568H7.86868V16.7306H4.896ZM6.38234 4.83987C5.9736 4.83987 5.62369 4.69433 5.33262 4.40325C5.04154 4.11218 4.896 3.76227 4.896 3.35353C4.896 2.94478 5.04154 2.59487 5.33262 2.3038C5.62369 2.01272 5.9736 1.86719 6.38234 1.86719C6.79109 1.86719 7.141 2.01272 7.43207 2.3038C7.72314 2.59487 7.86868 2.94478 7.86868 3.35353C7.86868 3.76227 7.72314 4.11218 7.43207 4.40325C7.141 4.69433 6.79109 4.83987 6.38234 4.83987ZM11.9561 16.7306V12.2716H9.72661L11.6217 6.58631C11.7208 6.26427 11.9035 6.01655 12.1698 5.84314C12.4361 5.66974 12.7364 5.58303 13.0709 5.58303C13.4053 5.58303 13.7057 5.66974 13.972 5.84314C14.2383 6.01655 14.421 6.26427 14.52 6.58631L16.4151 12.2716H14.1856V16.7306H11.9561ZM13.0709 4.83987C12.6621 4.83987 12.3122 4.69433 12.0211 4.40325C11.7301 4.11218 11.5845 3.76227 11.5845 3.35353C11.5845 2.94478 11.7301 2.59487 12.0211 2.3038C12.3122 2.01272 12.6621 1.86719 13.0709 1.86719C13.4796 1.86719 13.8295 2.01272 14.1206 2.3038C14.4117 2.59487 14.5572 2.94478 14.5572 3.35353C14.5572 3.76227 14.4117 4.11218 14.1206 4.40325C13.8295 4.69433 13.4796 4.83987 13.0709 4.83987Z"
                          fill="white"
                          fillOpacity="0.5"
                        />
                      </svg>

                      <p className="w-[80%] text-[#FFFFFF80] text-[12px] font-normal truncate">
                        {getGenderLabel(targetGroup?.gender)}
                        {/* {targetGroup?.gender} */}
                      </p>
                    </div>
                    <div
                      className="flex w-full gap-1 px-3"
                      title={targetGroup?.location}
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[20%]"
                      >
                        <path
                          d="M9.72661 9.70513C10.1353 9.70513 10.4853 9.5596 10.7763 9.26852C11.0674 8.97745 11.2129 8.62754 11.2129 8.21879C11.2129 7.81005 11.0674 7.46014 10.7763 7.16907C10.4853 6.87799 10.1353 6.73245 9.72661 6.73245C9.31786 6.73245 8.96795 6.87799 8.67688 7.16907C8.3858 7.46014 8.24027 7.81005 8.24027 8.21879C8.24027 8.62754 8.3858 8.97745 8.67688 9.26852C8.96795 9.5596 9.31786 9.70513 9.72661 9.70513ZM9.72661 15.1674C11.2377 13.7802 12.3587 12.5199 13.0894 11.3866C13.8202 10.2532 14.1856 9.24684 14.1856 8.36743C14.1856 7.01734 13.7552 5.91187 12.8944 5.05103C12.0335 4.1902 10.9776 3.75978 9.72661 3.75978C8.4756 3.75978 7.41968 4.1902 6.55885 5.05103C5.69801 5.91187 5.26759 7.01734 5.26759 8.36743C5.26759 9.24684 5.63298 10.2532 6.36376 11.3866C7.09455 12.5199 8.21549 13.7802 9.72661 15.1674ZM9.72661 17.1368C7.73243 15.4399 6.243 13.8638 5.2583 12.4084C4.2736 10.953 3.78125 9.60604 3.78125 8.36743C3.78125 6.5095 4.37888 5.02936 5.57415 3.92699C6.76941 2.82462 8.15356 2.27344 9.72661 2.27344C11.2996 2.27344 12.6838 2.82462 13.8791 3.92699C15.0743 5.02936 15.672 6.5095 15.672 8.36743C15.672 9.60604 15.1796 10.953 14.1949 12.4084C13.2102 13.8638 11.7208 15.4399 9.72661 17.1368Z"
                          fill="white"
                          fillOpacity="0.5"
                        />
                      </svg>

                      <p className="w-[80%] text-[#FFFFFF80] text-[12px] font-normal truncate">
                        {targetGroup?.location}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-[#ffffff84] text-[12px] w-full  flex flex-col gap-1 p-3">
                    <div className="flex gap-1 px-3">
                      <div>
                        <FileSVGIcon className="w-3 h-4" />
                      </div>
                      <div className="truncate">
                        {targetGroup.name.includes("META CA") ||
                          targetGroup.name.includes("GOOGLE CA")
                          ? targetGroup.advanced.data.name
                          : targetGroup?.name}
                      </div>
                    </div>
                    <div className="flex gap-x-1 px-3">
                      <div>
                        <PeopleSVGIcon className="w-3 h-4" />
                      </div>
                      <div>
                        {targetGroup.advanced.data.approximate_count_lower_bound
                          ? targetGroup.advanced.data
                            .approximate_count_lower_bound -
                          targetGroup.advanced.data
                            .approximate_count_upper_bound
                          : 100000}
                      </div>
                    </div>
                    <div className="flex gap-x-1  px-3">
                      <div>
                        <LocationSVGIcon className="w-3 h-4" />
                      </div>
                      <div>{targetGroup.location || "India"}</div>
                    </div>
                  </div>
                )}
                <div
                  className={`relative cursor-pointer w-[133.5px] h-[40px] rounded-b-lg text-[#FFF] p-2 flex items-center justify-between group ${
                    // targetGrps == targetGroup.id
                    Array.isArray(targetGrps) &&
                      targetGrps?.includes(targetGroup.id)
                      ? "bg-[#5E32FF]"
                      : "bg-[#23145A]"
                  } `}
                  title={targetGroup?.name}
                >
                  <div
                    className={`first-letter:uppercase lowercase font-semibold w-[14ch] truncate text-xs ${
                      // targetGrps == targetGroup.id
                      Array.isArray(targetGrps) &&
                        targetGrps?.includes(targetGroup.id)
                        ? "text-nyx-yellow"
                        : "text-white"
                      }`}
                  >
                    {targetGroup.name.includes("META LA") ||
                      targetGroup.name.includes("GOOGLE LA") ||
                      targetGroup.name.includes("GOOGLE CA") ||
                      targetGroup.name.includes("META CA")
                      ? targetGroup.advanced.data.name
                      : targetGroup.name}
                  </div>
                  <div
                    onClick={() => {
                      if (
                        targetGroup.name.includes("META LA") ||
                        targetGroup.name.includes("GOOGLE LA") ||
                        targetGroup.name.includes("META CA") ||
                        targetGroup.name.includes("GOOGLE CA")
                      )
                        handleClickOnTargetGroupEdit(targetGroup, true);
                      else handleClickOnTargetGroupEdit(targetGroup, false);
                    }}
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
              </div>
            </div>
          ))}
        </div>
        {targetGroups?.length > 6 && (
        <div className="relative">
        <div onClick={handleShowTargetGroupModal} className="absolute right-0 text-nyx-yellow underline underline-offset-2 bottom-0 -mb-7 mr-4 overflow-visible seeMore hover:brightness-75 cursor-pointer">
          See More
        </div>
        </div>)}

        {/* <div className="max-w-[100%] overflow-x-scroll flex justify-center items-center mt-5 space-x-2 pb-2 scrollbar-thin">
          {pageNumbers.length > 1 && (
            <>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`w-8 h-8 flex items-center justify-center rounded
              ${currentPage === number
                      ? "bg-[#5E32FF] text-white"
                      : "bg-[#50387B] text-white"
                    }`}
                >
                  {number}
                </button>
              ))}
            </>
          )}
        </div> */}
      </div>

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
                                  <tr onClick={() => handleClick(item?.id)} className={classNames("border-b border-solid border-[#503193] text-white font-normal text-sm hover:bg-[#5E33FF]",
                                    targetGrps?.includes(item?.id)
                                    ? "bg-[#5E32FF] border border-[#5E32FF] text-nyx-yellow"
                                    : "bg-[#23145A] text-white",
                                  )} key={`brandTargetGroups-${item?.id}` || rowIndex}
                                  //  onClick={clickontargetgroup(item?.id,index)} 
                                   >
                                    <td className="px-2 py-4 pl-4">
                                      <div className="relative group cursor-pointer">
                                        
                                        <div className="max-w-[200px] truncate font-semibold">
                                        {targetGrps?.includes(item?.id)?
                                        
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
