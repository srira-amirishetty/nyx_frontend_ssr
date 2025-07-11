import React from "react";
import GenderIcon from "./GenderIcon";
import GroupTypeIcon from "./GroupTypeIcon";
import LocationIcon from "./LocationIcon";
import EditIcon from "./EditIcon";
import classNames from "@nyx-frontend/main/utils/classNames";

type TargetGroup = {
  id: string;
};

type GroupProps = {
  children: React.ReactNode;
  targetGroup: TargetGroup;
  onClick: (id: string, index: number, groupIds: Array<string>) => void;
  index: number;
  groupIds: Array<string>;
};

export function Group({
  children,
  onClick,
  targetGroup,
  index,
  groupIds,
}: GroupProps) {
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick(targetGroup.id, index, groupIds);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClickHandler}
      className={classNames(
        "hover:shadow-gray-800 shadow-none hover:shadow-md transition-colors rounded-lg",
        groupIds.includes(targetGroup?.id)
          ? "bg-[#5E32FF] border border-[#5E32FF] text-nyx-yellow"
          : "bg-[#452A80] text-white",
      )}
    >
      {children}
    </div>
  );
}

type GroupHeadProps = {
  children: React.ReactNode;
  onEdit: (targetGroup: TargetGroup) => void;
  targetGroup: TargetGroup;
};

export function GroupHead({ children, onEdit, targetGroup }: GroupHeadProps) {
  const onEditHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    onEdit(targetGroup);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="relative w-[131px] h-[36px] rounded-t-lg p-2 flex items-center justify-between group cursor-pointer"
      title={String(children)}
    >
      <div className="truncate text-xs font-semibold">{children}</div>
      <div
        onClick={onEditHandler}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      >
        <EditIcon className="text-white w-3" />
      </div>
    </div>
  );
}

type GroupBodyProps = {
  ageGroup: string;
  gender: string;
  region: string;
};

export function GroupBody({ ageGroup, gender, region }: GroupBodyProps) {
  return (
    <div className="bg-[#6653B4] w-[131px] h-[100px] rounded-b-lg flex justify-center items-center p-2">
      <div className="w-full space-y-1">
        <div className="flex items-center gap-1 px-2">
          <GroupTypeIcon className="w-5 h-5 text-white/50" />
          <p className="text-white/50 text-xs truncate" title={ageGroup}>
            {ageGroup}
          </p>
        </div>
        <div className="flex items-center gap-1 px-2">
          <GenderIcon className="w-5 h-5 text-white/50" />
          <p className="text-white/50 text-xs truncate" title={gender}>
            {gender}
          </p>
        </div>
        <div className="flex items-center gap-1 px-2">
          <LocationIcon className="w-5 h-5 text-white/50" />
          <p className="text-white/50 text-xs">{region}</p>
        </div>
      </div>
    </div>
  );
}
