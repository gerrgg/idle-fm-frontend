// src/store/entities/playlistVideosSlice.js
import { createSlice } from "@reduxjs/toolkit";

/**
 * STATE SHAPE
 *
 * playlistVideos: {
 *   byPlaylistId: {
 *     [playlistId]: {
 *        [videoId]: {
 *           added_at: "...",
 *           position: 0
 *        }
 *     }
 *   }
 * }
 */

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
    reorderPlaylistVideos(state, action) {
      const { playlistId, orderedVideoIds } = action.payload;

      if (!state.byPlaylistId[playlistId]) return;

      orderedVideoIds.forEach((videoId, index) => {
        if (state.byPlaylistId[playlistId][videoId]) {
          state.byPlaylistId[playlistId][videoId].position = index;
        }
      });
    },
  },
});

export const {
  upsertPlaylistVideos,
  removePlaylistVideo,
  reorderPlaylistVideos,
} = playlistVideosSlice.actions;

export default playlistVideosSlice.reducer;
