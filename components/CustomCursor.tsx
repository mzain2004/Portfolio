"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  // Springs for outer ring inertia
  const outerX = useSpring(rawX, { stiffness: 220, damping: 24, mass: 0.3 });
  const outerY = useSpring(rawY, { stiffness: 220, damping: 24, mass: 0.3 });

  // Fast spring for inner dot
  const innerX = useSpring(rawX, { stiffness: 450, damping: 28, mass: 0.08 });
  const innerY = useSpring(rawY, { stiffness: 450, damping: 28, mass: 0.08 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".surface-card") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block border"
        animate={{
          width: isHovering ? 52 : 28,
          height: isHovering ? 52 : 28,
          backgroundColor: isHovering ? "rgba(56, 189, 248, 0.06)" : "rgba(56, 189, 248, 0)",
          borderColor: isHovering ? "rgba(56, 189, 248, 0.7)" : "rgba(56, 189, 248, 0.35)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Inner Dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-sky-400 rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block"
        animate={{
          scale: isHovering ? 0.6 : 1,
          backgroundColor: isHovering ? "rgb(125, 211, 252)" : "rgb(56, 189, 248)",
        }}
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
