export function getUserType(ptab: string) {
  const isUser = ptab === "user";
  const type = isUser ? "/users" : "/artists";
  const profile = isUser ? "userProfile" : "artistProfile";
  const base = isUser ? "login_user" : "login_artist";

  return { type, profile, base };
}

export async function fetchVideoAndConvertToBlob(videoUrl: string) {
  try {
    // Fetch the video as an ArrayBuffer
    const response = await fetch(videoUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch video");
    }
    const arrayBuffer = await response.arrayBuffer();

    // Convert ArrayBuffer to Blob
    const blob = new Blob([arrayBuffer], { type: "video/mp4" }); // Adjust the MIME type as needed

    // Return the Blob
    return blob;
  } catch (error) {
    console.error("Error:", error);
  }
}

export function urlToBlob(url: string, callback: (newBlob: Blob) => void) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => callback(blob))
    .catch((error) => console.error("Error fetching image blob:", error));
}
