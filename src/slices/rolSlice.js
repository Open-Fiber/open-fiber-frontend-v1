import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Async thunks
export const createRol = createAsyncThunk(
  "rol/create",
  async ({ rolData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/rol`,
        rolData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllRoles = createAsyncThunk(
  "rol/fetchAll",
  async ({ params = {}, token }, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${API_URL}/api/rol?${queryString}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchRolById = createAsyncThunk(
  "rol/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/rol/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateRol = createAsyncThunk(
  "rol/update",
  async ({ id, rolData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/rol/${id}`,
        rolData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteRol = createAsyncThunk(
  "rol/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/rol/${id}`, createAuthHeaders(token));
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const rolSlice = createSlice({
  name: "rol",
  initialState: {
    roles: [],
    currentRol: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentRol: (state) => {
      state.currentRol = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create rol
      .addCase(createRol.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRol.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createRol.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all roles
      .addCase(fetchAllRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch rol by ID
      .addCase(fetchRolById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRol = action.payload;
      })
      .addCase(fetchRolById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update rol
      .addCase(updateRol.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRol.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.roles.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
        if (state.currentRol?.id === action.payload.id) {
          state.currentRol = action.payload;
        }
      })
      .addCase(updateRol.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete rol
      .addCase(deleteRol.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRol.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter((r) => r.id !== action.payload);
        if (state.currentRol?.id === action.payload) {
          state.currentRol = null;
        }
      })
      .addCase(deleteRol.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentRol, clearError } = rolSlice.actions;

// Selectors
export const selectRoles = (state) => state.rol.roles;
export const selectCurrentRol = (state) => state.rol.currentRol;
export const selectRolLoading = (state) => state.rol.loading;
export const selectRolError = (state) => state.rol.error;

export default rolSlice.reducer;
