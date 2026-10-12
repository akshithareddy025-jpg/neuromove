import React, { useState, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

/**
 * SwipeToast
 * Subtle, non-intrusive micro-interaction toast.
 * Teaches users that a horizontal section or 3D object is interactive,
 * automatically fading out permanently once interacted with or after a brief duration.
 */
export default function SwipeToast({
  storageKey = 'neuromove-interacted',
  desktopText = 'Drag to explore telemetry',
  mobileText = 'Swipe to explore telemetry',
  duration = 4500,
  className = '',
  style = {},
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user already interacted with this element in session
    const hasInteracted = sessionStorage.getItem(storageKey);
    if (!hasInteracted) {
      const showTimer = setTimeout(() => setVisible(true), 1200);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(storageKey, 'true');
      }, duration);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [storageKey, duration]);

  if (!visible) return null;

  return (
    <div
      className={`swipe-toast-pill ${className}`}
      onClick={() => {
        setVisible(false);
        sessionStorage.setItem(storageKey, 'true');
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '9999px',
        background: 'rgba(15, 15, 15, 0.92)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(255, 255, 255, 0.2)',
        fontSize: '0.76rem',
        fontWeight: 600,
        color: '#FFFFFF',
        animation: 'toast-float 2s ease-in-out infinite alternate',
        cursor: 'pointer',
        zIndex: 40,
        ...style,
      }}
    >
      <MoveHorizontal size={14} color="#FFFFFF" />
      <span>{window.innerWidth < 768 ? mobileText : desktopText}</span>
    </div>
  );
}
