import { journey } from "../data/portfolio.js";

export default function Journey() {
  return (
    <section className="section wrap" id="journey" aria-labelledby="journey-title">
      <div className="section-heading">
        <div><span className="eyebrow">05 / The timeline</span><h2 id="journey-title">Learning as I go.</h2></div>
        <p>Projects, study, and milestones added as they happen.</p>
      </div>
      <ol className="timeline">
        {journey.map(({ date, title, description }) => (
          <li key={title}>
            <time>{date}</time>
            <div><h3>{title}</h3><p>{description}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}