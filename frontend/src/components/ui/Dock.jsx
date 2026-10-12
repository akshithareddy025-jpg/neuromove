import React, { useRef, useState, useEffect } from 'react';
import { LayoutDashboard, Radio, Trophy, Activity, Zap } from 'lucide-react';

/**
 * Dock
 * Intelligent macOS-style floating bottom application dock with distance magnification,
 * auto-hide on scroll-down, reveal on scroll-up / hover / idle, and adaptive light/dark glass.
 * 
 * Solves:
 * - Bug J: No longer constantly covers content; auto-hides while user scrolls through sections.
 * - Bug K: Auto-hides during portal transitions so it never floats alone in empty space.
 * - Bug L: Frees up bottom viewport space for comfortable reading of cards and headings.
 */
export default function Dock({
  activeTab = 'dashboard',
  onTabChange,
  onQuickAction,
  className = '',
}) {
  const dockRef = useRef(null);
  const [mouseX, setMouseX] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const lastScrollY = useRef(0);
  const idleTimer = useRef(null);

  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Playback', icon: Radio },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'explainer', label: 'Signal Explainer', icon: Activity },
    { id: 'quick_test', label: 'Quick Benchmark', icon: Zap, isAction: true },
  ];

  // Auto-hide on scroll down, reveal on scroll up, idle, or bottom hover
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || 0;
        const delta = currentScrollY - lastScrollY.current;

        // Check if currently inside light/pink zone (editorial-white-zone)
        const lightZone = document.querySelector('.editorial-white-zone');
        if (lightZone) {
          const rect = lightZone.getBoundingClientRect();
          const inLight = rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.2;
          setIsLightMode(inLight);
        }

        // Check if currently inside the transition portal track
        const portal = document.querySelector('#neuromove-portal');
        let inPortal = false;
        if (portal) {
          const pRect = portal.getBoundingClientRect();
          inPortal = pRect.top <= 100 && pRect.bottom >= 100;
        }

        if (inPortal) {
          // Hide completely during cinematic transition portal (Bug K fix)
          setIsVisible(false);
        } else if (currentScrollY < 180) {
          // On Hero 1: hide dock to prevent crowding hero CTA buttons & SlideCommit
          setIsVisible(false);
        } else if (delta > 6) {
          // Scrolling down: hide dock completely to give content 100% full viewport clearance (Bug J fix)
          setIsVisible(false);
        } else if (delta < -10) {
          // Scrolling up intentionally: reveal dock
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    };

    // Reveal dock when cursor hovers near the bottom edge (within 60px)
    const handleMouseMoveGlobal = (e) => {
      if (e.clientY > window.innerHeight - 60) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMoveGlobal, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const handlePointerMove = (e) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const handlePointerLeave = () => {
    setMouseX(null);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '22px',
        left: '50%',
        transform: isVisible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(140%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: 90,
        transition: 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease',
      }}
    >
      <div
        ref={dockRef}
        className={`dock-container ${className}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          background: isLightMode
            ? 'rgba(255, 255, 255, 0.92)'
            : 'rgba(15, 15, 20, 0.82)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: '9999px',
          border: isLightMode
            ? '1.5px solid rgba(0, 0, 0, 0.12)'
            : '1px solid rgba(255, 255, 255, 0.16)',
          boxShadow: isLightMode
            ? '0 16px 40px rgba(0, 0, 0, 0.08), 0 4px 14px rgba(167, 216, 245, 0.35)'
            : '0 16px 40px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          // Distance magnification calculation
          let scale = 1;
          if (mouseX !== null) {
            const itemWidth = 44;
            const itemCenter = idx * (itemWidth + 10) + itemWidth / 2 + 16;
            const dist = Math.abs(mouseX - itemCenter);
            const maxDist = 120;
            if (dist < maxDist) {
              scale = 1 + (1 - dist / maxDist) * 0.38; // up to 1.38x
            }
          }

          // Dynamic colors based on theme and active state - strict palette: Baby Blue and Black in light mode
          const btnBg = isActive
            ? (isLightMode ? '#A7D8F5' : 'rgba(255, 255, 255, 0.22)')
            : (isLightMode ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)');

          const btnBorder = isActive
            ? (isLightMode ? '1.5px solid #000000' : '1px solid rgba(255, 255, 255, 0.55)')
            : (isLightMode ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.08)');

          const iconColor = isLightMode
            ? '#000000'
            : (isActive ? '#FFFFFF' : 'var(--text-secondary, #E4E4E7)');

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isAction && onQuickAction) {
                  onQuickAction(item.id);
                } else if (onTabChange) {
                  onTabChange(item.id);
                }
              }}
              className="dock-item"
              title={item.label}
              style={{
                position: 'relative',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: btnBg,
                border: btnBorder,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: iconColor,
                cursor: 'pointer',
                transform: `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 14 : 0}px)`,
                transformOrigin: 'bottom center',
                transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, border-color 0.2s ease',
                boxShadow: isActive
                  ? (isLightMode ? '0 4px 14px rgba(167, 216, 245, 0.6)' : '0 0 16px rgba(255, 255, 255, 0.3)')
                  : 'none',
              }}
            >
              <Icon size={18} />

              {/* Active Dot Indicator */}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-5px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: isLightMode ? '#000000' : '#FFFFFF',
                    boxShadow: isLightMode ? 'none' : '0 0 6px #FFFFFF',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
