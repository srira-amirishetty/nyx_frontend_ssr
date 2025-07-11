import { verifyJWTToken } from "./utils";

/**
 * Checks if a valid JWT token exists in localStorage.
 *
 * @description This function retrieves the token from localStorage, verifies it using the `verifyJWTToken` function (assumed to exist elsewhere), and returns `true` if the token is valid and `false` otherwise.
 *
 * @returns {boolean} True if a valid token exists, false otherwise.
 *
 * @example
 * // Assuming verifyJWTToken is implemented elsewhere
 * localStorage.setItem('token', 'some-valid-jwt-token');
 * const hasValidToken = hasToken();
 * console.log(hasValidToken); // Output: true (assuming verification succeeds)
 *
 * localStorage.removeItem('token');
 */
export const hasToken = () => {
  const result = verifyJWTToken(localStorage.getItem("token"));
  return result.data != null;
};
