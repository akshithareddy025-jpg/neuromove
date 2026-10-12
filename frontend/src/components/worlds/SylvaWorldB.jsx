import React from 'react';
import { SylvaHero } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';

/**
 * SylvaWorldB — WORLD B environment for NeuroMove (STAGE 1 ONLY).
 *
 * Exact source integration:
 * - Uses the registered <SylvaHero variant="living-green" /> implementation
 *   byte-for-byte (LandingPageFrame + SYLVA_TYPOGRAPHY + inner-green-3d.html).
 * - Configured usage matches the approved brief exactly.
 *
 * Architecture:
 * - Full-bleed section placed immediately after <NeuromovePortal />.
 * - Opaque living-green base (#4a4d44) so World A black can never bleed through
 *   and no black void / white flash can appear during the handoff.
 * - Background layer is sticky (stable cinematic world) while NeuroMove
 *   WORLD B content scrolls above it. The Three.js scene never captures
 *   page scroll (pointer-events: none on the background layer, no wheel/touch
 *   listeners, touch-action left to the page so Lenis stays the only scroller).
 * - Static backdrop blur only on cards (never animated per-frame). The sticky
 *   world layer itself uses transform-only compositing for Lenis smoothness.
 * - Layer order: background (z 0) < content (z 2) < navigation (z 100).
 */
export default function SylvaWorldB({ children = null, className = '', style = {} }) {
  return (
    <section
      id="world-b-sylva"
      aria-label="Sylva living green world"
      className={className}
      style={{
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        background: '#4a4d44',
        zIndex: 10,
        isolation: 'isolate',
        overflow: 'clip',
        ...style,
      }}
    >
      {/* Sticky environmental background — stable while WORLD B content scrolls above it */}
      <div
        aria-hidden="true"
        className="sylva-perf-layer"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#4a4d44',
          zIndex: 0,
          pointerEvents: 'none',
          touchAction: 'pan-y',
          willChange: 'transform',
          contain: 'strict',
          transform: 'translateZ(0)',
        }}
      >
        <div
          className="shader-frame"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: '#4a4d44',
            overflow: 'hidden',
          }}
        >
          <SylvaHero
            variant="living-green"
            headingFont="lexend"
            bodyFont="lexend"
            headingWeight="300"
            bodyWeight="300"
            primaryColor="#ffffff"
            headingSize={63}
            bodySize={16.5}
            headingLetterSpacing={-0.006}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              background: '#4a4d44',
            }}
          />
        </div>
      </div>

      {/* WORLD B CONTENT — scrolls over the stable living-green world with zero empty gap */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '-100vh',
          paddingTop: '48px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>{children}</div>
      </div>
    </section>
  );
}
