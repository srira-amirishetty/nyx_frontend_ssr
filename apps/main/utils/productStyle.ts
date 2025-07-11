import { StylesConfig } from "react-select";

export const colourStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const brandPaintingStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#FFC01D",
    border: "1px solid #FFCB54",
    borderRadius: "100px",
    width: "284px",
    height: "37px",
    lineHeight: "14px",
    paddingLeft: "15px",
    // "&:hover": {
    //   // Add hover style
    //   backgroundColor: "#FFC01D", // Change border color to yellow on hover
    // },
  }),
  placeholder: (provided, { isFocused }) => ({
    ...provided,
    color: "#FFC01D",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#FFCB54",
    fontWeight: "normal",
    padding: "10px 10px 10px 5px",
    fontSize: "14px",
    // "&:hover": {  // Add hover style
    //   color: "#080808", // Change border color to yellow on hover
    // }
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
} as StylesConfig;

export const aiImageColourStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 6,
    zIndex: 1,
    paddingRight: "20px",
    paddingLeft: "20px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
    fontStyle: "italic",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#192f73" : undefined,
    color: isSelected ? "#FFCB54" : isFocused ? "#FFCB54" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const TGColourStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 6,
    zIndex: 1,
    paddingRight: "20px",
    paddingLeft: "5px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 0px",
    fontStyle: "italic",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 0px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#192f73" : undefined,
    color: isSelected ? "#FFCB54" : isFocused ? "#FFCB54" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "14px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};
export const addBrandStyle: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    zIndex: 1,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    zIndex: 1,
    width: "200px", // Set the width of the menu list
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "14px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
    marginLeft: "-120px", // Adjust the marginLeft to shift the menu slightly to the left
  }),
};

export const addBrandStyle2: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    zIndex: 1,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "14px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const joinWaitlistPopUpStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#ECECEC16",
    border: "none",
    zIndex: 1,
    // width: "338px",
    height: "42px",
    borderRadius: "0.5rem",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#15072A",
    color: "#FFFFF",
    zIndex: 1,
    marginTop: "-50px",
    borderRadius: "12px",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#603DB9" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "12px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: "12px",
  }),
};

export const joinWaitlistPopUpCountryStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#ECECEC16",
    border: "none",
    zIndex: 1,
    // width: "74px",
    height: "41px",
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#15072A",
    color: "#FFFFF",
    zIndex: 1,
    marginTop: "-50px",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const demoPopUpStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#ECECEC16",
    border: "none",
    zIndex: 1,
    // width: "338px",
    height: "40px",
    borderRadius: "4px",
    padding: "0px 20px 0px 7px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#B3B3B3",
    fontWeight: "normal",
    fontSize: "14px",
    // padding: "0px 0px 0px 8px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0px 0px 0px 7px",
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    //padding: "0px px 0px 0px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#261746",
    color: "#FFFFF",
    zIndex: 1,
    marginTop: "-50px",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#603DB9" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "normal",
    fontSize: "14px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const demoPopUpCountryStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#ECECEC16",
    border: "none",
    zIndex: 1,
    // width: "74px",
    height: "40px",
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
    padding: "0px 10px 0px 10px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#B3B3B3",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 10px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#15072A",
    color: "#FFFFF",
    zIndex: 1,
    marginTop: "-50px",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#603DB9" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "normal",
    fontSize: "14px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const colourStylesText: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const onboardingColourStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 6,
    // zIndex: 1,
    paddingRight: "20px",
    // paddingLeft: "20px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
    fontStyle: "italic",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  input: (styles) => ({
    ...styles,
    color: "white", // Make the searching text white
  }),
  menuList: (styles) => ({
    ...styles,
    background: "#2A1465",
    color: "#FFFFF",
    // zIndex: 1,
    // marginTop: "-45px",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : undefined,
    color: isSelected ? "#FFCB54" : isFocused ? "#FFFFFF" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "14px",
    // zIndex: 1,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    // zIndex: 100,
    borderRadius: 0,
  }),
};

export const admanagerRuleColourStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 0,
    // zIndex: 1,
    paddingRight: "20px",
    // paddingLeft: "20px",
    cursor: "pointer"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
    fontStyle: "italic",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#2A1465",
    color: "#FFFFF",
    // zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : undefined,
    color: isSelected ? "#f1bb2e" : isFocused ? "#FFFFFF" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "14px",
    // zIndex: 1,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    // zIndex: 100,
    borderRadius: 0,
  }),
};

export const admanagerRuleColourStylesMetric: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 0,
    // zIndex: 1,
    paddingRight: "20px",
    // paddingLeft: "20px",
    cursor: "pointer"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
    fontStyle: "italic",
    whiteSpace: "nowrap", // Prevent text wrapping
    overflow: "hidden", // Hide overflowed text
    textOverflow: "ellipsis", // Add ellipsis to truncated text
    maxWidth: "100%"
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "#03E088",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#2A1465",
    color: "#FFFFF",
    // zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : undefined,
    color: isSelected ? "#f1bb2e" : isFocused ? "#FFFFFF" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "14px",
    // zIndex: 1,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    // zIndex: 100,
    borderRadius: 0,
  }),
};

export const admanagerRuleColourStylesTime: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 0,
    // zIndex: 1,
    paddingRight: "20px",
    // paddingLeft: "20px",
    cursor: "pointer"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
    fontStyle: "italic",
    whiteSpace: "nowrap", // Prevent text wrapping
    overflow: "hidden", // Hide overflowed text
    textOverflow: "ellipsis", // Add ellipsis to truncated text
    maxWidth: "100%"
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "#75ADFF",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#2A1465",
    color: "#FFFFF",
    // zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : undefined,
    color: isSelected ? "#f1bb2e" : isFocused ? "#FFFFFF" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "14px",
    // zIndex: 1,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    // zIndex: 100,
    borderRadius: 0,
  }),
};

export const admanagerRuleColourStylesMetricOrValue: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 0,
    zIndex: 1,
    paddingRight: "20px",
    // paddingLeft: "20px",
    cursor: "pointer"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
    fontStyle: "italic",
    whiteSpace: "nowrap", // Prevent text wrapping
    overflow: "hidden", // Hide overflowed text
    textOverflow: "ellipsis", // Add ellipsis to truncated text
    maxWidth: "100%"
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "#FF9800",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#2A1465",
    color: "#FFFFF",
    zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : undefined,
    color: isSelected ? "#f1bb2e" : isFocused ? "#FFFFFF" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "14px",
    zIndex: 1,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const admanagerRuleColourStylesOperator: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 0,
    zIndex: 1,
    paddingRight: "20px",
    // paddingLeft: "20px",
    cursor: "pointer"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
    fontStyle: "italic",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "#C0C0C0",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#2A1465",
    color: "#FFFFF",
    zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : undefined,
    color: isSelected ? "#f1bb2e" : isFocused ? "#FFFFFF" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "14px",
    zIndex: 1,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const admanagerConversion: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.6);",
    borderRadius: "4.7px",
    // zIndex: 1,
    paddingRight: "20px",
    // paddingLeft: "20px",
    cursor: "pointer"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
    fontStyle: "italic",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#2A1465",
    color: "#FFFFF",
    // zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : undefined,
    color: isSelected ? "#f1bb2e" : isFocused ? "#FFFFFF" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "14px",
    // zIndex: 1,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    // zIndex: 50,
    borderRadius: 0,
  }),
};

export const CatalogStyle: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    borderRadius: "4.7px",
    // zIndex: 1,
    paddingRight: "20px",
    cursor: "pointer"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
    fontStyle: "italic",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  menuList: (styles) => ({
    ...styles,
    background: "#2A1465",
    color: "#FFFFF",
    // zIndex: 1,
    // maxWidth: '300px', // Adjust the width if necessary
    whiteSpace: "normal",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : undefined,
    color: isSelected ? "#f1bb2e" : isFocused ? "#FFFFFF" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : isFocused ? "normal" : "normal",
    fontSize: "14px",
    // zIndex: 1,
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    // zIndex: 100,
    borderRadius: 0,
  }),
};

export const budgetSelect: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "transparent",
    border: "none",
    borderRadius: 6,
    zIndex: 1,
    margin: 0,
    marginTop: -10,
    boxShadow: "none",
    width: "max-content",
    cursor: "pointer"
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
    fontWeight: "normal",
    fontSize: "11px",
    fontStyle: "normal",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    textDecoration:"underline",
    fontSize: "11px",
    margin: "0px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#2A1465",
    color: "#FFFFF",
    zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isSelected ? "#5e32ff" : "transparent",
    color: isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isSelected ? "bold" : "normal",
    fontSize: "11px",
    zIndex: 1,
    cursor: "pointer",
    "&:hover": {
      background: isSelected ? "#5e32ff" : "#5e32ff",
      color: isSelected ? "#FFCB54" : "#FFFFFF", // Change color on hover
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: " white", // Change the color of the arrow icon
    padding: "0 8px", // Adjust padding around the icon

    "&:hover": {
      color: "white", // Change color on hover
    },
  }),
};

export const aiImageColourStyles2: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 6,
    zIndex: 1,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    zIndex: 1,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const colourStyles2: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
    padding: "0px 0px 0px 7px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    height: "200px",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const colourStylesQuestion: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #fff",
    width: "200px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
    padding: "0px 0px 0px 7px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const colourStylesOnboarding: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD",
    padding: "2px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "16px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
    padding: "0px 0px 0px 7px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const loginPopUpCountryStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    zIndex: 1,
    // width: "74px",
    // height: "41px",
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "normal",
    padding: "0px 0px 0px 7px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#15072A",
    color: "#FFFFF",
    zIndex: 1,
    marginTop: "-48px",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "14px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const brandcanvacolourStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "2px solid #8297BD",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
    padding: "0px 0px 0px 7px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const assetSortStyle: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
    borderColor: "#8297BD",
    height: "45px",
    backgroundColor: "inherit",
    boxShadow: state.isFocused ? "0 0 0 1px #8297BD" : "none",
    fontSize: "14px",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#2A1465",
    width: "200px",
    zIndex: "20",
    // Set the background color of the menu to red
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Change the color of the selected text to white
  }),
  option: (baseStyles, { isFocused, isSelected }) => ({
    ...baseStyles,
    backgroundColor: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : "#2A1465", // Set the background color of options
    color: isSelected ? "#f1bb2e" : "white", // Adjust text color for readability
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white", // Change placeholder text color to white
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#28134B", // Set background color of selected items
    borderRadius: "4px", // Optional: add some border-radius
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Set text color of selected items0
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    ":hover": {
      // Change background on hover
      color: "white", // Adjust hover color
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    color: "#ccc",
  }),
};
export const campaignSortStyle: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
    borderColor: "#8297BD",
    height: "45px",
    backgroundColor: "inherit",
    boxShadow: state.isFocused ? "0 0 0 1px #8297BD" : "none",
    fontSize: "14px",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#2A1465",
    width: "200px",
    zIndex: "20",
    // Set the background color of the menu to red
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Change the color of the selected text to white
  }),
  option: (baseStyles, { isFocused, isSelected }) => ({
    ...baseStyles,
    backgroundColor: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : "#2A1465", // Set the background color of options
    color: isSelected ? "#f1bb2e" : "white", // Adjust text color for readability
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white", // Change placeholder text color to white
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#28134B", // Set background color of selected items
    borderRadius: "4px", // Optional: add some border-radius
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Set text color of selected items0
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    ":hover": {
      // Change background on hover
      color: "white", // Adjust hover color
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    color: "#ccc",
  }),
};

export const ruleDropDown: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
    borderColor: "#8297BD",
    height: "40px",
    backgroundColor: "inherit",
    boxShadow: state.isFocused ? "0 0 0 1px #8297BD" : "none",
    fontSize: "14px",
    cursor: "pointer"
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#2A1465",
    width: "200px",
    // Set the background color of the menu to red
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Change the color of the selected text to white
  }),
  option: (baseStyles, { isFocused, isSelected }) => ({
    ...baseStyles,
    backgroundColor: isSelected ? "#5e32ff" : isFocused ? "#5e32ff" : "#2A1465", // Set the background color of options
    color: isSelected ? "#f1bb2e" : "white", // Adjust text color for readability
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white", // Change placeholder text color to white
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#28134B", // Set background color of selected items
    borderRadius: "4px", // Optional: add some border-radius
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Set text color of selected items0
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    ":hover": {
      // Change background on hover
      color: "white", // Adjust hover color
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transition: "transform 0.3s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    color: "#fff",
    ":hover": {
      // Change background on hover
      color: "white", // Adjust hover color
    },
  }),
};

export const activeCampaignDropdown: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
    borderColor: "#8297BD",
    minHeight: "40px",
    backgroundColor: "inherit",
    boxShadow: state.isFocused ? "0 0 0 1px #8297BD" : "none",
    fontSize: "14px",
    cursor: "pointer"
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#2A1465",
    width: "100%",
    zIndex: 999,
    // Set the background color of the menu to red
  }),
  input: (styles) => ({
    ...styles,
    color: "white", // Make the searching text white
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Change the color of the selected text to white
  }),
  option: (baseStyles, { isFocused, isSelected }) => ({
    ...baseStyles,
    backgroundColor: isFocused ? "#5e32ff" : "#2A1465", // Set the background color of options
    color: "white", // Adjust text color for readability
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white", // Change placeholder text color to white
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#28134B", // Set background color of selected items
    borderRadius: "4px", // Optional: add some border-radius
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: "white", // Set text color of selected items
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    ":hover": {
      // Change background on hover
      color: "white", // Adjust hover color
    },
  }),
};

export const ChannelSortStyle: StylesConfig = {
  control: (baseStyles) => ({
    ...baseStyles,
    color: "white",
    borderColor: "#8297BD",
    height: "45px",
    backgroundColor: "inherit",
    boxShadow: "none",
    fontSize: "14px",
    borderRadius: "8px",
    "&:hover": {
      borderColor: "#8297BD", // Maintain the border color on hover
    },
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#28134B",
  }),
  option: (baseStyles, { isFocused, isSelected }) => ({
    ...baseStyles,
    backgroundColor: isSelected
      ? "#4A90E2" // Highlight selected options with this color
      : isFocused
        ? "#28134B" // Background color when focused
        : "#20133D", // Default background color
    color: "#ffffff", // Text color for all options
    ":active": {
      backgroundColor: isSelected ? "#4A90E2" : "#28134B", // Active item color
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#4A90E2", // Background color of selected items
    color: "#ffffff", // Text color of selected items
    borderRadius: "4px",
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: "#ffffff", // Text color of the multi-value label
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: "#ffffff", // Color of the remove icon
    ":hover": {
      backgroundColor: "#4A90E2", // Hover background color of the remove icon
      color: "#ffffff", // Hover text color of the remove icon
    },
  }),
};

export const audienceStyle: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    color: "white",
    border: "1px",
    borderColor: "#4D2E8A",
    height: "42px",
    backgroundColor: "inherit",
    boxShadow: "0 0 0 1px #8297BD",
    fontSize: "12px",
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#28134B",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "white",
  }),
  option: (baseStyles, { isFocused, isSelected }) => ({
    ...baseStyles,
    fontSize: "12px",
    backgroundColor: isFocused ? "#28134B" : "#20133D",
    color: "white",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
  }),
};
