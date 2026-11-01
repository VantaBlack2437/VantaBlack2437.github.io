import { useEffect } from "react";
import { projectCases } from "../data/projectCases.js";
import ProjectMedia from "./ProjectMedia.jsx";

export default function ProjectDetail({ projectId }) {
  const projectIndex = projectCases.findIndex(project => project.id === projectId);
  const project = projectCases[projectIndex];

  useEffect(() => {
    if (project) document.title = `${project.title} — Vishesh Kandadai`;
    else document.title = "Project not found — Vishesh Kandadai";
  }, [project]);

  if (!project) {
    return (
      <main className="case-not-found wrap">
        <a className="case-back" href="#top">← Back to the portfolio</a>
        <span className="eyebrow">404 / UNKNOWN PROJECT</span>
        <h1>This entry isn’t in the logbook.</h1>
        <a className="case-link" href="#top">Return to selected work <span aria-hidden="true">↗</span></a>
      </main>
    );
  }

  const previous = projectCases[(projectIndex - 1 + projectCases.length) % projectCases.length];
  const next = projectCases[(projectIndex + 1) % projectCases.length];

  return (
    <main className="case-page">
      <div className="case-topbar wrap">
        <a className="case-back" href="#top">← ALL PROJECTS</a>
        <span>VISHESH KANDADAI / ENGINEERING NOTES</span>
        <span>{project.number} / 0{projectCases.length}</span>
      </div>
      <article>
        <header className="case-header wrap">
          <div className="case-heading-meta"><span className="eyebrow">{project.category}</span><span className="case-status">{project.status}</span></div>
          <h1>{project.title}<span>.</span></h1>
          {project.subtitle && <p className="case-subtitle">{project.subtitle}</p>}
          <p className="case-intro">{project.summary}</p>
          <div className="case-links">
            {project.repository && <a className="case-repo" href={project.repository} target="_blank" rel="noreferrer">{project.repositoryLabel} <span aria-hidden="true">↗</span></a>}
            <a className="case-back-inline" href="#work">Back to selected work <span aria-hidden="true">↓</span></a>
          </div>
        </header>
        <div className="case-media wrap"><ProjectMedia project={project} showGallery /></div>
        <div className="case-stack wrap" aria-label={`${project.title} technologies`}>
          <span className="case-stack-label">TOOLS / MATERIALS</span>
          {project.stack.map(technology => <span className="case-tag" key={technology}>{technology}</span>)}
        </div>
        <div className="case-article wrap">
          <aside className="case-article-aside"><span>FIELD NOTES</span><strong>{project.number} / 06</strong><span>{project.category}</span></aside>
          <div className="case-story">
            {project.sections.map((section, index) => (
              <section className="case-story-section" key={section.title}>
                <div className="case-story-kicker"><span>{String(index + 1).padStart(2, "0")} / {section.kicker}</span><i /></div>
                <h2>{section.title}</h2>
                {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                {section.flow && (
                  <div className="case-flow" aria-label={`${project.title} system flow`}>
                    {section.flow.map((step, stepIndex) => (
                      <div className="case-flow-step" key={step}>
                        {stepIndex > 0 && <span className="case-flow-arrow" aria-hidden="true">→</span>}
                        <span className="case-flow-number">{String(stepIndex + 1).padStart(2, "0")}</span>
                        <strong>{step}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
            <p className="case-endnote"><span>STATUS /</span> {project.status}</p>
          </div>
        </div>
      </article>
      <nav className="case-pagination" aria-label="More project case studies">
        <div className="case-pagination-inner wrap">
          <a href={`#/projects/${previous.id}`}><span>← PREVIOUS / {previous.number}</span><strong>{previous.title}</strong></a>
          <a className="case-all-projects" href="#top">Back to portfolio <span aria-hidden="true">↗</span></a>
          <a className="case-next" href={`#/projects/${next.id}`}><span>NEXT / {next.number} →</span><strong>{next.title}</strong></a>
        </div>
      </nav>
    </main>
  );
}
