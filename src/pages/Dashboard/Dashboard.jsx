// src/pages/DashboardHome.jsx
import ViewPlaylistGrid from "../../components/ViewPlaylistGrid/ViewPlaylistGrid";
import { Wrap, Section } from "./Dashboard.styles";
import { H1 } from "../../styles/typography";

export default function DashboardHome() {
  return (
    <Wrap>
      <Section>
        <H1 mb="lg">My Playlists</H1>
        <ViewPlaylistGrid />
      </Section>
    </Wrap>
  );
}
