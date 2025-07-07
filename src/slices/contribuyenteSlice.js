import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Async thunks for Contribuyente
export const createContribuyente = createAsyncThunk(
  "contribuyente/create",
  async ({ contribuyenteData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/contribuyentes`,
        contribuyenteData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllContribuyentes = createAsyncThunk(
  "contribuyente/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/contribuyentes`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchContribuyenteById = createAsyncThunk(
  "contribuyente/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/contribuyentes/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateContribuyente = createAsyncThunk(
  "contribuyente/update",
  async ({ id, contribuyenteData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/contribuyentes/${id}`,
        contribuyenteData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteContribuyente = createAsyncThunk(
  "contribuyente/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/contribuyentes/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const contribuyenteSlice = createSlice({
  name: "contribuyente",
  initialState: {
    contribuyentes: [],
    currentContribuyente: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentContribuyente: (state) => {
      state.currentContribuyente = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContribuyente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContribuyente.fulfilled, (state, action) => {
        state.loading = false;
        state.contribuyentes.push(action.payload);
      })
      .addCase(createContribuyente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllContribuyentes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContribuyentes.fulfilled, (state, action) => {
        state.loading = false;
        state.contribuyentes = action.payload;
      })
      .addCase(fetchAllContribuyentes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchContribuyenteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContribuyenteById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContribuyente = action.payload;
      })
      .addCase(fetchContribuyenteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateContribuyente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContribuyente.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contribuyentes.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.contribuyentes[index] = action.payload;
        }
        if (state.currentContribuyente?.id === action.payload.id) {
          state.currentContribuyente = action.payload;
        }
      })
      .addCase(updateContribuyente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContribuyente.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContribuyente.fulfilled, (state, action) => {
        state.loading = false;
        state.contribuyentes = state.contribuyentes.filter(
          (c) => c.id !== action.payload
        );
        if (state.currentContribuyente?.id === action.payload) {
          state.currentContribuyente = null;
        }
      })
      .addCase(deleteContribuyente.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentContribuyente, clearError } =
  contribuyenteSlice.actions;

export const selectContribuyentes = (state) =>
  state.contribuyente.contribuyentes;
export const selectCurrentContribuyente = (state) =>
  state.contribuyente.currentContribuyente;
export const selectContribuyenteLoading = (state) =>
  state.contribuyente.loading;
export const selectContribuyenteError = (state) => state.contribuyente.error;

export default contribuyenteSlice.reducer;
