import React from 'react';
import { Award } from 'lucide-react';

/**
 * TeamWildScoreSection
 * Section 2: competition "Wild Score" metrics banner + GitHub links row.
 * Hand-world (dark) section before the NEUROMOVE portal zoom.
 * Styled in dark obsidian glass aesthetics with vivid neon accents.
 */
export default function TeamWildScoreSection({ className = '', style = {} }) {
  const WILD_SCORES = [
    { label: 'WILD SCORE / TEST ACCURACY', value: '97.41%', subtext: 'MiniRocket Champion (Macro F1: 0.9740)' },
    { label: 'SPATIO-TEMPORAL ACCURACY', value: '97.16%', subtext: 'Hybrid CNN-LSTM (Macro ROC-AUC: 0.9978)' },
    { label: 'DATA LEAKAGE AUDIT', value: '0.00%', subtext: 'Verified Zero-Leakage Continuous Trial CV' },
    { label: 'INFERENCE LATENCY', value: '6.1 ms', subtext: 'Closed-Form Sub-10ms Guarantee' },
  ];

  return (
    <section
      id="team-wild-score"
      className={`team-wild-score-section ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '70px 24px',
        // Transparent: sits directly on the main app background (#020204)
        // so cards and section share one continuous black canvas.
        background: 'transparent',
        color: '#FFFFFF',
        zIndex: 10,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: '#E4E4E7',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <Award size={14} color="#FFFFFF" />
            <span>Official Competition Benchmarks & Investigators</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              margin: '0 0 12px 0',
            }}
          >
            Our Wild Score & Research Team
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#94A3B8',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Built for zero-leakage clinical precision. Evaluated across 109 subjects and 4,050 preprocessed trials on the PhysioNet EEGMMIDB benchmark.
          </p>
        </div>

        {/* Wild Score Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '56px',
          }}
        >
          {WILD_SCORES.map((score, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(24px) saturate(140%)',
                WebkitBackdropFilter: 'blur(24px) saturate(140%)',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 12px 36px -8px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.32)';
                e.currentTarget.style.boxShadow = '0 18px 44px -8px rgba(0, 0, 0, 0.8), 0 0 24px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = '0 12px 36px -8px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12)';
              }}
            >
              <div style={{ fontSize: '0.70rem', fontWeight: 800, color: '#A1A1AA', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {score.label}
              </div>
              <div style={{ fontSize: '2.6rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '8px', textShadow: '0 0 24px rgba(255, 255, 255, 0.25)' }}>
                {score.value}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#D4D4D8', fontWeight: 500 }}>
                {score.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Links Row (hand world) */}
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Core Investigators on GitHub</span>
          </h3>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {[
              { name: 'Rohan Vemula', href: 'https://github.com/rohanvemula279-star' },
              { name: 'Sudhasri A', href: 'https://github.com/SudhasriA' },
              { name: 'Nakshathra V', href: 'https://github.com/nakshathrav2007-hash' },
              { name: 'Akshitha Reddy', href: 'https://github.com/akshithareddy025-jpg' },
              { name: 'Sahasra Marikanti', href: 'https://github.com/sahasramarikanti-cpu' },
            ].map((member) => (
              <a
                key={member.href}
                href={member.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#E4E4E7',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.32)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                  e.currentTarget.style.color = '#E4E4E7';
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
                <span>{member.name}</span>
                <span className="mono" style={{ fontSize: '0.68rem', color: '#A1A1AA' }}>GitHub ↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
