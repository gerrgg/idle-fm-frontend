import { createAsyncThunk } from "@reduxjs/toolkit";
import playlistApi from "../api/playlistApi";
import {
  removePlaylistVideo,
  updatePositions,
} from "./entities/playlistVideosSlice";

import { updatePlaylistVideoIds } from "./entities/playlistsSlice";

export const removeVideoFromPlaylistNormalized = createAsyncThunk(
  "playlists/removeVideo",
  async ({ playlistId, videoId }, { dispatch, getState, rejectWithValue }) => {
    try {
      await playlistApi.removeVideo(playlistId, videoId);

      // 1. Remove from playlistVideosEntities
      dispatch(removePlaylistVideo({ playlistId, videoId }));

      // 2. Recalculate remaining positions locally (optional but recommended)
      const state = getState();
      const pvMap = state.playlistVideos.byPlaylistId[playlistId] || {};

      const sortedVideoIds = Object.entries(pvMap)
        .sort(([, a], [, b]) => a.position - b.position)
        .map(([vid]) => Number(vid));

      dispatch(updatePositions({ playlistId, videoIds: sortedVideoIds }));

      dispatch(
        updatePlaylistVideoIds({ playlistId, videoIds: sortedVideoIds })
      );

      return { playlistId, videoId };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to remove video");
    }
  }
);
