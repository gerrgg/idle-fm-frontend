// src/pages/Dashboard/DashboardHome.jsx
import { useSelector } from "react-redux";
import { H1 } from "../../styles/typography";
import { Wrap, Section } from "./Dashboard.styles";
import ViewPlaylistGrid from "../../components/ViewPlaylistGrid";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";

import { selectMyPlaylists } from "../../store/selectors/playlistsSelectors";
import {
  selectPublicPlaylists,
  makeSelectRecommendedPlaylistsByTags,
} from "../../store/selectors/playlistsSelectors";

export default function DashboardHome() {
  const user = useSelector((s) => s.auth.user);

  const myPlaylists = useSelector(selectMyPlaylists);

  // Collect all tag IDs from user's playlists
  const favoriteTagIds = [
    ...new Set(myPlaylists.flatMap((p) => p.tagIds || [])),
  ];

  const recommendedSelector =
    makeSelectRecommendedPlaylistsByTags(favoriteTagIds);
  const recommendedPlaylists = useSelector(recommendedSelector);

  const publicPlaylists = useSelector(selectPublicPlaylists);

  const title = "Idle.fm — You're Not Procrastinating, You're Curating";
  const description =
    "Build playlists, revisit old favorites, and pretend you're being productive. Your Idle.fm dashboard keeps everything tuned in.";
  const image = "https://idle.fm/default-dashboard-og.png";
  const url = "https://idle.fm/dashboard";

  useDocumentMeta({ title, description, image, url });

  return (
    <Wrap>
      {/* ------------------------- */}
      {/* MY PLAYLISTS */}
      {/* ------------------------- */}
      {myPlaylists.length > 0 && (
        <Section>
          <H1 mb="lg">My Playlists</H1>
          <ViewPlaylistGrid playlists={myPlaylists.slice(0, 12)} />
        </Section>
      )}

      {/* ------------------------- */}
      {/* RECOMMENDED FOR YOU */}
      {/* ------------------------- */}
      {recommendedPlaylists.length > 0 && (
        <Section>
          <H1 mb="lg">Recommended For You</H1>
          <ViewPlaylistGrid playlists={recommendedPlaylists} />
        </Section>
      )}

      {/* ------------------------- */}
      {/* CURATED COLLECTIONS */}
      {/* Only show if recommended is empty OR always, your choice */}
      {/* ------------------------- */}
      {publicPlaylists.length > 0 && (
        <Section>
          <H1 mb="lg">Curated Playlists</H1>
          <ViewPlaylistGrid playlists={publicPlaylists} />
        </Section>
      )}
    </Wrap>
  );
}
