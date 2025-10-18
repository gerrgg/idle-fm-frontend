// components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.js";
import * as S from "./AuthForm.styles.jsx";
import toast from "react-hot-toast";

export default function ResetPasswordForm({ token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match", {
          id: "password-mismatch",
        });
        return;
      }

      await authApi.resetPassword(token, password);
      toast.success("Password reset successful", {
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
        <S.AuthLabel>New Password</S.AuthLabel>
        <S.AuthInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="boot_sequence_pass"
        />
      </S.AuthFormGroup>
      <S.AuthFormGroup>
        <S.AuthLabel>Confirm New Password</S.AuthLabel>
        <S.AuthInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="boot_sequence_pass"
        />
      </S.AuthFormGroup>
      <S.AuthButton>Reset Password</S.AuthButton>
    </S.AuthForm>
  );
}
