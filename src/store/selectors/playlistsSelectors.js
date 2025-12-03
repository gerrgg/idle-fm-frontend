import { createSelector } from "@reduxjs/toolkit";
import { selectPlaylistVideoMetadata } from "./playlistVideosSelectors";

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

const selectPlaylists = (state) => state.playlistsEntities.byId;
const selectVideos = (state) => state.videosEntities.byId;

export const selectMergedVideosForPlaylist = (playlistId) =>
  createSelector(
    [
      (state) => selectPlaylists(state)[playlistId],
      selectVideos,
      selectPlaylistVideoMetadata(playlistId),
    ],
    (playlist, videosById, meta) => {
      if (!playlist || !playlist.videoIds) return [];

      return playlist.videoIds
        .map((id) => {
          const base = videosById[id];
          const m = meta[id];

          if (!base) return null;

          return {
            ...base,
            position: m?.position ?? null,
            added_at: m?.added_at ?? null,
          };
        })
        .filter(Boolean)
        .sort((a, b) => {
          const pa = a.position ?? 999999;
          const pb = b.position ?? 999999;
          return pa - pb;
        });
    }
  );
