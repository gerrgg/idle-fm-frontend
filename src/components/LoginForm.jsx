// components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.js";
import toast from "react-hot-toast";
import * as S from "./AuthForm.styles.jsx";

export default function LoginForm({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await authApi.login(email, password);
      setUser(data.user);
      toast.success(data.message || "Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  }

  return (
    <S.AuthForm onSubmit={handleSubmit}>
      <S.AuthFormGroup>
        <S.AuthLabel>Email</S.AuthLabel>
        <S.AuthInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="root@localhost"
        />
      </S.AuthFormGroup>
      <S.AuthFormGroup>
        <S.AuthLabel>Password</S.AuthLabel>
        <S.AuthInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="boot_sequence_pass"
        />
      </S.AuthFormGroup>
      <S.AuthButton>Login</S.AuthButton>
    </S.AuthForm>
  );
}
