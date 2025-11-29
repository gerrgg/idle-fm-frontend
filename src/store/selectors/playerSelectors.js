export const selectCurrentVideo = (state) => {
  const { queue, queueIndex } = state.player;
  const item = queue[queueIndex];

  if (!item) return null;

  // if (item.type === "preview") {
  //   return {
  //     youtube_key: item.youtube_key,
  //     title: item.title ?? "",
  //     thumbnails: item.thumbnails ?? null,
  //     isPreview: true,
  //   };
  // }

  if (item.type === "playlist") {
    return state.videosEntities.byId[item.videoId] || null;
  }

  return item;
};
