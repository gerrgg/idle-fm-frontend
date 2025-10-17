// src/api/auth.js
import { request } from "./index.js";

export const authApi = {
  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () => request("/auth/logout", { method: "POST" }),

  me: () => request("/auth/me"),

  forgotPassword: (email) =>
    request("/auth/request-password-reset", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  validateResetToken: (token) =>
    request(`/auth/validate-reset-token?token=${token}`),

  resetPassword: (token, password) =>
    request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    }),
};
