"use client"
import "../css/loader.css"
function Loader(props) {
  return (
    <>
      <div className="loading"></div>
      <p className="pt-24 text-center">{props.text}</p>
    </>
  );
}

export default Loader;
