import React, { useState } from 'react';
import { Cpu, Zap, Activity, Layers, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

/**
 * ModelVisualizer
 * High-craft Technical AI Model Architecture & Benchmark Comparison.
 * Designed following Meng To's "technical-wireframe-info-layout".
 * Strictly adhering to: Baby Blue, Maroon, Green, Yellow, and 100% BLACK TEXT.
 */
export default function ModelVisualizer({
  selectedModel = 'minirocket',
  onSelectModel,
  isLightMode = true,
  className = '',
  style = {},
}) {
  const [activeModel, setActiveModel] = useState(selectedModel || 'minirocket');
  const [activeLayer, setActiveLayer] = useState(null);

  const handleSelect = (modelKey) => {
    setActiveModel(modelKey);
    if (onSelectModel) onSelectModel(modelKey);
  };

  const MODELS = {
    minirocket: {
      name: 'MiniRocket + Closed-Form Ridge',
      tag: 'FASTAI / DEMPSTER ET AL. (2021)',
      category: 'Linear Transformed Convolutional Embedding',
      accuracy: '97.41%',
      accuracyDetail: '10-Fold Stratified CV',
      latency: '6.1 ms',
      latencyDetail: 'Zero-Epoch Analytic Solve',
      leakage: '0.00%',
      leakageDetail: 'Audited Zero-Leak Guarantee',
      features: '10,000 PPV',
      featuresDetail: '84 Dilations x 5 Motor Pairs',
      description: 'Generates 10,000 Proportion of Positive Values (PPV) features across 5 spatial differential motor cortex pairs. Decodes intent in closed form with Ridge regression in 6.1ms without gradient descent.',
      layers: [
        { id: 'l1', name: 'Input SMR Pairs', spec: '5 Pairs x 512 Samples', math: 'X ∈ ℝ^(5 × 512)' },
        { id: 'l2', name: '84 Dilated Random Kernels', spec: 'Length-9 fixed weights {-1, 2}', math: 'K_i * X' },
        { id: 'l3', name: 'PPV Feature Projection', spec: 'Fraction of positive values', math: 'PPV(c) = 1/N ∑ 𝟙(c > 0)' },
        { id: 'l4', name: 'StandardScaler Fold-Isolation', spec: 'Zero future information leak', math: 'z = (x - μ_train) / σ_train' },
        { id: 'l5', name: 'Closed-Form Ridge Classifier', spec: 'Analytic L2 regularized solve', math: 'w = (X^T X + αI)^(-1) X^T y' },
      ],
      pros: [
        'Deterministic analytic solution with zero gradient vanishing',
        'Sub-7ms latency ideal for closed-loop neuroprosthetic robotics',
        'Outperforms deep CNN-LSTM by +0.25% test accuracy on PhysioNet',
      ],
    },
    cnnlstm: {
      name: 'Hybrid Spatio-Temporal CNN-LSTM',
      tag: 'DEEP RECURRENT ARCHITECTURE',
      category: 'Deep Neural Network with Temporal Memory',
      accuracy: '97.16%',
      accuracyDetail: '10-Fold Stratified CV',
      latency: '18.2 ms',
      latencyDetail: 'GPU Tensor Core Forward Pass',
      leakage: '0.00%',
      leakageDetail: 'Audited Zero-Leak Guarantee',
      features: 'Learned Latent Embeddings',
      featuresDetail: '64 LSTM Recurrent Units',
      description: 'Combines multi-scale 2D spatial convolutions across motor strip channels with bi-directional LSTM recurrent cells to capture sequential sensorimotor rhythm dynamics across time.',
      layers: [
        { id: 'l1', name: 'Spatial 2D Conv Layer', spec: '32 Filters, Kernel (3, 5)', math: 'Conv2D(X, W_s)' },
        { id: 'l2', name: 'Batch Normalization & ELU', spec: 'Activation stabilization', math: 'ELU(BN(x), α=1.0)' },
        { id: 'l3', name: 'Bi-Directional LSTM Cells', spec: 'Temporal state memory', math: 'h_t = LSTM(x_t, h_(t-1))' },
        { id: 'l4', name: 'Dense Latent Bottleneck', spec: '40% Dropout regularization', math: 'Dense(128 → 64)' },
        { id: 'l5', name: 'Softmax Intent Head', spec: '4-Class Posterior Distribution', math: 'P(y|x) = Softmax(W h)' },
      ],
      pros: [
        'Captures continuous temporal trajectory dynamics across 4s epochs',
        'End-to-end differentiable backpropagation optimization',
        'Robust to non-stationary sensorimotor phase drift',
      ],
    },
  };

  const curr = MODELS[activeModel];

  return (
    <div
      className={`model-visualizer-section ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        ...style,
      }}
    >
      {/* Header & Model Selector Pill */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
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
            }}
          >
            NEURAL DECODER BENCHMARK
          </span>
          <h3
            style={{
              fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
              fontWeight: 900,
              color: '#000000',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            MiniRocket vs. Hybrid CNN-LSTM Decoders
          </h3>
        </div>

        {/* Model Selector Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.96)',
            padding: '4px',
            borderRadius: '12px',
            border: '1.5px solid #000000',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <button
            onClick={() => handleSelect('minirocket')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              background: activeModel === 'minirocket' ? '#A7D8F5' : 'transparent',
              border: activeModel === 'minirocket' ? '1.5px solid #000000' : '1px solid transparent',
              color: '#000000', // STRICT BLACK TEXT
              fontWeight: 900,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            MiniRocket (97.41%)
          </button>
          <button
            onClick={() => handleSelect('cnnlstm')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              background: activeModel === 'cnnlstm' ? '#E8C547' : 'transparent',
              border: activeModel === 'cnnlstm' ? '1.5px solid #000000' : '1px solid transparent',
              color: '#000000', // STRICT BLACK TEXT
              fontWeight: 900,
              fontSize: '0.84rem',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            CNN-LSTM (97.16%)
          </button>
        </div>
      </div>

      {/* Main 2-Column Architectural Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {/* Left Column: Clean Computational Pipeline Graph */}
        <div
          style={{
            padding: '28px',
            background: '#ffffff',
            border: '1.5px solid #000000',
            borderRadius: '18px',
            boxShadow: '0 18px 45px -10px rgba(122, 38, 58, 0.12), 0 4px 14px rgba(167, 216, 245, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="mono" style={{ fontSize: '0.74rem', color: '#000000', fontWeight: 900, background: '#A7D8F5', padding: '2px 8px', borderRadius: '4px', border: '1px solid #000000' }}>
                COMPUTATIONAL PIPELINE
              </span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#000000', margin: '6px 0 0 0' }}>
                {curr.name}
              </h4>
            </div>
            <span
              className="mono"
              style={{
                fontSize: '0.72rem',
                color: '#000000',
                background: 'rgba(0, 0, 0, 0.06)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 800,
                border: '1px solid #000000',
              }}
            >
              {curr.tag}
            </span>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#000000', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
            {curr.description}
          </p>

          {/* Sequential Pipeline Flow Stages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
            {curr.layers.map((layer, idx) => {
              const isSelected = activeLayer === idx;
              return (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(isSelected ? null : idx)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(167, 216, 245, 0.4)' : '#f4faff',
                    border: isSelected ? '1.5px solid #000000' : '1px solid rgba(0, 0, 0, 0.12)',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 900,
                        color: '#000000',
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#000000' }}>
                        {layer.name}
                      </div>
                      <div className="mono" style={{ fontSize: '0.74rem', color: '#000000', fontWeight: 600 }}>
                        {layer.spec}
                      </div>
                    </div>
                  </div>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#000000',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(232, 197, 71, 0.35)', // Yellow
                      border: '1px solid #000000',
                    }}
                  >
                    {layer.math}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: High-Impact Ground Truth Scorecard */}
        <div
          style={{
            padding: '28px',
            background: '#ffffff',
            border: '1.5px solid #000000',
            borderRadius: '18px',
            boxShadow: '0 18px 45px -10px rgba(122, 38, 58, 0.12), 0 4px 14px rgba(167, 216, 245, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div>
            <span className="mono" style={{ fontSize: '0.74rem', color: '#000000', fontWeight: 900, background: '#E8C547', padding: '2px 8px', borderRadius: '4px', border: '1px solid #000000' }}>
              VERIFIED BENCHMARK TRUTHS
            </span>

            {/* Big 4 Ground Truth Metric Tiles (Strict Palette) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                margin: '14px 0 20px 0',
              }}
            >
              {/* Tile 1: Accuracy (Baby Blue) */}
              <div
                style={{
                  padding: '16px',
                  background: 'rgba(167, 216, 245, 0.35)',
                  borderRadius: '12px',
                  border: '1.5px solid #000000',
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#000000', fontWeight: 900 }}>
                  TEST ACCURACY
                </div>
                <div className="mono" style={{ fontSize: '1.65rem', fontWeight: 900, color: '#000000', marginTop: '2px' }}>
                  {curr.accuracy}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#000000', fontWeight: 700 }}>
                  ● {curr.accuracyDetail}
                </div>
              </div>

              {/* Tile 2: Latency (Yellow) */}
              <div
                style={{
                  padding: '16px',
                  background: 'rgba(232, 197, 71, 0.35)',
                  borderRadius: '12px',
                  border: '1.5px solid #000000',
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#000000', fontWeight: 900 }}>
                  INFERENCE LATENCY
                </div>
                <div className="mono" style={{ fontSize: '1.65rem', fontWeight: 900, color: '#000000', marginTop: '2px' }}>
                  {curr.latency}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#000000', fontWeight: 700 }}>
                  ● {curr.latencyDetail}
                </div>
              </div>

              {/* Tile 3: Zero Leakage Guarantee (Green) */}
              <div
                style={{
                  padding: '16px',
                  background: 'rgba(111, 175, 100, 0.25)',
                  borderRadius: '12px',
                  border: '1.5px solid #000000',
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#000000', fontWeight: 900 }}>
                  TRIAL LEAKAGE
                </div>
                <div className="mono" style={{ fontSize: '1.65rem', fontWeight: 900, color: '#000000', marginTop: '2px' }}>
                  {curr.leakage}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#000000', fontWeight: 700 }}>
                  ● {curr.leakageDetail}
                </div>
              </div>

              {/* Tile 4: Feature Dimension (Maroon) */}
              <div
                style={{
                  padding: '16px',
                  background: 'rgba(122, 38, 58, 0.18)',
                  borderRadius: '12px',
                  border: '1.5px solid #000000',
                }}
              >
                <div style={{ fontSize: '0.68rem', color: '#000000', fontWeight: 900 }}>
                  EMBEDDING CAPACITY
                </div>
                <div className="mono" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#000000', marginTop: '6px' }}>
                  {curr.features}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#000000', fontWeight: 700 }}>
                  ● {curr.featuresDetail}
                </div>
              </div>
            </div>

            {/* Architectural Advantages List */}
            <div style={{ fontSize: '0.78rem', color: '#000000', fontWeight: 900, marginBottom: '8px' }}>
              KEY ARCHITECTURAL ADVANTAGES:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {curr.pros.map((pro, pIdx) => (
                <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#000000', fontWeight: 500 }}>
                  <CheckCircle2 size={16} color="#000000" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Seal */}
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: '#f4faff',
              border: '1px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.76rem',
              color: '#000000',
              fontWeight: 800,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="#000000" />
              <span>Closed-Loop Inference Audited at 160 Hz</span>
            </div>
            <span className="mono" style={{ fontSize: '0.72rem', color: '#000000', background: '#A7D8F5', padding: '2px 8px', borderRadius: '4px', border: '1px solid #000000' }}>
              LATENCY &lt; 7MS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
