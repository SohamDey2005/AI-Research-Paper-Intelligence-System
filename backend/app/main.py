from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine
from app.database.models import Base

from app.routers.search import router as search_router
from app.routers.paper import router as paper_router
from app.routers.saved import router as saved_router

Base.metadata.create_all(bind=engine)

app = FastAPI(

    title="AI Research Paper Intelligence System",

    version="1.0.0"

)

# Allow React frontend
app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


@app.get("/")
def home():

    return {

        "message": "Backend Running Successfully 🚀"

    }


app.include_router(search_router)

app.include_router(paper_router)

app.include_router(saved_router)