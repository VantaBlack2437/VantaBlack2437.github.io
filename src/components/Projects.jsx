import { Fragment, useState } from "react";
import DepthCarousel from "./DepthCarousel.jsx";
import { secondaryProjects, screenshotSlides } from "../data/portfolio.js";

const depthCarouselItems = screenshotSlides.map(({ src, alt }) => ({ image: src, alt }));

function ScreenshotCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const count = String(activeSlide + 1).padStart(2, "0");
  const total = String(screenshotSlides.length).padStart(2, "0");

  return (
    <div className="screenshot-carousel" role="group" aria-label="Kisan-Tomodachi interface screenshots">
      <DepthCarousel
        items={depthCarouselItems}
        cardWidth={560}
        cardHeight={277}
        radius={4}
        tint="#10251d"
        depth={112}
        spread={12}
        tilt={9}
        perspective={1400}
        visibleCards={4}
        falloff={0.2}
        blur={2}
        autoplay
        autoplayDelay={3200}
        loop
        onChange={index => setActiveSlide(index)}
        ariaLabel="Kisan-Tomodachi interface screenshots"
      />
      <p className="screenshot-caption" aria-live="polite" aria-atomic="true">
          <span className="screenshot-count">{count} / {total}</span>
          <span className="screenshot-title">{screenshotSlides[activeSlide].label}</span>
      </p>
    </div>
  );
}

function ProjectDetails({ items }) {
  return (
    <div className="lab-details">
      {items.map(({ title, description }) => (
        <div className="lab-detail" key={title}>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}

function MagiProject({ project }) {
  return (
    <article className="lab-project" data-project={project.id}>
      <div className="lab-project-top"><span>{project.category}</span><span>{project.index}</span></div>
      <h3>{project.name}</h3>
      <p className="lab-project-summary">{project.summary}</p>
      <div className="agent-grid" aria-label="The three Magi personas">
        {project.agents.map(({ name, role, perspective }) => (
          <div className="agent" key={name}>
            <code>{name}</code>
            <p>{role}<br />{perspective}</p>
          </div>
        ))}
      </div>
      <div className="project-flow" aria-label="Magi decision flow">
        {project.deliberationSteps.map((step, index) => (
          <Fragment key={step}>
            {index > 0 && <b aria-hidden="true">→</b>}
            <span>{step}</span>
          </Fragment>
        ))}
      </div>
      <ProjectDetails items={project.details} />
    </article>
  );
}

function BaburuProject({ project }) {
  return (
    <article className="lab-project" data-project={project.id}>
      <div className="lab-project-top"><span>{project.category}</span><span>{project.index}</span></div>
      <h3>{project.name}</h3>
      <p className="lab-project-summary">{project.summary}</p>
      <div className="baburu-architecture" aria-label="Baburu components">
        {project.architecture.map(({ label, value }) => (
          <div className="baburu-node" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="lab-tags" aria-label="Baburu technologies">
        {project.technologies.map(technology => <span key={technology}>{technology}</span>)}
      </div>
      <ProjectDetails items={project.details} />
    </article>
  );
}

export default function Projects() {
  const [magi, baburu] = secondaryProjects;

  return (
    <section className="section wrap" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / Selected work</span>
          <h2 id="work-title">A project with dirt<br />under its fingernails.</h2>
        </div>
        <p>Built with a hackathon team, a few sensors, and the idea that useful information should be easy to understand.</p>
      </div>
      <article className="featured-project">
        <div className="project-info">
          <span className="project-meta">HACKATHON BUILD · SEPTEMBER 2026</span>
          <h3>Kisan-Tomodachi</h3>
          <p>
            An agricultural monitoring prototype built around an Arduino UNO R4 Minima,
            soil-moisture and DHT11 sensors, an LCD, and an RGB LED. A Python/FastAPI backend reads
            USB serial data and serves JSON; the interface concept uses visual indicators, with
            English, Telugu, Hindi, and Japanese planned.
          </p>
          <div className="tag-list" aria-label="Project technologies">
            <span className="tag">ARDUINO UNO R4</span><span className="tag">PYTHON</span>
            <span className="tag">FASTAPI</span><span className="tag">SERIAL</span>
          </div>
          <a className="project-link" href="https://github.com/VantaBlack2437/Kisan-Tomodachi" target="_blank" rel="noreferrer">
            Explore the project <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ScreenshotCarousel />
      </article>

      <div className="project-lab" aria-labelledby="project-lab-title">
        <div className="project-lab-heading">
          <div><span className="eyebrow">Also on the workbench</span><h3 id="project-lab-title">Two software experiments.</h3></div>
          <p>Exploring how AI systems can deliberate, remember, and feel more interactive.</p>
        </div>
        <div className="project-lab-grid">
          <MagiProject project={magi} />
          <BaburuProject project={baburu} />
        </div>
      </div>
    </section>
  );
}