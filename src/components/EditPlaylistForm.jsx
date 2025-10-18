import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TagSelector from "./TagSelector";
import * as S from "./AuthForm.styles.jsx";
import {
  CreatePlaylistWrapper,
  CreatePlaylistFormButton,
} from "./CreatePlaylistForm.styles.jsx";
import { playlistsApi } from "../api/playlists.js";
import { tagsApi } from "../api/tags.js";

export default function EditPlaylistForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  // Fetch playlist + available tags
  useEffect(() => {
    async function fetchData() {
      try {
        const [playlist, allTags] = await Promise.all([
          playlistsApi.getById(id),
          tagsApi.getTags(),
        ]);

        setTitle(playlist.title || "");
        setDescription(playlist.description || "");
        setIsPrivate(!playlist.is_public);
        setTags(playlist.tags || []);
        setAvailableTags(allTags);
      } catch (error) {
        toast.error("Failed to load playlist data", { id: "edit-load-error" });
        console.error("Error loading playlist:", error);
      }
    }

    fetchData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a title.", { id: "edit-title-error" });
      return;
    }

    const data = {
      title,
      description,
      is_public: !isPrivate,
      tags: tags.map((t) => (typeof t === "object" ? t.name : t)),
    };

    try {
      await playlistsApi.update(id, data);
      toast.success("Playlist updated successfully!", {
        id: "playlist-update-success",
      });
      navigate(`/edit/playlist/${id}`);
    } catch (error) {
      toast.error("Failed to update playlist.", {
        id: "playlist-update-error",
      });
      console.error("Error updating playlist:", error);
    }
  }

  console.log("Available tags:", availableTags, "Selected tags:", tags);

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
        Update Playlist
      </CreatePlaylistFormButton>
    </CreatePlaylistWrapper>
  );
}
