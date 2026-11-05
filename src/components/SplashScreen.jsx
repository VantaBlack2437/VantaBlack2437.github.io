import { useEffect, useRef, useState } from "react";

const bootLines = [
  "[ OK ] Mounting root file system...",
  "[ OK ] Loading kernel modules...",
  "[ OK ] Starting network manager...",
  "[ OK ] Initializing Wayland compositor...",
  "[ OK ] Loading project environment...",
  "[ OK ] Fetching engineering logbook...",
  "Starting portfolio environment...",
];

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem("vanta-intro-seen") === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem("vanta-intro-seen", "1");
  } catch {
    return undefined;
  }
}

export default function SplashScreen({ onVisibilityChange, project }) {
  const [phase, setPhase] = useState("waiting");
  const [visibleLines, setVisibleLines] = useState([]);
  const timers = useRef([]);
  const lines = project
    ? [
        `$ cd ~/Vishesh/portfolio/projects/${project.id}`,
        "[ OK ] Resolving project files...",
        "Opening project page...",
      ]
    : bootLines;

  const finish = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    if (!project) markIntroSeen();
    setPhase("done");
    onVisibilityChange?.(false);
  };

  useEffect(() => {
    if (!project && !onVisibilityChange) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isArticleRoute = window.location.hash.startsWith("#/projects/");
    if (reducedMotion || (!project && (hasSeenIntro() || isArticleRoute))) {
      if (!project) markIntroSeen();
      setPhase("done");
      onVisibilityChange?.(false);
      return undefined;
    }

    setPhase("boot");
    onVisibilityChange?.(true);

    const lineInterval = 230;
    lines.forEach((line, index) => {
      timers.current.push(
        window.setTimeout(() => {
          setVisibleLines(current => [...current, line]);
        }, 140 + index * lineInterval),
      );
    });

    const welcomeAt = 140 + lines.length * lineInterval + 190;
    timers.current.push(window.setTimeout(() => setPhase("welcome"), welcomeAt));
    timers.current.push(window.setTimeout(() => setPhase("exit"), welcomeAt + 1450));
    timers.current.push(window.setTimeout(finish, welcomeAt + 2050));

    return () => timers.current.forEach(window.clearTimeout);
  }, [onVisibilityChange, project]);

  useEffect(() => {
    if (phase === "done" || phase === "waiting") return undefined;

    const handleKeyDown = event => {
      if (event.key === "Escape") finish();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  if (phase === "waiting" || phase === "done") return null;

  return (
    <div className={`intro-overlay phase-${phase}`} role="dialog" aria-modal="true" aria-label="Portfolio startup sequence">
      <button className="intro-skip" type="button" onClick={finish}>
        Skip intro <span aria-hidden="true">↗</span>
      </button>

      <div className="intro-terminal" aria-live="polite" aria-atomic="false">
        <div className="intro-terminal-head">
          <span><i aria-hidden="true" /> VK / SYSTEM STARTUP</span>
          <span>SESSION 01</span>
        </div>

        <div className="intro-terminal-lines">
          {visibleLines.map((line, index) => (
            <p
              className={line.startsWith("Starting") || line.startsWith("Opening") ? "intro-final-line" : ""}
              key={`${line}-${index}`}
              style={{
                "--line-width": `${line.length}ch`,
                "--typing-duration": `${Math.min(440, line.length * 7)}ms`,
              }}
            >
              {line}
              {index === visibleLines.length - 1 && <span className="intro-cursor" aria-hidden="true" />}
            </p>
          ))}
        </div>

        <div className="intro-progress">
            <i style={{ width: `${(visibleLines.length / lines.length) * 100}%` }} />
        </div>

        <div className="intro-terminal-foot">
          <span>HYDERABAD, IN</span>
          <span>PERSONAL ENGINEERING LOGBOOK</span>
        </div>
      </div>

      <div className="intro-welcome" aria-hidden={phase === "boot" || undefined}>
        <span className="intro-welcome-meta">
          {project ? `PROJECT ${project.number} / READY` : "SYSTEM ONLINE / PORTFOLIO READY"}
        </span>
        <h1>
          {project ? project.title : "WELCOME"}<span>.</span>
        </h1>
        <p>{project ? project.subtitle || project.category : "Curiosity, built into things."}</p>
      </div>

      <span className="intro-corner-note" aria-hidden="true">
        {project ? `VK / ${project.number}` : "VK / 2026"}
      </span>
    </div>
  );
}
