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

export const selectPublicPlaylists = createSelector(
  (state) => state.playlistsEntities.byId,
  (byId) => {
    if (!byId) return [];
    return Object.values(byId).filter((p) => p?.is_public);
  }
);

export const makeSelectRecommendedPlaylists = (tagIds = []) =>
  createSelector(selectPublicPlaylists, (publicPlaylists) => {
    if (!Array.isArray(tagIds) || tagIds.length === 0) return [];

    return publicPlaylists.filter((p) =>
      (p.tagIds || []).some((id) => tagIds.includes(id))
    );
  });

export const selectRecommendedPlaylists = createSelector(
  [(state) => state.playlistsEntities.byId, (state) => state.auth.user],
  (byId, user) => {
    if (!byId) return [];

    const all = Object.values(byId);

    return all
      .filter((p) => p?.is_public)
      .filter((p) => !user || p.owner_id !== user.id);
  }
);

export const makeSelectRecommendedPlaylistsByTags = (tagIds = []) =>
  createSelector(
    [selectPublicPlaylists, (state) => state.auth.user],
    (publicPlaylists, user) => {
      if (!Array.isArray(tagIds) || tagIds.length === 0) return [];

      return publicPlaylists
        .filter((p) => !user || p.owner_id !== user.id)
        .filter((p) => (p.tagIds || []).some((id) => tagIds.includes(id)));
    }
  );
