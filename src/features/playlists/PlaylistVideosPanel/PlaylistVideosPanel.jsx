import { useSelector, useDispatch } from "react-redux";
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
  PlaylistPositionTableCell,
} from "./PlaylistVideosPanel.styles";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortablePlaylistRow from "./SortablePlaylistRow";

import { reorderPlaylistVideos } from "../../../store/playlistThunksNormalized.js";

import { Row } from "../../../styles/layout";

import PlayButton from "../../../components/PlayButton/PlayButton";

import dateFormat from "../../../utils/dateFormat";
import { formatYouTubeDurationToTimeString } from "../../../utils/time";
import Equalizer from "../../../components/Equalizer/Equalizer";

const InlinePositionCell = ({ handlePlayTrack, index, id }) => {
  const player = useSelector((state) => state.player);

  const isActive =
    player.isPlaying && player.queue[player.queueIndex]?.videoId === id;

  return (
    <PlaylistPositionTableCell className={isActive ? "active" : ""}>
      <span>{index + 1}</span>
      {isActive && (
        <Equalizer
          className="inline-equalizer"
          isPlaying={true}
          height="16px"
        />
      )}
      <button onClick={() => handlePlayTrack(index)}>
        {isActive ? (
          // Pause
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <rect x="6" y="5" width="4" height="14" fill="currentcolor" />
            <rect x="14" y="5" width="4" height="14" fill="currentcolor" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path d="M3 22v-20l18 10-18 10z" fill="currentcolor" />
          </svg>
        )}
      </button>
    </PlaylistPositionTableCell>
  );
};

export default function PlaylistVideosPanel({
  handlePlay,
  handlePlayTrack,
  videos,
  playlistId,
}) {
  const dispatch = useDispatch();

  const sensors = useSensors(useSensor(PointerSensor));

  // --- DND Handler ---
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = videos.findIndex((v) => v.id === active.id);
    const newIndex = videos.findIndex((v) => v.id === over.id);

    const newOrder = arrayMove(
      videos.map((v) => v.id),
      oldIndex,
      newIndex
    );

    // Update Redux
    dispatch(
      reorderPlaylistVideos({
        playlistId,
        videoIds: newOrder,
      })
    );
  }

  if (videos.length === 0) return null;

  return (
    <PanelWrapper>
      <PlaylistActions my="lg" gap="md" px="lg">
        <PlayButton handlePlay={handlePlay} size="lg" />
      </PlaylistActions>

      {/* ---- DND WRAPPER ---- */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={videos.map((v) => v.id)}
          strategy={verticalListSortingStrategy}
        >
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
                  <SortablePlaylistRow key={v.id} id={v.id}>
                    <InlinePositionCell
                      handlePlayTrack={handlePlayTrack}
                      index={index}
                      id={v.id}
                    />

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
                  </SortablePlaylistRow>
                );
              })}
            </PlaylistTableBody>
          </PlaylistTable>
        </SortableContext>
      </DndContext>
    </PanelWrapper>
  );
}
