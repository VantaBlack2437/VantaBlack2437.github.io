import { navigationLinks } from "../data/portfolio.js";

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="nav wrap" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Vishesh Kandadai, home">
          <span className="mark">VK</span>
          <span>Vishesh Kandadai</span>
        </a>
        <div className="nav-links">
          {navigationLinks.map(({ label, href }) => (
            <a href={href} key={href}>{label}</a>
          ))}
          <a className="nav-social nav-github" href="https://github.com/VantaBlack2437" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="nav-social nav-linkedin" href="https://www.linkedin.com/in/vishesh-kandadai/" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </nav>
    </header>
  );
}