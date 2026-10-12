import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NeuromovePortal from './components/effects/NeuromovePortal';
import AtmosphericBackground from './components/ui/AtmosphericBackground';
import SylvaWorldB from './components/worlds/SylvaWorldB';
import WorldBUploadCard from './components/worlds/WorldBUploadCard';
import SylvaHeroSection from './components/chapters/SylvaHeroSection';
import TeamWildScoreSection from './components/TeamWildScoreSection';
import NeuroZoomText from './components/chapters/NeuroZoomText';
import PreprocessingStory from './components/chapters/PreprocessingStory';
import MotorCortexChapter from './components/chapters/MotorCortexChapter';
import CausalPayoffChapter from './components/chapters/CausalPayoffChapter';
import TwoModelClassification from './components/chapters/TwoModelClassification';
import OutputClasses from './components/chapters/OutputClasses';
import SignalVisualization from './components/chapters/SignalVisualization';
import LiveTelemetryInstrument from './components/chapters/LiveTelemetryInstrument';
import PrecisionControlStudio from './components/chapters/PrecisionControlStudio';
import ValidationChapter from './components/chapters/ValidationChapter';
import DatasetSection from './components/chapters/DatasetSection';
import ResearchTeamChapter from './components/chapters/ResearchTeamChapter';
import TourCompletionSection from './components/chapters/TourCompletionSection';
import SingleFooter from './components/chapters/SingleFooter';
import Dock from './components/ui/Dock';
import CustomCursor from './components/ui/CustomCursor';
import PagePreloader from './components/ui/PagePreloader';
import StaggeredMenu from './components/ui/StaggeredMenu';
import ParallaxComponent from './components/ui/parallax-scrolling';
import { scrollToTarget, ScrollTrigger } from './lib/scrollEngine';
import { checkHealth, getMetrics, loadSampleTrial } from './api/client';

const NAV_SECTIONS = [
  { id: 'hero', label: 'Overview', target: '#hero', dock: 'dashboard' },
  { id: 'story', label: 'Neural Story', target: '#scroll-story-stage', dock: 'explainer' },
  { id: 'cortex', label: 'Motor Cortex', target: '#motor-cortex', dock: 'explainer' },
  { id: 'pipeline', label: 'Pipeline', target: '#causal-pipeline', dock: 'explainer' },
  { id: 'telemetry', label: 'Live Telemetry', target: '#telemetry-instrument', dock: 'live' },
  { id: 'studio', label: 'Precision Studio', target: '#precision-studio', dock: 'live' },
  { id: 'validation', label: 'Validation', target: '#validation-proof', dock: 'leaderboard' },
  { id: 'team', label: 'Team', target: '#research-team', dock: 'leaderboard' },
];

/**
 * NeuroMove — Continuous single-page document flow.
 *
 * Fix for Screen Recording 1 blank-on-scroll:
 * Previously only ONE section mounted at a time via activeSection thresholds.
 * With a single 100vh section mounted, document scrollHeight collapsed, scroll
 * percent math became unstable, ScrollTrigger pins mis-measured, and the
 * broken ScrollVideoSection (ScrollTrigger.kill + missing import + no canvas
 * draw) threw on mount — leaving a pure black viewport for ~15s.
 *
 * Now: every chapter renders continuously. Header nav scrolls to real anchors:
 * hero, scroll-story-stage, motor-cortex, causal-pipeline, telemetry-instrument,
 * validation-proof, research-team. No unmount on scroll. Portal owns only its
 * own timeline via gsap.context revert.
 */
export default function App() {
  const [selectedModel, setSelectedModel] = useState('minirocket');
  const [metrics, setMetrics] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [currentTrial, setCurrentTrial] = useState(null);
  const [livePrediction, setLivePrediction] = useState(null);
  const [portalProgress, setPortalProgress] = useState(0);
  const clampedProgress = Math.max(0, Math.min(1, portalProgress));
  const [activeSection, setActiveSection] = useState('hero');

  // Single shared scroll-spy: Header + Dock follow actual scroll position.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const pos = window.scrollY + window.innerHeight * 0.35;
        let current = 'hero';
        for (const item of NAV_SECTIONS) {
          const el = document.querySelector(item.target);
          if (el && el.offsetTop <= pos) current = item.id;
        }
        setActiveSection((prev) => (prev === current ? prev : current));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    checkHealth()
      .then((data) => {
        setBackendHealth(data);
        setBackendStatus(data.status === 'ok' ? 'online' : 'degraded');
      })
      .catch(() => setBackendStatus('offline'));

    getMetrics('minirocket', 'subject_dependent')
      .then((data) => setMetrics(data))
      .catch((err) => console.warn(err));

    loadSampleTrial('T1')
      .then((data) => setCurrentTrial(data))
      .catch((err) => console.warn(err));
  }, []);

  // Scroll engine is owned solely by SmoothScrollProvider (main.jsx).
  // App only refreshes ScrollTrigger measurements after mount, fonts, and full load.
  useEffect(() => {
    const refresh = () => {
      try { ScrollTrigger.refresh(); } catch { /* noop */ }
    };
    const t = setTimeout(refresh, 350);
    const t2 = setTimeout(refresh, 1500);
    window.addEventListener('load', refresh, { once: true });
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <div
      className="app-shell"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#020204',
        // clip (not hidden): kills horizontal overflow WITHOUT creating a
        // scroll container, so sticky anchors (hero hand, preprocessing story,
        // World B) and ScrollTrigger keep measuring against the viewport.
        // overflow-x:hidden would compute overflow-y to auto, trapping sticky.
        overflowX: 'clip',
      }}
    >
      <AtmosphericBackground visibilityProgress={clampedProgress} />

      <div className="app-container" style={{ position: 'relative', zIndex: 10, maxWidth: '1440px', margin: '0 auto' }}>
        <Header
          backendHealth={backendHealth}
          backendStatus={backendStatus}
          currentTrial={currentTrial}
          activeSection={activeSection}
          navItems={NAV_SECTIONS}
        />

        <main style={{ position: 'relative', zIndex: 10 }}>
          <HeroSection
            onLaunchLive={() => scrollToTarget('#telemetry-instrument', {})}
            onViewBenchmarks={() => scrollToTarget('#validation-proof', {})}
            backendStatus={backendStatus === 'checking' ? 'connecting' : backendHealth ? 'online' : 'offline'}
            currentTrial={currentTrial}
            progress={clampedProgress}
          />

          <TeamWildScoreSection />

          <NeuromovePortal
            onProgressUpdate={(p) => setPortalProgress(p)}
          />

          {/* WORLD B — continuous SylvaHero living-green environment across all chapters.
              Background remains pinned while cards and sections scroll smoothly over it. */}
          <SylvaWorldB>
            <SylvaHeroSection
              onExploreCortex={() => scrollToTarget('#motor-cortex', {})}
              onLaunchLive={() => scrollToTarget('#telemetry-instrument', {})}
            />

            {/* Upload FIRST: file attach at the top of the Sylva world arms
                every downstream chapter (telemetry, validation, proof). */}
            <WorldBUploadCard onTrialLoaded={setCurrentTrial} />

            <NeuroZoomText />

            {/* Header target: #scroll-story-stage */}
            <div id="scroll-story-stage" style={{ position: 'relative', scrollMarginTop: '90px' }}>
              <PreprocessingStory />
            </div>

            <MotorCortexChapter />

            <TwoModelClassification />

            <OutputClasses />

            <SignalVisualization
              currentTrial={currentTrial}
              livePrediction={livePrediction}
            />

            <CausalPayoffChapter />

            <LiveTelemetryInstrument
              currentTrial={currentTrial}
              onTrialLoaded={setCurrentTrial}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
              onPrediction={setLivePrediction}
            />

            <ValidationChapter metrics={metrics} />

            <DatasetSection />

            <ResearchTeamChapter />
          </SylvaWorldB>
        </main>
      </div>

      {/* Exit: white reverse-zoom-out hands off from Sylva to the hand-world footer.
          Both live outside SylvaWorldB so the footer always renders in the dark
          hand world, never in Sylva light glass. */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <TourCompletionSection onRestartTour={() => scrollToTarget('#hero', {})} />

        <SingleFooter data-world="hand" />
      </div>

      <Dock
        activeTab={NAV_SECTIONS.find((s) => s.id === activeSection)?.dock || 'dashboard'}
        onTabChange={(targetId) => {
          const sectionMap = {
            dashboard: '#hero',
            live: '#telemetry-instrument',
            leaderboard: '#validation-proof',
            explainer: '#scroll-story-stage',
          };
          scrollToTarget(sectionMap[targetId] || '#hero', {});
        }}
        onQuickAction={() => {
          scrollToTarget('#telemetry-instrument', {});
        }}
      />

      <CustomCursor />
    </div>
  );
}
