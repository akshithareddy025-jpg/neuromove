import React, { useEffect, useRef, useState } from 'react';

/**
 * ThoughtLine
 * Signature NeuroMove visual element:
 * A thin, bioelectric signal line representing neural transmission, thought, and decision.
 * Progressively draws itself as the visitor scrolls, with an animated action-potential pulse leading the way.
 */
export default function ThoughtLine({
  height = 140,
  variant = 'vertical', // 'vertical' | 'curved' | 'horizontal'
  color = '#FFFFFF',
  pulse = true,
  className = '',
  style = {},
}) {
  const lineRef = useRef(null);
  const pathRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Calculate how far through the viewport the element is
      const start = windowH * 0.9;
      const end = windowH * 0.2;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (variant === 'curved') {
    return (
      <div
        ref={lineRef}
        className={`thought-line-wrap ${className}`}
        style={{
          width: '100%',
          height: `${height}px`,
          position: 'relative',
          overflow: 'visible',
          pointerEvents: 'none',
          ...style,
        }}
      >
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 800 ${height}`}
          fill="none"
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
          {/* Subtle guide track */}
          <path
            d={`M 100 0 C 100 ${height * 0.5}, 700 ${height * 0.5}, 700 ${height}`}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Active bioelectric line */}
          <path
            ref={pathRef}
            d={`M 100 0 C 100 ${height * 0.5}, 700 ${height * 0.5}, 700 ${height}`}
            stroke={`url(#thought-gradient-${height})`}
            strokeWidth="2"
            strokeDasharray="1200"
            strokeDashoffset={1200 * (1 - scrollProgress)}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.1s linear',
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />

          <defs>
            <linearGradient id={`thought-gradient-${height}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor={color} />
              <stop offset="100%" stopColor="#A1A1AA" />
            </linearGradient>
          </defs>
        </svg>

        {/* Action potential pulse head */}
        {pulse && scrollProgress > 0.05 && scrollProgress < 0.98 && (
          <div
            className="thought-pulse-node"
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: `0 0 12px #FFFFFF, 0 0 24px rgba(255, 255, 255, 0.4)`,
              top: `${scrollProgress * 100}%`,
              left: `${12 + scrollProgress * 76}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'top 0.1s linear, left 0.1s linear',
            }}
          />
        )}
      </div>
    );
  }

  // Default vertical connecting line
  return (
    <div
      ref={lineRef}
      className={`thought-line-wrap ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: `${height}px`,
        position: 'relative',
        margin: '0 auto',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <div
        style={{
          width: '1px',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.08)',
          position: 'relative',
        }}
      >
        {/* Progressively drawn line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${scrollProgress * 100}%`,
            background: `linear-gradient(to bottom, #FFFFFF, ${color}, #A1A1AA)`,
            boxShadow: `0 0 8px rgba(255, 255, 255, 0.4)`,
            transition: 'height 0.15s ease-out',
          }}
        />

        {/* Bioelectric node */}
        <div
          style={{
            position: 'absolute',
            top: `${scrollProgress * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#FFFFFF',
            boxShadow: `0 0 10px #FFFFFF, 0 0 20px ${color}`,
            opacity: scrollProgress > 0.02 ? 1 : 0,
            transition: 'top 0.15s ease-out, opacity 0.2s ease',
          }}
        />
      </div>
    </div>
  );
}
