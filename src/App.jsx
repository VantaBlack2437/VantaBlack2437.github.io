import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Experiments from "./components/Experiments.jsx";
import Hero from "./components/Hero.jsx";
import Japan from "./components/Japan.jsx";
import Journey from "./components/Journey.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <div className="ticker" aria-label="Areas of interest">
          <div className="ticker-inner wrap">
            <span className="ticker-item"><i className="ticker-dot" aria-hidden="true" /><b>Currently exploring</b></span>
            <span className="ticker-item">ROBOTICS</span>
            <span className="ticker-item">EMBEDDED SYSTEMS</span>
            <span className="ticker-item">LINUX &amp; C</span>
          </div>
        </div>
        <Projects />
        <About />
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
    </>
  );
}