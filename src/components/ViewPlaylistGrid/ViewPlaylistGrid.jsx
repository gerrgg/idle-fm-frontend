import { useSelector, useDispatch } from "react-redux";

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
} from "./ViewPlaylistGrid.styles";
import RadioIcon from "../../features/playlists/EditPlaylistDetails/RadioIcon.jsx";
import { PlaceholderImage } from "../../features/playlists/EditPlaylistDetails/EditPlaylistDetails.styles";

import { selectMyPlaylists } from "../../store/selectors/playlistsSelectors.js";
import { setQueue } from "../../store/playerSlice.js";

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

export default function ViewPlaylistGrid() {
  const playlists = useSelector(selectMyPlaylists);
  const { isPlaying, sourcePlaylistId } = useSelector((state) => state.player);

  return (
    <Grid>
      {playlists.map((p) => (
        <Card key={p.id}>
          {p.image ? (
            <Thumbnail src={p.image} />
          ) : (
            <PlaceholderImage>
              <RadioIcon />
            </PlaceholderImage>
          )}
          <CardInfo>
            <Title>{p.title}</Title>
            <Count>{p.videoIds?.length ?? 0} videos</Count>
            <CardInfoHoverWrapper>
              <PlayButton
                playlist={p}
                isPlaying={isPlaying && p.id === sourcePlaylistId}
              />
              {isPlaying && p.id === sourcePlaylistId && (
                <EqualizerWrapper isPlaying={isPlaying} />
              )}
            </CardInfoHoverWrapper>
          </CardInfo>
        </Card>
      ))}
    </Grid>
  );
}
