"""Data loading and preprocessing module for NeuroMove.
"""

from app.data.loader import PhysioNetLoader
from app.data.preprocessing import (
    EEGPreprocessor,
    MOTOR_CORTEX_PAIRS,
    resample_signal,
    apply_common_average_reference,
    apply_ica_band_isolation,
    segment_trials,
    extract_electrode_pairs,
    partition_dataset,
    augment_training_samples,
    balance_and_augment_training_samples,
)

__all__ = [
    "PhysioNetLoader",
    "EEGPreprocessor",
    "MOTOR_CORTEX_PAIRS",
    "resample_signal",
    "apply_common_average_reference",
    "apply_ica_band_isolation",
    "segment_trials",
    "extract_electrode_pairs",
    "partition_dataset",
    "augment_training_samples",
    "balance_and_augment_training_samples",
]
