import { Wrapper, Bar } from "./Equalizer.styles";

export default function Equalizer({ isPlaying, height = "20px" }) {
  return (
    <Wrapper height={height}>
      <Bar isPlaying={isPlaying} />
      <Bar isPlaying={isPlaying} />
      <Bar isPlaying={isPlaying} />
      <Bar isPlaying={isPlaying} />
    </Wrapper>
  );
}
