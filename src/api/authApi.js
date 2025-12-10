// src/api/authApi.js
import { requestPasswordReset } from "../store/authSlice";
import http from "./http";

// All authentication-related requests
const authApi = {
  login(email, password) {
    return http.post("/auth/login", { email, password });
  },

  register(data) {
    return http.post("/users", data);
  },

  me() {
    return http.get("/auth/me");
  },

  logout() {
    return http.post("/auth/logout");
  },

  requestPasswordReset(email) {
    return http.post("/auth/request-password-reset", { email });
  },

  validateResetToken(token) {
    return http.get("/auth/validate-reset-token", {
      params: { token },
    });
  },

  resetPassword(token, password) {
    return http.post("/auth/reset-password", { token, password });
  },
};

export default authApi;
