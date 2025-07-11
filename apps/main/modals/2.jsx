"use client"
function ReusableModal(props) {
  return (
    <>
      <div className="flex justify-center mt-32 ">
        <p className="text-center font-extrabold text-[#FFCB54] text-[18px]">
          {props.text}
        </p>
      </div>
      <div className="flex justify-center">
        <p className="text-center font-light pt-3  text-white">{props.sub}</p>
      </div>

      <div className="flex justify-center">
        <div className="flex mt-6">
          {props.buttons.map((button) => (
            <div
              className={`block  text-white cursor-pointer hover:text-black border border-amber-400 hover:bg-amber-300 font-lg rounded-md px-5 py-1 md:py-2 text-center mr-2`}
            >
              {button}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ReusableModal;
