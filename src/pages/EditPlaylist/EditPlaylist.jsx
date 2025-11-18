import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  getPlaylistById,
  deletePlaylist,
  fetchUserPlaylists,
} from "../../store/playlistSlice";
import { clearYoutubeResults } from "../../store/youtubeSlice";
import EditPlaylistDetails from "../../features/playlists/EditPlaylistDetails";
import AddVideoPanel from "../../features/playlists/AddVideoPanel/AddVideoPanel";
import { Col } from "../../styles/layout";
import { Button } from "../../styles/button.js";

export default function EditPlaylist() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playlist = useSelector((s) => s.playlists.current);
  const [searchTags, setSearchTags] = useState([]);
  const { user } = useSelector((s) => s.auth);

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

  const handleDelete = async () => {
    if (!playlist) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this playlist?"
    );

    if (!confirmed) return;

    dispatch(deletePlaylist(id));
    navigate("/");
  };

  if (!playlist) return <p>Loading…</p>;

  return (
    <Col gap="lg">
      <EditPlaylistDetails playlist={playlist} onTagsChange={setSearchTags} />
      <AddVideoPanel playlistId={playlist.id} searchTags={searchTags} />
      {playlist.user}

      <Button variant="danger" onClick={handleDelete}>
        Delete Playlist
      </Button>
    </Col>
  );
}
