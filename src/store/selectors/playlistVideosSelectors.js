import { createSelector } from "reselect";

// Base slice getter
const selectPlaylistVideosRoot = (state) => state.playlistVideos.byPlaylistId;

// Selector factory (pass playlistId at call-site)
export const selectPlaylistVideoMetadata = (playlistId) =>
  createSelector([selectPlaylistVideosRoot], (byPlaylistId) => {
    return byPlaylistId[playlistId] || {};
  });
