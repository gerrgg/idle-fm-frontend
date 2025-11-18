import { useState, useRef } from "react";
import TagSelector from "../TagSelector";
import {
  Wrapper,
  LeftImage,
  PlaceholderImage,
  FormGroup,
  Label,
  Input,
  Textarea,
  SaveButton,
} from "./EditPlaylistDetails.styles";

import { useDebouncedCallback } from "../../../hooks/useDebouncedCallback";
import { useEffect } from "react";

import { Col } from "../../../styles/layout";

import { useDispatch, useSelector } from "react-redux";
import {
  updatePlaylist,
  fetchUserPlaylists,
} from "../../../store/playlistSlice";

function RadioIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M15.929 11.517c.848-1.003 1.354-2.25 1.354-3.601s-.506-2.598-1.354-3.601l1.57-1.439c1.257 1.375 2.022 3.124 2.022 5.04s-.766 3.664-2.022 5.041l-1.57-1.44zm-10.992-10.076l-1.572-1.441c-2.086 2.113-3.365 4.876-3.365 7.916s1.279 5.802 3.364 7.916l1.572-1.441c-1.672-1.747-2.697-4.001-2.697-6.475s1.026-4.728 2.698-6.475zm1.564 11.515l1.57-1.439c-.848-1.003-1.354-2.25-1.354-3.601s.506-2.598 1.354-3.601l-1.57-1.439c-1.257 1.375-2.022 3.124-2.022 5.04s.765 3.664 2.022 5.04zm14.134-12.956l-1.571 1.441c1.672 1.747 2.697 4.001 2.697 6.475s-1.025 4.728-2.697 6.475l1.572 1.441c2.085-2.115 3.364-4.877 3.364-7.916s-1.279-5.803-3.365-7.916zm-12.564 24c.625-1.625 2.188-2.698 3.929-2.698s3.304 1.073 3.929 2.698h2.154l-5.083-13.268c1.162-.414 2-1.512 2-2.816 0-1.657-1.344-3-3-3s-3 1.343-3 3c0 1.304.838 2.403 2 2.816l-5.042 13.268h2.113z"
      />
    </svg>
  );
}

export default function EditPlaylistDetails({ playlist, onTagsChange }) {
  const [title, setTitle] = useState(playlist.title);
  const [description, setDescription] = useState(playlist.description || "");
  const [tags, setTags] = useState(playlist.tags || []);
  const tagSelectorRef = useRef(null);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const original = {
    title: playlist.title,
    description: playlist.description || "",
    tags: playlist.tags || [],
  };

  const [originalState, setOriginalState] = useState(original);

  function getCurrentTags() {
    return tagSelectorRef.current
      ? tagSelectorRef.current().map((t) => t.name)
      : tags.map((t) => t.name);
  }

  function hasChanges() {
    const ts = getCurrentTags();
    return (
      title !== original.title ||
      description !== original.description ||
      JSON.stringify(ts) !== JSON.stringify(original.tags)
    );
  }

  async function saveChanges(data) {
    await dispatch(updatePlaylist({ id: playlist.id, data })).unwrap();
    setOriginalState(data);
  }

  function performSave() {
    if (!hasChanges()) return;

    saveChanges({
      title,
      description,
      tags: getCurrentTags(),
    });
  }

  const debouncedSave = useDebouncedCallback(performSave, 700);

  useEffect(() => {
    if (hasChanges()) debouncedSave();
  }, [title, description, tags]);

  function handleBlur() {
    debouncedSave.flush();
  }

  return (
    <Wrapper>
      <LeftImage>
        {playlist.image ? (
          <img src={playlist.image} alt="" />
        ) : (
          <PlaceholderImage>
            <RadioIcon />
          </PlaceholderImage>
        )}
      </LeftImage>

      <Col>
        <FormGroup>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Playlist name"
            onBlur={handleBlur}
          />
        </FormGroup>

        <FormGroup>
          <Label>Tags</Label>
          <TagSelector
            availableTags={playlist.availableTags || []}
            selectedTags={tags}
            onChange={(newTags) => {
              setTags(newTags);

              // send tag names upward
              const tagNames = newTags.map((t) => t.name);
              onTagsChange(tagNames); // ← this powers YouTube search panel
            }}
            autoCommitRef={tagSelectorRef}
          />
        </FormGroup>
      </Col>
    </Wrapper>
  );
}
