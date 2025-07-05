import axios from "axios";

/**
 * Get the current token from localStorage
 * @returns {string|null} The token or null if not found
 */
export const getStoredToken = () => {
  return localStorage.getItem("token");
};

/**
 * Store token in localStorage only
 * @param {string} token - The token to store
 */
export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Remove token from localStorage
 */
export const clearToken = () => {
  localStorage.removeItem("token");
};

/**
 * Add token to request data
 * @param {object} data - Request data
 * @returns {object} Request data with token added
 */
export const addTokenToData = (data = {}) => {
  const token = getStoredToken();
  return token ? { ...data, token } : data;
};
