"""Tests for 20-subject pipeline extensions:
1. Companion event file parsing (.event, .tsv, .txt) with run matrix mapping.
2. Minority class jitter balancing (Both Fists and Both Feet).
3. MiniRocket balanced Ridge classification.
4. Pure EEG signal prediction independent of file naming.
"""

import tempfile
from pathlib import Path
import numpy as np
import pytest
import mne

from app.data.loader import PhysioNetLoader, normalize_subject_id
from app.data.preprocessing import balance_and_augment_training_samples
from app.models.minirocket_pipeline import MiniRocketPipeline


def test_companion_event_file_parsing():
    """Verify that companion .event files are found and parsed according to run matrix."""
    loader = PhysioNetLoader()

    with tempfile.TemporaryDirectory() as tmpdir:
        tmp_path = Path(tmpdir)
        edf_file = tmp_path / "S001R04.edf"
        event_file = tmp_path / "S001R04.event"

        # Create dummy file
        edf_file.write_text("dummy edf")
        # Write event file: onset, duration, label
        # T0=rest (should drop), T1=left fist (0), T2=right fist (1) for R04
        event_content = (
            "# onset duration label\n"
            "0.0 4.0 T0\n"
            "4.0 4.0 T1\n"
            "8.5 4.0 T2\n"
            "13.0 4.0 T0\n"
        )
        event_file.write_text(event_content)

        # 1. find_event_file
        found = loader.find_event_file(edf_file)
        assert found is not None
        assert found.name == "S001R04.event"

        # 2. extract_trials_from_event_file using MNE RawArray
        info = mne.create_info(ch_names=["C3", "C4"], sfreq=128.0, ch_types="eeg")
        data = np.random.randn(2, int(20.0 * 128.0))
        raw = mne.io.RawArray(data, info, verbose=False)

        # R04 is Left (0) vs Right (1)
        trials = loader.extract_trials_from_event_file(event_file, raw, run=4)
        assert len(trials) == 2  # T0 dropped, T1 and T2 kept
        assert trials[0][1] == 0  # T1 in R04 -> Class 0
        assert trials[1][1] == 1  # T2 in R04 -> Class 1

        # R06 is Both Fists (2) vs Both Feet (3)
        trials_feet = loader.extract_trials_from_event_file(event_file, raw, run=6)
        assert len(trials_feet) == 2
        assert trials_feet[0][1] == 2  # T1 in R06 -> Class 2
        assert trials_feet[1][1] == 3  # T2 in R06 -> Class 3


def test_minority_class_jitter_balancing():
    """Verify that imbalanced motor classes (Both Fists and Both Feet) are equalized."""
    rng = np.random.RandomState(42)
    # Simulate imbalanced classes: 60% fists (Classes 0 & 1), 30% feet/both fists (Classes 2 & 3)
    X_list = []
    y_list = []
    # Class 0: 40 samples, Class 1: 40 samples, Class 2: 15 samples, Class 3: 15 samples
    for c, n in [(0, 40), (1, 40), (2, 15), (3, 15)]:
        for _ in range(n):
            X_list.append(rng.randn(2560).astype(np.float32))
            y_list.append(c)

    X_imb = np.array(X_list, dtype=np.float32)
    y_imb = np.array(y_list, dtype=np.int64)

    assert np.bincount(y_imb)[0] == 40
    assert np.bincount(y_imb)[2] == 15
    assert np.bincount(y_imb)[3] == 15

    # Balance classes
    X_bal, y_bal, n_added = balance_and_augment_training_samples(X_imb, y_imb, random_state=42)

    # All classes should now have 40 samples
    counts_bal = np.bincount(y_bal, minlength=4)
    assert counts_bal[0] == 40
    assert counts_bal[1] == 40
    assert counts_bal[2] == 40
    assert counts_bal[3] == 40
    assert n_added == (40 - 15) + (40 - 15) == 50
    assert len(X_bal) == 160
    assert not np.isnan(X_bal).any()


def test_minirocket_balanced_class_weight_and_persistence():
    """Verify that MiniRocket pipeline uses balanced class weights and persists them."""
    rng = np.random.RandomState(42)
    # 5-pair fusion shape: (N, 2560)
    N = 32
    X = rng.randn(N, 2560).astype(np.float32)
    y = np.array([i % 4 for i in range(N)], dtype=np.int64)

    pipeline = MiniRocketPipeline(
        num_kernels=50,
        kernels_per_pair=10,
        max_dilations=16,
        class_weight="balanced",
    )
    pipeline.fit(X, y)

    assert pipeline.class_weight == "balanced"
    assert pipeline.classifier.class_weight == "balanced"

    with tempfile.TemporaryDirectory() as tmpdir:
        save_path = Path(tmpdir) / "mr_balanced.joblib"
        pipeline.save(save_path)

        loaded = MiniRocketPipeline.load(save_path)
        assert loaded.class_weight == "balanced"
        preds = loaded.predict(X)
        assert len(preds) == N
        assert set(preds).issubset({0, 1, 2, 3})


def test_pure_eeg_signal_prediction_independent_of_filename():
    """Verify that the pipeline predicts purely from numerical EEG matrices without filename cheats."""
    rng = np.random.RandomState(42)
    # Test sample with 5 pairs x 512 samples = 2560 features
    single_window = rng.randn(1, 2560).astype(np.float32)

    pipeline = MiniRocketPipeline(
        num_kernels=50,
        kernels_per_pair=10,
        max_dilations=16,
    )
    # Fit on synthetic data
    X_train = rng.randn(20, 2560).astype(np.float32)
    y_train = np.array([i % 4 for i in range(20)], dtype=np.int64)
    pipeline.fit(X_train, y_train)

    # Predict directly on numerical array with no filename
    pred = pipeline.predict(single_window)
    probs = pipeline.predict_proba(single_window)

    assert pred.shape == (1,)
    assert pred[0] in [0, 1, 2, 3]
    assert probs.shape == (1, 4)
    np.testing.assert_allclose(probs.sum(), 1.0, atol=1e-5)
