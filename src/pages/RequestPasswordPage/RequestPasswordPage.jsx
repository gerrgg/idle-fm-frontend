import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateResetToken, resetPassword } from "../../store/authSlice";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Wrapper, Card, Title, FooterText } from "./RequestPasswordPage.styles";
import { FormGroup, Label, Input } from "../../styles/form";
import { Button } from "../../styles/button";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.auth);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [validating, setValidating] = useState(true);
  const [valid, setValid] = useState(false);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useDocumentMeta({
    title: "Idle.fm — Reset Your Password",
    description:
      "You're almost back in. Choose a new password and continue curating.",
    image: "https://idle.fm/default-auth-og.png",
    url: `https://idle.fm/reset-password?token=${token || ""}`,
  });

  useEffect(() => {
    if (!token) {
      navigate("/reset-invalid");
      return;
    }

    async function check() {
      const result = await dispatch(validateResetToken({ token }));

      if (validateResetToken.fulfilled.match(result)) {
        setValid(true);
      } else {
        navigate("/reset-invalid");
      }

      setValidating(false);
    }

    check();
  }, [token]);

  async function submit(e) {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Those passwords aren’t on the same wavelength.");
      return;
    }

    const result = await dispatch(resetPassword({ token, password }));

    if (resetPassword.fulfilled.match(result)) {
      toast.success("Password updated. Signal restored.");
      navigate("/login");
      return;
    }

    toast.error(
      result.payload?.error || "Reset failed. Channel interference detected."
    );
  }

  if (validating) {
    return (
      <Wrapper>
        <Card>
          <Title>Validating…</Title>
        </Card>
      </Wrapper>
    );
  }

  if (!valid) return null;

  return (
    <Wrapper>
      <Card onSubmit={submit}>
        <Title>Choose a New Password</Title>

        <FormGroup>
          <Label>New Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </FormGroup>

        <Button
          type="submit"
          size="lg"
          variant="solid"
          disabled={loading}
          style={{ marginTop: "12px" }}
        >
          {loading ? "Updating…" : "Reset Password"}
        </Button>

        <FooterText>
          <Link to="/login">Return to login</Link>
        </FooterText>
      </Card>
    </Wrapper>
  );
}
