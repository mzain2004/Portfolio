import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { content } from "@/config/content";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/60 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center mb-3">
              <span className="font-barlow font-bold text-2xl text-zinc-50">MZ</span>
              <span className="font-barlow font-bold text-2xl text-violet-400">.</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm">{content.footer.tagline}</p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex items-center gap-3">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.iconName];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2 rounded-lg border border-zinc-800/80 text-zinc-500 hover:text-violet-400 hover:border-violet-400/30 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
              <a
                href={siteConfig.phishSlayerUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PhishSlayer"
                className="p-2 rounded-lg border border-zinc-800/80 text-zinc-500 hover:text-violet-400 hover:border-violet-400/30 transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            </div>
            <p className="text-zinc-600 text-xs font-mono">
              {`© ${new Date().getFullYear()} Muhammad Zain`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
