// components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.js";
import * as S from "./AuthForm.styles.jsx";
import toast from "react-hot-toast";

export default function RequestPasswordResetForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!email) {
        toast.error("Email is required", {
          id: "email-required",
        });
        return;
      }
      const data = await authApi.forgotPassword(email);
      toast.success(data.message || "Password reset link sent", {
        id: "password-reset-success",
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Failed to send reset link", {
        id: "password-reset-error",
      });
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
