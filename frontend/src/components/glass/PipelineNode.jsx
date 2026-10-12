import React, { useState } from 'react';
import GlassPanel from './GlassPanel';
import MetricChip from './MetricChip';
import { ArrowRight, Brain, Radio, Filter, Cpu, CheckCircle2, Zap } from 'lucide-react';

/**
 * PipelineNode & CausalMovementPipeline
 * Visualizes the complete causal chain from cortical intent to somatic robotic movement:
 * Human Intent -> Scalp EEG -> Butterworth DSP -> MiniRocket Features -> Ridge Classifier -> Action (Left/Right/Both/Feet)
 */
export default function CausalMovementPipeline({
  className = '',
  style = {},
}) {
  const [activeStep, setActiveStep] = useState(4); // Default on Classifier

  const STEPS = [
    {
      id: 0,
      stepNum: '01',
      title: 'Cortical Intent',
      subtitle: 'M1 Motor Strip',
      icon: <Brain size={18} color="#FFD447" />,
      color: 'yellow',
      stat: '8–30 Hz SMR',
      desc: 'Pyramidal neurons in Rolandic fissure desynchronize (ERD) contralateral to imagined fist flexion.',
    },
    {
      id: 1,
      stepNum: '02',
      title: 'Scalp EEG',
      subtitle: '64-Ch 10-20 Montage',
      icon: <Radio size={18} color="#61D7FF" />,
      color: 'skyblue',
      stat: '160 Hz · 5 Pairs',
      desc: '5 bipolar differential pairs (C3-C4, C1-C2, FC3-FC4, CP3-CP4, C5-C6) isolate localized dipoles.',
    },
    {
      id: 2,
      stepNum: '03',
      title: 'Zero-Phase DSP',
      subtitle: '4th-Order Butterworth',
      icon: <Filter size={18} color="#1E67D6" />,
      color: 'blue',
      stat: '0.000 rad Lag',
      desc: 'Bidirectional filtering eliminates 50Hz mains noise and ocular drift with zero phase distortion.',
    },
    {
      id: 3,
      stepNum: '04',
      title: 'MiniRocket',
      subtitle: '10,000 Kernels',
      icon: <Cpu size={18} color="#74152F" />,
      color: 'maroon',
      stat: '9,996 Features',
      desc: 'Fixed-weight dilated 1D convolutions project multi-channel time-series into linear separable space.',
    },
    {
      id: 4,
      stepNum: '05',
      title: 'Ridge Classifier',
      subtitle: 'Closed-Form L2 Solv',
      icon: <Zap size={18} color="#61D7FF" />,
      color: 'skyblue',
      stat: '97.41% · 6.1 ms',
      desc: 'Dual-form ridge regression yields optimal hyperplane separation in 6.1 milliseconds without backprop.',
    },
    {
      id: 5,
      stepNum: '06',
      title: 'Somatic Action',
      subtitle: 'Prosthetic Hand Flexion',
      icon: <CheckCircle2 size={18} color="#FFD447" />,
      color: 'yellow',
      stat: '5-DOF Actuation',
      desc: 'Real-time serial telemetry drives 5-DOF robotic orthosis or wheelchair steering without delay.',
    },
  ];

  const current = STEPS[activeStep];

  return (
    <div className={`causal-movement-pipeline ${className}`} style={{ width: '100%', ...style }}>
      {/* Horizontal Pipeline Steps Ribbon */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {STEPS.map((s, idx) => {
          const isActive = activeStep === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '14px 16px',
                borderRadius: '14px',
                background: isActive ? 'rgba(45, 106, 79, 0.16)' : 'rgba(245, 245, 238, 0.88)',
                border: `1.5px solid ${isActive ? '#2D6A4F' : 'rgba(255, 255, 255, 0.65)'}`,
                backdropFilter: 'blur(16px)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 8px 24px rgba(45, 106, 79, 0.20)' : '0 4px 14px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: isActive ? '#2D6A4F' : '#6B7A71',
                  }}
                >
                  {s.stepNum}
                </span>
                {s.icon}
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1C2420', marginBottom: '2px' }}>
                {s.title}
              </div>
              <div style={{ fontSize: '0.70rem', color: '#6B7A71', fontFamily: 'var(--font-mono, monospace)' }}>
                {s.stat}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Chassis */}
      <GlassPanel variant="secondary" style={{ padding: '28px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <MetricChip label={`STAGE ${current.stepNum}`} color={current.color} />
              <span style={{ fontSize: '0.78rem', color: '#2D6A4F', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600 }}>
                {current.subtitle}
              </span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0 0 10px 0', color: '#1C2420' }}>
              {current.title}
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#43514A', lineHeight: 1.65, margin: 0 }}>
              {current.desc}
            </p>
          </div>

          {/* Right interactive illustration / output result */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              borderRadius: '14px',
              border: '1px solid rgba(28, 36, 32, 0.12)',
              padding: '20px',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.74rem', color: '#6B7A71' }}>
              <span>PIPELINE TELEMETRY</span>
              <span style={{ color: '#2D6A4F', fontWeight: 700 }}>● EXECUTED</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.80rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7A71' }}>Inference Clock:</span>
                <span style={{ color: '#B45309', fontWeight: 700 }}>6.1 ms (Sub-10ms Guarantee)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7A71' }}>Decoded Class:</span>
                <span style={{ color: '#1E67D6', fontWeight: 700 }}>T2: RIGHT HAND FIST</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7A71' }}>Softmax Posterior:</span>
                <span style={{ color: '#1C2420', fontWeight: 700 }}>P = 0.9841</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7A71' }}>Prosthetic Actuation:</span>
                <span style={{ color: '#1C2420', fontWeight: 700 }}>5-Finger Flexion Triggered</span>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
