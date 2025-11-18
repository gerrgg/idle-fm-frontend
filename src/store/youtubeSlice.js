import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { youtubeApi } from "../api/youtubeApi";

export const searchYoutube = createAsyncThunk(
  "youtube/search",
  async (query, { rejectWithValue }) => {
    try {
      const res = await youtubeApi.search(query);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Search failed");
    }
  }
);

const youtubeSlice = createSlice({
  name: "youtube",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearYoutubeResults(state) {
      state.results = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchYoutube.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchYoutube.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchYoutube.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  },
});

export const { clearYoutubeResults } = youtubeSlice.actions;

export default youtubeSlice.reducer;
