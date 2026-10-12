import React, { useState } from 'react';
import { Activity, Check, Zap } from 'lucide-react';

/**
 * OutputsT1T4Section
 * Section 10: Outputs T1, T2, T3, T4 with detailed descriptions and interactive signal view.
 * Pure light theme with high contrast, tabs, and live signal preview.
 */
export default function OutputsT1T4Section({ className = '', style = {} }) {
  const [activeTab, setActiveTab] = useState('T1');

  const OUTPUT_CLASSES = {
    T1: {
      code: 'T1 ($L$)',
      title: 'Left Fist Kinesthetic Motor Imagery',
      dipole: 'Right Motor Cortex (C4 Dipole ERD)',
      description: 'The subject imagines squeezing their left hand. This triggers contralateral Mu (8–12 Hz) rhythm desynchronization over electrode C4 while ipsilateral C3 rhythm is preserved.',
      precision: '97.95%',
      recall: '94.09%',
      f1: '95.98%',
      auc: '0.9981',
      frequency: '8–12 Hz Mu Band',
      signalWave: [12, -45, 38, -60, 20, -15, 8, -5],
    },
    T2: {
      code: 'T2 ($R$)',
      title: 'Right Fist Kinesthetic Motor Imagery',
      dipole: 'Left Motor Cortex (C3 Dipole ERD)',
      description: 'The subject imagines squeezing their right hand. This triggers contralateral Mu rhythm desynchronization over electrode C3 while ipsilateral C4 rhythm remains intact.',
      precision: '97.07%',
      recall: '98.51%',
      f1: '97.79%',
      auc: '0.9992',
      frequency: '8–12 Hz Mu Band',
      signalWave: [-40, 20, -65, 35, -20, 15, -8, 4],
    },
    T3: {
      code: 'T3 ($BLR$)',
      title: 'Bilateral Hand (Both Fists) Imagery',
      dipole: 'Bilateral Rolandic Cortex (C3 + C4 Dipole)',
      description: 'The subject imagines squeezing both hands simultaneously. Symmetric bilateral ERD occurs across C3 and C4 with a strong Beta (13–30 Hz) power drop.',
      precision: '97.51%',
      recall: '98.00%',
      f1: '97.76%',
      auc: '0.9992',
      frequency: '13–30 Hz Beta Drop',
      signalWave: [-50, -60, -40, -55, -45, -50, -35, -40],
    },
    T4: {
      code: 'T4 ($BF$)',
      title: 'Bilateral Lower Limb (Both Feet) Imagery',
      dipole: 'Medial Longitudinal Fissure (Cz / CPz Dipole)',
      description: 'The subject imagines moving both feet. Centroparietal modulation occurs along the medial fissure, generating distinct power drops over Cz/CPz.',
      precision: '97.13%',
      recall: '99.02%',
      f1: '98.07%',
      auc: '0.9998',
      frequency: 'Centroparietal Dipole',
      signalWave: [25, 45, -30, -55, 60, -40, 15, -10],
    },
  };

  const current = OUTPUT_CLASSES[activeTab];

  return (
    <section
      id="outputs-t1-t4"
      className={`outputs-t1-t4-section ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        padding: '80px 24px',
        background: '#FAFAFD',
        color: '#0F172A',
        zIndex: 10,
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(30, 103, 214, 0.08)',
              border: '1px solid rgba(30, 103, 214, 0.20)',
              color: '#1e67d6',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <Activity size={14} />
            <span>Section 10 · Decoded Output Classes & Signal View</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.035em',
              margin: '0 0 12px 0',
            }}
          >
            Outputs T1, T2, T3, T4
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#475569', maxWidth: '640px', margin: '0 auto' }}>
            Each motor imagery intent maps to a unique neurophysiological dipole and sensorimotor rhythm signature.
          </p>
        </div>

        {/* Output Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {Object.keys(OUTPUT_CLASSES).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  background: isActive ? '#1E67D6' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: isActive ? '1px solid #1E67D6' : '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '12px 24px',
                  fontSize: '0.90rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 8px 20px -4px rgba(30, 103, 214, 0.3)' : '0 2px 8px rgba(0,0,0,0.02)',
                  transition: 'all 0.25s ease',
                }}
              >
                {OUTPUT_CLASSES[key].code} — {key === 'T1' ? 'Left Fist' : key === 'T2' ? 'Right Fist' : key === 'T3' ? 'Both Fists' : 'Both Feet'}
              </button>
            );
          })}
        </div>

        {/* Selected Output Card & Signal View */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '36px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 16px 40px -10px rgba(15, 23, 42, 0.06)',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {/* Output Details */}
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#1E67D6', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              OUTPUT CLASS {current.code}
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
              {current.title}
            </h3>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0284C7', marginBottom: '16px' }}>
              {current.dipole}
            </div>
            <p style={{ fontSize: '0.96rem', color: '#475569', lineHeight: 1.65, margin: '0 0 24px 0' }}>
              {current.description}
            </p>

            {/* Metrics Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #F1F5F9' }}>
              <div>
                <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>PRECISION</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{current.precision}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>RECALL</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{current.recall}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>F1-SCORE</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{current.f1}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.64rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>ROC-AUC</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E67D6' }}>{current.auc}</div>
              </div>
            </div>
          </div>

          {/* Signal View Preview */}
          <div
            style={{
              background: '#0F172A',
              borderRadius: '20px',
              padding: '24px',
              color: '#FFFFFF',
              boxShadow: '0 12px 30px -5px rgba(15, 23, 42, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} color="#38BDF8" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38BDF8', letterSpacing: '0.08em' }}>
                  SIGNAL WAVEFORM VIEW
                </span>
              </div>
              <span style={{ fontSize: '0.70rem', color: '#94A3B8' }}>{current.frequency}</span>
            </div>

            {/* SVG Oscilloscope Preview */}
            <div style={{ height: '140px', width: '100%', position: 'relative', display: 'flex', alignItems: 'center' }}>
              <svg width="100%" height="100%" viewBox="0 0 300 120" style={{ overflow: 'visible' }}>
                {/* Gridlines */}
                <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.05)" />

                {/* Waveform Path */}
                <path
                  d={`M 0 60 Q 37.5 ${60 + current.signalWave[0]}, 75 ${60 + current.signalWave[1]} T 150 ${60 + current.signalWave[3]} T 225 ${60 + current.signalWave[5]} T 300 60`}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.72rem', color: '#94A3B8' }}>
              <span>t = 0.0s (Trial Start)</span>
              <span>t = 2.0s (Motor ERD)</span>
              <span>t = 4.0s (Window End)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
