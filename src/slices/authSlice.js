import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { storeToken, clearToken, getStoredToken } from "../utils/authUtils";

const API_URL = import.meta.env.VITE_API_URL;

// Async thunks replace your action creators
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { accessToken, data } = response.data.data;

      // Store token
      storeToken(accessToken);

      const result = await dispatch(checkToken());
      return result;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      console.log(error);
      clearToken();
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (_, { rejectWithValue }) => {
    const token = getStoredToken();

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/checkToken`,
        {},
        {
          params: { token },
        }
      );

      console.log(response);

      const { rol, sub, tipo, time, isExpired } = response.data.data;

      if (isExpired === "true") {
        clearToken();
        return rejectWithValue("Token expired");
      }

      return {
        rol,
        sub,
        tipo,
        time,
        isExpired: isExpired === "false",
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Token validation failed";
      clearToken();
      return rejectWithValue(errorMessage);
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { dispatch }) => {
    const token = getStoredToken();

    if (token) {
      const result = await dispatch(checkToken());
      return result;
    }

    return null;
  }
);

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
    rol: null,
    tipo: null,
    loading: false,
    error: null,
    tokenChecking: false,
  },
  reducers: {
    // Synchronous actions
    logout: (state) => {
      clearToken();
      // RTK uses Immer under the hood, so we can "mutate" state directly
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.rol = null;
      state.tipo = null;
      state.loading = false;
      state.error = null;
      state.tokenChecking = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunk states
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload;
      })
      // Check token cases
      .addCase(checkToken.pending, (state) => {
        state.tokenChecking = true;
        state.error = null;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.tokenChecking = false;
        state.isAuthenticated = true;
        state.rol = action.payload.rol;
        state.tipo = action.payload.tipo;
        state.error = null;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.tokenChecking = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.rol = null;
        state.tipo = null;
        state.error = action.payload;
      });
  },
});

// Export actions (automatically generated)
export const { logout, clearError } = authSlice.actions;

// Export selectors (optional but recommended)
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Export reducer
export default authSlice.reducer;
