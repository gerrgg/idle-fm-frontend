import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import TagSelector from "./TagSelector";
import * as S from "./AuthForm.styles.jsx";
import {
  CreatePlaylistWrapper,
  CreatePlaylistFormButton,
} from "./CreatePlaylistForm.styles.jsx";
import { playlistsApi } from "../api/playlists.js";
import { tagsApi } from "../api/tags.js";
import { useNavigate } from "react-router-dom";

export default function CreatePlaylistForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [tags, setTags] = useState([]); // now this holds selected tags
  const [availableTags, setAvailableTags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available tags from the API if needed
    async function fetchTags() {
      try {
        const tags = await tagsApi.getTags();
        setAvailableTags(tags);
      } catch (error) {
        toast.error("Failed to load tags", {
          id: "tags-load-error",
        });
        console.error("Error loading tags:", error);
      }
    }

    fetchTags();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title) {
      toast.error("Please enter a title for your playlist.", {
        id: "playlist-title-error",
      });
      return;
    }

    const data = {
      title,
      description,
      is_public: !isPrivate,
      tags: tags.map((t) => (typeof t === "object" ? t.name : t)),
    };

    try {
      const playlist = await playlistsApi.create(data);
      toast.success("Playlist created successfully!", {
        id: "playlist-create-success",
      });
      navigate(`/edit/playlist/${playlist.id}`);
    } catch (error) {
      toast.error("Failed to create playlist. Please try again.", {
        id: "playlist-create-error",
      });
      console.error("Error creating playlist:", error);
    }
  }

  return (
    <CreatePlaylistWrapper onSubmit={handleSubmit}>
      <S.AuthFormGroup>
        <S.AuthLabel>Title</S.AuthLabel>
        <S.AuthInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Awesome Playlist"
        />
      </S.AuthFormGroup>

      <S.AuthFormGroup>
        <S.AuthLabel>Description</S.AuthLabel>
        <S.AuthInput
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Low-key beats for studying, ong fr fr."
        />
      </S.AuthFormGroup>

      <S.AuthFormGroup>
        <S.AuthLabel>Tags</S.AuthLabel>
        <TagSelector
          availableTags={availableTags}
          selectedTags={tags}
          onChange={setTags}
        />
      </S.AuthFormGroup>

      <S.AuthFormGroup direction="row">
        <S.ToggleWrapper>
          <S.ToggleInput
            type="checkbox"
            id="isPrivate"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
          <S.ToggleSlider />
        </S.ToggleWrapper>
        <S.AuthCheckboxLabel htmlFor="isPrivate">
          Keep Private
        </S.AuthCheckboxLabel>
      </S.AuthFormGroup>

      <CreatePlaylistFormButton type="submit">
        Create Playlist
      </CreatePlaylistFormButton>
    </CreatePlaylistWrapper>
  );
}
