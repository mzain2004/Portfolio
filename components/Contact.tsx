"use client";
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import MagneticButton from './MagneticButton';
import { siteConfig } from '../config/site';

const iconMap: Record<string, React.ElementType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
};

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col items-start justify-start text-left"
        >
          <div className="relative mb-8 overflow-hidden">
            <h2 className="text-[12vw] md:text-[8vw] font-bold text-zinc-900/40 absolute top-1/2 left-0 -translate-y-1/2 select-none tracking-tighter whitespace-nowrap z-0">
              CONTACT
            </h2>
            <h3 className="text-3xl md:text-5xl font-semibold relative z-10 tracking-tight text-zinc-100">
              Let's Connect
            </h3>
          </div>
          <p className="text-zinc-400 max-w-md leading-relaxed text-base md:text-lg mb-10 relative z-10">
            Ready to secure your infrastructure or collaborate on next-generation threat intelligence? Let's start a conversation.
          </p>
          
          {/* Social links — minimalist icon + label rows */}
          <div className="flex flex-col items-start justify-start gap-5 relative z-10 w-full">
            {siteConfig.socials.map((link) => {
              const Icon = iconMap[link.iconName];
              return (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  {Icon && <Icon size={20} className="shrink-0" />}
                  <span className="text-sm font-medium">{link.name}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.form 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 rounded-3xl p-8 md:p-10 flex flex-col gap-6 shadow-2xl relative z-10"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-sm font-medium text-zinc-400">Name</label>
            <input 
              type="text" 
              id="contact-name"
              name="name"
              maxLength={100}
              required
              autoComplete="name"
              className="bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-sm font-medium text-zinc-400">Email Address</label>
            <input 
              type="email" 
              id="contact-email"
              name="email"
              maxLength={254}
              required
              autoComplete="email"
              className="bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
              placeholder="hello@domain.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-sm font-medium text-zinc-400">Your Message</label>
            <textarea 
              id="contact-message"
              name="message"
              rows={4}
              maxLength={2000}
              required
              className="bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all resize-none"
              placeholder="How can we collaborate?"
            ></textarea>
          </div>
          <MagneticButton className="mt-2">
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-full rounded-xl p-[1px] overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-[-120%] bg-[conic-gradient(from_180deg,rgba(34,211,238,0.95),rgba(34,211,238,0.05),rgba(34,211,238,0.95))] animate-spin [animation-duration:1.8s]" />
              <span className="relative w-full bg-zinc-950 text-cyan-300 font-semibold py-4 rounded-xl transition-colors duration-300 hover:text-cyan-200 flex items-center justify-center gap-2">
                Send Message <ArrowUpRight size={18} />
              </span>
            </motion.button>
          </MagneticButton>
        </motion.form>
      </div>
    </section>
  );
}
