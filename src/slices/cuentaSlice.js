import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Async thunks
export const createCuenta = createAsyncThunk(
  "cuenta/create",
  async (cuentaData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/cuenta`, cuentaData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllCuentas = createAsyncThunk(
  "cuenta/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(`${API_URL}/api/cuenta?${queryString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCuentaById = createAsyncThunk(
  "cuenta/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/cuenta/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCuenta = createAsyncThunk(
  "cuenta/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/cuenta/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Special operation: cambiar estado
export const cambiarEstadoCuenta = createAsyncThunk(
  "cuenta/cambiarEstado",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/cuenta/cambiar-estado/${id}`
      );
      return { id, result: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cuentaSlice = createSlice({
  name: "cuenta",
  initialState: {
    cuentas: [],
    currentCuenta: null,
    loading: false,
    error: null,
    cambiarEstadoLoading: false,
  },
  reducers: {
    clearCurrentCuenta: (state) => {
      state.currentCuenta = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create cuenta
      .addCase(createCuenta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCuenta.fulfilled, (state, action) => {
        state.loading = false;
        state.cuentas.push(action.payload);
      })
      .addCase(createCuenta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all cuentas
      .addCase(fetchAllCuentas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCuentas.fulfilled, (state, action) => {
        state.loading = false;
        state.cuentas = action.payload;
      })
      .addCase(fetchAllCuentas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch cuenta by ID
      .addCase(fetchCuentaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCuentaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCuenta = action.payload;
      })
      .addCase(fetchCuentaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete cuenta
      .addCase(deleteCuenta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCuenta.fulfilled, (state, action) => {
        state.loading = false;
        state.cuentas = state.cuentas.filter((c) => c.id !== action.payload);
        if (state.currentCuenta?.id === action.payload) {
          state.currentCuenta = null;
        }
      })
      .addCase(deleteCuenta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cambiar estado cuenta
      .addCase(cambiarEstadoCuenta.pending, (state) => {
        state.cambiarEstadoLoading = true;
        state.error = null;
      })
      .addCase(cambiarEstadoCuenta.fulfilled, (state, action) => {
        state.cambiarEstadoLoading = false;
        // Update the cuenta in the array based on the response
        const index = state.cuentas.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          // Toggle the isActive status (assuming this is what cambiar estado does)
          state.cuentas[index].isActive = !state.cuentas[index].isActive;
        }
        if (state.currentCuenta?.id === action.payload.id) {
          state.currentCuenta.isActive = !state.currentCuenta.isActive;
        }
      })
      .addCase(cambiarEstadoCuenta.rejected, (state, action) => {
        state.cambiarEstadoLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentCuenta, clearError } = cuentaSlice.actions;

// Selectors
export const selectCuentas = (state) => state.cuenta.cuentas;
export const selectCurrentCuenta = (state) => state.cuenta.currentCuenta;
export const selectCuentaLoading = (state) => state.cuenta.loading;
export const selectCuentaError = (state) => state.cuenta.error;
export const selectCambiarEstadoLoading = (state) =>
  state.cuenta.cambiarEstadoLoading;

export default cuentaSlice.reducer;
