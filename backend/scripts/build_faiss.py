import numpy as np
import faiss
from pathlib import Path

# ----------------------------
# Paths
# ----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

EMBEDDING_FILE = DATA_DIR / "paper_embeddings.npy"
INDEX_FILE = DATA_DIR / "paper_faiss.index"

# ----------------------------
# Load Embeddings
# ----------------------------
print("Loading embeddings...")

embeddings = np.load(EMBEDDING_FILE)

print("Embedding Shape:", embeddings.shape)

# Convert to float32 (FAISS requirement)
embeddings = embeddings.astype("float32")

# Normalize for cosine similarity
faiss.normalize_L2(embeddings)

# ----------------------------
# Build Index
# ----------------------------
dimension = embeddings.shape[1]

index = faiss.IndexFlatIP(dimension)

index.add(embeddings)

print("Total vectors indexed:", index.ntotal)

# ----------------------------
# Save Index
# ----------------------------
faiss.write_index(index, str(INDEX_FILE))

print(f"FAISS index saved to:\n{INDEX_FILE}")