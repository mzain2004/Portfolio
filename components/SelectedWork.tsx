"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

type Project = {
  title: string;
  summary: string;
  stack: string[];
  image: string;
  imageAlt: string;
  href: string;
};

const projects: Project[] = [
  {
    title: "Phish-Slayer",
    summary:
      "AI-first threat intelligence and EDR platform with real-time telemetry, triage workflows, and automated incident context for faster SOC decisions.",
    stack: ["Next.js 15", "Tailwind", "Node.js", "Supabase", "Python"],
    image: "/projects/phish-slayer.png",
    imageAlt: "Phish-Slayer project preview",
    href: "#",
  },
  {
    title: "Antigravity Agent Skills",
    summary:
      "A curated automation toolkit for high-performance engineering workflows, packaging reusable AI agent skills and reliability-first execution patterns.",
    stack: ["TypeScript", "Automation", "Prompt Engineering", "DX"],
    image: "/projects/agent-skills.png",
    imageAlt: "Antigravity Agent Skills preview",
    href: "#",
  },
  {
    title: "Threat Lab Utility Suite",
    summary:
      "Security utility suite for fast malware triage and IOC enrichment, designed for analysts who need signal-rich context in under a minute.",
    stack: ["React", "FastAPI", "PostgreSQL", "Redis"],
    image: "/projects/threat-lab.png",
    imageAlt: "Threat Lab Utility Suite preview",
    href: "#",
  },
];

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
      className="bg-zinc-900/20 backdrop-blur-sm rounded-3xl p-5 md:p-7"
    >
      <div
        className={`flex flex-col gap-8 lg:gap-10 lg:items-center ${
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="w-full lg:w-3/5">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative overflow-hidden rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-80px_90px_rgba(0,0,0,0.4)]"
          >
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={1440}
              height={900}
              className="h-[260px] w-full object-cover md:h-[360px]"
            />
          </motion.div>
        </div>

        <div className="w-full lg:w-2/5">
          <h4 className="font-barlow text-3xl md:text-5xl leading-tight text-zinc-100 tracking-tight">
            {project.title}
          </h4>
          <p className="mt-4 text-zinc-300 leading-relaxed md:text-lg">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="bg-white/5 text-zinc-300 text-sm px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <MagneticButton>
              <motion.a
                href={project.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative inline-flex rounded-full p-[1px] overflow-hidden"
              >
                <span className="absolute inset-[-120%] bg-[conic-gradient(from_180deg,rgba(34,211,238,0.95),rgba(34,211,238,0.05),rgba(34,211,238,0.95))] animate-spin [animation-duration:1.8s]" />
                <span className="relative inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition-colors duration-300 hover:text-cyan-200">
                  View Project <ArrowUpRight size={16} />
                </span>
              </motion.a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="relative mb-16 text-center">
        <h2 className="text-[10vw] md:text-[8vw] font-bold text-zinc-900/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none tracking-tighter whitespace-nowrap z-0">
          PORTFOLIO
        </h2>
        <h3 className="text-3xl md:text-4xl font-semibold relative z-10 tracking-tight text-zinc-100">
          Selected Work
        </h3>
      </div>

      <div className="relative z-10 flex flex-col gap-8 md:gap-10">
        {projects.map((project, index) => (
          <ProjectFeature key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
