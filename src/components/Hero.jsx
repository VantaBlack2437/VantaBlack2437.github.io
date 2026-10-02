import ProfileCard from "./ProfileCard.jsx";

export default function Hero() {
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
        <ProfileCard
          className="hero-profile"
          avatarUrl="/profile/me.png"
          miniAvatarUrl="/profile/me.png"
          name="Vishesh Kandadai"
          title="First-year ECE · Robotics"
          handle="VantaBlack2437"
          status="First-year · MLRIT Hyderabad"
          contactText="Email me ↗"
          iconUrl="/profile/card-pattern.svg"
          enableTilt
          enableMobileTilt={false}
          behindGlowEnabled
          behindGlowColor="rgba(239,104,71,.3)"
          behindGlowSize="40%"
          innerGradient="linear-gradient(145deg,rgba(27,77,62,.82) 0%,rgba(20,45,36,.92) 100%)"
          onContactClick={() => { window.location.href = "mailto:kvishesh.dev@gmail.com"; }}
        />
      </div>
    </section>
  );
}