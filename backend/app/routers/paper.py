from fastapi import APIRouter
from fastapi import HTTPException

from app.services.paper_service import paper_service

router = APIRouter(
    prefix="/paper",
    tags=["Paper"]
)


@router.get("/{paper_id}")
def get_paper(paper_id: int):

    paper = paper_service.get_paper(paper_id)

    if paper is None:

        raise HTTPException(
            status_code=404,
            detail="Paper not found"
        )

    return paper