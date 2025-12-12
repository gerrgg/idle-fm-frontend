import { useEffect, useRef } from "react";

export default function Snowfall({
  count = 100,
  color = "white",
  speed = [0.5, 1.5],
  size = [2, 5],
}) {
  const canvasRef = useRef(null);
  const flakes = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const createFlake = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * (size[1] - size[0]) + size[0],
      s: Math.random() * (speed[1] - speed[0]) + speed[0],
      dx: Math.random() * 1 - 0.5,
    });

    flakes.current = Array.from({ length: count }, createFlake);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;

      flakes.current.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();

        flake.y += flake.s;
        flake.x += flake.dx;

        if (flake.y > h) {
          flake.y = -flake.r;
          flake.x = Math.random() * w;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [count, color, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    />
  );
}
