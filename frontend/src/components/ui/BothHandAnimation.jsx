"use client";

import React, { useRef, useEffect, useState } from "react";

/**
 * BothHandAnimation — Dual Bilateral Robotic / Bionic Hand Animation
 *
 * Implements the T3 (BLR) Bilateral Hand Kinesthetic Motor Imagery:
 * Simultaneous left & right fist motor imagery desynchronization with
 * articulated bionic digits, neural synaptic arc bridging the hands,
 * contralateral/bilateral Rolandic cortex ERD pulses, and interactive gestures.
 *
 * Props:
 * @param {"footer" | "card"} variant - Visual presentation style
 * @param {boolean} interactive - Allow clicking/hovering to trigger dual fist grasp
 * @param {string} className - Optional container CSS class
 * @param {React.CSSProperties} style - Container styling overrides
 */
export default function BothHandAnimation({
  variant = "footer",
  interactive = true,
  className = "",
  style = {},
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [gesture, setGesture] = useState("flex"); // "flex" | "rest" | "grasp"
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    let inView = true;

    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    ro.observe(container);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    io.observe(container);

    const startTime = performance.now();

    // Finger joint definitions (relative coordinates: [wrist -> knuckle -> pip -> tip])
    const FINGERS = [
      { name: "thumb", base: [-32, 12], joints: [[-46, -6], [-58, -26], [-66, -44]] },
      { name: "index", base: [-16, -28], joints: [[-22, -62], [-24, -92], [-25, -118]] },
      { name: "middle", base: [0, -32], joints: [[0, -68], [0, -102], [0, -132]] },
      { name: "ring", base: [16, -28], joints: [[20, -60], [22, -90], [22, -114]] },
      { name: "pinky", base: [30, -18], joints: [[38, -48], [42, -74], [44, -96]] },
    ];

    function drawBionicHand(centerX, centerY, scale, isLeft, time, curlFactor) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(isLeft ? scale : -scale, scale);

      // Subtle breathing floating motion
      const floatY = Math.sin(time * 2 + (isLeft ? 0 : Math.PI)) * 4;
      ctx.translate(0, floatY);

      // Forearm & Wrist joint
      ctx.strokeStyle = "rgba(97, 215, 255, 0.4)";
      ctx.lineWidth = 2.5;

      // Forearm chassis bars
      ctx.beginPath();
      ctx.moveTo(-18, 90);
      ctx.lineTo(-14, 25);
      ctx.moveTo(18, 90);
      ctx.lineTo(14, 25);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.stroke();

      // Glowing wrist actuator ring
      const wristGlow = ctx.createRadialGradient(0, 20, 2, 0, 20, 26);
      wristGlow.addColorStop(0, "rgba(97, 215, 255, 0.8)");
      wristGlow.addColorStop(0.5, "rgba(30, 103, 214, 0.3)");
      wristGlow.addColorStop(1, "transparent");
      ctx.fillStyle = wristGlow;
      ctx.beginPath();
      ctx.arc(0, 20, 22, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 20, 15, 0, Math.PI * 2);
      ctx.strokeStyle = "#61D7FF";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Palm core chassis
      ctx.beginPath();
      ctx.moveTo(-24, 15);
      ctx.lineTo(-34, -15);
      ctx.lineTo(-20, -32);
      ctx.lineTo(20, -32);
      ctx.lineTo(34, -15);
      ctx.lineTo(24, 15);
      ctx.closePath();
      ctx.fillStyle = "rgba(18, 22, 34, 0.85)";
      ctx.fill();
      ctx.strokeStyle = "rgba(97, 215, 255, 0.6)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Palm central sensory diode
      const diodePulse = (Math.sin(time * 3.5) + 1) * 0.5;
      ctx.beginPath();
      ctx.arc(0, -6, 8, 0, Math.PI * 2);
      ctx.fillStyle = isLeft ? "#61D7FF" : "#FFD447";
      ctx.shadowColor = isLeft ? "#61D7FF" : "#FFD447";
      ctx.shadowBlur = 12 * diodePulse + 4;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw articulated fingers
      FINGERS.forEach((finger, fIdx) => {
        const fingerPhase = time * 2.5 + fIdx * 0.35 + (isLeft ? 0 : 0.8);
        const dynamicCurl = curlFactor * 0.55 + Math.sin(fingerPhase) * 0.18 * curlFactor;

        let [bx, by] = finger.base;
        let prevX = bx;
        let prevY = by;

        // Draw Knuckle node
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        // Connect phalanx segments
        finger.joints.forEach((joint, jIdx) => {
          let [targetX, targetY] = joint;
          // Apply curl rotation toward palm center
          const angleOffset = dynamicCurl * (jIdx + 1) * 0.32;
          const distFromKnuckle = Math.hypot(targetX - bx, targetY - by);
          const origAngle = Math.atan2(targetY - by, targetX - bx);
          const curledAngle = origAngle + (finger.name === "thumb" ? -angleOffset * 0.8 : angleOffset);

          const curX = bx + Math.cos(curledAngle) * distFromKnuckle * (1 - dynamicCurl * 0.15);
          const curY = by + Math.sin(curledAngle) * distFromKnuckle * (1 - dynamicCurl * 0.15);

          // Phalanx bone strut
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(curX, curY);
          ctx.strokeStyle = jIdx === 2 ? "rgba(97, 215, 255, 0.9)" : "rgba(255, 255, 255, 0.65)";
          ctx.lineWidth = 3 - jIdx * 0.6;
          ctx.stroke();

          // Joint node
          ctx.beginPath();
          ctx.arc(curX, curY, jIdx === 2 ? 3 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = jIdx === 2 ? (isLeft ? "#61D7FF" : "#FFD447") : "rgba(255,255,255,0.9)";
          ctx.fill();

          // Fingertip haptic aura
          if (jIdx === 2) {
            ctx.beginPath();
            ctx.arc(curX, curY, 6, 0, Math.PI * 2);
            ctx.fillStyle = isLeft ? "rgba(97, 215, 255, 0.25)" : "rgba(255, 212, 71, 0.25)";
            ctx.fill();
          }

          prevX = curX;
          prevY = curY;
        });
      });

      ctx.restore();
    }

    function render(now) {
      animId = requestAnimationFrame(render);
      if (!inView) return;

      const time = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      const isCard = variant === "card";
      const scale = isCard ? Math.min(width / 420, 0.72) : Math.min(width / 750, 1.05);

      const spacing = isCard ? width * 0.26 : width * 0.28;
      const centerY = isCard ? height * 0.56 : height * 0.52;
      const leftX = width * 0.5 - spacing;
      const rightX = width * 0.5 + spacing;

      // Dynamic grasp level
      const targetCurl = gesture === "grasp" || hovered ? 0.95 : 0.45;
      const currentCurl = targetCurl + Math.sin(time * 2.2) * 0.15;

      // 1. Draw Bilateral Synaptic Bridge Arc between Left & Right Hands
      ctx.save();
      const gradient = ctx.createLinearGradient(leftX, centerY - 60, rightX, centerY - 60);
      gradient.addColorStop(0, "rgba(97, 215, 255, 0.9)");
      gradient.addColorStop(0.5, "rgba(255, 212, 71, 0.9)");
      gradient.addColorStop(1, "rgba(97, 215, 255, 0.9)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = isCard ? 1.5 : 2;
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = -time * 24;

      ctx.beginPath();
      const dipY = centerY - 50 + Math.sin(time * 3) * 16;
      ctx.moveTo(leftX + 45 * scale, centerY - 80 * scale);
      ctx.quadraticCurveTo(width * 0.5, dipY, rightX - 45 * scale, centerY - 80 * scale);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Electrical synaptic sparks along the bridge
      const sparkCount = isCard ? 3 : 6;
      for (let i = 0; i < sparkCount; i++) {
        const t = ((time * 0.4 + i / sparkCount) % 1);
        const bx = leftX + 45 * scale + (rightX - 45 * scale - (leftX + 45 * scale)) * t;
        const by = (1 - t) * (1 - t) * (centerY - 80 * scale) + 2 * (1 - t) * t * dipY + t * t * (centerY - 80 * scale);

        ctx.beginPath();
        ctx.arc(bx, by, isCard ? 2.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "#61D7FF" : "#FFD447";
        ctx.shadowColor = "#61D7FF";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Draw Left Hand (Contralateral C4 activation)
      drawBionicHand(leftX, centerY, scale, true, time, currentCurl);

      // 3. Draw Right Hand (Contralateral C3 activation)
      drawBionicHand(rightX, centerY, scale, false, time, currentCurl);

      // 4. Central Rolandic Cortical Desynchronization Metric Badge
      if (!isCard) {
        ctx.save();
        ctx.font = "700 11px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(97, 215, 255, 0.85)";
        ctx.fillText("BILATERAL MOTOR CORTEX DIPOLE (C3-C4)", width * 0.5, centerY + 90 * scale);
        ctx.font = "500 10px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
        ctx.fillText("T3 INTENT · SYNCHRONOUS FLEXION · 6.1MS FUSION", width * 0.5, centerY + 108 * scale);
        ctx.restore();
      }
    }

    render(performance.now());

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
    };
  }, [variant, gesture, hovered]);

  return (
    <div
      ref={containerRef}
      className={`both-hand-animation-container ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: variant === "card" ? "240px" : "360px",
        overflow: "hidden",
        cursor: interactive ? "pointer" : "default",
        userSelect: "none",
        ...style,
      }}
      onMouseEnter={() => {
        if (interactive) setHovered(true);
      }}
      onMouseLeave={() => {
        if (interactive) setHovered(false);
      }}
      onClick={() => {
        if (interactive) {
          setGesture((g) => (g === "grasp" ? "flex" : "grasp"));
        }
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* Floating HUD status indicator */}
      <div
        style={{
          position: "absolute",
          top: variant === "card" ? "10px" : "16px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px 12px",
          borderRadius: "999px",
          background: "rgba(5, 5, 10, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          fontSize: variant === "card" ? "0.68rem" : "0.74rem",
          fontWeight: 700,
          fontFamily: "monospace",
          letterSpacing: "0.08em",
          color: "#FFFFFF",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: gesture === "grasp" || hovered ? "#FFD447" : "#61D7FF",
            boxShadow: `0 0 8px ${gesture === "grasp" || hovered ? "#FFD447" : "#61D7FF"}`,
          }}
        />
        <span>
          {gesture === "grasp" || hovered
            ? "T3 BILATERAL DUAL-FIST GRASP (97.76% F1)"
            : "T3 DUAL HAND SYNCHRONICITY ACTIVE"}
        </span>
      </div>
    </div>
  );
}
