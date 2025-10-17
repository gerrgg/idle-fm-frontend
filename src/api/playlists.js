import { request } from "./index.js";

export const playlistsApi = {
  getVideos: (id) => request(`/playlists/${id}/videos`),
};
