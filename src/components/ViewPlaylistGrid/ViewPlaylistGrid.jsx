import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  Card,
  Count,
  Grid,
  Thumbnail,
  Title,
  Wrap,
  CardInfo,
  IconButtonCircle,
  CardInfoHoverWrapper,
  EqualizerWrapper,
  Username,
  CardLink,
} from "./ViewPlaylistGrid.styles";

import { Row } from "../../styles/layout.js";

import VideoThumbnail from "../VideoThumbnail/VideoThumbnail";
import { selectMyPlaylists } from "../../store/selectors/playlistsSelectors.js";
import { setQueue } from "../../store/playerSlice.js";
import { capitalize } from "../../utils/capitalize.js";

const PlayButton = ({ playlist, isPlaying }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setQueue({
        videoIds: playlist.videoIds,
        sourcePlaylistId: playlist.id,
      })
    );
  };

  return (
    <IconButtonCircle onClick={handleClick}>
      {isPlaying ? (
        // PAUSE ICON
        <svg width="22" height="22" viewBox="0 0 24 24">
          <rect x="6" y="5" width="4" height="14" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" fill="currentColor" />
        </svg>
      ) : (
        // PLAY ICON
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      )}
    </IconButtonCircle>
  );
};

export default function ViewPlaylistGrid({ playlists }) {
  const { isPlaying, sourcePlaylistId } = useSelector((state) => state.player);

  return (
    <Grid>
      {playlists.map((p) => (
        <Card key={p.id}>
          <CardLink to={`playlist/${p.id}`}>
            <VideoThumbnail glowsrc={p.image} variant="grid" image={p.image} />

            <CardInfo>
              <Title>{p.title}</Title>

              <Row gap="md">
                <Username>{capitalize(p.owner_username)}</Username>
                <Count>{p.videoIds?.length ?? 0} videos</Count>
              </Row>
            </CardInfo>
          </CardLink>
          <CardInfoHoverWrapper>
            <PlayButton
              playlist={p}
              isPlaying={isPlaying && p.id === sourcePlaylistId}
            />

            {isPlaying && p.id === sourcePlaylistId && (
              <EqualizerWrapper isPlaying />
            )}
          </CardInfoHoverWrapper>
        </Card>
      ))}
    </Grid>
  );
}
