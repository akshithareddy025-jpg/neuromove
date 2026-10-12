import React, { useEffect, useRef, useState } from 'react';

/**
 * ParticleText
 * Bioelectric particle text effect.
 * Renders scientific typography as responsive micro-particles on canvas.
 * Particles disperse when the pointer passes nearby and spring back with neural tension.
 */
export default function ParticleText({
  text = 'NEUROMOVE',
  fontSize = 44,
  fontFamily = 'Inter, sans-serif',
  fontWeight = 800,
  particleColor = '#FFFFFF',
  accentColor = '#FFFFFF',
  density = 3,
  mouseRadius = 60,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [dimensions, setDimensions] = useState({ width: 400, height: 80 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Measure text
    const dpr = window.devicePixelRatio || 1;
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);
    const textWidth = Math.ceil(metrics.width) + 40;
    const textHeight = Math.ceil(fontSize * 1.5) + 20;

    canvas.width = textWidth * dpr;
    canvas.height = textHeight * dpr;
    canvas.style.width = `${textWidth}px`;
    canvas.style.height = `${textHeight}px`;
    setDimensions({ width: textWidth, height: textHeight });

    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, textWidth / 2, textHeight / 2);

    // Sample pixels
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const particles = [];
    const step = density * dpr;

    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3];
        if (alpha > 128) {
          const originX = x / dpr;
          const originY = y / dpr;
          // Random slight offset for organic bioelectric entrance
          particles.push({
            x: originX + (Math.random() - 0.5) * 20,
            y: originY + (Math.random() - 0.5) * 20,
            originX,
            originY,
            vx: 0,
            vy: 0,
            size: Math.random() > 0.85 ? 1.8 : 1.2,
            isAccent: Math.random() > 0.8,
            charge: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, textWidth, textHeight);
      frame += 0.05;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.charge += 0.08;

        // Vector to mouse
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (1 - dist / mouseRadius) * 8;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }

        // Return spring force to origin
        const springDx = p.originX - p.x;
        const springDy = p.originY - p.y;
        p.vx += springDx * 0.08;
        p.vy += springDy * 0.08;

        // Damping
        p.vx *= 0.82;
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        // Micro bioelectric jitter
        const jitterX = Math.sin(p.charge) * 0.3;
        const jitterY = Math.cos(p.charge) * 0.3;

        ctx.fillStyle = p.isAccent ? accentColor : particleColor;
        ctx.beginPath();
        ctx.arc(p.x + jitterX, p.y + jitterY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [text, fontSize, fontFamily, fontWeight, particleColor, accentColor, density, mouseRadius]);

  return (
    <div
      className={`particle-text-container ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        cursor: 'crosshair',
        ...style,
      }}
      role="img"
      aria-label={text}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
}
