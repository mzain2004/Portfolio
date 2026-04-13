"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { siteConfig } from '../config/site';

const XLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: XLogo,
};
import MagneticButton from './MagneticButton';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Typography animations
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Portrait animations
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  // Content animations
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <section ref={ref} className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
      {/* Massive Background Text */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="text-center relative z-0 mb-8 md:mb-0"
      >
        <motion.h1 variants={itemVariants} className="text-[13vw] leading-none font-bold tracking-tighter text-zinc-100 select-none">
          MUHAMMAD <span className="text-zinc-800">ZAIN</span>
        </motion.h1>
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-end md:mt-[-8vw] gap-12 md:gap-0">
        
        {/* Left Content */}
        <motion.div 
          style={{ y: contentY, opacity: contentOpacity }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1"
        >
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight text-zinc-100">
            Cyber Security & Full-Stack Architect
          </motion.h2>
          <motion.p variants={itemVariants} className="text-zinc-400 mb-8 text-sm lg:text-base leading-relaxed max-w-sm">
            BS Cyber Security undergrad at Air University and Founder of Phish-Slayer. Bridging the gap between secure, resilient infrastructure and elegant, high-performance modern web applications.
          </motion.p>
          <motion.div variants={itemVariants} className="mb-8 flex flex-wrap items-start justify-center md:justify-start gap-8">
            <div>
              <p className="text-cyan-400 font-bold text-2xl leading-none">15+</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-500">Projects Built</p>
            </div>
            <div>
              <p className="text-cyan-400 font-bold text-2xl leading-none">4</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-500">Certifications</p>
            </div>
            <div>
              <p className="text-cyan-400 font-bold text-2xl leading-none">2+</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-500">Years Coding</p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4">
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={() => {
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative rounded-full p-[1px] overflow-hidden"
              >
                <span className="absolute inset-[-120%] bg-[conic-gradient(from_180deg,rgba(34,211,238,0.95),rgba(34,211,238,0.05),rgba(34,211,238,0.95))] animate-spin [animation-duration:1.8s]" />
                <span className="relative inline-flex items-center rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors duration-300">
                  View Work <ArrowUpRight size={16} className="inline-block ml-1" />
                </span>
              </motion.button>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                href="/cv.pdf"
                download
                className="inline-flex items-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-white/10 transition-colors duration-300"
              >
                Download CV
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-300"
              >
                Contact
              </motion.button>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Center Portrait */}
        <div className="md:w-1/3 flex justify-center relative order-1 md:order-2">
          <motion.div 
            style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
            className="relative z-10 w-full"
          >
            <div
              className="relative w-full max-w-sm mx-auto h-[30rem] flex justify-center items-end"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)"
              }}
            >
              <img
                src="/founder-portrait.png"
                alt="Muhammad Zain"
                className="w-full h-full object-cover object-top opacity-90 brightness-75 contrast-125"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Links */}
        <motion.div 
          style={{ y: contentY, opacity: contentOpacity }}
          className="md:w-1/3 flex flex-col items-center md:items-end gap-6 order-3"
        >
          {siteConfig.socials.map((link) => {
            const Icon = iconMap[link.iconName];
            return (
              <a 
                key={link.name} 
                href={link.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-cyan-400 hover:bg-white/10 hover:backdrop-blur-md px-4 py-2 rounded-full transition-all duration-300 group"
              >
                {Icon && <Icon size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />}
                {link.name}
              </a>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
