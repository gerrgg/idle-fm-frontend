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
    alert("hi");
    // dispatch(
    //   removeVideoFromPlaylistNormalized({
    //     playlistId,
    //     videoId,
    //   })
    // );
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 }, // small drag threshold
    })
  );

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
                <th>#</th>
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

                    <td>
                      <button onClick={() => remove(v.id)}>Remove</button>
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
