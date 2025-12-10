import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";

import {
  Wrapper,
  LogoText,
  LogoWrapper,
  SidebarItem,
  SidebarList,
  SidebarStack,
  SidebarThumbnail,
} from "./Sidebar.styles.jsx";
import { Row, Stack, Col } from "../../styles/layout.js";
import { Logo } from "../Logo/index.js";
import { Button } from "../../styles/button.js";
import { selectMyPlaylists } from "../../store/selectors/playlistsSelectors.js";
import VideoThumbnail from "../VideoThumbnail/VideoThumbnail";

import { createPlaylistNormalized } from "../../store/playlistThunksNormalized.js";

function SidebarButton({ handleCreate, handleLogin }) {
  const user = useSelector((s) => s.auth.user);

  if (!user) {
    return (
      <Button size="lg" variant="solid" onClick={handleLogin}>
        Login
      </Button>
    );
  }

  return (
    <Button size="lg" variant="outline" onClick={handleCreate}>
      Create
    </Button>
  );
}

export default function Sidebar() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myPlaylists = useSelector(selectMyPlaylists);
  const playlistId = Number(id);

  async function handleCreate() {
    const result = await dispatch(
      createPlaylistNormalized({ title: "New Playlist" })
    );

    if (result.meta.requestStatus === "fulfilled") {
      const playlist = result.payload;
      navigate(`/playlist/${playlist.id}/edit`);
    }
  }

  const handleLogin = () => navigate("/login");

  return (
    <Wrapper>
      <LogoWrapper gap="xs" align="flex-end" onClick={() => navigate("/")}>
        <Logo width="36" height="36" />
        <LogoText>idle.fm</LogoText>
      </LogoWrapper>
      <SidebarStack gap="md" my="xl">
        <SidebarButton handleCreate={handleCreate} handleLogin={handleLogin} />
        <SidebarList my="xl" gap="xs">
          {myPlaylists.map((playlist) => {
            return (
              <SidebarItem
                key={playlist.id}
                onClick={() => {
                  navigate(`/playlist/${playlist.id}/edit`);
                }}
                className={
                  playlistId && playlistId === playlist.id ? "active" : null
                }
              >
                <SidebarThumbnail variant={"sidebar"} image={playlist.image} />
                {playlist.title}
              </SidebarItem>
            );
          })}
        </SidebarList>
      </SidebarStack>
    </Wrapper>
  );
}
