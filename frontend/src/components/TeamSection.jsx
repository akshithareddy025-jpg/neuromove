import React from 'react';
import { ExternalLink, Code2, Brain, Activity, Cpu, Sparkles, Layers } from 'lucide-react';
import SpotlightCard from './effects/SpotlightCard';

/**
 * GithubIcon
 * Self-contained SVG icon matching the Feather/Lucide design system.
 */
function GithubIcon({ size = 15, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/**
 * TeamSection
 * Highlights the core research and engineering contributors behind NeuroMove 2.0.
 * Displays GitHub handles, roles, and concrete codebase contributions.
 */
export default function TeamSection({ isLightMode = true }) {
  const contributors = [
    {
      name: 'Rohan Vemula',
      handle: 'rohanvemula279-star',
      role: 'Project Lead & System Architect',
      githubUrl: 'https://github.com/rohanvemula279-star',
      avatarUrl: 'https://github.com/rohanvemula279-star.png',
      badge: 'Core Maintainer',
      accentColor: '#db2777',
      icon: Cpu,
      contributions: [
        'Designed end-to-end NeuroMove 2.0 dual-champion architecture',
        'Engineered zero-leakage continuous trial CV framework (scripts/train_v2.py)',
        'Built 29-test automated pytest verification suite across PhysioNet cohort',
      ],
      tags: ['System Architecture', 'Cross-Validation', 'Full Stack', 'Verification'],
    },
    {
      name: 'Sudhasri A',
      handle: 'SudhasriA',
      role: 'ML Engineer — Spatial Fusion & MiniRocket',
      githubUrl: 'https://github.com/SudhasriA',
      avatarUrl: 'https://github.com/SudhasriA.png',
      badge: 'Champion Model #1',
      accentColor: '#0284c7',
      icon: Brain,
      contributions: [
        'Engineered 5-pair motor cortex MiniRocket spatial fusion (app/models/minirocket_pipeline.py)',
        'Integrated 10,000 PPV kernel transforms with sub-10ms (7.06ms) inference latency',
        'Tuned closed-form RidgeClassifierCV achieving 97.41% test accuracy',
      ],
      tags: ['MiniRocket', 'RidgeClassifierCV', 'Feature Extraction', 'Ablations'],
    },
    {
      name: 'Nakshathra V',
      handle: 'nakshathrav2007-hash',
      role: 'Deep Learning Architect — CNN-LSTM',
      githubUrl: 'https://github.com/nakshathrav2007-hash',
      avatarUrl: 'https://github.com/nakshathrav2007-hash.png',
      badge: 'Champion Model #2',
      accentColor: '#9333ea',
      icon: Sparkles,
      contributions: [
        'Designed spatio-temporal deep neural network (app/models/cnn_lstm.py)',
        'Synthesized multi-scale 1D temporal convolutions with Bidirectional LSTM',
        'Implemented dynamic ReduceLROnPlateau scheduling reaching 97.16% test accuracy',
      ],
      tags: ['PyTorch / Keras', 'BiLSTM', 'Spatio-Temporal', 'Deep Learning'],
    },
    {
      name: 'Akshitha Reddy',
      handle: 'akshithareddy025-jpg',
      role: 'Biomedical Signal Processing Specialist',
      githubUrl: 'https://github.com/akshithareddy025-jpg',
      avatarUrl: 'https://github.com/akshithareddy025-jpg.png',
      badge: 'Neurophysiology DSP',
      accentColor: '#059669',
      icon: Activity,
      contributions: [
        'Zero-phase 4th-order Butterworth bandpass filter for 8–30 Hz μ/β rhythm (app/data/preprocessing.py)',
        'Common Average Referencing (CAR) & anti-aliasing downsampling (160 Hz -> 128 Hz)',
        'Multi-format EEG ingestion (.edf, .npy, .csv) with zero trial leakage (app/data/loader.py)',
      ],
      tags: ['Butterworth Filters', 'CAR Referencing', 'EDF Ingestion', 'SciPy DSP'],
    },
    {
      name: 'Sahasra Marikanti',
      handle: 'sahasramarikanti-cpu',
      role: 'Full-Stack BCI Systems & Visualization Lead',
      githubUrl: 'https://github.com/sahasramarikanti-cpu',
      avatarUrl: 'https://github.com/sahasramarikanti-cpu.png',
      badge: 'Streaming & UI',
      accentColor: '#ea580c',
      icon: Layers,
      contributions: [
        'Engineered FastAPI 2.0 WebSocket telemetry streaming server (app/routers/stream.py)',
        'Built Sentinel scientific UI with live dual-waveform oscilloscope (frontend/src/)',
        'Developed interactive 4-class confusion matrix heatmaps & multi-class ROC-AUC charts',
      ],
      tags: ['FastAPI Telemetry', 'WebSockets', 'React 19', 'Signal Oscilloscope'],
    },
  ];

  return (
    <section className="team-section" style={{ margin: '48px 0' }}>
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          <span
            className="mono"
            style={{
              fontSize: '0.74rem',
              color: isLightMode ? '#ea580c' : '#FFFFFF',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: isLightMode ? 'rgba(234, 88, 12, 0.1)' : 'rgba(255, 255, 255, 0.1)',
              padding: '3px 10px',
              borderRadius: '6px',
              marginBottom: '6px',
            }}
          >
            <Code2 size={13} />
            RESEARCH TEAM & OPEN-SOURCE CONTRIBUTORS
          </span>
          <h2
            className={isLightMode ? 'shining-black-heading' : ''}
            style={{
              fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
              fontWeight: 900,
              color: isLightMode ? '#09090b' : '#FFFFFF',
              letterSpacing: '-0.03em',
              margin: '8px 0 12px 0',
              lineHeight: 1.2,
            }}
          >
            The Minds Behind NeuroMove 2.0
          </h2>
          <p style={{ color: isLightMode ? '#334155' : 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
            Meet the engineers and neuroimaging researchers who formulated the dual-champion motor imagery decoders,
            zero-phase DSP pipelines, and real-time telemetry architecture.
          </p>
        </div>

        <a
          href="https://github.com/rohanvemula279-star/NeuroMove/blob/main/CONTRIBUTORS.md"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '9999px',
            fontSize: '0.84rem',
            fontWeight: 700,
            background: isLightMode ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
            border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.35)' : '1px solid rgba(255, 255, 255, 0.15)',
            color: isLightMode ? '#09090b' : '#FFFFFF',
            textDecoration: 'none',
            boxShadow: isLightMode ? '0 4px 14px rgba(0, 0, 0, 0.06)' : 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            if (isLightMode) e.currentTarget.style.borderColor = '#db2777';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            if (isLightMode) e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.35)';
          }}
        >
          <GithubIcon size={15} color={isLightMode ? '#09090b' : '#FFFFFF'} />
          <span>View CONTRIBUTORS.md</span>
          <ExternalLink size={12} color={isLightMode ? '#64748b' : '#A1A1AA'} />
        </a>
      </div>

      {/* Contributors Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '22px',
        }}
      >
        {contributors.map((member) => {
          const Icon = member.icon;
          return (
            <SpotlightCard
              key={member.handle}
              spotlightColor={isLightMode ? 'rgba(244, 114, 182, 0.15)' : 'rgba(255, 255, 255, 0.08)'}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '26px',
                position: 'relative',
                background: isLightMode ? 'rgba(255, 255, 255, 0.96)' : 'linear-gradient(180deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.95) 100%)',
                border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.3)' : '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '18px',
                boxShadow: isLightMode ? '0 16px 36px -8px rgba(244, 114, 182, 0.14)' : undefined,
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div>
                {/* Header: Avatar, Names, Role Badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=fce7f3&color=db2777&bold=true`;
                        }}
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '14px',
                          objectFit: 'cover',
                          border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.4)' : '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          right: '-4px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: isLightMode ? '#ffffff' : '#09090B',
                          border: `1.5px solid ${member.accentColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        }}
                      >
                        <Icon size={11} color={member.accentColor} />
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: isLightMode ? '#09090b' : '#FFFFFF', margin: 0 }}>
                          {member.name}
                        </h3>
                      </div>
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono"
                        style={{
                          fontSize: '0.78rem',
                          color: isLightMode ? '#0284c7' : '#A1A1AA',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '2px',
                          fontWeight: 600,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = isLightMode ? '#0369a1' : '#FFFFFF')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = isLightMode ? '#0284c7' : '#A1A1AA')}
                      >
                        @{member.handle}
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>

                  <span
                    className="mono"
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '3px 9px',
                      borderRadius: '6px',
                      background: isLightMode ? '#fdf2f8' : 'rgba(255, 255, 255, 0.05)',
                      color: member.accentColor,
                      border: `1px solid ${member.accentColor}50`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {member.badge}
                  </span>
                </div>

                {/* Role Title */}
                <div
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: isLightMode ? '#1e293b' : '#E4E4E7',
                    marginBottom: '14px',
                  }}
                >
                  {member.role}
                </div>

                {/* Specific Contributions */}
                <div style={{ marginBottom: '18px' }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: '0.68rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: isLightMode ? '#64748b' : 'var(--text-tertiary)',
                      marginBottom: '8px',
                      fontWeight: 800,
                    }}
                  >
                    Key Subsystem Contributions:
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {member.contributions.map((c, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          fontSize: '0.82rem',
                          lineHeight: 1.5,
                          color: isLightMode ? '#334155' : 'var(--text-secondary)',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: member.accentColor,
                            marginTop: '6px',
                            flexShrink: 0,
                          }}
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom: Tags & Profile Link */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    paddingTop: '14px',
                    borderTop: isLightMode ? '1px solid rgba(244, 114, 182, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '14px',
                  }}
                >
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: isLightMode ? '#fdf2f8' : 'rgba(255, 255, 255, 0.04)',
                        border: isLightMode ? '1px solid rgba(244, 114, 182, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: isLightMode ? '#475569' : '#D4D4D8',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: isLightMode ? '#0284c7' : '#FFFFFF',
                    textDecoration: 'none',
                    transition: 'gap 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = '9px')}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
                >
                  <span>View GitHub Profile</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
