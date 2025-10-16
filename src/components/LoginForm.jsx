// components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.js";
import * as S from "./LoginForm.styles.jsx";

export default function LoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await authApi.login(email, password);
      setUser(data.user ?? true);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.FormGroup>
        <S.Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
      </S.FormGroup>
      <S.FormGroup>
        <S.Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </S.FormGroup>
      <S.Button>Login</S.Button>
    </S.Form>
  );
}
