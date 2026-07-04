import json
import pandas as pd

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR / "data"

INPUT_FILE = DATA_DIR / "arxiv-metadata-oai-snapshot.json"
OUTPUT_FILE = DATA_DIR / "ai_ml_papers.csv"

# AI/ML categories
TARGET_CATEGORIES = {
    "cs.AI",
    "cs.LG",
    "cs.CL",
    "cs.CV",
    "stat.ML"
}

papers = []

print("Reading dataset...")

with open(INPUT_FILE, "r", encoding="utf-8") as file:
    for line in file:
        paper = json.loads(line)

        categories = set(paper["categories"].split())

        if categories.intersection(TARGET_CATEGORIES):

            papers.append({
                "title": paper["title"].replace("\n", " ").strip(),
                "abstract": paper["abstract"].replace("\n", " ").strip(),
                "categories": paper["categories"],
                "authors": paper["authors"],
                "published": paper["update_date"]
            })

print("Total AI/ML Papers:", len(papers))

df = pd.DataFrame(papers)

# Keep only first 5000 papers
df = df.head(5000)

df.to_csv(OUTPUT_FILE, index=False)

print("Saved", len(df), "papers.")