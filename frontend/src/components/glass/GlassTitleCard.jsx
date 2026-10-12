import React from 'react';
import MetricChip from './MetricChip';

/**
 * GlassTitleCard
 * Full-screen cinematic glass overlay title card for the NeuroMove scroll story.
 * Can be positioned left, right, or center with strict typographic hierarchy.
 */
export default function GlassTitleCard({
  chapter,
  title,
  subtitle = null,
  description,
  metrics = [],
  telemetry = null,
  side = 'left', // 'left' | 'right' | 'center'
  accent = 'skyblue', // 'skyblue' | 'yellow' | 'red' | 'blue' | 'maroon'
  className = '',
  style = {},
}) {
  const getSideStyles = () => {
    switch (side) {
      case 'right':
        return {
          marginLeft: 'auto',
          marginRight: '0',
          textAlign: 'left',
        };
      case 'center':
        return {
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          alignItems: 'center',
        };
      case 'left':
      default:
        return {
          marginLeft: '0',
          marginRight: 'auto',
          textAlign: 'left',
        };
    }
  };

  const getAccentGlow = () => {
    switch (accent) {
      case 'yellow':
        return 'rgba(255, 212, 71, 0.25)';
      case 'red':
        return 'rgba(198, 40, 61, 0.35)';
      case 'blue':
        return 'rgba(30, 103, 214, 0.35)';
      case 'maroon':
        return 'rgba(116, 21, 47, 0.45)';
      case 'skyblue':
      default:
        return 'rgba(97, 215, 255, 0.3)';
    }
  };

  return (
    <div
      className={`glass-title-card ${className}`}
      style={{
        maxWidth: side === 'center' ? '780px' : '520px',
        width: '100%',
        padding: '32px 36px',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.10)',
        backdropFilter: 'blur(24px) saturate(140%)',
        WebkitBackdropFilter: 'blur(24px) saturate(140%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 20px 48px -12px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.30)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 10,
        ...getSideStyles(),
        ...style,
      }}
    >
      {/* Chapter Indicator & Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: side === 'center' ? 'center' : 'flex-start' }}>
        {chapter && (
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FFD447',
              background: 'rgba(255, 212, 71, 0.12)',
              border: '1px solid rgba(255, 212, 71, 0.3)',
              padding: '3px 10px',
              borderRadius: '6px',
            }}
          >
            {chapter}
          </span>
        )}
        {telemetry && (
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.70rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#61D7FF',
              textTransform: 'uppercase',
            }}
          >
            ● {telemetry}
          </span>
        )}
      </div>

      {/* Title & Subtitle */}
      <div>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            margin: '0 0 6px 0',
            color: '#FFFFFF',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <div
            style={{
              fontSize: 'clamp(0.88rem, 1.1vw, 1.02rem)',
              color: '#61D7FF',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <p
          style={{
            fontSize: '0.94rem',
            lineHeight: 1.65,
            color: '#D4D4D8',
            margin: 0,
            fontWeight: 400,
            textShadow: '0 1px 8px rgba(0, 0, 0, 0.7)',
          }}
        >
          {description}
        </p>
      )}

      {/* Metrics Row */}
      {metrics.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            justifyContent: side === 'center' ? 'center' : 'flex-start',
          }}
        >
          {metrics.map((m, idx) => (
            <MetricChip
              key={idx}
              label={m.label}
              value={m.value}
              color={m.color || accent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
