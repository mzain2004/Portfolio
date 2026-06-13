"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Briefcase, GraduationCap } from "lucide-react";
import { content } from "@/config/content";
import SectionHeading from "./SectionHeading";
import { transition } from "@/lib/motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -16, y: 12 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

const cardVariantsRight = {
  hidden: { opacity: 0, x: 16, y: 12 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 22 },
  },
};

function getExperienceLogo(org: string) {
  if (org.includes("Cygnus Ventures")) return "/images/cygnus-ventures-logo.png";
  if (org.includes("PhishSlayer")) return "/images/phishslayer-logo.png";
  return null;
}

export default function ExperienceEducation() {
  return (
    <section id="experience" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Background"
          title="Experience & Education"
          description="Building security products and leading company operations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-violet-400" size={22} />
              <h3 className="font-barlow font-bold text-2xl text-zinc-50">Experience</h3>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-[5px] top-2 bottom-2 bg-zinc-800/80 w-px" />
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
                className="space-y-6"
              >
                {content.experience.map((item) => (
                  <motion.article
                    key={item.title + item.period}
                    variants={cardVariants}
                    className="relative group"
                  >
                    <motion.span 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                      className="absolute -left-[21px] top-3 bg-violet-400 w-2.5 h-2.5 rounded-full ring-4 ring-zinc-950 group-hover:bg-violet-300 transition-colors" 
                    />
                    <motion.div
                      whileHover={{
                        scale: 1.015,
                        borderColor: "rgba(56, 189, 248, 0.25)",
                        boxShadow: "0 8px 25px -12px rgba(56, 189, 248, 0.12)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="surface-card p-5 transition-all duration-300 cursor-default flex gap-4 items-start"
                    >
                      {getExperienceLogo(item.organization) && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1 border border-zinc-800/60 shrink-0 mt-1">
                          <Image
                            src={getExperienceLogo(item.organization)!}
                            alt={`${item.organization} logo`}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-zinc-100 font-semibold text-lg">{item.title}</h4>
                        <p className="text-zinc-400 mt-1">{item.organization}</p>
                        <div className="flex flex-wrap gap-x-2 gap-y-1 text-zinc-600 font-mono text-xs mt-1">
                          <span>{item.period}</span>
                          {("location" in item) && item.location && (
                            <>
                              <span>·</span>
                              <span>{item.location}</span>
                            </>
                          )}
                        </div>
                        <ul className="mt-4 space-y-2 text-zinc-400 text-sm list-disc pl-4">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} className="leading-relaxed pl-1">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-violet-400" size={22} />
              <h3 className="font-barlow font-bold text-2xl text-zinc-50">Education</h3>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-[5px] top-2 bottom-2 bg-zinc-800/80 w-px" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
                className="space-y-6"
              >
                {content.education.map((item) => (
                  <motion.article
                    key={item.title + item.date}
                    variants={cardVariantsRight}
                    className="relative group"
                  >
                    <motion.span 
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                      className="absolute -left-[21px] top-3 bg-violet-400 w-2.5 h-2.5 rounded-full ring-4 ring-zinc-950 group-hover:bg-violet-300 transition-colors" 
                    />
                    <motion.div
                      whileHover={{
                        scale: 1.015,
                        borderColor: "rgba(167, 139, 250, 0.25)",
                        boxShadow: "0 8px 25px -12px rgba(139, 92, 246, 0.12)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="surface-card p-5 transition-all duration-300 cursor-default"
                    >
                      <h4 className="text-zinc-100 font-semibold text-lg">{item.title}</h4>
                      <p className="text-zinc-400 mt-1">{item.school}</p>
                      {("description" in item) && item.description && (
                        <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{item.description}</p>
                      )}
                      <span className="inline-flex mt-4 font-mono text-[11px] text-violet-400 border border-violet-400/20 bg-violet-400/8 rounded-full px-3 py-1">
                        {item.date}
                      </span>
                    </motion.div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
