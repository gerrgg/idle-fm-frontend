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
