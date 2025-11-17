import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createPlaylist } from "../../../store/playlistSlice";
import { fetchTags } from "../../../store/tagsSlice";

import TagSelector from "../TagSelector";
import AddVideoPanel from "../AddVideoPanel/AddVideoPanel";
import { H1 } from "../../../styles/typography.js";

import {
  FormWrapper,
  FormGroup,
  Label,
  Input,
  Textarea,
  SubmitButton,
  TwoColumn,
  RightColumn,
  LeftColumn,
} from "./CreatePlaylistForm.styles.jsx";

import {
  ToggleWrapper,
  ToggleInput,
  ToggleSlider,
} from "../../../styles/form.js";

export default function CreatePlaylistForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [tags, setTags] = useState([]);
  const { items: availableTags, loaded } = useSelector((state) => state.tags);
  const tagSelectorRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchTags());
    }
  }, [loaded, dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();

    let finalTags = tags;

    if (tagSelectorRef.current) {
      finalTags = tagSelectorRef.current(); // <-- get synced tags
    }

    const payload = {
      title,
      description,
      is_public: !isPrivate,
      tags: finalTags.map((t) => t.name),
    };

    const result = await dispatch(createPlaylist(payload));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Playlist created!");
    } else {
      toast.error("Failed to create playlist");
    }
  }

  return (
    <TwoColumn>
      <LeftColumn>
        <FormWrapper onSubmit={handleSubmit}>
          <H1 as="h2">Create Playlist</H1>

          <FormGroup>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Playlist"
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Low-key beats while studying, ong fr fr."
            />
          </FormGroup>

          <FormGroup>
            <Label>Tags</Label>
            <TagSelector
              availableTags={availableTags}
              selectedTags={tags}
              onChange={setTags}
              autoCommitRef={tagSelectorRef}
            />
          </FormGroup>

          <FormGroup>
            <Label>Keep Private</Label>
            <ToggleWrapper>
              <ToggleInput
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <ToggleSlider />
            </ToggleWrapper>
          </FormGroup>

          <SubmitButton size="lg" variant="accent" type="submit">
            Create Playlist
          </SubmitButton>
        </FormWrapper>
      </LeftColumn>
      <RightColumn>
        <AddVideoPanel />
      </RightColumn>
    </TwoColumn>
  );
}
