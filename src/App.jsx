import { useEffect, useState } from "react";
import YouTubeAudioPlayer from "./components/YoutubeAudioPlayer.jsx";
// import YouTubeAudioPlayer from "./components/YouTubeAudioPlayer.jsx";

export default function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manualPlayTick, setManualPlayTick] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlaylist() {
      const API_BASE = import.meta.env.DEV
        ? "http://localhost:8080"
        : "https://idle-fm-backend.azurewebsites.net";

      try {
        const res = await fetch(`${API_BASE}/playlists/1/videos`);
        const data = await res.json();
        setPlaylist(data.videos || []);
      } catch (err) {
        console.error("❌ Failed to load playlist", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylist();
  }, []);

  const next = () => setCurrentIndex((i) => (i + 1) % playlist.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);

  const handleEnded = () => next();

  useEffect(() => {
    window.onTrackEnd = handleEnded;
    return () => (window.onTrackEnd = null);
  }, [playlist]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading playlist…</p>;
  if (playlist.length === 0)
    return <p style={{ textAlign: "center" }}>No videos found.</p>;

  const current = playlist[currentIndex];

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", textAlign: "center" }}>
      <h1>Idle FM — Live API Demo</h1>

      <p style={{ opacity: 0.7 }}>
        Playing {currentIndex + 1}/{playlist.length}
      </p>

      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          marginTop: 12,
        }}
      >
        <button onClick={prev}>⏮️ Prev</button>
        <button onClick={() => setManualPlayTick((n) => n + 1)}>
          ▶️ Start/Play
        </button>
        <button onClick={next}>⏭️ Next</button>
      </div>

      <YouTubeAudioPlayer
        videoKey={current.youtube_key}
        onEnded={handleEnded}
        manualPlayTick={manualPlayTick}
      />
    </div>
  );
}
