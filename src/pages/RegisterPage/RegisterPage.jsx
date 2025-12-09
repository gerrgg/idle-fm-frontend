import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

import {
  Wrapper,
  Card,
  Title,
  ErrorText,
  FooterText,
} from "./RegisterPage.styles";

import { FormGroup, Label, Input } from "../../styles/form";

import { Button } from "../../styles/button";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    const result = await dispatch(
      registerUser({ email, username, password, confirm })
    );

    if (registerUser.fulfilled.match(result)) {
      navigate("/login?activation=sent");
    }
  }

  return (
    <Wrapper>
      <Card onSubmit={submit}>
        <Title>Create Account</Title>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </FormGroup>

        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </FormGroup>

        <FormGroup>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
        </FormGroup>

        {error && <ErrorText>{error}</ErrorText>}

        <Button
          type="submit"
          variant="solid"
          size="lg"
          disabled={loading}
          style={{ marginTop: "12px" }}
        >
          {loading ? "Creating account…" : "Register"}
        </Button>

        <FooterText>
          Already have an account? <Link to="/login">Sign in</Link>
        </FooterText>
      </Card>
    </Wrapper>
  );
}
