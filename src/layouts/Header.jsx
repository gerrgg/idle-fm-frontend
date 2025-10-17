// layouts/Header.jsx
import { forwardRef } from "react";
import { Container } from "../styles/Layout";
import Logo from "../assets/logo.png";
import * as S from "./Header.styles.jsx";
import { Link } from "react-router-dom";

const Header = forwardRef(({ user, handleLogout }, ref) => {
  return (
    <S.HeaderWrapper ref={ref}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <S.Logo
          src={Logo}
          alt="Idle FM Logo"
          className="logo"
          width={100}
          height={100}
        />
      </Link>
      {user && (
        <>
          <S.LogoutButton onClick={handleLogout}>Logout</S.LogoutButton>
        </>
      )}
      <S.AddPlaylistButton to={"/create-playlist"}>Add</S.AddPlaylistButton>
    </S.HeaderWrapper>
  );
});

export default Header;
