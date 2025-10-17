// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import * as S from "./CreatePlaylistPage.styles.jsx";
import Gif from "../components/Gif.jsx";
import CreatePlaylistForm from "../components/CreatePlaylistForm.jsx";

export default function CreatePlaylistPage() {
  return (
    <MainLayout>
      <Gif tenorID={"yWVIOwocbVsAAAAC"} />
      <S.CreatePlaylistWrapper>
        <S.CreatePlaylistFormWrapper>
          <S.CreatePlaylistTitle>Create Playlist</S.CreatePlaylistTitle>
          <CreatePlaylistForm />
        </S.CreatePlaylistFormWrapper>
        <S.CreatePlaylistVideosWrapper>
          {/* Videos component would go here */}
        </S.CreatePlaylistVideosWrapper>
      </S.CreatePlaylistWrapper>
    </MainLayout>
  );
}
