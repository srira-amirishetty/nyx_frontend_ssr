import classNames from "@nyx-frontend/main/utils/classNames";
import EditIcon from "./EditIcon";
import React from "react";

type BrandingChipProps = {
  isActive: boolean;
  onClick: (id: string, index: number) => void;
  onEdit: (id: string) => void;
  brand: {
    id: string;
    brand_name: string;
  };
  index: number;
};

function BrandingChip({
  isActive,
  onClick,
  onEdit,
  brand,
  index,
}: BrandingChipProps) {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(brand.id, index);
    e.preventDefault();
    e.stopPropagation();
  };

  const onEditHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    onEdit(brand.id);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <button
      className={classNames(
        `group relative w-auto font-medium p-2 rounded-md flex items-center gap-2 cursor-pointer text-white hover:shadow-gray-800 shadow-none hover:shadow-md`,
        isActive ? "bg-[#5E32FF] text-[#f1bb2e]" : "bg-[#332270]",
      )}
      onClick={onClickHandler}
      title={brand.brand_name}
    >
      <div className="text-xs xl:text-sm w-full">{brand.brand_name}</div>
      <div
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={onEditHandler}
      >
        <EditIcon className="w-3 h-[14px] text-white" />
      </div>
    </button>
  );
}

export default BrandingChip;
