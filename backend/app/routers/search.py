from fastapi import APIRouter

from app.services.search_service import search_service

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.get("/")
def search(query: str, top_k: int = 5):

    results = search_service.search(query, top_k)

    return {
        "query": query,
        "count": len(results),
        "results": results
    }