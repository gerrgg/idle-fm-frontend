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

import { playPlaylist } from "../../store/thunks/playPlaylist";

const PlayButton = ({ playlistId, isPlaying }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(playPlaylist(playlistId));
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
  const playlists = useSelector((s) => s.playlists.items);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const current = useSelector((state) => state.playlists.current);

  return (
    <Wrap>
      <Grid>
        {playlists.map((p) => (
          <Card key={p.id}>
            <Thumbnail src={p.image} />
            <CardInfo>
              <Title>{p.title}</Title>
              <Count>{p.videos?.length ?? 0} videos</Count>
              <CardInfoHoverWrapper>
                <PlayButton
                  playlistId={p.id}
                  isPlaying={isPlaying && p.id === current.id}
                />
                {isPlaying && p.id === current.id && (
                  <EqualizerWrapper isPlaying={isPlaying} />
                )}
              </CardInfoHoverWrapper>
            </CardInfo>
          </Card>
        ))}
      </Grid>
    </Wrap>
  );
}
