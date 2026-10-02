export default function Hero() {
  function handlePointerMove(event) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const pointerX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const pointerY = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    card.style.setProperty("--pointer-x", `${pointerX * 100}%`);
    card.style.setProperty("--pointer-y", `${pointerY * 100}%`);
    card.style.setProperty("--tilt-x", `${(0.5 - pointerY) * 10}deg`);
    card.style.setProperty("--tilt-y", `${(pointerX - 0.5) * 12}deg`);
  }

  function handlePointerLeave(event) {
    const card = event.currentTarget;
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker eyebrow">
            <span className="availability" aria-hidden="true" />
            First-year ECE student · Hyderabad, India
          </p>
          <h1 id="hero-title">Vishesh<br /><span>Kandadai.</span></h1>
          <p className="hero-lede">
            I like finding the point where <strong>hardware meets software</strong>: sensors, small
            computers, useful code, and the things we can make move.
          </p>
          <div className="hero-actions">
            <a className="button-link" href="#work">Explore what I’m building <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="https://github.com/VantaBlack2437" target="_blank" rel="noreferrer">
              GitHub profile ↗
            </a>
          </div>
        </div>
        <figure
          className="hero-profile"
          aria-label="Vishesh Kandadai profile card"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="profile-card">
            <img src="/profile/me.png" alt="Portrait of Vishesh Kandadai" fetchPriority="high" />
            <div className="profile-card-top"><span>ECE · ROBOTICS · EMBEDDED SYSTEMS</span></div>
            <figcaption className="profile-card-info">
              <div className="profile-card-person">
                <span className="profile-monogram" aria-hidden="true">VK</span>
                <span className="profile-card-copy">
                  <strong>Vishesh Kandadai</strong>
                  <span>@VantaBlack2437 · FIRST-YEAR ECE</span>
                </span>
              </div>
              <a className="profile-contact" href="mailto:kvishesh.dev@gmail.com">Contact ↗</a>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}