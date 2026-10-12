import React, { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '../lib/scrollEngine';

/**
 * NeuroHeadlineZoom
 * Sections 4 & 6: Scroll-triggered dramatic headline zoom-in effect.
 * Pure light theme (NO black backgrounds), centered layout, smooth vector scaling.
 */
export default function NeuroHeadlineZoom({
  title = "NEUROMOVE",
  subtitle = "Precision Neural Signal Processing & Intention Decoding",
  id = "neuro-headline-zoom",
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const headline = headlineRef.current;
    if (!container || !headline) return;

    if (isReducedMotion()) return;

    let ctx = gsap.context(() => {
      gsap.fromTo(
        headline,
        { scale: 0.85, opacity: 0.6, filter: 'blur(4px)' },
        {
          scale: 1.45,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`neuro-headline-zoom-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 24px',
        background: '#FAFAFD',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 10,
        ...style,
      }}
    >
      <div style={{ fontSize: '0.80rem', fontWeight: 800, color: '#1e67d6', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '16px' }}>
        {subtitle}
      </div>

      <h2
        ref={headlineRef}
        style={{
          margin: 0,
          fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #0F172A 0%, #1E67D6 50%, #0284C7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transformOrigin: '50% 50%',
          willChange: 'transform, opacity',
        }}
      >
        {title}
      </h2>
    </div>
  );
}
