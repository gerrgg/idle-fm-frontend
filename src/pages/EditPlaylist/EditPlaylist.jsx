import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { clearYoutubeResults } from "../../store/youtubeSlice";
import EditPlaylistDetails from "../../features/playlists/EditPlaylistDetails";
import AddVideoPanel from "../../features/playlists/AddVideoPanel/AddVideoPanel";
import { Col, Row } from "../../styles/layout";
import DangerZone from "../../components/DangerZone";
import PlaylistVideosPanel from "../../features/playlists/PlaylistVideosPanel";
import { fetchPlaylistByIdNormalized } from "../../store/playlistThunksNormalized";

export default function EditPlaylist() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlistId = Number(id);

  const playlist = useSelector((s) => s.playlistsEntities.byId[playlistId]);

  const videos = useSelector((s) =>
    (playlist?.videoIds || []).map((id) => s.videosEntities.byId[id])
  );

  const tags = useSelector((s) => {
    if (!playlist?.tagIds) return [];

    return playlist.tagIds.map((id) => s.tagsEntities.byId[id]).filter(Boolean);
  });

  const [searchTags, setSearchTags] = useState([]);

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

  if (!playlist) return <p>Loading…</p>;

  return (
    <Col gap="lg">
      <EditPlaylistDetails
        playlist={playlist}
        tags={tags}
        onTagsChange={setSearchTags}
      />
      <Row gap="lg">
        <AddVideoPanel playlist={playlist} searchTags={searchTags} />
        <PlaylistVideosPanel videos={videos} />
      </Row>
      <DangerZone playlist={playlist} />
    </Col>
  );
}
