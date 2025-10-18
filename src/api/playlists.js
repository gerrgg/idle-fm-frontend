import { request } from "./index.js";

export const playlistsApi = {
  getVideos: (id) => request(`/playlists/${id}/videos`),
  create: (data) =>
    request("/playlists", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/playlists/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  getById: (id) => request(`/playlists/${id}`),
  delete: (id) => request(`/playlists/${id}`, { method: "DELETE" }),
  addVideo: (id, data) =>
    request(`/playlists/${id}/videos`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  removeVideo: (id, videoId) =>
    request(`/playlists/${id}/videos/${videoId}`, { method: "DELETE" }),
};
