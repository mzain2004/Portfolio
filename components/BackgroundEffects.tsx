"use client";

import ParticleNetwork from "./ParticleNetwork";
import AuroraBackground from "./AuroraBackground";
import CustomCursor from "./CustomCursor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function BackgroundEffects() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {!reducedMotion && (
        <>
          <AuroraBackground />
          <ParticleNetwork />
          <CustomCursor />
        </>
      )}
    </>
  );
}
