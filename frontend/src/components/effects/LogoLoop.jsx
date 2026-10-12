import React from 'react';

/**
 * LogoLoop
 * Refined infinite micro-animation for the NeuroMove brand mark.
 * Integrates an EEG bipolar waveform sweep and bioelectric node pulses that feel living yet subtle.
 */
export default function LogoLoop({
  size = 32,
  color = '#FFFFFF',
  accentColor = '#FFFFFF',
  className = '',
  style = {},
}) {
  return (
    <div
      className={`logo-loop-wrap ${className}`}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Outer subtle halo ring */}
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.2"
        />

        {/* Orbiting action potential pulse */}
        <circle
          cx="16"
          cy="2"
          r="2.2"
          fill="#FFFFFF"
          style={{
            transformOrigin: '16px 16px',
            animation: 'logo-orbit 5s linear infinite',
            filter: `drop-shadow(0 0 6px ${accentColor})`,
          }}
        />

        {/* Central EEG Waveform Path */}
        <path
          d="M 6 16 L 10 16 L 12 11 L 15 22 L 18 9 L 21 19 L 23 16 L 26 16"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="60"
          strokeDashoffset="0"
          style={{
            animation: 'logo-wave-pulse 3.5s ease-in-out infinite',
            filter: `drop-shadow(0 0 4px ${accentColor})`,
          }}
        />

        {/* Central Motor Node (representing Cz) */}
        <circle
          cx="18"
          cy="9"
          r="1.8"
          fill={accentColor}
          style={{
            animation: 'logo-node-glow 2s ease-in-out infinite alternate',
          }}
        />
      </svg>
    </div>
  );
}
