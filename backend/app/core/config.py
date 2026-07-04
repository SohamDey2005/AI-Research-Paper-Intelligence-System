import os
from dotenv import load_dotenv

load_dotenv()


class Settings:

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

    DATABASE_URL = "sqlite:///papers.db"

    EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"


settings = Settings()