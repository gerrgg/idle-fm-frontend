import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import {
  nextTrack,
  setPlayState,
  setCurrentSeconds,
} from "../../store/playerSlice";

import { selectCurrentVideo } from "../../store/selectors/playerSelectors";

export default function YouTubeAudioPlayer() {
  const dispatch = useDispatch();
  const isPlayerReady = useRef(false);

  // NOW returns playlist video OR preview video
  const video = useSelector(selectCurrentVideo);
  const { isPlaying, volume } = useSelector((s) => s.player);

  const playerRef = useRef(null);
  const suppressPause = useRef(false);

  function onReady(e) {
    playerRef.current = e.target;
    isPlayerReady.current = true;

    if (video) playerRef.current.loadVideoById(video.youtube_key);
    playerRef.current.setVolume(volume * 100);
  }

  function onStateChange(e) {
    const YT = window.YT.PlayerState;

    if (e.data === YT.ENDED) {
      dispatch(nextTrack());
      return;
    }

    if (e.data === YT.PLAYING) {
      suppressPause.current = false;
      dispatch(setPlayState(true));
      return;
    }

    if (e.data === YT.PAUSED && !suppressPause.current) {
      dispatch(setPlayState(false));
    }
  }

  useEffect(() => {
    if (!playerRef.current || !video) return;

    suppressPause.current = true;

    playerRef.current.loadVideoById(video.youtube_key);

    if (isPlaying) {
      playerRef.current.playVideo();
    }
  }, [video]);

  useEffect(() => {
    if (!playerRef.current) return;

    if (isPlaying) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [isPlaying]);

  useEffect(() => {
    if (!playerRef.current) return;

    playerRef.current.setVolume(volume * 100);
  }, [volume]);

  return (
    <YouTube
      videoId={video?.youtube_key || ""}
      opts={{ height: "0", width: "0", playerVars: { autoplay: 1 } }}
      onReady={onReady}
      onStateChange={onStateChange}
    />
  );
}
