import axios from "axios";
import {
  REGISTRAR_CREATE_REQUEST,
  REGISTRAR_CREATE_SUCCESS,
  REGISTRAR_CREATE_FAILURE,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Action to register a new user.
 * @param {object} userData - Data for registering a new user (includes account and user details).
 */
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTRAR_CREATE_REQUEST });
  try {
    const response = await axios.post(`${API_URL}/api/registrar`, userData);
    dispatch({
      type: REGISTRAR_CREATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTRAR_CREATE_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
