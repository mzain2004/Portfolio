"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, Github, Twitter, FileDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import { content } from "@/config/content";
import SectionHeading from "./SectionHeading";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

export default function Contact() {
  const linkedInHref = siteConfig.socials.find((s) => s.iconName === "linkedin")?.href;
  const githubHref = siteConfig.socials.find((s) => s.iconName === "github")?.href;
  const twitterHref = siteConfig.socials.find((s) => s.iconName === "twitter")?.href;

  const links = [
    {
      href: `mailto:${siteConfig.email}`,
      Icon: Mail,
      label: siteConfig.email,
      external: false,
    },
    { href: linkedInHref, Icon: Linkedin, label: "LinkedIn", external: true },
    { href: githubHref, Icon: Github, label: "GitHub", external: true },
    { href: twitterHref, Icon: Twitter, label: "X (Twitter)", external: true },
    {
      href: siteConfig.resumeUrl,
      Icon: FileDown,
      label: "Download Resume",
      external: true,
    },
  ];

  return (
    <section id="contact" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Connect"
          title={content.contact.headline}
          description={content.contact.subline}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl"
        >
          {links.map(({ href, Icon, label, external }) =>
            href ? (
              <motion.a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                variants={cardVariants}
                whileHover={{
                  x: 6,
                  borderColor: "rgba(167, 139, 250, 0.25)",
                  boxShadow: "0 4px 20px -10px rgba(139, 92, 246, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="flex items-center gap-3 text-zinc-400 hover:text-violet-300 transition-colors group surface-card px-5 py-4 cursor-pointer"
              >
                <Icon
                  size={18}
                  className="shrink-0 text-zinc-500 group-hover:text-violet-400 transition-colors duration-300"
                />
                <span className="text-sm font-medium">{label}</span>
              </motion.a>
            ) : null
          )}
        </motion.div>
      </div>
    </section>
  );
}
