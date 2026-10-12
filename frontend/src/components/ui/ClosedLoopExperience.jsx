import React, { useState } from 'react';
import { User, Activity, Filter, Cpu, Target, Zap, RotateCcw, Sparkles } from 'lucide-react';
import ElectricBorder from '../effects/ElectricBorder';

/**
 * ClosedLoopExperience
 * Signature NeuroMove Closed-Loop Neurorehabilitation System.
 * Visualizes the complete loop:
 * Human Thought → Scalp EEG → Butterworth Filter → Spatial Fusion → AI Decoder → Assistive Actuator → Sensory Reafference → Neural Plasticity → Human.
 */
export default function ClosedLoopExperience({
  className = '',
  style = {},
}) {
  const [activeStage, setActiveStage] = useState(0);

  const STAGES = [
    {
      id: 'human',
      title: '1. Human Motor Intention',
      icon: User,
      color: '#FFFFFF',
      role: 'Sensorimotor Cortex (M1 & SMA)',
      detail: 'Voluntary motor imagery creates event-related desynchronization (ERD) in the contralateral motor cortex, suppressing baseline 8–12 Hz Mu rhythms.',
    },
    {
      id: 'eeg',
      title: '2. Scalp EEG Telemetry',
      icon: Activity,
      color: '#E4E4E7',
      role: '64-Channel BCI2000 System',
      detail: 'Surface electrodes capture microvolt-level potential differences across the scalp at 160 Hz / 128 Hz.',
    },
    {
      id: 'dsp',
      title: '3. Zero-Phase Butterworth',
      icon: Filter,
      color: '#D4D4D8',
      role: '8–30 Hz Zero-Phase DSP',
      detail: 'Forward-backward filtering eliminates phase distortion, rejecting 50Hz mains hum, ocular blinks, and DC baseline drifts (+4.57% gain).',
    },
    {
      id: 'fusion',
      title: '4. 5-Pair Spatial Fusion',
      icon: Target,
      color: '#A1A1AA',
      role: 'Bipolar Cortical Dipoles',
      detail: 'Isolates local sensorimotor rhythms (C3-C4, C1-C2, FC3-FC4, CP3-CP4, C5-C6) over the Rolandic strip (+7.08% boost).',
    },
    {
      id: 'ai',
      title: '5. MiniRocket & CNN-LSTM',
      icon: Cpu,
      color: '#FFFFFF',
      role: 'Closed-Form Ridge Decoder',
      detail: 'Extracts 10,000 PPV convolutional features and solves class boundaries analytically in 6.1 ms with 97.41% accuracy.',
    },
    {
      id: 'actuation',
      title: '6. Assistive Actuation',
      icon: Zap,
      color: '#E4E4E7',
      role: 'Prosthetic Hand / Wheelchair',
      detail: 'Decoded intent commands motor actuators: robotic hand grip flexion, smart wheelchair steering, or virtual cursor motion.',
    },
    {
      id: 'feedback',
      title: '7. Sensory Reafference',
      icon: RotateCcw,
      color: '#D4D4D8',
      role: 'Somatosensory Biofeedback',
      detail: 'Tactile and visual confirmation feeds back to the somatosensory cortex (S1), driving Hebbian neuroplastic remodeling in stroke survivors.',
    },
  ];

  const current = STAGES[activeStage];
  const IconComp = current.icon;

  return (
    <ElectricBorder color="#FFFFFF" secondaryColor="#A1A1AA" speed={5} borderRadius={24}>
      <div
        className={`closed-loop-experience ${className}`}
        style={{
          padding: '36px',
          background: 'var(--bg-surface-1, #0a0a0c)',
          borderRadius: '23px',
          ...style,
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
            <RotateCcw size={14} />
            <span>CONTINUOUS NEURAL REHABILITATION PARADIGM</span>
          </div>
          <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px 0' }}>
            The NeuroMove Closed-Loop Architecture
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#A1A1AA', lineHeight: 1.6, margin: 0 }}>
            Motor imagery is not a one-way command pipeline; it is an organic, closed-loop neurorehabilitation cycle.
            Assistive actuation stimulates sensory receptors, fostering synaptic plasticity and restoring motor autonomy.
          </p>
        </div>

        {/* Circular / Ribbon Interactive Loop Nodes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {STAGES.map((st, idx) => {
            const isSelected = activeStage === idx;
            const StIcon = st.icon;
            return (
              <div
                key={st.id}
                onClick={() => setActiveStage(idx)}
                style={{
                  padding: '16px 12px',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)'}`,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isSelected ? '0 0 16px rgba(255, 255, 255, 0.2)' : 'none',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.06)',
                    color: isSelected ? '#000000' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 8px auto',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <StIcon size={16} />
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isSelected ? '#FFFFFF' : '#A1A1AA' }}>
                  {st.title.split('. ')[1]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Explanatory Callout */}
        <div
          style={{
            padding: '24px 28px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              <IconComp size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#E4E4E7', fontWeight: 700, letterSpacing: '0.06em' }}>
                {current.role}
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 6px 0' }}>
                {current.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#D4D4D8', lineHeight: 1.5, margin: 0, maxWidth: '720px' }}>
                {current.detail}
              </p>
            </div>
          </div>

          <div className="mono" style={{ fontSize: '0.74rem', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.06)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            LOOP LATENCY: &lt; 25MS
          </div>
        </div>
      </div>
    </ElectricBorder>
  );
}
