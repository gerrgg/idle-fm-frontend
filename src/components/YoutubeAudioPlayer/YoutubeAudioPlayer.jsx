import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  nextTrack,
  setPlayState,
  setCurrentSeconds,
} from "../../store/playerSlice";

export default function YouTubeAudioPlayer() {
  const dispatch = useDispatch();
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const activePlaylistId = useSelector((s) => s.player.activePlaylistId);
  const playlists = useSelector((s) => s.playlists.items);

  const activePlaylist = playlists.find((p) => p.id === activePlaylistId);
  const videos = activePlaylist?.videos || [];

  const { currentIndex, isPlaying, volume } = useSelector((s) => s.player);

  const currentTrack = videos[currentIndex] || null;

  const playerRef = useRef(null);
  const suppressPauseRef = useRef(false);

  // ----------------------------------------
  // 1. YouTube ready → attach instance
  // ----------------------------------------
  function onReady(e) {
    playerRef.current = e.target;
    setIsPlayerReady(true);
    if (currentTrack) {
      playerRef.current.loadVideoById(currentTrack.youtube_key);
    }

    playerRef.current.setVolume(volume * 100);
  }

  // ----------------------------------------
  // 2. Handle YouTube internal state
  // ----------------------------------------
  function onStateChange(e) {
    const YTState = window.YT.PlayerState;

    if (e.data === YTState.ENDED) {
      dispatch(nextTrack());
      return;
    }

    if (e.data === YTState.PLAYING) {
      suppressPauseRef.current = false;
      dispatch(setPlayState(true));
      return;
    }

    if (e.data === YTState.PAUSED) {
      if (suppressPauseRef.current) return; // ignore artificial pauses
      dispatch(setPlayState(false));
    }
  }

  // ----------------------------------------
  // 3. Handle track changes (playlist or index)
  // ----------------------------------------
  useEffect(() => {
    if (!playerRef.current) return;
    if (!currentTrack) return;

    suppressPauseRef.current = true; // prevent false pause event

    playerRef.current.loadVideoById(currentTrack.youtube_key);

    if (isPlaying) {
      playerRef.current.playVideo();
    }
  }, [currentTrack]); // <— TRIGGER: playlist changed or index changed

  // ----------------------------------------
  // 4. Handle play/pause changes
  // ----------------------------------------
  useEffect(() => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  // ----------------------------------------
  // 5. Handle volume changes
  // ----------------------------------------
  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(volume * 100);
  }, [volume]);

  // ----------------------------------------
  // 6. Track time updates
  // ----------------------------------------
  useEffect(() => {
    if (!isPlayerReady) return;
    if (!playerRef.current) return;

    let interval = null;

    if (isPlaying) {
      interval = setInterval(() => {
        const player = playerRef.current;
        if (!player || !player.getCurrentTime) return;

        const time = player.getCurrentTime();
        if (!isNaN(time)) {
          dispatch(setCurrentSeconds(time));
        }
      }, 300);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isPlayerReady]);

  // ----------------------------------------
  // Render
  // ----------------------------------------
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
