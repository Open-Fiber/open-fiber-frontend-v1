import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createCasoDeUso = createAsyncThunk(
  "casoDeUso/create",
  async ({ casoDeUsoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/casos-de-uso`,
        casoDeUsoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllCasosDeUso = createAsyncThunk(
  "casoDeUso/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/casos-de-uso`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCasoDeUsoById = createAsyncThunk(
  "casoDeUso/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/casos-de-uso/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCasoDeUso = createAsyncThunk(
  "casoDeUso/update",
  async ({ id, casoDeUsoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/casos-de-uso/${id}`,
        casoDeUsoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCasoDeUso = createAsyncThunk(
  "casoDeUso/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/casos-de-uso/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const casoDeUsoSlice = createSlice({
  name: "casoDeUso",
  initialState: {
    casosDeUso: [],
    currentCasoDeUso: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentCasoDeUso: (state) => {
      state.currentCasoDeUso = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCasoDeUso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCasoDeUso.fulfilled, (state, action) => {
        state.loading = false;
        state.casosDeUso.push(action.payload);
      })
      .addCase(createCasoDeUso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllCasosDeUso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCasosDeUso.fulfilled, (state, action) => {
        state.loading = false;
        state.casosDeUso = action.payload;
      })
      .addCase(fetchAllCasosDeUso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCasoDeUsoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCasoDeUsoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCasoDeUso = action.payload;
      })
      .addCase(fetchCasoDeUsoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCasoDeUso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCasoDeUso.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.casosDeUso.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.casosDeUso[index] = action.payload;
        }
        if (state.currentCasoDeUso?.id === action.payload.id) {
          state.currentCasoDeUso = action.payload;
        }
      })
      .addCase(updateCasoDeUso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCasoDeUso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCasoDeUso.fulfilled, (state, action) => {
        state.loading = false;
        state.casosDeUso = state.casosDeUso.filter(
          (c) => c.id !== action.payload
        );
        if (state.currentCasoDeUso?.id === action.payload) {
          state.currentCasoDeUso = null;
        }
      })
      .addCase(deleteCasoDeUso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentCasoDeUso, clearError: clearCasoDeUsoError } =
  casoDeUsoSlice.actions;

export const selectCasosDeUso = (state) => state.casoDeUso.casosDeUso;
export const selectCurrentCasoDeUso = (state) =>
  state.casoDeUso.currentCasoDeUso;
export const selectCasoDeUsoLoading = (state) => state.casoDeUso.loading;
export const selectCasoDeUsoError = (state) => state.casoDeUso.error;

export const casoDeUsoReducer = casoDeUsoSlice.reducer;
