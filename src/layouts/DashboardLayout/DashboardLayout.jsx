import { useSelector } from "react-redux";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import BottomBar from "../../components/BottomBar";
import MainContent from "../../components/MainContent";
import { Wrapper, ContentArea } from "./DashboardLayout.styles.jsx";

import Dashboard from "../../pages/Dashboard";
import CreatePlaylistForm from "../../features/playlists/CreatePlaylistForm/CreatePlaylistForm.jsx";

export default function DashboardLayout({ children }) {
  const view = useSelector((state) => state.dashboard.view);

  function renderContent() {
    switch (view) {
      case "createPlaylist":
        return <CreatePlaylistForm />;
      default:
        return <Dashboard />;
    }
  }
  return (
    <Wrapper>
      <Sidebar />
      <ContentArea>
        <Topbar />
        <MainContent>{renderContent()}</MainContent>
        <BottomBar />
      </ContentArea>
    </Wrapper>
  );
}
