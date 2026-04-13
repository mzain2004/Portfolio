"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "About", href: "#about", sectionId: "about" },
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
  const [activeSection, setActiveSection] = useState<string>("");
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

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-violet-400 z-100 origin-left"
        style={{ scaleX, width: "100%" }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-900/70 backdrop-blur-xl border-b border-zinc-800/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center">
            <span className="font-barlow font-bold text-2xl text-white">MZ</span>
            <span className="font-barlow font-bold text-2xl text-violet-400">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm transition-colors py-1"
              >
                <span
                  className={
                    activeSection === link.sectionId
                      ? "text-violet-400"
                      : "text-zinc-400 hover:text-zinc-50"
                  }
                >
                  {link.label}
                </span>
                {activeSection === link.sectionId && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-violet-400"
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
              className="border border-violet-400/40 text-violet-400 text-sm px-4 py-2 rounded-lg font-mono hover:bg-violet-400/10 hover:shadow-[0_0_12px_rgba(167,139,250,0.3)] transition-all duration-300"
            >
              Visit PhishSlayer
            </a>

            <button
              className="md:hidden text-zinc-400 hover:text-zinc-50 transition-colors"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" />

            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed inset-y-0 right-0 w-72 bg-zinc-900/95 backdrop-blur-xl border-l border-zinc-800/60 z-50 flex flex-col p-6 gap-6"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-zinc-400 hover:text-zinc-50 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`text-sm transition-colors ${
                      activeSection === link.sectionId
                        ? "text-violet-400"
                        : "text-zinc-400 hover:text-zinc-50"
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
                className="border border-violet-400/40 text-violet-400 text-sm px-4 py-2 rounded-lg font-mono hover:bg-violet-400/10 hover:shadow-[0_0_12px_rgba(167,139,250,0.3)] transition-all duration-300 text-center"
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
