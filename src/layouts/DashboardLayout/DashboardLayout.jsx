import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import BottomBar from "../../components/BottomBar";
import MainContent from "../../components/MainContent";
import { Wrapper, ContentArea } from "./DashboardLayout.styles.jsx";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPlaylistById } from "../../store/playlistSlice";
import { startPlayback } from "../../store/playerSlice";

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
    </Wrapper>
  );
}
