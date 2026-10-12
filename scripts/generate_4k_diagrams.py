"""Generate Ultra-High-Definition 4K (3840 x 2160) Architecture Diagrams for NeuroMove 2.0.

Produces razor-sharp 4K UHD diagrams with calibrated typography, high-contrast dark theme,
glowing card borders, and exact 3840x2160 pixel resolution.

Generates:
1. Model 1 Standalone 4K: MiniRocket + RidgeClassifierCV Spatial Fusion Pipeline (97.41% Accuracy)
2. Model 2 Standalone 4K: Hybrid Spatio-Temporal CNN-LSTM Deep Learning Architecture (97.16% Accuracy)
3. Dual-Champion System 4K: End-to-End Acquisition, Preprocessing, Dual Models & 4-Class Serving
4. Micro-Layer Tensor Flow 4K: Exact Neural Layers, Tensor Shapes, Receptive Fields & Formulations
"""

import os
from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
from PIL import Image

CONVERSATION_ID = "1bc38fe1-b8f7-4042-b9b6-b3bd12ba2cd8"
ARTIFACT_DIR = rf"C:\Users\rohan\.gemini\antigravity-ide\brain\{CONVERSATION_ID}"
DOCS_DIR = r"c:\Users\rohan\NeuroMove\docs\architecture"
FRONTEND_DIR = r"c:\Users\rohan\NeuroMove\frontend\public"

# Colors
BG_DARK = "#080D1A"
CARD_DARK = "#0D1527"
CARD_BORDER = "#1E293B"
TEXT_WHITE = "#FFFFFF"
TEXT_LIGHT = "#E2E8F0"
TEXT_MUTED = "#94A3B8"
TEXT_DIM = "#64748B"

ACCENT_CYAN = "#00F0FF"
ACCENT_SKY = "#38BDF8"
ACCENT_EMERALD = "#10B981"
ACCENT_MINT = "#6EE7B7"
ACCENT_AMBER = "#F59E0B"
ACCENT_PURPLE = "#A855F7"
ACCENT_ROSE = "#F43F5E"

def draw_card(ax, x, y, w, h, bg=CARD_DARK, border=CARD_BORDER, lw=1.8, radius=0.9, alpha=1.0, zorder=2):
    rect = FancyBboxPatch(
        (x, y), w, h,
        boxstyle=f"round,pad=0.0,rounding_size={radius}",
        facecolor=bg, edgecolor=border, linewidth=lw, alpha=alpha, zorder=zorder
    )
    ax.add_patch(rect)
    return rect

def draw_arrow(ax, x1, y1, x2, y2, color=ACCENT_SKY, lw=2.2, rad=0.0, zorder=5):
    conn = f"arc3,rad={rad}" if rad != 0.0 else "arc3,rad=0.0"
    arrow = FancyArrowPatch(
        (x1, y1), (x2, y2),
        arrowstyle='-|>,head_length=5.5,head_width=3.5',
        color=color, linewidth=lw, connectionstyle=conn, zorder=zorder
    )
    ax.add_patch(arrow)

def save_and_distribute(fig, base_filename):
    """Saves figure in 4K UHD and distributes to docs, frontend, and artifacts."""
    temp_path = os.path.join(ARTIFACT_DIR, f"{base_filename}_temp.png")
    os.makedirs(ARTIFACT_DIR, exist_ok=True)
    os.makedirs(DOCS_DIR, exist_ok=True)
    os.makedirs(FRONTEND_DIR, exist_ok=True)

    # Save exactly 3840 x 2160
    fig.savefig(temp_path, dpi=200, facecolor=BG_DARK)
    plt.close(fig)

    # Ensure exact 3840x2160 with PIL
    im = Image.open(temp_path)
    if im.size != (3840, 2160):
        im = im.resize((3840, 2160), Image.Resampling.LANCZOS)

    destinations = [
        os.path.join(DOCS_DIR, f"{base_filename}.png"),
        os.path.join(DOCS_DIR, f"{base_filename}_4k.png"),
        os.path.join(FRONTEND_DIR, f"{base_filename}.png"),
        os.path.join(FRONTEND_DIR, f"{base_filename}_4k.png"),
        os.path.join(ARTIFACT_DIR, f"{base_filename}.png"),
        os.path.join(ARTIFACT_DIR, f"{base_filename}_4k.png"),
    ]

    for d in destinations:
        im.save(d, format="PNG", optimize=True)
        print(f"Saved 4K UHD: {d} ({im.size[0]}x{im.size[1]})")

    if os.path.exists(temp_path):
        os.remove(temp_path)

# ==============================================================================
# 1. MODEL 1 STANDALONE 4K: MINIROCKET SPATIAL FUSION
# ==============================================================================
def render_model_1_minirocket():
    fig = plt.figure(figsize=(19.2, 10.8), dpi=200, facecolor=BG_DARK)
    ax = fig.add_axes([0, 0, 1, 1], facecolor=BG_DARK)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Top Brand Header
    draw_card(ax, 3, 91.5, 94, 6.5, bg='#061A16', border='#059669', lw=2.0, radius=1.0)
    ax.text(5, 95.8, "NEUROMOVE 2.0  |  MODEL 1 ARCHITECTURE SPECIFICATION",
            ha='left', va='center', color=TEXT_WHITE, fontsize=18, fontweight='bold')
    ax.text(5, 93.3, "MiniRocket Multi-Pair Spatial-Fusion Pipeline with Closed-Form SVD Ridge Solve  •  PhysioNet EEGMMIDB Benchmark",
            ha='left', va='center', color=ACCENT_MINT, fontsize=10.5)
    
    # Top Right Accuracy Badge
    draw_card(ax, 78.5, 92.5, 17.5, 4.5, bg='#064E3B', border='#10B981', lw=1.6, radius=0.8)
    ax.text(87.25, 95.0, "97.41% TEST ACCURACY", ha='center', va='center', color='#A7F3D0', fontsize=10.5, fontweight='bold')
    ax.text(87.25, 93.4, "Macro F1: 0.9740  |  Latency: 7.06 ms", ha='center', va='center', color=TEXT_WHITE, fontsize=8)

    # Horizontal Flow: Preprocessing Stages (Stages 1, 2, 3)
    stages = [
        ("STAGE 1 : RAW EEG INGESTION", "PhysioNet EEGMMIDB Cohort",
         "* 64-Channel EEG Stream at 160 Hz (4,050 Samples)\n* Anti-Alias Downsampling: 160 Hz -> 128 Hz (Nyquist: 64 Hz)\n* Common Average Referencing (CAR): V_i_car = V_i - (1/N) * sum(V_j)",
         ACCENT_EMERALD, '#0A201A', '#065F46'),
        ("STAGE 2 : SENSORIMOTOR FILTERING", "Mu & Beta Rhythm Isolation",
         "* Zero-Phase 4th-Order Butterworth Bandpass (8 - 30 Hz)\n* Captures Sensory-Motor Rhythm (SMR) Desynchronization\n* Preserves cross-hemispheric phase alignment across motor cortex",
         ACCENT_AMBER, '#0A201A', '#065F46'),
        ("STAGE 3 : 5 BILATERAL MOTOR PAIRS", "10 Channels, 256 Samples/Trial",
         "* Pair 1: FC3-FC4 (Premotor / Supplementary Motor Area)\n* Pair 2: C5-C6 (Lateral Hand/Finger Area) | Pair 3: C3-C4 (Hand Motor)\n* Pair 4: C1-C2 (Medial Foot/Leg Strip) | Pair 5: CP3-CP4 (Proprioception)",
         ACCENT_CYAN, '#0A201A', '#065F46')
    ]

    for i, (title, sub, body, accent, bg_c, brd_c) in enumerate(stages):
        x = 3 + i * 31.8
        draw_card(ax, x, 74.5, 30.4, 15.0, bg=bg_c, border=brd_c, lw=1.8, radius=0.9)
        draw_card(ax, x + 1, 85.2, 28.4, 3.2, bg='#063228', border=accent, lw=1.2, radius=0.6)
        ax.text(x + 15.2, 87.1, title, ha='center', va='center', color=accent, fontsize=10, fontweight='bold')
        ax.text(x + 15.2, 85.9, sub, ha='center', va='center', color=TEXT_LIGHT, fontsize=8)
        ax.text(x + 1.8, 79.5, body, ha='left', va='center', color=TEXT_MUTED, fontsize=8.2)

        if i < 2:
            draw_arrow(ax, x + 30.5, 82.0, x + 31.7, 82.0, color=ACCENT_MINT, lw=2.4)

    # Down Arrow to Engine
    draw_arrow(ax, 50, 74.3, 50, 70.8, color=ACCENT_EMERALD, lw=2.6)

    # Center Section: MiniRocket Core Engine Container
    draw_card(ax, 3, 25.5, 94, 44.5, bg='#051513', border='#047857', lw=2.2, radius=1.2)
    ax.text(5, 67.8, "STAGE 4 : MINIROCKET 10,000-KERNEL SPATIAL FUSION ENGINE",
            ha='left', va='center', color='#A7F3D0', fontsize=13, fontweight='bold')
    ax.text(50, 67.8, "Independent Multi-Pair Convolutional Transformations  •  Zero Gradient Training",
            ha='center', va='center', color=TEXT_MUTED, fontsize=9.5)

    # 3 Sub-Blocks inside MiniRocket Engine
    sub_blocks = [
        ("1. CANONICAL KERNEL BANK", "84 Predetermined Length-9 Patterns",
         "* Discrete weights strictly in {-1, +2} with zero mean (sum = -3)\n"
         "* Exactly 2 positive weights (+2) and 7 negative weights (-1)\n"
         "* Dilations sampled exponentially: d in {1, 2, 4, 8, 16, 28}\n"
         "* Receptive field: RF = 1 + (9 - 1) * 28 = 225 time samples (1.76 sec)\n"
         "* 2,000 kernels allocated per electrode pair (10,000 kernels total)\n"
         "* Captures multi-frequency localized oscillations without optimization",
         ACCENT_MINT, '#09231E', '#059669'),
        ("2. DILATED CONVOLUTIONS & PPV POOLING", "Non-Linear Proportion of Positive Values",
         "* Discrete 1D Convolution per kernel: Z = X * W_d (length L = 256 - RF + 1)\n"
         "* Bias b sampled from empirical quantiles of convolutions on training set\n"
         "* Proportion of Positive Values (PPV) Pooling Formulation:\n"
         "      PPV_k = (1 / L) * sum_{t=1}^L  I( (X * W_k)[t] + b_k > 0 )\n"
         "* Extracts 2,000 non-linear monotonic features per electrode pair\n"
         "* Completely invariant to amplitude scaling and baseline DC electrode drift",
         ACCENT_CYAN, '#09231E', '#059669'),
        ("3. 10,000-D SPATIAL FUSION VECTOR", "Full Motor Strip Sensorimotor Representation",
         "* Concatenates all 5 pair PPV vectors into a single unified embedding:\n"
         "      Phi(X) = [ PPV_FC3/4 , PPV_C5/6 , PPV_C3/4 , PPV_C1/2 , PPV_CP3/4 ] in R^10000\n"
         "* Preserves somatotopic spatial topography across bilateral hemispheres:\n"
         "  - FC3-FC4: Motor planning & initiation\n"
         "  - C3-C4 / C5-C6: Hand / finger contralateral mu suppression\n"
         "  - C1-C2: Medial lower-limb sensorimotor activation\n"
         "  - CP3-CP4: Postcentral somatosensory proprioception feedback",
         ACCENT_AMBER, '#09231E', '#059669')
    ]

    for i, (title, sub, body, accent, bg_c, brd_c) in enumerate(sub_blocks):
        x = 5.2 + i * 30.0
        draw_card(ax, x, 27.5, 28.6, 37.5, bg=bg_c, border=brd_c, lw=1.6, radius=0.9)
        draw_card(ax, x + 1, 60.5, 26.6, 3.5, bg='#063228', border=accent, lw=1.2, radius=0.6)
        ax.text(x + 13.3, 62.6, title, ha='center', va='center', color=accent, fontsize=9.8, fontweight='bold')
        ax.text(x + 13.3, 61.4, sub, ha='center', va='center', color=TEXT_LIGHT, fontsize=8)
        ax.text(x + 1.8, 44.0, body, ha='left', va='center', color=TEXT_MUTED, fontsize=8.0)

        if i < 2:
            draw_arrow(ax, x + 28.7, 45.0, x + 29.9, 45.0, color=ACCENT_MINT, lw=2.2)

    # Down Arrow to Classifier
    draw_arrow(ax, 50, 25.3, 50, 22.0, color=ACCENT_EMERALD, lw=2.6)

    # Bottom Row: Closed-Form Solve & Performance Verification
    draw_card(ax, 3, 3.0, 56.0, 18.0, bg='#061B17', border='#059669', lw=2.0, radius=1.0)
    ax.text(5, 18.8, "STAGE 5 : CLOSED-FORM RIDGE CLASSIFIER (L2 SVD REGULARIZATION)",
            ha='left', va='center', color='#6EE7B7', fontsize=11.5, fontweight='bold')
    ax.text(5, 16.8, "One-vs-Rest (OvR) Closed-Form Analytical Solve  •  StandardScaler Zero-Leakage Pipeline",
            ha='left', va='center', color=ACCENT_CYAN, fontsize=8.5)
    
    solve_desc = (
        "* Per-Fold Z-Score Scaling: mu and sigma fitted strictly on training folds (No Data Leakage)\n"
        "* Multi-Class Analytical SVD Solution:  W = (Phi^T Phi + alpha * I)^{-1} Phi^T Y\n"
        "* Efficient Leave-One-Out Cross-Validation (LOOCV) alpha tuning over {0.1, 1.0, 10.0, 100.0}\n"
        "* Sub-10ms Real-Time Inference: 7.06 ms benchmarked latency per window (Zero GPU requirement)\n"
        "* Decodes 4 Motor Imagery Classes: T1 (Left Fist), T2 (Right Fist), T3 (Both Hands), T4 (Both Feet)"
    )
    ax.text(5, 9.8, solve_desc, ha='left', va='center', color=TEXT_MUTED, fontsize=8.2)

    # Performance KPI Card (Bottom Right)
    draw_card(ax, 60.5, 3.0, 36.5, 18.0, bg='#04241D', border='#10B981', lw=2.2, radius=1.0)
    ax.text(78.75, 18.8, "MODEL 1 CLINICAL BENCHMARK RESULTS", ha='center', va='center',
            color='#A7F3D0', fontsize=12, fontweight='bold')
    ax.text(78.75, 16.8, "Held-Out Test Partition (810 Trials across 5 Subjects)", ha='center', va='center', color=TEXT_WHITE, fontsize=8.5)

    kpis = [
        ("TEST ACCURACY", "97.41%", ACCENT_EMERALD, 66.0, 11.5),
        ("MACRO F1", "0.9740", ACCENT_CYAN, 78.75, 11.5),
        ("ROC-AUC", "0.9991", ACCENT_AMBER, 91.5, 11.5),
        ("INFERENCE LATENCY", "7.06 ms", ACCENT_MINT, 71.0, 6.2),
        ("TRAINABLE PARAMS", "40,004", TEXT_WHITE, 86.5, 6.2),
    ]
    for lbl, val, col, kx, ky in kpis:
        ax.text(kx, ky + 1.8, val, ha='center', va='center', color=col, fontsize=13.5, fontweight='bold')
        ax.text(kx, ky - 0.2, lbl, ha='center', va='center', color=TEXT_MUTED, fontsize=7.5, fontweight='bold')

    save_and_distribute(fig, "model_1_minirocket_architecture")

# ==============================================================================
# 2. MODEL 2 STANDALONE 4K: HYBRID CNN-LSTM
# ==============================================================================
def render_model_2_cnnlstm():
    fig = plt.figure(figsize=(19.2, 10.8), dpi=200, facecolor=BG_DARK)
    ax = fig.add_axes([0, 0, 1, 1], facecolor=BG_DARK)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Top Brand Header
    draw_card(ax, 3, 91.5, 94, 6.5, bg='#07182B', border='#0284C7', lw=2.0, radius=1.0)
    ax.text(5, 95.8, "NEUROMOVE 2.0  |  MODEL 2 ARCHITECTURE SPECIFICATION",
            ha='left', va='center', color=TEXT_WHITE, fontsize=18, fontweight='bold')
    ax.text(5, 93.3, "Hybrid Spatio-Temporal 1D-CNN + Bidirectional LSTM Deep Learning Architecture  •  PhysioNet EEGMMIDB Benchmark",
            ha='left', va='center', color='#7DD3FC', fontsize=10.5)
    
    # Top Right Accuracy Badge
    draw_card(ax, 78.5, 92.5, 17.5, 4.5, bg='#0C335A', border='#38BDF8', lw=1.6, radius=0.8)
    ax.text(87.25, 95.0, "97.16% TEST ACCURACY", ha='center', va='center', color='#BAE6FD', fontsize=10.5, fontweight='bold')
    ax.text(87.25, 93.4, "Macro F1: 0.9716  |  Params: 342,564", ha='center', va='center', color=TEXT_WHITE, fontsize=8)

    # Horizontal Flow: Input Representation & Multi-Scale Convolutions (Stages 1, 2, 3)
    stages = [
        ("STAGE 1 : SPATIO-TEMPORAL TENSOR", "Shape: (N, 256 Timesteps, 10 Channels)",
         "* 2.0-Second Continuous Temporal Window sampled at 128 Hz\n* 10 Motor Cortex Electrodes: [FC3, FC4, C5, C6, C3, C4, C1, C2, CP3, CP4]\n* Preserves cross-channel topography and continuous waveforms without 1D flattening",
         ACCENT_CYAN, '#0A1C30', '#0369A1'),
        ("STAGE 2 : MULTI-SCALE 1D-CONV", "Temporal Oscillatory Feature Extraction",
         "* L2: Conv1D (32 filters, k=7, same, ReLU) -> BatchNorm (Extracts low-frequency mu)\n* L3: Conv1D (64 filters, k=5, same, ReLU) -> BatchNorm (Extracts beta harmonics)\n* L4: MaxPooling1D (pool=2, stride=2) -> SpatialDropout1D (0.3)",
         ACCENT_SKY, '#0A1C30', '#0369A1'),
        ("STAGE 3 : DEEP TEMPORAL POOLING", "High-Order Representation Distillation",
         "* L5: Conv1D (128 filters, k=3, same, ReLU) -> BatchNorm (High-order patterns)\n* MaxPooling1D (pool=2, stride=2) downsamples temporal dimension: 128 -> 64\n* Sequence Dropout (0.3) prevents overfitting to individual subject baseline drift",
         ACCENT_PURPLE, '#0A1C30', '#0369A1')
    ]

    for i, (title, sub, body, accent, bg_c, brd_c) in enumerate(stages):
        x = 3 + i * 31.8
        draw_card(ax, x, 74.5, 30.4, 15.0, bg=bg_c, border=brd_c, lw=1.8, radius=0.9)
        draw_card(ax, x + 1, 85.2, 28.4, 3.2, bg='#0A2540', border=accent, lw=1.2, radius=0.6)
        ax.text(x + 15.2, 87.1, title, ha='center', va='center', color=accent, fontsize=10, fontweight='bold')
        ax.text(x + 15.2, 85.9, sub, ha='center', va='center', color=TEXT_LIGHT, fontsize=8)
        ax.text(x + 1.8, 79.5, body, ha='left', va='center', color=TEXT_MUTED, fontsize=8.2)

        if i < 2:
            draw_arrow(ax, x + 30.5, 82.0, x + 31.7, 82.0, color=ACCENT_SKY, lw=2.4)

    # Down Arrow to Recurrent & Dense Engine
    draw_arrow(ax, 50, 74.3, 50, 70.8, color=ACCENT_CYAN, lw=2.6)

    # Center Section: Recurrent & Classification Topology Container
    draw_card(ax, 3, 25.5, 94, 44.5, bg='#061426', border='#0284C7', lw=2.2, radius=1.2)
    ax.text(5, 67.8, "STAGE 4 : BIDIRECTIONAL RECURRENT DYNAMICS & DEEP CLASSIFICATION HEAD",
            ha='left', va='center', color='#BAE6FD', fontsize=13, fontweight='bold')
    ax.text(50, 67.8, "Forward-Backward Context Integration  •  L2 Weight Regularization (0.001)  •  Dynamic Learning Rate Decay",
            ha='center', va='center', color=TEXT_MUTED, fontsize=9.5)

    sub_blocks = [
        ("1. BIDIRECTIONAL LSTM (L6-L7)", "256-D Recurrent Hidden State",
         "* Forward LSTM (128 units): Captures temporal onset of motor planning\n"
         "* Backward LSTM (128 units): Captures post-activation rebound dynamics\n"
         "* Concatenated Output Vector: H in R^256 preserving complete trial context\n"
         "* Sequence Dropout (rate = 0.4) breaks co-dependence among recurrent units\n"
         "* Decodes Event-Related Desynchronization (ERD) and Synchronization (ERS)\n"
         "* Fully differentiable end-to-end backpropagation through time (BPTT)",
         ACCENT_CYAN, '#0A2038', '#0369A1'),
        ("2. DENSE COMPRESSION HEAD (L8-L10)", "Multi-Layer Latent Representation",
         "* L8: Dense (128 units, ReLU activation, L2 kernel regularization = 0.001)\n"
         "* L9: BatchNormalization + Dropout (0.3) for internal covariate stability\n"
         "* L10: Dense (64 units, ReLU activation, L2 kernel regularization = 0.001)\n"
         "* Projects 256-D recurrent representation into 64-D discriminative manifold\n"
         "* Non-linear feature separation across 4 distinct motor imagery paradigms\n"
         "* Prevents gradient saturation and improves generalization on held-out trials",
         ACCENT_SKY, '#0A2038', '#0369A1'),
        ("3. 4-CLASS SOFTMAX OUTPUT (L11)", "Normalized Posterior Probabilities",
         "* Dense (4 units) with Softmax normalization:\n"
         "      P(y = c | X) = exp(z_c) / sum_{k=1}^4 exp(z_k)\n"
         "* Output Classes:\n"
         "  - Class T1: Left Fist Kinesthetic Motor Imagery (C4/CP4 desync)\n"
         "  - Class T2: Right Fist Kinesthetic Motor Imagery (C3/CP3 desync)\n"
         "  - Class T3: Both Fists Kinesthetic Motor Imagery (Bilateral co-activation)\n"
         "  - Class T4: Both Feet Kinesthetic Motor Imagery (Medial C1-C2 suppression)\n"
         "* Calibrated probability outputs feed directly into live clinical BCI serving",
         ACCENT_PURPLE, '#0A2038', '#0369A1')
    ]

    for i, (title, sub, body, accent, bg_c, brd_c) in enumerate(sub_blocks):
        x = 5.2 + i * 30.0
        draw_card(ax, x, 27.5, 28.6, 37.5, bg=bg_c, border=brd_c, lw=1.6, radius=0.9)
        draw_card(ax, x + 1, 60.5, 26.6, 3.5, bg='#0A2A48', border=accent, lw=1.2, radius=0.6)
        ax.text(x + 13.3, 62.6, title, ha='center', va='center', color=accent, fontsize=9.8, fontweight='bold')
        ax.text(x + 13.3, 61.4, sub, ha='center', va='center', color=TEXT_LIGHT, fontsize=8)
        ax.text(x + 1.8, 44.0, body, ha='left', va='center', color=TEXT_MUTED, fontsize=8.0)

        if i < 2:
            draw_arrow(ax, x + 28.7, 45.0, x + 29.9, 45.0, color=ACCENT_SKY, lw=2.2)

    # Down Arrow to Training Strategy
    draw_arrow(ax, 50, 25.3, 50, 22.0, color=ACCENT_CYAN, lw=2.6)

    # Bottom Row: Training Strategy & Performance Verification
    draw_card(ax, 3, 3.0, 56.0, 18.0, bg='#071B30', border='#0284C7', lw=2.0, radius=1.0)
    ax.text(5, 18.8, "STAGE 5 : TRAINING HYPERPARAMETERS & ADAPTIVE SCHEDULING",
            ha='left', va='center', color='#7DD3FC', fontsize=11.5, fontweight='bold')
    ax.text(5, 16.8, "Adam Optimizer  •  ReduceLROnPlateau Dynamic Decay  •  Categorical Cross-Entropy with Label Smoothing",
            ha='left', va='center', color=ACCENT_CYAN, fontsize=8.5)
    
    train_desc = (
        "* Optimizer: Adam (Initial learning rate = 2.0e-3, beta_1 = 0.9, beta_2 = 0.999, epsilon = 1e-7)\n"
        "* Adaptive LR Scheduler: ReduceLROnPlateau (decay factor = 0.5, patience = 4 epochs, minimum lr = 3.125e-5)\n"
        "* Regularization Strategy: L2 weight decay (1e-3) + Dropout (0.3-0.4) + BatchNormalization after each conv/dense\n"
        "* Loss Formulation: Categorical Cross-Entropy with Label Smoothing (epsilon = 0.05) to prevent overconfident logits\n"
        "* Early Stopping: Patience = 10 epochs monitoring validation loss; batch size = 32 trials; max epochs = 40"
    )
    ax.text(5, 9.8, train_desc, ha='left', va='center', color=TEXT_MUTED, fontsize=8.2)

    # Performance KPI Card (Bottom Right)
    draw_card(ax, 60.5, 3.0, 36.5, 18.0, bg='#082442', border='#00F0FF', lw=2.2, radius=1.0)
    ax.text(78.75, 18.8, "MODEL 2 CLINICAL BENCHMARK RESULTS", ha='center', va='center',
            color='#BAE6FD', fontsize=12, fontweight='bold')
    ax.text(78.75, 16.8, "Held-Out Test Partition (810 Trials across 5 Subjects)", ha='center', va='center', color=TEXT_WHITE, fontsize=8.5)

    kpis = [
        ("TEST ACCURACY", "97.16%", ACCENT_CYAN, 66.0, 11.5),
        ("MACRO F1", "0.9716", ACCENT_SKY, 78.75, 11.5),
        ("ROC-AUC", "0.9978", ACCENT_AMBER, 91.5, 11.5),
        ("BATCH LATENCY", "8.92 ms", ACCENT_PURPLE, 71.0, 6.2),
        ("TOTAL PARAMETERS", "342,564", TEXT_WHITE, 86.5, 6.2),
    ]
    for lbl, val, col, kx, ky in kpis:
        ax.text(kx, ky + 1.8, val, ha='center', va='center', color=col, fontsize=13.5, fontweight='bold')
        ax.text(kx, ky - 0.2, lbl, ha='center', va='center', color=TEXT_MUTED, fontsize=7.5, fontweight='bold')

    save_and_distribute(fig, "model_2_cnnlstm_architecture")

# ==============================================================================
# 3. DUAL-CHAMPION TECHNICAL SYSTEM PIPELINE 4K
# ==============================================================================
def render_system_architecture():
    fig = plt.figure(figsize=(19.2, 10.8), dpi=200, facecolor=BG_DARK)
    ax = fig.add_axes([0, 0, 1, 1], facecolor=BG_DARK)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Header
    draw_card(ax, 3, 92.0, 94, 6.0, bg='#0B132B', border='#1E293B', lw=2.0, radius=1.0)
    ax.text(50, 96.0, "NEUROMOVE 2.0 : DUAL-CHAMPION MOTOR IMAGERY BCI ARCHITECTURE",
            ha='center', va='center', color=TEXT_WHITE, fontsize=18, fontweight='bold')
    ax.text(50, 93.6, "PhysioNet EEGMMIDB Benchmark Cohort  |  4-Class Kinesthetic Motor Imagery  |  Strict Zero-Leakage Protocol  |  Sub-10ms Latency",
            ha='center', va='center', color=ACCENT_CYAN, fontsize=10)

    # Top Section: Preprocessing Pipeline
    draw_card(ax, 3, 76.5, 94, 14.0, bg='#0D182E', border='#334155', lw=1.8, radius=1.0)
    ax.text(5, 88.5, "STAGE 1 : SENSORIMOTOR EEG ACQUISITION & SPATIAL-PRESERVING PREPROCESSING",
            ha='left', va='center', color=ACCENT_AMBER, fontsize=11, fontweight='bold')

    prep_boxes = [
        ("64-Channel EEG Stream", "PhysioNet EEGMMIDB", "* 160 Hz Raw Sampling Rate\n* 4,050 Preprocessed Samples\n* 5-Subject Complete Cohort", 4.5, 19.5),
        ("Dual Preprocessing", "Anti-Alias & CAR Filter", "* Resampling: 160 Hz -> 128 Hz\n* Common Average Referencing (CAR)\n* Zero-Phase 4th-Order Butterworth", 26.0, 21.0),
        ("Sensorimotor Isolation", "8 - 30 Hz Bandpass", "* mu Rhythms (8-14 Hz)\n* beta Rhythms (14-30 Hz)\n* Preserves Cross-Hemisphere Phase", 49.0, 19.5),
        ("5 Bilateral Motor Pairs", "10 Channels (256 Samples/Trial)", "1. FC3-FC4 (Premotor / SMA)\n2. C5-C6 (Lateral Hand/Finger)\n3. C3-C4 (Hand Motor) | 4. C1-C2 (Foot)\n5. CP3-CP4 (Proprioception)", 70.5, 25.0)
    ]

    for title, sub, body, bx, bw in prep_boxes:
        draw_card(ax, bx, 78.0, bw, 8.8, bg='#1A2744', border='#475569', lw=1.2, radius=0.6)
        ax.text(bx + bw/2, 85.0, title, ha='center', va='center', color=TEXT_WHITE, fontsize=9.2, fontweight='bold')
        ax.text(bx + bw/2, 83.3, sub, ha='center', va='center', color=ACCENT_CYAN, fontsize=8)
        ax.text(bx + bw/2, 80.4, body, ha='center', va='center', color=TEXT_MUTED, fontsize=7.2)

    draw_arrow(ax, 24.3, 82.4, 25.7, 82.4, color=ACCENT_AMBER, lw=2.0)
    draw_arrow(ax, 47.3, 82.4, 48.7, 82.4, color=ACCENT_AMBER, lw=2.0)
    draw_arrow(ax, 68.8, 82.4, 70.2, 82.4, color=ACCENT_AMBER, lw=2.0)

    # Split Arrows Downwards to Models
    draw_arrow(ax, 76.0, 76.5, 26.5, 73.0, color=ACCENT_EMERALD, lw=2.2, rad=0.12)
    draw_arrow(ax, 89.0, 76.5, 73.5, 73.0, color=ACCENT_CYAN, lw=2.2, rad=-0.12)

    # Model 1 Container (Left)
    draw_card(ax, 3, 20.0, 46.0, 52.0, bg='#071A18', border='#065F46', lw=2.0, radius=1.0)
    draw_card(ax, 4.5, 66.5, 43.0, 4.2, bg='#064E3B', border='#059669', lw=1.2)
    ax.text(26.0, 69.1, "MODEL 1: MINIROCKET SPATIAL FUSION CHAMPION",
            ha='center', va='center', color='#6EE7B7', fontsize=10.5, fontweight='bold')
    ax.text(26.0, 67.5, "Test Accuracy: 97.41%  |  Macro F1: 0.9740  |  ROC-AUC: 0.9991  |  Latency: 7.06 ms",
            ha='center', va='center', color=TEXT_WHITE, fontsize=8.0)

    m1_steps = [
        ("1. Per-Pair Time-Series Partitioning", "* 5 Distinct Electrode Pair Signals: [FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4]\n* Input Shape per Pair: (N, 256) continuous temporal samples at 128 Hz\n* Preserves localized bipolar contralateral voltage differentials without artifact jumps", 56.5, 7.8),
        ("2. Independent Random Dilated Convolutions", "* K = 2,000 MiniRocket Kernels fitted independently per pair (10,000 total)\n* 84 Canonical length-9 patterns with predetermined weights {-1, +2}\n* Dilations exponentially distributed: d in {1, 2, 4, 8, 16, 28} (max dilation = 28)\n* Biases extracted from quantiles of continuous convolutions during training", 44.0, 9.2),
        ("3. PPV Pooling & 10,000-D Spatial Fusion", "* Proportion of Positive Values (PPV): Fraction of points where (X * W + b) > 0\n* 5 Pairs x 2,000 Kernels -> Concatenated into 10,000-dimensional vector\n* Full motor strip spatial coverage from premotor to somatosensory cortex", 32.5, 8.2),
        ("4. Standardization & Closed-Form Ridge Solve", "* StandardScaler (Per-Fold Zero Leakage normalization)\n* RidgeClassifierCV: Multi-Class One-vs-Rest closed-form L2 SVD regularized solve\n* Alpha CV grid search in {0.1, 1.0, 10.0, 100.0} | Extremely fast inference: 7.06 ms", 21.0, 8.2)
    ]
    for stitle, sbody, sy, sh in m1_steps:
        draw_card(ax, 5.0, sy, 42.0, sh, bg='#0E2B25', border='#047857', lw=1.2)
        ax.text(7.0, sy + sh - 1.8, stitle, ha='left', va='center', color='#A7F3D0', fontsize=9.0, fontweight='bold')
        ax.text(7.0, sy + sh/2 - 0.8, sbody, ha='left', va='center', color=TEXT_MUTED, fontsize=7.2)

    # Model 2 Container (Right)
    draw_card(ax, 51.0, 20.0, 46.0, 52.0, bg='#07182C', border='#0369A1', lw=2.0, radius=1.0)
    draw_card(ax, 52.5, 66.5, 43.0, 4.2, bg='#075985', border='#0284C7', lw=1.2)
    ax.text(74.0, 69.1, "MODEL 2: HYBRID SPATIO-TEMPORAL CNN-LSTM CHAMPION",
            ha='center', va='center', color='#7DD3FC', fontsize=10.5, fontweight='bold')
    ax.text(74.0, 67.5, "Test Accuracy: 97.16%  |  Macro F1: 0.9716  |  ROC-AUC: 0.9978  |  342,564 Trainable Params",
            ha='center', va='center', color=TEXT_WHITE, fontsize=8.0)

    m2_steps = [
        ("L1 : Spatio-Temporal Preservation Tensor", "* Input Tensor Shape: (N, 256 Timesteps, 10 Motor Channels)\n* Preserves 2-second continuous temporal dynamics without unrolling to 1D\n* Prevents cross-channel boundary artifacts and temporal scrambling", 56.5, 7.8),
        ("L2-L5 : Multi-Scale 1D Convolutions & Temporal Pooling", "* L2: Conv1D (32 filters, k=7, same, ReLU, L2=0.001) -> BatchNorm\n* L3: Conv1D (64 filters, k=5, same, ReLU, L2=0.001) -> BatchNorm\n* L4: MaxPooling1D (pool=2, stride=2) -> Spatial/Temporal Dropout (0.3)\n* L5: Conv1D (128 filters, k=3, same, ReLU) -> BatchNorm -> MaxPool(2) -> Dropout(0.3)", 44.0, 9.2),
        ("L6-L7 : Bidirectional Recurrent Temporal Dynamics", "* L6: Bidirectional LSTM (128 units x 2 directions = 256-D hidden state vector)\n* Synchronous forward & backward recurrent pass captures motor planning causality\n* L7: Sequence Dropout (0.4) to eliminate overfitting on electrode drift", 32.5, 8.2),
        ("L8-L11 : Deep Classification Head & Dynamic Scheduling", "* L8: Dense (128 units, ReLU, L2=0.001) -> BatchNorm -> Dropout (0.3)\n* L10: Dense (64 units, ReLU)  |  L11: Dense (4 units, Softmax Probability Output)\n* Adam optimizer with ReduceLROnPlateau (lr=2e-3 -> 3.125e-5)", 21.0, 8.2)
    ]
    for stitle, sbody, sy, sh in m2_steps:
        draw_card(ax, 53.0, sy, 42.0, sh, bg='#0E2B46', border='#0284C7', lw=1.2)
        ax.text(55.0, sy + sh - 1.8, stitle, ha='left', va='center', color='#BAE6FD', fontsize=9.0, fontweight='bold')
        ax.text(55.0, sy + sh/2 - 0.8, sbody, ha='left', va='center', color=TEXT_MUTED, fontsize=7.2)

    # Bottom Section: 4-Class Decoding & Serving
    draw_card(ax, 3, 2.0, 94, 15.5, bg='#0E162B', border='#4F46E5', lw=1.8, radius=1.0)
    ax.text(5, 15.6, "STAGE 3 : 4-CLASS KINESTHETIC MOTOR IMAGERY DECODING & PRODUCTION SERVING",
            ha='left', va='center', color=ACCENT_PURPLE, fontsize=11, fontweight='bold')

    classes_info = [
        ("T1: Left Fist (L)", "Contralateral C4/CP4\nmu/beta desynchronization", "Precision: 97.95%\nRecall: 94.09%\nF1: 95.98% | AUC: 0.998", ACCENT_ROSE),
        ("T2: Right Fist (R)", "Contralateral C3/CP3\nmu/beta desynchronization", "Precision: 97.07%\nRecall: 98.51%\nF1: 97.79% | AUC: 0.999", ACCENT_CYAN),
        ("T3: Both Fists (BLR)", "Bilateral hand motor strip\nco-activation", "Precision: 97.51%\nRecall: 98.00%\nF1: 97.76% | AUC: 0.999", ACCENT_EMERALD),
        ("T4: Both Feet (BF)", "Medial sensorimotor strip\nC1-C2 suppression", "Precision: 97.13%\nRecall: 99.02%\nF1: 98.07% | AUC: 0.999", ACCENT_AMBER)
    ]
    for i, (ctitle, csub, cmet, clr) in enumerate(classes_info):
        cx = 4.5 + i * 16.0
        draw_card(ax, cx, 3.4, 15.0, 10.8, bg='#16233B', border=clr, lw=1.3)
        ax.text(cx + 7.5, 12.5, ctitle, ha='center', va='center', color=clr, fontsize=9.2, fontweight='bold')
        ax.text(cx + 7.5, 10.2, csub, ha='center', va='center', color=TEXT_WHITE, fontsize=7.2)
        ax.text(cx + 7.5, 6.4, cmet, ha='center', va='center', color=TEXT_MUTED, fontsize=7.0)

    # Server Stack Box
    draw_card(ax, 69.5, 3.4, 26.5, 10.8, bg='#17173D', border='#6366F1', lw=1.4)
    ax.text(82.75, 12.5, "Production Serving Stack", ha='center', va='center', color='#C7D2FE', fontsize=9.5, fontweight='bold')
    ax.text(82.75, 10.5, "FastAPI 2.0 REST & WebSocket Streaming", ha='center', va='center', color=TEXT_WHITE, fontsize=8.0)
    ax.text(82.75, 6.8, "* Sub-10ms Sliding Window Pipeline\n* React 19 Sentinel Clinical Dashboard\n* Live Dual-Model Ensemble Comparator\n* Interactive Electrode Topomap & Oscilloscope",
            ha='center', va='center', color='#A5B4FC', fontsize=7.2)

    # Connecting arrows to stage 3
    draw_arrow(ax, 26.0, 19.5, 42.0, 16.8, color=ACCENT_EMERALD, lw=2.2, rad=0.08)
    draw_arrow(ax, 74.0, 19.5, 58.0, 16.8, color=ACCENT_CYAN, lw=2.2, rad=-0.08)

    save_and_distribute(fig, "model_architecture_technical")

# ==============================================================================
# 4. MICRO-LAYER TENSOR FLOW SPECIFICATION 4K
# ==============================================================================
def render_micro_layer_flow():
    fig = plt.figure(figsize=(19.2, 10.8), dpi=200, facecolor=BG_DARK)
    ax = fig.add_axes([0, 0, 1, 1], facecolor=BG_DARK)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Header
    draw_card(ax, 3, 92.0, 94, 6.0, bg='#0B132B', border='#1E293B', lw=2.0, radius=1.0)
    ax.text(50, 96.0, "NEUROMOVE 2.0 : DEEP NEURAL LAYER & TENSOR FLOW SPECIFICATION",
            ha='center', va='center', color=TEXT_WHITE, fontsize=18, fontweight='bold')
    ax.text(50, 93.6, "Exact Layer Topology, Tensor Dimensionalities, Kernel Receptive Fields & Mathematical Formulations",
            ha='center', va='center', color=ACCENT_CYAN, fontsize=10)

    # Left Column: MiniRocket Transform & Classifier Topology
    draw_card(ax, 3, 2.5, 46.0, 87.5, bg='#071A18', border='#047857', lw=2.0)
    ax.text(26, 88.0, "MINIROCKET MULTI-PAIR PIPELINE TOPOLOGY", ha='center', va='center', color='#6EE7B7', fontsize=11.5, fontweight='bold')
    ax.text(26, 86.2, "Dual-Transform Random Convolutional Projections (97.41% Accuracy)", ha='center', va='center', color=TEXT_MUTED, fontsize=8.2)

    rocket_layers = [
        ("Input Pair EEG Signals", "(N, 256) per Pair", "5 Motor Pairs: FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4 | Continuous 2s @ 128 Hz", '#0E2B25', '#10B981'),
        ("Length-9 Canonical Kernel Bank", "84 Fixed Patterns", "Weights in {-1, +2} | Sum = -3 | Exactly 2 positive positions among 9 weights", '#0E2B25', '#10B981'),
        ("Exponential Dilation Sampling", "d in {1, 2, 4, 8, 16, 28}", "Max dilation = 28 (RF = 225 samples) | Captures multi-scale sensorimotor rhythms", '#0E2B25', '#10B981'),
        ("Dilated 1D Convolutions", "K = 2,000 / pair", "Z = X * W_d (1D discrete convolution without padding, 10,000 kernels total)", '#0E2B25', '#10B981'),
        ("Empirical Bias Quantiles", "Bias Vector b in R^K", "Extracted from random training time-series convolution quantiles for balanced split", '#0E2B25', '#10B981'),
        ("Proportion of Positive Values (PPV)", "PPV in [0, 1]^2000", "PPV_i = (1 / L) * sum_{t=1}^L I( (X * W_i)[t] + b_i > 0 ) | Deterministic non-linear pool", '#0E2B25', '#10B981'),
        ("Feature-Level Spatial Fusion", "Vector in R^10000", "Concatenation of all 5 bilateral pair PPV vectors across entire bilateral motor strip", '#0E2B25', '#34D399'),
        ("Per-Fold Standard Scaler", "Normalized R^10000", "Zero-mean, unit-variance per-fold normalization with strict zero-leakage protocol", '#0E2B25', '#34D399'),
        ("RidgeClassifierCV (L2 SVD Solve)", "Weights W in R^{10000 x 4}", "Closed-form SVD solve: (X^T X + alpha * I)^{-1} X^T Y | LOOCV alpha search | 7.06 ms", '#0E2B25', '#6EE7B7'),
        ("4-Class Decision Output", "Argmax Score in R^4", "T1 (Left Fist), T2 (Right Fist), T3 (Both Hands), T4 (Both Feet) | Macro F1: 0.9740", '#064E3B', '#10B981')
    ]

    curr_y = 83.5
    for i, (lname, lshape, ldesc, bg_c, brd_c) in enumerate(rocket_layers):
        h = 6.2
        draw_card(ax, 5.0, curr_y - h, 42.0, h, bg=bg_c, border=brd_c, lw=1.2)
        ax.text(6.5, curr_y - 1.8, f"Step {i+1}: {lname}", ha='left', va='center', color='#A7F3D0', fontsize=8.8, fontweight='bold')
        ax.text(45.5, curr_y - 1.8, lshape, ha='right', va='center', color=ACCENT_CYAN, fontsize=8.2, fontweight='bold')
        ax.text(6.5, curr_y - 4.2, ldesc, ha='left', va='center', color=TEXT_MUTED, fontsize=6.8)
        if i < len(rocket_layers) - 1:
            draw_arrow(ax, 26, curr_y - h, 26, curr_y - h - 1.8, color='#059669', lw=1.5)
        curr_y -= (h + 1.8)

    # Right Column: Hybrid CNN-LSTM Architecture Flow
    draw_card(ax, 51.0, 2.5, 46.0, 87.5, bg='#07182C', border='#0284C7', lw=2.0)
    ax.text(74, 88.0, "HYBRID CNN-LSTM DEEP NEURAL TOPOLOGY", ha='center', va='center', color='#7DD3FC', fontsize=11.5, fontweight='bold')
    ax.text(74, 86.2, "13-Layer Spatio-Temporal Preserving Deep Network (97.16% Accuracy)", ha='center', va='center', color=TEXT_MUTED, fontsize=8.2)

    cnn_layers = [
        ("L1 : Input Tensor", "(N, 256, 10)", "256 temporal timesteps (2 sec @ 128 Hz) across 10 motor channels without 1D flattening", '#0E2B46', '#38BDF8'),
        ("L2 : Conv1D + BatchNorm", "(N, 256, 32)", "32 filters, kernel=7, stride=1, padding='same', ReLU, L2=0.001 | BatchNormalization", '#0E2B46', '#38BDF8'),
        ("L3 : Conv1D + BatchNorm", "(N, 256, 64)", "64 filters, kernel=5, stride=1, padding='same', ReLU, L2=0.001 | Extracts temporal oscillations", '#0E2B46', '#38BDF8'),
        ("L4 : MaxPooling1D + Dropout", "(N, 128, 64)", "Pool size=2, stride=2, padding='same' | Temporal downsampling | Spatial Dropout rate = 0.3", '#0E2B46', '#38BDF8'),
        ("L5 : Conv1D + BN + MaxPool", "(N, 64, 128)", "128 filters, kernel=3, padding='same', ReLU -> BN -> Pool(2) -> Dropout(0.3)", '#0E2B46', '#38BDF8'),
        ("L6 : Bidirectional LSTM", "(N, 256)", "128 units forward + 128 units backward recurrent integration captures motor planning causality", '#0C3558', '#00F0FF'),
        ("L7 : Sequence Dropout", "(N, 256)", "Dropout rate = 0.4 on bidirectional temporal representation eliminates electrode drift co-adaptation", '#0E2B46', '#38BDF8'),
        ("L8-L9 : Dense 128 + BatchNorm", "(N, 128)", "128 units, ReLU activation, L2=0.001 regularization -> BatchNormalization + Dropout(0.3)", '#0E2B46', '#38BDF8'),
        ("L10 : Dense 64", "(N, 64)", "64 units, ReLU activation, L2=0.001 kernel regularization | Non-linear latent feature compression", '#0E2B46', '#38BDF8'),
        ("L11 : Dense 4 (Softmax Output)", "(N, 4)", "4 output units with Softmax normalized probability distribution | T1, T2, T3, T4 classes", '#074872', '#38BDF8')
    ]

    curr_y = 83.5
    for i, (lname, lshape, ldesc, bg_c, brd_c) in enumerate(cnn_layers):
        h = 6.2
        draw_card(ax, 53.0, curr_y - h, 42.0, h, bg=bg_c, border=brd_c, lw=1.2)
        ax.text(54.5, curr_y - 1.8, lname, ha='left', va='center', color='#BAE6FD', fontsize=8.8, fontweight='bold')
        ax.text(93.5, curr_y - 1.8, lshape, ha='right', va='center', color=ACCENT_CYAN, fontsize=8.2, fontweight='bold')
        ax.text(54.5, curr_y - 4.2, ldesc, ha='left', va='center', color=TEXT_MUTED, fontsize=6.8)
        if i < len(cnn_layers) - 1:
            draw_arrow(ax, 74, curr_y - h, 74, curr_y - h - 1.8, color='#0284C7', lw=1.5)
        curr_y -= (h + 1.8)

    save_and_distribute(fig, "model_neural_layers")

if __name__ == "__main__":
    print("=== Generating 4K UHD Architecture Diagrams ===")
    render_model_1_minirocket()
    render_model_2_cnnlstm()
    render_system_architecture()
    render_micro_layer_flow()
    print("=== All 4K Diagrams Successfully Generated! ===")
