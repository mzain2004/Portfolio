"use client";

import { motion } from "motion/react";
import { GraduationCap, Shield, Cloud, MapPin } from "lucide-react";

const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

const credentials = [
  {
    icon: GraduationCap,
    text: "BS Cybersecurity, Air University Multan, Semester 4",
  },
  {
    icon: Shield,
    text: "Founder, PhishSlayer (Live in Production)",
  },
  {
    icon: Cloud,
    text: "Oracle Cloud Infrastructure 2025 Certified",
  },
  {
    icon: MapPin,
    text: "Multan, Pakistan",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, amount: 0.15 }}
          className="bg-zinc-900/50 border border-zinc-800/60 rounded-3xl p-10 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-start">
            <div>
              <div className="bg-zinc-800 border border-violet-400/30 rounded-full w-24 h-24 flex items-center justify-center">
                <svg
                  viewBox="0 0 48 48"
                  className="w-14 h-14"
                  fill="transparent"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="16" r="7" stroke="#a78bfa" strokeWidth="1.5" />
                  <path d="M10 36c3-6 9-9 14-9s11 3 14 9" stroke="#a78bfa" strokeWidth="1.5" fill="transparent" />
                </svg>
              </div>
              <h3 className="font-barlow font-bold text-xl text-white mt-5">Muhammad Zain</h3>
              <p className="font-mono text-xs text-zinc-400 tracking-widest uppercase mt-1">Security Founder</p>
            </div>

            <div>
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg mb-4">
                I had 1.5 years of web development experience before starting cybersecurity at Air University Multan. That early development background shaped how I approach security engineering today.
              </p>
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                PhishSlayer is the product of combining both worlds. It is an AI powered SOC SaaS, live on Azure, and built solo using student tier infrastructure. When I am not writing code I am reading history, watching cricket, or out with a camera.
              </p>

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
                {credentials.map(({ icon: Icon, text }) => (
                  <motion.div
                    key={text}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0, transition },
                    }}
                    className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-4 py-3 text-zinc-300 hover:text-zinc-100 transition-colors"
                  >
                    <Icon size={16} className="text-violet-400 shrink-0" />
                    <span className="text-sm leading-relaxed">{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
