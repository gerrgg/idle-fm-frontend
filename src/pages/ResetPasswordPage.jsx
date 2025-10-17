import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Gif from "../components/Gif.jsx";
import * as S from "./AuthPage.styles.jsx";
import ResetPasswordForm from "../components/ResetPasswordForm.jsx";
import toast from "react-hot-toast";
import { authApi } from "../api/auth.js";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      try {
        const data = await authApi.validateResetToken(token);
        if(data.valid) {
          setValid(true);
        }
      } catch (err) {
        toast.error(err.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    if (token) checkToken();
    else navigate("/login");
  }, [token, navigate]);

  if (loading) return null;

  return (
    <MainLayout>
      <Gif tenorID={"yWVIOwocbVsAAAAC"} />
      <S.AuthWrapper>
        <S.AuthTitle>Reset Password</S.AuthTitle>
        {valid ? <ResetPasswordForm token={token} /> : null}
      </S.AuthWrapper>
    </MainLayout>
  );
}
