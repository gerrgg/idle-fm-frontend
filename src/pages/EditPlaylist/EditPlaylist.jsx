import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getPlaylistById } from "../../store/playlistSlice";
import { clearYoutubeResults } from "../../store/youtubeSlice";
import EditPlaylistDetails from "../../features/playlists/EditPlaylistDetails";
import AddVideoPanel from "../../features/playlists/AddVideoPanel/AddVideoPanel";
import { Col } from "../../styles/layout";

export default function EditPlaylist() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlist = useSelector((s) => s.playlists.current);
  const [searchTags, setSearchTags] = useState([]);

  useEffect(() => {
    dispatch(getPlaylistById(id));
  }, [id]);

  useEffect(() => {
    if (playlist) {
      const tagNames = (playlist.tags || []).map((t) => t.name);
      setSearchTags(tagNames);
    }
  }, [playlist]);

  useEffect(() => {
    if (searchTags.length === 0) {
      dispatch(clearYoutubeResults());
    }
  }, [searchTags]);

  if (!playlist) return <p>Loading…</p>;

  return (
    <Col gap="lg">
      <EditPlaylistDetails playlist={playlist} onTagsChange={setSearchTags} />
      <AddVideoPanel playlistId={playlist.id} searchTags={searchTags} />
    </Col>
  );
}
