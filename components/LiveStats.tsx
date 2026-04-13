"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

// Helper component for animating the number ticker effect
function AnimatedCounter({ value }: { value: number }) {
  // Spring physics for smooth ticker: stiffness 100 as requested
  const spring = useSpring(0, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export default function LiveStats() {
  const [stats, setStats] = useState<{
    totalCommits: number;
    publicRepos: number;
    codingHours: number;
  } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/github");
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
        setError(true);
      }
    }

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="p-4 text-center text-red-400 bg-red-950/20 backdrop-blur-md rounded-2xl border border-red-900/50">
        Failed to load live statistics.
      </div>
    );
  }

  // Glowing Skeleton Loader while fetching
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 backdrop-blur-md bg-zinc-950/50 rounded-2xl border border-zinc-800/50 flex flex-col justify-center items-center relative overflow-hidden"
          >
            {/* Subtle glowing ambient pulse */}
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
            <div className="relative z-10 w-20 h-10 bg-zinc-800/80 rounded-lg mb-3 shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
            <div className="relative z-10 w-24 h-4 bg-zinc-800/80 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  const statItems = [
    { label: "All-Time Commits", value: stats.totalCommits },
    { label: "Public Repos", value: stats.publicRepos },
    { label: "Coding Hours", value: stats.codingHours },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
          className="relative group h-32 backdrop-blur-md bg-zinc-950/50 rounded-2xl border border-zinc-800/50 flex flex-col justify-center items-center hover:bg-zinc-900/50 transition-colors"
        >
          {/* Subtle glow effect behind card on hover for a premium feel */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
          
          <div className="relative flex flex-col items-center">
            <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 mb-1">
              <AnimatedCounter value={item.value} />
            </h3>
            <p className="text-zinc-400 text-sm font-medium">
              {item.label}
            </p>
            {item.label === "All-Time Commits" && (
              <p
                className="mt-1 text-[11px] italic text-zinc-500"
                title="GitHub public search index only; private or unlinked-email commits may be excluded."
              >
                *Public Index Only.
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
