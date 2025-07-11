import React from "react";

export const MultiDate = ({
  item,
  index,
  totalTargetGroups,
  setTotalTargetGroups,
  campaigndata
}) => {

  const handleDateChangeStart = (value: any) => {
    let tempTotalTargetGroups = JSON.parse(JSON.stringify(totalTargetGroups))
    tempTotalTargetGroups[index]['start_date'] = value
    setTotalTargetGroups(tempTotalTargetGroups)
  };

  const handleCheckboxChange = () => {
    let tempTotalTargetGroups = JSON.parse(JSON.stringify(totalTargetGroups))
    tempTotalTargetGroups[index]['end_date'] = tempTotalTargetGroups[index]['end_date'] ? null : new Date(tempTotalTargetGroups[index]['start_date'])
    setTotalTargetGroups(tempTotalTargetGroups)
  };

  const handleDateChangeEnd = (value: any) => {
    let tempTotalTargetGroups = JSON.parse(JSON.stringify(totalTargetGroups))
    tempTotalTargetGroups[index]['end_date'] = value
    setTotalTargetGroups(tempTotalTargetGroups)
  };

  return (
    <div className="flex flex-col">
      <p className="text-[14px] leading-[17px] text-white mb-[10px] font-bold">
        {item?.tg_name} :
      </p>
      <p className="font-normal text-[14px] leading-[17px] text-white mb-[10px]">
        Start date
      </p>
      <div className="flex">
        <input
          type="date"
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            if (!isNaN(selectedDate.getTime())) {
              handleDateChangeStart(selectedDate);
            }
          }}
          value={new Date(item?.start_date).toISOString().split("T")[0]}
          min={
            campaigndata?.overallStatus === "ACTIVE"
              ? item?.start_date && !isNaN(new Date(item?.start_date).getTime())
                ? new Date(item?.start_date).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          onKeyDown={(e) => e.preventDefault()} // Prevent keyboard input
          disabled={campaigndata?.overallStatus === "ACTIVE"}
          className="w-[226px] h-[40px] rounded-[4px] border border-opacity-60 border-[#FFFFFF99] bg-transparent px-2 text-white cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-2 mt-[11px]">
        <input
          type="checkbox"
          checked={!!item?.end_date}
          className=" custom-checkbox"
          onChange={() => handleCheckboxChange()}
          disabled={campaigndata?.overallStatus == "ACTIVE"}
        />
        <p className="text-[14px] font-medium leading-[17px] text-[#FFFFFF]">
          End date
        </p>
      </div>
      {!!item?.end_date && (
        <div className="flex mt-[11px]">
          <input
            type="date"
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              if (!isNaN(selectedDate.getTime())) {
                handleDateChangeEnd(selectedDate);
              }
            }}
            value={new Date(item?.end_date).toISOString().split("T")[0]}
            min={
              campaigndata?.overallStatus === "ACTIVE"
                ? item?.end_date && !isNaN(new Date(item?.end_date).getTime())
                  ? new Date(item?.end_date).toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0]
                : item?.start_date && !isNaN(new Date(item?.start_date).getTime())
                  ? new Date(
                    new Date(item?.start_date).setDate(
                      new Date(item?.start_date).getDate() + 1
                    )
                  )
                    .toISOString()
                    .split("T")[0]
                  : new Date().toISOString().split("T")[0]
            }
            onKeyDown={(e) => e.preventDefault()} // Prevent keyboard input
            disabled={campaigndata?.overallStatus == "ACTIVE"}
            className="w-[226px] h-[40px] rounded-[4px] border border-opacity-60 border-[#FFFFFF99] bg-transparent px-2 text-white cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
