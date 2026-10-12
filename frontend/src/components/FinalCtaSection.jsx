import React from 'react';
import { Play, ArrowUpRight, RotateCcw, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { scrollToTarget } from '../lib/scrollEngine';

/**
 * FinalCtaSection
 * Climactic Closed-Loop Neural Resolution for NeuroMove.
 * Strictly adhering to: Baby Blue, Maroon, Green, Yellow, and 100% BLACK TEXT.
 */
export default function FinalCtaSection({ onLaunchLive, onContactTeam, isLightMode = true }) {
  const loopNodes = [
    { step: '01', title: 'Motor Intent', sub: 'Rolandic M1', color: '#A7D8F5' },
    { step: '02', title: 'Spatial Fusion', sub: '5 Bipolar Pairs', color: '#6FAF64' },
    { step: '03', title: 'MiniRocket AI', sub: '6.1 ms Latency', color: '#E8C547' },
    { step: '04', title: 'Hand Orthosis', sub: '5-DOF Flexion', color: '#7A263A' },
    { step: '05', title: 'Biofeedback', sub: '< 25 ms Closed', color: '#A7D8F5' },
  ];

  const handleRestartJourney = () => {
    scrollToTarget(0, {});
  };

  return (
    <section
      className="final-cta-section"
      style={{
        margin: '80px 0 40px 0',
        padding: '64px 36px',
        borderRadius: '28px',
        background: 'linear-gradient(145deg, #ffffff 0%, #f4faff 40%, #eaf4fb 100%)',
        border: '1.5px solid #000000',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 32px 80px -16px rgba(122, 38, 58, 0.16), 0 16px 36px -8px rgba(167, 216, 245, 0.25)',
      }}
    >
      {/* Background Radial Ambient Beam */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(167, 216, 245, 0.4) 0%, rgba(111, 175, 100, 0.2) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Closed-Loop Status Pill */}
        <div style={{ marginBottom: '16px' }}>
          <span
            className="mono"
            style={{
              fontSize: '0.76rem',
              color: '#000000', // STRICT BLACK TEXT
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: '#A7D8F5', // Baby Blue
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1.5px solid #000000',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)',
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
            <span>THE NEURAL LOOP IS CLOSED · ZERO LEAKAGE CONFIRMED</span>
          </span>
        </div>

        {/* Climactic Headline (100% BLACK TEXT) */}
        <h2
          style={{
            fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
            fontWeight: 900,
            color: '#000000', // STRICT BLACK TEXT
            letterSpacing: '-0.035em',
            margin: '0 0 16px 0',
            lineHeight: 1.12,
          }}
        >
          From Cortical Intention to Somatic Movement
        </h2>

        {/* Supporting Editorial Copy (100% BLACK TEXT) */}
        <p
          style={{
            fontSize: '1.05rem',
            color: '#000000', // STRICT BLACK TEXT
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto 36px auto',
            fontWeight: 500,
          }}
        >
          NeuroMove unites 5-pair spatial differential filtering, 10,000 MiniRocket PPV features, and mathematically audited zero-leakage cross-validation to power closed-loop neurorehabilitation at 6.1ms latency.
        </p>

        {/* The Closed-Loop Holographic Step Flow (Strict Palette, Black Text) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginBottom: '40px',
            padding: '20px 16px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            border: '1.5px solid #000000',
            backdropFilter: 'blur(16px)',
          }}
        >
          {loopNodes.map((node) => (
            <div key={node.step} style={{ textAlign: 'center', position: 'relative' }}>
              <div
                className="mono"
                style={{
                  fontSize: '0.7rem',
                  color: '#000000',
                  fontWeight: 900,
                  marginBottom: '4px',
                  background: node.color,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  border: '1px solid #000000',
                }}
              >
                STAGE {node.step}
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#000000' }}>
                {node.title}
              </div>
              <div className="mono" style={{ fontSize: '0.74rem', color: '#000000', fontWeight: 600 }}>
                {node.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Action Buttons (BLACK TEXT ONLY) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={onLaunchLive}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              borderRadius: '9999px',
              background: '#A7D8F5', // Baby Blue
              color: '#000000', // STRICT BLACK TEXT
              fontWeight: 900,
              fontSize: '0.96rem',
              border: '1.5px solid #000000',
              boxShadow: '0 8px 24px rgba(167, 216, 245, 0.5)',
              cursor: 'pointer',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <Play size={16} fill="#000000" color="#000000" />
            <span>Launch Live Playback</span>
            <span
              className="mono"
              style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '9999px',
                background: '#E8C547', // Yellow
                color: '#000000',
                fontWeight: 900,
                border: '1px solid #000000',
              }}
            >
              160 HZ
            </span>
          </button>

          <button
            onClick={onContactTeam}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 26px',
              borderRadius: '9999px',
              background: '#ffffff',
              color: '#000000', // STRICT BLACK TEXT
              fontWeight: 800,
              fontSize: '0.92rem',
              border: '1.5px solid #000000',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span>Explore Signal Architecture</span>
            <ArrowUpRight size={16} color="#000000" />
          </button>

          <button
            onClick={handleRestartJourney}
            title="Scroll back to top of the experience"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '14px 20px',
              borderRadius: '9999px',
              background: '#ffffff',
              color: '#000000', // STRICT BLACK TEXT
              fontWeight: 800,
              fontSize: '0.86rem',
              border: '1.5px solid #000000',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E8C547';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
            }}
          >
            <RotateCcw size={14} color="#000000" />
            <span>Restart Journey</span>
          </button>
        </div>

        {/* Bottom Verification Guarantee Pill Bar (100% BLACK TEXT) */}
        <div
          style={{
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            fontSize: '0.78rem',
            color: '#000000', // STRICT BLACK TEXT
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#000000', fontWeight: 800 }}>
            <CheckCircle2 size={15} color="#6FAF64" />
            <span>10-FOLD STRATIFIED CV (97.41%)</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#000000', fontWeight: 800 }}>
            <ShieldCheck size={15} color="#A7D8F5" />
            <span>AUDITED ZERO TRIAL LEAKAGE</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#000000', fontWeight: 800 }}>
            <Zap size={15} color="#7A263A" />
            <span>6.1 MS CLOSED-FORM LATENCY</span>
          </span>
        </div>
      </div>
    </section>
  );
}
