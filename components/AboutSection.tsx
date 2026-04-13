"use client";

import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="relative mb-16 text-center md:text-left">
        <h2 className="text-[10vw] md:text-[8vw] font-bold text-zinc-900/40 absolute top-1/2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 select-none tracking-tighter whitespace-nowrap z-0">
          PROFILE
        </h2>
        <h3 className="text-3xl md:text-4xl font-semibold relative z-10 tracking-tight text-zinc-100">
          About
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="bg-zinc-900/25 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-zinc-800/50"
      >
        <p className="text-zinc-300 leading-relaxed text-base md:text-xl max-w-5xl">
          I am a Cyber Security Architect and Full-Stack Developer currently in my 4th semester of a BS in Cyber Security at Air University Multan. My engineering philosophy is built on operational resilience. Whether I&apos;m architecting a Next-Gen EDR platform with &apos;Phish-Slayer&apos;, managing cloud deployments on AWS and Oracle Cloud, or overseeing complex infrastructure for my family&apos;s agricultural operations powered by off-grid solar, I build systems designed to scale, adapt, and survive under pressure.
        </p>
      </motion.div>
    </section>
  );
}
