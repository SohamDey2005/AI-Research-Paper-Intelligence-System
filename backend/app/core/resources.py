from pathlib import Path

import faiss
import pandas as pd

from sentence_transformers import SentenceTransformer

from app.core.config import settings

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"

print("Loading dataset...")

papers_df = pd.read_csv(
    DATA_DIR / "ai_ml_papers.csv"
)

print("Loading embedding model...")

embedding_model = SentenceTransformer(
    settings.EMBEDDING_MODEL
)

print("Loading FAISS index...")

faiss_index = faiss.read_index(
    str(DATA_DIR / "paper_faiss.index")
)

print("Resources Loaded Successfully!")