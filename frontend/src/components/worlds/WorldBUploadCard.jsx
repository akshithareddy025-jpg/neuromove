import React, { useState, useRef } from 'react';
import { UploadCloud, Paperclip, Database, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { uploadTrial, loadSampleTrial } from '../../api/client';

/**
 * WorldBUploadCard — file upload at the TOP of the Sylva world.
 *
 * Bright white glassmorphism to match the Sylva background. Feeds the same
 * trial state as the telemetry instrument below (holding a file here arms
 * every downstream chapter: telemetry, validation, proof).
 */
const ACCEPTED_EXT = ['.edf', '.csv', '.npy', '.npz'];
const MAX_BYTES = 50 * 1024 * 1024;

export default function WorldBUploadCard({ onTrialLoaded = null, className = '', style = {} }) {
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [attachedName, setAttachedName] = useState('');
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const takeTrial = (trial) => {
    if (onTrialLoaded) onTrialLoaded(trial);
  };

  const handleFile = async (file) => {
    if (!file || busy) return;
    const lower = (file.name || '').toLowerCase();
    if (!ACCEPTED_EXT.some((ext) => lower.endsWith(ext))) {
      setError(`Unsupported file type. Allowed: ${ACCEPTED_EXT.join(', ')}`);
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('File exceeds the 50 MB attach limit.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await uploadTrial(file);
      if (!res?.trial_id) throw new Error('Upload returned no trial id. Retry the attach.');
      setAttachedName(file.name);
      takeTrial({
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
      });
    } catch (err) {
      setError(err?.message || 'Attach failed. Ensure the backend is running.');
    } finally {
      setBusy(false);
    }
  };

  const handleSample = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const trial = await loadSampleTrial(null, true);
      setAttachedName(trial?.dataset_name || 'sample trial');
      takeTrial(trial);
    } catch (err) {
      setError(err?.message || 'Sample load failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="world-b-upload"
      aria-label="Upload EEG file"
      className={className}
      style={{ width: '100%', marginBottom: '56px', scrollMarginTop: '90px', ...style }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 24px 60px -12px rgba(22, 34, 20, 0.20), inset 0 1px 0 rgba(255, 255, 255, 1)',
          padding: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(45, 106, 79, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UploadCloud size={20} color="#2D6A4F" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#152015', letterSpacing: '-0.02em' }}>
              Bring Your Own Brain Data
            </h2>
            <p className="mono" style={{ margin: '2px 0 0 0', fontSize: '0.72rem', color: '#6B7A71', letterSpacing: '0.08em' }}>
              UPLOAD FIRST · EVERY CHAPTER BELOW READS THIS TRIAL
            </p>
          </div>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          onClick={() => fileRef.current?.click()}
          style={{
            marginTop: '20px',
            border: `2px dashed ${dragging ? '#2D6A4F' : 'rgba(45, 106, 79, 0.35)'}`,
            background: dragging ? 'rgba(45, 106, 79, 0.08)' : 'rgba(45, 106, 79, 0.04)',
            borderRadius: '16px',
            padding: '28px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED_EXT.join(',')}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = '';
              if (file) handleFile(file);
            }}
            style={{ display: 'none' }}
            aria-label="Attach EEG file"
          />
          <Paperclip size={22} color="#2D6A4F" style={{ marginBottom: '8px' }} />
          <div style={{ fontWeight: 700, color: '#152015', fontSize: '0.95rem' }}>
            {busy ? 'Attaching…' : dragging ? 'Drop to attach' : 'Drop an EEG file here or click to browse'}
          </div>
          <div className="mono" style={{ fontSize: '0.72rem', color: '#6B7A71', marginTop: '4px' }}>
            .edf · .csv · .npy · .npz — max 50 MB
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={handleSample}
            disabled={busy}
            style={{
              flex: 1,
              minWidth: '200px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              borderRadius: '12px',
              background: '#2D6A4F',
              border: '1px solid #2D6A4F',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: busy ? 'not-allowed' : 'pointer',
              opacity: busy ? 0.7 : 1,
            }}
          >
            {busy ? <Loader2 size={15} className="animate-spin" /> : <Database size={15} />}
            {busy ? 'Working…' : 'Or load a benchmark trial'}
          </button>
        </div>

        {(attachedName || error) && (
          <div
            role="status"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '16px',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: error ? '#9B2C2C' : '#2D6A4F',
              background: error ? 'rgba(155, 44, 44, 0.07)' : 'rgba(45, 106, 79, 0.08)',
              border: error ? '1px solid rgba(155, 44, 44, 0.3)' : '1px solid rgba(45, 106, 79, 0.3)',
            }}
          >
            {error ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}
            <span>{error ? `Attach error: ${error}` : `Ready: ${attachedName} armed for telemetry, validation and proof.`}</span>
          </div>
        )}
      </div>
    </section>
  );
}
