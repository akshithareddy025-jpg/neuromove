"""Generate Standalone High-Resolution Architecture Diagrams for Both Individual Models.

Model 1: MiniRocket + RidgeClassifierCV Spatial Fusion Pipeline (97.41% Accuracy)
Model 2: Hybrid Spatio-Temporal CNN-LSTM Deep Learning Architecture (97.16% Accuracy)
"""

import os
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

def draw_card(ax, x, y, w, h, bg='#111827', border='#1F2937', lw=1.5, radius=0.8, alpha=1.0):
    rect = FancyBboxPatch(
        (x, y), w, h,
        boxstyle=f"round,pad=0.15,rounding_size={radius}",
        facecolor=bg, edgecolor=border, linewidth=lw, alpha=alpha, zorder=2
    )
    ax.add_patch(rect)
    return rect

def draw_arrow(ax, x1, y1, x2, y2, color='#38BDF8', lw=2.0, rad=0.0):
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

def generate_minirocket_diagram(output_paths):
    fig = plt.figure(figsize=(20, 12), dpi=300, facecolor='#091316')
    ax = fig.add_axes([0, 0, 1, 1], facecolor='#091316')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    TEXT_WHITE = '#F9FAFB'
    TEXT_MUTED = '#9CA3AF'
    ACCENT_GREEN = '#10B981'
    ACCENT_CYAN = '#00F0FF'
    ACCENT_AMBER = '#F59E0B'
    BORDER_EMERALD = '#047857'
    CARD_DARK = '#0D211F'

    # Header
    ax.text(50, 96.5, "NEUROMOVE 2.0  |  MODEL 1 ARCHITECTURE", ha='center', va='center',
            color=TEXT_WHITE, fontsize=20, fontweight='bold')
    ax.text(50, 93.8, "MiniRocket Spatial-Fusion Pipeline with Closed-Form Ridge Solve (Test Accuracy: 97.41%)",
            ha='center', va='center', color='#6EE7B7', fontsize=12)
    ax.plot([5, 95], [91.8, 91.8], color='#134E3F', lw=1.5, zorder=1)

    # Top Pipeline Cards (Horizontal flow)
    # Stage 1: Ingestion
    draw_card(ax, 5, 75, 26, 14, bg=CARD_DARK, border=BORDER_EMERALD, lw=1.6)
    ax.text(18, 86.5, "STAGE 1 : EEG INGESTION", ha='center', va='center', color='#6EE7B7', fontsize=11, fontweight='bold')
    ax.text(18, 83.5, "PhysioNet EEGMMIDB Benchmark", ha='center', va='center', color=ACCENT_CYAN, fontsize=9)
    ax.text(18, 79.5, "* 64-Channel Sensorimotor Stream (160 Hz)\n* Anti-alias Resampling: 160 Hz -> 128 Hz\n* Common Average Referencing (CAR)",
            ha='center', va='center', color=TEXT_MUTED, fontsize=8)

    draw_arrow(ax, 31.5, 82, 36.5, 82, color='#10B981', lw=2.2)

    # Stage 2: Bandpass & Selection
    draw_card(ax, 37, 75, 26, 14, bg=CARD_DARK, border=BORDER_EMERALD, lw=1.6)
    ax.text(50, 86.5, "STAGE 2 : MOTOR SELECTION", ha='center', va='center', color='#6EE7B7', fontsize=11, fontweight='bold')
    ax.text(50, 83.5, "Mu/Beta Isolation & 5 Bilateral Pairs", ha='center', va='center', color=ACCENT_AMBER, fontsize=9)
    ax.text(50, 79.5, "* Zero-Phase 4th-Order Butterworth (8-30 Hz)\n* 5 Bilateral Pairs: FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4\n* 10 Channels total, 256 temporal samples per trial",
            ha='center', va='center', color=TEXT_MUTED, fontsize=8)

    draw_arrow(ax, 63.5, 82, 68.5, 82, color='#10B981', lw=2.2)

    # Stage 3: Pair Partitioning
    draw_card(ax, 69, 75, 26, 14, bg=CARD_DARK, border=BORDER_EMERALD, lw=1.6)
    ax.text(82, 86.5, "STAGE 3 : BIPOLAR PARTITION", ha='center', va='center', color='#6EE7B7', fontsize=11, fontweight='bold')
    ax.text(82, 83.5, "Independent Time-Series Splits", ha='center', va='center', color=ACCENT_CYAN, fontsize=9)
    ax.text(82, 79.5, "* 5 Distinct Electrode Pair Signals (N, 256)\n* Preserves localized hemispheric polarity\n* Prevents channel boundary discontinuity",
            ha='center', va='center', color=TEXT_MUTED, fontsize=8)

    # Middle Row: MiniRocket Core Engine (Detailed)
    draw_arrow(ax, 82, 74.5, 82, 70, color='#10B981', lw=2.2)

    draw_card(ax, 5, 28, 90, 41, bg='#071E1C', border='#059669', lw=2.0, radius=1.2)
    ax.text(50, 66.5, "STAGE 4 : MINIROCKET RANDOM CONVOLUTIONAL FEATURE ENGINE", ha='center', va='center',
            color='#A7F3D0', fontsize=13, fontweight='bold')

    # Sub-steps inside Stage 4
    # Box A: Kernel Bank
    draw_card(ax, 7.5, 31, 26, 31, bg='#0C2A26', border='#047857', lw=1.4)
    ax.text(20.5, 59.5, "1. Canonical Kernel Bank", ha='center', va='center', color='#6EE7B7', fontsize=10.5, fontweight='bold')
    ax.text(20.5, 56.5, "84 Predetermined Length-9 Patterns", ha='center', va='center', color=ACCENT_CYAN, fontsize=8.5)
    k_text = (
        "* Weights strictly in {-1, +2}\n"
        "* Mean centered (sum = -3)\n"
        "* Exactly 2 positive positions per pattern\n"
        "* Deterministic & highly efficient\n"
        "* Exponential dilations: d in {1,2,4,8,16,28}\n"
        "* Max receptive field: 225 samples\n"
        "* K = 2,000 kernels per electrode pair\n"
        "* Total 10,000 kernels across 5 pairs"
    )
    ax.text(20.5, 44.5, k_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.8)

    draw_arrow(ax, 34, 46.5, 38, 46.5, color='#10B981', lw=2.0)

    # Box B: PPV Pooling
    draw_card(ax, 38.5, 31, 26, 31, bg='#0C2A26', border='#047857', lw=1.4)
    ax.text(51.5, 59.5, "2. Dilated Conv & PPV", ha='center', va='center', color='#6EE7B7', fontsize=10.5, fontweight='bold')
    ax.text(51.5, 56.5, "Proportion of Positive Values", ha='center', va='center', color=ACCENT_CYAN, fontsize=8.5)
    ppv_text = (
        "* 1D Discrete Convolutions: Z = X * W_d\n"
        "* Bias b drawn from empirical quantiles\n"
        "* PPV Pooling Formula:\n"
        "  PPV_i = (1/L) * sum( I(Z_t + b_i > 0) )\n"
        "* Non-linear monotonic temporal pool\n"
        "* Output per pair: 2,000 PPV features\n"
        "* Maps temporal waveform to distribution\n"
        "* Robust against electrode DC drift"
    )
    ax.text(51.5, 44.5, ppv_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.8)

    draw_arrow(ax, 65, 46.5, 69, 46.5, color='#10B981', lw=2.0)

    # Box C: Spatial Fusion
    draw_card(ax, 69.5, 31, 23.5, 31, bg='#0C2A26', border='#047857', lw=1.4)
    ax.text(81.25, 59.5, "3. Spatial Fusion Vector", ha='center', va='center', color='#6EE7B7', fontsize=10.5, fontweight='bold')
    ax.text(81.25, 56.5, "10,000-Dimensional Representation", ha='center', va='center', color=ACCENT_AMBER, fontsize=8.5)
    fuse_text = (
        "* Concatenates all 5 pair PPV vectors:\n"
        "  V = [PPV_1, PPV_2, ..., PPV_5]\n"
        "* Full bilateral motor strip coverage\n"
        "* FC3/4: Premotor & SMA\n"
        "* C5/6: Lateral finger control\n"
        "* C3/4: Hand motor representation\n"
        "* C1/2: Medial foot/leg strip\n"
        "* CP3/4: Sensorimotor proprioception"
    )
    ax.text(81.25, 44.5, fuse_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.8)

    # Bottom Row: Classification & Metrics
    draw_arrow(ax, 50, 27.5, 50, 23.5, color='#10B981', lw=2.2)

    # Solver Box
    draw_card(ax, 5, 4, 46, 19, bg='#071E1C', border='#047857', lw=1.6)
    ax.text(28, 19.8, "STAGE 5 : CLOSED-FORM RIDGE CLASSIFIER (SVD SOLVE)", ha='center', va='center',
            color='#6EE7B7', fontsize=10.5, fontweight='bold')
    ax.text(28, 17.0, "Multi-Class One-vs-Rest (OvR) L2 Regularization", ha='center', va='center', color=ACCENT_CYAN, fontsize=8.5)
    solve_text = (
        "* StandardScaler: Per-Fold zero-leakage normalization (mu=0, sigma=1)\n"
        "* Analytical Closed-Form Solution: W = (X^T X + alpha * I)^{-1} X^T Y\n"
        "* Leave-One-Out Cross-Validation (LOOCV) alpha tuning in {0.1, 1.0, 10.0, 100.0}\n"
        "* Zero-gradient inference: sub-8ms latency (7.06 ms benchmarked)\n"
        "* Predicts: T1 (Left Fist), T2 (Right Fist), T3 (Both Hands), T4 (Both Feet)"
    )
    ax.text(28, 10.5, solve_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.6)

    # Metrics Card
    draw_card(ax, 54, 4, 41, 19, bg='#062A24', border='#10B981', lw=2.0)
    ax.text(74.5, 19.8, "MODEL 1 BENCHMARK VERIFICATION", ha='center', va='center',
            color='#A7F3D0', fontsize=11, fontweight='bold')
    ax.text(74.5, 17.0, "5-Subject PhysioNet Complete Cohort (810 Test Trials)", ha='center', va='center', color=TEXT_WHITE, fontsize=8.5)
    
    # KPI metrics
    kpis = [
        ("TEST ACCURACY", "97.41%", '#10B981', 59, 11),
        ("MACRO F1", "0.9740", '#00F0FF', 72, 11),
        ("ROC-AUC", "0.9991", '#F59E0B', 85, 11),
        ("INFERENCE LATENCY", "7.06 ms", '#38BDF8', 65, 6.5),
        ("PARAMETER COUNT", "40,004", '#A7F3D0', 80, 6.5)
    ]
    for lbl, val, c, kx, ky in kpis:
        ax.text(kx, ky + 1.8, val, ha='center', va='center', color=c, fontsize=12, fontweight='bold')
        ax.text(kx, ky - 0.2, lbl, ha='center', va='center', color=TEXT_MUTED, fontsize=6.8, fontweight='bold')

    for p in output_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        plt.savefig(p, dpi=300, facecolor='#091316', bbox_inches='tight')
        print(f"Saved: {p}")

    plt.close()

def generate_cnnlstm_diagram(output_paths):
    fig = plt.figure(figsize=(20, 12), dpi=300, facecolor='#08101E')
    ax = fig.add_axes([0, 0, 1, 1], facecolor='#08101E')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    TEXT_WHITE = '#F9FAFB'
    TEXT_MUTED = '#9CA3AF'
    ACCENT_CYAN = '#00F0FF'
    ACCENT_BLUE = '#38BDF8'
    ACCENT_PURPLE = '#A855F7'
    ACCENT_AMBER = '#F59E0B'
    BORDER_BLUE = '#0284C7'
    CARD_DARK = '#0B1D33'

    # Header
    ax.text(50, 96.5, "NEUROMOVE 2.0  |  MODEL 2 ARCHITECTURE", ha='center', va='center',
            color=TEXT_WHITE, fontsize=20, fontweight='bold')
    ax.text(50, 93.8, "Hybrid Spatio-Temporal CNN-LSTM Deep Neural Architecture (Test Accuracy: 97.16%)",
            ha='center', va='center', color='#7DD3FC', fontsize=12)
    ax.plot([5, 95], [91.8, 91.8], color='#0C4A6E', lw=1.5, zorder=1)

    # Stage 1: Input Tensor
    draw_card(ax, 5, 75, 26, 14, bg=CARD_DARK, border=BORDER_BLUE, lw=1.6)
    ax.text(18, 86.5, "STAGE 1 : SPATIAL TENSOR", ha='center', va='center', color='#7DD3FC', fontsize=11, fontweight='bold')
    ax.text(18, 83.5, "10 Motor Channels Preserved", ha='center', va='center', color=ACCENT_CYAN, fontsize=9)
    ax.text(18, 79.5, "* Input Tensor Shape: (N, 256, 10)\n* 256 Timesteps (2.0s @ 128 Hz)\n* 10 Channels across 5 Bilateral Pairs\n* Retains continuous spatio-temporal structure",
            ha='center', va='center', color=TEXT_MUTED, fontsize=8)

    draw_arrow(ax, 31.5, 82, 36.5, 82, color='#0284C7', lw=2.2)

    # Stage 2: Multi-Scale Conv1D
    draw_card(ax, 37, 75, 26, 14, bg=CARD_DARK, border=BORDER_BLUE, lw=1.6)
    ax.text(50, 86.5, "STAGE 2 : CONV1D FILTERING", ha='center', va='center', color='#7DD3FC', fontsize=11, fontweight='bold')
    ax.text(50, 83.5, "Multi-Scale Temporal Convolutions", ha='center', va='center', color=ACCENT_AMBER, fontsize=9)
    ax.text(50, 79.5, "* L2: Conv1D (32 f, k=7) -> BatchNorm\n* L3: Conv1D (64 f, k=5) -> BatchNorm\n* L4: MaxPool1D (2) -> SpatialDropout(0.3)\n* L5: Conv1D (128 f, k=3) -> MaxPool(2)",
            ha='center', va='center', color=TEXT_MUTED, fontsize=8)

    draw_arrow(ax, 63.5, 82, 68.5, 82, color='#0284C7', lw=2.2)

    # Stage 3: Bidirectional LSTM
    draw_card(ax, 69, 75, 26, 14, bg=CARD_DARK, border=BORDER_BLUE, lw=1.6)
    ax.text(82, 86.5, "STAGE 3 : BI-LSTM DYNAMICS", ha='center', va='center', color='#7DD3FC', fontsize=11, fontweight='bold')
    ax.text(82, 83.5, "Bidirectional Recurrent Context", ha='center', va='center', color=ACCENT_CYAN, fontsize=9)
    ax.text(82, 79.5, "* L6: BiLSTM (128 units x 2 = 256-D)\n* Captures forward & backward planning\n* L7: Sequence Dropout (0.4)\n* Eliminates temporal drift co-adaptation",
            ha='center', va='center', color=TEXT_MUTED, fontsize=8)

    # Middle Row: Deep Network Layer Specification
    draw_arrow(ax, 82, 74.5, 82, 70, color='#0284C7', lw=2.2)

    draw_card(ax, 5, 28, 90, 41, bg='#071626', border='#0284C7', lw=2.0, radius=1.2)
    ax.text(50, 66.5, "STAGE 4 : DEEP SPATIO-TEMPORAL NEURAL NETWORK SPECIFICATION", ha='center', va='center',
            color='#BAE6FD', fontsize=13, fontweight='bold')

    # 4 Columns of Layer Groups inside Stage 4
    col_w = 19.5
    col_gap = 2.5
    
    # Col 1: Low-Level Oscillations
    draw_card(ax, 7.5, 31, col_w, 31, bg='#0F2844', border='#0369A1', lw=1.4)
    ax.text(7.5 + col_w/2, 59.5, "1. Temporal Convolutions", ha='center', va='center', color='#7DD3FC', fontsize=10, fontweight='bold')
    ax.text(7.5 + col_w/2, 56.5, "Receptive Field Scaling", ha='center', va='center', color=ACCENT_CYAN, fontsize=8.0)
    c1_text = (
        "* L2: Conv1D (32 filters)\n"
        "  Kernel=7, Stride=1, Same\n"
        "  ReLU, L2 reg (0.001)\n"
        "  BatchNormalization\n"
        "* L3: Conv1D (64 filters)\n"
        "  Kernel=5, Stride=1, Same\n"
        "  ReLU, L2 reg (0.001)\n"
        "  BatchNormalization\n"
        "* Preserves phase coherence\n"
        "  in mu/beta frequency range"
    )
    ax.text(7.5 + col_w/2, 44.5, c1_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.5)

    draw_arrow(ax, 7.5 + col_w + 0.3, 46.5, 7.5 + col_w + col_gap - 0.3, 46.5, color='#0284C7', lw=2.0)

    # Col 2: Feature Distillation & Pooling
    draw_card(ax, 7.5 + (col_w + col_gap), 31, col_w, 31, bg='#0F2844', border='#0369A1', lw=1.4)
    ax.text(7.5 + (col_w + col_gap) + col_w/2, 59.5, "2. Spatial-Temporal Pooling", ha='center', va='center', color='#7DD3FC', fontsize=10, fontweight='bold')
    ax.text(7.5 + (col_w + col_gap) + col_w/2, 56.5, "Dimensionality Reduction", ha='center', va='center', color=ACCENT_CYAN, fontsize=8.0)
    c2_text = (
        "* L4: MaxPooling1D (pool=2)\n"
        "  Spatial Dropout (0.3)\n"
        "  Tensor: (N, 128, 64)\n"
        "* L5: Conv1D (128 filters)\n"
        "  Kernel=3, Same, ReLU\n"
        "  BatchNormalization\n"
        "  MaxPooling1D (pool=2)\n"
        "  Dropout (0.3)\n"
        "  Tensor: (N, 64, 128)"
    )
    ax.text(7.5 + (col_w + col_gap) + col_w/2, 44.5, c2_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.5)

    draw_arrow(ax, 7.5 + 2*(col_w + col_gap) - col_gap + 0.3, 46.5, 7.5 + 2*(col_w + col_gap) - 0.3, 46.5, color='#0284C7', lw=2.0)

    # Col 3: Bidirectional Sequence Modeling
    draw_card(ax, 7.5 + 2*(col_w + col_gap), 31, col_w, 31, bg='#0F2844', border='#0369A1', lw=1.4)
    ax.text(7.5 + 2*(col_w + col_gap) + col_w/2, 59.5, "3. BiLSTM Integration", ha='center', va='center', color='#7DD3FC', fontsize=10, fontweight='bold')
    ax.text(7.5 + 2*(col_w + col_gap) + col_w/2, 56.5, "Causal Dynamics", ha='center', va='center', color=ACCENT_AMBER, fontsize=8.0)
    c3_text = (
        "* L6: Bidirectional LSTM\n"
        "  128 forward units\n"
        "  128 backward units\n"
        "  Total 256-D hidden state\n"
        "* Captures ERD/ERS timing\n"
        "  during motor planning\n"
        "* L7: Sequence Dropout (0.4)\n"
        "  Tackles inter-trial variance\n"
        "  Tensor: (N, 256)"
    )
    ax.text(7.5 + 2*(col_w + col_gap) + col_w/2, 44.5, c3_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.5)

    draw_arrow(ax, 7.5 + 3*(col_w + col_gap) - col_gap + 0.3, 46.5, 7.5 + 3*(col_w + col_gap) - 0.3, 46.5, color='#0284C7', lw=2.0)

    # Col 4: Classification Head
    draw_card(ax, 7.5 + 3*(col_w + col_gap), 31, col_w, 31, bg='#0F2844', border='#0369A1', lw=1.4)
    ax.text(7.5 + 3*(col_w + col_gap) + col_w/2, 59.5, "4. Classification Head", ha='center', va='center', color='#7DD3FC', fontsize=10, fontweight='bold')
    ax.text(7.5 + 3*(col_w + col_gap) + col_w/2, 56.5, "Softmax Multi-Class", ha='center', va='center', color=ACCENT_CYAN, fontsize=8.0)
    c4_text = (
        "* L8: Dense (128 units)\n"
        "  ReLU, L2=0.001, BatchNorm\n"
        "* L9: Dropout (0.3)\n"
        "* L10: Dense (64 units, ReLU)\n"
        "* L11: Dense (4 units, Softmax)\n"
        "* Output Probabilities:\n"
        "  T1: Left Fist (L)\n"
        "  T2: Right Fist (R)\n"
        "  T3: Both Fists (BLR)\n"
        "  T4: Both Feet (BF)"
    )
    ax.text(7.5 + 3*(col_w + col_gap) + col_w/2, 44.5, c4_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.5)

    # Bottom Row: Training Dynamics & Metrics
    draw_arrow(ax, 50, 27.5, 50, 23.5, color='#0284C7', lw=2.2)

    # Optimization Box
    draw_card(ax, 5, 4, 46, 19, bg='#0B1D33', border='#0284C7', lw=1.6)
    ax.text(28, 19.8, "STAGE 5 : TRAINING STRATEGY & LEARNING DYNAMICS", ha='center', va='center',
            color='#7DD3FC', fontsize=10.5, fontweight='bold')
    ax.text(28, 17.0, "Adam Optimizer with Dynamic Adaptive Scheduling", ha='center', va='center', color=ACCENT_CYAN, fontsize=8.5)
    opt_text = (
        "* Optimizer: Adam (Initial LR = 2.0e-3, beta_1=0.9, beta_2=0.999)\n"
        "* Learning Rate Schedule: ReduceLROnPlateau (factor=0.5, patience=4, min_lr=3.125e-5)\n"
        "* Loss Function: Categorical Cross-Entropy with Label Smoothing (eps=0.05)\n"
        "* Regularization: L2 weight penalty (0.001) + Dropout (0.3 - 0.4) + BatchNorm\n"
        "* Epochs: 40 with EarlyStopping (patience=10 on validation loss)"
    )
    ax.text(28, 10.5, opt_text, ha='center', va='center', color=TEXT_MUTED, fontsize=7.6)

    # Metrics Card
    draw_card(ax, 54, 4, 41, 19, bg='#082544', border='#00F0FF', lw=2.0)
    ax.text(74.5, 19.8, "MODEL 2 BENCHMARK VERIFICATION", ha='center', va='center',
            color='#BAE6FD', fontsize=11, fontweight='bold')
    ax.text(74.5, 17.0, "5-Subject PhysioNet Complete Cohort (810 Test Trials)", ha='center', va='center', color=TEXT_WHITE, fontsize=8.5)
    
    # KPI metrics
    kpis = [
        ("TEST ACCURACY", "97.16%", '#00F0FF', 59, 11),
        ("MACRO F1", "0.9716", '#38BDF8', 72, 11),
        ("ROC-AUC", "0.9978", '#F59E0B', 85, 11),
        ("TRAINABLE PARAMS", "342,564", '#A7F3D0', 65, 6.5),
        ("BATCH INFERENCE", "8.92 ms", '#A855F7', 80, 6.5)
    ]
    for lbl, val, c, kx, ky in kpis:
        ax.text(kx, ky + 1.8, val, ha='center', va='center', color=c, fontsize=12, fontweight='bold')
        ax.text(kx, ky - 0.2, lbl, ha='center', va='center', color=TEXT_MUTED, fontsize=6.8, fontweight='bold')

    for p in output_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        plt.savefig(p, dpi=300, facecolor='#08101E', bbox_inches='tight')
        print(f"Saved: {p}")

    plt.close()

if __name__ == "__main__":
    conversation_id = "1bc38fe1-b8f7-4042-b9b6-b3bd12ba2cd8"
    
    # Paths for Model 1
    paths_m1 = [
        r"c:\Users\rohan\NeuroMove\docs\architecture\model_1_minirocket_architecture.png",
        r"c:\Users\rohan\NeuroMove\frontend\public\model_1_minirocket_architecture.png",
        rf"C:\Users\rohan\.gemini\antigravity-ide\brain\{conversation_id}\model_1_minirocket_architecture.png"
    ]
    generate_minirocket_diagram(paths_m1)

    # Paths for Model 2
    paths_m2 = [
        r"c:\Users\rohan\NeuroMove\docs\architecture\model_2_cnnlstm_architecture.png",
        r"c:\Users\rohan\NeuroMove\frontend\public\model_2_cnnlstm_architecture.png",
        rf"C:\Users\rohan\.gemini\antigravity-ide\brain\{conversation_id}\model_2_cnnlstm_architecture.png"
    ]
    generate_cnnlstm_diagram(paths_m2)
