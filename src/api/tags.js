import { request } from "./index.js";

export const tagsApi = {
  getTags: () => request(`/tags`),
};
