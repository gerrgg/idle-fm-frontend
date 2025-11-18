import { useRef, useState } from "react";
import {
  VolumeWrapper,
  VolumeIcon,
  SliderContainer,
  SliderTrack,
  SliderFill,
  SliderThumb,
} from "./VolumeSlider.styles";

import { setVolume } from "../../store/playerSlice";
import { useSelector, useDispatch } from "react-redux";

export default function VolumeSlider() {
  const trackRef = useRef(null);
  const dispatch = useDispatch();
  const volume = useSelector((state) => state.player.volume);
  const [dragging, setDragging] = useState(false);

  const updateValue = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const pos = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    dispatch(setVolume(pos / rect.width));
  };

  const toggleMute = () => {
    dispatch(setVolume(volume === 0 ? 0.5 : 0));
  };

  function UnmutedIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm13.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002 1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511 1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z"
        />
      </svg>
    );
  }

  function MutedIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm17.324 4.993l1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653 1.324-1.325-1.676-1.656z"
        />
      </svg>
    );
  }

  return (
    <VolumeWrapper>
      <VolumeIcon onClick={toggleMute}>
        {volume === 0 ? <MutedIcon /> : <UnmutedIcon />}
      </VolumeIcon>

      <SliderContainer
        onPointerDown={(e) => {
          setDragging(true);
          updateValue(e.clientX);
        }}
        onPointerMove={(e) => dragging && updateValue(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        <SliderTrack ref={trackRef}>
          <SliderFill value={volume} />
        </SliderTrack>
        <SliderThumb value={volume} />
      </SliderContainer>
    </VolumeWrapper>
  );
}
