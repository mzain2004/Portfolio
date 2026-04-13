"use client";

import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  status: "live" | "in-development";
  liveHref?: string;
};

const projects: Project[] = [
  {
    title: "PhishSlayer",
    description: "Autonomous SOC Intelligence Platform. AI agent swarms that auto triage, investigate and respond to threats in real time.",
    stack: ["Next.js 15", "TypeScript", "Supabase", "AI Agents"],
    href: "https://github.com/mzain2004/PhishSlayer",
    status: "live" as const,
    liveHref: "https://phishslayer.tech",
  },
  {
    title: "Spotify UI Clone",
    description: "Pixel accurate front end recreation of Spotify's UI. Focus on layout precision and responsive design.",
    stack: ["HTML", "CSS"],
    href: "https://github.com/mzain2004/Spotify-UI-Clone",
    status: "live" as const,
    liveHref: "https://github.com/mzain2004/Spotify-UI-Clone",
  },
  {
    title: "Dynamic News Portal",
    description: "Real time news aggregation portal powered by the GNews API with dynamic filtering and category browsing.",
    stack: ["JavaScript", "CSS", "GNews API"],
    href: "https://github.com/mzain2004/Dynamic-News-Portal",
    status: "live" as const,
    liveHref: "https://github.com/mzain2004/Dynamic-News-Portal",
  },
  {
    title: "CRUD App PHP",
    description: "Simple full stack CRUD application built with PHP, HTML and CSS. Core database operations with clean UI.",
    stack: ["PHP", "HTML", "CSS"],
    href: "https://github.com/mzain2004/CRUD-App-PHP",
    status: "live" as const,
    liveHref: "https://github.com/mzain2004/CRUD-App-PHP",
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-barlow font-bold text-5xl text-white mb-12">
          Selected Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.15 }}
              className="bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-6 flex flex-col gap-4 hover:border-violet-400/30 hover:shadow-[0_0_20px_rgba(167,139,250,0.08)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-zinc-100 font-semibold text-lg">{project.title}</h3>
                {project.status === "live" && <span className="text-xs font-mono text-violet-300">Live</span>}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="bg-violet-400/10 text-violet-300 border border-violet-400/20 rounded-full px-2 py-0.5 font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.href && project.liveHref && (
                <div className="mt-auto flex items-center gap-3">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-mono text-zinc-300 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
                  >
                    <Github size={14} /> GitHub
                  </a>
                  <a
                    href={project.liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-violet-400/50 bg-violet-400/10 px-3 py-2 text-xs font-mono text-violet-300 hover:bg-violet-400/20 transition-colors"
                  >
                    <ExternalLink size={14} /> Live
                  </a>
                </div>
              )}

              {project.href && !project.liveHref && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-300 text-xs font-mono flex items-center gap-1 transition-colors mt-auto"
                >
                  <Github size={12} /> View on GitHub
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
