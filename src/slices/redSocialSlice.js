import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const createAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createRedSocial = createAsyncThunk(
  "redSocial/create",
  async ({ redSocialData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/redes-sociales`,
        redSocialData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllRedesSociales = createAsyncThunk(
  "redSocial/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/redes-sociales`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchRedSocialById = createAsyncThunk(
  "redSocial/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/redes-sociales/${id}`,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateRedSocial = createAsyncThunk(
  "redSocial/update",
  async ({ id, redSocialData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/redes-sociales/${id}`,
        redSocialData,
        createAuthHeaders(token)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteRedSocial = createAsyncThunk(
  "redSocial/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/redes-sociales/${id}`,
        createAuthHeaders(token)
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const redSocialSlice = createSlice({
  name: "redSocial",
  initialState: {
    redesSociales: [],
    currentRedSocial: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentRedSocial: (state) => {
      state.currentRedSocial = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRedSocial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRedSocial.fulfilled, (state, action) => {
        state.loading = false;
        state.redesSociales.push(action.payload);
      })
      .addCase(createRedSocial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllRedesSociales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRedesSociales.fulfilled, (state, action) => {
        state.loading = false;
        state.redesSociales = action.payload;
      })
      .addCase(fetchAllRedesSociales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRedSocialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRedSocialById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRedSocial = action.payload;
      })
      .addCase(fetchRedSocialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRedSocial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRedSocial.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.redesSociales.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.redesSociales[index] = action.payload;
        }
        if (state.currentRedSocial?.id === action.payload.id) {
          state.currentRedSocial = action.payload;
        }
      })
      .addCase(updateRedSocial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRedSocial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRedSocial.fulfilled, (state, action) => {
        state.loading = false;
        state.redesSociales = state.redesSociales.filter(
          (r) => r.id !== action.payload
        );
        if (state.currentRedSocial?.id === action.payload) {
          state.currentRedSocial = null;
        }
      })
      .addCase(deleteRedSocial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentRedSocial, clearError: clearRedSocialError } =
  redSocialSlice.actions;

export const selectRedesSociales = (state) => state.redSocial.redesSociales;
export const selectCurrentRedSocial = (state) =>
  state.redSocial.currentRedSocial;
export const selectRedSocialLoading = (state) => state.redSocial.loading;
export const selectRedSocialError = (state) => state.redSocial.error;

export const redSocialReducer = redSocialSlice.reducer;
