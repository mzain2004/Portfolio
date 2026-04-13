"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'Core Skills', href: '#services' },
    { label: 'Experience', href: '#experience' },
  ];
  const [activeLink, setActiveLink] = useState('#work');

  return (
    <>
      {/* Fixed Top-Left Logo */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 z-50 text-4xl md:text-5xl font-black tracking-tighter text-zinc-100 mix-blend-difference pointer-events-none">
        MZ.
      </div>

      {/* Centered Floating Pill Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-6 md:top-8 left-1/2 z-50 flex items-center gap-6 md:gap-12 px-4 py-2 md:px-6 md:py-3 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 rounded-full shadow-2xl"
      >
        <div className="hidden md:flex gap-4 text-sm font-medium text-zinc-400 items-center">
          {navItems.map((item) => {
            const isActive = activeLink === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setActiveLink(item.href)}
                onFocus={() => setActiveLink(item.href)}
                onClick={() => setActiveLink(item.href)}
                className={`relative px-2 py-2 transition-colors duration-300 ${
                  isActive ? 'text-zinc-100' : 'text-zinc-400 hover:text-cyan-400'
                }`}
              >
                {item.label}
                <motion.span
                  layoutId="nav-glow-underline"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </div>
        
        <MagneticButton href="#contact">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative rounded-full p-[1px] overflow-hidden"
          >
            <div className="absolute inset-[-120%] bg-[conic-gradient(from_180deg,rgba(34,211,238,0.95),rgba(34,211,238,0.05),rgba(34,211,238,0.95))] animate-spin [animation-duration:1.8s]" />
            <div className="relative bg-zinc-950 px-5 py-2.5 rounded-full text-sm font-semibold text-cyan-300 transition-colors duration-300 hover:text-cyan-200 flex items-center gap-2 cursor-pointer">
              Contact <ArrowUpRight size={16} />
            </div>
          </motion.div>
        </MagneticButton>
      </motion.nav>
    </>
  );
}
