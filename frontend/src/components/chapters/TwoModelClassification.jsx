import React from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import { ArrowRight, Brain, Cpu, Zap } from 'lucide-react';

/**
 * TwoModelClassification
 * 
 * After the preprocessing video section, displays the two model classifications
 * built for the NeuroMove project as a clean flowchart/pipeline visualization.
 * 
 * Pipeline sequence:
   Input (preprocessed EEG)
     │
     ├──┐                   ┌──┐
     │  │                   │  │
   MODEL 1              MODEL 2
     │  │                   │  │
     └──┘                   └──┘
        │                       │
        ▼                       ▼
     Classification     Classification
        │                       │
        └──────────────┬────────┘
                       │
                       ▼
              T1 / T2 / T3 / T4 Outputs
 * 
 * Visual design:
   - Dark navy header, white flowboxes, cyan/indigo accents
   - Model nodes with subtle glassmorphism
   - Animated connector arrows
   - Result metrics shown under each model
 */
export default function TwoModelClassification({ onTransitionComplete = null }) {
  // Model data from the project (real architectures, not invented)
  const MODELS = [
    {
      id: 1,
      name: 'MiniRocket + RidgeClassifier',
      type: 'Spatial Fusion Model',
      accuracy: '97.41%',
      latency: '7.06 ms',
      features: '10,000 PPV (2,000 kernels × 5 pairs)',
      description:
        'Closed-form convex solver — no gradient descent, no GPU, deterministic inference. Fits scaler/kernels on train folds only (zero leakage). Proportion of Positive Values (PPV) features from independent kernel fitting per electrode pair.',
      color: 'skyblue',
      accent: '#38bdf8',
    },
    {
      id: 2,
      name: 'Hybrid CNN-LSTM',
      type: 'Spatio-Temporal Model',
      accuracy: '97.16%',
      latency: '2.15 ms (GPU) / 44.6 ms (CPU)',
      features: '342,564 parameters',
      description:
        'Multi-scale 1D convolutions (kernels 7, 5, 3) + Bidirectional LSTM (128 units) integrates forward/backward temporal dynamics. Dynamic ReduceLROnPlateau scheduler from 2×10⁻³ down to 3.125×10⁻⁵. Preserves spatio-temporal tensor (N, 256 timesteps, 10 channels).',
      color: 'yellow',
      accent: '#f59e0b',
    },
  ];

  return (
    <section
      id="two-models"
      className={`two-models-section`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '64px 24px',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderRadius: '28px',
        border: '1px solid rgba(255, 255, 255, 0.90)',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.06)',
        margin: '0 auto 48px auto',
        maxWidth: '1200px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.6rem)',
            fontWeight: 800,
            color: '#152015',
            lineHeight: 1.2,
            letterSpacing: '-0.04em',
            margin: '0 0 32px 0',
            textAlign: 'center',
          }}
        >
          Two-Model Classification
        </h2>

        <p
          style={{
            fontSize: '1.02rem',
            lineHeight: 1.7,
            color: '#475569',
            margin: '0 0 32px 0',
            textAlign: 'center',
          }}
        >
          Same preprocessed EEG data fans into two complementary classification approaches.
          Both models exceed the ≥95% test accuracy benchmark on the 5-subject PhysioNet EEGMMIDB cohort.
        </p>

        {/* Model comparison grid: two glass cards side by side */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {/* MODEL 1 — active champion: full emphasis */}
          <GlassPanel
            style={{
              borderRadius: '24px',
              border: '2px solid rgba(30, 103, 214, 0.55)',
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 20px 48px -12px rgba(30, 103, 214, 0.25)',
              backdropFilter: 'blur(30px) saturate(160%)',
              WebkitBackdropFilter: 'blur(30px) saturate(160%)',
              padding: '32px 24px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(56, 189, 248, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(56, 189, 248, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Brain size={20} color="#38bdf8" />
              </div>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#152015',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Model 1
              </span>
            </div>

            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#152015',
                lineHeight: 1.3,
                margin: '0 0 12px 0',
              }}
            >
              {MODELS[0].name}
            </h3>

            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.5,
                color: '#526351',
                margin: '0 0 16px 0',
              }}
            >
              {MODELS[0].type}
            </p>

            <div style={{ display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 700 }}>Accuracy</span>
                <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.1rem' }}>{MODELS[0].accuracy}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 700 }}>Latency</span>
                <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.1rem' }}>{MODELS[0].latency}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 700 }}>Features</span>
                <span style={{ fontWeight: 600, color: '#0F172A', fontSize: '1rem' }}>{MODELS[0].features}</span>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.82rem',
                lineHeight: 1.5,
                color: '#94a3b8',
                margin: '16px 0 0 0',
              }}
            >
              {MODELS[0].description}
            </p>
          </GlassPanel>

          {/* MODEL 2 — quiet comparator */}
          <GlassPanel
            style={{
              borderRadius: '24px',
              border: '1px solid rgba(100, 116, 139, 0.30)',
              background: 'rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(30px) saturate(140%)',
              WebkitBackdropFilter: 'blur(30px) saturate(140%)',
              padding: '32px 24px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={20} color='#f59e0b' />
              </div>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#152015',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Model 2
              </span>
            </div>

            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#152015',
                lineHeight: 1.3,
                margin: '0 0 12px 0',
              }}
            >
              {MODELS[1].name}
            </h3>

            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.5,
                color: '#526351',
                margin: '0 0 16px 0',
              }}
            >
              {MODELS[1].type}
            </p>

            <div style={{ display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 700 }}>Accuracy</span>
                <span style={{ fontWeight: 700, color: '#334155', fontSize: '1.1rem' }}>{MODELS[1].accuracy}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 700 }}>Latency</span>
                <span style={{ fontWeight: 700, color: '#334155', fontSize: '1.1rem' }}>{MODELS[1].latency}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontSize: '0.78rem', fontWeight: 700 }}>Params</span>
                <span style={{ fontWeight: 500, color: '#334155', fontSize: '1rem' }}>{MODELS[1].features}</span>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.82rem',
                lineHeight: 1.5,
                color: '#94a3b8',
                margin: '16px 0 0 0',
              }}
            >
              {MODELS[1].description}
            </p>
          </GlassPanel>
        </div>

        {/* Flowchart connector between models and outputs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '32px 0',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '4px',
              height: '48px',
              background: 'linear-gradient(180deg, #61d7ff 0%, #a5f3fc 100%)',
              borderRadius: '2px',
            }}
          />
          <ArrowRight size={16} color='#61D7FF' style={{ opacity: 0.7 }} />
          <div
            style={{
              width: '4px',
              height: '48px',
              background: 'linear-gradient(180deg, #f59e0b 0%, #fbbf24 100%)',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* Output classes preview (T1–T4) */}
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(97, 215, 255, 0.1)' }}>
          <h4
            style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#61D7FF',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '0 0 12px 0',
            }}
          >
            Output Classes (T1–T4)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {['T1', 'T2', 'T3', 'T4'].map((code) => (
              <GlassPanel
                key={code}
                style={{
                  padding: '12px 8px',
                  borderRadius: '10px',
                  border: '1px solid rgba(97, 215, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.5)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    color: '#152015',
                  }}
                >
                  {code}
                </div>
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: '#A1A1AA',
                    marginTop: '4px',
                  }}
                >
                  Motor Imagery Class
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}