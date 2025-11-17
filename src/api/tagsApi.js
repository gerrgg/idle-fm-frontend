// src/api/tagsApi.js
import http from "./http";

const tagsApi = {
  getAll() {
    return http.get("/tags");
  },

  // optional future additions:
  create(name) {
    return http.post("/tags", { name });
  },

  delete(id) {
    return http.delete(`/tags/${id}`);
  },
};

export default tagsApi;
