import { DragHandleWrapper } from "./PlaylistVideosPanel.styles";

// DragHandle.jsx
export default function DragHandle({ listeners }) {
  return (
    <DragHandleWrapper {...listeners}>
      <svg
        width="16"
        height="16"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="5" cy="7" r="1" />
        <circle cx="5" cy="12" r="1" />
        <circle cx="5" cy="17" r="1" />
        <circle cx="12" cy="7" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="17" r="1" />
      </svg>
    </DragHandleWrapper>
  );
}

DragHandle.displayName = "DragHandle";
