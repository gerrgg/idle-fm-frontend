import { useEffect, useRef } from "react";
import YouTubeIframeLoader from "youtube-iframe";

export default function YouTubeAudioPlayer({
  videoKey,
  onEnded,
  manualPlayTick,
}) {
  const mountRef = useRef(null);
  const playerRef = useRef(null);

  // init once
  useEffect(() => {
    let destroyed = false;

    YouTubeIframeLoader.load((YT) => {
      if (destroyed || !mountRef.current) return;

      playerRef.current = new YT.Player(mountRef.current, {
        videoId: videoKey,
        width: "1",
        height: "1",
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            // first play may be blocked until user clicks Start
            try {
              e.target.playVideo();
            } catch {
              // ignore autoplay policy errors
              console.warn(
                "YouTube autoplay blocked, waiting for manual play."
              );
            }
          },
          onStateChange: (e) => {
            if (
              e.data === YT.PlayerState.ENDED &&
              typeof onEnded === "function"
            )
              onEnded();
          },
        },
      });
    });

    return () => {
      destroyed = true;
      if (playerRef.current) playerRef.current.destroy();
    };
  }, []);

  // change track without recreating iframe
  useEffect(() => {
    if (playerRef.current && videoKey) {
      playerRef.current.loadVideoById(videoKey);
    }
  }, [videoKey]);

  // manual “Start” to satisfy autoplay policies
  useEffect(() => {
    if (playerRef.current) {
      try {
        playerRef.current.playVideo();
      } catch {
        // ignore autoplay policy errors
        if (manualPlayTick > 0) {
          console.warn("YouTube autoplay blocked, waiting for manual play.");
          // attempt to play again on manual tick
          playerRef.current.playVideo().catch((err) => {
            console.error("Failed to play video:", err);
          });
        }
      }
    }
  }, [manualPlayTick]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        left: -9999,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
