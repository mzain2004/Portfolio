"use client";

import { motion } from "motion/react";
import { GraduationCap, Shield, Cloud, MapPin } from "lucide-react";
import { content } from "@/config/content";
import SectionHeading from "./SectionHeading";
import { transition } from "@/lib/motion";
import Image from "next/image";

const credentialIcons = {
  graduation: GraduationCap,
  shield: Shield,
  cloud: Cloud,
  map: MapPin,
};

export default function AboutSection() {
  const { about } = content;

  return (
    <section id="about" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="About"
          title="Engineering with intent"
          description="From web development roots to autonomous security systems."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, amount: 0.15 }}
          className="surface-card rounded-3xl p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 items-start">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40">
                <div className="w-full h-full rounded-3xl overflow-hidden border border-sky-400/20 bg-zinc-900 relative shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                  <Image
                    src="/images/founder-image.png"
                    alt="Muhammad Zain, CEO & Director of Cygnus Ventures and founder of PhishSlayer"
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 160px"
                    priority
                    className="object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500/90 border-2 border-zinc-900 z-10" title="Available" />
              </div>
              <h3 className="font-barlow font-bold text-xl text-zinc-50 mt-5">Muhammad Zain</h3>
              <p className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase mt-1">
                Security Founder
              </p>
            </div>

            <div>
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-zinc-400 leading-relaxed text-base md:text-lg mb-4 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {about.credentials.map(({ icon, text }) => {
                  const Icon = credentialIcons[icon];
                  return (
                    <motion.div
                      key={text}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: { opacity: 1, y: 0, transition },
                      }}
                      className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-950/40 px-4 py-3 text-zinc-300 hover:text-zinc-100 transition-colors"
                    >
                      <Icon size={16} className="text-violet-400 shrink-0" />
                      <span className="text-sm leading-relaxed">{text}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
