export const handleDownload = async (item: any, type: string) => {
  try {
    let response :Response;
    if (type === "Videos") {
      response = await fetch(item.file_details.signed_video_url);
    } else response = await fetch(item.file_details.signed_image_url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    if (type === "Videos") anchor.download = "video.mp4";
    else anchor.download = "image.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};
