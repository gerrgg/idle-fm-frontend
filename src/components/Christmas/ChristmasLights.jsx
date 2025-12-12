export function ChristmasLights() {
  const colors = ["#FF174D", "#39FF14", "#00E5FF", "#FFEA00"]; // neon red, green, cyan, gold

  return (
    <div style={wrapper}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          style={{
            ...bulb,
            backgroundColor: colors[i % colors.length],
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

const wrapper = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  pointerEvents: "none",
  zIndex: 9999,
};

const bulb = {
  width: "12px",
  height: "18px",
  borderRadius: "8px",
  boxShadow: "0 0 12px currentColor",
  animation: "pulse 1.2s infinite ease-in-out",
};
