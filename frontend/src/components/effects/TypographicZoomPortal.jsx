import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../../lib/scrollEngine';
import { Activity, Zap, ArrowDown, ShieldCheck, CheckCircle2 } from 'lucide-react';

/**
 * TypographicZoomPortal
 * NEUROMOVE — POST-NEURON VISUAL WORLD
 * 
 * Choreography:
 * 1. THE ZOOM TRANSITION:
 *    BLACK -> NEUROMOVE -> extreme typography zoom -> letters fill viewport -> zoom continues -> visual space opens
 * 2. NEURON SYMBOL & TRANSITION TRIGGER:
 *    - Stage 1 (Neuron activation): glowing subtly using ONLY baby blue + yellow + green (No purple, no orange, no white glow).
 *    - Stage 2 (Signal propagation): yellow/light-green pulse travels through soma -> branches -> axon -> terminals -> entire neuron.
 *    - Stage 3 (Color expansion): baby blue -> green -> yellow -> maroon gradually emerge organically.
 *    - Stage 4 (Morph): neuron dissolves into particles, signal lines, organic textures.
 * 3. UPLOADED BRAIN IMAGE — PRIMARY BACKGROUND:
 *    - Uploaded 3D brain (/brain_model_3d.png) enters smoothly (scale 0.85 -> 1.00, opacity 0 -> 1).
 *    - Natural brain coloration preserved.
 *    - 3D depth: floating particles, camera drift, soft double shadow, cortical hotspot pulses.
 * 4. EDITORIAL COMPOSITION (BLACK TEXT ONLY):
 *    - "HUMAN INTENTION BECOMES SIGNAL BECOMES DATA" in 100% BLACK TEXT.
 * 5. BRAIN -> EEG TRANSFORMATION:
 *    - Signal lines stream out from M1 motor cortex and transform into EEG waveforms (Baby Blue, Green, Yellow, Maroon with black text).
 *    - Brain recedes, EEG dominant, flawless unpin into Chapter 01.
 */
export default function TypographicZoomPortal({
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const lettersLeftRef = useRef([]);
  const lettersRightRef = useRef([]);

  // Neuron Refs
  const neuronContainerRef = useRef(null);
  const neuronGlowRef = useRef(null);
  const neuronPulseRef = useRef(null);
  const colorExpansionRef = useRef(null);
  const neuronDissolveParticlesRef = useRef(null);

  // Brain & EEG World Refs
  const brainWorldRef = useRef(null);
  const brainImgRef = useRef(null);
  const editorialTextRef = useRef(null);
  const eegWaveformRef = useRef(null);
  const backgroundMorphRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const wordmark = wordmarkRef.current;
    const neuronContainer = neuronContainerRef.current;
    const neuronGlow = neuronGlowRef.current;
    const neuronPulse = neuronPulseRef.current;
    const colorExpansion = colorExpansionRef.current;
    const neuronParticles = neuronDissolveParticlesRef.current;
    const brainWorld = brainWorldRef.current;
    const brainImg = brainImgRef.current;
    const editorialText = editorialTextRef.current;
    const eegWaveform = eegWaveformRef.current;
    const bgMorph = backgroundMorphRef.current;

    if (!container || !wordmark) return;

    if (isReducedMotion()) {
      gsap.set([neuronContainer, colorExpansion, neuronParticles], { display: 'none' });
      gsap.set(bgMorph, { opacity: 1 });
      gsap.set(brainWorld, { opacity: 1 });
      gsap.set(brainImg, { scale: 1, opacity: 1 });
      gsap.set(editorialText, { opacity: 1 });
      return;
    }

    // Initial GSAP states
    gsap.set(wordmark, { scale: 1, opacity: 1 });
    gsap.set(neuronContainer, { opacity: 0, scale: 0.8, pointerEvents: 'none' });
    gsap.set(neuronGlow, { opacity: 0, scale: 0.8 });
    gsap.set(neuronPulse, { strokeDashoffset: 600, opacity: 0 });
    gsap.set(colorExpansion, { opacity: 0, scale: 0.6 });
    gsap.set(neuronParticles, { opacity: 0, scale: 0.9 });
    gsap.set(bgMorph, { opacity: 0 });
    gsap.set(brainWorld, { opacity: 0, pointerEvents: 'none' });
    gsap.set(brainImg, { scale: 0.85, opacity: 0, y: 30 });
    gsap.set(editorialText, { opacity: 0, x: -30 });
    gsap.set(eegWaveform, { opacity: 0, y: 20 });

    const leftLetters = lettersLeftRef.current.filter(Boolean);
    const rightLetters = lettersRightRef.current.filter(Boolean);

    // Master Unified Pinned Timeline (Height: 100vh pinned with pinSpacing: true)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=260%', // Generous, measured scrollytelling momentum
        pin: true,
        pinSpacing: true, // Clean spacer; leaves 0 leftover height on unpin
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // =========================================================================
    // 1. THE ZOOM TRANSITION (Progress: 0.00 -> 0.22)
    // BLACK -> NEUROMOVE -> extreme typography zoom -> letters clear viewport
    // =========================================================================
    tl.to(
      wordmark,
      {
        scale: 28.0,
        opacity: 0,
        ease: 'power2.in',
        duration: 0.22,
      },
      0
    );

    tl.to(
      leftLetters,
      {
        xPercent: -45,
        opacity: 0,
        duration: 0.18,
        ease: 'power1.out',
      },
      0.02
    );

    tl.to(
      rightLetters,
      {
        xPercent: 45,
        opacity: 0,
        duration: 0.18,
        ease: 'power1.out',
      },
      0.02
    );

    // =========================================================================
    // 2. NEURON SYMBOL EMERGENCE & ACTIVATION (Progress: 0.20 -> 0.36)
    // Stage 1: Glowing subtly using ONLY baby blue + yellow + green
    // =========================================================================
    tl.to(
      neuronContainer,
      {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        duration: 0.14,
      },
      0.20
    );

    tl.to(
      neuronGlow,
      {
        opacity: 0.9,
        scale: 1.15,
        ease: 'power1.inOut',
        duration: 0.14,
      },
      0.22
    );

    // =========================================================================
    // 3. STAGE 2: SIGNAL PROPAGATION (Progress: 0.34 -> 0.48)
    // Small yellow/light-green pulse travels through branches -> axon -> entire neuron
    // =========================================================================
    tl.to(
      neuronPulse,
      {
        opacity: 1,
        strokeDashoffset: 0,
        ease: 'none',
        duration: 0.14,
      },
      0.34
    );

    // =========================================================================
    // 4. STAGE 3: COLOR EXPANSION (Progress: 0.46 -> 0.56)
    // As signal reaches edges: baby blue -> green -> yellow -> maroon emerge organically
    // =========================================================================
    tl.to(
      colorExpansion,
      {
        opacity: 1,
        scale: 2.2,
        ease: 'power2.out',
        duration: 0.12,
      },
      0.46
    );

    // =========================================================================
    // 5. STAGE 4: MORPH & DISSOLVE INTO PARTICLES (Progress: 0.54 -> 0.64)
    // Neuron structure dissolves into particles and signals
    // =========================================================================
    tl.to(
      neuronParticles,
      {
        opacity: 1,
        scale: 1.8,
        duration: 0.10,
        ease: 'power1.out',
      },
      0.54
    );

    tl.to(
      [neuronContainer, neuronGlow, colorExpansion],
      {
        opacity: 0,
        scale: 1.3,
        duration: 0.08,
        ease: 'power2.in',
      },
      0.58
    );

    // Continuous background morph into the pristine Baby Blue scientific atmosphere
    tl.to(
      bgMorph,
      {
        opacity: 1,
        ease: 'power2.inOut',
        duration: 0.12,
      },
      0.56
    );

    // =========================================================================
    // 6. UPLOADED BRAIN IMAGE ENTERS (Scroll 0–20% of Brain Phase: 0.58 -> 0.72)
    // Scale: 0.85 -> 1.00, Opacity: 0 -> 1, Position gently settles
    // =========================================================================
    tl.to(
      brainWorld,
      {
        opacity: 1,
        duration: 0.08,
      },
      0.58
    );

    tl.to(
      brainImg,
      {
        scale: 1.0,
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 0.14,
      },
      0.60
    );

    // Editorial text appears in negative space (100% BLACK TEXT)
    tl.to(
      editorialText,
      {
        opacity: 1,
        x: 0,
        ease: 'power3.out',
        duration: 0.14,
      },
      0.62
    );

    // =========================================================================
    // 7. NEURAL ACTIVITY INTENSIFIES & SIGNAL PROPAGATES (Progress: 0.72 -> 0.86)
    // Brain established, pulses travel across cortical M1 strip
    // =========================================================================
    tl.to(
      brainImg,
      {
        scale: 1.04,
        y: -10,
        ease: 'sine.inOut',
        duration: 0.14,
      },
      0.72
    );

    // =========================================================================
    // 8. BRAIN -> EEG WAVEFORM TRANSFORMATION (Progress: 0.84 -> 1.00)
    // Signals leave brain and form live multi-channel EEG waveforms
    // =========================================================================
    tl.to(
      eegWaveform,
      {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 0.16,
      },
      0.82
    );

    tl.to(
      brainImg,
      {
        scale: 0.94,
        opacity: 0.88,
        x: 20,
        ease: 'power2.inOut',
        duration: 0.16,
      },
      0.84
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`typographic-zoom-portal-track ${className}`}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh', // Exactly 100vh pinned chamber
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        overflow: 'hidden',
        background: '#000000',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        ...style,
      }}
    >
      {/* =======================================================================
          LAYER 1: The Dark Void Background (Initial Phase)
          ======================================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000000',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* =======================================================================
          LAYER 2: The Baby Blue Scientific Atmosphere Background (Morphs In)
          Strictly using allowed palette: Baby Blue (#A7D8F5), Green (#6FAF64),
          Yellow (#E8C547), Maroon (#7A263A)
          ======================================================================= */}
      <div
        ref={backgroundMorphRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle 900px at 70% 35%, rgba(167, 216, 245, 0.45) 0%, transparent 65%),
            radial-gradient(circle 750px at 20% 70%, rgba(111, 175, 100, 0.22) 0%, transparent 60%),
            radial-gradient(circle 600px at 50% 90%, rgba(232, 197, 71, 0.16) 0%, transparent 55%),
            radial-gradient(circle 800px at 85% 80%, rgba(122, 38, 58, 0.14) 0%, transparent 60%),
            linear-gradient(180deg, #f4faff 0%, #ebf5fc 30%, #f6fbfe 70%, #f4faff 100%)
          `,
          zIndex: 2,
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Subtle organic texture dots in Baby Blue */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(167, 216, 245, 0.35) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.65,
          }}
        />
      </div>

      {/* =======================================================================
          LAYER 3: The Colossal Wordmark (NEUROMOVE) for Initial Typography Zoom
          ======================================================================= */}
      <div
        ref={wordmarkRef}
        className="hero-portal-wordmark"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Space Grotesk', -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(4.2rem, 11vw, 11rem)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#ffffff',
          textShadow: '0 2px 24px rgba(255, 255, 255, 0.25)',
          pointerEvents: 'none',
          zIndex: 10,
          willChange: 'transform, opacity',
          transform: 'scale(1)',
        }}
      >
        <span ref={(el) => (lettersLeftRef.current[0] = el)}>N</span>
        <span ref={(el) => (lettersLeftRef.current[1] = el)}>E</span>
        <span ref={(el) => (lettersLeftRef.current[2] = el)}>U</span>
        <span ref={(el) => (lettersLeftRef.current[3] = el)}>R</span>
        <span style={{ position: 'relative', display: 'inline-block' }}>O</span>
        <span ref={(el) => (lettersRightRef.current[0] = el)}>M</span>
        <span ref={(el) => (lettersRightRef.current[1] = el)}>O</span>
        <span ref={(el) => (lettersRightRef.current[2] = el)}>V</span>
        <span ref={(el) => (lettersRightRef.current[3] = el)}>E</span>
      </div>

      {/* =======================================================================
          LAYER 4: THE NEURON SYMBOL & 4-STAGE ACTIVATION / PROPAGATION / MORPH
          Strictly using ONLY: Baby Blue (#A7D8F5), Yellow (#E8C547), Green (#6FAF64), Maroon (#7A263A)
          ======================================================================= */}
      <div
        ref={neuronContainerRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '380px',
          height: '380px',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      >
        {/* Stage 1: Subtle Activation Glow (ONLY Baby Blue + Yellow + Green) */}
        <div
          ref={neuronGlowRef}
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232, 197, 71, 0.45) 0%, rgba(111, 175, 100, 0.35) 45%, rgba(167, 216, 245, 0.25) 70%, transparent 100%)',
            filter: 'blur(28px)',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0,
          }}
        />

        {/* Stage 3: Color Expansion Rings (Baby Blue -> Green -> Yellow -> Maroon) */}
        <div
          ref={colorExpansionRef}
          style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167, 216, 245, 0.6) 0%, rgba(111, 175, 100, 0.5) 30%, rgba(232, 197, 71, 0.4) 60%, rgba(122, 38, 58, 0.5) 85%, transparent 100%)',
            filter: 'blur(34px)',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0,
          }}
        />

        {/* High-Precision Biophysical Multipolar Pyramidal Neuron SVG */}
        <svg
          viewBox="0 0 400 400"
          width="100%"
          height="100%"
          style={{ position: 'relative', zIndex: 5, overflow: 'visible' }}
        >
          <defs>
            {/* Stage 1 Palette Linear Gradient */}
            <linearGradient id="neuronBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7D8F5" />
              <stop offset="45%" stopColor="#6FAF64" />
              <stop offset="85%" stopColor="#E8C547" />
              <stop offset="100%" stopColor="#7A263A" />
            </linearGradient>

            {/* Active Signal Pulse Gradient */}
            <linearGradient id="pulseGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8C547" />
              <stop offset="50%" stopColor="#6FAF64" />
              <stop offset="100%" stopColor="#A7D8F5" />
            </linearGradient>

            {/* Filter glow */}
            <filter id="neuronGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Dendritic Arbor Branches (Radiating from Soma) */}
          <g stroke="url(#neuronBaseGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85">
            {/* Apical dendrite tree (top) */}
            <path d="M 200 180 Q 195 130 190 90 Q 185 60 160 30" />
            <path d="M 190 90 Q 210 65 235 35" />
            <path d="M 195 130 Q 225 110 250 85" />
            <path d="M 195 130 Q 165 115 140 95" />

            {/* Basal dendrites (lateral left) */}
            <path d="M 185 195 Q 145 185 110 175 Q 80 170 50 155" />
            <path d="M 110 175 Q 85 200 55 220" />
            <path d="M 145 185 Q 120 215 95 240" />

            {/* Basal dendrites (lateral right) */}
            <path d="M 215 195 Q 255 185 290 175 Q 320 170 350 155" />
            <path d="M 290 175 Q 315 200 345 220" />
            <path d="M 255 185 Q 280 215 305 240" />

            {/* Axon Hillock & Descending Axon (bottom) */}
            <path d="M 200 220 Q 202 260 200 300 Q 198 335 195 365" strokeWidth="3" />
            {/* Axon Terminal Boutons */}
            <path d="M 198 335 Q 175 355 155 375" />
            <path d="M 198 335 Q 220 355 245 375" />
          </g>

          {/* Synaptic Terminal Knobs */}
          <g fill="#E8C547">
            <circle cx="160" cy="30" r="4" style={{ filter: 'drop-shadow(0 0 6px #E8C547)' }} />
            <circle cx="235" cy="35" r="4" style={{ filter: 'drop-shadow(0 0 6px #E8C547)' }} />
            <circle cx="250" cy="85" r="3.5" />
            <circle cx="140" cy="95" r="3.5" />
            <circle cx="50" cy="155" r="4" style={{ filter: 'drop-shadow(0 0 6px #6FAF64)' }} />
            <circle cx="55" cy="220" r="3.5" />
            <circle cx="95" cy="240" r="3.5" />
            <circle cx="350" cy="155" r="4" style={{ filter: 'drop-shadow(0 0 6px #A7D8F5)' }} />
            <circle cx="345" cy="220" r="3.5" />
            <circle cx="305" cy="240" r="3.5" />
            <circle cx="155" cy="375" r="4.5" style={{ filter: 'drop-shadow(0 0 8px #7A263A)' }} />
            <circle cx="245" cy="375" r="4.5" style={{ filter: 'drop-shadow(0 0 8px #7A263A)' }} />
            <circle cx="195" cy="365" r="5" style={{ filter: 'drop-shadow(0 0 8px #E8C547)' }} />
          </g>

          {/* Central Soma (Cell Body) & Nucleus */}
          <g filter="url(#neuronGlowFilter)">
            <ellipse cx="200" cy="200" rx="22" ry="18" fill="#6FAF64" opacity="0.3" />
            <ellipse cx="200" cy="200" rx="15" ry="12" fill="#E8C547" opacity="0.6" />
            <circle cx="200" cy="200" r="6" fill="#A7D8F5" />
            <circle cx="200" cy="200" r="3" fill="#ffffff" />
          </g>

          {/* Stage 2 Pulse Path: Electric Bioelectric Signal surging down axon & branches */}
          <path
            ref={neuronPulseRef}
            d="M 200 180 L 200 200 L 200 300 L 198 335 L 195 365"
            stroke="url(#pulseGlowGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="600"
            strokeDashoffset="600"
            style={{ filter: 'drop-shadow(0 0 10px #E8C547)' }}
          />
        </svg>

        {/* Stage 4: Synaptic Particles for Dissolve & Transition */}
        <div
          ref={neuronDissolveParticlesRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 6,
            opacity: 0,
          }}
        >
          {[
            { x: '18%', y: '22%', c: '#A7D8F5', s: 5 },
            { x: '82%', y: '25%', c: '#E8C547', s: 6 },
            { x: '15%', y: '65%', c: '#6FAF64', s: 4 },
            { x: '85%', y: '70%', c: '#7A263A', s: 7 },
            { x: '50%', y: '12%', c: '#E8C547', s: 5 },
            { x: '48%', y: '88%', c: '#A7D8F5', s: 6 },
            { x: '35%', y: '45%', c: '#6FAF64', s: 4 },
            { x: '68%', y: '52%', c: '#7A263A', s: 5 },
          ].map((pt, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: pt.y,
                left: pt.x,
                width: `${pt.s}px`,
                height: `${pt.s}px`,
                borderRadius: '50%',
                backgroundColor: pt.c,
                boxShadow: `0 0 12px ${pt.c}`,
              }}
            />
          ))}
        </div>
      </div>

      {/* =======================================================================
          LAYER 5: THE UPLOADED BRAIN IMAGE & EDITORIAL SCIENTIFIC VISUALIZATION
          - Central Visual Anchor: /brain_model_3d.png (natural brain color preserved)
          - Strict Palette Around It: Baby Blue (#A7D8F5), Maroon (#7A263A), Green (#6FAF64), Yellow (#E8C547)
          - 100% BLACK TEXT ONLY: Headings, body copy, labels, metadata
          ======================================================================= */}
      <div
        ref={brainWorldRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 5vw',
          pointerEvents: 'auto',
          opacity: 0,
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(360px, 1.25fr)',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          {/* LEFT: Editorial Scientific Narrative (100% BLACK TEXT) */}
          <div
            ref={editorialTextRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              zIndex: 30,
            }}
          >
            {/* Status Pill Tag */}
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#000000', // STRICT BLACK TEXT
                  backgroundColor: '#A7D8F5', // BABY BLUE
                  border: '1.5px solid #000000',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  boxShadow: '0 3px 10px rgba(122, 38, 58, 0.15)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#000000',
                  }}
                />
                <span>STAGE 01 · CORTICAL INTENTION</span>
              </span>
            </div>

            {/* Editorial Heading: HUMAN INTENTION BECOMES SIGNAL BECOMES DATA (BLACK TEXT) */}
            <h1
              style={{
                fontFamily: "'Space Grotesk', -apple-system, sans-serif",
                fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)',
                fontWeight: 900,
                color: '#000000', // STRICT BLACK TEXT
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              HUMAN INTENTION<br />
              <span style={{ color: '#000000' }}>BECOMES SIGNAL</span><br />
              <span style={{ color: '#000000' }}>BECOMES DATA</span>
            </h1>

            {/* Scientific Explanation (BLACK TEXT) */}
            <p
              style={{
                fontSize: '1.02rem',
                color: '#000000', // STRICT BLACK TEXT
                lineHeight: 1.7,
                maxWidth: '520px',
                margin: 0,
                fontWeight: 500,
              }}
            >
              When motor imagery is initiated in the primary motor cortex (M1 strip), synchronized pyramidal polarization creates localized Sensorimotor Rhythm (SMR) desynchronization. NeuroMove captures these raw microvolt potentials across differential bipolar channels and decodes intent in 6.1 milliseconds.
            </p>

            {/* Four-Color Telemetry Pillars (Strict Palette, Black Text) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginTop: '8px',
                maxWidth: '460px',
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(167, 216, 245, 0.35)', // Baby Blue
                  border: '1.5px solid #000000',
                  color: '#000000',
                }}
              >
                <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: '#000000' }}>
                  MU / SMR BAND
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#000000', fontFamily: 'monospace' }}>
                  8.0–12.0 Hz
                </div>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(111, 175, 100, 0.25)', // Green
                  border: '1.5px solid #000000',
                  color: '#000000',
                }}
              >
                <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: '#000000' }}>
                  BETA RHYTHM
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#000000', fontFamily: 'monospace' }}>
                  13.0–30.0 Hz
                </div>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(232, 197, 71, 0.35)', // Yellow
                  border: '1.5px solid #000000',
                  color: '#000000',
                }}
              >
                <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: '#000000' }}>
                  AI INFERENCE
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#000000', fontFamily: 'monospace' }}>
                  6.1 ms Latency
                </div>
              </div>

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(122, 38, 58, 0.18)', // Maroon
                  border: '1.5px solid #000000',
                  color: '#000000',
                }}
              >
                <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', color: '#000000' }}>
                  TEST ACCURACY
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#000000', fontFamily: 'monospace' }}>
                  97.41% CV
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 3D Floating Brain Visual Anchor & Live Signal Emitter */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1400px',
            }}
          >
            {/* The Floating 3D Brain Asset (Natural Brain Coloration Preserved) */}
            <div
              ref={brainImgRef}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '1 / 1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 26px 45px rgba(122, 38, 58, 0.22)) drop-shadow(0 10px 24px rgba(167, 216, 245, 0.45))',
                willChange: 'transform, opacity',
              }}
            >
              <img
                src="/brain_model_3d.png"
                alt="3D Anatomical Human Brain Model"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />

              {/* Cortical Hotspot 1: Rolandic Primary Motor Strip (M1) Activation Pulse */}
              <div
                style={{
                  position: 'absolute',
                  top: '38%',
                  left: '42%',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#E8C547', // Yellow
                  boxShadow: '0 0 16px #E8C547, 0 0 28px #6FAF64',
                  animation: 'pulse 1.8s infinite',
                  pointerEvents: 'none',
                }}
              />

              {/* Cortical Hotspot 2: Supplementary Motor Area (SMA) */}
              <div
                style={{
                  position: 'absolute',
                  top: '28%',
                  left: '52%',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#6FAF64', // Green
                  boxShadow: '0 0 12px #6FAF64, 0 0 22px #A7D8F5',
                  animation: 'pulse 2.2s infinite',
                  pointerEvents: 'none',
                }}
              />

              {/* Cortical Hotspot 3: Somatosensory Association Area */}
              <div
                style={{
                  position: 'absolute',
                  top: '48%',
                  left: '64%',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#7A263A', // Maroon
                  boxShadow: '0 0 14px #7A263A, 0 0 24px #E8C547',
                  animation: 'pulse 2.6s infinite',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* BRAIN -> EEG TRANSFORMATION: Signal Lines leaving Brain and forming Waveforms */}
            <div
              ref={eegWaveformRef}
              style={{
                position: 'absolute',
                bottom: '8%',
                left: '5%',
                right: '5%',
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.94)',
                border: '1.5px solid #000000',
                boxShadow: '0 16px 40px -10px rgba(122, 38, 58, 0.18)',
                zIndex: 35,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: '#000000', // BLACK TEXT
                    textTransform: 'uppercase',
                  }}
                >
                  ● BRAIN → SMR EEG WAVEFORM PROPAGATION
                </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#000000', // BLACK TEXT
                    background: '#A7D8F5',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid #000000',
                  }}
                >
                  160 HZ SYNCHRONIZED
                </span>
              </div>

              {/* Multi-channel EEG Waveform SVG strictly in Baby Blue, Green, Yellow, Maroon */}
              <svg width="100%" height="60" viewBox="0 0 600 60" preserveAspectRatio="none">
                {/* Channel 1: C3 Motor Pair (Baby Blue) */}
                <path
                  d="M 0 15 Q 30 5 60 15 T 120 15 T 180 15 T 240 15 T 300 15 T 360 15 T 420 15 T 480 15 T 540 15 T 600 15"
                  fill="none"
                  stroke="#A7D8F5"
                  strokeWidth="2.5"
                />
                {/* Channel 2: C4 Motor Pair (Green) */}
                <path
                  d="M 0 30 Q 25 42 50 30 T 100 30 T 150 30 T 200 30 T 250 30 T 300 30 T 350 30 T 400 30 T 450 30 T 500 30 T 550 30 T 600 30"
                  fill="none"
                  stroke="#6FAF64"
                  strokeWidth="2.5"
                />
                {/* Channel 3: Cz Somatosensory (Yellow) */}
                <path
                  d="M 0 45 Q 35 35 70 45 T 140 45 T 210 45 T 280 45 T 350 45 T 420 45 T 490 45 T 560 45 T 600 45"
                  fill="none"
                  stroke="#E8C547"
                  strokeWidth="2"
                />
                {/* Channel 4: FC3 Pre-Motor (Maroon) */}
                <path
                  d="M 0 52 Q 20 58 40 52 T 80 52 T 120 52 T 160 52 T 200 52 T 240 52 T 280 52 T 320 52 T 360 52 T 400 52 T 440 52 T 480 52 T 520 52 T 560 52 T 600 52"
                  fill="none"
                  stroke="#7A263A"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
