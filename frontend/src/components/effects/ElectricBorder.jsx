import React, { useRef, useEffect } from 'react';

/**
 * ElectricBorder
 * Controlled electrical current traveling around the perimeter of critical scientific modules.
 * Features a glowing electrical spark running in a closed loop with subtle synaptic pulse.
 */
export default function ElectricBorder({
  children,
  className = '',
  color = '#FFFFFF',
  secondaryColor = '#A1A1AA',
  speed = 3.5,
  sparkSize = 100,
  borderRadius = 16,
  active = true,
  style = {},
  ...props
}) {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className={`electric-border-wrap ${className}`}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        padding: '1px',
        background: 'transparent',
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {active && (
        <>
          {/* Outer traveling electric current */}
          <div
            className="electric-spark-track"
            style={{
              position: 'absolute',
              inset: '-100%',
              background: `conic-gradient(from 0deg, transparent 0deg, transparent 280deg, ${secondaryColor} 320deg, ${color} 345deg, #FFFFFF 360deg)`,
              animation: `electric-travel ${speed}s linear infinite`,
              pointerEvents: 'none',
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />

          {/* Micro electrical arc flash */}
          <div
            className="electric-arc-glow"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: `${borderRadius}px`,
              border: `1px solid rgba(255, 255, 255, 0.25)`,
              pointerEvents: 'none',
              boxShadow: `inset 0 0 12px rgba(255, 255, 255, 0.12)`,
            }}
          />
        </>
      )}

      {/* Inner scientific content surface */}
      <div
        className="electric-border-surface"
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: `${borderRadius - 1}px`,
          background: 'var(--bg-surface-1, #0a0a0c)',
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
