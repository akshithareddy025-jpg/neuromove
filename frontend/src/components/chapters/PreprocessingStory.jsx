import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, isReducedMotion } from '../../lib/scrollEngine';

const stages = [
  ['Motor intention', 'The sequence opens at the brain: motor imagery creates an observable sensorimotor rhythm.'],
  ['Scalp acquisition', 'A 64-channel EEG capture records the weak signal at the scalp.'],
  ['Band-pass filtering', 'A fourth-order, zero-phase Butterworth filter isolates the 8–30 Hz sensorimotor band.'],
  ['Spatial fusion', 'Five bipolar motor-cortex pairs suppress shared reference noise while retaining local contrast.'],
  ['Feature representation', 'The cleaned time-series becomes a compact representation ready for classification.'],
  ['Command output', 'The decoded intent is translated into a visible hand movement or output class.'],
];

export default function PreprocessingStory() {
  const root = useRef(null);
  const canvas = useRef(null);
  const images = useRef([]);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    images.current = Array.from({ length: 300 }, (_, index) => {
      const image = new Image();
      image.src = `/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
      return image;
    });
    const draw = (frame) => {
      const node = canvas.current;
      if (!node) return;
      const ratio = window.devicePixelRatio > 1.5 ? 1.5 : window.devicePixelRatio || 1;
      const width = node.clientWidth;
      const height = node.clientHeight;
      if (!width || !height) return;
      if (node.width !== Math.round(width * ratio) || node.height !== Math.round(height * ratio)) {
        node.width = Math.round(width * ratio); node.height = Math.round(height * ratio);
      }
      const context = node.getContext('2d');
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const image = images.current[Math.min(299, Math.max(0, frame))];
      if (!image || !image.complete || !image.naturalWidth) {
        // Never leave the visual blank: paint the chassis grid until frames arrive.
        context.fillStyle = '#f5f5ee';
        context.fillRect(0, 0, width, height);
        context.strokeStyle = 'rgba(28, 36, 32, 0.08)';
        context.lineWidth = 1;
        for (let x = 0; x < width; x += 32) {
          context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
        }
        for (let y = 0; y < height; y += 32) {
          context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
        }
        return;
      }
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
      context.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
    };
    const currentFrameRef = { current: 0 };
    const first = images.current[0];
    const paintFirst = () => { if (!cancelled) { draw(0); try { ScrollTrigger.refresh(); } catch { /* noop */ } } };
    if (first.complete) paintFirst();
    else first.onload = paintFirst;
    first.onerror = paintFirst;

    const handleResize = () => {
      if (cancelled) return;
      draw(currentFrameRef.current);
      try { ScrollTrigger.refresh(); } catch { /* noop */ }
    };
    window.addEventListener('resize', handleResize);

    if (isReducedMotion()) return () => { cancelled = true; window.removeEventListener('resize', handleResize); };
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          const frame = Math.round(progress * 299);
          currentFrameRef.current = frame;
          draw(frame);
          setStage(Math.min(stages.length - 1, Math.floor(progress * stages.length)));
        },
      });
    }, root);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      context.revert();
    };
  }, []);

  return <section ref={root} id="preprocessing-story" className="preprocessing-story">
    <div className="preprocessing-sticky">
      <div className="frame-panel"><canvas ref={canvas} aria-label="Brain signal to hand movement frame sequence" /><div className="frame-label">SCROLL-SCRUBBED / {String(stage + 1).padStart(2, '0')}</div></div>
      <div className="preprocessing-copy"><p className="story-kicker">03 / Preprocessing</p><h2>One signal. Six deliberate transformations.</h2>
        {stages.map(([title, description], index) => <article key={title} className={index === stage ? 'active' : ''}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
      </div>
    </div>
  </section>;
}
