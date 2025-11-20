import { Wrapper, Bar } from "./Equalizer.styles";

export default function Equalizer({
  className = "",
  isPlaying,
  height = "20px",
}) {
  return (
    <Wrapper className={className} height={height}>
      <Bar $isPlaying={isPlaying} />
      <Bar $isPlaying={isPlaying} />
      <Bar $isPlaying={isPlaying} />
      <Bar $isPlaying={isPlaying} />
    </Wrapper>
  );
}
