import React from 'react';
import { CLASS_MAPPING } from '../api/client';

export default function ProbabilityBars({ probabilities = {}, leadingClass = null }) {
  const classes = ['T1', 'T2', 'T3', 'T4'];

  return (
    <div className="card" id="probability-bars" style={{ height: '100%' }}>
      <div className="card-header" style={{ marginBottom: '16px' }}>
        <div>
          <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
            Posterior Class Probabilities
          </h3>
          <p className="card-subtitle">
            Live 4-class motor imagery intent distribution (Softmax / Soft Voting)
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {classes.map((clsKey) => {
          const classInfo = CLASS_MAPPING[clsKey];
          const rawVal = probabilities[clsKey] ?? 0.25;
          const pct = Math.round(rawVal * 1000) / 10;
          const isLeader = leadingClass === clsKey;

          return (
            <div key={clsKey} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    className="mono"
                    style={{
                      background: isLeader ? classInfo.color : 'rgba(28, 36, 32, 0.08)',
                      color: isLeader ? '#FFFFFF' : 'var(--text-secondary)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}
                  >
                    {classInfo.code}
                  </span>
                  <span style={{
                    fontWeight: isLeader ? 700 : 500,
                    color: isLeader ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.88rem'
                  }}>
                    {classInfo.label} ({classInfo.abbreviation})
                  </span>
                </div>

                <div className="mono" style={{
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  color: isLeader ? classInfo.color : 'var(--text-primary)'
                }}>
                  {pct.toFixed(1)}%
                </div>
              </div>

              {/* Progress Bar Track */}
              <div style={{
                height: '10px',
                background: 'rgba(28, 36, 32, 0.08)',
                borderRadius: '9999px',
                overflow: 'hidden',
                border: '1px solid rgba(28, 36, 32, 0.08)'
              }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, Math.max(0, pct))}%`,
                  background: isLeader
                    ? `linear-gradient(90deg, ${classInfo.color}CC, ${classInfo.color})`
                    : 'rgba(28, 36, 32, 0.12)',
                  borderRadius: '9999px',
                  transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: 'none'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: '20px',
        padding: '10px 14px',
        background: 'rgba(28, 36, 32, 0.04)',
        border: '1px solid rgba(28, 36, 32, 0.08)',
        borderRadius: '12px',
        fontSize: '0.78rem',
        color: 'var(--text-tertiary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>Theoretical Chance Level: <strong style={{ color: '#1C2420' }}>25.00%</strong></span>
        <span>Decision: <strong style={{ color: '#1C2420' }}>ArgMax Soft Voting</strong></span>
      </div>
    </div>
  );
}
