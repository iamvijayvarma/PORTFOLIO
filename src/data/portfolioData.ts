export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  githubUrl: string;
  featuredUrl?: string;
  highlights: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; iconName: string; desc: string }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  badge: string;
}

export interface AchievementItem {
  id: string;
  prize: string;
  competition: string;
  venue: string;
  year: string;
  icon: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  institution?: string;
  description: string;
  badge?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    fullName: "Vijay Varma V",
    brandName: "VIJAY",
    titles: ["AI Developer", "Java Developer", "ECE Undergraduate"],
    college: "V.S.B Engineering College",
    location: "Karur, Tamil Nadu",
    degree: "B.E Electronics and Communication Engineering",
    cgpa: "7.32",
    tagline: "Building intelligent software, embedded systems, and modern digital experiences.",
    aboutStory: `I am an Electronics and Communication Engineering undergraduate at V.S.B Engineering College driven by a relentless curiosity for how hardware, software, and intelligence converge. 
    
    My focus spans full-stack Java engineering, cutting-edge AI software agents, and hardware-level embedded microcontrollers. From engineering autonomous robots to analyzing complex telecommunication infrastructure at BSNL, I thrive on crafting elegant, robust, and scalable technological solutions.`,
    stats: [
      { label: "Engineering Degree", value: "B.E. ECE" },
      { label: "Telecom Internship", value: "BSNL" },
      { label: "LIRO & National Awards", value: "03" },
      { label: "CGPA Score", value: "7.32" },
    ]
  },
  socials: {
    github: "https://github.com/iamvijayvarma",
    linkedin: "https://www.linkedin.com/in/vijay-varma-07b857339/",
    instagram: "https://instagram.com/YOUR_USERNAME",
    instagramHandle: "@YOUR_USERNAME",
    email: "vvarmavijay18@gmail.com",
    resume: "/resume.pdf"
  },
  journeyTimeline: [
    {
      year: "2018",
      title: "National Level Roller Skating Champion",
      description: "Won Gold Medal establishing early discipline and high-performance focus.",
      badge: "National Gold Medalist"
    },
    {
      year: "2022",
      title: "Completed SSLC",
      institution: "Adhiyaman Matric Higher Secondary School",
      description: "Successfully completed Secondary School at Adhiyaman Matric Higher Secondary School with strong fundamentals in science and mathematics.",
      badge: "Secondary Education"
    },
    {
      year: "2024",
      title: "Completed Higher Secondary",
      institution: "Adhiyaman Matric Higher Secondary School",
      description: "Completed HSC at Adhiyaman Matric Higher Secondary School with a focus on Mathematics, Physics, and Computer Science.",
      badge: "Higher Secondary"
    },
    {
      year: "September 2024",
      title: "Joined V.S.B Engineering College",
      institution: "V.S.B Engineering College, Karur",
      description: "Started Electronics and Communication Engineering, specializing in hardware-software convergence and signal systems.",
      badge: "Undergraduate Degree"
    },
    {
      year: "2025",
      title: "Built My First Robotics Project",
      institution: "Robotics & Microcontroller Lab",
      description: "Designed and developed an autonomous Line Follower Robot using Arduino, infrared sensor arrays, and custom PWM trajectory control.",
      badge: "Robotics Engineering"
    },
    {
      year: "2025",
      title: "LIRO Technical Competition",
      institution: "Adithya College & V.S.B Engineering College",
      description: "Won 2nd Prize at Adithya College of Engineering & 3rd Prize at V.S.B Engineering College for robotic engineering excellence.",
      badge: "Competition Awards"
    },
    {
      year: "2026",
      title: "Started Building AI Applications",
      institution: "Autonomous AI Architecture",
      description: "Exploring Artificial Intelligence, Computer Vision, LLM agent toolchains (ChatGPT, Claude, Antigravity), and modern software development.",
      badge: "AI & Software"
    },
    {
      year: "Present",
      title: "Building The Future",
      institution: "Software & Systems Engineering",
      description: "Continuously learning, building projects, and growing as an engineer to pioneer transformative technological solutions.",
      badge: "Active Focus"
    }
  ] as JourneyMilestone[],
  experience: [
    {
      id: "bsnl-intern",
      company: "BSNL (Bharat Sanchar Nigam Limited)",
      role: "Telecom Engineer Intern",
      period: "Internship",
      location: "India",
      description: "Gained hands-on practical exposure to telecommunication infrastructure, high-speed optical fiber networks, and digital switching systems.",
      responsibilities: [
        "Analyzed Telecommunication Systems and signal routing protocols",
        "Studied core Networking Concepts, TCP/IP stack, and packet switching",
        "Investigated Signal Transmission, noise attenuation, and optical fiber channels",
        "Inspected industrial Telecom Infrastructure and switching hardware exchanges"
      ],
      badge: "Industry Certified Internship"
    }
  ] as ExperienceItem[],
  projects: [
    {
      id: "line-follower-robot",
      title: "Autonomous Line Follower Robot",
      subtitle: "Embedded Robotics & Sensor Integration",
      description: "Designed and developed an autonomous robotic system capable of real-time path tracking using infrared sensor feedback loops and microcontroller logic.",
      longDescription: "An advanced mechatronic system engineered from scratch. Utilizes high-precision infrared sensor arrays to dynamically adjust motor pulse-width modulation (PWM) signals via an Arduino microcontroller, ensuring rapid closed-loop trajectory correction on complex paths.",
      image: "/line-follower.png",
      tags: ["Arduino", "Embedded Systems", "Microcontroller", "Sensors", "C/C++", "PWM Control"],
      githubUrl: "https://github.com/iamvijayvarma",
      highlights: [
        "Implemented closed-loop PID control algorithm for smooth line tracking",
        "Designed custom infrared sensor array interface for real-time path detection",
        "Optimized motor driver PWM signals for high-speed trajectory stabilization",
        "Award-winning performance in inter-collegiate LIRO competitions"
      ]
    },
    {
      id: "ai-java-agent",
      title: "AI-Powered Java Intelligence Core",
      subtitle: "Software Engineering & LLM Integration",
      description: "A high-performance Java application incorporating AI LLM agent capabilities (ChatGPT, Claude, Antigravity APIs) for automated problem solving.",
      longDescription: "Built with modern Java architecture, this project integrates multi-agent AI capabilities with robust object-oriented system design. It facilitates automated data analysis, intelligent query routing, and algorithmic decision making.",
      image: "/hero-portrait.png",
      tags: ["Java", "Artificial Intelligence", "ChatGPT", "Claude", "Antigravity", "REST APIs"],
      githubUrl: "https://github.com/iamvijayvarma",
      highlights: [
        "Modular Java backend architecture with asynchronous workflow execution",
        "Multi-model AI integration for automated prompt engineering and reasoning",
        "Extensive error handling, logging, and performance benchmarking"
      ]
    }
  ] as Project[],
  achievements: [
    {
      id: "liro-adithya",
      prize: "Second Prize (2nd Place)",
      competition: "LIRO Technical Competition",
      venue: "Adithya College of Engineering",
      year: "2025",
      icon: "Trophy"
    },
    {
      id: "liro-vsb",
      prize: "Third Prize (3rd Place)",
      competition: "LIRO Technical Competition",
      venue: "V.S.B Engineering College, Karur",
      year: "2025",
      icon: "Award"
    },
    {
      id: "roller-skating-gold",
      prize: "Gold Medal (1st Place)",
      competition: "National Level Roller Skating Championship",
      venue: "Adhiyaman Matric Higher Secondary School",
      year: "2018",
      icon: "Trophy"
    }
  ] as AchievementItem[],
  certifications: [
    {
      id: "python-foundation",
      title: "Python Foundation Certification",
      issuer: "Authorized Certification Authority",
      date: "Verified Credential",
      credentialId: "PY-FOUND-2025"
    }
  ] as CertificationItem[]
};
