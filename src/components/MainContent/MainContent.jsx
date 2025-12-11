import { Wrapper } from "./MainContent.styles.jsx";

export default function MainContent({ collapse, children }) {
  return <Wrapper $collapse={collapse}>{children}</Wrapper>;
}
