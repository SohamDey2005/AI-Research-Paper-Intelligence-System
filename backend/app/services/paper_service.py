import json

from sqlalchemy.orm import Session

from app.core.resources import papers_df
from app.database.database import SessionLocal
from app.database.models import CachedPaper
from app.services.summary_service import summary_service
from app.services.keyword_service import keyword_service


class PaperService:

    def get_paper(self, paper_id: int):

        paper = papers_df[papers_df["id"] == paper_id]

        if paper.empty:
            return None

        paper = paper.iloc[0]

        db: Session = SessionLocal()

        try:

            cached = (
                db.query(CachedPaper)
                .filter(CachedPaper.paper_id == paper_id)
                .first()
            )

            if cached:

                print(f"Loaded Paper {paper_id} from cache.")

                summary = cached.summary
                keywords = json.loads(cached.keywords)

            else:

                print(f"Generating summary for Paper {paper_id}...")

                summary = summary_service.summarize(
                    paper["abstract"]
                )

                keywords = keyword_service.extract_keywords(
                    paper["abstract"]
                )

                cached = CachedPaper(

                    paper_id=paper_id,

                    summary=summary,

                    keywords=json.dumps(keywords)

                )

                db.add(cached)
                db.commit()

                print("Saved into cache.")

            return {

                "id": int(paper["id"]),

                "title": paper["title"],

                "authors": paper["authors"],

                "categories": paper["categories"],

                "published": paper["published"],

                "abstract": paper["abstract"],

                "summary": summary,

                "keywords": keywords

            }

        finally:

            db.close()


paper_service = PaperService()