export function normalizePlaylistResponse(item) {
  const playlist = item.playlist || item || {};
  const videos = Array.isArray(item.videos) ? item.videos : [];
  const tags = Array.isArray(item.tags) ? item.tags : [];

  return {
    playlist: {
      ...playlist,

      // Only build videoIds when videos exist
      videoIds:
        Array.isArray(playlist.videoIds) && playlist.videoIds.length > 0
          ? playlist.videoIds
          : videos.length > 0
          ? videos.map((v) => v.id)
          : playlist.videoIds || [],

      // Only build tagIds when tags exist
      tagIds:
        Array.isArray(playlist.tagIds) && playlist.tagIds.length > 0
          ? playlist.tagIds
          : tags.length > 0
          ? tags.map((t) => t.id)
          : playlist.tagIds || [],
    },

    // full objects (only populated on fetch/create)
    videos,
    tags,
  };
}
