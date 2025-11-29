import { useSelector } from "react-redux";
import {
  PanelWrapper,
  VideoItem,
  VideoThumb,
  VideoInfo,
  VideoTitle,
  VideoChannel,
  PlaylistActions,
} from "./PlaylistVideosPanel.styles";

import PlayButton from "../../../components/PlayButton/PlayButton";

export default function PlaylistVideosPanel({ handlePlay, videos }) {
  if (videos.length === 0) return null;

  return (
    <PanelWrapper>
      <PlaylistActions my="lg" gap="md">
        <PlayButton handlePlay={handlePlay} size="lg" />
      </PlaylistActions>
      {videos.map((v) => {
        const thumb =
          v.thumbnails?.medium?.url || v.thumbnails?.default?.url || "";

        return (
          <VideoItem key={v.youtube_key}>
            <VideoThumb src={thumb} alt={v.title} />
            <VideoInfo>
              <VideoTitle>{v.title}</VideoTitle>
              {v.channel_title && (
                <VideoChannel>{v.channel_title}</VideoChannel>
              )}
            </VideoInfo>
          </VideoItem>
        );
      })}
    </PanelWrapper>
  );
}
