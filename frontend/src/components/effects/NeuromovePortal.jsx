import React, { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '../../lib/scrollEngine';

/**
 * NeuromovePortal
 * Cinematic Text-to-World Transition Portal for NeuroMove.
 * 
 * Hand-first sequencing:
 * - The 3D hand completes its fade (portal p 0.15->0.35) BEFORE this zoom ramps.
 * - Portal p 0.00->0.30 is a hold (scale ~1.04, no zoom) so the hand finishes first.
 * - Major zoom runs 0.30->1.0. Fully reversible on scroll up.
 *
 * Strict Physical Object Zoom Architecture:
 * - NEUROMOVE is rendered as ONE single, stable typographic object.
 * - Layer is promoted to compositor with will-change: transform, opacity, filter.
 * - Cinematic Multi-Phase Camera Zoom into Section 3 / Hero 2.
 * - Fully reversible on scroll up without glitches or console errors.
 */
export default function NeuromovePortal({
  onProgressUpdate = null,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const captionRef = useRef(null);
  const portalGlowRef = useRef(null);

  const onProgressUpdateRef = useRef(onProgressUpdate);
  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
  }, [onProgressUpdate]);

  useEffect(() => {
    const container = containerRef.current;
    const wordmark = wordmarkRef.current;
    const caption = captionRef.current;
    const portalGlow = portalGlowRef.current;
    if (!container || !wordmark) return;

    if (isReducedMotion()) {
      if (onProgressUpdateRef.current) onProgressUpdateRef.current(1);
      return undefined;
    }

    let ctx = gsap.context(() => {
      wordmark.style.width = 'auto';
      wordmark.style.height = 'auto';

      gsap.set(wordmark, {
        scale: 1.0,
        opacity: 1,
        filter: 'blur(0px)',
        transformOrigin: '50% 50%',
        force3D: true,
      });

      if (caption) {
        gsap.set(caption, { opacity: 1, y: 0, force3D: true });
      }

      if (portalGlow) {
        gsap.set(portalGlow, {
          scale: 0.85,
          opacity: 0.40,
          force3D: true,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=160%',
          pin: true,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (onProgressUpdateRef.current) {
              onProgressUpdateRef.current(self.progress);
            }
          },
          onLeaveBack: () => {
            if (onProgressUpdateRef.current) {
              onProgressUpdateRef.current(0);
            }
          },
          onLeave: () => {
            if (onProgressUpdateRef.current) {
              onProgressUpdateRef.current(1);
            }
          },
        },
      });

      tl.to(
        wordmark,
        {
          scale: 1.04,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          duration: 0.3,
        },
        0
      );

      if (caption) {
        tl.to(
          caption,
          {
            opacity: 0,
            y: -15,
            duration: 0.15,
            ease: 'power2.in',
          },
          0
        );
      }

      tl.to(
        wordmark,
        {
          scale: 8.5,
          opacity: 0.98,
          filter: 'blur(0.6px)',
          ease: 'power2.in',
          duration: 0.4,
        },
        0.3
      );

      tl.to(
        wordmark,
        {
          scale: 32.0,
          opacity: 0.35,
          filter: 'blur(3px)',
          ease: 'power3.in',
          duration: 0.2,
        },
        0.7
      );

      tl.to(
        wordmark,
        {
          scale: 54.0,
          opacity: 0,
          filter: 'blur(6px)',
          ease: 'power2.out',
          duration: 0.10,
        },
        0.90
      );

      if (portalGlow) {
        tl.to(
          portalGlow,
          {
            scale: 5.8,
            opacity: 0.85,
            duration: 0.45,
            ease: 'power2.out',
          },
          0.3
        );

        tl.to(
          portalGlow,
          {
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
          },
          0.75
        );
      }

      tl.to(
        container,
        {
          backgroundColor: '#4a4d44',
          ease: 'power2.inOut',
          duration: 0.35,
        },
        0.65
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="neuromove-portal"
      className={`neuromove-portal-pinned-stage ${className}`}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        overflow: 'hidden',
        background: '#020204',
        zIndex: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Central Luminous Radial Beam blooming into daylight */}
      <div
        ref={portalGlowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(97, 215, 255, 0.45) 0%, rgba(52, 211, 153, 0.35) 40%, rgba(30, 103, 214, 0.20) 65%, transparent 80%)',
          filter: 'blur(45px)',
          pointerEvents: 'none',
          zIndex: 5,
          willChange: 'transform, opacity',
        }}
      />

      {/* Wordmark: NEUROMOVE */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Eyebrow */}
        <div
          ref={captionRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.74rem',
            fontWeight: 700,
            color: '#61D7FF',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            zIndex: 12,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#61D7FF', boxShadow: '0 0 10px #61D7FF' }} />
          <span>Precision Neural Interface Portal</span>
        </div>

        <h1
          ref={wordmarkRef}
          className="portal-wordmark"
          style={{
            margin: 0,
            padding: 0,
            display: 'inline-block',
            whiteSpace: 'nowrap',
            fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(4.2rem, 11.5vw, 12rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            textShadow: '0 4px 36px rgba(97, 215, 255, 0.45), 0 0 70px rgba(30, 103, 214, 0.50)',
            willChange: 'transform, opacity, filter',
            transformOrigin: '50% 50%',
          }}
        >
          NEUROMOVE
        </h1>
      </div>

      {/* Bottom scroll caption */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.72rem',
          color: '#A1A1AA',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 12,
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#61D7FF', boxShadow: '0 0 8px #61D7FF' }} />
        <span>Scroll to enter living cortex world</span>
      </div>
    </section>
  );
}
