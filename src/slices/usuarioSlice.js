import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Async thunks
export const createUsuario = createAsyncThunk(
  "usuario/create",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/usuarios`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllUsuarios = createAsyncThunk(
  "usuario/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/usuarios`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUsuarioById = createAsyncThunk(
  "usuario/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/usuarios/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUsuario = createAsyncThunk(
  "usuario/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/usuarios/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Special operation: update rol
export const updateUsuarioRol = createAsyncThunk(
  "usuario/updateRol",
  async ({ id, rolData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/usuarios/rol/${id}`,
        rolData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    usuarios: [],
    currentUsuario: null,
    loading: false,
    error: null,
    updateRolLoading: false,
  },
  reducers: {
    clearCurrentUsuario: (state) => {
      state.currentUsuario = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create usuario
      .addCase(createUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios.push(action.payload);
      })
      .addCase(createUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all usuarios
      .addCase(fetchAllUsuarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsuarios.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = action.payload;
      })
      .addCase(fetchAllUsuarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch usuario by ID
      .addCase(fetchUsuarioById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarioById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUsuario = action.payload;
      })
      .addCase(fetchUsuarioById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update usuario
      .addCase(updateUsuario.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUsuario.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.usuarios.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.usuarios[index] = action.payload;
        }
        if (state.currentUsuario?.id === action.payload.id) {
          state.currentUsuario = action.payload;
        }
      })
      .addCase(updateUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update usuario rol
      .addCase(updateUsuarioRol.pending, (state) => {
        state.updateRolLoading = true;
        state.error = null;
      })
      .addCase(updateUsuarioRol.fulfilled, (state, action) => {
        state.updateRolLoading = false;
        const index = state.usuarios.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.usuarios[index] = action.payload;
        }
        if (state.currentUsuario?.id === action.payload.id) {
          state.currentUsuario = action.payload;
        }
      })
      .addCase(updateUsuarioRol.rejected, (state, action) => {
        state.updateRolLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentUsuario, clearError } = usuarioSlice.actions;

// Selectors
export const selectUsuarios = (state) => state.usuario.usuarios;
export const selectCurrentUsuario = (state) => state.usuario.currentUsuario;
export const selectUsuarioLoading = (state) => state.usuario.loading;
export const selectUsuarioError = (state) => state.usuario.error;
export const selectUpdateRolLoading = (state) => state.usuario.updateRolLoading;

export default usuarioSlice.reducer;
