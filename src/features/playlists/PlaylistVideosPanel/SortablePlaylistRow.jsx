// SortablePlaylistRow.jsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortablePlaylistRow({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (!child) return child;

        // Detect the DragHandle and inject listeners
        if (child.type?.displayName === "DragHandle") {
          return React.cloneElement(child, { listeners });
        }

        return child;
      })}
    </tr>
  );
}
