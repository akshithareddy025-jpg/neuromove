import React, { useState, useEffect } from 'react';

/**
 * FuzzyText
 * Simulates bioelectric signal jitter and stochastic neural noise
 * that crystallizes into razor-sharp scientific precision on hover or trigger.
 */
export default function FuzzyText({
  text = '',
  children,
  resolved = false,
  className = '',
  style = {},
  ...props
}) {
  const content = text || children || '';
  const [displayText, setDisplayText] = useState(content);
  const [isHovered, setIsHovered] = useState(false);
  const glyphs = '01#%*&/<>~+=_?^';

  useEffect(() => {
    let intervalId;
    if (isHovered) {
      let iteration = 0;
      const original = typeof content === 'string' ? content : '';
      intervalId = setInterval(() => {
        setDisplayText(
          original
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return original[index];
              }
              if (char === ' ') return ' ';
              return glyphs[Math.floor(Math.random() * glyphs.length)];
            })
            .join('')
        );

        if (iteration >= original.length) {
          clearInterval(intervalId);
          setDisplayText(original);
        }

        iteration += 1 / 2;
      }, 30);
    } else {
      setDisplayText(content);
    }

    return () => clearInterval(intervalId);
  }, [isHovered, content]);

  return (
    <span
      className={`fuzzy-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
        cursor: 'default',
        textShadow: isHovered ? '0 0 10px rgba(255, 255, 255, 0.6)' : 'none',
        transition: 'text-shadow 0.2s ease',
        ...style,
      }}
      {...props}
    >
      {displayText}
    </span>
  );
}
