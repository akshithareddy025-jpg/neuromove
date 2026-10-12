import React from 'react';
import MetricChip from '../glass/MetricChip';
import CausalMovementPipeline from '../glass/PipelineNode';

/**
 * CausalPayoffChapter
 * Chapter 06: The Climax Payoff — From Cortical Intention to Somatic Robotic Movement.
 */
export default function CausalPayoffChapter({
  className = '',
  style = {},
}) {
  return (
    <section id="causal-pipeline" className={`causal-payoff-chapter ${className}`} style={{ width: '100%', marginBottom: '84px', ...style }}>
      {/* Chapter Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <MetricChip label="CHAPTER 06" color="skyblue" />
        <span style={{ fontSize: '0.76rem', color: '#A1A1AA', fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          CLOSED-LOOP DECODING & SOMATIC ACTUATION PAYOFF
        </span>
      </div>

      <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
        <h2 style={{ fontSize: 'clamp(2.0rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.12, letterSpacing: '-0.035em', margin: '0 0 14px 0' }}>
          From Signal to Classifier to Movement
        </h2>
        <p style={{ fontSize: '1.02rem', color: '#D4D4D8', lineHeight: 1.68, margin: 0, fontWeight: 400 }}>
          This is the ultimate payoff of the NeuroMove architecture: an unbroken causal pipeline where human thought is captured, filtered, projected, classified, and actuated into real-world robotic orthosis movement with sub-10ms latency.
        </p>
      </div>

      {/* Interactive Causal Pipeline */}
      <CausalMovementPipeline />
    </section>
  );
}
