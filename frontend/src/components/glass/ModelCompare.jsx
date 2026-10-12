import React, { useState } from 'react';
import GlassPanel from './GlassPanel';
import MetricChip from './MetricChip';
import { Cpu, Zap, Layers, ShieldCheck, Check, ArrowRight } from 'lucide-react';

/**
 * ModelCompare
 * Premium technical comparison between MiniRocket + Ridge vs Spatio-Temporal CNN-LSTM.
 * Strictly using the 6-color palette (Deep Maroon, Maroon, Red, Blue, Sky Blue, Yellow).
 */
export default function ModelCompare({
  className = '',
  style = {},
}) {
  const [selectedArch, setSelectedArch] = useState('minirocket');

  const ARCHS = {
    minirocket: {
      name: 'MiniRocket + Ridge Classifier',
      tag: 'PRODUCTION DEFAULT · 6.1 MS',
      acc: '97.41%',
      latency: '6.1 ms',
      leakage: '0.00%',
      type: 'Linear / Random Convolutional Transform',
      kernels: '10,000 fixed-weight 1D kernels',
      trainTime: '18.4 seconds (Closed-Form Solution)',
      strengths: [
        'Deterministic closed-form L2 regularized dual-space solution',
        'Immune to gradient vanishing or local minima traps',
        'Sub-10ms real-time inference suitable for wearable microcontrollers',
        'Zero trial data leakage verified across 10-fold CV',
      ],
      color: 'skyblue',
      accentHex: '#61D7FF',
    },
    cnnlstm: {
      name: 'Hybrid Spatio-Temporal CNN-LSTM',
      tag: 'DEEP LEARNING BENCHMARK · 14.8 MS',
      acc: '97.16%',
      latency: '14.8 ms',
      leakage: '0.00%',
      type: 'Recurrent Deep Neural Network',
      kernels: 'Multi-layer spatial conv + 128-cell LSTM',
      trainTime: '14.2 minutes (AdamW Backprop)',
      strengths: [
        'End-to-end spatial filtering captures inter-electrode topological maps',
        'LSTM memory gates model long-range temporal dependencies in SMR bursts',
        'Competitive 97.16% test accuracy on PhysioNet 109 subjects cohort',
        'Requires GPU acceleration for real-time sub-20ms inference',
      ],
      color: 'yellow',
      accentHex: '#FFD447',
    },
  };

  const curr = ARCHS[selectedArch];

  return (
    <div className={`model-compare-section ${className}`} style={{ width: '100%', ...style }}>
      {/* Toggle Selector */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div
          style={{
            display: 'inline-flex',
            padding: '4px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.20)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <button
            onClick={() => setSelectedArch('minirocket')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              border: 'none',
              background: selectedArch === 'minirocket' ? 'rgba(97, 215, 255, 0.2)' : 'transparent',
              color: selectedArch === 'minirocket' ? '#FFFFFF' : '#A1A1AA',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <Zap size={14} color={selectedArch === 'minirocket' ? '#61D7FF' : '#71717A'} />
            <span>MiniRocket + Ridge</span>
            <span style={{ fontSize: '0.70rem', color: '#61D7FF', fontFamily: 'monospace' }}>97.41%</span>
          </button>

          <button
            onClick={() => setSelectedArch('cnnlstm')}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              border: 'none',
              background: selectedArch === 'cnnlstm' ? 'rgba(255, 212, 71, 0.2)' : 'transparent',
              color: selectedArch === 'cnnlstm' ? '#FFFFFF' : '#A1A1AA',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <Layers size={14} color={selectedArch === 'cnnlstm' ? '#FFD447' : '#71717A'} />
            <span>CNN-LSTM Network</span>
            <span style={{ fontSize: '0.70rem', color: '#FFD447', fontFamily: 'monospace' }}>97.16%</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Card 1: Selected Architecture Deep Dive */}
        <GlassPanel variant={selectedArch === 'minirocket' ? 'blue' : 'highlight'} glow style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <MetricChip label={curr.tag} color={curr.color} />
            <span style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: '#A1A1AA' }}>
              PHYSIOMET TEST SET
            </span>
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 8px 0', color: '#FFFFFF' }}>
            {curr.name}
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#A1A1AA', marginBottom: '20px' }}>
            {curr.type} · {curr.kernels}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.68rem', color: '#71717A', fontFamily: 'monospace' }}>TEST ACCURACY</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: curr.accentHex, fontFamily: 'monospace' }}>
                {curr.acc}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#71717A', fontFamily: 'monospace' }}>INFERENCE LATENCY</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'monospace' }}>
                {curr.latency}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#71717A', fontFamily: 'monospace' }}>DATA LEAKAGE</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#38BDF8', fontFamily: 'monospace' }}>
                {curr.leakage}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {curr.strengths.map((s, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.86rem', color: '#E4E4E7' }}>
                <Check size={16} color={curr.accentHex} style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Card 2: Head-to-Head Technical Comparison Matrix */}
        <GlassPanel variant="default" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Cpu size={18} color="#FFD447" />
            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
              Head-to-Head Benchmark Matrix
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.84rem' }}>
            <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#A1A1AA' }}>Zero-Leakage Test Accuracy:</span>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>MiniRocket (+0.25% Lead)</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.76rem', fontFamily: 'monospace' }}>
                <span style={{ color: '#61D7FF' }}>MiniRocket: 97.41%</span>
                <span style={{ color: '#71717A' }}>vs</span>
                <span style={{ color: '#FFD447' }}>CNN-LSTM: 97.16%</span>
              </div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#A1A1AA' }}>Inference Clock:</span>
                <span style={{ color: '#61D7FF', fontWeight: 700 }}>2.4× Faster Execution</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.76rem', fontFamily: 'monospace' }}>
                <span style={{ color: '#61D7FF' }}>MiniRocket: 6.1 ms</span>
                <span style={{ color: '#71717A' }}>vs</span>
                <span style={{ color: '#FFD447' }}>CNN-LSTM: 14.8 ms</span>
              </div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#A1A1AA' }}>Training Time (Subject S001):</span>
                <span style={{ color: '#FFD447', fontWeight: 700 }}>46× Faster Convergence</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.76rem', fontFamily: 'monospace' }}>
                <span style={{ color: '#61D7FF' }}>MiniRocket: 18.4s</span>
                <span style={{ color: '#71717A' }}>vs</span>
                <span style={{ color: '#FFD447' }}>CNN-LSTM: 14.2 min</span>
              </div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#A1A1AA' }}>Hardware Target:</span>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>ARM Cortex-M / Raspberry Pi 5</span>
              </div>
              <div style={{ fontSize: '0.76rem', color: '#71717A' }}>
                Closed-form matrix multiplication requires zero GPU VRAM.
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
