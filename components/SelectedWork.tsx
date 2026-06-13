"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { content, type Project, type ProjectStatus } from "@/config/content";
import SectionHeading from "./SectionHeading";

const statusStyles: Record<ProjectStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
  "in-progress": {
    label: "In Progress",
    className: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  },
  archive: { label: "Archive", className: "text-zinc-500 border-zinc-700/50 bg-zinc-800/40" },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24, mass: 0.4 },
  },
};

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const status = statusStyles[project.status];

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.01,
        borderColor: "rgba(56, 189, 248, 0.25)",
        boxShadow: "0 10px 30px -15px rgba(56, 189, 248, 0.12)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`surface-card flex flex-col gap-4 p-6 transition-all duration-300 ${
        featured ? "md:p-8 lg:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {project.title === "PhishSlayer" && (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white p-1 border border-zinc-800 shrink-0">
              <Image
                src="/images/phishslayer-logo.png"
                alt="PhishSlayer logo"
                width={22}
                height={22}
                className="object-contain"
              />
            </div>
          )}
          <h3 className={`font-barlow font-semibold text-zinc-100 group-hover:text-sky-300 transition-colors ${featured ? "text-2xl" : "text-lg"}`}>
            {project.title}
          </h3>
        </div>
        <span
          className={`shrink-0 font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded-md border ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <p className={`text-zinc-400 leading-relaxed flex-1 ${featured ? "text-base" : "text-sm"}`}>
        {project.description}
      </p>

      {project.impact && (
        <p className="font-mono text-xs text-sky-400/80">{project.impact}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-zinc-800 bg-zinc-950/50 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-3 pt-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-xs font-mono text-sky-300 hover:bg-sky-400/15 transition-colors"
          >
            <ExternalLink size={13} /> Live Demo
          </a>
        )}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/80 px-3 py-2 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
        >
          <Github size={13} /> GitHub
        </a>
      </div>
    </motion.article>
  );
}

export default function SelectedWork() {
  const [showEarly, setShowEarly] = useState(false);
  const { projects } = content;

  return (
    <section id="work" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Portfolio"
          title="Selected Work"
          description="Security and systems projects first. Early web development work available below."
        />

        <div className="mb-6">
          <p className="font-mono text-[11px] tracking-widest uppercase text-zinc-500 mb-4">
            Flagship
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1"
          >
            <ProjectCard project={projects.flagship} featured />
          </motion.div>
        </div>

        <div className="mb-10">
          <p className="font-mono text-[11px] tracking-widest uppercase text-zinc-500 mb-4">
            Security & Systems
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {projects.security.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </div>

        <div>
          <button
            onClick={() => setShowEarly((v) => !v)}
            className="flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-4 focus:outline-none"
            aria-expanded={showEarly}
          >
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${showEarly ? "rotate-180" : ""}`}
            />
            Early Web Development ({projects.early.length} projects)
          </button>

          <AnimatePresence>
            {showEarly && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-2"
                >
                  {projects.early.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
