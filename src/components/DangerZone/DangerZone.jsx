import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePlaylistNormalized,
  updatePlaylistNormalized,
} from "../../store/playlistThunksNormalized.js";
import {
  DangerHeader,
  Wrapper,
  DangerRow,
  ActionButton,
  VisibilityText,
} from "./DangerZone.styles.jsx";
import { H2, Text } from "../../styles/typography";

export default function DangerZone({ playlist }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!playlist) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this playlist?"
    );

    if (!confirmed) return;

    dispatch(deletePlaylistNormalized(playlist.id));
    navigate("/");
  };

  const handleChangeVisibility = async () => {
    if (!playlist) return;

    const updatedPlaylist = {
      ...playlist,
      is_public: !playlist.is_public,
    };

    dispatch(
      updatePlaylistNormalized({ id: playlist.id, data: updatedPlaylist })
    );
  };

  if (!playlist) return <p>Loading…</p>;

  return (
    <Wrapper my="md">
      <DangerHeader my="xl" px="xl">
        Danger Zone
      </DangerHeader>
      <DangerRow>
        <div>
          <H2>Change playlist visibility</H2>
          <Text>
            This repository is currently
            <VisibilityText>
              {playlist.is_public ? " public" : " private"}
            </VisibilityText>
            . You can change its visibility to public or private at any time.
            Public playlists are visible to everyone, while private playlists
            are only visible to you.
          </Text>
        </div>
        <ActionButton variant="danger" onClick={handleChangeVisibility}>
          Change Visibility
        </ActionButton>
      </DangerRow>
      <DangerRow>
        <div>
          <H2>Delete playlist</H2>
          <Text>
            Once you delete a playlist, there is no going back. Please be
            certain.
          </Text>
        </div>
        <ActionButton variant="danger" onClick={handleDelete}>
          Delete Playlist
        </ActionButton>
      </DangerRow>
    </Wrapper>
  );
}
