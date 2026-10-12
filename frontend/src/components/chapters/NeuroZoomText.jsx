import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * NeuroZoomText
 * 
 * After Hero 2, a large "NEURO" / "NEUROMOVE" heading animates using a smooth
 * text zoom-in effect. The effect is intentionally cinematic: it uses controlled
 * opacity, blur reduction, and scale from a defined origin, synchronized with
 * scroll progress via GSAP ScrollTrigger.
 * 
 * DO NOT create oversized empty areas around the heading. This section naturally
 * leads into the next part of the story (preprocessing video).
 * 
 * Animation sequence:
   0%: Heading at scale 0.8, opacity 0.3, blurred text
   30%: Scale 1.0, opacity 1, crisp text (focus sharpen)
   50%: Slight overshoot to 1.05, then settle
   100%: Heading firmly established, leading into next section
 */
export default function NeuroZoomText({ onTransitionComplete = null }) {
  const wordmarkRef = useRef(null);

  useEffect(() => {
    const wordmark = wordmarkRef.current;
    if (!wordmark) return;

    // Only proceed if this is the active section — handled by parent App.jsx
    // but we still guard here.
    if (!wordmark) return;

    // Lock font metrics before animation to prevent layout shift
    gsap.set(wordmark, {
      fontSize: 'clamp(4rem, 12vw, 6rem)',
      fontWeight: 900,
      letterSpacing: '-0.04em',
      textRendering: 'optimizeLegibility',
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
        trigger: wordmark,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
        onEnter: () => {
          // Start the animation when element enters viewport
        },
        onUpdate: (self) => {
          // Scale based on scroll progress (0 to 1)
          const t = Math.max(0, Math.min(1, self.progress));

          // Easing: ease-out for natural feel
          const eased = 1 - Math.pow(1 - t, 2);

          if (wordmark) {
            // Scale from 0.9 to 1.0, with gentle overshoot at mid-point
            const scale = 0.9 + eased * 0.1; // 0.9 -> 0.99 (~1.0)
            const opacity = 0.3 + eased * 0.7; // 0.3 -> 1.0
            const blur = 1 - eased * 1; // start blurry, become crisp

            gsap.set(wordmark, {
              transformOrigin: '50% 50%',
              scale,
              opacity,
              // filter: `blur(${blur}px)`, // disabled to avoid flicker
            });
          }
        },
      }
    });
  }, wordmarkRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="neuro-zoom"
      className={`neuro-zoom-section`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '60px 24px',
        textAlign: 'center',
        color: '#152015',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <h1
          ref={wordmarkRef}
          style={{
            fontSize: 'clamp(4rem, 12vw, 6rem)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            margin: '0 0 24px 0',
            color: '#152015',
            opacity: 0.3,
            // filter: 'blur(2px)', // suppressed to avoid flicker
          }}
        >
          NEURO
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.2rem, 1.5vw, 1.4rem)',
            lineHeight: 1.6,
            color: '#61D7FF',
            margin: '0 auto',
            maxWidth: '600px',
          }}
        >
          Neural decoding interface — transitioning from raw signal to classified intent.
        </p>
      </div>
    </section>
  );
}