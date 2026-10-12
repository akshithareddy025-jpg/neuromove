import React, { useState } from 'react';

/**
 * TrueFocus
 * When any child item is hovered or focused, that element remains in razor-sharp focus
 * while sibling items subtly blur and dim, directing the user's cognitive attention.
 */
export default function TrueFocus({
  children,
  blurAmount = '3px',
  dimOpacity = 0.35,
  className = '',
  style = {},
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={`true-focus-container ${className}`}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        display: 'contents',
        ...style,
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;

        return React.cloneElement(child, {
          onMouseEnter: (e) => {
            setHoveredIndex(index);
            if (child.props.onMouseEnter) child.props.onMouseEnter(e);
          },
          onFocus: (e) => {
            setHoveredIndex(index);
            if (child.props.onFocus) child.props.onFocus(e);
          },
          style: {
            ...child.props.style,
            filter: isAnyHovered && !isHovered ? `blur(${blurAmount})` : 'none',
            opacity: isAnyHovered && !isHovered ? dimOpacity : 1,
            transform: isHovered ? `${child.props.style?.transform || ''} scale(1.02)` : child.props.style?.transform,
            transition: 'filter 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'filter, opacity, transform',
          },
        });
      })}
    </div>
  );
}
