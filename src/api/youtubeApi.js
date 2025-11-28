// src/api/youtubeApi.js
import http from "./http";

const youtubeApi = {
  async search(query, signal) {
    const res = await http.get("/youtube/search", {
      params: { q: query },
      signal,
    });

    // IMPORTANT: only return serializable data
    return res.data;
  },
};

export default youtubeApi;
