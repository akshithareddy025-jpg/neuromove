import React from 'react';

/**
 * MetricChip
 * Precision technical chip / badge strictly matching the NeuroMove palette:
 * - skyblue: #61D7FF (active telemetry, waveforms)
 * - yellow: #FFD447 (key accuracy, benchmarks)
 * - red: #C6283D (critical, zero-leakage guarantee)
 * - blue: #1E67D6 (architecture, hardware, systems)
 * - maroon: #74152F (brand, biological origin)
 */
export default function MetricChip({
  label,
  value = null,
  color = 'skyblue', // 'skyblue' | 'yellow' | 'red' | 'blue' | 'maroon' | 'white'
  icon = null,
  className = '',
  style = {},
}) {
  const getColorStyles = () => {
    switch (color) {
      case 'yellow':
        return {
          bg: 'rgba(255, 212, 71, 0.12)',
          border: 'rgba(255, 212, 71, 0.35)',
          text: '#FFD447',
          dot: '#FFD447',
          glow: '0 0 10px rgba(255, 212, 71, 0.4)',
        };
      case 'red':
        return {
          bg: 'rgba(198, 40, 61, 0.14)',
          border: 'rgba(198, 40, 61, 0.4)',
          text: '#FFFFFF',
          dot: '#C6283D',
          glow: '0 0 10px rgba(198, 40, 61, 0.5)',
        };
      case 'blue':
        return {
          bg: 'rgba(30, 103, 214, 0.15)',
          border: 'rgba(30, 103, 214, 0.4)',
          text: '#93C5FD',
          dot: '#1E67D6',
          glow: '0 0 10px rgba(30, 103, 214, 0.4)',
        };
      case 'maroon':
        return {
          bg: 'rgba(116, 21, 47, 0.25)',
          border: 'rgba(198, 40, 61, 0.35)',
          text: '#E4E4E7',
          dot: '#74152F',
          glow: '0 0 10px rgba(116, 21, 47, 0.5)',
        };
      case 'white':
        return {
          bg: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.2)',
          text: '#FFFFFF',
          dot: '#FFFFFF',
          glow: '0 0 8px rgba(255, 255, 255, 0.4)',
        };
      case 'skyblue':
      default:
        return {
          bg: 'rgba(97, 215, 255, 0.12)',
          border: 'rgba(97, 215, 255, 0.32)',
          text: '#61D7FF',
          dot: '#61D7FF',
          glow: '0 0 10px rgba(97, 215, 255, 0.4)',
        };
    }
  };

  const cs = getColorStyles();

  return (
    <span
      className={`metric-chip ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 10px',
        borderRadius: '9999px',
        background: cs.bg,
        border: `1px solid ${cs.border}`,
        color: cs.text,
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        fontFamily: 'var(--font-mono, monospace)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: cs.glow,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {icon ? (
        icon
      ) : (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: cs.dot,
            boxShadow: cs.glow,
          }}
        />
      )}
      <span>{label}</span>
      {value && (
        <strong
          style={{
            color: '#FFFFFF',
            marginLeft: '2px',
            paddingLeft: '4px',
            borderLeft: `1px solid ${cs.border}`,
          }}
        >
          {value}
        </strong>
      )}
    </span>
  );
}
