from typing import List
from sentence_transformers import SentenceTransformer
import numpy as np

# Load a small, fast model (CPU-friendly)
_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

_model: SentenceTransformer | None = None


def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer(_MODEL_NAME)
    return _model


def embed_texts(texts: List[str]) -> np.ndarray:
    """
    Embed a list of texts into vectors using a local transformer model.
    Returns a numpy array of shape (n_texts, dim).
    """
    model = get_model()
    embeddings = model.encode(texts, show_progress_bar=False, convert_to_numpy=True)
    return embeddings
