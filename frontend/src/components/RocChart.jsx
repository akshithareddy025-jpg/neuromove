import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { CLASS_MAPPING } from '../api/client';

export default function RocChart({
  rocCurves = {},
  rocAuc = {},
  isLightMode = true,
  className = '',
  style = {},
}) {
  // Transform ROC curves into point array for Recharts
  const fprs = [0.0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

  const interpolateTpr = (curve, targetFpr) => {
    if (!curve || !curve.fpr || !curve.tpr || curve.fpr.length === 0) return targetFpr;
    const { fpr, tpr } = curve;
    for (let i = 0; i < fpr.length - 1; i++) {
      if (targetFpr >= fpr[i] && targetFpr <= fpr[i + 1]) {
        const ratio = (targetFpr - fpr[i]) / Math.max(1e-6, fpr[i + 1] - fpr[i]);
        return +(tpr[i] + ratio * (tpr[i + 1] - tpr[i])).toFixed(3);
      }
    }
    return targetFpr <= 0.5 ? 0.0 : 1.0;
  };

  const chartData = fprs.map((f) => {
    return {
      fpr: f,
      chance: f,
      T1: interpolateTpr(rocCurves?.T1, f),
      T2: interpolateTpr(rocCurves?.T2, f),
      T3: interpolateTpr(rocCurves?.T3, f),
      T4: interpolateTpr(rocCurves?.T4, f),
    };
  });

  return (
    <div
      className={`card ${className}`}
      id="roc-chart-card"
      style={{
        height: '100%',
        background: isLightMode ? 'rgba(255, 255, 255, 0.96)' : undefined,
        border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.3)' : undefined,
        boxShadow: isLightMode ? '0 16px 36px -8px rgba(244, 114, 182, 0.15)' : undefined,
        ...style,
      }}
    >
      <div className="card-header">
        <div>
          <h3
            className={`card-title ${isLightMode ? 'shining-black-heading' : ''}`}
            style={{
              fontSize: '1.05rem',
              color: isLightMode ? '#09090b' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <TrendingUp size={18} color={isLightMode ? '#db2777' : '#FFFFFF'} />
            Receiver Operating Characteristic (ROC) Curves
          </h3>
          <p className="card-subtitle" style={{ color: isLightMode ? '#64748b' : undefined }}>
            True Positive Rate vs False Positive Rate per motor imagery class
          </p>
        </div>

        <div className="mono" style={{
          background: isLightMode ? '#fdf2f8' : 'rgba(255, 255, 255, 0.08)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-sm, 8px)',
          fontSize: '0.78rem',
          color: isLightMode ? '#09090b' : '#FFFFFF',
          border: isLightMode ? '1px solid rgba(244, 114, 182, 0.35)' : '1px solid rgba(255, 255, 255, 0.2)',
          fontWeight: 700,
        }}>
          MACRO AUC: <strong style={{ color: isLightMode ? '#db2777' : '#FFFFFF' }}>{(rocAuc?.macro_auc ?? 0.6383).toFixed(4)}</strong>
        </div>
      </div>

      <div style={{ height: '260px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isLightMode ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.05)'}
            />
            <XAxis
              dataKey="fpr"
              stroke={isLightMode ? '#64748b' : '#A1A1AA'}
              fontSize={12}
              tickFormatter={(v) => v.toFixed(1)}
              domain={[0, 1]}
            />
            <YAxis
              stroke={isLightMode ? '#64748b' : '#A1A1AA'}
              fontSize={12}
              tickFormatter={(v) => v.toFixed(1)}
              domain={[0, 1]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isLightMode ? '#ffffff' : 'var(--bg-surface-2)',
                border: isLightMode ? '1.5px solid rgba(244, 114, 182, 0.4)' : '1px solid var(--border-card)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: isLightMode ? '#09090b' : '#ffffff',
                boxShadow: isLightMode ? '0 8px 24px rgba(244, 114, 182, 0.2)' : undefined,
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: '0.75rem',
                paddingTop: '8px',
                color: isLightMode ? '#334155' : undefined,
              }}
            />

            {/* Diagonal Chance Line */}
            <Line
              type="monotone"
              dataKey="chance"
              name="Chance Baseline"
              stroke={isLightMode ? '#94a3b8' : '#52525B'}
              strokeDasharray="4 4"
              dot={false}
              strokeWidth={1.5}
            />

            {/* Class Curves */}
            <Line
              type="monotone"
              dataKey="T1"
              name={`T1: Left Fist (AUC ${(rocAuc?.T1 ?? 0.5934).toFixed(3)})`}
              stroke={CLASS_MAPPING.T1.color}
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="T2"
              name={`T2: Right Fist (AUC ${(rocAuc?.T2 ?? 0.5868).toFixed(3)})`}
              stroke={CLASS_MAPPING.T2.color}
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="T3"
              name={`T3: Both Fists (AUC ${(rocAuc?.T3 ?? 0.5983).toFixed(3)})`}
              stroke={CLASS_MAPPING.T3.color}
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="T4"
              name={`T4: Both Feet (AUC ${(rocAuc?.T4 ?? 0.7749).toFixed(3)})`}
              stroke={CLASS_MAPPING.T4.color}
              dot={false}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
