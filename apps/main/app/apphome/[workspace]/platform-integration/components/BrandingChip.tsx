import classNames from "@nyx-frontend/main/utils/classNames";
import EditSVGIcon from "@nyx-frontend/main/components/Icons/EditSVGIcon";
import React from "react";
import { useState } from "react";

type BrandingChipProps = {
  isActive: boolean;
  onClick: (id: string, index: number) => void;
  onEdit: (id: string) => void;
  brand: {
    id: string;
    brand_name: string;
  };
  index: number;
  selectedTab: string;
  mappedBrands: Array<any>;
};

function BrandingChip({
  isActive,
  onClick,
  onEdit,
  brand,
  index,
  selectedTab,
  mappedBrands,
}: BrandingChipProps) {
  const [occupied, setOccupied] = useState(false);
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(brand.id, index);
    e.preventDefault();
    e.stopPropagation();
  };
  const exists = mappedBrands.some(
    (item: any) =>
      item.platform === selectedTab && item.name.includes(brand.brand_name),
  );
  const onEditHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    onEdit(brand.id);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleShowText = () => {
    if (exists) setOccupied(true);
  };

  const handleHidText = () => {
    setOccupied(false);
  };

  return (
    <button
      className={classNames(
        `group relative w-auto h-fit font-medium p-2 rounded-md flex items-center gap-2 cursor-pointer text-white hover:shadow-gray-800 shadow-none hover:shadow-md `,
        isActive ? "bg-[#5E32FF] text-[#f1bb2e]" : "bg-[#1D1138]",
        exists ? "text-black	bg-nyx-gray-1 cursor-" : "",
      )}
      onClick={onClickHandler}
      title={brand.brand_name}
    >
      {occupied && (
        <div
          className="absolute -top-10 left-0 text-[11px] w-[150px] bg-black text-white rounded-md"
          style={{ zIndex: "99" }}
        >
          This account is already mapped
        </div>
      )}
      <div
        className="text-sm w-full"
        onMouseEnter={handleShowText}
        onMouseLeave={handleHidText}
      >
        {brand.brand_name}
      </div>
      <div
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={onEditHandler}
      >
        <EditSVGIcon className="w-3 h-[14px] text-white" />
      </div>
    </button>
  );
}

export default BrandingChip;
