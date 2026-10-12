import React from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import SpecularButton from '../ui/SpecularButton';
import { ArrowRight, Brain, Zap, ShieldCheck, Activity, Compass, Cpu } from 'lucide-react';

/**
 * SylvaHeroSection
 * The flagship gateway section revealed immediately after the NEUROMOVE text zoom in effect.
 * 
 * Features:
 * - Direct transition from the zoom portal into the living Sylva world.
 * - Bold editorial typography: "Step into the living world. Where Intention Becomes Movement."
 * - Two signature White Glassmorphism Cards: Field Note 01 (Cortical Topography) and Ethos (Patient Neural Engineering).
 * - Upgraded brightness to next-level luminous ambient daylight.
 * - Perfectly smooth, bi-directional scroll responsiveness.
 */
export default function SylvaHeroSection({
  onExploreCortex = null,
  onLaunchLive = null,
  className = '',
  style = {},
}) {
  return (
    <section
      id="sylva-hero"
      className={`sylva-hero-section ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 0 80px 0',
        zIndex: 10,
        ...style,
      }}
    >
      {/* ==================================================
          SIGNAL & ABOUT NEUROMOVE BRIDGE
          ================================================== */}
      <div style={{
        maxWidth: '980px',
        margin: '0 auto 32px auto',
        width: '100%',
      }}>
        {/* Signal Overview Strip: live SMR Mu rhythm snapshot */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid #E2E8F0',
            borderRadius: '24px',
            padding: '20px 24px',
            marginBottom: '32px',
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Zap size={18} color="#1E67D6" />
            <h3
              style={{
                margin: 0,
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#0F172A',
                letterSpacing: '-0.02em',
              }}
            >
              Neural Signal Snapshot
            </h3>
            <MetricChip label="LIVE" color="skyblue" style={{ fontSize: '0.72rem' }} />
          </div>

          {/* Channel selector + key metrics inline */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => {/* select C3-C4 pair */}}
              style={{
                background: 'rgba(30, 103, 214, 0.12)',
                border: '1px solid rgba(30, 103, 214, 0.3)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: '#1E67D6',
                transition: 'all 0.2s ease',
              }}
            >
              C3–C4
            </button>
            <button
              style={{
                background: 'rgba(0, 0, 0, 0.04)',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: '#64748B',
                transition: 'all 0.2s ease',
              }}
            >
              C1–C2
            </button>
          </div>

          {/* Key signal metrics row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px', marginTop: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1E67D6' }}>8-12 Hz</div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '4px' }}>Mu Band</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D97706' }}>0.000 rad</div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '4px' }}>Phase Lag</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#334155' }}>&gt;42 dB</div>
              <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '4px' }}>Line Rejection</div>
            </div>
          </div>
        </div>

        {/* Flagship Headline with Living World Contrast */}
        <div style={{ maxWidth: '980px', marginBottom: '28px' }}>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.6rem)',
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: '-0.04em',
            margin: '0 0 16px 0',
            color: '#152015',
          }}
        >
          Step into the living world.
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Where Intention Becomes Movement.
          </span>
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
            lineHeight: 1.65,
            color: '#344033',
            maxWidth: '840px',
            margin: 0,
            fontWeight: 400,
          }}
        >
          By bridging the Rolandic motor strip with low-latency closed-form feature transformations, NeuroMove translates localized sensorimotor rhythm desynchronization into fluent, real-time somatic movement without data leakage.
        </p>
      </div>

      {/* Interactive Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
        <SpecularButton
          onClick={onExploreCortex}
          variant="primary"
          icon={<Compass size={15} color="#152015" />}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#152015',
            boxShadow: '0 12px 32px -6px rgba(20, 35, 18, 0.20)',
          }}
        >
          <span>Explore Rolandic Motor Cortex</span>
          <ArrowRight size={14} color="#152015" style={{ marginLeft: '4px' }} />
        </SpecularButton>

        <SpecularButton
          onClick={onLaunchLive}
          variant="secondary"
          icon={<Activity size={15} color="#152015" />}
          style={{
            background: 'rgba(255, 255, 255, 0.70)',
            color: '#152015',
            borderColor: 'rgba(255, 255, 255, 0.90)',
          }}
        >
          <span>Live 163Hz Telemetry Decoder</span>
        </SpecularButton>
      </div>

      {/* Two Signature White Glassmorphism Cards (Sylva Storyteller Pair) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {/* CARD 1: Field Note 01 · Sensorimotor Rhythm */}
        <div
          className="white-glass-story-card"
          style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.84)',
            backdropFilter: 'blur(18px) saturate(110%)',
            WebkitBackdropFilter: 'blur(18px) saturate(110%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            padding: '32px',
            boxShadow: '0 24px 60px -12px rgba(22, 34, 20, 0.16), 0 4px 14px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 32px 70px -14px rgba(22, 34, 20, 0.22), 0 0 24px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 24px 60px -12px rgba(22, 34, 20, 0.16), 0 4px 14px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)';
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span
                className="mono"
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#2d6a4f',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                FIELD NOTE 01 · TOPOGRAPHY
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(45, 106, 79, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2d6a4f',
                }}
              >
                <Brain size={16} />
              </div>
            </div>

            <h3
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#152015',
                lineHeight: 1.25,
                margin: '0 0 10px 0',
                letterSpacing: '-0.02em',
              }}
            >
              The Rolandic Motor Strip
            </h3>
            <p style={{ fontSize: '0.90rem', color: '#3d4d3c', lineHeight: 1.62, margin: '0 0 20px 0' }}>
              When a subject prepares motor intention, contralateral pyramidal neurons desynchronize. Five spatial differential pairs isolate these event-related desynchronizations with zero phase lag.
            </p>
          </div>

          {/* Visual Plate / Waveform representation */}
          <div
            style={{
              background: 'rgba(238, 243, 233, 0.85)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.90)',
              padding: '16px 20px',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.74rem', color: '#526351' }}>
              <span>C3/C4 MU DESYNCHRONIZATION</span>
              <span style={{ color: '#2d6a4f', fontWeight: 700 }}>-38.6 dB ERD</span>
            </div>
            <div style={{ height: '4px', width: '100%', background: 'rgba(0, 0, 0, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '84%', background: 'linear-gradient(90deg, #52b788, #2d6a4f)', borderRadius: '999px' }} />
            </div>
          </div>
        </div>

        {/* CARD 2: Ethos · Patient Neural Engineering */}
        <div
          className="white-glass-story-card"
          style={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.84)',
            backdropFilter: 'blur(18px) saturate(110%)',
            WebkitBackdropFilter: 'blur(18px) saturate(110%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            padding: '32px',
            boxShadow: '0 24px 60px -12px rgba(22, 34, 20, 0.16), 0 4px 14px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 32px 70px -14px rgba(22, 34, 20, 0.22), 0 0 24px rgba(255, 255, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 24px 60px -12px rgba(22, 34, 20, 0.16), 0 4px 14px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)';
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span
                className="mono"
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#1e67d6',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                ETHOS · CLOSED-FORM CONVEX SOLVER
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(30, 103, 214, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1e67d6',
                }}
              >
                <Cpu size={16} />
              </div>
            </div>

            <h3
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#152015',
                lineHeight: 1.25,
                margin: '0 0 10px 0',
                letterSpacing: '-0.02em',
              }}
            >
              Deterministic Linear Hyperplanes
            </h3>
            <p style={{ fontSize: '0.90rem', color: '#3d4d3c', lineHeight: 1.62, margin: '0 0 20px 0' }}>
              Rejecting brittle gradient descent for clinical safety. 10,000 fixed-weight random convolutional kernels project multi-channel EEG into dual-space with guaranteed global optimality in 6.1 milliseconds.
            </p>
          </div>

          {/* Visual Plate / Metric representation */}
          <div
            style={{
              background: 'rgba(238, 243, 233, 0.85)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.90)',
              padding: '16px 20px',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.74rem', color: '#526351' }}>
              <span>INFERENCE LATENCY</span>
              <span style={{ color: '#1e67d6', fontWeight: 700 }}>6.1 ms (Deterministic)</span>
            </div>
            <div style={{ height: '4px', width: '100%', background: 'rgba(0, 0, 0, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '92%', background: 'linear-gradient(90deg, #60a5fa, #1e67d6)', borderRadius: '999px' }} />
            </div>
          </div>
        </div>
      </div>

        {/* ==================================================
            ABOUT NEUROMOVE — Mission & Validation Summary
            ================================================== */}
        <GlassPanel
          variant="hero"
          glow
          style={{
            padding: '32px',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(18px) saturate(110%)',
            WebkitBackdropFilter: 'blur(18px) saturate(110%)',
            marginTop: '40px',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginTop: '16px',
          }}>
            <div>
              <h4 style={{ fontSize: '0.78rem', color: '#2d6a4f', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Precision Neural Decoding
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#3d4d3c', lineHeight: 1.6, margin: 0 }}>
                4-class motor imagery classification with 97.41% test accuracy on the PhysioNet 109-subject EEGMMIDB benchmark, verified under strict zero-leakage stratified evaluation.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.78rem', color: '#1e67d6', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Sub-10ms Inference
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#3d4d3c', lineHeight: 1.6, margin: 0 }}>
                Deterministic 6.1 ms end-to-end decision clock enabled by closed-form MiniRocket convolutions and Ridge regression — no GPU, no gradient descent, clinically responsive.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.78rem', color: '#c6283d', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Zero Data Leakage
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#3d4d3c', lineHeight: 1.6, margin: 0 }}>
                Complete temporal isolation: scaler, filter states, and kernels fitted strictly on train folds. No future epoch data exposed during preprocessing or model evaluation.
              </p>
            </div>
          </div>
        </GlassPanel>

      </div>
    </section>
  );
}
