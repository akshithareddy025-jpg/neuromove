import React from 'react';

/**
 * AtmosphericBackground
 * Lightweight post-portal wash for NeuroMove.
 *
 * Single-mount rule: the exact <SylvaHero living-green /> world is mounted
 * exactly once, inside SylvaWorldB (sticky World B environment). This layer
 * stays a pure CSS wash (no second WebGL scene) so the page never pays for
 * two Three.js worlds and World A / World B can never mix.
 *
 * - Sits at zIndex: 0 (behind content cards and navigation).
 * - Opaque dark-olive base close to the Sylva field so translucent sections
 *   never flash white or reveal World A black.
 * - Fades in as the NeuromovePortal completes, fully reversible on scroll up.
 */
export default function AtmosphericBackground({
  visibilityProgress = 0,
  className = '',
  style = {},
}) {
  // Smoothly fade in when entering post-portal sections (progress > 0.20)
  const isVisible = visibilityProgress > 0.20;
  const opacity = Math.min(1, Math.max(0, (visibilityProgress - 0.20) / 0.50));

  return (
    <div
      className={`atmospheric-background-environment ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: isVisible ? opacity : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        background: '#383b34',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.45s',
        ...style,
      }}
    >
      {/* Soft light field the Sylva world sits in — CSS only, zero GPU scene cost */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(72% 44% at 50% 117%, rgba(238, 243, 231, 0.20) 0%, rgba(238, 243, 231, 0) 70%),
            radial-gradient(64% 52% at 27% 84%, rgba(232, 238, 222, 0.08) 0%, rgba(232, 238, 222, 0) 72%),
            linear-gradient(180deg, rgba(56, 59, 52, 1) 0%, rgba(74, 77, 68, 1) 100%)
          `,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
