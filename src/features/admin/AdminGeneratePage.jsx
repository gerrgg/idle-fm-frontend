import { useState } from "react";

export default function AdminGeneratePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");

  async function handleGenerate() {
    setStatus("Working...");

    const res = await fetch("/api/admin/generate-playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // assumes you use httpOnly cookie for JWT
      body: JSON.stringify({
        title,
        description,
        tags: tags.split(",").map((t) => t.trim()),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus(`Error: ${data.error}`);
      return;
    }

    setStatus(`Created playlist #${data.playlistId}`);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Generate Playlist</h1>

      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Tags (comma separated)</label>
      <input value={tags} onChange={(e) => setTags(e.target.value)} />

      <button onClick={handleGenerate}>Generate Playlist</button>

      <p>{status}</p>
    </div>
  );
}
