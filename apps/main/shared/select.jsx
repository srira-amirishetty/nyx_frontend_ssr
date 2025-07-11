"use client"
import { useEffect, useState } from "react";
import Select from "react-select";
function SelectInput({ options, style, form, defaultValue }) {
  const [val, setVal] = useState(defaultValue);
  const [data, setData] = useState([]);
  useEffect(() => {
    setVal(defaultValue);
  }, [defaultValue]);

  const handleOnChange = (option) => {
    setVal(option);
  };

  useEffect(() => {}, [data]);

  return <Select isMulti onChange={handleOnChange} options={options} />;
}

export default SelectInput;
