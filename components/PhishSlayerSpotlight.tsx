"use client";

import { motion } from "motion/react";
import { Shield, Zap, Monitor, Cloud, User } from "lucide-react";
import { siteConfig } from "@/config/site";

const features = [
  { icon: Shield, label: "AI powered phishing detection" },
  { icon: Zap,    label: "Real time threat intelligence" },
  { icon: Monitor, label: "EDR capabilities" },
  { icon: Cloud,  label: "Production Azure deployment" },
  { icon: User,   label: "Built solo from scratch" },
];

export default function PhishSlayerSpotlight() {
  return (
    <section id="phish-slayer" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-zinc-900/50 border border-violet-400/20 rounded-3xl p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.05)_0%,transparent_70%)] rounded-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], type: "spring" }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-violet-300 border border-violet-400/20 bg-violet-400/10 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  LIVE IN PRODUCTION
                </span>
              </div>
              <h2 className="font-barlow text-5xl font-bold text-white mb-2">
                PhishSlayer
              </h2>
              <p className="text-zinc-400 text-lg mb-6">
                AI Threat Intelligence &amp; EDR SaaS
              </p>
              <p className="text-zinc-300 leading-relaxed mb-8">
                Production deployed on Azure UAE North, running on Docker + Nginx + SSL.
                Built entirely on student and free tier resources with a focused solo execution path.
              </p>
              <a
                href={siteConfig.phishSlayerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-violet-400/40 text-violet-400 px-6 py-3 rounded-lg text-sm font-mono hover:bg-violet-400/10 hover:shadow-[0_0_20px_rgba(167,139,250,0.2)] transition-all duration-300"
              >
                Visit PhishSlayer
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], type: "spring", delay: 0.1 }}
              viewport={{ once: true, amount: 0.15 }}
              className="flex flex-col gap-4"
            >
              {features.map(({ icon: Icon, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], type: "spring", delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:text-violet-300 hover:translate-x-1 transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-violet-400/10 text-violet-400">
                    <Icon size={18} />
                  </div>
                  <span className="text-zinc-200 font-medium">{label}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
