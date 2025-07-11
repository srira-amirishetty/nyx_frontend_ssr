export const colourStyles = {
  // @ts-ignore
  control: (base, state) => ({
    ...base,
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #fff",
    boxShadow: "none",
    fontWeight: "normal",
    padding: 0,
    "&:hover": {
      borderBottom: `1px solid ${
        state.isFocused || state.isSelected ? "#fff" : "#fff"
      }`,
    },
    fontSize: "13px",
  }),
  // @ts-ignore
  placeholder: (provided) => ({
    ...provided,
    fontWeight: "normal",
    fontSize: "14px",
    color: "#FFF",
  }),
  // @ts-ignore
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),

  indicatorSeparator: () => ({ display: "none" }),
  // @ts-ignore
  menuList: (styles) => ({
    ...styles,
    background: "#091234",
    color: "#FFFFF",
  }),
  // @ts-ignore
  option: (styles, { isFocused, isSelected }) => ({
    // ...styles,
    // background: isFocused ? "#8297BD" : isSelected ? "#23184C" : undefined,
    // color: isSelected ? "#FFCB54" : "#FFFFFF",
    // fontWeight: "normal",
    // fontSize: "13px",
    // zIndex: 1,
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

