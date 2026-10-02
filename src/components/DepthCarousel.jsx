import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import "./DepthCarousel.css";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const normalizeItem = item => typeof item === "string" ? { image: item, alt: "" } : item;

export default function DepthCarousel({
  items,
  cardWidth = 480,
  cardHeight = 270,
  radius = 4,
  tint = "#10251d",
  depth = 112,
  spread = 24,
  tilt = 9,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 2,
  duration = 700,
  ease = "power3.out",
  autoplay = false,
  autoplayDelay = 3200,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = "",
  ariaLabel = "Depth carousel",
}) {
  const data = useMemo(() => (Array.isArray(items) ? items.map(normalizeItem) : []), [items]);
  const count = data.length;
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const overlayRefs = useRef([]);
  const positionRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef(null);
  const scaleRef = useRef(1);
  const configRef = useRef({});
  const onChangeRef = useRef(onChange);
  const dragRef = useRef(null);
  const wheelTimerRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const lightboxRef = useRef(null);
  const reducedMotionRef = useRef(false);
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  onChangeRef.current = onChange;
  configRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  };

  const layout = useCallback(position => {
    const config = configRef.current;
    if (!config.count) return;
    const direction = config.tiltDirection === "left" ? -1 : 1;
    const scale = scaleRef.current;

    for (let index = 0; index < config.count; index += 1) {
      const card = cardRefs.current[index];
      if (!card) continue;

      let distance = index - position;
      if (config.loop && config.count > 1) {
        distance = ((distance % config.count) + config.count) % config.count;
        if (distance > config.count / 2) distance -= config.count;
      }

      const behind = Math.max(0, distance);
      const absoluteDistance = Math.abs(distance);
      const visible = absoluteDistance <= config.visibleCards + 0.5;
      const translateZ = -config.depth * distance;
      const translateX = direction * config.spread * distance;
      const rotateY = direction * config.tilt * clamp(distance, 0, 1);
      let opacity = distance < 0 ? Math.max(0, 1 + distance) : 1;
      if (!visible) opacity = 0;

      const brightness = Math.max(0.15, 1 - behind * config.falloff);
      const blurAmount = config.blur > 0
        ? Math.min(config.blur, (behind / Math.max(1, config.visibleCards)) * config.blur)
        : 0;

      card.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${translateX.toFixed(2)}px) translateZ(${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(3)}deg)`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurAmount.toFixed(2)}px)`;
      card.style.zIndex = String(Math.round(2000 - distance * 20));
      card.style.pointerEvents = visible && opacity > 0.05 ? "auto" : "none";

      const overlay = overlayRefs.current[index];
      if (overlay) overlay.style.opacity = clamp(behind * config.falloff * 1.25, 0, 0.86).toFixed(3);
    }
  }, []);

  const notify = useCallback(index => {
    setActive(index);
    onChangeRef.current?.(index, data[index]);
  }, [data]);

  const tweenTo = useCallback((target, animate) => {
    tweenRef.current?.kill();
    const config = configRef.current;
    const proxy = { position: positionRef.current };
    tweenRef.current = gsap.to(proxy, {
      position: target,
      duration: animate && !reducedMotionRef.current ? config.duration / 1000 : 0,
      ease: config.ease,
      onUpdate: () => {
        positionRef.current = proxy.position;
        layout(proxy.position);
      },
      onComplete: () => {
        if (config.count > 0) positionRef.current = ((positionRef.current % config.count) + config.count) % config.count;
        layout(positionRef.current);
      },
    });
  }, [layout]);

  const setFocus = useCallback((rawIndex, animate = true) => {
    const config = configRef.current;
    if (!config.count) return;
    const index = config.loop
      ? ((rawIndex % config.count) + config.count) % config.count
      : clamp(rawIndex, 0, config.count - 1);
    let delta = index - positionRef.current;
    if (config.loop && config.count > 1) {
      delta = ((delta % config.count) + config.count) % config.count;
      if (delta > config.count / 2) delta -= config.count;
    }
    tweenTo(positionRef.current + delta, animate);
    if (index !== focusRef.current) {
      focusRef.current = index;
      notify(index);
    }
  }, [notify, tweenTo]);

  const navigateBy = useCallback(step => setFocus(focusRef.current + step, true), [setFocus]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      const config = configRef.current;
      const needed = config.cardWidth + Math.abs(config.spread) * 2 + 32;
      scaleRef.current = clamp(width / needed, 0.4, 1);
      layout(positionRef.current);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [layout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const handleWheel = event => {
      const config = configRef.current;
      if (config.count < 2) return;
      event.preventDefault();
      tweenRef.current?.kill();
      const rawDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const delta = event.deltaMode === 1 ? rawDelta * 24 : rawDelta;
      positionRef.current += clamp(delta / (config.cardWidth * 0.9), -0.6, 0.6);
      layout(positionRef.current);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => setFocus(Math.round(positionRef.current), true), 130);
    };
    root.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      root.removeEventListener("wheel", handleWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [layout, setFocus]);

  const handlePointerDown = useCallback(event => {
    if (configRef.current.count < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      x: event.clientX,
      startPosition: positionRef.current,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      moved: false,
      pointerId: event.pointerId,
    };
  }, []);

  const handlePointerMove = useCallback(event => {
    const drag = dragRef.current;
    if (!drag) return;
    const config = configRef.current;
    const stepPixels = Math.max(config.cardWidth * 0.55 * scaleRef.current, 40);
    const deltaX = event.clientX - drag.x;
    if (!drag.moved && Math.abs(deltaX) > 4) {
      drag.moved = true;
      rootRef.current?.setPointerCapture(drag.pointerId);
    }
    if (!drag.moved) return;
    const now = performance.now();
    const elapsed = Math.max(now - drag.lastTime, 1);
    drag.velocity = (event.clientX - drag.lastX) / elapsed;
    drag.lastX = event.clientX;
    drag.lastTime = now;
    positionRef.current = drag.startPosition - deltaX / stepPixels;
    layout(positionRef.current);
  }, [layout]);

  const handlePointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const config = configRef.current;
    const stepPixels = Math.max(config.cardWidth * 0.55 * scaleRef.current, 40);
    const projected = positionRef.current - (drag.velocity * 180) / stepPixels;
    setFocus(Math.round(projected), true);
  }, [setFocus]);

  const handleKeyDown = useCallback(event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigateBy(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      navigateBy(1);
    }
  }, [navigateBy]);

  const handleCardClick = useCallback(index => {
    if (dragRef.current?.moved) return;
    setFocus(index, true);
  }, [setFocus]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!autoplay || reducedMotionRef.current || count < 2) return undefined;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoplayTimerRef.current = window.setInterval(() => {
        if (!hovered && !focused) navigateBy(1);
      }, Math.max(autoplayDelay, 600));
    };
    const handleMouseEnter = () => { hovered = true; };
    const handleMouseLeave = () => { hovered = false; };
    const handleFocusIn = () => { focused = true; };
    const handleFocusOut = () => { focused = false; };
    root?.addEventListener("mouseenter", handleMouseEnter);
    root?.addEventListener("mouseleave", handleMouseLeave);
    root?.addEventListener("focusin", handleFocusIn);
    root?.addEventListener("focusout", handleFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener("mouseenter", handleMouseEnter);
      root?.removeEventListener("mouseleave", handleMouseLeave);
      root?.removeEventListener("focusin", handleFocusIn);
      root?.removeEventListener("focusout", handleFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  useEffect(() => {
    layout(positionRef.current);
  }, [layout, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, cardWidth, cardHeight, radius, count]);

  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;
    if (lightboxOpen && !dialog.open) dialog.showModal();
    if (!lightboxOpen && dialog.open) dialog.close();
  }, [lightboxOpen]);

  useEffect(() => () => {
    tweenRef.current?.kill();
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`depth-carousel ${className}`.trim()}
      style={{ "--dc-perspective": `${perspective}px` }}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      <div className="depth-carousel__stage">
        {data.map((item, index) => (
          <div
            className="depth-carousel__card"
            key={`${item.image}-${index}`}
            ref={element => { cardRefs.current[index] = element; }}
            style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={active !== index}
            onClick={() => handleCardClick(index)}
          >
            <img className="depth-carousel__img" src={item.image} alt={item.alt || ""} draggable={false} />
            <span
              className="depth-carousel__tint"
              ref={element => { overlayRefs.current[index] = element; }}
              style={{ background: tint }}
            />
          </div>
        ))}
      </div>

      {count > 0 && (
        <button
          type="button"
          className="depth-carousel__expand"
          aria-label="View full-size screenshot"
          title="View full-size screenshot"
          onClick={() => setLightboxOpen(true)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M9 4H4v5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--prev"
            aria-label="Previous slide"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--next"
            aria-label="Next slide"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div className="depth-carousel__dots" role="tablist" aria-label="Slides">
          {data.map((_, index) => (
            <button
              type="button"
              role="tab"
              key={index}
              aria-selected={active === index}
              aria-label={`Go to slide ${index + 1}`}
              className={`depth-carousel__dot${active === index ? " is-active" : ""}`}
              onClick={() => setFocus(index, true)}
            />
          ))}
        </div>
      )}

      {count > 0 && (
        <dialog
          ref={lightboxRef}
          className="depth-carousel__lightbox"
          aria-label={`Full-size screenshot ${active + 1} of ${count}`}
          onClose={() => setLightboxOpen(false)}
          onClick={event => {
            if (event.target === event.currentTarget) setLightboxOpen(false);
          }}
          onKeyDown={event => event.stopPropagation()}
        >
          <div className="depth-carousel__lightbox-toolbar">
            <p>{data[active]?.alt || `Screenshot ${active + 1} of ${count}`}</p>
            <button
              type="button"
              className="depth-carousel__lightbox-close"
              aria-label="Close full-size screenshot"
              onClick={() => setLightboxOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <img className="depth-carousel__lightbox-image" src={data[active]?.image} alt={data[active]?.alt || ""} />
        </dialog>
      )}
    </div>
  );
}