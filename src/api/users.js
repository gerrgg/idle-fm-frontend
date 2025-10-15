// src/api/users.js
import { request } from "./index.js";

export const usersApi = {
  getAll: () => request("/users"),
  getById: (id) => request(`/users/${id}`),
  create: (payload) =>
    request("/users", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  delete: (id) => request(`/users/${id}`, { method: "DELETE" }),
  update: (id, payload) =>
    request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};
