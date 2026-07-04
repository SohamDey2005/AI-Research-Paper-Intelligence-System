from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import SavedPaper
from app.schemas.paper import SavePaperRequest

router = APIRouter(
    prefix="/saved",
    tags=["Saved Papers"]
)


@router.post("/")
def save_paper(
    paper: SavePaperRequest,
    db: Session = Depends(get_db)
):

    existing = db.query(SavedPaper).filter(
        SavedPaper.paper_id == paper.paper_id
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Paper already saved."
        )

    new_paper = SavedPaper(

        paper_id=paper.paper_id,

        title=paper.title,

        authors=paper.authors,

        categories=paper.categories,

        published=paper.published

    )

    db.add(new_paper)

    db.commit()

    db.refresh(new_paper)

    return {

        "message": "Paper saved successfully."

    }


@router.get("/")
def get_saved_papers(
    db: Session = Depends(get_db)
):

    papers = db.query(SavedPaper).all()

    return papers


@router.delete("/{paper_id}")
def delete_saved_paper(
    paper_id: int,
    db: Session = Depends(get_db)
):

    paper = db.query(SavedPaper).filter(
        SavedPaper.paper_id == paper_id
    ).first()

    if not paper:

        raise HTTPException(
            status_code=404,
            detail="Paper not found."
        )

    db.delete(paper)

    db.commit()

    return {

        "message": "Paper deleted successfully."

    }