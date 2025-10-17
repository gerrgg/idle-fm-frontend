import { useEffect, useState } from "react";
import * as S from "./Static.styles.jsx";

export default function Static({ show }) {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const limit = 10;
    setIndex(Math.floor(Math.random() * limit));
  }, [show]);

  return <S.StaticWrapper index={index} active={show} />;
}