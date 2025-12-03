import { useSelector } from "react-redux";
import {
  PanelWrapper,
  VideoItem,
  VideoThumb,
  VideoInfo,
  VideoTitle,
  VideoChannel,
  PlaylistActions,
  PlaylistTable,
  PlaylistTableHeader,
  PlaylistTableRow,
  PlaylistTableBody,
  DateWrapper,
} from "./PlaylistVideosPanel.styles";

import { Row } from "../../../styles/layout";

import PlayButton from "../../../components/PlayButton/PlayButton";

import dateFormat from "../../../utils/dateFormat";
import { formatYouTubeDurationToTimeString } from "../../../utils/time";

export default function PlaylistVideosPanel({ handlePlay, videos }) {
  if (videos.length === 0) return null;

  return (
    <PanelWrapper>
      <PlaylistActions my="lg" gap="md" px="lg">
        <PlayButton handlePlay={handlePlay} size="lg" />
      </PlaylistActions>
      <PlaylistTable>
        <PlaylistTableHeader>
          <PlaylistTableRow>
            <th>#</th>
            <th>Title</th>
            <th>Channel</th>
            <th>Date Added</th>
            <th>Duration</th>
          </PlaylistTableRow>
        </PlaylistTableHeader>
        <PlaylistTableBody>
          {videos.map((v, index) => {
            const thumb =
              v.thumbnails?.medium?.url || v.thumbnails?.default?.url || "";

            const date = dateFormat(v.added_at);
            const duration = v.duration
              ? formatYouTubeDurationToTimeString(v.duration)
              : "TBD";

            return (
              <PlaylistTableRow key={v.youtube_key}>
                <td>{v.position + 1}</td>
                <td>
                  <Row gap="md" align="center">
                    <VideoThumb src={thumb} alt={v.title} />
                    <VideoTitle>{v.title}</VideoTitle>
                  </Row>
                </td>
                <td>
                  <VideoChannel>{v.channel_title}</VideoChannel>
                </td>
                <td>
                  <DateWrapper>{date}</DateWrapper>
                </td>
                <td>{duration}</td>
              </PlaylistTableRow>
            );
          })}
        </PlaylistTableBody>
      </PlaylistTable>
    </PanelWrapper>
  );
}
