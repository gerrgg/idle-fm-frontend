// src/api/playlistApi.js
import http from "./http";

const playlistApi = {
  // POST /playlists
  create(data) {
    return http.post("/playlists", data);
  },

  // GET /playlists/:id
  getById(id) {
    return http.get(`/playlists/${id}`);
  },

  // PUT /playlists/:id
  update(id, data) {
    return http.put(`/playlists/${id}`, data);
  },

  // DELETE /playlists/:id
  delete(id) {
    return http.delete(`/playlists/${id}`);
  },

  // GET /playlists/:id/videos
  getVideos(id) {
    return http.get(`/playlists/${id}/videos`);
  },

  // POST /playlists/:id/videos
  addVideo(playlistId, data) {
    return http.post(`/playlists/${playlistId}/videos`, data);
  },

  // DELETE /playlists/:playlistId/videos/:videoId
  removeVideo(id, videoId) {
    return http.delete(`/playlists/${id}/videos/${videoId}`);
  },

  getUserPlaylists(userId) {
    return http.get(`/users/${userId}/playlists`);
  },
  reorder(playlistId, body) {
    return http.put(`/playlists/${playlistId}/reorder`, body);
  },
  updateImage(id, data) {
    return http.put(`/playlists/${id}/image`, data);
  },
};

export default playlistApi;
