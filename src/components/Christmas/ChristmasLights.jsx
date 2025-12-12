import styled from "styled-components";
import { useState, useEffect } from "react";

export const Bulb = styled.div`
  width: 8px;
  height: 12px;
  border-radius: 8px;
  box-shadow: 0 0 12px currentColor;
  animation: pulse 1.2s infinite ease-in-out;

  &:nth-of-type(4n + 1) {
    background: #ff174d;
    color: #ff174d;
  }

  &:nth-of-type(4n + 2) {
    background: #39ff14;
    color: #39ff14;
  }

  &:nth-of-type(4n + 3) {
    background: #00e5ff;
    color: #00e5ff;
  }

  &:nth-of-type(4n + 4) {
    background: #ffea00;
    color: #ffea00;
  }

  /* Mobile styles */
  @media (max-width: 900px) {
    width: 8px;
    height: 12px;
    box-shadow: 0 0 8px currentColor;
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1px 0;
  pointer-events: none;
  z-index: 9999;

  /* Mobile adjustments */
  @media (max-width: 600px) {
    justify-content: space-around;
  }
`;

export function ChristmasLights() {
  const [count, setCount] = useState(getBulbCount());

  function getBulbCount() {
    const w = window.innerWidth;

    if (w < 500) return 12;
    if (w < 800) return 20;
    if (w < 1200) return 30;
    return 40;
  }

  useEffect(() => {
    const handleResize = () => {
      setCount(getBulbCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Wrapper>
      {Array.from({ length: count }).map((_, i) => (
        <Bulb key={i} />
      ))}
    </Wrapper>
  );
}
