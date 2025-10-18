// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import * as S from "./CreatePlaylistPage.styles.jsx";
import Gif from "../components/Gif.jsx";
import EditPlaylistForm from "../components/EditPlaylistForm.jsx";

export default function EditPlaylistPage() {
  return (
    <MainLayout>
      <Gif tenorID={"yWVIOwocbVsAAAAC"} />
      <S.CreatePlaylistWrapper>
        <S.CreatePlaylistFormWrapper>
          <S.CreatePlaylistTitle>Add Videos</S.CreatePlaylistTitle>
          {/* add videos form */}
          <S.CreatePlaylistTitle>Edit Playlist</S.CreatePlaylistTitle>
          <EditPlaylistForm />
        </S.CreatePlaylistFormWrapper>
        <S.CreatePlaylistVideosWrapper>
          {/* Videos component would go here */}
        </S.CreatePlaylistVideosWrapper>
      </S.CreatePlaylistWrapper>
    </MainLayout>
  );
}
