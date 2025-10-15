// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

export default function RegisterPage() {
  return (
    <MainLayout>
      <div>
        <h1>Register</h1>
        <RegisterForm />
        <a href="/login">Already have an account? Login here</a>
      </div>
    </MainLayout>
  );
}
