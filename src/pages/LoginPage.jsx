// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import Gif from "../components/Gif.jsx";
import * as S from "./AuthPage.styles.jsx";
import LoginForm from "../components/LoginForm.jsx";
import toast from "react-hot-toast";

export default function LoginPage({ setUser }) {
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");

  if (status === "error") {
    toast.error("Login failed. Please check your credentials.", {
      id: "login-error",
    });
  } else if (status === "already") {
    toast.success("Account already activated. Please log in.", {
      id: "account-already-activated",
    });
  } else {
    toast.success("Welcome back! Please log in to continue.", {
      id: "welcome-back",
    });
  }

  return (
    <MainLayout>
      <Gif tenorID={"yWVIOwocbVsAAAAC"} />
      <S.AuthWrapper>
        <S.AuthTitle>Login</S.AuthTitle>
        <LoginForm setUser={setUser} />
        <S.AuthLink to="/forgot-password">
          Forgot password? No worries.
        </S.AuthLink>
        <S.AuthLink to="/register">
          Don't have an account? Register here.
        </S.AuthLink>
      </S.AuthWrapper>
    </MainLayout>
  );
}
