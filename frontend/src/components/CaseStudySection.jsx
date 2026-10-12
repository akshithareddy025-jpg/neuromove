import React from 'react';
import { ArrowUpRight, CheckCircle2, Award, Zap } from 'lucide-react';
import SpotlightCard from './effects/SpotlightCard';

/**
 * CaseStudySection
 * Section: Clinical Case Study Highlight
 */
export default function CaseStudySection({ onExploreLeaderboard, isLightMode = true }) {
  return (
    <section className="case-study-section" style={{ margin: '48px 0' }}>
      <SpotlightCard
        spotlightColor={isLightMode ? 'rgba(244, 114, 182, 0.15)' : 'rgba(255, 255, 255, 0.08)'}
        borderColor={isLightMode ? 'rgba(244, 114, 182, 0.3)' : 'rgba(255, 255, 255, 0.09)'}
        style={{
          padding: '36px',
          background: isLightMode ? 'rgba(255, 255, 255, 0.96)' : undefined,
          boxShadow: isLightMode ? '0 20px 50px -10px rgba(244, 114, 182, 0.18)' : undefined,
          borderRadius: '20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          <div>
            <span
              className="mono"
              style={{
                fontSize: '0.74rem',
                color: isLightMode ? '#ea580c' : '#FFFFFF',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: isLightMode ? 'rgba(234, 88, 12, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                padding: '3px 10px',
                borderRadius: '6px',
                display: 'inline-block',
                marginBottom: '8px',
              }}
            >
              BENCHMARK CASE STUDY · S002 & S004 COHORT
            </span>
            <h2
              className={isLightMode ? 'shining-black-heading' : ''}
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: 900,
                color: isLightMode ? '#09090b' : '#FFFFFF',
                letterSpacing: '-0.025em',
                margin: '10px 0 16px 0',
                lineHeight: 1.2,
              }}
            >
              Unified every motor signal across bilateral hands and feet — giving clinical neuroprosthetics one provable source of truth.
            </h2>
            <p style={{ fontSize: '0.94rem', color: isLightMode ? '#334155' : '#A1A1AA', lineHeight: 1.65, margin: '0 0 24px 0' }}>
              Research teams replaced fragile deep learning CNN-LSTMs and cumbersome 64-channel full-cap setups with NeuroMove,
              wiring 8–30 Hz bandpass filtering, 5-pair motor cortex fusion, and closed-form Ridge classification into a single
              deterministic pipeline — cutting mean decision latency to <strong style={{ color: isLightMode ? '#09090b' : '#FFFFFF' }}>6.1ms</strong> while achieving an unprecedented{' '}
              <strong style={{ color: isLightMode ? '#db2777' : '#FFFFFF' }}>97.59% accuracy on subject S002</strong> (and <strong style={{ color: isLightMode ? '#0284c7' : '#FFFFFF' }}>97.44% on S004</strong>).
            </p>

            <button
              onClick={onExploreLeaderboard}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: '9999px',
                background: isLightMode ? '#09090b' : '#FFFFFF',
                border: isLightMode ? '1px solid #09090b' : '1px solid #FFFFFF',
                color: isLightMode ? '#FFFFFF' : '#000000',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: isLightMode ? '0 4px 16px rgba(0, 0, 0, 0.2)' : '0 4px 16px rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                if (isLightMode) e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.28)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                if (isLightMode) e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
              }}
            >
              <span>Explore 5-Subject Leaderboard</span>
              <ArrowUpRight size={15} color={isLightMode ? '#FFFFFF' : '#000000'} />
            </button>
          </div>

          {/* Highlight card */}
          <div
            style={{
              background: isLightMode ? 'rgba(253, 242, 248, 0.95)' : 'rgba(10, 10, 10, 0.9)',
              border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '18px',
              padding: '28px',
              boxShadow: isLightMode ? '0 12px 30px rgba(244, 114, 182, 0.12)' : '0 12px 30px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <span className="mono" style={{ fontSize: '0.74rem', color: isLightMode ? '#64748b' : '#A1A1AA', fontWeight: 700 }}>
                COHORT HIGHLIGHT: SUBJECT S002
              </span>
              <span
                className="mono"
                style={{
                  fontSize: '0.68rem',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: isLightMode ? 'rgba(219, 39, 119, 0.12)' : 'rgba(255, 255, 255, 0.08)',
                  border: isLightMode ? '1px solid rgba(219, 39, 119, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: isLightMode ? '#db2777' : '#FFFFFF',
                  fontWeight: 800,
                }}
              >
                TOP PERFORMER
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: isLightMode ? '1px solid rgba(244, 114, 182, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.88rem', color: isLightMode ? '#475569' : '#E4E4E7', fontWeight: 600 }}>10-Fold CV Accuracy</span>
                <span className="mono" style={{ fontSize: '1.25rem', fontWeight: 900, color: isLightMode ? '#db2777' : '#FFFFFF' }}>
                  97.59%
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: isLightMode ? '1px solid rgba(244, 114, 182, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.88rem', color: isLightMode ? '#475569' : '#E4E4E7', fontWeight: 600 }}>Inference Turnaround</span>
                <span className="mono" style={{ fontSize: '1.25rem', fontWeight: 900, color: isLightMode ? '#0284c7' : '#FFFFFF' }}>
                  6.1 ms
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: isLightMode ? '1px solid rgba(244, 114, 182, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)' }}>
                <span style={{ fontSize: '0.88rem', color: isLightMode ? '#475569' : '#E4E4E7', fontWeight: 600 }}>Spatial Channel Count</span>
                <span className="mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: isLightMode ? '#09090b' : '#FFFFFF' }}>
                  5 Differential Pairs
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', color: isLightMode ? '#475569' : '#E4E4E7', fontWeight: 600 }}>Data Leakage Audit</span>
                <span className="mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669' }}>
                  0.00% (Strict Trial Split)
                </span>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
