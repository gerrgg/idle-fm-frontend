import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../store/dashboardSlice";
import { useNavigate } from "react-router-dom";

import { Wrapper, LogoText, LogoWrapper } from "./Sidebar.styles.jsx";
import { Row, Stack, Col } from "../../styles/layout.js";
import { Logo } from "../Logo/index.js";
import { Button } from "../../styles/button.js";
import { selectMyPlaylists } from "../../store/selectors/playlistsSelectors.js";

import { createPlaylistNormalized } from "../../store/playlistThunksNormalized.js";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myPlaylists = useSelector(selectMyPlaylists);

  async function handleCreate() {
    const result = await dispatch(
      createPlaylistNormalized({ title: "New Playlist" })
    );

    if (result.meta.requestStatus === "fulfilled") {
      const playlist = result.payload;
      navigate(`/playlists/${playlist.id}/edit`);
    }
  }

  return (
    <Wrapper>
      <LogoWrapper gap="xs" align="flex-end" onClick={() => navigate("/")}>
        <Logo width="36" height="36" />
        <LogoText>idle.fm</LogoText>
      </LogoWrapper>
      <Stack gap="md" my="xl">
        <Button size="lg" variant="outline" onClick={handleCreate}>
          Create
        </Button>
        <Col my="xl" gap="xs">
          {myPlaylists.map((playlist) => (
            <Button
              key={playlist.id}
              size="md"
              variant="sidebarItem"
              onClick={() => {
                navigate(`/playlists/${playlist.id}/edit`);
              }}
            >
              {playlist.title}
            </Button>
          ))}
        </Col>
      </Stack>
    </Wrapper>
  );
}
