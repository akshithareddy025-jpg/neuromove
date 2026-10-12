import React, { useEffect, useRef } from 'react';
import { gsap, isReducedMotion, isCoarsePointer } from '../../lib/scrollEngine';

/**
 * CustomCursor — zero React re-renders on mousemove.
 * Refs + gsap.quickTo on shared ticker. Disabled on touch / reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const wrapRef = useRef(null);
  const stateRef = useRef({ x: -100, y: -100, rx: -100, ry: -100, mode: 'default', text: '' });

  useEffect(() => {
    if (isCoarsePointer() || isReducedMotion()) return undefined;
    const dot = dotRef.current, ring = ringRef.current, wrap = wrapRef.current;
    if (!dot || !ring || !wrap) return undefined;
    wrap.style.display = 'block';
    // Hide native cursor while custom cursor is active (fixes double-cursor
    // seen in Screen Recording 1 where arrow + dot both render).
    document.documentElement.classList.add('custom-cursor-active');
    wrap.style.transition = 'opacity 0.2s ease';

    const dxTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dyTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const rxTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ryTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const applyMode = (mode, text) => {
      const s = stateRef.current;
      if (s.mode === mode && s.text === text) return;
      s.mode = mode; s.text = text;
      const isBadge = Boolean(text), isHover = mode === 'hover';
      ring.style.width = isBadge ? '88px' : isHover ? '42px' : '26px';
      ring.style.height = isBadge ? '28px' : isHover ? '42px' : '26px';
      ring.style.borderRadius = isBadge ? '9999px' : '50%';
      ring.style.backgroundColor = isBadge ? 'rgba(15,15,15,0.92)' : isHover ? 'rgba(255,255,255,0.12)' : 'transparent';
      dot.style.opacity = isBadge ? '0' : '1';
      if (labelRef.current) labelRef.current.textContent = text;
    };

    const onMove = (e) => {
      if (wrap.style.opacity !== '1') wrap.style.opacity = '1';
      dxTo(e.clientX); dyTo(e.clientY); rxTo(e.clientX); ryTo(e.clientY);
      let t = e.target, mode = 'default', text = '';
      while (t && t !== document.body) {
        const c = t.getAttribute?.('data-cursor');
        if (c) {
          mode = c;
          text = c === 'drag' ? 'DRAG' : c === 'explore' ? 'EXPLORE' : c === 'view' ? 'VIEW MODEL' : c === 'play' ? 'PLAY' : c.toUpperCase();
          break;
        }
        if (t.tagName === 'BUTTON' || t.tagName === 'A' || t.getAttribute?.('role') === 'button') { mode = 'hover'; break; }
        t = t.parentElement;
      }
      applyMode(mode, text);
    };

    const onLeave = () => { wrap.style.opacity = '0'; };
    const onEnter = () => { wrap.style.opacity = '1'; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ display: 'none' }}>
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: 5, height: 5, borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 0 8px rgba(255,255,255,0.9)', pointerEvents: 'none', zIndex: 99999 }} />
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', pointerEvents: 'none', zIndex: 99998, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'width 0.2s cubic-bezier(0.16,1,0.3,1), height 0.2s cubic-bezier(0.16,1,0.3,1), background-color 0.2s ease' }}>
        <span ref={labelRef} style={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.08em', color: '#fff', fontFamily: 'var(--font-mono, monospace)' }} />
      </div>
    </div>
  );
}
