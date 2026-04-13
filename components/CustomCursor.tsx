"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, { stiffness: 260, damping: 24, mass: 0.2 });
  const y = useSpring(rawY, { stiffness: 260, damping: 24, mass: 0.2 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      rawX.set(event.clientX - 12);
      rawY.set(event.clientY - 12);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawX, rawY]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 w-6 h-6 bg-violet-400/30 blur-md rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block"
      style={{ x, y }}
    />
  );
}
