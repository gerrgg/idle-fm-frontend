import * as S from "./PlaylistSelector.styles";

const PlaylistSelector = ({
  selectedPlaylistId,
  setSelectedPlaylistId,
  playlists,
}) => {
  return (
    <S.PlaylistSelectorWrapper className="playlist-selector">
      <S.PlaylistSelectorLabel htmlFor="playlist-select">
        Select Playlist:
      </S.PlaylistSelectorLabel>
      <S.PlaylistSelectorSelect
        id="playlist-select"
        value={selectedPlaylistId || ""}
        onChange={(e) => setSelectedPlaylistId(e.target.value)}
      >
        <S.PlaylistSelectorOption value="" disabled>
          Select a playlist
        </S.PlaylistSelectorOption>
        {playlists.map((pl) => (
          <S.PlaylistSelectorOption key={pl.id} value={pl.id}>
            {pl.title}
          </S.PlaylistSelectorOption>
        ))}
      </S.PlaylistSelectorSelect>
    </S.PlaylistSelectorWrapper>
  );
};

export default PlaylistSelector;
