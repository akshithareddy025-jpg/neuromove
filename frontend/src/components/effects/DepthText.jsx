import React, { useRef, useState } from 'react';

/**
 * DepthText
 * Multi-layer 3D relief typography with subtle pointer parallax and editorial specular highlights.
 */
export default function DepthText({
  children,
  as: Component = 'span',
  depth = 6,
  color = '#FFFFFF',
  shadowColor = 'rgba(255, 255, 255, 0.25)',
  interactive = true,
  className = '',
  style = {},
  ...props
}) {
  const textRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!interactive || !textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({
      x: -dy * 12,
      y: dx * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Build multi-layered 3D depth shadow stack with clean contrast (no hazy white blur)
  const depthLayers = Array.from({ length: depth }, (_, i) => {
    const offset = i + 1;
    const alpha = Math.max(0.08, 0.5 - offset * 0.06);
    return `0 ${offset}px ${offset * 1.5}px rgba(0, 0, 0, ${alpha})`;
  });
  const textShadowStack = [...depthLayers, `0 1px 2px rgba(0, 0, 0, 0.95)`, `0 0 8px ${shadowColor}`].join(', ');

  return (
    <Component
      ref={textRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`depth-text ${className}`}
      style={{
        display: 'inline-block',
        color,
        textShadow: textShadowStack,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
