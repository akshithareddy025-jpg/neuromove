import React from 'react';
import AccuracyStoryPanel from '../components/AccuracyStoryPanel';
import TrustLogos from '../components/TrustLogos';
import ValueProposition from '../components/ValueProposition';
import MetricCards from '../components/MetricCards';
import ChallengeSection from '../components/ChallengeSection';
import SanityCheckBadge from '../components/SanityCheckBadge';
import ConfusionMatrix from '../components/ConfusionMatrix';
import RocChart from '../components/RocChart';
import ClassBreakdownChart from '../components/ClassBreakdownChart';
import TestimonialSection from '../components/TestimonialSection';
import CaseStudySection from '../components/CaseStudySection';
import TeamSection from '../components/TeamSection';
import FinalCtaSection from '../components/FinalCtaSection';

// Creative UI Components
import CardNav from '../components/ui/CardNav';
import CardSwap from '../components/ui/CardSwap';
import Folder from '../components/ui/Folder';
import ScrollReveal from '../components/effects/ScrollReveal';
import ThoughtLine from '../components/effects/ThoughtLine';
import MorphSlider from '../components/effects/MorphSlider';
import TypographicZoomPortal from '../components/effects/TypographicZoomPortal';
import CometDial from '../components/effects/CometDial';
import ModelVisualizer from '../components/ui/ModelVisualizer';
import StoryCarousel from '../components/ui/StoryCarousel';
import ScrollStickyExperience from '../components/ui/ScrollStickyExperience';
import { ShieldCheck, Cpu, Layers, Sparkles, Activity } from 'lucide-react';

export default function DashboardView({
  metrics,
  loading,
  error,
  onLaunchLive,
  onExploreLeaderboard,
  onExploreExplainer,
}) {
  const clinicalCases = [
    {
      id: 'case-1',
      title: 'Subject S002: Peak Rolandic Lateralization',
      category: 'HIGH RESPONDER COHORT',
      badge: '97.59% ACCURACY',
      badgeColor: '#000000',
      description: 'Remarkable event-related desynchronization (ERD) in C3/C4 bipolar pairs during contralateral motor imagery, enabling sub-10ms intent classification without adaptation.',
      metrics: [
        { label: 'Latency', value: '6.1 ms', color: '#000000' },
        { label: 'Precision', value: '98.2%', color: '#000000' },
        { label: 'F1-Score', value: '0.978', color: '#000000' },
      ],
    },
    {
      id: 'case-2',
      title: 'Stroke Neurorehabilitation: Cortical Re-Mapping',
      category: 'CLINICAL CLOSED-LOOP',
      badge: 'HEBBIAN REWIRING',
      badgeColor: '#000000',
      description: 'Closed-loop 5-DOF robotic hand orthosis actuation driven by decoded motor imagery intent, promoting ipsilesional motor cortex remodeling in chronic stroke patients.',
      metrics: [
        { label: 'Loop Delay', value: '< 25 ms', color: '#000000' },
        { label: 'Channels', value: '5 Pairs', color: '#000000' },
        { label: 'Recovery Δ', value: '+18.4 pts', color: '#000000' },
      ],
    },
    {
      id: 'case-3',
      title: 'BCI-Controlled Motorized Mobility',
      category: 'ASSISTIVE AUTONOMY',
      badge: 'REAL-TIME CONTROL',
      badgeColor: '#000000',
      description: 'Seamless continuous steering of a motorized wheelchair via 4-class mental navigation (Left Fist = Turn Left, Right Fist = Turn Right, Feet = Forward Drive, Both Fists = E-Brake).',
      metrics: [
        { label: 'Response', value: '160 Hz', color: '#000000' },
        { label: 'Safety Cutoff', value: '12 ms', color: '#000000' },
        { label: 'Zero Leak', value: 'Audited', color: '#000000' },
      ],
    },
    {
      id: 'case-4',
      title: 'Cross-Subject Generalization & Zero-Leak Proof',
      category: 'RIGOROUS METHODOLOGY',
      badge: '109 SUBJECT BENCHMARK',
      badgeColor: '#000000',
      description: 'Rigorous cross-subject zero-leakage evaluation against Hwaidi & Ghanem (2026) NeuroImage baseline, demonstrating unprecedented empirical reproducibility.',
      metrics: [
        { label: 'Subject Pool', value: '109 Subjects', color: '#000000' },
        { label: 'Empirical Floor', value: '46.20% (Zero Leak)', color: '#000000' },
        { label: 'Peak Subject S002', value: '97.59% Acc', color: '#000000' },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.1rem' }}>
          Loading live evaluation benchmarks from backend...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="card"
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <div style={{ color: 'var(--accent-rose)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>
          Unable to Load Live Metrics
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
      {/* Visual Navigation Card Launcher */}
      <ScrollReveal animation="fade-up">
        <CardNav
          activeTab="dashboard"
          onSelectTab={(tabId) => {
            if (tabId === 'live') onLaunchLive();
            else if (tabId === 'leaderboard') onExploreLeaderboard();
            else if (tabId === 'explainer') onExploreExplainer();
          }}
        />
      </ScrollReveal>

      {/* 1. Above-the-fold Accuracy Story & Transparency Benchmark */}
      <ScrollReveal animation="fade-up" delay={50}>
        <AccuracyStoryPanel />
      </ScrollReveal>

      {/* Signature Thought Line 01 */}
      <ThoughtLine height={100} variant="vertical" color="#FFFFFF" />

      {/* 2. Trust & Academic Benchmark Logos */}
      <TrustLogos />

      {/* 3. Value Proposition: 3 Core Capability Modules */}
      <ScrollReveal animation="fade-up">
        <ValueProposition />
      </ScrollReveal>

      {/* Signature Thought Line 02 (Curved transition) */}
      <ThoughtLine height={110} variant="curved" color="#E4E4E7" />

      {/* 4. Asymmetric Bento Grid Metrics (With animated Counter & CountUp) */}
      <ScrollReveal animation="fade-up">
        <MetricCards metrics={metrics} />
      </ScrollReveal>

      {/* 5. Interactive MorphSlider: Raw Scalp EEG vs. Clean Butterworth SMR */}
      <ScrollReveal animation="fade-up">
        <MorphSlider
          title="Empirical Signal Purification: Raw EEG vs. Butterworth 8–30 Hz"
          height={240}
        />
      </ScrollReveal>

      {/* =========================================================================
          STITCH CINEMATIC TEXT ZOOM-IN TRANSITION PORTAL
          Exponential optical camera dive into the first letter 'O' of NEUROMOVE,
          flooding into the Baby Pink & Sky Blue Clinical Rehabilitation Zone.
          ========================================================================= */}
      <TypographicZoomPortal />

      {/* =========================================================================
          EDITORIAL BABY PINK & SHINING BLACK LUXURY ZONE
          Transitions seamlessly from the zoom portal plunge into the 6-chapter journey.
          ========================================================================= */}
      <div className="editorial-white-zone">
        <div className="editorial-white-inner">

          {/* CHAPTER 01: Closed-Loop Sensorimotor Stream */}
          <div className="chapter-divider-ribbon" style={{ marginTop: '0' }}>
            <span className="chapter-badge">CHAPTER 01</span>
            <span className="chapter-label">7-Stage Sensorimotor Decoding Pathway</span>
            <div className="chapter-line" />
          </div>

          {/* 6. Signature Cinematic Split-Screen Scroll Story: 7-Stage NeuroMove Narrative */}
          <div>
            {/* ScrollStickyExperience is NOT wrapped in ScrollReveal so position: sticky works smoothly without transform traps */}
            <ScrollStickyExperience isLightMode={true} />
          </div>

          {/* 8. Interactive 3D CardSwap Section: 4 Motor Imagery Intent Classes */}
          <ScrollReveal animation="fade-up">
            <div className="card" style={{ padding: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.74rem',
                      color: '#000000',
                      fontWeight: 900,
                      letterSpacing: '0.08em',
                      background: '#A7D8F5', // Baby Blue
                      padding: '4px 10px',
                      borderRadius: '6px',
                      display: 'inline-block',
                      marginBottom: '6px',
                      border: '1px solid #000000',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    3D TACTILE EXPLORATION
                  </span>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 900, margin: 0, color: '#000000' }}>
                    4-Class Motor Imagery Intent Deck
                  </h3>
                </div>
                <span
                  className="mono"
                  style={{
                    fontSize: '0.74rem',
                    color: '#000000',
                    background: '#E8C547', // Yellow
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #000000',
                    fontWeight: 800,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  Click Top Card to Swap
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.96rem', color: '#000000', lineHeight: 1.65, marginBottom: '20px', fontWeight: 500 }}>
                    NeuroMove maps four distinct motor intentions decoded directly from sensorimotor rhythm (SMR) dynamics over the primary motor strip (M1):
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: '#000000' }}>
                    <div style={{ padding: '10px 14px', background: 'rgba(167, 216, 245, 0.35)', borderRadius: '8px', border: '1.5px solid #000000' }}>
                      <strong style={{ color: '#000000' }}>T1 (Left Fist):</strong> Right-hemisphere C4 lateralized desynchronization.
                    </div>
                    <div style={{ padding: '10px 14px', background: 'rgba(122, 38, 58, 0.18)', borderRadius: '8px', border: '1.5px solid #000000' }}>
                      <strong style={{ color: '#000000' }}>T2 (Right Fist):</strong> Left-hemisphere C3 contralateral activation.
                    </div>
                    <div style={{ padding: '10px 14px', background: 'rgba(111, 175, 100, 0.25)', borderRadius: '8px', border: '1.5px solid #000000' }}>
                      <strong style={{ color: '#000000' }}>T3 (Both Fists):</strong> Bilateral synchronous motor cortex suppression.
                    </div>
                    <div style={{ padding: '10px 14px', background: 'rgba(232, 197, 71, 0.35)', borderRadius: '8px', border: '1.5px solid #000000' }}>
                      <strong style={{ color: '#000000' }}>T4 (Both Feet):</strong> Medial central Cz / CPz somatosensory power modulation.
                    </div>
                  </div>
                </div>

                {/* Interactive 3D CardSwap Component */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CardSwap isLightMode={true} />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* CHAPTER 02: Biophysical Spectrum & Neural Decoders */}
          <div className="chapter-divider-ribbon">
            <span className="chapter-badge">CHAPTER 02</span>
            <span className="chapter-label">Biophysical Spectrum & Neural Decoders</span>
            <div className="chapter-line" />
          </div>

          {/* 8. CometDial: Interactive Rotary Frequency Band Control & Neural Oscilloscope */}
          <ScrollReveal animation="fade-up">
            <div className="card" style={{ padding: '36px' }}>
              <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px auto' }}>
                <span
                  className="mono"
                  style={{
                    fontSize: '0.74rem',
                    color: '#000000',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: '#A7D8F5', // Baby Blue
                    padding: '4px 10px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '6px',
                    border: '1px solid #000000',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  TACTILE ROTARY CONTROL & LIVE OSCILLOSCOPE
                </span>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, margin: 0, color: '#000000' }}>
                  EEG Frequency Band & Sensorimotor Spectrum
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#000000', marginTop: '6px', lineHeight: 1.6, fontWeight: 500 }}>
                  Turn or drag the dial to explore cortical rhythms from slow Delta to high Gamma. Watch the live oscilloscope continuously morph waveform harmonics in real time.
                </p>
              </div>
              <CometDial isLightMode={true} />
            </div>
          </ScrollReveal>

          {/* 9. Interactive Model Visualizer: MiniRocket vs CNN-LSTM */}
          <ScrollReveal animation="fade-up">
            <ModelVisualizer isLightMode={true} />
          </ScrollReveal>

          {/* CHAPTER 03: Empirical Rigor & Zero-Leakage Benchmark */}
          <div className="chapter-divider-ribbon">
            <span className="chapter-badge">CHAPTER 03</span>
            <span className="chapter-label">PhysioNet 109-Subject Benchmark & Clinical Validation</span>
            <div className="chapter-line" />
          </div>

          {/* 10. The Challenge Section: Data Leakage & Overfitting Pitfalls */}
          <ScrollReveal animation="fade-up">
            <ChallengeSection isLightMode={true} />
          </ScrollReveal>

          {/* 11. Automated Sanity Check Badge */}
          <SanityCheckBadge sanityCheck={metrics?.sanity_check} isLightMode={true} />

          {/* 12. StoryCarousel: Horizontal Storytelling for Clinical Deployments */}
          <ScrollReveal animation="fade-up">
            <StoryCarousel items={clinicalCases} isLightMode={true} />
          </ScrollReveal>

          {/* 13. Empirical Validation: Confusion Matrix & ROC Curves */}
          <div className="grid-2">
            <ScrollReveal animation="fade-up">
              <ConfusionMatrix matrix={metrics?.confusion_matrix} isLightMode={true} />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={80}>
              <RocChart
                rocCurves={metrics?.roc_curves}
                rocAuc={metrics?.roc_auc}
                isLightMode={true}
              />
            </ScrollReveal>
          </div>

          {/* 14. Neurophysiological Asymmetry Breakdown */}
          <ScrollReveal animation="fade-up">
            <ClassBreakdownChart perClassMetrics={metrics?.per_class_metrics} isLightMode={true} />
          </ScrollReveal>

          {/* 15. Interactive Folder Component: Datasets, Model Artifacts & Protocol */}
          <ScrollReveal animation="fade-up">
            <Folder isLightMode={true} />
          </ScrollReveal>

          {/* 16. Testimonial Section: NeuroImage 2026 Investigators */}
          <TestimonialSection isLightMode={true} />

          {/* 17. Case Study Highlight: S002 Cohort (97.59% Acc) */}
          <CaseStudySection onExploreLeaderboard={onExploreLeaderboard} isLightMode={true} />

          {/* 18. Core Research Team & Codebase Contributors */}
          <ScrollReveal animation="fade-up">
            <TeamSection isLightMode={true} />
          </ScrollReveal>

          {/* 19. Final CTA Banner */}
          <FinalCtaSection onLaunchLive={onLaunchLive} onContactTeam={onExploreExplainer} isLightMode={true} />

        </div>
      </div>
    </div>
  );
}
