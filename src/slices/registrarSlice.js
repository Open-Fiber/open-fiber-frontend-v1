import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "registrar/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/registrar`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const registrarSlice = createSlice({
  name: "registrar",
  initialState: {
    registeredUser: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearRegistrationState: (state) => {
      state.registeredUser = null;
      state.error = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredUser = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registeredUser = null;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearRegistrationState, clearError } = registrarSlice.actions;

// Selectors
export const selectRegisteredUser = (state) => state.registrar.registeredUser;
export const selectRegistrarLoading = (state) => state.registrar.loading;
export const selectRegistrarError = (state) => state.registrar.error;
export const selectRegistrarSuccess = (state) => state.registrar.success;

export default registrarSlice.reducer;
