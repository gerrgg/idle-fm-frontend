import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Col } from "../../styles/layout";

import EditPlaylistDetails from "../../features/playlists/EditPlaylistDetails";
import PlaylistVideosPanel from "../../features/playlists/PlaylistVideosPanel";
import { selectMergedVideosForPlaylist } from "../../store/selectors/playlistsSelectors";
import { fetchPlaylistByIdNormalized } from "../../store/playlistThunksNormalized";
import { setQueue, setPlayState } from "../../store/playerSlice";

export default function ViewPlaylist() {
  const { id } = useParams();
  const playlistId = Number(id);
  const dispatch = useDispatch();

  const playlist = useSelector((s) => s.playlistsEntities.byId[playlistId]);
  const videos = useSelector(selectMergedVideosForPlaylist(playlistId));

  const isPlaying = useSelector((s) => s.player.isPlaying);
  const queueIndex = useSelector((s) => s.player.queueIndex);

  useEffect(() => {
    dispatch(fetchPlaylistByIdNormalized(playlistId));
  }, [playlistId]);

  const handlePlay = () => {
    if (!playlist) return;

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

  if (!playlist) return <p>Loading…</p>;

  return (
    <Col gap="lg">
      <EditPlaylistDetails playlist={playlist} tags={[]} readOnly={true} />

      <PlaylistVideosPanel
        handlePlay={handlePlay}
        handlePlayTrack={handlePlayTrack}
        videos={videos}
        playlistId={playlistId}
        readOnly={true}
      />
    </Col>
  );
}
