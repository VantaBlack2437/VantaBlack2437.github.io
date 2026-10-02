import { aboutNotes, aboutParagraphs } from "../data/portfolio.js";

export default function About() {
  return (
    <section className="section wrap" id="about" aria-labelledby="about-title">
      <div className="about-grid">
        <div>
          <span className="eyebrow">02 / A little context</span>
          <h2 className="about-title" id="about-title">An engineer<br />in the making.</h2>
        </div>
        <div className="about-copy">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index}>
              {typeof paragraph === "string" ? paragraph : (
                <>{paragraph.before}<strong>{paragraph.emphasis}</strong>{paragraph.after}</>
              )}
            </p>
          ))}
        </div>
      </div>
      <div className="about-aside">
        {aboutNotes.map(({ title, description }) => (
          <div className="aside-note" key={title}>
            <span className="eyebrow">{title}</span>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}