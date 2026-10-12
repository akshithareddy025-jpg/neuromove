import React from 'react';
import { Play, ShieldCheck, Cpu, ArrowUpRight, Activity, Zap, ChevronDown } from 'lucide-react';
import MaskedHeading from './effects/MaskedHeading';
import DepthText from './effects/DepthText';
import ShinyText from './effects/ShinyText';
import WrapText from './effects/WrapText';
import LineWaves from './effects/LineWaves';
import ScrollExpand from './effects/ScrollExpand';
import RotatingText from './effects/RotatingText';
import ScrollVelocity from './effects/ScrollVelocity';
import SlideCommit from './effects/SlideCommit';
import SpecularButton from './ui/SpecularButton';
import Lanyard from './ui/Lanyard';
import DotPattern from './ui/dot-pattern';
import FlowCanvas from './ui/FlowCanvas';
import HeroHand3D from './ui/HeroHand3D';

/**
 * HeroSection
 * Upgraded Flagship Hero Experience for NeuroMove (Matching lenis.dev reference).
 * 
 * Strict Implementation (hand-first sequencing):
 * 1. Hand Fixed at the Back: 3D canvas is fixed to the viewport background,
 *    persisting across hero + team until just before the NEUROMOVE portal zoom.
 * 2. Natural Website Scrolling: As the user scrolls, all website elements (headline,
 *    subheadings, specs, buttons, cards) move up and scroll naturally over the hand.
 * 3. Simultaneous Rotation: As the user scrolls, the hand rotates in 3D and rolls its fingers.
 * 4. Hand Completes First: Hand fade (portal p 0.15->0.35) finishes BEFORE the
 *    NEUROMOVE text zoom ramps (portal p 0.30+). No overlap.
 * 5. Zero Autoplay / Idle Freeze: Hand freezes instantly when scrolling stops.
 * 6. Monochromatic UI Palette: NO blue colors on the website. Pure white, platinum, and dark
 *    graphite. Blue/cyan is reserved exclusively for the 3D hand's glowing rim lighting!
 */
export default function HeroSection({
  onLaunchLive,
  onViewBenchmarks,
  backendStatus,
  currentTrial,
  progress = 0,
}) {
  const specs = [
    { label: '97.41% & 97.16% ACCURACY', icon: <ShieldCheck size={13} color="#FFFFFF" /> },
    { label: '0% TRIAL LEAKAGE', icon: <Cpu size={13} color="#E4E4E7" /> },
    { label: '5-PAIR MOTOR FUSION', icon: <Activity size={13} color="#D4D4D8" /> },
    { label: '2.15 - 7.2 MS LATENCY', icon: <Zap size={13} color="#A1A1AA" /> },
    { label: 'ZERO-LEAKAGE STRATIFIED TEST', icon: null },
  ];

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        marginBottom: '48px',
        // clip (not hidden): visually clips like hidden but never creates a
        // scroll container, so the sticky 3D hand stays pinned to the viewport
        // while hero content scrolls over it until the portal takes over.
        overflow: 'clip',
      }}
    >
      {/* ==================================================
          0. 3D BIONIC HAND BACKGROUND CANVAS (fixed viewport backdrop)
          Hand-first sequencing: fixed hand stays pinned behind hero + team
          content and completes its fade BEFORE the NEUROMOVE portal zoom.
          ================================================== */}
      <HeroHand3D activeSection="hero1" progress={progress} />

      {/* ==================================================
          1. FAINT NEUROMORPHIC DOT PATTERN
          ================================================== */}
      <DotPattern
        width={32}
        height={32}
        cx={1}
        cy={1}
        cr={1}
        className="opacity-15 [mask-image:radial-gradient(900px_circle_at_50%_35%,white,transparent)] z-0"
      />

      {/* ==================================================
          3. SCROLLING WEBSITE ELEMENTS (MOVE OVER THE FIXED HAND)
          Hand-first: content scrolls over the fixed hand backdrop.
          ================================================== */}
      <div
        className="hero-scrolling-content"
        style={{
          position: 'relative',
          zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        {/* HERO INTRO VIEW (Occupies initial viewport over the fixed hand) */}
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1120px',
            width: '100%',
            margin: '0 auto',
            padding: '120px 24px 56px 24px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Top Scientific Status Pill (Monochrome with green online dot, no blue) */}
          <div style={{ marginBottom: '22px' }}>
            <div
              className="hero-status-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 20px',
                borderRadius: '9999px',
                background: 'rgba(10, 10, 12, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.75)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: backendStatus === 'online' ? '#FFFFFF' : backendStatus === 'connecting' ? '#FFD447' : '#71717A',
                  boxShadow: backendStatus === 'online' ? '0 0 10px #FFFFFF' : backendStatus === 'connecting' ? '0 0 10px #FFD447' : 'none',
                }}
              />
              <span style={{ fontSize: '0.78rem', color: '#A1A1AA', fontWeight: 500 }}>
                Scientific Transparency Standard ·{' '}
              </span>
              <RotatingText
                texts={[
                  '97.41% MiniRocket Accuracy',
                  '0% Data Leakage Verified',
                  'Sub-10ms Inference Latency',
                  'PhysioNet 109 Subjects Cohort',
                  'Hwaidi & Ghanem (2026)',
                ]}
                interval={2600}
                highlightColor="#FFFFFF"
              />
            </div>
          </div>

          {/* Hero Editorial Title: Pure Crisp Monochrome (NO BLUE, No right edge clipping) */}
          <h1
            className="hero-heading"
            style={{
              fontSize: 'clamp(2.1rem, 4.4vw, 4.1rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              margin: '0 0 18px 0',
              maxWidth: '100%',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              boxSizing: 'border-box',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9)',
            }}
          >
            <MaskedHeading as="span" delay={0.1} duration={1.1} revealOnScroll={false}>
              <DepthText depth={4} color="#FFFFFF">
                Precision Neural Decoding
              </DepthText>
            </MaskedHeading>
            <br />
            <MaskedHeading as="span" delay={0.25} duration={1.1} revealOnScroll={false}>
              <DepthText depth={3} color="#D4D4D8">
                for Motor Imagery BCI
              </DepthText>
            </MaskedHeading>
          </h1>

          {/* Supporting Text: Monochrome (#A1A1AA / #FFFFFF, NO BLUE) */}
          <div style={{ marginBottom: '22px', display: 'flex', justifyContent: 'center' }}>
            <p
              className="hero-subheading"
              style={{
                fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
                lineHeight: 1.65,
                color: '#E4E4E7',
                maxWidth: '820px',
                margin: '0 auto',
                fontWeight: 400,
                textShadow: '0 2px 18px rgba(0, 0, 0, 0.98)',
              }}
            >
              Production-grade 4-class motor imagery classification powered by{' '}
              <strong style={{ color: '#FFFFFF' }}>5-pair spatial fusion</strong>, a closed-form{' '}
              <strong style={{ color: '#FFFFFF' }}>MiniRocket + Ridge</strong> pipeline, and strictly verified zero-leakage evaluation across the 64-channel PhysioNet EEGMMIDB benchmark cohort.
            </p>
          </div>

          {/* WrapText Specs Pills: Pure White & Silver Icons (NO BLUE) */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px' }}>
            <WrapText items={specs} highlightIndex={0} />
          </div>

          {/* Primary Action Buttons: Crisp White & Dark Glass */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <SpecularButton
                onClick={onLaunchLive}
                variant="primary"
                icon={<Play size={15} fill="#000000" color="#000000" />}
              >
                <span>Launch Live Playback</span>
                <span
                  className="mono"
                  style={{
                    fontSize: '0.70rem',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: 'rgba(0, 0, 0, 0.12)',
                    color: '#000000',
                    fontWeight: 800,
                    marginLeft: '4px',
                  }}
                >
                  163 HZ
                </span>
              </SpecularButton>

              <SpecularButton
                onClick={onViewBenchmarks}
                variant="secondary"
                icon={<ArrowUpRight size={15} color="#FFFFFF" />}
              >
                <span>Explore Ground-Truth Benchmarks</span>
              </SpecularButton>
            </div>

            {/* Tactile SlideCommit Launcher */}
            <div style={{ marginTop: '8px', marginBottom: '20px' }}>
              <SlideCommit
                onCommit={onLaunchLive}
                label="Slide to Initialize Telemetry Stream"
                completedLabel="Connecting to Telemetry Stream..."
              />
            </div>

            {/* Minimalist Scroll Cue */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '16px',
                fontSize: '0.68rem',
                color: '#71717A',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <span>Scroll to navigate & rotate hand</span>
              <ChevronDown size={12} className="animate-bounce" />
            </div>
          </div>
        </div>

        {/* ==================================================
            NEURAL SIGNAL BRIDGE (LEADS DIRECTLY INTO ZOOM PORTAL)
            ================================================== */}
        {/* LineWaves Oscilloscope Ribbon */}
        <div style={{ maxWidth: '1100px', margin: '24px auto 16px auto', width: '100%' }}>
          <LineWaves height={90} speed={0.016} />
        </div>
      </div>
    </section>
  );
}
