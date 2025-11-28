// src/store/youtubeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { searchYoutube } from "./youtubeThunks";

const youtubeSlice = createSlice({
  name: "youtube",
  initialState: {
    loading: false,
    results: [],
    error: null,
    lastQuery: "",
  },
  reducers: {
    clearYoutubeResults(state) {
      state.results = [];
      state.error = null;
      state.lastQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchYoutube.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.lastQuery = action.meta.arg;
      })
      .addCase(searchYoutube.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchYoutube.rejected, (state, action) => {
        state.loading = false;

        // Ignore cancellations
        if (action.payload?.cancelled) return;

        state.error = action.payload?.error || "search failed";
      });
  },
});

export const { clearYoutubeResults } = youtubeSlice.actions;
export default youtubeSlice.reducer;
