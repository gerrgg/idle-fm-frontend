// layouts/MainLayout.jsx
import Header from "./Header.jsx";
import { Container } from "../styles/Layout";
import Footer from "./Footer.jsx";
import { styled } from "styled-components";
import { useState, useEffect, useRef } from "react";
import Lines from "../components/Lines.jsx";

export const Body = styled(Container)`
  padding: 2rem;
  // height: 100vh;
  // padding-top: ${({ headerheight }) => headerheight}px;
  // padding-bottom: ${({ footerheight }) => footerheight}px;
`;

export default function MainLayout({ user, handleLogout, children }) {
  const headerRef = useRef();
  const footerRef = useRef();

  const [headerHeight, setHeaderHeight] = useState(window.innerHeight);
  const [footerHeight, setFooterHeight] = useState(window.innerHeight);
  const [lowPowerMode, setLowPowerMode] = useState(false);

  useEffect(() => {
    function updateHeight() {
      const headerH = headerRef?.current?.offsetHeight || 0;
      const footerH = footerRef?.current?.offsetHeight || 0;
      setHeaderHeight(headerH);
      setFooterHeight(footerH);
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [headerRef, footerRef]);

  return (
    <div className="app">
      {!lowPowerMode ? <Lines /> : null}
      <Header ref={headerRef} user={user} handleLogout={handleLogout} />
      <Body headerheight={headerHeight} footerheight={footerHeight}>
        {children}
      </Body>
      <Footer ref={footerRef}>Footer</Footer>
    </div>
  );
}
