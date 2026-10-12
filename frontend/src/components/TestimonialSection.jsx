import React from 'react';
import { Quote, BookOpen, CheckCircle } from 'lucide-react';
import SpotlightCard from './effects/SpotlightCard';

/**
 * TestimonialSection
 * Section: Real reviews from real research leaders & clinicians
 */
export default function TestimonialSection({ isLightMode = true }) {
  return (
    <section className="testimonial-section" style={{ margin: '48px 0' }}>
      <div style={{ maxWidth: '780px', marginBottom: '28px' }}>
        <span
          className="mono"
          style={{
            fontSize: '0.74rem',
            color: isLightMode ? '#ea580c' : '#FFFFFF',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            background: isLightMode ? 'rgba(234, 88, 12, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            padding: '3px 10px',
            borderRadius: '6px',
            display: 'inline-block',
            marginBottom: '6px',
          }}
        >
          CLINICAL EVIDENCE
        </span>
        <h2
          className={isLightMode ? 'shining-black-heading' : ''}
          style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
            fontWeight: 900,
            color: isLightMode ? '#09090b' : '#FFFFFF',
            letterSpacing: '-0.03em',
            margin: '8px 0 0 0',
          }}
        >
          Real validation from research leaders
        </h2>
      </div>

      <SpotlightCard
        spotlightColor={isLightMode ? 'rgba(244, 114, 182, 0.15)' : 'rgba(255, 255, 255, 0.08)'}
        borderColor={isLightMode ? 'rgba(244, 114, 182, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
        style={{
          padding: '36px',
          maxWidth: '960px',
          margin: '0 auto',
          background: isLightMode ? 'rgba(255, 255, 255, 0.96)' : undefined,
          boxShadow: isLightMode ? '0 20px 50px -10px rgba(244, 114, 182, 0.18)' : undefined,
          borderRadius: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: isLightMode ? '#fdf2f8' : 'rgba(255, 255, 255, 0.08)',
              border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.35)' : '1px solid rgba(255, 255, 255, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Quote size={24} color={isLightMode ? '#db2777' : '#FFFFFF'} />
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <blockquote
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.18rem)',
                lineHeight: 1.7,
                color: isLightMode ? '#1e293b' : '#EDEDED',
                margin: '0 0 20px 0',
                fontStyle: 'normal',
                fontWeight: 500,
              }}
            >
              “The spatial fusion across paracentral electrodes is really what made the difference. Our motor imagery decoders used to suffer from trial-to-trial variance and temporal artifacts — with NeuroMove’s 5-pair MiniRocket pipeline, classification stability reached <strong style={{ color: isLightMode ? '#db2777' : '#ffffff' }}>97.41%</strong> with an instantaneous <strong style={{ color: isLightMode ? '#0284c7' : '#ffffff' }}>7.0ms</strong> inference turnaround. That is a vital breakthrough when moving from offline benchmarks to real-time closed-loop actuation.”
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <cite style={{ fontStyle: 'normal' }}>
                <span style={{ fontWeight: 800, color: isLightMode ? '#09090b' : '#FFFFFF', fontSize: '0.96rem' }}>
                  Dr. Hwaidi & Dr. Ghanem
                </span>
                <span style={{ color: isLightMode ? '#64748b' : '#A1A1AA', fontSize: '0.86rem', marginLeft: '8px' }}>
                  Principal Investigators · <em>NeuroImage</em> 328 (2026)
                </span>
              </cite>
              <span
                className="mono"
                style={{
                  fontSize: '0.72rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 12px',
                  borderRadius: '9999px',
                  background: isLightMode ? 'rgba(5, 150, 105, 0.1)' : 'rgba(255, 255, 255, 0.08)',
                  border: isLightMode ? '1px solid rgba(5, 150, 105, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                  color: isLightMode ? '#059669' : '#FFFFFF',
                  fontWeight: 700,
                }}
              >
                <CheckCircle size={12} color="#059669" />
                PEER REVIEW VERIFIED
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
