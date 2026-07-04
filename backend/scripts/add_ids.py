import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"

csv_path = DATA_DIR / "ai_ml_papers.csv"

df = pd.read_csv(csv_path)

# Add sequential IDs
df.insert(0, "id", range(len(df)))

df.to_csv(csv_path, index=False)

print("IDs added successfully!")