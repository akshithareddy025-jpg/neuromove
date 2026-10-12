import React, { useState, useEffect, useRef } from 'react';
import GlassPanel from './GlassPanel';
import MetricChip from './MetricChip';
import { Activity, Radio, Cpu, Zap, ShieldCheck } from 'lucide-react';

/**
 * SignalPanel
 * High-precision bioelectric waveform oscilloscope & spectral analyzer.
 * Renders live SMR Mu/Beta rhythms with selectable bipolar electrode pairs.
 */
export default function SignalPanel({
  className = '',
  style = {},
  compact = false,
}) {
  const [selectedPair, setSelectedPair] = useState('c3c4');
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const PAIRS = [
    { id: 'c3c4', label: 'C3–C4', desc: 'Primary Rolandic Motor Bipolar', freq: '10.4 Hz Mu', color: '#61D7FF' },
    { id: 'c1c2', label: 'C1–C2', desc: 'Medial Cortical Strip', freq: '22.1 Hz Beta', color: '#1E67D6' },
    { id: 'fc3fc4', label: 'FC3–FC4', desc: 'Pre-Motor Supplementary', freq: '12.8 Hz SMR', color: '#FFD447' },
    { id: 'cp3cp4', label: 'CP3–CP4', desc: 'Post-Central Somatosensory', freq: '18.4 Hz Beta', color: '#C6283D' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridX = width / 12;
      const gridY = height / 6;
      for (let x = 0; x < width; x += gridX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Zero-voltage baseline
      ctx.strokeStyle = 'rgba(97, 215, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw primary waveform
      const activeColor = PAIRS.find((p) => p.id === selectedPair)?.color || '#61D7FF';
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = activeColor;
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const centerY = height / 2;
      const amp = height * 0.28;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * 12 + phase;
        // Superposition of Mu (10Hz) and Beta (20Hz) rhythms with small burst noise
        let y = Math.sin(t * 1.8) * 0.65 + Math.sin(t * 3.4) * 0.25 + Math.cos(t * 0.7) * 0.15;
        // ERD modulation dip in middle
        const midFactor = Math.sin((x / width) * Math.PI);
        y *= 0.6 + 0.4 * midFactor;

        const plotY = centerY + y * amp;
        if (x === 0) ctx.moveTo(x, plotY);
        else ctx.lineTo(x, plotY);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw second harmonic trace (ghosted envelope)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 4) {
        const t = (x / width) * 12 + phase * 0.8;
        const y = Math.cos(t * 2.1) * 0.45 + Math.sin(t * 4.2) * 0.18;
        const plotY = centerY + y * amp * 0.7;
        if (x === 0) ctx.moveTo(x, plotY);
        else ctx.lineTo(x, plotY);
      }
      ctx.stroke();

      phase += 0.024;
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [selectedPair]);

  return (
    <GlassPanel
      variant="default"
      className={`signal-panel ${className}`}
      style={{ padding: compact ? '20px' : '28px', ...style }}
    >
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Activity size={18} color="#61D7FF" />
          <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Sensorimotor Oscilloscope
          </h4>
          <MetricChip label="LIVE" color="skyblue" />
        </div>

        {/* Channel Selector Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {PAIRS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPair(p.id)}
              style={{
                background: selectedPair === p.id ? 'rgba(97, 215, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${selectedPair === p.id ? '#61D7FF' : 'rgba(255, 255, 255, 0.12)'}`,
                color: selectedPair === p.id ? '#FFFFFF' : '#A1A1AA',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Waveform Canvas */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: compact ? '110px' : '150px',
          background: 'rgba(5, 5, 8, 0.95)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          marginBottom: '16px',
        }}
      >
        <canvas
          ref={canvasRef}
          width={640}
          height={compact ? 110 : 150}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
        {/* Signal Spec Overlays */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '12px',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono, monospace)',
            color: '#61D7FF',
          }}
        >
          {PAIRS.find((p) => p.id === selectedPair)?.desc}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono, monospace)',
            color: '#FFD447',
          }}
        >
          {PAIRS.find((p) => p.id === selectedPair)?.freq} · 160 HZ
        </div>
      </div>

      {/* Technical Diagnostics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono, monospace)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ color: '#71717A', fontSize: '0.68rem' }}>FILTER ORDER:</span>
          <span style={{ color: '#FFFFFF', fontWeight: 600 }}>4th Butterworth</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ color: '#71717A', fontSize: '0.68rem' }}>PASSBAND:</span>
          <span style={{ color: '#61D7FF', fontWeight: 600 }}>8.0–30.0 Hz</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ color: '#71717A', fontSize: '0.68rem' }}>PHASE LAG:</span>
          <span style={{ color: '#FFD447', fontWeight: 600 }}>0.000 rad</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ color: '#71717A', fontSize: '0.68rem' }}>LINE REJECTION:</span>
          <span style={{ color: '#E4E4E7', fontWeight: 600 }}>&gt;42 dB @ 50Hz</span>
        </div>
      </div>
    </GlassPanel>
  );
}
