import React from 'react';

/**
 * ShinyText
 * Specular metallic sweep across scientific typography.
 * Simulates a fine laser or bioelectric pulse travelling through technical text.
 */
export default function ShinyText({
  children,
  speed = 4,
  shimmerColor = 'rgba(255, 255, 255, 0.95)',
  baseColor = '#A1A1AA',
  className = '',
  style = {},
  ...props
}) {
  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        display: 'inline-block',
        background: `linear-gradient(110deg, ${baseColor} 0%, ${baseColor} 38%, ${shimmerColor} 50%, ${baseColor} 62%, ${baseColor} 100%)`,
        backgroundSize: '240% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `shiny-sweep ${speed}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
