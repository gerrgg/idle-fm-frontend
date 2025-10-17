// components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.js";
import * as S from "./AuthForm.styles.jsx";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
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
    <S.AuthForm onSubmit={handleSubmit}>
      <S.AuthFormGroup>
        <S.AuthLabel>Email</S.AuthLabel>
        <S.AuthInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@aolaccess.net"
        />
      </S.AuthFormGroup>
      <S.AuthButton>Send Reset Link</S.AuthButton>
    </S.AuthForm>
  );
}
