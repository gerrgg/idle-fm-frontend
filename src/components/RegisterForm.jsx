// components/LoginForm.jsx
import { useState } from "react";
import { usersApi } from "../api/users.js";
import * as S from "./AuthForm.styles.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        id: "password-mismatch",
      });
      return;
    }

    try {
      await usersApi.create({ username, email, password });
      toast.success("Your in, go check your email to activate your account!", {
        id: "registration-success",
      });
      navigate("/login");
    } catch (error) {
      console.log("Registration error:", error);
      if (error.status === 400) {
        toast.error("Invalid input. Please check your details.", {
          id: "registration-invalid-input",
        });
      } else if (error.status === 409) {
        toast.error("Username or email already exists.", {
          id: "registration-conflict",
        });
      } else {
        toast.error(
          error.message || "Registration failed. Please try again later.",
          {
            id: "registration-failure",
          }
        );
      }
    }
  }

  return (
    <S.AuthForm onSubmit={handleSubmit}>
      <S.AuthFormGroup>
        <S.AuthLabel>Username</S.AuthLabel>
        <S.AuthInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin_override"
        />
      </S.AuthFormGroup>
      <S.AuthFormGroup>
        <S.AuthLabel>Email</S.AuthLabel>
        <S.AuthInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="backdoor@mainframe.net"
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
      <S.AuthFormGroup>
        <S.AuthLabel>Confirm Password</S.AuthLabel>
        <S.AuthInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="boot_sequence_pass"
        />
      </S.AuthFormGroup>
      <S.AuthButton>Login</S.AuthButton>
    </S.AuthForm>
  );
}
