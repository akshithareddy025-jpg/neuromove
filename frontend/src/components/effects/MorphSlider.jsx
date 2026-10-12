import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Activity, Filter, Sparkles } from 'lucide-react';

/**
 * MorphSlider
 * Interactive split-slider and waveform morphing canvas.
 * Allows comparing Raw Noisy Scalp EEG vs. Clean Butterworth 8–30 Hz Preprocessed SMR.
 */
export default function MorphSlider({
  title = 'Raw Scalp EEG vs. 4th-Order Butterworth 8–30 Hz SMR',
  height = 240,
  className = '',
  style = {},
}) {
  const [sliderPercent, setSliderPercent] = useState(50);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isDragging = useRef(false);

  // Generate synthetic representative signals
  const points = 256;
  const timeStep = 4.0 / points;

  // Signal computations
  const rawWave = [];
  const cleanWave = [];
  for (let i = 0; i < points; i++) {
    const t = i * timeStep;
    // Raw EEG: 1.2Hz DC slow drift + 10Hz Mu rhythm + 22Hz Beta burst + 50Hz line noise + eyeblink artifact
    const drift = Math.sin(2 * Math.PI * 0.8 * t) * 1.8;
    const mu = Math.sin(2 * Math.PI * 10.5 * t) * 0.9;
    const beta = Math.sin(2 * Math.PI * 21.0 * t) * 0.45;
    const lineNoise = Math.sin(2 * Math.PI * 50.0 * t) * 0.35;
    const blink = t > 1.8 && t < 2.4 ? Math.sin((t - 1.8) * Math.PI * (1 / 0.6)) * 2.5 : 0;
    rawWave.push(drift + mu + beta + lineNoise + blink);

    // Clean SMR: Isolated 8-30Hz zero-phase bandpassed motor rhythm (Mu + Beta only)
    cleanWave.push(mu + beta);
  }

  // Draw continuous canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = height;
    const midY = h / 2;
    const splitX = (sliderPercent / 100) * w;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 20; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let x = 40; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Left Side: Raw EEG (Gray / Noisy Amber Tint)
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, splitX, h);
    ctx.clip();

    ctx.strokeStyle = '#71717A';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * w;
      const y = midY - rawWave[i] * 28;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Raw side background tint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(0, 0, splitX, h);
    ctx.restore();

    // Right Side: Clean Butterworth Preprocessed SMR (Pure White / Specular Glow)
    ctx.save();
    ctx.beginPath();
    ctx.rect(splitX, 0, w - splitX, h);
    ctx.clip();

    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    for (let i = 0; i < points; i++) {
      const x = (i / (points - 1)) * w;
      const y = midY - cleanWave[i] * 32;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Clean side background tint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(splitX, 0, w - splitX, h);
    ctx.restore();

    // Split dividing beam
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(splitX, 0);
    ctx.lineTo(splitX, h);
    ctx.stroke();
    ctx.restore();
  }, [sliderPercent, height, points]);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPercent(pct);
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const onMove = (e) => handlePointerMove(e);
    const onUp = () => handlePointerUp();
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div
      className={`morph-slider-card ${className}`}
      style={{
        background: 'var(--bg-surface-1, #0a0a0c)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
        ...style,
      }}
    >
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            INTERACTIVE MORPH COMPARISON
          </div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', margin: '4px 0 0 0' }}>
            {title}
          </h4>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '0.74rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: '#71717A', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            LEFT: RAW SCALP (0.1–100 HZ)
          </span>
          <span style={{ fontSize: '0.74rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.25)' }}>
            RIGHT: BUTTERWORTH (8–30 HZ)
          </span>
        </div>
      </div>

      {/* Interactive Morph Canvas View */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        style={{
          position: 'relative',
          height: `${height}px`,
          width: '100%',
          borderRadius: '10px',
          overflow: 'hidden',
          cursor: 'ew-resize',
          userSelect: 'none',
          touchAction: 'none',
          background: '#040508',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* Floating Split Thumb Knob */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${sliderPercent}%`,
            transform: 'translate(-50%, -50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#FFFFFF',
            boxShadow: '0 0 16px rgba(255, 255, 255, 0.7), 0 2px 8px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <Sliders size={14} color="#000000" />
        </div>
      </div>

      {/* Explanatory Footer Pill */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', fontSize: '0.78rem', color: '#71717A' }}>
        <span>Drag slider to inspect signal purification and powerline noise cancellation.</span>
        <span className="mono" style={{ color: '#FFFFFF' }}>+4.57% ACCURACY OVER RAW FASTICA</span>
      </div>
    </div>
  );
}
