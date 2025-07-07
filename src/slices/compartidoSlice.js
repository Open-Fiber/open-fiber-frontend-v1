import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createCompartido = createAsyncThunk(
  "compartido/create",
  async ({ compartidoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/compartidos`,
        compartidoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllCompartidos = createAsyncThunk(
  "compartido/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/compartidos`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCompartidoById = createAsyncThunk(
  "compartido/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/compartidos/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCompartido = createAsyncThunk(
  "compartido/update",
  async ({ id, compartidoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/compartidos/${id}`,
        compartidoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCompartido = createAsyncThunk(
  "compartido/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/compartidos/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const compartidoSlice = createSlice({
  name: "compartido",
  initialState: {
    compartidos: [],
    currentCompartido: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentCompartido: (state) => {
      state.currentCompartido = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCompartido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompartido.fulfilled, (state, action) => {
        state.loading = false;
        state.compartidos.push(action.payload);
      })
      .addCase(createCompartido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllCompartidos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCompartidos.fulfilled, (state, action) => {
        state.loading = false;
        state.compartidos = action.payload;
      })
      .addCase(fetchAllCompartidos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCompartidoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompartidoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCompartido = action.payload;
      })
      .addCase(fetchCompartidoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCompartido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompartido.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.compartidos.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.compartidos[index] = action.payload;
        }
        if (state.currentCompartido?.id === action.payload.id) {
          state.currentCompartido = action.payload;
        }
      })
      .addCase(updateCompartido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCompartido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompartido.fulfilled, (state, action) => {
        state.loading = false;
        state.compartidos = state.compartidos.filter(
          (c) => c.id !== action.payload
        );
        if (state.currentCompartido?.id === action.payload) {
          state.currentCompartido = null;
        }
      })
      .addCase(deleteCompartido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentCompartido, clearError: clearCompartidoError } =
  compartidoSlice.actions;

export const selectCompartidos = (state) => state.compartido.compartidos;
export const selectCurrentCompartido = (state) =>
  state.compartido.currentCompartido;
export const selectCompartidoLoading = (state) => state.compartido.loading;
export const selectCompartidoError = (state) => state.compartido.error;

// Advanced selectors
export const selectCompartidosByOrganizacion = (state, organizacionId) =>
  state.compartido.compartidos.filter(
    (c) => c.organizacionId === organizacionId
  );

export const selectCompartidosByMaquina = (state, maquinaId) =>
  state.compartido.compartidos.filter((c) => c.maquinaId === maquinaId);

export const selectCompartidosByEstado = (state, estado) =>
  state.compartido.compartidos.filter((c) => c.estado === estado);

export const compartidoReducer = compartidoSlice.reducer;
