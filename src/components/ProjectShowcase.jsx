import { useEffect, useRef, useState } from "react";
import { projectCases } from "../data/projectCases.js";
import ProjectMedia from "./ProjectMedia.jsx";

export default function ProjectShowcase() {
  const panelRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setActive(0);
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(Number(visible.target.dataset.index));
        }
      },
      {
        threshold: [0.35, 0.55, 0.8],
        rootMargin: "-10% 0px -28% 0px",
      },
    );

    panelRefs.current.forEach(panel => {
      if (panel) observer.observe(panel);
    });

    return () => observer.disconnect();
  }, []);

  const jumpToProject = index => {
    const panel = panelRefs.current[index];
    if (!panel) return;

    panel.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    setActive(index);
  };

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="work-intro">
          <div>
            <span className="eyebrow">01 / Selected work</span>
            <h2 id="work-title">
              Things I’ve made.<br />
              <em>Things I’m figuring out.</em>
            </h2>
          </div>
          <p>
            A growing collection of experiments across software, robotics, electronics, and the physical world.
          </p>
        </div>

        <div className="work-layout">
          <aside className="work-index" aria-label="Project index">
            <div className="index-heading">
              <span>Project index</span>
              <span>{String(projectCases.length).padStart(2, "0")}</span>
            </div>
            <nav>
              {projectCases.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className={`index-item${active === index ? " is-active" : ""}`}
                  onClick={() => jumpToProject(index)}
                  aria-label={`Jump to ${project.title}`}
                  aria-current={active === index ? "true" : undefined}
                >
                  <span className="index-number">{project.number}</span>
                  <span className="index-name">{project.title}</span>
                  <span className="index-indicator" aria-hidden="true">↗</span>
                </button>
              ))}
            </nav>
            <div className="index-foot">
              <span className="index-progress"><i style={{ height: `${((active + 1) / projectCases.length) * 100}%` }} /></span>
              <small>SCROLL TO EXPLORE</small>
            </div>
          </aside>

          <div className="work-panels">
            {projectCases.map((project, index) => (
              <article
                key={project.id}
                ref={node => {
                  panelRefs.current[index] = node;
                }}
                className={`work-project${active === index ? " is-active" : ""}`}
                data-index={index}
                id={`project-${project.id}`}
              >
                <div className="work-project-meta">
                  <span>{project.number} / {project.category}</span>
                  <span>PERSONAL PROJECT</span>
                </div>

                <ProjectMedia project={project} />

                <div className="work-project-copy">
                  <div className="work-title-row">
                    <div>
                      <span className="work-subtitle">{project.number} · FIELD NOTES</span>
                      <h3>{project.title}</h3>
                    </div>
                    <span className="work-note">{project.status}</span>
                  </div>

                  <p>{project.summary}</p>

                  <div className="work-project-bottom">
                    <div className="work-tags" aria-label={`${project.title} technologies`}>
                      {project.stack.map(tech => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>

                    <a className="button-link view-more-button" href={`#/projects/${project.id}`}>
                      View More <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
