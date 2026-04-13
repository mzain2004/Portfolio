"use client";

import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

const experienceItems = [
  {
    title: "BS Cyber Security Student",
    organization: "Air University Multan Campus",
    period: "2025 to Present",
    bullets: [
      "Studying core security concepts including network security, cryptography and ethical hacking",
      "Built PhishSlayer as a live production AI security platform during studies",
      "Completed practical security labs focused on attack paths and vulnerability patching",
    ],
  },
  {
    title: "Web Developer",
    organization: "Self Taught",
    period: "2023 to 2025",
    bullets: [
      "Built 10+ projects spanning HTML, CSS, JavaScript, PHP and React",
      "Developed real world apps including a news portal, Spotify UI clone, CRUD app and calculator UI",
      "Transitioned into cybersecurity after 1.5 years of hands on web development",
    ],
  },
];

const educationItems = [
  {
    title: "BS Cyber Security",
    school: "Air University Multan Campus",
    date: "2025 to Present",
  },
  {
    title: "BS Data Science",
    school: "Air University Islamabad",
    date: "2024 to 2025",
  },
  {
    title: "Intermediate ICS",
    school: "Punjab Group of Colleges",
    date: "2021 to 2023",
  },
];

export default function ExperienceEducation() {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-violet-400" size={24} />
            <h2 className="font-barlow font-bold text-3xl text-white">Experience</h2>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-1.25 top-2 bottom-2 bg-zinc-800 w-px" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="space-y-8"
            >
              {experienceItems.map((item) => (
                <motion.article
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition },
                  }}
                  className="relative"
                >
                  <span className="absolute -left-6.25 top-2 bg-violet-400 w-3 h-3 rounded-full" />
                  <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-5">
                    <h3 className="text-zinc-100 font-semibold text-lg">{item.title}</h3>
                    <p className="text-zinc-300 mt-1">{item.organization}</p>
                    <p className="text-zinc-400 font-mono text-xs mt-1">{item.period}</p>
                    <ul className="mt-4 space-y-2 text-zinc-300 text-sm">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="leading-relaxed">• {bullet}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-violet-400" size={24} />
            <h2 className="font-barlow font-bold text-3xl text-white">Education</h2>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-1.25 top-2 bottom-2 bg-zinc-800 w-px" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="space-y-8"
            >
              {educationItems.map((item) => (
                <motion.article
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition },
                  }}
                  className="relative"
                >
                  <span className="absolute -left-6.25 top-2 bg-violet-400 w-3 h-3 rounded-full" />
                  <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-5">
                    <h3 className="text-zinc-100 font-semibold text-lg">{item.title}</h3>
                    <p className="text-zinc-300 mt-1">{item.school}</p>
                    <span className="inline-flex mt-4 bg-violet-400/10 text-violet-300 border border-violet-400/20 rounded-full px-3 py-1 font-mono text-xs">
                      {item.date}
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
