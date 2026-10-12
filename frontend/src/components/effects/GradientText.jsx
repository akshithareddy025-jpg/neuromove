import React from 'react';

/**
 * GradientText
 * Fluid animated gradient text with continuous shimmer and customizable color stops.
 */
export default function GradientText({
  children,
  colors = ['#FFFFFF', '#D4D4D8', '#A1A1AA', '#E4E4E7', '#FFFFFF'],
  animationSpeed = 6,
  showBorder = false,
  className = '',
  style = {},
}) {
  const gradientString = `linear-gradient(to right, ${colors.join(', ')})`;

  return (
    <span
      className={`gradient-text ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style,
      }}
    >
      <span
        style={{
          backgroundImage: gradientString,
          backgroundSize: '300% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `gradient-text-flow ${animationSpeed}s linear infinite`,
          display: 'inline-block',
        }}
      >
        {children}
      </span>
      {showBorder && (
        <span
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: 'inherit',
            backgroundImage: gradientString,
            backgroundSize: '300% 100%',
            opacity: 0.35,
            zIndex: -1,
            filter: 'blur(6px)',
            animation: `gradient-text-flow ${animationSpeed}s linear infinite`,
          }}
        />
      )}
    </span>
  );
}
