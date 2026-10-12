import React, { useEffect, useRef } from 'react';

/**
 * MaskedHeading
 * Apple/Awwwards-grade masked heading reveal.
 * Reveals text through a crisp vertical clip-path or gradient mask,
 * animating up with physics-inspired easing.
 */
export default function MaskedHeading({
  children,
  as: Component = 'h2',
  className = '',
  delay = 0,
  duration = 1.0,
  style = {},
  revealOnScroll = true,
  ...props
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;

    if (!revealOnScroll) {
      // Immediate reveal
      const timer = setTimeout(() => {
        textEl.style.transform = 'translate3d(0, 0, 0)';
        textEl.style.opacity = '1';
      }, delay * 1000);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              textEl.style.transform = 'translate3d(0, 0, 0)';
              textEl.style.opacity = '1';
            }, delay * 1000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, revealOnScroll]);

  return (
    <div
      ref={containerRef}
      className={`masked-heading-wrap ${className}`}
      style={{
        overflow: 'hidden',
        display: 'inline-block',
        verticalAlign: 'bottom',
        maxWidth: '100%',
        padding: '0 8px 4px 8px',
        boxSizing: 'border-box',
        ...style,
      }}
      {...props}
    >
      <Component
        ref={textRef}
        style={{
          margin: 0,
          maxWidth: '100%',
          boxSizing: 'border-box',
          transform: !revealOnScroll ? 'translate3d(0, 0, 0)' : 'translate3d(0, 115%, 0)',
          opacity: !revealOnScroll ? 1 : 0.001,
          transition: `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${duration * 0.8}s ease`,
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </Component>
    </div>
  );
}
