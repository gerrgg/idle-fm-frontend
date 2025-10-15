// layouts/MainLayout.jsx
import Header from "./Header.jsx";

export default function MainLayout({ user, setUser, children }) {
  return (
    <div className="app">
      <Header user={user} setUser={setUser} />
      <main style={{ padding: "2rem" }}>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
