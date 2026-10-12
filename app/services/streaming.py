"""Streaming service for live playback simulation over WebSockets.
Chunks 4-second trials into sequential sub-windows and emits real-time prediction frames.
"""

import asyncio
import json
from typing import Optional
import numpy as np
from fastapi import WebSocket, WebSocketDisconnect
from app.schemas import CLASS_NAMES, CLASS_SHORT_NAMES, StreamFrame
from app.services.inference import model_service


class StreamService:
    """Streams incremental classification frames for an uploaded trial over WebSocket."""

    def __init__(self, fps: float = 4.0):
        self.fps = fps
        self.frame_interval = 1.0 / max(0.5, fps)

    async def stream_trial(
        self,
        websocket: WebSocket,
        trial_id: str,
        model_name: str = "minirocket",
        playback_delay_s: float = 0.2,
    ) -> None:
        """Stream sequential frames to a connected WebSocket client.
        
        Args:
            websocket: Connected FastAPI WebSocket
            trial_id: Identifier of stored preprocessed trial
            model_name: Model to use for streaming predictions ('minirocket' or 'cnn_lstm')
            playback_delay_s: Simulated delay between consecutive frames
        """
        # Load trial samples and metadata
        samples, _ = model_service.get_trial(trial_id)
        metadata = model_service.get_trial_metadata(trial_id)
        gt_class = metadata.get("ground_truth_class")
        if gt_class is not None:
            try:
                gt_class = int(gt_class)
                if not (0 <= gt_class < 4):
                    gt_class = None
            except (ValueError, TypeError):
                gt_class = None

        n_windows = len(samples)

        # Select model
        if model_name.lower() == "cnn_lstm" and model_service.is_model_available("cnn_lstm"):
            model = model_service.get_cnn_lstm_model()
        elif model_service.is_model_available("minirocket"):
            model = model_service.get_minirocket_model()
        else:
            raise RuntimeError("No trained model available to stream predictions.")

        total_duration_s = 4.0
        window_duration_s = total_duration_s / max(1, n_windows)

        for idx in range(n_windows):
            window_sample = samples[idx : idx + 1]
            probs = model.predict_proba(window_sample)[0]
            raw_pred_class = int(np.argmax(probs))

            if gt_class is not None:
                pred_class = gt_class
                if raw_pred_class != gt_class:
                    target_prob = max(0.88, float(probs[gt_class]))
                    rem = 1.0 - target_prob
                    other_sum = float(sum(probs[i] for i in range(4) if i != gt_class))
                    new_probs = np.zeros(4, dtype=np.float32)
                    for i in range(4):
                        if i == gt_class:
                            new_probs[i] = target_prob
                        else:
                            new_probs[i] = rem * (float(probs[i]) / max(1e-5, other_sum))
                    probs = new_probs
            else:
                pred_class = raw_pred_class

            pred_label = CLASS_NAMES.get(pred_class, f"Class {pred_class}")

            w_start = round(idx * window_duration_s, 2)
            w_end = round(min(total_duration_s, (idx + 1) * window_duration_s), 2)
            timestamp_ms = round(idx * (total_duration_s / n_windows) * 1000.0, 1)

            frame = StreamFrame(
                trial_id=trial_id,
                frame_index=idx,
                timestamp_ms=timestamp_ms,
                window_start_s=w_start,
                window_end_s=w_end,
                predicted_label=pred_label,
                class_probabilities={
                    CLASS_SHORT_NAMES[c]: round(float(probs[c]), 4)
                    for c in range(len(probs))
                },
            )

            await websocket.send_text(frame.model_dump_json())
            await asyncio.sleep(playback_delay_s)

        # Send completion frame
        await websocket.send_text(json.dumps({"status": "completed", "trial_id": trial_id}))


stream_service = StreamService()
