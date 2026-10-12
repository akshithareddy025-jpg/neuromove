import React, { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../../lib/scrollEngine';
import { CheckCircle2, ArrowUp, Zap, ShieldCheck, Cpu } from 'lucide-react';

/**
 * TourCompletionSection
 *
 * The grand finale before the footer — pinned mirror of the NEUROMOVE entry zoom.
 * Entry (NeuromovePortal): hold 0-0.30 at ~1.04, then 1.04->8.5 (power2.in),
 * 8.5->32 (power3.in), 32->54 (power2.out) across +=160% pinned scrub.
 * Exit (here): same pin geometry and segment rhythm in reverse — 2.6->2.2
 * (power2.out), 2.2->1.7 (power3.in), 1.7->1.1 (power2.in), settle to 1.0 —
 * blur 10px->0 and opacity 0.15->1 along the way. Fully reversible on scroll up.
 * Lives outside SylvaWorldB and outside hand-fixed layers: the ONLY exit timeline.
 */
export default function TourCompletionSection({
  onRestartTour = null,
  onProgressUpdate = null,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const badgeRef = useRef(null);
  const quoteRef = useRef(null);

  const onProgressUpdateRef = useRef(onProgressUpdate);
  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
  }, [onProgressUpdate]);

  useEffect(() => {
    const container = containerRef.current;
    const wordmark = wordmarkRef.current;
    const badge = badgeRef.current;
    const quote = quoteRef.current;
    if (!container || !wordmark) return;

    if (isReducedMotion()) {
      gsap.set(wordmark, { scale: 1, opacity: 1, filter: 'blur(0px)' });
      if (badge) gsap.set(badge, { y: 0, opacity: 1 });
      if (quote) gsap.set(quote, { y: 0, opacity: 1 });
      if (onProgressUpdateRef.current) onProgressUpdateRef.current(1);
      return;
    }

    const ctx = gsap.context(() => {
      // Initialize starting state: oversized zoom ready to reverse zoom-out
      gsap.set(wordmark, {
        scale: 2.6,
        opacity: 0.15,
        filter: 'blur(10px)',
        transformOrigin: '50% 50%',
        force3D: true,
      });

      if (badge) {
        gsap.set(badge, { y: 24, opacity: 0 });
      }
      if (quote) {
        gsap.set(quote, { y: 32, opacity: 0 });
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

      // Mirror of the entry zoom in reverse: staged settle from 2.6 down to
      // 1.0 with the portal's matching eases, blur 10px down to 0.
      tl.to(
        wordmark,
        {
          scale: 2.2,
          opacity: 0.35,
          filter: 'blur(6px)',
          ease: 'power2.out',
          duration: 0.1,
        },
        0
      );

      tl.to(
        wordmark,
        {
          scale: 1.7,
          opacity: 0.6,
          filter: 'blur(3px)',
          ease: 'power3.in',
          duration: 0.2,
        },
        0.1
      );

      tl.to(
        wordmark,
        {
          scale: 1.04,
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
          scale: 1.0,
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          duration: 0.3,
        },
        0.7
      );

      // Reveal highlighted badge as text settles
      if (badge) {
        tl.to(
          badge,
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.25,
          },
          0.50
        );
      }

      // Reveal quote and stats
      if (quote) {
        tl.to(
          quote,
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.25,
          },
          0.70
        );
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="tour-completion"
      aria-label="Tour Completion"
      className={`tour-completion-section ${className}`}
      style={{
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        background: '#FFFFFF',
        color: '#0F172A',
        padding: '120px 24px 100px 24px',
        overflow: 'hidden',
        zIndex: 20,
        boxShadow: '0 -20px 60px rgba(0, 0, 0, 0.04)',
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Highlighted Status Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 24px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            border: '1.5px solid #10B981',
            boxShadow: '0 8px 24px -4px rgba(16, 185, 129, 0.25)',
            marginBottom: '36px',
          }}
        >
          <CheckCircle2 size={18} color="#059669" />
          <span
            style={{
              fontSize: '0.86rem',
              fontWeight: 900,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#065F46',
              fontFamily: 'monospace',
            }}
          >
            THE NEUROMOVE TOUR COMPLETED
          </span>
        </div>

        {/* REVERSE ZOOM OUT WORDMARK */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0 40px 0',
            overflow: 'visible',
          }}
        >
          <h1
            ref={wordmarkRef}
            style={{
              margin: 0,
              fontSize: 'clamp(3.8rem, 11vw, 8.5rem)',
              fontWeight: 950,
              letterSpacing: '-0.05em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              color: '#0F172A',
              willChange: 'transform, opacity, filter',
            }}
          >
            NEUROMOVE
          </h1>
        </div>

        {/* Concluding Quote & Narrative */}
        <div
          ref={quoteRef}
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <blockquote
            style={{
              margin: 0,
              fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
              fontWeight: 400,
              lineHeight: 1.65,
              color: '#334155',
              fontStyle: 'italic',
            }}
          >
            &ldquo;From cortical motor intention across the Rolandic strip to real-time,
            millisecond-precision robotic actuation — closing the loop between the human
            nervous system and synthetic intelligence.&rdquo;
          </blockquote>

          <div
            style={{
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#64748B',
              fontFamily: 'monospace',
            }}
          >
            NeuroMove Research Consortium · PhysioNet EEGMMIDB Benchmark
          </div>

          {/* Quick metric highlights */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              marginTop: '12px',
            }}
          >
            <div
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#0F172A',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Zap size={14} color="#1E67D6" /> 97.41% Accuracy
            </div>
            <div
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#0F172A',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Cpu size={14} color="#059669" /> 6.1 ms Latency
            </div>
            <div
              style={{
                padding: '8px 16px',
                borderRadius: '12px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#0F172A',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ShieldCheck size={14} color="#7C3AED" /> Zero Data Leakage
            </div>
          </div>

          {/* Restart Tour button */}
          <button
            onClick={() => {
              if (onRestartTour) {
                onRestartTour();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            style={{
              marginTop: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              borderRadius: '9999px',
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 14px 30px -4px rgba(15, 23, 42, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(15, 23, 42, 0.3)';
            }}
          >
            <ArrowUp size={16} /> Return to Beginning
          </button>
        </div>
      </div>
    </section>
  );
}
