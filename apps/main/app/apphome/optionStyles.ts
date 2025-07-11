import { StylesConfig } from "react-select";
export const welcomePopUpCountryStyles: StylesConfig = {
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    border: "1px solid #8297BD",
    zIndex: 1,
    // width: "74px",
    // height: "41px",
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
  }),
  // @ts-ignore
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  // @ts-ignore
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
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    zIndex: 1,
    marginTop: "-50px",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const welcomePopupStyles: StylesConfig = {
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 6,
    zIndex: 1,
  }),
  // @ts-ignore
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding: "0px 0px 0px 7px",
  }),
  // @ts-ignore
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
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    zIndex: 1,
    marginTop: "-50px",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused ? "#FFFFFF" : isSelected ? "#FFCB54" : "#FFFFFF",
    fontWeight: isFocused ? "bold" : isSelected ? "bold" : "lighter",
    fontSize: "15px",
    zIndex: 1,
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};