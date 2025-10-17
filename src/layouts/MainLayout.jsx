// layouts/MainLayout.jsx
import Header from "./Header.jsx";
import { Container } from "../styles/Layout";
import Footer from "./Footer.jsx";
import { styled } from "styled-components";
import { useState, useEffect, useRef } from "react";
import Lines from "../components/Lines.jsx";

export const Body = styled(Container)`
  height: 100vh;
  padding-top: ${({ minheight }) => minheight}px;
`;

export default function MainLayout({ user, handleLogout, children }) {
  const headerRef = useRef();
  const footerRef = useRef();

  const [minHeight, setMinHeight] = useState(window.innerHeight);
  const [lowPowerMode, setLowPowerMode] = useState(false);

  useEffect(() => {
    function updateHeight() {
      const headerH = headerRef?.current?.offsetHeight || 0;
      const footerH = footerRef?.current?.offsetHeight || 0;
      setMinHeight(headerH);
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [headerRef, footerRef]);

  return (
    <div className="app">
      {
        ! lowPowerMode ? <Lines /> : null
      }
      <Header ref={headerRef} user={user} handleLogout={handleLogout} />
      <Body minheight={minHeight}>{children}</Body>
      <Footer ref={footerRef}>Footer</Footer>
    </div>
  );
}
