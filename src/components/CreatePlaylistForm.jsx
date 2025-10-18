import { useState } from "react";
import toast from "react-hot-toast";
import TagSelector from "./TagSelector";
import * as S from "./AuthForm.styles.jsx";
import { playlistsApi } from "../api/playlists.js";

export default function CreatePlaylistForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [tags, setTags] = useState([]); // now this holds selected tags
  const [availableTags] = useState(["lofi", "trap", "metal", "ambient"]);

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
      tags,
    };

    try {
      await playlistsApi.create(data);
      toast.success("Playlist created successfully!", {
        id: "playlist-create-success",
      });
      // Optionally, you can reset the form or redirect the user
      setTitle("");
      setDescription("");
      setIsPrivate(false);
      setTags([]);
    } catch (error) {
      toast.error("Failed to create playlist. Please try again.", {
        id: "playlist-create-error",
      });
      console.error("Error creating playlist:", error);
    }
  }

  return (
    <S.AuthForm onSubmit={handleSubmit}>
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

      <S.AuthButton type="submit">Create Playlist</S.AuthButton>
    </S.AuthForm>
  );
}
