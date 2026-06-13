"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowRight, ExternalLink, Terminal } from "lucide-react";
import { content } from "@/config/content";
import { siteConfig } from "@/config/site";
import { transition } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const terminalLines = [
  { text: "$ phish-slayer --triage telemetry", type: "command" },
  { text: "", type: "blank" },
  { text: "Analyzing incoming security telemetry...", type: "info" },
  { text: "[████████████] 100%", type: "info" },
  { text: "Status: Multi-agent routing paths verified", type: "success" },
  { text: "! ALERT: Suspicious activity quarantined", type: "alert" },
  { text: "! ALERT: External API credentials isolated", type: "alert" },
  { text: "! ALERT: Threat indicators cross-referenced", type: "info" },
  { text: "Generating evidence-backed threat report...", type: "info" },
  { text: "✓ Infrastructure secure. All systems nominal.", type: "success" },
];

function getLineColor(type: string) {
  switch (type) {
    case "command":
      return "text-zinc-500";
    case "alert":
      return "text-violet-400 font-medium";
    case "success":
      return "text-emerald-400/90";
    case "system":
      return "text-sky-400 font-semibold";
    default:
      return "text-zinc-400";
  }
}

function TerminalCard() {
  const reducedMotion = useReducedMotion();
  const [displayedLines, setDisplayedLines] = useState<Array<{ text: string; type: string }>>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Interactive Terminal States
  const [isInteractive, setIsInteractive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetAnimation = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  }, []);

  // Autofill effect for simulated typing on mount (only when not interactive)
  useEffect(() => {
    if (isInteractive) return;

    if (reducedMotion) {
      const timer = setTimeout(() => {
        setDisplayedLines(terminalLines);
        setCurrentLineIndex(terminalLines.length);
      }, 0);
      return () => clearTimeout(timer);
    }

    if (currentLineIndex >= terminalLines.length) {
      const timeout = setTimeout(resetAnimation, 3000);
      return () => clearTimeout(timeout);
    }

    const currentLine = terminalLines[currentLineIndex];

    if (currentLine.type === "blank") {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 200);
      return () => clearTimeout(timeout);
    }

    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          const typedText = currentLine.text.substring(0, currentCharIndex + 1);
          if (newLines.length <= currentLineIndex) {
            newLines.push({ text: typedText, type: currentLine.type });
          } else {
            newLines[currentLineIndex] = { text: typedText, type: currentLine.type };
          }
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }, 600);
    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, resetAnimation, reducedMotion, isInteractive]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, inputValue]);

  const engageInteractive = () => {
    if (!isInteractive) {
      setIsInteractive(true);
      setDisplayedLines([
        { text: "*** INTERACTIVE SHELL ENGAGED ***", type: "system" },
        { text: "Type 'help' to see list of available commands.", type: "info" },
        { text: "", type: "blank" },
      ]);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;

    setInputValue("");
    processCommand(cmd);
  };

  const processCommand = (cmd: string) => {
    const trimmed = cmd.toLowerCase();
    const newLines: Array<{ text: string; type: string }> = [
      { text: `$ ${cmd}`, type: "command" },
    ];

    switch (trimmed) {
      case "help":
        newLines.push(
          { text: "Available commands:", type: "info" },
          { text: "  scan     - Run simulated threat scan", type: "info" },
          { text: "  skills   - Display Zain's expertise stack", type: "info" },
          { text: "  projects - List portfolio projects summary", type: "info" },
          { text: "  about    - View profile & bio details", type: "info" },
          { text: "  contact  - Display contact channels", type: "info" },
          { text: "  clear    - Clear console logs screen", type: "info" },
          { text: "  help     - Display this menu list", type: "info" }
        );
        break;
      case "clear":
        setDisplayedLines([]);
        return;
      case "scan":
        newLines.push({ text: "Restarting auto-scan simulation...", type: "system" });
        setDisplayedLines(newLines);
        setIsInteractive(false);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        return;
      case "skills":
        newLines.push(
          { text: "[+] Core: Next.js, TypeScript, Tailwind, Supabase, Docker, React", type: "info" },
          { text: "[+] Cyber & Cloud: Azure, DigitalOcean, Wazuh, Python, Threat Intel", type: "info" },
          { text: "[+] Systems: C++, x86 Assembly, Network Design, Cryptography", type: "info" }
        );
        break;
      case "projects":
        newLines.push(
          { text: "[*] PhishSlayer - AI Threat Intel & Autonomous SOC (Live in Prod)", type: "success" },
          { text: "[*] ABTechSolutions - Scalable partitioned network blueprint", type: "info" },
          { text: "[*] Pak Route Optimizer - Algorithmic C++ routing solver", type: "info" },
          { text: "[*] Scientific Calculator - CPU-level logic x86 assembly", type: "info" }
        );
        break;
      case "about":
        newLines.push(
          { text: "Muhammad Zain - CEO & Director at Cygnus Ventures SMC Pvt Ltd", type: "success" },
          { text: "Founder & Lead Engineer of PhishSlayer", type: "info" },
          { text: "Building autonomous SOC intelligence for MSSPs and enterprise security teams.", type: "info" },
          { text: "Background in web development, cloud, CI/CD, DevSecOps, and cybersecurity.", type: "info" },
          { text: "Studied Cyber Security at Air University Multan until Jun 2026.", type: "info" }
        );
        break;
      case "contact":
        newLines.push(
          { text: `Email: ${siteConfig.email}`, type: "info" },
          { text: "LinkedIn: linkedin.com/in/mzain-founder/", type: "info" },
          { text: "GitHub: github.com/mzain2004/", type: "info" }
        );
        break;
      default:
        newLines.push({ text: `shell: command not found: '${cmd}'. Type 'help' for support.`, type: "alert" });
    }

    setDisplayedLines((prev) => [...prev, ...newLines]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: 0.2 }}
      onClick={engageInteractive}
      className={`surface-card rounded-3xl p-6 font-mono text-sm shadow-[0_24px_80px_-20px_rgba(139,92,246,0.15)] cursor-text transition-all duration-300 relative border ${
        isFocused ? "border-violet-500/40 ring-1 ring-violet-500/20" : "border-zinc-800/60"
      }`}
    >
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-800/60">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="font-mono text-[9px] tracking-wider uppercase flex items-center gap-1.5">
          {!isInteractive ? (
            <span className="text-zinc-500 animate-pulse-soft">
              Click to interact
            </span>
          ) : isFocused ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
              Active shell
            </span>
          ) : (
            <span className="text-amber-400">
              Interactive Mode
            </span>
          )}
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-500 flex items-center gap-1">
            <Terminal size={10} /> phish-shell
          </span>
        </span>
      </div>

      <div ref={containerRef} className="space-y-1.5 min-h-64 max-h-72 overflow-y-auto pr-1">
        {displayedLines.map((line, index) => (
          <div key={`${index}-${line.text.length}`}>
            <span className={getLineColor(line.type)}>
              {line.text}
              {!reducedMotion &&
                !isInteractive &&
                index === currentLineIndex &&
                currentCharIndex < (terminalLines[currentLineIndex]?.text.length || 0) && (
                  <span className="text-violet-400 animate-blink ml-px">|</span>
                )}
            </span>
          </div>
        ))}

        {isInteractive && (
          <form onSubmit={handleCommandSubmit} className="flex items-center mt-2 border-t border-zinc-800 pt-2">
            <span className="text-violet-400 mr-2 shrink-0 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="bg-transparent border-none outline-none text-zinc-100 font-mono text-sm w-full p-0 focus:ring-0 focus:outline-none"
              placeholder="type help..."
              autoComplete="off"
              autoCapitalize="off"
            />
          </form>
        )}
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { hero } = content;

  useEffect(() => {
    if (reducedMotion) {
      const timer = setTimeout(() => {
        setTypedRole(hero.roleCycle[0]);
      }, 0);
      return () => clearTimeout(timer);
    }

    const currentRole = hero.roleCycle[roleIndex];

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
      const timeout = setTimeout(() => setTypedRole((prev) => prev.slice(0, -1)), 40);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && typedRole.length === 0) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % hero.roleCycle.length);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [typedRole, isDeleting, roleIndex, reducedMotion, hero.roleCycle]);

  // Static values from content
  const bioText = hero.bio;
  const metaText = hero.meta;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="flex flex-col"
        >

          <p className="font-mono text-[11px] text-zinc-500 tracking-[0.2em] uppercase mb-5">
            {hero.eyebrow}
          </p>

          <h1 className="font-barlow font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-zinc-50 leading-[0.95] tracking-tight">
            {hero.name}
          </h1>

          <p className="mt-5 text-xl md:text-2xl font-barlow text-violet-400/90 min-h-9">
            {typedRole}
            {!reducedMotion && <span className="animate-blink text-violet-400">|</span>}
          </p>

          <blockquote className="mt-8 border-l-2 border-violet-400/40 pl-5 max-w-xl">
            <p className="font-instrument italic text-xl md:text-2xl text-zinc-300 leading-snug text-balance">
              {hero.philosophy}
            </p>
          </blockquote>

          <p className="text-zinc-400 max-w-xl mt-6 text-base leading-relaxed">
            {bioText}
          </p>

          <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-8">
            {hero.stats.map((stat) => {
              return (
                <div
                  key={stat.label}
                  className="surface-card px-3 py-4 text-center relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/30"
                >
                  <p className="font-barlow font-bold text-zinc-50 text-xl md:text-2xl">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] tracking-wider uppercase text-zinc-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>



          <div className="flex flex-wrap items-center gap-3 mt-10">
            <a
              href={siteConfig.phishSlayerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-gradient-border inline-flex items-center gap-2 bg-zinc-950 text-zinc-50 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-zinc-900 transition-colors"
            >
              View PhishSlayer
              <ExternalLink size={15} />
            </a>
            <button
              onClick={() => {
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 border border-zinc-700/80 text-zinc-300 px-6 py-3 rounded-xl text-sm font-medium hover:border-zinc-600 hover:text-zinc-50 transition-colors"
            >
              See All Work
              <ArrowRight size={15} />
            </button>
          </div>

          <p className="text-zinc-600 text-xs font-mono mt-8 tracking-wide">{metaText}</p>
        </motion.div>

        <TerminalCard />
      </div>
    </section>
  );
}
