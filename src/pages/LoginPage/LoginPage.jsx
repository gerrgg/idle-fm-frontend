import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { Wrapper, Card, Title, FooterText } from "./LoginPage.styles";

import { FormGroup, Label, Input } from "../../styles/form";
import { Button } from "../../styles/button";

import { LogoWrapper, LogoText } from "../../components/Sidebar/Sidebar.styles";
import { Logo } from "../../components/Logo";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    // SUCCESS
    if (loginUser.fulfilled.match(result)) {
      toast.success("Welcome back!");
      navigate("/");
      return;
    }

    // ERROR
    if (loginUser.rejected.match(result)) {
      const message =
        result.payload?.error || result.error?.message || "Login failed.";

      toast.error(message);
    }
  }

  useDocumentMeta({
    title: "Idle.fm — Log In",
    description:
      "Sign back in and pick up where you left off. Your playlists missed you.",
    image: "https://idle.fm/default-auth-og.png",
    url: "https://idle.fm/login",
  });

  return (
    <Wrapper>
      <Card onSubmit={submit}>
        <LogoWrapper gap="xs" align="flex-end" onClick={() => navigate("/")}>
          <Logo width="36" height="36" />
          <LogoText>idle.fm</LogoText>
        </LogoWrapper>

        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <Button
          type="submit"
          size="lg"
          variant="solid"
          disabled={loading}
          style={{ marginTop: "12px" }}
        >
          {loading ? "Logging in…" : "Login"}
        </Button>

        <FooterText>
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            Forgot your password?<Link to="/forgot-password">Click Here</Link>
          </p>
        </FooterText>
      </Card>
    </Wrapper>
  );
}
