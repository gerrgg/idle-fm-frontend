import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Static from "./Static.jsx";

export function PageTransitionWrapper({ children }) {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timeout = setTimeout(() => setTransitioning(false), 400);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {children}
      <Static ready={!transitioning} />
    </>
  );
}
