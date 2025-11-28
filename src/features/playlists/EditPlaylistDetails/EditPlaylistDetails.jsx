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
import { updatePlaylistNormalized } from "../../../store/playlistThunksNormalized.js";
import { useDebouncedCallback } from "../../../hooks/useDebouncedCallback";

export default function EditPlaylistDetails({ playlist, tags, onTagsChange }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [original, setOriginal] = useState(null);
  const tagSelectorRef = useRef(null);

  useEffect(() => {
    if (!playlist) return;

    const initial = {
      title: playlist.title || "",
      description: playlist.description || "",
      tags: (tags || []).map((t) => t.name),
    };

    setOriginal(initial);
    setTitle(initial.title);
    setDescription(initial.description);
    setSelectedTags(tags || []);
  }, [playlist?.id, tags.length]);

  function getCurrentTags() {
    if (tagSelectorRef.current)
      return tagSelectorRef.current().map((t) => t.name);
    return selectedTags.map((t) => t.name);
  }

  function hasChanges() {
    if (!original) return false;
    const ts = getCurrentTags();
    return (
      title.trim() !== original.title ||
      description.trim() !== original.description ||
      JSON.stringify(ts) !== JSON.stringify(original.tags)
    );
  }

  async function saveChanges() {
    if (!original) return;
    if (!hasChanges()) return;

    const data = {
      title,
      description,
      tags: getCurrentTags(), // list of names
    };

    await dispatch(
      updatePlaylistNormalized({ id: playlist.id, data })
    ).unwrap();

    setOriginal({
      title: data.title,
      description: data.description,
      tags: data.tags,
    });
  }

  const debouncedSave = useDebouncedCallback(saveChanges, 700);

  useEffect(() => {
    if (!original) return;
    if (hasChanges()) debouncedSave();
  }, [title, description, selectedTags]);

  function handleBlur() {
    debouncedSave.flush();
  }

  return (
    <Wrapper>
      <LeftImage glowsrc={playlist.image}>
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
            availableTags={tags || []}
            selectedTags={selectedTags}
            onChange={(newTags) => {
              setSelectedTags(newTags); // UI updates
              onTagsChange?.(newTags.map((t) => t.name)); // Notify parent with names only
            }}
            autoCommitRef={tagSelectorRef}
          />
        </FormGroup>
      </TitleTagWrapper>
    </Wrapper>
  );
}
