import { Spinner } from "./Loader.styles";

export default function Loader({ bgColor, fgColor }) {
  return <Spinner $bgColor={bgColor} $fgColor={fgColor} />;
}
