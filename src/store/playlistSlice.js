// src/store/playlistSlice.js
import { createSlice, createAction } from "@reduxjs/toolkit";
import {
  createPlaylistNormalized,
  updatePlaylistNormalized,
  deletePlaylistNormalized,
} from "./playlistThunksNormalized.js";

// UI-only state
const initialState = {
  currentId: null,
  loading: false,
  error: null,
};

export const setCurrentPlaylistId = createAction(
  "playlists/setCurrentPlaylistId"
);

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SELECT CURRENT
      .addCase(setCurrentPlaylistId, (state, action) => {
        state.currentId = action.payload;
      })

      // CREATE
      .addCase(createPlaylistNormalized.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlaylistNormalized.fulfilled, (state, action) => {
        state.loading = false;
        state.currentId = action.payload.id;
      })
      .addCase(createPlaylistNormalized.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updatePlaylistNormalized.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlaylistNormalized.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePlaylistNormalized.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deletePlaylistNormalized.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlaylistNormalized.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentId === action.payload) {
          state.currentId = null;
        }
      })
      .addCase(deletePlaylistNormalized.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default playlistSlice.reducer;
