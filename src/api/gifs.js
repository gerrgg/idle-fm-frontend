import { request } from "./index.js";

export const gifsApi = {
  getGifs: () => request(`/gifs`),
};
