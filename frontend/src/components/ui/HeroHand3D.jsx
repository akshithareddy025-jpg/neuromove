import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap, isReducedMotion, cappedDPR, getQualityTier } from '../../lib/scrollEngine';

/**
 * HeroHand3D — scroll-scrubbed bionic hand, demand-rendered.
 * 
 * CRITICAL CHANGE: This component now respects the activeSection prop from App.jsx.
 * It only mounts and runs its ticker loop when Hero 1 is the active section.
 * When another section is active, it unmounts and fully disposes Three.js resources
 * to prevent leakage into Hero 2 or other sections.
 * 
 * - Single gsap.ticker loop (unified clock), no own RAF chain.
 * - Renders only when scroll changes / visible / !document.hidden.
 * - DPR capped (1.5 desktop, 1.25 mobile, 1 LOW). No shadow maps, no postprocessing.
 * - Shared geometry/material discipline: disposes env + renderer on unmount.
 * - WHEN activeSection !== 'hero1': this component returns null and disposes ALL resources.
 */
export default function HeroHand3D({ className = '', style = {}, progress = 0, activeSection = 'hero1' }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    // If we're not on Hero 1, immediately return (will unmount).
    // The cleanup function will dispose Three.js resources.
    if (activeSection !== 'hero1') {
      return undefined;
    }

    const container = mountRef.current;
    if (!container) return;
    if (isReducedMotion()) { setLoading(false); return undefined; }

    let isDisposed = false;
    const tier = getQualityTier();
    const isMobile = (document.documentElement.clientWidth || window.innerWidth) < 768;
    const width = document.documentElement.clientWidth || window.innerWidth || 1200;
    const height = window.innerHeight || 800;

    const scene = new THREE.Scene();
    let baseCameraZ = isMobile ? 5.3 : 4.6;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.05, baseCameraZ);

    const renderer = new THREE.WebGLRenderer({
      alpha: true, antialias: tier === 'HIGH', powerPreference: 'high-performance', preserveDrawingBuffer: false,
    });
    const dprCap = tier === 'LOW' ? 1 : isMobile ? 1.25 : 1.5;
    renderer.setSize(width, height);
    renderer.setPixelRatio(cappedDPR(dprCap));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.maxWidth = '100%';
    container.appendChild(renderer.domElement);

    // Lightweight studio env (no per-frame cost)
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    envScene.add(new THREE.Mesh(new THREE.SphereGeometry(15, 16, 12), new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide })));
    const strip = (w, h, color, x, y, z) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color }));
      m.position.set(x, y, z); m.lookAt(0, 0, 0); envScene.add(m);
    };
    strip(8, 16, 0x00f5ff, 7, 4, 3);
    strip(6, 14, 0x00d4ff, -7, 2, -2);
    strip(12, 4, 0xe2e8f0, 0, 9, 3);
    const envMap = pmrem.fromScene(envScene).texture;
    scene.environment = envMap;

    scene.add(new THREE.AmbientLight(0x020408, 0.4));
    const add = (color, i, x, y, z) => { const l = new THREE.DirectionalLight(color, i); l.position.set(x, y, z); scene.add(l); };
    add(0xe2e8f0, 2.0, 2.5, 3.8, 4.2);
    add(0x00f5ff, 8.5, 5.2, 2.6, -3.2);
    add(0x00d4ff, 7.0, -5.2, 1.8, -3.0);
    add(0x38bdf8, 5.5, 0, 6.0, -3.5);
    add(0x00f5ff, 4.5, 0.5, -4.5, -2.5);

    const rootGroup = new THREE.Group();
    const pivotGroup = new THREE.Group();
    rootGroup.add(pivotGroup); scene.add(rootGroup);
    const initX = 0.08, initY = 0.25, initZ = -0.02;
    pivotGroup.rotation.set(initX, initY, initZ);

    let mixer = null, rollAction = null, animDuration = 4.2333, hasModel = false, baseScale = 1;
    const loader = new GLTFLoader();
    loader.load('/models/hand_gunmetal_roll_4.2s_fixed_color.glb',
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.set(-center.x, -center.y + 0.12, -center.z);
        const vFov = THREE.MathUtils.degToRad(38);
        const visH = 2 * Math.tan(vFov / 2) * baseCameraZ;
        baseScale = (visH * (isMobile ? 0.7 : 0.84)) / (size.y || 1);
        pivotGroup.scale.setScalar(baseScale);
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false; child.receiveShadow = false;
            if (child.material) {
              child.material.metalness = 0.96; child.material.roughness = 0.24;
              child.material.envMapIntensity = 1.5; child.material.needsUpdate = true;
            }
          }
        });
        if (gltf.animations?.length) {
          mixer = new THREE.AnimationMixer(model);
          rollAction = mixer.clipAction(gltf.animations[0]);
          rollAction.play(); rollAction.paused = true; mixer.setTime(0);
        }
        pivotGroup.add(model); hasModel = true; setLoading(false);
        needsRender = true;
      },
      undefined,
      (err) => { if (!isDisposed) { setLoadError(err?.message || 'Model failed to load'); setLoading(false); } }
    );

    // Visibility gate — pause all work offscreen
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) needsRender = true; }, { threshold: 0 });
    io.observe(container);

    const onResize = () => {
      if (isDisposed) return;
      const w = document.documentElement.clientWidth || window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      baseCameraZ = w < 768 ? 5.3 : 4.6;
      camera.position.z = baseCameraZ; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(cappedDPR(w < 768 ? 1.25 : 1.5));
      needsRender = true;
    };
    window.addEventListener('resize', onResize);

    // Demand-render loop on the SHARED gsap ticker (no independent RAF).
    // Scroll drives a full cinematic 3D pass: the hand turns ~137° across the
    // hero, leans in mid-scroll, dollies slightly closer, and rolls its fingers
    // from open to closed — all eased through one smoothed hero progress value.
    let current = window.scrollY || 0, last = -1, needsRender = true, firstFrame = true;
    let smoothHp = 0, lastHp = -1;
    const tick = () => {
      if (isDisposed || !visible || document.hidden) return;

      const p = progressRef.current || 0;
      // Hand-first sequencing: hand stays 100% visible through hero + team
      // (portal p = 0) and completes its fade BEFORE the NEUROMOVE zoom ramps
      // (zoom now starts at portal p = 0.30). Fade 0.15 -> 0.35, then hidden.
      const handOpacity = p <= 0.15 ? 1 : Math.max(0, 1 - (p - 0.15) / 0.2);
      const isVisibleState = handOpacity > 0.005;

      if (!isVisibleState) {
        if (container.style.visibility !== 'hidden') {
          container.style.opacity = '0';
          container.style.visibility = 'hidden';
        }
        return; // Zero GPU / render cost when hidden!
      }

      const target = window.scrollY || 0;
      const diff = target - current;
      current += diff * 0.18; // single fast interpolation for 3D only
      // Normalized hand progress 0 → 1 across hero → portal start (robust to
      // Lenis). The full 3D turn + finger roll now unfold continuously right
      // up to the NEUROMOVE zoom instead of finishing inside the first screen.
      const heroEl = document.getElementById('hero');
      const portalEl = document.getElementById('neuromove-portal');
      const heroTop = heroEl?.offsetTop || 0;
      const portalTop = portalEl ? portalEl.offsetTop : ((heroEl?.offsetHeight || window.innerHeight * 2) + heroTop);
      const range = Math.max(1, portalTop - heroTop - window.innerHeight * 0.5);
      const hpTarget = Math.min(1, Math.max(0, (target - heroTop) / range));
      smoothHp += (hpTarget - smoothHp) * 0.12;
      const hp = smoothHp;
      const moved = Math.abs(diff) > 0.05 || Math.abs(current - last) > 0.05 || Math.abs(hp - (lastHp ?? -1)) > 0.0005 || firstFrame || needsRender;
      if (!moved || !hasModel) return;
      last = current; lastHp = hp; firstFrame = false; needsRender = false;
      pivotGroup.rotation.set(
        initX + Math.sin(hp * Math.PI) * 0.18,
        initY + hp * 2.4,
        initZ + hp * 0.12
      );
      pivotGroup.scale.setScalar(baseScale * (1 + hp * 0.12));
      if (mixer && rollAction && animDuration > 0) mixer.setTime(hp * animDuration);

      container.style.visibility = 'visible';
      container.style.opacity = String(handOpacity);
      container.style.transform = `scale(${0.88 + 0.12 * handOpacity}) translateY(${(1 - handOpacity) * 35}px)`;
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    return () => {
      isDisposed = true;
      gsap.ticker.remove(tick);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      pmrem.dispose(); envMap.dispose();
      renderer.dispose();
      renderer.domElement.parentNode?.removeChild(renderer.domElement);
    };
  }, [activeSection]); // <-- RE-DEPEND on activeSection so effect re-runs when section changes

  // Inactive section: render nothing (effect cleanup above disposes Three.js).
  // Placed after all hooks so hook order stays stable across renders.
  if (activeSection !== 'hero1') return null;

  return (
    <div
      ref={mountRef}
      className={`hero-hand-3d-fixed-background ${className}`}
      style={{
        // Hand-first sequencing: fixed viewport backdrop so the hand persists
        // across hero + team and only yields right before the NEUROMOVE portal
        // zoom (portal p ~0.15-0.35). Content (zIndex 10) scrolls over it;
        // portal (zIndex 15) takes over after. Hidden state costs zero GPU.
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        maxWidth: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        opacity: loading ? 0 : 1,
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity',
        ...style,
      }}
    >
      {loadError && (
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '6px 14px', fontSize: '0.75rem', color: '#F87171', fontFamily: 'var(--font-mono)' }}>
          GLB Telemetry: {loadError}
        </div>
      )}
    </div>
  );
}
