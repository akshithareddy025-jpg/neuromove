import React, { useEffect, useState, createContext, useContext } from 'react';
import { initScrollEngine, destroyScrollEngine, isReducedMotion } from '../../lib/scrollEngine';

export const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

export function getGlobalLenis() {
  if (typeof window !== 'undefined') return window.__lenis || null;
  return null;
}

/**
 * SmoothScrollProvider — single unified timing system:
 * Lenis -> GSAP ticker -> ScrollTrigger.update
 * No other module may create its own Lenis or GSAP ticker.
 */
export default function SmoothScrollProvider({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);

  useEffect(() => {
    if (isReducedMotion()) return;
    const lenis = initScrollEngine();
    setLenisInstance(lenis);
    return () => {
      destroyScrollEngine();
      setLenisInstance(null);
    };
  }, []);

  return <LenisContext.Provider value={lenisInstance}>{children}</LenisContext.Provider>;
}
