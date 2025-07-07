import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createHito = createAsyncThunk(
  "hito/create",
  async ({ hitoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/hitos`,
        hitoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllHitos = createAsyncThunk(
  "hito/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/hitos`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchHitoById = createAsyncThunk(
  "hito/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/hitos/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateHito = createAsyncThunk(
  "hito/update",
  async ({ id, hitoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/hitos/${id}`,
        hitoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteHito = createAsyncThunk(
  "hito/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/hitos/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const hitoSlice = createSlice({
  name: "hito",
  initialState: {
    hitos: [],
    currentHito: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentHito: (state) => {
      state.currentHito = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHito.fulfilled, (state, action) => {
        state.loading = false;
        state.hitos.push(action.payload);
      })
      .addCase(createHito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllHitos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllHitos.fulfilled, (state, action) => {
        state.loading = false;
        state.hitos = action.payload;
      })
      .addCase(fetchAllHitos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchHitoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHitoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHito = action.payload;
      })
      .addCase(fetchHitoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateHito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHito.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.hitos.findIndex((h) => h.id === action.payload.id);
        if (index !== -1) {
          state.hitos[index] = action.payload;
        }
        if (state.currentHito?.id === action.payload.id) {
          state.currentHito = action.payload;
        }
      })
      .addCase(updateHito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteHito.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHito.fulfilled, (state, action) => {
        state.loading = false;
        state.hitos = state.hitos.filter((h) => h.id !== action.payload);
        if (state.currentHito?.id === action.payload) {
          state.currentHito = null;
        }
      })
      .addCase(deleteHito.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentHito, clearError: clearHitoError } =
  hitoSlice.actions;

export const selectHitos = (state) => state.hito.hitos;
export const selectCurrentHito = (state) => state.hito.currentHito;
export const selectHitoLoading = (state) => state.hito.loading;
export const selectHitoError = (state) => state.hito.error;

export const hitoReducer = hitoSlice.reducer;
