import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Async thunks
export const createPermiso = createAsyncThunk(
  "permiso/create",
  async ({ permisoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/permiso`,
        permisoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllPermisos = createAsyncThunk(
  "permiso/fetchAll",
  async ({ params = {}, token }, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${API_URL}/api/permiso?${queryString}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPermisoById = createAsyncThunk(
  "permiso/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/permiso/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePermiso = createAsyncThunk(
  "permiso/update",
  async ({ id, permisoData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/permiso/${id}`,
        permisoData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePermiso = createAsyncThunk(
  "permiso/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/permiso/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const permisoSlice = createSlice({
  name: "permiso",
  initialState: {
    permisos: [],
    currentPermiso: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentPermiso: (state) => {
      state.currentPermiso = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create permiso
      .addCase(createPermiso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPermiso.fulfilled, (state, action) => {
        state.loading = false;
        state.permisos.push(action.payload);
      })
      .addCase(createPermiso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all permisos
      .addCase(fetchAllPermisos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPermisos.fulfilled, (state, action) => {
        state.loading = false;
        state.permisos = action.payload;
      })
      .addCase(fetchAllPermisos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch permiso by ID
      .addCase(fetchPermisoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermisoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPermiso = action.payload;
      })
      .addCase(fetchPermisoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update permiso
      .addCase(updatePermiso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePermiso.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.permisos.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.permisos[index] = action.payload;
        }
        if (state.currentPermiso?.id === action.payload.id) {
          state.currentPermiso = action.payload;
        }
      })
      .addCase(updatePermiso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete permiso
      .addCase(deletePermiso.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePermiso.fulfilled, (state, action) => {
        state.loading = false;
        state.permisos = state.permisos.filter((p) => p.id !== action.payload);
        if (state.currentPermiso?.id === action.payload) {
          state.currentPermiso = null;
        }
      })
      .addCase(deletePermiso.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentPermiso, clearError } = permisoSlice.actions;

// Selectors
export const selectPermisos = (state) => state.permiso.permisos;
export const selectCurrentPermiso = (state) => state.permiso.currentPermiso;
export const selectPermisoLoading = (state) => state.permiso.loading;
export const selectPermisoError = (state) => state.permiso.error;

export default permisoSlice.reducer;
