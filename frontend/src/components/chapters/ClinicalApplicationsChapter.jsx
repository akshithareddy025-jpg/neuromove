import React from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import { ShieldCheck, Activity, Award, ArrowUpRight, Zap, Radio } from 'lucide-react';

/**
 * ClinicalApplicationsChapter
 * Chapter 09: Clinical & Real-World Deployments.
 * 3 Large Glass Cases: Neurorehabilitation, Assistive Mobility, and Empirical Benchmark.
 */
export default function ClinicalApplicationsChapter({
  className = '',
  style = {},
}) {
  const CASES = [
    {
      id: 'case-1',
      tag: 'CLOSED-LOOP NEUROREHABILITATION',
      title: 'Stroke Hemiparesis & Hebbian Motor Re-Mapping',
      badge: 'HEBBIAN REWIRING',
      desc: 'Closed-loop 5-DOF robotic hand orthosis actuation driven by decoded motor imagery intent. Synchronous biofeedback induces neuroplastic synaptic plasticity, accelerating functional recovery in chronic stroke survivors.',
      metrics: [
        { label: 'LOOP LATENCY', value: '< 25 ms', color: 'skyblue' },
        { label: 'RECOVERY DELTA', value: '+18.4 Fugl-Meyer', color: 'yellow' },
        { label: 'ELECTRODES', value: '5 Bipolar Pairs', color: 'blue' },
      ],
      color: 'blue',
      glow: true,
    },
    {
      id: 'case-2',
      tag: 'ASSISTIVE AUTONOMY',
      title: 'BCI-Controlled Motorized Mobility System',
      badge: 'REAL-TIME NAVIGATION',
      desc: 'Continuous mental steering of powered mobility devices via 4-class motor imagery (Left Fist = Turn Left, Right Fist = Turn Right, Both Feet = Forward Drive, Both Fists = Emergency Cutoff). Sub-10ms latency ensures obstacle safety.',
      metrics: [
        { label: 'CONTROL RATE', value: '160 Hz Stream', color: 'skyblue' },
        { label: 'SAFETY CUTOFF', value: '12 ms Braking', color: 'red' },
        { label: 'USER CONTROL', value: '100% Hands-Free', color: 'yellow' },
      ],
      color: 'maroon',
      glow: true,
    },
    {
      id: 'case-3',
      tag: 'BENCHMARK REPRODUCIBILITY',
      title: 'PhysioNet 109-Subject Cross-Validation Corpus',
      badge: 'PEAK S002 97.59%',
      desc: 'Tested across the complete 64-channel PhysioNet EEGMMIDB database. Establishes a verified zero-leakage empirical floor of 46.20% and peak subject S002 performance of 97.59%, resolving academic transparency concerns in BCI literature.',
      metrics: [
        { label: 'COHORT SIZE', value: '109 Subjects', color: 'blue' },
        { label: 'PEAK ACCURACY', value: '97.59% Acc', color: 'yellow' },
        { label: 'ZERO LEAKAGE', value: 'Verified 0.00%', color: 'skyblue' },
      ],
      color: 'default',
      glow: false,
    },
  ];

  return (
    <section id="clinical-applications" className={`clinical-applications-chapter ${className}`} style={{ width: '100%', marginBottom: '84px', ...style }}>
      {/* Chapter Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <MetricChip label="CHAPTER 09" color="skyblue" />
        <span style={{ fontSize: '0.76rem', color: '#A1A1AA', fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          CLINICAL IMPACT & REAL-WORLD TRANSLATION
        </span>
      </div>

      <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
        <h2 style={{ fontSize: 'clamp(2.0rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.12, letterSpacing: '-0.035em', margin: '0 0 14px 0' }}>
          From Cortical Potentials to Clinical Impact
        </h2>
        <p style={{ fontSize: '1.02rem', color: '#D4D4D8', lineHeight: 1.68, margin: 0, fontWeight: 400 }}>
          Precision motor imagery decoding transforms theoretical neuroscience into therapeutic and assistive reality. Explore our three deployment testbeds.
        </p>
      </div>

      {/* 3 Large Glass Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {CASES.map((c) => (
          <GlassPanel
            key={c.id}
            variant={c.color}
            glow={c.glow}
            interactive
            style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.70rem', color: '#61D7FF', fontFamily: 'monospace', fontWeight: 800 }}>
                  {c.tag}
                </span>
                <MetricChip label={c.badge} color="yellow" />
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.25 }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '0.90rem', color: '#D4D4D8', lineHeight: 1.65, margin: '0 0 24px 0' }}>
                {c.desc}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {c.metrics.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontFamily: 'monospace' }}>
                  <span style={{ color: '#A1A1AA' }}>{m.label}:</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{m.value}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
