import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Wrapper,
  Section,
  Controls,
  IconButtonCircle,
  IconButton,
  NowPlaying,
  LeftControls,
  MiddleControlsWrapper,
} from "./BottomBar.styles";

import VolumeSlider from "../VolumeSlider/VolumeSlider";
import Equalizer from "../Equalizer/Equalizer";
import TrackTimeDisplay from "../TrackTimeDisplay/TrackTimeDisplay";

import { shuffleArray } from "../../utils/shuffleArray";
import { selectCurrentVideo } from "../../store/selectors/playerSelectors";

import {
  nextTrack,
  prevTrack,
  setPlaying,
  setVolume,
  setQueue,
} from "../../store/playerSlice";

export default function BottomBar() {
  const dispatch = useDispatch();

  const isPlaying = useSelector((s) => s.player.isPlaying);
  const queue = useSelector((s) => s.player.queue);
  const volume = useSelector((s) => s.player.volume);
  const sourcePlaylistId = useSelector((s) => s.player.sourcePlaylistId);
  const currentVideo = useSelector(selectCurrentVideo);

  // ------------------------------
  // Controls
  // ------------------------------
  const PlayButton = () => (
    <IconButtonCircle onClick={() => dispatch(setPlaying(!isPlaying))}>
      {isPlaying ? (
        // Pause
        <svg width="22" height="22" viewBox="0 0 24 24">
          <rect x="6" y="5" width="4" height="14" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" fill="currentColor" />
        </svg>
      ) : (
        // Play
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      )}
    </IconButtonCircle>
  );

  const NextButton = () => (
    <IconButtonCircle onClick={() => dispatch(nextTrack())}>
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M9 6l6 6-6 6" fill="currentColor" />
      </svg>
    </IconButtonCircle>
  );

  const PreviousButton = () => (
    <IconButtonCircle onClick={() => dispatch(prevTrack())}>
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M15 18l-6-6 6-6" fill="currentColor" />
      </svg>
    </IconButtonCircle>
  );

  const ShuffleButton = () => {
    return (
      <IconButton
        onClick={() =>
          dispatch(
            setQueue({
              videoIds: shuffleArray(queue.map((v) => v.videoId)),
              sourcePlaylistId: sourcePlaylistId,
            })
          )
        }
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M18 9v-3c-1 0-3.308-.188-4.506 2.216l-4.218 8.461c-1.015 2.036-3.094 3.323-5.37 3.323h-3.906v-2h3.906c1.517 0 2.903-.858 3.58-2.216l4.218-8.461c1.356-2.721 3.674-3.323 6.296-3.323v-3l6 4-6 4zm-9.463 1.324l1.117-2.242c-1.235-2.479-2.899-4.082-5.748-4.082h-3.906v2h3.906c2.872 0 3.644 2.343 4.631 4.324zm15.463 8.676l-6-4v3c-3.78 0-4.019-1.238-5.556-4.322l-1.118 2.241c1.021 2.049 2.1 4.081 6.674 4.081v3l6-4z"
            fill="currentColor"
          />
        </svg>
      </IconButton>
    );
  };

  const RepeatButton = () => (
    <IconButton>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"
          fill="currentColor"
        />
      </svg>
    </IconButton>
  );

  return (
    <Wrapper>
      <LeftControls align="flex-end">
        <Equalizer isPlaying={isPlaying} height="24px" />
        {isPlaying && (
          <NowPlaying>
            <span>{currentVideo?.title ?? ""}</span>
          </NowPlaying>
        )}
      </LeftControls>

      <MiddleControlsWrapper>
        {/* <TrackTimeDisplay durationSeconds={durationSeconds} /> */}
        <Controls $disabled={!currentVideo}>
          <ShuffleButton />
          <PreviousButton />
          <PlayButton />
          <NextButton />
          <RepeatButton />
        </Controls>
      </MiddleControlsWrapper>

      <Section className="volume-wrapper">
        <VolumeSlider
          value={volume}
          onChange={(value) => dispatch(setVolume(value))}
        />
      </Section>
    </Wrapper>
  );
}
