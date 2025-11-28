// src/store/youtubeThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import youtubeApi from "../api/youtubeApi";

let abortController = null;

export const searchYoutube = createAsyncThunk(
  "youtube/search",
  async (query, { rejectWithValue }) => {
    try {
      // Cancel in-flight search
      if (abortController) abortController.abort();

      abortController = new AbortController();

      const results = await youtubeApi.search(query, abortController.signal);

      return results;
    } catch (err) {
      if (err.name === "CanceledError" || err.name === "AbortError") {
        return rejectWithValue({ cancelled: true });
      }
      console.error("Search failed:", err);
      return rejectWithValue({ error: "search failed" });
    }
  }
);
