"use client";

import { useState } from "react";
import { motion } from "motion/react";

type SkillItem = {
  title: string;
  detail: string;
  span: string;
};

const skills: SkillItem[] = [
  { title: "Next.js 15", detail: "App Router, server components, edge APIs", span: "md:col-span-3" },
  { title: "React", detail: "Animation-rich, performance-first UI systems", span: "md:col-span-2" },
  { title: "Node.js", detail: "Secure backend orchestration and event pipelines", span: "md:col-span-2" },
  { title: "AWS", detail: "Production cloud deployment and observability", span: "md:col-span-3" },
  { title: "Oracle Cloud (OCI)", detail: "Multi-cloud operations and workload resilience", span: "md:col-span-3" },
  { title: "Threat Intel (EDR)", detail: "Telemetry analysis, detection logic, incident context", span: "md:col-span-4" },
  { title: "Supabase", detail: "Realtime data, auth, storage, and secure APIs", span: "md:col-span-3" },
];

function BentoSkillCard({ item }: { item: SkillItem }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMouse({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`group relative overflow-hidden rounded-2xl bg-zinc-900/35 backdrop-blur-md border border-zinc-800/60 p-6 md:p-7 ${item.span}`}
    >
      <div className="absolute inset-0 rounded-2xl border border-cyan-400/0 transition-colors duration-300 group-hover:border-cyan-400/25" />

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-300/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          WebkitMaskImage: `radial-gradient(180px circle at ${mouse.x}px ${mouse.y}px, black 35%, transparent 100%)`,
          maskImage: `radial-gradient(180px circle at ${mouse.x}px ${mouse.y}px, black 35%, transparent 100%)`,
          boxShadow: isHovering ? "0 0 30px rgba(34,211,238,0.25) inset" : "none",
        }}
      />

      <h4 className="relative z-10 font-barlow text-2xl md:text-3xl tracking-tight text-zinc-100">
        {item.title}
      </h4>
      <p className="relative z-10 mt-3 text-sm md:text-base leading-relaxed text-zinc-400">
        {item.detail}
      </p>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="relative mb-16 text-center md:text-left">
        <h2 className="text-[12vw] md:text-[10vw] font-bold text-zinc-900/40 absolute top-1/2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 select-none tracking-tighter whitespace-nowrap z-0">
          SKILLS
        </h2>
        <h3 className="text-3xl md:text-4xl font-semibold relative z-10 tracking-tight text-zinc-100">
          Core Skills
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-5 md:gap-6">
        {skills.map((item) => (
          <BentoSkillCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
