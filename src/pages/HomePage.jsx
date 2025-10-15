// ProtectedRoute.jsx
import MainLayout from "../layouts/MainLayout.jsx";

export default function HomePage({ user, setUser }) {
  return (
    <MainLayout user={user} setUser={setUser}>
      <p>This is your home page.</p>
    </MainLayout>
  );
}
