import React, { useState } from 'react';
import GatewayFlow from '@/components/ui/gateway-flow';
import DotPattern from '@/components/ui/dot-pattern';
import { Cpu, ShieldCheck, Zap, Sliders, Sun, Moon, Sparkles, Activity, Play } from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton';
import GradientText from '@/components/effects/GradientText';
import ShinyText from '@/components/effects/ShinyText';

export default function GatewayView({ onLaunchLive }) {
  const [speed, setSpeed] = useState(1);
  const [density, setDensity] = useState(1);
  const [strokeWidth, setStrokeWidth] = useState(1.2);
  const [size, setSize] = useState(1);
  const [mode, setMode] = useState('dark');
  const [hue, setHue] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero Header Card with DotPattern Backdrop */}
      <div
        className="card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '40px 32px',
          background: 'linear-gradient(180deg, rgba(16, 16, 20, 0.9) 0%, rgba(8, 8, 10, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <DotPattern
          width={24}
          height={24}
          cx={1}
          cy={1}
          cr={1}
          className="opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,white,transparent)] z-0"
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              marginBottom: '16px',
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#FFFFFF',
            }}
          >
            <Cpu size={14} />
            <span>PRIMARY BCI TELEMETRY GATEWAY</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: '0 0 16px 0',
              lineHeight: 1.15,
            }}
          >
            <GradientText colors={['#FFFFFF', '#D4D4D8', '#A1A1AA', '#FFFFFF']}>
              Nexus Gateway Flow & Uplink
            </GradientText>
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, margin: '0 0 24px 0' }}>
            Interactive high-speed neuromorphic particle canvas and cryptographic operator gateway.
            Simulates real-time 64-channel EEG continuous packet routing from the cortex to MiniRocket inference nodes.
          </p>

          {/* Quick Metrics Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span
              className="mono"
              style={{
                fontSize: '0.76rem',
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Activity size={12} /> PACKET FLOW: 80 BEZIER LINES
            </span>
            <span
              className="mono"
              style={{
                fontSize: '0.76rem',
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Zap size={12} /> PROTOCOL: ZERO-LEAKAGE UPLINK
            </span>
            <span
              className="mono"
              style={{
                fontSize: '0.76rem',
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#FFFFFF',
              }}
            >
              LATENCY: 6.1 MS
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div
        className="card"
        style={{
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          background: 'rgba(12, 12, 16, 0.8)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sliders size={18} color="#FFFFFF" />
          <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFFFFF' }}>
            Particle Flow Knobs
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {/* Speed slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.76rem', color: '#A1A1AA' }}>Speed:</span>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              style={{ width: '90px', accentColor: '#FFFFFF', cursor: 'pointer' }}
            />
            <span className="mono" style={{ fontSize: '0.74rem', color: '#FFFFFF', width: '32px' }}>
              {speed}x
            </span>
          </div>

          {/* Density slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.76rem', color: '#A1A1AA' }}>Density:</span>
            <input
              type="range"
              min="0.4"
              max="2"
              step="0.2"
              value={density}
              onChange={(e) => setDensity(parseFloat(e.target.value))}
              style={{ width: '90px', accentColor: '#FFFFFF', cursor: 'pointer' }}
            />
            <span className="mono" style={{ fontSize: '0.74rem', color: '#FFFFFF', width: '32px' }}>
              {density}x
            </span>
          </div>

          {/* Hue Shift slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.76rem', color: '#A1A1AA' }}>Hue:</span>
            <input
              type="range"
              min="-180"
              max="180"
              step="10"
              value={hue}
              onChange={(e) => setHue(parseInt(e.target.value))}
              style={{ width: '90px', accentColor: '#FFFFFF', cursor: 'pointer' }}
            />
            <span className="mono" style={{ fontSize: '0.74rem', color: '#FFFFFF', width: '32px' }}>
              {hue}°
            </span>
          </div>

          {/* Mode Switch */}
          <button
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '0.76rem',
              fontWeight: 600,
            }}
          >
            {mode === 'dark' ? <Sun size={14} color="#FFFFFF" /> : <Moon size={14} color="#FFFFFF" />}
            <span>{mode === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
          </button>
        </div>
      </div>

      {/* Main GatewayFlow Full Container */}
      <div
        className="card"
        style={{
          position: 'relative',
          height: '640px',
          width: '100%',
          overflow: 'hidden',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          background: '#000000',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
        }}
      >
        <GatewayFlow
          mode={mode}
          speed={speed}
          density={density}
          strokeWidth={strokeWidth}
          size={size}
          hue={hue}
          className="h-full w-full"
        />
      </div>

      {/* Bottom Grid: DotPattern Showcase & Operator Telemetry */}
      <div className="grid-2">
        {/* Dot Pattern Texture Laboratory */}
        <div
          className="card"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '28px',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className="opacity-45 [mask-image:radial-gradient(280px_circle_at_center,white,transparent)] z-0"
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.72rem', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '6px' }}>
              MATHEMATICAL LATTICE
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>
              Vector DotPattern Component
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#A1A1AA', lineHeight: 1.6 }}>
              A lightweight SVG geometric dot pattern with dynamic mask gradients, configurable grid spacing,
              and seamless Tailwind CSS integration. Optimized for scientific dark mode UIs with zero runtime overhead.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
            <span className="mono" style={{ fontSize: '0.72rem', color: '#E4E4E7', background: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: '4px' }}>
              cx=1 cy=1 cr=1
            </span>
            <span className="mono" style={{ fontSize: '0.72rem', color: '#E4E4E7', background: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: '4px' }}>
              width=20 height=20
            </span>
            <span className="mono" style={{ fontSize: '0.72rem', color: '#FFFFFF', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>
              Radial Masked
            </span>
          </div>
        </div>

        {/* Live BCI Telemetry Quick Connect */}
        <div
          className="card"
          style={{
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '0.72rem', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '6px' }}>
              TELEMETRY ACTION
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>
              Ready for Real-Time Brain Decoding?
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#A1A1AA', lineHeight: 1.6 }}>
              Launch the live playback view to stream 64-channel PhysioNet trial buffers through the MiniRocket feature extractor at 163 Hz with instant class probability decoding.
            </p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
            <SpecularButton
              onClick={onLaunchLive}
              variant="primary"
              icon={<Play size={16} fill="#000000" color="#000000" />}
            >
              <span>Launch Live Classification</span>
            </SpecularButton>
          </div>
        </div>
      </div>
    </div>
  );
}
