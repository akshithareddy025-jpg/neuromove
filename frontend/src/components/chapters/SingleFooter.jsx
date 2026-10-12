import React from 'react';
import LogoLoop from '../effects/LogoLoop';
import BothHandAnimation from '../ui/BothHandAnimation';
import { scrollToTarget } from '../../lib/scrollEngine';

/**
 * SingleFooter
 * Chapter 12: The ONE and ONLY Footer at the true document end.
 * Academic context, citations, contributors, and zero-leakage verification.
 */
export default function SingleFooter({
  className = '',
  style = {},
  ...props
}) {
  return (
    <footer
      id="main-footer"
      data-world="hand"
      className={`neuromove-single-footer ${className}`}
      style={{
        width: '100%',
        paddingTop: '64px',
        paddingBottom: '120px',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        background: 'rgba(5, 5, 8, 0.95)',
        backdropFilter: 'blur(24px)',
        color: '#FFFFFF',
        position: 'relative',
        zIndex: 20,
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* BILATERAL BOTH-HAND BIONIC ACTUATION SHOWCASE */}
        <div
          style={{
            marginBottom: '48px',
            padding: '24px 20px',
            borderRadius: '24px',
            background: 'linear-gradient(180deg, rgba(15, 20, 32, 0.75) 0%, rgba(5, 7, 12, 0.90) 100%)',
            border: '1px solid rgba(97, 215, 255, 0.22)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              padding: '0 12px 14px 12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#61D7FF',
                  boxShadow: '0 0 10px #61D7FF',
                }}
              />
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#FFFFFF',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                }}
              >
                Bilateral Bionic Hands · Rolandic Motor Imagery Actuation
              </span>
            </div>
            <span
              style={{
                fontSize: '0.74rem',
                color: '#61D7FF',
                fontFamily: 'monospace',
                background: 'rgba(97, 215, 255, 0.1)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(97, 215, 255, 0.25)',
              }}
            >
              CLICK TO TOGGLE BILATERAL FIST GRASP
            </span>
          </div>

          <BothHandAnimation variant="footer" interactive={true} />
        </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '40px',
        }}
      >
        {/* Col 1: Brand & Academic Overview */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <LogoLoop size={24} />
            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              NeuroMove
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(97, 215, 255, 0.12)',
                border: '1px solid rgba(97, 215, 255, 0.3)',
                color: '#61D7FF',
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
            >
              ACADEMIC BCI
            </span>
          </div>
          <p style={{ color: '#A1A1AA', fontSize: '0.84rem', lineHeight: 1.65, margin: 0 }}>
            Unified 4-Class Motor Imagery EEG Classification & Transparency Benchmark. Engineered for zero-leakage neuroprosthetic decoding at 6.1ms latency.
          </p>
        </div>

        {/* Col 2: Narrative Navigation */}
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Story Chapters
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
            <li>
              <button
                onClick={() => scrollToTarget('#hero', {})}
                style={{ background: 'none', border: 'none', padding: 0, color: '#A1A1AA', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#61D7FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                00 · Cinematic Bionic Hand Hero
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToTarget('#scroll-story-stage', {})}
                style={{ background: 'none', border: 'none', padding: 0, color: '#A1A1AA', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#61D7FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                01 · Human Intention & SMR Dynamics
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToTarget('#motor-cortex', {})}
                style={{ background: 'none', border: 'none', padding: 0, color: '#A1A1AA', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#61D7FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                02 · Motor Cortex & 4-Class Intents
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToTarget('#signal-processing', {})}
                style={{ background: 'none', border: 'none', padding: 0, color: '#A1A1AA', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#61D7FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                03 · Zero-Phase Butterworth Purification
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToTarget('#model-architecture', {})}
                style={{ background: 'none', border: 'none', padding: 0, color: '#A1A1AA', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#61D7FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                04 · MiniRocket vs. CNN-LSTM
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToTarget('#causal-pipeline', {})}
                style={{ background: 'none', border: 'none', padding: 0, color: '#A1A1AA', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#61D7FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                05 · Signal to Somatic Movement Payoff
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Research Contributors */}
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Core Investigators
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <li>
              <a
                href="https://github.com/rohanvemula279-star"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#A1A1AA', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                <span>Rohan Vemula</span>
                <span className="mono" style={{ fontSize: '0.70rem', color: '#61D7FF' }}>Lead Architect</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/SudhasriA"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#A1A1AA', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                <span>Sudhasri A</span>
                <span className="mono" style={{ fontSize: '0.70rem', color: '#FFD447' }}>MiniRocket ML</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/nakshathrav2007-hash"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#A1A1AA', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                <span>Nakshathra V</span>
                <span className="mono" style={{ fontSize: '0.70rem', color: '#1E67D6' }}>CNN-LSTM DL</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/akshithareddy025-jpg"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#A1A1AA', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                <span>Akshitha Reddy</span>
                <span className="mono" style={{ fontSize: '0.70rem', color: '#C6283D' }}>EEG DSP</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sahasramarikanti-cpu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#A1A1AA', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1AA')}
              >
                <span>Sahasra Marikanti</span>
                <span className="mono" style={{ fontSize: '0.70rem', color: '#61D7FF' }}>FastAPI Telemetry</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Citations & Rigor */}
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Academic Citations
          </div>
          <p style={{ color: '#A1A1AA', fontSize: '0.80rem', lineHeight: 1.5, margin: '0 0 10px 0' }}>
            Hwaidi & Ghanem (2026), <em>NeuroImage</em> 328: 121087.<br />
            PhysioNet Motor Imagery EEG Corpus.<br />
            FastAI / Dempster et al. (2021) ROCKET.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.70rem',
                padding: '3px 8px',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontFamily: 'monospace',
                fontWeight: 700,
              }}
            >
              MIT LICENSE
            </span>
            <span
              style={{
                fontSize: '0.70rem',
                padding: '3px 8px',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#61D7FF',
                fontFamily: 'monospace',
                fontWeight: 700,
              }}
            >
              COLLEGE CAPSTONE 2026
            </span>
          </div>
        </div>
      </div>

      {/* Sub-footer Copyright & Audit Badges */}
      <div
        style={{
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.78rem',
          color: '#71717A',
        }}
      >
        <div>
          © 2026 NeuroMove BCI Research Benchmark. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '16px', fontFamily: 'monospace', fontSize: '0.72rem' }}>
          <span style={{ color: '#61D7FF', fontWeight: 600 }}>● ZERO-LEAKAGE AUDITED</span>
          <span style={{ color: '#FFD447' }}>● LATENCY 6.1 MS</span>
          <span style={{ color: '#D4D4D8' }}>● 109-SUBJECT PHYSIOMET COHORT</span>
        </div>
      </div>
      </div>
    </footer>
  );
}
