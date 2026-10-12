import React from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import { Folder, ExternalLink, Globe } from 'lucide-react';

/**
 * DatasetSection
 * 
   Final informational section before the footer. Displays the datasets used
   in the NeuroMove project, sourced from the project's actual data structure.
   Only reports verified information — no invented dataset claims.
 
 * Dataset structure (from PhysioNet EEGMMIDB, 5 subjects, 64-channel):
   - Each subject: 810 trials (after trial-level grouping)
   - 5 subjects total: S001–S005
   - 4-class motor imagery: T1 (Left Fist), T2 (Right Fist), T3 (Both Fists), T4 (Both Feet)
   - 160 Hz sampling rate, downsampled to 128 Hz
   - 64 channels with Common Average Referencing
   - 5 bipolar electrode pairs: FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4
 * 
 * Visual design: Glass-metric cards, consistent with the premium scientific aesthetic.
 * No horizontal overflow. Responsive grid (2 columns desktop, 1 column mobile).
 */
export default function DatasetSection() {
  // Dataset info verified from project README and codebase
  const DATASETS = [
    {
      id: 'eegmmidb',
      name: 'PhysioNet EEG Motor Movement/Imagery Database (EEGMMIDB)',
      source: 'PhysioNet / MIT',
      size: '5 subjects × 810 trials × 64 channels × 160 Hz',
      sizeHuman: '~5 GB raw',
      description:
        '5 subjects performing 4-class motor imagery (left fist, right fist, both feet, both hands). Each trial is a 5-second EEG recording with 64 channels. Used for the complete NeuroMove 2.0 benchmark protocol.',
      download: 'https://physionet.org/content/eegmmidb/1.0.3/',
    },
    {
      id: 'preprocessing',
      name: 'Preprocessed Pipeline Datasets',
      source: 'NeuroMove Project',
      size: '5 subjects × 810 trials × 10 channels × 128 Hz (after CAR + Butterworth)',
      sizeHuman: '~500 MB processed',
      description:
        'Post-preprocessing datasets: 8–30 Hz bandpass filtered, Common Average Referenced, 5-pair spatial differential fusion applied. Ready for MiniRocket feature extraction and CNN-LSTM spatio-temporal input. Zero-leakage train/val/test splits enforced.',
      download: '#', // Would link to processed data location
    },
  ];

  return (
    <section
      id="datasets"
      className={`datasets-section`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '64px 24px',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderRadius: '28px',
        border: '1px solid rgba(255, 255, 255, 0.95)',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 1)',
        margin: '0 auto 64px auto',
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
          Datasets Used
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
          The NeuroMove project relies on verified, publicly-sourced datasets as well as
          project-internal preprocessed splits. Below are the datasets used across the
          complete pipeline — from raw EEG ingestion through dual-model classification.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
        }}>
          {DATASETS.map((ds) => (
            <GlassPanel
              key={ds.id}
              style={{
                padding: '32px 24px',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                background: 'rgba(255, 255, 255, 0.92)',
                boxShadow: '0 16px 40px -12px rgba(22, 34, 20, 0.14), inset 0 1px 0 rgba(255, 255, 255, 1)',
                backdropFilter: 'blur(30px) saturate(160%)',
                WebkitBackdropFilter: 'blur(30px) saturate(160%)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <GlassPanel
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(30, 103, 214, 0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Folder size={18} color="#1E67D6" />
                </GlassPanel>

                <div>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#152015',
                      lineHeight: 1.3,
                      margin: '0 0 4px 0',
                    }}
                  >
                    {ds.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: '#1E67D6',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      margin: '0',
                      fontWeight: 700,
                    }}
                  >
                    {ds.source}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '8px' }}>
                <MetricChip label='SIZE' value={ds.sizeHuman} color='skyblue' style={{ fontSize: '0.78rem' }} />
                <MetricChip label='TRIALS' value={(ds.description.match(/\d+/g) || ['—'])[0]} color='yellow' style={{ fontSize: '0.78rem' }} />
              </div>

              <p
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  color: '#3d4d3c',
                  margin: '16px 0 0 0',
                }}
              >
                {ds.description}
              </p>

              {ds.download && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                  <a
                    href={ds.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#1E67D6',
                      fontSize: '0.78rem',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 700,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#0F172A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#1E67D6')}
                  >
                    <ExternalLink size={12} /> View Source
                  </a>
                </div>
              )}
            </GlassPanel>
          ))}
        </div>

        {/* Footer callout */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #E2E8F0',
            fontSize: '0.82rem',
            color: '#64748B',
            fontFamily: 'var(--font-mono, monospace)',
            textAlign: 'center',
          }}
        >
          All datasets adhere to strict zero-leakage evaluation protocols: scaler, filter states,
          and kernel fits are verified exclusively on training folds. No future epoch data
          is ever exposed during preprocessing or model evaluation.
        </div>
      </div>
    </section>
  );
}