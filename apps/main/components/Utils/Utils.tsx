/* eslint-disable @next/next/no-img-element */
import { ButtonElement } from "../../shared/inputs";

export const CENTER_TEXT = (text: string, margin: string) => {
  return (
    <div className="flex justify-center  ">
      <p
        className={`border-yellow-500 text-[22px] ${margin} border-b-4 text-white font-bold p-1`}
      >
        {text}
      </p>
    </div>
  );
};

export const TOKEN_CELL = ({
  name,
  image,
  subname,
}: {
  name: string;
  image: string;
  subname: string;
}) => {
  return (
    <div className="flex gap-3 mt-2">
      <div className="ml-3">
        <img className="w-[3rem]" src={image} alt="image"></img>
      </div>
      <div className="">
        <p className="text-white">{name}</p>
        <p className="text-white font-light">{subname}</p>
      </div>
    </div>
  );
};

export const BELOW_CONTENT = ({
  title,
  button_name,
  width,
}: {
  title: string;
  button_name: string;
  width: string;
}) => {
  return (
    <div className="flex justify-center gap-4">
      <p className="title text-white pt-1.5">{title}</p>
      <ButtonElement width={width} name={button_name}></ButtonElement>
    </div>
  );
};
