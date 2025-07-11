import * as React from "react"
import Select from 'react-select'

const SearchableSelect = ({ options, value, onChange, enableFocusStyles = false, ...props }: any) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#23145A",
      borderColor: "rgb(109 40 217 / 0.2)",
      color: "rgb(255 255 255)",
      borderRadius: "7px",
      ...(enableFocusStyles && state.isFocused && {
        backgroundColor: "#5E32FF",
        color: "#FFD700",
      }),
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#332270",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#23145A" : "#332270",
      color: "rgb(255 255 255)",
      cursor: "pointer",
      ...(enableFocusStyles && state.isFocused && {
        backgroundColor: "#5E32FF",
        color: "#FFD700",
      }),
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "rgb(255 255 255)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#777",
    }),
    input: (provided) => ({
      ...provided,
      color: "rgb(255 255 5)",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "#333",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "rgb(255 255 255)",
      ":hover": {
        color: "#ccc",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "rgb(255 255 255)",
      ":hover": {
        color: "#ccc",
      },
    }),
  };

  let newValue = options.find((item: any) => item.value === value)
  return <div className="w-[200px] bg-[#23145A] rounded-[10px] text-white border-[#6D28D9]/20 hover:bg-[2D1B69]/50 transition-all duration-200">
    <Select options={options}
      value={newValue}
      onChange={(obj) => onChange(obj.value)}
      isSearchable
      styles={customStyles}
      {...props}
    /></div>
}
SearchableSelect.displayName = "SearchableSelect"

export {
  SearchableSelect
}