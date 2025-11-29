import { IconButtonCircle } from "./PlayButton.styles.jsx";
import { useSelector } from "react-redux";

export default function PlayButton({ handlePlay, size }) {
  const isPlaying = useSelector((s) => s.player.isPlaying);

  return (
    <IconButtonCircle size={size} onClick={handlePlay}>
      {isPlaying ? (
        // Pause
        <svg viewBox="0 0 24 24">
          <rect x="6" y="5" width="4" height="14" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" fill="currentColor" />
        </svg>
      ) : (
        // Play
        <svg viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      )}
    </IconButtonCircle>
  );
}
