import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Database, BookOpen, Layers, Cpu, Play, Sparkles, Brain } from 'lucide-react';
import LogoLoop from './effects/LogoLoop';
import { scrollToTarget, ScrollTrigger } from '../lib/scrollEngine';

/**
 * Header
 * Floating capsule glass navigation for the NeuroMove unified single-page experience.
 * Smoothly scrolls to target story chapters without page unmounting or state resets.
 */
const FALLBACK_NAV = [
  { id: 'hero', label: 'Overview', target: '#hero' },
  { id: 'story', label: 'Neural Story', target: '#scroll-story-stage' },
  { id: 'cortex', label: 'Motor Cortex', target: '#motor-cortex' },
  { id: 'pipeline', label: 'Pipeline', target: '#causal-pipeline' },
  { id: 'telemetry', label: 'Live Telemetry', target: '#telemetry-instrument' },
  { id: 'validation', label: 'Validation', target: '#validation-proof' },
  { id: 'team', label: 'Team', target: '#research-team' },
];

export default function Header({
  backendHealth,
  backendStatus,
  currentTrial,
  activeSection: controlledSection = null,
  navItems: controlledNav = null,
}) {
  const [internalSection, setInternalSection] = useState('hero');
  // World-aware nav theme: dark glass over the 3D hand world, warm-white
  // glass over Sylva. Colors only — no layout shift, active-tab logic untouched.
  const [world, setWorld] = useState('hand');

  useEffect(() => {
    const el = document.querySelector('#world-b-sylva');
    if (!el) return undefined;

    let st = null;
    try {
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top 80px',
        end: 'bottom 80px',
        onToggle: (self) => setWorld(self.isActive ? 'sylva' : 'hand'),
        onUpdate: (self) => setWorld(self.isActive ? 'sylva' : 'hand'),
      });
      if (st.isActive) setWorld('sylva');
    } catch {
      const io = new IntersectionObserver(
        ([entry]) => setWorld(entry.isIntersecting ? 'sylva' : 'hand'),
        { threshold: 0 }
      );
      io.observe(el);
      return () => io.disconnect();
    }

    return () => {
      if (st) st.kill();
    };
  }, []);

  const navItems = controlledNav || FALLBACK_NAV;
  const activeSection = controlledSection || internalSection;

  // Track scroll position to highlight active section (only when uncontrolled)
  useEffect(() => {
    if (controlledSection) return undefined;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.querySelector(item.target);
        if (el && el.offsetTop <= scrollPos) {
          setInternalSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlledSection, navItems]);

  const handleNavClick = (target, id) => {
    setInternalSection(id);
    scrollToTarget(target, {});
  };

  // Format trial display name - avoid truncation leaks
  const trialDisplayName = currentTrial 
    ? `${currentTrial.dataset_name || 'BCI FEED'}`.split(':')[0] 
    : 'BCI FEED';

  return (
    <header
      className="floating-nav-container"
      style={{
        position: 'sticky',
        top: '0px',
        zIndex: 100,
        maxWidth: '1360px',
        margin: '0 auto 28px auto',
        padding: '16px 16px 12px 16px',
        background: world === 'sylva' ? 'transparent' : '#020204',
        pointerEvents: 'none',
      }}
    >
      <div
        className="floating-nav-pill"
        data-world={world}
        data-theme={world === 'sylva' ? 'sylva' : 'dark'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: world === 'sylva' ? 'rgba(245, 245, 238, 0.88)' : 'rgba(10, 10, 14, 0.95)',
          backdropFilter: world === 'sylva' ? 'blur(18px) saturate(110%)' : 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: world === 'sylva' ? 'blur(18px) saturate(110%)' : 'blur(28px) saturate(180%)',
          border: world === 'sylva' ? '1px solid rgba(255, 255, 255, 0.55)' : '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '9999px',
          boxShadow: world === 'sylva'
            ? '0 12px 40px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            : '0 20px 50px -10px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
          gap: '14px',
          pointerEvents: 'auto',
        }}
      >
        {/* Left: Brand Identity */}
        <div
          onClick={() => handleNavClick('#hero', 'hero')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', paddingLeft: '4px' }}
        >
          <LogoLoop size={28} color={world === 'sylva' ? '#1C2420' : '#FFFFFF'} accentColor={world === 'sylva' ? '#2D6A4F' : '#FFFFFF'} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '1.02rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: world === 'sylva' ? '#1C2420' : '#FFFFFF',
              }}
            >
              NEUROMOVE
            </span>
            <span
              className="mono"
              style={{
                fontSize: '0.66rem',
                padding: '2px 7px',
                borderRadius: '4px',
                background: world === 'sylva' ? 'rgba(45, 106, 79, 0.12)' : 'rgba(97, 215, 255, 0.12)',
                color: world === 'sylva' ? '#1B4332' : '#61D7FF',
                fontWeight: 700,
                border: world === 'sylva' ? '1px solid rgba(45, 106, 79, 0.30)' : '1px solid rgba(97, 215, 255, 0.28)',
              }}
            >
              {backendHealth?.version ? `v${backendHealth.version}` : 'v2.0'}
            </span>
          </div>
        </div>

        {/* Center: Story Chapter Navigation */}
        <nav
          className="nav-tabs-capsule"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            background: world === 'sylva' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(5, 5, 8, 0.6)',
            padding: '3px',
            borderRadius: '9999px',
            border: world === 'sylva' ? '1px solid rgba(28, 36, 32, 0.10)' : '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.target, item.id)}
                className={`nav-tab-pill ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? (world === 'sylva' ? '#1C2420' : '#FFFFFF') : (world === 'sylva' ? '#43514A' : '#A1A1AA'),
                  background: isActive ? (world === 'sylva' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(97, 215, 255, 0.18)') : 'transparent',
                  border: isActive ? (world === 'sylva' ? '1px solid rgba(28, 36, 32, 0.14)' : '1px solid rgba(97, 215, 255, 0.4)') : '1px solid transparent',
                  boxShadow: isActive && world !== 'sylva' ? '0 0 16px rgba(97, 215, 255, 0.25)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Primary Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {currentTrial && (
            <div
              className="mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.70rem',
                padding: '4px 10px',
                borderRadius: '9999px',
                background: world === 'sylva' ? 'rgba(28, 36, 32, 0.06)' : 'rgba(255, 255, 255, 0.06)',
                border: world === 'sylva' ? '1px solid rgba(28, 36, 32, 0.14)' : '1px solid rgba(255, 255, 255, 0.16)',
                color: world === 'sylva' ? '#1C2420' : '#FFFFFF',
              }}
              title={`Active Trial: ${currentTrial.trial_id}`}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: world === 'sylva' ? '#2D6A4F' : '#61D7FF', boxShadow: world === 'sylva' ? '0 0 6px #2D6A4F' : '0 0 6px #61D7FF' }} />
              <span>{trialDisplayName}</span>
            </div>
          )}

          <button
            onClick={() => handleNavClick('#telemetry-instrument', 'telemetry')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '48px',
              padding: '0 20px',
              borderRadius: '9999px',
              background: world === 'sylva' ? '#1C2420' : '#FFFFFF',
              border: world === 'sylva' ? '1px solid #1C2420' : 'none',
              color: world === 'sylva' ? '#FFFFFF' : '#000000',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(20, 35, 24, 0.12)',
              transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            <Play size={12} fill={world === 'sylva' ? '#FFFFFF' : '#000000'} color={world === 'sylva' ? '#FFFFFF' : '#000000'} />
            <span>Launch Live</span>
          </button>
        </div>
      </div>
    </header>
  );
}
