// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import LoginForm from "../components/LoginForm.jsx";

export default function LoginPage({ setUser }) {
  return (
    <MainLayout>
      <div>
        <h1>Login</h1>
        <LoginForm setUser={setUser} />
        <a href="/register">Don't have an account? Register here</a>
      </div>
    </MainLayout>
  );
}
