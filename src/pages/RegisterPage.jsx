// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import * as S from "./RegisterPage.styles.jsx";

export default function RegisterPage() {
  return (
    <MainLayout>
      <S.RegisterPageWrapper>
        <h1>Register</h1>
        <RegisterForm />
        <a href="/login">Already have an account? Login here</a>
      </S.RegisterPageWrapper>
    </MainLayout>
  );
}
