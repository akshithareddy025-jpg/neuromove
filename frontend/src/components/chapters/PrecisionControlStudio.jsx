"use client";

import React, { useState } from 'react';
import MetricChip from '../glass/MetricChip';
import MorphSlider from '../ui/MorphSlider';
import ThoughtLine from '../ui/ThoughtLine';
import SlingButton from '../ui/SlingButton';
import SwipeToast from '../ui/SwipeToast';
import GlideSelect from '../ui/GlideSelect';
import CometDial from '../ui/CometDial';
import ParallaxComponent from '../ui/parallax-scrolling';
import { Sparkles, Sliders, Zap, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

const SLIDER_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1600&auto=format&fit=crop',
    caption: 'Kinesthetic Cortex Dipole (8-30 Hz ERD)'
  },
  {
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    caption: 'MiniRocket 10,000 Convolutional Kernels'
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop',
    caption: '5-DOF Robotic Orthosis Real-Time Actuation'
  },
  {
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1600&auto=format&fit=crop',
    caption: 'PhysioNet 109-Subject Stratified Cohort'
  }
];

const MODEL_OPTIONS = [
  { value: 'minirocket', label: 'MiniRocket (97.41%)', tag: '6.1ms' },
  { value: 'cnn-lstm', label: 'CNN-LSTM (97.16%)', tag: '2.15ms' },
  { value: 'ensemble', label: 'Dual Fusion (98.20%)', tag: 'Optimal' },
  { value: 'raw-eeg', label: 'Zero-Phase DSP', tag: '0.00 rad' }
];

export default function PrecisionControlStudio({ className = '', style = {} }) {
  const [selectedModel, setSelectedModel] = useState('minirocket');
  const [threshold, setThreshold] = useState(78);
  const [isClassifying, setIsClassifying] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastData, setToastData] = useState({ title: '', desc: '' });

  const handleLaunchBurst = () => {
    setIsClassifying(true);
    setTimeout(() => {
      setIsClassifying(false);
      setToastData({
        title: 'Neural Intent Decoded: T3 (Both Hands)',
        desc: `Classified via ${selectedModel.toUpperCase()} at ${threshold}% confidence threshold (6.1ms latency).`
      });
      setToastOpen(true);
    }, 1800);
  };

  return (
    <section
      id="precision-studio"
      className={`precision-control-studio ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        marginBottom: '84px',
        ...style
      }}
    >
      {/* Chapter Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <MetricChip label="PRECISION STUDIO" color="skyblue" />
        <span
          style={{
            fontSize: '0.76rem',
            color: '#A1A1AA',
            fontFamily: 'monospace',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          INTERACTIVE BCI TELEMETRY & MORPH CONTROLS
        </span>
      </div>

      <div style={{ maxWidth: '840px', marginBottom: '36px' }}>
        <h2
          style={{
            fontSize: 'clamp(2.0rem, 3.8vw, 3.0rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.15,
            letterSpacing: '-0.035em',
            margin: '0 0 14px 0'
          }}
        >
          Precision Controls & GPU Morph Studio
        </h2>
        <p style={{ fontSize: '1.02rem', color: '#D4D4D8', lineHeight: 1.68, margin: 0, fontWeight: 400 }}>
          Directly interact with the complete suite of tactile cybernetic instrumentation: GPU displacement morphing, live
          cognitive thought reasoning trace, slingshot neural impulse firing, and comet sensitivity dials.
        </p>
      </div>

      {/* Grid Layout: Left Column = MorphSlider & Parallax, Right Column = Interactive BCI Controls */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          alignItems: 'stretch'
        }}
      >
        {/* PANEL 1: GPU Displacement MorphSlider */}
        <div
          style={{
            padding: '24px',
            borderRadius: '24px',
            background: 'rgba(12, 14, 20, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#61D7FF',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              GPU Morph Displacement (OGL + GSAP)
            </span>
            <span style={{ fontSize: '0.72rem', color: '#A1A1AA', fontFamily: 'monospace' }}>DRAG OR SLIDE</span>
          </div>

          <div
            style={{
              height: '340px',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <MorphSlider
              items={SLIDER_ITEMS}
              transition="melt"
              intensity={0.55}
              aberration={0.35}
              drift={0.4}
              autoplay={true}
              autoplayDelay={4}
              radius={16}
            />
          </div>

          <p style={{ margin: 0, fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
            Real-time WebGL displacement shader morphs between high-resolution cortical sensory imagery and hardware orthosis states with chromatic aberration.
          </p>
        </div>

        {/* PANEL 2: Interactive Tactile BCI Telemetry Lab */}
        <div
          style={{
            padding: '24px',
            borderRadius: '24px',
            background: 'rgba(12, 14, 20, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'space-between'
          }}
        >
          {/* Top Section: Model Selector & Thought Trace */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#FFD447',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                Inference Protocol & Cognitive Trace
              </span>
              <GlideSelect
                options={MODEL_OPTIONS}
                value={selectedModel}
                onChange={(val) => setSelectedModel(val)}
                surfaceColor="#181822"
                highlightColor="#262838"
                accentColor="#61D7FF"
                textColor="#FFFFFF"
                size="sm"
              />
            </div>

            {/* ThoughtLine Component */}
            <div
              style={{
                padding: '16px 18px',
                borderRadius: '16px',
                background: 'rgba(20, 24, 34, 0.7)',
                border: '1px solid rgba(97, 215, 255, 0.2)',
                marginBottom: '16px'
              }}
            >
              <ThoughtLine
                working={isClassifying}
                steps={[
                  'Filtering scalp EEG across 8-30 Hz mu/beta bands',
                  'Generating 10,000 PPV & max convolutional features',
                  'Resolving dual-form L2 regularized hyperplane',
                  'Actuating bilateral somatic 5-DOF robotic orthosis'
                ]}
                label={isClassifying ? 'Decoding Rolandic Motor Imagery...' : 'BCI Telemetry Standby'}
                doneLabel="Neural Intent Settled"
                color="#61D7FF"
                glyphColor="#FFD447"
                fontSize={14}
                breathPeriod={1.5}
                showTimer={true}
              />
            </div>
          </div>

          {/* Middle Section: Comet Dial & Slingshot Trigger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '20px',
              padding: '16px 10px',
              background: 'rgba(10, 12, 18, 0.5)',
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            {/* Comet Dial for Confidence Threshold */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <CometDial
                defaultValue={threshold}
                min={50}
                max={99}
                step={1}
                unit="%"
                size={140}
                thickness={4}
                accent="#61D7FF"
                ink="#FFFFFF"
                onChange={(val) => setThreshold(val)}
              />
              <span style={{ fontSize: '0.70rem', color: '#A1A1AA', fontFamily: 'monospace', fontWeight: 600 }}>
                DECISION THRESHOLD
              </span>
            </div>

            {/* Sling Button to Fire Neural Pulse */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <SlingButton
                size={58}
                onSend={handleLaunchBurst}
                padColor="#61D7FF"
                iconColor="#020204"
                accentColor="#FFD447"
                wellColor="#121622"
                bandColor="#1E67D6"
                flight={100}
                particles={16}
              />
              <span style={{ fontSize: '0.70rem', color: '#A1A1AA', fontFamily: 'monospace', fontWeight: 600 }}>
                PULL & RELEASE TO SEND
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.76rem', color: '#71717A', fontFamily: 'monospace' }}>
            <Activity size={14} color="#61D7FF" />
            <span>Dual-model latency: 6.1ms · 0% data leakage · 109 subjects</span>
          </div>
        </div>
      </div>

      {/* Swipeable Toast Confirmation */}
      <SwipeToast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        title={toastData.title}
        description={toastData.desc}
        background="#0F172A"
        color="#F8FAFC"
        fuseColor="#61D7FF"
        duration={4500}
        closeButton={true}
        actionLabel="Dismiss"
        onAction={() => setToastOpen(false)}
      />
    </section>
  );
}
