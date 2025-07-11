export const toTitleCase = (str: string) => {
  if (!str) return str;

  return str.replace(/_/g, " ").replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const titleCaseKeys = (obj: Record<string, any>): Array<string> => {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Input must be a non-null object");
  }

  return Object.keys(obj).map(toTitleCase);
};

export const titleCaseBreakedKeys = (
  obj: Record<string, any>
): Array<Array<string>> => {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Input must be a non-null object");
  }

  return Object.keys(obj).map((text) => toTitleCase(text).split(" "));
};

/**
 * Convert long(more than 15 characters) string into small string with three dots and extension.
 * If type is not string then function return same as pass type
 * 
 * @param {string} songName 
 * 
 * @example
 * manipulateSongName('song_file_with.mp3') -> song_f...th.mp3
 * 
 * manipulateSongName(['sample']) -> ['sample']
 * @returns {string}
 */
export const manipulateSongName = (songName: string & any) => {
  if (typeof songName !== "string") return songName;

  if (songName.length > 15) {
    return songName.slice(0, 6) + "..." + songName.slice(-6);
  }

  return songName;
};


/**
 * Convert long(more than 15 characters) string into small string with three dots and extension.
 * If type is not string then function return same as pass type
 * 
 * @param {string} fileName 
 * 
 * @example
 * manipulateFileName('username_file_with_extenstion_long_text.txt') -> user...xt.txt
 * 
 * manipulateFileName(['sample']) -> ['sample']
 * @returns {string}
 */
export const manipulateFileName = (fileName: string & any, end = 4) => {
  if (typeof fileName !== "string") return fileName;

  if (fileName.length > 15) {
    return fileName.slice(0, end) + "..." + fileName.slice(-6);
  }

  return fileName;
};


/**
 * Truncates a string after a specified number of words and appends "...."
 * if the string contains more words than the limit.
 *
 * @param {string} str - The input string to be truncated.
 * @param {number} wordLimit - The maximum number of words allowed before truncation.
 * @returns {string} - The truncated string with "...." appended if necessary.
 */
export function truncateString(str: string, wordLimit: number): string {
  // Split the string by spaces to get an array of words
  const words = str.split(" ");
  
  // Check if the number of words exceeds the specified limit
  if (words.length > wordLimit) {
      // If there are more words than the limit, join the first 'wordLimit' words
      // and append "...." to indicate truncation
      return words.slice(0, wordLimit).join(" ") + " ....";
  } else {
      // If the number of words is within the limit, return the original string
      return str;
  }
}