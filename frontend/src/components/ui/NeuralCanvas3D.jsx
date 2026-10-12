import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * NeuralCanvas3D
 * Cinematic Three.js 3D Neural Bioelectric Cortex & Scalp Electrode Field for Hero.
 * Renders 64-channel 10-20 electrode nodes, synaptic neural connection geodesics,
 * bioelectric action potential particle pulses, and pointer-reactive 3D parallax.
 */
export default function NeuralCanvas3D({
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020306, 0.0018);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 240;
    camera.position.y = 20;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // 1. Scalp Hemisphere Neural Grid Nodes (Electrodes)
    const nodeCount = 54;
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(1.6, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const motorStripMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });

    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // Distribute nodes over hemisphere
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 85;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = Math.abs(radius * Math.cos(phi)) * 0.85 - 10; // Upper hemisphere
      const z = radius * Math.sin(theta) * Math.sin(phi);

      // Distinguish sensorimotor strip (near y ~ 30, z ~ 0)
      const isMotorStrip = Math.abs(z) < 26 && y > 20;
      const mesh = new THREE.Mesh(nodeGeometry, isMotorStrip ? motorStripMaterial : nodeMaterial);
      mesh.position.set(x, y, z);
      nodeGroup.add(mesh);
      nodes.push({ mesh, x, y, z, isMotorStrip, baseScale: isMotorStrip ? 1.4 : 1.0 });
    }

    // 2. Synaptic Neural Connections (Lines between adjacent nodes)
    const linePositions = [];
    const lineColors = [];
    const connectionPairs = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 38) {
          linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);

          const isHighlight = nodes[i].isMotorStrip && nodes[j].isMotorStrip;
          const c = isHighlight ? new THREE.Color(0xffffff) : new THREE.Color(0x1e3a5f);
          lineColors.push(c.r, c.g, c.b);
          lineColors.push(c.r, c.g, c.b);

          connectionPairs.push({ a: nodes[i], b: nodes[j], dist });
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    nodeGroup.add(lineMesh);

    // 3. Bioelectric Action Potential Particle Pulses
    const pulseCount = 36;
    const pulses = [];
    const pulseGeometry = new THREE.BufferGeometry();
    const pulsePositions = new Float32Array(pulseCount * 3);

    for (let i = 0; i < pulseCount; i++) {
      const pair = connectionPairs[Math.floor(Math.random() * connectionPairs.length)];
      pulses.push({
        pair,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.012,
      });
      pulsePositions[i * 3] = pair.a.x;
      pulsePositions[i * 3 + 1] = pair.a.y;
      pulsePositions[i * 3 + 2] = pair.a.z;
    }

    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 3.5,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
    nodeGroup.add(pulsePoints);

    // 4. Ambient Neural Dust / Bioelectric Field
    const dustCount = 140;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 320;
      dustPositions[i * 3 + 1] = (Math.random() - 0.3) * 220;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 260;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 1.2,
      transparent: true,
      opacity: 0.28,
    });
    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);

    // Mouse parallax tracking
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.35;
      targetRotationX = 0.2 - mouseY * 0.22;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Visibility Observer to pause off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera/group tilt lerp
      nodeGroup.rotation.y += (targetRotationY - nodeGroup.rotation.y) * 0.05 + 0.0015; // Slow ambient orbit
      nodeGroup.rotation.x += (targetRotationX - nodeGroup.rotation.x) * 0.05;

      dustPoints.rotation.y += 0.0004;

      // Update pulse positions
      const posArray = pulseGeometry.attributes.position.array;
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.pair = connectionPairs[Math.floor(Math.random() * connectionPairs.length)];
        }

        const ax = p.pair.a.x;
        const ay = p.pair.a.y;
        const az = p.pair.a.z;
        const bx = p.pair.b.x;
        const by = p.pair.b.y;
        const bz = p.pair.b.z;

        posArray[i * 3] = ax + (bx - ax) * p.progress;
        posArray[i * 3 + 1] = ay + (by - ay) * p.progress;
        posArray[i * 3 + 2] = az + (bz - az) * p.progress;
      }
      pulseGeometry.attributes.position.needsUpdate = true;

      // Subtle breath of motor strip nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (n.isMotorStrip) {
          const s = n.baseScale + Math.sin(time * 3 + i) * 0.25;
          n.mesh.scale.set(s, s, s);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`neural-canvas-3d-wrap ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        ...style,
      }}
    />
  );
}
