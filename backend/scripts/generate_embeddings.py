import numpy as np
import pandas as pd
from pathlib import Path
from sentence_transformers import SentenceTransformer

# ----------------------------
# Paths
# ----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

CSV_FILE = DATA_DIR / "ai_ml_papers.csv"
EMBEDDING_FILE = DATA_DIR / "paper_embeddings.npy"

# ----------------------------
# Load Dataset
# ----------------------------
print("Loading dataset...")

df = pd.read_csv(CSV_FILE)

print(f"Loaded {len(df)} papers.")

# ----------------------------
# Combine Title + Abstract
# ----------------------------
documents = (
    df["title"].fillna("") + ". " +
    df["abstract"].fillna("")
).tolist()

# ----------------------------
# Load Model
# ----------------------------
print("Loading embedding model...")

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

print("Generating embeddings...")

embeddings = model.encode(
    documents,
    batch_size=32,
    show_progress_bar=True,
    convert_to_numpy=True
)

print("Embedding Shape:", embeddings.shape)

# ----------------------------
# Save Embeddings
# ----------------------------
np.save(EMBEDDING_FILE, embeddings)

print(f"Embeddings saved to:\n{EMBEDDING_FILE}")