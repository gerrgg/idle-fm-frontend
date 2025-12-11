import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";

import {
  Wrapper,
  LogoText,
  ButtonWrapper,
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
import CollapseIcon from "./CollapseIcon.jsx";

import { createPlaylistNormalized } from "../../store/playlistThunksNormalized.js";

function SidebarButton({ handleCreate, handleLogin }) {
  return (
    <Button size="lg" variant="outline" onClick={handleLogin}>
      Create
    </Button>
  );
}

export default function Sidebar({ collapse, setCollapse }) {
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
    <Wrapper className={collapse ? "collapse" : ""}>
      <Row className="logo-collapse-wrapper" justify="space-between">
        <ButtonWrapper onClick={() => navigate("/")} className="logo-wrapper">
          <Logo width="32" height="32" />
        </ButtonWrapper>
        <ButtonWrapper
          onClick={() => setCollapse(!collapse)}
          className="collapse-wrapper"
        >
          <CollapseIcon width="32" height="32" collapse={collapse} />
        </ButtonWrapper>
      </Row>
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
