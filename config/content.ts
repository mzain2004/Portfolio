export type ProjectStatus = "live" | "in-progress" | "archive";

export type Project = {
  title: string;
  description: string;
  stack: readonly string[];
  href: string;
  liveUrl?: string;
  status: ProjectStatus;
  impact?: string;
};

export const content = {
  hero: {
    eyebrow: "CEO & Director · Security Founder",
    name: "Muhammad Zain",
    roleCycle: [
      "CEO & Director, Cygnus Ventures",
      "Founder & Lead Engineer, PhishSlayer",
      "Autonomous SOC Builder",
      "Security Product Engineer",
      "Cloud & DevSecOps Builder",
    ],
    dob: "2006-02-01",
    webDevStartDate: "2022-07-01",
    philosophy:
      "I do not build dashboards for alerts. I build autonomous systems that make defenders faster than adversaries.",
    bio: "CEO & Director of Cygnus Ventures SMC Pvt Ltd and founder of PhishSlayer, an autonomous SOC intelligence platform for MSSPs and enterprise security teams. Over 4 years of hands-on building, focusing on cloud infrastructure, CI/CD, DevSecOps, AI workflows, and tenant-aware SOC automation.",
    stats: [
      { value: "15+", label: "Projects" },
      { value: "3", label: "Verified Certs" },
      { value: "4+", label: "Years Building" },
    ],
    meta: "Bahawalpur, Pakistan · Building security products in public",
  },

  about: {
    paragraphs: [
      "I'm Zain — CEO & Director at Cygnus Ventures SMC Pvt Ltd and founder of PhishSlayer, an autonomous SOC intelligence platform for MSSPs and enterprise security teams.",
      "My path started with web development and moved through full-stack engineering, cloud, CI/CD, DevSecOps, and AI-assisted security workflows. Today, I'm focused on building practical security products that reduce analyst overload, automate complex investigations, and turn fragmented signals into evidence-backed verdicts."
    ],
    credentials: [
      { icon: "shield" as const, text: "CEO & Director, Cygnus Ventures SMC Pvt Ltd" },
      { icon: "shield" as const, text: "Founder, PhishSlayer (Autonomous SOC)" },
      { icon: "graduation" as const, text: "Studied BS Cyber Security, Air University (until Jun 2026)" },
      { icon: "cloud" as const, text: "Oracle & IBM Certified Professional" },
    ],
  },

  phishSlayer: {
    badge: "LIVE IN PRODUCTION",
    title: "PhishSlayer",
    subtitle: "AI Threat Intelligence & Autonomous SOC",
    description:
      "Autonomous SOC intelligence platform built for MSSPs and enterprise security teams. Implements a 3-layer workflow (L1 triage → L2 identity investigation → L3 forensic reconstruction) using LangGraph multi-agent architecture. Integrates tenant-aware MSSP architecture, RBAC, credential isolation, and approval-based response workflows.",
    progress: [
      { label: "Product Architecture", percent: 50 },
      { label: "Agent Orchestration (L1/L2/L3)", percent: 60 },
      { label: "Wazuh EDR + Telemetry Fusion", percent: 55 },
      { label: "Identity Chain Analysis", percent: 45 },
      { label: "MSSP Multi-tenant Readiness", percent: 35 },
    ],
    architecture: [
      { step: "01", label: "Ingest", detail: "Email threads, EDR alerts, Graph identity signals" },
      { step: "02", label: "Enrich", detail: "AI agents correlate IOCs and attack paths" },
      { step: "03", label: "Triage", detail: "L1/L2/L3 autonomous escalation with context" },
      { step: "04", label: "Respond", detail: "Quarantine, report, and MSSP tenant routing" },
    ],
    metrics: [
      { value: "3-Layer", label: "SOC workflow" },
      { value: "28+", label: "Tool integrations" },
      { value: "Tenant-Aware", label: "MSSP design" },
      { value: "Approval-Based", label: "Response" },
      { value: "Evidence-Backed", label: "Verdicts" },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Docker", "Azure", "Wazuh", "AI Agents"],
    features: [
      { icon: "shield" as const, label: "AI-powered phishing detection" },
      { icon: "zap" as const, label: "Real-time threat intelligence" },
      { icon: "monitor" as const, label: "EDR capabilities via Wazuh" },
      { icon: "cloud" as const, label: "Production Azure deployment" },
      { icon: "user" as const, label: "Built solo from scratch" },
    ],
  },

  skills: {
    core: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Clerk", "Docker", "React"],
    cyberCloud: ["Microsoft Azure", "Wazuh", "LangGraph", "SOC Automation", "Multi-tenant Security", "DevSecOps"],
    systems: ["CI/CD", "GitHub Actions", "Cloud Deployment", "Network Design", "Cryptography"],
  },

  certifications: [
    {
      name: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
      issuer: "Oracle",
      issued: "Oct 2025",
      expires: "Oct 2027",
      status: "Active",
      verifyUrl: "https://www.credly.com",
    },
    {
      name: "Microsoft Office Specialist: Word Associate (Office 2019)",
      issuer: "Microsoft",
      issued: "Mar 2025",
      status: "Verified",
      verifyUrl: "https://www.credly.com",
    },
    {
      name: "Introduction to Software Engineering",
      issuer: "IBM",
      issued: "Mar 2025",
      credentialId: "QPG2QWS99M6X",
      status: "Verified",
      verifyUrl: "https://www.coursera.org/verify/QPG2QWS99M6X",
    },
  ],

  projects: {
    flagship: {
      title: "PhishSlayer",
      description:
        "Autonomous SOC intelligence platform. Multi-agent swarms that auto-triage, investigate, and respond to threats in real time.",
      stack: ["Next.js", "TypeScript", "Supabase", "AI Agents", "Azure"],
      href: "https://github.com/mzain2004/PhishSlayer",
      liveUrl: "https://phishslayer.tech",
      status: "live" as ProjectStatus,
      impact: "Production MSSP platform on cost-optimized infra",
    },
    security: [
      {
        title: "ABTechSolutions",
        description:
          "Enterprise network architecture project with segmentation, security-minded topology, and scalability planning.",
        stack: ["Network Design", "Security", "Infrastructure"],
        href: "https://github.com/mzain2004",
        status: "archive" as ProjectStatus,
        impact: "Enterprise-grade network blueprint",
      },
      {
        title: "Pakistani Route Optimizer",
        description:
          "C++ algorithmic route optimization for ride-share mobility scenarios in Pakistan.",
        stack: ["C++", "Algorithms", "Optimization"],
        href: "https://github.com/mzain2004",
        status: "archive" as ProjectStatus,
        impact: "Time and cost efficiency heuristics",
      },
      {
        title: "Scientific Calculator",
        description:
          "x86 assembly calculator demonstrating CPU-level logic, memory management, and control flow.",
        stack: ["x86 Assembly", "COAL", "Low-level"],
        href: "https://github.com/mzain2004",
        status: "archive" as ProjectStatus,
        impact: "Systems-level arithmetic engine",
      },
      {
        title: "ReelSaver+",
        description:
          "Android utility for fast reel saving with performance-conscious mobile UX.",
        stack: ["Android", "Java/Kotlin", "Mobile UX"],
        href: "https://github.com/mzain2004",
        status: "in-progress" as ProjectStatus,
        impact: "Usability-first mobile utility",
      },
    ] satisfies Project[],
    early: [
      {
        title: "Spotify UI Clone",
        description: "Pixel-accurate Spotify UI recreation focused on layout precision.",
        stack: ["HTML", "CSS"],
        href: "https://github.com/mzain2004/Spotify-UI-Clone",
        status: "archive" as ProjectStatus,
      },
      {
        title: "Dynamic News Portal",
        description: "Real-time news aggregation powered by the GNews API.",
        stack: ["JavaScript", "GNews API"],
        href: "https://github.com/mzain2004/Dynamic-News-Portal",
        status: "archive" as ProjectStatus,
      },
      {
        title: "CRUD App PHP",
        description: "Full-stack CRUD application with clean database operations.",
        stack: ["PHP", "HTML", "CSS"],
        href: "https://github.com/mzain2004/CRUD-App-PHP",
        status: "archive" as ProjectStatus,
      },
    ] satisfies Project[],
  },

  experience: [
    {
      title: "Chief Executive Officer",
      organization: "Cygnus Ventures SMC Pvt Ltd",
      period: "Apr 2026 to Present",
      location: "Kahror Pakka, Punjab, Pakistan · Remote",
      bullets: [
        "Incorporated and registered Cygnus Ventures SMC Pvt Ltd as a private limited cybersecurity company (SECP Corporate ID: 0333221, FBR taxpayer registered Bahawalpur RTO, PSEB registered: Z-25-19734/26).",
        "Building Cygnus Ventures as the company behind PhishSlayer, driving security product strategy and corporate operations.",
        "Focused on autonomous SOC intelligence, MSSP workflows, cloud security infrastructure, and enterprise security tooling."
      ],
    },
    {
      title: "Founder & Lead Engineer",
      organization: "PhishSlayer",
      period: "Feb 2026 to Present",
      location: "Bahawalpur, Punjab, Pakistan · Remote",
      bullets: [
        "Architected and deployed an autonomous SOC intelligence platform for MSSPs and enterprise security teams, delivering evidence-backed verdicts to reduce analyst overload.",
        "Built a 3-layer SOC workflow (L1 triage → L2 identity investigation → L3 forensic reconstruction) using LangGraph multi-agent architecture.",
        "Implemented tenant-aware MSSP architecture, RBAC, credential isolation, and approval-based response actions."
      ],
    },
    {
      title: "Web Development Intern",
      organization: "Digital Empowerment Network",
      period: "Jul 2025 to Aug 2025",
      location: "Islamabad, Pakistan · Remote",
      bullets: [
        "Acquired hands-on exposure to frontend/backend web development fundamentals in a remote team setting.",
        "Collaborated on practical project workflows, version control, and responsive user interfaces."
      ],
    },
    {
      title: "Web Developer / Security Builder",
      organization: "Self Taught",
      period: "2022 to 2025",
      location: "Remote",
      bullets: [
        "Built foundations in frontend development, backend APIs, Linux systems, and GitHub workflows.",
        "Developed 10+ projects across HTML, CSS, JavaScript, PHP, and React.",
        "Transitioned into cybersecurity product building after establishing core software engineering skills."
      ],
    },
  ],

  education: [
    {
      title: "BS Cyber Security",
      school: "Air University Multan Campus",
      date: "Feb 2025 to Jun 2026",
      description: "Studied BS Cyber Security at Air University Multan Campus until Jun 2026, building base cybersecurity concepts, programming, networking, and software engineering foundations before transitioning full-time into company building and security product engineering.",
    },
    {
      title: "BS Data Science",
      school: "Air University Islamabad",
      date: "Sep 2024 to Feb 2025",
      description: "Studied early data science foundations before switching focus toward cybersecurity and security product development."
    },
    { title: "Intermediate ICS", school: "Punjab Group of Colleges", date: "2021 to 2023" },
  ],

  contact: {
    headline: "Let's build something.",
    subline: "Founder. Security Engineer. Open to advisory roles and serious conversations.",
  },

  footer: {
    tagline: "Built with intent. Secured with rigor. Scaled for impact.",
  },
} as const;
