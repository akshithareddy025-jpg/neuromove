import React, { useState, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';

/**
 * SlideCommit
 * Apple/Awwwards-grade tactile slide-to-confirm interaction for major actions.
 * Dragging the thumb past the threshold commits the action with a bioelectric flash.
 */
export default function SlideCommit({
  onCommit,
  label = 'Slide to Initialize Telemetry Stream',
  completedLabel = 'Telemetry Initialized',
  color = '#FFFFFF',
  className = '',
  style = {},
}) {
  const [sliderPos, setSliderPos] = useState(0);
  const [isCommitted, setIsCommitted] = useState(false);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handlePointerDown = (e) => {
    if (isCommitted) return;
    isDragging.current = true;
    startX.current = e.clientX - sliderPos;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || isCommitted || !trackRef.current) return;
    const trackWidth = trackRef.current.clientWidth - 52;
    const newPos = Math.max(0, Math.min(trackWidth, e.clientX - startX.current));
    setSliderPos(newPos);

    if (newPos >= trackWidth * 0.92) {
      isDragging.current = false;
      setIsCommitted(true);
      setSliderPos(trackWidth);
      if (onCommit) onCommit();
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current || isCommitted || !trackRef.current) return;
    isDragging.current = false;
    const trackWidth = trackRef.current.clientWidth - 52;
    if (sliderPos < trackWidth * 0.92) {
      setSliderPos(0);
    }
  };

  // Allow clicking as an accessible fallback
  const handleClickFallback = () => {
    if (isCommitted) return;
    if (trackRef.current) {
      const trackWidth = trackRef.current.clientWidth - 52;
      setSliderPos(trackWidth);
    }
    setIsCommitted(true);
    if (onCommit) onCommit();
  };

  return (
    <div
      ref={trackRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`slide-commit-track ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '410px',
        height: '52px',
        borderRadius: '9999px',
        background: 'rgba(15, 17, 23, 0.9)',
        border: `1px solid ${isCommitted ? '#FFFFFF' : 'rgba(255, 255, 255, 0.14)'}`,
        display: 'flex',
        alignItems: 'center',
        padding: '3px',
        userSelect: 'none',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
        transition: 'border-color 0.3s ease',
        touchAction: 'none',
        ...style,
      }}
    >
      {/* Background completed fill progress */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${sliderPos + 46}px`,
          background: isCommitted
            ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.5))'
            : `linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.25))`,
          borderRadius: '9999px',
          pointerEvents: 'none',
          transition: isDragging.current ? 'none' : 'width 0.25s ease',
        }}
      />

      {/* Track Label */}
      <div
        onClick={handleClickFallback}
        style={{
          width: '100%',
          textAlign: 'center',
          fontSize: '0.80rem',
          fontWeight: 600,
          color: isCommitted ? '#FFFFFF' : '#D4D4D8',
          letterSpacing: '-0.01em',
          cursor: isCommitted ? 'default' : 'pointer',
          paddingLeft: '52px',
          paddingRight: '16px',
          boxSizing: 'border-box',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          zIndex: 1,
          transition: 'color 0.3s ease',
        }}
      >
        {isCommitted ? completedLabel : label}
      </div>

      {/* Draggable Thumb Knob */}
      <div
        onPointerDown={handlePointerDown}
        style={{
          position: 'absolute',
          left: `${sliderPos + 4}px`,
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: isCommitted ? '#FFFFFF' : '#FFFFFF',
          color: isCommitted ? '#000000' : '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isCommitted ? 'default' : 'grab',
          boxShadow: isCommitted
            ? '0 0 16px #FFFFFF'
            : '0 4px 14px rgba(0, 0, 0, 0.5), 0 0 12px rgba(255, 255, 255, 0.5)',
          zIndex: 2,
          transition: isDragging.current ? 'none' : 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease',
        }}
      >
        {isCommitted ? <Check size={18} strokeWidth={2.5} /> : <ArrowRight size={18} strokeWidth={2.5} />}
      </div>
    </div>
  );
}
