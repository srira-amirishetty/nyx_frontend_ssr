export { default } from "../brand-canvas-new/page";
// ("use client");
// import React, { useEffect } from "react";
// import dynamic from "next/dynamic";

// const VideoDynmicEditor = dynamic(
//   () => import("@/components/VideoEditor").then((a) => a.EditorWithStore),
//   {
//     ssr: false,
//   },
// );

// function EditorPage() {
//   useEffect(() => {
//     const handleBeforeUnload = (event: any) => {
//       event.preventDefault();
//       event.returnValue = "Changes you made may not be saved."; //Required for Chrome to show the dialog
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   return <VideoDynmicEditor />;
// }

// EditorPage.diplsayName = "EditorPage";

// export default EditorPage;
