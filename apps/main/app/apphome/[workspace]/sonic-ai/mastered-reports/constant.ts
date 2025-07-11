import { showOptionType } from "./types";

// export const downloadOption = [
//   { value: ".mp3", label: "MP3 (4MB approx)" },
//   { value: ".wav", label: "WAV (3.5MB approx)" },
//   { value: "_hd.wav", label: "WAV HD (15MB approx)" },
// ];

export const showOption: showOptionType = {
  "ai-mastered": true,
  original: true,
  reference: true,
};

export const aiMasteredStyle = {
  fill: true,
  backgroundColor: "rgba(255, 203, 84, 0.6)",
  borderColor: "rgba(255, 203, 84, 1)",
  borderWidth: 1,
}



export const originalStyle = {
  fill: true,
  backgroundColor: "rgba(94, 50, 255, 0.6)",
  borderColor: "rgba(94, 50, 255, 1)",
  borderWidth: 1,
}

export const referenceStyle = {
  fill: true,
  backgroundColor: "rgba(136, 254, 255, 0.6)",
  borderColor: "rgba(0, 216, 216, 1)",
  borderWidth: 1,
}