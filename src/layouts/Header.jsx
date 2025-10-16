// layouts/Header.jsx
import { forwardRef } from "react";
import { Container } from "../styles/Layout";
import Logo from "../assets/logo.png";

const Header = forwardRef(({ user, handleLogout }, ref) => {
  return (
    <Container ref={ref}>
      <div className="logo-wrapper">
        <img
          src={Logo}
          alt="Idle FM Logo"
          className="logo"
          width={100}
          height={100}
        />
      </div>
      {user && (
        <>
          <p>Welcome, {user.username}!</p>
          <p>
            <button onClick={handleLogout}>Logout</button>
          </p>
        </>
      )}
    </Container>
  );
});

export default Header;
