import faiss
import numpy as np

from app.core.resources import (
    papers_df,
    embedding_model,
    faiss_index,
)


class SearchService:

    def __init__(self):

        self.df = papers_df
        self.model = embedding_model
        self.index = faiss_index

        print("Search Service Ready!")

    def search(self, query: str, top_k: int = 5):

        query_embedding = self.model.encode(
            [query],
            convert_to_numpy=True
        ).astype("float32")

        faiss.normalize_L2(query_embedding)

        scores, indices = self.index.search(
            query_embedding,
            top_k
        )

        results = []

        for score, idx in zip(scores[0], indices[0]):

            paper = self.df.iloc[idx]

            results.append({

                "id": int(paper["id"]),

                "title": paper["title"],

                "authors": paper["authors"],

                "categories": paper["categories"],

                "published": paper["published"],

                "similarity": round(float(score), 4)

            })

        return results


search_service = SearchService()