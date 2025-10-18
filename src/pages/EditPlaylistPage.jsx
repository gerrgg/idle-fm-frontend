// pages/LoginPage.jsx
import MainLayout from "../layouts/MainLayout.jsx";
import * as S from "./CreatePlaylistPage.styles.jsx";
import Gif from "../components/Gif.jsx";
import EditPlaylistForm from "../components/EditPlaylistForm.jsx";
import AddVideoForm from "../components/AddVideoForm.jsx";
import { useParams } from "react-router-dom";

export default function EditPlaylistPage({ user }) {
  const { id } = useParams();

  return (
    <MainLayout user={user}>
      <Gif tenorID={"yWVIOwocbVsAAAAC"} />
      <S.CreatePlaylistWrapper>
        <S.CreatePlaylistFormWrapper>
          <S.CreatePlaylistTitle level={"h1"}>
            Edit Playlist
          </S.CreatePlaylistTitle>
          <EditPlaylistForm />
          <S.CreatePlaylistDivider />
          <S.CreatePlaylistTitle level={"h2"}>Add Videos</S.CreatePlaylistTitle>
          <AddVideoForm playlistId={id} />
        </S.CreatePlaylistFormWrapper>
        <S.CreatePlaylistVideosWrapper>
          {/* Videos component would go here */}
        </S.CreatePlaylistVideosWrapper>
      </S.CreatePlaylistWrapper>
    </MainLayout>
  );
}
