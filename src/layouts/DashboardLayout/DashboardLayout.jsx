import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import BottomBar from "../../components/BottomBar";
import MainContent from "../../components/MainContent";
import { Wrapper, ContentArea } from "./DashboardLayout.styles.jsx";

export default function DashboardLayout({ children }) {
  return (
    <Wrapper>
      <Sidebar />

      <ContentArea>
        <Topbar />
        {children}
        <BottomBar />
      </ContentArea>
    </Wrapper>
  );
}
