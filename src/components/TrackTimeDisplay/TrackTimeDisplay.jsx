import {
  formatSecondsToTimeString,
  convertIsoDurationToSeconds,
} from "../../utils/time";
import { useSelector } from "react-redux";
import { Wrapper, TimeText, ProgressBar } from "./TrackTimeDisplay.styles";

export default function TrackTimeDisplay({ durationSeconds }) {
  const currentSeconds = useSelector((s) => s.player.currentSeconds);

  if (durationSeconds === undefined || currentSeconds === undefined) {
    return null;
  }

  const totalDuration = convertIsoDurationToSeconds(durationSeconds);
  const isLive = totalDuration === 0;

  // LIVE VIDEO UI
  if (isLive) {
    return (
      <Wrapper style={{ fontVariantNumeric: "tabular-nums" }}>
        <TimeText style={{ color: "red", fontWeight: 600 }}>LIVE</TimeText>
      </Wrapper>
    );
  }

  // NORMAL VIDEO
  const progress = (currentSeconds / totalDuration) * 100;

  return (
    <Wrapper style={{ fontVariantNumeric: "tabular-nums" }}>
      <TimeText>{formatSecondsToTimeString(currentSeconds)}</TimeText>
      <ProgressBar progress={progress} />
      <TimeText>{formatSecondsToTimeString(totalDuration)}</TimeText>
    </Wrapper>
  );
}
