"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, GitBranch } from "lucide-react";

type GitHubStats = {
  totalCommits: number;
  publicRepos: number;
  languages: Record<string, number>;
};

const easeTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

function CountUp({ value, start }: { value: number; start: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(Math.round(value * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return <>{displayValue}</>;
}

function StatCard({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [start, setStart] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setStart(true)}
      transition={easeTransition}
      viewport={{ once: true, amount: 0.15 }}
      className="bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-6"
    >
      <p className="font-mono text-violet-400 text-4xl font-bold leading-none">
        <CountUp value={value} start={start} />
        {suffix}
      </p>
      <p className="mt-3 text-zinc-500 font-mono uppercase text-xs tracking-wide">{label}</p>
    </motion.div>
  );
}

function RadarChart() {
  const labels = ["Frontend", "Security", "Cloud", "Backend", "UI/UX"];
  const values = [90, 88, 80, 84, 78];
  const size = 320;
  const center = size / 2;
  const radius = 110;

  const points = useMemo(() => {
    return values
      .map((value, index) => {
        const angle = ((Math.PI * 2) / labels.length) * index - Math.PI / 2;
        const r = (value / 100) * radius;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;
        return `${x},${y}`;
      })
      .join(" ");
  }, [center, labels.length, radius, values]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={easeTransition}
      viewport={{ once: true, amount: 0.15 }}
      className="bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-6"
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px] mx-auto">
        {[0.25, 0.5, 0.75, 1].map((level) => {
          const ring = labels
            .map((_, index) => {
              const angle = ((Math.PI * 2) / labels.length) * index - Math.PI / 2;
              const x = center + Math.cos(angle) * radius * level;
              const y = center + Math.sin(angle) * radius * level;
              return `${x},${y}`;
            })
            .join(" ");

          return (
            <polygon
              key={level}
              points={ring}
              fill="none"
              stroke="#27272a"
              strokeWidth="1"
            />
          );
        })}

        {labels.map((label, index) => {
          const angle = ((Math.PI * 2) / labels.length) * index - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          const textX = center + Math.cos(angle) * (radius + 26);
          const textY = center + Math.sin(angle) * (radius + 26);

          return (
            <g key={label}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="#3f3f46" strokeWidth="1" />
              <text
                x={textX}
                y={textY}
                fill="#a1a1aa"
                fontSize="11"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {label}
              </text>
            </g>
          );
        })}

        <motion.polygon
          points={points}
          fill="rgba(167,139,250,0.12)"
          stroke="#a78bfa"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.15 }}
        />
      </svg>
    </motion.div>
  );
}

export default function LiveStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

  const fetchStats = useCallback(async () => {
    setStatus("loading");

    try {
      const response = await fetch("/api/github", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to fetch GitHub stats: ${response.status}`);
      }

      const data = (await response.json()) as GitHubStats;
      setStats(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, []);

  const languageBreakdown = useMemo(() => {
    if (!stats) {
      return [];
    }

    const entries = Object.entries(stats.languages).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const totalBytes = entries.reduce((sum, [, bytes]) => sum + bytes, 0);

    return entries.map(([name, bytes]) => ({
      name,
      percentage: totalBytes > 0 ? Number(((bytes / totalBytes) * 100).toFixed(1)) : 0,
    }));
  }, [stats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (status === "loading") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-36 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl animate-pulse"
            />
          ))}
        </div>
        <div className="h-90 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-zinc-900/60 border border-violet-400/30 rounded-2xl p-6 text-zinc-400">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-violet-400 mt-0.5" size={20} />
          <div>
            <p className="font-medium text-zinc-300">Could not load live GitHub stats.</p>
            <p className="mt-1 text-sm">Please check your connection and try again.</p>
          </div>
        </div>
        <button
          onClick={fetchStats}
          className="mt-4 inline-flex items-center rounded-lg border border-violet-400/40 px-4 py-2 text-sm font-mono text-violet-300 hover:bg-violet-400/10 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 text-zinc-400">
        Loading activity data...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <GitBranch className="text-violet-400" size={24} />
        <h2 className="font-barlow font-bold text-4xl md:text-5xl text-white">Activity Log</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <StatCard value={stats.totalCommits} label="Yearly Commits" />
            <StatCard value={stats.publicRepos} label="Repositories" />
            <StatCard value={2} label="Years Coding" suffix="+" />
            <StatCard value={15} label="Projects Built" suffix="+" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={easeTransition}
            viewport={{ once: true, amount: 0.15 }}
            className="mt-6 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-6"
          >
            <h3 className="text-zinc-100 font-semibold mb-5">Most Used Languages</h3>
            <div className="space-y-4">
              {languageBreakdown.length === 0 && (
                <p className="text-sm text-zinc-500">No language data available yet.</p>
              )}
              {languageBreakdown.map((language) => (
                <div key={language.name}>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-300">{language.name}</span>
                    <span className="text-zinc-500">{language.percentage}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-violet-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${language.percentage}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, amount: 0.15 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <RadarChart />
      </div>
    </div>
  );
}
