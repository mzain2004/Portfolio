"use client";
import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Aurora blobs with organic drift
    const blobs = [
      { x: 0.2, y: 0.3, vx: 0.00015, vy: 0.0001, r: 0.45, color: [139, 92, 246] },   // violet-500
      { x: 0.7, y: 0.6, vx: -0.0001, vy: 0.00012, r: 0.4, color: [139, 92, 246] },    // violet-500
      { x: 0.5, y: 0.8, vx: 0.00008, vy: -0.00015, r: 0.35, color: [167, 139, 250] }, // violet-400
    ];

    const draw = () => {
      time++;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      for (const blob of blobs) {
        // Organic drift using sine waves for natural, slow movement
        const cx = (blob.x + Math.sin(time * blob.vx * 6 + blob.y * 10) * 0.12) * width;
        const cy = (blob.y + Math.cos(time * blob.vy * 6 + blob.x * 10) * 0.1) * height;
        const radius = blob.r * Math.min(width, height);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, g, b] = blob.color;
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.08)`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.03)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
