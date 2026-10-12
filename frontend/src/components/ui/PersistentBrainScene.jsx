import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap, isReducedMotion, cappedDPR, getQualityTier } from '../../lib/scrollEngine';
import { SylvaLivingWorldScene } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';

/**
 * PersistentBrainScene
 * Persistent Ambient Neural Environment for NeuroMove Post-Neuromo World.
 * 
 * Layers:
 * 1. BACK: Exact authored SylvaLivingWorldScene (variant: "living-green")
 * 2. MID: Three.js 3D Cortical Particle Point Cloud + Synaptic Neural Lattice
 * 3. FORE-MID: 3D Anatomical Brain Model (/brain_model_3d.png) with Rolandic M1 C3/C4 Hotspots
 * 
 * Scroll Behavior:
 * - Mounted ONCE after NEUROMOVE transition; never unmounts between chapters.
 * - Responds subtly to scroll (Camera Z depth, gentle Y rotation, X tilt, cortical glow).
 * - Zero violent spinning. High performance via shared GSAP ticker.
 */
export default function PersistentBrainScene({
  activeChapter = 0,
  visibilityProgress = 0, // 0 to 1 controls fade-in from NEUROMOVE zoom
  className = '',
  style = {},
}) {
  const mountRef = useRef(null);
  const canvasRef = useRef(null);
  const brainImgRef = useRef(null);
  const [sylvaReady, setSylvaReady] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    if (isReducedMotion()) return undefined;

    let isDisposed = false;
    const tier = getQualityTier();
    const isMobile = window.innerWidth < 768;
    const width = window.innerWidth || 1200;
    const height = window.innerHeight || 800;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 5.8 : 4.8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: tier === 'HIGH',
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(cappedDPR(isMobile ? 1.25 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Ambient & Directional Lights strictly adhering to palette:
    // Deep Maroon #3A0B17, Sky Blue #61D7FF, Yellow #FFD447
    scene.add(new THREE.AmbientLight(0x3A0B17, 0.8));

    const keyLight = new THREE.DirectionalLight(0x61D7FF, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xC6283D, 2.2);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const accentLight = new THREE.DirectionalLight(0xFFD447, 1.8);
    accentLight.position.set(0, -4, 3);
    scene.add(accentLight);

    // =========================================================================
    // 3D NEURAL SYNAPTIC LATTICE (Particle Point Cloud + Synaptic Connections)
    // =========================================================================
    const particleCount = tier === 'LOW' ? 250 : isMobile ? 500 : 900;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Generate cortical brain shape coordinates (two hemispheres)
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + Math.sin(theta * 3.0) * 0.18 + Math.cos(phi * 2.5) * 0.12;

      // Hemispheric separation
      const hemi = Math.random() > 0.5 ? 0.18 : -0.18;
      const x = r * Math.sin(phi) * Math.cos(theta) * 0.95 + hemi;
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.82 + 0.1;
      const z = r * Math.cos(phi) * 1.15;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color distribution: 60% Sky Blue (#61D7FF), 25% Yellow (#FFD447), 15% Deep Maroon/Red
      const randColor = Math.random();
      if (randColor < 0.6) {
        colors[i * 3] = 0.38;     // 61D7FF
        colors[i * 3 + 1] = 0.84;
        colors[i * 3 + 2] = 1.0;
      } else if (randColor < 0.85) {
        colors[i * 3] = 1.0;      // FFD447
        colors[i * 3 + 1] = 0.83;
        colors[i * 3 + 2] = 0.28;
      } else {
        colors[i * 3] = 0.78;     // C6283D
        colors[i * 3 + 1] = 0.16;
        colors[i * 3 + 2] = 0.24;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.058,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const neuralCloud = new THREE.Points(geometry, pMaterial);
    scene.add(neuralCloud);

    // Cortical Dipole Hotspots (C3 & C4 sensorimotor beacons)
    const c3Geo = new THREE.SphereGeometry(0.08, 16, 16);
    const c3Mat = new THREE.MeshBasicMaterial({ color: 0xFFD447, transparent: true, opacity: 0.9 });
    const c3Mesh = new THREE.Mesh(c3Geo, c3Mat);
    c3Mesh.position.set(-0.65, 0.45, 0.3); // Left hemisphere motor cortex
    scene.add(c3Mesh);

    const c4Geo = new THREE.SphereGeometry(0.08, 16, 16);
    const c4Mat = new THREE.MeshBasicMaterial({ color: 0x61D7FF, transparent: true, opacity: 0.9 });
    const c4Mesh = new THREE.Mesh(c4Geo, c4Mat);
    c4Mesh.position.set(0.65, 0.45, 0.3); // Right hemisphere motor cortex
    scene.add(c4Mesh);

    // Resize handler
    const onResize = () => {
      if (isDisposed) return;
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.position.z = w < 768 ? 5.8 : 4.8;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Demand rendering tick on shared GSAP ticker
    let currentScroll = window.scrollY || 0;
    let targetScroll = window.scrollY || 0;
    let pulsePhase = 0;

    const tick = () => {
      if (isDisposed || document.hidden) return;
      targetScroll = window.scrollY || 0;
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Subtle, controlled camera response to scroll (NO violent spinning!)
      const normY = currentScroll * 0.00035;
      neuralCloud.rotation.y = Math.sin(normY) * 0.25;
      neuralCloud.rotation.x = Math.cos(normY * 0.7) * 0.12;

      // Gentle pulsating of C3 and C4 cortical beacons
      pulsePhase += 0.04;
      const pulseScale = 1.0 + Math.sin(pulsePhase) * 0.25;
      c3Mesh.scale.setScalar(pulseScale);
      c4Mesh.scale.setScalar(pulseScale);

      // Camera distance responds slightly to chapter depth
      camera.position.z = (window.innerWidth < 768 ? 5.8 : 4.8) + Math.sin(normY * 0.5) * 0.35;

      renderer.render(scene, camera);
    };

    gsap.ticker.add(tick);

    return () => {
      isDisposed = true;
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      pMaterial.dispose();
      c3Geo.dispose();
      c3Mat.dispose();
      c4Geo.dispose();
      c4Mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`persistent-brain-environment ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1, // Sits directly behind all glass narrative content
        pointerEvents: 'none',
        overflow: 'hidden',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visibilityProgress > 0.02 ? 1 : 0,
        visibility: visibilityProgress > 0.01 ? 'visible' : 'hidden',
        ...style,
      }}
    >
      {/* =======================================================================
          LAYER 1 (BACK): SylvaLivingWorldScene Living Green Environment
          Authored procedural moss-root world with pale flowers, ferns, drifting pollen, scan light, and butterfly
          ======================================================================= */}
      <div
        className="shader-frame"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.85, // Clearly visible living green world
          filter: 'contrast(108%) saturate(115%)',
          pointerEvents: 'none',
        }}
      >
        <SylvaLivingWorldScene variant="living-green" />
      </div>

      {/* =======================================================================
          LAYER 2 (MID-BACK): Deep Maroon & Obsidian Neural Atmosphere Gradient
          Strict Palette: Deep Maroon (#3A0B17), Maroon (#74152F), Sky Blue (#61D7FF)
          ======================================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: `
            radial-gradient(circle 900px at 70% 45%, rgba(58, 11, 23, 0.42) 0%, transparent 70%),
            radial-gradient(circle 750px at 25% 65%, rgba(30, 103, 214, 0.25) 0%, transparent 65%),
            radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(2, 2, 4, 0.55) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* =======================================================================
          LAYER 3 (MID): Three.js Synaptic Lattice & Cortical Particle Cloud Canvas
          ======================================================================= */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* =======================================================================
          LAYER 4 (FORE-MID): Anatomical 3D Brain Anchor (/brain_model_3d.png)
          Centered-right focal point with cortical beacons on Rolandic motor strip
          ======================================================================= */}
      <div
        ref={brainImgRef}
        style={{
          position: 'absolute',
          top: '50%',
          right: '8%',
          transform: 'translateY(-50%)',
          width: 'min(44vw, 560px)',
          aspectRatio: '1 / 1',
          zIndex: 4,
          opacity: 0.68,
          filter: 'drop-shadow(0 20px 48px rgba(58, 11, 23, 0.55)) drop-shadow(0 0 35px rgba(97, 215, 255, 0.3))',
          pointerEvents: 'none',
          transition: 'transform 0.4s ease, opacity 0.4s ease',
        }}
      >
        <img
          src="/brain_model_3d.png"
          alt="3D Anatomical Brain"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />

        {/* Cortical Pulse Beacon: Primary Motor Cortex M1 (C3/C4 Bipolar Area) */}
        <div
          style={{
            position: 'absolute',
            top: '38%',
            left: '42%',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#FFD447',
            boxShadow: '0 0 16px #FFD447, 0 0 32px rgba(97, 215, 255, 0.8)',
            animation: 'pulse 2s infinite',
          }}
        />

        {/* Cortical Pulse Beacon: Supplementary Motor Area (SMA) */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '52%',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#61D7FF',
            boxShadow: '0 0 14px #61D7FF, 0 0 24px rgba(30, 103, 214, 0.7)',
            animation: 'pulse 2.4s infinite',
          }}
        />
      </div>
    </div>
  );
}
