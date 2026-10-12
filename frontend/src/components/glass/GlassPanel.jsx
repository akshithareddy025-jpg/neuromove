import React, { useEffect, useRef, useState } from 'react';

/**
 * GlassPanel
 * Elegant Translucent White Glass Card for NeuroMove 3D Handbook.
 * 
 * Aesthetics:
 * - background: rgba(255, 255, 255, 0.08–0.14)
 * - border: rgba(255, 255, 255, 0.18–0.28)
 * - backdrop-filter: blur(24px)
 * - subtle glass depth, soft shadow, thin translucent scientific plate appearance.
 * 
 * Entrance Motion (premium, restrained):
 * - Starts opacity 0, translateY 20px, scale 0.97
 * - Settles with cubic-bezier(0.16, 1, 0.3, 1). Static blur only, never animated
 *   per-frame (Lenis jank guard).
 */
export default function GlassPanel({
  children,
  variant = 'default', // 'default' | 'maroon' | 'blue' | 'hero' | 'highlight'
  className = '',
  style = {},
  onClick = null,
  interactive = false,
  glow = false,
  animateEntrance = true,
  ...props
}) {
  const panelRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!animateEntrance);

  useEffect(() => {
    if (!animateEntrance) return;
    const el = panelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '60px 0px 60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animateEntrance]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          background: 'rgba(245, 245, 238, 0.72)',
          borderColor: 'rgba(255, 255, 255, 0.45)',
          borderRadius: '24px',
          color: '#1A201C',
          boxShadow: '0 8px 28px rgba(0, 0, 0, 0.07)',
          backdropFilter: 'blur(14px) saturate(110%)',
          WebkitBackdropFilter: 'blur(14px) saturate(110%)',
        };
      case 'utility':
        return {
          background: 'rgba(245, 245, 238, 0.55)',
          borderColor: 'rgba(255, 255, 255, 0.35)',
          borderRadius: '20px',
          color: '#1A201C',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        };
      case 'nav':
        return {
          background: 'rgba(245, 245, 238, 0.85)',
          borderColor: 'rgba(255, 255, 255, 0.55)',
          borderRadius: '9999px',
          color: '#1A201C',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.10)',
          backdropFilter: 'blur(18px) saturate(110%)',
          WebkitBackdropFilter: 'blur(18px) saturate(110%)',
        };
      case 'maroon':
        return {
          background: 'rgba(245, 245, 238, 0.88)',
          borderColor: 'rgba(239, 68, 68, 0.35)',
          borderRadius: '28px',
          color: '#1A201C',
          boxShadow: glow
            ? '0 16px 40px rgba(220, 38, 38, 0.15), 0 4px 12px rgba(0, 0, 0, 0.04)'
            : '0 12px 40px rgba(0, 0, 0, 0.10)',
        };
      case 'blue':
        return {
          background: 'rgba(245, 245, 238, 0.88)',
          borderColor: 'rgba(59, 130, 246, 0.35)',
          borderRadius: '28px',
          color: '#1A201C',
          boxShadow: glow
            ? '0 16px 40px rgba(37, 99, 235, 0.15), 0 4px 12px rgba(0, 0, 0, 0.04)'
            : '0 12px 40px rgba(0, 0, 0, 0.10)',
        };
      case 'hero':
      case 'primary':
      case 'default':
      default:
        return {
          background: 'rgba(245, 245, 238, 0.88)',
          borderColor: 'rgba(255, 255, 255, 0.55)',
          borderRadius: '28px',
          color: '#1A201C',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.10)',
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <div
      ref={panelRef}
      className={`glass-panel ${className}`}
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: vStyles.borderRadius || '28px',
        backdropFilter: 'blur(18px) saturate(110%)',
        WebkitBackdropFilter: 'blur(18px) saturate(110%)',
        borderWidth: '1px',
        borderStyle: 'solid',
        color: '#1A201C',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 20px, 0) scale(0.97)',
        transition: 'opacity 0.60s cubic-bezier(0.16, 1, 0.3, 1), transform 0.60s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease',
        cursor: interactive ? 'pointer' : 'default',
        overflow: 'hidden',
        willChange: 'opacity, transform',
        ...vStyles,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translate3d(0, -6px, 0) scale(1.005)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.85)';
          e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.14)';
        }
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translate3d(0, 0, 0) scale(1)';
          e.currentTarget.style.borderColor = vStyles.borderColor || 'rgba(255, 255, 255, 0.55)';
          e.currentTarget.style.boxShadow = vStyles.boxShadow || '0 12px 40px rgba(0, 0, 0, 0.10)';
        }
      }}
      onMouseDown={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translate3d(0, -2px, 0) scale(0.96)';
        }
      }}
      onMouseUp={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translate3d(0, -6px, 0) scale(1.005)';
        }
      }}
      {...props}
    >
      {/* Specular sheen beam across top edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '8%',
          right: '8%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
}
