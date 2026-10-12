import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../../lib/scrollEngine';
import GlassPanel from '../glass/GlassPanel';

/**
 * ScrollVideoSection — brain-signal-to-hand-movement video story.
 *
 * Fixed for Screen Recording 1 blank-screen:
 * - Removed invalid `ScrollTrigger.kill()` (does not exist; killed ALL triggers
 *   globally and threw). Cleanup is now `ctx.revert()` only, scoped to this section.
 * - Effect deps are now `[]` (was `[TOTAL_FRAMES, activeCard]` which recreated
 *   the ScrollTrigger on every frame update → infinite loop / crash).
 * - Added missing GlassPanel import (was a runtime ReferenceError on mount).
 * - Fixed frame path to `/frames/ezgif-frame-XXX.jpg` (was `/ezgif-frame-...`
 *   which 404s; public/frames holds all 300).
 * - Added real canvas draw (previously preloaded but never drew → black box).
 * - Fixed invalid `end: bottom ${scrollHeight}px` → `+=280%` pinned scrub.
 */
export default function ScrollVideoSection({ onTransitionComplete = null }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const images = useRef([]);
  const [frameIndex, setFrameIndex] = useState(1);
  const [activeCard, setActiveCard] = useState(1);
  const TOTAL_FRAMES = 300;

  const STAGES = [
    {
      id: 1,
      title: 'Raw Brain-Signal Input',
      description:
        '64-channel EEG recordings at 160 Hz capture raw motor imagery signals. Signals include physiological noise: powerline hum (50 Hz), ocular blinks, muscle EMG, and skull attenuation (1:80).',
      accentColor: '#61D7FF',
    },
    {
      id: 2,
      title: 'Anti-Aliasing Resampling',
      description:
        'Signal resampled from 160 Hz to 128 Hz. Anti-aliasing filter prevents spectral leakage during downsampling. Ensures Nyquist compliance across all subsequent stages.',
      accentColor: '#1e90ff',
    },
    {
      id: 3,
      title: 'Common Average Referencing (CAR)',
      description:
        "Each channel's signal has the average of all other channels subtracted, removing common-mode noise and referencing each electrode to the scalp average. Improves SNR for motor imagery features.",
      accentColor: '#7b68ee',
    },
    {
      id: 4,
      title: 'Zero-Phase Butterworth Bandpass (8–30 Hz)',
      description:
        '4th-order zero-phase bidirectional Butterworth filter isolates the μ/β rhythm (8–30 Hz). Zero phase lag guaranteed (0.000 rad), preserving millisecond-level timing.',
      accentColor: '#1e90ff',
    },
    {
      id: 5,
      title: '5-Pair Spatial Differential Bipolar Fusion',
      description:
        'Five bipolar electrode pairs isolate motor cortex differentials: FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4. Common-mode reference noise subtracted; yields +7.08% classification leap over single-pair approaches.',
      accentColor: '#7b68ee',
    },
    {
      id: 6,
      title: 'Feature-Ready Signal Representation',
      description:
        'Final output: spatio-temporal tensor (N, 256 timesteps, 10 channels) for Model 1 (MiniRocket) or Model 2 (CNN-LSTM). Signal is clean, referenced, filtered, and fused — ready for classification.',
      accentColor: '#1e90ff',
    },
  ];

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;

    let cancelled = false;

    images.current = Array.from({ length: TOTAL_FRAMES }, (_, index) => {
      const image = new Image();
      image.src = `/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
      return image;
    });

    const draw = (frame1Indexed) => {
      const node = canvasRef.current;
      const img = images.current[frame1Indexed - 1];
      if (!node || !img || !img.complete || img.naturalWidth === 0) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = node.clientWidth || 800;
      const h = node.clientHeight || 400;
      const bw = Math.round(w * ratio);
      const bh = Math.round(h * ratio);
      if (node.width !== bw || node.height !== bh) {
        node.width = bw;
        node.height = bh;
      }
      const ctx = node.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#0f0f14';
      ctx.fillRect(0, 0, w, h);
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    const first = images.current[0];
    if (first) {
      first.onload = () => { if (!cancelled) draw(1); };
      first.onerror = () => { if (!cancelled) setFrameIndex(1); };
      if (first.complete && first.naturalWidth > 0) draw(1);
    }
    images.current.forEach((img, i) => {
      if (i === 0) return;
      img.onload = () => { if (!cancelled) draw(frameIndexRef.current); };
    });

    const frameIndexRef = { current: 1 };
    const applyProgress = (progress) => {
      const frame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
      frameIndexRef.current = frame;
      draw(frame);
      setFrameIndex(frame);
      const stage = Math.max(1, Math.min(6, Math.ceil((frame / TOTAL_FRAMES) * 6)));
      setActiveCard(stage);
    };

    if (isReducedMotion()) {
      draw(1);
      return () => { cancelled = true; };
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: '+=280%',
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
      });
    }, root);

    const onResize = () => draw(frameIndexRef.current);
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stepData = STAGES[activeCard - 1] || STAGES[0];

  return (
    <section
      ref={rootRef}
      id="preprocessing-video"
      className="scroll-video-section"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          gap: '0',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flex: '1 1 560px',
            position: 'relative',
            minHeight: '60vh',
            background: '#0f0f14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: 'block',
              width: '100%',
              maxWidth: '800px',
              aspectRatio: '2 / 1',
              borderRadius: '12px',
              boxShadow: '0 0 60px rgba(97, 215, 255, 0.18)',
              background: '#0f0f14',
            }}
            aria-label="Brain signal to hand movement frame sequence"
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.68rem',
              color: '#61D7FF',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Frame {frameIndex} of {TOTAL_FRAMES}
          </div>
        </div>

        <div
          style={{
            flex: '1 1 340px',
            padding: '24px 20px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderLeft: '1px solid rgba(97, 215, 255, 0.2)',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(97, 215, 255, 0.1)',
              fontSize: '0.72rem',
              color: '#61D7FF',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Step {activeCard} of 6
          </div>

          <GlassPanel
            variant="hero"
            style={{
              padding: '32px 24px',
              borderRadius: '20px',
              border: '1px solid rgba(97, 215, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(30px) saturate(170%)',
              WebkitBackdropFilter: 'blur(30px) saturate(170%)',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(97, 215, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '20px', height: '2px', background: '#61D7FF' }} />
              </div>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#152015',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {stepData.title}
              </span>
            </div>

            <h3
              style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#152015',
                lineHeight: 1.3,
                margin: '0 0 16px 0',
              }}
            >
              {stepData.title}
            </h3>

            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: '#3d4d3c',
                margin: 0,
              }}
            >
              {stepData.description}
            </p>
          </GlassPanel>

          <div
            style={{
              marginTop: 'auto',
              paddingTop: '16px',
              borderTop: '1px solid rgba(97, 215, 255, 0.1)',
              fontSize: '0.7rem',
              color: '#A1A1AA',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Scroll down → See next preprocessing step
          </div>
        </div>
      </div>
    </section>
  );
}
