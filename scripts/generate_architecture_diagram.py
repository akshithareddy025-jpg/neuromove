"""Generate High-Resolution Publication-Quality Architecture Diagram for NeuroMove 2.0.

Produces clean, professional, aesthetic diagrams showing both Champion Models:
  1. MiniRocket + RidgeClassifierCV Spatial Fusion Pipeline (97.41% Accuracy)
  2. Hybrid Spatio-Temporal CNN-LSTM Deep Learning Architecture (97.16% Accuracy)
Along with the Neurophysiological Ingestion and Real-Time 4-Class BCI Serving layers.
"""

import os
import shutil
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

def create_diagram(output_paths):
    # Set high resolution figure (16:9 widescreen format)
    fig = plt.figure(figsize=(24, 13.5), dpi=300, facecolor='#0B0F19')
    ax = fig.add_axes([0, 0, 1, 1], facecolor='#0B0F19')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Color Palette - Sentinel Dark Modern Theme
    BG_DARK = '#0B0F19'
    CARD_BG = '#111827'
    CARD_BORDER = '#1F2937'
    TEXT_WHITE = '#F9FAFB'
    TEXT_MUTED = '#9CA3AF'
    TEXT_DIM = '#6B7280'
    ACCENT_CYAN = '#00F0FF'
    ACCENT_BLUE = '#38BDF8'
    ACCENT_GREEN = '#10B981'
    ACCENT_AMBER = '#F59E0B'
    ACCENT_PURPLE = '#8B5CF6'
    ACCENT_ROSE = '#F43F5E'

    def draw_card(x, y, w, h, bg=CARD_BG, border=CARD_BORDER, lw=1.5, radius=1.0, alpha=1.0):
        rect = FancyBboxPatch(
            (x, y), w, h,
            boxstyle=f"round,pad=0.2,rounding_size={radius}",
            facecolor=bg, edgecolor=border, linewidth=lw, alpha=alpha, zorder=2
        )
        ax.add_patch(rect)
        return rect

    def draw_arrow(x1, y1, x2, y2, color=ACCENT_BLUE, lw=2.0, rad=0.0):
        if rad != 0.0:
            arrow = FancyArrowPatch(
                (x1, y1), (x2, y2),
                arrowstyle='-|>,head_length=5,head_width=3',
                color=color, linewidth=lw, connectionstyle=f"arc3,rad={rad}", zorder=5
            )
        else:
            arrow = FancyArrowPatch(
                (x1, y1), (x2, y2),
                arrowstyle='-|>,head_length=5,head_width=3',
                color=color, linewidth=lw, zorder=5
            )
        ax.add_patch(arrow)

    # ==========================================
    # 1. HEADER SECTION
    # ==========================================
    ax.text(50, 96.8, "NEUROMOVE 2.0 : DUAL-CHAMPION MOTOR IMAGERY BCI ARCHITECTURE", 
            ha='center', va='center', color=TEXT_WHITE, fontsize=21, fontweight='bold', family='sans-serif')
    ax.text(50, 94.3, "PhysioNet EEGMMIDB Benchmark Cohort  |  4-Class Kinesthetic Motor Imagery  |  Strict Zero-Leakage Protocol  |  Sub-10ms Latency", 
            ha='center', va='center', color=ACCENT_CYAN, fontsize=11, fontweight='medium', family='sans-serif')

    # Draw decorative line under header
    ax.plot([4, 96], [92.6, 92.6], color='#1E293B', lw=1.8, zorder=1)

    # ==========================================
    # 2. TOP SECTION: NEUROPHYSIOLOGICAL PREPROCESSING
    # ==========================================
    draw_card(4, 75.8, 92, 15.2, bg='#0F172A', border='#334155', lw=1.8, radius=1.2)
    ax.text(6, 88.8, "STAGE 1 : SENSORIMOTOR EEG ACQUISITION & SPATIAL-PRESERVING PREPROCESSING", 
            ha='left', va='center', color=ACCENT_AMBER, fontsize=12.0, fontweight='bold')

    # Sub-box 1: 64-Ch Ingestion
    draw_card(5.5, 77.2, 18.5, 9.8, bg='#1E293B', border='#475569')
    ax.text(14.75, 84.8, "64-Channel EEG Stream", ha='center', va='center', color=TEXT_WHITE, fontsize=10, fontweight='bold')
    ax.text(14.75, 82.6, "PhysioNet EEGMMIDB", ha='center', va='center', color=ACCENT_CYAN, fontsize=8.5)
    ax.text(14.75, 79.8, "* 160 Hz Raw Sampling Rate\n* 4,050 Preprocessed Samples\n* 5-Subject Complete Cohort", 
            ha='center', va='center', color=TEXT_MUTED, fontsize=7.8)

    draw_arrow(24.5, 82.1, 27.5, 82.1, color=ACCENT_AMBER, lw=2.2)

    # Sub-box 2: Filtering & CAR
    draw_card(28.0, 77.2, 20.5, 9.8, bg='#1E293B', border='#475569')
    ax.text(38.25, 84.8, "Dual Preprocessing", ha='center', va='center', color=TEXT_WHITE, fontsize=10, fontweight='bold')
    ax.text(38.25, 82.6, "Anti-Alias & CAR Filter", ha='center', va='center', color=ACCENT_AMBER, fontsize=8.5)
    ax.text(38.25, 79.8, "* Resampling: 160 Hz -> 128 Hz\n* Common Average Referencing (CAR)\n* Zero-Phase 4th-Order Butterworth", 
            ha='center', va='center', color=TEXT_MUTED, fontsize=7.8)

    draw_arrow(49.0, 82.1, 52.0, 82.1, color=ACCENT_AMBER, lw=2.2)

    # Sub-box 3: Bandpass
    draw_card(52.5, 77.2, 18.5, 9.8, bg='#1E293B', border='#475569')
    ax.text(61.75, 84.8, "Sensorimotor Isolation", ha='center', va='center', color=TEXT_WHITE, fontsize=10, fontweight='bold')
    ax.text(61.75, 82.6, "8 - 30 Hz Bandpass", ha='center', va='center', color=ACCENT_GREEN, fontsize=8.5)
    ax.text(61.75, 79.8, "* mu Rhythms (8-14 Hz)\n* beta Rhythms (14-30 Hz)\n* Preserves Cross-Hemisphere Phase", 
            ha='center', va='center', color=TEXT_MUTED, fontsize=7.8)

    draw_arrow(71.5, 82.1, 74.5, 82.1, color=ACCENT_AMBER, lw=2.2)

    # Sub-box 4: 5 Symmetric Pairs
    draw_card(75.0, 77.2, 19.5, 9.8, bg='#1E293B', border='#475569')
    ax.text(84.75, 85.0, "5 Bilateral Motor Pairs", ha='center', va='center', color=TEXT_WHITE, fontsize=10, fontweight='bold')
    ax.text(84.75, 83.0, "10 Channels (256 Samples/Trial)", ha='center', va='center', color=ACCENT_CYAN, fontsize=8.5)
    pairs_text = "1. FC3-FC4 (Premotor / SMA)\n2. C5-C6 (Lateral Hand/Finger)\n3. C3-C4 (Hand Motor / mu)\n4. C1-C2 (Medial Arm/Foot)\n5. CP3-CP4 (Proprioception)"
    ax.text(84.75, 79.6, pairs_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.0)

    # Split Arrows Downwards to Models
    draw_arrow(80.0, 76.5, 26.5, 72.0, color=ACCENT_GREEN, lw=2.2, rad=0.15)
    draw_arrow(89.0, 76.5, 73.5, 72.0, color=ACCENT_CYAN, lw=2.2, rad=-0.12)

    # ==========================================
    # 3. MODEL 1: MINIENT/MINIROCKET CHAMPION (LEFT)
    # ==========================================
    draw_card(4, 19.5, 45, 52.0, bg='#0D191F', border='#065F46', lw=2.0, radius=1.2)

    # Model 1 Header Badge
    draw_card(5.5, 66.5, 42.0, 4.2, bg='#064E3B', border='#059669', lw=1.2)
    ax.text(26.5, 69.1, "MODEL 1: MINIROCKET SPATIAL FUSION CHAMPION", 
            ha='center', va='center', color='#6EE7B7', fontsize=11.0, fontweight='bold')
    ax.text(26.5, 67.5, "Test Accuracy: 97.41%  |  Macro F1: 0.9740  |  ROC-AUC: 0.9991  |  Latency: 7.06 ms", 
            ha='center', va='center', color=TEXT_WHITE, fontsize=8.2)

    # Left Step 1: Input Representation
    draw_card(6.0, 56.5, 41.0, 7.8, bg='#132A26', border='#047857')
    ax.text(8.0, 62.2, "1. Per-Pair Time-Series Partitioning", ha='left', va='center', color='#A7F3D0', fontsize=9.5, fontweight='bold')
    ax.text(8.0, 59.2, "* 5 Distinct Electrode Pair Signals: [FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4]\n* Input Shape per Pair: (N, 256) continuous temporal samples at 128 Hz\n* Preserves localized bipolar contralateral voltage differentials without artifact jumps", 
            ha='left', va='center', color=TEXT_MUTED, fontsize=7.4)

    draw_arrow(26.5, 56.0, 26.5, 53.8, color=ACCENT_GREEN, lw=2.0)

    # Left Step 2: MiniRocket Kernels
    draw_card(6.0, 44.0, 41.0, 9.2, bg='#132A26', border='#047857')
    ax.text(8.0, 51.2, "2. Independent Random Dilated Convolutions", ha='left', va='center', color='#A7F3D0', fontsize=9.5, fontweight='bold')
    ax.text(8.0, 47.4, "* K = 2,000 MiniRocket Kernels fitted independently per pair (10,000 total)\n* 84 Canonical length-9 patterns with predetermined weights {-1, +2}\n* Dilations exponentially distributed: d in {1, 2, 4, 8, 16, 28} (max dilation = 28)\n* Biases extracted from quantiles of continuous convolutions during training", 
            ha='left', va='center', color=TEXT_MUTED, fontsize=7.2)

    draw_arrow(26.5, 43.5, 26.5, 41.3, color=ACCENT_GREEN, lw=2.0)

    # Left Step 3: Feature Pooling & Fusion
    draw_card(6.0, 32.5, 41.0, 8.2, bg='#132A26', border='#047857')
    ax.text(8.0, 38.8, "3. PPV Pooling & 10,000-D Spatial Fusion", ha='left', va='center', color='#A7F3D0', fontsize=9.5, fontweight='bold')
    ax.text(8.0, 35.4, "* Proportion of Positive Values (PPV): Fraction of points where (X * W + b) > 0\n* 5 Pairs x 2,000 Kernels -> Concatenated into 10,000-dimensional vector\n* Full motor strip spatial coverage from premotor to somatosensory cortex", 
            ha='left', va='center', color=TEXT_MUTED, fontsize=7.4)

    draw_arrow(26.5, 32.0, 26.5, 29.8, color=ACCENT_GREEN, lw=2.0)

    # Left Step 4: Classifier
    draw_card(6.0, 21.0, 41.0, 8.2, bg='#132A26', border='#047857')
    ax.text(8.0, 27.2, "4. Standardization & Closed-Form Ridge Solve", ha='left', va='center', color='#A7F3D0', fontsize=9.5, fontweight='bold')
    ax.text(8.0, 23.8, "* StandardScaler (Per-Fold Zero Leakage normalization)\n* RidgeClassifierCV: Multi-Class One-vs-Rest closed-form L2 SVD regularized solve\n* Alpha CV grid search in {0.1, 1.0, 10.0, 100.0} | Extremely fast inference: 7.06 ms", 
            ha='left', va='center', color=TEXT_MUTED, fontsize=7.4)

    # ==========================================
    # 4. MODEL 2: HYBRID CNN-LSTM CHAMPION (RIGHT)
    # ==========================================
    draw_card(51, 19.5, 45, 52.0, bg='#0B1E2E', border='#0369A1', lw=2.0, radius=1.2)

    # Model 2 Header Badge
    draw_card(52.5, 66.5, 42.0, 4.2, bg='#075985', border='#0284C7', lw=1.2)
    ax.text(73.5, 69.1, "MODEL 2: HYBRID SPATIO-TEMPORAL CNN-LSTM CHAMPION", 
            ha='center', va='center', color='#7DD3FC', fontsize=11.0, fontweight='bold')
    ax.text(73.5, 67.5, "Test Accuracy: 97.16%  |  Macro F1: 0.9716  |  ROC-AUC: 0.9978  |  342,564 Trainable Params", 
            ha='center', va='center', color=TEXT_WHITE, fontsize=8.2)

    # Right Step 1: Input Tensor
    draw_card(53.0, 56.8, 41.0, 7.5, bg='#0F283F', border='#0284C7')
    ax.text(55.0, 62.4, "L1 : Spatio-Temporal Preservation Tensor", ha='left', va='center', color='#BAE6FD', fontsize=9.5, fontweight='bold')
    ax.text(55.0, 59.4, "* Input Tensor Shape: (N, 256 Timesteps, 10 Motor Channels)\n* Preserves 2-second continuous temporal dynamics without unrolling to 1D\n* Prevents cross-channel boundary artifacts and temporal scrambling", 
            ha='left', va='center', color=TEXT_MUTED, fontsize=7.4)

    draw_arrow(73.5, 56.2, 73.5, 54.0, color=ACCENT_CYAN, lw=2.0)

    # Right Step 2: Conv1D Stages
    draw_card(53.0, 44.0, 41.0, 9.5, bg='#0F283F', border='#0284C7')
    ax.text(55.0, 51.6, "L2-L5 : Multi-Scale 1D Convolutions & Temporal Pooling", ha='left', va='center', color='#BAE6FD', fontsize=9.5, fontweight='bold')
    ax.text(55.0, 47.6, "* L2: Conv1D (32 filters, k=7, same, ReLU, L2=0.001) -> BatchNorm\n* L3: Conv1D (64 filters, k=5, same, ReLU, L2=0.001) -> BatchNorm\n* L4: MaxPooling1D (pool=2, stride=2) -> Spatial/Temporal Dropout (0.3)\n* L5: Conv1D (128 filters, k=3, same, ReLU) -> BatchNorm -> MaxPool(2) -> Dropout(0.3)", 
            ha='left', va='center', color=TEXT_MUTED, fontsize=7.2)

    draw_arrow(73.5, 43.5, 73.5, 41.3, color=ACCENT_CYAN, lw=2.0)

    # Right Step 3: BiLSTM
    draw_card(53.0, 32.5, 41.0, 8.2, bg='#0F283F', border='#0284C7')
    ax.text(55.0, 38.8, "L6-L7 : Bidirectional Recurrent Temporal Dynamics", ha='left', va='center', color='#BAE6FD', fontsize=9.5, fontweight='bold')
    ax.text(55.0, 35.4, "* L6: Bidirectional LSTM (128 units x 2 directions = 256-D hidden state vector)\n* Synchronous forward & backward recurrent pass captures motor planning causality\n* L7: Sequence Dropout (0.4) to eliminate overfitting on electrode drift", 
            ha='left', va='center', color=TEXT_MUTED, fontsize=7.4)

    draw_arrow(73.5, 32.0, 73.5, 29.8, color=ACCENT_CYAN, lw=2.0)

    # Right Step 4: Dense Head
    draw_card(53.0, 21.0, 41.0, 8.2, bg='#0F283F', border='#0284C7')
    ax.text(55.0, 27.2, "L8-L11 : Deep Classification Head & Dynamic Scheduling", ha='left', va='center', color='#BAE6FD', fontsize=9.5, fontweight='bold')
    ax.text(55.0, 23.8, "* L8: Dense (128 units, ReLU, L2=0.001) -> BatchNorm -> Dropout (0.3)\n* L10: Dense (64 units, ReLU)  |  L11: Dense (4 units, Softmax Probability Output)\n* Adam optimizer with ReduceLROnPlateau (lr=2e-3 -> 3.125e-5)", 
            ha='left', va='center', color=TEXT_MUTED, fontsize=7.4)

    # Arrows from both models to classification stage
    draw_arrow(26.5, 19.0, 45.0, 16.2, color=ACCENT_GREEN, lw=2.2, rad=0.08)
    draw_arrow(73.5, 19.0, 55.0, 16.2, color=ACCENT_CYAN, lw=2.2, rad=-0.08)

    # ==========================================
    # 5. BOTTOM SECTION: 4-CLASS DECODING & SERVING
    # ==========================================
    draw_card(4, 2.0, 92, 14.8, bg='#111827', border='#4F46E5', lw=1.8, radius=1.2)
    ax.text(6, 15.0, "STAGE 3 : 4-CLASS KINESTHETIC MOTOR IMAGERY DECODING & PRODUCTION SERVING", 
            ha='left', va='center', color=ACCENT_PURPLE, fontsize=11.5, fontweight='bold')

    # Class Boxes: T1, T2, T3, T4
    classes_info = [
        ("T1: Left Fist (L)", "Contralateral C4/CP4\nmu/beta desynchronization", "Precision: 97.95%\nRecall: 94.09%\nF1: 95.98% | AUC: 0.998", ACCENT_ROSE),
        ("T2: Right Fist (R)", "Contralateral C3/CP3\nmu/beta desynchronization", "Precision: 97.07%\nRecall: 98.51%\nF1: 97.79% | AUC: 0.999", ACCENT_CYAN),
        ("T3: Both Fists (BLR)", "Bilateral hand motor strip\nco-activation", "Precision: 97.51%\nRecall: 98.00%\nF1: 97.76% | AUC: 0.999", ACCENT_GREEN),
        ("T4: Both Feet (BF)", "Medial sensorimotor strip\nC1-C2 suppression", "Precision: 97.13%\nRecall: 99.02%\nF1: 98.07% | AUC: 0.999", ACCENT_AMBER)
    ]

    for i, (title, sub, metrics, clr) in enumerate(classes_info):
        cx = 5.5 + i * 16.0
        draw_card(cx, 3.4, 14.8, 10.4, bg='#1F2937', border=clr, lw=1.2)
        ax.text(cx + 7.4, 12.2, title, ha='center', va='center', color=clr, fontsize=9.2, fontweight='bold')
        ax.text(cx + 7.4, 9.8, sub, ha='center', va='center', color=TEXT_WHITE, fontsize=7.0)
        ax.text(cx + 7.4, 6.2, metrics, ha='center', va='center', color=TEXT_MUTED, fontsize=6.8)

    # Server & UI Integration Box
    draw_card(70.5, 3.4, 24.0, 10.4, bg='#1E1B4B', border='#6366F1', lw=1.4)
    ax.text(82.5, 12.2, "Production Serving Stack", ha='center', va='center', color='#C7D2FE', fontsize=9.5, fontweight='bold')
    ax.text(82.5, 10.2, "FastAPI 2.0 REST & WebSocket Streaming", ha='center', va='center', color=TEXT_WHITE, fontsize=7.8)
    ax.text(82.5, 6.6, "* Sub-10ms Sliding Window Pipeline\n* React 19 Sentinel Clinical Dashboard\n* Live Dual-Model Ensemble Comparator\n* Interactive Electrode Topomap & Oscilloscope", 
            ha='center', va='center', color='#A5B4FC', fontsize=7.0)

    # Save to all requested locations
    for p in output_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        plt.savefig(p, dpi=300, facecolor='#0B0F19', bbox_inches='tight')
        print(f"Saved: {p}")

    plt.close()

if __name__ == "__main__":
    paths = [
        r"c:\Users\rohan\NeuroMove\docs\architecture\model_architecture_technical.png",
        r"c:\Users\rohan\NeuroMove\frontend\public\model_architecture_technical.png",
        r"C:\Users\rohan\.gemini\antigravity-ide\brain\1bc38fe1-b8f7-4042-b9b6-b3bd12ba2cd8\model_architecture_technical.png"
    ]
    create_diagram(paths)
