import * as React from "react";

function VideosIcon(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 8H2v12a2 2 0 002 2h12v-2H4V8z" fill={"inherit"} />
      <path
        d="M20 2H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm-9 12V6l7 4-7 4z"
        fill={"inherit"}
      />
    </svg>
  );
}

export default VideosIcon;
