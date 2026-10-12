import React, { useState, useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '../../lib/scrollEngine';

/**
 * ScrollStoryEngine
 * Section 7: Scroll-video preprocessing story.
 * - LEFT: Scroll-controlled HTML5 canvas scrubbing through 300 extracted video frames.
 * - RIGHT: Explanatory cards popping up in sync with scroll progress explaining the 5-step EEG preprocessing pipeline.
 */
export default function ScrollStoryEngine({ className = '', style = {} }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const framesCacheRef = useRef([]);

  const PREPROCESSING_STEPS = [
    {
      step: '01 / RAW EEG INGESTION',
      title: '64-Channel Scalp EEG',
      subtitle: 'PhysioNet EEGMMIDB Cohort at 160 Hz',
      description: 'Raw microvolt action potentials traverse skull bone with 1:80 impedance attenuation. Signals are resampled to 128 Hz and Common Average Referenced (CAR).',
      metrics: [
        { label: 'CHANNELS', value: '64 Scalp' },
        { label: 'RATE', value: '160 → 128 Hz' },
        { label: 'SAMPLES', value: '4,050 Trials' },
      ],
    },
    {
      step: '02 / SMR BANDPASS PURIFICATION',
      title: 'Zero-Phase Butterworth Filter',
      subtitle: '4th-Order 8–30 Hz Bandpass (0.000 rad Lag)',
      description: 'Bidirectional zero-phase filtering isolates Rolandic Mu (8–12 Hz) and Beta (13–30 Hz) sensorimotor rhythms while eliminating 50 Hz powerline hum.',
      metrics: [
        { label: 'PASSBAND', value: '8.0–30.0 Hz' },
        { label: 'PHASE LAG', value: '0.000 rad' },
        { label: 'REJECTION', value: '> 42 dB @ 50Hz' },
      ],
    },
    {
      step: '03 / SPATIAL DIFFERENTIAL PAIRS',
      title: '5-Pair Motor Strip Fusion',
      subtitle: 'Symmetric Bilateral Bipolar Pairs',
      description: 'Feature extraction focuses on 5 key motor cortex pairs: FC3-FC4 (premotor planning), C5-C6 (distal hand), C3-C4 (primary hand), C1-C2 (proximal arm/foot), and CP3-CP4 (somatosensory).',
      metrics: [
        { label: 'BIPOLAR PAIRS', value: '5 Pairs' },
        { label: 'ROLANDIC STRIP', value: 'M1 & S1' },
        { label: 'FEATURE FUSION', value: 'Bilateral' },
      ],
    },
    {
      step: '04 / CONVOLUTIONAL FEATURE MAPS',
      title: 'MiniRocket 10,000 PPV Kernels',
      subtitle: 'Minimal Random Convolutional Transform',
      description: '10,000 fixed-weight 1D dilated convolutional kernels compute the Proportion of Positive Values (PPV) across spatial signals, generating linear separability.',
      metrics: [
        { label: 'KERNELS', value: '10,000 PPV' },
        { label: 'DILATION', value: 'Multi-scale' },
        { label: 'COMPUTATION', value: '< 2.5 ms' },
      ],
    },
    {
      step: '05 / INTENT DECODING PAYOFF',
      title: 'Sub-10ms Somatic Actuation',
      subtitle: 'Ridge Classifier & CNN-LSTM Dual Champions',
      description: 'Closed-form L2 Ridge classification decodes 4-class motor intent in 6.1 milliseconds to actuate 5-DOF orthotic hand prosthetics without backprop latency.',
      metrics: [
        { label: 'TEST ACCURACY', value: '97.41% CV' },
        { label: 'INFERENCE CLOCK', value: '6.1 ms' },
        { label: 'LEAKAGE', value: '0.00% Audited' },
      ],
    },
  ];

  // Preload 300 JPG frame images
  useEffect(() => {
    const totalFrames = 300;
    const cache = new Array(totalFrames);

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const numStr = String(i + 1).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${numStr}.jpg`;
      img.onload = () => {
        cache[i] = img;
        if (i === 0) drawFrame(0);
      };
    }
    framesCacheRef.current = cache;

    function drawFrame(idx) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let targetImg = cache[idx];
      if (!targetImg) {
        for (let offset = 1; offset < 10; offset++) {
          if (cache[idx - offset]) { targetImg = cache[idx - offset]; break; }
          if (cache[idx + offset]) { targetImg = cache[idx + offset]; break; }
        }
      }
      if (targetImg) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = targetImg.width / targetImg.height;
        let dw, dh, dx, dy;
        if (canvasRatio > imgRatio) {
          dw = canvas.width; dh = canvas.width / imgRatio; dx = 0; dy = (canvas.height - dh) / 2;
        } else {
          dh = canvas.height; dw = canvas.height * imgRatio; dx = (canvas.width - dw) / 2; dy = 0;
        }
        ctx.drawImage(targetImg, dx, dy, dw, dh);
      }
    }
  }, []);

  // GSAP ScrollTrigger timeline for video frame scrubbing & card sync
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    if (isReducedMotion()) return;

    const drawFrameByIdx = (idx) => {
      const cache = framesCacheRef.current;
      if (!cache) return;
      const clampedIdx = Math.max(0, Math.min(299, Math.floor(idx)));
      let targetImg = cache[clampedIdx];
      if (!targetImg) {
        for (let offset = 1; offset < 15; offset++) {
          if (cache[clampedIdx - offset]) { targetImg = cache[clampedIdx - offset]; break; }
          if (cache[clampedIdx + offset]) { targetImg = cache[clampedIdx + offset]; break; }
        }
      }
      if (targetImg) {
        const ctx = canvas.getContext('2d');
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = targetImg.width / targetImg.height;
        let dw, dh, dx, dy;
        if (canvasRatio > imgRatio) {
          dw = canvas.width; dh = canvas.width / imgRatio; dx = 0; dy = (canvas.height - dh) / 2;
        } else {
          dh = canvas.height; dw = canvas.height * imgRatio; dx = (canvas.width - dw) / 2; dy = 0;
        }
        ctx.drawImage(targetImg, dx, dy, dw, dh);
      }
    };

    let ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=350%',
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const frameIdx = Math.floor(p * 299);
            drawFrameByIdx(frameIdx);

            const step = Math.min(4, Math.floor(p * 5));
            setActiveStep(step);
          },
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const currentStep = PREPROCESSING_STEPS[activeStep];

  return (
    <section
      ref={containerRef}
      id="preprocessing-story"
      className={`preprocessing-story-pinned-stage ${className}`}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        overflow: 'hidden',
        background: '#FAFAFD',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1360px',
          height: '85vh',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '32px',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* LEFT SIDE: Scroll-controlled HTML5 Canvas Video Frame Player */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.2)',
            background: '#090D16',
          }}
        >
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(12px)',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#38BDF8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            SCROLL-CONTROLLED SIGNAL VIDEO · FRAME {String(Math.floor(activeStep * 60 + 1)).padStart(3, '0')}/300
          </div>
        </div>

        {/* RIGHT SIDE: Step-by-Step Explanatory Cards popping up in sync */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            key={activeStep}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08)',
              animation: 'fadeInUp 0.4s ease forwards',
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#1E67D6', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {currentStep.step}
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              {currentStep.title}
            </h3>

            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0284C7', marginBottom: '16px' }}>
              {currentStep.subtitle}
            </div>

            <p style={{ fontSize: '0.96rem', color: '#475569', lineHeight: 1.65, margin: '0 0 24px 0' }}>
              {currentStep.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
              {currentStep.metrics.map((m, idx) => (
                <div key={idx}>
                  <div style={{ fontSize: '0.66rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Step Indicators */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '20px', justifyContent: 'center' }}>
            {PREPROCESSING_STEPS.map((_, idx) => (
              <div
                key={idx}
                style={{
                  height: '6px',
                  width: idx === activeStep ? '32px' : '12px',
                  borderRadius: '999px',
                  background: idx === activeStep ? '#1E67D6' : '#CBD5E1',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
