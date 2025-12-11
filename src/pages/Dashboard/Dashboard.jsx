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
import { capitalize } from "../../utils/capitalize.js";

export default function DashboardHome() {
  const user = useSelector((s) => s.auth.user);
  const allTags = useSelector((state) => state.tagsEntities?.byId || {});
  const publicPlaylists = useSelector(selectPublicPlaylists);
  const myPlaylists = useSelector(selectMyPlaylists);

  console.log(myPlaylists);

  // -------------------------------
  // GLOBAL DEDUPE MECHANISM
  // -------------------------------
  const shown = new Set();

  function unique(list) {
    return list.filter((p) => {
      if (shown.has(p.id)) return false;
      shown.add(p.id);
      return true;
    });
  }

  // -------------------------------
  // TAG → PLAYLISTS LOOKUP
  // -------------------------------
  const playlistsByTag = {};

  publicPlaylists.forEach((p) => {
    (p.tagIds || []).forEach((tagId) => {
      if (!playlistsByTag[tagId]) playlistsByTag[tagId] = [];
      playlistsByTag[tagId].push(p);
    });
  });

  // -------------------------------
  // FAVORITE TAGS (from user's playlists)
  // -------------------------------
  const favoriteTagIds = [
    ...new Set(myPlaylists.flatMap((p) => p.tagIds || [])),
  ];

  const recommendedSelector =
    makeSelectRecommendedPlaylistsByTags(favoriteTagIds);

  const recommendedPlaylists = useSelector(recommendedSelector);

  // -------------------------------
  // TAG SECTIONS
  // -------------------------------
  const MIN_PLAYLISTS_PER_TAG_SECTION = 3;

  const tagSectionsRaw = Object.entries(playlistsByTag)
    .filter(([tagId, list]) => list.length >= MIN_PLAYLISTS_PER_TAG_SECTION)
    .map(([tagId, list]) => ({
      tagId,
      tagName: allTags[tagId]?.name,
      playlists: list,
    }))
    .filter((section) => !!section.tagName);

  // ---- Popularity Scoring ----
  function score(p) {
    const views = p.views || 0;
    const likes = p.likes || 0;
    const shares = p.shares || 0;
    return views + likes * 5 + shares * 10;
  }

  function sortByPopularity(list) {
    return [...list].sort((a, b) => score(b) - score(a));
  }

  // ---- Apply Sorting + Dedupe ----
  const uniqueMyPlaylists = unique(sortByPopularity(myPlaylists));

  const uniqueRecommendedPlaylists = unique(
    sortByPopularity(recommendedPlaylists)
  );

  const dedupedTagSections = tagSectionsRaw
    .map((section) => ({
      ...section,
      playlists: unique(sortByPopularity(section.playlists)),
    }))
    .filter((section) => section.playlists.length > 0);

  const youMayAlsoLike = publicPlaylists.filter((p) => !shown.has(p.id));

  // -------------------------------
  // SEO META
  // -------------------------------
  const title = "Idle.fm — You're Not Procrastinating, You're Curating";
  const description =
    "Build playlists, revisit old favorites, and pretend you're being productive. Your Idle.fm dashboard keeps everything tuned in.";
  const image = "https://idle.fm/default-dashboard-og.png";
  const url = "https://idle.fm/dashboard";

  useDocumentMeta({ title, description, image, url });

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <Wrap>
      {/* MY PLAYLISTS */}
      {uniqueMyPlaylists.length > 0 && (
        <Section>
          <H1 mb="lg">My Playlists</H1>
          <ViewPlaylistGrid playlists={uniqueMyPlaylists.slice(0, 12)} />
        </Section>
      )}

      {/* RECOMMENDED */}
      {uniqueRecommendedPlaylists.length > 0 && (
        <Section>
          <H1 mb="lg">Popular Playlists</H1>
          <ViewPlaylistGrid
            playlists={uniqueRecommendedPlaylists.slice(0, 4)}
          />
        </Section>
      )}

      {/* TAG-BASED SECTIONS */}
      {dedupedTagSections.map(({ tagId, tagName, playlists }) => (
        <Section key={tagId}>
          <H1 mb="lg">{capitalize(tagName)} Playlists</H1>
          <ViewPlaylistGrid playlists={playlists} />
        </Section>
      ))}

      {youMayAlsoLike.length > 0 && (
        <Section>
          <H1 mb="lg">You May Also Like</H1>
          <ViewPlaylistGrid playlists={youMayAlsoLike} />
        </Section>
      )}
    </Wrap>
  );
}
