"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/config/site";

const roleCycle = [
  "Security Engineer",
  "SaaS Founder",
  "Web Developer",
  "Threat Intelligence Builder",
];

const terminalLines = [
  { text: "$ phish-slayer --scan incoming", type: "command" },
  { text: "", type: "blank" },
  { text: "Analyzing 247 email threads...", type: "info" },
  { text: "[████████████] 100%", type: "info" },
  { text: "Threats detected: 3", type: "info" },
  { text: "! ALERT: Credential harvesting attempt blocked", type: "alert" },
  { text: "! ALERT: Malicious redirect URL quarantined", type: "alert" },
  { text: "! ALERT: Spoofed sender domain flagged", type: "alert" },
  { text: "Generating threat report...", type: "info" },
  { text: "✓ Infrastructure secure. All systems nominal.", type: "success" },
];

const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

function getLineColor(type: string) {
  switch (type) {
    case "command":
      return "text-zinc-400";
    case "prompt":
      return "text-zinc-300";
    case "alert":
      return "text-violet-400 font-semibold";
    case "success":
      return "text-violet-300";
    default:
      return "text-zinc-300";
  }
}

function TerminalCard() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetAnimation = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  }, []);

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      const timeout = setTimeout(() => {
        resetAnimation();
      }, 2000);
      return () => clearTimeout(timeout);
    }

    const currentLine = terminalLines[currentLineIndex];

    if (currentLine.text === "") {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, ""]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 200);
      return () => clearTimeout(timeout);
    }

    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.text.charAt(0));
          } else {
            newLines[currentLineIndex] = currentLine.text.substring(
              0,
              currentCharIndex + 1
            );
          }
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, resetAnimation]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      viewport={{ once: true, amount: 0.15 }}
      className="bg-zinc-900/80 border border-violet-400/20 rounded-2xl p-6 font-mono text-sm backdrop-blur-md shadow-[0_0_40px_rgba(167,139,250,0.08)]"
    >
      <div className="flex items-center mb-4">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-zinc-500 text-xs ml-3">
          phish-slayer --threat-scan
        </span>
      </div>

      <div
        ref={containerRef}
        className="space-y-1 min-h-60 max-h-75 overflow-y-auto"
      >
        {displayedLines.map((line, index) => (
          <div key={`${index}-${line.length}`} className="flex">
            <span className={getLineColor(terminalLines[index]?.type || "info")}>
              {line}
              {index === currentLineIndex &&
                currentCharIndex < (terminalLines[currentLineIndex]?.text.length || 0) && (
                  <span className="text-violet-400 animate-blink">|</span>
                )}
            </span>
          </div>
        ))}
        {currentLineIndex < terminalLines.length &&
          displayedLines.length <= currentLineIndex && (
            <div>
              <span className="text-violet-400 animate-blink">|</span>
            </div>
          )}
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roleCycle[roleIndex];

    if (!isDeleting && typedRole.length < currentRole.length) {
      const timeout = setTimeout(() => {
        setTypedRole(currentRole.slice(0, typedRole.length + 1));
      }, 70);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && typedRole.length === currentRole.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 1300);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && typedRole.length > 0) {
      const timeout = setTimeout(() => {
        setTypedRole((prev) => prev.slice(0, -1));
      }, 40);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && typedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roleCycle.length);
    }
  }, [typedRole, isDeleting, roleIndex]);

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col"
        >
          <div className="inline-flex w-fit items-center gap-2 border border-violet-400/30 bg-violet-400/10 text-violet-300 font-mono text-xs px-3 py-1 rounded-full mb-6">
            <span className="text-zinc-300">Currently Learning</span>
            <span className="animate-pulse">●</span>
            <span>AWS Solutions Architect</span>
          </div>

          <p className="font-mono text-xs text-zinc-400 tracking-widest uppercase mb-5">
            Founder &amp; Security Engineer
          </p>

          <h1 className="font-barlow font-bold text-6xl md:text-7xl text-white leading-[0.95]">
            Muhammad Zain
          </h1>

          <p className="mt-4 text-2xl font-barlow text-violet-400 min-h-9">
            {typedRole}
            <span className="animate-blink">|</span>
          </p>

          <p className="text-zinc-300 max-w-xl mt-6 mb-8 text-base leading-relaxed">
            I had 1.5 years of web development experience before starting cybersecurity at Air University Multan. Combining both worlds led me to build PhishSlayer from scratch.
          </p>

          <div className="grid grid-cols-3 gap-3 w-full max-w-xl mb-8">
            {[
              "15+ Projects",
              "4 Certifications",
              "1.5 Yrs Web Dev",
            ].map((stat) => (
              <div key={stat} className="bg-zinc-900/55 border border-zinc-800/60 rounded-xl px-3 py-3 text-center">
                <p className="font-mono text-violet-400 font-bold text-sm md:text-base">{stat}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="cta-gradient-border inline-flex items-center gap-2 bg-zinc-950 text-zinc-50 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-zinc-900 transition-colors"
            >
              See My Work
            </button>
            <a
              href={siteConfig.phishSlayerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-violet-400/40 text-violet-400 px-6 py-3 rounded-lg text-sm font-mono hover:bg-violet-400/10 hover:shadow-[0_0_12px_rgba(167,139,250,0.3)] transition-all duration-300"
            >
              Visit PhishSlayer
            </a>
          </div>

          <p className="text-zinc-500 text-xs font-mono mt-6">
            Age 20 · Multan, Pakistan · Building in public
          </p>
        </motion.div>

        <div>
          <TerminalCard />
        </div>
      </div>
    </section>
  );
}
