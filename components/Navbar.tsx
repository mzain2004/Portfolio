"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "PhishSlayer", href: "#phish-slayer", sectionId: "phish-slayer" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Work", href: "#work", sectionId: "work" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.sectionId))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.15, rootMargin: "-80px 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [drawerOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-px bg-violet-400/80 z-[100] origin-left"
        style={{ scaleX, width: "100%" }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center group" aria-label="Home">
            <span className="font-barlow font-bold text-2xl text-zinc-50 group-hover:text-violet-300 transition-colors">
              MZ
            </span>
            <span className="font-barlow font-bold text-2xl text-violet-400">.</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm px-3 py-2 transition-colors"
              >
                <span
                  className={
                    activeSection === link.sectionId
                      ? "text-violet-400"
                      : "text-zinc-500 hover:text-zinc-200"
                  }
                >
                  {link.label}
                </span>
                {activeSection === link.sectionId && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-3 right-3 h-px bg-violet-400/80"
                    transition={transition}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.phishSlayerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex border border-violet-400/35 text-violet-400 text-sm px-4 py-2 rounded-lg font-mono hover:bg-violet-400/10 transition-all duration-300"
            >
              PhishSlayer
            </a>

            <button
              className="lg:hidden text-zinc-500 hover:text-zinc-200 transition-colors p-1"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />

            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed inset-y-0 right-0 w-72 bg-zinc-950/95 backdrop-blur-xl border-l border-zinc-800/60 flex flex-col p-6 gap-6"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-zinc-500 hover:text-zinc-200 transition-colors p-1"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`text-base py-2.5 px-2 rounded-lg transition-colors ${
                      activeSection === link.sectionId
                        ? "text-violet-400 bg-violet-400/8"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                href={siteConfig.phishSlayerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-violet-400/35 text-violet-400 text-sm px-4 py-3 rounded-lg font-mono hover:bg-violet-400/10 transition-all text-center mt-auto"
              >
                Visit PhishSlayer
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
