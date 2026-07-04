from sqlalchemy import Column, Integer, String, Text

from app.database.database import Base


class SavedPaper(Base):

    __tablename__ = "saved_papers"

    id = Column(Integer, primary_key=True, index=True)

    paper_id = Column(Integer, unique=True, index=True)

    title = Column(Text)

    authors = Column(Text)

    categories = Column(Text)

    published = Column(String)


class CachedPaper(Base):

    __tablename__ = "cached_papers"

    id = Column(Integer, primary_key=True, index=True)

    paper_id = Column(Integer, unique=True, index=True)

    summary = Column(Text)

    keywords = Column(Text)