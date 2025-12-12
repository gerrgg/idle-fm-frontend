import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

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

  useDocumentMeta({
    title: "Idle.fm — Create an Account",
    description:
      "Join Idle.fm and start building playlists that make people think you have great taste.",
    image: "https://idle.fm/default-auth-og.png",
    url: "https://idle.fm/register",
  });

  async function submit(e) {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Those passwords are broadcasting on different frequencies.");
      return;
    }

    const result = await dispatch(
      registerUser({ email, username, password, confirm })
    );

    // SUCCESS
    if (registerUser.fulfilled.match(result)) {
      toast.success(
        "Welcome aboard. Check your spam folder to activate your station."
      );
      navigate("/login?activation=sent");
      return;
    }

    if (registerUser.rejected.match(result)) {
      const message =
        result.payload ||
        "Registration failed. The system didn’t like that one.";
      toast.error(message);
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
            placeholder="Where should we send your VIP access?"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </FormGroup>

        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Your station handle..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Make it strong. Like… playlist-level strong."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </FormGroup>

        <FormGroup>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="Just to be sure..."
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
        </FormGroup>

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
