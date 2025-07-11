/**
 * Retrieves the access token from localStorage.
 *
 * @description This function attempts to retrieve the access token stored under the key "token" in localStorage. If a token exists, it is returned as a resolved Promise. If no token exists, an Error with the message "No Token" is thrown, and the function returns a rejected Promise with `false` as the reason.
 *
 * @returns {Promise<string | boolean>} A Promise resolving to the token string if found, or `false` if no token exists or an error occurs.
 *
 * @example
 * getToken().then(token => {
 *   console.log("Token:", token);
 * }).catch(error => {
 *   console.error("Error retrieving token:", error);
 * });
 */
export function getToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No Token");
    }

    return Promise.resolve(token);
  } catch {
    return Promise.reject(false);
  }
}

/**
 * Removes the access token from localStorage.
 *
 * @description This function removes the access token stored under the key "token" in localStorage. If the token is removed successfully, a resolved Promise with `true` is returned. If an error occurs during removal, the function returns a rejected Promise with `false` as the reason.
 *
 * @returns {Promise<boolean>} A Promise resolving to `true` if the token is removed successfully, or `false` if an error occurs.
 *
 * @example
 * removeToken().then(() => {
 *   console.log("Token removed successfully");
 * }).catch(error => {
 *   console.error("Error removing token:", error);
 * });
 */
export function removeToken() {
  try {
    localStorage.removeItem("token");
    return Promise.resolve(true);
  } catch {
    return Promise.reject(false);
  }
}
