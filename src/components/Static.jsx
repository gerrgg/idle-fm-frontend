import { useEffect, useState } from "react";
import * as S from "./Static.styles.jsx";

const Static = ({ ready }) => {
  const [index, setIndex] = useState(1);
  useEffect(() => {
    const limit = 10;
    setIndex(Math.floor(Math.random() * limit));
  }, [ready]);
  return <S.StaticWrapper $ready={ready} $index={index} />;
};


export default Static;