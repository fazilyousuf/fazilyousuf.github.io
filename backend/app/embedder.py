from typing import List
from sklearn.feature_extraction.text import TfidfVectorizer

_vectorizer: TfidfVectorizer | None = None


def fit_vectorizer(texts: List[str]) -> None:
    """
    Fit a single global TfidfVectorizer on all knowledge base texts.
    """
    global _vectorizer
    _vectorizer = TfidfVectorizer().fit(texts)


def transform_corpus(texts: List[str]):
    """
    Transform all corpus texts to a TF-IDF matrix.
    Returns a sparse matrix of shape (n_docs, vocab_size).
    """
    if _vectorizer is None:
        raise RuntimeError("Vectorizer is not fitted. Call fit_vectorizer() first.")
    return _vectorizer.transform(texts)


def transform_query(text: str):
    """
    Transform a single query string to a TF-IDF vector.
    Returns a sparse matrix of shape (1, vocab_size).
    """
    if _vectorizer is None:
        raise RuntimeError("Vectorizer is not fitted. Call fit_vectorizer() first.")
    return _vectorizer.transform([text])
