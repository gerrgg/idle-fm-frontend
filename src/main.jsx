import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { loadSession } from "./store/authSlice";
import App from "./App";
import Loader from "./components/Loader/Loader";
import { theme } from "./theme";

function AppWrapper() {
  const dispatch = useDispatch();
  const { sessionLoaded } = useSelector((state) => state.auth); // Add this to your auth slice

  useEffect(() => {
    dispatch(loadSession());
  }, [dispatch]);

  if (!sessionLoaded) {
    return (
      <Loader
        bgColor={theme.colors.surface2}
        fgColor={theme.colors.accentAlt}
      />
    );
  }

  return <App />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </React.StrictMode>
);
