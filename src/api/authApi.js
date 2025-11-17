// src/api/authApi.js
import http from "./http";

// All authentication-related requests
const authApi = {
  login(email, password) {
    return http.post("/auth/login", { email, password });
  },

  me() {
    return http.get("/auth/me");
  },

  logout() {
    return http.post("/auth/logout");
  },
};

export default authApi;
