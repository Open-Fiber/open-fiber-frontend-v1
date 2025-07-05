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

const API_URL = import.meta.env.VITE_API_URL;

// Login action
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });

    const { accessToken, dataCuenta } = response.data;

    // Store token in localStorage
    localStorage.setItem("token", accessToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: accessToken,
        user: dataCuenta,
      },
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";

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

  const token = localStorage.getItem("token");

  if (!token) {
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { rol, sub, tipo, time, isExpired } = response.data;

    if (isExpired === "true") {
      localStorage.removeItem("token");
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

    // Remove invalid token
    localStorage.removeItem("token");

    dispatch({
      type: CHECK_TOKEN_FAILURE,
      payload: errorMessage,
    });

    return { success: false, error: errorMessage };
  }
};

// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};

// Auto-check token on app initialization
export const initializeAuth = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    await dispatch(checkToken());
  }
};
