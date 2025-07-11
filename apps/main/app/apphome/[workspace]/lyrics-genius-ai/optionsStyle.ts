import { StylesConfig } from "react-select";

export const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    fontSize:'14px',
    padding:"0px 0px 0px 10px"
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: isSelected ? "white" : "black",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
      },
    };
  },
  placeholder: (styles) => ({
    ...styles,
    color: "#8297BD",
    whiteSpace: "nowrap",
    overflow: "hidden",
    flexWrap: 'nowrap',
    
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#8297BD",
  }),
};


export const colourStyles2:StylesConfig = {
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #fff",
  }),
  // @ts-ignore
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "bold",
    fontSize: "14px",
    padding:"0px 0px 0px 7px"

  }),
  // @ts-ignore
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
    padding:"0px 0px 0px 7px"
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused?"#FFFFFF":isSelected?"#FFCB54":"#FFFFFF",
    fontWeight: isFocused?"bold":isSelected?"bold":"lighter",
    fontSize:"15px",
    zIndex: 1,
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const colourStylesQuestion:StylesConfig = {
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #fff",
    width:"200px",
  }),
  // @ts-ignore
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "bold",
    fontSize: "14px",
    padding:"0px 0px 0px 7px"

  }),
  // @ts-ignore
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
    padding:"0px 0px 0px 7px"
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused?"#FFFFFF":isSelected?"#FFCB54":"#FFFFFF",
    fontWeight: isFocused?"bold":isSelected?"bold":"lighter",
    fontSize:"15px",
    zIndex: 1,
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};
export const colourStyles3:StylesConfig = {
  // @ts-ignore
  control: (base,{ isFocused, isSelected} ) => ({
    ...base,
    backgroundColor:isFocused?"rgb(251 191 36)": "transparent",
    borderColor: "border-amber-400",
    border: "1px solid #fff",
    width:"280px",
    color:isFocused?"041414": "#FFFFFF",
    boxShadow: '0px 0px 6px #BA8B1D',
    '&:hover': {
      backgroundColor:"rgb(251 191 36)",
      color:"black"
    },
  }),
  // @ts-ignore
  placeholder: (provided,{ isFocused, isSelected }) => ({
    ...provided,
    color:isFocused?"041414": "#FFFFFF",
    fontWeight: "normal",
    fontSize: "16px",
    padding:"0px 5px 0px 20px",
    '&:hover': {
      color:"black"
    },
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
    padding:"0px 5px 0px 20px",
    '&:hover': {
      color:"black"
    },
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused?"#FFCB54":isSelected?"#FFCB54":"#FFFFFF",
    fontWeight: isFocused?"bold":isSelected?"bold":"normal",
    fontSize:"13px",
    zIndex: 1,
    
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const saveReports:StylesConfig = {
  // @ts-ignore
  control: (base,{ isFocused, isSelected } ) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "border-amber-400",
    border: "1px solid #fff",
    width:"170px",
    borderRadius:"10px",
    color:isFocused? "041414":"#FFFFFF",
    boxShadow: '0px 0px 6px #BA8B1D',
    '&:hover': {
      backgroundColor:"rgb(251 191 36)"
    },
  }),
  // @ts-ignore
  placeholder: (provided,{ isFocused, isSelected }) => ({
    ...provided,
    color:isFocused?"041414": "#FFFFFF",
    fontWeight: "normal",
    fontSize: "16px",
    padding:"0px 5px 0px 20px",
  }),
  // @ts-ignore
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "light",
    padding:"0px 5px 0px 20px",
    fontSize: "14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused?"#FFFFFF":isSelected?"#FFCB54":"#FFFFFF",
    fontWeight: isFocused?"bold":isSelected?"bold":"lighter",
    fontSize:"13px",
    zIndex: 1,
    
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const colourBlueStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderBottom: "1px solid #8297BD",
    borderRadius: 0,
    outline: "none"
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: isSelected ? "white" : "black",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
      },
    };
  },
  placeholder: (styles) => ({ ...styles, color: "#8297BD" }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#8297BD",
  }),
};

export const colourStylesOnboarding:StylesConfig = {
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD",
    padding:"2px"
  }),
  // @ts-ignore
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "16px",
    padding:"0px 0px 0px 7px"

  }),
  // @ts-ignore
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: "white",
    fontWeight: "bold",
    padding:"0px 0px 0px 7px"
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused?"#FFFFFF":isSelected?"#FFCB54":"#FFFFFF",
    fontWeight: isFocused?"bold":isSelected?"bold":"lighter",
    fontSize:"15px",
    zIndex: 1,
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};

export const aiImageColourStyles2:StylesConfig = {
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#8297BD",
    border: "1px solid #8297BD;",
    borderRadius: 6,
    zIndex:1
  }),
  // @ts-ignore
  placeholder: (provided) => ({
    ...provided,
    color: "#8297BD",
    fontWeight: "normal",
    fontSize: "14px",
    padding:"0px 0px 0px 7px"
    
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
    padding:"0px 0px 0px 7px",
    fontSize:"14px",
  }),
  // indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
    zIndex:1
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#192f73" : isSelected ? "#5e32ff" : undefined,
    color: isFocused?"#FFFFFF":isSelected?"#FFCB54":"#FFFFFF",
    fontWeight: isFocused?"bold":isSelected?"bold":"lighter",
    fontSize:"15px",
    zIndex: 1,
  }),
  // @ts-ignore
  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: 0,
  }),
};