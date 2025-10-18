import { useEffect, useState } from "react";
import { gifsApi } from "../api/gifs.js";
import * as S from "./Gif.styles";

const Gif = ({ tenorID, index }) => {
  return <S.GifWrapper file={`https://media.tenor.com/${tenorID}`} />;
};

export default Gif;
