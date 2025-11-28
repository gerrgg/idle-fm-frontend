// src/store/playlistVideosThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import playlistApi from "../api/playlistApi";
import { upsertVideo } from "./entities/videosSlice";
import { upsertPlaylist } from "./entities/playlistsSlice";

export const addVideoToPlaylistNormalized = createAsyncThunk(
  "playlists/addVideoToPlaylistNormalized",
  async (
    { playlistId, youtube_key, title },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const res = await playlistApi.addVideo(playlistId, {
        youtube_key,
        video_title: title,
      });

      const video = res.data;
      const videoId = video.id;

      dispatch(upsertVideo(video));

      const prev = getState().playlistsEntities.byId[playlistId];

      dispatch(
        upsertPlaylist({
          ...prev,
          videoIds: [...prev.videoIds, videoId],
          image: video.playlist_image || prev.image,
        })
      );

      return { playlistId, videoId };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add video");
    }
  }
);
