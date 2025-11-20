import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { nextTrack, setPlayState } from "../../store/playerSlice";

export default function YouTubeAudioPlayer() {
  const dispatch = useDispatch();

  const videos = useSelector((s) => s.playlists.current?.videos || []);
  const { currentIndex, isPlaying, volume } = useSelector((s) => s.player);

  const currentTrack = videos[currentIndex] || null;

  const playerRef = useRef(null);
  const suppressPause = useRef(false);

  function onReady(e) {
    playerRef.current = e.target;

    if (currentTrack) {
      playerRef.current.loadVideoById(currentTrack.youtube_key);
    }

    playerRef.current.setVolume(volume * 100);
  }

  function onStateChange(e) {
    const YTState = window.YT.PlayerState;

    if (e.data === YTState.ENDED) {
      dispatch(nextTrack());
      return;
    }

    if (e.data === YTState.PLAYING) {
      suppressPause.current = false;
      dispatch(setPlayState(true));
      return;
    }

    if (e.data === YTState.PAUSED) {
      if (suppressPause.current) return; // ignore transition pause
      dispatch(setPlayState(false));
    }
  }

  useEffect(() => {
    if (!playerRef.current) return;
    if (!currentTrack) return;

    suppressPause.current = true; // prevent false paused state

    playerRef.current.loadVideoById(currentTrack.youtube_key);

    if (isPlaying) {
      playerRef.current.playVideo();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.playVideo() : playerRef.current.pauseVideo();
  }, [isPlaying]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(volume * 100);
  }, [volume]);

  return (
    <YouTube
      videoId={currentTrack?.youtube_key ?? ""}
      opts={{
        height: "0",
        width: "0",
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          playsinline: 1,
        },
      }}
      onReady={onReady}
      onStateChange={onStateChange}
    />
  );
}
