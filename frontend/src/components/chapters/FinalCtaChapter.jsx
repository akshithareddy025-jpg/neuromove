import React from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import { Play, ArrowUpRight, Sparkles, Activity } from 'lucide-react';
import { scrollToTarget } from '../../lib/scrollEngine';

/**
 * FinalCtaChapter
 * Chapter 11: Final Statement & Call to Action.
 * Direction: "From cortical intention to measurable movement."
 */
export default function FinalCtaChapter({
  onLaunchLive,
  className = '',
  style = {},
}) {
  const handleScrollToTelemetry = () => {
    scrollToTarget('#telemetry-instrument', {});
  };

  const handleScrollToValidation = () => {
    scrollToTarget('#validation-proof', {});
  };

  return (
    <section id="final-statement" className={`final-cta-chapter ${className}`} style={{ width: '100%', marginBottom: '64px', ...style }}>
      <GlassPanel
        variant="hero"
        glow
        style={{
          padding: 'clamp(40px, 6vw, 68px) clamp(24px, 5vw, 56px)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Ambient Radial Highlight */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(97, 215, 255, 0.16) 0%, rgba(58, 11, 23, 0.25) 50%, transparent 75%)',
            filter: 'blur(45px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '840px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <MetricChip label="PRECISION NEURAL DECODING" color="skyblue" />
            <span style={{ fontSize: '0.74rem', color: '#FFD447', fontFamily: 'monospace', fontWeight: 700 }}>
              6.1 MS SUB-10MS CLASSIFIER
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              margin: '0 0 18px 0',
              textShadow: '0 4px 32px rgba(0, 0, 0, 0.9)',
            }}
          >
            From cortical intention<br />
            <span style={{ color: '#61D7FF' }}>to measurable movement.</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.98rem, 1.3vw, 1.15rem)',
              lineHeight: 1.65,
              color: '#D4D4D8',
              maxWidth: '680px',
              margin: '0 auto 32px auto',
              fontWeight: 400,
            }}
          >
            Zero data leakage. 5-pair spatial differential fusion. Dual closed-form and deep learning decoders engineered for transparent, clinical-grade BCI research.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={handleScrollToTelemetry}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '9999px',
                background: '#FFFFFF',
                border: 'none',
                color: '#000000',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 10px 28px rgba(255, 255, 255, 0.35)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Play size={15} fill="#000000" color="#000000" />
              <span>Launch Live Telemetry</span>
            </button>

            <button
              onClick={handleScrollToValidation}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#61D7FF';
                e.currentTarget.style.color = '#61D7FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <span>Explore Benchmark Proof</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </GlassPanel>
    </section>
  );
}
