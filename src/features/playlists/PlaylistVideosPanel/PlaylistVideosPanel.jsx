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
  RemoveButton,
  DragHandleWrapper,
  ThumbWrapper,
  SetImageOverlay,
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
import { removeVideoFromPlaylistNormalized } from "../../../store/removeVideoFromPlaylistNormalized";
import { updatePlaylistImageNormalized } from "../../../store/playlistThunksNormalized";
import { Row } from "../../../styles/layout";
import PlayButton from "../../../components/PlayButton/PlayButton";
import dateFormat from "../../../utils/dateFormat";
import { formatYouTubeDurationToTimeString } from "../../../utils/time";
import DragHandle from "./DragHandle.jsx";
import InlinePositionCell from "./InlinePositionCell.jsx";

export default function PlaylistVideosPanel({
  handlePlay,
  handlePlayTrack,
  videos,
  playlistId,
}) {
  const dispatch = useDispatch();

  function remove(videoId) {
    dispatch(
      removeVideoFromPlaylistNormalized({
        playlistId,
        videoId,
      })
    );
  }

  const player = useSelector((state) => state.player);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 }, // small drag threshold
    })
  );

  function handleSetCover(video) {
    const url =
      video.thumbnails?.medium?.url || video.thumbnails?.default?.url || null;

    if (!url) return;

    dispatch(
      updatePlaylistImageNormalized({
        playlistId,
        image: url,
      })
    );
  }

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
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={videos.map((v) => v.id)}
          strategy={verticalListSortingStrategy}
        >
          <PlaylistTable>
            <PlaylistTableHeader>
              <PlaylistTableRow>
                <th></th>
                <th style={{ textAlign: "center" }}>#</th>
                <th>Title</th>
                <th>Channel</th>
                <th>Date Added</th>
                <th>Duration</th>
                <th></th>
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

                const isActive =
                  player.isPlaying &&
                  player.queue[player.queueIndex]?.videoId === v.id;

                return (
                  <SortablePlaylistRow key={v.id} id={v.id}>
                    <DragHandle />
                    <InlinePositionCell
                      handlePlayTrack={handlePlayTrack}
                      index={index}
                      id={v.id}
                    />

                    <td>
                      <Row gap="md" align="center">
                        <ThumbWrapper>
                          <VideoThumb src={thumb} alt={v.title} />

                          <SetImageOverlay
                            className="set-image-overlay"
                            onClick={() => handleSetCover(v)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeWidth="2"
                                d="M12 5c-1.657 0-3 .895-3 2 0 1.105 1.343 2 3 2s3-.895 3-2c0-1.105-1.343-2-3-2zm0 4c-2.21 0-4-1.343-4-3s1.79-3 4-3 4 1.343 4 3-1.79 3-4 3zm-7 2v8h14v-8H5zm2 2h10v4H7v-4z"
                              />
                            </svg>
                          </SetImageOverlay>
                        </ThumbWrapper>

                        <VideoTitle $isActive={isActive}>{v.title}</VideoTitle>
                      </Row>
                    </td>

                    <td>
                      <VideoChannel>{v.channel_title}</VideoChannel>
                    </td>

                    <td>
                      <DateWrapper>{date}</DateWrapper>
                    </td>

                    <td>{duration}</td>

                    <td>
                      <RemoveButton onClick={() => remove(v.id)}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14H6L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4h6v2" />
                        </svg>
                      </RemoveButton>
                    </td>
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
