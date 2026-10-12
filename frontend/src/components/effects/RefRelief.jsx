import React, { useRef, useState } from 'react';

/**
 * RefRelief
 * Scientific tactile relief & elevation card wrapper.
 * Provides micro-depth, layered inner highlights, soft atmospheric shadows,
 * and calibrated pointer-reactive 3D tilt.
 */
export default function RefRelief({
  children,
  elevation = 2, // 1 | 2 | 3
  tiltSensitivity = 8,
  borderRadius = 16,
  className = '',
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotX = -((y - cy) / cy) * tiltSensitivity;
    const rotY = ((x - cx) / cx) * tiltSensitivity;

    setTilt({
      x: rotX,
      y: rotY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  const getElevationStyle = () => {
    switch (elevation) {
      case 1:
        return {
          boxShadow: tilt.isHovered
            ? '0 16px 36px -6px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.12)'
            : '0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        };
      case 3:
        return {
          boxShadow: tilt.isHovered
            ? '0 32px 70px -10px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(255, 255, 255, 0.22)'
            : '0 16px 44px -8px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.14)',
        };
      case 2:
      default:
        return {
          boxShadow: tilt.isHovered
            ? '0 24px 50px -8px rgba(0, 0, 0, 0.85), 0 0 1px 1px rgba(255, 255, 255, 0.18)'
            : '0 12px 32px -6px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
        };
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`ref-relief-card ${className}`}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.isHovered ? -4 : 0}px)`,
        transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
        willChange: 'transform',
        ...getElevationStyle(),
        ...style,
      }}
      {...props}
    >
      {/* Subtle specular surface glare following cursor */}
      {tilt.isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: `${borderRadius}px`,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}

      {children}
    </div>
  );
}
