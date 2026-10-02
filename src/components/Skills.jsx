import { skillGroups } from "../data/portfolio.js";

export default function Skills() {
  return (
    <section className="section wrap" id="toolkit" aria-labelledby="toolkit-title">
      <div className="section-heading">
        <div><span className="eyebrow">04 / Tools &amp; practice</span><h2 id="toolkit-title">A growing toolkit.</h2></div>
        <p>Grouped by hands-on experience, current practice, and tools I’ve explored.</p>
      </div>
      <div className="skill-groups">
        {skillGroups.map(({ title, description, skills }, index) => (
          <section className="skill-group" key={title} aria-labelledby={`skill-group-${index}`}>
            <h3 id={`skill-group-${index}`}>{title}</h3>
            <p>{description}</p>
            <div className="skill-chips">
              {skills.map(skill => <span key={skill}>{skill}</span>)}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}