import React from 'react';
import { Database, FileText, CheckCircle, ExternalLink } from 'lucide-react';

/**
 * DatasetsSection
 * Section 13: Datasets used in NeuroMove 2.0.
 * Pure light theme design detailing PhysioNet EEGMMIDB 109-subject benchmark cohort.
 */
export default function DatasetsSection({ className = '', style = {} }) {
  const DATASETS = [
    {
      name: 'PhysioNet EEGMMIDB Cohort',
      source: 'PhysioNet / BCI2000 International Benchmark',
      size: '109 Subjects · 64 Channels · 4,050 Preprocessed Samples · 810 Test Trials',
      description: 'The standardized benchmark for 4-class motor imagery research. Signals were recorded using the BCI2000 system across 64 scalp electrodes at 160 Hz, preprocessed with 0.000 rad lag Butterworth 8–30 Hz bandpass filtering.',
      badge: 'Primary Benchmark Cohort',
      status: 'VERIFIED ZERO-LEAKAGE',
      color: '#1E67D6',
    },
    {
      name: 'PhysioNet S001 – S005 Stratified Test Subset',
      source: '5-Person Stratified Continuous Evaluation Split',
      size: '810 Held-Out Test Trials (Balanced across T1, T2, T3, T4)',
      description: 'Used for rigorous zero-leakage test validation. Evaluates cross-validation performance with continuous trial grouping to prevent sub-window leakage.',
      badge: 'Test Evaluation Split',
      status: '97.41% ACCURACY',
      color: '#00A896',
    },
  ];

  return (
    <section
      id="datasets-section"
      className={`datasets-section ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '70px 24px',
        background: '#FAFAFD',
        color: '#0F172A',
        zIndex: 10,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(30, 103, 214, 0.08)',
              border: '1px solid rgba(30, 103, 214, 0.20)',
              color: '#1E67D6',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <Database size={14} />
            <span>Section 13 · Benchmark Datasets & Corpus Specifications</span>
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
            Datasets We Used
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#475569', maxWidth: '640px', margin: '0 auto' }}>
            Full transparency on dataset provenance, channel montages, sample sizes, and zero-leakage evaluation protocols.
          </p>
        </div>

        {/* Datasets Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {DATASETS.map((ds, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 12px 30px -6px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.70rem', fontWeight: 800, color: ds.color, letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                    {ds.badge}
                  </span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '3px 10px', borderRadius: '999px' }}>
                    {ds.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                  {ds.name}
                </h3>

                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#0284C7', marginBottom: '14px' }}>
                  {ds.source}
                </div>

                <p style={{ fontSize: '0.90rem', color: '#475569', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                  {ds.description}
                </p>
              </div>

              <div style={{ background: '#F8FAFC', padding: '14px 18px', borderRadius: '14px', border: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                  CORPUS SIZE & MONTAGES
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0F172A' }}>
                  {ds.size}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
