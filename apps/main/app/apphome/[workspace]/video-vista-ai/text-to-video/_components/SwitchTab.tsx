export const SwitchTab = (props) => {
  return (
    <div className={`justify-center whitespace-nowrap md:whitespace-normal`}>
      {props.data?.map((item, index) => (
        <div
          key={index}
          className="w-100 text-start cursor-pointer"
          onClick={() => props.tabState(index)}
        >
          <div
            className={  
              index == props.tabStatus
                ? "flex items-center space-x-5 bg-[#5E32FF] text-white text-[12px] font-normal rounded-[4px] p-3 px-4 mb-2"
                : "flex items-center space-x-5 bg-[#4A2B89] text-[12px] text-white font-normal rounded-[4px] p-3 px-4 mb-2"
            }
          >
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 border-yello-400">
            <div className={`w-2.5 h-2.5 rounded-full ${index=== props.tabStatus ? "bg-yellow-400 opacity-100":"opacity-0"}`}></div>
            </div>
            <div className=" ">
              {item.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};