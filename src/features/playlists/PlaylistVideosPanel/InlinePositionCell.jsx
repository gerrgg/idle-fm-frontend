import { useSelector } from "react-redux";
import { PlaylistPositionTableCell } from "./PlaylistVideosPanel.styles";
import Equalizer from "../../../components/Equalizer/Equalizer";

export default function InlinePositionCell({ handlePlayTrack, index, id }) {
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
}
