import { Wrapper } from "./LogoutButton.styles.jsx";

export default function LogoutButton() {
  return (
    <Button size="lg" variant="solid" onClick={handleLogout}>
      Log Out
    </Button>
  );
}
