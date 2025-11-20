// src/pages/DashboardHome.jsx
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Count,
  Grid,
  Thumbnail,
  Title,
  Wrap,
  CardInfo,
} from "./Dashboard.styles";

import { getPlaylistById } from "../../store/playlistSlice";

export default function DashboardHome() {
  const dispatch = useDispatch();
  const playlists = useSelector((s) => s.playlists.items);

  return (
    <Wrap>
      <Grid>
        {playlists.map((p) => (
          <Card key={p.id} onClick={() => dispatch(getPlaylistById(p.id))}>
            <Thumbnail src={p.image} />
            <CardInfo>
              <Title>{p.title}</Title>
              <Count>{p.videos?.length ?? 0} videos</Count>
            </CardInfo>
          </Card>
        ))}
      </Grid>
    </Wrap>
  );
}
