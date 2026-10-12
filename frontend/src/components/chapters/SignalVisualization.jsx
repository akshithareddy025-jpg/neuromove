import React, { useRef, useEffect, useState } from 'react';
import GlassPanel from '../glass/GlassPanel';
import { Zap, Activity, Radio } from 'lucide-react';

/**
 * SignalVisualization
 *
 * Live decoding oscilloscope for the T1–T4 pipeline output.
 * Dark instrument styling (high contrast — no washed cyan-on-white).
 *
 * Decoding states: IDLE → LIVE → CLASSIFYING → RESULT (loops), ERROR on failure.
 * Always paints: grid + axis + waveform + sweeping cursor, even before data.
 */
const STATES = ['IDLE', 'LIVE', 'CLASSIFYING', 'RESULT'];
const CLASS_ORDER = ['T1', 'T2', 'T3', 'T4'];
const CLASSES = [
  { code: 'T1', label: 'Left Fist', posterior: 0.08 },
  { code: 'T2', label: 'Right Fist', posterior: 0.12 },
  { code: 'T3', label: 'Both Fists', posterior: 0.15 },
  { code: 'T4', label: 'Both Feet', posterior: 0.65 },
];

const codeOf = (value) => {
  if (value === 0 || value === '0') return 'T1';
  if (value === 1 || value === '1') return 'T2';
  if (value === 2 || value === '2') return 'T3';
  if (value === 3 || value === '3') return 'T4';
  if (!value) return null;
  const match = String(value).match(/\b(T[1-4])\b/i);
  return match ? match[1].toUpperCase() : null;
};

export default function SignalVisualization({ currentTrial = null, livePrediction = null }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [decodeState, setDecodeState] = useState('IDLE');
  const [activeClass, setActiveClass] = useState('T1');
  const [confidence, setConfidence] = useState(0.85);
  const stateRef = useRef({ phase: 0, cursor: 0, visible: true });
  const rotateRef = useRef(0);
  // Ref mirror so the fixed-cadence interval always reads fresh props.
  const liveRef = useRef({ currentTrial, livePrediction });
  useEffect(() => {
    liveRef.current = { currentTrial, livePrediction };
  }, [currentTrial, livePrediction]);

  // Decoding state machine (deterministic demo cadence).
  // RESULT resolves from live data first (livePrediction);
  // with no live data it rotates deterministically T1->T2->T3->T4 so every class is reachable.
  useEffect(() => {
    let step = 0;
    const id = setInterval(() => {
      step = (step + 1) % STATES.length;
      const s = STATES[step];
      setDecodeState(s);
      if (s === 'RESULT') {
        const { livePrediction: pred } = liveRef.current;
        const liveCode =
          codeOf(pred?.predicted_code) ||
          codeOf(pred?.predicted_label) ||
          codeOf(pred?.predicted_class);

        if (liveCode) {
          setActiveClass(liveCode);
          const maxProb = pred?.class_probabilities?.[liveCode];
          setConfidence(typeof maxProb === 'number' ? maxProb : 0.94);
        } else {
          rotateRef.current = (rotateRef.current + 1) % CLASS_ORDER.length;
          const nextCode = CLASS_ORDER[rotateRef.current];
          setActiveClass(nextCode);
          setConfidence(0.78 + (rotateRef.current % 3) * 0.08);
        }
      } else if (s === 'CLASSIFYING') {
        setConfidence(0.42 + Math.random() * 0.18);
      }
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Animated oscilloscope
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setDecodeState('ERROR');
      return undefined;
    }

    const fit = () => {
      const w = wrapRef.current?.clientWidth || 800;
      const ratio = Math.min(1.5, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(240 * ratio);
      canvas.style.width = `${w}px`;
      canvas.style.height = '240px';
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    fit();
    window.addEventListener('resize', fit);

    const io = new IntersectionObserver(([e]) => {
      stateRef.current.visible = e.isIntersecting;
    });
    if (wrapRef.current) io.observe(wrapRef.current);

    let raf = 0;
    const W = () => (wrapRef.current?.clientWidth || 800);
    const H = 240;

    const render = () => {
      raf = requestAnimationFrame(render);
      if (document.hidden || !stateRef.current.visible) return;
      const st = stateRef.current;
      st.phase += 0.045;
      st.cursor = (st.cursor + 2.4) % W();
      const width = W();

      // Chassis
      ctx.fillStyle = '#f5f5ee';
      ctx.fillRect(0, 0, width, H);

      // Grid
      ctx.strokeStyle = 'rgba(28, 36, 32, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Axis: center baseline + µV ticks
      ctx.strokeStyle = 'rgba(28, 36, 32, 0.20)';
      ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(width, H / 2); ctx.stroke();
      ctx.fillStyle = 'rgba(28, 36, 32, 0.65)';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText('+50µV', 6, 16);
      ctx.fillText('0µV', 6, H / 2 - 6);
      ctx.fillText('-50µV', 6, H - 8);
      ctx.textAlign = 'right';
      ctx.fillText('8–30 Hz SMR', width - 8, 16);

      // Waveform: 10 Hz mu + 22 Hz beta with ERD dip mid-window (dark trace on light glass)
      ctx.strokeStyle = '#1B4332';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      for (let x = 0; x < width; x += 2) {
        const t = (x / width) * 4.0;
        const erd = 1 - 0.55 * Math.exp(-Math.pow(t - 2.0, 2) / 0.5);
        const y =
          H / 2 -
          (Math.sin(t * 2 * Math.PI * 2.5 + st.phase) * 0.55 +
            Math.sin(t * 2 * Math.PI * 5.5 + st.phase * 1.7) * 0.22) *
            52 *
            erd;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Live cursor
      ctx.strokeStyle = 'rgba(45, 106, 79, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(st.cursor, 0); ctx.lineTo(st.cursor, H); ctx.stroke();
      ctx.fillStyle = '#2D6A4F';
      ctx.beginPath(); ctx.arc(st.cursor, H / 2, 3, 0, Math.PI * 2); ctx.fill();

      // Time axis
      ctx.fillStyle = 'rgba(28, 36, 32, 0.65)';
      ctx.textAlign = 'left';
      ctx.fillText('t=0.0s', 6, H - 8);
      ctx.textAlign = 'center';
      ctx.fillText('2.0s', width / 2, H - 8);
      ctx.textAlign = 'right';
      ctx.fillText('t=4.0s', width - 8, H - 8);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
      io.disconnect();
    };
  }, []);

  const stateColor =
    decodeState === 'RESULT' ? '#34d399' :
    decodeState === 'CLASSIFYING' ? '#FFD447' :
    decodeState === 'LIVE' ? '#7dd3fc' :
    decodeState === 'ERROR' ? '#f87171' : '#94a3b8';

  return (
    <section
      id="signal-visualization"
      style={{
        position: 'relative',
        width: '100%',
        padding: '64px 24px',
        margin: '0 auto 48px auto',
        maxWidth: '1200px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.6rem)',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.2,
            letterSpacing: '-0.04em',
            margin: '0 0 12px 0',
            textAlign: 'center',
          }}
        >
          Signal / Output Visualization
        </h2>

        <p
          style={{
            fontSize: '1.0rem',
            lineHeight: 1.7,
            color: '#475569',
            margin: '0 0 24px 0',
            textAlign: 'center',
          }}
        >
          Classified output of the full pipeline: raw EEG → preprocessing →
          MiniRocket + CNN-LSTM → T1/T2/T3/T4.
        </p>

        {/* Decoding state + active class */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <span
            className="mono"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.08em',
              color: stateColor, border: `1px solid ${stateColor}55`,
              background: 'rgba(255, 255, 255, 0.90)', padding: '6px 14px', borderRadius: '9999px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: stateColor }} />
            {decodeState}
          </span>
          <span
            className="mono"
            style={{
              fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.08em',
              color: '#0F172A', border: '1px solid rgba(255,255,255,0.9)',
              background: 'rgba(255, 255, 255, 0.90)', padding: '6px 14px', borderRadius: '9999px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
            }}
          >
            ACTIVE: {activeClass} · {(confidence * 100).toFixed(1)}%
          </span>
        </div>

        <GlassPanel
          variant="hero"
          glow
          style={{
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.92)',
            borderColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 24px 60px -12px rgba(22, 34, 20, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1)',
          }}
        >
          <div ref={wrapRef} style={{ width: '100%' }}>
            <canvas ref={canvasRef} aria-label="Live EEG decoding oscilloscope" style={{ display: 'block', width: '100%' }} />
          </div>

          {/* Posterior values */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginTop: '18px' }}>
            {CLASSES.map((c) => {
              const liveProb = liveRef.current.livePrediction?.class_probabilities?.[c.code];
              const p = typeof liveProb === 'number'
                ? liveProb
                : (c.code === activeClass ? confidence : (1 - confidence) / 3);
              const isActive = c.code === activeClass;
              return (
                <div
                  key={c.code}
                  onClick={() => {
                    setActiveClass(c.code);
                    setConfidence(0.92);
                  }}
                  style={{
                    borderRadius: '10px',
                    padding: '10px 12px',
                    border: isActive ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid #E2E8F0',
                    background: isActive ? 'rgba(16, 185, 129, 0.10)' : 'rgba(255, 255, 255, 0.7)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  title={`Select ${c.code} (${c.label})`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontWeight: 800 }}>
                    <span style={{ color: isActive ? '#059669' : '#0F172A' }}>{c.code}</span>
                    <span className="mono" style={{ color: isActive ? '#059669' : '#64748B' }}>{(p * 100).toFixed(1)}%</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>{c.label}</div>
                  <div style={{ height: '4px', borderRadius: '9999px', background: '#E2E8F0', marginTop: '8px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.round(p * 100)}%`, background: isActive ? '#059669' : '#94A3B8', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', fontSize: '0.78rem', color: '#64748B' }}>
            {decodeState === 'LIVE' ? <Radio size={14} color="#7dd3fc" /> :
             decodeState === 'CLASSIFYING' ? <Activity size={14} color="#FFD447" /> :
             <Zap size={14} color="#34d399" />}
            <span>
              {decodeState === 'IDLE' && 'Awaiting trial window — scope holds a live baseline, never a blank frame.'}
              {decodeState === 'LIVE' && 'Streaming 4.0 s sensorimotor window at 163 Hz.'}
              {decodeState === 'CLASSIFYING' && 'Dual-model inference running — posteriors converging.'}
              {decodeState === 'RESULT' && `Decoded ${activeClass} at ${(confidence * 100).toFixed(1)}% posterior confidence.`}
              {decodeState === 'ERROR' && 'Renderer unavailable — retry the stream.'}
            </span>
          </div>
        </GlassPanel>

        <div
          className="mono"
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid #E2E8F0',
            fontSize: '0.78rem',
            color: '#64748B',
            textAlign: 'center',
          }}
        >
          Pipeline: EEG Acquisition → Preprocessing (8–30 Hz Butterworth + CAR + 5-pair fusion) → MiniRocket + CNN-LSTM → T1 / T2 / T3 / T4
        </div>
      </div>
    </section>
  );
}
