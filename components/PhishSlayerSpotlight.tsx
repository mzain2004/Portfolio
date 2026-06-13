"use client";

import { motion } from "motion/react";
import { Shield, Zap, Monitor, Cloud, User, ExternalLink, ArrowRight } from "lucide-react";
import { content } from "@/config/content";
import { siteConfig } from "@/config/site";
import SectionHeading from "./SectionHeading";
import { transition } from "@/lib/motion";

const featureIcons = {
  shield: Shield,
  zap: Zap,
  monitor: Monitor,
  cloud: Cloud,
  user: User,
};

export default function PhishSlayerSpotlight() {
  const { phishSlayer } = content;

  return (
    <section id="phish-slayer" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Flagship Product"
          title={phishSlayer.title}
          description={phishSlayer.subtitle}
        />

        <div className="relative rounded-3xl border border-violet-400/15 bg-zinc-900/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.08)_0%,transparent_55%)] pointer-events-none" />

          <div className="relative p-8 md:p-12 space-y-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-violet-300 border border-violet-400/25 bg-violet-400/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse-soft" />
                {phishSlayer.badge}
              </span>
              <div className="flex flex-wrap gap-2">
                {phishSlayer.stack.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-zinc-400 border border-zinc-800 rounded-lg px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-3xl">
              {phishSlayer.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 w-full">
              {phishSlayer.metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="text-center surface-card py-4 px-3 flex flex-col justify-center min-h-[90px]"
                >
                  <p className="font-barlow font-bold text-base sm:text-lg xl:text-xl text-violet-400 leading-tight">
                    {metric.value}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 mt-1.5 leading-normal">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="font-mono text-xs tracking-widest uppercase text-zinc-500 mb-5">
                  Build Progress
                </h3>
                <div className="space-y-4">
                  {phishSlayer.progress.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ ...transition, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-zinc-300">{item.label}</span>
                        <span className="font-mono text-zinc-500">{item.percent}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full bg-violet-400/80"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-widest uppercase text-zinc-500 mb-5">
                  Pipeline Architecture
                </h3>
                <div className="space-y-3">
                  {phishSlayer.architecture.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ ...transition, delay: index * 0.06 }}
                      viewport={{ once: true }}
                      className="flex gap-4 items-start surface-card p-4"
                    >
                      <span className="font-mono text-xs text-violet-400 shrink-0 pt-0.5">
                        {step.step}
                      </span>
                      <div>
                        <p className="font-semibold text-zinc-100">{step.label}</p>
                        <p className="text-sm text-zinc-500 mt-0.5">{step.detail}</p>
                      </div>
                      {index < phishSlayer.architecture.length - 1 && (
                        <ArrowRight
                          size={14}
                          className="text-zinc-700 ml-auto shrink-0 hidden sm:block mt-1"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {phishSlayer.features.map(({ icon, label }, index) => {
                const Icon = featureIcons[icon];
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ ...transition, delay: index * 0.04 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 surface-card p-4 hover:border-violet-400/20 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-violet-400/10 text-violet-400 shrink-0">
                      <Icon size={16} />
                    </div>
                    <span className="text-sm text-zinc-300">{label}</span>
                  </motion.div>
                );
              })}
            </div>

            <a
              href={siteConfig.phishSlayerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 cta-gradient-border bg-zinc-950 text-zinc-50 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-zinc-900 transition-colors"
            >
              Visit PhishSlayer
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
