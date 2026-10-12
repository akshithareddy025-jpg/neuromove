import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Brain, Activity, Zap, Sparkles, ArrowDown } from 'lucide-react';

/**
 * SmoothZoneTransition
 * Butter-smooth, cinematic bioelectric transition bridge from the Obsidian Laboratory Suite
 * into the Alabaster & Baby Pink Clinical Storytelling Zone.
 * 
 * Features:
 * - Ultra-gradual, non-linear multi-stop gradient melting obsidian black into lush baby-pink.
 * - Prominent, majestic "NEUROMOVE" title with iridescent aurora illumination.
 * - Soft ambient rose, violet, and peach radial light blooms for a breathtaking visual transition.
 * - Synaptic pulse line guiding the user's attention from dark signal processing to physical rehabilitation.
 */
export default function SmoothZoneTransition({
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`smooth-zone-transition ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '440px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 70px 24px',
        boxSizing: 'border-box',
        ...style,
      }}
      aria-hidden="true"
    >
      {/* =========================================================================
          LAYER 1: NON-LINEAR MULTI-STOP LUMINANCE GRADIENT
          Melts deep obsidian (#020204) through deep twilight purple and royal rose
          into soft, velvety baby-pink (#fdf2f8) with zero color banding.
          ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            180deg,
            #020204 0%,
            #06060c 10%,
            #0d0818 20%,
            #1b0c28 32%,
            #33103c 45%,
            #58174e 58%,
            #882163 70%,
            #bf387c 80%,
            #eb74a6 89%,
            #f9bfd8 95%,
            #fdf2f8 100%
          )`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* =========================================================================
          LAYER 2: AMBIENT AURORA BLOOMS & VELVET GLOW
          Soft radial glows adding organic warmth, depth, and elegance.
          ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 70% 120px at 50% 8%, rgba(56, 189, 248, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 85% 180px at 50% 48%, rgba(244, 114, 182, 0.42) 0%, rgba(249, 115, 22, 0.16) 45%, transparent 80%),
            radial-gradient(circle 950px at 50% 92%, rgba(251, 207, 232, 0.75) 0%, transparent 70%),
            radial-gradient(circle 500px at 20% 60%, rgba(192, 132, 252, 0.25) 0%, transparent 60%),
            radial-gradient(circle 500px at 80% 60%, rgba(244, 114, 182, 0.28) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Subtle animated horizontal aurora sweep beam */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.3) 20%, rgba(244, 114, 182, 0.85) 50%, rgba(249, 115, 22, 0.45) 80%, transparent 100%)',
          boxShadow: '0 0 32px rgba(244, 114, 182, 0.8), 0 0 64px rgba(249, 115, 22, 0.4)',
          opacity: inView ? 0.9 : 0.4,
          transform: 'translateY(-50%)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* =========================================================================
          LAYER 3: THE PROMINENT "NEUROMOVE" TITLE & SYNAPTIC CONNECTOR
          ========================================================================= */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: '840px',
        }}
      >
        {/* Top Connecting Bioelectric Node */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
            opacity: inView ? 1 : 0.5,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '48px',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(244, 114, 182, 0.9))',
              boxShadow: '0 0 10px rgba(244, 114, 182, 0.6)',
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 0 12px #FFFFFF, 0 0 24px #f472b6',
            }}
          />
        </div>

        {/* Small Ribbon Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            background: 'rgba(15, 10, 24, 0.88)',
            border: '1px solid rgba(244, 114, 182, 0.45)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(244, 114, 182, 0.3)',
            marginBottom: '16px',
            transform: inView ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)',
            opacity: inView ? 1 : 0.6,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#f472b6',
              boxShadow: '0 0 10px #f472b6, 0 0 18px rgba(244, 114, 182, 0.9)',
              animation: 'horizon-pulse-dot 2s infinite',
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}
          >
            CLOSED-LOOP NEUROREHABILITATION HORIZON
          </span>
          <span style={{ fontSize: '0.68rem', color: '#fbcfe8', fontWeight: 600 }}>
            · 5-DOF ORTHOSIS
          </span>
        </div>

        {/* THE PROMINENT TITLE "NEUROMOVE" */}
        <h1
          style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
            fontWeight: 950,
            letterSpacing: '-0.035em',
            margin: '0 0 12px 0',
            lineHeight: 1.05,
            background: 'linear-gradient(135deg, #ffffff 0%, #fce7f3 40%, #f472b6 75%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 45px rgba(244, 114, 182, 0.45)',
            transform: inView ? 'translateY(0)' : 'translateY(12px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, opacity 0.6s ease 0.1s',
          }}
        >
          NeuroMove
        </h1>

        {/* Subtitle / Tagline */}
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
            color: '#fdf2f8',
            maxWidth: '640px',
            margin: '0 auto 20px auto',
            lineHeight: 1.6,
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)',
            transform: inView ? 'translateY(0)' : 'translateY(8px)',
            opacity: inView ? 0.95 : 0,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, opacity 0.6s ease 0.15s',
          }}
        >
          From Human Thought to Somatic Rehabilitation
        </p>

        {/* Supporting Micro-Copy */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.8)',
            background: 'rgba(0, 0, 0, 0.35)',
            padding: '6px 14px',
            borderRadius: '9999px',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            transform: inView ? 'translateY(0)' : 'translateY(6px)',
            opacity: inView ? 1 : 0,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, opacity 0.5s ease 0.2s',
          }}
        >
          <span>Purified EEG Signals</span>
          <span style={{ color: '#f472b6' }}>→</span>
          <span>Dual-Champion AI Decoding</span>
          <span style={{ color: '#f472b6' }}>→</span>
          <span>Real-Time Closed-Loop Action</span>
        </div>

        {/* Bottom Connecting Bioelectric Flow Line */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '24px',
            opacity: inView ? 1 : 0.6,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#f472b6',
              boxShadow: '0 0 12px #f472b6, 0 0 20px rgba(244, 114, 182, 0.8)',
            }}
          />
          <div
            style={{
              width: '1px',
              height: '52px',
              background: 'linear-gradient(to bottom, rgba(244, 114, 182, 0.9), rgba(244, 114, 182, 0.05))',
            }}
          />
          <ChevronDown
            size={18}
            color="#db2777"
            style={{
              marginTop: '-6px',
              animation: 'horizon-chevron-bounce 2s infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
}
