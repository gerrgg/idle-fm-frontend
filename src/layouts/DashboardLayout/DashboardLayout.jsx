import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import BottomBar from "../../components/BottomBar";
import MainContent from "../../components/MainContent";
import { Wrapper, ContentArea } from "./DashboardLayout.styles.jsx";
import { Outlet } from "react-router-dom";
import YouTubeAudioPlayer from "../../components/YoutubeAudioPlayer";
import { useState } from "react";
import Snowfall from "../../components/Christmas/Snowfall.jsx";
import { ChristmasLights } from "../../components/Christmas/ChristmasLights.jsx";

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
      <Snowfall
        count={150}
        color="rgba(255,255,255,0.9)"
        speed={[0.05, 0.2]}
        size={[1, 3]}
      />
      <ChristmasLights />
    </Wrapper>
  );
}
