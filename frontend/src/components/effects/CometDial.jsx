import React, { useState, useRef, useEffect } from 'react';
import { Activity, Zap, Compass, Radio } from 'lucide-react';

/**
 * CometDial
 * Interactive Tactile Dial with Integrated Neural Signal Oscilloscope & Spectral Morphing.
 * Strictly adhering to: Baby Blue, Maroon, Green, Yellow, and 100% BLACK TEXT.
 */
export default function CometDial({
  items = [
    {
      id: 'delta',
      label: 'Delta',
      range: '1–4 Hz',
      freq: 2.2,
      amp: 72,
      voltage: '72.4 μV',
      state: 'Slow-Wave Deep Synchrony',
      desc: 'High-amplitude cortical slow-wave oscillations; baseline restorative rhythm filtered out to isolate active motor cognition.',
      color: '#7A263A', // Maroon
    },
    {
      id: 'theta',
      label: 'Theta',
      range: '4–8 Hz',
      freq: 5.5,
      amp: 50,
      voltage: '48.2 μV',
      state: 'Subcortical Limbic Integration',
      desc: 'Hippocampal-cortical gating rhythm; associated with working memory and sensorimotor trajectory initiation.',
      color: '#E8C547', // Yellow
    },
    {
      id: 'mu',
      label: 'Mu / SMR',
      range: '8–12 Hz',
      freq: 10.2,
      amp: 32,
      voltage: '28.6 μV',
      state: 'Rolandic M1 Arch Rhythm (ERD)',
      desc: 'Primary resting sensorimotor rhythm over the Rolandic central sulcus. Desynchronizes immediately upon motor imagery intent.',
      color: '#6FAF64', // Green
    },
    {
      id: 'beta',
      label: 'Beta',
      range: '13–30 Hz',
      freq: 21.5,
      amp: 20,
      voltage: '17.8 μV',
      state: 'Primary Motor Planning & Execution',
      desc: 'Active motor cortex processing, event-related desynchronization (ERD) & rebound (ERS). Primary target decoded by NeuroMove.',
      color: '#A7D8F5', // Baby Blue
    },
    {
      id: 'gamma',
      label: 'Gamma',
      range: '30–50 Hz',
      freq: 38.0,
      amp: 11,
      voltage: '8.4 μV',
      state: 'High-Frequency Cortical Binding',
      desc: 'Ultra-fast cognitive binding oscillations; rigorously attenuated via Butterworth filtering to prevent EMG scalp artifact contamination.',
      color: '#7A263A', // Maroon
    },
  ],
  selectedIndex = 3, // Default to Beta (primary target)
  onSelect,
  isLightMode = true,
  size = 280,
  className = '',
  style = {},
}) {
  const [activeIdx, setActiveIdx] = useState(selectedIndex);
  const [angle, setAngle] = useState((selectedIndex / items.length) * 360);
  const dialRef = useRef(null);
  const canvasRef = useRef(null);
  const isDragging = useRef(false);

  // Smooth biological waveform morphing state (lerp target)
  const currentParams = useRef({
    freq: items[selectedIndex].freq,
    amp: items[selectedIndex].amp,
    color: items[selectedIndex].color,
    phase: 0,
  });

  const targetParams = useRef({
    freq: items[selectedIndex].freq,
    amp: items[selectedIndex].amp,
    color: items[selectedIndex].color,
  });

  useEffect(() => {
    setActiveIdx(selectedIndex);
    setAngle((selectedIndex / items.length) * 360);
    targetParams.current = {
      freq: items[selectedIndex].freq,
      amp: items[selectedIndex].amp,
      color: items[selectedIndex].color,
    };
  }, [selectedIndex, items]);

  const selectBand = (idx) => {
    const clampedIdx = Math.max(0, Math.min(items.length - 1, idx));
    setActiveIdx(clampedIdx);
    setAngle((clampedIdx / items.length) * 360);
    targetParams.current = {
      freq: items[clampedIdx].freq,
      amp: items[clampedIdx].amp,
      color: items[clampedIdx].color,
    };
    if (onSelect) onSelect(items[clampedIdx], clampedIdx);
  };

  const updateAngleFromPointer = (clientX, clientY) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rad = Math.atan2(clientY - cy, clientX - cx);
    let deg = (rad * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;

    setAngle(deg);
    const step = 360 / items.length;
    const index = Math.round(deg / step) % items.length;
    if (index !== activeIdx) {
      selectBand(index);
    }
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    updateAngleFromPointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updateAngleFromPointer(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [items, activeIdx]);

  // Real-time Neural Oscilloscope & Spectrum Animator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId = null;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Smooth lerp toward target frequency and amplitude
      const p = currentParams.current;
      const t = targetParams.current;
      p.freq += (t.freq - p.freq) * 0.08;
      p.amp += (t.amp - p.amp) * 0.08;
      p.phase += p.freq * 0.035;

      // Draw faint oscilloscope background grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw zero-potential centerline
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw the bioelectric EEG waveform
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = t.color;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 8;

      for (let x = 0; x < w; x++) {
        // Multi-harmonic synthesized EEG signal
        const normX = x / w;
        const baseSine = Math.sin(normX * p.freq * 1.8 + p.phase);
        const harmonic = 0.28 * Math.sin(normX * p.freq * 3.6 + p.phase * 1.5);
        const microJitter = 0.08 * Math.sin(normX * 80 + p.phase * 4);
        
        // Window tapering at edges for clean oscilloscope look
        const envelope = Math.sin(normX * Math.PI);
        const y = h / 2 + (baseSine + harmonic + microJitter) * (p.amp * 0.42) * envelope;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isLightMode]);

  const activeItem = items[activeIdx] || items[0];

  return (
    <div
      className={`comet-dial-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
        width: '100%',
        maxWidth: '820px',
        margin: '0 auto',
        ...style,
      }}
    >
      {/* Top Quick-Select Band Buttons for Tactile Accessibility */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '9999px',
          border: '1.5px solid #000000',
        }}
      >
        {items.map((it, idx) => {
          const isCurr = idx === activeIdx;
          return (
            <button
              key={it.id}
              onClick={() => selectBand(idx)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: isCurr ? it.color : 'transparent',
                border: isCurr ? '1.5px solid #000000' : '1px solid transparent',
                color: '#000000', // STRICT BLACK TEXT
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 900,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isCurr ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                }}
              />
              <span>{it.label}</span>
              <span style={{ opacity: 0.7, fontSize: '0.7rem' }}>({it.range})</span>
            </button>
          );
        })}
      </div>

      {/* Main Dual-Telemetry Instrument Deck */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Left Instrument: Rotary Dial Control */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            ref={dialRef}
            onPointerDown={handlePointerDown}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              position: 'relative',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #ebf5fc 65%, #A7D8F5 100%)',
              border: '1.5px solid #000000',
              boxShadow: '0 20px 48px rgba(167, 216, 245, 0.35), inset 0 0 24px rgba(122, 38, 58, 0.08)',
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            {/* Outer Circular Scale Ticks */}
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            >
              {items.map((it, idx) => {
                const itemAngle = (idx / items.length) * 360 - 90;
                const rad = (itemAngle * Math.PI) / 180;
                const r = size / 2 - 14;
                const x = size / 2 + r * Math.cos(rad);
                const y = size / 2 + r * Math.sin(rad);
                const isCurr = idx === activeIdx;

                return (
                  <g key={it.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isCurr ? 7 : 3.5}
                      fill={isCurr ? it.color : 'rgba(0, 0, 0, 0.25)'}
                      stroke={isCurr ? '#000000' : 'none'}
                      strokeWidth={1.5}
                      style={{
                        transition: 'all 0.25s ease',
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Orbiting Comet Indicator */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `rotate(${angle}deg)`,
                transition: isDragging.current ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none',
              }}
            >
              {/* Comet Tail (Sweeping Arc) */}
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '50%',
                  width: '4px',
                  height: '48px',
                  transform: 'translateX(-50%)',
                  background: `linear-gradient(to top, transparent, ${activeItem.color})`,
                  filter: `drop-shadow(0 0 8px ${activeItem.color})`,
                  borderRadius: '2px',
                }}
              />
              {/* Comet Head Glowing Orb */}
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#000000',
                  boxShadow: `0 0 10px ${activeItem.color}`,
                }}
              />
            </div>

            {/* Center Core Display */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${size * 0.62}px`,
                height: `${size * 0.62}px`,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.96)',
                border: '1.5px solid #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '12px',
                boxShadow: '0 6px 20px rgba(122, 38, 58, 0.1)',
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: '0.66rem', color: '#000000', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                FREQUENCY BAND
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#000000', margin: '2px 0' }}>
                {activeItem.label}
              </div>
              <div
                className="mono"
                style={{
                  fontSize: '0.78rem',
                  color: '#000000',
                  fontWeight: 900,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: activeItem.color,
                  border: '1px solid #000000',
                }}
              >
                {activeItem.range}
              </div>
            </div>
          </div>
          <span style={{ fontSize: '0.74rem', color: '#000000', marginTop: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            Turn dial or click band to morph frequency
          </span>
        </div>

        {/* Right Instrument: Live Neural Oscilloscope & Waveform Transformer */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '1.5px solid #000000',
            borderRadius: '18px',
            padding: '22px',
            boxShadow: '0 16px 36px rgba(122, 38, 58, 0.1)',
          }}
        >
          {/* Oscilloscope HUD Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                }}
              />
              <span className="mono" style={{ fontSize: '0.78rem', color: '#000000', fontWeight: 900 }}>
                LIVE SCALP OSCILLOSCOPE · {activeItem.label.toUpperCase()}
              </span>
            </div>
            <span
              className="mono"
              style={{
                fontSize: '0.74rem',
                color: '#000000',
                fontWeight: 900,
                background: activeItem.color,
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid #000000',
              }}
            >
              {activeItem.voltage}
            </span>
          </div>

          {/* Morphing Canvas Oscilloscope Screen */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '130px',
              background: '#f4faff',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1.5px solid #000000',
            }}
          >
            <canvas
              ref={canvasRef}
              width={380}
              height={130}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
            {/* Live Frequency Stamp */}
            <div
              className="mono"
              style={{
                position: 'absolute',
                bottom: '6px',
                left: '8px',
                fontSize: '0.68rem',
                color: '#000000',
                fontWeight: 800,
              }}
            >
              BASE FREQ: {activeItem.freq.toFixed(1)} Hz · ZERO-PHASE PURIFIED
            </div>
          </div>

          {/* Neurodynamic State Information (STRICT 100% BLACK TEXT) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.78rem', color: '#000000', fontWeight: 900 }}>
                {activeItem.state}
              </span>
              <span className="mono" style={{ fontSize: '0.72rem', color: '#000000', fontWeight: 700 }}>
                160 Hz ACQUISITION
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#000000', lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
              {activeItem.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
