"use client";
import { motion } from "motion/react";
import { Mail, Linkedin, Github } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Contact() {
  const linkedInHref = siteConfig.socials.find(s => s.iconName === "linkedin")?.href;
  const githubHref = siteConfig.socials.find(s => s.iconName === "github")?.href;

  const links = [
    { href: `mailto:${siteConfig.email}`, Icon: Mail, label: siteConfig.email },
    { href: linkedInHref, Icon: Linkedin, label: "LinkedIn" },
    { href: githubHref, Icon: Github, label: "GitHub" },
  ];

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-barlow font-bold text-5xl mb-4">
          <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">
            Let&apos;s build something.
          </span>
        </h2>
        <p className="font-mono text-xs text-zinc-500 mb-3">
          Founder. Security Engineer. Open to advisory roles and serious conversations.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-4"
        >
          {links.map(({ href, Icon, label }) =>
            href ? (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 text-zinc-400 hover:text-violet-400 transition-colors duration-300 group border border-zinc-800/60 rounded-xl px-4 py-3 hover:border-violet-400/30"
              >
                <Icon size={20} className="shrink-0" />
                <span className="text-sm font-medium">{label}</span>
              </motion.a>
            ) : null
          )}
        </motion.div>
      </div>
    </section>
  );
}
