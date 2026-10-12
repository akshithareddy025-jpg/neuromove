import React from 'react';
import { ArrowDown, Cpu, Activity, GitBranch, Zap, CheckCircle2 } from 'lucide-react';

/**
 * ClassificationFlowchart
 * Section 9: Two-model classification as a clean flowchart of everything we did.
 * Clean, modern scientific flowchart with light-mode cards, node connectors, and badges.
 */
export default function ClassificationFlowchart({ className = '', style = {} }) {
  const STEPS = [
    {
      step: '01',
      title: '64-Channel Scalp EEG Ingestion',
      detail: '109 Subjects · 4,050 Preprocessed Trials · CAR & 128 Hz Anti-Aliased Resampling',
      badge: 'PhysioNet EEGMMIDB',
      color: '#0284C7',
    },
    {
      step: '02',
      title: 'Zero-Phase Butterworth Filtering (8–30 Hz)',
      detail: '4th-Order Bandpass Filter · 0.000 rad Phase Lag · > 42 dB Line Hum Rejection',
      badge: 'Mu/Beta SMR Purification',
      color: '#00a896',
    },
    {
      step: '03',
      title: '5 Symmetric Motor Cortex Electrode Pairs',
      detail: 'FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4 (Premotor, Primary Hand, Somatosensory)',
      badge: 'Spatial Feature Fusion',
      color: '#1e67d6',
    },
  ];

  const MODELS = [
    {
      name: 'Model 1: MiniRocket Spatial Fusion Champion',
      acc: '97.41% Test Accuracy',
      latency: '6.1 ms Latency',
      details: '10,000 PPV dilated kernels + Closed-form L2 Ridge SVD solve. Zero backprop required.',
      badge: 'Closed-Form Champion',
      color: '#1e67d6',
    },
    {
      name: 'Model 2: Hybrid CNN-LSTM Spatio-Temporal Model',
      acc: '97.16% Test Accuracy',
      latency: '2.15 ms GPU / 44ms CPU',
      details: 'Spatio-Temporal Tensor (N, 256, 10) + Multi-Scale Conv1D + 128-Unit BiLSTM.',
      badge: 'Deep Neural Champion',
      color: '#00a896',
    },
  ];

  return (
    <section
      id="classification-flowchart"
      className={`classification-flowchart-section ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '80px 24px',
        background: '#FAFAFD',
        color: '#0F172A',
        zIndex: 10,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(30, 103, 214, 0.08)',
              border: '1px solid rgba(30, 103, 214, 0.20)',
              color: '#1e67d6',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <GitBranch size={14} />
            <span>Section 09 · Complete Technical Pipeline Flowchart</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.035em',
              margin: '0 0 12px 0',
            }}
          >
            End-to-End Classification Flowchart
          </h2>
          <p
            style={{
              fontSize: '1.02rem',
              color: '#475569',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            How raw 64-channel brain waves pass through zero-phase electrophysiological filtering, spatial pair fusion, dual decoders, and sub-10ms intent classification.
          </p>
        </div>

        {/* Sequential Steps 1 to 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          {STEPS.map((s, idx) => (
            <React.Fragment key={idx}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '780px',
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '24px 32px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: s.color, letterSpacing: '0.12em' }}>
                      STEP {s.step}
                    </span>
                    <span style={{ fontSize: '0.70rem', fontWeight: 700, background: 'rgba(30,103,214,0.08)', color: s.color, padding: '2px 10px', borderRadius: '999px' }}>
                      {s.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                    {s.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                    {s.detail}
                  </div>
                </div>
                <CheckCircle2 size={24} color={s.color} style={{ flexShrink: 0 }} />
              </div>

              <ArrowDown size={22} color="#94A3B8" />
            </React.Fragment>
          ))}
        </div>

        {/* Branching Stage into Dual Champions */}
        <div style={{ width: '100%', maxWidth: '780px', margin: '0 auto 24px auto', textAlign: 'center' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
            DUAL-CHAMPION DECODER BRANCHING
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {MODELS.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '28px',
                  border: `2px solid ${m.color}`,
                  boxShadow: '0 12px 30px -6px rgba(15, 23, 42, 0.06)',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '0.70rem', fontWeight: 800, color: m.color, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {m.badge}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                  {m.name}
                </h4>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: m.color }}>{m.acc}</span>
                  <span style={{ fontSize: '0.90rem', fontWeight: 700, color: '#64748B' }}>{m.latency}</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  {m.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Output Node */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <ArrowDown size={22} color="#94A3B8" />

          <div
            style={{
              width: '100%',
              maxWidth: '780px',
              background: 'linear-gradient(135deg, #0F172A 0%, #1E67D6 100%)',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px 32px',
              textAlign: 'center',
              boxShadow: '0 16px 40px -10px rgba(30, 103, 214, 0.3)',
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
              STEP 04 · DECODED MOTOR INTENTION & SOMATIC ACTUATION
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 6px 0' }}>
              4-Class Prediction (T1 Left, T2 Right, T3 Both Fists, T4 Both Feet)
            </h3>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
              Sub-10ms Signal-to-Movement Payoff Triggering 5-DOF Orthotic Robotic Hand
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
