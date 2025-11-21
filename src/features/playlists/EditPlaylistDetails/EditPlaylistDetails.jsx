import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import TagSelector from "../TagSelector";
import {
  Wrapper,
  LeftImage,
  PlaceholderImage,
  FormGroup,
  Label,
  Input,
  TitleTagWrapper,
} from "./EditPlaylistDetails.styles";
import RadioIcon from "./RadioIcon";
import { updatePlaylist } from "../../../store/playlistSlice";
import { useDebouncedCallback } from "../../../hooks/useDebouncedCallback";

export default function EditPlaylistDetails({ playlist, onTagsChange }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [original, setOriginal] = useState(null);
  const tagSelectorRef = useRef(null);

  useEffect(() => {
    if (!playlist) return;

    const initial = {
      title: playlist.title || "",
      description: playlist.description || "",
      tags: (playlist.tags || []).map((t) => t.name ?? t),
    };

    setOriginal(initial);
    setTitle(initial.title);
    setDescription(initial.description);
    setTags(playlist.tags || []);
  }, [playlist?.id]);

  function getCurrentTags() {
    if (tagSelectorRef.current) {
      return tagSelectorRef.current().map((t) => t.name);
    }
    return tags.map((t) => t.name);
  }

  function hasChanges() {
    if (!original) return false;

    const ts = getCurrentTags();

    return (
      title !== original.title ||
      description !== original.description ||
      JSON.stringify(ts) !== JSON.stringify(original.tags)
    );
  }

  async function saveChanges() {
    if (!original) return;
    if (!hasChanges()) return;

    const data = {
      title,
      description,
      tags: getCurrentTags(),
    };

    await dispatch(updatePlaylist({ id: playlist.id, data })).unwrap();

    // Update baseline state
    setOriginal({
      title: data.title,
      description: data.description,
      tags: data.tags,
    });
  }

  const debouncedSave = useDebouncedCallback(saveChanges, 700);

  useEffect(() => {
    if (!original) return; // Prevent firing during initial load
    if (hasChanges()) debouncedSave();
  }, [title, description, tags]);

  // Save immediately on blur
  function handleBlur() {
    debouncedSave.flush();
  }

  return (
    <Wrapper>
      <LeftImage glowSrc={playlist.image}>
        {playlist.image ? (
          <img src={playlist.image} alt="" />
        ) : (
          <PlaceholderImage>
            <RadioIcon />
          </PlaceholderImage>
        )}
      </LeftImage>

      <TitleTagWrapper>
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
              onTagsChange?.(newTags.map((t) => t.name));
            }}
            autoCommitRef={tagSelectorRef}
          />
        </FormGroup>
      </TitleTagWrapper>
    </Wrapper>
  );
}
