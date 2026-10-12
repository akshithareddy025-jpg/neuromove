import React, { useEffect, useRef } from 'react';

/**
 * FlowCanvas
 * High-performance neuromorphic Bezier particle stream canvas.
 * Renders converging cortical pathway tracts with moving quantum data packets
 * and interactive click-perturbation shockwaves.
 */
export default function FlowCanvas({
  numPaths = 80,
  speed = 1,
  lineColor = 'rgba(255, 255, 255, 0.22)',
  particleColor = 'rgba(255, 255, 255, 0.85)',
  lineWidth = 1.1,
  opacity = 0.85,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let explosions = [];
    let inView = true;

    const handleResize = () => {
      const container = containerRef.current || canvas.parentElement;
      const rect = container ? container.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { threshold: 0 })
      : null;
    io?.observe(canvas);

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        explosions.push({
          x,
          y,
          radius: 0,
          life: 1,
        });
      }
    };

    window.addEventListener('click', handleClick);

    // Generate Bezier trajectories
    const paths = [];
    for (let i = 0; i < numPaths; i++) {
      paths.push({
        isLeft: i % 2 === 0,
        startY: (i / numPaths) * height * 1.4 - height * 0.2,
        particles: [
          {
            t: Math.random(),
            speed: (0.0014 + Math.random() * 0.002) * speed,
          },
        ],
      });
    }

    function getBezierPoint(t, p0, p1, p2, p3) {
      const u = 1 - t;
      return {
        x: Math.pow(u, 3) * p0.x + 3 * Math.pow(u, 2) * t * p1.x + 3 * u * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x,
        y: Math.pow(u, 3) * p0.y + 3 * Math.pow(u, 2) * t * p1.y + 3 * u * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y,
      };
    }

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!inView || document.hidden) return;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.45; // slight upper bias to focus behind hero headline

      // Update shockwave explosions
      explosions.forEach((exp) => {
        exp.radius += 14;
        exp.life -= 0.016;
      });
      explosions = explosions.filter((exp) => exp.life > 0);

      // Render trajectories and data packets
      paths.forEach((path) => {
        const p0 = { x: path.isLeft ? 0 : width, y: path.startY };
        const p1 = { x: path.isLeft ? centerX * 0.45 : width - centerX * 0.45, y: path.startY };
        const p2 = { x: path.isLeft ? centerX * 0.82 : width - centerX * 0.82, y: centerY };
        const p3 = { x: centerX, y: centerY };

        // Draw dotted Bezier guide tract
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.setLineDash([1, 5]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animate particles along the curve
        path.particles.forEach((p) => {
          p.t += p.speed;
          if (p.t > 1) {
            p.t = 0;
            path.startY += (Math.random() - 0.5) * 8;
          }

          let pos = getBezierPoint(p.t, p0, p1, p2, p3);
          let dxTotal = 0;
          let dyTotal = 0;

          // Shockwave displacement physics
          explosions.forEach((exp) => {
            const dx = pos.x - exp.x;
            const dy = pos.y - exp.y;
            const dist = Math.hypot(dx, dy);
            if (dist < exp.radius + 110 && dist > exp.radius - 110 && dist > 0) {
              const force = (1 - Math.abs(dist - exp.radius) / 110) * exp.life;
              dxTotal += (dx / dist) * force * 70;
              dyTotal += (dy / dist) * force * 70;
            }
          });

          pos.x += dxTotal;
          pos.y += dyTotal;

          // Glowing quantum packet
          ctx.fillStyle = particleColor;
          ctx.fillRect(pos.x - 1.5, pos.y - 1.5, 3, 3);
        });
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      io?.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, [numPaths, speed, lineColor, particleColor, lineWidth]);

  return (
    <div
      ref={containerRef}
      className={`flow-canvas-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity,
        zIndex: 0,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
      {/* Subtle Dither Overlay Texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.12,
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 2 2\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect width=\"1\" height=\"1\" fill=\"%23ffffff\"/%3E%3Crect x=\"1\" y=\"1\" width=\"1\" height=\"1\" fill=\"%23ffffff\"/%3E%3C/svg%3E')",
          backgroundSize: '2px 2px',
        }}
      />
    </div>
  );
}
