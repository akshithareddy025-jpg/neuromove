import React, { useState, useEffect } from 'react';

/**
 * PixelTransition
 * High-tech optical pixel shutter transition for major chapter and section boundaries.
 * Features a grid of obsidian micro-tiles that briefly stagger-close and open.
 */
export default function PixelTransition({
  trigger = false,
  gridCols = 10,
  gridRows = 6,
  onComplete,
  className = '',
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      const timer = setTimeout(() => {
        setActive(false);
        if (onComplete) onComplete();
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!active) return null;

  const totalTiles = gridCols * gridRows;

  return (
    <div
      className={`pixel-transition-overlay ${className}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'grid',
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gridTemplateRows: `repeat(${gridRows}, 1fr)`,
      }}
    >
      {Array.from({ length: totalTiles }).map((_, i) => {
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);
        const delay = (col + row) * 0.025;

        return (
          <div
            key={i}
            style={{
              background: '#040508',
              border: '0.5px solid rgba(255, 255, 255, 0.05)',
              transform: 'scale(1)',
              animation: `pixel-shutter 0.7s cubic-bezier(0.85, 0, 0.15, 1) forwards`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
