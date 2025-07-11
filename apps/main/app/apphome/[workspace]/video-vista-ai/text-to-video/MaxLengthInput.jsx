import React, { useRef, useState } from "react";

function MaxLengthInput({ maximumCharacterLimit, height, setAi ,setOwn}) {
  const [inputText, setInputText] = useState("");
  const maxCharacterLimit = maximumCharacterLimit;

  const handleChange = (event) => {
    if (event.target.value.length <= maxCharacterLimit) {
      setInputText(event.target.value);
      setAi(event.target.value);
      
    }
  };
  
  return (
    <div>
      <textarea
        value={inputText}
        placeholder={`Enter text (max ${maxCharacterLimit} characters)`}
        onChange={handleChange}
        rows={5} // Adjust the number of rows as needed
        className={`w-full h-[${height}] bg-transparent py-[20px] px-[23px] text-[#8297BD] border border-solid outline-none`}
      />
      <p className="text-[#8297BD] text-end text-xs">
        {inputText.length} /{maxCharacterLimit}
      </p>
    </div>
  );
}

export default MaxLengthInput;
