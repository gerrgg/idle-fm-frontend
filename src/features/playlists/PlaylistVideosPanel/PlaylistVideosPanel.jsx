import { useSelector } from "react-redux";
import {
  PanelWrapper,
  VideoItem,
  VideoThumb,
  VideoInfo,
  VideoTitle,
  VideoChannel,
} from "./PlaylistVideosPanel.styles";

export default function PlaylistVideosPanel({ videos }) {
  if (videos.length === 0) return null;

  return (
    <PanelWrapper>
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
