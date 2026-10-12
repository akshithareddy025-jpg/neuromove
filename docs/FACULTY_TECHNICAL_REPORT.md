# NeuroMove-X – Complete Technical Understanding

> **Audit scope:** This report is based on a direct inspection of the NeuroMove 2.0 repository
> (`C:\Users\rohan\neuromove`) performed on 2026-10-08. Every number and claim is tagged with its
> evidence source. Sections that could not be verified from the repository are explicitly marked.
>
> **Files inspected (primary evidence):**
> `README.md`, `docs/ACCURACY_STORY.md`, `architecture_diagrams.md`, `CONTRIBUTORS.md`,
> `app/data/loader.py`, `app/data/preprocessing.py`, `app/models/minirocket_pipeline.py`,
> `app/models/cnn_lstm.py`, `app/services/metrics.py`, `app/services/benchmark_manager.py`,
> `scripts/train.py`, `scripts/train_v2.py`, `scripts/train_high_accuracy.py`, `scripts/run_ablation.py`,
> `scripts/predict.py`, `tests/*`, all `artifacts/*.json`, `artifacts/*.joblib`, `artifacts/*.keras`,
> `artifacts/test_split.joblib` (inspected programmatically), `datasets/` (EDF inventory), `data/physionet/S089/`.

---

## 0. Executive Verdict (read this first)

The repository contains **two different evaluation regimes**, and they must never be confused:

| Regime | Where | What it does | Result | Leakage status |
|---|---|---|---|---|
| **A. Window-level split** (headline numbers) | `scripts/train_high_accuracy.py`, `scripts/train_v2.py --split-mode window` (default) | Flattens each 4-second trial into **9 overlapping 2s windows** (87.5% overlap), then does `train_test_split` **on windows**. | MiniRocket **97.74%** (artifact) / claimed 97.41% (README); CNN-LSTM **97.16%** | **Sub-window temporal leakage present** — windows from the same trial appear in both train and test (verified from `artifacts/test_split.joblib`: 972 test windows belong to 462 distinct trials, and each of those trials has only 1–6 of its 9 windows in the test set, so sibling windows are in training). |
| **B. Trial-level / within-subject evaluation** (honest numbers) | `scripts/run_ablation.py`, `scripts/train.py --mode subject_dependent`, `scripts/train_v2.py --split-mode trial` | Groups all 9 windows of a trial together; Stratified 10-fold CV **per subject** with trial-disjoint folds; zero window leakage enforced and unit-tested. | MiniRocket 5-pair fusion **46.20%** (S001–S004 avg; peak subject S002 **55.82%**); CSP+LDA **47.22%**; FastICA baseline **34.55%**; bandpass C3–C4 **39.12%**; S089 **29.06%**; 5-subject overall **42.78%** | No trial/window overlap; **but** it is subject-*dependent* (same subject in train and test), which is the protocol the reference paper actually used. |

**The single most important sentence in this report:** The ~97% figures are *not* valid
subject-independent or trial-disjoint test performance. They are window-level results in which
temporally overlapping segments of the same trials were split between train and test. Under strict
trial-level evaluation, the same MiniRocket 5-pair pipeline scores ~46%, independently corroborated
by a classical CSP+LDA benchmark at ~47% (both far above the 25% chance level, and consistent with
published non-invasive MI-BCI literature).

The repository itself contains this exact analysis in `docs/ACCURACY_STORY.md`, while the `README.md`
simultaneously advertises the 97% numbers as "verified zero-leakage". A faculty member who inspects
`train_high_accuracy.py` or `test_split.joblib` will see the window-level split. **The student must
own this distinction proactively — it is the strongest part of the project if presented honestly.**

---

## 1. Project Overview

**NeuroMove 2.0** is a 4-class motor-imagery (MI) EEG decoding project built on the PhysioNet EEG
Motor Movement/Imagery Database (EEGMMIDB). It is a partial reproduction and methodological audit of:

> Hwaidi & Ghanem, "Motor imagery EEG signal classification using minimally random convolutional
> kernel transform and hybrid deep learning", *NeuroImage* 328 (2026) 121816. *(cited in README;
> not independently verified in this audit)*

**What the AI/ML part of the repository actually contains (verified):**

- A custom NumPy **MiniRocket** transform (84 canonical length-9 kernels, dilations up to 28,
  Proportion-of-Positive-Values pooling) + **`RidgeClassifierCV`**.
- A Keras **CNN-LSTM** (convolutional feature extractor + bidirectional LSTM, 342,564 trainable params).
- A classical **CSP + shrinkage LDA** baseline (MNE `CSP`).
- A preprocessing pipeline: 160→128 Hz resampling, Common Average Referencing (CAR), zero-phase
  Butterworth 8–30 Hz band-pass (production), and FastICA band-isolation (baseline/ablation only).
- Two evaluation regimes: a window-level split (leaky, 97%) and trial-level within-subject
  10-fold cross-validation (honest, 34–47%).
- Exhaustive metrics artifacts (`artifacts/metrics_*.json`), a learning-sanity check, and unit tests.

**Excluded from this report by request:** FastAPI routers, frontend, deployment. They exist in the
repo (`app/routers/`, `frontend/`) but are not discussed.

---

## 2. Problem Definition

**Task:** Given a 4-second EEG recording during cued motor imagery, classify which of four imagined
movements the subject performed:

| Class ID | Label | Meaning |
|---|---|---|
| 0 | T1 | Left fist (kinesthetic motor imagery) |
| 1 | T2 | Right fist |
| 2 | T3 | Both fists |
| 3 | T4 | Both feet |

- **Chance level:** exactly 25.00% (balanced 4-class task) — stated repeatedly in code and docs, e.g.
  `metrics_minirocket.json → sanity_check.chance_level = 0.25`.
- **Source of labels:** PhysioNet run structure — runs 04/08/12 contain T1=left fist vs T2=right fist;
  runs 06/10/14 contain T1=both fists vs T2=both feet. T0 (rest) cues are discarded.
  *(Verified in `app/data/loader.py`, `extract_trials_from_raw` / `extract_trials_from_event_file`.)*

**Complete flow (as implemented):**

```
EDF recording (64ch @ 160 Hz)
→ resample to 128 Hz (anti-alias 4:5 polyphase)
→ Common Average Reference (CAR)
→ zero-phase Butterworth band-pass 8–30 Hz  (or FastICA band isolation in ablation baseline)
→ cue-aligned 4.0 s trial extraction (512 samples)
→ 9 overlapping 2.0 s sub-windows (256 samples, step 32 samples = 0.25 s, 87.5% overlap)
→ per-pair serial concatenation [left electrode | right electrode] for 5 motor pairs
  → window vector length 5 × 2 × 256 = 2560
→ MiniRocket PPV features (2,000 kernels/pair → 10,000 features) → StandardScaler → RidgeClassifierCV
   OR  reshape to (256 timesteps, 10 channels) → CNN-LSTM → softmax(4)
→ predicted motor-imagery class + full metrics suite
```

---

## 3. BCI & Motor Imagery Fundamentals

*(Standard domain knowledge, provided so the student can explain the project scientifically.)*

**BCI:** A Brain-Computer Interface decodes neural signals into control commands. It replaces the
usual muscle pathway (brain → nerves → muscles → device) with brain → sensor → decoder → device.
Non-invasive BCIs use sensors outside the skull; **EEG** (electroencephalography) measures summed
post-synaptic cortical potentials at the scalp with millisecond temporal resolution, is cheap, safe,
portable, and has no surgery requirement — at the cost of low spatial resolution and low
signal-to-noise ratio (SNR). That trade-off is why EEG is the dominant non-invasive BCI modality.

**Motor imagery (MI):** the mental rehearsal of a movement without executing it. Imagining — or
preparing — a hand or foot movement modulates the **sensorimotor rhythm** generated by the
sensorimotor cortex:
- **Mu rhythm** (~8–14 Hz, often 8–13 Hz) and **beta rhythm** (~14–30 Hz) recorded over the
  sensorimotor strip.
- **ERD (event-related desynchronization):** a task-related *decrease* in mu/beta power over the
  cortical area controlling the imagined limb. E.g., imagining the right hand produces ERD over the
  left hemisphere (contralateral C3 area).
- **ERS (event-related synchronization):** a task-related *increase* in band power (often post-task
  rebound).
- **C3 and C4** are the 10-10 electrodes over the left and right hand areas of the precentral
  (motor) cortex; contralateral ERD is the physiological fingerprint that makes 2-class left/right MI
  decoding possible at all. The project uses C3–C4 plus four more symmetric pairs spanning the motor
  strip (FC3–FC4, C5–C6, C1–C2, CP3–CP4).

**Why it matters for this project:** if the ERD/ERS signature exists, a classifier can separate
imagined movements from the ongoing background rhythms; if a subject produces weak or inconsistent
ERD (see "BCI illiteracy", Section 16), no classifier can recover it. This is exactly what the
honest evaluation shows: ~46% mean (vs 25% chance) — real but modest signal, consistent with the
literature.

---

## 4. Dataset Details

### 4.1 Dataset used

| Property | Value | Evidence |
|---|---|---|
| Dataset | **PhysioNet EEG Motor Movement/Imagery Database (EEGMMIDB v1.0.0)** | `app/data/loader.py` header; all artifacts |
| Modality | EEG, 64 channels, 10-10 montage (e.g. `Fc5.`, `Fc3.`, … `Iz..`) | verified by loading `datasets/S001/S001R04.edf` (64 ch, sfreq 160.0) |
| Native sampling rate | **160 Hz** | verified from EDF metadata |
| Pipeline sampling rate | **128 Hz** after 4:5 resampling | `preprocessing.resample_signal` |
| Runs used for MI | **04, 06, 08, 10, 12, 14** (the 6 "imagery" runs) | `PhysioNetLoader.ALL_MI_RUNS` |
| Runs optionally included | execution runs 03,05,07,09,11,13 (`--include-execution`, default off) | `ALL_EXEC_RUNS`, CLI flags |
| Trials per run | 15 cued trials (standard PhysioNet structure) | verified: S001 loads 90 trials over 6 runs |
| Trials per subject | **~90** (21–24 per class); paper protocol balances to **84** (21/class) | verified: S001 = {T1:23, T2:22, T3:21, T4:24} |
| Trial length | **4.0 s** of MI, cue-aligned (rest interval not used) | `extract_trials_from_raw`, `segment_trials` |
| Classes | 4 (T1–T4, Section 2) | code + artifacts |
| Class balance | approximately balanced by design; exact counts vary 21–24/class/subject | verified counts |

### 4.2 Subjects available on disk

- `datasets/S001 … datasets/S020` — **20 subjects**, 14 EDF files each (all runs R01–R14).
  *(Verified by directory listing.)*
- `data/physionet/S089/` — **1 additional subject**, 7 EDFs (R01, R04, R06, R08, R10, R12, R14).
- Total on disk: **21 subjects**; not all were trained on.
- The README's "Person-1 … Person-5" naming normalizes to **S001–S005** (`normalize_subject_id`).

### 4.3 Which subjects are in the actual results

| Result | Subjects | Evidence |
|---|---|---|
| Window-level MiniRocket 97.74% | S001–S005 **+ S014** (6 subjects) | `metrics_minirocket.json → subjects`, `test_split.joblib` subject counts |
| Window-level CNN-LSTM 97.16% | S001–S005 (5 subjects) | `metrics_cnn_lstm.json → per_subject_accuracy` keys, supports sum to 810 |
| Trial-level ablation (MiniRocket/CSP) | S001–S004 | `ablation_summary.joblib`, `run_ablation.py` defaults |
| S089 "BCI illiteracy" case | S089 | `docs/ACCURACY_STORY.md` §5 |
| Paper comparison table | S001–S010 referenced, S089 extra | `scripts/train.py` `paper_subject_ref` |

### 4.4 Multiple datasets?

**No.** Only one dataset (PhysioNet EEGMMIDB). There is no second corpus (no BCI-IV-2a, no
OpenBMI, etc.). There is **no cross-dataset harmonization** anywhere in the repository. The only
"harmonization" present is the subject-ID normalizer (`normalize_subject_id`: `Person-1`, `1`, `P1`,
`s1` → `S001`) and channel-name cleaner (`clean_channel_name`: `Fc3.` → `FC3`). A synthetic EEG
generator exists (`generate_synthetic_trial/dataset`) but is a *fallback/test utility*, not a second
dataset. Whether synthetic data ever entered a saved training run: **not verifiable** from the
artifacts; all saved metrics name real subjects and real EDFs are on disk.

---

## 5. Data Structure

### 5.1 Exact tensor shapes (verified from code)

| Stage | Shape | Meaning |
|---|---|---|
| Raw EDF trial | `(64, 640)` | 64 channels × 4.0 s × 160 Hz |
| After resample | `(64, 512)` | 64 channels × 4.0 s × 128 Hz |
| Per-trial windows (5-pair mode) | `(9, 2560)` | 9 windows × (5 pairs × 2 electrodes × 256 samples) |
| Pooled window matrix | `(N, 2560)` | N = total windows (e.g. 4,050 for 5 subjects; 4,860 for 6) |
| MiniRocket fusion view | `(N, 5, 512)` | auto-reshaped inside `MiniRocketPipeline._prepare_input`; per pair, 512 = [left 256 ‖ right 256] |
| MiniRocket features | `(N, 10000)` | 10,000 PPV features (2,000 kernels × 5 pairs) |
| CNN-LSTM input | `(N, 256, 10)` | 256 timesteps × 10 electrodes (FC3,FC4,C5,C6,C3,C4,C1,C2,CP3,CP4) |

Dimension meaning: **N** = number of EEG windows (epochs); **channels/time** = electrode/time axes.
The 2D `(N, 2560)`/`(N, 10000)` representation suits MiniRocket + linear models (vectorized,
closed-form); the 3D `(N, 256, 10)` representation preserves temporal × spatial structure for the
CNN-LSTM and avoids flattening across electrode boundaries.

### 5.2 Why 9 windows per trial, and the overlap trap

`preprocessing.extract_trial_samples`: 512-sample trial → 9 sub-windows of 256 samples with
`step = (512 − 256) / (9 − 1) = 32` samples = 0.25 s. **Adjacent windows share 87.5% of their
samples.** This is entirely faithful to the reference paper's design (which also extracted 9 samples
per trial for 8,400 trials → 7,560 samples), but it is the source of the leakage risk: windows of
the same trial are near-duplicates, so splitting them across train/test is not a real generalization
test. The repository documents this exact mechanism in `docs/ACCURACY_STORY.md` §1 and in the
README's "Data Leakage in Previous Literature" diagram.

---

## 6. Preprocessing Pipeline

All steps are in `app/data/preprocessing.py`. Production configuration: `filter_method="bandpass"`,
`channel_mode="5_pairs"`, `samples_per_trial=9`.

| Step | Implemented? | Details | Why |
|---|---|---|---|
| **Resampling** | **YES** | `resample_signal`: 160→128 Hz via `scipy.signal.resample_poly` (4:5 up/down, anti-aliasing) | match paper protocol; reduce compute; anti-alias before decimation |
| **Referencing** | **YES** | `apply_common_average_reference`: subtract channel mean per time point (CAR) | suppress common noise; standard EEG practice |
| **Band-pass 8–30 Hz** | **YES (production)** | `bandpass_filter`: 4th-order Butterworth, zero-phase `filtfilt`, 8–30 Hz (mu+beta) | isolate sensorimotor rhythms that carry ERD/ERS |
| **ICA band isolation** | **Implemented, NOT production** | `apply_ica_band_isolation`: sklearn `FastICA` (n_components = min(16, nch), max_iter 200), per-trial; reconstructs band-filtered sources; falls back to band-pass if it fails | reproduces the paper's ICA step; used only in the ablation baseline where it performed **34.55%** vs 39.12% for Butterworth |
| **Notch filter (50/60 Hz)** | **NO** | not present | — |
| **Bad-channel handling** | **NO** | not present | — |
| **Artifact removal / ICA artifact rejection** | **NO** | ICA here is *band isolation*, not eye-blink/EMG rejection; no EOG-based removal, no component rejection, no ASR | — |
| **Eye-blink removal** | **NO** | — | — |
| **Epoching / trial extraction** | **YES** | cue-aligned 4.0 s from annotation onset; T0 rest dropped | aligns data to MI window |
| **Baseline correction** | **NO** (only rest-interval exclusion) | no pre-stimulus mean subtraction | — |
| **Windowing (9×2 s)** | **YES** | `extract_trial_samples` | data augmentation of sample count, paper design |
| **Normalization (MiniRocket)** | **YES** | `StandardScaler` fitted on training features only, inside `MiniRocketPipeline.fit` | scale PPV features for Ridge |
| **Per-window z-score (CNN)** | **YES** | `CNNLSTMModel._normalize`: per-sample mean/std over (time × channel) | stabilizes deep net input; per-sample → no cross-set leakage |
| **Clipping / denoising** | **NO** | — | — |

**ICA explainer (for the faculty):** ICA decomposes multichannel EEG into statistically
independent components (sources). Because eye blinks, muscle activity, and brain rhythms overlap
spatially, ICA is classically used to *remove* artifact components. **In this project ICA is not
used for artifact removal.** In the ablation baseline it is used to *isolate* the 8–30 Hz band by
filtering independent components, following the reference paper. It was **replaced by the
deterministic Butterworth filter in the production pipeline** because per-trial FastICA on 512
sample windows was unstable (non-convergence, sign flips) and empirically *worse* (34.55% vs 39.12%
in trial-level CV).

---

## 7. Label Generation

1. EDF annotations (or companion `.event` files — the dataset folders contain `S001R04.edf.event`
   style files; the loader prefers them, falls back to embedded MNE annotations).
2. Cue labels: `T0` = rest → **dropped**; `T1`/`T2` mapped by run number:
   - Runs 04/08/12 (and execution 03/07/11): `T1`→**0 Left Fist**, `T2`→**1 Right Fist**
   - Runs 06/10/14 (and execution 05/09/13): `T1`→**2 Both Fists**, `T2`→**3 Both Feet**
3. Labels are stored as integer arrays `y` (0–3) alongside window arrays `X`; metadata strings
   `"{subject}_trial{idx:02d}_win{k:02d}"` track provenance.
4. **Balance:** naturally near-balanced (21–24/class/subject). Two balancing mechanisms exist:
   `class_weight="balanced"` in the MiniRocket Ridge (verified in artifacts), `compute_class_weight("balanced")`
   in the CNN (code), and jitter-augmentation oversampling of minority classes
   (`balance_and_augment_training_samples`, used by `train_high_accuracy.py` by default).
   Exact per-run balance is visible in the artifacts (e.g. window-level test = 243/class).
5. Class names are hard-coded `{0: "T1: Left Fist (L)", 1: "T2: Right Fist (R)", 2: "T3: Both Fists (BLR)", 3: "T4: Both Feet (BF)"}`.

---

## 8. Data Splitting

This section separates the two regimes. **Both exist in the repository; use the right one.**

### 8.1 Regime A — window-level split (the 97% results)

- **Code:** `train_high_accuracy.py`: flatten all windows → `train_test_split(test_size=0.20, stratify=y)`.
  `train_v2.py --split-mode window` (default): same, then val = 10% of the training remainder.
- **Splitting unit:** individual 2 s window. Subject ID and trial ID are ignored.
- **Verified consequence (from `artifacts/test_split.joblib`):**
  - 972 test windows (6 subjects incl. S014), balanced 243/class, belonging to **462 distinct trials**.
  - Windows-per-trial histogram in the test set: `{9 windows: 0 trials; 6: 3; 5: 11; 4: 40; 3: 89; 2: 153; 1: 166}`.
  - Since each trial has exactly 9 windows, **every test trial has sibling windows outside the test set**
    (in train/val). For 166 trials only 1 of 9 windows is tested; the other 8 were trained on.
- **Also verified:** `X_test.shape = (972, 2560)`; subjects and trials overlap between train and test by design.
- **Train/val/test approximate sizes (derived from code ratios, 6-subject run):** test 972,
  val ≈ 389, train ≈ 3,499 windows. *(Derived, consistent with artifacts.)*

### 8.2 Regime B — trial-level within-subject CV (the honest results)

- **Code:** `run_ablation.py` (`StratifiedKFold(n_splits=10, shuffle=True, random_state=42)` over
  **trials**, all 9 windows of a trial kept together), `train.py --mode subject_dependent` (same),
  `train_v2.py --split-mode trial` (`partition_trials_zero_leakage`, 70/15/15 per (subject, class)
  with hard assertions).
- **Folds:** 10 per subject, stratified by class over the subject's 84 trials → ~8–9 test trials
  (~72–81 windows) and ~75–76 train trials per fold. Every trial is tested exactly once (OOF).
- **Subject structure:** *within-subject* — the same subject is in train and test. **No unseen-subject
  evaluation exists anywhere in the repository** (verified: no `GroupKFold`, `LeaveOneGroupOut`, or
  `groups=` usage in any file).
- **Unit test:** `tests/test_subject_dependent_cv.py::test_within_subject_cv_splitting_zero_leakage`
  asserts trial disjointness and that each trial is tested exactly once. `tests/test_preprocessing.py::test_strict_zero_data_leakage_split`
  asserts zero trial-ID intersection for the 5:2:3 partition.

### 8.3 Why subject-disjoint and trial-disjoint splits matter

**Random epoch split (what Regime A approximates):** overlapping windows of the same physiological
event land in train and test. The classifier can memorize subject-specific background noise,
voltage drift, and window-specific micro-artifacts shared by 87.5%-overlapping siblings, and the
score is inflated toward ~98%. At use time, on a genuinely new trial, performance collapses to
near chance — this is the exact "CNN-LSTM collapse to 29.96%" phenomenon the project documents
(README §"Scientific Rigor"; `docs/ACCURACY_STORY.md` §1). An EEG epoch is not an independent sample;
the *trial*, not the window, is the unit of generalization.

**Subject-disjoint split (ideal, not implemented):** no subject in both train and test. This tests
whether a decoder transfers to a new person — the real BCI problem. EEG's inter-subject variability
(anatomy, skull conductivity, ERD strength, strategy) makes this much harder; published 4-class MI
cross-subject accuracies are typically far lower than within-subject.

**What we actually have:** trial-disjoint *within-subject* CV (Regime B). That is exactly the
protocol of the reference paper (which did subject-dependent 10-fold CV per Figure 6), and it is
defensible as a reproduction. It is **not** evidence of cross-subject generalization.

---

## 9. Leakage Audit

| Check | Finding | Evidence | Verdict |
|---|---|---|---|
| Subject overlap (train vs test) | All subjects appear in both | Regime A design; `test_split.joblib` subjects | **Subject-dependent by design** (not a leak per se, but the 97% numbers are *not* subject-independent) |
| Trial overlap (windows of one trial across sets) | **YES — leakage in Regime A** | test trials have only 1–6/9 windows in test; sibling windows in train/val | **LEAKAGE DETECTED in the 97% pipeline** |
| Trial overlap (Regime B) | None; assertions + unit tests enforce grouping | `partition_trials_zero_leakage`, `run_ablation` fold loop, tests | **No leakage** |
| Duplicate epochs | Windows are known 87.5%-overlapping by design (not accidental duplication) | `extract_trial_samples` math | Overlap is intentional; risk realized in Regime A |
| Duplicate files | One EDF per run per subject; `.event` companions are label files, not duplicates | directory listing | No duplicates in the training paths |
| Preprocessing leakage | Resampling/CAR/Butterworth are deterministic, per-trial, parameter-free → cannot leak | code | No leakage |
| Normalization leakage | MiniRocket `StandardScaler` fitted inside `fit()` on training features; CNN z-score is per-sample | `minirocket_pipeline.py::fit`, `cnn_lstm.py::_normalize` | No leakage |
| Feature-extraction leakage | MiniRocket kernel dilations/biases fitted on training windows only in each fold (`mr.fit(X_tr)`) | `run_ablation.py` fold loop; `MiniRocketPipeline.fit` | No leakage (given correct split) |
| Hyperparameter leakage | Ridge α selected by `RidgeClassifierCV` internally (GCV on training data); no test-set α search | code | No leakage |
| Test-set reuse during development | Test set re-evaluated by every "load champion and evaluate" run; `train_v2.py` loads existing artifacts and re-scores without retraining | `train_v2.py` artifact-loading branches | **Evaluation-hygiene risk** (repeated scoring of the same test split), not optimization on test |
| Untested: synthetic-data contamination | Synthetic dataset generator exists as fallback; cannot prove no run used it | `loader.generate_synthetic_dataset` | **Not verifiable** |

### Conclusion

> **Leakage detected** in the window-level pipeline that produced the ~97% headline numbers
> (sub-window temporal leakage via window-level splitting of 87.5%-overlapping segments; verified
> from `artifacts/test_split.joblib` and the split code).
>
> **No evidence of leakage** in the trial-level within-subject 10-fold CV pipeline that produced the
> 34–47% numbers (trial grouping asserted and unit-tested).
>
> **Not implemented:** subject-disjoint (cross-subject) evaluation.

---

## 10. Feature Extraction

### 10.1 Techniques actually implemented

| Technique | Status | Where |
|---|---|---|
| **MiniRocket PPV transform** (custom NumPy implementation) | **Used (production)** | `app/models/minirocket_pipeline.py` |
| StandardScaler on PPV features | **Used** | inside `MiniRocketPipeline.fit` |
| Learned CNN-LSTM features | **Used (Model 2)** | `app/models/cnn_lstm.py` |
| CSP (Common Spatial Patterns, 6 components, log variance) | **Used (baseline/ablation only)** | `run_ablation.py` via `mne.decoding.CSP` |
| Band power / PSD / FFT features | **NOT implemented** | — |
| Riemannian/tangent-space features | **NOT implemented** | — |
| Wavelet features | **NOT implemented** | — |

### 10.2 MiniRocket — deep explanation (matching the actual implementation)

**What it is:** MiniRocket (Dempster et al., KDD 2021) is a *deterministic random convolutional
kernel transform* for time series classification. Instead of learning filters, it generates a fixed
bank of random dilated convolutional kernels, applies them to the time series, and summarizes each
kernel's output with a single scalar (PPV). The result is a fixed feature map fed to a linear
classifier. It is **not a neural network**; nothing is learned by backpropagation — only the final
classifier's weights are fitted.

**Actual implementation details (verified in code):**
- **84 canonical kernel patterns** of length 9 (`_generate_84_patterns`): all C(9,2)=36… no, all
  `(i,j)` pairs with 2 positions = **+2** and the other 7 = **−1** → 36… the code does
  `for i in range(9): for j in range(i+1,9)` = C(9,2) = **36**… wait, verified by reading: the loop
  produces 36 patterns, but the docstring says 84. **Correction:** the loop generates C(9,2) = 36
  positions pairs; the code comment says 84, but C(9,2)=36. *(This discrepancy between the code
  comment/docstring — "84 canonical patterns" — and the actual loop, which enumerates 36 combinations,
  is a minor internal inconsistency. The genuine MiniRocket uses a specific set of 84 length-9
  patterns; this implementation enumerates 2-positive-position patterns.)* **Tagged: verify in code
  if challenged; the transform behavior is otherwise correct.**
- **Dilations:** powers of two up to `min(max_dilations=28, (512−1)//8=63)` → `[1, 2, 4, 8, 16]`
  plus the capped value `28` → kernels assigned evenly across dilations (≈334/dilation for 2,000).
- **Biases:** for each kernel, a random quantile q∈[0.1, 0.9] of the convolution output on a random
  training sample; `bias = −quantile`. (Differs from canonical MiniRocket bias selection but serves
  the same purpose: make PPV informative.)
- **Convolution:** valid (no padding) dilated 1D convolution via `numpy.lib.stride_tricks.as_strided`
  — vectorized and fast.
- **PPV pooling:** for each kernel, the proportion of convolution outputs > 0
  (`np.mean((conv + bias) > 0)`), i.e. a single scalar per kernel. PPV is a nonlinearity-free,
  amplitude-invariant summary related to firing rate; it makes the transform robust to small
  amplitude shifts.
- **Feature count:** 2,000 kernels × 5 pairs = **10,000 PPV features** per window.
- **Spatial fusion:** kernels run independently per electrode pair on that pair's 512-sample
  [left ‖ right] vector. Receptive field ≤ 1 + 8×28 = **225 samples** (1.76 s), so most kernels stay
  within one electrode's 256-sample half; a kernel can straddle the left/right junction of that pair
  but never mixes different pairs. This is the "feature-level spatial fusion" the docs describe, and
  it is why the 5-pair model (46.20%) beats the single-pair C3–C4 model (39.12%) in honest CV.
- **Why "Mini":** the kernel bank is tiny, fixed, and the transform is almost deterministic —
  no learned weights, no GPU, CPU-fast. **Why it suits EEG:** MI-relevant structure is temporal
  oscillation (mu/beta bursts); random dilated convolutions sample many frequency/time scales without
  hand-crafted band features; linear readout avoids overfitting on small datasets — a strong fit for
  the ~450–540-trial regime here.

### 10.3 The classifier: Ridge

`RidgeClassifierCV` (scikit-learn): multi-class Ridge regression solved in **closed form** (L2
penalty, SVD-based solver), with the α grid `np.logspace(-1, 6, 25)` selected internally. For
4 classes it trains a one-vs-rest set of linear functions; predictions = argmax of decision values.
`predict_proba` is a softmax over decision values with temperature 0.35 (custom; not a calibrated
probability). **Why Ridge:** with 10,000 features and only ~3,000 training windows, a
strongly-regularized linear model is the correct capacity; it is deterministic, extremely fast to
train, has no hyperparameter fragility beyond α (selected by internal CV/GCV), and matches
MiniRocket's intended readout. The verified α on the saved champion = **42.17** (strong
regularization, consistent with the low SNR).

**Pipeline:** `EEG window (2560) → MiniRocket PPV (10,000) → StandardScaler → RidgeClassifierCV → class`

---

## 11. Models Implemented

| Model | Type | Status | Evidence |
|---|---|---|---|
| **MiniRocket + RidgeClassifierCV** (5-pair fusion) | Random-conv transform + linear classifier | **Implemented AND trained** | `minirocket.joblib` (trained, α=42.17), `metrics_minirocket.json` |
| **CNN-LSTM** (13-layer spatio-temporal) | Deep net (CNN + BiLSTM) | **Implemented AND trained** | `cnn_lstm.keras` (verified summary: 342,564 trainable params) |
| **CSP + shrinkage LDA** | Classical spatial filtering + linear | **Implemented AND evaluated** (no saved model) | `run_ablation.py`, `ablation_summary.joblib` |
| **MiniRocketPerPairClassifier** (decision-level fusion, soft voting) | Ensemble | **Implemented, NOT trained** (no artifact) | class in `minirocket_pipeline.py` |
| Baseline MiniRocket variants (C3–C4, ICA, dil28/32) | Ablations | **Trained/evaluated** | `metrics_minirocket_dil28/32.json`, `metrics_minirocket_superseded_fastica_c3c4.json` |
| SVM, RF, LogReg, EEGNet, Transformer, Mamba, custom nets | — | **NOT implemented** (grep found no such code) | — |

---

## 12. Model-by-Model Deep Explanation

### 12.1 MiniRocket + Ridge (Model 1, "spatial-fusion champion")

- **Input:** `(N, 2560)` = 5 pairs × 2 electrodes × 256 samples.
- **Transform:** 5 independent `MiniRocketTransform`s (2,000 kernels each) → concatenated 10,000 PPV.
- **Classifier:** `RidgeClassifierCV(alphas=logspace(-1,6,25), class_weight="balanced", cv=None)`.
- **Params (trainable):** 40,004 = 10,000×4 weights + 4 intercepts *(verified: `count_parameters`; artifact `trainable_parameters: 40004`)*.
- **Training:** closed-form; measured 184.48 s in the saved run (`metrics_minirocket.json`); no epochs/backprop.
- **Inference (artifact):** 45.91 ms/window, 413.18 ms per 9-window trial on CPU
  (`inference_latency`, benchmark repeats 30). *README claims 7.06 ms — **conflicting numbers; the JSON artifact is the record.***

### 12.2 CNN-LSTM (Model 2)

Verified layer-by-layer from the saved `cnn_lstm.keras`:

| Layer | Spec | Output | Params |
|---|---|---|---|
| L1 Input | — | (None, 256, 10) | 0 |
| L2 Conv1D | 32 filters, k=7, same, ReLU, L2(0.001) + BatchNorm | (256, 32) | 2,272 + 128 |
| L3 Conv1D | 64 filters, k=5, same, ReLU, L2 + BatchNorm | (256, 64) | 10,304 + 256 |
| L4 | MaxPool(2) + Dropout(0.3) | (128, 64) | 0 |
| L5 Conv1D | 128 filters, k=3, same, ReLU, L2 + BatchNorm + MaxPool(2) + Dropout(0.3) | (64, 128) | 24,704 + 512 |
| L6 | **Bidirectional LSTM, 128 units** (+ L2) | (256,) | 263,168 |
| L7 | Dropout(0.4) | (256,) | 0 |
| L8 | Dense(128, ReLU) + BatchNorm + Dropout(0.3) | (128,) | 32,896 + 512 |
| L10 | Dense(64, ReLU) | (64,) | 8,256 |
| L11 | **Dense(4, softmax)** | (4,) | 260 |
| **Total** | | | **342,564 trainable** (1,028,398 incl. optimizer state) |

- **Training config (code defaults / arguments):** Adam, lr default **1e-3** (`train_v2.py`), L2=0.001,
  batch size 32 (wrapper) / 64 (`train_v2` flag default), max 60 epochs, categorical cross-entropy,
  class weights computed balanced, `ReduceLROnPlateau(monitor=val_loss, factor=0.5, patience=4, min_lr=1e-5)`,
  `EarlyStopping(monitor=val_accuracy, patience=15, restore_best_weights)`, best-weight checkpointing,
  per-sample z-score normalization.
- **Metrics artifact:** train acc 98.5%, val acc 97.5%, overfitting gap (train−test) 1.34 pp,
  training time 380.2 s, 44.65 ms/window CPU inference.
- **Doc/code mismatches to know:** the README/architecture docs claim lr 2e-3 → 3.125e-5 with plateau
  scheduling and label smoothing ε=0.05; **label smoothing is not in the code**, and the lr default in
  code is 1e-3. The metrics JSON field `early_stopping_monitor: "val_loss"` disagrees with the code
  (`val_accuracy`).
- **Why CNN:** 1D convolutions learn local temporal waveform patterns (mu/beta bursts) translation-
  invariantly across the 2 s window; multiple kernel sizes (7,5,3) capture multi-scale structure;
  channel dimension (10 electrodes) lets filters combine spatial patterns. **Why LSTM:** mu/beta
  dynamics evolve over time; the BiLSTM models sequential dependence in both directions. **Why
  BiLSTM and not plain RNN:** gates (forget/input/output) preserve long-range dependencies and avoid
  vanishing gradients over the 64-step pooled sequence.

### 12.3 CSP + LDA (classical reference benchmark)

`mne.decoding.CSP(n_components=6, log=True, cov_est="concat")` fitted per fold on 64-channel
8–30 Hz CAR-filtered 4 s trials, then `LinearDiscriminantAnalysis(solver="lsqr", shrinkage="auto")`.
CSP learns spatial filters that maximize variance ratio between classes — the classical MI-BCI
workhorse. It serves as an *independent ceiling check*: 47.22% average, very close to MiniRocket's
46.20%, despite a completely different mathematical paradigm. **No artifact model is saved; results
are in `ablation_summary.joblib` and `docs/ACCURACY_STORY.md`.**

### 12.4 MiniRocketPerPairClassifier (implemented, unused)

Trains one MiniRocket+Ridge per electrode pair and fuses by soft voting. Exists in code; **no
artifact, no metrics** — do not claim it was used.

---

## 13. Training Process

### MiniRocket (closed-form, no backprop)

```
preprocessed windows (train) → MiniRocket fit (dilations + biases on train; per-pair)
→ PPV features (10,000) → StandardScaler.fit (train) → RidgeClassifierCV.fit(GCV alpha)
→ predict on val/test
```
There is no "epoch" or "learning rate". One batch = whole training matrix. The committed α = 42.17.

### CNN-LSTM (gradient-based)

```
train windows → per-sample z-score → batches of 32/64
per batch: forward pass (Conv→BN→ReLU→…→BiLSTM→Dense→softmax)
         → categorical cross-entropy loss (+ L2 penalties)
         → backprop → Adam weight update
per epoch: validation on held-out val windows → ReduceLROnPlateau(val_loss) adjusts lr;
           EarlyStopping(val_accuracy, patience 15) restores best weights
after training: evaluate once on test → metrics JSON
```
- **Loss:** categorical cross-entropy.
- **Optimizer:** Adam (lr 1e-3 default in code).
- **Regularization:** L2 0.001 on Conv/LSTM/Dense; dropout 0.3/0.4/0.3; class weighting; early stopping.
- **Checkpointing:** best val_accuracy weights saved and reloaded.

### Metric vocabulary (for the defense)

- **Training accuracy:** performance on data the model fitted.
- **Validation accuracy:** performance on held-out data used for early stopping/lr scheduling.
- **Test accuracy:** performance on data never used in training *or* model selection — true in the
  code paths (val ≠ test), but the Regime A test split is itself leaky, weakening this claim.
- **OOF (out-of-fold) accuracy:** in k-fold CV, every sample is predicted by the model of the fold
  where it was *not* trained — the Regime B aggregation. Mean of fold accuracies = reported number.
- **Macro-F1:** unweighted mean of per-class F1; every class counts equally. **Per-class F1:** the
  harmonic mean of precision and recall for one class. **Confusion matrix:** 4×4 table of
  true vs predicted class counts (normalized by row in the artifacts); diagonal = correct.

---

## 14. Cross-Validation / OOF

- **Regime B (honest):** `StratifiedKFold(n_splits=10, shuffle=True, random_state=42)` over the
  **84 balanced trials** of one subject at a time (ablation; `train.py` subject-dependent). All 9
  windows of a trial move together. Test fold ≈ 8–9 trials (≈72–81 windows); train fold ≈ 75–76
  trials. Metrics computed on the concatenated out-of-fold predictions (global macro-F1, confusion
  matrix, ROC curves), and per-subject accuracy = mean of the 10 fold accuracies (paper Figure 6
  convention, verified in `MetricsCalculator.evaluate_subject_dependent_cv`).
- **A fold** is one held-out slice; average across folds estimates generalization to unseen trials
  of the same subject. **OOF** matters because it uses every trial for testing exactly once while
  never testing on training trials — unlike training accuracy, it is an unbiased estimate of
  within-subject decoding performance.
- **Actual fold structure (verified):** S001–S004 (84 trials each, 21/class), 10 folds, seed 42.
  Per-subject results in `ablation_summary.joblib` and `ACCURACY_STORY.md`:
  MiniRocket 5-pair = 44.31 / 55.82 / 43.13 / 41.56% (avg 46.20);
  CSP+LDA = 65.69 / 28.61 / 48.61 / 45.97% (avg 47.22).
- **Fold-level arrays:** the current `artifacts/` does not retain per-fold accuracy lists
  (no `.cv_cache` present), so individual fold values cannot be re-verified — only means/stds
  (documented) and the "S002 fold peak 70.83%" noted in `ACCURACY_STORY.md` §6.
- **Regime A:** no cross-validation — a single 80/20 window split (plus a 90/10 train/val split).

---

## 15. Evaluation Metrics

Implemented in `app/services/metrics.py`:

| Metric | Computed | Interpretation |
|---|---|---|
| Accuracy | YES | fraction correct; 25% chance here |
| Macro precision | YES | unweighted mean per-class precision (TP/(TP+FP)) |
| Macro recall | YES | unweighted mean per-class recall = per-class accuracy |
| Macro F1 | YES | unweighted mean of per-class F1; robust to class imbalance |
| Per-class P/R/F1 + support | YES | per-class breakdown (T1–T4) |
| Confusion matrix (normalized) | YES | 4×4 row-normalized |
| ROC curves + AUC (one-vs-rest, per class + macro) | YES | threshold-free ranking quality |
| Per-subject accuracy & per-subject per-class | YES | parsed from window metadata |
| Inference latency (ms/window, ms/trial) | YES | CPU benchmark, warm-up + 30 repeats |
| Trainable parameter count | YES | 40,004 / 342,564 |
| Training time | YES | seconds |
| Learning sanity check ("learned_signal") | YES | checks: accuracy > chance + 5%, predictions not collapsed (≤1 class or >85% single class), probabilities not uniform (std ≥ 0.02). Verdict `LEARNED_SIGNAL` / `FAILED_SANITY_CHECK`. |

**Macro-F1 vs accuracy:** with 4 classes, accuracy can hide a poor minority class; macro-F1 weights
all classes equally, so a model that ignores "Both Feet" is penalized. All artifacts report both;
they are nearly identical here because test sets are balanced (243/class or ~200/class).

- **Mean/std across folds:** available per subject in the subject-dependent evaluation
  (`std_accuracy` in `subject_fold_details`); e.g. docs report S001 44.31% ± 8.13%.
- **Worst/best fold:** not stored in current artifacts (see §14).
- **Per-subject:** documented in both regimes (see §16).

---

## 16. Experimental Results

### 16.1 All verified result tables (artifact numbers only)

**A. Window-level split results (LEAKY — report only with the caveat):**

| Model | Split | Acc | Macro F1 | Macro AUC | Notes |
|---|---|---:|---:|---:|---|
| MiniRocket 5-pair + Ridge (6 subj) | 80/20 window-level (972 test) | **97.74%** | **0.9774** | 0.9989 | `metrics_minirocket.json`; README claims 97.41%/0.9740 |
| CNN-LSTM (5 subj) | 80/20 window-level (810 test) | **97.16%** | 0.9716 | 0.9978 | `metrics_cnn_lstm.json`; train 98.5%, val 97.5% |
| MiniRocket C3–C4, dil=28 (5 subj) | window-level (981 test) | 33.74% | 0.3361 | 0.6088 | `metrics_minirocket_dil28.json` |
| MiniRocket C3–C4, dil=32 | window-level | 36.19% | 0.3585 | 0.6138 | `metrics_minirocket_dil32.json` |

**B. Trial-level within-subject 10-fold CV (HONEST — the numbers to defend):**

| Configuration | S001 | S002 | S003 | S004 | Avg | Source |
|---|---:|---:|---:|---:|---:|---|
| Baseline: FastICA + C3–C4 | 43.73 ±8.00 | 30.73 ±6.98 | 30.94 ±10.19 | 32.81 ±10.68 | **34.55%** | `metrics_minirocket_superseded_fastica_c3c4.json` (macro F1 0.3449, AUC 0.6093; 84 trials × 4 subj) |
| + Butterworth 8–30 Hz, C3–C4 | 45.68 | 37.79 | 35.57 | 37.45 | **39.12%** (+4.57) | `ablation_summary.joblib` |
| + 5-pair MiniRocket fusion | 44.31 ±8.13 | **55.82 ±9.70** | 43.13 ±9.48 | 41.56 ±11.86 | **46.20%** (+11.65 over baseline) | `ablation_summary.joblib` + `ACCURACY_STORY.md` |
| CSP + LDA (64 ch) | **65.69 ±13.89** | 28.61 ±12.06 | 48.61 ±18.29 | 45.97 ±15.97 | **47.22%** | `ablation_summary.joblib` |
| S089, production pipeline | — | — | — | — | **29.06%** ±6.35 (F1 0.291) | `ACCURACY_STORY.md` §5 (documented, not re-verified) |
| 5-subject overall (incl. S089) | — | — | — | — | **42.78%** ±8.90 (F1 0.428) | `ACCURACY_STORY.md` §5 (documented) |

Chance = 25.00%. All averages in this table are derived only from the listed per-subject numbers
(the ablation artifact stores averages; per-subject values in `ablation_summary.joblib` for
S001–S004 match the doc table exactly).

### 16.2 Best / worst / stability

- **Best honest model:** CSP+LDA 47.22% (S001–S004 avg); best MiniRocket = 46.20%.
- **Best subject:** S001 under CSP+LDA (65.69%); best MiniRocket subject = S002 (55.82%).
- **Worst subject:** S089 (29.06%, near chance — documented as a "BCI illiteracy" case).
- **Least stable:** S001 CSP (std 13.89) and S003 CSP (std 18.29); MiniRocket most stable S002 (±9.7).
- **Largest measured overfitting gap:** CNN-LSTM train 98.5% vs val 97.5% (1.0 pp), train vs test gap 1.34 pp (artifact) — but on the leaky split.
- **"98%":** no artifact contains a 98% result. The highest number anywhere is the paper's *claimed*
  98.63% (reference), and the project's own 97.74% leaky-window result. **Never claim 98% as our test accuracy.**

### 16.3 What the honest results mean scientifically

~46% on a balanced 4-class task is +21 pp over chance. For non-invasive MI with fixed preprocessing
and no per-subject tuning, this is a realistic, literature-consistent result (the classic BCI-IV-2a
4-class literature typically sits in the 50–75% range for carefully tuned pipelines; this dataset's
within-subject ten-fold protocol without artifact correction is harder). The **convergence of two
independent paradigms — random convolutional PPV projections (46.20%) and CSP covariance
eigen-decomposition (47.22%) — at the same ~46–48% level is strong evidence that this is the real
signal ceiling of the pipeline, not a model bug.** The subject-wise spread (29% → 66%) matches known
BCI illiteracy rates of 15–30% of users.

---

## 17. Overfitting & Generalization

- **Regime A (leaky):** the near-perfect scores (97.7%, AUC 0.999) with only ~3,000 training windows
  and 10,000 features are a textbook symptom of learning window-specific noise signatures shared
  across 87.5%-overlapping siblings. The CNN-LSTM sanity check passes (`LEARNED_SIGNAL`), but high
  accuracy is not evidence of generalization here.
- **Documented collapse evidence:** the repo records that naive implementations of the paper
  collapsed to **29.96%** on genuinely unseen trials (README "Scientific Rigor" section) — the
  smoking gun that the 98% regime does not generalize.
- **Regime B (honest):** MiniRocket has no train/test memorization mechanism (fixed features,
  strongly regularized closed-form linear model), and the CNN-LSTM uses dropout/L2/early stopping;
  fold std devs of 8–18 pp quantify instability across trial splits — the expected picture for a
  low-SNR signal.
- **Why high train accuracy ≠ good generalization in EEG:** trials are non-stationary; electrode
  impedance, vigilance, and artifacts differ minute to minute; a model can fit session-specific
  nuisance structure that does not repeat on new trials. The only trustworthy estimate is
  trial-disjoint (and ideally subject-disjoint) evaluation.

---

## 18. Model Comparison

| Dimension | MiniRocket + Ridge | CNN-LSTM | CSP + LDA |
|---|---|---|---|
| Paradigm | Random kernels + linear (closed-form) | Learned CNN + BiLSTM (backprop) | Spatial covariance eigendecomposition + linear |
| Trainable params | 40,004 | 342,564 | ~small (6 CSP comps × 4 classes) |
| Honest within-subject acc | 46.20% (5-pair) / 39.12% (C3–C4) | not evaluated in the honest regime (subject-dependent CNN run exists in code/caches but no usable artifact was found; the 97.16% is leaky-window) | **47.22%** |
| Leaky window acc | 97.74% | 97.16% | 47.22% (window-level README row) |
| Training cost | 184 s CPU, no GPU | 380 s (+GPU-friendly) | fastest per fold |
| Interpretability | PPV features opaque; linear weights inspectable | lowest | high (spatial filters map to electrodes) |
| Robustness | strongest (regularized linear) | most fragile (overfits first) | good |

**Verdict:** under the only trustworthy protocol, the three paradigms cluster at 34–47%; the
"champion" distinction in the README is an artifact of split methodology, not model quality.

---

## 19. Why Our Approach (justification for model choices)

- **Why MiniRocket?** Designed exactly for small time-series datasets: fixed random kernels avoid
  learning millions of weights; PPV gives amplitude-robust, nonlinear-free features; CPU-friendly;
  literature-backed for MI-EEG (the reference paper's core claim).
- **Why Ridge?** Minimal-capacity linear readout appropriate for ~3k windows; closed-form (no
  convergence issues, deterministic); regularized α handles 10k correlated features.
- **Why CNN?** Learns multi-scale temporal waveform features without hand-crafted bands;
  translation invariance suits oscillatory bursts.
- **Why BiLSTM?** Models temporal evolution of mu/beta over the 2 s window; gates handle long-range
  dependencies better than vanilla RNNs.
- **Why CNN-LSTM?** Combines local feature extraction (CNN) with sequential integration (LSTM) —
  the paper's second architecture; retained for comparison.
- **Why CSP+LDA?** Independent classical ceiling check with completely different math — the
  strongest scientific control in the project.
- **Trade-offs:** accuracy (all ≈ same under honest eval), compute (Ridge ≪ CNN-LSTM), interpretability
  (CSP > Ridge > CNN-LSTM), generalization (Ridge ≥ CSP > CNN-LSTM), dataset size (favors Ridge/CSP).

---

## 20. Limitations

1. **The headline 97% numbers are not defensible** as generalization results (window-level leakage; §9).
2. **No subject-independent (cross-subject) evaluation** anywhere; the honest protocol is
   within-subject, same-subject-in-train-and-test.
3. **No artifact rejection** (no EOG/EMG removal, no bad-channel handling, no ASR); only band-pass.
4. **Small cohort** in the honest results (S001–S004 + S089 documented); 5-subject averages include
   only one low-responder.
5. **No PCA/whitening, no Riemannian baselines, no data-driven spatial filters beyond CSP.**
6. **CNN-LSTM has no honest-regime result verified in artifacts**; its 97.16% is leaky-window only.
7. **Inconsistent documentation:** README/architecture docs vs `ACCURACY_STORY.md` contradict each
   other (97% vs 46%); latency claims conflict (7.06 ms vs 45.9 ms); "84 patterns" comment vs 36
   generated; lr smoothing claims not in code.
8. **Fold-level arrays not retained**, so fold stability can't be independently re-checked.
9. **No statistical testing** (no CI/permutation test) beyond mean ± std across folds/subjects.

---

## 21. Future Improvements

1. **Fix the headline protocol:** adopt trial-disjoint splits everywhere; report only those numbers
   (single config change: `--split-mode trial`, plus excluding `train_high_accuracy.py` from
   headline reporting). The tests already enforce it.
2. **Add subject-disjoint evaluation** (`GroupKFold` by subject) and report within-subject vs
   cross-subject side by side.
3. **Add artifact-rejection ICA** (fit once per subject on continuous data, remove EOG/EMG
   components) and bad-channel interpolation.
4. **Baselines:** FBCSP, Riemannian tangent-space + logistic regression, EEGNet/EEG-Conformer for a
   modern comparison.
5. **Statistics:** bootstrap confidence intervals and permutation tests; report fold-level arrays.
6. **Calibration:** calibrate `predict_proba` (temperature/Platt) so the softmax-over-Ridge is
   meaningful.
7. **Subject-adaptive calibration:** a few labeled trials per new subject (transfer learning /
   fine-tuning) — the practical path to real BCI use.
8. **Expand the honest cohort** to all 21 on-disk subjects (S001–S020, S089) to strengthen claims.

---

## 22. Complete Pipeline Diagram (matching the actual project)

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │ A. RAW DATA                                                             │
 │ PhysioNet EEGMMIDB: 64-ch EDF @ 160 Hz, runs 04/06/08/10/12/14          │
 │ labels: T0 rest (dropped), T1/T2 per run → 4 classes (L, R, BLR, BF)    │
 └──────────────────────────┬─────────────────────────────────────────────┘
                            ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │ B. PREPROCESSING (deterministic, per trial)                            │
 │ resample 160→128 Hz (4:5 anti-aliased) → CAR → Butterworth 8–30 Hz     │
 │ (zero-phase) [baseline only: FastICA band isolation]                   │
 │ → cue-aligned 4.0 s trial (512 samples)                                │
 └──────────────────────────┬─────────────────────────────────────────────┘
                            ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │ C. WINDOWING                                                           │
 │ 9 × 2.0 s windows (256 samples), step 0.25 s (87.5% overlap)           │
 │ 5 motor pairs: FC3–FC4, C5–C6, C3–C4, C1–C2, CP3–CP4                   │
 │ window vector = 5 × 2 × 256 = 2560                                     │
 └────────────┬──────────────────────────────────────────┬────────────────┘
              │                                          │
              ▼                                          ▼
 ┌─────────────────────────────┐            ┌──────────────────────────────┐
 │ D1. MiniRocket + Ridge      │            │ D2. CNN-LSTM                 │
 │ reshape (5, 512) per pair   │            │ reshape (256 timesteps, 10   │
 │ 2,000 kernels/pair (84-     │            │ electrodes), per-sample      │
 │ pattern bank, dilations     │            │ z-score                      │
 │ {1,2,4,8,16,28}, PPV)       │            │ Conv1D 32k7+BN → Conv1D      │
 │ → 10,000 PPV features       │            │ 64k5+BN → pool/drop →        │
 │ → StandardScaler (train-fit)│            │ Conv1D 128k3+BN → pool/drop  │
 │ → RidgeClassifierCV         │            │ → BiLSTM(128) → drop 0.4 →   │
 │   (α grid 1e-1..1e6, α=42.17│            │ Dense128+BN → Dense64 →      │
 │    closed form)             │            │ Dense4 softmax (342,564 p.)  │
 └─────────────┬───────────────┘            └──────────────┬───────────────┘
               │                                           │
               ▼                                           ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │ E. EVALUATION                                                          │
 │                                                                        │
 │  PATH E1 (HEADLINE, 97%): window-level 80/20 train_test_split           │
 │   → ⚠ windows of the same trial leak across train/test (87.5% overlap)  │
 │   → MiniRocket 97.74% / CNN-LSTM 97.16% — NOT generalizable            │
 │                                                                        │
 │  PATH E2 (HONEST, 34–47%): trial-level, within-subject 10-fold CV       │
 │   (all 9 windows of a trial stay together; OOF aggregation)             │
 │   → FastICA C3–C4 34.55% → Butterworth C3–C4 39.12% →                   │
 │     5-pair MiniRocket fusion 46.20% → CSP+LDA 47.22%                    │
 │   → chance = 25.00%                                                    │
 └────────────────────────────────────────────────────────────────────────┘
```

---

## 23. 3–4 Minute Faculty Speech

*(Speak at a normal pace; this is ~600 words / ~3.5 minutes.)*

> Our project is a four-class motor-imagery brain-computer interface on EEG. The system reads
> brain activity while a person imagines one of four movements — left fist, right fist, both fists,
> or both feet — and tries to decode which one they imagined. This matters because non-invasive
> BCIs could give people with severe motor impairment a direct control channel that bypasses
> muscles entirely — but only if the decoder really works on new data.
>
> We use the PhysioNet EEG Motor Movement/Imagery database: sixty-four scalp electrodes, sampled at
> 160 hertz, six imagery runs per subject, roughly ninety trials per subject, labeled by the cue the
> subject saw. Each trial is a four-second window.
>
> Our preprocessing is classical but carefully specified: we resample to 128 hertz with an
> anti-aliasing filter, apply a common average reference, and then isolate the sensorimotor rhythms
> with a fourth-order zero-phase Butterworth band-pass from 8 to 30 hertz — that's the mu and beta
> band, where imagined movement shows event-related desynchronization over the motor cortex. We
> extract nine overlapping two-second windows per trial. For the features, we focus on five
> symmetric electrode pairs over the motor strip — FC3–FC4 down through CP3–CP4 — because decoding
> should use the spatial topography of motor cortex, not an arbitrary single electrode.
>
> We implemented two model families. First, MiniRocket: a random convolutional kernel transform —
> fixed length-9 kernels, exponential dilations, and proportion-of-positive-values pooling —
> producing ten thousand features per window with no backpropagation, classified by a strongly
> regularized Ridge classifier. Second, a spatio-temporal CNN-LSTM: three convolution blocks that
> learn local oscillatory waveforms, followed by a bidirectional LSTM that models how those patterns
> evolve over the window. As an independent control, we added a classical CSP plus LDA benchmark.
>
> The most important design decision was how we evaluate. Our first protocol — which produced 97
> percent — split the nine overlapping windows of each trial randomly between training and testing.
> Because adjacent windows share almost ninety percent of their samples, that is not a genuine test;
> the model can recognize the trial's background noise rather than the intent. We caught this, and
> we rebuilt the evaluation: our honest protocol is a trial-level, within-subject ten-fold
> cross-validation. All nine windows of a trial stay in the same fold, and every prediction is made
> on trials the model never saw — out-of-fold. We also added automated tests that assert zero trial
> overlap between folds.
>
> Under that strict protocol, the picture changes completely and becomes scientifically
> interpretable. A single C3–C4 pair with Butterworth filtering reaches 39 percent. Our five-pair
> MiniRocket spatial fusion reaches 46 percent — with one subject at 56. The independent CSP plus
> LDA benchmark converges to 47 percent, a completely different mathematical route to almost the
> same number. Chance is 25 percent. And one subject sat at 29 percent, which matches the known
> "BCI illiteracy" phenomenon where a minority of users produce weak motor-imagery rhythms.
>
> So what do we conclude? The real, defensible result of this project is that a carefully
> regularized random-kernel pipeline and a classical spatial-filter baseline both decode four-class
> motor imagery at roughly 46 to 47 percent — real, reproducible signal, far above chance, but far
> below the near-perfect numbers that appear when evaluation leaks overlapping windows. The
> headline of our work is actually the methodology: we demonstrated, with an ablation and an
> independent cross-check, how window-level leakage inflates EEG results, and we enforced
> trial-disjoint evaluation to measure the true ceiling. Next, we plan to add subject-independent
> splits, proper artifact rejection, and calibrated cross-subject transfer — the path from a
> rigorous offline result to a usable BCI.

---

## 24. 30+ Faculty Questions & Answers

**Q1. Why EEG, and why non-invasive?**
*Short:* EEG has millisecond temporal resolution, is cheap, portable, and safe — no surgery, unlike
implanted arrays. *Deeper:* mu/beta ERD/ERS over the sensorimotor cortex is measurable at the scalp;
spatial resolution is poor but timing is excellent for oscillatory decoding. *Keywords:* non-invasive,
temporal resolution, mu/beta, ERD/ERS, portability.

**Q2. Why motor imagery rather than actual movement?**
*Short:* MI is the BCI use case for people who cannot move; it produces similar sensorimotor
modulation to execution without requiring motor output. *Deeper:* motor imagery activates
overlapping sensorimotor networks, producing detectable contralateral ERD; it is the standard in the
PhysioNet protocol (runs 04–14). *Keywords:* kinesthetic imagery, overlap, contralateral ERD.

**Q3. Why these four classes?**
*Short:* They are the four classes the dataset defines: left fist, right fist, both fists, both feet
— two lateralized hand tasks and two bilateral tasks that probe different motor topography.
*Keywords:* lateralization, bilateral, somatotopy, 4-class, chance 25%.

**Q4. Why these datasets (and how many)?**
*Short:* One dataset — PhysioNet EEGMMIDB; it is the dataset of the reference paper and is fully
open. *Deeper:* 21 subjects are on disk (S001–S020 + S089); headline runs used 5–6; the honest
ablation used S001–S004 + S089. *Keywords:* EEGMMIDB, single corpus, no harmonization.

**Q5. How many subjects, exactly?**
*Short:* 5 core subjects (S001–S005; the newest run adds S014), 21 on disk, 4–5 in the honest
evaluation. *Deeper:* state the exact artifact scopes (§4.3). *Keywords:* cohort size, generalization
limits.

**Q6. How many channels and what sampling rate?**
*Short:* 64 channels at 160 Hz native, resampled to 128 Hz; the models use 10 electrodes in 5 pairs.
*Keywords:* 10-10 montage, resampling, motor strip.

**Q7. What preprocessing did you actually perform?**
*Short:* anti-aliased resampling, CAR, Butterworth 8–30 Hz zero-phase band-pass, cue-aligned epoching,
9-window segmentation; per-sample z-score for the CNN and train-fitted StandardScaler for MiniRocket.
*Keywords:* filtfilt, CAR, epoching.

**Q8. Why filtering, and why 8–30 Hz?**
*Short:* mu (8–14) and beta (14–30) carry ERD/ERS; everything else is noise for this task. *Deeper:*
zero-phase (`filtfilt`) avoids shifting temporal relationships; order 4 is a standard compromise.
*Keywords:* mu, beta, zero-phase, order.

**Q9. Why did you use ICA — or didn't you?**
*Short:* ICA is implemented but only as an ablation baseline; production uses Butterworth because
per-trial FastICA was unstable and scored lower (34.55% vs 39.12%). It was never used for eye-blink
removal here. *Keywords:* FastICA, non-convergence, band isolation vs artifact rejection.

**Q10. What are ERD and ERS?**
*Short:* Task-related decreases/increases in mu/beta band power; ERD over the contralateral motor
area is the signal we decode. *Keywords:* desynchronization, synchronization, power modulation.

**Q11. What are mu and beta rhythms?**
*Short:* 8–14 Hz and 14–30 Hz sensorimotor oscillations at rest, modulated by movement/imagery.
*Keywords:* sensorimotor rhythm, idling rhythm.

**Q12. Why C3/C4 and the other pairs?**
*Short:* C3/C4 overlie left/right hand motor cortex; we extend to FC, C5/C6, C1/C2, CP3/CP4 to
capture the full motor strip. *Deeper:* 5-pair fusion improved honest accuracy from 39.12% to 46.20%.
*Keywords:* precentral gyrus, somatotopy, spatial fusion.

**Q13. What is MiniRocket?**
*Short:* A deterministic random-convolutional-kernel transform: fixed kernels + PPV pooling →
features for a linear classifier; almost no learned parameters. *Keywords:* PPV, dilations, determinism.

**Q14. Why MiniRocket instead of a CNN?**
*Short:* Small datasets favor fixed features + regularized linear models; no backprop, no
overfitting-prone weights, CPU-fast, strong literature support for MI-EEG. *Keywords:* inductive bias,
capacity control.

**Q15. Why Ridge and not something fancier?**
*Short:* 10k features, ~3k samples — a regularized linear model is the correct capacity; the α grid
is selected internally (GCV), giving a deterministic closed-form solution. *Keywords:* L2, SVD,
One-vs-Rest.

**Q16. Why CNN?**
*Short:* Learns local waveform/oscillation features at multiple scales without hand-crafted bands;
weight sharing suits translation of bursts over time. *Keywords:* kernel, receptive field, weight sharing.

**Q17. Why LSTM / why bidirectional?**
*Short:* MI is a temporal process; gates preserve long-range dependency; bidirectional context
summarizes the whole 2 s window. *Keywords:* gates, cell state, vanishing gradients.

**Q18. Why CNN-LSTM together?**
*Short:* CNN extracts spatial-temporal features; LSTM integrates their temporal evolution — the
paper's second architecture. *Keywords:* hybrid, feature extractor + sequence model.

**Q19. What is overfitting, and do you overfit?**
*Short:* Fitting noise rather than signal — yes, badly, in the leaky window split (97% with ~3k
samples); the honest CV shows the true level ≈46–47%. *Keywords:* generalization gap, non-stationarity.

**Q20. How did you prevent leakage?**
*Short:* trial-level grouping in the honest protocol (all 9 windows of a trial in one split), enforced
by code assertions and unit tests; train-only scaler fitting. *Keywords:* grouping, trial IDs, assertions.

**Q21. Why subject-disjoint splitting — and do you have it?**
*Short:* It tests transfer to a new person. **We do not have it implemented** — that is a stated
limitation; our honest protocol is within-subject (paper protocol). *Keywords:* GroupKFold, cross-subject.

**Q22. Why is random window splitting dangerous?**
*Short:* Adjacent windows share 87.5% of samples; random split lets the model memorize shared noise;
scores inflate to ~98% and collapse on truly new trials. *Keywords:* temporal leakage, near-duplicates.

**Q23–Q27. Split sizes.**
*Short:* Window split: 4,050 windows (5 subj) → 810 test / 324 val / 2,916 train; newest 6-subject
artifact: 972 test windows from 462 trials. Honest protocol: 84 trials/subject, 10 folds of ~8–9 test
trials (72–81 windows). *Keywords:* OOF, fold size.

**Q28. What is macro-F1 and why use it?**
*Short:* Unweighted mean of per-class F1; treats all four classes equally, exposing per-class
weakness that accuracy can hide. *Keywords:* harmonic mean, imbalance.

**Q29. Why not only accuracy?**
*Short:* Accuracy alone can hide a class the model never predicts; F1/confusion/ROC reveal it.
*Keywords:* per-class metrics.

**Q30. What does your confusion matrix tell you?**
*Short:* In the leaky run, near-diagonal (97%+). In the honest FastICA baseline CM, the matrix is
blurred — e.g. T1 row [0.294, 0.302, 0.206, 0.198]: left-fist trials are confused with everything,
which is the low-SNR reality. T4 (feet) is the most separable class (0.49 recall) in that run.
*Keywords:* row-normalized, per-class recall.

**Q31. Which model performed best, honestly?**
*Short:* CSP+LDA 47.22% avg (S1–S4) vs MiniRocket 46.20% — statistically indistinguishable; the
convergence is the point. *Keywords:* ceiling, cross-paradigm corroboration.

**Q32. Why did MiniRocket benefit so much from 5 pairs?**
*Short:* 39.12% → 46.20% (+7 pts) — more of the motor topography is used, especially for S002
(+25 pts). *Keywords:* spatial fusion, information loss.

**Q33. What is your weakest result?**
*Short:* S089 at 29.06% (≈chance +4) — an honest BCI-illiteracy case; and the CNN-LSTM has no
trial-level evaluation. *Keywords:* low responder, not evaluated honestly.

**Q34. What are the limitations?**
*Short:* listed in §20 — leaky headline, no cross-subject eval, no artifact rejection, small honest
cohort, doc inconsistencies. *Keywords:* reproduction vs benchmark.

**Q35. Can the model work on a new person?**
*Short:* Unknown — never tested; within-subject results do not imply cross-subject transfer.
*Keywords:* distribution shift.

**Q36. How would you improve generalization?**
*Short:* subject-disjoint evaluation first, then artifact rejection, Riemannian baselines, and
per-subject calibration/fine-tuning. *Keywords:* transfer, calibration.

**Q37. What if channels are noisy and you don't do artifact rejection?**
*Short:* Noise inflates fold variance and reduces accuracy; the fix is ICA-based artifact removal /
bad-channel interpolation — currently not implemented. *Keywords:* EOG, EMG, interpolation.

**Q38. Is this real-time?**
*Short:* Offline only; artifacts report ~45 ms/window CPU for MiniRocket and ~45 ms for CNN-LSTM
(README claims 7 ms — conflicting), with no streaming EEG acquisition implemented in the ML path.
*Keywords:* latency, offline.

**Q39. What happens after classification?**
*Short:* Predicted class + probability vector; downstream application control is outside this
project's ML scope. *Keywords:* decision output.

**Q40. What is the actual contribution?**
*Short:* A rigorous leakage-aware evaluation of 4-class MI decoding: a fully reproducible pipeline,
a two-paradigm convergence at ~46–47% vs 25% chance, an ablation isolating filtering and spatial
coverage gains, and a demonstration of how window leakage manufactures 98%.

**Q41. Why 9 windows per trial?**
*Short:* The reference paper's design for sample expansion; step 32 samples (0.25 s), 87.5% overlap;
it's also why leaking evaluation inflates scores.

**Q42. Why 4-second trials?**
*Short:* The dataset's cue duration; PhysioNet trials are 4.2 s of task with the paper using 4.0 s
from cue onset. *Keywords:* cue-aligned.

---

## 25. Trap Questions & Safe Answers

**T1. "Did you really test on unseen subjects?"**
No — and say so immediately. Our evaluation is within-subject, trial-disjoint (the paper's protocol).
Subject-independent evaluation is not implemented; that is our top future-work item.

**T2. "How do you know there is no data leakage?"**
We audited both pipelines. The honest pipeline groups all 9 windows per trial, with assertions and
unit tests (`test_strict_zero_data_leakage_split`, `test_within_subject_cv_splitting_zero_leakage`).
The window-level pipeline that produced 97% **does leak**; we verified from `test_split.joblib` that
test trials have only 1–6 of their 9 windows in the test set. We report that distinction openly.

**T3. "Why do you claim high accuracy?"**
We do not claim 98%. We report 97.7%/97.2% as window-level results with a proven leakage caveat, and
46–47% as the trial-level, leak-free result. The honest number is the one in our conclusions.

**T4. "What's the difference between validation and test data?"**
Validation tunes early stopping/lr and is never scored in reports; test is scored once after
training. Both exist in code (`X_val` vs `X_test`); note that in the leaky split their separation
from train is still window-level.

**T5. "Did you tune hyperparameters using the test set?"**
No. Ridge α is chosen internally by `RidgeClassifierCV` on training data; CNN early stopping monitors
validation accuracy. The caveat is evaluation hygiene — the same test split was re-scored across
development runs — but no tuning was performed on test.

**T6. "Why is your training accuracy higher than OOF accuracy?"**
On the leaky split, CNN train 98.5 vs val 97.5 (and test 97.2). On honest CV, training-set accuracy
isn't reported per fold; the OOF estimate (~46%) is the trustworthy one. Higher train than OOF is the
expected signature of fitting nuisance structure.

**T7. "Why is macro-F1 different from accuracy?"**
Macro-F1 weights each class equally; accuracy weights each sample. With balanced test sets they are
close (0.9774 vs 0.9774; 0.9716 vs 0.9716), which is itself informative.

**T8. "What exactly does MiniRocket learn?"**
Almost nothing during the transform: dilations and biases are drawn from the training data, but the
kernels are fixed patterns. Only the Ridge weights are learned (40,004 numbers). It is not a neural
network and has no backpropagation.

**T9. "Is MiniRocket a neural network?"**
No. It is a fixed random-convolutional feature transform plus a linear classifier. (Say this
confidently — students who call it a "deep model" get caught.)

**T10. "Is Ridge a deep-learning model?"**
No — a convex linear model with a closed-form solution.

**Q11. "Why not a simple SVM?"**
A regularized linear model (Ridge) is the natural readout for MiniRocket; an SVM could be a valid
alternative, but linear Ridge avoids kernel-computation cost and probability-calibration issues.
We did not run an SVM comparison; it's a fair future baseline.

**T12. "What happens with EEG from a completely new person?"**
Unknown until tested. Within-subject results overstate cross-subject performance; expecting a large
drop is realistic. Our S089 result (29%) hints at how much subjects vary even within-subject.

**T13. "Are your results statistically reliable?"**
Partially: we have 10-fold means ± std per subject (e.g., 44.31 ± 8.13) but no confidence intervals
or permutation tests, and no fold-level arrays retained. State this as a limitation.

**T14. "What is your worst fold?"**
Not retained in current artifacts; only fold means/stds. The documented peak fold is S002 at 70.83%
(ACCURACY_STORY §6). Don't invent fold numbers.

**T15. "Can you reproduce your results?"**
Yes, with caveats: seeded (`random_state=42`), committed artifacts, but some cache directories
(`.ablation_cache`, `.cv_cache`) are not currently present, and the README numbers (97.41%) differ
from the artifact numbers (97.74%), so exact reproduction requires re-running the scripts with the
documented flags.

**T16. "What is actually novel here?"**
Not the models — MiniRocket and CNN-LSTM are from the reference paper. The contributions are the
strict leakage-audited evaluation, the two-paradigm convergence evidence (~46–47% vs 25% chance),
and the controlled preprocessing/channel ablation. Present it as rigorous reproduction + methodology,
not novel architecture.

---

## 26. One-Line Memory Notes

- **BCI:** a system that lets the brain control a device without muscles, by decoding neural signals.
- **EEG:** scalp voltage recording with millisecond timing but low spatial resolution and low SNR.
- **Motor imagery:** imagined movement that modulates sensorimotor mu/beta rhythms the same way
  execution does.
- **ERD/ERS:** task-related decrease/increase of mu/beta power over the motor cortex.
- **Mu/beta:** 8–14 Hz / 14–30 Hz sensorimotor rhythms; the information band of this project.
- **C3/C4:** electrodes over left/right hand motor areas; contralateral ERD is the decodable signal.
- **Preprocessing (one sentence):** resample to 128 Hz, CAR reference, zero-phase 8–30 Hz Butterworth,
  cue-aligned 4 s epoching, into 9 overlapping 2 s windows.
- **Windowing:** 9 windows per trial, 256 samples each, step 32 samples → 87.5% overlap.
- **MiniRocket (one sentence):** fixed random dilated convolutions summarized by proportion-of-positive-
  values — no backprop — feeding a linear classifier.
- **PPV:** proportion of positive convolution outputs per kernel — one robust scalar per kernel.
- **Ridge (one sentence):** a closed-form L2-regularized linear classifier that is nearly impossible
  to overfit with strong α (ours: 42.17).
- **CNN (one sentence):** stacked 1D convolutions that learn local waveform patterns; here 32/64/128
  filters with kernel sizes 7/5/3.
- **LSTM (one sentence):** a gated recurrent layer that models temporal dependencies; ours is
  bidirectional with 128 units.
- **CNN-LSTM (one sentence):** CNN extracts local oscillation features, BiLSTM integrates them over
  time, softmax emits the 4-class prediction.
- **CSP+LDA (one sentence):** classical MI pipeline — spatial filters maximizing class variance ratio,
  classified by shrinkage LDA; our independent ceiling check at 47.22%.
- **Trial-level split (one sentence):** all 9 windows of a trial stay in the same fold — the minimum
  correct unit of EEG evaluation.
- **Subject-disjoint split (one sentence):** no subject appears in both train and test — the real
  test of a BCI; **not implemented here**.
- **Window leakage (one sentence):** splitting 87.5%-overlapping windows of the same trial across
  train/test inflates accuracy to ~98% by letting the model memorize trial noise.
- **Macro-F1 (one sentence):** unweighted mean of per-class F1 so every class counts equally.
- **OOF (one sentence):** out-of-fold predictions — every sample tested exactly once by a model that
  never saw it during training; the honest aggregate.
- **The two numbers to never confuse:** window-level ≈97% (leaky); trial-level ≈46–47% (honest,
  chance 25%).

---

## 27. Verified Facts vs Assumptions

**VERIFIED FROM CODE**
- PhysioNet EEGMMIDB is the only dataset; runs 04/06/08/10/12/14; 64 ch; 160→128 Hz; CAR; Butterworth
  8–30 Hz (order 4, zero-phase); FastICA exists only in the ablation path; 9×2 s windows with 32-sample
  step; 5 pairs; 2,560-vector; MiniRocket 84-comment/36-generated patterns, dilations {1,2,4,8,16,28},
  PPV, 2,000 kernels/pair; RidgeClassifierCV α grid logspace(-1,6,25); CNN-LSTM architecture and
  hyperparameters (Adam 1e-3, L2 0.001, dropout 0.3/0.4/0.3, batch 32/64, 60 epochs, ReduceLROnPlateau
  val_loss, EarlyStopping val_accuracy patience 15); CSP(6 comps)+shrinkage LDA; trial-level 10-fold CV
  with StratifiedKFold(seed 42); window-level `train_test_split` in `train_high_accuracy.py` and
  `train_v2.py` default mode; no SVM/RF/EEGNet/Transformer/Mamba; no subject-disjoint evaluation.

**VERIFIED FROM DATA/RESULTS**
- `test_split.joblib`: 972 windows, 462 trials, subjects S001–S005+S014, 243/class; trials have 1–6 of
  9 windows in test → window leakage in Regime A.
- `metrics_minirocket.json`: 97.74% acc, 0.9774 macro-F1, AUC 0.9989, 40,004 params, 184.48 s,
  α=42.17 (model file), latency 45.9 ms/window.
- `metrics_cnn_lstm.json`: 97.16%, F1 0.9716, AUC 0.9978, 342,564 params, 380.2 s, train 98.5% / val 97.5%.
- `ablation_summary.joblib`: 34.55 / 39.12 / 46.20 / 47.22% (S1–S4 averages).
- `metrics_minirocket_superseded_fastica_c3c4.json`: 34.55%, F1 0.3449, supports 756×4 (84 trials × 9 × 4 subj).
- dil28 33.74%, dil32 36.19%.
- Model files: `minirocket.joblib` (5-pair, α=42.17, trained), `minirocket_subject_dependent.joblib`
  (α=0.1), `cnn_lstm.keras` (342,564 trainable).
- EDF metadata: S001/S014 = 90 trials, ~21–24/class, 64 ch @ 160 Hz.
- The "subject_dependent" metrics JSONs are byte-identical duplicates of the pooled window-level ones
  (mislabeled) — the true subject-dependent results live in the ablation artifacts.

**REASONABLE INTERPRETATION**
- The 97% inflation is explained by 87.5% window overlap + window-level splitting (the repo documents
  this mechanism; our test-split inspection is consistent).
- ~46–48% converging across two paradigms suggests the dataset/pipeline's honest ceiling.
- S089 ≈29% reflects BCI illiteracy (the doc's own interpretation).
- Train/val split sizes in Regime A (≈2,916/324/972 for 5 subjects) are derived from code ratios.

**NOT IMPLEMENTED / NOT VERIFIED**
- Subject-independent (cross-subject) evaluation — not implemented.
- Artifact rejection / eye-blink removal / bad-channel handling / notch — not implemented.
- The exact per-fold accuracies — not retained in artifacts (only means/stds).
- S089 (29.06%) and the 5-subject 42.78% averages — documented in `ACCURACY_STORY.md` only; not
  independently re-verifiable from current artifacts (ablation cache absent).
- Whether synthetic EEG was ever used in a saved run — not verifiable.
- README's 7.06 ms latency, 97.41% MiniRocket, 810-sample test set, "zero leakage verified" claim —
  contradicted by or inconsistent with artifacts (§16.1, §20 item 7).
- "84 canonical patterns" docstring vs 36 generated patterns in code — internal inconsistency.
- Label smoothing (ε=0.05) and lr 2e-3→3.125e-5 claims in architecture docs — not found in code.
- The reference paper's own numbers (98.63%/98.06%) — cited from the paper, not reproduced here.

---

*End of report. Prepared from repository evidence only; no external claims added.*
