import React from 'react';
import { AlertTriangle, TrendingDown, Layers } from 'lucide-react';
import SpotlightCard from './effects/SpotlightCard';

/**
 * ChallengeSection
 * Section: The challenge — traditional BCI pipelines vs genuine clinical neurophysiology
 */
export default function ChallengeSection({ isLightMode = true }) {
  const challenges = [
    {
      title: 'Sub-Window Data Leakage & Score Inflation',
      description:
        'Standard benchmarks often slice continuous trials into overlapping time windows before splitting train and test sets. This creates severe temporal leakage, fabricating illusory 99% accuracy scores that collapse catastrophically in real-time patient trials.',
      icon: AlertTriangle,
      color: '#ea580c',
      badge: 'METHODOLOGICAL FLAW',
    },
    {
      title: 'Deep Learning Overfitting & Temporal Drift',
      description:
        'Naively flattening multi-channel EEG into 1D sequences caused traditional CNN-LSTM to collapse to 29.96% (near-chance). NeuroMove 2.0 engineered a 2D spatio-temporal tensor (N, 256, 10) with Conv1D + BiLSTM and L2 regularization, lifting CNN-LSTM to 97.16% alongside 97.41% MiniRocket.',
      icon: TrendingDown,
      color: '#db2777',
      badge: 'ARCHITECTURAL TRADEOFF',
    },
    {
      title: 'Cumbersome 64-Channel Hardware Burden',
      description:
        'Full-cap 64-channel setups require extensive conductive gel application, impedance checks, and heavy calibration times. NeuroMove extracts 5 targeted bipolar pairs along the primary motor strip (C3-C4, C1-C2, FC3-FC4, CP3-CP4, C5-C6), achieving 97.41% accuracy (MiniRocket) and 97.16% (CNN-LSTM) with a lightweight clinical footprint.',
      icon: Layers,
      color: '#0284c7',
      badge: 'CLINICAL DEPLOYMENT GAP',
    },
  ];

  return (
    <section className="challenge-section" style={{ margin: '48px 0' }}>
      <div style={{ maxWidth: '820px', marginBottom: '32px' }}>
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
            marginBottom: '6px',
          }}
        >
          THE PROBLEM STATEMENT
        </span>
        <h2
          className={isLightMode ? 'shining-black-heading' : ''}
          style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
            fontWeight: 900,
            color: isLightMode ? '#09090b' : '#FFFFFF',
            letterSpacing: '-0.03em',
            margin: '8px 0 16px 0',
            lineHeight: 1.15,
          }}
        >
          The challenge: Traditional BCI pipelines face critical tradeoffs
        </h2>
        <p style={{ fontSize: '1.02rem', color: isLightMode ? '#334155' : '#A1A1AA', lineHeight: 1.65, margin: 0 }}>
          High-performance motor imagery BCI requires real neurophysiological modulation, not data leakage or deep
          learning memorization. Here is why conventional approaches fall short in clinical environments.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {challenges.map((item, index) => {
          const IconComp = item.icon;
          return (
            <SpotlightCard
              key={index}
              spotlightColor={isLightMode ? 'rgba(244, 114, 182, 0.15)' : 'rgba(255, 255, 255, 0.08)'}
              borderColor={isLightMode ? 'rgba(244, 114, 182, 0.28)' : 'rgba(255, 255, 255, 0.1)'}
              hoverBorderColor={isLightMode ? 'rgba(249, 115, 22, 0.45)' : 'rgba(255, 255, 255, 0.35)'}
              style={{
                padding: '24px 28px',
                background: isLightMode ? 'rgba(255, 255, 255, 0.95)' : undefined,
                boxShadow: isLightMode ? '0 12px 30px -8px rgba(244, 114, 182, 0.12)' : undefined,
                borderRadius: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '18px',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: isLightMode ? '#fdf2f8' : 'rgba(255, 255, 255, 0.08)',
                    border: isLightMode ? '1px solid rgba(244, 114, 182, 0.35)' : '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <IconComp size={20} color={isLightMode ? item.color : '#FFFFFF'} />
                </div>

                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px',
                      marginBottom: '8px',
                    }}
                  >
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isLightMode ? '#09090b' : '#FFFFFF', margin: 0 }}>
                      {item.title}
                    </h3>
                    <span
                      className="mono"
                      style={{
                        fontSize: '0.7rem',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: isLightMode ? 'rgba(234, 88, 12, 0.12)' : 'rgba(255, 255, 255, 0.08)',
                        color: isLightMode ? '#ea580c' : '#FFFFFF',
                        fontWeight: 700,
                        border: isLightMode ? '1px solid rgba(234, 88, 12, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: isLightMode ? '#334155' : '#A1A1AA', lineHeight: 1.65, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
