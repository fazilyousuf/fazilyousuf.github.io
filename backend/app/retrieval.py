from typing import List, Tuple
import numpy as np
from scipy.spatial.distance import cdist

from .chunker import load_all_chunks, Chunk
from .embedder import embed_texts

_chunks: List[Chunk] = []
_chunk_embeddings: np.ndarray | None = None


def initialize_knowledge_base():
    """
    Load all chunks and compute their embeddings once at startup.
    """
    global _chunks, _chunk_embeddings
    _chunks = load_all_chunks()
    texts = [c.text for c in _chunks]
    if texts:
        _chunk_embeddings = embed_texts(texts)
    else:
        _chunk_embeddings = np.zeros((0, 384))  # default dimension for MiniLM
    print(f"Knowledge base initialized with {len(_chunks)} chunks.")


def get_relevant_chunks(query: str, top_k: int = 4) -> List[Chunk]:
    """
    Given a query, return the top_k most relevant chunks using cosine similarity.
    """
    global _chunks, _chunk_embeddings

    if _chunk_embeddings is None or len(_chunks) == 0:
        return []

    query_vec = embed_texts([query])  # shape (1, dim)

    # cosine distance; 1 - cosine_similarity
    distances = cdist(query_vec, _chunk_embeddings, metric="cosine")[0]  # shape (n_chunks,)
    indices = np.argsort(distances)[:top_k]

    return [_chunks[i] for i in indices]


def build_context_for_query(query: str, top_k: int = 4) -> str:
    """
    Retrieve relevant chunks and format them as context text.
    """
    chunks = get_relevant_chunks(query, top_k=top_k)
    if not chunks:
        return ""
    parts = []
    for c in chunks:
        parts.append(f"[Source: {c.source}] {c.text}")
    return "\n\n".join(parts)
