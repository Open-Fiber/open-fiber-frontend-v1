import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createContextoDeAplicacion = createAsyncThunk(
  "contextoDeAplicacion/create",
  async ({ contextoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/contextos-de-aplicacion`,
        contextoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllContextosDeAplicacion = createAsyncThunk(
  "contextoDeAplicacion/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/contextos-de-aplicacion`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchContextoDeAplicacionById = createAsyncThunk(
  "contextoDeAplicacion/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/contextos-de-aplicacion/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateContextoDeAplicacion = createAsyncThunk(
  "contextoDeAplicacion/update",
  async ({ id, contextoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/contextos-de-aplicacion/${id}`,
        contextoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteContextoDeAplicacion = createAsyncThunk(
  "contextoDeAplicacion/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/contextos-de-aplicacion/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const contextoDeAplicacionSlice = createSlice({
  name: "contextoDeAplicacion",
  initialState: {
    contextos: [],
    currentContexto: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentContexto: (state) => {
      state.currentContexto = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContextoDeAplicacion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContextoDeAplicacion.fulfilled, (state, action) => {
        state.loading = false;
        state.contextos.push(action.payload);
      })
      .addCase(createContextoDeAplicacion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllContextosDeAplicacion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContextosDeAplicacion.fulfilled, (state, action) => {
        state.loading = false;
        state.contextos = action.payload;
      })
      .addCase(fetchAllContextosDeAplicacion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchContextoDeAplicacionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContextoDeAplicacionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContexto = action.payload;
      })
      .addCase(fetchContextoDeAplicacionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateContextoDeAplicacion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContextoDeAplicacion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contextos.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.contextos[index] = action.payload;
        }
        if (state.currentContexto?.id === action.payload.id) {
          state.currentContexto = action.payload;
        }
      })
      .addCase(updateContextoDeAplicacion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContextoDeAplicacion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContextoDeAplicacion.fulfilled, (state, action) => {
        state.loading = false;
        state.contextos = state.contextos.filter(
          (c) => c.id !== action.payload
        );
        if (state.currentContexto?.id === action.payload) {
          state.currentContexto = null;
        }
      })
      .addCase(deleteContextoDeAplicacion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentContexto, clearError: clearContextoError } =
  contextoDeAplicacionSlice.actions;

export const selectContextos = (state) => state.contextoDeAplicacion.contextos;
export const selectCurrentContexto = (state) =>
  state.contextoDeAplicacion.currentContexto;
export const selectContextoLoading = (state) =>
  state.contextoDeAplicacion.loading;
export const selectContextoError = (state) => state.contextoDeAplicacion.error;

export const contextoDeAplicacionReducer = contextoDeAplicacionSlice.reducer;
