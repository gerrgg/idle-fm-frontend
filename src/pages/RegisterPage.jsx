// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import * as S from "./AuthPage.styles.jsx";
import Gif from "../components/Gif.jsx";

export default function RegisterPage() {
  return (
    <MainLayout>
      <Gif tenorID={'yWVIOwocbVsAAAAC'} />
      <S.AuthWrapper>
        <S.AuthTitle>Register</S.AuthTitle>
        <RegisterForm />
        <S.AuthLink to="/login">Already have an account? Login here.</S.AuthLink>
      </S.AuthWrapper>
    </MainLayout>
  );
}
