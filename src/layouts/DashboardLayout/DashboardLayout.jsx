import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import BottomBar from "../../components/BottomBar";
import MainContent from "../../components/MainContent";
import { Wrapper, ContentArea } from "./DashboardLayout.styles.jsx";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <Wrapper>
      <Sidebar />

      <ContentArea>
        <Topbar />

        <MainContent>
          <Outlet /> {/* Router-selected page goes here */}
        </MainContent>

        <BottomBar />
      </ContentArea>
      <YouTubeAudioPlayer />
    </Wrapper>
  );
}
