import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Activity } from 'lucide-react';
import SwipeToast from '../effects/SwipeToast';

/**
 * StoryCarousel
 * Premium horizontal storytelling carousel.
 * Supports drag, wheel, touch swipe, keyboard, and partial-peek cards with subtle depth and scaling.
 */
export default function StoryCarousel({
  items = [],
  title = 'Neurorehabilitation & Clinical Deployments',
  subtitle = 'Translating 4-class motor imagery into actionable neuroprosthetic and assistive autonomy',
  isLightMode = true,
  className = '',
  style = {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDistance = useRef(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => Math.max(0, prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => Math.min(items.length - 1, prevIdx + 1));
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    dragDistance.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    dragDistance.current = e.clientX - startX.current;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDistance.current < -60) {
      next();
    } else if (dragDistance.current > 60) {
      prev();
    }
    dragDistance.current = 0;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  };

  return (
    <div
      className={`story-carousel-section ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-cursor="drag"
      style={{
        position: 'relative',
        outline: 'none',
        ...style,
      }}
    >
      {/* Carousel Header with Navigation Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              className="mono"
              style={{
                fontSize: '0.74rem',
                color: isLightMode ? '#ea580c' : '#FFFFFF',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: isLightMode ? 'rgba(234, 88, 12, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                padding: '3px 10px',
                borderRadius: '6px',
              }}
            >
              TRANSLATIONAL IMPACT
            </span>
            <SwipeToast desktopText="Drag carousel to explore use cases" mobileText="Swipe to explore use cases" />
          </div>
          <h3
            className={isLightMode ? 'shining-black-heading' : ''}
            style={{
              fontSize: '1.55rem',
              fontWeight: 900,
              color: isLightMode ? '#09090b' : '#FFFFFF',
              margin: '0 0 6px 0',
              lineHeight: 1.25,
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: '0.92rem', color: isLightMode ? '#475569' : 'var(--text-secondary)', margin: 0, maxWidth: '680px', lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </div>

        {/* Carousel Arrow Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="carousel-nav-btn"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isLightMode ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
              border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
              color: currentIndex === 0
                ? (isLightMode ? '#cbd5e1' : 'rgba(255, 255, 255, 0.2)')
                : (isLightMode ? '#09090b' : '#FFFFFF'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.06)' : 'none',
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            disabled={currentIndex === items.length - 1}
            className="carousel-nav-btn"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: isLightMode ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
              border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
              color: currentIndex === items.length - 1
                ? (isLightMode ? '#cbd5e1' : 'rgba(255, 255, 255, 0.2)')
                : (isLightMode ? '#09090b' : '#FFFFFF'),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentIndex === items.length - 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isLightMode ? '0 4px 12px rgba(0, 0, 0, 0.06)' : 'none',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Track Viewport */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          overflow: 'hidden',
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'pan-y',
          borderRadius: '20px',
          padding: '12px 0 24px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '24px',
            transform: `translateX(calc(-${currentIndex * 82}% + ${currentIndex === 0 ? '0px' : '40px'}))`,
            transition: isDragging.current ? 'none' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
        >
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={item.id || idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  flex: '0 0 78%',
                  maxWidth: '520px',
                  background: isLightMode
                    ? (isActive ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.85)')
                    : (isActive ? 'var(--bg-surface-2, #141418)' : 'var(--bg-surface-1, #0c0d12)'),
                  border: isLightMode
                    ? (isActive ? '1.5px solid rgba(244, 114, 182, 0.45)' : '1px solid rgba(244, 114, 182, 0.25)')
                    : `1px solid ${isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '28px',
                  boxShadow: isLightMode
                    ? (isActive ? '0 20px 48px -10px rgba(244, 114, 182, 0.22), 0 8px 20px -6px rgba(249, 115, 22, 0.1)' : '0 8px 20px rgba(0, 0, 0, 0.04)')
                    : (isActive ? '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.12)' : '0 8px 24px rgba(0, 0, 0, 0.5)'),
                  transform: isActive ? 'scale(1)' : 'scale(0.96)',
                  opacity: isActive ? 1 : 0.65,
                  transition: 'transform 0.35s ease, opacity 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent Top Ribbon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: isLightMode ? '#db2777' : (item.badgeColor || '#FFFFFF'),
                      padding: '3px 10px',
                      borderRadius: '6px',
                      background: isLightMode ? '#fdf2f8' : 'rgba(255, 255, 255, 0.05)',
                      border: isLightMode ? '1px solid rgba(244, 114, 182, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {item.badge}
                  </span>
                  <span className="mono" style={{ fontSize: '0.72rem', color: isLightMode ? '#64748b' : '#71717A', fontWeight: 600 }}>
                    CASE 0{idx + 1} / 0{items.length}
                  </span>
                </div>

                {/* Card Title & Description */}
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: isLightMode ? '#09090b' : '#FFFFFF', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: isLightMode ? '#334155' : '#D4D4D8', lineHeight: 1.65, margin: '0 0 20px 0' }}>
                  {item.description}
                </p>

                {/* Metrics Breakdown Matrix */}
                {item.metrics && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '12px',
                      paddingTop: '16px',
                      borderTop: isLightMode ? '1px solid rgba(244, 114, 182, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div style={{ fontSize: '0.7rem', color: isLightMode ? '#64748b' : '#71717A', fontWeight: 700, textTransform: 'uppercase' }}>
                          {m.label}
                        </div>
                        <div className="mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: isLightMode ? '#09090b' : (m.color || '#FFFFFF'), marginTop: '2px' }}>
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
