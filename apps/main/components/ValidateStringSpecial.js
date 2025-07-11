export default function ValidateStringSpecial(str) {
  // Regular expression to match special characters
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  // Check if the first character is a special character
  return !specialChars.test(str[0]);
}
