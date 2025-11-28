import { createSelector } from "@reduxjs/toolkit";

export const selectPlaylistEntities = (state) => state.playlistsEntities;
export const selectVideoEntities = (state) => state.videosEntities;

/* Return all playlists user owns */
export const selectMyPlaylists = createSelector(
  [selectPlaylistEntities],
  (pe) => pe.myIds.map((id) => pe.byId[id])
);

/* Get playlist by ID */
export const selectPlaylistById = (playlistId) =>
  createSelector([selectPlaylistEntities], (pe) => pe.byId[playlistId] || null);

/* Get a playlist’s videos as video objects */
export const selectVideosForPlaylist = (playlistId) =>
  createSelector([selectPlaylistEntities, selectVideoEntities], (pe, ve) => {
    const playlist = pe.byId[playlistId];
    if (!playlist) return [];

    return playlist.videoIds.map((id) => ve.byId[id]).filter(Boolean);
  });

/* Return all playlists (including non-user) */
export const selectAllPlaylists = createSelector(
  [selectPlaylistEntities],
  (pe) => pe.allIds.map((id) => pe.byId[id])
);
