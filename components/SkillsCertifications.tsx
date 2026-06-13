"use client";

import { motion } from "motion/react";
import { Award } from "lucide-react";
import { content } from "@/config/content";
import SectionHeading from "./SectionHeading";
import { transition } from "@/lib/motion";

const skillGroups = [
  { key: "core" as const, label: "Core Stack", color: "violet" },
  { key: "cyberCloud" as const, label: "Cyber & Cloud", color: "sky" },
  { key: "systems" as const, label: "Systems", color: "emerald" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 20 },
  },
};

export default function SkillsCertifications() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Expertise"
          title="Tech Arsenal"
          description="The stack behind PhishSlayer and every system I ship."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          {skillGroups.map(({ key, label }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, borderColor: "rgba(167, 139, 250, 0.25)" }}
              transition={{ ...transition, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-6 transition-all duration-300"
            >
              <h3 className="font-mono text-xs tracking-widest uppercase text-zinc-500 mb-4">
                {label}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {content.skills[key].map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(167, 139, 250, 0.4)",
                      backgroundColor: "rgba(167, 139, 250, 0.06)",
                      color: "rgb(250, 250, 250)",
                    }}
                    className="rounded-lg border border-zinc-700/50 bg-zinc-950/60 px-3 py-1.5 text-sm text-zinc-300 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <SectionHeading
          label="Credentials"
          title="Certifications"
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.certifications.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              transition={{ ...transition, delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.15 }}
              className="group flex items-start gap-4 rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-5 hover:border-sky-400/30 hover:bg-zinc-900/60 transition-all duration-300"
            >
              <div className="rounded-xl bg-sky-400/10 p-3 text-sky-400 shrink-0 transition-colors group-hover:bg-sky-400/15">
                <Award size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex font-mono text-[9px] font-semibold tracking-wider uppercase bg-sky-400/10 text-sky-400 border border-sky-400/20 rounded-md px-1.5 py-0.5">
                    {cert.status}
                  </span>
                </div>
                <h3 className="font-semibold text-zinc-100 group-hover:text-sky-300 transition-colors mt-2 text-base leading-snug">
                  {cert.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 font-medium">
                  {cert.issuer} · Issued {cert.issued}
                  {("expires" in cert) && cert.expires && ` · Expires ${cert.expires}`}
                </p>
                {("credentialId" in cert) && cert.credentialId && (
                  <p className="text-[11px] text-zinc-500 font-mono mt-1">
                    ID: {cert.credentialId}
                  </p>
                )}
                <p className="font-mono text-xs text-zinc-500 mt-3 transition-transform group-hover:translate-x-1 duration-300">
                  Verify credential →
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
