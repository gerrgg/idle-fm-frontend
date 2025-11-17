import { Wrapper } from "./Dashboard.styles.jsx";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout.jsx";
import { useSelector } from "react-redux";
import { H1, H2 } from "../../styles/typography.js";

export default function Dashboard() {
  const { user, loading } = useSelector((state) => state.auth);
  const view = useSelector((state) => state.dashboard.view);

  return (
    <>
      {!user && loading !== "init" ? (
        <H1>Your not logged in</H1>
      ) : (
        <H1 as="h2">Welcome back, {user?.username}!</H1>
      )}
    </>
  );
}
