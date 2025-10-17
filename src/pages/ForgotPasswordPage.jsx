// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import Gif from "../components/Gif.jsx";
import * as S from "./AuthPage.styles.jsx";
import ForgotPasswordForm from "../components/ForgotPasswordForm.jsx";

export default function ForgotPasswordPage() {
  return (
    <MainLayout>
      <Gif tenorID={'yWVIOwocbVsAAAAC'} />
      <S.AuthWrapper>
        <S.AuthTitle>Forgot Password?</S.AuthTitle>
        <ForgotPasswordForm />
        <S.AuthLink to="/login">Remember your password? Login here.</S.AuthLink>
        <S.AuthLink to="/register">
          Don't have an account? Register here.
        </S.AuthLink>
      </S.AuthWrapper>
    </MainLayout>
  );
}
