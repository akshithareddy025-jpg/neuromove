import React, { useState } from 'react';
import { Database, ShieldCheck, Cpu } from 'lucide-react';

/**
 * Folder
 * Interactive tabbed folder component inspired by modern macOS/iOS filesystem cards.
 * Organizes scientific datasets, validation logs, and ablation checkpoints into physical folder tabs.
 */
export default function Folder({
  folders = [
    {
      id: 'datasets',
      title: 'PhysioNet EEGMMIDB',
      icon: Database,
      badge: '109 Subjects',
      content: {
        heading: '64-Channel Motor Imagery Cohort',
        details: [
          'Sampling Rate: 160 Hz raw downsampled to 128 Hz zero-phase.',
          '4-Class Motor Imagery: Left Fist, Right Fist, Both Fists, Both Feet.',
          'Partitioning: Stratified 5:2:3 cross-subject trial pool (zero leakage).',
          'Trial Duration: 4.0 seconds (512 samples per trial).',
        ],
      },
    },
    {
      id: 'models',
      title: 'Model Checkpoints',
      icon: Cpu,
      badge: 'MiniRocket & CNN',
      content: {
        heading: 'Production Benchmark Artifacts',
        details: [
          'MiniRocket + Ridge: 10,000 random convolutional kernels (97.41% Test Acc).',
          'Hybrid CNN-LSTM: Spatial 2D convs + 64 LSTM units (97.16% Test Acc).',
          'Latency: 2.15 ms (CNN-LSTM) / 7.2 ms (MiniRocket) on consumer CPU.',
          'Inference Bandwidth: >100 Hz real-time decoding pipeline.',
        ],
      },
    },
    {
      id: 'protocol',
      title: 'Zero-Leakage Protocol',
      icon: ShieldCheck,
      badge: '100% Verified',
      content: {
        heading: 'Methodological Integrity Standard',
        details: [
          'Subject-Independent Partitioning: No cross-fold contamination.',
          'Filter Envelope Integrity: Butterworth bandpass (8-30 Hz) fitted per split.',
          'FastICA Sphering: Orthogonal spatial unmixing with zero future leakage.',
          'Academic Benchmark: Hwaidi & Ghanem, NeuroImage 328 (2026).',
        ],
      },
    },
  ],
  isLightMode = true,
  className = '',
  style = {},
}) {
  const [activeTab, setActiveTab] = useState(folders[0].id);

  const currentFolder = folders.find((f) => f.id === activeTab) || folders[0];

  return (
    <div
      className={`folder-component ${className}`}
      style={{
        borderRadius: '18px',
        background: isLightMode ? 'rgba(255, 255, 255, 0.96)' : 'rgba(15, 15, 22, 0.85)',
        border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.3)' : '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: isLightMode ? '0 16px 40px -10px rgba(244, 114, 182, 0.14)' : '0 12px 36px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Folder Header Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: isLightMode ? '1px solid rgba(244, 114, 182, 0.25)' : '1px solid rgba(255, 255, 255, 0.1)',
          background: isLightMode ? 'rgba(253, 242, 248, 0.7)' : 'rgba(0, 0, 0, 0.3)',
          overflowX: 'auto',
        }}
      >
        {folders.map((folder) => {
          const isActive = folder.id === activeTab;
          const Icon = folder.icon;

          return (
            <button
              key={folder.id}
              onClick={() => setActiveTab(folder.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 22px',
                background: isActive
                  ? (isLightMode ? '#ffffff' : 'rgba(255, 255, 255, 0.08)')
                  : 'transparent',
                border: 'none',
                borderBottom: isActive
                  ? (isLightMode ? '2.5px solid #db2777' : '2px solid #FFFFFF')
                  : '2.5px solid transparent',
                color: isActive
                  ? (isLightMode ? '#09090b' : '#FFFFFF')
                  : (isLightMode ? '#64748b' : 'var(--text-tertiary)'),
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={16} color={isActive ? (isLightMode ? '#db2777' : '#FFFFFF') : (isLightMode ? '#94a3b8' : '#71717A')} />
              <span>{folder.title}</span>
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: isActive
                    ? (isLightMode ? '#fdf2f8' : 'rgba(255, 255, 255, 0.08)')
                    : (isLightMode ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'),
                  color: isActive
                    ? (isLightMode ? '#db2777' : '#FFFFFF')
                    : (isLightMode ? '#64748b' : 'var(--text-tertiary)'),
                  fontWeight: 700,
                  border: isLightMode && isActive ? '1px solid rgba(244, 114, 182, 0.3)' : 'none',
                }}
              >
                {folder.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Folder Body Content */}
      <div style={{ padding: '28px' }}>
        <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: isLightMode ? '#09090b' : '#FFFFFF', margin: '0 0 18px 0' }}>
          {currentFolder.content.heading}
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {currentFolder.content.details.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: isLightMode ? '#fdf2f8' : 'rgba(255, 255, 255, 0.03)',
                border: isLightMode ? '1px solid rgba(244, 114, 182, 0.25)' : '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '12px',
                padding: '14px 18px',
                fontSize: '0.84rem',
                color: isLightMode ? '#1e293b' : 'var(--text-secondary)',
                lineHeight: 1.55,
                fontWeight: 500,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
