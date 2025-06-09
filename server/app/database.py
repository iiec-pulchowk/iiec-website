from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Primary Database Setup
engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# History Database Setup
engine_history = create_engine(settings.HISTORY_DATABASE_URL)
SessionLocalHistory = sessionmaker(
    autocommit=False, autoflush=False, bind=engine_history)
BaseHistory = declarative_base()  # New Base for history models


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_history_db():  # New dependency for history DB
    db = SessionLocalHistory()
    try:
        yield db
    finally:
        db.close()
