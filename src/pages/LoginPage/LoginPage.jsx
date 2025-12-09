import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Wrapper,
  Card,
  Title,
  ErrorText,
  FooterText,
} from "./LoginPage.styles";

import { FormGroup, Label, Input } from "../../styles/form";

import { Button } from "../../styles/button";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  }

  return (
    <Wrapper>
      <Card onSubmit={submit}>
        <Title>Sign In</Title>

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

        {error && <ErrorText>{error}</ErrorText>}

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
          Dont have an account? <Link to="/register">Register</Link>
        </FooterText>
      </Card>
    </Wrapper>
  );
}
