import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from "../../store/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import {
  Wrapper,
  Card,
  Title,
  FooterText,
} from "./RequestPasswordResetPage.styles";
import { FormGroup, Label, Input } from "../../styles/form";
import { Button } from "../../styles/button";

export default function RequestPasswordResetPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");

  useDocumentMeta({
    title: "Idle.fm — Forgot Password",
    description:
      "Happens to everyone. Enter your email and we’ll help you get back in.",
    image: "https://idle.fm/default-auth-og.png",
    url: "https://idle.fm/forgot-password",
  });

  async function submit(e) {
    e.preventDefault();

    const result = await dispatch(requestPasswordReset({ email }));

    if (requestPasswordReset.fulfilled.match(result)) {
      toast.success("If that email exists, a reset link is on the airwaves.");
      return;
    }

    if (requestPasswordReset.rejected.match(result)) {
      const message = result.payload?.error || result.error?.message;

      toast.error(message || "Transmission failed. Couldn’t send reset link.");
    }
  }

  return (
    <Wrapper>
      <Card onSubmit={submit}>
        <Title>Reset Your Password</Title>

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

        <Button
          type="submit"
          size="lg"
          variant="solid"
          disabled={loading}
          style={{ marginTop: "12px" }}
        >
          {loading ? "Sending…" : "Send Reset Link"}
        </Button>

        <FooterText>
          <Link to="/login">Return to login</Link>
        </FooterText>
      </Card>
    </Wrapper>
  );
}
