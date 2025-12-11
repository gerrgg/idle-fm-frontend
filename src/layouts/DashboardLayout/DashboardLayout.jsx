import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import BottomBar from "../../components/BottomBar";
import MainContent from "../../components/MainContent";
import { Wrapper, ContentArea } from "./DashboardLayout.styles.jsx";
import { Outlet } from "react-router-dom";
import YouTubeAudioPlayer from "../../components/YoutubeAudioPlayer";
import { useState } from "react";

export default function DashboardLayout() {
  const [collapse, setCollapse] = useState(true);

  return (
    <Wrapper>
      <Sidebar collapse={collapse} setCollapse={setCollapse} />

      <ContentArea>
        <Topbar collapse={collapse} />

        <MainContent collapse={collapse}>
          <Outlet /> {/* Router-selected page goes here */}
        </MainContent>

        <BottomBar />
      </ContentArea>
      <YouTubeAudioPlayer />
    </Wrapper>
  );
}
