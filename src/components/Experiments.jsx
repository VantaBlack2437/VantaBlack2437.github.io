import { experiments } from "../data/portfolio.js";

export default function Experiments() {
  return (
    <section className="section experiments" aria-labelledby="experiments-title">
      <div className="wrap">
        <div className="section-heading">
          <div><span className="eyebrow">03 / Bench experiments</span><h2 id="experiments-title">Small builds, real signals.</h2></div>
          <p>Side projects and component experiments that make the fundamentals tangible.</p>
        </div>
        <div className="experiment-grid">
          {experiments.map(({ index, title, description }) => (
            <article className="experiment" key={index}>
              <span className="experiment-index">{index}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}