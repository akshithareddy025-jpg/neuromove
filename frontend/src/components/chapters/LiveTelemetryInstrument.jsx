import React, { useState, useEffect, useRef } from 'react';
import GlassPanel from '../glass/GlassPanel';
import MetricChip from '../glass/MetricChip';
import LivePlaybackView from '../LivePlaybackView';
import { RefreshCw, Paperclip } from 'lucide-react';
import { loadSampleTrial, uploadTrial } from '../../api/client';

/**
 * LiveTelemetryInstrument
 * Chapter 07: Live Neural Telemetry & Interactive Instrument.
 * Light instrument island (zero black surfaces) floating over the page.
 * Unified oscilloscope, trial stream, frequency spectrum, and classifier prediction.
 */
export default function LiveTelemetryInstrument({
  currentTrial,
  onTrialLoaded,
  selectedModel = 'minirocket',
  onSelectModel,
  onPrediction = null,
  className = '',
  style = {},
}) {
  const [internalTrial, setInternalTrial] = useState(currentTrial);
  const [model, setModel] = useState(selectedModel);
  const [attachedName, setAttachedName] = useState('');
  const [uploadError, setUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const ACCEPTED_EXT = ['.edf', '.csv', '.npy', '.npz'];
  const MAX_BYTES = 50 * 1024 * 1024;

  useEffect(() => {
    if (currentTrial) setInternalTrial(currentTrial);
  }, [currentTrial]);

  const handleLoadSample = (forceNew = false) => {
    loadSampleTrial(null, forceNew)
      .then((trial) => {
        setInternalTrial(trial);
        if (onTrialLoaded) onTrialLoaded(trial);
      })
      .catch((err) => console.warn('Could not load sample trial:', err));
  };

  const handleModelChange = (newModel) => {
    setModel(newModel);
    if (onSelectModel) onSelectModel(newModel);
  };

  const handleAttachFile = async (event) => {
    const file = event.target?.files?.[0];
    // Reset input so the same file can be re-attached after an error.
    if (event.target) event.target.value = '';
    if (!file) return;
    const lower = (file.name || '').toLowerCase();
    const okExt = ACCEPTED_EXT.some((ext) => lower.endsWith(ext));
    if (!okExt) {
      setUploadError(`Unsupported file type. Allowed: ${ACCEPTED_EXT.join(', ')}`);
      return;
    }
    if (file.size > MAX_BYTES) {
      setUploadError('File exceeds the 50 MB attach limit.');
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const res = await uploadTrial(file);
      if (!res?.trial_id) {
        throw new Error('Upload succeeded but returned no trial id. Retry the attach.');
      }
      const trial = {
        trial_id: res.trial_id,
        channels: res.channels,
        num_channels: res.num_channels,
        duration_s: res.duration_s,
        sampling_rate: res.sampling_rate,
        samples_per_channel: res.samples_per_channel,
        message: res.message,
        ground_truth_class: res.ground_truth_class,
        ground_truth_code: res.ground_truth_code,
        ground_truth_label: res.ground_truth_label,
        dataset_name: res.dataset_name || file.name,
      };
      setAttachedName(file.name);
      setInternalTrial(trial);
      if (onTrialLoaded) onTrialLoaded(trial);
      if (onPrediction) onPrediction(null);
    } catch (err) {
      setUploadError(err?.message || 'Attach failed. Ensure backend server is running on http://127.0.0.1:8000.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="telemetry-instrument" className={`live-telemetry-instrument telemetry-light ${className}`} style={{ width: '100%', marginBottom: '84px', padding: '28px', scrollMarginTop: '90px', ...style }}>
      {/* Chapter Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <MetricChip label="CHAPTER 07" color="skyblue" />
        <span style={{ fontSize: '0.76rem', color: '#6B7A71', fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          REAL-TIME TELEMETRY & INFERENCE INSTRUMENT
        </span>
      </div>

      <div style={{ maxWidth: '820px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: 'clamp(2.0rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#1C2420', lineHeight: 1.12, letterSpacing: '-0.035em', margin: '0 0 14px 0' }}>
          Live Neural Telemetry & Decoding Instrument
        </h2>
        <p style={{ fontSize: '1.02rem', color: '#43514A', lineHeight: 1.68, margin: 0, fontWeight: 400 }}>
          Interact directly with the BCI2000 telemetry feed. Stream raw and filtered sensorimotor potentials, test zero-leakage classification across the 4 motor imagery classes, and inspect dual-model decision boundaries in real time.
        </p>
      </div>

      {/* Control Bar — Attach sits FIRST, before any sample-trial action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
        {/* Model Selector Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', color: '#6B7A71', fontFamily: 'monospace' }}>MODEL:</span>
          <div
            style={{
              display: 'inline-flex',
              padding: '3px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(28, 36, 32, 0.12)',
            }}
          >
            <button
              onClick={() => handleModelChange('minirocket')}
              style={{
                background: model === 'minirocket' ? 'rgba(30, 103, 214, 0.12)' : 'transparent',
                border: 'none',
                color: model === 'minirocket' ? '#1E67D6' : '#6B7A71',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              MiniRocket (6.1ms)
            </button>
            <button
              onClick={() => handleModelChange('cnn_lstm')}
              style={{
                background: model === 'cnn_lstm' ? 'rgba(180, 130, 20, 0.14)' : 'transparent',
                border: 'none',
                color: model === 'cnn_lstm' ? '#8A6D1B' : '#6B7A71',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              CNN-LSTM (14.8ms)
            </button>
          </div>
        </div>

        {/* Attach + Load Trial Actions (attach FIRST) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXT.join(',')}
            onChange={handleAttachFile}
            style={{ display: 'none' }}
            aria-label="Attach EEG file"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="premium-pill"
            style={{ background: '#2D6A4F', borderColor: '#2D6A4F', color: '#FFFFFF' }}
            title={`Attach EEG file (${ACCEPTED_EXT.join(', ')}, max 50 MB)`}
          >
            <Paperclip size={14} color="#FFFFFF" />
            <span>{uploading ? 'Attaching…' : attachedName ? `Attached: ${attachedName}` : 'Attach EEG file'}</span>
          </button>
          <button
            onClick={() => handleLoadSample(true)}
            className="premium-pill"
          >
            <RefreshCw size={13} color="#1C2420" />
            <span>Fetch Random Test Trial</span>
          </button>
        </div>
      </div>
      {(attachedName || uploadError) && (
        <div style={{ fontSize: '0.78rem', color: uploadError ? '#9B2C2C' : '#2D6A4F', marginBottom: '20px', fontFamily: 'monospace' }} role="status">
          {uploadError ? `Attach error: ${uploadError}` : `Ready: ${attachedName} attached. Run the stream or experiment below.`}
        </div>
      )}

      {/* Embedded Live Instrument */}
      <GlassPanel
        variant="hero"
        glow
        style={{
          padding: '28px',
          background: 'rgba(255, 255, 255, 0.92)',
          borderColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 24px 60px -12px rgba(22, 34, 20, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1)',
        }}
      >
        <LivePlaybackView
          currentTrial={internalTrial}
          selectedModel={model}
          onTrialLoaded={(t) => {
            setInternalTrial(t);
            if (onTrialLoaded) onTrialLoaded(t);
            if (onPrediction) onPrediction(null);
          }}
          onPrediction={onPrediction}
        />
      </GlassPanel>
    </section>
  );
}
