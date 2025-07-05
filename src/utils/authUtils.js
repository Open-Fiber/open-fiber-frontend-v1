import axios from "axios";

/**
 * Set the authorization token for all future axios requests
 * @param {string} token - The JWT token to set
 */
export const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Auth token set in axios headers");
  } else {
    // Delete auth header if no token
    delete axios.defaults.headers.common["Authorization"];
    console.log("Auth token removed from axios headers");
  }
};

/**
 * Remove the authorization token from axios headers
 */
export const removeAuthToken = () => {
  delete axios.defaults.headers.common["Authorization"];
  console.log("Auth token removed from axios headers");
};

/**
 * Get the current token from localStorage
 * @returns {string|null} The token or null if not found
 */
export const getStoredToken = () => {
  return localStorage.getItem("token");
};

/**
 * Store token in localStorage and set it in axios headers
 * @param {string} token - The token to store and set
 */
export const storeAndSetToken = (token) => {
  localStorage.setItem("token", token);
  setAuthToken(token);
};

/**
 * Remove token from localStorage and axios headers
 */
export const clearToken = () => {
  localStorage.removeItem("token");
  removeAuthToken();
};
