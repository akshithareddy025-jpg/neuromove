import React, { useRef, useState } from 'react';

/**
 * SpecularButton
 * Premium pill CTA with restrained specular highlight + subtle magnetic pull.
 * Magnetic max is a few px with spring-back; never chases the cursor.
 */
export default function SpecularButton({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'glow'
  icon,
  className = '',
  style = {},
  disabled = false,
}) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
    // Subtle magnetic pull toward cursor, clamped to a few px. Disabled on
    // coarse pointers via matchMedia check at event time (cheap, no listeners).
    if (window.matchMedia?.('(pointer: coarse)').matches) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setMagnet({
      x: Math.max(-6, Math.min(6, dx * 0.08)),
      y: Math.max(-4, Math.min(4, dy * 0.1)),
    });
  };

  const handleLeave = () => {
    setIsHovered(false);
    setMagnet({ x: 0, y: 0 });
  };

  const getBg = () => {
    if (variant === 'glow') {
      return 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))';
    }
    if (variant === 'secondary') {
      return 'rgba(255, 255, 255, 0.05)';
    }
    return 'linear-gradient(135deg, #FFFFFF, #E4E4E7)';
  };

  const getColor = () => {
    return variant === 'primary' ? '#000000' : '#FFFFFF';
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      disabled={disabled}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      className={`specular-button ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minHeight: '50px',
        padding: '0 24px',
        borderRadius: '9999px',
        fontSize: '0.88rem',
        fontWeight: 700,
        color: getColor(),
        background: getBg(),
        border: '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: isHovered
          ? '0 14px 30px rgba(20, 35, 24, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          : '0 6px 20px rgba(20, 35, 24, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        overflow: 'hidden',
        transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, background 0.2s ease',
        transform: isHovered && !disabled ? `translate3d(${magnet.x}px, ${magnet.y - 2}px, 0)` : 'none',
        ...style,
      }}
    >
      {/* Specular Radial Light Sheen */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle 80px at ${pos.x}% ${pos.y}%, rgba(255, 255, 255, 0.6) 0%, transparent 80%)`,
          opacity: isHovered ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease',
          mixBlendMode: variant === 'primary' ? 'overlay' : 'screen',
        }}
      />

      {/* Button Content */}
      <span style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {icon}
        {children}
      </span>
    </button>
  );
}
