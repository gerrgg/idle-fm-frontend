// layouts/Header.jsx
import { forwardRef } from "react";
import { Container } from "../styles/Layout";
import Logo from "../assets/logo.png";
import * as S from "./Header.styles.jsx";

const Header = forwardRef(({ user, handleLogout }, ref) => {
  return (
    <S.HeaderWrapper ref={ref}>
      <S.Logo
        src={Logo}
        alt="Idle FM Logo"
        className="logo"
        width={100}
        height={100}
      />
      {user && (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </S.HeaderWrapper>
  );
});

export default Header;
