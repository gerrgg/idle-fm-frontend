// src/hooks/useDocumentMeta.js
import { useEffect } from "react";

export function useDocumentMeta({ title, description, image, url }) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (name, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setOG = (property, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Standard meta
    setMeta("description", description);

    // OpenGraph
    setOG("og:title", title);
    setOG("og:description", description);
    setOG("og:image", image);
    setOG("og:url", url);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }, [title, description, image, url]);
}
