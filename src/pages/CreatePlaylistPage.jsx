// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import * as S from "./CreatePlaylistPage.styles.jsx";
import Gif from "../components/Gif.jsx";
import CreatePlaylistForm from "../components/CreatePlaylistForm.jsx";

export default function CreatePlaylistPage({ user }) {
  return (
    <MainLayout user={user}>
      <Gif tenorID={"yWVIOwocbVsAAAAC"} />
      <S.CreatePlaylistWrapper>
        <S.CreatePlaylistFormWrapper>
          <S.CreatePlaylistTitle level={"h1"}>
            Create Playlist
          </S.CreatePlaylistTitle>
          <CreatePlaylistForm />
        </S.CreatePlaylistFormWrapper>
      </S.CreatePlaylistWrapper>
    </MainLayout>
  );
}
