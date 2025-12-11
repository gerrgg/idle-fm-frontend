// src/store/playlistsThunksNormalized.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import playlistApi from "../api/playlistApi";
import { normalizePlaylistResponse } from "../utils/normalizePlaylist";

import {
  upsertPlaylist,
  upsertMany as upsertPlaylists,
  addMyPlaylistId,
  setMyPlaylistIds,
  removePlaylist,
} from "./entities/playlistsSlice";

import { upsertMany as upsertVideos } from "./entities/videosSlice";
import { upsertMany as upsertTags } from "./entities/tagsSlice";
import { upsertMany as upsertUsers, upsertUser } from "./entities/usersSlice";
import { upsertPlaylistVideos } from "./entities/playlistVideosSlice";
import { updatePositions } from "./entities/playlistVideosSlice";

// -----------------------------------------------------
// FETCH ALL PLAYLISTS FOR A USER (SIDEBAR LOAD)
// -----------------------------------------------------
export const fetchUserPlaylistsNormalized = (userId) => async (dispatch) => {
  const res = await playlistApi.getUserPlaylists(userId);
  const raw = Array.isArray(res.data) ? res.data : res.data.playlists;

  const myIds = [];

  raw.forEach((item) => {
    const { playlist, videos, tags, owner, playlistVideos } =
      normalizePlaylistResponse(item);

    dispatch(upsertPlaylist(playlist));
    dispatch(upsertVideos(videos));
    dispatch(upsertTags(tags));
    dispatch(upsertUser(owner));
    dispatch(upsertPlaylistVideos(playlistVideos));

    myIds.push(playlist.id);
  });

  dispatch(setMyPlaylistIds(myIds));

  return myIds;
};

export const ensurePlaylistLoaded =
  (playlistId) => async (dispatch, getState) => {
    const state = getState();
    const playlist = state.playlistsEntities.byId[playlistId];

    // if videos exist, assume playlist is fully loaded
    if (playlist?.videoIds?.length > 0) return;

    await dispatch(fetchPlaylistByIdNormalized(playlistId));
  };

// -----------------------------------------------------
// FETCH A SINGLE PLAYLIST (Playlist Edit Page)
// -----------------------------------------------------
export const fetchPlaylistByIdNormalized = (playlistId) => async (dispatch) => {
  const res = await playlistApi.getById(playlistId);

  const { playlist, videos, tags, owner, playlistVideos } =
    normalizePlaylistResponse(res.data);

  dispatch(upsertPlaylist(playlist));
  dispatch(upsertVideos(videos));
  dispatch(upsertTags(tags));
  dispatch(upsertUser(owner));
  dispatch(upsertPlaylistVideos(playlistVideos));

  return playlistId;
};

// -----------------------------------------------------
// CREATE PLAYLIST (returns playlist + inserts into store)
// -----------------------------------------------------
export const createPlaylistNormalized = createAsyncThunk(
  "playlists/createPlaylistNormalized",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await playlistApi.create(data);

      const { playlist, videos, tags } = normalizePlaylistResponse(res.data);

      dispatch(upsertPlaylist(playlist));
      dispatch(upsertVideos(videos));
      dispatch(upsertTags(tags));

      dispatch(addMyPlaylistId(playlist.id));

      return playlist;
    } catch (err) {
      console.error("CREATE PLAYLIST ERROR:", err.response?.data || err);
      return rejectWithValue(err.response?.data || "Failed to create playlist");
    }
  }
);

// -----------------------------------------------------
// UPDATE PLAYLIST (title/description/tags)
// -----------------------------------------------------
export const updatePlaylistNormalized = createAsyncThunk(
  "playlists/updatePlaylistNormalized",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await playlistApi.update(id, data);

      const { playlist, tags } = res.data; // USE BACKEND RESPONSE DIRECTLY

      // update only metadata + tagIds
      dispatch(upsertPlaylist(playlist));

      // update tags
      if (tags) {
        dispatch(upsertTags(tags));
      }

      return playlist;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update playlist");
    }
  }
);

// -----------------------------------------------------
// DELETE PLAYLIST
// -----------------------------------------------------
export const deletePlaylistNormalized = createAsyncThunk(
  "playlists/deletePlaylistNormalized",
  async (playlistId, { dispatch, rejectWithValue }) => {
    try {
      await playlistApi.delete(playlistId);

      dispatch(removePlaylist(playlistId));

      return playlistId;
    } catch (err) {
      console.error("DELETE PLAYLIST ERROR:", err.response?.data || err);
      return rejectWithValue(err.response?.data || "Failed to delete playlist");
    }
  }
);

// -----------------------------------------------------
// REORDER PLAYLIST
// -----------------------------------------------------
export const reorderPlaylistVideos = createAsyncThunk(
  "playlists/reorderPlaylistVideos",
  async ({ playlistId, videoIds }, { dispatch, getState, rejectWithValue }) => {
    try {
      await playlistApi.reorder(playlistId, { videoIds });

      // Optimistic update 1: playlistVideosEntities
      dispatch(updatePositions({ playlistId, videoIds }));

      // Optimistic update 2: update playlist.videoIds itself
      const playlist = getState().playlistsEntities.byId[playlistId];

      dispatch(
        upsertPlaylist({
          ...playlist,
          videoIds, // <--- NEW SORTED ORDER
        })
      );

      return videoIds;
    } catch (err) {
      return rejectWithValue(err || "Failed to reorder videos");
    }
  }
);

// -----------------------------------------------------
// UPDATE PLAYLIST COVER IMAGE
// -----------------------------------------------------
export const updatePlaylistImageNormalized = createAsyncThunk(
  "playlists/updatePlaylistImage",
  async ({ playlistId, image }, { dispatch, rejectWithValue }) => {
    try {
      const res = await playlistApi.updateImage(playlistId, { image });

      // Store update only changes playlist.image
      dispatch(
        upsertPlaylist({
          id: playlistId,
          image,
        })
      );

      return { playlistId, image };
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to update playlist image"
      );
    }
  }
);

export const incrementPlaylistView = createAsyncThunk(
  "playlists/incrementView",
  async (playlistId, { dispatch, rejectWithValue }) => {
    try {
      await playlistApi.incrementView(playlistId);

      // Increment locally
      // dispatch(
      //   upsertPlaylist({
      //     id: playlistId,
      //     viewsDelta: 1, // handled by reducer merge
      //   })
      // );

      return playlistId;
    } catch (err) {
      return rejectWithValue("Failed to record view");
    }
  }
);

export const togglePlaylistLikeNormalized = createAsyncThunk(
  "playlists/toggleLike",
  async (playlistId, { dispatch, getState, rejectWithValue }) => {
    try {
      const res = await playlistApi.toggleLike(playlistId);

      const { liked } = res.data;

      const playlist = getState().playlistsEntities.byId[playlistId];

      const newLikes = liked ? playlist.likes + 1 : playlist.likes - 1;

      dispatch(
        upsertPlaylist({
          id: playlistId,
          likes: newLikes,
          likedByUser: liked,
        })
      );

      return { playlistId, liked };
    } catch (err) {
      return rejectWithValue("Failed to like playlist");
    }
  }
);

export const incrementPlaylistShare = createAsyncThunk(
  "playlists/incrementShare",
  async (playlistId, { dispatch, getState, rejectWithValue }) => {
    try {
      await playlistApi.incrementShare(playlistId);

      const playlist = getState().playlistsEntities.byId[playlistId];

      dispatch(
        upsertPlaylist({
          id: playlistId,
          shares: playlist.shares + 1,
        })
      );

      return playlistId;
    } catch (err) {
      return rejectWithValue("Failed to record share");
    }
  }
);

// -----------------------------------------------------
// GET PUBLIC PLAYLISTS
// -----------------------------------------------------
export const fetchPublicPlaylists = () => async (dispatch) => {
  const res = await playlistApi.getPublic();
  const raw = res.data;

  raw.forEach((item) => {
    const { playlist, videos, tags, owner, playlistVideos } =
      normalizePlaylistResponse(item);

    dispatch(upsertPlaylist(playlist));
    dispatch(upsertVideos(videos));
    dispatch(upsertTags(tags));
    dispatch(upsertUser(owner));
    dispatch(upsertPlaylistVideos(playlistVideos));
  });
};
