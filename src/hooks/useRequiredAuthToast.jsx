// src/hooks/useRequireAuthToast.js
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useRequireAuthToast() {
  const navigate = useNavigate();

  return () =>
    toast.custom((t) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <span>You must be logged in to do that.</span>

        <button
          style={{
            color: "var(--accent)",
            textDecoration: "underline",
            background: "none",
            border: "none",
            textAlign: "left",
            cursor: "pointer",
            padding: 0,
            margin: 0,
          }}
          onClick={() => {
            toast.dismiss(t.id);
            navigate("/login");
          }}
        >
          Log in
        </button>
      </div>
    ));
}
