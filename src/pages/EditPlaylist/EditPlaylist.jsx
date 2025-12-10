import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

import { clearYoutubeResults } from "../../store/youtubeSlice";
import EditPlaylistDetails from "../../features/playlists/EditPlaylistDetails";
import AddVideoPanel from "../../features/playlists/AddVideoPanel/AddVideoPanel";
import { Col, Row } from "../../styles/layout";
import DangerZone from "../../components/DangerZone";
import PlaylistVideosPanel from "../../features/playlists/PlaylistVideosPanel";
import { ensurePlaylistLoaded } from "../../store/playlistThunksNormalized";
import { selectMergedVideosForPlaylist } from "../../store/selectors/playlistsSelectors";
import { setPlayState, setQueue } from "../../store/playerSlice";
import { fetchPlaylistByIdNormalized } from "../../store/playlistThunksNormalized";

export default function EditPlaylist() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlistId = Number(id);
  const playlist = useSelector((s) => s.playlistsEntities.byId[playlistId]);
  const queueIndex = useSelector((s) => s.player.queueIndex);

  const videos = useSelector(selectMergedVideosForPlaylist(playlistId));

  const tags = useSelector((s) => {
    if (!playlist?.tagIds) return [];

    return playlist.tagIds.map((id) => s.tagsEntities.byId[id]).filter(Boolean);
  });

  const [searchTags, setSearchTags] = useState([]);

  const player = useSelector((s) => s.player);
  const isPlaying = player.isPlaying && player.sourcePlaylistId === playlistId;

  const handlePlay = () => {
    if (!isPlaying) {
      dispatch(
        setQueue({
          videoIds: playlist.videoIds,
          sourcePlaylistId: playlist.id,
        })
      );
    } else {
      dispatch(setPlayState(false));
    }
  };

  const handlePlayTrack = (index) => {
    if (isPlaying && queueIndex === index) {
      dispatch(setPlayState(false));
    } else {
      dispatch(
        setQueue({
          videoIds: playlist.videoIds,
          sourcePlaylistId: playlist.id,
          queueIndex: index,
        })
      );
    }
  };

  // Load playlist on mount
  useEffect(() => {
    dispatch(fetchPlaylistByIdNormalized(playlistId));
  }, [playlistId]);

  // When switching to a different playlist, set initial searchTags
  useEffect(() => {
    if (tags.length > 0) {
      setSearchTags(tags.map((t) => t.name));
    }
  }, [playlistId, tags.length]);

  useEffect(() => {
    if (searchTags.length === 0) {
      dispatch(clearYoutubeResults());
    }
  }, [searchTags]);

  // --- SAFE METADATA (playlist may be undefined initially) ---
  const title = playlist
    ? `Edit ${playlist.title} — Idle.fm`
    : "Playlist — Idle.fm";

  const description = playlist?.description
    ? playlist.description
    : "Listen to this playlist on Idle.fm — where your taste actually matters.";

  const image = playlist?.image || "https://idle.fm/default-playlist-og.png";

  const url = `https://idle.fm/playlist/${playlistId}`;

  // 🔥 Always call the hook at the top level, never inside useEffect.
  useDocumentMeta({ title, description, image, url });

  if (!playlist) return <p>Loading…</p>;

  return (
    <Col gap="lg">
      <EditPlaylistDetails
        playlist={playlist}
        tags={tags}
        onTagsChange={setSearchTags}
      />
      <Col gap="lg">
        <PlaylistVideosPanel
          handlePlay={handlePlay}
          handlePlayTrack={handlePlayTrack}
          videos={videos}
          playlistId={playlistId}
          playlist={playlist}
        />
        <AddVideoPanel
          handlePlay={handlePlay}
          playlist={playlist}
          searchTags={searchTags}
        />
      </Col>
      <DangerZone playlist={playlist} />
    </Col>
  );
}
