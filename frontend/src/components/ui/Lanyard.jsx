import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Cpu, Award } from 'lucide-react';

/**
 * Lanyard
 * Interactive physics-based hanging BCI Researcher ID Badge on an elastic cord.
 * The card reacts to mouse dragging, spring kinematics, inertia, and 3D tilt.
 */
export default function Lanyard({
  name = 'NEUROMOVE RESEARCH COHORT',
  id = 'BCI-09741-LEAKAGE-FREE',
  affiliation = 'NeuroImage 328 (2026) · PhysioNet',
  status = 'VERIFIED STRATIFIED',
  isLightMode = false,
  className = '',
  style = {},
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0, a: 0 });

  useEffect(() => {
    let animId;

    const updatePhysics = () => {
      if (!isDragging) {
        // Spring forces pulling back to (0, 0)
        const k = 0.08;
        const damping = 0.88;

        vel.current.x = (vel.current.x - pos.x * k) * damping;
        vel.current.y = (vel.current.y - pos.y * k) * damping;
        vel.current.a = (vel.current.a - angle * 0.06) * 0.86;

        setPos((prev) => ({
          x: Math.abs(prev.x + vel.current.x) < 0.01 ? 0 : prev.x + vel.current.x,
          y: Math.abs(prev.y + vel.current.y) < 0.01 ? 0 : prev.y + vel.current.y,
        }));

        setAngle((prev) => (Math.abs(prev + vel.current.a) < 0.01 ? 0 : prev + vel.current.a));
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [isDragging, pos, angle]);

  const onPointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const newX = Math.max(-120, Math.min(120, e.clientX - dragStart.current.x));
    const newY = Math.max(-20, Math.min(140, e.clientY - dragStart.current.y));

    // Calculate dynamic tilt angle from horizontal drag
    const newAngle = (newX / 120) * 22;

    vel.current.x = newX - pos.x;
    vel.current.y = newY - pos.y;
    vel.current.a = newAngle - angle;

    setPos({ x: newX, y: newY });
    setAngle(newAngle);
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`lanyard-wrapper ${className}`}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        userSelect: 'none',
        perspective: '1000px',
        paddingTop: '8px',
        ...style,
      }}
    >
      {/* Lanyard Top Strap */}
      <svg
        width="160"
        height="70"
        style={{ overflow: 'visible', pointerEvents: 'none' }}
      >
        <path
          d={`M 80,0 Q ${80 + pos.x * 0.4},${35 + pos.y * 0.4} ${80 + pos.x},${65 + pos.y}`}
          fill="none"
          stroke={isLightMode ? 'rgba(244, 114, 182, 0.85)' : 'rgba(255, 255, 255, 0.45)'}
          strokeWidth="3.5"
          strokeDasharray="4 2"
        />
        {/* Metal Lanyard Clip */}
        <circle cx={80 + pos.x} cy={65 + pos.y} r="5" fill={isLightMode ? '#09090b' : '#FFFFFF'} />
      </svg>

      {/* Hanging ID Card */}
      <div
        onPointerDown={onPointerDown}
        style={{
          width: '240px',
          background: isLightMode
            ? 'linear-gradient(145deg, #ffffff 0%, #fdf2f8 50%, #fce7f3 100%)'
            : 'linear-gradient(135deg, rgba(24, 24, 28, 0.98), rgba(10, 10, 14, 0.99))',
          border: isLightMode
            ? '1.5px solid rgba(244, 114, 182, 0.35)'
            : '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '14px',
          padding: '16px',
          boxShadow: isDragging
            ? (isLightMode
              ? '0 30px 60px rgba(244, 114, 182, 0.25), 0 4px 16px rgba(249, 115, 22, 0.12)'
              : '0 24px 48px rgba(0, 0, 0, 0.7), 0 0 20px rgba(56, 189, 248, 0.35)')
            : (isLightMode
              ? '0 18px 40px rgba(244, 114, 182, 0.16), 0 2px 10px rgba(249, 115, 22, 0.08)'
              : '0 12px 32px rgba(0, 0, 0, 0.5)'),
          cursor: isDragging ? 'grabbing' : 'grab',
          transform: `translate3d(${pos.x}px, ${pos.y - 12}px, 0) rotate(${angle}deg) rotateY(${pos.x * 0.15}deg)`,
          transformOrigin: 'top center',
          transition: isDragging ? 'none' : 'box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {/* Clip Hole */}
        <div
          style={{
            width: '28px',
            height: '6px',
            background: isLightMode ? '#09090b' : '#000000',
            borderRadius: '4px',
            margin: '0 auto 12px auto',
            border: isLightMode ? '1px solid rgba(0, 0, 0, 0.15)' : '1px solid rgba(255, 255, 255, 0.2)',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={15} color={isLightMode ? '#ea580c' : '#38bdf8'} />
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: isLightMode ? '#09090b' : '#FFFFFF',
              }}
            >
              NEUROMOVE
            </span>
          </div>
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: '4px',
              background: isLightMode ? '#09090b' : 'rgba(56, 189, 248, 0.15)',
              border: isLightMode ? '1px solid rgba(0, 0, 0, 0.2)' : '1px solid rgba(56, 189, 248, 0.35)',
              color: '#FFFFFF',
            }}
          >
            {status}
          </span>
        </div>

        {/* Shining Black Chip / Avatar */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              background: isLightMode
                ? 'linear-gradient(135deg, #09090b 0%, #27272a 100%)'
                : 'linear-gradient(135deg, #38bdf8, #818cf8, #f472b6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isLightMode
                ? '0 4px 12px rgba(0, 0, 0, 0.25)'
                : '0 0 14px rgba(56, 189, 248, 0.35)',
            }}
          >
            <Award size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: isLightMode ? '#09090b' : '#FFFFFF' }}>{name}</div>
            <div style={{ fontSize: '0.66rem', color: isLightMode ? '#64748b' : 'var(--text-tertiary)', fontFamily: 'monospace' }}>{id}</div>
          </div>
        </div>

        {/* Card Spec Details */}
        <div
          style={{
            background: isLightMode ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.04)',
            border: isLightMode ? '1px solid rgba(244, 114, 182, 0.25)' : 'none',
            borderRadius: '6px',
            padding: '8px 10px',
            fontSize: '0.68rem',
            color: isLightMode ? '#475569' : 'var(--text-secondary)',
            lineHeight: 1.4,
            marginBottom: '10px',
          }}
        >
          <div>{affiliation}</div>
          <div style={{ color: isLightMode ? '#09090b' : '#FFFFFF', fontWeight: 700, marginTop: '2px' }}>
            64-Ch · 109 Subjects · Zero Leakage
          </div>
        </div>

        {/* Footer Barcode */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '14px' }}>
            {[4, 2, 5, 2, 6, 3, 2, 5, 3, 4, 2, 6, 2, 4].map((h, i) => (
              <div
                key={i}
                style={{
                  width: `${(i % 3) + 1}px`,
                  height: `${h * 2.2}px`,
                  background: isLightMode ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.65)',
                }}
              />
            ))}
          </div>
          <ShieldCheck size={14} color={isLightMode ? '#0284c7' : '#38bdf8'} />
        </div>
      </div>
    </div>
  );
}
