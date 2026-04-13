"use client";

import { motion } from "motion/react";

type EducationItem = {
  date: string;
  degree: string;
  institution: string;
  location: string;
};

const education: EducationItem[] = [
  {
    date: "2025 - 2028",
    degree: "BS Cyber Security",
    institution: "Air University Multan Campus",
    location: "Multan, Pakistan",
  },
  {
    date: "2021 - 2023",
    degree: "Intermediate (ICS)",
    institution: "Punjab Group of Colleges",
    location: "Pakistan",
  },
];

export default function StrategicEducation() {
  return (
    <section id="education" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="relative mb-16 text-center md:text-left">
        <h2 className="text-[10vw] md:text-[8vw] font-bold text-zinc-900/40 absolute top-1/2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 select-none tracking-tighter whitespace-nowrap z-0">
          ACADEMICS
        </h2>
        <h3 className="text-3xl md:text-4xl font-semibold relative z-10 tracking-tight text-zinc-100">
          Education
        </h3>
      </div>

      <div className="flex flex-col gap-5">
        {education.map((item, index) => (
          <motion.article
            key={`${item.degree}-${item.institution}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ x: 10 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
            className="rounded-2xl bg-zinc-900/25 backdrop-blur-md border border-zinc-800/60 px-6 py-5 md:px-8 md:py-6"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="md:w-64 shrink-0">
                <p className="font-mono text-sm md:text-base tracking-wide text-cyan-300/80">{item.date}</p>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-100">{item.degree}</h4>
                <p className="mt-2 text-zinc-300 text-sm md:text-base">{item.institution}</p>
                <p className="mt-1 text-zinc-500 text-sm">{item.location}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
