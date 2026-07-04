from pydantic import BaseModel


class SavePaperRequest(BaseModel):

    paper_id: int

    title: str

    authors: str

    categories: str

    published: str


class SavePaperResponse(BaseModel):

    message: str