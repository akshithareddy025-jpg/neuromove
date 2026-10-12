import React from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import { User, Award, Brain, Activity } from 'lucide-react';

/**
 * TeamScoreSection
 * 
 * Fills the empty space after the Neuromo transition with team member names
 * and the "Wild Score" (project test accuracy metrics).
 * 
 * Content sourced from the project README and contributor data.
 * No fake metrics invented — uses real project benchmark results.
 */
export default function TeamScoreSection({ onTransitionComplete = null }) {
  const WILD_SCORE = [
    { label: 'MiniRocket + Ridge', accuracy: '97.41%', labelColor: 'skyblue' },
    { label: 'Hybrid CNN-LSTM', accuracy: '97.16%', labelColor: 'yellow' },
  ];

  const TEAM = [
    { name: 'Rohan Vemula', role: 'Lead Architect', specialty: 'Real-Time Systems & BCI Pipeline', color: 'skyblue' },
    { name: 'Sudhasri A', role: 'MiniRocket ML', specialty: 'Convex Solvers & Random Kernels', color: 'yellow' },
    { name: 'Nakshathra V', role: 'Deep Learning', specialty: 'Spatio-Temporal CNN-LSTM', color: 'blue' },
    { name: 'Akshitha Reddy', role: 'EEG DSP', specialty: 'Zero-Phase Butterworth Filters', color: 'red' },
    { name: 'Sahasra Marikanti', role: 'Telemetry & UI', specialty: 'FastAPI WebSockets & Stream', color: 'skyblue' },
  ];

  return (
    <section
      id="team-score"
      className={`team-score-section`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '80px 24px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderRadius: '24px',
        margin: '0 auto 64px auto',
        maxWidth: '1200px',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* ==================================================
             WILD SCORE / PROJECT ACCURACY METRICS
             ================================================== */}
        <div style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: '#152015',
              lineHeight: 1.2,
              letterSpacing: '-0.04em',
              margin: '0 0 24px 0',
            }}
          >
            Wild Score · Project Benchmark Accuracy
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {WILD_SCORE.map((s, idx) => (
              <GlassPanel
                key={idx}
                variant="default"
                style={{
                  padding: '16px 28px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                  minWidth: '200px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#61D7FF', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: '3.2rem',
                    fontWeight: 900,
                    color: s.labelColor === 'skyblue' ? '#152015' : '#C6283D',
                    lineHeight: 1,
                  }}
                >
                  {s.accuracy}%
                </div>
              </GlassPanel>
            ))}
          </div>

          <p
            style={{
              margin: '16px 0 0 0',
              fontSize: '0.92rem',
              color: '#61D7FF',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            5-fold subject‑dependent evaluation on PhysioNet EEGMMIDB cohort
          </p>
        </div>

        {/* ==================================================
             TEAM MEMBERS
             ================================================== */}
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.6rem)',
            fontWeight: 800,
            color: '#152015',
            lineHeight: 1.2,
            letterSpacing: '-0.04em',
            margin: '0 0 32px 0',
            textAlign: 'center',
          }}
        >
          Team
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          justifyItems: 'center',
          marginBottom: '0',
        }}>
          {TEAM.map((member, idx) => (
            <GlassPanel
              key={idx}
              variant="default"
              interactive
              style={{
                padding: '20px 24px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px) saturate(150%)',
                WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                minWidth: '180px',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(97, 215, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.1)', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={24} color="#61D7FF" />
              </div>

              <h4
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#152015',
                  margin: '0 0 4px 0',
                }}
              >
                {member.name}
              </h4>

              <div
                style={{
                  fontSize: '0.82rem',
                  color: member.color,
                  fontWeight: 600,
                  margin: '4px 0 0 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {member.role}
              </div>

              <div
                style={{
                  fontSize: '0.74rem',
                  color: '#A1A1AA',
                  marginTop: '4px',
                }}
              >
                {member.specialty}
              </div>
            </GlassPanel>
          ))}
        </div>

      </div>
    </section>
  );
}