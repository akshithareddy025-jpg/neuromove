import React from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import { ExternalLink, Code2, Cpu, Brain, Activity, Zap } from 'lucide-react';

function GithubIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/**
 * ResearchTeamChapter
 * Chapter 10: Minds Behind NeuroMove.
 * Core contributors and research architects presented with academic prestige.
 */
export default function ResearchTeamChapter({
  className = '',
  style = {},
}) {
  const TEAM = [
    {
      name: 'Rohan Vemula',
      role: 'Lead Architect',
      specialty: 'Real-Time Systems & BCI Pipeline',
      icon: <Brain size={18} color="#61D7FF" />,
      color: 'skyblue',
      github: 'https://github.com/rohanvemula279-star',
      contribution: 'Designed the zero-leakage evaluation protocol, 5-pair bipolar spatial fusion, and end-to-end telemetry architecture.',
    },
    {
      name: 'Sudhasri A',
      role: 'MiniRocket ML',
      specialty: 'Convex Solvers & Random Kernels',
      icon: <Cpu size={18} color="#FFD447" />,
      color: 'yellow',
      github: 'https://github.com/SudhasriA',
      contribution: 'Engineered the 10,000-kernel MiniRocket pipeline with closed-form L2 dual-space Ridge regression achieving 97.41% accuracy.',
    },
    {
      name: 'Nakshathra V',
      role: 'Deep Learning',
      specialty: 'Spatio-Temporal CNN-LSTM',
      icon: <Zap size={18} color="#1E67D6" />,
      color: 'blue',
      github: 'https://github.com/nakshathrav2007-hash',
      contribution: 'Developed the comparative benchmark deep network modeling temporal SMR burst dynamics and inter-electrode topology.',
    },
    {
      name: 'Akshitha Reddy',
      role: 'EEG DSP',
      specialty: 'Zero-Phase Butterworth Filters',
      icon: <Activity size={18} color="#C6283D" />,
      color: 'red',
      github: 'https://github.com/akshithareddy025-jpg',
      contribution: 'Formulated the 4th-order forward-backward bandpass (8–30 Hz) filter suppressing 50Hz hum with mathematically exact zero phase lag.',
    },
    {
      name: 'Sahasra Marikanti',
      role: 'Telemetry & UI',
      specialty: 'FastAPI WebSockets & Stream',
      icon: <Code2 size={18} color="#61D7FF" />,
      color: 'skyblue',
      github: 'https://github.com/sahasramarikanti-cpu',
      contribution: 'Constructed the asynchronous 160Hz BCI2000 WebSocket pipeline and interactive real-time telemetry dashboard.',
    },
  ];

  return (
    <section id="research-team" className={`research-team-chapter ${className}`} style={{ width: '100%', marginBottom: '84px', ...style }}>
      {/* Chapter Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <MetricChip label="CHAPTER 10" color="skyblue" />
        <span style={{ fontSize: '0.76rem', color: '#A1A1AA', fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          CORE INVESTIGATORS & RESEARCH CONTRIBUTORS
        </span>
      </div>

      <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
        <h2 style={{ fontSize: 'clamp(2.0rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.12, letterSpacing: '-0.035em', margin: '0 0 14px 0' }}>
          Minds Behind NeuroMove
        </h2>
        <p style={{ fontSize: '1.02rem', color: '#334155', lineHeight: 1.68, margin: 0, fontWeight: 500 }}>
          An interdisciplinary engineering team uniting digital signal processing, closed-form machine learning, and high-performance real-time telemetry.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {TEAM.map((member, idx) => (
          <GlassPanel
            key={idx}
            variant="default"
            interactive
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'rgba(255, 255, 255, 0.92)',
              borderColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 20px 50px -12px rgba(22, 34, 20, 0.16), inset 0 1px 0 rgba(255, 255, 255, 1)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(30, 103, 214, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {member.icon}
                </div>
                <MetricChip label={member.role} color={member.color} />
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                {member.name}
              </h4>
              <div style={{ fontSize: '0.78rem', color: '#1E67D6', fontFamily: 'monospace', marginBottom: '12px', fontWeight: 700 }}>
                {member.specialty}
              </div>
              <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                {member.contribution}
              </p>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#64748B',
                  fontSize: '0.76rem',
                  textDecoration: 'none',
                  fontFamily: 'monospace',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0F172A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
              >
                <GithubIcon size={13} />
                <span>GitHub Profile</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
