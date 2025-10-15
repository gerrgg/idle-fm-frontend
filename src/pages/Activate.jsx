// src/pages/Activate.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Activate({ setUser }) {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const uid = params.get("uid");

    if (!token || !uid) {
      setStatus("invalid");
      return;
    }

    fetch(
      `${import.meta.env.VITE_API_URL}/users/activate?token=${token}&uid=${uid}`
    )
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setUser(data.user || null);
        navigate("/");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <p>Activating your account...</p>;
  if (status === "success")
    return <p>✅ Account activated! You can now log in.</p>;
  if (status === "already") return <p>ℹ️ Account already activated.</p>;
  if (status === "invalid")
    return <p>❌ Invalid or expired activation link.</p>;
  if (status === "error")
    return <p>⚠️ Something went wrong. Try again later.</p>;

  return null;
}
