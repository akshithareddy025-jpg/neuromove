import React from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import SignalPanel from '../glass/SignalPanel';
import { Filter, Radio, ShieldCheck, Activity, Cpu, Zap } from 'lucide-react';

/**
 * SignalProcessingChapter
 * Chapter 03 & 04: Scalp EEG Acquisition & Zero-Phase Butterworth Signal Purification.
 */
export default function SignalProcessingChapter({
  className = '',
  style = {},
}) {
  return (
    <section id="signal-processing" className={`signal-processing-chapter ${className}`} style={{ width: '100%', marginBottom: '84px', ...style }}>
      {/* Chapter Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <MetricChip label="CHAPTER 03 & 04" color="skyblue" />
        <span style={{ fontSize: '0.76rem', color: '#A1A1AA', fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          ELECTROPHYSIOLOGY & DIGITAL SIGNAL PURIFICATION
        </span>
      </div>

      <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
        <h2 style={{ fontSize: 'clamp(2.0rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.12, letterSpacing: '-0.035em', margin: '0 0 14px 0' }}>
          From Contaminated Scalp Potentials to Pure SMR
        </h2>
        <p style={{ fontSize: '1.02rem', color: '#D4D4D8', lineHeight: 1.68, margin: 0, fontWeight: 400 }}>
          Raw scalp EEG is attenuated 1:80 by skull bone impedance and severely contaminated by 50 Hz powerline hum, ocular eyeblink artifacts, and muscle EMG. NeuroMove applies zero-phase bidirectional filtering and 5-pair bipolar fusion to isolate pure sensorimotor oscillations.
        </p>
      </div>

      {/* Grid: Live Oscilloscope + Purification Proof */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
        {/* Left: Interactive Bioelectric Oscilloscope */}
        <SignalPanel />

        {/* Right: Technical Purification Pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <GlassPanel variant="blue" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Filter size={18} color="#61D7FF" />
              <strong style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>
                4th-Order Zero-Phase Butterworth
              </strong>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#D4D4D8', lineHeight: 1.6, margin: '0 0 12px 0' }}>
              Bidirectional forward-backward filtering guarantees exact zero phase distortion (0.000 rad lag), preserving precise millisecond-level spike timing without the component sign ambiguity of FastICA (+4.57% accuracy boost).
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <MetricChip label="PHASE LAG" value="0.000 rad" color="yellow" />
              <MetricChip label="PASSBAND" value="8.0–30.0 Hz" color="skyblue" />
              <MetricChip label="LINE REJECTION" value="> 42 dB" color="white" />
            </div>
          </GlassPanel>

          <GlassPanel variant="maroon" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Radio size={18} color="#FFD447" />
              <strong style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>
                5-Pair Spatial Differential Bipolar Fusion
              </strong>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#D4D4D8', lineHeight: 1.6, margin: '0 0 12px 0' }}>
              Rather than naive 1D channel flattening, NeuroMove constructs 5 bipolar differential pairs directly across the motor cortex: C3-C4, C1-C2, FC3-FC4, CP3-CP4, and C5-C6. This subtracts common-mode reference noise and yields an immediate +7.08% classification leap.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <MetricChip label="DIPOLES" value="5 Bipolar Pairs" color="yellow" />
              <MetricChip label="CMRR" value="> 84 dB" color="skyblue" />
              <MetricChip label="ACCURACY GAIN" value="+7.08%" color="white" />
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
