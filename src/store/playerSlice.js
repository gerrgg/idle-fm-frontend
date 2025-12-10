import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  volume: 0.5,
  queue: [],
  queueIndex: 0,
  currentSeconds: 0,
  durationSeconds: 0,
  sourcePlaylistId: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setQueue(state, action) {
      const { videoIds, sourcePlaylistId, queueIndex } = action.payload;

      state.queue = videoIds.map((id) => ({
        type: "playlist",
        videoId: id,
      }));

      state.queueIndex = queueIndex ?? 0;
      state.isPlaying = true;
      state.sourcePlaylistId = sourcePlaylistId ?? null;
    },

    addToQueue(state, action) {
      state.queue.push(action.payload);
    },

    playSingle(state, action) {
      state.queue = [action.payload];
      state.queueIndex = 0;
      state.isPlaying = true;
    },

    nextTrack(state) {
      if (state.queueIndex < state.queue.length - 1) {
        state.queueIndex += 1;
        state.currentSeconds = 0;
      } else {
        state.isPlaying = false;
      }
    },

    prevTrack(state) {
      if (state.queueIndex > 0) {
        state.queueIndex -= 1;
        state.currentSeconds = 0;
      }
    },

    setPlaying(state, action) {
      state.isPlaying = action.payload;
    },

    setVolume(state, action) {
      state.volume = action.payload;
    },

    setCurrentSeconds(state, action) {
      state.currentSeconds = action.payload;
    },

    setPlayState(state, action) {
      state.isPlaying = action.payload;
    },
    playYoutubeSearchPreview(state, action) {
      const { youtube_key, title, thumbnail } = action.payload;

      state.queue = [
        {
          type: "preview",
          youtube_key,
          title,
          thumbnail,
        },
      ];

      state.queueIndex = 0;
      state.isPlaying = true;
      state.sourcePlaylistId = null;
    },
  },
});

// ⬇⬇⬇ EXPORT ACTIONS HERE ⬇⬇⬇
export const {
  setQueue,
  addToQueue,
  playSingle,
  nextTrack,
  prevTrack,
  setPlaying,
  setVolume,
  setCurrentSeconds,
  setPlayState,
  playYoutubeSearchPreview,
} = playerSlice.actions;

// ⬇⬇⬇ EXPORT REDUCER ⬇⬇⬇
export default playerSlice.reducer;
