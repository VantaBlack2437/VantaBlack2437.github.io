export const navigationLinks = [
  { label: "Selected work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#toolkit" },
  { label: "Journey", href: "#journey" },
  { label: "Japan", href: "#japan" },
];

export const screenshotSlides = [
  {
    src: "/screenshots/comfortable.png",
    alt: "Kisan-Tomodachi home dashboard showing comfortable soil moisture and crop and weather summaries",
    label: "Home · Comfortable soil status",
    description: "Home dashboard with comfortable soil status",
  },
  {
    src: "/screenshots/dry.png",
    alt: "Home dashboard showing a critically dry soil warning and a water-now status",
    label: "Home · Critically dry warning",
    description: "Home dashboard with critically dry soil status",
  },
  {
    src: "/screenshots/homestay.png",
    alt: "FarmStay page showing rural accommodation listings",
    label: "FarmStay · Rural accommodation",
    description: "FarmStay listings",
  },
  {
    src: "/screenshots/settings.png",
    alt: "Settings page with English, Telugu, Hindi, and Japanese language options and light and dark themes",
    label: "Settings · Language and themes",
    description: "Language and theme settings",
  },
  {
    src: "/screenshots/sustainablility.png",
    alt: "Sustainability page showing eco points, practice logging, and marketplace offers",
    label: "Sustainability · Practices and rewards",
    description: "Sustainability tracker",
  },
  {
    src: "/screenshots/weather.png",
    alt: "Weather page showing current conditions and a five-day forecast",
    label: "Weather · Current conditions and forecast",
    description: "Weather and forecast",
  },
];

export const secondaryProjects = [
  {
    id: "magi",
    index: "01 / 02",
    category: "Experimental · Multi-agent AI",
    name: "Magi",
    summary:
      "A decision-making experiment inspired by the MAGI system: three specialized AI perspectives independently examine a question, deliberate in rounds, then cast YES, NO, or ABSTAIN votes. It explores conflicting priorities rather than claiming to produce objectively correct answers.",
    agents: [
      { name: "CASPER", role: "Scientist", perspective: "Analytical" },
      { name: "BALTHASAR", role: "Compassionate", perspective: "Human-centered" },
      { name: "MELCHIOR", role: "Pragmatic", perspective: "Practical" },
    ],
    deliberationSteps: [
      "Independent analysis",
      "Multi-round deliberation",
      "Final votes",
      "Collective tally",
    ],
    details: [
      {
        title: "System",
        description:
          "Python CLI with Gemini API, including Gemini 2.0 Flash-Lite. Colored terminal output; deliberations and results can be saved to JSON.",
      },
      {
        title: "Interface experiment",
        description:
          "A separate MAGISystemUI explores the concept in React and Vite with lucide-react.",
      },
      {
        title: "Questions explored",
        description:
          "Logic and compassion, safety and freedom, short- and long-term benefit, individual and collective interests.",
      },
      {
        title: "Tools",
        description: "Python · Gemini API · JSON · React · Vite · lucide-react",
      },
    ],
  },
  {
    id: "baburu",
    index: "02 / 02",
    category: "Ongoing experiment · AI character",
    name: "Baburu",
    summary:
      "An anime-inspired AI VTuber and chat companion for Discord and desktop. The ongoing experiment combines conversation with user-aware context, persistent memory, and a character-led interface.",
    architecture: [
      { label: "01 / CHAT", value: "Discord + desktop" },
      { label: "02 / CONTEXT", value: "Users + shared history" },
      { label: "03 / MEMORY", value: "JSON + summaries" },
      { label: "04 / MODELS", value: "Gemini + KoboldCPP" },
    ],
    technologies: ["PYTHON", "DISCORD.PY", "GEMINI API", "KOBOLDCPP", "PYQT6", "EDGE TTS"],
    details: [
      {
        title: "Discord bot",
        description:
          "Slash commands such as /chat, /join, and /leave, plus mention handling and voice-channel features.",
      },
      {
        title: "Desktop character",
        description:
          "PyQt6 chat UI with character assets, thinking indicators, incremental replies, and worker threads to keep the interface responsive.",
      },
      {
        title: "Memory + models",
        description:
          "JSON conversation history and summaries help retain useful context and distinguish participants. Experiments include Gemini API and local KoboldCPP models.",
      },
      {
        title: "Voice",
        description:
          "Earlier versions used Microsoft Edge TTS to speak generated replies through a connected voice channel.",
      },
    ],
  },
];

export const aboutParagraphs = [
  {
    before: "I’m a first-year ",
    emphasis: "Electronics and Communication Engineering",
    after:
      " student at MLR Institute of Technology in Hyderabad. This is the beginning of my engineering journey, not a finished résumé.",
  },
  "I learn by getting things to work: wiring a sensor, reading its data, writing the code around it, then figuring out what broke. I’m building my foundations in C and algorithms while exploring embedded systems, robotics, automation, and computer vision.",
  "Linux has been part of my everyday toolkit for years. Alongside Arch-based distributions, I’ve explored KDE Plasma, Hyprland, Wayland, PipeWire, system configuration, NVIDIA/CUDA setups, and local LLMs. These are personal experiments, not professional specialties.",
  "I’m drawn to Japan’s robotics and technology ecosystem, and I’m learning Japanese with that long-term direction in mind.",
];

export const aboutNotes = [
  {
    title: "The through-line",
    description: "Physical systems made more useful through thoughtful software.",
  },
  {
    title: "The long view",
    description: "Grow into robotics and embedded engineering, with future study or work in Japan as a goal.",
  },
  {
    title: "Away from the bench",
    description:
      "Japanese language and culture, rock and pop music, and anime, especially the films of Makoto Shinkai.",
  },
];

export const experiments = [
  {
    index: "01 — LIGHT",
    title: "RGB effects controller",
    description: "PWM-controlled red, green, and blue LED channels, explored through Arduino code.",
  },
  {
    index: "02 — TIME",
    title: "Hardware Pomodoro",
    description: "A timer concept with an Arduino, LCD, buzzer, and rotary encoder.",
  },
  {
    index: "03 — SENSING",
    title: "Inputs from the world",
    description: "Hands-on trials with DHT11, soil moisture, IR, LDR, RFID, and ultrasonic sensors.",
  },
];

export const skillGroups = [
  {
    title: "Most hands-on",
    description: "Areas where I’ve spent the most practical time so far.",
    skills: [
      "Linux",
      "Arduino",
      "Basic embedded electronics",
      "Hardware + software integration",
      "Python backends",
      "Git + GitHub",
    ],
  },
  {
    title: "Actively practicing",
    description: "Fundamentals I’m building through projects and regular exercises.",
    skills: ["C", "Pointers + memory", "Arrays + strings", "Algorithms", "LeetCode", "Data structures"],
  },
  {
    title: "Also worked with",
    description: "Tools and technologies I’ve used in projects or personal experiments.",
    skills: [
      "Arduino C++",
      "FastAPI + Uvicorn",
      "Serial · JSON · REST",
      "Bash",
      "GCC + Clang",
      "Neovim",
      "Wayland · Hyprland · PipeWire",
      "HTML + CSS",
      "NVIDIA / CUDA setups",
    ],
  },
];

export const journey = [
  {
    date: "Now · 2026",
    title: "Building C foundations",
    description:
      "Practicing arrays, pointers, memory management, and algorithms through regular exercises and beginner LeetCode problems.",
  },
  {
    date: "September 2026",
    title: "MLRITM India–Japan Innovation Regional Hackathon",
    description:
      "Joined a 12-hour inter-college hackathon and built Kisan-Tomodachi. Participation certificate.",
  },
  {
    date: "2026–2030",
    title: "B.Tech in Electronics and Communication Engineering",
    description:
      "First-year student at MLR Institute of Technology in Hyderabad, building foundations in electronics, programming, and embedded systems.",
  },
  {
    date: "Completed",
    title: "Linux Mastery · Udemy",
    description: "Course covering Linux command-line and system fundamentals.",
  },
];

export const japaneseLevels = [
  { level: "N5", description: "WRITTEN · APPROX.", current: true },
  { level: "N4", description: "VERBAL · APPROX.", current: true },
  { level: "N2", description: "GOAL", current: false },
  { level: "N1", description: "LONG-TERM", current: false },
];

export const contactLinks = [
  { label: "GitHub profile ↗", href: "https://github.com/VantaBlack2437", external: true },
  {
    label: "Browse repositories",
    href: "https://github.com/VantaBlack2437?tab=repositories",
    external: true,
  },
];