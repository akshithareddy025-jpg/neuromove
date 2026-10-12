"""Generate Detailed Micro-Layer Tensor-Flow Diagram for NeuroMove 2.0 Models.

Illustrates the exact neural layers, tensor transformations, channel widths,
kernel parameters, and activations for both Champion models.
"""

import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

def create_layer_diagram(output_paths):
    fig = plt.figure(figsize=(24, 14), dpi=300, facecolor='#080D1A')
    ax = fig.add_axes([0, 0, 1, 1], facecolor='#080D1A')
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    TEXT_WHITE = '#F9FAFB'
    TEXT_MUTED = '#9CA3AF'
    ACCENT_CYAN = '#00F0FF'
    ACCENT_BLUE = '#38BDF8'
    ACCENT_GREEN = '#10B981'
    ACCENT_AMBER = '#F59E0B'
    ACCENT_PURPLE = '#A855F7'

    def draw_card(x, y, w, h, bg='#111827', border='#1F2937', lw=1.5, radius=0.8):
        rect = FancyBboxPatch(
            (x, y), w, h,
            boxstyle=f"round,pad=0.15,rounding_size={radius}",
            facecolor=bg, edgecolor=border, linewidth=lw, zorder=2
        )
        ax.add_patch(rect)
        return rect

    def draw_arrow(x1, y1, x2, y2, color=ACCENT_BLUE, lw=1.8):
        arrow = FancyArrowPatch(
            (x1, y1), (x2, y2),
            arrowstyle='-|>,head_length=4.5,head_width=2.5',
            color=color, linewidth=lw, zorder=5
        )
        ax.add_patch(arrow)

    # Title
    ax.text(50, 96.8, "NEUROMOVE 2.0 : DEEP NEURAL LAYER & TENSOR FLOW SPECIFICATION", 
            ha='center', va='center', color=TEXT_WHITE, fontsize=20, fontweight='bold')
    ax.text(50, 94.4, "Exact Layer Topology, Tensor Dimensionalities, Kernel Receptive Fields & Mathematical Formulations", 
            ha='center', va='center', color=ACCENT_CYAN, fontsize=10.5)
    ax.plot([4, 96], [92.8, 92.8], color='#1E293B', lw=1.5, zorder=1)

    # LEFT COLUMN: MiniRocket Transform & Classifier Topology
    draw_card(4, 3, 44, 87.5, bg='#0A1617', border='#047857', lw=1.8)
    ax.text(26, 88.2, "MINIROCKET MULTI-PAIR PIPELINE TOPOLOGY", ha='center', va='center', color='#6EE7B7', fontsize=12, fontweight='bold')
    ax.text(26, 86.2, "Dual-Transform Random Convolutional Projections (97.41% Accuracy)", ha='center', va='center', color=TEXT_MUTED, fontsize=8.5)

    rocket_layers = [
        ("Input Pair EEG Signals", "(N, 256) per Pair", "5 Motor Pairs: FC3-FC4, C5-C6, C3-C4, C1-C2, CP3-CP4\nContinuous 2-second temporal signal @ 128 Hz", '#132A26', '#10B981'),
        ("Length-9 Canonical Kernel Bank", "84 Fixed Patterns", "Weights in {-1, +2} | Sum = -3 | Mean centered\nCombinations of 2 positive positions among 9 weights", '#132A26', '#10B981'),
        ("Exponential Dilation Sampling", "d in {1, 2, 4, 8, 16, 28}", "Max dilation = 28 (Receptive Field = 1 + 8*28 = 225 samples)\nCaptures multi-scale sensorimotor oscillatory rhythms", '#132A26', '#10B981'),
        ("Dilated 1D Convolutions", "K = 2,000 / pair", "Z = X * W_d (1D discrete convolution without padding)\n2,000 kernels distributed evenly across valid dilations", '#132A26', '#10B981'),
        ("Empirical Bias Quantiles", "Bias Vector b in R^K", "Extracted from random training time-series convolution quantiles\nEnsures balanced positive/negative activation split", '#132A26', '#10B981'),
        ("Proportion of Positive Values (PPV)", "PPV in [0, 1]^2000", "PPV_i = (1 / L) * sum_{t=1}^L I( (X * W_i)[t] + b_i > 0 )\nDeterministic non-linear temporal pooling operation", '#132A26', '#10B981'),
        ("Feature-Level Spatial Fusion", "Vector in R^10000", "Concatenation of all 5 bilateral pair PPV vectors:\n10,000 features representing entire bilateral motor strip", '#132A26', '#34D399'),
        ("Per-Fold Standard Scaler", "Normalized R^10000", "Zero-mean, unit-variance per-fold normalization\nStrict zero-leakage parameter estimation", '#132A26', '#34D399'),
        ("RidgeClassifierCV (L2 SVD Solve)", "Weights W in R^{10000 x 4}", "Closed-form SVD solve: (X^T X + alpha * I)^{-1} X^T Y\nLOOCV alpha in {0.1, 1.0, 10.0, 100.0} | 7.06 ms latency", '#132A26', '#6EE7B7'),
        ("4-Class Decision Output", "Argmax Score in R^4", "T1 (Left Fist), T2 (Right Fist), T3 (Both Hands), T4 (Both Feet)\nMacro F1: 0.9740 | ROC-AUC: 0.9991", '#064E3B', '#10B981')
    ]

    curr_y = 83.5
    for i, (lname, lshape, ldesc, bg_c, brd_c) in enumerate(rocket_layers):
        h = 6.2
        draw_card(6, curr_y - h, 40, h, bg=bg_c, border=brd_c, lw=1.2)
        ax.text(7.5, curr_y - 1.8, f"Step {i+1}: {lname}", ha='left', va='center', color='#A7F3D0', fontsize=8.8, fontweight='bold')
        ax.text(44.5, curr_y - 1.8, lshape, ha='right', va='center', color=ACCENT_CYAN, fontsize=8.2, fontweight='bold')
        ax.text(7.5, curr_y - 4.2, ldesc, ha='left', va='center', color=TEXT_MUTED, fontsize=6.8)
        
        if i < len(rocket_layers) - 1:
            draw_arrow(26, curr_y - h, 26, curr_y - h - 1.8, color='#059669', lw=1.5)
        curr_y -= (h + 1.8)

    # RIGHT COLUMN: Hybrid CNN-LSTM Architecture Flow
    draw_card(52, 3, 44, 87.5, bg='#091624', border='#0284C7', lw=1.8)
    ax.text(74, 88.2, "HYBRID CNN-LSTM DEEP NEURAL TOPOLOGY", ha='center', va='center', color='#7DD3FC', fontsize=12, fontweight='bold')
    ax.text(74, 86.2, "13-Layer Spatio-Temporal Preserving Deep Network (97.16% Accuracy)", ha='center', va='center', color=TEXT_MUTED, fontsize=8.5)

    cnn_layers = [
        ("L1 : Input Tensor", "(N, 256, 10)", "256 temporal timesteps (2 sec @ 128 Hz) across 10 motor channels\nMaintains spatio-temporal structure without 1D flattening", '#0F283F', '#38BDF8'),
        ("L2 : Conv1D + BatchNorm", "(N, 256, 32)", "32 filters, kernel=7, stride=1, padding='same', ReLU, L2=0.001\nBatchNormalization stabilizes internal covariate shift", '#0F283F', '#38BDF8'),
        ("L3 : Conv1D + BatchNorm", "(N, 256, 64)", "64 filters, kernel=5, stride=1, padding='same', ReLU, L2=0.001\nExtracts intermediate temporal oscillation waveforms", '#0F283F', '#38BDF8'),
        ("L4 : MaxPooling1D + Dropout", "(N, 128, 64)", "Pool size=2, stride=2, padding='same' | Temporal downsampling\nDropout rate = 0.3 to prevent sensor noise memorization", '#0F283F', '#38BDF8'),
        ("L5 : Conv1D + BN + MaxPool", "(N, 64, 128)", "128 filters, kernel=3, padding='same', ReLU -> BN -> Pool(2)\nDropout(0.3) | Captures high-order harmonic features", '#0F283F', '#38BDF8'),
        ("L6 : Bidirectional LSTM", "(N, 256)", "128 units forward + 128 units backward recurrent integration\nCaptures forward and backward motor planning dynamics", '#0C2E4E', '#00F0FF'),
        ("L7 : Sequence Dropout", "(N, 256)", "Dropout rate = 0.4 on bidirectional temporal representation\nPrevents co-adaptation of recurrent hidden units", '#0F283F', '#38BDF8'),
        ("L8-L9 : Dense 128 + BatchNorm", "(N, 128)", "128 units, ReLU activation, L2=0.001 regularization\nBatchNormalization + Dropout(0.3)", '#0F283F', '#38BDF8'),
        ("L10 : Dense 64", "(N, 64)", "64 units, ReLU activation, L2=0.001 kernel regularization\nNon-linear latent feature compression", '#0F283F', '#38BDF8'),
        ("L11 : Dense 4 (Softmax Output)", "(N, 4)", "4 output units with Softmax normalized probability distribution\nT1 (Left), T2 (Right), T3 (Both Hands), T4 (Both Feet)", '#063B5A', '#38BDF8')
    ]

    curr_y = 83.5
    for i, (lname, lshape, ldesc, bg_c, brd_c) in enumerate(cnn_layers):
        h = 6.2
        draw_card(54, curr_y - h, 40, h, bg=bg_c, border=brd_c, lw=1.2)
        ax.text(55.5, curr_y - 1.8, lname, ha='left', va='center', color='#BAE6FD', fontsize=8.8, fontweight='bold')
        ax.text(92.5, curr_y - 1.8, lshape, ha='right', va='center', color=ACCENT_CYAN, fontsize=8.2, fontweight='bold')
        ax.text(55.5, curr_y - 4.2, ldesc, ha='left', va='center', color=TEXT_MUTED, fontsize=6.8)
        
        if i < len(cnn_layers) - 1:
            draw_arrow(74, curr_y - h, 74, curr_y - h - 1.8, color='#0284C7', lw=1.5)
        curr_y -= (h + 1.8)

    for p in output_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        plt.savefig(p, dpi=300, facecolor='#080D1A', bbox_inches='tight')
        print(f"Saved: {p}")

    plt.close()

if __name__ == "__main__":
    paths = [
        r"c:\Users\rohan\NeuroMove\docs\architecture\model_neural_layers.png",
        r"c:\Users\rohan\NeuroMove\frontend\public\model_neural_layers.png",
        r"C:\Users\rohan\.gemini\antigravity-ide\brain\1bc38fe1-b8f7-4042-b9b6-b3bd12ba2cd8\model_neural_layers.png"
    ]
    create_layer_diagram(paths)
