// src/store/entities/playlistVideosSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byPlaylistId: {}, // playlistId → videoId → metadata
};

const playlistVideosSlice = createSlice({
  name: "playlistVideos",
  initialState,
  reducers: {
    // -------------------------------------------------
    // UPSERT MULTIPLE (from normalizePlaylistResponse)
    // -------------------------------------------------
    upsertPlaylistVideos(state, action) {
      const entries = action.payload; // [{ playlistId, videoId, added_at, position }, ...]

      entries.forEach((pv) => {
        if (!state.byPlaylistId[pv.playlistId]) {
          state.byPlaylistId[pv.playlistId] = {};
        }

        state.byPlaylistId[pv.playlistId][pv.videoId] = {
          added_at: pv.added_at ?? null,
          position: pv.position ?? 0,
        };
      });
    },

    // -------------------------------------------------
    // REMOVE VIDEO FROM PLAYLIST
    // -------------------------------------------------
    removePlaylistVideo(state, action) {
      const { playlistId, videoId } = action.payload;

      if (state.byPlaylistId[playlistId]) {
        delete state.byPlaylistId[playlistId][videoId];
      }
    },

    // -------------------------------------------------
    // REORDER POSITIONS
    // (Used after drag/drop or backend reorder)
    // -------------------------------------------------
    updatePositions(state, action) {
      const { playlistId, videoIds } = action.payload;

      const map = state.byPlaylistId[playlistId];
      if (!map) return; // no data loaded for this playlist yet

      videoIds.forEach((videoId, index) => {
        if (map[videoId]) {
          map[videoId].position = index;
        }
      });
    },
  },
});

export const { upsertPlaylistVideos, removePlaylistVideo, updatePositions } =
  playlistVideosSlice.actions;

export default playlistVideosSlice.reducer;
