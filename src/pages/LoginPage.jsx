// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Gif from "../components/Gif.jsx";
import * as S from "./LoginPage.styles.jsx";

export default function LoginPage({ setUser }) {
  return (
    <MainLayout>
      <Gif tenorID={'yWVIOwocbVsAAAAC'} />
      <S.LoginPageWrapper>
        <S.Title>Login</S.Title>
        <LoginForm setUser={setUser} />
        <S.Paragraph>
          <a href="/register">Don't have an account? Register here</a>
        </S.Paragraph>
      </S.LoginPageWrapper>
    </MainLayout>
  );
}
