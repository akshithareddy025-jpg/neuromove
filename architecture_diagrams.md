# NeuroMove 2.0: Model Architecture Diagrams

This document presents the high-resolution (300 DPI) publication-quality architecture diagrams generated for the two champion models in **NeuroMove 2.0**.

---

## 1. Model 1: MiniRocket Spatial-Fusion Pipeline (97.41% Accuracy)

A state-of-the-art fast convolutional random projection pipeline with multi-pair spatial fusion and analytical closed-form ridge solve.

![Model 1: MiniRocket Spatial Fusion Architecture](C:/Users/rohan/.gemini/antigravity-ide/brain/1bc38fe1-b8f7-4042-b9b6-b3bd12ba2cd8/model_1_minirocket_architecture.png)

### Key Architectural Specifications:
- **Input Representation:** 5 Bilateral Motor Pairs (`FC3-FC4`, `C5-C6`, `C3-C4`, `C1-C2`, `CP3-CP4`), $(N, 256)$ continuous samples at 128 Hz.
- **Kernel Bank:** 84 canonical length-9 fixed patterns with weights $\in \{-1, +2\}$; exponential dilations $d \in \{1, 2, 4, 8, 16, 28\}$.
- **Kernel Scale:** $K = 2,000$ kernels fitted independently per pair ($10,000$ total kernels).
- **Pooling:** Proportion of Positive Values (PPV) non-linear temporal pooling.
- **Spatial Fusion Vector:** Concatenated $10,000$-dimensional feature representation.
- **Classifier:** Multi-class One-vs-Rest `RidgeClassifierCV` with closed-form L2 SVD regularized solve.
- **Performance:** **97.41% Test Accuracy**, **0.9740 Macro F1**, **0.9991 ROC-AUC**, **7.06 ms Latency**.

---

## 2. Model 2: Hybrid Spatio-Temporal CNN-LSTM Architecture (97.16% Accuracy)

A 13-layer spatio-temporal deep neural network capturing localized oscillatory phase dynamics and bidirectional motor planning context.

![Model 2: Hybrid CNN-LSTM Deep Architecture](C:/Users/rohan/.gemini/antigravity-ide/brain/1bc38fe1-b8f7-4042-b9b6-b3bd12ba2cd8/model_2_cnnlstm_architecture.png)

### Key Architectural Specifications:
- **Input Tensor:** $(N, 256, 10)$ preserving continuous 2.0-second temporal dynamics across 10 motor electrodes without flattening.
- **Multi-Scale Temporal Convolutions:**
  - `L2`: `Conv1D` (32 filters, $k=7$, ReLU, L2=0.001) + `BatchNormalization`
  - `L3`: `Conv1D` (64 filters, $k=5$, ReLU, L2=0.001) + `BatchNormalization`
  - `L4`: `MaxPooling1D` ($pool=2$) + `SpatialDropout` (0.3) $\rightarrow (N, 128, 64)$
  - `L5`: `Conv1D` (128 filters, $k=3$, ReLU) + `BatchNormalization` + `MaxPooling1D` ($pool=2$) + `Dropout` (0.3) $\rightarrow (N, 64, 128)$
- **Bidirectional Recurrence:**
  - `L6`: `Bidirectional(LSTM(128))` ($256$-D hidden vector capturing forward/backward motor intention causality)
  - `L7`: Sequence `Dropout` (0.4)
- **Classification Head:**
  - `L8-L9`: `Dense(128, ReLU)` + `BatchNormalization` + `Dropout(0.3)`
  - `L10`: `Dense(64, ReLU)`
  - `L11`: `Dense(4, Softmax)`
- **Optimization:** Adam with `ReduceLROnPlateau` ($2\times 10^{-3} \to 3.125\times 10^{-5}$), Label Smoothing $\epsilon = 0.05$.
- **Performance:** **97.16% Test Accuracy**, **0.9716 Macro F1**, **0.9978 ROC-AUC**, **342,564 Trainable Parameters**.

---

## 3. End-to-End System Architecture (Dual Champion Pipeline)

The complete end-to-end BCI pipeline illustrating raw 64-channel acquisition, dual-stream preprocessing, parallel model execution, and real-time 4-class decoding.

![NeuroMove 2.0 Dual-Champion End-to-End Architecture](C:/Users/rohan/.gemini/antigravity-ide/brain/1bc38fe1-b8f7-4042-b9b6-b3bd12ba2cd8/model_architecture_technical.png)

---

## 4. Deep Neural Layer & Tensor Flow Specification

The detailed micro-layer tensor transformation diagram outlining tensor dimensionalities, kernel shapes, receptive fields, and mathematical operations step-by-step.

![Deep Neural Layer and Tensor Flow Specification](C:/Users/rohan/.gemini/antigravity-ide/brain/1bc38fe1-b8f7-4042-b9b6-b3bd12ba2cd8/model_neural_layers.png)

---

## File Storage Locations

All diagram image assets are exported at 300 DPI and stored across the repository:

| Asset Description | Documentation Path | Frontend Public Path |
| :--- | :--- | :--- |
| **Model 1: MiniRocket Standalone** | [`docs/architecture/model_1_minirocket_architecture.png`](file:///c:/Users/rohan/NeuroMove/docs/architecture/model_1_minirocket_architecture.png) | [`frontend/public/model_1_minirocket_architecture.png`](file:///c:/Users/rohan/NeuroMove/frontend/public/model_1_minirocket_architecture.png) |
| **Model 2: Hybrid CNN-LSTM Standalone** | [`docs/architecture/model_2_cnnlstm_architecture.png`](file:///c:/Users/rohan/NeuroMove/docs/architecture/model_2_cnnlstm_architecture.png) | [`frontend/public/model_2_cnnlstm_architecture.png`](file:///c:/Users/rohan/NeuroMove/frontend/public/model_2_cnnlstm_architecture.png) |
| **Dual-Champion System Pipeline** | [`docs/architecture/model_architecture_technical.png`](file:///c:/Users/rohan/NeuroMove/docs/architecture/model_architecture_technical.png) | [`frontend/public/model_architecture_technical.png`](file:///c:/Users/rohan/NeuroMove/frontend/public/model_architecture_technical.png) |
| **Micro-Layer & Tensor Flow** | [`docs/architecture/model_neural_layers.png`](file:///c:/Users/rohan/NeuroMove/docs/architecture/model_neural_layers.png) | [`frontend/public/model_neural_layers.png`](file:///c:/Users/rohan/NeuroMove/frontend/public/model_neural_layers.png) |
