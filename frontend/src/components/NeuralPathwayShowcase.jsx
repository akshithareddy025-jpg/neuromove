import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Zap, Brain, Activity, ShieldCheck, Sparkles, Layers } from 'lucide-react';

/**
 * NeuralPathwayShowcase
 * Showcases the continuous bioelectric transmission from cortical pyramidal neurons
 * through the corticospinal tract and brachial plexus into real-time 5-DOF hand orthosis actuation.
 * 
 * Sourced directly from the 300-frame 1080p high-speed capture sequence (ezgif-2224f1e11cd5654e-jpg).
 */
export default function NeuralPathwayShowcase({
  isLightMode = true,
  className = '',
  style = {},
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(12); // ~12s video
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const PHASES = [
    {
      id: 'cortex',
      startTime: 0,
      endTime: 3.2,
      label: 'Phase 01: Cortical Motor Intent',
      region: 'Primary Motor Cortex (M1) & SMA',
      signal: 'Mu (8–12 Hz) & Beta (18–30 Hz) ERD',
      desc: 'Pyramidal neurons in Rolandic fissure desynchronize synchronously upon motor imagery.',
      color: '#38bdf8',
      tag: 'CEREBRAL DYNAMICS',
    },
    {
      id: 'synapse',
      startTime: 3.2,
      endTime: 6.5,
      label: 'Phase 02: Synaptic Action Potential',
      region: 'Intracortical Microcircuits',
      signal: 'Membrane Depolarization (-70mV → +30mV)',
      desc: 'Axonal firing cascades down corticospinal pyramidal tracts with zero temporal phase lag.',
      color: '#f472b6',
      tag: 'NEURAL CONDUCTION',
    },
    {
      id: 'spine',
      startTime: 6.5,
      endTime: 9.5,
      label: 'Phase 03: Brachial Plexus Conduction',
      region: 'Cervical Spine (C5–T1) & Peripheral Nerves',
      signal: 'Corticospinal Motor Efferent Volley',
      desc: 'Action potentials traverse peripheral motor pathways toward the distal upper extremity.',
      color: '#c084fc',
      tag: 'SPINAL TRANSMISSION',
    },
    {
      id: 'hand',
      startTime: 9.5,
      endTime: 12.0,
      label: 'Phase 04: Somatic Hand Actuation',
      region: 'Thenar & Hypothenar Orthosis Actuation',
      signal: '5-DOF Closed-Loop Intent Flexion',
      desc: 'NeuroMove Ridge decoder triggers 5-finger prosthetic flexion within 6.1ms latency.',
      color: '#34d399',
      tag: 'CLOSED-LOOP SOMATICS',
    },
  ];

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onTimeUpdate = () => {
      const t = vid.currentTime;
      setCurrentTime(t);
      if (vid.duration && !isNaN(vid.duration)) {
        setDuration(vid.duration);
      }

      // Determine active phase
      const pIdx = PHASES.findIndex((p) => t >= p.startTime && t < p.endTime);
      if (pIdx !== -1) {
        setCurrentPhase(pIdx);
      } else if (t >= 9.5) {
        setCurrentPhase(3);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    vid.addEventListener('timeupdate', onTimeUpdate);
    vid.addEventListener('play', onPlay);
    vid.addEventListener('pause', onPause);

    return () => {
      vid.removeEventListener('timeupdate', onTimeUpdate);
      vid.removeEventListener('play', onPlay);
      vid.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
    } else {
      vid.pause();
    }
  };

  const restartVideo = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = 0;
    vid.play();
  };

  const handleSeek = (e) => {
    const vid = videoRef.current;
    if (!vid) return;
    const seekTime = parseFloat(e.target.value);
    vid.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const setSpeed = (speed) => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.playbackRate = speed;
    setPlaybackRate(speed);
  };

  const jumpToPhase = (phaseIdx) => {
    const vid = videoRef.current;
    if (!vid) return;
    const targetTime = PHASES[phaseIdx].startTime;
    vid.currentTime = targetTime;
    setCurrentTime(targetTime);
    setCurrentPhase(phaseIdx);
    if (vid.paused) vid.play();
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const activePhaseData = PHASES[currentPhase] || PHASES[0];

  return (
    <section
      ref={containerRef}
      className={`neural-pathway-showcase ${className}`}
      style={{
        borderRadius: '24px',
        background: isLightMode
          ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 242, 248, 0.95) 50%, rgba(255, 255, 255, 0.98) 100%)'
          : 'linear-gradient(180deg, rgba(16, 16, 22, 0.95) 0%, rgba(8, 8, 12, 0.98) 100%)',
        border: isLightMode
          ? '1.5px solid rgba(244, 114, 182, 0.35)'
          : '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: isLightMode
          ? '0 24px 60px -15px rgba(244, 114, 182, 0.22), 0 12px 28px -8px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)'
          : '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(244, 114, 182, 0.15)',
        padding: '36px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
    >
      {/* Ambient background bloom */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Showcase Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                className="mono"
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: isLightMode ? '#09090b' : 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Brain size={13} color="#f472b6" />
                NEURAL TRANSMISSION PIPELINE
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'rgba(244, 114, 182, 0.15)',
                  color: '#db2777',
                  border: '1px solid rgba(244, 114, 182, 0.3)',
                  fontWeight: 700,
                }}
              >
                1080P BIOELECTRIC CAPTURE
              </span>
            </div>

            <h3
              className={isLightMode ? 'shining-black-heading' : ''}
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                fontWeight: 900,
                color: isLightMode ? '#09090b' : '#ffffff',
                margin: '0 0 6px 0',
                lineHeight: 1.2,
                letterSpacing: '-0.025em',
              }}
            >
              Brain-to-Hand Synaptic Transmission
            </h3>
            <p
              style={{
                fontSize: '0.94rem',
                color: isLightMode ? '#475569' : '#a1a1aa',
                margin: 0,
                maxWidth: '740px',
                lineHeight: 1.6,
              }}
            >
              Observe the continuous physiological cascade: motor cortex intention desynchronization, 
              synaptic action potentials, cervical spinal propagation, and real-time robotic hand finger actuation.
            </p>
          </div>

          {/* Telemetry pill badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                background: isLightMode ? 'rgba(240, 249, 255, 0.95)' : 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Zap size={13} color="#0284c7" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7', fontFamily: 'var(--font-mono, monospace)' }}>
                6.1 ms LATENCY
              </span>
            </div>
            <div
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                background: isLightMode ? 'rgba(253, 242, 248, 0.95)' : 'rgba(244, 114, 182, 0.1)',
                border: '1px solid rgba(244, 114, 182, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ShieldCheck size={13} color="#db2777" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#db2777', fontFamily: 'var(--font-mono, monospace)' }}>
                97.41% VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Phase Selector Ribbon */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          {PHASES.map((p, idx) => {
            const isActive = idx === currentPhase;
            return (
              <button
                key={p.id}
                onClick={() => jumpToPhase(idx)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: isActive
                    ? (isLightMode ? '#09090b' : 'rgba(255, 255, 255, 0.14)')
                    : (isLightMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.04)'),
                  border: isActive
                    ? (isLightMode ? '1.5px solid #09090b' : `1.5px solid ${p.color}`)
                    : (isLightMode ? '1px solid rgba(244, 114, 182, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)'),
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive && isLightMode ? '0 8px 20px rgba(0, 0, 0, 0.18)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: isActive ? '#f472b6' : (isLightMode ? '#64748b' : '#a1a1aa'),
                    }}
                  >
                    PHASE 0{idx + 1}
                  </span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: isActive ? p.color : 'transparent',
                      boxShadow: isActive ? `0 0 8px ${p.color}` : 'none',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: isActive ? '#ffffff' : (isLightMode ? '#09090b' : '#e4e4e7'),
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {p.label.split(': ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Video Cinema Container */}
        <div
          style={{
            position: 'relative',
            borderRadius: '18px',
            overflow: 'hidden',
            background: '#020204',
            border: isLightMode
              ? '2px solid rgba(244, 114, 182, 0.35)'
              : '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(244, 114, 182, 0.2)',
            aspectRatio: '16 / 9',
            maxHeight: '560px',
            width: '100%',
          }}
        >
          {/* Native HTML5 Video Element */}
          <video
            ref={videoRef}
            src="/neural_pathway_transmission.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Floating Scientific HUD Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          >
            {/* Top-Left: Active Phase Information Pill */}
            <div
              style={{
                background: 'rgba(9, 9, 11, 0.82)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${activePhaseData.color}60`,
                borderRadius: '12px',
                padding: '10px 16px',
                maxWidth: '420px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: activePhaseData.color,
                    boxShadow: `0 0 10px ${activePhaseData.color}`,
                    animation: 'horizon-pulse-dot 1.8s infinite',
                  }}
                />
                <span
                  className="mono"
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                  }}
                >
                  {activePhaseData.label}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fce7f3', fontWeight: 600 }}>
                {activePhaseData.region}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: '2px', lineHeight: 1.4 }}>
                {activePhaseData.desc}
              </div>
            </div>

            {/* Top-Right: Telemetry Status */}
            <div
              style={{
                background: 'rgba(9, 9, 11, 0.82)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '8px 14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '2px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
              }}
            >
              <span className="mono" style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 800 }}>
                ● 25.0 FPS SYNCHRONIZED
              </span>
              <span className="mono" style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                300 FRAMES (1080P HD)
              </span>
              <span className="mono" style={{ fontSize: '0.68rem', color: '#f472b6' }}>
                TIME: {currentTime.toFixed(2)}s / {duration.toFixed(2)}s
              </span>
            </div>
          </div>

          {/* Bottom Floating Control Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%)',
              padding: '24px 20px 14px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              zIndex: 4,
            }}
          >
            {/* Timeline Scrubber */}
            <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
              <input
                type="range"
                min="0"
                max={duration || 12}
                step="0.05"
                value={currentTime}
                onChange={handleSeek}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '9999px',
                  accentColor: '#f472b6',
                  cursor: 'pointer',
                  background: 'rgba(255, 255, 255, 0.25)',
                }}
              />
            </div>

            {/* Playback Controls Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: 'none',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(255, 255, 255, 0.4)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {isPlaying ? <Pause size={15} fill="#000000" /> : <Play size={15} fill="#000000" style={{ marginLeft: '2px' }} />}
                </button>

                {/* Restart */}
                <button
                  onClick={restartVideo}
                  title="Restart Sequence"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <RotateCcw size={14} />
                </button>

                {/* Mute Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>

                {/* Current Time Display */}
                <span className="mono" style={{ fontSize: '0.74rem', color: '#e4e4e7', marginLeft: '6px' }}>
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </span>
              </div>

              {/* Speed & Fullscreen */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '4px', background: 'rgba(0, 0, 0, 0.6)', padding: '2px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  {[0.5, 1, 1.5].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setSpeed(spd)}
                      className="mono"
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: playbackRate === spd ? '#f472b6' : 'transparent',
                        color: playbackRate === spd ? '#000000' : '#ffffff',
                        border: 'none',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={toggleFullscreen}
                  title="Toggle Fullscreen"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Maximize2 size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Footnote: Deep Physiology Breakdown */}
        <div
          style={{
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '14px',
          }}
        >
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              background: isLightMode ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.04)',
              border: isLightMode ? '1px solid rgba(244, 114, 182, 0.22)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: isLightMode ? '0 4px 16px rgba(244, 114, 182, 0.06)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Activity size={14} color="#0284c7" />
              <strong style={{ fontSize: '0.84rem', color: isLightMode ? '#09090b' : '#ffffff' }}>
                Motor Cortical Dipole Isolation
              </strong>
            </div>
            <p style={{ fontSize: '0.78rem', color: isLightMode ? '#475569' : '#a1a1aa', margin: 0, lineHeight: 1.5 }}>
              Differential C3-C4 and FC3-FC4 pairs reject far-field reference noise, capturing local Rolandic ERD before signal decay.
            </p>
          </div>

          <div
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              background: isLightMode ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.04)',
              border: isLightMode ? '1px solid rgba(244, 114, 182, 0.22)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: isLightMode ? '0 4px 16px rgba(244, 114, 182, 0.06)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Layers size={14} color="#db2777" />
              <strong style={{ fontSize: '0.84rem', color: isLightMode ? '#09090b' : '#ffffff' }}>
                Zero-Phase Butterworth Filtering
              </strong>
            </div>
            <p style={{ fontSize: '0.78rem', color: isLightMode ? '#475569' : '#a1a1aa', margin: 0, lineHeight: 1.5 }}>
              4th-order bidirectional filtering preserves instantaneous phase alignment without the component flips of FastICA.
            </p>
          </div>

          <div
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              background: isLightMode ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.04)',
              border: isLightMode ? '1px solid rgba(244, 114, 182, 0.22)' : '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: isLightMode ? '0 4px 16px rgba(244, 114, 182, 0.06)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Sparkles size={14} color="#059669" />
              <strong style={{ fontSize: '0.84rem', color: isLightMode ? '#09090b' : '#ffffff' }}>
                Closed-Loop Reafference
              </strong>
            </div>
            <p style={{ fontSize: '0.78rem', color: isLightMode ? '#475569' : '#a1a1aa', margin: 0, lineHeight: 1.5 }}>
              Physical actuation of the hand provides sensory feedback to S1, actively reinforcing neuroplastic synaptic rewiring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
