// src/store/playlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import playlistApi from "../api/playlistApi";

// ----------------------------------------
// ADD VIDEO TO PLAYLIST
// ----------------------------------------
export const addVideoToPlaylist = createAsyncThunk(
  "playlists/addVideoToPlaylist",
  async ({ playlistId, youtube_key, video_title }, { rejectWithValue }) => {
    try {
      const res = await playlistApi.addVideo(playlistId, {
        youtube_key,
        video_title,
      });
      return { playlistId, video: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add video");
    }
  }
);
