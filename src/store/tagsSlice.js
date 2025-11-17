// src/store/tagsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tagsApi from "../api/tagsApi";

// --------------------------------------
// GET ALL TAGS
// --------------------------------------
export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const res = await tagsApi.getAll();
      return res.data; // expected: array of { id, name }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load tags");
    }
  }
);

// --------------------------------------
// SLICE
// --------------------------------------
const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    items: [], // actual tags
    loading: false,
    error: null,
    loaded: false, // whether tags have been fetched (prevents duplicate loads)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH TAGS
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tagsSlice.reducer;
