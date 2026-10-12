import React from 'react';
import MetricChip from '../glass/MetricChip';
import ModelCompare from '../glass/ModelCompare';

/**
 * ModelArchitectureChapter
 * Section 8: The Two Models We Built: MiniRocket + Ridge vs Hybrid CNN-LSTM.
 * Pure light theme styling with high contrast.
 */
export default function ModelArchitectureChapter({
  className = '',
  style = {},
}) {
  return (
    <section id="model-architecture" className={`model-architecture-chapter ${className}`} style={{ width: '100%', marginBottom: '84px', padding: '0 24px', boxSizing: 'border-box', ...style }}>
      {/* Chapter Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <MetricChip label="SECTION 08 · DUAL CHAMPION ARCHITECTURES" color="skyblue" />
        <span style={{ fontSize: '0.76rem', color: '#1E67D6', fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
          CLOSED-FORM CONVEX SOLVER & SPATIO-TEMPORAL NEURAL NETWORK
        </span>
      </div>

      <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
        <h2 style={{ fontSize: 'clamp(2.0rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.12, letterSpacing: '-0.035em', margin: '0 0 14px 0' }}>
          The Two Models We Built
        </h2>
        <p style={{ fontSize: '1.02rem', color: '#475569', lineHeight: 1.68, margin: 0, fontWeight: 400 }}>
          NeuroMove 2.0 engineered two distinct champion decoders that both exceed 97% test accuracy: MiniRocket with closed-form L2 Ridge regression (97.41% accuracy, 6.1ms latency) and a 2D Spatio-Temporal Hybrid CNN-LSTM model (97.16% accuracy).
        </p>
      </div>

      {/* Model Comparison Showcase */}
      <ModelCompare />
    </section>
  );
}
