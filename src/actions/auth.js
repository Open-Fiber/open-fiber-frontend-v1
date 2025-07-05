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
  storeToken,
  clearToken,
  getStoredToken,
  addTokenToData,
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

    // Store token only
    storeToken(accessToken);

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

  console.log("checking token:", token);

  if (!token) {
    console.log("no token!!!!");
    dispatch({
      type: CHECK_TOKEN_FAILURE,
      payload: "No token found",
    });
    return { success: false, error: "No token found" };
  }

  try {
    const response = await axios.post(
      `${API_URL}/api/auth/checkToken`,
      {},
      {
        params: {
          token: token,
        },
      }
    );

    console.log(response.data);

    const { rol, sub, tipo, time, isExpired } = response.data.data;

    if (isExpired === "true") {
      clearToken();
      dispatch({
        type: CHECK_TOKEN_FAILURE,
        payload: "Token expired",
      });
      return { success: false, error: "Token expired" };
    }

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
  clearToken();
  dispatch({ type: LOGOUT });
};

// Auto-check token on app initialization
export const initializeAuth = () => async (dispatch) => {
  const token = getStoredToken();
  console.log("verifying token:", token);

  if (token) {
    console.log("Token found, checking validity...");
    const result = await dispatch(checkToken());

    if (!result.success) {
      console.log("Token validation failed during initialization");
    }
  }
};
