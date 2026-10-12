import React from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import BothHandAnimation from '../ui/BothHandAnimation';
import { ShieldCheck, Zap, Activity, Cpu } from 'lucide-react';

/**
 * OutputClasses
 * 
 * After the two-model classification flow, displays T1/T2/T3/T4 output labels
 * with their actual project meanings. Based on the NeuroMove 2.0 system:
 * 
   T1 ($L$) — Left Fist Kinesthetic Motor Imagery
   T2 ($R$) — Right Fist Kinesthetic Motor Imagery
   T3 ($BLR$) — Bilateral Hand (Both Fists) Kinesthetic Motor Imagery
   T4 ($BF$) — Bilateral Lower Limb (Both Feet) Kinesthetic Motor Imagery
 * 
 * Each output gets a card with its code, label, and brief description drawn
 * from the project README and paper metadata.
 */
export default function OutputClasses({ onTransitionComplete = null }) {
  const OUTPUTS = [
    {
      code: 'T1',
      label: 'Left Fist Imagery',
      meaning: 'Kinesthetic motor imagery of making a left fist. Activates contralateral right motor cortex (C4 dipole).',
      accuracy: '97.95% Precision | 94.09% Recall | F1: 95.98%',
      color: 'skyblue',
    },
    {
      code: 'T2',
      label: 'Right Fist Imagery',
      meaning: 'Kinesthetic motor imagery of making a right fist. Activates contralateral left motor cortex (C3 dipole).',
      accuracy: '97.07% Precision | 98.51% Recall | F1: 97.79%',
      color: 'yellow',
    },
    {
      code: 'T3',
      label: 'Bilateral Hand Imagery',
      meaning: 'Kinesthetic motor imagery of making both fists simultaneously. Bilateral Rolandic cortex desynchronization.',
      accuracy: '97.51% Precision | 98.00% Recall | F1: 97.76%',
      color: 'blue',
    },
    {
      code: 'T4',
      label: 'Bilateral Foot Imagery',
      meaning: 'Kinesthetic motor imagery of moving both feet. Medial longitudinal fissure (Cz/CPz) somatosensory modulation.',
      accuracy: '97.13% Precision | 99.02% Recall | F1: 98.07%',
      color: 'red',
    },
  ];

  return (
    <section
      id="output-classes"
      className={`output-classes-section`}
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
          Output Interpretations
        </h2>

        <p
          style={{
            fontSize: '1.08rem',
            lineHeight: 1.7,
            color: '#475569',
            margin: '0 0 32px 0',
            textAlign: 'center',
          }}
        >
          Each output represents a distinct motor imagery class classified by both the
          MiniRocket and CNN-LSTM models. Accuracy exceeds 97% for all four classes.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '32px',
        }}>
          {OUTPUTS.map((out) => {
            const isT3 = out.code === 'T3';
            return (
              <GlassPanel
                key={out.code}
                style={{
                  padding: '30px 26px',
                  borderRadius: '24px',
                  border: isT3 ? '1.5px solid #1E67D6' : '1px solid rgba(30, 103, 214, 0.25)',
                  background: isT3 ? 'linear-gradient(180deg, rgba(240, 246, 255, 0.96) 0%, rgba(255, 255, 255, 0.95) 100%)' : 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(24px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(150%)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                  gridColumn: isT3 ? '1 / -1' : undefined,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(30, 103, 214, 0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div>
                      <span
                        style={{
                          fontSize: '3.6rem',
                          fontWeight: 900,
                          color: '#0F172A',
                          lineHeight: 1,
                        }}
                      >
                        {out.code}
                      </span>
                      <br />
                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: '#1E67D6',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          fontWeight: 700,
                        }}
                      >
                        {out.label}
                      </span>
                    </div>
                    {isT3 && (
                      <span
                        style={{
                          fontSize: '0.70rem',
                          fontWeight: 800,
                          fontFamily: 'monospace',
                          background: 'rgba(30, 103, 214, 0.12)',
                          color: '#1E67D6',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          border: '1px solid rgba(30, 103, 214, 0.3)',
                        }}
                      >
                        LIVE BOTH HAND ACTUATION
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      marginTop: '12px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(30, 103, 214, 0.08)',
                      border: '1px solid rgba(30, 103, 214, 0.25)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#1E67D6',
                    }}
                  >
                    {out.accuracy}
                  </div>
                </div>

                {/* Embedded Both Hand Animation inside T3 Card */}
                {isT3 && (
                  <div
                    style={{
                      margin: '12px 0 18px 0',
                      borderRadius: '16px',
                      background: '#05070D',
                      border: '1px solid rgba(97, 215, 255, 0.25)',
                      overflow: 'hidden',
                      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.6)',
                    }}
                  >
                    <BothHandAnimation variant="card" interactive={true} />
                  </div>
                )}

                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#152015',
                    lineHeight: 1.3,
                    margin: '0 0 8px 0',
                  }}
                >
                  {out.code}
                </h4>

                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    color: '#526351',
                    margin: 0,
                  }}
                >
                  {out.meaning}
                </p>
              </GlassPanel>
            );
          })}
        </div>

        {/* Signal flow note */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(97, 215, 255, 0.1)',
            fontSize: '0.82rem',
            color: '#475569',
            fontFamily: 'var(--font-mono, monospace)',
            textAlign: 'center',
          }}
        >
          Output pipeline: Preprocessed EEG → Model 1 + Model 2 → Independent classification → T1/T2/T3/T4
        </div>
      </div>
    </section>
  );
}