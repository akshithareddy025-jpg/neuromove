import React from 'react';

/**
 * BorderGlow
 * Controlled electrical energy moving slowly around module boundaries.
 * Subtle, research-grade, non-neon luminescence.
 */
export default function BorderGlow({
  children,
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.4)',
  edgeColor = 'rgba(255, 255, 255, 0.3)',
  speed = 6,
  borderRadius = 16,
  style = {},
  ...props
}) {
  return (
    <div
      className={`border-glow-wrapper ${className}`}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        padding: '1px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.08)',
        ...style,
      }}
      {...props}
    >
      {/* Slow rotating subtle energy gradient */}
      <div
        className="border-glow-aura"
        style={{
          position: 'absolute',
          inset: '-150%',
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 180deg, ${edgeColor} 260deg, ${glowColor} 300deg, transparent 360deg)`,
          animation: `border-glow-spin ${speed}s linear infinite`,
          pointerEvents: 'none',
        }}
      />

      {/* Surface content */}
      <div
        className="border-glow-content"
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: `${borderRadius - 1}px`,
          background: 'var(--glass-bg, rgba(14, 14, 18, 0.95))',
          backdropFilter: 'blur(20px)',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
