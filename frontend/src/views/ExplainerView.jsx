import React from 'react';
import SignalExplainer from '../components/SignalExplainer';
import MorphSlider from '../components/effects/MorphSlider';
import CometDial from '../components/effects/CometDial';
import ScrollReveal from '../components/effects/ScrollReveal';

export default function ExplainerView({ currentTrial }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      <SignalExplainer currentTrial={currentTrial} />

      {/* Interactive Morph Slider for Raw vs Preprocessed Signal */}
      <ScrollReveal animation="fade-up">
        <MorphSlider
          title="Interactive Morphing Inspection: Scalp Artifact Removal"
          height={240}
        />
      </ScrollReveal>

      {/* Comet Dial Rotary Frequency Explorer */}
      <ScrollReveal animation="fade-up">
        <div className="card" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px auto' }}>
            <div style={{ fontSize: '0.74rem', color: '#FFFFFF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
              SPECTRAL BAND EXPLORATION
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Cortical Frequency Rhythms & Mu/Beta ERD
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#A1A1AA', marginTop: '6px' }}>
              Rotate the dial to explore how sensorimotor rhythms (8–30 Hz) contrast against slower sleep oscillations and high-frequency EMG noise.
            </p>
          </div>
          <CometDial />
        </div>
      </ScrollReveal>
    </div>
  );
}
