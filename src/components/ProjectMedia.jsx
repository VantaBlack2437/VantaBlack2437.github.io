import { useEffect, useState } from "react";

export default function ProjectMedia({ project, compact = false, showGallery = false }) {
  const imageSlides = [
    ...(project.image ? [{ src: project.image, alt: project.imageAlt, caption: project.label }] : []),
    ...(project.gallery ?? []),
  ].filter((slide, index, slides) => slides.findIndex(candidate => candidate.src === slide.src) === index);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const paused = isHovered || hasFocus;

  useEffect(() => {
    if (
      project.video ||
      imageSlides.length <= 1 ||
      compact ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % imageSlides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [compact, imageSlides.length, paused, project.video]);

  const renderCarousel = !project.video && imageSlides.length > 1;

  const stepSlide = direction => {
    setActiveSlide(current => (current + direction + imageSlides.length) % imageSlides.length);
  };

  return (
    <div className={`project-media project-media-${project.visual}${compact ? " is-compact" : ""}`}>
      {project.video ? (
        <>
          <video
            className="project-media-main"
            controls={!compact}
            muted={compact}
            playsInline
            preload={compact ? "none" : "metadata"}
            poster={project.poster}
            aria-label={`${project.title} demonstration video`}
          >
            <source src={project.video} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
          {!compact && project.videoCaption && <p className="project-video-caption">{project.videoCaption}</p>}
        </>
      ) : renderCarousel ? (
        <div
          className={`project-media-carousel${paused ? " is-paused" : ""}`}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${project.title} project images`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setHasFocus(true)}
          onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
          }}
          onTouchStart={event => {
            event.currentTarget.dataset.touchStart = String(event.touches[0].clientX);
          }}
          onTouchEnd={event => {
            const start = Number(event.currentTarget.dataset.touchStart);
            const distance = event.changedTouches[0].clientX - start;
            if (Math.abs(distance) > 48) stepSlide(distance < 0 ? 1 : -1);
          }}
        >
          {imageSlides.map(({ src, alt, caption }, index) => (
            <img
              key={`${project.id}-${src}`}
              className={`project-media-slide${index === activeSlide ? " is-active" : ""}`}
              src={src}
              alt={alt}
              loading={compact ? "lazy" : "eager"}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${imageSlides.length}: ${caption}`}
              aria-hidden={index !== activeSlide}
            />
          ))}
          <div className="project-carousel-caption" aria-live="polite">
            <span>{imageSlides[activeSlide]?.caption || project.label}</span>
            <span>{String(activeSlide + 1).padStart(2, "0")} / {String(imageSlides.length).padStart(2, "0")}</span>
          </div>
          <div className="project-carousel-controls" aria-label="Project image navigation">
            <button
              className="project-carousel-arrow"
              type="button"
              onClick={() => stepSlide(-1)}
              aria-label={`Previous image for ${project.title}`}
            >
              <span aria-hidden="true">←</span>
            </button>
            {imageSlides.map((slide, index) => (
              <button
                key={`${project.id}-indicator-${slide.src}`}
                type="button"
                className={`project-carousel-indicator${index === activeSlide ? " is-active" : ""}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`View image ${index + 1} for ${project.title}`}
                aria-current={index === activeSlide ? "true" : undefined}
              />
            ))}
            <button
              className="project-carousel-arrow"
              type="button"
              onClick={() => stepSlide(1)}
              aria-label={`Next image for ${project.title}`}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      ) : project.image ? (
        <img className="project-media-main" src={project.image} alt={project.imageAlt} loading={compact ? "lazy" : "eager"} />
      ) : (
        <div className={`project-art project-art-${project.visual}`} role="img" aria-label={`${project.title}: ${project.label}`}>
          {project.visual === "racing" && (
            <>
              <div className="racing-track"><span className="racing-car" /><span className="racing-checkpoint" /></div>
              <span className="art-readout art-readout-top">PPO / ENVIRONMENT LOOP</span>
              <span className="art-readout art-readout-bottom">OBSERVE <i>→</i> ACT <i>→</i> LEARN</span>
            </>
          )}
          {project.visual === "magi" && (
            <div className="magi-artwork">
              <div><small>01 / ANALYTICAL</small><b>CASPER</b></div>
              <div><small>02 / HUMAN-CENTERED</small><b>BALTHASAR</b></div>
              <div><small>03 / PRAGMATIC</small><b>MELCHIOR</b></div>
              <span>THREE INPUTS <i>→</i> ONE QUESTION</span>
            </div>
          )}
          {project.visual === "baburu" && (
            <div className="baburu-artwork"><span className="baburu-orbit baburu-orbit-a" /><span className="baburu-orbit baburu-orbit-b" /><b>ば</b><small>CONTEXT / MEMORY / VOICE</small></div>
          )}
          {project.visual === "plotter" && (
            <div className="plotter-artwork"><span className="plotter-rail plotter-rail-x" /><span className="plotter-rail plotter-rail-y" /><span className="plotter-belt" /><span className="plotter-head" /><small>RECLAIMED PRINTER MOTION</small></div>
          )}
          <span className="project-media-label">{project.label}</span>
        </div>
      )}
      {project.image && project.video && (
        <img className="project-media-poster" src={project.poster} alt={project.imageAlt} loading="lazy" />
      )}
      {!compact && showGallery && project.videoGallery?.length > 0 && (
        <div className="project-video-gallery" aria-label={`${project.title} additional recordings`}>
          {project.videoGallery.map(({ src, poster, title, caption }) => (
            <figure className="project-video-card" key={src}>
              <video controls playsInline preload="none" poster={poster} aria-label={`${project.title}: ${title}`}>
                <source src={src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              <figcaption><strong>{title}</strong><span>{caption}</span></figcaption>
            </figure>
          ))}
        </div>
      )}
      {!compact && showGallery && !renderCarousel && project.gallery?.length > 0 && (
        <div className="project-gallery">
          {project.gallery.map(({ src, alt, caption }) => (
            <figure key={src}>
              <img src={src} alt={alt} loading="lazy" />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
