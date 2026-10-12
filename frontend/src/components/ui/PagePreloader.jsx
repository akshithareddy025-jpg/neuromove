"use client";

import React, { useState, useEffect, useRef } from "react";
import DitherReveal from "./DitherReveal";

/**
 * PagePreloader — Slick, Fully-Customizable BCI Page Preloader
 * Powered by Dither Reveal (Originkit WebGL Dithering).
 *
 * Fully Customizable Settings:
 * @param {number} duration - Milliseconds to complete the pre-loader loading sequence (default: 2400)
 * @param {"curtain-split" | "curtain-up" | "fade-blur" | "zoom-out"} hideAnimation - Style of exit animation (default: "curtain-split")
 * @param {string} copy - Primary loading copy text (default: "INITIALIZING NEUROMOVE...")
 * @param {string} subCopy - Secondary descriptive copy (default: "Calibrating 64-Channel EEG Stream · 109 Subjects · Zero-Leakage")
 * @param {object} ditherProps - Custom props to override the DitherReveal WebGL background
 * @param {boolean} showOnce - Only display once per session (default: false)
 * @param {() => void} onComplete - Callback executed once hide animation finishes
 */
export default function PagePreloader({
  duration = 2400,
  hideAnimation = "curtain-split",
  copy = "INITIALIZING NEUROMOVE...",
  subCopy = "Zero-Leakage PhysioNet Benchmark · 6.1ms Dual-Model Pipeline",
  ditherProps = {},
  showOnce = false,
  onComplete = null,
}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // "loading" | "hiding" | "complete"
  const containerRef = useRef(null);

  useEffect(() => {
    if (showOnce && typeof window !== "undefined") {
      if (sessionStorage.getItem("neuromove_preloaded")) {
        setPhase("complete");
        onComplete?.();
        return;
      }
      sessionStorage.setItem("neuromove_preloaded", "true");
    }

    const startTime = performance.now();
    let rafId = 0;

    const tick = (now) => {
      const elapsed = now - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawPct);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setPhase("hiding");
          setTimeout(() => {
            setPhase("complete");
            onComplete?.();
          }, 700);
        }, 250);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [duration, showOnce, onComplete]);

  if (phase === "complete") return null;

  // Custom code animation classes based on hideAnimation setting
  const getHideStyle = () => {
    if (phase !== "hiding") return {};
    switch (hideAnimation) {
      case "curtain-up":
        return {
          transform: "translateY(-100%)",
          opacity: 0.95,
          transition: "transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
        };
      case "fade-blur":
        return {
          opacity: 0,
          filter: "blur(20px)",
          transform: "scale(1.05)",
          transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
        };
      case "zoom-out":
        return {
          opacity: 0,
          transform: "scale(0.85)",
          filter: "blur(12px)",
          transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
        };
      case "curtain-split":
      default:
        return {
          opacity: 0,
          transform: "scale(1.03)",
          filter: "blur(8px)",
          transition: "all 0.65s cubic-bezier(0.23, 1, 0.32, 1)",
        };
    }
  };

  return (
    <div
      ref={containerRef}
      className="neuromove-page-preloader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "#020204",
        color: "#F4F4F5",
        fontFamily: "inherit", // Inherits typography from body all pages tag
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: phase === "hiding" ? "none" : "auto",
        ...getHideStyle(),
      }}
    >
      {/* Interactive Dither Reveal WebGL Canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          opacity: 0.72,
        }}
      >
        <DitherReveal
          fit="cover"
          ditherStyle="bayer8"
          dotSize={4.5}
          revealRadius={140}
          revealSoftness={60}
          wave={true}
          waveSpeed={75}
          waveDensity={22}
          {...ditherProps}
        />
      </div>

      {/* Cybernetic Glass Vignette Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "radial-gradient(circle at center, rgba(2,2,4,0.35) 0%, rgba(2,2,4,0.88) 75%, #020204 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Center Preloader Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "560px",
          width: "90%",
          padding: "36px 32px",
          borderRadius: "20px",
          background: "rgba(10, 10, 14, 0.65)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* Animated Brand Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 14px",
            borderRadius: "999px",
            background: "rgba(97, 215, 255, 0.10)",
            border: "1px solid rgba(97, 215, 255, 0.35)",
            fontSize: "0.72rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#61D7FF",
            fontFamily: "monospace",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#61D7FF",
              boxShadow: "0 0 8px #61D7FF",
              display: "inline-block",
            }}
          />
          NEUROMOVE SYSTEM LOAD
        </div>

        {/* Dynamic Copy Header */}
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(1.4rem, 3.2vw, 1.9rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            fontFamily: "inherit",
          }}
        >
          {copy}
        </h2>

        {/* Sub Copy */}
        <p
          style={{
            margin: 0,
            fontSize: "0.86rem",
            color: "#A1A1AA",
            lineHeight: 1.5,
            fontFamily: "inherit",
          }}
        >
          {subCopy}
        </p>

        {/* Progress Bar Container */}
        <div
          style={{
            width: "100%",
            height: "5px",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.08)",
            overflow: "hidden",
            position: "relative",
            margin: "8px 0 4px 0",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #1E67D6 0%, #61D7FF 50%, #FFD447 100%)",
              borderRadius: "999px",
              boxShadow: "0 0 14px rgba(97, 215, 255, 0.6)",
              transition: "width 0.12s linear",
            }}
          />
        </div>

        {/* Metric Readout & Hint */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: "0.74rem",
            color: "#71717A",
            fontFamily: "monospace",
            fontWeight: 600,
          }}
        >
          <span>HOVER MOUSE TO REVEAL DITHER MATRIX</span>
          <span style={{ color: "#61D7FF", fontVariantNumeric: "tabular-nums" }}>
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
