import React, { useState } from 'react';
import { ArrowRight, Activity } from 'lucide-react';

/**
 * CardSwap
 * Interactive 3D stacked card deck for the 4 Motor Imagery Intent Classes.
 * Strictly using allowed palette: Baby Blue, Maroon, Green, Yellow, and 100% BLACK TEXT.
 */
export default function CardSwap({
  cards = [
    {
      code: 'T1',
      title: 'T1: Left Fist',
      desc: 'Contralateral C4 electrode sensorimotor desynchronization (Mu 8-12 Hz & Beta 18-30 Hz).',
      metric: '97.9% Precision',
      color: '#A7D8F5', // Baby Blue
      pair: 'C3 - C4',
    },
    {
      code: 'T2',
      title: 'T2: Right Fist',
      desc: 'Contralateral C3 electrode sensorimotor activation with dominant right-hand lateralization.',
      metric: '98.5% Recall',
      color: '#7A263A', // Maroon
      pair: 'C1 - C2',
    },
    {
      code: 'T3',
      title: 'T3: Both Fists',
      desc: 'Bilateral sensorimotor cortex power suppression across differential pre-motor pairs.',
      metric: '98.0% Recall',
      color: '#6FAF64', // Green
      pair: 'FC3 - FC4',
    },
    {
      code: 'T4',
      title: 'T4: Both Feet',
      desc: 'Medial central Cz / CPz power desynchronization with distinct somatosensory topography.',
      metric: '99.0% Recall',
      color: '#E8C547', // Yellow
      pair: 'CP3 - CP4',
    },
  ],
  isLightMode = true,
  onCardSelect,
  className = '',
  style = {},
}) {
  const [deck, setDeck] = useState([0, 1, 2, 3]);

  const swapToBack = () => {
    setDeck((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <div
      className={`card-swap-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        height: '270px',
        perspective: '1200px',
        userSelect: 'none',
        ...style,
      }}
    >
      {deck.map((cardIdx, stackPos) => {
        const item = cards[cardIdx];
        const isTop = stackPos === 0;

        // Depth styles for stacked cards
        const translateY = stackPos * 14;
        const scale = 1 - stackPos * 0.05;
        const opacity = 1 - stackPos * 0.22;
        const zIndex = 10 - stackPos;

        return (
          <div
            key={item.code}
            onClick={() => {
              if (isTop) {
                swapToBack();
                if (onCardSelect) onCardSelect(item);
              }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '240px',
              padding: '24px',
              borderRadius: 'var(--radius-md, 16px)',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(20px)',
              border: `1.5px solid ${isTop ? '#000000' : 'rgba(167, 216, 245, 0.6)'}`,
              boxShadow: isTop
                ? '0 20px 48px -10px rgba(122, 38, 58, 0.16), 0 10px 24px -5px rgba(167, 216, 245, 0.3)'
                : '0 8px 24px rgba(0, 0, 0, 0.05)',
              transform: `translate3d(0, ${translateY}px, ${-stackPos * 40}px) scale(${scale})`,
              opacity,
              zIndex,
              cursor: isTop ? 'pointer' : 'default',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    background: item.color,
                    color: '#000000', // STRICT BLACK TEXT
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1px solid #000000',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {item.code}
                </span>
                <span style={{ color: '#000000', fontWeight: 900, fontSize: '1.05rem' }}>
                  {item.title}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.74rem',
                  color: '#000000', // STRICT BLACK TEXT
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: 800,
                  background: 'rgba(167, 216, 245, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid #000000',
                }}
              >
                <Activity size={12} color="#000000" />
                {item.pair}
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.88rem', color: '#000000', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              {item.desc}
            </p>

            {/* Card Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                paddingTop: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '0.82rem',
                  color: '#000000', // STRICT BLACK TEXT
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  background: item.color,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid #000000',
                }}
              >
                {item.metric}
              </div>
              {isTop && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#000000', fontWeight: 800 }}>
                  <span>Click to Swap</span>
                  <ArrowRight size={13} color="#000000" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
