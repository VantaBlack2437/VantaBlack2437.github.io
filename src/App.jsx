import { useEffect, useState } from "react";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Experiments from "./components/Experiments.jsx";
import Hero from "./components/Hero.jsx";
import Japan from "./components/Japan.jsx";
import Journey from "./components/Journey.jsx";
import Navbar from "./components/Navbar.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";
import ProjectShowcase from "./components/ProjectShowcase.jsx";
import Skills from "./components/Skills.jsx";
import SplashScreen from "./components/SplashScreen.jsx";

function readRoute() {
  const match = window.location.hash.match(/^#\/projects\/([^/?#]+)/);
  return match ? match[1] : null;
}

export default function App() {
  const [projectId, setProjectId] = useState(readRoute);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      const next = readRoute();
      setProjectId(next);
      if (next) {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    window.addEventListener("hashchange", update);
    update();

    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    if (projectId) return undefined;

    document.title = "Vishesh Kandadai — Engineering, robotics & things that move";
    const targetId = window.location.hash.slice(1);
    if (!targetId || targetId.startsWith("/")) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(targetId)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [projectId]);

  if (projectId) {
    return <ProjectDetail projectId={projectId} />;
  }

  return (
    <>
      <SplashScreen onVisibilityChange={setIntroVisible} />
      <div className={`site-shell${introVisible ? " is-intro-active" : ""}`}>
        <Navbar />
        <main id="top">
          <Hero />
          <div className="ticker" aria-label="Areas of interest">
            <div className="ticker-inner wrap">
              <span className="ticker-item"><i className="ticker-dot" aria-hidden="true" /><b>Currently exploring</b></span>
              <span className="ticker-item">ROBOTICS</span>
              <span className="ticker-item">EMBEDDED SYSTEMS</span>
              <span className="ticker-item">AI / VISION</span>
            </div>
          </div>
          <About />
          <ProjectShowcase />
          <Experiments />
          <Skills />
          <Journey />
          <Japan />
          <Contact />
        </main>
        <footer>
          <div className="footer-row wrap">
            <span className="footer-note">A living logbook · Built while learning · Hyderabad, India</span>
            <div className="footer-links">
              <a href="#top">Back to top ↑</a>
              <a href="https://github.com/VantaBlack2437" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}