import * as S from "./Gif.styles";

const Gif = ({ tenorID }) => {
  return <S.GifWrapper file={`https://media.tenor.com/${tenorID}`} />;
};

export default Gif;
