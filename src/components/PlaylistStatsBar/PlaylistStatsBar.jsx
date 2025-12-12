// src/components/Playlist/PlaylistStatsBar.jsx
import { useDispatch, useSelector } from "react-redux";
import {
  togglePlaylistLikeNormalized,
  incrementPlaylistShare,
} from "../../store/playlistThunksNormalized";

import {
  Bar,
  StatItem,
  StatNumber,
  LikeButton,
  ShareButton,
} from "./PlaylistStatsBar.styles";

import { toast } from "react-hot-toast";

export default function PlaylistStatsBar({ playlist }) {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const handleLike = () => {
    dispatch(togglePlaylistLikeNormalized(playlist.id));
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/playlist/${playlist.id}`
    );

    dispatch(incrementPlaylistShare(playlist.id));
    toast.success("Copied. Go share the vibe.");
  };

  return (
    <Bar>
      {/* Views */}
      <StatItem>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path fill="currentcolor" d="M3 22v-20l18 10-18 10z" />
        </svg>
        <StatNumber>{playlist.views ?? 0}</StatNumber>
      </StatItem>

      {/* Likes */}
      {user && (
        <StatItem>
          <LikeButton
            liked={playlist.likedByUser}
            onClick={handleLike}
            aria-label="Like playlist"
          >
            {playlist.likedByUser ? (
              // Filled heart
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 
                   5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                   4.5 2.09C13.09 3.81 14.76 3 16.5 
                   3C19.58 3 22 5.42 22 8.5c0 
                   3.78-3.4 6.86-8.55 11.54L12 
                   21.35z"
                />
              </svg>
            ) : (
              // Outline heart
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M16.5 3c-1.74 0-3.41.81-4.5 
                   2.09A6.437 6.437 0 0 0 7.5 
                   3A6.507 6.507 0 0 0 1 
                   9.5c0 3.78 3.4 6.86 8.55 
                   11.54L12 21.35l2.45-2.31C19.6 
                   16.36 23 13.28 23 9.5A6.507 
                   6.507 0 0 0 16.5 3zm-4.4 
                   16.55l-.1.1l-.1-.1C7.14 
                   15.24 4 12.39 4 9.5A3.5 
                   3.5 0 0 1 7.5 6A4.48 4.48 
                   0 0 1 12 9a4.48 4.48 0 0 1 
                   4.5-3A3.5 3.5 0 0 1 20 
                   9.5c0 2.89-3.14 5.74-7.9 
                   10.05z"
                />
              </svg>
            )}
          </LikeButton>
          <StatNumber>{playlist.likes ?? 0}</StatNumber>
        </StatItem>
      )}

      {/* Shares */}
      <StatItem>
        <ShareButton onClick={handleShare} aria-label="Share playlist">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 
                 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.02-4.11A3 
                 3 0 1 0 14 5a2.98 2.98 0 0 0 .09.7L7.07 9.81A3 
                 3 0 1 0 7 15c0-.24.04-.47.09-.7l7.11 4.15A3 
                 3 0 1 0 18 16.08z"
            />
          </svg>
        </ShareButton>
        <StatNumber>{playlist.shares ?? 0}</StatNumber>
      </StatItem>
    </Bar>
  );
}
