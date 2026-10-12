# NeuroMove 2.0: Master UI Specification & AI Prompt Blueprint

> **Instructions for the AI:** You are tasked with building a modern, high-precision Brain-Computer Interface (BCI) web application UI named **NeuroMove 2.0**.
> This document contains the complete context, design tokens, view architectures, component breakdown, backend API contracts (REST + WebSocket), and self-contained mock data needed to build this UI from scratch or iterate upon it.

---

## 1. System Abstract & Domain Overview

### What is NeuroMove?
**NeuroMove 2.0** is an enterprise-grade Brain-Computer Interface (BCI) decoding dashboard designed to classify 4-class human motor imagery (MI) electroencephalogram (EEG) signals in real time with sub-10ms inference latency.
It is based on the neuroimaging paper:
> *"Motor imagery EEG signal classification using minimally random convolutional kernel transform and hybrid deep learning"*, **Jamal Hwaidi & Mohamed Chahine Ghanem**, *NeuroImage* 328 (2026) 121816.

### The 4 Motor Imagery Intent Classes:
1. **Class T1 ($L$):** Left Fist Kinesthetic Motor Imagery (`#38BDF8` or Pure White `#FFFFFF`)
2. **Class T2 ($R$):** Right Fist Kinesthetic Motor Imagery (`#60A5FA` or Silver `#D4D4D8`)
3. **Class T3 ($BLR$):** Bilateral Hand (Both Fists) Kinesthetic Motor Imagery (`#10B981` or Zinc `#A1A1AA`)
4. **Class T4 ($BF$):** Bilateral Lower Limb (Both Feet) Kinesthetic Motor Imagery (`#F59E0B` or Slate `#71717A`)

### The Dual Champion Machine Learning Models:
Both architectures achieve $\ge 97\%$ test accuracy on the 5-subject PhysioNet EEGMMIDB benchmark cohort (4,050 samples, 810 held-out test trials):
* **Model 1: MiniRocket + RidgeClassifierCV (5-Pair Spatial Fusion):**
  * **97.41% Test Accuracy** | Macro F1: **0.9740** | Macro ROC-AUC: **0.9991**
  * Features: 10,000 PPV (Proportion of Positive Values) from 5 symmetric motor cortex electrode pairs (FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4).
  * Latency: **7.06 ms / window** (Ultra-fast closed-form L2 Ridge solver).
* **Model 2: Hybrid CNN-LSTM Spatio-Temporal Deep Learning:**
  * **97.16% Test Accuracy** | Macro F1: **0.9716** | Macro ROC-AUC: **0.9978**
  * Architecture: 2D Tensor `(N, 256 timesteps, 10 channels)` $\rightarrow$ Multi-scale Conv1D (k=7, 5, 3) $\rightarrow$ 128-unit Bidirectional LSTM $\rightarrow$ Dense Softmax.
  * Parameters: 342,564 weights. Latency: **2.15 ms GPU / 44.6 ms CPU**.

### The Breakthrough Story (Why This UI Exists):
Baseline deep learning literature claimed ~98% accuracy on PhysioNet MI data, but naive implementations collapsed to **29.96%** (near random chance 25%) due to **temporal sub-window data leakage** (overlapping 2-second windows leaking noise between train and test splits). NeuroMove resolved this by enforcing **strict trial-level zero-leakage grouping**, 2D spatio-temporal tensor preservation, and 5-pair motor cortex spatial filtering. The UI must prominently communicate this scientific rigor.

---

## 2. Design System & Visual Aesthetics

### Visual Aesthetic Direction:
* **Theme:** **Ink & Paper / Monochromatic Obsidian Precision** with surgical neon accents.
* **Mood:** Editorial scientific research instrument, high-tech BCI lab console, Apple/Linear-grade polish.
* **Golden Rule of Layout (60-30-10):**
  * **60% Foundation:** Pitch Black & Obsidian (`#000000`, `#050505`).
  * **30% Glass Surfaces:** Dark Charcoal Glass cards (`#0E0E0E`, `#141414`, `rgba(16, 16, 16, 0.82)`) with subtle borders (`rgba(255, 255, 255, 0.12)`) and deep backdrop blur (24px).
  * **10% Accents:** Pure Stark White (`#FFFFFF`), bright silver (`#E4E4E7`), emerald status pulses (`#10B981`), and electric cyan glows (`#38BDF8`).

### Color Palette (CSS Variables):
```css
:root {
  /* Backgrounds */
  --bg-app: #000000;
  --bg-surface-0: #050505;
  --bg-surface-1: #0e0e0e;
  --bg-surface-2: #141414;
  --bg-surface-3: #1c1c1c;

  /* Glassmorphism */
  --glass-bg: rgba(16, 16, 16, 0.82);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-border-hover: rgba(255, 255, 255, 0.32);
  --glass-blur: 24px;
  --glass-highlight: rgba(255, 255, 255, 0.05);

  /* Typography */
  --text-primary: #ffffff;
  --text-secondary: #e4e4e7;
  --text-tertiary: #a1a1aa;
  --text-muted: #71717a;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Motor Classes */
  --class-t1: #38bdf8; /* T1: Left Fist (L) */
  --class-t2: #60a5fa; /* T2: Right Fist (R) */
  --class-t3: #10b981; /* T3: Both Fists (BLR) */
  --class-t4: #f59e0b; /* T4: Both Feet (BF) */

  /* Status Colors */
  --status-online: #10b981;
  --status-warning: #f59e0b;
  --status-error: #f43f5e;
}
```

---

## 3. Technology Stack & Key Dependencies

* **Core Framework:** React 19 (or Next.js 15) with Vite.
* **Styling:** Pure Modern CSS (or Tailwind CSS if specified) using custom glass tokens and keyframe animations.
* **Charts & Telemetry:**
  * `recharts` (for Confusion Matrices, ROC Curves, Class Breakdown bar charts, and Radar graphs).
  * HTML5 Canvas 2D (for 60fps real-time EEG waveform oscilloscope and scanning cursor).
* **Icons:** `lucide-react` (Brain, Activity, Radio, Cpu, Zap, Layers, CheckCircle2, AlertTriangle, Play, Pause, RefreshCw, BarChart2, ShieldCheck, ChevronRight).
* **Ports & Serving:**
  * Frontend: `http://localhost:5173` (or `5174`)
  * Backend: `http://127.0.0.1:8000` (FastAPI)
  * Dual-mode support: Real HTTP/WS backend connection + Instant offline mock simulation (`VITE_USE_MOCKS=true`).

---

## 4. Complete Views & Component Architecture

The application is structured into 4 primary views accessible via a floating capsule navigation bar:

```
App Shell
├── Floating Capsule Header (Brand, 163 Hz Status Pulse, View Switcher, Active Trial Pill)
├── Main Viewport
│   ├── [1] DashboardView (/dashboard)
│   ├── [2] LiveView (/live)
│   ├── [3] LeaderboardView (/leaderboard)
│   └── [4] ExplainerView (/explainer)
└── Editorial 4-Column Scientific Footer
```

### View 1: Dashboard (`DashboardView`)
The executive showcase and transparency benchmark.
1. **Hero Section:**
   - Badge pill: `NEUROMOVE 2.0 · BCI MOTOR IMAGERY NEURAL DECODING`
   - Headline: *"Sub-10ms 4-Class Neural Intent Decoding with Dual 97%+ Champions"*
   - Dual Champion Metric Pillars:
     * **MiniRocket + Ridge:** `97.41%` Test Accuracy | `7.06ms` Latency | `10,000 PPV`
     * **Hybrid CNN-LSTM:** `97.16%` Test Accuracy | `2.15ms` Latency | `342K Params`
   - Action Buttons: `[Launch Live Playback]` (switches to Live tab) & `[Explore Benchmark Data]`.
2. **Accuracy Story Panel:**
   - Before vs After callout: Why literature models collapsed to `29.96%` and how NeuroMove resolved temporal sub-window leakage to achieve dual `97%+`.
3. **Asymmetric Bento Grid Metrics:**
   - Card 1: Production Test Accuracy (`97.41%` with animated counter).
   - Card 2: Inference Latency (`7.06 ms / window`, 141 Hz throughput).
   - Card 3: Macro ROC-AUC (`0.9991` near-perfect separation).
   - Card 4: Rigorous Zero-Leakage Validation (Pass mark on all 5 subjects).
4. **Interactive 3D Motor Imagery Deck (`CardSwap`):**
   - 4 stackable cards representing T1 (Left Fist), T2 (Right Fist), T3 (Both Fists), T4 (Both Feet).
   - Shows contralateral motor cortex activations, Rolandic Mu/Beta desynchronization, and EEG electrode maps.
5. **Evaluation Benchmark Charts:**
   - **Interactive Confusion Matrix Heatmap:** 4x4 matrix with true vs predicted classes, normalized percentages, and precision/recall annotations.
   - **Multi-Class ROC-AUC Curves:** Recharts multi-line chart rendering T1, T2, T3, T4 curves with AUC values.
   - **Per-Class Breakdown:** Grouped bar chart comparing Precision, Recall, and F1 across all 4 classes.
6. **Academic Trust & Contributors Section:**
   - Citations to Hwaidi & Ghanem (NeuroImage 2026), PhysioNet EEGMMIDB, and research team contributor cards.

---

### View 2: Live Playback & Ingestion (`LiveView`)
The hands-on BCI laboratory console where users test EEG trials in real-time.
1. **Top Split: Ingestion & Model Selector:**
   - **Upload Panel:** Drag-and-drop zone supporting `.edf`, `.npy`, `.npz`, and `.csv` files.
   - **Sample Benchmarks:** One-click quick load buttons:
     * `[Load Random Real PhysioNet Trial]`
     * `[Test 10 Diverse Benchmark Suite]` (batch runs 10 trials through both models and reports consensus).
     * Dropdown list of 10 pre-indexed datasets (S001 - S005, runs 4 and 6, all 4 motor classes).
   - **Model Selector Switcher:**
     * `MiniRocket + Ridge` (7.06ms, 97.41%)
     * `Hybrid CNN-LSTM` (2.15ms, 97.16%)
     * `Both Models (Consensus Comparator)`
2. **Live Dual-Trace Oscilloscope (`LivePlaybackView`):**
   - High-performance HTML5 Canvas element drawing:
     * Continuous 4.0-second EEG waveform trace (128 samples at 128 Hz for motor cortex electrode pair `C3-C4`).
     * Neon oscilloscope beam styling with white glow.
     * Real-time vertical scanning time cursor moving smoothly across the trial duration.
     * Grid lines with millivolt amplitude markers and second ticks (0.0s to 4.0s).
3. **Streaming Playback Controls:**
   - `[Start Live Playback]` (triggers WebSocket streaming of 9 consecutive sub-windows).
   - `[Instant Prediction]` (runs immediate REST API prediction).
   - Progress bar (0% to 100% across the 9 sub-windows).
4. **Real-time Probability Meters (`ProbabilityBars`):**
   - 4 animated horizontal progress bars dynamically updating on each streaming frame for T1, T2, T3, T4.
   - Dynamic highlight on the currently winning class with neon glow.
5. **Consensus & Decision Callout (`DecisionCallout`):**
   - Displays final classification result: Ground Truth vs Predicted Label.
   - Match/Mismatch badge: Green checkmark for correct classification.
   - Dual-model agreement indicator (e.g. `100% Consensus: Both models agree on T4: Both Feet`).
   - Latency gauge: `7.06 ms` inference time.

---

### View 3: Subject Leaderboard (`LeaderboardView`)
Cross-subject generalization and within-subject cross-validation breakdown.
1. **Subject Accuracies Table:**
   - Displays all 5 PhysioNet cohort subjects: `Person-1 (S001)`, `Person-2 (S002)`, `Person-3 (S003)`, `Person-4 (S004)`, `Person-5 (S005)`.
   - Columns: Subject ID, MiniRocket Accuracy, CNN-LSTM Accuracy, Champion Model, Delta vs Chance (25%).
   - Highlights 100.0% accuracy on S004.
2. **Mode Toggle:**
   - Switch between `Pooled (Cross-Subject Stratified)` and `Subject-Dependent (10-Fold CV)`.
3. **Summary Statistics:**
   - Mean cohort accuracy: MiniRocket `97.41%` vs CNN-LSTM `97.16%`.
   - Standard deviation across subjects: `< 1.2%`.

---

### View 4: Signal & Neurobiology Explainer (`ExplainerView`)
Interactive educational module explaining the neurophysiology and signal processing.
1. **Raw vs Filtered Waveform Comparison:**
   - Interactive dual chart displaying raw noisy 64-channel EEG vs 4th-order zero-phase Butterworth bandpass filtered signal (8–30 Hz $\mu/\beta$ sensorimotor rhythm).
2. **The 5 Symmetric Motor Cortex Electrode Pairs:**
   - Interactive scalp diagram or card breakdown:
     * `FC3 - FC4`: Premotor Cortex & Supplementary Motor Area (motor planning).
     * `C5 - C6`: Lateral Sensorimotor Strip (distal hand/finger somatotopy).
     * `C3 - C4`: Primary Hand Motor Strip (Rolandic mu rhythm, contralateral ERD).
     * `C1 - C2`: Medial Sensorimotor Strip (proximal arm and foot representation).
     * `CP3 - CP4`: Centroparietal Somatosensory Area (proprioceptive kinesthetic feedback).
3. **Event-Related Desynchronization (ERD) Guide:**
   - Explains how kinesthetic imagery causes power suppression in the contralateral motor strip and rebound synchronization in the ipsilateral hemisphere.

---

## 5. Complete REST & WebSocket API Specification

The backend server runs on `http://127.0.0.1:8000`.

### Endpoints Overview

| Method | Endpoint | Description | Request | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` or `/api/health` | Health check & system status | None | `{"status": "online", "version": "2.0.0", ...}` |
| `POST` | `/api/upload` | Ingests `.edf`, `.npy`, `.npz`, `.csv` file | `multipart/form-data` with `file` | `UploadResponse` |
| `GET` | `/api/sample-datasets` | List of 10 curated benchmark datasets | None | `List[BenchmarkDatasetInfo]` |
| `POST` | `/api/sample-trial` | Preload real benchmark trial | Query: `?dataset_id=...&random_pick=true` | `UploadResponse` |
| `POST` | `/api/benchmark-10` | Batch evaluate all 10 datasets across models | Query: `?model=minirocket\|cnn_lstm\|both` | `Benchmark10Response` |
| `GET` | `/api/trial/{trial_id}/signals` | Downsampled raw & 5-pair filtered signals | None | Signal preview JSON |
| `POST` | `/api/predict/{trial_id}` | Run inference on uploaded trial | Query: `?model=minirocket\|cnn_lstm\|both` | `List[ModelPrediction]` |
| `GET` | `/api/metrics/{model}` | Get cached confusion matrix & ROC data | Query: `?mode=pooled\|subject_dependent` | `MetricSummary` |
| `GET` | `/api/subjects` | Get per-subject accuracy leaderboard | Query: `?mode=pooled\|subject_dependent` | `LeaderboardResponse` |
| `WS` | `/api/stream/{trial_id}` | WebSocket stream of sequential 9 sub-windows | WebSocket connection | 9 `StreamFrame` JSON objects then `completed` |

---

### Detailed JSON Schemas

#### 1. `UploadResponse`
```json
{
  "trial_id": "trial_a1b2c3d4e5f6",
  "channels": ["FC3", "FC4", "C5", "C6", "C3", "C4", "C1", "C2", "CP3", "CP4"],
  "num_channels": 64,
  "duration_s": 4.0,
  "sampling_rate": 128.0,
  "samples_per_channel": 9,
  "message": "PhysioNet Run R06 recognized: Ground Truth is T4 (Both Feet (BF)).",
  "ground_truth_class": 3,
  "ground_truth_code": "T4",
  "ground_truth_label": "Both Feet (BF)",
  "dataset_name": "Dataset #4: S001 · Both Feet (T4)"
}
```

#### 2. `ModelPrediction`
```json
[
  {
    "model": "minirocket",
    "predicted_class": 3,
    "predicted_label": "T4: Both Feet (BF)",
    "class_probabilities": {
      "T1": 0.012,
      "T2": 0.008,
      "T3": 0.015,
      "T4": 0.965
    },
    "latency_ms": 7.06
  },
  {
    "model": "cnn_lstm",
    "predicted_class": 3,
    "predicted_label": "T4: Both Feet (BF)",
    "class_probabilities": {
      "T1": 0.021,
      "T2": 0.011,
      "T3": 0.019,
      "T4": 0.949
    },
    "latency_ms": 2.15
  }
]
```

#### 3. WebSocket Streaming Frame (`StreamFrame`)
Sent over `ws://127.0.0.1:8000/api/stream/{trial_id}` every ~220ms:
```json
{
  "trial_id": "trial_a1b2c3d4e5f6",
  "frame_index": 0,
  "timestamp_ms": 0.0,
  "window_start_s": 0.0,
  "window_end_s": 2.0,
  "predicted_label": "T4: Both Feet (BF)",
  "predicted_class": 3,
  "class_probabilities": {
    "T1": 0.12,
    "T2": 0.08,
    "T3": 0.14,
    "T4": 0.66
  }
}
```
When stream finishes, the server sends:
```json
{
  "status": "completed",
  "trial_id": "trial_a1b2c3d4e5f6"
}
```

#### 4. `MetricSummary`
```json
{
  "model_name": "minirocket",
  "mode": "pooled",
  "evaluation_protocol": "5-Pair Motor Cortex MiniRocket (Person-1 to Person-5)",
  "global_accuracy": 0.9741,
  "macro_precision": 0.9742,
  "macro_recall": 0.9741,
  "macro_f1": 0.9740,
  "per_class_metrics": {
    "T1": { "label": "T1: Left Fist (L)", "precision": 0.9795, "recall": 0.9409, "f1_score": 0.9598, "support": 203 },
    "T2": { "label": "T2: Right Fist (R)", "precision": 0.9707, "recall": 0.9851, "f1_score": 0.9779, "support": 202 },
    "T3": { "label": "T3: Both Fists (BLR)", "precision": 0.9751, "recall": 0.9800, "f1_score": 0.9776, "support": 200 },
    "T4": { "label": "T4: Both Feet (BF)", "precision": 0.9713, "recall": 0.9902, "f1_score": 0.9807, "support": 205 }
  },
  "confusion_matrix": [
    [0.9409, 0.0197, 0.0246, 0.0148],
    [0.0050, 0.9851, 0.0000, 0.0099],
    [0.0100, 0.0050, 0.9800, 0.0050],
    [0.0049, 0.0049, 0.0000, 0.9902]
  ],
  "roc_auc": {
    "macro_auc": 0.9991,
    "T1": 0.9981,
    "T2": 0.9992,
    "T3": 0.9992,
    "T4": 0.9998
  },
  "per_subject_accuracy": {
    "S001": 0.9673,
    "S002": 0.9759,
    "S003": 0.9675,
    "S004": 1.0000,
    "S005": 0.9613
  },
  "inference_latency": { "ms_per_sample": 7.06, "ms_per_trial": 63.54 },
  "trainable_parameters": 40004,
  "learned_signal": true
}
```

---

## 6. Self-Contained Offline Simulation & Mock Data Kit

To allow the UI to run seamlessly out-of-the-box (even without the Python backend running), implement an internal mock fallback.

### 1. 10 Curated Benchmark Trial Fixtures
```javascript
export const FALLBACK_DATASETS = [
  { dataset_id: 'ds_01', name: 'Dataset #1: S001 · Left Fist (T1)', subject_id: 'S001', run: 4, ground_truth_class: 0, ground_truth_code: 'T1', ground_truth_label: 'Left Fist (L)' },
  { dataset_id: 'ds_02', name: 'Dataset #2: S001 · Right Fist (T2)', subject_id: 'S001', run: 4, ground_truth_class: 1, ground_truth_code: 'T2', ground_truth_label: 'Right Fist (R)' },
  { dataset_id: 'ds_03', name: 'Dataset #3: S001 · Both Fists (T3)', subject_id: 'S001', run: 6, ground_truth_class: 2, ground_truth_code: 'T3', ground_truth_label: 'Both Fists (BLR)' },
  { dataset_id: 'ds_04', name: 'Dataset #4: S001 · Both Feet (T4)', subject_id: 'S001', run: 6, ground_truth_class: 3, ground_truth_code: 'T4', ground_truth_label: 'Both Feet (BF)' },
  { dataset_id: 'ds_05', name: 'Dataset #5: S002 · Left Fist (T1)', subject_id: 'S002', run: 4, ground_truth_class: 0, ground_truth_code: 'T1', ground_truth_label: 'Left Fist (L)' },
  { dataset_id: 'ds_06', name: 'Dataset #6: S002 · Right Fist (T2)', subject_id: 'S002', run: 4, ground_truth_class: 1, ground_truth_code: 'T2', ground_truth_label: 'Right Fist (R)' },
  { dataset_id: 'ds_07', name: 'Dataset #7: S003 · Both Fists (T3)', subject_id: 'S003', run: 6, ground_truth_class: 2, ground_truth_code: 'T3', ground_truth_label: 'Both Fists (BLR)' },
  { dataset_id: 'ds_08', name: 'Dataset #8: S003 · Both Feet (T4)', subject_id: 'S003', run: 6, ground_truth_class: 3, ground_truth_code: 'T4', ground_truth_label: 'Both Feet (BF)' },
  { dataset_id: 'ds_09', name: 'Dataset #9: S004 · Right Fist (T2)', subject_id: 'S004', run: 4, ground_truth_class: 1, ground_truth_code: 'T2', ground_truth_label: 'Right Fist (R)' },
  { dataset_id: 'ds_10', name: 'Dataset #10: S005 · Both Feet (T4)', subject_id: 'S005', run: 6, ground_truth_class: 3, ground_truth_code: 'T4', ground_truth_label: 'Both Feet (BF)' },
];
```

### 2. Offline WebSocket Frame Generator (220ms Tick)
```javascript
export function createMockStream(trialId, { onFrame, onComplete }) {
  let frameIndex = 0;
  const ds = FALLBACK_DATASETS.find(d => trialId && trialId.includes(d.dataset_id)) || FALLBACK_DATASETS[3];
  
  const interval = setInterval(() => {
    if (frameIndex >= 9) {
      clearInterval(interval);
      if (onComplete) onComplete({ status: 'completed', trial_id: trialId });
      return;
    }
    const confidence = +(0.55 + (frameIndex / 9) * 0.35).toFixed(2);
    const remainder = +((1.0 - confidence) / 3).toFixed(3);
    
    const probs = { T1: remainder, T2: remainder, T3: remainder, T4: remainder };
    probs[ds.ground_truth_code] = confidence;

    onFrame({
      trial_id: trialId,
      frame_index: frameIndex,
      timestamp_ms: +(frameIndex * 444.4).toFixed(1),
      window_start_s: +(frameIndex * 0.25).toFixed(2),
      window_end_s: +(frameIndex * 0.25 + 2.0).toFixed(2),
      predicted_label: `${ds.ground_truth_code}: ${ds.ground_truth_label}`,
      predicted_class: ds.ground_truth_class,
      class_probabilities: probs,
    });
    frameIndex++;
  }, 220);

  return { close: () => clearInterval(interval) };
}
```

---

## 7. Master Prompt to Provide to the Other AI

> Copy and paste the prompt below directly to another AI (such as Claude 3.7 Sonnet, GPT-4o, Cursor, v0, Bolt, or Lovable):

```markdown
You are an expert Principal Frontend Engineer and UI/UX Designer specialized in scientific web instruments and Brain-Computer Interfaces (BCIs).

Please build the complete frontend for **NeuroMove 2.0: Dual-Champion Motor Imagery EEG Neural Decoding System**.

### Core Requirements:
1. **Design Theme:** Ink & Paper / Obsidian High-Contrast Dark Mode.
   - Primary: Obsidian Black (`#000000`, `#050505`)
   - Surfaces: Monochromatic Charcoal Glass (`#0E0E0E`, `rgba(16, 16, 16, 0.82)`) with subtle borders (`rgba(255, 255, 255, 0.12)`) and 24px blur
   - Accents: Pure Stark White (`#FFFFFF`), Emerald Status (`#10B981`), Electric Cyan (`#38BDF8`), and Amber (`#F59E0B`)
   - Font: Inter for UI, JetBrains Mono for telemetry, numbers, and latencies.

2. **The 4 Intent Classes:**
   - T1: Left Fist (L)
   - T2: Right Fist (R)
   - T3: Both Fists (BLR)
   - T4: Both Feet (BF)

3. **Views to Implement:**
   - **Shell:** Floating Capsule Navigation bar with Brand, 163 Hz Online pulse badge, View switcher tabs, and trial status.
   - **Dashboard View:**
     * Hero section with Dual Champion metric pillars (MiniRocket 97.41% @ 7.06ms, CNN-LSTM 97.16% @ 2.15ms).
     * Accuracy Story banner explaining how temporal sub-window leakage was solved (resolving 29.96% -> 97%+).
     * Bento Grid of core metrics (Accuracy, Latency, ROC-AUC, Zero-Leakage).
     * 3D tactile card deck for exploring the 4 motor classes.
     * Confusion Matrix Heatmap, ROC-AUC Curves, and Class Breakdown charts.
   - **Live Playback View:**
     * File Upload dropzone (.edf, .npy, .csv) + One-click "Load Sample Trial" and "Run 10 Benchmark Suite" buttons.
     * Model selector (MiniRocket, CNN-LSTM, or Both Models comparator).
     * Real-time HTML5 2D Canvas Oscilloscope rendering C3-C4 motor cortex EEG signals with scanning cursor.
     * WebSocket streaming playback controls and live updating probability meters for T1-T4.
     * Decision and consensus callout comparing ground truth against model predictions.
   - **Subject Leaderboard View:**
     * Interactive table displaying performance across all 5 PhysioNet subjects (S001-S005).
     * Mode switcher: Pooled vs Subject-Dependent (10-fold CV).
   - **Signal Explainer View:**
     * Visual comparison of Raw EEG vs 8–30 Hz Butterworth bandpass filtered signals.
     * Breakdown of the 5 bilateral motor cortex electrode pairs (FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4).

4. **Dual Backend & Offline Simulation:**
   - Connect to FastAPI backend endpoints (`/api/health`, `/api/upload`, `/api/sample-trial`, `/api/predict/{trial_id}`, `/api/stream/{trial_id}`, `/api/metrics/{model}`, `/api/subjects`).
   - Implement seamless fallback mocks so the entire application is 100% functional, interactive, and demonstratable offline without a running backend.

Deliver clean, production-ready, highly polished React code with rich micro-animations, glassmorphism, and responsive styling.
```
