// src/pages/DashboardHome.jsx
import ViewPlaylistGrid from "../../components/ViewPlaylistGrid/ViewPlaylistGrid";
import { Wrap, Section } from "./Dashboard.styles";
import { H1 } from "../../styles/typography";
import { selectMyPlaylists } from "../../store/selectors/playlistsSelectors.js";
import { useSelector } from "react-redux";

export default function DashboardHome() {
  const myPlaylists = useSelector(selectMyPlaylists);
  return (
    <Wrap>
      {myPlaylists.length && (
        <Section>
          <H1 mb="lg">My Playlists</H1>
          <ViewPlaylistGrid />
        </Section>
      )}
    </Wrap>
  );
}
