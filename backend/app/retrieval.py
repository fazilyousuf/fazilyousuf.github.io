from typing import List
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

from .chunker import load_all_chunks, Chunk
from .embedder import fit_vectorizer, transform_corpus, transform_query

_chunks: List[Chunk] = []
_doc_matrix = None  # TF-IDF matrix for all chunks


def initialize_knowledge_base():
    """
    Load all chunks and compute their TF-IDF representations once at startup.
    """
    global _chunks, _doc_matrix
    _chunks = load_all_chunks()
    texts = [c.text for c in _chunks]

    if texts:
        fit_vectorizer(texts)
        _doc_matrix = transform_corpus(texts)
    else:
        _doc_matrix = None

    print(f"Knowledge base initialized with {len(_chunks)} chunks (TF-IDF).")


def get_relevant_chunks(query: str, top_k: int = 4) -> List[Chunk]:
    """
    Given a query, return the top_k most relevant chunks using cosine similarity
    over TF-IDF vectors.
    """
    global _chunks, _doc_matrix

    if _doc_matrix is None or not _chunks:
        return []

    query_vec = transform_query(query)  # shape (1, vocab_size)
    sims = cosine_similarity(query_vec, _doc_matrix)[0]  # shape (n_chunks,)

    # sort by similarity descending
    indices = np.argsort(-sims)[:top_k]
    return [_chunks[i] for i in indices]


def build_context_for_query(query: str, top_k: int = 4, max_chars: int = 600) -> str:
    """
    Retrieve relevant chunks and format them as context text.
    Limit total length to reduce token usage.
    """
    chunks = get_relevant_chunks(query, top_k=top_k)
    if not chunks:
        return ""

    parts = []
    total = 0

    for c in chunks:
        text = c.text.strip()
        # truncate each chunk if too long
        if len(text) > 300:
            text = text[:300] + "..."
        if total + len(text) > max_chars:
            break
        parts.append(f"[Source: {c.source}] {text}")
        total += len(text)

    return "\n\n".join(parts)
