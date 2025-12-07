// src/store/playlistVideosThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import playlistApi from "../api/playlistApi";
import { upsertVideo } from "./entities/videosSlice";
import { upsertPlaylist } from "./entities/playlistsSlice";
import { upsertPlaylistVideos } from "./entities/playlistVideosSlice";

export const addVideoToPlaylistNormalized = createAsyncThunk(
  "playlistVideos/addVideoToPlaylistNormalized",
  async (
    { playlistId, youtube_key, title },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const res = await playlistApi.addVideo(playlistId, {
        youtube_key,
        video_title: title,
      });

      const v = res.data;

      // 1. Store video in global Videos slice
      dispatch(upsertVideo(v));

      // 2. Store playlist-local metadata
      dispatch(
        upsertPlaylistVideos([
          {
            playlistId,
            videoId: v.id,
            added_at: v.added_at,
            position: v.position,
          },
        ])
      );

      // 3. Append videoId into playlist.videoIds
      const playlist = getState().playlistsEntities.byId[playlistId];

      dispatch(
        upsertPlaylist({
          ...playlist,
          videoIds: [...playlist.videoIds, v.id],
        })
      );

      return { playlistId, videoId: v.id };
    } catch (err) {
      console.error("Failed to add video to playlist:", err);
      return rejectWithValue(err.response?.data || "Failed to add video");
    }
  }
);
