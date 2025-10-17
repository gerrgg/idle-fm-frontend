// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import Gif from "../components/Gif.jsx";
import * as S from "./AuthPage.styles.jsx";
import RequestPasswordResetForm from "../components/RequestPasswordResetForm.jsx";

export default function ForgotPasswordPage() {
  return (
    <MainLayout>
      <Gif tenorID={'yWVIOwocbVsAAAAC'} />
      <S.AuthWrapper>
        <S.AuthTitle>Forgot Password?</S.AuthTitle>
        <RequestPasswordResetForm />
        <S.AuthLink to="/login">Remember your password? Login here.</S.AuthLink>
        <S.AuthLink to="/register">
          Don't have an account? Register here.
        </S.AuthLink>
      </S.AuthWrapper>
    </MainLayout>
  );
}
