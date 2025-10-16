// ProtectedRoute.jsx
import MainLayout from "../layouts/MainLayout.jsx";

export default function HomePage({ user, handleLogout }) {
  return (
    <MainLayout user={user} handleLogout={handleLogout}>
      <p>This is your home page.</p>
    </MainLayout>
  );
}
