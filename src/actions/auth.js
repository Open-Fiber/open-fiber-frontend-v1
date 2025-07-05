import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHECK_TOKEN_REQUEST,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_FAILURE,
  LOGOUT,
} from "./types";
import {
  storeAndSetToken,
  clearToken,
  getStoredToken,
  setAuthToken,
} from "../utils/authUtils";

const API_URL = import.meta.env.VITE_API_URL;

// Login action
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });

    const { accessToken, data } = response.data.data;

    // Store token and set in axios headers
    storeAndSetToken(accessToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: accessToken,
        user: data,
      },
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";

    // Clear any existing token on login failure
    clearToken();

    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMessage,
    });

    return { success: false, error: errorMessage };
  }
};

// Check token action
export const checkToken = () => async (dispatch) => {
  dispatch({ type: CHECK_TOKEN_REQUEST });

  const token = getStoredToken();

  if (!token) {
    console.log("no token!!!!");
    clearToken(); // Ensure headers are clean
    dispatch({
      type: CHECK_TOKEN_FAILURE,
      payload: "No token found",
    });
    return { success: false, error: "No token found" };
  }

  try {
    const response = await axios.post(`${API_URL}/api/auth/checkToken`, token);

    console.log(response.data);

    const { rol, sub, tipo, time, isExpired } = response.data;

    if (isExpired === "true") {
      clearToken(); // Remove token and headers
      dispatch({
        type: CHECK_TOKEN_FAILURE,
        payload: "Token expired",
      });
      return { success: false, error: "Token expired" };
    }

    // Token is valid, ensure it's set in headers
    setAuthToken(token);

    dispatch({
      type: CHECK_TOKEN_SUCCESS,
      payload: {
        rol,
        sub,
        tipo,
        time,
        isExpired: isExpired === "false",
      },
    });

    return { success: true };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Token validation failed";

    // Remove invalid token and headers
    clearToken();

    dispatch({
      type: CHECK_TOKEN_FAILURE,
      payload: errorMessage,
    });

    return { success: false, error: errorMessage };
  }
};

// Logout action
export const logout = () => (dispatch) => {
  // Clear token and headers
  clearToken();
  dispatch({ type: LOGOUT });
};

// Auto-check token on app initialization
export const initializeAuth = () => async (dispatch) => {
  const token = getStoredToken();
  console.log("verifying token:", token);

  if (token) {
    console.log("Token found, setting in headers and checking validity...");
    // Set token in headers immediately (for better UX)
    setAuthToken(token);
    // Then check if it's still valid
    const result = await dispatch(checkToken());

    // If token check failed, headers will be cleared by checkToken action
    if (!result.success) {
      console.log("Token validation failed during initialization");
    }
  } else {
    // No token found, ensure headers are clean
    clearToken();
  }
};
