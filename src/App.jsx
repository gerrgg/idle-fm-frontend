import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./theme";

import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import EditPlaylist from "./pages/EditPlaylist/EditPlaylist";

import ThemedToaster from "./components/ThemedToaster";
import YouTubeAudioPlayer from "./components/YoutubeAudioPlayer";

import DashboardLayout from "./layouts/DashboardLayout/";
import DashboardHome from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/LoginPage";

import { useEffect } from "react";

import { loadSession } from "./store/authSlice";
import { fetchUserPlaylistsNormalized } from "./store/playlistThunksNormalized";

import ViewPlaylist from "./pages/ViewPlaylist/ViewPlaylist";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  useEffect(() => {
    dispatch(loadSession());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPlaylistsNormalized(user.id));
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/playlists/:id/edit" element={<EditPlaylist />} />
            <Route path="/playlist/:id" element={<ViewPlaylist />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ThemedToaster />
      <YouTubeAudioPlayer />
    </ThemeProvider>
  );
}
