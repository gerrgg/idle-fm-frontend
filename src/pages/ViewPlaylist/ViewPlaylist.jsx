import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { useEffect } from "react";

import { Col } from "../../styles/layout";
import EditPlaylistDetails from "../../features/playlists/EditPlaylistDetails";
import PlaylistVideosPanel from "../../features/playlists/PlaylistVideosPanel";

import { selectMergedVideosForPlaylist } from "../../store/selectors/playlistsSelectors";
import {
  fetchPlaylistByIdNormalized,
  incrementPlaylistView,
} from "../../store/playlistThunksNormalized";

import { setQueue, setPlayState } from "../../store/playerSlice";
import PlaylistStatsBar from "../../components/PlaylistStatsBar";

export default function ViewPlaylist() {
  const { id } = useParams();
  const playlistId = Number(id);
  const dispatch = useDispatch();

  const playlist = useSelector((s) => s.playlistsEntities.byId[playlistId]);
  const videos = useSelector(selectMergedVideosForPlaylist(playlistId));
  const user = useSelector((s) => s.auth.user);

  const player = useSelector((s) => s.player);
  const isPlaying = player.isPlaying && player.sourcePlaylistId === playlistId;
  const queueIndex = useSelector((s) => s.player.queueIndex);

  // Fetch playlist + increment views
  useEffect(() => {
    dispatch(fetchPlaylistByIdNormalized(playlistId));
  }, [playlistId]);

  // --- SAFE METADATA (playlist may be undefined initially) ---
  const title = playlist ? `${playlist.title} — Idle.fm` : "Playlist — Idle.fm";

  const description = playlist?.description
    ? playlist.description
    : "Listen to this playlist on Idle.fm — where your taste actually matters.";

  const image = playlist?.image || "https://idle.fm/default-playlist-og.png";

  const url = `https://idle.fm/playlist/${playlistId}`;

  // 🔥 Always call the hook at the top level, never inside useEffect.
  useDocumentMeta({ title, description, image, url });

  // --- Early loading state ---
  if (!playlist) return <p>Loading…</p>;

  // Redirect owners to edit page
  if (user && playlist.owner_id === user.id) {
    return <Navigate to={`/playlist/${playlistId}/edit`} replace />;
  }

  const handlePlay = () => {
    if (!playlist) return;

    if (!isPlaying) {
      dispatch(
        setQueue({
          videoIds: playlist.videoIds,
          sourcePlaylistId: playlist.id,
        })
      );
      dispatch(incrementPlaylistView(playlist.id));
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

  return (
    <Col gap="lg">
      <EditPlaylistDetails playlist={playlist} tags={[]} readOnly={true} />

      <PlaylistVideosPanel
        handlePlay={handlePlay}
        handlePlayTrack={handlePlayTrack}
        videos={videos}
        playlistId={playlistId}
        playlist={playlist}
        readOnly={true}
      />
    </Col>
  );
}
