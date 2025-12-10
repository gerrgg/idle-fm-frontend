export function normalizePlaylistResponse(item) {
  const playlist = item.playlist || item || {};
  const rawVideos = Array.isArray(item.videos) ? item.videos : [];
  const rawTags = Array.isArray(item.tags) ? item.tags : [];

  // -------------------------------------
  // Owner information
  // -------------------------------------
  const owner = {
    id: playlist.owner_id,
    username: playlist.owner_username ?? "Unknown",
  };

  // -------------------------------------
  // Normalize videos
  // Split global video fields vs playlist-local metadata
  // -------------------------------------
  const videoIds = [];
  const globalVideos = [];
  const playlistVideos = []; // playlist-local metadata rows

  rawVideos.forEach((v, index) => {
    if (!v.id) return;

    videoIds.push(v.id);

    // Extract playlist-local fields
    playlistVideos.push({
      playlistId: playlist.id,
      videoId: v.id,
      added_at: v.added_at ?? null,
      position: v.position ?? index,
    });

    // Extract global video data
    const { added_at, position, ...videoGlobal } = v;

    globalVideos.push(videoGlobal);
  });

  // -------------------------------------
  // Normalize tags
  // -------------------------------------
  const tagIds = [];
  rawTags.forEach((t) => {
    if (t.id) tagIds.push(t.id);
  });

  // -------------------------------------
  // Final playlist object
  // -------------------------------------
  return {
    playlist: {
      ...playlist,

      videoIds:
        Array.isArray(playlist.videoIds) && playlist.videoIds.length > 0
          ? playlist.videoIds
          : videoIds,

      tagIds:
        Array.isArray(playlist.tagIds) && playlist.tagIds.length > 0
          ? playlist.tagIds
          : tagIds,

      views: playlist.views ?? 0,
      likes: playlist.likes ?? 0,
      shares: playlist.shares ?? 0,
    },

    videos: globalVideos, // fully normalized global video objects
    playlistVideos, // playlist-local metadata
    tags: rawTags, // tag objects for tagsEntities

    owner,
  };
}
