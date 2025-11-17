import http from "./http";

export const youtubeApi = {
  search(query) {
    return http.get(`/youtube/search?q=${encodeURIComponent(query)}`);
  },
};
