// components/LoginForm.jsx
import { useState } from "react";
import { usersApi } from "../api/users.js";
import * as S from "./RegisterForm.styles.jsx";

export default function RegisterForm() {
  const [username, setUsername] = useState("gregorybastianelli");
  const [email, setEmail] = useState("admin@idle.fm");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const user = await usersApi.create({ username, email, password });
      alert("Registration successful!");
      // Optionally redirect or update state here
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.FormGroup>
        <S.Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
      </S.FormGroup>
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
      <S.FormGroup>
        <S.Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
        />
      </S.FormGroup>

      <S.Button>Login</S.Button>
    </S.Form>
  );
}
