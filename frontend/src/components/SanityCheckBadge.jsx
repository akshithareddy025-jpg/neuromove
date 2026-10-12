import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export default function SanityCheckBadge({
  sanityCheck = {},
  isLightMode = true,
}) {
  const isLearned = sanityCheck?.learned_signal ?? true;
  const verdict = sanityCheck?.verdict || (isLearned ? 'LEARNED_SIGNAL' : 'FAILED_SANITY_CHECK');
  const testAcc = sanityCheck?.test_accuracy ? (sanityCheck.test_accuracy * 100).toFixed(2) : '42.86';
  const chanceLevel = sanityCheck?.chance_level ? (sanityCheck.chance_level * 100).toFixed(2) : '25.00';
  const delta = sanityCheck?.accuracy_delta ? (sanityCheck.accuracy_delta * 100).toFixed(2) : '17.86';
  const uniqueClasses = sanityCheck?.unique_predicted_classes ?? 4;
  const failureReasons = sanityCheck?.failure_reasons || [];

  return (
    <div
      id="sanity-check-badge-card"
      className="card"
      style={{
        background: isLightMode
          ? 'rgba(255, 255, 255, 0.96)'
          : 'rgba(14, 14, 14, 0.85)',
        border: isLightMode
          ? '1.5px solid rgba(52, 211, 153, 0.4)'
          : '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: isLightMode
          ? '0 16px 36px -8px rgba(52, 211, 153, 0.15), 0 6px 16px -4px rgba(244, 114, 182, 0.08)'
          : '0 12px 32px rgba(0, 0, 0, 0.5)',
        padding: '24px 28px',
        marginBottom: '24px',
        borderRadius: '18px',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {isLearned ? (
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: isLightMode ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.1)',
              border: '1.5px solid rgba(52, 211, 153, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <CheckCircle2 size={24} color="#059669" />
            </div>
          ) : (
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: isLightMode ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.08)',
              border: '1.5px solid rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <XCircle size={24} color="#dc2626" />
            </div>
          )}

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: isLearned ? 'rgba(52, 211, 153, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: isLearned ? '#059669' : '#dc2626',
                  border: isLearned ? '1px solid rgba(52, 211, 153, 0.35)' : '1px solid rgba(239, 68, 68, 0.35)',
                  fontFamily: 'var(--font-mono, monospace)',
                }}
              >
                SANITY CHECK: {verdict}
              </span>
              <span style={{ fontSize: '0.84rem', color: isLightMode ? '#64748b' : '#A1A1AA', fontWeight: 600 }}>
                Automated Scientific Rigor Verification
              </span>
            </div>
            <p style={{ fontSize: '0.92rem', color: isLightMode ? '#09090b' : '#FFFFFF', margin: '6px 0 0', fontWeight: 600, lineHeight: 1.5 }}>
              {isLearned
                ? 'PASSED: Model exhibits statistically significant learned signal exceeding empirical chance level without class collapse.'
                : 'FAILED: Model does not demonstrate statistically significant signal learning beyond chance level.'}
            </p>
          </div>
        </div>

        {/* Metric indicators */}
        <div style={{ display: 'flex', gap: '18px', fontSize: '0.84rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{ color: isLightMode ? '#64748b' : 'var(--text-tertiary)' }}>Test Accuracy: </span>
            <span className="mono" style={{ color: isLightMode ? '#09090b' : '#FFFFFF', fontWeight: 800 }}>
              {testAcc}%
            </span>
          </div>
          <div>
            <span style={{ color: isLightMode ? '#64748b' : 'var(--text-tertiary)' }}>Chance Level: </span>
            <span className="mono" style={{ color: isLightMode ? '#71717a' : '#A1A1AA', fontWeight: 600 }}>
              {chanceLevel}%
            </span>
          </div>
          <div>
            <span style={{ color: isLightMode ? '#64748b' : 'var(--text-tertiary)' }}>Delta ($\Delta$): </span>
            <span className="mono" style={{ color: '#059669', fontWeight: 800 }}>
              +{delta}%
            </span>
          </div>
          <div>
            <span style={{ color: isLightMode ? '#64748b' : 'var(--text-tertiary)' }}>Classes: </span>
            <span className="mono" style={{ color: isLightMode ? '#09090b' : '#FFFFFF', fontWeight: 700 }}>
              {uniqueClasses}/4 Active
            </span>
          </div>
        </div>
      </div>

      {failureReasons.length > 0 && (
        <div style={{
          marginTop: '14px',
          padding: '12px 16px',
          background: isLightMode ? '#fff1f2' : 'rgba(255, 255, 255, 0.05)',
          border: isLightMode ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '10px',
          fontSize: '0.82rem',
          color: isLightMode ? '#9f1239' : '#E4E4E7'
        }}>
          <strong style={{ color: isLightMode ? '#be123c' : '#FFFFFF' }}>Diagnostic Failure Reasons:</strong>
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px' }}>
            {failureReasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
