import { useEffect, useState } from "react";
import { gifsApi } from "../api/gifs.js";
import * as S from "./Gif.styles";

const Gif = ({ tenorID, index, resolvedGifs, setResolvedGifs }) => {
  const [gifUrl, setGifUrl] = useState(null);

  useEffect(() => {
    async function loadFallback(excludeKey) {
      try {
        const gifs = await gifsApi.getGifs();
        if (!Array.isArray(gifs) || gifs.length === 0) return null;

        const filtered = excludeKey
          ? gifs.filter((g) => g.tenor_key !== excludeKey)
          : gifs;

        const random = filtered[Math.floor(Math.random() * filtered.length)];
        return random.tenor_key;
      } catch {
        return null;
      }
    }

    async function resolveGif() {
      // 1. Already have a resolved gif for this index → reuse
      if (resolvedGifs[index]) {
        setGifUrl(`https://media.tenor.com/${resolvedGifs[index]}`);
        return;
      }

      // 2. Valid tenorID → test it
      if (tenorID) {
        const url = `https://media.tenor.com/${tenorID}`;
        try {
          const res = await fetch(url, { method: "HEAD" });
          if (res.ok) {
            setResolvedGifs((prev) => ({ ...prev, [index]: tenorID }));
            setGifUrl(url);
            return;
          }
        } catch {}
      }

      // 3. Fallback excluding last resolved key
      const prevKey = resolvedGifs[index - 1] || null;
      const fallbackKey = await loadFallback(prevKey);
      if (fallbackKey) {
        setResolvedGifs((prev) => ({ ...prev, [index]: fallbackKey }));
        setGifUrl(`https://media.tenor.com/${fallbackKey}`);
      } else {
        setGifUrl(null);
      }
    }

    resolveGif();
  }, [tenorID, index]);

  if (!gifUrl) return null;
  return <S.GifWrapper file={gifUrl} />;
};

export default Gif;
