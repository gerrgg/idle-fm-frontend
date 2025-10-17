import { request } from "./index.js";

export const playlistsApi = {
  getVideos: (id) => request(`/playlists/${id}/videos`),
  create: (data) =>
    request("/playlists", { method: "POST", body: JSON.stringify(data) }),
};
